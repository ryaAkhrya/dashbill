"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Invoice, InvoiceItem, InvoiceStatus } from "@/lib/types";
import type { ActionResult } from "@/lib/action-result";

// ---------------------
// Types
// ---------------------

interface InvoiceItemInput {
  description: string;
  quantity: number;
  price: number;
}

interface CreateInvoiceInput {
  client_id: string;
  due_date: string;
  items: InvoiceItemInput[];
}

interface InvoiceWithItems extends Invoice {
  invoice_items: InvoiceItem[];
}

// ---------------------
// Validation
// ---------------------

function validateInvoiceInput(input: CreateInvoiceInput): string | null {
  if (!input.client_id.trim()) return "Client is required.";
  if (!input.due_date) return "Due date is required.";
  if (!input.items.length) return "At least one item is required.";

  for (let i = 0; i < input.items.length; i++) {
    const item = input.items[i];
    if (!item.description.trim()) {
      return `Item ${i + 1}: description is required.`;
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return `Item ${i + 1}: quantity must be a positive integer.`;
    }
    if (typeof item.price !== "number" || item.price < 0) {
      return `Item ${i + 1}: price must be a non-negative number.`;
    }
  }

  return null;
}

function calculateTotal(items: InvoiceItemInput[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

// ---------------------
// Auth helper
// ---------------------

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

// ---------------------
// CRUD Operations
// ---------------------

export async function getInvoices(): Promise<ActionResult<InvoiceWithItems[]>> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  // Fetch invoices for the current user's clients, including items
  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      invoice_items (*),
      clients!inner (user_id)
    `)
    .eq("clients.user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  // Strip the joined clients data — only needed for the RLS filter
  const invoices = (data ?? []).map(
    ({ clients: _clients, ...invoice }) => invoice
  ) as InvoiceWithItems[];

  return { success: true, data: invoices };
}

export async function getInvoice(
  invoiceId: string
): Promise<ActionResult<InvoiceWithItems>> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      invoice_items (*),
      clients!inner (user_id)
    `)
    .eq("id", invoiceId)
    .eq("clients.user_id", user.id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  const { clients: _clients, ...invoice } = data;
  return { success: true, data: invoice as InvoiceWithItems };
}

export async function createInvoiceAction(
  input: CreateInvoiceInput
): Promise<ActionResult<Invoice>> {
  const validationError = validateInvoiceInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  // Verify the client belongs to this user
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .eq("id", input.client_id)
    .eq("user_id", user.id)
    .single();

  if (clientError || !client) {
    return { success: false, error: "Client not found." };
  }

  const totalAmount = calculateTotal(input.items);

  // Insert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      client_id: input.client_id,
      due_date: input.due_date,
      total_amount: totalAmount,
      status: "Draft" as InvoiceStatus,
    })
    .select()
    .single();

  if (invoiceError || !invoice) {
    return { success: false, error: invoiceError?.message ?? "Failed to create invoice." };
  }

  // Insert invoice items
  const itemRows = input.items.map((item) => ({
    invoice_id: invoice.id,
    description: item.description.trim(),
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("invoice_items")
    .insert(itemRows);

  if (itemsError) {
    // Rollback: delete the orphaned invoice
    await supabase.from("invoices").delete().eq("id", invoice.id);
    return { success: false, error: itemsError.message };
  }

  revalidatePath("/dashboard/invoices");
  return { success: true, data: invoice as Invoice };
}

export async function updateInvoiceStatusAction(
  invoiceId: string,
  status: InvoiceStatus
): Promise<ActionResult<Invoice>> {
  const validStatuses: InvoiceStatus[] = ["Draft", "Sent", "Paid", "Overdue"];
  if (!validStatuses.includes(status)) {
    return { success: false, error: `Invalid status: ${status}` };
  }

  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  // RLS handles ownership, but we also filter explicitly
  const { data, error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", invoiceId)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/invoices");
  return { success: true, data: data as Invoice };
}

export async function deleteInvoiceAction(
  invoiceId: string
): Promise<ActionResult> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  // invoice_items are cascade-deleted via FK
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", invoiceId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/invoices");
  return { success: true, data: null };
}
