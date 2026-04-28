import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#2d1b69] text-white',
        gold: 'border-transparent bg-[#d4a017] text-[#1a0f3d]',
        outline: 'border-[#2d1b69] text-[#2d1b69]',
        secondary: 'border-transparent bg-[var(--muted)] text-[var(--muted-foreground)]',
        destructive: 'border-transparent bg-red-600 text-white',
        success: 'border-transparent bg-green-600 text-white',
        warning: 'border-transparent bg-yellow-500 text-[#1a0f3d]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
