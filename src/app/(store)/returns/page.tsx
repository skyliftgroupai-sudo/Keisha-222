import type { Metadata } from "next";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Returns & Exchanges" };

export default function ReturnsPage() {
  return (
    <Prose
      eyebrow="Client Services"
      title="Returns & Exchanges"
      description="We want you to be entirely satisfied with your purchase."
    >
      <h2>Our policy</h2>
      <p>
        We accept returns and exchanges within 30 days of delivery, provided
        items are unworn, unwashed and in their original condition with tags
        attached.
      </p>
      <h2>How to return</h2>
      <p>
        Initiate a return from your account or by contacting client services.
        You will receive a prepaid shipping label and instructions.
      </p>
      <h2>Refunds</h2>
      <p>
        Refunds are issued to the original payment method within 5–10 business
        days of receiving your return.
      </p>
      <h2>Exchanges</h2>
      <p>
        To exchange for a different size or color, place a new order and return
        the original item for a refund.
      </p>
    </Prose>
  );
}
