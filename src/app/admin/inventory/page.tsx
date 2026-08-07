import { PageHeader, StatusBadge, TableWrap } from "@/components/admin/ui";
import { products } from "@/lib/mock/products";

// Build a flat variant list with deterministic pseudo stock.
const variants = products.flatMap((p, pi) =>
  p.colors.flatMap((c, ci) =>
    p.sizes.map((s, si) => {
      const seed = (pi * 7 + ci * 3 + si * 5) % 13;
      const qty = seed === 0 ? 0 : seed <= 2 ? seed : seed * 2;
      return {
        sku: `${p.id.replace("p-", "").toUpperCase()}-${c.name.slice(0, 2).toUpperCase()}-${s}`,
        product: p.name,
        variant: `${c.name} / ${s}`,
        qty,
      };
    }),
  ),
);

export default function AdminInventoryPage() {
  const low = variants.filter((v) => v.qty > 0 && v.qty <= 3).length;
  const out = variants.filter((v) => v.qty === 0).length;

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle={`${variants.length} variants · ${low} low · ${out} out of stock`}
      />

      <TableWrap>
        <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Variant</th>
            <th className="px-4 py-3 font-medium">On hand</th>
            <th className="px-4 py-3 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {variants.slice(0, 40).map((v) => (
            <tr key={v.sku} className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]">
              <td className="px-4 py-3 font-mono text-xs">{v.sku}</td>
              <td className="px-4 py-3">{v.product}</td>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{v.variant}</td>
              <td className="px-4 py-3">{v.qty}</td>
              <td className="px-4 py-3 text-right">
                {v.qty === 0 ? (
                  <StatusBadge status="Out of stock" />
                ) : v.qty <= 3 ? (
                  <StatusBadge status="Low stock" />
                ) : (
                  <StatusBadge status="In stock" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
      <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
        Showing first 40 of {variants.length} variants.
      </p>
    </>
  );
}
