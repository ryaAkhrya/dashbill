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
      className={`sticky top-0 z-50 w-full bg-background transition-all duration-300 ${
        scrolled ? "border-b-[2.5px] border-border shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "border-b-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-9 h-9 bg-primary border-[2.5px] border-border flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1"
            style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          <span className="font-black text-2xl tracking-tight text-foreground">DashBill</span>
        </Link>

        {/* Desktop Nav (Visible on lg+) */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-bold text-muted hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm font-bold text-muted hover:text-foreground transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4 border-l-[2px] border-border/20 pl-8">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="neo-btn neo-btn-primary px-5 py-2.5 text-sm"
            >
              Start Free
            </Link>
          </div>
        </div>

        {/* Mobile Actions (Visible on <lg) */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Hamburger Button */}
          <button
            className="w-11 h-11 border-[2.5px] border-border flex items-center justify-center bg-surface transition-colors hover:bg-background-muted active:scale-95"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            style={{ boxShadow: mobileMenuOpen ? "none" : "2px 2px 0px var(--border)", transform: mobileMenuOpen ? "translate(2px, 2px)" : "translate(0, 0)" }}
          >
            <svg
              width="24"
              height="24"
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
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Sheet */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out border-b-[2.5px] border-border bg-surface ${
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          <nav className="flex flex-col gap-4 border-b-[2px] border-border/10 pb-5">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-black text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-black text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </a>
          </nav>
          
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm font-bold text-muted uppercase tracking-wider">Appearance</span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="neo-btn neo-btn-ghost px-5 py-3.5 text-base justify-center w-full"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="neo-btn neo-btn-primary px-5 py-3.5 text-base justify-center w-full"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
