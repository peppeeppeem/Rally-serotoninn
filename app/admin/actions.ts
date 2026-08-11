"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function num(v: FormDataEntryValue | null, fallback = 0) {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id"));
  const compareRaw = String(formData.get("compareAt") ?? "").trim();
  await db.product.update({
    where: { id },
    data: {
      name: String(formData.get("name")),
      subtitle: String(formData.get("subtitle") ?? "") || null,
      category: String(formData.get("category")),
      material: String(formData.get("material") ?? "") || null,
      description: String(formData.get("description") ?? ""),
      price: num(formData.get("price")),
      compareAt: compareRaw ? num(formData.get("compareAt")) : null,
      badge: String(formData.get("badge") ?? "") || null,
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    },
  });

  // Update variant stock (fields named stock_<variantId>)
  const variants = await db.variant.findMany({ where: { productId: id } });
  for (const v of variants) {
    const key = `stock_${v.id}`;
    if (formData.has(key)) {
      await db.variant.update({ where: { id: v.id }, data: { stock: num(formData.get(key), v.stock) } });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name"));
  const colorway = String(formData.get("colorway") || "Default");
  const hex = String(formData.get("hex") || "#1A1712");
  let slug = slugify(name);
  // ensure unique slug
  const exists = await db.product.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const product = await db.product.create({
    data: {
      slug,
      name,
      category: String(formData.get("category") || "Bags"),
      subtitle: String(formData.get("subtitle") ?? "") || null,
      material: String(formData.get("material") ?? "") || null,
      description: String(formData.get("description") ?? ""),
      price: num(formData.get("price")),
      badge: String(formData.get("badge") ?? "") || "New",
      active: true,
      variants: {
        create: [
          {
            colorway,
            hex,
            gradient: String(formData.get("gradient") || "g-noir"),
            stock: num(formData.get("stock"), 10),
            sku: `RM-${slug.toUpperCase().slice(0, 20)}-${colorway.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)}`,
          },
        ],
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect(`/admin/products/${product.id}`);
}

export async function toggleActive(formData: FormData) {
  const id = String(formData.get("id"));
  const product = await db.product.findUnique({ where: { id } });
  if (product) {
    await db.product.update({ where: { id }, data: { active: !product.active } });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
  }
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await db.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
