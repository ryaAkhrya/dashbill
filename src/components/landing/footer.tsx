import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-10 px-4 sm:px-6 border-t-[3px] border-border">
      <div className="max-w-[1200px] mx-auto">

        {/* Top row: Brand + Nav */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">

          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 bg-primary border-[2.5px] flex items-center justify-center shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.2)", boxShadow: "2px 2px 0px rgba(0,0,0,0.4)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <Link href="/" className="font-black text-2xl tracking-tight text-background">
                DashBill
              </Link>
            </div>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(241,239,230,0.55)" }}>
              Professional invoicing for freelancers.
              Create, send, and track invoices without
              the subscription trap.
            </p>

            {/* Status strip */}
            <div className="mt-5 inline-flex items-center gap-2 border-[2px] px-3 py-1.5" style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(163,230,53,0.12)" }}>
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: "rgba(163,230,53,0.9)" }}>All systems operational</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: "rgba(241,239,230,0.35)" }}>
                Product
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="#features"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  Features
                </a>
                <a
                  href="#faq"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  FAQ
                </a>
                <Link
                  href="/signup"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  Log In
                </Link>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: "rgba(241,239,230,0.35)" }}>
                Legal
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="#"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="text-sm font-bold transition-colors hover:text-primary"
                  style={{ color: "rgba(241,239,230,0.65)" }}
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(241,239,230,0.1)" }}>
          <p className="text-xs font-bold" style={{ color: "rgba(241,239,230,0.35)" }}>
            © {currentYear} DashBill. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black bg-primary"
              style={{ boxShadow: "1px 1px 0px rgba(0,0,0,0.3)" }}
            >
              v2.0
            </div>
            <p className="text-xs font-bold" style={{ color: "rgba(241,239,230,0.35)" }}>
              Built for freelancers who value speed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
