import Link from "next/link";
import { heroImage } from "@/lib/mock/products";
import { HeroVideo } from "@/components/home/HeroVideo";

/**
 * Editorial hero — adaptive by breakpoint, not just scaled:
 *  - Mobile: the campaign video plays full-bleed behind the headline (its
 *    native 9:16 portrait format matches a phone viewport almost exactly).
 *  - Desktop/tablet: a two-column "campaign spread" — headline on warm
 *    ivory at left, the video as a tall framed panel at right, sized to
 *    its own aspect ratio so nothing is ever cropped.
 *
 * One <video> element throughout (no duplicate media, no wasted bandwidth) —
 * CSS Grid area-stacking repositions it per breakpoint; only its wrapper's
 * classes change.
 */
export function Hero() {
  return (
    <section className="relative h-[94vh] min-h-[600px] w-full overflow-hidden bg-[var(--color-ivory)] md:h-[86vh] md:min-h-[640px]">
      <div
        className="grid h-full grid-cols-1 [grid-template-areas:'stack'] [grid-template-rows:minmax(0,1fr)] md:grid-cols-2 md:gap-10 md:[grid-template-areas:'text_video'] lg:gap-16"
      >
        {/* Video */}
        <div className="relative [grid-area:stack] md:flex md:h-full md:items-center md:justify-end md:[grid-area:video]">
          <div className="relative h-full w-full overflow-hidden md:aspect-[9/16] md:h-[82%] md:w-auto md:rounded-sm md:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)]">
            <HeroVideo
              src="/video/hero.mp4"
              poster={heroImage.url}
              fallbackImage={heroImage.url}
              fallbackAlt={heroImage.alt}
              priorityImage
              className="img-grade h-full w-full"
            />
            {/* Legibility gradient — mobile only, where text overlays the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25 md:hidden" />
          </div>
        </div>

        {/* Text */}
        <div className="container-lux relative z-10 [grid-area:stack] flex h-full flex-col items-start justify-end pb-28 text-[var(--color-white)] md:h-auto md:flex-col md:justify-center md:pb-0 md:pr-0 md:text-[var(--color-ink)] md:[grid-area:text]">
          <p
            className="animate-rise eyebrow !text-[var(--color-white)]/80 md:!text-[var(--color-ink-soft)]"
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
            className="animate-rise mt-6 max-w-md text-base text-[var(--color-white)]/85 md:text-[var(--color-ink-soft)]"
            style={{ animationDelay: "560ms" }}
          >
            A new expression of timeless craftsmanship.
          </p>
          <div className="animate-rise mt-10" style={{ animationDelay: "720ms" }}>
            <Link
              href="/shop"
              className="btn border-[var(--color-white)] bg-[var(--color-white)] text-[var(--color-ink)] hover:bg-transparent hover:text-[var(--color-white)] md:border-[var(--color-ink)] md:bg-[var(--color-ink)] md:text-[var(--color-ivory)] md:hover:bg-transparent md:hover:text-[var(--color-ink)]"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
