import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { thb } from "@/lib/format";
import { updateOrderStatus } from "../../actions";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <Link href="/admin/orders" className="mono text-[9px] tracking-[0.1em] text-ink-3 hover:text-accent">
          ← Orders
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h1 className="display text-[clamp(26px,4vw,40px)]">{order.number}</h1>
          <span className="mono text-[10px] tracking-[0.1em] text-ink-3">
            {order.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* customer */}
        <section className="border border-ink/12 p-5">
          <h2 className="mono mb-4 text-[10px] tracking-[0.14em] text-ink-2">[ Customer ]</h2>
          <div className="flex flex-col gap-1 text-[13px]">
            <span>{order.firstName} {order.lastName}</span>
            <span className="text-ink-2">{order.email}</span>
            {order.phone && <span className="text-ink-2">{order.phone}</span>}
          </div>
          <h3 className="mono mb-2 mt-5 text-[9px] tracking-[0.12em] text-ink-3">Ship to</h3>
          <address className="text-[13px] not-italic leading-relaxed text-ink-2">
            {order.address1}
            {order.address2 && <>, {order.address2}</>}
            <br />
            {order.city} {order.postalCode}
            <br />
            {order.country}
          </address>
        </section>

        {/* status control */}
        <section className="border border-ink/12 p-5">
          <h2 className="mono mb-4 text-[10px] tracking-[0.14em] text-ink-2">[ Status ]</h2>
          <form action={updateOrderStatus} className="flex flex-col gap-3">
            <input type="hidden" name="id" value={order.id} />
            <select
              name="status"
              defaultValue={order.status}
              className="w-full border border-ink/15 bg-transparent px-3 py-2.5 text-[13px] outline-none focus:border-accent"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <button type="submit" className="btn btn--accent self-start">
              [ Update status ]
            </button>
          </form>
          {order.promoCode && (
            <p className="mono mt-4 text-[9px] tracking-[0.1em] text-ink-3">Promo: {order.promoCode}</p>
          )}
        </section>
      </div>

      {/* items */}
      <section className="mt-6 border border-ink/12 p-5">
        <h2 className="mono mb-4 text-[10px] tracking-[0.14em] text-ink-2">[ Items ]</h2>
        <ul className="flex flex-col gap-3 border-b border-ink/10 pb-4">
          {order.items.map((it) => (
            <li key={it.id} className="flex justify-between text-[13px]">
              <span>
                {it.name} <span className="mono text-[9px] text-ink-3">· {it.colorway} × {it.quantity}</span>
              </span>
              <span className="mono">{thb(it.price * it.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between py-1.5 text-[13px]">
          <span className="text-ink-2">Subtotal</span>
          <span className="mono">{thb(order.subtotal)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between py-1.5 text-[13px] text-accent">
            <span>Discount</span>
            <span className="mono">−{thb(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between py-1.5 text-[13px]">
          <span className="text-ink-2">Shipping</span>
          <span className="mono">{order.shipping === 0 ? "Free" : thb(order.shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-ink/10 pt-3">
          <span className="display text-[18px]">Total</span>
          <span className="display text-[18px]">{thb(order.total)}</span>
        </div>
      </section>
    </div>
  );
}
