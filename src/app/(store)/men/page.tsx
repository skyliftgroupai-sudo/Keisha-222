import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { ShopClient } from "@/components/shop/ShopClient";
import { getByDepartment } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Men",
  description: "Men's ready-to-wear, outerwear and accessories.",
};

export default function MenPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Men"
        title="Men's Collection"
        description="Precise tailoring and refined essentials for the modern wardrobe."
      />
      <ShopClient products={getByDepartment("men")} />
    </>
  );
}
