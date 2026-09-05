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
    <section id="faq" className="py-24 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <div
            className="inline-flex items-center bg-secondary border-[2px] border-border px-3 py-1 mb-4"
            style={{ boxShadow: "2px 2px 0px var(--border)" }}
          >
            <span className="text-xs font-black uppercase tracking-widest text-black">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            Got questions?
          </h2>
          <p className="mt-2 font-medium text-foreground/60">
            Most answers are shorter than you think.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-surface border-[2.5px] border-border overflow-hidden transition-shadow duration-200"
                style={{
                  boxShadow: isOpen
                    ? "4px 4px 0px var(--border)"
                    : "2px 2px 0px var(--border)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-base group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-sm font-black">{faq.question}</span>
                  <span
                    className="shrink-0 flex items-center justify-center w-7 h-7 border-[2px] border-border bg-background-muted font-black text-base transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      boxShadow: "1px 1px 0px var(--border)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 text-sm font-medium text-foreground/70 leading-relaxed border-t-[2px] border-border/30">
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
