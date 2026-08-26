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

  return <ClientList initialClients={result.data} />;
}
