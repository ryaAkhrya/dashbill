"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDFDocument, type InvoicePDFDocumentProps } from "./invoice-pdf-document";

export function InvoicePDFViewer({
  invoice,
  client,
  items,
}: InvoicePDFDocumentProps) {
  return (
    <PDFDownloadLink
      document={
        <InvoicePDFDocument invoice={invoice} client={client} items={items} />
      }
      fileName={`invoice-${invoice.id.slice(0, 8)}.pdf`}
    >
      {({ loading }) => (
        <button
          className="neo-btn neo-btn-primary rounded-md px-4 py-2 text-sm"
          disabled={loading}
        >
          {loading ? "Generating..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
