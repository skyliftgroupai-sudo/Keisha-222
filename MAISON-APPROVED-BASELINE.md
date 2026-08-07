# MAISON — APPROVED BASELINE — ORIGINAL DESIGN

This document records the **client-approved baseline** of the MAISON luxury
e-commerce prototype. It is a recoverable checkpoint of the exact code that
produces the current website. **Do not overwrite or delete this checkpoint.**

---

## Version

| | |
|---|---|
| **Version name** | MAISON — APPROVED BASELINE — ORIGINAL DESIGN |
| **Date / time** | 2026-08-07 14:24 (-0400) |
| **Git tag** | `approved-baseline-original-design` |
| **Commit hash** | `44a4244d7b36321dabe30c05bf7260e3e3b5d878` (short `44a4244`) |
| **Branch** | `master` |
| **Independent backup** | `../MAISON-approved-baseline.bundle` (Git bundle, on the Desktop, one level above the project) |

Confirm the tag/hash at any time:

```bash
git rev-parse approved-baseline-original-design^{commit}
git show approved-baseline-original-design --stat
```

---

## How to restore this exact version

You have three independent ways to recover the approved design.

### A. Inspect or experiment safely (keeps history)
Create a working branch from the baseline — your current work is untouched:

```bash
git checkout -b restore-baseline approved-baseline-original-design
```

### B. Hard-reset the current branch back to the baseline
Use this to discard later experiments and return `master` to exactly this state:

```bash
git checkout master
git reset --hard approved-baseline-original-design
```

### C. Restore from the standalone bundle (if the repo is lost entirely)
The bundle on the Desktop contains the full history and the tag:

```bash
git clone "C:/Users/ALL Atoz/Desktop/MAISON-approved-baseline.bundle" MAISON-restored
cd MAISON-restored
git checkout approved-baseline-original-design
```

After any restore, reinstall dependencies and run (see below).

---

## How to run this version locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

- No `.env`, database, or API keys are required — all data is mocked.
- Do **not** run `npm run build` while `npm run dev` is running; the build
  clears `.next` and breaks the live dev server. Stop dev first, or use a
  separate checkout.

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`,
`npm run lint`.

---

## Important dependencies

Pinned in `package.json` / locked in `package-lock.json` (committed):

- **next** 15.1.6, **react** / **react-dom** 19.0.0, **typescript** 5.7 (strict)
- **tailwindcss** v4 + `@tailwindcss/postcss`
- **framer-motion**, **clsx**, **tailwind-merge**, **zod**
- **@prisma/client** / **prisma** (schema only — not wired in the prototype)
- Node **24.18.0** (built/verified on this version)
- Fonts via `next/font/google` — **Cormorant Garamond** (display) + **Jost**
  (sans); fetched at build, no local font files.
- Imagery: **verified Unsplash URLs** (remote placeholders — no local image
  assets). Requires internet at runtime to display photography.

---

## Current pages / components

### Storefront routes — `src/app/(store)/`
`/` (home) · `/shop` · `/new-arrivals` · `/women` · `/men` · `/collections`
· `/collections/[slug]` · `/products/[slug]` · `/cart` · `/checkout` ·
`/wishlist` · `/account` · `/about` · `/story` · `/contact` · `/faq` ·
`/shipping` · `/returns` · `/privacy` · `/terms`

### Admin console — `src/app/admin/`
`/admin` (dashboard) · `/products` · `/orders` · `/customers` · `/inventory`
· `/collections` · `/discounts` · `/content` · `/analytics`

### Key components — `src/components/`
- layout: `Header`, `Footer`, `MobileMenu`, `Prose`
- home: `Hero`, `EditorialSection`, `Lookbook`
- product: `ProductCard`, `ProductGrid`, `ProductGallery`,
  `ProductPurchasePanel`, `WishlistButton`, `SizeGuide`
- shop: `CollectionHeader`, `ShopClient` (filters/sort)
- cart: `CartDrawer`, `CartItem`
- search: `SearchOverlay`
- admin: `AdminSidebar`, `ui` (PageHeader/StatusBadge/Card/Table)
- providers: `StoreProvider` (cart + wishlist + single overlay state)
- ui: `Overlay` (mount/unmount overlay primitive), `Reveal`, `Accordion`,
  `SectionHeading`, `icons`
- marketing: `NewsletterForm`

### Data & config — `src/lib/`
`site.ts` (brand + nav) · `fonts.ts` · `utils.ts` · `mock/products.ts` ·
`mock/admin.ts`. Design tokens live in `src/app/globals.css` (`@theme`).

---

## Current design characteristics

- **Aesthetic:** restrained "quiet luxury" — warm paper `#f6f4f0`, ink
  `#1a1817`, hairline `#ddd8d0`, muted bronze accent, terracotta sale price.
- **Typography:** Cormorant Garamond display serif + Jost sans; wide
  letter-spaced uppercase eyebrows; fluid clamp-based type scale.
- **Layout:** `container-lux` max-width (90rem) with responsive padding;
  generous whitespace; normal document flow for all sections.
- **Motion:** slow eased entrance + scroll reveals; hover image swaps; gated by
  `prefers-reduced-motion`.
- **Overlays:** search / cart / mobile-menu are mutually exclusive, mount on
  open and **unmount on close** (a single `Overlay` primitive + one overlay
  state), with central scroll-lock and Escape/backdrop close.
- **Responsive:** verified with no horizontal overflow at 1440 / 768 / 390 px;
  intentional mobile navigation and shop filter drawer.
- **State of implementation:** front-end prototype; payments, auth, inventory
  and search are mocked (see `README.md` and `ARCHITECTURE.md`).

---

## Visual reference

See `design-snapshots/original-approved/` for textual content/structure
snapshots of the approved design and instructions for capturing pixel
screenshots.
