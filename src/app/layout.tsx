import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DashBill — Invoice Dashboard for Freelancers",
  description:
    "Manage clients, track invoices, and generate PDF bills. Built for freelancers who value speed and clarity.",
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
