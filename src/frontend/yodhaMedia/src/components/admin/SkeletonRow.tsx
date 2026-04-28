import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonRow() {
  return (
    <tr className="border-b border-[#2d1b69]/30">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg bg-[#2d1b69]/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-[#2d1b69]/20" />
            <Skeleton className="h-3 w-32 bg-[#2d1b69]/20" />
          </div>
        </div>
      </td>
      <td className="p-4">
        <Skeleton className="h-6 w-24 rounded-full bg-[#2d1b69]/20" />
      </td>
      <td className="p-4">
        <Skeleton className="h-4 w-20 bg-[#2d1b69]/20" />
      </td>
      <td className="p-4">
        <Skeleton className="h-6 w-16 rounded-full bg-[#2d1b69]/20" />
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-lg bg-[#2d1b69]/20" />
          <Skeleton className="h-8 w-16 rounded-lg bg-[#2d1b69]/20" />
          <Skeleton className="h-8 w-8 rounded-lg bg-[#2d1b69]/20" />
        </div>
      </td>
    </tr>
  )
}
