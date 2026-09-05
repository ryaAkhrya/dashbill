import Link from "next/link";

function ProductPreview() {
  return (
    <div className="relative w-full max-w-[90%] sm:max-w-lg mx-auto lg:mx-0 lg:ml-auto animate-scale-in" style={{ animationDuration: '0.8s' }}>
      {/* Decorative connection line (desktop only) */}
      <div className="hidden lg:block absolute top-12 -left-24 w-24 border-t-[2.5px] border-dashed border-border/40 z-0"></div>
      
      {/* Main dashboard mock */}
      <div
        className="bg-surface border-[2.5px] border-border relative overflow-hidden z-10"
        style={{ boxShadow: "8px 8px 0px var(--shadow-color)" }}
      >
        {/* Mock top bar */}
        <div className="border-b-[2.5px] border-border px-4 py-2.5 flex items-center justify-between bg-background-muted">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 bg-primary border-[2px] border-border flex items-center justify-center"
              style={{ boxShadow: "1px 1px 0px var(--shadow-color)" }}
            >
              <span className="text-[8px] font-black text-black">$</span>
            </div>
            <span className="text-xs font-black tracking-tight">DashBill</span>
          </div>
          <span className="text-[10px] font-bold text-muted">Overview</span>
        </div>

        <div className="p-4 space-y-3">
          {/* Metric cards row */}
          <div className="grid grid-cols-3 gap-2">
            <div
              className="bg-success border-[2px] border-border p-2"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              <p className="text-[9px] font-black uppercase text-black/70 mb-0.5">Revenue</p>
              <p className="text-sm font-black text-black">$8,240</p>
            </div>
            <div
              className="bg-warning border-[2px] border-border p-2"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              <p className="text-[9px] font-black uppercase text-black/70 mb-0.5">Pending</p>
              <p className="text-sm font-black text-black">3</p>
            </div>
            <div
              className="bg-info border-[2px] border-border p-2"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              <p className="text-[9px] font-black uppercase text-black/70 mb-0.5">Clients</p>
              <p className="text-sm font-black text-black">12</p>
            </div>
          </div>

          {/* Invoice rows */}
          <div className="border-[2px] border-border">
            <div className="bg-primary/30 border-b-[2px] border-border px-3 py-1.5 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-wider text-foreground">Invoices</span>
              <span className="text-[9px] font-bold text-muted">Recent</span>
            </div>
            {[
              { id: "INV-0041", client: "Acme Corp", amount: "$2,400", status: "Paid", color: "bg-success" },
              { id: "INV-0040", client: "Bright Labs", amount: "$1,800", status: "Sent", color: "bg-info" },
              { id: "INV-0039", client: "Nova Studio", amount: "$950", status: "Draft", color: "bg-secondary" },
            ].map((inv) => (
              <div
                key={inv.id}
                className="px-3 py-2 flex items-center justify-between border-b-[1.5px] border-border/40 last:border-0"
              >
                <div>
                  <p className="text-[10px] font-black text-foreground">{inv.id}</p>
                  <p className="text-[9px] text-muted font-medium">{inv.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-foreground">{inv.amount}</span>
                  <span
                    className={`${inv.color} border border-border text-[8px] font-black uppercase px-1.5 py-0.5 text-black`}
                    style={{ boxShadow: "1px 1px 0px var(--shadow-color)" }}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating paid badge */}
      <div
        className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-success border-[2.5px] border-border px-2 sm:px-3 py-1.5 sm:py-2 z-20 flex items-center gap-1.5 animate-fade-in-up stagger-5"
        style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-[10px] sm:text-xs font-black text-black">Invoice Paid</span>
      </div>

      {/* Floating revenue stat */}
      <div
        className="absolute -top-3 -left-2 sm:-left-4 bg-primary border-[2.5px] border-border px-2 sm:px-3 py-1.5 z-20 animate-fade-in-up stagger-4"
        style={{ boxShadow: "3px 3px 0px var(--shadow-color)", transform: "rotate(-1deg)" }}
      >
        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-black/70">This Month</p>
        <p className="text-xs sm:text-sm font-black text-black">$8,240</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left: Text content */}
          <div className="flex-1 w-full lg:max-w-[500px]">
            {/* Label tag */}
            <div
              className="inline-flex items-center gap-2 bg-primary border-[2px] border-border px-3 py-1 mb-6 animate-fade-in-up"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              <span className="text-xs font-black uppercase tracking-widest text-black">
                Freelance Invoicing
              </span>
            </div>

            <h1 className="font-black tracking-tight leading-[0.98] mb-6 text-foreground animate-fade-in-up stagger-1" style={{ fontSize: "clamp(2.7rem, 10vw, 4.5rem)" }}>
              Invoicing
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">Without</span>
                <span
                  className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-primary -z-0 origin-left animate-scale-in"
                  style={{ animationDuration: "0.8s", animationDelay: "0.2s" }}
                  aria-hidden="true"
                />
              </span>
              {" "}the BS.
            </h1>

            <p className="text-base sm:text-lg font-medium text-foreground/70 max-w-[420px] mb-8 leading-relaxed animate-fade-in-up stagger-2">
              Create, send, and track professional invoices in seconds.
              No subscriptions. No bloat. Just clean billing that gets
              you paid faster.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade-in-up stagger-3">
              <Link
                href="/signup"
                className="neo-btn neo-btn-primary px-7 py-3.5 text-base w-full sm:w-auto"
              >
                Start for Free →
              </Link>
              <a
                href="#features"
                className="neo-btn neo-btn-ghost px-7 py-3.5 text-base w-full sm:w-auto"
              >
                See How It Works
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 animate-fade-in-up stagger-4">
              {[
                "No subscription",
                "PDF in browser",
                "Your data, only yours",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-success shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[13px] font-bold text-foreground/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product preview */}
          <div className="flex-1 w-full lg:w-auto">
            <ProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
