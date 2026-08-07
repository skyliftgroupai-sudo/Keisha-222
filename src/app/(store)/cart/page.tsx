"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { CartItem } from "@/components/cart/CartItem";
import { formatPrice } from "@/lib/utils";

const FREE_SHIP_THRESHOLD = 50000;

export default function CartPage() {
  const { lines, subtotalCents, cartCount } = useStore();
  const shipping =
    lines.length === 0 || subtotalCents >= FREE_SHIP_THRESHOLD ? 0 : 2500;
  const total = subtotalCents + shipping;

  return (
    <div className="container-lux min-h-[60vh] pt-28 pb-28">
      <h1 className="mb-12 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
        Shopping Bag
      </h1>

      {lines.length === 0 ? (
        <div className="border-t border-[var(--color-line)] py-24 text-center">
          <p className="text-[var(--color-ink-soft)]">Your bag is currently empty.</p>
          <Link href="/shop" className="btn btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <div className="divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
            {lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="border border-[var(--color-line)] p-8">
              <h2 className="eyebrow mb-6">Order Summary</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-ink-soft)]">
                    Subtotal ({cartCount} items)
                  </dt>
                  <dd>{formatPrice(subtotalCents)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-ink-soft)]">Estimated shipping</dt>
                  <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-ink-soft)]">Estimated tax</dt>
                  <dd>Calculated at checkout</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--color-line)] pt-4 text-base">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              {/* Promo code */}
              <div className="mt-6 flex gap-2">
                <input
                  placeholder="Promo code"
                  className="w-full border border-[var(--color-line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
                />
                <button className="btn btn-ghost px-5 py-2">Apply</button>
              </div>

              <Link href="/checkout" className="btn btn-primary mt-6 w-full">
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center text-xs uppercase tracking-[0.18em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
