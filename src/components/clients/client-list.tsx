"use client";

import { useState } from "react";
import type { Client } from "@/lib/types";
import { deleteClientAction } from "@/app/actions/clients";
import { ClientFormModal } from "./client-form-modal";

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
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-black tracking-tight">Client Database</h2>
        <button
          onClick={handleAdd}
          className="neo-btn neo-btn-primary px-6 py-3 text-sm shrink-0"
        >
          + Add Client
        </button>
      </div>

      {!clients.length ? (
        <div className="bg-surface border-[2.5px] border-border p-12 text-center flex flex-col items-center justify-center" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
          <div className="w-16 h-16 bg-background-muted border-[2.5px] border-border flex items-center justify-center mb-6" style={{ boxShadow: "3px 3px 0px var(--border)", transform: "rotate(-2deg)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-2xl font-black mb-2">No clients yet</h3>
          <p className="text-muted font-medium max-w-sm mb-6">
            Add your first client to start creating invoices and tracking payments.
          </p>
          <button
            onClick={handleAdd}
            className="neo-btn neo-btn-primary px-5 py-2.5 text-sm"
          >
            Add First Client
          </button>
        </div>
      ) : (
        <div className="bg-surface border-[2.5px] border-border overflow-x-auto" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-background-muted border-b-[2.5px] border-border">
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border w-1/3">Name</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border w-1/3">Email</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs border-r-[2.5px] border-border">Address</th>
                <th className="p-4 font-black uppercase tracking-wider text-xs w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, idx) => (
                <tr
                  key={client.id}
                  className={`
                    group transition-colors hover:bg-background/50
                    ${idx !== clients.length - 1 ? "border-b-[2px] border-border/30" : ""}
                  `}
                >
                  <td className="p-4 font-bold border-r-[2px] border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary border-[2px] border-border flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-black uppercase">{client.name[0]}</span>
                      </div>
                      <span className="truncate">{client.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-foreground/80 border-r-[2px] border-border/30 truncate">{client.email}</td>
                  <td className="p-4 font-medium text-foreground/80 border-r-[2px] border-border/30 whitespace-pre-wrap truncate max-w-[200px]">{client.address || "—"}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-1.5 text-muted hover:text-foreground transition-colors"
                        aria-label="Edit client"
                        title="Edit client"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm("Delete this client? This cannot be undone.")) {
                            await deleteClientAction(client.id);
                          }
                        }}
                        className="p-1.5 text-muted hover:text-danger transition-colors"
                        aria-label="Delete client"
                        title="Delete client"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
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
