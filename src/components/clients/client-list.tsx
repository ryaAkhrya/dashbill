"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteClientAction } from "@/app/actions/clients";
import { ClientFormModal } from "./client-form-modal";
import type { Client } from "@/lib/types";

export function ClientList({
  initialClients,
}: {
  initialClients: Client[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleAdd() {
    setEditingClient(null);
    setModalOpen(true);
  }

  function handleEdit(client: Client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  async function handleDelete(clientId: string) {
    if (
      !confirm(
        "Delete this client? All associated invoices will also be deleted."
      )
    )
      return;

    setDeletingId(clientId);
    const result = await deleteClientAction(clientId);
    setDeletingId(null);

    if (result.success) {
      router.refresh();
    }
  }

  function handleSuccess() {
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Clients</h1>
        <button
          onClick={handleAdd}
          className="neo-btn neo-btn-primary rounded-md px-4 py-2 text-sm"
        >
          + Add Client
        </button>
      </div>

      {initialClients.length === 0 ? (
        <div className="neo-card rounded-md p-8 text-center">
          <p className="text-foreground/60 font-bold">No clients yet.</p>
          <p className="text-sm text-foreground/40 mt-1">
            Add your first client to get started.
          </p>
        </div>
      ) : (
        <div className="neo-card rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black bg-background-muted">
                  <th className="text-left px-4 py-3 text-sm font-bold">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-bold hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-bold hidden md:table-cell">
                    Address
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-bold w-40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {initialClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-black/10 last:border-0"
                  >
                    <td className="px-4 py-3 font-bold">{client.name}</td>
                    <td className="px-4 py-3 text-sm hidden sm:table-cell">
                      {client.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground/60 hidden md:table-cell">
                      {client.address || "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="neo-btn neo-btn-ghost rounded-md px-3 py-1 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          disabled={deletingId === client.id}
                          className="neo-btn neo-btn-destructive rounded-md px-3 py-1 text-sm"
                        >
                          {deletingId === client.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ClientFormModal
        client={editingClient}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
