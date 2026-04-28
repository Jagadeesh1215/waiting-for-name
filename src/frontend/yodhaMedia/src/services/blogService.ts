import type { Blog, BlogFormData, PaginatedBlogsResult } from '@/types/blog'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api'

export async function fetchBlogs(params?: {
  page?: number
  limit?: number
  category?: string
  q?: string
}): Promise<PaginatedBlogsResult> {
  const url = new URL(`${BASE}/blogs`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  if (params?.page) url.searchParams.set('page', String(params.page))
  if (params?.limit) url.searchParams.set('limit', String(params.limit))
  if (params?.category && params.category !== 'All') url.searchParams.set('category', params.category)
  if (params?.q) url.searchParams.set('q', params.q)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch blogs')
  return res.json()
}

export async function fetchBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs/${slug}`)
  if (!res.ok) throw new Error(`Blog not found: ${slug}`)
  return res.json()
}

export async function createBlog(data: BlogFormData): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create blog')
  return res.json()
}

export async function updateBlog(slug: string, data: Partial<BlogFormData>): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update blog')
  return res.json()
}

export async function deleteBlog(slug: string): Promise<void> {
  const res = await fetch(`${BASE}/blogs/${slug}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete blog')
}
