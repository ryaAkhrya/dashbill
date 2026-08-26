import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MetricCard } from "@/components/dashboard/metric-card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Dashboard — DashBill",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch metrics in parallel
  const [clientsResult, invoicesResult] = await Promise.all([
    supabase
      .from("clients")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("invoices")
      .select("status, total_amount, clients!inner(user_id)")
      .eq("clients.user_id", user.id),
  ]);

  const totalClients = clientsResult.count ?? 0;
  const invoices = (invoicesResult.data ?? []) as {
    status: string;
    total_amount: number;
  }[];

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

  const pendingInvoices = invoices.filter((inv) =>
    ["Draft", "Sent"].includes(inv.status)
  ).length;

  const overdueInvoices = invoices.filter(
    (inv) => inv.status === "Overdue"
  ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header Overview */}
      <div className="flex flex-col gap-3 relative">
        <div className="inline-block border-[3px] border-black bg-white px-4 py-1.5 shadow-[4px_4px_0px_#000] w-fit transform -rotate-2">
          <span className="font-[900] text-sm uppercase tracking-widest text-black">
            Dashboard Overview
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-[900] tracking-tight leading-tight mt-2 text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
          Welcome back. <br className="hidden sm:block" /> Let&apos;s get paid today.
        </h1>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
        <MetricCard
          label="Total Clients"
          value={totalClients}
          badgeText="Active"
          bgColor="bg-pink-400" /* using tailwind class fallback or raw hex via prop */
          rawColor="#FF90E8"
          rotation="-rotate-1"
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          badgeText="Total"
          bgColor="bg-lime-400"
          rawColor="#A6FF00"
          rotation="rotate-1"
          trendPlaceholder={true}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
        />
        <MetricCard
          label="Pending Invoices"
          value={pendingInvoices}
          badgeText="Wait"
          bgColor="bg-yellow-400"
          rawColor="#FFC700"
          rotation="-rotate-2"
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          }
        />
        <MetricCard
          label="Overdue Invoices"
          value={overdueInvoices}
          badgeText="Late"
          bgColor="bg-red-400"
          rawColor="#FF6B6B"
          rotation="rotate-2"
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          }
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="neo-card p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-[900]">Quick Actions</h2>
          <p className="font-bold text-foreground/60 mt-1">Jump right back into work.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <Link href="/dashboard/invoices/new" className="neo-btn neo-btn-primary px-6 py-3 text-center flex-1 md:flex-none">
            + Create Invoice
          </Link>
          <Link href="/dashboard/clients" className="neo-btn neo-btn-secondary px-6 py-3 text-center flex-1 md:flex-none">
            Manage Clients
          </Link>
        </div>
      </div>
    </div>
  );
}
