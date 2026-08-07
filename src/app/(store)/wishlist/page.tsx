"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { products } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-lux min-h-[60vh] pt-28 pb-28">
      <div className="mb-12 text-center">
        <p className="eyebrow mb-4">Saved</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">
          Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="border-t border-[var(--color-line)] py-24 text-center">
          <p className="text-[var(--color-ink-soft)]">
            You haven&rsquo;t saved any pieces yet.
          </p>
          <Link href="/shop" className="btn btn-primary mt-8">
            Explore the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
