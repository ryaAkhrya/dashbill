"use client";

import { useState } from "react";
import {
  createClientAction,
  updateClientAction,
} from "@/app/actions/clients";
import type { Client } from "@/lib/types";

interface ClientFormModalProps {
  client?: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ClientFormModal({
  client,
  isOpen,
  onClose,
  onSuccess,
}: ClientFormModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isEditing = !!client;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const input = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
    };

    const result = isEditing
      ? await updateClientAction(client!.id, input)
      : await createClientAction(input);

    setLoading(false);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="neo-modal rounded-none p-8 w-full max-w-md relative z-10 border-[4px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-[900] tracking-tight uppercase text-black">
            {isEditing ? "Edit Client" : "Add Client"}
          </h2>
          <button
            onClick={onClose}
            className="neo-btn neo-btn-ghost rounded-md px-2 py-1 text-lg leading-none"
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {error && (
          <div className="border-2 border-destructive bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="client-name"
              className="block text-sm font-bold mb-1"
            >
              Name
            </label>
            <input
              id="client-name"
              name="name"
              required
              defaultValue={client?.name ?? ""}
              className="neo-input w-full px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="client-email"
              className="block text-sm font-bold mb-1"
            >
              Email
            </label>
            <input
              id="client-email"
              name="email"
              type="email"
              required
              defaultValue={client?.email ?? ""}
              className="neo-input w-full px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="client-address"
              className="block text-sm font-bold mb-1"
            >
              Address
            </label>
            <textarea
              id="client-address"
              name="address"
              rows={3}
              defaultValue={client?.address ?? ""}
              className="neo-input w-full px-3 py-2 rounded-md resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="neo-btn neo-btn-ghost rounded-md px-4 py-2 flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="neo-btn neo-btn-primary rounded-md px-4 py-2 flex-1"
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
