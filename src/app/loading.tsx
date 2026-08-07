import { site } from "@/lib/site";

/** Elegant route-transition loading state — a quietly pulsing wordmark. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <span
        className="animate-pulse font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.4em]"
        style={{ paddingLeft: "0.4em" }}
      >
        {site.name}
      </span>
    </div>
  );
}
