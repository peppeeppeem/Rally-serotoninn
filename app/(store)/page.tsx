import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const HERO_BANNER = "/campaign/rise-and-shine.jpg";

export default async function HomePage() {
  const [featured, newIn] = await Promise.all([
    db.product.findMany({ where: { active: true, featured: true }, include: { variants: true }, take: 2 }),
    db.product.findMany({ where: { active: true }, include: { variants: true }, orderBy: { createdAt: "asc" }, take: 8 }),
  ]);

  return (
    <>
      {/* ─── HERO BANNER ─── */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-[5/2] w-full sm:aspect-[21/8] lg:aspect-[21/7]">
          <Image
            src={HERO_BANNER}
            alt="Rälly Rise & Shine Drop #2"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
        </div>
        <div className="absolute inset-x-0 bottom-6 flex justify-center sm:bottom-10">
          <Link href="/shop" className="btn btn--solid bg-white/90 text-ink backdrop-blur hover:bg-white">
            Shop the collection →
          </Link>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      {featured.length > 0 && (
        <Reveal>
          <section className="grid grid-cols-1 gap-3 p-3 sm:p-4 md:grid-cols-2">
            {featured.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                <div className={`absolute inset-0 ${p.variants[0]?.gradient ?? "g-noir"}`} />
                {p.image && (
                  <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <h2 className="display mb-2 text-[clamp(26px,3.4vw,40px)] font-semibold leading-tight">{p.name}</h2>
                  <p className="mb-4 max-w-[42ch] text-[13px] leading-relaxed text-white/75 line-clamp-2">{p.description}</p>
                  <span className="btn btn--onDark">Shop now</span>
                </div>
              </Link>
            ))}
          </section>
        </Reveal>
      )}

      {/* ─── NEW IN ─── */}
      <Reveal>
        <section className="px-5 py-16 sm:px-10">
          <div className="mb-10 flex items-end justify-between gap-5 border-b border-ink/10 pb-4">
            <h2 className="display text-[clamp(32px,5vw,60px)] font-semibold">
              New <span className="serif-i text-accent">in</span>
            </h2>
            <Link href="/shop" className="link-u">Shop all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* ─── THE MOVEMENT teaser ─── */}
      <Reveal>
        <section className="border-y border-ink/10 px-5 py-20 text-center sm:px-10">
          <p className="label mb-6 text-[10px] text-ink-3">Est. 2017 · Bangkok</p>
          <h2 className="display mx-auto max-w-[18ch] text-balance text-[clamp(30px,5.2vw,66px)] font-semibold leading-[1.02]">
            We gather, organize &amp; <span className="serif-i text-accent">inspire</span> a new sense of movement.
          </h2>
          <p className="mx-auto mt-7 max-w-[54ch] text-[14.5px] leading-[1.8] text-ink-2">
            It&apos;s been a humbling journey since we started as a small brand in 2017. From the first collection to
            international photoshoots and showroom openings — Rälly is a community first. Join the movement.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-8">
            {["Boldness", "Fluidity", "Movement"].map((w) => (
              <span key={w} className="display flex items-center gap-2.5 text-[clamp(16px,2vw,22px)] italic">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {w}
              </span>
            ))}
          </div>
          <Link href="/about" className="btn btn--solid mt-10">The Movement</Link>
        </section>
      </Reveal>

      {/* ─── NEWSLETTER ─── */}
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-8 px-5 py-16 sm:px-10 lg:grid-cols-2">
          <div>
            <h2 className="display text-[clamp(32px,5vw,56px)] font-semibold leading-[1.02]">
              Join the <span className="serif-i text-accent">club.</span>
            </h2>
            <p className="mt-3 max-w-[42ch] text-[13.5px] leading-[1.65] text-ink-2">
              First access to drops, trunk shows, and events. No noise — just movement.
            </p>
          </div>
          <form className="flex flex-col gap-2.5 sm:flex-row" action="/api/subscribe" method="post">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email"
              className="flex-1 border border-ink/25 bg-transparent px-4 py-3.5 text-[14px] outline-none placeholder:text-ink-3 focus:border-accent"
            />
            <button type="submit" className="btn btn--solid">Subscribe</button>
          </form>
        </div>
      </Reveal>
    </>
  );
}
