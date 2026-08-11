import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateProduct } from "../../actions";

export const dynamic = "force-dynamic";

const CATEGORIES = ["The Bag", "Bags", "Whisper", "Ready-to-Wear", "Accessories"];
const BADGES = ["", "New", "Icon", "Sale"];
const field =
  "w-full border border-ink/15 bg-transparent px-3 py-2.5 text-[13px] outline-none focus:border-accent";
const label = "mono mb-1.5 block text-[9px] tracking-[0.12em] text-ink-3";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { variants: true },
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <Link href="/admin/products" className="mono text-[9px] tracking-[0.1em] text-ink-3 hover:text-accent">
          ← Products
        </Link>
        <h1 className="display mt-3 text-[clamp(26px,4vw,40px)]">{product.name}</h1>
        <p className="mono mt-1 text-[9px] tracking-[0.1em] text-ink-3">/{product.slug}</p>
      </header>

      <form action={updateProduct} className="flex flex-col gap-6">
        <input type="hidden" name="id" value={product.id} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="name">Name</label>
            <input id="name" name="name" defaultValue={product.name} className={field} required />
          </div>
          <div>
            <label className={label} htmlFor="subtitle">Subtitle</label>
            <input id="subtitle" name="subtitle" defaultValue={product.subtitle ?? ""} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="category">Category</label>
            <select id="category" name="category" defaultValue={product.category} className={field}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="price">Price (USD)</label>
            <input id="price" name="price" type="number" defaultValue={product.price} className={field} required />
          </div>
          <div>
            <label className={label} htmlFor="compareAt">Compare-at (sale)</label>
            <input id="compareAt" name="compareAt" type="number" defaultValue={product.compareAt ?? ""} className={field} placeholder="—" />
          </div>
          <div>
            <label className={label} htmlFor="material">Material</label>
            <input id="material" name="material" defaultValue={product.material ?? ""} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="badge">Badge</label>
            <select id="badge" name="badge" defaultValue={product.badge ?? ""} className={field}>
              {BADGES.map((b) => (
                <option key={b} value={b}>{b || "— none —"}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={product.description} rows={4} className={field} />
          </div>
        </div>

        {/* variants / stock */}
        <div>
          <h2 className="mono mb-3 text-[10px] tracking-[0.14em] text-ink-2">[ Colorways &amp; Stock ]</h2>
          <div className="flex flex-col gap-2">
            {product.variants.map((v) => (
              <div key={v.id} className="flex items-center gap-3 border border-ink/12 p-3">
                <span className="h-5 w-5 flex-none rounded-full border border-ink/10" style={{ background: v.hex }} />
                <span className="flex-1 text-[13px]">{v.colorway}</span>
                <span className="mono text-[9px] tracking-[0.1em] text-ink-3">{v.sku}</span>
                <label className="mono text-[8px] tracking-[0.1em] text-ink-3" htmlFor={`stock_${v.id}`}>Stock</label>
                <input
                  id={`stock_${v.id}`}
                  name={`stock_${v.id}`}
                  type="number"
                  defaultValue={v.stock}
                  className="w-20 border border-ink/15 bg-transparent px-2 py-1.5 text-[13px] outline-none focus:border-accent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" name="active" defaultChecked={product.active} className="accent-[rgb(var(--accent))]" />
            Active (visible in store)
          </label>
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" name="featured" defaultChecked={product.featured} className="accent-[rgb(var(--accent))]" />
            Featured
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn btn--accent">
            [ Save changes ]
          </button>
          <Link href={`/product/${product.slug}`} target="_blank" className="btn btn--ghost">
            View in store ↗
          </Link>
        </div>
      </form>
    </div>
  );
}
