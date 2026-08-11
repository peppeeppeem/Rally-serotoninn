import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductBuy } from "@/components/ProductBuy";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await db.product.findUnique({ where: { slug: params.slug } });
  if (!p) return { title: "Not found" };
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { variants: true },
  });
  if (!product || !product.active) notFound();

  const related = await db.product.findMany({
    where: { active: true, category: product.category, id: { not: product.id } },
    include: { variants: true },
    take: 4,
  });
  const art = product.variants[0]?.gradient ?? "g-noir";

  return (
    <>
      <div className="mono border-b border-ink/10 px-5 py-3 text-[9px] tracking-[0.12em] text-ink-3 sm:px-13">
        <Link href="/shop" className="hover:text-accent">Shop</Link>{" "}
        / <Link href={`/shop?c=${encodeURIComponent(product.category)}`} className="hover:text-accent">{product.category}</Link> /{" "}
        <span className="text-ink-2">{product.name}</span>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="grid grid-rows-[1fr_auto] border-b border-ink/10 lg:border-b-0 lg:border-r">
          <div className={`relative aspect-square w-full ${art}`}>
            {product.image && (
              <Image src={product.image} alt={product.name} fill sizes="(max-width:1024px) 100vw, 50vw" priority className="object-cover" />
            )}
            {product.badge && (
              <span className={`absolute left-4 top-4 mono px-2 py-1 text-[9px] tracking-[0.1em] ${product.badge === "Sale" ? "bg-accent text-white" : "bg-ink text-bg"}`}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-[3px] bg-bg-2 p-[3px]">
            {product.variants.slice(0, 4).map((v) => (
              <div key={v.colorway} className={`aspect-square ${v.gradient ?? "g-noir"}`} title={v.colorway} />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-13">
          <p className="mono mb-3 text-[9px] tracking-[0.16em] text-ink-3">{product.subtitle ?? product.category}</p>
          <h1 className="display mb-5 text-[clamp(30px,4.5vw,52px)] leading-[0.92]">{product.name}</h1>
          <ProductBuy product={product} />
          <div className="mt-9 border-t border-ink/10 pt-7">
            <p className="max-w-[52ch] text-[14px] leading-[1.75] text-ink-2">{product.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {product.material && (
                <div>
                  <dt className="mono text-[8px] tracking-[0.12em] text-ink-3">Material</dt>
                  <dd className="mt-1 text-[13px]">{product.material}</dd>
                </div>
              )}
              <div>
                <dt className="mono text-[8px] tracking-[0.12em] text-ink-3">Category</dt>
                <dd className="mt-1 text-[13px]">{product.category}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <Reveal>
          <section className="px-5 py-14 sm:px-13">
            <div className="mb-9 flex items-end justify-between border-b border-ink/10 pb-3.5">
              <h2 className="display text-[clamp(24px,4vw,44px)]">More from <span className="serif-i text-accent">{product.category}</span></h2>
              <Link href={`/shop?c=${encodeURIComponent(product.category)}`} className="link-u">View all →</Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-10 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}
