import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Reusable image + text editorial block. `reverse` flips the image to the
 * right; `variant="full"` uses a tall full-bleed image with overlaid copy.
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
}) {
  if (variant === "full") {
    return (
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <Reveal className="container-lux relative flex h-full flex-col items-center justify-center text-center text-[var(--color-paper)]">
          {eyebrow && <p className="eyebrow !text-[var(--color-paper)]/80">{eyebrow}</p>}
          <h2
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {title}
          </h2>
          {body && <p className="mt-4 max-w-xl text-[var(--color-paper)]/85">{body}</p>}
          <Link
            href={ctaHref}
            className="btn mt-8 border-[var(--color-paper)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="container-lux py-24 md:py-32">
      <div
        className={cn(
          "grid items-center gap-10 md:grid-cols-2 md:gap-16",
          reverse && "md:[&>*:first-child]:order-2",
        )}
      >
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-[var(--color-paper-deep)]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={120} className="max-w-md">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {title}
          </h2>
          {body && (
            <p className="mt-5 text-[var(--color-ink-soft)]">{body}</p>
          )}
          <Link href={ctaHref} className="btn btn-ghost mt-8">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
