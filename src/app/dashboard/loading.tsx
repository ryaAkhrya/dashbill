export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-pulse">
      {/* Header Loading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="w-20 h-6 bg-border/10 border-[2px] border-border/20 mb-3" />
          <div className="w-64 h-12 bg-border/10" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-10 bg-border/10 border-[2px] border-border/20" />
          <div className="w-32 h-10 bg-border/10 border-[2px] border-border/20" />
        </div>
      </div>

      {/* Metrics Grid Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Revenue Card */}
        <div className="lg:col-span-2">
          <div className="h-48 border-[2.5px] border-border/20 bg-border/5 p-6 flex flex-col justify-between" style={{ boxShadow: "6px 6px 0px var(--border)" }}>
            <div className="w-32 h-4 bg-border/10" />
            <div className="w-48 h-16 bg-border/10" />
          </div>
        </div>

        {/* Secondary Metric Cards */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 border-[2.5px] border-border/20 bg-border/5 p-5 flex flex-col justify-between" style={{ boxShadow: "4px 4px 0px var(--border)" }}>
              <div className="w-24 h-3 bg-border/10" />
              <div className="w-16 h-8 bg-border/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="lg:col-span-2">
          <div className="w-40 h-6 bg-border/10 mb-4" />
          <div className="h-64 border-[2.5px] border-border/20 bg-border/5" style={{ boxShadow: "4px 4px 0px var(--border)" }} />
        </div>
        <div>
          <div className="w-32 h-6 bg-border/10 mb-4" />
          <div className="h-64 border-[2.5px] border-border/20 bg-border/5" style={{ boxShadow: "4px 4px 0px var(--border)" }} />
        </div>
      </div>
    </div>
  );
}
