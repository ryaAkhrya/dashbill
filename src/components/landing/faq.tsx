"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is DashBill really free?",
    answer:
      "Yes. Core invoicing features are entirely free — no hidden fees, no required subscriptions, no expiry date.",
  },
  {
    question: "How is my data protected?",
    answer:
      "Your data is securely stored via Supabase with strict Row Level Security policies enforced at the database level. Only you can access your clients and invoices — no other user can ever see your data, even if they have the system's database credentials.",
  },
  {
    question: "Can I customize the PDF invoice?",
    answer:
      "DashBill currently uses a clean, standardized A4 template designed to look professional for any business. Custom branding features are planned for a future update.",
  },
  {
    question: "Does PDF generation require internet?",
    answer:
      "PDF generation runs entirely in your browser using client-side rendering. It works fast without any server roundtrip — just click and download.",
  },
  {
    question: "What is my login username?",
    answer:
      "DashBill uses username + password only — no email required to sign up or log in. Your chosen username is your permanent login identity.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 sm:py-32 px-4 sm:px-6 bg-background border-y-[2.5px] border-border mt-28 ledger-pattern">
      <div className="max-w-2xl mx-auto">
        <div className="mb-14 animate-fade-in-up">
          <div
            className="inline-flex items-center bg-secondary border-[2.5px] border-border px-3 py-1 mb-5"
            style={{ boxShadow: "3px 3px 0px var(--shadow-color)" }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-black">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Got questions?
          </h2>
          <p className="mt-3 font-medium text-foreground/60">
            Most answers are shorter than you think.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-surface border-[2.5px] border-border overflow-hidden animate-fade-in-up"
                style={{
                  boxShadow: isOpen
                    ? "4px 4px 0px var(--shadow-color)"
                    : "2px 2px 0px var(--shadow-color)",
                  transition: "box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-sm font-black text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 flex items-center justify-center w-7 h-7 border-[2px] border-border bg-background-muted font-black text-base text-foreground"
                    style={{
                      boxShadow: "1px 1px 0px var(--shadow-color)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 text-sm font-medium text-foreground/70 leading-relaxed border-t-[2px] border-border/20">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
