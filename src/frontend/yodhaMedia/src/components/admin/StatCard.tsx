import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: number
  variant?: 'purple' | 'gold' | 'green' | 'red'
  className?: string
}

const variantStyles: Record<NonNullable<StatCardProps['variant']>, string> = {
  purple: 'text-purple-400 bg-purple-900/20 border-purple-800/30',
  gold: 'text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/20',
  green: 'text-green-400 bg-green-900/20 border-green-800/30',
  red: 'text-red-400 bg-red-900/20 border-red-800/30',
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = 'purple',
  className,
}: StatCardProps) {
  const isTrendUp = trend !== undefined && trend >= 0
  const TrendIcon = isTrendUp ? TrendingUp : TrendingDown

  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-[#2d1b69]/30 bg-[#0d0a1e] p-6 space-y-3 overflow-hidden transition-all duration-300 hover:border-[#2d1b69]/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2d1b69]/10',
        className
      )}
      data-ocid="admin.stat_card"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {icon && (
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center border',
              variantStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <p className="text-4xl font-extrabold text-white font-display tracking-tight">{value}</p>

      {(description !== undefined || trend !== undefined) && (
        <div className="flex items-center gap-2 flex-wrap">
          {trend !== undefined && (
            <span
              className={cn(
                'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
                isTrendUp
                  ? 'text-green-400 bg-green-900/20 border border-green-800/30'
                  : 'text-red-400 bg-red-900/20 border border-red-800/30'
              )}
            >
              <TrendIcon className="h-3 w-3" />
              {Math.abs(trend)}%
            </span>
          )}
          {description && <span className="text-xs text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  )
}
