import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Add your clients",
    description:
      "Store client details once. Name, email, address — all ready for your next invoice with a single click.",
    color: "bg-accent-pink",
    ui: (
      <div className="space-y-2">
        {[
          { name: "Acme Corp", email: "hello@acme.com" },
          { name: "Bright Labs", email: "pay@brightlabs.io" },
          { name: "Nova Studio", email: "studio@nova.co" },
        ].map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 bg-surface border-[2px] border-border px-3 py-2"
            style={{ boxShadow: "2px 2px 0px var(--border)" }}
          >
            <div className="w-7 h-7 bg-primary border-[2px] border-border flex items-center justify-center shrink-0">
              <span className="text-[10px] font-black text-black">{c.name[0]}</span>
            </div>
            <div>
              <p className="text-xs font-black">{c.name}</p>
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
    description:
      "Add line items, set quantities and prices. Tax calculation is automatic. Total updates in real time.",
    color: "bg-secondary",
    ui: (
      <div
        className="bg-surface border-[2px] border-border"
        style={{ boxShadow: "4px 4px 0px var(--border)" }}
      >
        <div className="bg-warning border-b-[2px] border-border px-3 py-2">
          <p className="text-[10px] font-black uppercase tracking-wider text-black">Line Items</p>
        </div>
        <div className="p-3 space-y-2">
          {[
            { desc: "UI Design — 20hrs", amt: "$2,000" },
            { desc: "Brand Kit", amt: "$400" },
            { desc: "Revisions", amt: "$200" },
          ].map((item) => (
            <div key={item.desc} className="flex justify-between items-center border-b border-border/30 pb-1.5 last:border-0 last:pb-0">
              <span className="text-[10px] font-bold">{item.desc}</span>
              <span className="text-[10px] font-black">{item.amt}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-1 border-t-[2px] border-border">
            <span className="text-[10px] font-black uppercase">Total</span>
            <span
              className="text-sm font-black bg-primary border-[2px] border-border px-2 py-0.5 text-black"
              style={{ boxShadow: "2px 2px 0px var(--border)" }}
            >
              $2,600
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    title: "Export PDF instantly",
    description:
      "Generate a professional A4 PDF directly in your browser — no server, no wait. Send it to your client in seconds.",
    color: "bg-success",
    ui: (
      <div
        className="bg-surface border-[2px] border-border p-4 flex flex-col items-center gap-3"
        style={{ boxShadow: "4px 4px 0px var(--border)" }}
      >
        <div className="w-14 h-16 bg-background-muted border-[2px] border-border flex items-center justify-center relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/60">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span
            className="absolute -bottom-1 -right-1 bg-danger border-[1.5px] border-border text-[8px] font-black text-black px-1"
          >
            PDF
          </span>
        </div>
        <div
          className="neo-btn neo-btn-success px-4 py-2 text-xs text-black w-full justify-center"
        >
          ↓ Download Invoice
        </div>
        <p className="text-[10px] text-muted font-medium text-center">Ready in under a second</p>
      </div>
    ),
  },
  {
    step: "04",
    title: "Track payment status",
    description:
      "Mark invoices as Sent, Paid, or Overdue. Your dashboard updates metrics in real time so you always know where you stand.",
    color: "bg-info",
    ui: (
      <div className="space-y-2">
        {[
          { label: "Invoice #0041", status: "Paid", color: "bg-success" },
          { label: "Invoice #0040", status: "Sent", color: "bg-info" },
          { label: "Invoice #0039", status: "Overdue", color: "bg-danger" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-surface border-[2px] border-border px-3 py-2"
            style={{ boxShadow: "2px 2px 0px var(--border)" }}
          >
            <span className="text-[11px] font-bold">{item.label}</span>
            <span
              className={`${item.color} border-[1.5px] border-border text-[8px] font-black uppercase px-2 py-0.5 text-black`}
              style={{ boxShadow: "1px 1px 0px var(--border)" }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

const bigFeatures = [
  {
    title: "Client Database",
    description:
      "Keep all your clients organized. Add, edit, and delete in seconds. Never re-type a client's info.",
    badge: "Core",
    badgeColor: "bg-accent-pink",
  },
  {
    title: "1-Click PDF Export",
    description:
      "Generate print-ready A4 PDFs directly in browser with zero server delay.",
    badge: "Fast",
    badgeColor: "bg-success",
  },
  {
    title: "Smart Calculations",
    description:
      "Add line items, adjust quantities and tax. Math is always correct, always instant.",
    badge: "Smart",
    badgeColor: "bg-secondary",
  },
];

export function Features() {
  return (
    <>
      {/* Workflow section */}
      <section id="features" className="py-24 px-5 border-y-[2.5px] border-border bg-background-muted">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div
              className="inline-flex items-center bg-foreground text-background px-3 py-1 mb-4"
              style={{ boxShadow: "2px 2px 0px var(--muted)" }}
            >
              <span className="text-xs font-black uppercase tracking-widest">How It Works</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight max-w-lg">
              Four steps from zero to paid.
            </h2>
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className={`flex flex-col ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 lg:gap-16`}
              >
                {/* Text */}
                <div className="flex-1 max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`${step.color} border-[2.5px] border-border text-black text-lg font-black px-3 py-1`}
                      style={{ boxShadow: "3px 3px 0px var(--border)" }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">{step.title}</h3>
                  <p className="text-foreground/70 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* UI Preview */}
                <div className="flex-1 w-full max-w-xs lg:max-w-sm">
                  {step.ui}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights strip */}
      <section className="py-16 px-5 bg-primary border-b-[2.5px] border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bigFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-surface border-[2.5px] border-border p-6 group hover:-translate-y-1 transition-transform duration-200"
                style={{ boxShadow: "4px 4px 0px var(--border)" }}
              >
                <span
                  className={`${feature.badgeColor} border-[2px] border-border text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 inline-block mb-4`}
                  style={{ boxShadow: "1px 1px 0px var(--border)" }}
                >
                  {feature.badge}
                </span>
                <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t-[2.5px] border-border">
            <div>
              <h3 className="text-2xl font-black">Ready to get paid faster?</h3>
              <p className="text-sm font-bold text-black/70 mt-1">
                Free forever. No credit card needed.
              </p>
            </div>
            <Link
              href="/signup"
              className="neo-btn bg-foreground text-background border-border px-7 py-3.5 text-sm shrink-0"
            >
              Create Your Account →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
