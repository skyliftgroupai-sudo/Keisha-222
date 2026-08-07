import { Hero } from "@/components/home/Hero";
import { EditorialSection } from "@/components/home/EditorialSection";
import { Lookbook } from "@/components/home/Lookbook";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import {
  getNewArrivals,
  featuredCollection,
  editorialImage,
} from "@/lib/mock/products";

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      <Hero />

      {/* Featured collection — full-bleed cinematic */}
      <EditorialSection
        variant="full"
        eyebrow="Featured"
        title="The Autumn Collection"
        body="Considered layers and enduring materials for the turning season."
        ctaLabel="Discover"
        ctaHref={`/collections/${featuredCollection.slug}`}
        image={featuredCollection.image}
        imageAlt={featuredCollection.alt}
      />

      {/* New arrivals — crisp white band */}
      <section className="bg-[var(--color-white)]">
        <div className="container-lux py-28 md:py-40">
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            description="The latest pieces to enter the house — tailored, knitted and crafted with intention."
            linkLabel="View all"
            linkHref="/new-arrivals"
          />
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Editorial story — the one powerful dark section */}
      <EditorialSection
        tone="dark"
        eyebrow="Our Story"
        title="Crafted with Intention"
        body="Every piece is designed around timeless silhouettes, refined materials and modern craftsmanship — made to be worn, and kept, for years."
        ctaLabel="Discover Our Story"
        ctaHref="/about"
        image={editorialImage.url}
        imageAlt={editorialImage.alt}
        reverse
      />

      {/* Lookbook — editorial magazine layout (ivory) */}
      <Lookbook />

      {/* Newsletter — deeper ivory */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-paper-deep)]">
        <Reveal className="container-lux flex flex-col items-center py-28 text-center md:py-40">
          <p className="eyebrow mb-5">Newsletter</p>
          <h2
            className="max-w-2xl font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Join the World of Maison
          </h2>
          <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">
            Be the first to discover new collections, private releases, and
            stories from the house.
          </p>
          <div className="mt-9 w-full max-w-sm">
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
