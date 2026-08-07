import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/lib/mock/products";

/** Full-screen editorial hero — cinematic grade, slow zoom, staggered text. */
export function Hero() {
  return (
    <section className="relative h-[94vh] min-h-[580px] w-full overflow-hidden">
      <div className="absolute inset-0 animate-zoom">
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="img-grade object-cover"
        />
      </div>
      {/* Cinematic neutral overlay — rich at the base for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />

      <div className="container-lux relative flex h-full flex-col items-start justify-end pb-28 text-[var(--color-white)]">
        <p
          className="animate-rise eyebrow !text-[var(--color-white)]/80"
          style={{ animationDelay: "200ms" }}
        >
          Autumn / Winter 2026
        </p>
        <h1
          className="animate-rise mt-5 max-w-4xl font-[family-name:var(--font-display)]"
          style={{ animationDelay: "380ms", fontSize: "var(--text-hero)" }}
        >
          The Art of Modern Luxury
        </h1>
        <p
          className="animate-rise mt-6 max-w-md text-base text-[var(--color-white)]/85"
          style={{ animationDelay: "560ms" }}
        >
          A new expression of timeless craftsmanship.
        </p>
        <div className="animate-rise mt-10" style={{ animationDelay: "720ms" }}>
          <Link
            href="/shop"
            className="btn border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-ink)] hover:bg-transparent hover:text-[var(--color-white)]"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
