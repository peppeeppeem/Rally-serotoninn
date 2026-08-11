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

export default async function AdminDashboard() {
  const [orders, productCount, activeCount, variants, recent] = await Promise.all([
    db.order.findMany({ select: { total: true, status: true } }),
    db.product.count(),
    db.product.count({ where: { active: true } }),
    db.variant.findMany({ include: { product: { select: { name: true, slug: true } } } }),
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { items: true } }),
  ]);

  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const lowStock = variants.filter((v) => v.stock <= 5).sort((a, b) => a.stock - b.stock);
  const totalStock = variants.reduce((s, v) => s + v.stock, 0);

  const stats = [
    ["Revenue", thb(revenue), `${orders.length} orders`],
    ["Products", String(activeCount), `${productCount} total · ${activeCount} active`],
    ["Units in stock", String(totalStock), `${variants.length} SKUs`],
    ["Low stock", String(lowStock.length), "≤ 5 units"],
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="mono mb-2 text-[10px] tracking-[0.16em] text-ink-3">[ Overview ]</p>
        <h1 className="display text-[clamp(28px,4vw,44px)]">Dashboard</h1>
      </header>

      {/* stat tiles */}
      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([label, big, sub]) => (
          <div key={label} className="border border-ink/12 p-5">
            <div className="mono mb-3 text-[9px] tracking-[0.12em] text-ink-3">{label}</div>
            <div className="display text-[clamp(22px,3vw,32px)] leading-none">{big}</div>
            <div className="mono mt-2 text-[8px] tracking-[0.08em] text-ink-3">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* recent orders */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="mono text-[10px] tracking-[0.16em] text-ink-2">[ Recent Orders ]</h2>
            <Link href="/admin/orders" className="link-u">View all →</Link>
          </div>
          <div className="overflow-x-auto border border-ink/12">
            <table className="w-full min-w-[440px] text-left">
              <thead>
                <tr className="mono border-b border-ink/10 text-[8px] tracking-[0.12em] text-ink-3">
                  <th className="p-3 font-normal">Order</th>
                  <th className="p-3 font-normal">Customer</th>
                  <th className="p-3 font-normal">Status</th>
                  <th className="p-3 text-right font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-ink/10 last:border-0 hover:bg-surface/50">
                    <td className="p-3">
                      <Link href={`/admin/orders/${o.id}`} className="mono text-[11px] hover:text-accent">
                        {o.number}
                      </Link>
                    </td>
                    <td className="p-3 text-[12px]">{o.firstName} {o.lastName}</td>
                    <td className="p-3">
                      <span className={`mono inline-block px-2 py-1 text-[8px] uppercase tracking-[0.1em] ${STATUS_STYLES[o.status] ?? ""}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right mono text-[11px]">{thb(o.total)}</td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr><td colSpan={4} className="p-6 text-center text-[12px] text-ink-3">No orders yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* low stock */}
        <section>
          <h2 className="mono mb-4 text-[10px] tracking-[0.16em] text-ink-2">[ Low Stock ]</h2>
          <div className="border border-ink/12">
            {lowStock.length === 0 ? (
              <p className="p-6 text-center text-[12px] text-ink-3">Everything well stocked.</p>
            ) : (
              <ul>
                {lowStock.map((v) => (
                  <li key={v.id} className="flex items-center justify-between border-b border-ink/10 p-3 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3.5 w-3.5 rounded-full border border-ink/10" style={{ background: v.hex }} />
                      <div>
                        <div className="text-[12px] leading-tight">{v.product.name}</div>
                        <div className="mono text-[8px] tracking-[0.1em] text-ink-3">{v.colorway}</div>
                      </div>
                    </div>
                    <span className={`mono text-[11px] ${v.stock === 0 ? "text-accent" : "text-ink-2"}`}>
                      {v.stock} left
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
