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

      {/* Featured collection — full-bleed */}
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

      {/* New arrivals */}
      <section className="container-lux py-24 md:py-32">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          description="The latest pieces to enter the house — tailored, knitted and crafted with intention."
          linkLabel="View all"
          linkHref="/new-arrivals"
        />
        <ProductGrid products={newArrivals} />
      </section>

      {/* Editorial story */}
      <EditorialSection
        eyebrow="Our Story"
        title="Crafted with Intention"
        body="Every piece is designed around timeless silhouettes, refined materials and modern craftsmanship — made to be worn, and kept, for years."
        ctaLabel="Our Story"
        ctaHref="/about"
        image={editorialImage.url}
        imageAlt={editorialImage.alt}
        reverse
      />

      {/* Lookbook */}
      <Lookbook />

      {/* Newsletter */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-paper-deep)]">
        <Reveal className="container-lux flex flex-col items-center py-24 text-center md:py-32">
          <p className="eyebrow mb-4">Newsletter</p>
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
          <div className="mt-8 w-full max-w-sm">
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
