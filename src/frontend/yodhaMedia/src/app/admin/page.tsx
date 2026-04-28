'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusCircle, Edit, Trash2, Eye, FileText, TrendingUp, Users, BarChart2 } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { StatCard } from '@/components/admin/StatCard'
import { CategoryBadge } from '@/components/admin/CategoryBadge'
import { DeleteModal } from '@/components/admin/DeleteModal'
import { SkeletonRow } from '@/components/admin/SkeletonRow'
import { Toast } from '@/components/admin/Toast'
import { Button } from '@/components/ui/button'
import { fetchBlogs, deleteBlog } from '@/services/blogService'
import type { Blog } from '@/types/blog'

export default function AdminDashboardPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs', { search, page }],
    queryFn: () => fetchBlogs({ q: search || undefined, page, limit: 8 }),
  })

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      setToast({ message: 'Post deleted successfully', type: 'success' })
      setDeleteTarget(null)
    },
    onError: () => {
      setToast({ message: 'Failed to delete post', type: 'error' })
    },
  })

  const blogs = data?.blogs ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / 8)
  const published = blogs.filter((b) => b.status === 'published').length
  const drafts = blogs.filter((b) => b.status === 'draft').length

  return (
    <div>
      <TopBar title="Dashboard" onSearch={setSearch} searchPlaceholder="Search posts..." />

      <div className="p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Posts" value={total} icon={<FileText className="h-5 w-5" />} trend={12} />
          <StatCard title="Published" value={published} icon={<TrendingUp className="h-5 w-5" />} trend={8} />
          <StatCard title="Drafts" value={drafts} icon={<BarChart2 className="h-5 w-5" />} />
          <StatCard title="Page Views" value="24.5K" icon={<Users className="h-5 w-5" />} trend={22} description="this month" />
        </div>

        {/* Blog Table */}
        <div className="rounded-xl border border-[#2d1b69]/30 bg-[#0d0a1e] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#2d1b69]/30">
            <h2 className="font-semibold text-white font-display">Blog Posts</h2>
            <Button variant="default" size="sm" asChild data-ocid="admin.create_post.button">
              <Link href="/admin/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="admin.posts.table">
              <thead>
                <tr className="border-b border-[#2d1b69]/30 text-gray-500 text-xs uppercase">
                  <th className="text-left p-4 font-medium">Post</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? ['r1', 'r2', 'r3', 'r4', 'r5'].map((k) => <SkeletonRow key={k} />)
                  : blogs.length === 0
                  ? (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-500" data-ocid="admin.posts.empty_state">
                        No posts found. <Link href="/admin/create" className="text-[#d4a017] hover:underline">Create your first post</Link>.
                      </td>
                    </tr>
                  )
                  : blogs.map((blog, i) => (
                    <tr
                      key={blog.id}
                      className="border-b border-[#2d1b69]/20 hover:bg-[#2d1b69]/10 transition-colors"
                      data-ocid={`admin.posts.item.${i + 1}`}
                    >
                      <td className="p-4">
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate max-w-xs">{blog.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            {blog.readTime}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <CategoryBadge category={blog.category} />
                      </td>
                      <td className="p-4 hidden sm:table-cell text-gray-400 text-xs">
                        {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          blog.status === 'published'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" asChild data-ocid={`admin.posts.edit_button.${i + 1}`}>
                            <Link href={`/admin/edit/${blog.slug}`}><Edit className="h-4 w-4" /></Link>
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" asChild data-ocid={`admin.posts.view_button.${i + 1}`}>
                            <Link href={`/blog/${blog.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => setDeleteTarget(blog)}
                            data-ocid={`admin.posts.delete_button.${i + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#2d1b69]/30">
              <p className="text-xs text-gray-500">
                Showing {Math.min((page - 1) * 8 + 1, total)}–{Math.min(page * 8, total)} of {total}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="text-gray-400" data-ocid="admin.posts.pagination_prev">
                  Prev
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="text-gray-400" data-ocid="admin.posts.pagination_next">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title={deleteTarget?.title}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.slug)}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={deleteMutation.isPending}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
