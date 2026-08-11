import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Mood board",
  description: "The Rälly mood — 1970s riviera, quiet cool, and sun-bleached retro glamour.",
};

const IMAGES: { src: string; caption: string; tall?: boolean }[] = [
  { src: "1502472584811-0a2f2feb8968", caption: "Riviera — 1971", tall: true },
  { src: "1520962880247-cfaf541c8724", caption: "Poolside" },
  { src: "1469334031218-e382a71b716b", caption: "Vogue — 1969" },
  { src: "1503342217505-b0a15ec3261c", caption: "Capri Hotel", tall: true },
  { src: "1485462537746-965f33f7f6a7", caption: "Sun & Silver" },
  { src: "1487222477894-8943e31ef7b2", caption: "Marseille — 2019" },
  { src: "1515372039744-b8f02a3ae446", caption: "Terrace" },
  { src: "1490481651871-ab68de25d43d", caption: "Take Away — 2021", tall: true },
  { src: "1496747611176-843222e1e57c", caption: "Groovy — 2019" },
];
const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export default function MoodBoardPage() {
  return (
    <>
      <section className="px-5 pb-8 pt-14 text-center sm:px-10">
        <p className="label mb-5 text-[10px] text-ink-3">The Rälly Mood</p>
        <h1 className="display text-[clamp(40px,8vw,104px)] font-semibold leading-[0.92]">
          Mood <span className="serif-i text-accent">board</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[14px] leading-[1.75] text-ink-2">
          1970s riviera, quiet cool, and sun-bleached retro glamour — the references behind the movement.
        </p>
      </section>

      <Reveal>
        <section className="columns-2 gap-3 px-5 pb-20 sm:px-10 md:columns-3 [&>*]:mb-3">
          {IMAGES.map((im, i) => (
            <figure key={i} className="break-inside-avoid">
              <div className={`relative w-full overflow-hidden bg-surface ${im.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                <Image src={U(im.src)} alt={im.caption} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover" />
              </div>
              <figcaption className="mt-1.5 text-[10px] italic text-ink-3">{im.caption}</figcaption>
            </figure>
          ))}
        </section>
      </Reveal>
    </>
  );
}
