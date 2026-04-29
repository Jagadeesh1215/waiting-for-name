import { Skeleton } from '@/components/ui/skeleton'

/** Loading skeleton that matches the blog table row structure:
 *  thumbnail+title | category | author | date | status | actions
 */
export function SkeletonRow() {
  return (
    <tr className="border-b border-[#2d1b69]/20">
      {/* Title column */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl shrink-0 bg-[#2d1b69]/20" />
          <div className="space-y-2 min-w-0">
            <Skeleton className="h-4 w-48 bg-[#2d1b69]/20" />
            <Skeleton className="h-3 w-32 bg-[#2d1b69]/15" />
          </div>
        </div>
      </td>
      {/* Category */}
      <td className="p-4">
        <Skeleton className="h-6 w-28 rounded-full bg-[#2d1b69]/20" />
      </td>
      {/* Author */}
      <td className="p-4">
        <Skeleton className="h-4 w-24 bg-[#2d1b69]/20" />
      </td>
      {/* Date */}
      <td className="p-4">
        <Skeleton className="h-4 w-20 bg-[#2d1b69]/20" />
      </td>
      {/* Status */}
      <td className="p-4">
        <Skeleton className="h-6 w-16 rounded-full bg-[#2d1b69]/20" />
      </td>
      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-lg bg-[#2d1b69]/20" />
          <Skeleton className="h-8 w-16 rounded-lg bg-[#2d1b69]/20" />
          <Skeleton className="h-8 w-8 rounded-lg bg-[#2d1b69]/20" />
        </div>
      </td>
    </tr>
  )
}
