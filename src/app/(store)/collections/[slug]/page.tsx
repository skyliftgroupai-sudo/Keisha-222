import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Reveal } from "@/components/ui/Reveal";
import { collectionsList, products } from "@/lib/mock/products";

type Params = { slug: string };

export function generateStaticParams() {
  return collectionsList.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionsList.find((c) => c.slug === slug);
  return {
    title: collection?.name ?? "Collection",
    description: collection?.caption,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const collection = collectionsList.find((c) => c.slug === slug);
  if (!collection) notFound();

  // Prototype: each collection surfaces a curated slice of the catalog.
  const items =
    slug === "the-essentials"
      ? products.filter((p) => ["Knitwear", "Ready-to-Wear"].includes(p.category))
      : slug === "evening"
        ? products.filter((p) => p.category === "Ready-to-Wear")
        : products;

  return (
    <>
      {/* Collection hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container-lux relative flex h-full flex-col items-center justify-center text-center text-[var(--color-paper)]">
          <p className="eyebrow !text-[var(--color-paper)]/80">Collection</p>
          <h1
            className="mt-4 font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {collection.name}
          </h1>
          <p className="mt-4 max-w-md text-[var(--color-paper)]/85">
            {collection.caption}
          </p>
        </div>
      </section>

      <section className="container-lux py-24">
        <Reveal className="mb-12">
          <p className="text-sm text-[var(--color-ink-soft)]">
            {items.length} pieces
          </p>
        </Reveal>
        <ProductGrid products={items} />
      </section>
    </>
  );
}
