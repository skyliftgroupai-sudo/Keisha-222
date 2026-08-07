import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { ShopClient } from "@/components/shop/ShopClient";
import { getByDepartment } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Women",
  description: "Women's ready-to-wear, outerwear and accessories.",
};

export default function WomenPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Women"
        title="Women's Collection"
        description="Fluid tailoring, elevated knitwear and enduring accessories."
      />
      <ShopClient products={getByDepartment("women")} />
    </>
  );
}
