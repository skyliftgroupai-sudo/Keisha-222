import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the client services team.",
};

export default function ContactPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Client Services"
        title="Contact"
        description="Our client advisors are available Monday to Saturday, 9am–7pm ET."
      />
      <div className="container-lux grid max-w-4xl gap-16 pb-28 md:grid-cols-2">
        {/* Details */}
        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-2">Email</p>
            <p className="text-sm">{site.email}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Telephone</p>
            <p className="text-sm">+1 (800) 000-0000</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Flagship</p>
            <p className="text-sm text-[var(--color-ink-soft)]">
              128 Prince Street
              <br />
              New York, NY 10012
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Follow</p>
            <p className="text-sm">Instagram · Pinterest</p>
          </div>
        </div>

        {/* Form (visual) */}
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="First name"
              className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-ink)]"
            />
            <input
              placeholder="Last name"
              className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-ink)]"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-ink)]"
          />
          <input
            placeholder="Subject"
            className="w-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-ink)]"
          />
          <textarea
            rows={5}
            placeholder="How can we help?"
            className="w-full resize-none border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-ink)]"
          />
          <button type="button" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
