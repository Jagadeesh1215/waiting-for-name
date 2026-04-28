import { cn } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  'Healthcare Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  SEO: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Social Media': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Content Marketing': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Brand Strategy': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  Analytics: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

interface CategoryBadgeProps {
  category: string
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] ?? 'bg-gray-100 text-gray-800'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colorClass,
        className
      )}
    >
      {category}
    </span>
  )
}
