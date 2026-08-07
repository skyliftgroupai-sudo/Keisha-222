"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/utils";
import { site } from "@/lib/site";

const FREE_SHIP_THRESHOLD = 50000;

const SHIPPING_METHODS = [
  { id: "standard", label: "Standard", detail: "3–5 business days", cents: 2500 },
  { id: "express", label: "Express", detail: "1–2 business days", cents: 4500 },
  { id: "courier", label: "Same-day courier", detail: "Select cities", cents: 8000 },
];

export default function CheckoutPage() {
  const { lines, subtotalCents, clearCart } = useStore();
  const [method, setMethod] = useState(SHIPPING_METHODS[0]!.id);
  const [placed, setPlaced] = useState(false);

  const methodCost =
    subtotalCents >= FREE_SHIP_THRESHOLD
      ? 0
      : SHIPPING_METHODS.find((m) => m.id === method)!.cents;
  const tax = Math.round(subtotalCents * 0.088); // illustrative
  const total = subtotalCents + methodCost + tax;

  if (placed) {
    return <OrderConfirmed onReset={clearCart} />;
  }

  if (lines.length === 0) {
    return (
      <div className="container-lux flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">
          Your bag is empty
        </h1>
        <Link href="/shop" className="btn btn-primary mt-8">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-lux pt-28 pb-28">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Checkout</h1>
        <Link href="/cart" className="link-underline eyebrow">
          Edit bag
        </Link>
      </div>

      {/* Prototype notice */}
      <p className="mb-12 inline-block border border-[var(--color-line)] bg-[var(--color-paper-deep)] px-4 py-2 text-xs text-[var(--color-ink-soft)]">
        Prototype — this checkout is for demonstration only. No payment is
        processed. Production integrates Stripe with secure, server-verified
        webhooks.
      </p>

      <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form
          className="space-y-14"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
          <Section step={1} title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" type="email" placeholder="you@example.com" required />
              <Field label="Phone" type="tel" placeholder="(555) 000-0000" />
            </div>
          </Section>

          <Section step={2} title="Shipping Address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
              <Field label="Address" className="sm:col-span-2" required />
              <Field label="Apartment, suite (optional)" className="sm:col-span-2" />
              <Field label="City" required />
              <Field label="State / Region" required />
              <Field label="Postal code" required />
              <Field label="Country" defaultValue="United States" required />
            </div>
          </Section>

          <Section step={3} title="Shipping Method">
            <div className="space-y-3">
              {SHIPPING_METHODS.map((m) => {
                const free = subtotalCents >= FREE_SHIP_THRESHOLD;
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center justify-between border p-4 transition-colors ${
                      method === m.id
                        ? "border-[var(--color-ink)]"
                        : "border-[var(--color-line)]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={method === m.id}
                        onChange={() => setMethod(m.id)}
                        className="accent-[var(--color-ink)]"
                      />
                      <span>
                        <span className="block text-sm">{m.label}</span>
                        <span className="block text-xs text-[var(--color-ink-soft)]">
                          {m.detail}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm">
                      {free ? "Complimentary" : formatPrice(m.cents)}
                    </span>
                  </label>
                );
              })}
            </div>
          </Section>

          <Section step={4} title="Payment">
            {/* Stripe-inspired styling — visual only */}
            <div className="space-y-4">
              <Field label="Card number" placeholder="1234 1234 1234 1234" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Expiry" placeholder="MM / YY" />
                <Field label="CVC" placeholder="CVC" />
              </div>
              <Field label="Name on card" />
              <p className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                <LockIcon /> Payments are encrypted and secure in production.
              </p>
            </div>
          </Section>

          <button type="submit" className="btn btn-primary w-full">
            Place Order — {formatPrice(total)}
          </button>
        </form>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border border-[var(--color-line)] p-8">
            <h2 className="eyebrow mb-6">Order Summary</h2>
            <div className="mb-6 max-h-72 space-y-4 overflow-y-auto">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3">
                  <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-[var(--color-paper-deep)]">
                    <Image
                      src={line.product.images[0]!.url}
                      alt={line.product.images[0]!.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-ink)] text-[0.65rem] text-[var(--color-paper)]">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="leading-tight">{line.product.name}</p>
                    <p className="text-xs text-[var(--color-ink-soft)]">
                      {line.color} · {line.size}
                    </p>
                  </div>
                  <span className="text-sm">
                    {formatPrice(
                      (line.product.salePriceCents ?? line.product.priceCents) *
                        line.quantity,
                    )}
                  </span>
                </div>
              ))}
            </div>

            <dl className="space-y-2 border-t border-[var(--color-line)] pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotalCents)} />
              <Row
                label="Shipping"
                value={methodCost === 0 ? "Complimentary" : formatPrice(methodCost)}
              />
              <Row label="Tax (est.)" value={formatPrice(tax)} />
              <div className="flex justify-between border-t border-[var(--color-line)] pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-4 text-center text-xs text-[var(--color-ink-soft)]">
            {site.name} · Secure checkout
          </p>
        </aside>
      </div>
    </div>
  );
}

function OrderConfirmed({ onReset }: { onReset: () => void }) {
  return (
    <div className="container-lux flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow mb-5">Thank you</p>
      <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl md:text-5xl">
        Your order has been received
      </h1>
      <p className="mt-6 max-w-md text-[var(--color-ink-soft)]">
        A confirmation has been sent to your email. In production, this triggers
        an order-confirmation email and the fulfilment workflow.
      </p>
      <p className="mt-2 text-sm">
        Order reference{" "}
        <span className="font-[family-name:var(--font-display)] tracking-widest">
          MSN-2026-{Math.floor(1000 + Math.random() * 9000)}
        </span>
      </p>
      <div className="mt-10 flex gap-4">
        <Link href="/shop" onClick={onReset} className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link href="/account" className="btn btn-ghost">
          View Orders
        </Link>
      </div>
    </div>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--color-ink)] text-xs">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/[^a-z]/g, "-");
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs text-[var(--color-ink-soft)]">
        {label}
      </label>
      <input
        id={id}
        className="w-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-ink)]"
        {...props}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--color-ink-soft)]">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
