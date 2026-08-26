import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DashBill — Invoicing for Freelancers",
  description: "Create, manage, and export professional PDF invoices in seconds. Built for freelancers who value speed and clarity.",
  keywords: ["invoice", "freelancer", "billing", "pdf export", "dashbill", "dashboard"],
  openGraph: {
    title: "DashBill — Invoicing for Freelancers",
    description: "Create, manage, and export professional PDF invoices in seconds.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
