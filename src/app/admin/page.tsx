import Link from "next/link";
import { PageHeader, Card, StatusBadge, TableWrap } from "@/components/admin/ui";
import { kpis, salesSeries, recentOrders } from "@/lib/mock/admin";
import { products } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Wednesday, 7 August 2026 · Store overview"
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
              {k.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {k.value}
            </p>
            <p
              className={cn(
                "mt-1 text-xs",
                k.positive ? "text-emerald-600" : "text-amber-600",
              )}
            >
              {k.delta}
            </p>
          </Card>
        ))}
      </div>

      {/* Chart + low stock */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-xl">
              Revenue
            </h2>
            <span className="text-xs text-[var(--color-ink-soft)]">Last 30 days</span>
          </div>
          <AreaChart data={salesSeries} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl">
            Low stock
          </h2>
          <ul className="space-y-3">
            {products.slice(0, 4).map((p, i) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="truncate pr-2">{p.name}</span>
                <span className="shrink-0 text-amber-600">{[2, 1, 3, 0][i]} left</span>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/inventory"
            className="mt-5 inline-block text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            Manage inventory →
          </Link>
        </Card>
      </div>

      {/* Recent orders */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-xl">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            View all →
          </Link>
        </div>
        <TableWrap>
          <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">{o.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-right">{o.total}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </>
  );
}

/** Minimal inline SVG area chart — no chart library needed. */
function AreaChart({ data }: { data: number[] }) {
  const w = 720;
  const h = 220;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const stepX = w / (data.length - 1);
  const y = (v: number) => h - ((v - min) / (max - min || 1)) * (h - 20) - 10;
  const points = data.map((v, i) => `${i * stepX},${y(v)}`);
  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${w},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-56 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fill)" />
      <path d={line} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
    </svg>
  );
}
