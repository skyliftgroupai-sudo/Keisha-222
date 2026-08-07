"use client";

/**
 * Prototype store: cart, wishlist, and a SINGLE overlay state.
 *
 * Only one full-screen overlay (search | cart | menu) can be open at a time —
 * this is enforced structurally by storing one `overlay` value rather than
 * three independent booleans, which makes conflicting states impossible.
 * Client-side only, persisted to localStorage. In production this becomes the
 * cart service + Auth.js session + wishlist API (see ARCHITECTURE.md).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/mock/products";

export type CartLine = {
  id: string; // productId|color|size
  product: Product;
  color: string;
  size: string;
  quantity: number;
};

type OverlayKind = "search" | "cart" | "menu" | null;

type StoreContextValue = {
  // cart
  lines: CartLine[];
  addLine: (product: Product, color: string, size: string, qty?: number) => void;
  removeLine: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalCents: number;
  // overlays (mutually exclusive)
  overlay: OverlayKind;
  searchOpen: boolean;
  cartOpen: boolean;
  menuOpen: boolean;
  openSearch: () => void;
  openCart: () => void;
  openMenu: () => void;
  closeOverlay: () => void;
  // wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWished: (productId: string) => boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const lineId = (p: Product, color: string, size: string) =>
  `${p.id}|${color}|${size}`;

const priceOf = (p: Product) => p.salePriceCents ?? p.priceCents;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [overlay, setOverlay] = useState<OverlayKind>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once.
  useEffect(() => {
    try {
      const c = localStorage.getItem("maison.cart");
      const w = localStorage.getItem("maison.wishlist");
      if (c) setLines(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("maison.cart", JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("maison.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  // Single, authoritative background scroll-lock: locked whenever any overlay
  // is open, released the moment none is. No per-overlay prev-capture, so
  // switching between overlays can never leave the page stuck.
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlay]);

  const addLine = useCallback(
    (product: Product, color: string, size: string, qty = 1) => {
      const id = lineId(product, color, size);
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + qty } : l,
          );
        }
        return [...prev, { id, product, color, size, quantity: qty }];
      });
      setOverlay("cart");
    },
    [],
  );

  const removeLine = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [],
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: Math.max(1, qty) } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalCents = lines.reduce(
      (sum, l) => sum + priceOf(l.product) * l.quantity,
      0,
    );
    return {
      lines,
      addLine,
      removeLine,
      updateQty,
      clearCart,
      cartCount,
      subtotalCents,
      overlay,
      searchOpen: overlay === "search",
      cartOpen: overlay === "cart",
      menuOpen: overlay === "menu",
      openSearch: () => setOverlay("search"),
      openCart: () => setOverlay("cart"),
      openMenu: () => setOverlay("menu"),
      closeOverlay: () => setOverlay(null),
      wishlist,
      toggleWishlist,
      isWished: (id: string) => wishlist.includes(id),
    };
  }, [
    lines,
    overlay,
    wishlist,
    addLine,
    removeLine,
    updateQty,
    clearCart,
    toggleWishlist,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
