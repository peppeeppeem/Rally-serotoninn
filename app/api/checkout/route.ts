import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applyPromo, shippingFor } from "@/lib/promo";

type LineIn = { productId: string; colorway: string; quantity: number };

export async function POST(req: Request) {
  let body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    promoCode?: string | null;
    items?: LineIn[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, firstName, lastName, address1, city, postalCode, items } = body;
  if (!email || !firstName || !lastName || !address1 || !city || !postalCode || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Load real products; recompute all prices server-side (never trust the client).
  const ids = [...new Set(items.map((i) => i.productId))];
  const products = await db.product.findMany({
    where: { id: { in: ids }, active: true },
    include: { variants: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  const lines: { productId: string; name: string; colorway: string; price: number; quantity: number }[] = [];
  for (const i of items) {
    const p = byId.get(i.productId);
    if (!p) return NextResponse.json({ error: "A product is no longer available" }, { status: 409 });
    const variant = p.variants.find((v) => v.colorway === i.colorway);
    if (!variant) return NextResponse.json({ error: `${p.name} colorway unavailable` }, { status: 409 });
    const qty = Math.max(1, Math.min(99, Math.floor(i.quantity || 1)));
    if (variant.stock < qty) {
      return NextResponse.json({ error: `${p.name} (${variant.colorway}) is out of stock` }, { status: 409 });
    }
    lines.push({ productId: p.id, name: p.name, colorway: variant.colorway, price: p.price, quantity: qty });
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const discount = applyPromo(subtotal, body.promoCode ?? null);
  const shipping = shippingFor(subtotal - discount);
  const total = subtotal - discount + shipping;

  // Generate a human order number.
  const count = await db.order.count();
  const number = "RM-" + String(1001 + count).padStart(4, "0");

  const order = await db.$transaction(async (tx) => {
    // decrement stock
    for (const i of items) {
      const p = byId.get(i.productId)!;
      const variant = p.variants.find((v) => v.colorway === i.colorway)!;
      const qty = Math.max(1, Math.min(99, Math.floor(i.quantity || 1)));
      await tx.variant.update({ where: { id: variant.id }, data: { stock: variant.stock - qty } });
    }
    return tx.order.create({
      data: {
        number,
        email,
        firstName,
        lastName,
        phone: body.phone || null,
        address1,
        address2: body.address2 || null,
        city,
        postalCode,
        country: body.country || "Thailand",
        subtotal,
        shipping,
        discount,
        total,
        promoCode: discount > 0 ? body.promoCode : null,
        status: "paid",
        items: { create: lines },
      },
    });
  });

  return NextResponse.json({ number: order.number, id: order.id });
}
