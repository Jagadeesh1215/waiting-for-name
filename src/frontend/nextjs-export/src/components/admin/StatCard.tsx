interface StatCardProps {
  label: string;
  value: number;
  accent: string;
}

export function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-3xl font-extrabold" style={{ color: accent }}>
        {value}
      </span>
    </div>
  );
}
