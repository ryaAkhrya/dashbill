"use client";

import { logoutAction } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashHeaderProps {
  username: string;
  onToggleSidebar: () => void;
}

export function DashHeader({ username, onToggleSidebar }: DashHeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b-[2.5px] border-border bg-surface shrink-0 z-10 transition-colors">
      {/* Left: Mobile menu toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden neo-btn neo-btn-ghost p-2"
          aria-label="Toggle navigation"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Optional contextual title could go here if needed */}
      </div>

      {/* Right: User info + Logout */}
      <div className="flex items-center gap-3">
        <ThemeToggle className="hidden sm:flex" />

        <div className="flex items-center gap-3 pl-3 sm:border-l-[2px] border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary border-[2px] border-border flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-black uppercase">{username[0]}</span>
            </div>
            <span className="text-sm font-black hidden sm:inline">@{username}</span>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="neo-btn neo-btn-ghost p-2 text-sm"
              aria-label="Sign Out"
              title="Sign Out"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
