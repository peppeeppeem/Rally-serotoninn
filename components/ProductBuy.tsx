"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { usd, salePct } from "@/lib/format";

export type BuyVariant = { colorway: string; hex: string; stock: number; gradient?: string | null };
export type BuyProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number | null;
  variants: BuyVariant[];
};

export function ProductBuy({ product }: { product: BuyProduct }) {
  const { add } = useCart();
  const [sel, setSel] = useState(0);
  const [added, setAdded] = useState(false);
  const v = product.variants[sel];
  const pct = salePct(product.price, product.compareAt);
  const soldOut = !v || v.stock <= 0;

  function handleAdd() {
    if (soldOut) return;
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorway: v.colorway,
      hex: v.hex,
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div>
      {/* price */}
      <div className="mb-6 flex items-center gap-3">
        <span className="display text-[34px] leading-none">{usd(product.price)}</span>
        {product.compareAt && (
          <>
            <span className="mono text-[13px] text-ink-3 line-through">{usd(product.compareAt)}</span>
            <span className="mono bg-accent px-2 py-1 text-[9px] tracking-[0.1em] text-white">−{pct}%</span>
          </>
        )}
      </div>

      {/* colorway */}
      <div className="mb-6">
        <div className="mono mb-3 flex items-center justify-between text-[9px] tracking-[0.14em] text-ink-2">
          <span>Colorway — {v?.colorway}</span>
          <span className={soldOut ? "text-accent" : "text-ink-3"}>
            {soldOut ? "Sold out" : v.stock <= 5 ? `Only ${v.stock} left` : "In stock"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.map((variant, i) => (
            <button
              key={variant.colorway}
              onClick={() => setSel(i)}
              title={variant.colorway}
              aria-label={variant.colorway}
              className={`flex h-9 items-center gap-2 border px-2.5 transition-colors ${
                i === sel ? "border-ink" : "border-ink/15 hover:border-ink/40"
              }`}
            >
              <span className="h-4 w-4 rounded-full border border-ink/10" style={{ background: variant.hex }} />
              <span className="mono text-[9px] tracking-[0.08em]">{variant.colorway}</span>
            </button>
          ))}
        </div>
      </div>

      {/* add */}
      <button
        onClick={handleAdd}
        disabled={soldOut}
        className={`btn w-full justify-center ${soldOut ? "cursor-not-allowed border-ink/20 text-ink-3" : "btn--accent"}`}
      >
        {soldOut ? "Sold Out" : added ? "Added to Bag ✓" : "Add to Bag"}
      </button>
      <p className="mono mt-3 text-center text-[8px] tracking-[0.1em] text-ink-3">
        Free shipping over $150 · Easy 14-day returns
      </p>
    </div>
  );
}
