export default function DashboardLoading() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-8 bg-black/10 rounded w-1/4"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="neo-card rounded-md p-5 h-24 bg-black/5" />
        ))}
      </div>

      <div className="neo-card rounded-md overflow-hidden bg-black/5 h-64 w-full" />
    </div>
  );
}
