'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TopBar } from '@/components/admin/TopBar'
import { BlogForm } from '@/components/admin/BlogForm'
import { Toast } from '@/components/admin/Toast'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchBlog, updateBlog } from '@/services/blogService'
import type { BlogFormData } from '@/types/blog'

interface EditBlogPageProps {
  params: Promise<{ slug: string }>
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [slug, setSlug] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Resolve params
  if (!slug) {
    params.then(({ slug: s }) => setSlug(s))
  }

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlog(slug!),
    enabled: !!slug,
  })

  const mutation = useMutation({
    mutationFn: (data: BlogFormData) => updateBlog(slug!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      setToast({ message: 'Post updated successfully!', type: 'success' })
      setTimeout(() => router.push('/admin'), 1500)
    },
    onError: () => {
      setToast({ message: 'Failed to update post.', type: 'error' })
    },
  })

  return (
    <div>
      <TopBar title="Edit Post" />

      <div className="p-6 max-w-3xl">
        <div className="rounded-xl border border-[#2d1b69]/30 bg-[#0d0a1e] p-8">
          <h2 className="text-xl font-bold font-display text-white mb-2">Edit Blog Post</h2>
          <p className="text-sm text-gray-400 mb-8">Update the content and settings for this post.</p>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-[#2d1b69]/20" />
              <Skeleton className="h-24 w-full bg-[#2d1b69]/20" />
              <Skeleton className="h-10 w-1/2 bg-[#2d1b69]/20" />
            </div>
          ) : blog ? (
            <BlogForm
              initialData={blog}
              onSubmit={async (data) => { await mutation.mutateAsync(data) }}
              isSubmitting={mutation.isPending}
            />
          ) : (
            <div className="text-center py-12 text-gray-500" data-ocid="edit_post.not_found.error_state">
              Post not found. It may have been deleted.
            </div>
          )}
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
