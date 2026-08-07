import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/mock/products";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/product/WishlistButton";

/**
 * Editorial product card. On hover the primary image cross-fades to the
 * secondary image and lifts subtly. Colors and price are shown quietly.
 */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];
  const onSale =
    product.salePriceCents != null && product.salePriceCents < product.priceCents;

  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)]">
          {/* Primary */}
          <Image
            src={primary!.url}
            alt={primary!.alt}
            fill
            priority={priority}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-opacity duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0"
          />
          {/* Secondary (revealed on hover) */}
          <Image
            src={secondary!.url}
            alt={secondary!.alt}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:opacity-100"
          />

          {product.isNew && (
            <span className="absolute left-4 top-4 z-10 bg-[var(--color-paper)]/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
              New
            </span>
          )}
          {onSale && (
            <span className="absolute right-4 top-4 z-10 bg-[var(--color-sale)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist — appears on hover (always visible on touch) */}
      <div className="absolute right-3 top-3 z-10 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
        <WishlistButton
          productId={product.id}
          className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-paper)]/85 backdrop-blur"
          size={17}
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
          {product.category}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm">
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

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-full border border-[var(--color-line)]"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 1 && (
            <span className="ml-1 text-[0.7rem] text-[var(--color-ink-soft)]">
              {product.colors.length} colors
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
