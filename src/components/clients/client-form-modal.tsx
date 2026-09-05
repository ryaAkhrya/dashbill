"use client";

import { useState, useEffect } from "react";
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
  const [render, setRender] = useState(isOpen);

  // Handle animation unmounting
  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

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
    } else {
      setError(result.error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onAnimationEnd={onAnimationEnd}
    >
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`neo-modal p-6 sm:p-8 w-full max-w-md relative z-10 ${isOpen ? "animate-scale-in" : "opacity-0 scale-95 transition-all duration-200"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              {isEditing ? "Edit Client" : "Add Client"}
            </h2>
            <p className="text-sm font-medium text-muted mt-1">
              {isEditing ? "Update client details." : "Add a new client to your database."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground hover:bg-background-muted transition-colors border-[2px] border-transparent hover:border-border"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="border-[2px] border-danger bg-danger/10 text-danger p-3 mb-5 text-sm font-bold" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="client-name"
              className="block text-xs font-black uppercase tracking-wider mb-1.5"
            >
              Name
            </label>
            <input
              id="client-name"
              name="name"
              required
              defaultValue={client?.name ?? ""}
              className="neo-input px-3 py-2.5 text-sm"
              placeholder="Acme Corp"
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="client-email"
              className="block text-xs font-black uppercase tracking-wider mb-1.5"
            >
              Email
            </label>
            <input
              id="client-email"
              name="email"
              type="email"
              required
              defaultValue={client?.email ?? ""}
              className="neo-input px-3 py-2.5 text-sm"
              placeholder="billing@acme.com"
            />
          </div>
          <div>
            <label
              htmlFor="client-address"
              className="block text-xs font-black uppercase tracking-wider mb-1.5"
            >
              Address
            </label>
            <textarea
              id="client-address"
              name="address"
              rows={3}
              defaultValue={client?.address ?? ""}
              className="neo-input px-3 py-2.5 text-sm resize-none"
              placeholder="123 Business St&#10;Suite 100&#10;City, State 12345"
            />
          </div>
          <div className="flex gap-3 pt-2 mt-2 border-t-[2px] border-border/20 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="neo-btn neo-btn-ghost px-4 py-2.5 text-sm flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="neo-btn neo-btn-primary px-4 py-2.5 text-sm flex-1"
            >
              {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
