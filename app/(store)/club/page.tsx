import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Club — Rälly Movement",
  description: "Meet the Rälly Club — a community of women styling our pieces their way.",
};

const MEMBERS = [
  { name: "Ondine Daisy", handle: "@ondinedaisy", wearing: "She's wearing the softest silk buttons blouse in arctic color!", photo: "1515886657613-9f3515b0c78f", span: "row-span-2" },
  { name: "Yam M.", handle: "@yammatira", wearing: "She's wearing our sheet pants from 2019 collection.", photo: "1469334031218-e382a71b716b", span: "row-span-2" },
  { name: "Linn M.", handle: "@linnmashannoad", wearing: "She's wearing our Multi-colors jacket from 2019 collection.", photo: "1517841905240-472988babdf9", span: "row-span-2" },
  { name: "Jaja J.", handle: "@j_aja", wearing: "She's wearing our Multi-colors jacket & Rälly Blazers.", photo: "1494790108377-be9c29b29330", span: "" },
  { name: "Nathalie D.", handle: "@linnmashannad", wearing: "She's wearing our Multi-colors jacket from 2019 collection.", photo: "1531746020798-e6953c6e8e04", span: "row-span-2" },
  { name: "Teoy J.", handle: "@toeyjarinporn", wearing: "She's wearing the softest silk buttons blouse!", photo: "1524504388940-b1c1722653e1", span: "" },
  { name: "Ann M.", handle: "@annmuangsiri", wearing: "She's wearing our Multi-colors jacket to work on set.", photo: "1488716820095-cbe80883c496", span: "" },
  { name: "Alyssa C.", handle: "@alyssainthecity", wearing: "She's wearing our Multi-colors jacket from 2019 collection.", photo: "1541101767792-f9b2b1c4f127", span: "row-span-2" },
  { name: "Mia T.", handle: "@mia.bkk", wearing: "She's wearing the Athena Midi Dress in Ivory.", photo: "1529903395622-cf2c3b9e1231", span: "" },
];

const LETTERS = ["R", "Ä", "L", "L", "Y", "C", "L", "U", "B"];

const gradients = [
  "from-rose-900 to-stone-800", "from-amber-900 to-stone-900", "from-teal-900 to-slate-800",
  "from-violet-900 to-stone-900", "from-emerald-900 to-stone-800", "from-red-900 to-stone-900",
  "from-sky-900 to-slate-800", "from-pink-900 to-stone-900", "from-orange-900 to-stone-800",
];

export default function ClubPage() {
  return (
    <>
      {/* hero */}
      <section className="border-b border-ink/10 px-5 pb-10 pt-14 sm:px-13">
        <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-3">Community</p>
        <h1 className="display text-[clamp(40px,8vw,110px)] leading-[0.86]">
          Rälly <span className="serif-i text-accent">Club</span>
        </h1>
        <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.7] text-ink-2">
          Real women. Real style. Our community wears Rälly their own way — on set, at dinner, in the streets of Bangkok and beyond.
        </p>
      </section>

      {/* mosaic */}
      <section className="px-5 py-10 sm:px-13">
        {/* letter band */}
        <div className="mb-10 flex gap-[3px] overflow-hidden">
          {LETTERS.map((l, i) => (
            <div key={i} className={`flex h-14 flex-1 items-center justify-center bg-gradient-to-br ${gradients[i]} sm:h-20`}>
              <span className="display text-[clamp(24px,4vw,48px)] font-semibold text-white">{l}</span>
            </div>
          ))}
        </div>

        {/* member grid */}
        <div className="grid grid-cols-2 gap-[3px] bg-bg-2 sm:grid-cols-3 lg:grid-cols-4">
          {MEMBERS.map((m) => (
            <div key={m.handle} className={`flex flex-col bg-bg ${m.span}`}>
              <div
                className={`w-full bg-gradient-to-br from-stone-200 to-stone-300 ${m.span === "row-span-2" ? "aspect-[3/4]" : "aspect-square"}`}
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${m.photo}?w=600&fit=crop&auto=format)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={m.name}
              />
              <div className="flex flex-col gap-1 p-4">
                <p className="text-[13px] font-semibold leading-tight">{m.name}</p>
                <p className="mono text-[9px] tracking-[0.1em] text-accent">{m.handle}</p>
                <p className="mt-1 text-[11px] leading-[1.6] text-ink-2">{m.wearing}</p>
              </div>
            </div>
          ))}

          {/* decorative tiles */}
          <div className="flex items-center justify-center bg-ink aspect-square">
            <span className="serif-i text-[clamp(48px,6vw,80px)] text-bg opacity-20 select-none">yes!</span>
          </div>
          <div className="flex flex-col items-start justify-end bg-ink p-6 aspect-square">
            <p className="display text-[clamp(40px,5vw,64px)] font-semibold text-bg leading-none">★</p>
            <p className="mono mt-3 text-[9px] tracking-[0.14em] text-bg/50 uppercase">Since 2017</p>
          </div>
        </div>
      </section>

      {/* join us */}
      <section className="border-t border-ink/10 py-20 text-center px-5">
        <h2 className="display mb-4 text-[clamp(48px,8vw,96px)] leading-[0.9]">
          Join <span className="serif-i text-accent">us!</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[44ch] text-[14px] leading-[1.7] text-ink-2">
          Tag <span className="font-medium text-ink">@rallymovement</span> or use <span className="font-medium text-ink">#rallymovement</span> to be featured.
        </p>
        <div className="flex justify-center gap-3">
          <a href="https://www.instagram.com/rallymovement/" target="_blank" rel="noopener noreferrer" className="btn btn--solid">Instagram</a>
          <Link href="/shop" className="btn btn--ghost">Shop the pieces</Link>
        </div>
      </section>
    </>
  );
}
