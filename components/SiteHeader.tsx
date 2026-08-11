"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "The Movement", href: "/about" },
  { label: "New!", href: "/new" },
  { label: "Mood board", href: "/mood-board" },
  { label: "Trunk shows & events", href: "/stores" },
  { label: "Club", href: "/club" },
  { label: "Shop all", href: "/shop" },
  { label: "Stockists", href: "/stockists" },
  { label: "Collection", href: "/collection" },
];

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 flex h-16 items-center justify-between gap-6 border-b border-ink/10 bg-bg px-5 transition-shadow sm:px-10 ${
        scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.06)]" : ""
      }`}
      aria-label="Main"
    >
      <Link href="/" className="display shrink-0 text-[26px] font-semibold leading-none tracking-[-0.01em]" aria-label="Rälly home">
        Rälly
      </Link>

      <ul className="hidden flex-1 items-center justify-center gap-5 lg:flex">
        {NAV.map((n) => (
          <li key={n.label}>
            <Link
              href={n.href}
              className="whitespace-nowrap text-[11px] tracking-[0.01em] text-ink-2 transition-colors hover:text-accent"
            >
              {n.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex shrink-0 items-center gap-4">
        <Link href="/shop" className="text-[11px] text-ink-2 transition-colors hover:text-accent" aria-label="Search">
          Search
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-[11px] text-ink-2 transition-colors hover:text-accent"
          aria-label={`Bag, ${count} items`}
        >
          Bag
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-white">
            {count}
          </span>
        </button>
      </div>
    </nav>
  );
}
