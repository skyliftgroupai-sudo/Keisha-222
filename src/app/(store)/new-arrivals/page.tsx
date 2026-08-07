import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getNewArrivals } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest additions to the house.",
};

export default function NewArrivalsPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Just In"
        title="New Arrivals"
        description="The newest pieces to enter the house, updated each week."
      />
      <div className="container-lux pb-28">
        <ProductGrid products={getNewArrivals()} />
      </div>
    </>
  );
}
