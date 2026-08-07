import type { Metadata } from "next";
import Image from "next/image";
import { EditorialSection } from "@/components/home/EditorialSection";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import {
  editorialImage,
  featuredCollection,
  lookbook,
} from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "About",
  description: `The house of ${site.name} — philosophy, craftsmanship and story.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Opening statement */}
      <section className="relative flex h-[80vh] min-h-[520px] items-center justify-center overflow-hidden">
        <Image
          src={featuredCollection.image}
          alt="The house of Maison"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <Reveal className="container-lux relative text-center text-[var(--color-paper)]">
          <p className="eyebrow !text-[var(--color-paper)]/80">The House</p>
          <h1
            className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-hero)" }}
          >
            A study in quiet luxury
          </h1>
        </Reveal>
      </section>

      {/* THE HOUSE */}
      <section className="container-lux max-w-3xl py-28 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Est. 2026</p>
          <p className="font-[family-name:var(--font-display)] text-2xl leading-relaxed md:text-3xl">
            {site.name} was founded on a single conviction — that true luxury is
            felt, not shouted. We design enduring pieces from exceptional
            materials, made to be lived in and kept for a lifetime.
          </p>
        </Reveal>
      </section>

      {/* OUR PHILOSOPHY */}
      <EditorialSection
        eyebrow="Our Philosophy"
        title="Restraint as a discipline"
        body="We believe in the power of the essential. Every seam, every fabric, every proportion is considered and reconsidered until nothing remains to be removed. The result is clothing of quiet confidence."
        ctaLabel="Explore the Collection"
        ctaHref="/shop"
        image={editorialImage.url}
        imageAlt="Our philosophy"
      />

      {/* CRAFTSMANSHIP */}
      <EditorialSection
        reverse
        eyebrow="Craftsmanship"
        title="Made by hand, made to last"
        body="Our garments are produced in small ateliers by artisans who have refined their craft over generations. We work only with mills and makers who share our commitment to quality and responsibility."
        ctaLabel="Our Story"
        ctaHref="/story"
        image={lookbook[1]!.url}
        imageAlt="Craftsmanship"
      />

      {/* Values strip */}
      <section className="container-lux grid gap-12 border-t border-[var(--color-line)] py-24 md:grid-cols-3">
        {[
          {
            t: "Considered materials",
            d: "Natural fibres, responsibly sourced and chosen to age beautifully.",
          },
          {
            t: "Enduring design",
            d: "Silhouettes free of trend, designed to remain relevant for years.",
          },
          {
            t: "Made responsibly",
            d: "Small-batch production with partners we know by name.",
          },
        ].map((v, i) => (
          <Reveal key={v.t} delay={i * 100}>
            <h3 className="font-[family-name:var(--font-display)] text-2xl">{v.t}</h3>
            <p className="mt-3 text-[var(--color-ink-soft)]">{v.d}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
