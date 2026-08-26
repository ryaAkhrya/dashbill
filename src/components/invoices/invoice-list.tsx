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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl">Invoices</h1>
        <Link
          href="/dashboard/invoices/new"
          className="neo-btn neo-btn-primary rounded-md px-4 py-2 text-sm"
        >
          + New Invoice
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`neo-btn rounded-md px-3 py-1.5 text-sm ${
              activeFilter === status
                ? "neo-btn-primary"
                : "neo-btn-ghost"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="neo-card rounded-md p-8 text-center">
          <p className="text-foreground/60 font-bold">No invoices found.</p>
          <p className="text-sm text-foreground/40 mt-1">
            {activeFilter !== "All"
              ? `No invoices with status "${activeFilter}".`
              : "Create your first invoice to get started."}
          </p>
        </div>
      ) : (
        <div className="neo-card rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black bg-background-muted">
                  <th className="text-left px-4 py-3 text-sm font-bold">
                    Invoice
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-bold hidden sm:table-cell">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-bold">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-bold hidden md:table-cell">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-bold hidden lg:table-cell">
                    Due Date
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-bold w-48">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => {
                  const next = nextStatus[invoice.status];
                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-black/10 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="font-bold text-sm underline"
                        >
                          #{invoice.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm hidden sm:table-cell">
                        {invoice.clients.name}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-right hidden md:table-cell">
                        {formatCurrency(Number(invoice.total_amount))}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/60 hidden lg:table-cell">
                        {formatDate(invoice.due_date)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {next && (
                            <button
                              onClick={() =>
                                handleStatusChange(invoice.id, next)
                              }
                              disabled={updatingId === invoice.id}
                              className="neo-btn neo-btn-secondary rounded-md px-2 py-1 text-xs"
                            >
                              {updatingId === invoice.id
                                ? "..."
                                : `Mark ${next}`}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(invoice.id)}
                            disabled={deletingId === invoice.id}
                            className="neo-btn neo-btn-destructive rounded-md px-2 py-1 text-xs"
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
        </div>
      )}
    </div>
  );
}
