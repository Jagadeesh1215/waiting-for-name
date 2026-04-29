import type { Blog, BlogFilters, BlogFormData, PaginatedBlogsResult } from '@/types/blog'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api'

function buildBlogUrl(params?: BlogFilters): URL {
  const url = new URL(
    `${BASE}/blogs`,
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  )
  if (params?.page)                                       url.searchParams.set('page',     String(params.page))
  if (params?.limit)                                      url.searchParams.set('limit',    String(params.limit))
  if (params?.category && params.category !== 'All')      url.searchParams.set('category', params.category)
  if (params?.q)                                          url.searchParams.set('q',        params.q)
  if (params?.status && params.status !== 'all')          url.searchParams.set('status',   params.status)
  if (params?.featured !== undefined)                     url.searchParams.set('featured', String(params.featured))
  return url
}

async function handleResponse<T>(res: Response, errorMsg: string): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || errorMsg)
  }
  return res.json() as Promise<T>
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchBlogs(params?: BlogFilters): Promise<PaginatedBlogsResult> {
  const url = buildBlogUrl(params)
  const res = await fetch(url.toString(), { cache: 'no-store' })
  return handleResponse<PaginatedBlogsResult>(res, 'Failed to fetch blogs')
}

export async function fetchBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs/${slug}`, { cache: 'no-store' })
  return handleResponse<Blog>(res, `Blog not found: ${slug}`)
}

// ─── Admin / Mutation API ─────────────────────────────────────────────────────

export async function createBlog(data: BlogFormData): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Blog>(res, 'Failed to create blog')
}

export async function updateBlog(slug: string, data: Partial<BlogFormData>): Promise<Blog> {
  const res = await fetch(`${BASE}/blogs/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse<Blog>(res, 'Failed to update blog')
}

export async function deleteBlog(slug: string): Promise<void> {
  const res = await fetch(`${BASE}/blogs/${slug}`, { method: 'DELETE' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to delete blog')
  }
}

export async function publishBlog(slug: string): Promise<Blog> {
  return updateBlog(slug, { status: 'published' })
}

export async function unpublishBlog(slug: string): Promise<Blog> {
  return updateBlog(slug, { status: 'draft' })
}
