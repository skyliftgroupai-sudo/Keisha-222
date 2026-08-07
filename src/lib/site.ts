/**
 * Central brand & navigation configuration.
 * Change the brand identity here; the whole site follows.
 * (In production, navigation and brand copy become CMS-editable — see M6.)
 */
export const site = {
  name: process.env.BRAND_NAME ?? "MAISON",
  tagline: "Considered luxury, quietly made.",
  description:
    "A house of refined ready-to-wear and accessories. Enduring materials, restrained design, made to last.",
  url: process.env.APP_URL ?? "http://localhost:3000",
  email: "clientservices@example.com",
  currency: "USD",
  locale: "en-US",
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: { label: string; href: string; children?: NavLink[] }[] = [
  {
    label: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All", href: "/shop" },
      { label: "Ready-to-Wear", href: "/shop?category=ready-to-wear" },
      { label: "Outerwear", href: "/shop?category=outerwear" },
      { label: "Knitwear", href: "/shop?category=knitwear" },
      { label: "Accessories", href: "/shop?category=accessories" },
      { label: "Leather Goods", href: "/shop?category=leather-goods" },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Women",
    href: "/women",
  },
  {
    label: "Men",
    href: "/men",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Client Services",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "About", href: "/about" },
      { label: "Brand Story", href: "/story" },
      { label: "Collections", href: "/collections" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];
