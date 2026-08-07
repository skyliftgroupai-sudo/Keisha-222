import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lux flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow mb-5">Error 404</p>
      <h1
        className="font-[family-name:var(--font-display)]"
        style={{ fontSize: "var(--text-hero)" }}
      >
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">
        The page you are looking for may have been moved or no longer exists.
      </p>
      <div className="mt-10 flex gap-4">
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          Explore the Collection
        </Link>
      </div>
    </div>
  );
}
