import type { InvoiceStatus } from "@/lib/types";

const statusStyles: Record<InvoiceStatus, string> = {
  Draft: "bg-background text-foreground",
  Sent: "bg-secondary text-black",
  Paid: "bg-primary text-black",
  Overdue: "bg-destructive text-white",
};

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`neo-badge rounded-md ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
