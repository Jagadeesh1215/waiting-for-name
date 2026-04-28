'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      setToast({ message: 'Post created successfully!', type: 'success' })
      setTimeout(() => router.push('/admin'), 1500)
    },
    onError: () => {
      setToast({ message: 'Failed to create post. Please try again.', type: 'error' })
    },
  })

  return (
    <div>
      <TopBar title="Create New Post" />

      <div className="p-6 max-w-3xl">
        <div className="rounded-xl border border-[#2d1b69]/30 bg-[#0d0a1e] p-8">
          <h2 className="text-xl font-bold font-display text-white mb-2">New Blog Post</h2>
          <p className="text-sm text-gray-400 mb-8">
            Fill in the details below to create a new post for the yodhaMedia blog.
          </p>
          <BlogForm
            onSubmit={async (data) => { await mutation.mutateAsync(data) }}
            isSubmitting={mutation.isPending}
          />
        </div>
      </div>

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
