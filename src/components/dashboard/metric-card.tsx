interface MetricCardProps {
  label: string;
  value: string | number;
  variant?: "default" | "destructive";
}

export function MetricCard({
  label,
  value,
  variant = "default",
}: MetricCardProps) {
  return (
    <div
      className={`neo-card rounded-md p-5 ${
        variant === "destructive" ? "border-destructive" : ""
      }`}
    >
      <p className="text-sm text-foreground/60 font-bold mb-1">{label}</p>
      <p
        className={`text-3xl font-[900] tracking-tight ${
          variant === "destructive" ? "text-destructive" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
