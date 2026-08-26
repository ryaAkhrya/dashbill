const features = [
  {
    title: "Client Management",
    description:
      "Keep track of all your clients in one place. Store their details so you never have to type them twice.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Smart Calculations",
    description:
      "Add rows, set quantities, and adjust tax rates. We handle all the math instantly, zero errors guaranteed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    title: "1-Click PDF Export",
    description:
      "Generate beautiful, print-ready A4 PDFs instantly right in your browser. No server delays.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="py-20 px-6 bg-primary border-y-4 border-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-[900] tracking-tight mb-4">
            Everything you need. <br className="hidden sm:block" /> Nothing you don&apos;t.
          </h2>
          <p className="text-lg font-bold max-w-2xl mx-auto">
            DashBill strips away the bloat so you can get paid faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="neo-card rounded-md p-6 bg-white flex flex-col items-start"
            >
              <div className="h-12 w-12 bg-background-muted border-2 border-black rounded-md flex items-center justify-center mb-4 [box-shadow:2px_2px_0px_#000]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/80 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
