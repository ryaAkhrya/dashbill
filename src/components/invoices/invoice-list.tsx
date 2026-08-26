"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  deleteInvoiceAction,
  updateInvoiceStatusAction,
} from "@/app/actions/invoices";
import { StatusBadge } from "./status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { InvoiceStatus, InvoiceWithDetails } from "@/lib/types";

const STATUS_FILTERS: (InvoiceStatus | "All")[] = [
  "All",
  "Draft",
  "Sent",
  "Paid",
  "Overdue",
];

export function InvoiceList({
  initialInvoices,
}: {
  initialInvoices: InvoiceWithDetails[];
}) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | "All">(
    "All"
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredInvoices =
    activeFilter === "All"
      ? initialInvoices
      : initialInvoices.filter((inv) => inv.status === activeFilter);

  async function handleStatusChange(
    invoiceId: string,
    newStatus: InvoiceStatus
  ) {
    setUpdatingId(invoiceId);
    await updateInvoiceStatusAction(invoiceId, newStatus);
    setUpdatingId(null);
    router.refresh();
  }

  async function handleDelete(invoiceId: string) {
    if (!confirm("Delete this invoice?")) return;
    setDeletingId(invoiceId);
    await deleteInvoiceAction(invoiceId);
    setDeletingId(null);
    router.refresh();
  }

  const nextStatus: Record<InvoiceStatus, InvoiceStatus | null> = {
    Draft: "Sent",
    Sent: "Paid",
    Paid: null,
    Overdue: "Paid",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        {/* Status filter tabs (Button Group) */}
        <div className="flex flex-wrap border-[3px] border-black bg-white shadow-[4px_4px_0px_#000]">
          {STATUS_FILTERS.map((status, idx) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-2 text-sm font-black uppercase tracking-wider transition-all
                ${idx !== STATUS_FILTERS.length - 1 ? "border-r-[3px] border-black" : ""}
                ${
                  activeFilter === status
                    ? "bg-[#FFE600] text-black shadow-inner"
                    : "bg-white text-foreground/60 hover:bg-black/5 hover:text-black"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>

        <Link
          href="/dashboard/invoices/new"
          className="neo-btn neo-btn-primary rounded-none px-6 py-3 text-sm font-black uppercase tracking-wider bg-[#A6FF00]"
        >
          + New Invoice
        </Link>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="neo-card p-12 text-center bg-white border-[3px]">
          <h3 className="text-2xl font-[900] mb-2">No invoices found</h3>
          <p className="text-foreground/70 font-bold">
            {activeFilter !== "All"
              ? `No invoices with status "${activeFilter}".`
              : "Create your first invoice to get started."}
          </p>
        </div>
      ) : (
        <div className="neo-card overflow-x-auto bg-white border-[3px] shadow-[6px_6px_0px_#000]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFE600] border-b-[3px] border-black">
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black">Invoice</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black hidden sm:table-cell">Client</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black">Status</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black text-right hidden md:table-cell">Amount</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black hidden lg:table-cell">Due Date</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm text-black text-right w-56">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, idx) => {
                const next = nextStatus[invoice.status];
                return (
                  <tr
                    key={invoice.id}
                    className={`
                      group transition-all hover:bg-black/5 hover:-translate-y-0.5
                      ${idx !== filteredInvoices.length - 1 ? "border-b-[3px] border-black" : ""}
                    `}
                  >
                    <td className="p-4 font-[900] border-r-[3px] border-black">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="underline hover:text-blue-600 transition-colors"
                      >
                        #{invoice.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="p-4 font-bold border-r-[3px] border-black hidden sm:table-cell">
                      {invoice.clients.name}
                    </td>
                    <td className="p-4 font-bold border-r-[3px] border-black">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="p-4 font-[900] border-r-[3px] border-black text-right hidden md:table-cell">
                      {formatCurrency(Number(invoice.total_amount))}
                    </td>
                    <td className="p-4 font-bold border-r-[3px] border-black text-foreground/70 hidden lg:table-cell">
                      {formatDate(invoice.due_date)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {next && (
                          <button
                            onClick={() => handleStatusChange(invoice.id, next)}
                            disabled={updatingId === invoice.id}
                            className="px-3 py-1.5 border-[3px] border-black font-black text-xs uppercase bg-[#D8B4FE] shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black whitespace-nowrap"
                          >
                            {updatingId === invoice.id ? "..." : `Mark ${next}`}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          disabled={deletingId === invoice.id}
                          className="px-3 py-1.5 border-[3px] border-black font-black text-xs uppercase bg-[#F87171] shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
                        >
                          {deletingId === invoice.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
