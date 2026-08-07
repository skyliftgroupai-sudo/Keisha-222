import { PageHeader, Card } from "@/components/admin/ui";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/utils";

const metrics = [
  { label: "Conversion rate", value: "3.8%", delta: "+0.4pt" },
  { label: "Avg. order value", value: "$604", delta: "+$28" },
  { label: "Sessions (30d)", value: "48,210", delta: "+9.2%" },
  { label: "Return rate", value: "6.1%", delta: "-0.8pt" },
];

const funnel = [
  { stage: "Product views", value: 48210, pct: 100 },
  { stage: "Add to cart", value: 9860, pct: 20 },
  { stage: "Checkout started", value: 4120, pct: 8.5 },
  { stage: "Purchased", value: 1830, pct: 3.8 },
];

export default function AdminAnalyticsPage() {
  const top = products.slice(0, 5);
  return (
    <>
      <PageHeader title="Analytics" subtitle="Store performance · last 30 days" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
              {m.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {m.value}
            </p>
            <p className="mt-1 text-xs text-emerald-600">{m.delta}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Funnel */}
        <Card className="p-6">
          <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl">
            Conversion funnel
          </h2>
          <div className="space-y-4">
            {funnel.map((f) => (
              <div key={f.stage}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{f.stage}</span>
                  <span className="text-[var(--color-ink-soft)]">
                    {f.value.toLocaleString()} · {f.pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--color-paper-deep)]">
                  <div
                    className="h-2 rounded-full bg-[var(--color-ink)]"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top products */}
        <Card className="p-6">
          <h2 className="mb-5 font-[family-name:var(--font-display)] text-xl">
            Top products
          </h2>
          <div className="space-y-3">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-3">
                  <span className="text-[var(--color-ink-soft)]">{i + 1}</span>
                  {p.name}
                </span>
                <span className="text-[var(--color-ink-soft)]">
                  {formatPrice((p.salePriceCents ?? p.priceCents) * (30 - i * 4))}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
