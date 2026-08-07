"use client";

import { useStore } from "@/components/providers/StoreProvider";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  className,
  size = 20,
  withLabel = false,
}: {
  productId: string;
  className?: string;
  size?: number;
  withLabel?: boolean;
}) {
  const { isWished, toggleWishlist } = useStore();
  const active = isWished(productId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={cn(
        "inline-flex items-center gap-2 transition-transform duration-300 active:scale-90",
        className,
      )}
    >
      <HeartIcon
        width={size}
        height={size}
        style={active ? { fill: "var(--color-ink)", stroke: "var(--color-ink)" } : undefined}
      />
      {withLabel && (
        <span className="eyebrow">{active ? "Saved" : "Add to wishlist"}</span>
      )}
    </button>
  );
}
