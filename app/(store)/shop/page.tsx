import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const CATEGORIES = ["All", "Ready-to-Wear", "Denim", "Tops", "Knitwear", "Bags"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { c?: string; sale?: string };
}) {
  const cat = searchParams.c && CATEGORIES.includes(searchParams.c) ? searchParams.c : "All";
  const onlySale = searchParams.sale === "1";

  const products = await db.product.findMany({
    where: {
      active: true,
      ...(cat !== "All" ? { category: cat } : {}),
      ...(onlySale ? { compareAt: { not: null } } : {}),
    },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      {/* header band */}
      <section className="border-b border-ink/10 px-5 pb-10 pt-14 sm:px-13">
        <p className="label mb-6 text-[10px] text-ink-3">Shop all · SS26</p>
        <h1 className="display text-[clamp(40px,8vw,104px)] font-semibold leading-[0.9]">
          {onlySale ? (
            <>
              On <span className="serif-i text-accent">sale</span>
            </>
          ) : cat === "All" ? (
            <>
              Shop <span className="serif-i text-accent">all</span>
            </>
          ) : (
            cat
          )}
        </h1>
      </section>

      {/* filter bar */}
      <div className="sticky top-16 z-30 flex items-center gap-2 overflow-x-auto border-b border-ink/10 bg-bg/95 px-5 py-3.5 backdrop-blur sm:px-13">
        {CATEGORIES.map((c) => {
          const active = c === cat && !onlySale;
          return (
            <Link
              key={c}
              href={c === "All" ? "/shop" : `/shop?c=${encodeURIComponent(c)}`}
              className={`mono whitespace-nowrap border px-3.5 py-2 text-[9px] tracking-[0.12em] transition-colors ${
                active
                  ? "border-ink bg-ink text-bg"
                  : "border-ink/15 text-ink-2 hover:border-accent hover:text-accent"
              }`}
            >
              {c}
            </Link>
          );
        })}
        <Link
          href="/shop?sale=1"
          className={`mono ml-auto whitespace-nowrap border px-3.5 py-2 text-[9px] tracking-[0.12em] transition-colors ${
            onlySale ? "border-accent bg-accent text-white" : "border-ink/15 text-ink-2 hover:border-accent hover:text-accent"
          }`}
        >
          Sale
        </Link>
      </div>

      {/* grid */}
      <section className="px-5 py-12 sm:px-13">
        <div className="mb-6 mono text-[9px] tracking-[0.12em] text-ink-3">{products.length} pieces</div>
        {products.length === 0 ? (
          <p className="py-20 text-center text-ink-2">Nothing here yet — check back Friday.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
