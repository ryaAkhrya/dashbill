"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import type { ActionResult } from "@/lib/action-result";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(loginAction, null);

  const error = state?.success === false ? state.error : null;

  return (
    <div className="neo-card rounded-md p-8 w-full max-w-sm">
      <h1 className="text-2xl mb-1 tracking-tight">Welcome back</h1>
      <p className="text-sm text-foreground/60 mb-6">
        Sign in to your DashBill account.
      </p>

      {error && (
        <div className="border-2 border-destructive bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm font-bold">
          {error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="login-username" className="block text-sm font-bold mb-1">
            Username
          </label>
          <input
            id="login-username"
            name="username"
            type="text"
            required
            autoComplete="username"
            className="neo-input w-full px-3 py-2 rounded-md"
            placeholder="johndoe"
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-bold mb-1"
          >
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="neo-input w-full px-3 py-2 rounded-md"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="neo-btn neo-btn-primary rounded-md px-4 py-3 w-full"
        >
          {pending ? "Signing in..." : "Login"}
        </button>
      </form>



      <p className="text-sm text-center mt-6 text-foreground/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-foreground underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
