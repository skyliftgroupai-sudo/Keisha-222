"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/mock/products";
import { useStore } from "@/components/providers/StoreProvider";
import { WishlistButton } from "@/components/product/WishlistButton";
import { SizeGuide } from "@/components/product/SizeGuide";
import { Accordion } from "@/components/ui/Accordion";
import { formatPrice, cn } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addLine } = useStore();

  const singleSize = product.sizes.length === 1;
  const [color, setColor] = useState(product.colors[0]!.name);
  const [size, setSize] = useState<string | null>(
    singleSize ? product.sizes[0]! : null,
  );
  const [error, setError] = useState(false);

  const onSale =
    product.salePriceCents != null && product.salePriceCents < product.priceCents;

  const requireSize = () => {
    if (!size) {
      setError(true);
      return false;
    }
    return true;
  };

  const addToBag = () => {
    if (!requireSize()) return;
    addLine(product, color, size!, 1);
  };

  const buyNow = () => {
    if (!requireSize()) return;
    addLine(product, color, size!, 1);
    router.push("/checkout");
  };

  return (
    <div className="lg:sticky lg:top-28">
      <p className="eyebrow mb-3">{product.category}</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight">
        {product.name}
      </h1>

      <p className="mt-4 text-lg">
        {onSale ? (
          <>
            <span className="text-[var(--color-sale)]">
              {formatPrice(product.salePriceCents!)}
            </span>{" "}
            <span className="text-[var(--color-ink-soft)] line-through">
              {formatPrice(product.priceCents)}
            </span>
          </>
        ) : (
          formatPrice(product.priceCents)
        )}
      </p>

      <p className="mt-6 max-w-md text-[var(--color-ink-soft)]">
        {product.description}
      </p>

      {/* Color */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow">Color — {color}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              title={c.name}
              className={cn(
                "h-8 w-8 rounded-full border transition-transform",
                color === c.name
                  ? "ring-1 ring-[var(--color-ink)] ring-offset-2 ring-offset-[var(--color-paper)]"
                  : "border-[var(--color-line)] hover:scale-110",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      {!singleSize && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow">Size</span>
            <SizeGuide />
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={cn(
                  "min-w-12 border px-4 py-3 text-sm transition-colors",
                  size === s
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                    : "border-[var(--color-line)] hover:border-[var(--color-ink)]",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p className="mt-3 text-xs text-[var(--color-sale)]">
              Please select a size.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-9 space-y-3">
        <button onClick={addToBag} className="btn btn-primary w-full">
          Add to Bag
        </button>
        <div className="flex gap-3">
          <button onClick={buyNow} className="btn btn-ghost flex-1">
            Buy Now
          </button>
          <WishlistButton
            productId={product.id}
            withLabel
            className="btn btn-ghost flex-1 justify-center"
          />
        </div>
      </div>

      {/* Reassurance */}
      <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
        Complimentary shipping on orders over $500 · Free returns within 30 days
      </p>

      {/* Details */}
      <div className="mt-10">
        <Accordion
          defaultOpen={0}
          items={[
            {
              title: "Details",
              content: (
                <ul className="list-disc space-y-1 pl-5">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              ),
            },
            { title: "Materials", content: <p>{product.materials}</p> },
            { title: "Care", content: <p>{product.care}</p> },
            {
              title: "Shipping & Returns",
              content: (
                <p>
                  Complimentary express shipping on orders over $500. Returns and
                  exchanges accepted within 30 days of delivery. See our{" "}
                  <a href="/shipping" className="link-underline">
                    shipping
                  </a>{" "}
                  and{" "}
                  <a href="/returns" className="link-underline">
                    returns
                  </a>{" "}
                  pages for details.
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
