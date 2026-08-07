import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkLabel,
  linkHref,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-4 ${
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2
          className="font-[family-name:var(--font-display)]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-[var(--color-ink-soft)]">{description}</p>
        )}
      </div>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="link-underline eyebrow shrink-0">
          {linkLabel}
        </Link>
      )}
    </Reveal>
  );
}
