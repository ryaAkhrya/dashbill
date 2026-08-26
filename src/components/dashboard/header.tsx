"use client";

import { logoutAction } from "@/app/actions/auth";

interface HeaderProps {
  userEmail: string;
  onToggleSidebar: () => void;
}

export function Header({ userEmail, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b-[3px] border-black bg-background shrink-0">
      {/* Left: Mobile menu toggle */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden neo-btn neo-btn-ghost rounded-md p-2"
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

      {/* Spacer for desktop (no hamburger) */}
      <div className="hidden lg:block" />

      {/* Right: User info + Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground/60 font-bold hidden sm:inline truncate max-w-48">
          {userEmail}
        </span>
        <form action={logoutAction}>
          <button
            type="submit"
            className="neo-btn neo-btn-ghost rounded-md px-3 py-2 text-sm flex items-center gap-2"
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
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
