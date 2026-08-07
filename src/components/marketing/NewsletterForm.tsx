"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      // Wired to /api/newsletter in M5. Fails gracefully until then.
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("success");
      setMessage("Thank you — welcome to the house.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return <p className="text-sm text-[var(--color-accent)]">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex items-center border-b border-[var(--color-ink)]">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[var(--color-ink-soft)]"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="eyebrow shrink-0 pl-4 disabled:opacity-50"
        >
          {state === "loading" ? "…" : "Sign up"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-xs text-[var(--color-sale)]">{message}</p>
      )}
    </form>
  );
}
