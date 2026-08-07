import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Reusable image + text editorial block.
 *  - variant="full"  → tall full-bleed image with overlaid, centred copy
 *  - variant="split" → image + text side by side (`reverse` flips sides)
 *  - tone="dark"     → charcoal editorial band (split only); wraps in
 *                      `.theme-dark` so all children invert automatically.
 */
export function EditorialSection({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  reverse = false,
  variant = "split",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  variant?: "split" | "full";
  tone?: "light" | "dark";
}) {
  if (variant === "full") {
    return (
      <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="img-grade object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <Reveal className="container-lux relative flex h-full flex-col items-center justify-center text-center text-[var(--color-white)]">
          {eyebrow && (
            <p className="eyebrow !text-[var(--color-white)]/75">{eyebrow}</p>
          )}
          <h2
            className="mt-5 max-w-3xl font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {title}
          </h2>
          {body && (
            <p className="mt-5 max-w-xl text-[var(--color-white)]/85">{body}</p>
          )}
          <Link
            href={ctaHref}
            className="btn mt-9 border-[var(--color-white)] text-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-ink)]"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </section>
    );
  }

  const dark = tone === "dark";

  return (
    <section className={cn(dark && "theme-dark")}>
      <div className="container-lux py-28 md:py-40">
        <div
          className={cn(
            "grid items-center gap-12 md:grid-cols-2 md:gap-20",
            reverse && "md:[&>*:first-child]:order-2",
          )}
        >
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-[var(--color-paper-deep)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="img-grade object-cover"
            />
          </Reveal>

          <Reveal delay={140} className="max-w-md md:px-4">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h2
              className="font-[family-name:var(--font-display)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {title}
            </h2>
            {body && (
              <p className="mt-6 text-[var(--color-ink-soft)]">{body}</p>
            )}
            <Link href={ctaHref} className="btn btn-ghost mt-9">
              {ctaLabel}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
