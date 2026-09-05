import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MetricCard } from "@/components/dashboard/metric-card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { InvoiceStatus } from "@/lib/types";

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
      .select("id, name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("invoices")
      .select("id, status, total_amount, created_at, clients!inner(name)")
      .eq("clients.user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const clients = clientsResult.data ?? [];
  const invoices = invoicesResult.data ?? [];

  const totalClients = clients.length;
  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

  const pendingInvoices = invoices.filter((inv) =>
    ["Draft", "Sent"].includes(inv.status)
  ).length;

  const overdueInvoices = invoices.filter(
    (inv) => inv.status === "Overdue"
  ).length;

  const recentInvoices = invoices.slice(0, 5);
  const recentClients = clients.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center bg-primary border-[2px] border-border px-3 py-1 mb-3" style={{ boxShadow: "2px 2px 0px var(--border)" }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-black">
              Overview
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Welcome back.
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/invoices/new" className="neo-btn neo-btn-primary px-5 py-2.5 text-sm">
            + New Invoice
          </Link>
          <Link href="/dashboard/clients" className="neo-btn neo-btn-secondary px-5 py-2.5 text-sm">
            + Add Client
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Revenue Card */}
        <div className="lg:col-span-2">
          <MetricCard
            variant="primary"
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            bgColor="bg-surface"
            trendPlaceholder={true}
            className="h-full"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            }
          />
        </div>

        {/* Secondary Metric Cards */}
        <div className="flex flex-col gap-6">
          <MetricCard
            variant="secondary"
            label="Pending Invoices"
            value={pendingInvoices}
            bgColor="bg-warning"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            }
          />
          <MetricCard
            variant="secondary"
            label="Overdue"
            value={overdueInvoices}
            bgColor="bg-danger"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            }
          />
          <MetricCard
            variant="secondary"
            label="Total Clients"
            value={totalClients}
            bgColor="bg-info"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Recent Invoices */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black">Recent Invoices</h2>
            <Link href="/dashboard/invoices" className="text-sm font-bold text-muted hover:text-foreground underline underline-offset-4">
              View all
            </Link>
          </div>
          
          <div className="bg-surface border-[2.5px] border-border" style={{ boxShadow: "4px 4px 0px var(--border)" }}>
            {recentInvoices.length === 0 ? (
              <div className="p-8 text-center text-muted font-medium">No invoices yet.</div>
            ) : (
              <div className="divide-y-[2px] divide-border/30">
                {recentInvoices.map((inv) => (
                  <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-background-muted transition-colors group">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black uppercase tracking-wider text-muted">{(inv.clients as any).name}</span>
                      <span className="text-sm font-bold">{formatDate(inv.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black">{formatCurrency(inv.total_amount)}</span>
                      <span className={`neo-badge ${
                        inv.status === "Paid" ? "badge-paid" :
                        inv.status === "Sent" ? "badge-sent" :
                        inv.status === "Overdue" ? "badge-overdue" : "badge-draft"
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black">New Clients</h2>
            <Link href="/dashboard/clients" className="text-sm font-bold text-muted hover:text-foreground underline underline-offset-4">
              View all
            </Link>
          </div>
          
          <div className="bg-surface border-[2.5px] border-border p-4 flex flex-col gap-3" style={{ boxShadow: "4px 4px 0px var(--border)" }}>
            {recentClients.length === 0 ? (
              <div className="py-4 text-center text-muted font-medium">No clients yet.</div>
            ) : (
              recentClients.map((client) => (
                <div key={client.id} className="flex items-center gap-3 p-3 border-[2px] border-border hover:bg-background-muted transition-colors">
                  <div className="w-8 h-8 bg-secondary border-[2px] border-border flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-black uppercase">{client.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{client.name}</p>
                    <p className="text-xs font-medium text-muted truncate">Added {formatDate(client.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
