import type { Category } from '@/types/blog';

const CAT_CLASS: Record<Category | string, string> = {
  SPINE: 'bg-blue-50 text-blue-700 border-blue-100',
  BRAIN: 'bg-amber-50 text-amber-600 border-amber-100',
  NEUROLOGY: 'bg-purple-50 text-purple-600 border-purple-100',
  REHABILITATION: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  GENERAL: 'bg-slate-100 text-slate-500 border-slate-200',
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({
  category,
  className = '',
}: CategoryBadgeProps) {
  const cls = CAT_CLASS[category] ?? CAT_CLASS.GENERAL;
  return (
    <span
      data-ocid="category.badge"
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${cls} ${className}`}
    >
      {category}
    </span>
  );
}
