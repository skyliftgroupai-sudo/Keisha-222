import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

const TONE: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-sky-50 text-sky-700 border-sky-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  grey: "bg-neutral-100 text-neutral-600 border-neutral-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_TONE: Record<string, keyof typeof TONE> = {
  Paid: "green",
  Delivered: "green",
  Active: "green",
  Published: "green",
  Processing: "blue",
  Shipped: "blue",
  Scheduled: "amber",
  "Low stock": "amber",
  Pending: "amber",
  "Out of stock": "red",
  Refunded: "red",
  "In stock": "green",
  Expired: "grey",
  Draft: "grey",
  New: "blue",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = TONE[STATUS_TONE[status] ?? "grey"];
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone,
      )}
    >
      {status}
    </span>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-[var(--color-line)] bg-white", className)}>
      {children}
    </div>
  );
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </Card>
  );
}
