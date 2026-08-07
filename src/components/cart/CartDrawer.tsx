"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { CartItem } from "@/components/cart/CartItem";
import { formatPrice, cn } from "@/lib/utils";
import { CloseIcon, BagIcon } from "@/components/ui/icons";

const FREE_SHIP_THRESHOLD = 50000; // $500

export function CartDrawer() {
  const { cartOpen, closeOverlay, lines, subtotalCents, cartCount } = useStore();

  const shipping =
    lines.length === 0 || subtotalCents >= FREE_SHIP_THRESHOLD ? 0 : 2500;
  const total = subtotalCents + shipping;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotalCents);

  return (
    <Overlay open={cartOpen} onClose={closeOverlay} ariaLabel="Shopping bag" backdrop="scrim">
      {({ visible }) => (
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--color-paper)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            visible ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-5">
            <h2 className="eyebrow">Shopping Bag ({cartCount})</h2>
            <button type="button" aria-label="Close bag" onClick={closeOverlay}>
              <CloseIcon />
            </button>
          </div>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
              <BagIcon width={40} height={40} className="text-[var(--color-ink-soft)]" />
              <p className="text-[var(--color-ink-soft)]">Your bag is empty.</p>
              <button onClick={closeOverlay} className="btn btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="border-b border-[var(--color-line)] px-6 py-3 text-center text-xs text-[var(--color-ink-soft)]">
                {remaining > 0 ? (
                  <>You are {formatPrice(remaining)} away from complimentary shipping.</>
                ) : (
                  <>You have unlocked complimentary shipping.</>
                )}
              </div>

              <div className="flex-1 divide-y divide-[var(--color-line)] overflow-y-auto px-6">
                {lines.map((line) => (
                  <CartItem key={line.id} line={line} onNavigate={closeOverlay} />
                ))}
              </div>

              <div className="border-t border-[var(--color-line)] px-6 py-6">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[var(--color-ink-soft)]">Subtotal</dt>
                    <dd>{formatPrice(subtotalCents)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--color-ink-soft)]">Shipping</dt>
                    <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-[var(--color-line)] pt-3 text-base">
                    <dt>Total</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" onClick={closeOverlay} className="btn btn-primary mt-5 w-full">
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeOverlay}
                  className="mt-3 w-full text-center text-xs uppercase tracking-[0.18em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </aside>
      )}
    </Overlay>
  );
}
