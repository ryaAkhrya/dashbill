import { getClients } from "@/app/actions/clients";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Invoice — DashBill",
};

export default async function NewInvoicePage() {
  const result = await getClients();

  if (!result.success) {
    redirect("/login");
  }

  if (result.data.length === 0) {
    return (
      <div>
        <h1 className="text-2xl mb-6">Create Invoice</h1>
        <div className="neo-card rounded-md p-8 text-center max-w-md">
          <p className="text-foreground/60 font-bold mb-2">
            No clients available.
          </p>
          <p className="text-sm text-foreground/40">
            Add a client first before creating an invoice.
          </p>
          <a
            href="/dashboard/clients"
            className="neo-btn neo-btn-primary rounded-md px-4 py-2 text-sm inline-block mt-4"
          >
            Go to Clients
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-[900] tracking-tight text-black">New Invoice</h1>
          <p className="font-bold text-foreground/60 mt-1">Draft a new bill for your client.</p>
        </div>
      </div>
      
      <InvoiceForm clients={result.data || []} />
    </div>
  );
}
