"use client";

import Link from "next/link";
import { useStore } from "@/components/providers/StoreProvider";
import { Overlay } from "@/components/ui/Overlay";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/icons";

/**
 * Full-height mobile navigation drawer. Rendered at the (store) layout root
 * (not inside <header>) so it owns a clean stacking context via <Overlay>.
 */
export function MobileMenu() {
  const { menuOpen, closeOverlay } = useStore();

  return (
    <Overlay open={menuOpen} onClose={closeOverlay} ariaLabel="Menu" backdrop="scrim">
      {({ visible }) => (
        <nav
          aria-label="Mobile"
          className={cn(
            "absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[var(--color-paper)] p-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            visible ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-10 flex items-center justify-between">
            <span className="eyebrow">Menu</span>
            <button type="button" aria-label="Close menu" onClick={closeOverlay}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-7">
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeOverlay}
                    className="block font-[family-name:var(--font-display)] text-3xl leading-none"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-3 space-y-2 pl-1">
                      {item.children.slice(1).map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeOverlay}
                            className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-6">
            <Link href="/account" onClick={closeOverlay} className="eyebrow">
              Account
            </Link>
            <Link href="/wishlist" onClick={closeOverlay} className="eyebrow">
              Wishlist
            </Link>
            <Link href="/contact" onClick={closeOverlay} className="eyebrow">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </Overlay>
  );
}
