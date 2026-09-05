"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashHeader } from "./header";

interface DashboardShellProps {
  children: React.ReactNode;
  username: string;
}

export function DashboardShell({ children, username }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashHeader
          username={username}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-auto p-6 sm:p-10 dot-pattern">
          {children}
        </main>
      </div>
    </div>
  );
}
