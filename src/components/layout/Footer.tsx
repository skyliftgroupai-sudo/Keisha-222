import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line)] bg-[var(--color-paper-deep)]">
      <div className="container-lux py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div className="max-w-sm">
            <p className="eyebrow mb-4">Correspondence</p>
            <h3 className="mb-5 font-[family-name:var(--font-display)] text-2xl">
              Join the house
            </h3>
            <p className="mb-6 text-sm text-[var(--color-ink-soft)]">
              Private views, new arrivals and seasonal stories — delivered with
              restraint.
            </p>
            <NewsletterForm />
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-8 text-xs text-[var(--color-ink-soft)] sm:flex-row sm:items-center">
          <span className="tracking-[0.28em] uppercase">{site.name}</span>
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Designed &amp; made with care.</span>
        </div>
      </div>
    </footer>
  );
}
