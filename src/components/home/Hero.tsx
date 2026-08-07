import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/lib/mock/products";

/** Full-screen editorial hero with a slow image zoom and staggered text rise. */
export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0 animate-zoom">
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Gradient for legibility, kept subtle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />

      <div className="container-lux relative flex h-full flex-col items-start justify-end pb-24 text-[var(--color-paper)]">
        <p
          className="animate-rise eyebrow !text-[var(--color-paper)]/80"
          style={{ animationDelay: "150ms" }}
        >
          Autumn / Winter
        </p>
        <h1
          className="animate-rise mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[color:var(--color-paper)]"
          style={{ animationDelay: "300ms", fontSize: "var(--text-hero)" }}
        >
          The Art of Modern Luxury
        </h1>
        <p
          className="animate-rise mt-5 max-w-md text-base text-[var(--color-paper)]/85"
          style={{ animationDelay: "480ms" }}
        >
          A new expression of timeless craftsmanship.
        </p>
        <div
          className="animate-rise mt-9"
          style={{ animationDelay: "640ms" }}
        >
          <Link
            href="/shop"
            className="btn border-[var(--color-paper)] bg-[var(--color-paper)] text-[var(--color-ink)] hover:bg-transparent hover:text-[var(--color-paper)]"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
