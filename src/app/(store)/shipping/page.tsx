import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Shipping & Delivery" };

export default function ShippingPage() {
  return (
    <Prose
      eyebrow="Client Services"
      title="Shipping & Delivery"
      description="Everything you need to know about receiving your order."
    >
      <h2>Delivery times</h2>
      <p>
        Standard delivery arrives within 3–5 business days. Express delivery
        arrives within 1–2 business days. Orders are processed Monday to Friday,
        excluding holidays.
      </p>
      <h2>Shipping costs</h2>
      <p>
        Complimentary standard shipping is offered on all orders over $500.
        Below this threshold, standard shipping is $25 and express is $45.
      </p>
      <h2>Packaging</h2>
      <p>
        Each order is presented in signature packaging, considered as carefully
        as the pieces within.
      </p>
      <h2>Tracking</h2>
      <p>
        Once your order ships, you will receive a confirmation email with
        tracking details. You can also track orders from your account.
      </p>
    </Prose>
  );
}
