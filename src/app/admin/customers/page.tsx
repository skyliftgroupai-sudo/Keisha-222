import { PageHeader, StatusBadge, TableWrap } from "@/components/admin/ui";
import { customers } from "@/lib/mock/admin";

export default function AdminCustomersPage() {
  return (
    <>
      <PageHeader title="Customers" subtitle={`${customers.length} shown · 3,284 total`} />

      <div className="mb-4">
        <input
          placeholder="Search customers…"
          className="w-full max-w-xs rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
        />
      </div>

      <TableWrap>
        <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Tier</th>
            <th className="px-4 py-3 font-medium">Orders</th>
            <th className="px-4 py-3 font-medium">Since</th>
            <th className="px-4 py-3 text-right font-medium">Lifetime spend</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.email} className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]">
              <td className="px-4 py-3">
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">{c.email}</p>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={c.tier === "New" ? "New" : c.tier} />
              </td>
              <td className="px-4 py-3">{c.orders}</td>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{c.joined}</td>
              <td className="px-4 py-3 text-right">{c.spent}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </>
  );
}
