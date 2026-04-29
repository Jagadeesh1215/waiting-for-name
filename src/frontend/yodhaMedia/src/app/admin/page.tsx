'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'motion/react'
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
import { BLOG_CATEGORIES } from '@/types/blog'

const PAGE_SIZE = 8

/* ── Icon helpers ───────────────────────────────────────────────── */
function IconChevronLeft() {
  return (
    <svg aria-hidden="true" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function IconChevronRight() {
  return (
    <svg aria-hidden="true" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function AdminDashboardPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Debounce search
  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
    const timer = setTimeout(() => setDebouncedSearch(value), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setPage(1)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs', { search: debouncedSearch, category, page }],
    queryFn: () =>
      fetchBlogs({
        q: debouncedSearch || undefined,
        category: category !== 'All' ? category : undefined,
        page,
        limit: PAGE_SIZE,
      }),
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
      setDeleteTarget(null)
    },
  })

  const blogs = data?.blogs ?? []
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  /* ── Stats ── */
  const stats = useMemo(() => {
    const published = blogs.filter((b) => b.status === 'published').length
    const drafts = blogs.filter((b) => b.status === 'draft').length
    return [
      { title: 'Total Posts', value: total, icon: <FileText className="h-5 w-5" />, trend: 12, variant: 'purple' as const },
      { title: 'Published', value: published, icon: <TrendingUp className="h-5 w-5" />, trend: 8, variant: 'green' as const },
      { title: 'Drafts', value: drafts, icon: <BarChart2 className="h-5 w-5" />, variant: 'gold' as const },
      { title: 'Page Views', value: '24.5K', icon: <Users className="h-5 w-5" />, trend: 22, description: 'this month', variant: 'purple' as const },
    ]
  }, [blogs, total])

  const FILTER_CHIPS = ['All', ...BLOG_CATEGORIES.filter((c) => c !== 'All')]

  return (
    <div data-ocid="dashboard.page">
      <TopBar title="Dashboard" onSearch={handleSearch} searchPlaceholder="Search posts..." />

      <div className="p-6 space-y-8">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <StatCard
                title={s.title}
                value={s.value}
                icon={s.icon}
                trend={s.trend}
                description={s.description}
                variant={s.variant}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Category filter chips ── */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              data-ocid={`dashboard.filter.${c.toLowerCase().replace(/\s+/g, '_')}`}
              onClick={() => handleCategoryChange(c)}
              className={[
                'px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all select-none',
                category === c
                  ? 'bg-[#2d1b69] text-white border-[#2d1b69]'
                  : 'bg-[#2d1b69]/10 text-gray-400 border-[#2d1b69]/30 hover:border-[#2d1b69] hover:text-white',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Blog Table ── */}
        <div className="rounded-xl border border-[#2d1b69]/30 bg-[#0d0a1e] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#2d1b69]/30">
            <h2 className="font-semibold text-white font-display">Blog Posts</h2>
            <Button variant="default" size="sm" asChild data-ocid="dashboard.new_post_button">
              <Link href="/admin/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="dashboard.posts.table">
              <thead>
                <tr className="border-b border-[#2d1b69]/30 text-gray-500 text-xs uppercase">
                  <th className="text-left p-4 font-medium">Post</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Author</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are positional
                    <SkeletonRow key={i} />
                  ))
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-16 text-center" data-ocid="dashboard.empty_state">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#2d1b69]/20 border border-[#2d1b69]/30 flex items-center justify-center text-2xl">
                          📝
                        </div>
                        <p className="text-base font-bold text-white">No posts found</p>
                        <p className="text-sm text-gray-500">
                          Try adjusting your filters or{' '}
                          <Link href="/admin/create" className="text-[#d4a017] hover:underline">
                            create your first post
                          </Link>
                          .
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog, i) => (
                    <motion.tr
                      key={blog.id}
                      data-ocid={`dashboard.blog.item.${i + 1}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="border-b border-[#2d1b69]/20 hover:bg-[#2d1b69]/10 transition-colors"
                    >
                      {/* Post title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Thumbnail */}
                          {(blog.thumbnail || blog.imageUrl) ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={blog.thumbnail || blog.imageUrl}
                              alt={blog.imageAlt || blog.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[#2d1b69]/20"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl shrink-0 bg-[#2d1b69]/20 border border-[#2d1b69]/30 flex items-center justify-center text-gray-600 text-xs font-bold">
                              IMG
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate max-w-[220px]">{blog.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{blog.readTime}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <CategoryBadge category={blog.category} />
                      </td>

                      {/* Author */}
                      <td className="p-4 hidden md:table-cell text-gray-400 text-xs whitespace-nowrap">
                        {blog.author || '—'}
                      </td>

                      {/* Date */}
                      <td className="p-4 hidden sm:table-cell text-gray-400 text-xs whitespace-nowrap">
                        {new Date(blog.publishedAt || blog.publishDate || '').toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={[
                            'text-xs px-2.5 py-1 rounded-full font-medium capitalize',
                            blog.status === 'published'
                              ? 'bg-green-900/30 text-green-400 border border-green-800/30'
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/30',
                          ].join(' ')}
                        >
                          {blog.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-[#2d1b69]/30"
                            asChild
                            data-ocid={`dashboard.view_button.${i + 1}`}
                          >
                            <Link href={`/blog/${blog.slug}`} target="_blank" aria-label="View post">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-[#2d1b69]/30"
                            onClick={() => router.push(`/admin/edit/${blog.slug}`)}
                            data-ocid={`dashboard.edit_button.${i + 1}`}
                            aria-label="Edit post"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            onClick={() => setDeleteTarget(blog)}
                            data-ocid={`dashboard.delete_button.${i + 1}`}
                            aria-label="Delete post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#2d1b69]/30">
              <p className="text-xs text-gray-500">
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-ocid="dashboard.pagination_prev"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="w-8 h-8 rounded-lg border border-[#2d1b69]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2d1b69] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <IconChevronLeft />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      // biome-ignore lint/suspicious/noArrayIndexKey: page buttons are positional
                      key={pageNum}
                      type="button"
                      data-ocid={`dashboard.page_button.${pageNum}`}
                      onClick={() => setPage(pageNum)}
                      className={[
                        'w-8 h-8 rounded-lg border text-xs font-bold transition-colors',
                        page === pageNum
                          ? 'bg-[#2d1b69] border-[#2d1b69] text-white'
                          : 'border-[#2d1b69]/40 text-gray-400 hover:border-[#2d1b69] hover:text-white',
                      ].join(' ')}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  type="button"
                  data-ocid="dashboard.pagination_next"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="w-8 h-8 rounded-lg border border-[#2d1b69]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2d1b69] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <IconChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Delete modal ── */}
      <DeleteModal
        isOpen={!!deleteTarget}
        title={deleteTarget?.title}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.slug)}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={deleteMutation.isPending}
      />

      {/* ── Toast ── */}
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
