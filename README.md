# Rally Movement — Storefront + Admin

A full-stack e-commerce web app for **Rally Movement**, the Bangkok fashion house
(bags & ready-to-wear, est. 2017). Editorial storefront + a back-office admin,
built with the *Boldness · Fluidity · Movement* identity and referencing the
immersive, dark-editorial direction of serotoninn.com.

> **Design note:** all brand colors live in **one place** — `app/globals.css`
> (the `:root` token block). To match the client's real rallymovement.com palette,
> edit `--accent` and the ground/ink tokens there; the whole site reskins from it.

## Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS** — colors driven by CSS variables (single-file reskin)
- **Prisma + SQLite** — products, colorways/stock, orders

## Getting started

```bash
npm install
npm run setup      # prisma generate + db push + seed catalogue
npm run dev        # http://localhost:3000
```

Other scripts:

| script            | what it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run build`   | production build (`prisma generate` + `next build`) |
| `npm run db:seed` | re-seed the catalogue                         |
| `npm run db:reset`| wipe + re-seed the database                   |

## Structure

```
app/
  (store)/            storefront (shares header, cart drawer, footer)
    page.tsx          home — editorial hero, The Bag spotlight, manifesto, campaign
    shop/             product grid + category/sale filters
    product/[slug]/   PDP — gallery, colorway select, add to bag
    cart/  checkout/  order/[number]/   cart → checkout → confirmation
    about/  stores/   brand story + stockists
  admin/              back office (own shell, noindex)
    page.tsx          dashboard — revenue, stock, low-stock, recent orders
    products/         list · edit (price/stock/badge/visibility) · new
    orders/           list · detail + status control
    actions.ts        server actions (product & order mutations)
  api/
    checkout/         creates orders (server-side price recompute + stock decrement)
    subscribe/        newsletter (demo)
components/           SiteHeader, CartDrawer, ProductCard, ProductBuy, Ticker, …
lib/                  db (Prisma), cart (context), promo, format
prisma/               schema + seed (real Rally catalogue)
```

## Storefront highlights

- Editorial hero with the brand thesis and the signature **Rally The Bag**.
- Live product data from the database; `New In` rail, collections, campaign.
- Slide-out **cart drawer** with free-shipping progress, promo codes
  (`WELCOME10`, `RALLY15`, `MOVEMENT`), persisted to `localStorage`.
- Checkout that recomputes every price on the server and decrements stock
  atomically — the client is never trusted for pricing.

## Admin backend

- Dashboard KPIs (revenue, active products, units in stock, low-stock alerts).
- Product management: edit price, sale price, badge, description, per-colorway
  stock, featured/visibility; create new products.
- Order management: full list, per-order detail, and status workflow
  (pending → paid → shipped → delivered / cancelled).
- Reachable at **`/admin`**. _No auth yet — add authentication before production._

## Placeholders / next steps

- Product/campaign art is CSS gradient placeholder; swap for real photography
  (Unsplash mockups or the client's shots) — `Image` remote patterns already allow Unsplash.
- Apply the client's exact brand colors to the tokens in `app/globals.css`.
- Add admin authentication and a real payment provider before launch.
