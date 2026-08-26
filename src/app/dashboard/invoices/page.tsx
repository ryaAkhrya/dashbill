import { getInvoices } from "@/app/actions/invoices";
import { InvoiceList } from "@/components/invoices/invoice-list";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Invoices — DashBill",
};

export default async function InvoicesPage() {
  const result = await getInvoices();

  if (!result.success) {
    redirect("/login");
  }

  const invoices = result.data;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-[900] tracking-tight text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">Invoices</h1>
          <p className="font-bold text-foreground/60 mt-1">Manage and track your billing.</p>
        </div>
      </div>

      <InvoiceList initialInvoices={invoices} />
    </div>
  );
}
