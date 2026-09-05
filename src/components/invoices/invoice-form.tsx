"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInvoiceAction } from "@/app/actions/invoices";
import { formatCurrency } from "@/lib/utils";
import type { Client } from "@/lib/types";

interface ItemRow {
  description: string;
  quantity: number;
  price: number;
}

const emptyItem: ItemRow = { description: "", quantity: 1, price: 0 };

export function InvoiceForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<ItemRow[]>([{ ...emptyItem }]);
  const [taxRate, setTaxRate] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(
    index: number,
    field: keyof ItemRow,
    value: string | number
  ) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await createInvoiceAction({
      client_id: clientId,
      due_date: dueDate,
      items: items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total,
    });

    setLoading(false);

    if (result.success) {
      router.push("/dashboard/invoices");
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up">
      <div className="flex-1 w-full space-y-6">
        {error && (
          <div className="border-[2px] border-danger bg-danger/10 text-danger p-4 text-sm font-bold" role="alert">
            {error}
          </div>
        )}

        {/* Client & Date Details */}
        <div className="bg-surface border-[2.5px] border-border p-6" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
          <div className="flex items-center gap-2 mb-6 border-b-[2.5px] border-border pb-3">
            <div className="w-6 h-6 bg-secondary border-[2px] border-border flex items-center justify-center">
              <span className="text-[10px] font-black uppercase text-black">1</span>
            </div>
            <h2 className="text-xl font-black uppercase tracking-wide">
              Invoice Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="invoice-client"
                className="block text-xs font-black uppercase tracking-wider mb-2"
              >
                Client
              </label>
              <div className="relative">
                <select
                  id="invoice-client"
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="neo-input px-3 py-3 text-sm appearance-none pr-10"
                >
                  <option value="" disabled>Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-foreground/50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="invoice-due-date"
                className="block text-xs font-black uppercase tracking-wider mb-2"
              >
                Due Date
              </label>
              <input
                id="invoice-due-date"
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="neo-input px-3 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-surface border-[2.5px] border-border p-6" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
          <div className="flex items-center justify-between border-b-[2.5px] border-border pb-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-info border-[2px] border-border flex items-center justify-center">
                <span className="text-[10px] font-black uppercase text-black">2</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-wide">
                Line Items
              </h2>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="neo-btn neo-btn-ghost px-3 py-1.5 text-xs border-[2px]"
            >
              + Add Row
            </button>
          </div>

          <div className="space-y-4">
            {/* Header row (desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-black uppercase tracking-wider text-muted">
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {items.map((item, index) => {
              const lineTotal = item.quantity * item.price;
              return (
                <div
                  key={index}
                  className={`
                    grid grid-cols-1 sm:grid-cols-12 gap-3 items-end p-4 sm:p-0
                    ${index > 0 ? "pt-4 border-t-[2px] border-border/20 sm:pt-0 sm:border-0" : ""}
                  `}
                >
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-black uppercase tracking-wider mb-1 sm:hidden">
                      Description
                    </label>
                    <input
                      required
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      placeholder="Service description"
                      className="neo-input px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-wider mb-1 sm:hidden">
                      Qty
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="neo-input px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-wider mb-1 sm:hidden">
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={0.01}
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="neo-input px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 h-full pb-[5px] sm:pb-0">
                    <span className="text-sm font-black whitespace-nowrap">
                      {formatCurrency(lineTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="text-muted hover:text-danger disabled:opacity-30 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Totals & Submit Sidebar */}
      <div className="w-full lg:w-[340px] shrink-0 space-y-6 lg:sticky lg:top-8">
        <div className="bg-primary border-[2.5px] border-border p-6" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
          <div className="flex items-center gap-2 mb-6 border-b-[2.5px] border-border pb-3">
            <div className="w-6 h-6 bg-background border-[2px] border-border flex items-center justify-center">
              <span className="text-[10px] font-black uppercase text-foreground">3</span>
            </div>
            <h2 className="text-xl font-black uppercase tracking-wide text-black">
              Summary
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-black">
              <span className="uppercase text-black/70 font-black">Subtotal</span>
              <span className="text-base">{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center gap-4 text-black">
              <label
                htmlFor="tax-rate"
                className="uppercase text-black/70 text-sm font-black shrink-0"
              >
                Tax (%)
              </label>
              <input
                id="tax-rate"
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="neo-input px-2 py-1.5 text-sm w-24 text-right bg-surface"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold border-b-[2.5px] border-border pb-4 text-black">
              <span className="uppercase text-black/70 font-black">Tax Amt</span>
              <span className="text-base">{formatCurrency(taxAmount)}</span>
            </div>

            <div className="flex justify-between items-center pt-2 text-black">
              <span className="font-black uppercase text-xl">Total</span>
              <span className="font-black text-2xl bg-surface px-3 py-1 border-[2.5px] border-border" style={{ boxShadow: "2px 2px 0px var(--border)", transform: "rotate(-1deg)" }}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="neo-btn bg-foreground text-background border-[2.5px] border-border px-6 py-4 text-sm font-black uppercase tracking-widest w-full"
            style={{ boxShadow: "4px 4px 0px var(--border)" }}
          >
            {loading ? "Creating…" : "Save Invoice"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="neo-btn neo-btn-ghost px-6 py-3 text-sm font-bold uppercase tracking-wider w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
