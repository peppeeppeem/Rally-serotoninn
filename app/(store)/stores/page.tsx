import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stores & Stockists",
  description: "Find Rally Movement — flagship at Siam Paragon, Bangkok, plus global stockists.",
};

const STORES = [
  { name: "Siam Paragon — Flagship", detail: "M Floor, 991 Rama I Rd, Pathum Wan, Bangkok 10330", hours: "10:00–22:00 daily" },
  { name: "CentralWorld", detail: "2nd Floor, 999/9 Rama I Rd, Pathum Wan, Bangkok 10330", hours: "10:00–22:00 daily" },
  { name: "EmQuartier", detail: "Helix Quartier, Sukhumvit Rd, Watthana, Bangkok 10110", hours: "10:00–22:00 daily" },
];

const STOCKISTS = [
  ["Club21", "club21.com"],
  ["OEUVR", "oeuvrofficial.com"],
  ["SASOM", "sasom.co.th"],
  ["Lazada Official", "lazada.co.th"],
];

export default function StoresPage() {
  return (
    <>
      <section className="border-b border-ink/10 px-5 py-16 sm:px-13">
        <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-3">Find Us</p>
        <h1 className="display text-[clamp(40px,8vw,110px)] leading-[0.86]">
          Stores &amp; <span className="serif-i text-accent">stockists</span>
        </h1>
      </section>
      <section className="px-5 py-14 sm:px-13">
        <h2 className="mono mb-8 text-[10px] tracking-[0.16em] text-ink-2">Rälly Stores</h2>
        <div className="grid grid-cols-1 gap-[3px] bg-bg-2 md:grid-cols-3">
          {STORES.map((s) => (
            <div key={s.name} className="flex flex-col bg-bg p-7">
              <h3 className="display mb-3 text-[clamp(18px,2.4vw,24px)] leading-[0.95]">{s.name}</h3>
              <p className="mb-4 text-[13px] leading-[1.65] text-ink-2">{s.detail}</p>
              <p className="mono mt-auto text-[9px] tracking-[0.1em] text-ink-3">{s.hours}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-10 border-t border-ink/10 px-5 py-14 sm:px-13 lg:grid-cols-2">
        <div>
          <h2 className="mono mb-6 text-[10px] tracking-[0.16em] text-ink-2">Global Stockists</h2>
          <ul className="flex flex-col">
            {STOCKISTS.map(([name, site]) => (
              <li key={name} className="flex items-center justify-between border-b border-ink/10 py-4">
                <span className="text-[15px]">{name}</span>
                <span className="mono text-[10px] tracking-[0.1em] text-ink-3">{site}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mono mb-6 text-[10px] tracking-[0.16em] text-ink-2">Get in Touch</h2>
          <div className="flex flex-col gap-4 text-[14px] text-ink-2">
            <p>Customer care — <a href="mailto:care@rallymovement.com" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">care@rallymovement.com</a></p>
            <p>Wholesale &amp; press — <a href="mailto:studio@rallymovement.com" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">studio@rallymovement.com</a></p>
            <div className="mt-2 flex gap-2">
              {[["Instagram", "https://www.instagram.com/rallymovement/"],["Facebook", "https://www.facebook.com/rallymovementbkk/"]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="mono border border-ink/15 px-3 py-2 text-[9px] tracking-[0.12em] text-ink-2 transition-colors hover:border-accent hover:text-accent">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
