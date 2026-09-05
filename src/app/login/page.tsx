import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata = {
  title: "Login — DashBill",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-background ledger-pattern">
      {/* Left: Brand Panel */}
      <div className="flex flex-col justify-between p-8 lg:p-14 bg-foreground lg:border-r-[2.5px] border-b-[2.5px] lg:border-b-0 border-border relative overflow-hidden">
        {/* Background dot texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />

        {/* Top: Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5 w-fit group">
          <div
            className="w-8 h-8 bg-primary border-[2px] border-primary/30 flex items-center justify-center"
            style={{ boxShadow: "2px 2px 0px rgba(255,230,0,0.3)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="font-black text-xl text-background tracking-tight">DashBill</span>
        </Link>

        {/* Middle: Headline + visual */}
        <div className="relative z-10 my-10 lg:my-0">
          <h2 className="text-3xl lg:text-5xl font-black text-background tracking-tight leading-tight mb-6 max-w-sm">
            Your business,<br />
            <span className="text-primary">fully under control.</span>
          </h2>

          {/* Mini invoice preview */}
          <div
            className="bg-background border-[2px] border-background/20 p-4 max-w-xs"
            style={{ boxShadow: "6px 6px 0px rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-background-muted/30">
              <span className="text-xs font-black text-foreground/80 uppercase tracking-wider">Invoice #0041</span>
              <span
                className="bg-success border border-success/50 text-black text-[9px] font-black uppercase px-2 py-0.5"
                style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.2)" }}
              >
                Paid
              </span>
            </div>
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-foreground/60 font-medium">UI Design — 20h</span>
                <span className="font-black text-foreground">$2,000</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/60 font-medium">Brand Kit</span>
                <span className="font-black text-foreground">$400</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-background-muted/30">
              <span className="text-xs font-black text-foreground/80 uppercase">Total</span>
              <span
                className="text-sm font-black text-black bg-primary px-2 py-0.5 border border-primary/30"
                style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.15)" }}
              >
                $2,400
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: trust signals */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {["No subscriptions", "PDF export", "Secure data"].map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-black text-background/60 bg-background/10 border border-background/20 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
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
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
