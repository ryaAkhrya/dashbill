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
    <form onSubmit={handleSubmit} className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full space-y-6">
        {error && (
          <div className="border-[3px] border-black bg-[#FCA5A5] text-black shadow-[4px_4px_0px_#000] p-4 font-black uppercase tracking-wide">
            {error}
          </div>
        )}

        {/* Client & Date Details */}
        <div className="neo-card p-6 bg-[#D8B4FE] border-[3px] shadow-[6px_6px_0px_#000]">
          <h2 className="text-xl font-[900] uppercase tracking-wide border-b-[3px] border-black pb-3 mb-4 text-black">
            Invoice Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="invoice-client"
                className="block text-sm font-[900] uppercase mb-2 text-black"
              >
                Client
              </label>
              <select
                id="invoice-client"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="neo-input w-full px-4 py-3 rounded-none border-[3px] text-black font-bold focus:shadow-[4px_4px_0px_#000]"
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="invoice-due-date"
                className="block text-sm font-[900] uppercase mb-2 text-black"
              >
                Due Date
              </label>
              <input
                id="invoice-due-date"
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="neo-input w-full px-4 py-3 rounded-none border-[3px] text-black font-bold focus:shadow-[4px_4px_0px_#000]"
              />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="neo-card p-6 bg-white border-[3px] shadow-[6px_6px_0px_#000]">
          <div className="flex items-center justify-between border-b-[3px] border-black pb-3 mb-4">
            <h2 className="text-xl font-[900] uppercase tracking-wide text-black">
              Line Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="neo-btn bg-[#A6FF00] rounded-none px-4 py-1.5 text-sm uppercase tracking-wider text-black border-[3px]"
            >
              + Add Row
            </button>
          </div>

          <div className="space-y-4">
            {/* Header row (desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-3 text-xs font-[900] uppercase tracking-wider text-black">
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
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-black/5 p-4 sm:p-2 sm:bg-transparent border-[3px] sm:border-0 border-black relative"
                >
                  <div className="sm:col-span-6">
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
                      className="neo-input w-full px-3 py-2 rounded-none border-[3px] text-black font-bold"
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
                        updateItem(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="neo-input w-full px-3 py-2 rounded-none border-[3px] text-black font-bold"
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
                      className="neo-input w-full px-3 py-2 rounded-none border-[3px] text-black font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-base font-black text-black bg-[#FFE600] px-2 py-1 border-[2px] border-black sm:bg-transparent sm:border-0 sm:px-0">
                      {formatCurrency(lineTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="text-white bg-[#F87171] border-[2px] border-black disabled:opacity-50 disabled:bg-gray-400 px-2 py-0.5 hover:translate-x-0.5 hover:translate-y-0.5 transition-transform shadow-[2px_2px_0px_#000] active:shadow-none font-bold"
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
      </div>

      {/* Totals & Submit Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="neo-card p-6 bg-[#FFE600] border-[3px] shadow-[6px_6px_0px_#000]">
          <h2 className="text-xl font-[900] uppercase tracking-wide border-b-[3px] border-black pb-3 mb-4 text-black">
            Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="uppercase text-black/70">Subtotal</span>
              <span className="text-lg">{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center gap-2 font-bold">
              <label
                htmlFor="tax-rate"
                className="uppercase text-black/70 text-sm shrink-0"
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
                className="neo-input px-2 py-1 rounded-none border-[2px] text-sm w-20 text-right bg-white"
              />
            </div>
            
            <div className="flex justify-between items-center text-sm font-bold border-b-[3px] border-black pb-4">
              <span className="uppercase text-black/70">Tax Amt</span>
              <span className="text-lg">{formatCurrency(taxAmount)}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-[900] uppercase text-black text-xl">Total</span>
              <span className="font-[900] text-3xl bg-white px-2 py-1 border-[3px] border-black shadow-[2px_2px_0px_#000] -rotate-1">
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
            className="neo-btn bg-[#60A5FA] border-[3px] text-black px-6 py-4 text-lg font-black uppercase tracking-wider rounded-none shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
          >
            {loading ? "Creating..." : "Save Invoice"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="neo-btn bg-white border-[3px] text-black px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-none shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#000]"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
