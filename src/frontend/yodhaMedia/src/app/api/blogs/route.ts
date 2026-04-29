import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  getAllBlogs,
  createBlog,
  slugExists,
  slugify,
  calcReadTime,
  isValidSlug,
  isValidCategory,
  type Blog,
} from '@/lib/blog-store'

// ---------------------------------------------------------------------------
// GET /api/blogs
// Query params: search, category, page, limit, status
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get('search')?.trim().toLowerCase() ?? ''
    const category = searchParams.get('category')?.trim() ?? ''
    const status = (searchParams.get('status') ?? 'published') as Blog['status'] | 'all'
    const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(searchParams.get('limit') ?? '9', 10))
    )

    let results = getAllBlogs()

    // Filter by status
    if (status !== 'all') {
      results = results.filter((b) => b.status === status)
    }

    // Filter by category (exact match, case-insensitive)
    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Full-text search across title, excerpt, content
    if (search) {
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.excerpt.toLowerCase().includes(search) ||
          b.content.toLowerCase().includes(search) ||
          b.tags.some((tag) => tag.toLowerCase().includes(search))
      )
    }

    // Sort by publishDate descending (most recent first)
    results = [...results].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )

    const total = results.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const data = results.slice(start, start + limit)

    return NextResponse.json(
      { data, total, page, limit, totalPages },
      { status: 200 }
    )
  } catch (err) {
    console.error('[GET /api/blogs]', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// POST /api/blogs
// Body: BlogFormData
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Blog>

    // --- Validation ---
    const errors: string[] = []

    const title = (body.title ?? '').trim()
    if (title.length < 3) errors.push('title must be at least 3 characters')

    const author = (body.author ?? '').trim()
    if (author.length < 2) errors.push('author must be at least 2 characters')

    const content = (body.content ?? '').trim()
    if (content.length < 10) errors.push('content must be at least 10 characters')

    const category = (body.category ?? '').trim()
    if (!category) {
      errors.push('category is required')
    } else if (!isValidCategory(category)) {
      errors.push(
        'category must be one of: Healthcare Marketing, SEO, Social Media, Content Marketing, Branding, Digital Strategy'
      )
    }

    // Derive or validate slug
    let slug = (body.slug ?? '').trim().toLowerCase()
    if (!slug) {
      slug = slugify(title)
    }
    if (!slug || !isValidSlug(slug)) {
      errors.push('slug must be lowercase alphanumeric with hyphens (e.g. my-blog-post)')
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors.join('; ') },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    if (slugExists(slug)) {
      const conflictMsg = ['A blog with slug "', slug, '" already exists'].join('')
      return NextResponse.json(
        { error: 'Conflict', details: conflictMsg },
        { status: 409 }
      )
    }

    const publishDate = (body.publishDate ?? '').trim() || new Date().toISOString()
    const readTime = calcReadTime(content)
    const status: Blog['status'] =
      body.status === 'draft' || body.status === 'published' ? body.status : 'published'

    const created = createBlog({
      title,
      slug,
      category,
      author,
      authorDesignation: (body.authorDesignation ?? '').trim(),
      content,
      excerpt: (body.excerpt ?? '').trim() || content.replace(/<[^>]+>/g, '').slice(0, 200),
      tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
      imageUrl: (body.imageUrl ?? '').trim(),
      imageAlt: (body.imageAlt ?? '').trim(),
      publishDate,
      readTime,
      status,
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('[POST /api/blogs]', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}
