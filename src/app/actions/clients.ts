"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/lib/types";
import type { ActionResult } from "@/lib/action-result";

// ---------------------
// Validation
// ---------------------

interface ClientInput {
  name: string;
  email: string;
  address?: string;
}

function validateClientInput(input: ClientInput): string | null {
  if (!input.name.trim()) return "Client name is required.";
  if (!input.email.trim()) return "Client email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return "Invalid email format.";
  }
  return null;
}

// ---------------------
// CRUD Operations
// ---------------------

export async function getClients(): Promise<ActionResult<Client[]>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Client[] };
}

export async function getClient(
  clientId: string
): Promise<ActionResult<Client>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Client };
}

export async function createClientAction(
  input: ClientInput
): Promise<ActionResult<Client>> {
  const validationError = validateClientInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      user_id: user.id,
      name: input.name.trim(),
      email: input.email.trim(),
      address: input.address?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true, data: data as Client };
}

export async function updateClientAction(
  clientId: string,
  input: ClientInput
): Promise<ActionResult<Client>> {
  const validationError = validateClientInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("clients")
    .update({
      name: input.name.trim(),
      email: input.email.trim(),
      address: input.address?.trim() || null,
    })
    .eq("id", clientId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true, data: data as Client };
}

export async function deleteClientAction(
  clientId: string
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated." };
  }

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard/clients");
  return { success: true, data: null };
}
