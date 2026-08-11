import Link from "next/link";

const COLS = [
  {
    head: "Shop",
    links: [
      ["New arrivals", "/shop"],
      ["Ready-to-Wear", "/shop?c=Ready-to-Wear"],
      ["Denim", "/shop?c=Denim"],
      ["Bags", "/shop?c=Bags"],
      ["Sale", "/shop?sale=1"],
    ],
  },
  {
    head: "The House",
    links: [
      ["The Movement", "/about"],
      ["Mood board", "/mood-board"],
      ["Stockists", "/stockists"],
      ["Club", "/club"],
      ["Careers", "/about#careers"],
    ],
  },
  {
    head: "Care",
    links: [
      ["Shipping", "/stores"],
      ["Returns", "/stores"],
      ["Size guide", "/stores"],
      ["FAQ", "/stores"],
      ["Contact", "/stores"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-bg-2 px-5 pb-9 pt-14 sm:px-10" role="contentinfo">
      <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="display mb-3 text-[34px] font-semibold leading-none">Rälly</div>
          <p className="mb-5 max-w-[30ch] text-[12.5px] leading-relaxed text-ink-2">
            A Bangkok fashion house of ready-to-wear, denim &amp; the icon bags. Boldness, fluidity, movement —
            since 2017.
          </p>
          <div className="flex gap-2">
            {[
              ["Instagram", "https://www.instagram.com/rallymovement/"],
              ["Facebook", "https://www.facebook.com/rallymovementbkk/"],
              ["rallymovement.com", "https://www.rallymovement.com/"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="label border border-ink/20 px-2.5 py-1.5 text-[8px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.head}>
            <h4 className="label mb-4 text-[9px] text-ink-3">{col.head}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[12.5px] text-ink-2 transition-colors hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
        <span className="label text-[8px] text-ink-3">© 2026 Rälly · Rally Movement Co., Ltd. — Bangkok</span>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <Link key={l} href="/stores" className="label text-[8px] text-ink-3 hover:text-ink-2">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
