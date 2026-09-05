import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background border-t-[2.5px] border-border py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 bg-primary border-[2px] border-background/30 flex items-center justify-center"
                style={{ boxShadow: "2px 2px 0px rgba(255,255,255,0.2)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
              <Link href="/" className="font-black text-lg tracking-tight text-background">
                DashBill
              </Link>
            </div>
            <p className="text-sm font-medium text-background/60 leading-relaxed">
              Professional invoicing for freelancers. Create, send, and track invoices without the subscription trap.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-background/40 mb-3">Product</p>
              <div className="flex flex-col gap-2">
                <a href="#features" className="text-sm font-bold text-background/70 hover:text-background transition-colors">Features</a>
                <a href="#faq" className="text-sm font-bold text-background/70 hover:text-background transition-colors">FAQ</a>
                <Link href="/signup" className="text-sm font-bold text-background/70 hover:text-background transition-colors">Sign Up</Link>
                <Link href="/login" className="text-sm font-bold text-background/70 hover:text-background transition-colors">Log In</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-background/40 mb-3">Legal</p>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-sm font-bold text-background/70 hover:text-background transition-colors">Privacy</Link>
                <Link href="#" className="text-sm font-bold text-background/70 hover:text-background transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-background/40">
            © {currentYear} DashBill. All rights reserved.
          </p>
          <p className="text-xs font-bold text-background/40">
            Built for freelancers who value speed.
          </p>
        </div>
      </div>
    </footer>
  );
}
