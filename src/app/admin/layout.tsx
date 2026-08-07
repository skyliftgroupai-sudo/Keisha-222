import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Console",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f3f1ed] text-[var(--color-ink)]">
      <AdminSidebar />
      <div className="flex-1">
        <div className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-center text-xs text-amber-800">
          Prototype — admin console concept with sample data. Demonstrates the
          custom platform; not connected to a live database.
        </div>
        <div className="px-6 py-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
