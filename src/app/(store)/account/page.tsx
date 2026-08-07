"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "MSN-2026-0421",
    date: "2 August 2026",
    status: "Shipped",
    total: 148500,
    items: "Signature Wool Coat, Cashmere Oversized Knit",
  },
  {
    id: "MSN-2026-0298",
    date: "14 July 2026",
    status: "Delivered",
    total: 69500,
    items: "Tailored Silk Dress",
  },
  {
    id: "MSN-2026-0155",
    date: "29 June 2026",
    status: "Delivered",
    total: 78000,
    items: "Suede Ankle Boot",
  },
];

const TABS = ["Overview", "Orders", "Addresses", "Preferences"] as const;
type Tab = (typeof TABS)[number];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="container-lux min-h-[60vh] pt-28 pb-28">
      <div className="mb-12">
        <p className="eyebrow mb-3">My Account</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          Good afternoon, Amara
        </h1>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          Prototype — account data is illustrative. Production uses secure
          authentication with role-based access.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        {/* Side nav */}
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "whitespace-nowrap px-4 py-2 text-left text-sm transition-colors lg:border-l-2",
                tab === t
                  ? "border-[var(--color-ink)] bg-[var(--color-paper-deep)] lg:bg-transparent"
                  : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              {t}
            </button>
          ))}
          <Link
            href="/wishlist"
            className="whitespace-nowrap px-4 py-2 text-left text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] lg:border-l-2 lg:border-transparent"
          >
            Wishlist
          </Link>
          <button className="mt-4 px-4 py-2 text-left text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
            Sign out
          </button>
        </nav>

        {/* Panel */}
        <div>
          {tab === "Overview" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Card title="Recent order">
                <p className="text-sm">{MOCK_ORDERS[0]!.id}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  {MOCK_ORDERS[0]!.status} · {MOCK_ORDERS[0]!.date}
                </p>
                <button
                  onClick={() => setTab("Orders")}
                  className="link-underline eyebrow mt-4"
                >
                  View all orders
                </button>
              </Card>
              <Card title="Default address">
                <p className="text-sm">Amara Okafor</p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  128 Prince Street, New York, NY 10012
                </p>
              </Card>
              <Card title="Membership">
                <p className="text-sm">Private Client</p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  Early access to collections &amp; private events.
                </p>
              </Card>
              <Card title="Communication">
                <p className="text-sm">Subscribed to The House newsletter</p>
              </Card>
            </div>
          )}

          {tab === "Orders" && (
            <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {MOCK_ORDERS.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm">{o.id}</p>
                    <p className="text-xs text-[var(--color-ink-soft)]">
                      {o.date} · {o.items}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
                      {o.status}
                    </span>
                    <span className="text-sm">{formatPrice(o.total)}</span>
                    <button className="link-underline eyebrow">Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Addresses" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Card title="Default — Shipping">
                <p className="text-sm">Amara Okafor</p>
                <p className="text-sm text-[var(--color-ink-soft)]">
                  128 Prince Street
                  <br />
                  New York, NY 10012
                  <br />
                  United States
                </p>
                <button className="link-underline eyebrow mt-4">Edit</button>
              </Card>
              <button className="grid place-items-center border border-dashed border-[var(--color-line)] p-8 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
                + Add a new address
              </button>
            </div>
          )}

          {tab === "Preferences" && (
            <div className="max-w-md space-y-6">
              <Toggle label="The House newsletter" defaultChecked />
              <Toggle label="New arrival alerts" defaultChecked />
              <Toggle label="Private event invitations" />
              <Toggle label="SMS order updates" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--color-line)] p-6">
      <p className="eyebrow mb-3">{title}</p>
      {children}
    </div>
  );
}

function Toggle({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex cursor-pointer items-center justify-between border-b border-[var(--color-line)] pb-4">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          on ? "bg-[var(--color-ink)]" : "bg-[var(--color-line)]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-[var(--color-paper)] transition-transform",
            on ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  );
}
