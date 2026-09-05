import type { InvoiceStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  let colorClass = "";

  switch (status) {
    case "Draft":
      colorClass = "badge-draft";
      break;
    case "Sent":
      colorClass = "badge-sent";
      break;
    case "Paid":
      colorClass = "badge-paid";
      break;
    case "Overdue":
      colorClass = "badge-overdue";
      break;
  }

  return (
    <span className={`neo-badge ${colorClass}`}>
      {status}
    </span>
  );
}
