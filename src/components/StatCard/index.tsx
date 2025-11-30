interface StatProps {
  label: string;
  value: string;
  sub?: string;
  className?: string;
}

export const StatCard = ({ label, value, sub, className }: StatProps) => (
  <div
    className={`bw-card p-6 flex flex-col justify-between min-h-[140px] border border-secondary/50 shadow-sm ${className}`}
  >
    <div className="text-xs text-muted-foreground mb-3">{label}</div>
    <div>
      <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-1">
        {value}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  </div>
);
