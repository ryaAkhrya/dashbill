import { getClients } from "@/app/actions/clients";
import { ClientList } from "@/components/clients/client-list";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Clients — DashBill",
};

export default async function ClientsPage() {
  const result = await getClients();

  if (!result.success) {
    redirect("/login");
  }

  const clients = result.data;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-[900] tracking-tight text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">Clients</h1>
          <p className="font-bold text-foreground/60 mt-1">Manage your customer database.</p>
        </div>
      </div>

      <ClientList clients={clients} />
    </div>
  );
}
