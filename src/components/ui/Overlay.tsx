"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type BackdropKind = "scrim" | "solid" | "none";

/**
 * Single source of truth for full-screen UI states (search, cart, menu).
 *
 * Key architectural guarantees:
 *  - The overlay is UNMOUNTED when closed — nothing is painted over the page,
 *    so content can never bleed through (this was the root cause of the
 *    previous overlap bug).
 *  - Enter/exit are animated: mount → next frame flips `visible` on; on close,
 *    `visible` flips off, then it unmounts after the transition.
 *  - Owns body scroll-lock (restores the previous value), Escape-to-close, and
 *    the backdrop. Only one overlay is ever open at a time (enforced by the
 *    store's single `overlay` state), so a fixed z-index is safe and correct.
 *
 * `children` is a render prop receiving `visible` so the panel can drive its
 * own enter/exit transform.
 */
export function Overlay({
  open,
  onClose,
  ariaLabel,
  backdrop = "scrim",
  children,
  duration = 500,
}: {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  backdrop?: BackdropKind;
  children: (state: { visible: boolean }) => React.ReactNode;
  duration?: number;
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  // Mount on open (then reveal after first paint); on close, hide then unmount.
  // A short timeout (not requestAnimationFrame) drives the enter transition so
  // it still animates if the tab was backgrounded at open time — rAF is paused
  // for non-composited tabs, which would otherwise leave the panel un-revealed.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(id);
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), duration);
    return () => clearTimeout(t);
  }, [open, duration]);

  // Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // NOTE: background scroll-lock is owned centrally by StoreProvider (keyed on
  // the single active-overlay state) to avoid races when one overlay's exit
  // transition overlaps another's entrance.

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {backdrop !== "none" && (
        <div
          aria-hidden
          onClick={onClose}
          className={cn(
            "absolute inset-0 transition-opacity ease-out",
            backdrop === "scrim" ? "bg-black/40" : "bg-[var(--color-paper)]",
            visible ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDuration: `${duration}ms` }}
        />
      )}
      {children({ visible })}
    </div>
  );
}
