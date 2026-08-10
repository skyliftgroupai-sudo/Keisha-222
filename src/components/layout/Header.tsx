"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useStore } from "@/components/providers/StoreProvider";
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  MenuIcon,
} from "@/components/ui/icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const { openSearch, openCart, openMenu, cartCount, overlay } = useStore();

  // Pages with a full-bleed image directly under the header get a transparent,
  // light-on-dark header until scroll; content pages get a solid header.
  const overHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/collections/");
  const transparent = overHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any open overlay covers the header; hide the mega-menu when one opens.
  useEffect(() => {
    if (overlay) setOpenMega(null);
  }, [overlay]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,color,border-color] duration-500",
        transparent
          ? "bg-gradient-to-b from-black/30 to-transparent text-[var(--color-paper)]"
          : "theme-dark border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 text-[var(--color-ink)] backdrop-blur",
      )}
    >
      <div className="container-lux">
        <div className="flex h-20 items-center justify-between gap-6 lg:h-24">
          {/* Left: mobile toggle + desktop nav */}
          <div className="flex flex-1 items-center gap-8">
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden"
              onClick={openMenu}
            >
              <MenuIcon />
            </button>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {mainNav.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMega(item.children ? item.label : null)}
                  onMouseLeave={() => setOpenMega(null)}
                >
                  <Link href={item.href} className="eyebrow nav-label link-underline py-2">
                    {item.label}
                  </Link>

                  {item.children && openMega === item.label && (
                    <div className="absolute left-0 top-full min-w-56 border border-[var(--color-line)] bg-[var(--color-surface)] p-6 text-[var(--color-ink)] shadow-sm">
                      <ul className="space-y-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="link-underline text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center: wordmark — understated bordered fashion-house mark */}
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <span className="inline-block font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.3em] [text-indent:0.3em] sm:border sm:border-current/25 sm:px-4 sm:py-1.5">
              {site.name}
            </span>
          </Link>

          {/* Right: utility icons */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <button type="button" onClick={openSearch} aria-label="Search" className="hover:opacity-60">
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="hidden hover:opacity-60 sm:block">
              <UserIcon />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="hover:opacity-60">
              <HeartIcon />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative hover:opacity-60"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span
                  className={cn(
                    "absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[0.6rem] leading-none",
                    transparent
                      ? "bg-[var(--color-paper)] text-[var(--color-ink)]"
                      : "bg-[var(--color-ink)] text-[var(--color-paper)]",
                  )}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
