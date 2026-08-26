"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is DashBill really free?",
    answer: "Yes, the core invoicing features are entirely free. No hidden fees, no required subscriptions.",
  },
  {
    question: "How do you handle my data?",
    answer: "Your data is securely stored via Supabase with strict Row Level Security policies. Only you can access your clients and invoices.",
  },
  {
    question: "Can I customize the PDF invoice?",
    answer: "Currently, DashBill uses a clean, standardized A4 template designed to look professional for any business. Custom branding is planned for a future update.",
  },
  {
    question: "Do I need an internet connection to generate PDFs?",
    answer: "DashBill's PDF generation runs entirely in your browser using Client-Side Rendering, meaning it works blazingly fast without server roundtrips.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-background max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-[900] tracking-tight">Frequently Asked Questions</h2>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="neo-card rounded-md overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-lg hover:bg-background-muted transition-colors focus:outline-none"
              >
                {faq.question}
                <span className="text-2xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-foreground/80 border-t-2 border-black/10 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
