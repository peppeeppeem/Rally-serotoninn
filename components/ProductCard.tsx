import Link from "next/link";
import Image from "next/image";
import { usd, salePct } from "@/lib/format";

export type ProductCardData = {
  slug: string;
  name: string;
  category: string;
  subtitle?: string | null;
  price: number;
  compareAt?: number | null;
  badge?: string | null;
  image?: string | null;
  variants: { colorway: string; hex: string; gradient?: string | null }[];
};

export function ProductCard({ p, className = "" }: { p: ProductCardData; className?: string }) {
  const pct = salePct(p.price, p.compareAt);
  const art = p.variants[0]?.gradient ?? "g-noir";
  const soldOut = p.badge === "Sold Out";
  return (
    <Link href={`/product/${p.slug}`} className={`group block ${className}`}>
      <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-surface">
        {/* gradient fallback sits behind the photo */}
        <div className={`absolute inset-0 ${art}`} />
        {p.image && (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        {p.badge && (
          <span
            className={`absolute left-3 top-3 label px-2 py-1 text-[8px] ${
              soldOut ? "bg-bg/90 text-ink" : p.badge === "Sale" ? "bg-accent text-white" : "bg-ink text-bg"
            }`}
          >
            {p.badge}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[13px] font-semibold leading-snug">{p.name}</h3>
      </div>
      <div className="mt-1 text-[12px] text-ink-2">
        {p.compareAt && <span className="mr-1.5 line-through opacity-55">{usd(p.compareAt)}</span>}
        <span className={pct ? "text-accent" : ""}>{usd(p.price)}</span>
      </div>
    </Link>
  );
}
