"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { thb } from "@/lib/format";
import { FREE_SHIP_THRESHOLD } from "@/lib/promo";

export function CartDrawer() {
  const { items, subtotal, count, setQty, remove, open, setOpen } = useCart();
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(420px,100vw)] flex-col bg-bg shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping bag"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <span className="display text-[18px]">Your Bag ({count})</span>
          <button onClick={() => setOpen(false)} className="mono text-[10px] tracking-[0.1em] text-ink-2 hover:text-accent">
            Close ✕
          </button>
        </div>

        {/* free ship progress */}
        <div className="border-b border-ink/10 px-6 py-4">
          <p className="mono mb-2 text-[9px] tracking-[0.1em] text-ink-2">
            {remaining > 0 ? (
              <>
                Add <span className="text-accent">{thb(remaining)}</span> for free shipping
              </>
            ) : (
              <span className="text-accent">You&apos;ve unlocked free shipping ✓</span>
            )}
          </p>
          <div className="h-1 w-full overflow-hidden bg-surface">
            <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="mono text-[10px] tracking-[0.1em] text-ink-3">Your bag is empty</p>
              <button onClick={() => setOpen(false)} className="btn btn--ghost">
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((it) => (
                <li key={it.productId + it.colorway} className="flex gap-3">
                  <div
                    className="h-20 w-16 flex-none rounded"
                    style={{ background: it.hex }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[13px] font-medium">{it.name}</span>
                      <button
                        onClick={() => remove(it.productId, it.colorway)}
                        className="mono text-[9px] text-ink-3 hover:text-accent"
                        aria-label="Remove"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="mono mb-2 text-[9px] tracking-[0.1em] text-ink-3">{it.colorway}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-ink/15">
                        <button
                          onClick={() => setQty(it.productId, it.colorway, it.quantity - 1)}
                          className="px-2.5 py-1 text-ink-2 hover:text-accent"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="mono min-w-6 text-center text-[11px]">{it.quantity}</span>
                        <button
                          onClick={() => setQty(it.productId, it.colorway, it.quantity + 1)}
                          className="px-2.5 py-1 text-ink-2 hover:text-accent"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="mono text-[11px]">{thb(it.price * it.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="mono text-[10px] tracking-[0.1em] text-ink-2">Subtotal</span>
              <span className="display text-[20px]">{thb(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn btn--accent w-full justify-center">
              Checkout
            </Link>
            <p className="mono mt-3 text-center text-[8px] tracking-[0.1em] text-ink-3">
              Taxes &amp; shipping calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
