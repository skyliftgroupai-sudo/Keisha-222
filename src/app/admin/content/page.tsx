import { PageHeader, StatusBadge, Card } from "@/components/admin/ui";
import { contentBlocks } from "@/lib/mock/admin";

export default function AdminContentPage() {
  return (
    <>
      <PageHeader
        title="Content"
        subtitle="Manage homepage sections, editorial and pages — no developer required"
        action={
          <button className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--color-paper)]">
            + New Block
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {contentBlocks.map((b) => (
          <Card key={b.key} className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
                {b.type}
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
                {b.title}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--color-ink-soft)]">
                {b.key}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <StatusBadge status={b.status} />
              <button className="text-xs uppercase tracking-[0.1em] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                Edit
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
