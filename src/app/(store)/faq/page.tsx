import type { Metadata } from "next";
import { CollectionHeader } from "@/components/shop/CollectionHeader";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions.",
};

const FAQS = [
  {
    title: "How long does shipping take?",
    content:
      "Standard shipping arrives within 3–5 business days; express within 1–2. Complimentary shipping applies to orders over $500.",
  },
  {
    title: "What is your return policy?",
    content:
      "We accept returns and exchanges within 30 days of delivery, provided items are unworn with original tags attached.",
  },
  {
    title: "Do you ship internationally?",
    content:
      "At launch we ship within the United States. International shipping is planned — see our shipping page for updates.",
  },
  {
    title: "How do I find my size?",
    content:
      "Each product page includes a detailed size guide. If you are between sizes, we generally recommend sizing up for a relaxed fit.",
  },
  {
    title: "How should I care for my pieces?",
    content:
      "Care instructions are listed on each product page. In general, we recommend professional cleaning for tailored and delicate items.",
  },
  {
    title: "Can I amend or cancel my order?",
    content:
      "Orders can be amended within one hour of placement by contacting client services. After this, orders enter fulfilment.",
  },
];

export default function FaqPage() {
  return (
    <>
      <CollectionHeader
        eyebrow="Client Services"
        title="Frequently Asked Questions"
      />
      <div className="container-lux mx-auto max-w-2xl pb-28">
        <Accordion items={FAQS} />
      </div>
    </>
  );
}
