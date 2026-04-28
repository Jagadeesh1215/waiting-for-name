export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  thumbnail: string
  status: 'published' | 'draft'
  readTime: string
}

export interface BlogFormData {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  thumbnail: string
  status: 'published' | 'draft'
}

export interface PaginatedBlogsResult {
  blogs: Blog[]
  total: number
  page: number
  limit: number
}

export const CATEGORIES = [
  'All',
  'Healthcare Marketing',
  'SEO',
  'Social Media',
  'Content Marketing',
  'Brand Strategy',
  'Analytics',
] as const

export type Category = (typeof CATEGORIES)[number]
