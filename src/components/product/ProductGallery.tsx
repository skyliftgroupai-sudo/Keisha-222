"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Gallery with thumbnail navigation and a hover-zoom on the main image
 * (desktop). On touch, tapping toggles zoom. Falls back gracefully.
 */
export function ProductGallery({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);

  const current = images[active]!;

  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 md:flex-col">
        {images.map((img, i) => (
          <button
            key={img.url + i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-[var(--color-paper-deep)] transition-opacity md:w-20",
              i === active ? "opacity-100 ring-1 ring-[var(--color-ink)]" : "opacity-60 hover:opacity-100",
            )}
          >
            <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setZoom((z) => !z)}
        className="relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-[var(--color-paper-deep)]"
      >
        <Image
          src={current.url}
          alt={current.alt}
          fill
          priority
          sizes="(min-width:768px) 55vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            zoom ? "scale-[1.9]" : "scale-100",
          )}
          style={{ transformOrigin: origin }}
        />
      </div>
    </div>
  );
}
