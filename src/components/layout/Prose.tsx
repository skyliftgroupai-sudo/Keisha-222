import { CollectionHeader } from "@/components/shop/CollectionHeader";

/** Simple editorial prose layout for informational / legal pages. */
export function Prose({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <CollectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="container-lux pb-28">
        <div className="mx-auto max-w-2xl space-y-8 text-[var(--color-ink-soft)] leading-relaxed [&_h2]:mt-10 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-2xl [&_h2]:text-[var(--color-ink)] [&_a]:text-[var(--color-ink)] [&_a]:underline">
          {children}
        </div>
      </div>
    </>
  );
}
