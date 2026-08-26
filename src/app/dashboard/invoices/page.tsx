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

  return <InvoiceList initialInvoices={result.data} />;
}
