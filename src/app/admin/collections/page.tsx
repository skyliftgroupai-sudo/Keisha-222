import Image from "next/image";
import { PageHeader, StatusBadge, Card } from "@/components/admin/ui";
import { collectionsList } from "@/lib/mock/products";

export default function AdminCollectionsPage() {
  return (
    <>
      <PageHeader
        title="Collections"
        subtitle={`${collectionsList.length} collections`}
        action={
          <button className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-paper)]">
            + New Collection
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collectionsList.map((c, i) => (
          <Card key={c.slug} className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-[var(--color-paper-deep)]">
              <Image src={c.image} alt={c.alt} fill sizes="360px" className="object-cover" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg">{c.name}</p>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {[12, 8, 6][i] ?? 6} products
                </p>
              </div>
              <StatusBadge status={i === 2 ? "Draft" : "Published"} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
