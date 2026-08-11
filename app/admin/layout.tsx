import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Rally Movement",
  robots: { index: false, follow: false },
};

const NAV = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Orders", "/admin/orders"],
  ["New Product", "/admin/products/new"],
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink md:grid md:grid-cols-[240px_1fr]">
      {/* sidebar */}
      <aside className="flex flex-col border-b border-ink/10 bg-bg-2 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r">
        <div className="border-b border-ink/10 px-6 py-5">
          <Link href="/admin" className="flex items-baseline gap-[0.34em]">
            <span className="display text-[18px]">Rally</span>
            <span className="display text-[18px] text-accent">Admin</span>
          </Link>
          <p className="mono mt-1 text-[8px] tracking-[0.14em] text-ink-3">Back office</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:gap-0.5">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="mono whitespace-nowrap px-3 py-2.5 text-[10px] tracking-[0.1em] text-ink-2 transition-colors hover:bg-surface hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto hidden border-t border-ink/10 p-4 md:block">
          <Link href="/" className="mono text-[9px] tracking-[0.1em] text-ink-3 hover:text-accent">
            ← Back to store
          </Link>
        </div>
      </aside>

      {/* content */}
      <main className="min-w-0 p-5 sm:p-8">{children}</main>
    </div>
  );
}
