"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: GridIcon },
  { href: "/dashboard/clients", label: "Clients", icon: UsersIcon },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileTextIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-surface border-r-[2.5px] border-border
          flex flex-col
          transform transition-transform duration-300 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b-[2.5px] border-border shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-7 h-7 bg-primary border-[2px] border-border flex items-center justify-center transition-transform duration-150 group-hover:-translate-y-0.5"
              style={{ boxShadow: "2px 2px 0px var(--shadow-color)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">DashBill</span>
          </Link>

          <button onClick={onClose} className="lg:hidden p-1 text-muted hover:text-foreground">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 text-sm
                  border-[2px] transition-all uppercase font-black tracking-wider
                  ${
                    isActive
                      ? "bg-primary border-border text-black translate-y-[-2px] translate-x-[-2px]"
                      : "border-transparent text-foreground/70 hover:bg-background-muted hover:text-foreground"
                  }
                `}
                style={isActive ? { boxShadow: "3px 3px 0px var(--border)" } : {}}
              >
                <item.icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Area (Mobile theme toggle) */}
        <div className="p-4 border-t-[2.5px] border-border sm:hidden flex items-center justify-between">
          <span className="text-xs font-bold text-muted">Theme</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

/* ---- Inline SVG Icons ---- */

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
