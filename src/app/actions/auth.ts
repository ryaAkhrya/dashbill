"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/action-result";

export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/dashboard");
}

export async function signupAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/dashboard");
}

export async function demoLoginAction(
  _prevState: ActionResult | null
): Promise<ActionResult> {
  const supabase = await createClient();

  const email = "demo@dashbill.app";
  const password = "demodashbill123";

  // Try signing in with existing demo account
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!signInError) {
    redirect("/dashboard");
  }

  // Account doesn't exist — create it
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return {
      success: false,
      error: "Demo login unavailable. Create an account manually.",
    };
  }

  // Sign in after creation
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error:
        "Demo account created but requires email confirmation. Disable email confirmation in Supabase Auth settings.",
    };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
