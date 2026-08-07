import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Prose eyebrow="Legal" title="Privacy Policy">
      <p className="text-sm">
        Placeholder policy for the prototype. Final legal copy to be provided by
        the client&rsquo;s counsel before launch.
      </p>
      <h2>Information we collect</h2>
      <p>
        We collect information you provide when creating an account, placing an
        order, or subscribing to communications, along with limited technical
        data to operate and improve the site.
      </p>
      <h2>How we use information</h2>
      <p>
        To process orders, provide client services, personalize your experience,
        and — with your consent — send marketing communications you may opt out
        of at any time.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        data by contacting client services.
      </p>
      <h2>Cookies</h2>
      <p>
        We use essential cookies to operate the site and, with consent, optional
        analytics cookies to understand usage.
      </p>
    </Prose>
  );
}
