/**
 * MOCK CATALOG — prototype data only.
 * Every image URL below was verified to return HTTP 200. In production this
 * data comes from the Postgres/Prisma catalog service (see ARCHITECTURE.md);
 * imagery is replaced by the client's own photography via the image CDN.
 */

export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  department: "women" | "men" | "unisex";
  priceCents: number;
  salePriceCents?: number;
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  care: string;
  /** images[0] = primary, images[1] = hover/secondary, rest = gallery */
  images: { url: string; alt: string }[];
  isNew?: boolean;
  isFeatured?: boolean;
};

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const APPAREL = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "p-wool-coat",
    slug: "signature-wool-coat",
    name: "Signature Wool Coat",
    category: "Outerwear",
    department: "women",
    priceCents: 89500,
    colors: [
      { name: "Camel", hex: "#b39a7c" },
      { name: "Charcoal", hex: "#3a3a3c" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "A refined expression of modern tailoring, cut from a soft double-faced wool with a gently structured shoulder and a fluid, floor-skimming line.",
    details: [
      "Softly structured shoulder",
      "Concealed front closure",
      "Welt pockets at hip",
      "Fully lined",
      "Model is 5'10\" and wears a size S",
    ],
    materials: "90% virgin wool, 10% cashmere. Lining: 100% viscose.",
    care: "Dry clean only. Store on a shaped hanger.",
    images: [
      { url: u("photo-1539533018447-63fcce2678e3"), alt: "Signature wool coat, front view" },
      { url: u("photo-1594633312681-425c7b97ccd1"), alt: "Signature wool coat, styled" },
      { url: u("photo-1485462537746-965f33f7f6a7"), alt: "Wool coat editorial detail" },
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p-silk-dress",
    slug: "tailored-silk-dress",
    name: "Tailored Silk Dress",
    category: "Ready-to-Wear",
    department: "women",
    priceCents: 69500,
    colors: [
      { name: "Ivory", hex: "#efe9de" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "A quietly powerful silhouette in fluid silk crêpe, darted for a precise waist and finished with a bias-cut skirt that moves with ease.",
    details: [
      "Bias-cut skirt",
      "Hidden side zip",
      "Darted waist",
      "Midi length",
    ],
    materials: "100% silk crêpe de chine.",
    care: "Dry clean only.",
    images: [
      { url: u("photo-1595777457583-95e059d581b8"), alt: "Tailored silk dress, front" },
      { url: u("photo-1550614000-4895a10e1bfd"), alt: "Silk dress, movement" },
      { url: u("photo-1485462537746-965f33f7f6a7"), alt: "Silk dress editorial" },
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p-leather-jacket",
    slug: "italian-leather-jacket",
    name: "Italian Leather Jacket",
    category: "Outerwear",
    department: "unisex",
    priceCents: 125000,
    colors: [
      { name: "Black", hex: "#1a1817" },
      { name: "Cognac", hex: "#8a5a34" },
    ],
    sizes: APPAREL,
    description:
      "Cut from supple Italian nappa, this jacket softens with wear to become entirely your own. A modern take on a timeless second skin.",
    details: [
      "Supple nappa leather",
      "Zip front",
      "Twin zip pockets",
      "Tonal topstitching",
    ],
    materials: "100% lambskin nappa leather. Lining: 100% cupro.",
    care: "Leather specialist clean only.",
    images: [
      { url: u("photo-1591047139829-d91aecb6caea"), alt: "Italian leather jacket, front" },
      { url: u("photo-1544022613-e87ca75a784a"), alt: "Leather jacket, styled" },
    ],
    isFeatured: true,
  },
  {
    id: "p-cashmere-knit",
    slug: "cashmere-oversized-knit",
    name: "Cashmere Oversized Knit",
    category: "Knitwear",
    department: "unisex",
    priceCents: 59500,
    colors: [
      { name: "Oat", hex: "#d8cdba" },
      { name: "Grey Melange", hex: "#9a9a97" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "An enveloping crewneck knitted from pure Mongolian cashmere in a relaxed, boyfriend proportion — the definition of quiet indulgence.",
    details: [
      "Dropped shoulder",
      "Ribbed trims",
      "Relaxed fit",
    ],
    materials: "100% grade-A Mongolian cashmere.",
    care: "Hand wash cold or dry clean. Dry flat.",
    images: [
      { url: u("photo-1520975954732-35dd22299614"), alt: "Cashmere oversized knit, folded" },
      { url: u("photo-1618354691373-d851c5c3a990"), alt: "Cashmere knit, worn" },
    ],
    isNew: true,
  },
  {
    id: "p-blazer",
    slug: "double-breasted-blazer",
    name: "Double-Breasted Blazer",
    category: "Ready-to-Wear",
    department: "men",
    priceCents: 105000,
    colors: [
      { name: "Navy", hex: "#25304a" },
      { name: "Charcoal", hex: "#3a3a3c" },
    ],
    sizes: APPAREL,
    description:
      "A sharply tailored double-breasted blazer in a fine Italian wool, balanced between formality and ease.",
    details: [
      "Peak lapel",
      "Six-button double-breasted front",
      "Double vent",
      "Half-canvas construction",
    ],
    materials: "100% super 120s wool.",
    care: "Dry clean only.",
    images: [
      { url: u("photo-1594633312681-425c7b97ccd1"), alt: "Double-breasted blazer, front" },
      { url: u("photo-1507003211169-0a1dd7228f2d"), alt: "Blazer, portrait" },
    ],
    isFeatured: true,
  },
  {
    id: "p-trouser",
    slug: "pleated-wool-trouser",
    name: "Pleated Wool Trouser",
    category: "Ready-to-Wear",
    department: "women",
    priceCents: 42000,
    colors: [
      { name: "Stone", hex: "#c9c1b2" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "High-waisted and elegantly pleated, these trousers fall in a clean column for a lengthening, considered line.",
    details: ["Double pleat", "High waist", "Pressed crease", "Side pockets"],
    materials: "98% wool, 2% elastane.",
    care: "Dry clean only.",
    images: [
      { url: u("photo-1473966968600-fa801b869a1a"), alt: "Pleated wool trouser" },
      { url: u("photo-1490114538077-0a7f8cb49891"), alt: "Trouser, styled" },
    ],
  },
  {
    id: "p-turtleneck",
    slug: "ribbed-turtleneck",
    name: "Ribbed Turtleneck",
    category: "Knitwear",
    department: "men",
    priceCents: 36000,
    salePriceCents: 29000,
    colors: [
      { name: "Black", hex: "#1a1817" },
      { name: "Ecru", hex: "#e3dccd" },
    ],
    sizes: APPAREL,
    description:
      "A fine-gauge merino turtleneck with a close, refined fit — a foundational layer for the colder months.",
    details: ["Fine gauge", "Ribbed roll neck", "Slim fit"],
    materials: "100% extra-fine merino wool.",
    care: "Hand wash cold. Dry flat.",
    images: [
      { url: u("photo-1618354691373-d851c5c3a990"), alt: "Ribbed turtleneck" },
      { url: u("photo-1520975954732-35dd22299614"), alt: "Turtleneck detail" },
    ],
  },
  {
    id: "p-tote",
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    category: "Leather Goods",
    department: "women",
    priceCents: 189000,
    colors: [
      { name: "Tan", hex: "#a9805a" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: ["One Size"],
    description:
      "Hand-finished in structured calf leather, this tote is sized for the day and made to soften gracefully over years of use.",
    details: [
      "Full-grain calf leather",
      "Twin rolled handles",
      "Suede-lined interior",
      "Protective metal feet",
    ],
    materials: "100% calf leather. Lining: suede calf.",
    care: "Store in dust bag. Avoid prolonged moisture.",
    images: [
      { url: u("photo-1584917865442-de89df76afd3"), alt: "Structured leather tote" },
      { url: u("photo-1596755094514-f87e34085b2c"), alt: "Leather tote, carried" },
    ],
    isFeatured: true,
  },
  {
    id: "p-boot",
    slug: "suede-ankle-boot",
    name: "Suede Ankle Boot",
    category: "Footwear",
    department: "women",
    priceCents: 78000,
    colors: [
      { name: "Taupe", hex: "#9c8a76" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    description:
      "A sculpted ankle boot in Italian suede set on a covered block heel — refined enough for evening, easy enough for every day.",
    details: ["Block heel, 65mm", "Leather sole", "Almond toe"],
    materials: "Upper: Italian suede. Sole: leather.",
    care: "Use a suede brush. Protect from rain.",
    images: [
      { url: u("photo-1543163521-1bf539c55dd2"), alt: "Suede ankle boot" },
      { url: u("photo-1524504388940-b1c1722653e1"), alt: "Ankle boot, styled" },
    ],
    isNew: true,
  },
  {
    id: "p-column-dress",
    slug: "silk-column-dress",
    name: "Silk Column Dress",
    category: "Ready-to-Wear",
    department: "women",
    priceCents: 115000,
    salePriceCents: 89000,
    colors: [
      { name: "Champagne", hex: "#d9c9a8" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "A floor-length column in liquid silk satin, cut on the bias to trace the body with understated glamour.",
    details: ["Bias cut", "Cowl back", "Floor length"],
    materials: "100% silk satin.",
    care: "Dry clean only.",
    images: [
      { url: u("photo-1595777457583-95e059d581b8"), alt: "Silk column dress" },
      { url: u("photo-1550614000-4895a10e1bfd"), alt: "Column dress, movement" },
    ],
    isFeatured: true,
  },
  {
    id: "p-crewneck",
    slug: "merino-crewneck",
    name: "Merino Crewneck",
    category: "Knitwear",
    department: "men",
    priceCents: 34000,
    colors: [
      { name: "Forest", hex: "#3c4a3a" },
      { name: "Navy", hex: "#25304a" },
      { name: "Grey", hex: "#9a9a97" },
    ],
    sizes: APPAREL,
    description:
      "An everyday essential in breathable extra-fine merino, finished with clean ribbed trims and a neat crew neckline.",
    details: ["Fine gauge", "Ribbed trims", "Regular fit"],
    materials: "100% extra-fine merino wool.",
    care: "Machine wash wool cycle. Dry flat.",
    images: [
      { url: u("photo-1521572163474-6864f9cf17ab"), alt: "Merino crewneck" },
      { url: u("photo-1554568218-0f1715e72254"), alt: "Crewneck, styled" },
    ],
  },
  {
    id: "p-trench",
    slug: "belted-trench-coat",
    name: "Belted Trench Coat",
    category: "Outerwear",
    department: "women",
    priceCents: 132000,
    colors: [
      { name: "Sand", hex: "#c8b79a" },
      { name: "Black", hex: "#1a1817" },
    ],
    sizes: APPAREL,
    description:
      "The house trench, reworked in a water-resistant cotton gabardine with a self belt and a fluid, below-the-knee line.",
    details: ["Storm flap", "Self belt", "Below-knee length", "Horn-effect buttons"],
    materials: "100% cotton gabardine.",
    care: "Dry clean only.",
    images: [
      { url: u("photo-1487222477894-8943e31ef7b2"), alt: "Belted trench coat" },
      { url: u("photo-1512436991641-6745cdb1723f"), alt: "Trench, styled" },
    ],
    isNew: true,
  },
];

// ── Editorial imagery for homepage / collections ─────────────

export const heroImage = {
  url: u("photo-1469334031218-e382a71b716b", 2400),
  alt: "Editorial fashion campaign image",
};

export const featuredCollection = {
  slug: "autumn-atelier",
  name: "The Autumn Collection",
  caption: "Considered layers for the turning season.",
  image: u("photo-1483985988355-763728e1935b", 2000),
  alt: "Autumn collection editorial",
};

export const editorialImage = {
  url: u("photo-1441984904996-e0b6ba687e04", 1800),
  alt: "Craftsmanship editorial",
};

export const lookbook = [
  { url: u("photo-1467043198406-dc953a3defa0", 1200), alt: "Lookbook look one" },
  { url: u("photo-1509631179647-0177331693ae", 1200), alt: "Lookbook look two" },
  { url: u("photo-1490481651871-ab68de25d43d", 1200), alt: "Lookbook look three" },
  { url: u("photo-1529139574466-a303027c1d8b", 1200), alt: "Lookbook look four" },
];

export const collectionsList = [
  {
    slug: "autumn-atelier",
    name: "Autumn Atelier",
    caption: "The winter wardrobe, reconsidered.",
    image: u("photo-1483985988355-763728e1935b", 1600),
    alt: "Autumn Atelier collection",
  },
  {
    slug: "the-essentials",
    name: "The Essentials",
    caption: "Foundational pieces, made to endure.",
    image: u("photo-1490481651871-ab68de25d43d", 1600),
    alt: "The Essentials collection",
  },
  {
    slug: "evening",
    name: "Evening",
    caption: "Quiet drama, after dark.",
    image: u("photo-1508739773434-c26b3d09e071", 1600),
    alt: "Evening collection",
  },
];

// ── Query helpers (mirror the future catalog service API) ────

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getNewArrivals = () => products.filter((p) => p.isNew);

export const getFeatured = () => products.filter((p) => p.isFeatured);

export const getByDepartment = (dept: Product["department"]) =>
  products.filter((p) => p.department === dept || p.department === "unisex");

export const getRelated = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);

export const categories = [
  "Outerwear",
  "Ready-to-Wear",
  "Knitwear",
  "Leather Goods",
  "Footwear",
];

export const allColors = [
  "Black",
  "Camel",
  "Ivory",
  "Charcoal",
  "Navy",
  "Cognac",
  "Oat",
  "Stone",
];

export const popularSearches = [
  "Wool coat",
  "Silk dress",
  "Cashmere",
  "Leather tote",
  "Trench",
  "Boots",
];
