import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";

/** Storefront chrome — everything the customer-facing site shares. */
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-paper)]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />

      {/* Full-screen UI states — mutually exclusive, each unmounts when closed */}
      <SearchOverlay />
      <CartDrawer />
      <MobileMenu />
    </>
  );
}
