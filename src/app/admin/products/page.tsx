import Image from "next/image";
import { PageHeader, StatusBadge, TableWrap } from "@/components/admin/ui";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/utils";

// Deterministic pseudo stock per product for the demo.
const stockFor = (i: number) => [2, 48, 15, 1, 32, 21, 3, 12, 0, 27, 19, 8][i] ?? 10;

export default function AdminProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        subtitle={`${products.length} products`}
        action={
          <button className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-paper)]">
            + Add Product
          </button>
        }
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          placeholder="Search products…"
          className="w-full max-w-xs rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-ink)]"
        />
        <select className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none">
          <option>All categories</option>
          <option>Outerwear</option>
          <option>Ready-to-Wear</option>
          <option>Knitwear</option>
        </select>
        <select className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm outline-none">
          <option>All statuses</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      <TableWrap>
        <thead className="border-b border-[var(--color-line)] text-left text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Inventory</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => {
            const stock = stockFor(i);
            return (
              <tr
                key={p.id}
                className="border-b border-[var(--color-line)] last:border-0 hover:bg-black/[0.015]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-[var(--color-paper-deep)]">
                      <Image
                        src={p.images[0]!.url}
                        alt={p.images[0]!.alt}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-[var(--color-ink-soft)]">
                        {p.colors.length} colors · {p.sizes.length} sizes
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">{p.category}</td>
                <td className="px-4 py-3">
                  {formatPrice(p.salePriceCents ?? p.priceCents)}
                </td>
                <td className="px-4 py-3">
                  {stock === 0 ? (
                    <StatusBadge status="Draft" />
                  ) : stock <= 3 ? (
                    <span className="text-amber-600">{stock} — low</span>
                  ) : (
                    <span>{stock}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={stock === 0 ? "Draft" : "Active"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>
    </>
  );
}
