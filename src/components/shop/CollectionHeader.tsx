import { Reveal } from "@/components/ui/Reveal";

export function CollectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="container-lux pt-28 pb-14 text-center md:pt-36">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1
        className="font-[family-name:var(--font-display)]"
        style={{ fontSize: "var(--text-h1)" }}
      >
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-5 max-w-xl text-[var(--color-ink-soft)]">
          {description}
        </p>
      )}
    </Reveal>
  );
}
