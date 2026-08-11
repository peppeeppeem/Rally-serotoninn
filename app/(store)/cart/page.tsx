"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { thb } from "@/lib/format";
import { shippingFor, FREE_SHIP_THRESHOLD } from "@/lib/promo";

export default function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h1 className="display mb-8 text-[clamp(34px,6vw,64px)]">
        Your <span className="serif-i text-accent">bag</span>
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-5 border-t border-ink/10 py-16">
          <p className="text-ink-2">Your bag is empty.</p>
          <Link href="/shop" className="btn btn--solid">Start shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <ul className="border-t border-ink/10">
            {items.map((it) => (
              <li key={it.productId + it.colorway} className="flex gap-4 border-b border-ink/10 py-5">
                <div className="h-28 w-24 flex-none" style={{ background: it.hex }} aria-hidden="true" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/product/${it.slug}`} className="text-[15px] font-medium hover:text-accent">{it.name}</Link>
                    <span className="display text-[16px]">{thb(it.price * it.quantity)}</span>
                  </div>
                  <span className="mono mt-1 text-[9px] tracking-[0.1em] text-ink-3">{it.colorway}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-ink/15">
                      <button onClick={() => setQty(it.productId, it.colorway, it.quantity - 1)} className="px-3 py-1.5 text-ink-2 hover:text-accent" aria-label="Decrease">−</button>
                      <span className="mono min-w-7 text-center text-[12px]">{it.quantity}</span>
                      <button onClick={() => setQty(it.productId, it.colorway, it.quantity + 1)} className="px-3 py-1.5 text-ink-2 hover:text-accent" aria-label="Increase">+</button>
                    </div>
                    <button onClick={() => remove(it.productId, it.colorway)} className="mono text-[9px] text-ink-3 hover:text-accent">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-ink/12 p-6">
            <h2 className="mono mb-5 text-[10px] tracking-[0.16em] text-ink-2">Order Summary</h2>
            <div className="flex justify-between py-2 text-[13px]">
              <span className="text-ink-2">Subtotal</span>
              <span className="mono">{thb(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-[13px]">
              <span className="text-ink-2">Shipping</span>
              <span className="mono">{shipping === 0 ? "Free" : thb(shipping)}</span>
            </div>
            {remaining > 0 && <p className="mono py-2 text-[9px] tracking-[0.08em] text-ink-3">Add {thb(remaining)} for free shipping</p>}
            <div className="mt-3 flex justify-between border-t border-ink/10 pt-4">
              <span className="display text-[18px]">Total</span>
              <span className="display text-[18px]">{thb(subtotal + shipping)}</span>
            </div>
            <Link href="/checkout" className="btn btn--accent mt-6 w-full justify-center">Checkout</Link>
            <Link href="/shop" className="mono mt-4 block text-center text-[9px] tracking-[0.1em] text-ink-3 hover:text-accent">Continue shopping</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
