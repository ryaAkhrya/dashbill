import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MetricCard } from "@/components/dashboard/metric-card";
import { formatCurrency } from "@/lib/utils";

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
    <div>
      <h1 className="text-2xl mb-6">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Clients" value={totalClients} />
        <MetricCard label="Total Revenue" value={formatCurrency(totalRevenue)} />
        <MetricCard label="Pending Invoices" value={pendingInvoices} />
        <MetricCard
          label="Overdue Invoices"
          value={overdueInvoices}
          variant="destructive"
        />
      </div>
    </div>
  );
}
