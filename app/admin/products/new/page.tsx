import Link from "next/link";
import { createProduct } from "../../actions";

const CATEGORIES = ["The Bag", "Bags", "Whisper", "Ready-to-Wear", "Accessories"];
const GRADIENTS = ["g-noir", "g-denim", "g-scarlet", "g-silver", "g-holly", "g-olive", "g-ido", "g-blue2"];
const field = "w-full border border-ink/15 bg-transparent px-3 py-2.5 text-[13px] outline-none focus:border-accent";
const label = "mono mb-1.5 block text-[9px] tracking-[0.12em] text-ink-3";

export default function NewProduct() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <Link href="/admin/products" className="mono text-[9px] tracking-[0.1em] text-ink-3 hover:text-accent">
          ← Products
        </Link>
        <h1 className="display mt-3 text-[clamp(26px,4vw,40px)]">New product</h1>
      </header>

      <form action={createProduct} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="name">Name</label>
            <input id="name" name="name" className={field} required placeholder="The Bag — Emerald" />
          </div>
          <div>
            <label className={label} htmlFor="subtitle">Subtitle</label>
            <input id="subtitle" name="subtitle" className={field} placeholder="Mark II · Microfiber Leather" />
          </div>
          <div>
            <label className={label} htmlFor="category">Category</label>
            <select id="category" name="category" className={field} defaultValue="Bags">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="price">Price (USD)</label>
            <input id="price" name="price" type="number" className={field} required placeholder="120" />
          </div>
          <div>
            <label className={label} htmlFor="material">Material</label>
            <input id="material" name="material" className={field} placeholder="Microfiber leather" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={4} className={field} />
          </div>
        </div>

        <div>
          <h2 className="mono mb-3 text-[10px] tracking-[0.14em] text-ink-2">[ First Colorway ]</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className={label} htmlFor="colorway">Colorway</label>
              <input id="colorway" name="colorway" className={field} placeholder="Emerald" defaultValue="Default" />
            </div>
            <div>
              <label className={label} htmlFor="hex">Swatch hex</label>
              <input id="hex" name="hex" className={field} placeholder="#1A1712" defaultValue="#1A1712" />
            </div>
            <div>
              <label className={label} htmlFor="gradient">Art</label>
              <select id="gradient" name="gradient" className={field} defaultValue="g-noir">
                {GRADIENTS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="stock">Stock</label>
              <input id="stock" name="stock" type="number" className={field} defaultValue={10} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn--accent self-start">
          [ Create product ]
        </button>
      </form>
    </div>
  );
}
