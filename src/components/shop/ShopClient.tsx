"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/mock/products";
import { categories as allCategories, allColors } from "@/lib/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/icons";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

const SIZES = ["XS", "S", "M", "L", "XL"];
const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

const price = (p: Product) => p.salePriceCents ?? p.priceCents;

export function ShopClient({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [cats, setCats] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) =>
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const filtered = useMemo(() => {
    const out = products.filter((p) => {
      if (cats.length && !cats.some((c) => matchCategory(p.category, c)))
        return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      if (
        colors.length &&
        !colors.some((c) => p.colors.some((pc) => pc.name === c))
      )
        return false;
      if (price(p) > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "newest":
        return [...out].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      case "price-asc":
        return [...out].sort((a, b) => price(a) - price(b));
      case "price-desc":
        return [...out].sort((a, b) => price(b) - price(a));
      default:
        return [...out].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
  }, [products, cats, sizes, colors, maxPrice, sort]);

  const activeCount = cats.length + sizes.length + colors.length;

  const clearAll = () => {
    setCats([]);
    setSizes([]);
    setColors([]);
    setMaxPrice(200000);
  };

  const Filters = (
    <div className="space-y-10">
      <FilterGroup title="Category">
        {allCategories.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={cats.includes(c)}
            onChange={() => toggle(c, cats, setCats)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(s, sizes, setSizes)}
              className={cn(
                "min-w-11 border px-3 py-2 text-xs transition-colors",
                sizes.includes(s)
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border-[var(--color-line)] hover:border-[var(--color-ink)]",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="space-y-2">
          {allColors.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={colors.includes(c)}
              onChange={() => toggle(c, colors, setColors)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={20000}
          max={200000}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-ink)]"
          aria-label="Maximum price"
        />
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          Up to ${(maxPrice / 100).toLocaleString()}
        </p>
      </FilterGroup>

      {activeCount > 0 && (
        <button onClick={clearAll} className="link-underline eyebrow">
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="container-lux pb-28">
      {/* Toolbar */}
      <div className="mb-10 flex items-center justify-between border-y border-[var(--color-line)] py-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="eyebrow lg:invisible"
        >
          Filter {activeCount > 0 && `(${activeCount})`}
        </button>
        <p className="hidden text-sm text-[var(--color-ink-soft)] lg:block">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <label className="flex items-center gap-3">
          <span className="eyebrow hidden sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border-0 bg-transparent text-sm outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block">{Filters}</aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl">
                No pieces match your selection
              </p>
              <button onClick={clearAll} className="btn btn-ghost mt-6">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <ProductCard product={p} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[65] lg:hidden",
          mobileFiltersOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileFiltersOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/30 transition-opacity duration-500",
            mobileFiltersOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[var(--color-paper)] p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            mobileFiltersOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="eyebrow">Filter &amp; Sort</span>
            <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
              <CloseIcon />
            </button>
          </div>
          {Filters}
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="btn btn-primary mt-10 w-full"
          >
            Show {filtered.length} results
          </button>
        </div>
      </div>
    </div>
  );
}

// "Ready-to-Wear" slug from nav is "ready-to-wear"; match loosely.
function matchCategory(productCategory: string, filter: string) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
  return norm(productCategory) === norm(filter);
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-sm">
      <span
        className={cn(
          "grid h-4 w-4 place-items-center border transition-colors",
          checked
            ? "border-[var(--color-ink)] bg-[var(--color-ink)]"
            : "border-[var(--color-line)]",
        )}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 5l2.5 2.5L9 2" stroke="var(--color-paper)" strokeWidth="1.5" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}
