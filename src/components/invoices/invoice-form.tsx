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
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {error && (
        <div className="border-2 border-destructive bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm font-bold">
          {error}
        </div>
      )}

      <div className="neo-card rounded-md p-6 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Client select */}
          <div>
            <label
              htmlFor="invoice-client"
              className="block text-sm font-bold mb-1"
            >
              Client
            </label>
            <select
              id="invoice-client"
              required
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="neo-input w-full px-3 py-2 rounded-md"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due date */}
          <div>
            <label
              htmlFor="invoice-due-date"
              className="block text-sm font-bold mb-1"
            >
              Due Date
            </label>
            <input
              id="invoice-due-date"
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="neo-input w-full px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="neo-card rounded-md p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Line Items</h2>
          <button
            type="button"
            onClick={addItem}
            className="neo-btn neo-btn-ghost rounded-md px-3 py-1 text-sm"
          >
            + Add Row
          </button>
        </div>

        <div className="space-y-3">
          {/* Header row (desktop) */}
          <div className="hidden sm:grid grid-cols-12 gap-2 text-sm font-bold text-foreground/60 px-1">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2 text-right">Amount</div>
            <div className="col-span-1" />
          </div>

          {items.map((item, index) => {
            const lineTotal = item.quantity * item.price;
            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end"
              >
                <div className="sm:col-span-5">
                  <label className="block text-xs font-bold mb-1 sm:hidden">
                    Description
                  </label>
                  <input
                    required
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    placeholder="Service description"
                    className="neo-input w-full px-3 py-2 rounded-md text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 sm:hidden">
                    Qty
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", parseInt(e.target.value) || 0)
                    }
                    className="neo-input w-full px-3 py-2 rounded-md text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1 sm:hidden">
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
                    className="neo-input w-full px-3 py-2 rounded-md text-sm"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center justify-end">
                  <span className="text-sm font-bold">
                    {formatCurrency(lineTotal)}
                  </span>
                </div>
                <div className="sm:col-span-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="text-destructive font-bold text-lg disabled:opacity-30 px-2"
                    aria-label="Remove item"
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Totals */}
      <div className="neo-card rounded-md p-6 mb-6">
        <div className="max-w-xs ml-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Subtotal</span>
            <span className="font-bold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm items-center gap-2">
            <label
              htmlFor="tax-rate"
              className="text-foreground/60 shrink-0"
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
              onChange={(e) =>
                setTaxRate(parseFloat(e.target.value) || 0)
              }
              className="neo-input px-2 py-1 rounded-md text-sm w-20 text-right"
            />
            <span className="font-bold w-24 text-right">
              {formatCurrency(taxAmount)}
            </span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t-2 border-black">
            <span className="font-bold">Total</span>
            <span className="font-[900]">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="neo-btn neo-btn-ghost rounded-md px-6 py-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="neo-btn neo-btn-primary rounded-md px-6 py-3"
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
      </div>
    </form>
  );
}
