import { getInvoice } from "@/app/actions/invoices";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/invoices/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoicePDFWrapper } from "@/components/invoices/invoice-pdf-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: `Invoice #${id.slice(0, 8)} — DashBill` };
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getInvoice(id);

  if (!result.success) {
    redirect("/dashboard/invoices");
  }

  const invoice = result.data;
  const client = invoice.clients;
  const items = invoice.invoice_items;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl">Invoice #{invoice.id.slice(0, 8)}</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Created {formatDate(invoice.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={invoice.status} />
          <InvoicePDFWrapper
            invoice={invoice}
            client={client}
            items={items}
          />
        </div>
      </div>

      {/* Client info */}
      <div className="neo-card rounded-md p-5 mb-4">
        <p className="text-sm text-foreground/60 font-bold mb-1">Bill To</p>
        <p className="font-bold">{client.name}</p>
        <p className="text-sm">{client.email}</p>
        {client.address && (
          <p className="text-sm text-foreground/60 mt-1">{client.address}</p>
        )}
      </div>

      {/* Line items */}
      <div className="neo-card rounded-md overflow-hidden mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black bg-background-muted">
              <th className="text-left px-4 py-3 text-sm font-bold">
                Description
              </th>
              <th className="text-right px-4 py-3 text-sm font-bold w-20">
                Qty
              </th>
              <th className="text-right px-4 py-3 text-sm font-bold w-28">
                Price
              </th>
              <th className="text-right px-4 py-3 text-sm font-bold w-28">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-black/10 last:border-0"
              >
                <td className="px-4 py-3 text-sm">{item.description}</td>
                <td className="px-4 py-3 text-sm text-right">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(Number(item.price))}
                </td>
                <td className="px-4 py-3 text-sm text-right font-bold">
                  {formatCurrency(item.quantity * Number(item.price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="neo-card rounded-md p-5">
        <div className="max-w-xs ml-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Subtotal</span>
            <span className="font-bold">
              {formatCurrency(
                items.reduce(
                  (sum, item) =>
                    sum + item.quantity * Number(item.price),
                  0
                )
              )}
            </span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t-2 border-black">
            <span className="font-bold">Total</span>
            <span className="font-[900]">
              {formatCurrency(Number(invoice.total_amount))}
            </span>
          </div>
        </div>
      </div>

      {/* Due date */}
      <div className="mt-4 text-sm text-foreground/60">
        Due: {formatDate(invoice.due_date)}
      </div>
    </div>
  );
}
