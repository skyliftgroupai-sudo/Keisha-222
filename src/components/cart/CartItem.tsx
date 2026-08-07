"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/components/providers/StoreProvider";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/icons";

export function CartItem({
  line,
  onNavigate,
}: {
  line: CartLine;
  onNavigate?: () => void;
}) {
  const { updateQty, removeLine } = useStore();
  const unit = line.product.salePriceCents ?? line.product.priceCents;
  const img = line.product.images[0]!;

  return (
    <div className="flex gap-4 py-6">
      <Link
        href={`/products/${line.product.slug}`}
        onClick={onNavigate}
        className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-[var(--color-paper-deep)]"
      >
        <Image src={img.url} alt={img.alt} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-base leading-tight">
              <Link href={`/products/${line.product.slug}`} onClick={onNavigate}>
                {line.product.name}
              </Link>
            </h4>
            <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
              {line.color} · Size {line.size}
            </p>
          </div>
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => removeLine(line.id)}
            className="shrink-0 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          {/* Quantity stepper */}
          <div className="flex items-center border border-[var(--color-line)]">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="px-3 py-1.5 text-sm hover:bg-[var(--color-paper-deep)]"
              onClick={() => updateQty(line.id, line.quantity - 1)}
            >
              –
            </button>
            <span className="w-8 text-center text-sm">{line.quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="px-3 py-1.5 text-sm hover:bg-[var(--color-paper-deep)]"
              onClick={() => updateQty(line.id, line.quantity + 1)}
            >
              +
            </button>
          </div>
          <span className="text-sm">{formatPrice(unit * line.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
