import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { ShopClient } from "@/components/shop/ShopClient";
import { products, categories } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore ready-to-wear, outerwear, knitwear and accessories.",
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Map an incoming slug (e.g. "ready-to-wear") to the display category.
  const initialCategory = category
    ? categories.find((c) => norm(c) === norm(category))
    : undefined;

  return (
    <>
      <CollectionHeader
        eyebrow="The Collection"
        title="Shop All"
        description="A considered edit of the season — tailoring, knitwear, outerwear and leather goods, made to endure."
      />
      <ShopClient products={products} initialCategory={initialCategory} />
    </>
  );
}
