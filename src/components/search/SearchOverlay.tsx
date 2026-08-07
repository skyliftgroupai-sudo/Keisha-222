"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { products, popularSearches } from "@/lib/mock/products";
import { formatPrice, cn } from "@/lib/utils";
import { SearchIcon, CloseIcon } from "@/components/ui/icons";

export function SearchOverlay() {
  const { searchOpen, closeOverlay } = useStore();

  return (
    <Overlay open={searchOpen} onClose={closeOverlay} ariaLabel="Search" backdrop="solid">
      {({ visible }) => <SearchPanel visible={visible} onClose={closeOverlay} />}
    </Overlay>
  );
}

function SearchPanel({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem("maison.recentSearches");
      if (r) setRecent(JSON.parse(r));
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  const commitSearch = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r !== t)].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem("maison.recentSearches", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const suggestions = query.trim() ? results : products.slice(0, 4);

  return (
    <div
      className={cn(
        "relative mx-auto flex h-full max-w-5xl flex-col px-6 pb-10 pt-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">Search</span>
        <button type="button" aria-label="Close search" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      {/* Field */}
      <div className="mt-10 flex items-center gap-4 border-b border-[var(--color-ink)] pb-4">
        <SearchIcon width={26} height={26} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
          placeholder="What are you looking for?"
          className="w-full bg-transparent font-[family-name:var(--font-display)] text-2xl outline-none placeholder:text-[var(--color-ink-soft)] sm:text-3xl"
        />
      </div>

      <div className="mt-10 grid flex-1 gap-12 overflow-y-auto pb-10 md:grid-cols-[1fr_1.4fr]">
        {/* Left: term suggestions */}
        <div className="space-y-10">
          {!query.trim() && recent.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Recent</p>
              <ul className="space-y-2">
                {recent.map((r) => (
                  <li key={r}>
                    <button onClick={() => setQuery(r)} className="link-underline text-lg">
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="eyebrow mb-4">Popular searches</p>
            <ul className="space-y-2">
              {popularSearches.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => {
                      setQuery(p);
                      commitSearch(p);
                    }}
                    className="link-underline text-lg"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: product suggestions / results */}
        <div>
          <p className="eyebrow mb-4">
            {query.trim() ? (results.length ? "Results" : "No results") : "Suggested for you"}
          </p>

          {query.trim() && results.length === 0 ? (
            <p className="text-[var(--color-ink-soft)]">
              We couldn&rsquo;t find a match for &ldquo;{query}&rdquo;. Try a different
              term, or explore our{" "}
              <Link href="/shop" onClick={onClose} className="link-underline">
                new arrivals
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => {
                    commitSearch(query || p.name);
                    onClose();
                  }}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper-deep)]">
                    <Image
                      src={p.images[0]!.url}
                      alt={p.images[0]!.alt}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-sm">{p.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">
                    {formatPrice(p.salePriceCents ?? p.priceCents)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
