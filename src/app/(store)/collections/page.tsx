import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { collectionsList } from "@/lib/mock/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore the seasonal collections of the house.",
};

export default function CollectionsPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="The House"
        title="Collections"
        description="Seasonal chapters, each built around a single idea."
      />
      <div className="container-lux grid gap-8 pb-28 md:grid-cols-2 lg:grid-cols-3">
        {collectionsList.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 90}>
            <Link href={`/collections/${c.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)]">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-[var(--color-paper)]">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl">
                    {c.name}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-paper)]/85">
                    {c.caption}
                  </p>
                  <span className="link-underline eyebrow mt-4 inline-block !text-[var(--color-paper)]">
                    Discover
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
