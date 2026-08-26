"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions/auth";
import type { ActionResult } from "@/lib/action-result";

export function SignupForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(signupAction, null);

  const error = state?.success === false ? state.error : null;

  return (
    <div className="neo-card rounded-md p-8 w-full max-w-sm">
      <h1 className="text-2xl mb-1 tracking-tight">Create account</h1>
      <p className="text-sm text-foreground/60 mb-6">
        Get started with DashBill.
      </p>

      {error && (
        <div className="border-2 border-destructive bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm font-bold">
          {error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-bold mb-1"
          >
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="neo-input w-full px-3 py-2 rounded-md"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-bold mb-1"
          >
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="neo-input w-full px-3 py-2 rounded-md"
            placeholder="Min. 6 characters"
          />
        </div>
        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-sm font-bold mb-1"
          >
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="neo-input w-full px-3 py-2 rounded-md"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="neo-btn neo-btn-primary rounded-md px-4 py-3 w-full"
        >
          {pending ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-foreground/60">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-foreground underline">
          Login
        </Link>
      </p>
    </div>
  );
}
