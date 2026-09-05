import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export const metadata = {
  title: "Sign Up — DashBill",
};

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-background ledger-pattern">
      {/* Left: Brand Panel */}
      <div className="flex flex-col justify-between p-8 lg:p-14 bg-primary lg:border-r-[2.5px] border-b-[2.5px] lg:border-b-0 border-border relative overflow-hidden">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#000 0.8px, transparent 0.8px)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden="true"
        />

        {/* Top: Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5 w-fit group">
          <div
            className="w-8 h-8 bg-foreground border-[2px] border-border/30 flex items-center justify-center"
            style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-black text-xl text-foreground tracking-tight">DashBill</span>
        </Link>

        {/* Middle: Headline */}
        <div className="relative z-10 my-10 lg:my-0">
          <h2 className="text-3xl lg:text-5xl font-black text-black tracking-tight leading-tight mb-6 max-w-sm">
            Start invoicing<br />
            like a pro.
          </h2>
          <p className="text-base font-bold text-black/70 max-w-xs leading-relaxed mb-8">
            One account. Unlimited invoices. Professional PDFs in one click.
          </p>

          {/* Step list */}
          <div className="flex flex-col gap-3 max-w-xs">
            {[
              { num: "1", text: "Create your free account" },
              { num: "2", text: "Add your first client" },
              { num: "3", text: "Build and send your invoice" },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-3">
                <span
                  className="w-6 h-6 bg-foreground text-background text-[11px] font-black flex items-center justify-center shrink-0 border border-border/20"
                  style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.2)" }}
                >
                  {step.num}
                </span>
                <span className="text-sm font-bold text-black/80">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: emphasis */}
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-widest text-black/50">
            Free forever. No credit card needed.
          </p>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex flex-1 flex-col p-6 sm:p-12 bg-background">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
