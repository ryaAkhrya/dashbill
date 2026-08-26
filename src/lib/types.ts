/** Database entity types — mirrors DATABASE_SCHEMA.md */

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string;
  address: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  status: InvoiceStatus;
  due_date: string;
  total_amount: number;
  created_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  price: number;
}

/** Invoice with nested client info and line items — used for list display and PDF */
export interface InvoiceWithDetails extends Invoice {
  invoice_items: InvoiceItem[];
  clients: Pick<Client, "id" | "name" | "email" | "address">;
}
