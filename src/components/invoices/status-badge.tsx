import type { InvoiceStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  let colorClass = "bg-white text-black";

  switch (status) {
    case "Draft":
      colorClass = "bg-[#FEF08A] text-black"; // Light yellow
      break;
    case "Sent":
      colorClass = "bg-[#93C5FD] text-black"; // Light blue
      break;
    case "Paid":
      colorClass = "bg-[#86EFAC] text-black"; // Light green
      break;
    case "Overdue":
      colorClass = "bg-[#FCA5A5] text-black"; // Light red
      break;
  }

  return (
    <span className={`border-[2px] border-black font-black text-xs px-2 py-1 uppercase tracking-wider shadow-[2px_2px_0px_#000] ${colorClass}`}>
      {status}
    </span>
  );
}
