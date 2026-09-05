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
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | "All">("All");
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
    if (!confirm("Delete this invoice? This action cannot be undone.")) return;
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
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-black tracking-tight hidden md:block">Invoices</h2>
        
        {/* Status filter tabs */}
        <div
          className="flex flex-wrap bg-surface border-[2.5px] border-border inline-flex"
          style={{ boxShadow: "4px 4px 0px var(--border)" }}
        >
          {STATUS_FILTERS.map((status, idx) => {
            const isActive = activeFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`
                  px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors
                  ${idx !== STATUS_FILTERS.length - 1 ? "border-r-[2.5px] border-border" : ""}
                  ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-surface text-foreground hover:bg-background-muted"
                  }
                `}
              >
                {status}
              </button>
            );
          })}
        </div>

        <Link
          href="/dashboard/invoices/new"
          className="neo-btn neo-btn-primary px-6 py-3 text-sm shrink-0 w-full md:w-auto text-center"
        >
          + New Invoice
        </Link>
      </div>

      {filteredInvoices.length === 0 ? (
        <div
          className="bg-surface border-[2.5px] border-border p-12 text-center flex flex-col items-center justify-center"
          style={{ boxShadow: "6px 6px 0px var(--border)" }}
        >
          <div className="w-16 h-16 bg-background-muted border-[2.5px] border-border flex items-center justify-center mb-6" style={{ boxShadow: "3px 3px 0px var(--border)", transform: "rotate(2deg)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3 className="text-2xl font-black mb-2">No invoices found</h3>
          <p className="text-muted font-medium max-w-sm mb-6">
            {activeFilter !== "All"
              ? `You don't have any invoices marked as "${activeFilter}".`
              : "You haven't created any invoices yet. Draft your first bill."}
          </p>
          {activeFilter === "All" && (
            <Link
              href="/dashboard/invoices/new"
              className="neo-btn neo-btn-primary px-5 py-2.5 text-sm"
            >
              Create Invoice
            </Link>
          )}
        </div>
      ) : (
        <div
          className="bg-surface border-[2.5px] border-border overflow-x-auto"
          style={{ boxShadow: "6px 6px 0px var(--border)" }}
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-background-muted border-b-[2.5px] border-border">
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border">Invoice</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border">Client</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border text-center">Status</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border text-right">Amount</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border">Due Date</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, idx) => {
                const next = nextStatus[invoice.status];
                return (
                  <tr
                    key={invoice.id}
                    className={`
                      group transition-colors hover:bg-background/50
                      ${idx !== filteredInvoices.length - 1 ? "border-b-[2px] border-border/30" : ""}
                    `}
                  >
                    <td className="p-4 border-r-[2px] border-border/30">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="font-black text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5"
                      >
                        #{invoice.id.slice(0, 8)}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    </td>
                    <td className="p-4 font-bold border-r-[2px] border-border/30 truncate max-w-[150px]">
                      {invoice.clients.name}
                    </td>
                    <td className="p-4 font-bold border-r-[2px] border-border/30 text-center">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="p-4 font-black border-r-[2px] border-border/30 text-right">
                      {formatCurrency(Number(invoice.total_amount))}
                    </td>
                    <td className="p-4 font-medium text-muted border-r-[2px] border-border/30">
                      {formatDate(invoice.due_date)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {next && (
                          <button
                            onClick={() => handleStatusChange(invoice.id, next)}
                            disabled={updatingId === invoice.id}
                            className="p-1.5 text-muted hover:text-success transition-colors"
                            aria-label={`Mark as ${next}`}
                            title={`Mark as ${next}`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          disabled={deletingId === invoice.id}
                          className="p-1.5 text-muted hover:text-danger transition-colors"
                          aria-label="Delete invoice"
                          title="Delete invoice"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
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
