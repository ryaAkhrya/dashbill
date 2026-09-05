"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import type { ActionResult } from "@/lib/action-result";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  const error = state?.success === false ? state.error : null;

  return (
    <div
      className="bg-surface border-[2.5px] border-border w-full max-w-sm p-8"
      style={{ boxShadow: "6px 6px 0px var(--border)" }}
    >
      <h1 className="text-2xl font-black tracking-tight mb-1">Welcome back</h1>
      <p className="text-sm font-medium text-muted mb-6">
        Sign in to your DashBill account.
      </p>

      {error && (
        <div
          className="border-[2px] border-danger bg-danger/10 text-danger p-3 mb-5 text-sm font-bold"
          role="alert"
        >
          {error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="login-username"
            className="block text-xs font-black uppercase tracking-wider mb-1.5"
          >
            Username
          </label>
          <input
            id="login-username"
            name="username"
            type="text"
            required
            autoComplete="username"
            className="neo-input px-3 py-2.5 text-sm"
            placeholder="johndoe"
          />
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-xs font-black uppercase tracking-wider mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="neo-input px-3 py-2.5 text-sm pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="neo-btn neo-btn-primary px-4 py-3 text-sm w-full mt-1"
        >
          {pending ? "Signing in…" : "Login"}
        </button>
      </form>

      <p className="text-xs text-center mt-6 text-muted font-medium">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-black text-foreground underline underline-offset-2">
          Sign up
        </Link>
      </p>
    </div>
  );
}
