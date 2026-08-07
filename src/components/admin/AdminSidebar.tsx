"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Collections", href: "/admin/collections" },
  { label: "Discounts", href: "/admin/discounts" },
  { label: "Content", href: "/admin/content" },
  { label: "Analytics", href: "/admin/analytics" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "block px-4 py-2.5 text-sm transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-[#161412] px-5 py-4 text-white lg:hidden">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.3em]">
          {site.name}
        </span>
        <button onClick={() => setOpen(true)} aria-label="Open admin menu">
          <MenuIcon />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-[#161412] py-8 text-white lg:flex">
        <SidebarInner nav={nav} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-64 flex-col bg-[#161412] py-8 text-white transition-transform duration-400",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-6 flex items-center justify-between px-5">
            <span className="eyebrow !text-white/60">Admin</span>
            <button onClick={() => setOpen(false)} aria-label="Close admin menu">
              <CloseIcon />
            </button>
          </div>
          <SidebarInner nav={nav} />
        </aside>
      </div>
    </>
  );
}

function SidebarInner({ nav }: { nav: React.ReactNode }) {
  return (
    <>
      <div className="mb-8 px-5">
        <p className="font-[family-name:var(--font-display)] text-xl tracking-[0.3em] text-white">
          {site.name}
        </p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
          Admin Console
        </p>
      </div>
      {nav}
      <div className="mt-auto space-y-2 px-5 pt-8">
        <Link href="/" className="block text-xs text-white/50 hover:text-white">
          ← Back to store
        </Link>
        <div className="flex items-center gap-2 pt-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs">
            AO
          </span>
          <div className="text-xs">
            <p className="text-white/80">Store Admin</p>
            <p className="text-white/40">admin@maison</p>
          </div>
        </div>
      </div>
    </>
  );
}
