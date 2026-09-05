"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background border-b-[2.5px] border-border transition-all duration-200 ${
        scrolled ? "shadow-[0_2px_0px_var(--border)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="w-8 h-8 bg-primary border-[2px] border-border flex items-center justify-center transition-transform duration-150 group-hover:-translate-y-0.5"
            style={{ boxShadow: "2px 2px 0px var(--border)" }}
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
          <span className="font-black text-xl tracking-tight">DashBill</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#features"
            className="px-3 py-2 text-sm font-bold text-foreground/70 hover:text-foreground hover:bg-surface-elevated rounded-none transition-colors"
          >
            Features
          </a>
          <a
            href="#faq"
            className="px-3 py-2 text-sm font-bold text-foreground/70 hover:text-foreground hover:bg-surface-elevated rounded-none transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden sm:inline-flex neo-btn neo-btn-ghost px-4 py-2 text-sm"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="neo-btn neo-btn-primary px-4 py-2 text-sm"
          >
            Start Free
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden neo-btn neo-btn-ghost p-2 ml-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-[2.5px] border-border bg-surface animate-fade-in">
          <div className="flex flex-col p-4 gap-1">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 font-bold text-sm border-[2px] border-transparent hover:border-border hover:bg-background-muted transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 font-bold text-sm border-[2px] border-transparent hover:border-border hover:bg-background-muted transition-colors"
            >
              FAQ
            </a>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 font-bold text-sm border-[2px] border-transparent hover:border-border hover:bg-background-muted transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
