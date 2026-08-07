# MAISON — Luxury Fashion E-Commerce (Prototype)

A high-fidelity, interactive prototype of a **custom** luxury fashion
e-commerce experience — built to demonstrate what a bespoke platform (not
Shopify/Wix/Squarespace) can look and feel like.

> **MAISON is a placeholder brand.** Name, wordmark, palette, fonts and
> photography are all temporary and designed to be swapped in minutes — see
> _Rebranding_ below. Design references (Louis Vuitton, Hermès) informed the
> **level of polish only**; nothing was copied.

---

## 1. Running locally

**Requirements:** Node 18.18+ (built on Node 24), npm.

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. No database, API keys, or `.env` file is
required for the prototype — all data is mocked.

Other scripts:

```bash
npm run build      # production build (verifies all 46 routes compile)
npm run start      # serve the production build
npm run typecheck  # strict TypeScript check (passes clean)
npm run lint       # Next.js lint
```

### Pages to show in the meeting

| Experience | URL |
|---|---|
| Homepage (hero, editorial, lookbook) | `/` |
| Shop with filters & sort | `/shop` |
| Product detail (gallery zoom, variants) | `/products/signature-wool-coat` |
| Collections | `/collections` → `/collections/autumn-atelier` |
| Women / Men | `/women` · `/men` |
| Cart page (+ slide-in drawer from bag icon) | `/cart` |
| Checkout (Stripe-inspired, mocked) | `/checkout` |
| Brand story / About | `/about` · `/story` |
| Customer account | `/account` |
| Wishlist | `/wishlist` |
| **Search** | click the search icon (full-screen overlay) |
| **Admin console concept** | `/admin` |

Tip: add a couple of items to the bag first so `/cart` and `/checkout`
have content to present.

---

## 2. Project structure

```
src/
  app/
    layout.tsx              # <html>, fonts, StoreProvider (global)
    globals.css             # design tokens + component/utility layers
    loading.tsx             # elegant route-transition state
    not-found.tsx           # branded 404
    api/newsletter/route.ts # sample endpoint (validates + 200)
    (store)/                # STOREFRONT route group (shares header/footer)
      layout.tsx            # Header, Footer, CartDrawer, SearchOverlay
      page.tsx              # Homepage
      shop, new-arrivals, women, men,
      collections/[slug], products/[slug],
      cart, checkout, wishlist, account,
      about, story, contact, faq,
      shipping, returns, privacy, terms
    admin/                  # ADMIN route group (own dark chrome, no store nav)
      layout.tsx            # sidebar + prototype banner
      page.tsx              # dashboard (KPIs, revenue chart, recent orders)
      products, orders, customers, inventory,
      collections, discounts, content, analytics
  components/
    layout/    Header (mega-menu + mobile drawer), Footer, Prose
    home/      Hero, EditorialSection, Lookbook
    product/   ProductCard, ProductGrid, ProductGallery,
               ProductPurchasePanel, WishlistButton, SizeGuide
    shop/      CollectionHeader, ShopClient (filters/sort)
    cart/      CartDrawer, CartItem
    search/    SearchOverlay
    admin/     AdminSidebar, ui (PageHeader/StatusBadge/Card/Table)
    providers/ StoreProvider (cart + wishlist + overlays)
    ui/        icons, Reveal (scroll animation), Accordion, SectionHeading
    marketing/ NewsletterForm
  lib/
    site.ts             # brand + navigation config (single source of truth)
    fonts.ts            # next/font wiring
    utils.ts            # cn(), formatPrice(), slugify()
    mock/products.ts    # verified catalog + editorial imagery + helpers
    mock/admin.ts       # dashboard sample data
prisma/schema.prisma    # PRODUCTION database schema (design, not yet wired)
```

> **Note:** `prisma/schema.prisma`, `.env.example`, and `next.config.ts`
> security headers were authored during the initial production-architecture
> phase. They are the blueprint for turning this prototype into the full
> platform and are intentionally kept in the repo.

### Design system

All visual decisions live as CSS custom properties in
[`globals.css`](src/app/globals.css) under `@theme` — palette, type scale,
tracking, easing, durations. Components consume the tokens, so the entire
look changes from that one block.

- **Type:** Cormorant Garamond (display serif) + Jost (sans) via `next/font`.
- **Palette:** warm paper `#f6f4f0`, ink `#1a1817`, hairline `#ddd8d0`,
  muted bronze accent, restrained terracotta for sale prices.
- **Motion:** slow, eased entrance + scroll reveals; fully gated by
  `prefers-reduced-motion`.

---

## 3. What is currently mocked

Everything is front-end only. Specifically mocked / simulated:

- **Catalog** — `src/lib/mock/products.ts` (12 products, variants, galleries).
  Images are neutral editorial photography from Unsplash (every URL verified
  to load), used purely as placeholders.
- **Cart & wishlist** — real, interactive state in `StoreProvider`, persisted
  to `localStorage`. Not yet server-backed.
- **Checkout** — full visual flow with a Stripe-inspired payment section.
  **No payment is processed**; "Place Order" shows a confirmation screen.
- **Customer account** — illustrative profile, orders, addresses, preferences.
  No real authentication.
- **Admin console** — sample KPIs, orders, customers, inventory, discounts,
  content, analytics. Not connected to a database.
- **Search** — client-side filtering over the mock catalog.
- **Newsletter** — validates the email and returns success; does not persist.

Nothing sensitive is stored, and no external service is called (except image
CDN delivery).

---

## 4. What must be connected for production

The prototype's architecture maps cleanly onto the production plan already
captured in `prisma/schema.prisma` and `.env.example`:

| Area | Prototype today | Production wiring |
|---|---|---|
| Database | mock TS files | PostgreSQL via **Prisma** (`schema.prisma` ready) |
| Auth | none | **Auth.js (NextAuth v5)** — customer + admin RBAC |
| Payments | mocked UI | **Stripe** Payment Intents + signature-verified webhooks (order marked paid only by webhook) |
| Cart/Wishlist | localStorage | server cart service + session/user linkage |
| Inventory | pseudo values | transactional stock decrement to prevent overselling |
| Images | Unsplash | client photography via **Cloudinary / S3 + CDN** |
| Email | none | **Resend** transactional emails (order, shipping, etc.) |
| Search | client filter | Postgres full-text (or Meilisearch/Typesense at scale) |
| Content/CMS | mock config | `ContentBlock`/`Faq` tables editable in admin |
| Analytics | none | GA4 / GTM / Meta Pixel via env-configured IDs |
| Shipping | flat rates | Shippo/EasyPost adapter |
| Hosting | local | Vercel (or Docker to any host) — client owns all accounts |

Security scaffolding already present: strict security headers in
`next.config.ts`, `poweredByHeader` off, `.env` git-ignored, admin routes set
to `noindex`.

---

## 5. Information still needed from the client

1. **Brand identity** — final name, logo/wordmark, colors, fonts, tone.
2. **Product photography** — the single biggest driver of luxury feel.
3. **Catalog scope** — number of products/categories at launch.
4. **Markets** — countries shipped to, currencies, languages.
5. **Payments** — cards only, or Apple/Google Pay, Klarna, etc.?
6. **Tax** — Stripe Tax vs. manual rates.
7. **Shipping** — carrier(s), zones, rates, free-shipping threshold.
8. **Policies** — returns window, privacy/terms (legal copy).
9. **Feature scope for v1** — reviews? gift cards? loyalty? accounts required
   or guest checkout? personal-shopping/appointments?
10. **Legal entity** — company name/address for footer and policy pages.

---

## 6. Recommended next steps (prototype → production)

1. **Client sign-off** on this prototype + answers to Section 5.
2. **Apply real branding** (tokens in `globals.css`, `site.ts`, fonts) and
   ingest the client's photography via the image CDN.
3. **Stand up the database** — provision Postgres, run the Prisma migrations,
   seed the real catalog; replace `lib/mock/*` reads with catalog services.
4. **Authentication & accounts** — Auth.js with customer + admin RBAC.
5. **Cart & checkout backend** — server cart, Stripe Payment Intents, and
   **webhook-verified** order creation with transactional inventory.
6. **Transactional email** (Resend) for the full order lifecycle.
7. **Admin write operations** — connect the console screens to real CRUD with
   audit logging.
8. **SEO & analytics** — structured data, sitemap/robots, GA4/GTM/Pixel.
9. **Testing & hardening** — Vitest + Playwright on cart/checkout/webhooks;
   rate limiting, full CSP, Sentry.
10. **Deploy** to the client-owned infrastructure and connect the domain.

---

### Rebranding in 3 places

1. `src/lib/site.ts` — name, tagline, nav, footer.
2. `src/app/globals.css` (`@theme`) — palette + type scale.
3. `src/lib/fonts.ts` — swap the two typefaces.

Replace the Unsplash URLs in `src/lib/mock/products.ts` with the client's
photography (or, in production, the CDN-backed catalog) and the transformation
is complete.
