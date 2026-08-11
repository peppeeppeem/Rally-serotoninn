import Link from "next/link";
import { db } from "@/lib/db";
import { thb } from "@/lib/format";
import { toggleActive } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const products = await db.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mono mb-2 text-[10px] tracking-[0.16em] text-ink-3">[ Catalogue ]</p>
          <h1 className="display text-[clamp(28px,4vw,44px)]">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn btn--solid">
          [ + New ]
        </Link>
      </header>

      <div className="overflow-x-auto border border-ink/12">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="mono border-b border-ink/10 text-[8px] tracking-[0.12em] text-ink-3">
              <th className="p-3 font-normal">Product</th>
              <th className="p-3 font-normal">Category</th>
              <th className="p-3 font-normal">Price</th>
              <th className="p-3 font-normal">Stock</th>
              <th className="p-3 font-normal">Status</th>
              <th className="p-3 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const stock = p.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <tr key={p.id} className="border-b border-ink/10 last:border-0 hover:bg-surface/50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-9 w-8 flex-none rounded ${p.variants[0]?.gradient ?? "g-noir"}`} />
                      <div>
                        <div className="text-[13px] font-medium leading-tight">{p.name}</div>
                        <div className="mono text-[8px] tracking-[0.1em] text-ink-3">{p.variants.length} colorway(s)</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-[12px] text-ink-2">{p.category}</td>
                  <td className="p-3 mono text-[12px]">
                    {thb(p.price)}
                    {p.compareAt && <span className="ml-1 text-ink-3 line-through">{thb(p.compareAt)}</span>}
                  </td>
                  <td className="p-3">
                    <span className={`mono text-[12px] ${stock <= 5 ? "text-accent" : "text-ink-2"}`}>{stock}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`mono inline-block px-2 py-1 text-[8px] uppercase tracking-[0.1em] ${
                        p.active ? "bg-denim/15 text-denim" : "bg-ink-3/20 text-ink-3"
                      }`}
                    >
                      {p.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${p.id}`} className="mono text-[10px] tracking-[0.08em] text-ink-2 hover:text-accent">
                        Edit
                      </Link>
                      <form action={toggleActive}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="mono text-[10px] tracking-[0.08em] text-ink-3 hover:text-accent">
                          {p.active ? "Hide" : "Show"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
