// ─── Blog Categories ─────────────────────────────────────────────────────────
export const BLOG_CATEGORIES = [
  'All',
  'Healthcare Marketing',
  'Digital Strategy',
  'Brand Identity',
  'Case Studies',
  'Industry Insights',
  'SEO & Growth',
  'Social Media',
  'Content Marketing',
  'Analytics',
] as const

/** @deprecated Use BLOG_CATEGORIES instead */
export const CATEGORIES = BLOG_CATEGORIES

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

// ─── Core Blog Type ───────────────────────────────────────────────────────────
export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory | string
  tags: string[]
  author: string
  authorRole?: string
  authorAvatar?: string
  /** ISO date string e.g. "2024-03-15" */
  publishedAt: string
  /** Alias for publishedAt — used in some API responses */
  publishDate?: string
  thumbnail: string
  imageUrl?: string
  imageAlt?: string
  status: 'published' | 'draft'
  /** e.g. "5 min read" */
  readTime: string
  featured?: boolean
  views?: number
}

// ─── Form Data ────────────────────────────────────────────────────────────────
export interface BlogFormData {
  title: string
  excerpt: string
  content: string
  category: BlogCategory | string
  tags: string[]
  thumbnail: string
  imageAlt?: string
  author?: string
  status: 'published' | 'draft'
  featured?: boolean
}

// ─── Paginated Result ─────────────────────────────────────────────────────────
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Legacy alias kept for backwards compatibility */
export interface PaginatedBlogsResult {
  blogs: Blog[]
  total: number
  page: number
  limit: number
  totalPages?: number
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── Filter / Pagination Params ───────────────────────────────────────────────
export interface BlogFilters {
  page?: number
  limit?: number
  category?: BlogCategory | string
  /** Full-text search query */
  q?: string
  status?: 'published' | 'draft' | 'all'
  featured?: boolean
}
