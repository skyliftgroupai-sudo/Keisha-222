import type { Metadata } from "next";
import { EditorialSection } from "@/components/home/EditorialSection";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { editorialImage, featuredCollection, lookbook } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Brand Story",
  description: "The story of the house — where it began and what it stands for.",
};

export default function StoryPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Brand Story"
        title="Where it began"
        description="A house built on patience, material and the belief that less, done exceptionally, is more."
      />
      <EditorialSection
        eyebrow="Chapter I"
        title="An idea in linen and wool"
        body="What began as a small atelier has grown into a house with a clear point of view — clothing that endures, made without compromise."
        ctaLabel="Discover the Collection"
        ctaHref="/shop"
        image={featuredCollection.image}
        imageAlt="The beginning"
      />
      <EditorialSection
        reverse
        eyebrow="Chapter II"
        title="A commitment to the hand"
        body="We partner with artisans and mills whose standards match our own, producing in small runs so that each piece receives the attention it deserves."
        ctaLabel="Our Philosophy"
        ctaHref="/about"
        image={lookbook[2]!.url}
        imageAlt="The craft"
      />
      <EditorialSection
        eyebrow="Chapter III"
        title="Designed to be kept"
        body="We measure success not in seasons but in years — in the pieces that stay in your wardrobe, and grow more yours with time."
        ctaLabel="Explore"
        ctaHref="/collections"
        image={editorialImage.url}
        imageAlt="Kept for years"
      />
    </>
  );
}
