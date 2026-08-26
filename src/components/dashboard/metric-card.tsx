import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  bgColor: string;
  rawColor?: string;
  rotation?: string;
  badgeText?: string;
  icon?: ReactNode;
  trendPlaceholder?: boolean;
}

export function MetricCard({
  label,
  value,
  rawColor,
  rotation = "rotate-0",
  badgeText,
  icon,
  trendPlaceholder,
}: MetricCardProps) {
  return (
    <div
      className={`relative rounded-none p-6 border-[3px] border-black shadow-[6px_6px_0px_#000] transform transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] ${rotation}`}
      style={rawColor ? { backgroundColor: rawColor } : {}}
    >
      {/* Corner Decoration / Icon */}
      {icon && (
        <div className="absolute top-4 right-4 opacity-90 text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
          {icon}
        </div>
      )}

      {badgeText && (
        <span className="inline-block bg-white border-2 border-black font-black text-xs px-2 py-0.5 shadow-[2px_2px_0px_#000] uppercase tracking-wider mb-4 -rotate-2">
          {badgeText}
        </span>
      )}

      <p className="text-sm text-black font-[900] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-4xl font-[900] tracking-tight text-black mb-4">
        {value}
      </p>

      {trendPlaceholder && (
        <div className="mt-6 pt-4 border-t-[3px] border-black/30 flex items-center gap-3">
          <svg
            className="w-20 h-10 text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.7)]"
            viewBox="0 0 100 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="0,25 20,15 40,20 60,5 80,10 100,0" />
          </svg>
          <span className="text-xs font-black text-black bg-white/70 px-2 py-1 border-2 border-black uppercase shadow-[2px_2px_0px_#000]">
            +12% vs last month
          </span>
        </div>
      )}
    </div>
  );
}
