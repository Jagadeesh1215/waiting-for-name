import { cn } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  'Healthcare Marketing': 'bg-purple-900/30 text-purple-300 border-purple-700/40',
  'Digital Strategy': 'bg-blue-900/30 text-blue-300 border-blue-700/40',
  'Brand Identity': 'bg-indigo-900/30 text-indigo-300 border-indigo-700/40',
  'Case Studies': 'bg-teal-900/30 text-teal-300 border-teal-700/40',
  'Industry Insights': 'bg-amber-900/30 text-amber-300 border-amber-700/40',
  'SEO & Growth': 'bg-green-900/30 text-green-300 border-green-700/40',
  'Social Media': 'bg-pink-900/30 text-pink-300 border-pink-700/40',
  'Content Marketing': 'bg-orange-900/30 text-orange-300 border-orange-700/40',
  Analytics: 'bg-cyan-900/30 text-cyan-300 border-cyan-700/40',
  // Legacy categories (Vite app)
  SPINE: 'bg-blue-900/30 text-blue-300 border-blue-700/40',
  BRAIN: 'bg-amber-900/30 text-amber-300 border-amber-700/40',
  NEUROLOGY: 'bg-purple-900/30 text-purple-300 border-purple-700/40',
  REHABILITATION: 'bg-green-900/30 text-green-300 border-green-700/40',
  GENERAL: 'bg-gray-800/50 text-gray-400 border-gray-700/40',
}

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

interface CategoryBadgeProps {
  category: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CategoryBadge({ category, size = 'md', className }: CategoryBadgeProps) {
  const colorCls = CATEGORY_COLORS[category] ?? 'bg-gray-800/50 text-gray-400 border-gray-700/40'
  return (
    <span
      data-ocid="category.badge"
      className={cn(
        'inline-flex items-center rounded-full font-semibold border tracking-wide uppercase',
        SIZE_CLASSES[size],
        colorCls,
        className
      )}
    >
      {category}
    </span>
  )
}
