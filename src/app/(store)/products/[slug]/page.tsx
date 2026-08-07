import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getProductBySlug,
  getRelated,
  products,
} from "@/lib/mock/products";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]!.url],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <nav className="container-lux mb-8 text-xs text-[var(--color-ink-soft)]" aria-label="Breadcrumb">
        <ol className="flex gap-2">
          <li>
            <Link href="/" className="link-underline">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/shop" className="link-underline">Shop</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-[var(--color-ink)]">{product.name}</li>
        </ol>
      </nav>

      <div className="container-lux grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} />
        <ProductPurchasePanel product={product} />
      </div>

      {/* Related */}
      <section className="container-lux py-28">
        <SectionHeading eyebrow="You may also like" title="Complete the Look" />
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
