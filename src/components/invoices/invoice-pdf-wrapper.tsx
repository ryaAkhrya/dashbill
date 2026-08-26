"use client";

import dynamic from "next/dynamic";
import type { InvoicePDFDocumentProps } from "./invoice-pdf-document";

const PDFViewerDynamic = dynamic(
  () => import("./invoice-pdf-viewer").then((mod) => mod.InvoicePDFViewer),
  {
    ssr: false,
    loading: () => (
      <span className="neo-btn neo-btn-ghost rounded-md px-4 py-2 text-sm opacity-50">
        Loading PDF...
      </span>
    ),
  }
);

export function InvoicePDFWrapper(props: InvoicePDFDocumentProps) {
  return <PDFViewerDynamic {...props} />;
}
