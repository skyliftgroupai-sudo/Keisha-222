import type { Product } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-14 ${cols}`}>
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 80}>
          <ProductCard product={p} priority={i < 4} />
        </Reveal>
      ))}
    </div>
  );
}
