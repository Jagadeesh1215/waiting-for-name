'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { BlogForm } from '@/components/admin/BlogForm'
import { Toast } from '@/components/admin/Toast'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchBlog, updateBlog } from '@/services/blogService'
import type { BlogFormData } from '@/types/blog'

/* ── Loading skeleton ── */
function LoadingState() {
  return (
    <div data-ocid="edit.loading_state" className="space-y-6">
      <div className="rounded-2xl border border-[#2d1b69]/40 bg-[#0d0a1e] p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-48 bg-[#2d1b69]/20" />
          <Skeleton className="h-7 w-24 rounded-full bg-[#2d1b69]/20" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Skeleton className="h-9 rounded-xl bg-[#2d1b69]/20" />
          <Skeleton className="h-9 rounded-xl bg-[#2d1b69]/15" />
          <Skeleton className="h-9 rounded-xl bg-[#2d1b69]/15" />
        </div>
        <Skeleton className="h-1.5 w-full rounded-full bg-[#2d1b69]/15 mb-4" />
        <Skeleton className="h-10 w-full bg-[#2d1b69]/20" />
        <Skeleton className="h-10 w-full bg-[#2d1b69]/20" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 bg-[#2d1b69]/20" />
          <Skeleton className="h-10 bg-[#2d1b69]/20" />
        </div>
        <Skeleton className="h-20 w-full bg-[#2d1b69]/15" />
      </div>
    </div>
  )
}

/* ── Not found state ── */
function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <div
      data-ocid="edit.error_state"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center px-6"
    >
      <div className="w-20 h-20 rounded-2xl bg-[#2d1b69]/20 border border-[#2d1b69]/30 flex items-center justify-center text-4xl">
        📄
      </div>
      <div>
        <p className="text-xl font-extrabold text-white font-display mb-1">Blog post not found</p>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
          The article you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <button
          type="button"
          data-ocid="edit.back_button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2d1b69] text-white rounded-xl font-semibold text-sm hover:bg-[#4a2d9e] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#2d1b69]/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
interface EditBlogPageProps {
  params: Promise<{ slug: string }>
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { slug } = use(params)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlog(slug),
    enabled: !!slug,
    retry: 1,
  })

  const mutation = useMutation({
    mutationFn: (data: BlogFormData) => updateBlog(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      queryClient.invalidateQueries({ queryKey: ['blog', slug] })
      setToast({ message: 'Blog post updated successfully!', type: 'success' })
      setTimeout(() => router.push('/admin'), 1500)
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : 'Failed to update post. Please try again.'
      setToast({ message, type: 'error' })
    },
  })

  /* ── Render states ── */
  if (isLoading) {
    return (
      <div data-ocid="edit.page">
        <TopBar title="Edit Post" />
        <div className="p-6 max-w-5xl">
          <div className="h-6 w-40 mb-6 rounded bg-[#2d1b69]/20 animate-pulse" />
          <LoadingState />
        </div>
      </div>
    )
  }

  if (isError || !blog) {
    return (
      <div data-ocid="edit.page">
        <TopBar title="Edit Post" />
        <div className="p-6">
          <NotFoundState onBack={() => router.push('/admin')} />
        </div>
      </div>
    )
  }

  const initialData: BlogFormData = {
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    tags: blog.tags ?? [],
    thumbnail: blog.thumbnail ?? blog.imageUrl ?? '',
    imageAlt: blog.imageAlt ?? '',
    author: blog.author ?? '',
    status: blog.status,
    featured: blog.featured ?? false,
  }

  return (
    <div data-ocid="edit.page">
      <TopBar title="Edit Post" />

      <div className="p-6 max-w-5xl">
        {/* Back button */}
        <Link
          href="/admin"
          data-ocid="edit.back_button"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Breadcrumb */}
        <nav
          data-ocid="edit.breadcrumb"
          className="flex items-center gap-1.5 text-xs mb-5 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link
            href="/admin"
            className="text-[#d4a017] hover:underline underline-offset-2 font-semibold"
            data-ocid="edit.dashboard_link"
          >
            Admin
          </Link>
          <span className="text-[#2d1b69]" aria-hidden="true">/</span>
          <span className="text-gray-500">Edit Post</span>
          <span className="text-[#2d1b69]" aria-hidden="true">/</span>
          <span className="text-gray-400 font-medium truncate max-w-[200px]" title={blog.title}>
            {blog.title}
          </span>
        </nav>

        {/* Page heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-white font-display leading-tight">
            Edit Post
          </h1>
          <p className="text-sm text-gray-500 mt-1 truncate max-w-lg" title={blog.title}>
            {blog.title}
          </p>
        </div>

        {/* Form */}
        <BlogForm
          isEdit
          initialData={blog}
          isSubmitting={mutation.isPending}
          onSubmit={async (data) => { await mutation.mutateAsync(data) }}
          onCancel={() => router.push('/admin')}
        />
      </div>

      {/* Toast */}
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
