"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const ROWS = [
  { size: "XS", bust: "31–32", waist: "24–25", hip: "34–35" },
  { size: "S", bust: "33–34", waist: "26–27", hip: "36–37" },
  { size: "M", bust: "35–36", waist: "28–29", hip: "38–39" },
  { size: "L", bust: "37–39", waist: "30–32", hip: "40–42" },
  { size: "XL", bust: "40–42", waist: "33–35", hip: "43–45" },
];

export function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="link-underline text-xs uppercase tracking-[0.14em] text-[var(--color-ink-soft)]"
      >
        Size Guide
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[75] flex items-center justify-center p-4",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-label="Size guide"
          className={cn(
            "relative w-full max-w-lg bg-[var(--color-paper)] p-8 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-2xl">Size Guide</h3>
            <button onClick={() => setOpen(false)} aria-label="Close size guide">
              <CloseIcon />
            </button>
          </div>
          <p className="mb-6 text-sm text-[var(--color-ink-soft)]">
            Measurements in inches. For between-sizes, we recommend sizing up for a
            relaxed fit.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-ink)] text-left">
                <th className="py-2 font-normal">Size</th>
                <th className="py-2 font-normal">Bust</th>
                <th className="py-2 font-normal">Waist</th>
                <th className="py-2 font-normal">Hip</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.size} className="border-b border-[var(--color-line)]">
                  <td className="py-3">{r.size}</td>
                  <td className="py-3">{r.bust}</td>
                  <td className="py-3">{r.waist}</td>
                  <td className="py-3">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
