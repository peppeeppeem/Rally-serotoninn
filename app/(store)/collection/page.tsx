import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collection — Rälly Movement",
  description: "Rälly Movement campaign imagery — SS26 and archive.",
};

const PHOTOS = [
  { id: "1558171813-56955e58893e", alt: "SS26 Campaign — White linen look", badge: "" },
  { id: "1490481651871-ab68de25d43d", alt: "Archive — Hammock series", badge: "" },
  { id: "1515886657613-9f3515b0c78f", alt: "SS26 — Silk blouse arctic", badge: "SOLD OUT" },
  { id: "1469334031218-e382a71b716b", alt: "Striped suit duo", badge: "" },
  { id: "1517841905240-472988babdf9", alt: "White corset crop", badge: "" },
  { id: "1531746020798-e6953c6e8e04", alt: "Ivory knit vest", badge: "" },
  { id: "1524504388940-b1c1722653e1", alt: "Terracotta wide leg", badge: "" },
  { id: "1488716820095-cbe80883c496", alt: "SS26 campaign — terracotta", badge: "" },
  { id: "1541101767792-f9b2b1c4f127", alt: "Linen coat beige", badge: "" },
  { id: "1529903395622-cf2c3b9e1231", alt: "Bucket hat duo", badge: "" },
  { id: "1494790108377-be9c29b29330", alt: "Ivory button shirt", badge: "" },
  { id: "1509631179647-0177331693ae", alt: "SS26 Cargo short white", badge: "" },
  { id: "1445205170230-053b83016050", alt: "Archive — reef campaign", badge: "" },
];

export default function CollectionPage() {
  return (
    <>
      <section className="border-b border-ink/10 px-5 pb-10 pt-14 sm:px-13">
        <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-3">SS26 & Archive</p>
        <h1 className="display text-[clamp(40px,8vw,110px)] leading-[0.86]">
          Collec<span className="serif-i text-accent">tion</span>
        </h1>
      </section>

      {/* photo grid — masonry via CSS columns */}
      <section className="px-5 py-8 sm:px-13">
        <div className="columns-2 gap-x-[3px] sm:columns-3 lg:columns-4">
          {PHOTOS.map((p) => (
            <div key={p.id} className="relative mb-[3px] break-inside-avoid">
              <div
                className="w-full bg-gradient-to-br from-stone-200 to-stone-300"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${p.id}?w=800&fit=crop&auto=format)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  paddingBottom: "125%",
                }}
                role="img"
                aria-label={p.alt}
              />
              {p.badge === "SOLD OUT" && (
                <span className="mono absolute right-2 top-2 bg-ink px-2 py-1 text-[8px] tracking-[0.12em] text-bg">
                  SOLD OUT
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink/10 px-5 py-14 sm:px-13">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] leading-[1.7] text-ink-2 max-w-[52ch]">
            Want to wear these pieces? Browse the full ready-to-wear collection in our shop.
          </p>
          <Link href="/shop" className="btn btn--solid shrink-0">
            Shop all pieces
          </Link>
        </div>
      </section>
    </>
  );
}
