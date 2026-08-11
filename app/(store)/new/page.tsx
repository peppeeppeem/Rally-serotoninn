import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "New! — SS26 Drop",
  description: "Rally Movement new arrivals — fresh pieces from our SS26 collection.",
};

export const dynamic = "force-dynamic";

export default async function NewPage() {
  const products = await db.product.findMany({
    where: { active: true },
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="border-b border-ink/10 px-5 pb-10 pt-14 sm:px-13">
        <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-3">SS26 — Latest Drop</p>
        <h1 className="display text-[clamp(40px,8vw,104px)] font-semibold leading-[0.9]">
          New<span className="text-accent">!</span>
        </h1>
      </section>

      <section className="px-5 py-12 sm:px-13">
        <div className="mb-6 mono text-[9px] tracking-[0.12em] text-ink-3">
          {products.length} pieces
        </div>

        <div className="grid grid-cols-2 gap-x-3.5 gap-y-10 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
