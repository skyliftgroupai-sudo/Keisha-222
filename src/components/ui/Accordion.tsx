"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  defaultOpen,
}: {
  items: { title: string; content: React.ReactNode }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);

  return (
    <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-sm uppercase tracking-[0.14em]">{item.title}</span>
              <span
                className={cn(
                  "relative h-3 w-3 transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
                aria-hidden
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-ink)]" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--color-ink)]" />
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
