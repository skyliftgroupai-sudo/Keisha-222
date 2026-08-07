# MAISON — Architecture (Production Blueprint)

This prototype is deliberately structured so it can grow into the full custom
platform without a rewrite. This document is the target architecture; the
prototype implements the front-end and the data/domain shape.

## Stack

- **Next.js 15 (App Router) + React 19 + TypeScript (strict)** — one deployable
  modular monolith. Server Components render catalog/marketing pages with
  minimal client JS; interactivity (cart, gallery, search, animations) is
  isolated to client components.
- **Tailwind CSS v4** with a token-driven design system (`globals.css @theme`).
- **PostgreSQL + Prisma** — see `prisma/schema.prisma`.
- **Auth.js (NextAuth v5)** — sessions, customer + admin roles (RBAC).
- **Stripe** — Payment Intents; orders confirmed only via verified webhooks.
- **Resend** — transactional email. **Cloudinary/S3+CDN** — imagery.
- **Vitest + Playwright** — unit + E2E on critical flows.

### Why a monolith (not microservices / separate backend)

At launch scale it maximizes ownership and performance while minimizing
operational surface. The domain is split into `lib/services/*` so any part
(e.g. search) can be extracted later, and the same service layer can back a
future B2B portal or native app via a versioned API.

## Route architecture

- `app/(store)/*` — customer storefront; shares `Header/Footer/CartDrawer/SearchOverlay`.
- `app/admin/*` — admin console; separate chrome, `noindex`, RBAC-guarded in production.
- `app/api/*` — route handlers (webhooks, newsletter, etc.).

## Data model (see `prisma/schema.prisma`)

Normalized, money stored in integer cents. Key entities: `User`/`Role`,
`Product`/`ProductVariant`/`ProductImage`, `Category`/`Collection`/`Tag`,
`Inventory` (separate lockable rows), `Cart`/`CartItem`, `Order`/`OrderItem`/
`OrderEvent`, `Payment` (Stripe refs only), `WebhookEvent` (idempotency),
`Shipment`, `Address`, `Wishlist`, `Coupon`, `ContentBlock`/`Faq`/`Media`,
`AuditLog`.

## Critical production concerns (already designed for)

1. **No overselling** — decrement stock in a DB transaction with row locking;
   reserve on payment-intent creation with a TTL.
2. **Never trust the client for payment** — order is marked `PAID` only by the
   signature-verified Stripe webhook, deduped via `WebhookEvent`.
3. **Never store card data** — Stripe holds it; we keep references only.
4. **RBAC** enforced in middleware *and* service layer; sensitive admin actions
   are audit-logged.
5. **Secrets** — env-only, validated at boot; nothing sensitive in `NEXT_PUBLIC_`.
6. **Performance** — RSC + `next/image` + font subsetting + strict client-JS
   budget for strong Core Web Vitals.

## Third-party services (client owns every account)

Stripe (payments) · Resend (email) · Cloudinary or S3+CDN (images) ·
Managed Postgres (Neon/Supabase/RDS) · Vercel or Docker host · Sentry
(monitoring) · Shippo/EasyPost (shipping, when needed). Each sits behind an
adapter to avoid lock-in.
