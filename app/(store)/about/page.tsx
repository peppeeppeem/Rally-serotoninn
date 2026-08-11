import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Movement",
  description: "Rally Movement — a Bangkok fashion house since 2017. Boldness, fluidity, movement.",
};

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="border-b border-ink/10 px-5 py-20 sm:px-13">
        <p className="mono mb-8 text-[10px] tracking-[0.2em] text-ink-3">The House · Est. 2017</p>
        <h1 className="display max-w-[14ch] text-balance text-[clamp(40px,8vw,110px)] leading-[0.86]">
          Two founders, one <span className="serif-i text-accent">movement</span>
        </h1>
        <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.75] text-ink-2">
          Rally Movement began in Bangkok as the shared vision of a creative duo — a belief that clothing and
          accessories should carry the same confidence as the people wearing them. Timeless yet modern, retro chic, and
          unafraid to blur the line between masculine and feminine.
        </p>
      </section>

      {/* stat band */}
      <div className="grid grid-cols-2 border-b border-ink/10 md:grid-cols-4">
        {[
          ["2017", "Founded · Bangkok"],
          ["Paragon", "Flagship Store"],
          ["Duo Tag", "Signature Icon"],
          ["Global", "Club21 · OEUVR · SASOM"],
        ].map(([n, l], i) => (
          <div key={l} className={`p-7 ${i < 3 ? "border-r border-ink/10" : ""} ${i < 2 ? "border-b border-ink/10 md:border-b-0" : ""}`}>
            <div className="display text-[clamp(22px,3vw,34px)]">{n}</div>
            <div className="mono mt-2 text-[8px] tracking-[0.12em] text-ink-3">{l}</div>
          </div>
        ))}
      </div>

      <Reveal>
        <section className="grid grid-cols-1 gap-10 px-5 py-16 sm:px-13 lg:grid-cols-[220px_1fr]">
          <div className="mono text-[9px] tracking-[0.18em] text-ink-3">Our Story</div>
          <div className="max-w-[62ch]">
            <p className="mb-5 text-[15px] leading-[1.8] text-ink-2">
              From a single bucket bag to a full house of ready-to-wear, the brand grew by staying close to its
              community and evolving with the next generation — boundary-pushing, but authentically itself.
            </p>
            <p className="mb-5 text-[15px] leading-[1.8] text-ink-2">
              The name says it plainly. To <span className="text-ink">rally</span> is to gather, to organize, to
              inspire — to bring everyday people together around a shared way of moving through the world.
            </p>
            <p className="text-[15px] leading-[1.8] text-ink-2">
              Three words hold it all together: <span className="text-ink">boldness, fluidity, movement</span>.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div id="campaign" className="relative mx-5 my-4 min-h-[480px] overflow-hidden sm:mx-13">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 66% 40%,rgba(232,67,47,.5) 0%,transparent 46%),radial-gradient(ellipse at 20% 66%,rgba(183,173,158,.34) 0%,transparent 44%),linear-gradient(158deg,#1A120C 0%,#0A0605 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-13">
            <div className="mono mb-3 text-[9px] tracking-[0.2em] text-whisper">Campaign · Movement Vol.9</div>
            <h2 className="display text-balance text-[clamp(36px,6vw,80px)] leading-[0.88] text-white">
              Made to <span className="serif-i text-accent">move</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[13.5px] leading-[1.7] text-white/60">
              Shot across Bangkok — Siam, Ekkamai, the night markets and the in-between.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="grid grid-cols-1 gap-[3px] bg-bg-2 px-5 py-16 sm:px-13 md:grid-cols-2">
          <div id="community" className="bg-bg p-8">
            <h3 className="display mb-3 text-[clamp(22px,3vw,32px)]">The Community</h3>
            <p className="max-w-[46ch] text-[14px] leading-[1.75] text-ink-2">
              Rally is a movement of people, not just product. Follow along on Instagram.
            </p>
            <a href="https://www.instagram.com/rallymovement/" target="_blank" rel="noopener noreferrer" className="link-u mt-5 inline-block">
              @rallymovement →
            </a>
          </div>
          <div id="careers" className="bg-bg p-8">
            <h3 className="display mb-3 text-[clamp(22px,3vw,32px)]">Join the House</h3>
            <p className="max-w-[46ch] text-[14px] leading-[1.75] text-ink-2">
              We&apos;re always looking for people who move with intention — design, retail, and studio roles in Bangkok.
            </p>
            <Link href="/stores" className="link-u mt-5 inline-block">Get in touch →</Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
