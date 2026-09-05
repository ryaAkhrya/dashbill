import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  bgColor: string; /* now expects css variable or semantic color class */
  icon?: ReactNode;
  trendPlaceholder?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export function MetricCard({
  label,
  value,
  bgColor,
  icon,
  trendPlaceholder,
  className = "",
  variant = "secondary",
}: MetricCardProps) {
  if (variant === "primary") {
    return (
      <div
        className={`relative p-6 sm:p-8 border-[2.5px] border-border bg-surface flex flex-col ${className}`}
        style={{ boxShadow: "6px 6px 0px var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-muted">
            {label}
          </h2>
          {icon && (
            <div className="w-10 h-10 bg-primary border-[2px] border-border flex items-center justify-center" style={{ boxShadow: "2px 2px 0px var(--border)" }}>
              {icon}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-4">
            {value}
          </p>
          {trendPlaceholder && (
            <div className="inline-flex items-center gap-2">
              <span className="bg-success border-[2px] border-border px-2 py-0.5 text-xs font-black uppercase text-black" style={{ boxShadow: "1px 1px 0px var(--border)" }}>
                +12%
              </span>
              <span className="text-xs font-bold text-muted uppercase">vs last month</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Secondary variant
  return (
    <div
      className={`relative p-5 border-[2.5px] border-border flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200 ${bgColor} ${className}`}
      style={{ boxShadow: "4px 4px 0px var(--border)" }}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xs font-black uppercase tracking-wider text-black/70">
          {label}
        </h3>
        {icon && (
          <div className="text-black opacity-80 group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-black text-black">{value}</p>
      </div>
    </div>
  );
}
