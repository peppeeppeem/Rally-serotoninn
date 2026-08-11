"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { thb } from "@/lib/format";
import { applyPromo, shippingFor, PROMOS } from "@/lib/promo";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMsg, setPromoMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const discount = applyPromo(subtotal, appliedPromo);
  const shipping = shippingFor(subtotal - discount);
  const total = subtotal - discount + shipping;

  function checkPromo() {
    const code = promo.trim().toUpperCase();
    if (PROMOS[code]) {
      setAppliedPromo(code);
      setPromoMsg(`${PROMOS[code].label} applied ✓`);
    } else {
      setAppliedPromo(null);
      setPromoMsg("That code isn't valid.");
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"),
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      phone: fd.get("phone"),
      address1: fd.get("address1"),
      address2: fd.get("address2"),
      city: fd.get("city"),
      postalCode: fd.get("postalCode"),
      country: fd.get("country") || "Thailand",
      promoCode: appliedPromo,
      items: items.map((i) => ({ productId: i.productId, colorway: i.colorway, quantity: i.quantity })),
    };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Checkout failed");
      const { number } = await res.json();
      clear();
      router.push(`/order/${number}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="display mb-5 text-[clamp(28px,5vw,48px)]">Nothing to check out</h1>
        <Link href="/shop" className="btn btn--solid">Start shopping</Link>
      </section>
    );
  }

  const field = "w-full border border-ink/15 bg-transparent px-3.5 py-3 text-[14px] outline-none focus:border-accent placeholder:text-ink-3";

  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="display mb-8 text-[clamp(30px,5vw,52px)]">Checkout</h1>
        <form onSubmit={submit} className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3">
            <legend className="mono mb-2 text-[10px] tracking-[0.16em] text-ink-2">Contact</legend>
            <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
            <input name="phone" placeholder="Phone (optional)" className={field} autoComplete="tel" />
          </fieldset>
          <fieldset className="flex flex-col gap-3">
            <legend className="mono mb-2 text-[10px] tracking-[0.16em] text-ink-2">Shipping Address</legend>
            <div className="grid grid-cols-2 gap-3">
              <input name="firstName" required placeholder="First name" className={field} autoComplete="given-name" />
              <input name="lastName" required placeholder="Last name" className={field} autoComplete="family-name" />
            </div>
            <input name="address1" required placeholder="Address" className={field} autoComplete="address-line1" />
            <input name="address2" placeholder="Apartment, suite (optional)" className={field} autoComplete="address-line2" />
            <div className="grid grid-cols-2 gap-3">
              <input name="city" required placeholder="City" className={field} autoComplete="address-level2" />
              <input name="postalCode" required placeholder="Postal code" className={field} autoComplete="postal-code" />
            </div>
            <input name="country" defaultValue="Thailand" className={field} autoComplete="country-name" />
          </fieldset>
          {error && <p className="mono text-[11px] text-accent">{error}</p>}
          <button type="submit" disabled={submitting} className="btn btn--accent justify-center disabled:opacity-60">
            {submitting ? "Placing order…" : `Pay ${thb(total)}`}
          </button>
          <p className="mono text-[8px] tracking-[0.1em] text-ink-3">This is a demo checkout — no real payment is taken.</p>
        </form>
      </div>
      <aside className="h-fit border border-ink/12 p-6">
        <h2 className="mono mb-5 text-[10px] tracking-[0.16em] text-ink-2">Your Order</h2>
        <ul className="flex flex-col gap-3 border-b border-ink/10 pb-4">
          {items.map((it) => (
            <li key={it.productId + it.colorway} className="flex gap-3">
              <div className="relative h-14 w-12 flex-none" style={{ background: it.hex }}>
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[8px] text-bg">{it.quantity}</span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="text-[12px] font-medium leading-tight">{it.name}</span>
                <span className="mono text-[8px] tracking-[0.1em] text-ink-3">{it.colorway}</span>
              </div>
              <span className="mono self-center text-[11px]">{thb(it.price * it.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 py-4">
          <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="mono flex-1 border border-ink/15 bg-transparent px-3 py-2 text-[11px] uppercase tracking-[0.1em] outline-none focus:border-accent" />
          <button onClick={checkPromo} type="button" className="btn btn--ghost px-4 py-2">Apply</button>
        </div>
        {promoMsg && <p className={`mono mb-2 text-[9px] tracking-[0.08em] ${appliedPromo ? "text-accent" : "text-ink-3"}`}>{promoMsg}</p>}
        <p className="mono mb-3 text-[8px] tracking-[0.08em] text-ink-3">Try WELCOME10 · RALLY15 · MOVEMENT</p>
        <div className="flex justify-between py-1.5 text-[13px]">
          <span className="text-ink-2">Subtotal</span><span className="mono">{thb(subtotal)}</span>
        </div>
        {discount > 0 && <div className="flex justify-between py-1.5 text-[13px] text-accent"><span>Discount</span><span className="mono">−{thb(discount)}</span></div>}
        <div className="flex justify-between py-1.5 text-[13px]">
          <span className="text-ink-2">Shipping</span><span className="mono">{shipping === 0 ? "Free" : thb(shipping)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-ink/10 pt-3">
          <span className="display text-[18px]">Total</span>
          <span className="display text-[18px]">{thb(total)}</span>
        </div>
      </aside>
    </section>
  );
}
