import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Prose eyebrow="Legal" title="Terms & Conditions">
      <p className="text-sm">
        Placeholder terms for the prototype. Final legal copy to be provided by
        the client&rsquo;s counsel before launch.
      </p>
      <h2>Use of the site</h2>
      <p>
        By accessing this site you agree to use it lawfully and not to misuse or
        interfere with its operation.
      </p>
      <h2>Orders</h2>
      <p>
        All orders are subject to acceptance and availability. We reserve the
        right to refuse or cancel any order.
      </p>
      <h2>Pricing</h2>
      <p>
        Prices are shown in US dollars and are subject to change. We make every
        effort to ensure pricing accuracy.
      </p>
      <h2>Intellectual property</h2>
      <p>
        All content on this site is the property of the house and may not be
        reproduced without permission.
      </p>
    </Prose>
  );
}
