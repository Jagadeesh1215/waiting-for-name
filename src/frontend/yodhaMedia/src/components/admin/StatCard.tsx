import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: number
  className?: string
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#2d1b69]/30 bg-[#0d0a1e] p-6 space-y-2',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-[#2d1b69]/30 flex items-center justify-center text-[#d4a017]">
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white font-display">{value}</p>
      {(description ?? trend !== undefined) && (
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <span className={cn('flex items-center gap-1 text-xs font-medium', trend >= 0 ? 'text-green-400' : 'text-red-400')}>
              <TrendingUp className={cn('h-3 w-3', trend < 0 && 'rotate-180')} />
              {Math.abs(trend)}%
            </span>
          )}
          {description && <span className="text-xs text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  )
}
