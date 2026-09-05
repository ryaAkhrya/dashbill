"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signupAction } from "@/app/actions/auth";
import type { ActionResult } from "@/lib/action-result";

function PasswordInput({
  id,
  name,
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        required
        minLength={8}
        autoComplete={autoComplete}
        className="neo-input px-3 py-2.5 text-sm pr-10"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
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
  );
}

export function SignupForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(signupAction, null);

  const error = state?.success === false ? state.error : null;

  return (
    <div
      className="bg-surface border-[2.5px] border-border w-full max-w-sm p-8"
      style={{ boxShadow: "6px 6px 0px var(--border)" }}
    >
      <h1 className="text-2xl font-black tracking-tight mb-1">Create account</h1>
      <p className="text-sm font-medium text-muted mb-6">
        Get started with DashBill — free forever.
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
            htmlFor="signup-username"
            className="block text-xs font-black uppercase tracking-wider mb-1.5"
          >
            Username
          </label>
          <input
            id="signup-username"
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={30}
            pattern="[a-zA-Z0-9_]+"
            title="Letters, numbers, and underscores only"
            autoComplete="username"
            className="neo-input px-3 py-2.5 text-sm"
            placeholder="johndoe"
          />
          <p className="text-[10px] text-muted font-medium mt-1">
            3–30 characters. Letters, numbers, underscores.
          </p>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-xs font-black uppercase tracking-wider mb-1.5"
          >
            Password
          </label>
          <PasswordInput
            id="signup-password"
            name="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-xs font-black uppercase tracking-wider mb-1.5"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="signup-confirm"
            name="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="neo-btn neo-btn-primary px-4 py-3 text-sm w-full mt-1"
        >
          {pending ? "Creating account…" : "Sign Up"}
        </button>
      </form>

      <p className="text-xs text-center mt-6 text-muted font-medium">
        Already have an account?{" "}
        <Link href="/login" className="font-black text-foreground underline underline-offset-2">
          Login
        </Link>
      </p>
    </div>
  );
}
