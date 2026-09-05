import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Add your clients",
    description: "Store client details once. Ready for your next invoice with a single click.",
    color: "bg-accent-pink",
    ui: (
      <div className="space-y-2">
        {[
          { name: "Acme Corp", email: "hello@acme.com" },
          { name: "Bright Labs", email: "pay@brightlabs.io" },
        ].map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 bg-surface border-[2px] border-border px-3 py-2.5 animate-fade-in-up"
            style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
          >
            <div className="w-8 h-8 bg-primary border-[2px] border-border flex items-center justify-center shrink-0">
              <span className="text-[10px] font-black text-black">{c.name[0]}</span>
            </div>
            <div>
              <p className="text-xs font-black text-foreground">{c.name}</p>
              <p className="text-[10px] text-muted font-medium">{c.email}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    step: "02",
    title: "Build your invoice",
    description: "Add line items, set quantities and prices. Tax calculation is automatic.",
    color: "bg-secondary",
    ui: (
      <div
        className="bg-surface border-[2px] border-border animate-fade-in-up stagger-1"
        style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
      >
        <div className="bg-warning border-b-[2px] border-border px-3 py-2 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-wider text-black">Line Items</p>
          <div className="w-3 h-3 rounded-full bg-background border border-border"></div>
        </div>
        <div className="p-3 space-y-2">
          {[
            { desc: "UI Design", amt: "$2,000" },
            { desc: "Brand Kit", amt: "$400" },
          ].map((item) => (
            <div key={item.desc} className="flex justify-between items-center border-b border-border/30 pb-1.5 last:border-0 last:pb-0">
              <span className="text-[10px] font-bold text-foreground">{item.desc}</span>
              <span className="text-[10px] font-black text-foreground">{item.amt}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-1 border-t-[2px] border-border">
            <span className="text-[10px] font-black uppercase text-foreground">Total</span>
            <span
              className="text-xs font-black bg-primary border-[2px] border-border px-2 py-0.5 text-black"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              $2,400
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    title: "Export instantly",
    description: "Generate a professional A4 PDF directly in your browser. Send it in seconds.",
    color: "bg-success",
    ui: (
      <div
        className="bg-surface border-[2px] border-border p-4 flex flex-col items-center gap-3 animate-fade-in-up stagger-2"
        style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
      >
        <div className="w-16 h-20 bg-background-muted border-[2px] border-border flex items-center justify-center relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/60">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="absolute -bottom-1 -right-1 bg-danger border-[2px] border-border text-[9px] font-black text-black px-1.5 py-0.5">
            PDF
          </span>
        </div>
        <div className="w-full h-8 bg-success border-[2px] border-border flex items-center justify-center text-[10px] font-black uppercase text-black" style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}>
          Download
        </div>
      </div>
    ),
  },
  {
    step: "04",
    title: "Track payment",
    description: "Mark invoices as Sent or Paid. Your dashboard updates metrics in real time.",
    color: "bg-info",
    ui: (
      <div className="space-y-3">
        {[
          { label: "INV-0041", status: "Paid", color: "bg-success" },
          { label: "INV-0040", status: "Sent", color: "bg-info" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-surface border-[2px] border-border px-3 py-2.5 animate-fade-in-up stagger-3"
            style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
          >
            <span className="text-xs font-black text-foreground">{item.label}</span>
            <span
              className={`${item.color} border-[1.5px] border-border text-[9px] font-black uppercase px-2 py-0.5 text-black`}
              style={{ boxShadow: "1px 1px 0px var(--shadow-color)" }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Features() {
  return (
    <>
      {/* Workflow section - Horizontal on Desktop, Vertical on Mobile */}
      <section id="features" className="py-20 px-5 border-y-[2.5px] border-border bg-background-muted relative overflow-hidden dot-pattern">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <div
              className="inline-flex items-center bg-foreground text-background px-4 py-1.5 mb-6 animate-fade-in-up"
              style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">How It Works</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight animate-fade-in-up stagger-1">
              Four steps from zero to paid.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`${step.color} border-[2.5px] border-border text-black text-xl font-black px-3 py-1`}
                      style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t-[2.5px] border-border/20">
                  {step.ui}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights - Mixed grid composition */}
      <section className="py-20 px-5 bg-background border-b-[2.5px] border-border relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Primary Feature: Builder (Spans 2 columns on desktop) */}
            <div
              className="md:col-span-2 bg-surface border-[2.5px] border-border p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 group hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "6px 6px 0px var(--shadow-color)" }}
            >
              <div className="flex-1">
                <span
                  className="bg-primary border-[2.5px] border-border text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 inline-block mb-5"
                  style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
                >
                  Core Feature
                </span>
                <h3 className="text-3xl font-black mb-4 text-foreground">Lightning-fast Invoice Builder</h3>
                <p className="text-base font-medium text-foreground/70 leading-relaxed">
                  Say goodbye to clunky forms. Add line items, adjust quantities, and set tax rates. The math is always correct, always instant.
                </p>
              </div>
              <div className="w-full sm:w-[220px] shrink-0 bg-background-muted border-[2.5px] border-border p-4 relative" style={{ boxShadow: "4px 4px 0px var(--shadow-color)" }}>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-success border-[2px] border-border flex items-center justify-center z-10" style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-1/2 bg-border/20 rounded-sm"></div>
                  <div className="h-2 w-3/4 bg-border/20 rounded-sm"></div>
                  <div className="h-8 w-full border-[2px] border-border bg-surface flex items-center justify-between px-2">
                    <span className="text-[10px] font-black uppercase text-foreground">Total</span>
                    <span className="text-[10px] font-black text-foreground">$1,200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Feature 1 */}
            <div
              className="bg-accent-pink/10 border-[2.5px] border-border p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "6px 6px 0px var(--shadow-color)" }}
            >
              <span
                className="bg-accent-pink border-[2.5px] border-border text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 inline-block mb-5 self-start"
                style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
              >
                Organized
              </span>
              <h3 className="text-2xl font-black mb-3 text-foreground">Client Management</h3>
              <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                Keep all your clients organized. Add, edit, and delete in seconds. Never re-type a client's info again.
              </p>
            </div>

            {/* Supporting Feature 2 */}
            <div
              className="bg-info/10 border-[2.5px] border-border p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "6px 6px 0px var(--shadow-color)" }}
            >
              <span
                className="bg-info border-[2.5px] border-border text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 inline-block mb-5 self-start"
                style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
              >
                Track
              </span>
              <h3 className="text-2xl font-black mb-3 text-foreground">Payment Tracking</h3>
              <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                Mark invoices as Sent, Paid, or Overdue. Always know exactly who owes you money.
              </p>
            </div>

            {/* Supporting Feature 3 (Spans 2 columns on desktop) */}
            <div
              className="md:col-span-2 bg-success/10 border-[2.5px] border-border p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 group hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "6px 6px 0px var(--shadow-color)" }}
            >
              <div className="flex-1">
                <span
                  className="bg-success border-[2.5px] border-border text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 inline-block mb-5"
                  style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
                >
                  Export
                </span>
                <h3 className="text-3xl font-black mb-4 text-foreground">1-Click PDF Export</h3>
                <p className="text-base font-medium text-foreground/70 leading-relaxed">
                  Generate print-ready A4 PDFs directly in browser with zero server delay. Download and send to your client instantly.
                </p>
              </div>
            </div>

          </div>

          {/* Overlapping CTA Panel */}
          <div className="mt-16 sm:mt-24 relative z-20 -mb-28">
            <div className="bg-primary border-[2.5px] border-border p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8" style={{ boxShadow: "8px 8px 0px var(--shadow-color)" }}>
              <div className="text-center md:text-left">
                <h3 className="text-3xl sm:text-4xl font-black text-black">Ready to get paid faster?</h3>
                <p className="text-base font-bold text-black/70 mt-3">
                  Free forever. No credit card needed. No BS.
                </p>
              </div>
              <Link
                href="/signup"
                className="neo-btn bg-foreground text-background border-border px-8 py-4 text-base shrink-0 w-full md:w-auto"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
              >
                Create Your Account →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
