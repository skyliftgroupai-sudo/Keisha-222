import { PageHeader, StatusBadge, TableWrap } from "@/components/admin/ui";
import { recentOrders } from "@/lib/mock/admin";

// Duplicate a few rows for a fuller table.
const orders = [
  ...recentOrders,
  { id: "MSN-2026-0424", customer: "Noah Klein", date: "Aug 4", status: "Shipped", total: "$1,320.00", items: 1 },
  { id: "MSN-2026-0423", customer: "Elena Petrova", date: "Aug 3", status: "Processing", total: "$420.00", items: 1 },
  { id: "MSN-2026-0422", customer: "Marcus Bell", date: "Aug 3", status: "Delivered", total: "$895.00", items: 1 },
];

export default function AdminOrdersPage() {
  return (
    <>
      <PageHeader title="Orders" subtitle={`${orders.length} orders this period`} />

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          placeholder="Search by order or customer…"
          className="w-full max-w-xs rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
        />
        <select className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm">
          <option>All statuses</option>
          <option>Paid</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Refunded</option>
        </select>
      </div>

      <TableWrap>
        <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Items</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]">
              <td className="px-4 py-3 font-medium">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{o.date}</td>
              <td className="px-4 py-3">{o.items}</td>
              <td className="px-4 py-3">
                <StatusBadge status={o.status} />
              </td>
              <td className="px-4 py-3 text-right">{o.total}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </>
  );
}
