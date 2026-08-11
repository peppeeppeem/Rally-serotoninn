import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stockists — Rälly Movement",
  description: "Find Rälly Movement at Siam Paragon, Siam Discovery, Flat no.8, OOTD Chiang Mai, and Solid State Bangkok.",
};

const STORES = [
  { name: "Siam Paragon", floor: "1st Floor", address: "991 Rama I Rd, Pathum Wan, Bangkok 10330", hours: "Open Daily 10AM – 10PM", contact: null, note: null, photo: "1567401893414-76b7b1e5a7a5", mapCenter: [13.7463, 100.5347] },
  { name: "Siam Discovery", floor: "G Floor", address: "194 Phaya Thai Rd, Pathum Wan, Bangkok", hours: "Open Daily 10AM – 10PM", contact: null, note: null, photo: "1441986300917-64674bd600d8", mapCenter: [13.7459, 100.5296] },
  { name: "Flat no.8", floor: "G/F Gaysorn Village", address: "999 Phloen Chit Road, Lumphini, Pathum Wan District, Bangkok", hours: "Open Daily 11AM – 9PM", contact: null, note: null, photo: "1558769132-cb1aea458c5e", mapCenter: [13.7438, 100.5414] },
  { name: "OOTD", floor: "Outfit Of The Day", address: "Nimmanhaemin Soi 1, Chiang Mai, Thailand", hours: "Open Daily 11AM – 8PM", contact: null, note: null, photo: "1507003211169-0a1dd7228f2d", mapCenter: [18.7958, 98.9673] },
  { name: "Solid State", floor: "Appointment required", address: "211 Ratchadaphisek Rd, Din Daeng, Bangkok", hours: "Weekdays 10:30AM – 7PM · Weekends 11AM – 7PM", contact: "0906469196", note: "Please call ahead or book via Instagram DM.", photo: "1555529669-e69e7aa0ba9a", mapCenter: [13.7726, 100.5601] },
];

function MapPlaceholder({ name }: { name: string }) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden bg-[#1a1a1a] sm:h-[240px]">
      <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${name}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#555" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${name})`} />
        <line x1="0" y1="80" x2="100%" y2="140" stroke="#444" strokeWidth="2" />
        <line x1="0" y1="140" x2="100%" y2="80" stroke="#3a3a3a" strokeWidth="1.5" />
        <line x1="30%" y1="0" x2="50%" y2="100%" stroke="#444" strokeWidth="1.5" />
        <line x1="70%" y1="0" x2="55%" y2="100%" stroke="#3a3a3a" strokeWidth="1" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill="#F9544C" />
          <circle cx="14" cy="14" r="6" fill="white" />
        </svg>
      </div>
      <span className="absolute bottom-1.5 left-2 font-medium text-[10px] text-white/30 select-none">Google</span>
    </div>
  );
}

export default function StockistsPage() {
  return (
    <>
      <section className="border-b border-ink/10 px-5 py-16 sm:px-13">
        <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-3">Find Us</p>
        <h1 className="display text-[clamp(40px,8vw,110px)] leading-[0.86]">
          Stock<span className="serif-i text-accent">ists</span>
        </h1>
      </section>

      <nav className="sticky top-16 z-30 flex items-center gap-4 overflow-x-auto border-b border-ink/10 bg-bg/95 px-5 py-3 backdrop-blur sm:px-13">
        {STORES.map((s) => (
          <a key={s.name} href={`#${s.name.toLowerCase().replace(/\s+/g, "-")}`} className="mono whitespace-nowrap text-[9px] tracking-[0.1em] text-ink-3 transition-colors hover:text-accent">
            {s.name}
          </a>
        ))}
      </nav>

      {STORES.map((s) => (
        <section key={s.name} id={s.name.toLowerCase().replace(/\s+/g, "-")} className="border-b border-ink/10 px-5 py-16 sm:px-13">
          <div className="mx-auto max-w-2xl">
            <h2 className="display mb-8 text-center text-[clamp(32px,5vw,60px)] font-semibold leading-[0.9]">{s.name}</h2>
            <MapPlaceholder name={s.name} />
            <div className="mt-5 text-center">
              <p className="text-[14px] font-medium">{s.floor}</p>
              <p className="mt-1 text-[14px] text-ink-2">{s.address}</p>
            </div>
            <hr className="my-8 border-accent/40" />
            <div className="text-center">
              <h3 className="display mb-3 text-[20px] font-semibold">Opening Times</h3>
              <p className="text-[14px] text-ink-2">{s.hours}</p>
              {s.contact && (
                <p className="mono mt-2 text-[11px] tracking-[0.1em] text-ink-3">
                  Contact: <a href={`tel:${s.contact}`} className="text-ink hover:text-accent">{s.contact}</a>
                </p>
              )}
              {s.note && <p className="mono mt-1 text-[9px] tracking-[0.08em] text-ink-3">{s.note}</p>}
            </div>
            <div
              className="mt-8 aspect-[4/3] w-full bg-gradient-to-br from-stone-200 to-stone-300"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-${s.photo}?w=1200&fit=crop&auto=format)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              role="img"
              aria-label={`${s.name} store`}
            />
          </div>
        </section>
      ))}

      <section className="px-5 py-14 sm:px-13">
        <div className="flex flex-col gap-4 text-[14px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mono mb-3 text-[10px] tracking-[0.16em] text-ink-2">Get in Touch</p>
            <p>Customer care — <a href="mailto:care@rallymovement.com" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">care@rallymovement.com</a></p>
            <p className="mt-2">Wholesale &amp; press — <a href="mailto:studio@rallymovement.com" className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-accent">studio@rallymovement.com</a></p>
          </div>
          <div className="flex gap-2">
            {[["Instagram", "https://www.instagram.com/rallymovement/"],["Facebook", "https://www.facebook.com/rallymovementbkk/"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="mono border border-ink/15 px-3 py-2 text-[9px] tracking-[0.12em] text-ink-2 transition-colors hover:border-accent hover:text-accent">{label}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
