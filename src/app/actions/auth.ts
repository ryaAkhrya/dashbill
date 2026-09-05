"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/action-result";

export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const rawUsername = formData.get("username");
  const password = formData.get("password") as string;

  if (typeof rawUsername !== "string" || !password) {
    return { success: false, error: "Invalid username or password." };
  }

  const username = rawUsername.trim().toLowerCase();

  const usernameRegex = /^[a-z0-9_]{3,30}$/;
  if (!usernameRegex.test(username)) {
    return { success: false, error: "Invalid username or password." };
  }

  const email = `${username}@users.dashbill.local`;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: "Invalid username or password." };
  }

  redirect("/dashboard");
}

export async function signupAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const rawUsername = formData.get("username");
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (typeof rawUsername !== "string" || !password) {
    return { success: false, error: "Username and password are required." };
  }

  const username = rawUsername.trim().toLowerCase();

  const usernameRegex = /^[a-z0-9_]{3,30}$/;
  if (!usernameRegex.test(username)) {
    return { success: false, error: "Username must be 3-30 characters and contain only letters, numbers, and underscores." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters." };
  }

  const email = `${username}@users.dashbill.local`;

  const { error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    // Return generic message as Supabase might throw if email/username exists
    return { success: false, error: "Username is already taken or invalid." };
  }

  // Clear any auto-generated session
  await supabase.auth.signOut();
  redirect("/login");
}


export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
