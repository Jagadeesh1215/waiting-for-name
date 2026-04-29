'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { BlogForm } from '@/components/admin/BlogForm'
import { Toast } from '@/components/admin/Toast'
import { createBlog } from '@/services/blogService'
import type { BlogFormData } from '@/types/blog'

export default function CreateBlogPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const mutation = useMutation({
    mutationFn: (data: BlogFormData) => createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      setToast({ message: 'Blog post created successfully!', type: 'success' })
      setTimeout(() => router.push('/admin'), 1500)
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : 'Failed to create post. Please try again.'
      setToast({ message, type: 'error' })
    },
  })

  return (
    <div data-ocid="create.page">
      <TopBar title="Create New Post" />

      <div className="p-6 max-w-5xl">
        {/* Back button */}
        <Link
          href="/admin"
          data-ocid="create.back_button"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-5" aria-label="Breadcrumb" data-ocid="create.breadcrumb">
          <Link
            href="/admin"
            className="text-[#d4a017] hover:underline underline-offset-2 font-semibold"
            data-ocid="create.breadcrumb_dashboard.link"
          >
            Admin
          </Link>
          <span className="text-[#2d1b69]" aria-hidden="true">/</span>
          <span className="text-gray-400 font-medium">Create Post</span>
        </nav>

        {/* Page heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-white font-display leading-tight">
            Create New Post
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details, write your content, and publish with confidence.
          </p>
        </div>

        {/* Form */}
        <BlogForm
          isEdit={false}
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
