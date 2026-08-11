import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { thb } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrderConfirmation({ params }: { params: { number: string } }) {
  const order = await db.order.findUnique({
    where: { number: params.number },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="mono mb-5 text-[10px] tracking-[0.2em] text-accent">Order Confirmed</p>
      <h1 className="display mb-4 text-[clamp(34px,6vw,64px)] leading-[0.9]">
        Thank you, <span className="serif-i text-accent">{order.firstName}</span>
      </h1>
      <p className="mb-10 max-w-[52ch] text-[14px] leading-[1.7] text-ink-2">
        Your order <span className="mono text-ink">{order.number}</span> is confirmed. A receipt is on its way to{" "}
        <span className="text-ink">{order.email}</span>.
      </p>
      <div className="border border-ink/12 p-6">
        <h2 className="mono mb-5 text-[10px] tracking-[0.16em] text-ink-2">Summary</h2>
        <ul className="flex flex-col gap-3 border-b border-ink/10 pb-4">
          {order.items.map((it) => (
            <li key={it.id} className="flex justify-between text-[13px]">
              <span>{it.name} <span className="mono text-[9px] text-ink-3">· {it.colorway} × {it.quantity}</span></span>
              <span className="mono">{thb(it.price * it.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between py-1.5 text-[13px]"><span className="text-ink-2">Subtotal</span><span className="mono">{thb(order.subtotal)}</span></div>
        {order.discount > 0 && <div className="flex justify-between py-1.5 text-[13px] text-accent"><span>Discount {order.promoCode ? `(${order.promoCode})` : ""}</span><span className="mono">−{thb(order.discount)}</span></div>}
        <div className="flex justify-between py-1.5 text-[13px]"><span className="text-ink-2">Shipping</span><span className="mono">{order.shipping === 0 ? "Free" : thb(order.shipping)}</span></div>
        <div className="mt-2 flex justify-between border-t border-ink/10 pt-3"><span className="display text-[18px]">Total</span><span className="display text-[18px]">{thb(order.total)}</span></div>
      </div>
      <div className="mt-10 flex gap-3">
        <Link href="/shop" className="btn btn--solid">Keep shopping</Link>
        <Link href="/" className="btn btn--ghost">Home</Link>
      </div>
    </section>
  );
}
