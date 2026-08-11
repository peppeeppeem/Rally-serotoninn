import Link from "next/link";
import { db } from "@/lib/db";
import { thb } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-whisper/20 text-ink-2",
  paid: "bg-denim/15 text-denim",
  shipped: "bg-accent/15 text-accent",
  delivered: "bg-ink/10 text-ink-2",
  cancelled: "bg-ink-3/20 text-ink-3",
};

export default async function AdminOrders() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="mono mb-2 text-[10px] tracking-[0.16em] text-ink-3">[ Fulfilment ]</p>
        <h1 className="display text-[clamp(28px,4vw,44px)]">Orders</h1>
      </header>

      <div className="overflow-x-auto border border-ink/12">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="mono border-b border-ink/10 text-[8px] tracking-[0.12em] text-ink-3">
              <th className="p-3 font-normal">Order</th>
              <th className="p-3 font-normal">Date</th>
              <th className="p-3 font-normal">Customer</th>
              <th className="p-3 font-normal">Items</th>
              <th className="p-3 font-normal">Status</th>
              <th className="p-3 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-ink/10 last:border-0 hover:bg-surface/50">
                <td className="p-3">
                  <Link href={`/admin/orders/${o.id}`} className="mono text-[11px] hover:text-accent">
                    {o.number}
                  </Link>
                </td>
                <td className="p-3 mono text-[10px] text-ink-3">
                  {o.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </td>
                <td className="p-3 text-[12px]">
                  {o.firstName} {o.lastName}
                  <div className="mono text-[8px] tracking-[0.08em] text-ink-3">{o.email}</div>
                </td>
                <td className="p-3 mono text-[11px] text-ink-2">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
                <td className="p-3">
                  <span className={`mono inline-block px-2 py-1 text-[8px] uppercase tracking-[0.1em] ${STATUS_STYLES[o.status] ?? ""}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-right mono text-[11px]">{thb(o.total)}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center text-[12px] text-ink-3">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
