import { PageHeader, StatusBadge, TableWrap } from "@/components/admin/ui";
import { discounts } from "@/lib/mock/admin";

export default function AdminDiscountsPage() {
  return (
    <>
      <PageHeader
        title="Discounts"
        subtitle="Coupon codes & promotions"
        action={
          <button className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-paper)]">
            + Create Discount
          </button>
        }
      />

      <TableWrap>
        <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-medium">Code</th>
            <th className="px-4 py-3 font-medium">Value</th>
            <th className="px-4 py-3 font-medium">Applies to</th>
            <th className="px-4 py-3 font-medium">Used</th>
            <th className="px-4 py-3 font-medium">Expires</th>
            <th className="px-4 py-3 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((d) => (
            <tr key={d.code} className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]">
              <td className="px-4 py-3 font-mono text-xs font-medium">{d.code}</td>
              <td className="px-4 py-3">{d.type}</td>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{d.scope}</td>
              <td className="px-4 py-3">{d.uses}</td>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{d.expires}</td>
              <td className="px-4 py-3 text-right">
                <StatusBadge status={d.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </>
  );
}
