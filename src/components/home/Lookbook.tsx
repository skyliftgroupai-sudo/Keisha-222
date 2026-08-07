import Image from "next/image";
import Link from "next/link";
import { lookbook } from "@/lib/mock/products";
import { Reveal } from "@/components/ui/Reveal";

/** Asymmetrical editorial image grid. */
export function Lookbook() {
  return (
    <section className="container-lux py-24 md:py-32">
      <Reveal className="mb-14 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-3">The Lookbook</p>
          <h2
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Autumn in Frame
          </h2>
        </div>
        <Link href="/collections" className="link-underline eyebrow hidden sm:block">
          View all
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
        <Reveal className="relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-5">
          <LookImage index={0} />
        </Reveal>
        <Reveal
          delay={100}
          className="relative col-span-1 mt-10 aspect-[3/4] overflow-hidden md:col-span-4 md:mt-24"
        >
          <LookImage index={1} />
        </Reveal>
        <Reveal
          delay={200}
          className="relative col-span-2 aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-[3/4] md:mt-6"
        >
          <LookImage index={2} />
        </Reveal>
        <Reveal
          delay={100}
          className="relative col-span-2 aspect-[16/9] overflow-hidden md:col-span-7"
        >
          <LookImage index={3} />
        </Reveal>
        <Reveal
          delay={200}
          className="relative col-span-2 aspect-[16/9] overflow-hidden md:col-span-5"
        >
          <LookImage index={0} />
        </Reveal>
      </div>
    </section>
  );
}

function LookImage({ index }: { index: number }) {
  const img = lookbook[index % lookbook.length]!;
  return (
    <Image
      src={img.url}
      alt={img.alt}
      fill
      sizes="(min-width:768px) 40vw, 100vw"
      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05]"
    />
  );
}
