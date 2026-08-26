"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { deleteClientAction } from "@/app/actions/clients";
import { ClientFormModal } from "./client-form-modal";
import { redirect } from "next/navigation";

interface ClientListProps {
  clients: Client[];
}

export function ClientList({ clients }: ClientListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  function handleAdd() {
    setClientToEdit(null);
    setIsModalOpen(true);
  }

  function handleEdit(client: Client) {
    setClientToEdit(client);
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-[900] text-black">Client Database</h2>
        <button
          onClick={handleAdd}
          className="neo-btn neo-btn-primary rounded-none px-6 py-3 text-sm font-black uppercase tracking-wider bg-[#A6FF00]"
        >
          + Add Client
        </button>
      </div>

      {!clients.length ? (
        <div className="neo-card p-12 text-center bg-white border-[3px]">
          <h3 className="text-2xl font-[900] mb-2">No clients yet</h3>
          <p className="text-foreground/70 font-bold">Add your first client to get started.</p>
        </div>
      ) : (
        <div className="neo-card overflow-x-auto bg-white border-[3px] shadow-[6px_6px_0px_#000]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#D8B4FE] border-b-[3px] border-black">
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black">Name</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black">Email</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm border-r-[3px] border-black text-black">Address</th>
                <th className="p-4 font-[900] uppercase tracking-wider text-sm w-40 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, idx) => (
                <tr
                  key={client.id}
                  className={`
                    group transition-all hover:bg-black/5
                    ${idx !== clients.length - 1 ? "border-b-[3px] border-black" : ""}
                  `}
                >
                  <td className="p-4 font-[900] border-r-[3px] border-black text-black">{client.name}</td>
                  <td className="p-4 font-bold border-r-[3px] border-black">{client.email}</td>
                  <td className="p-4 font-bold border-r-[3px] border-black whitespace-pre-wrap">{client.address || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="px-3 py-1.5 border-[3px] border-black font-black text-xs uppercase bg-[#60A5FA] shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm("Delete this client?")) {
                            await deleteClientAction(client.id);
                          }
                        }}
                        className="px-3 py-1.5 border-[3px] border-black font-black text-xs uppercase bg-[#F87171] shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={clientToEdit}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
