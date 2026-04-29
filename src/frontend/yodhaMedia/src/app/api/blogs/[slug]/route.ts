import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  slugExists,
  slugify,
  calcReadTime,
  isValidSlug,
  isValidCategory,
  type Blog,
} from '@/lib/blog-store'

// ---------------------------------------------------------------------------
// GET /api/blogs/[slug]
// ---------------------------------------------------------------------------

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const blog = getBlogBySlug(slug)

    if (!blog) {
      return NextResponse.json(
        { error: 'Not found', details: 'No blog post found with that slug' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog, { status: 200 })
  } catch (err) {
    console.error('[GET /api/blogs/[slug]]', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// PUT /api/blogs/[slug]
// ---------------------------------------------------------------------------

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const existing = getBlogBySlug(slug)

    if (!existing) {
      return NextResponse.json(
        { error: 'Not found', details: 'No blog post found with that slug' },
        { status: 404 }
      )
    }

    const body = (await req.json()) as Partial<Blog>
    const errors: string[] = []

    // Validate only provided fields
    if (body.title !== undefined && (body.title ?? '').trim().length < 3) {
      errors.push('title must be at least 3 characters')
    }
    if (body.author !== undefined && (body.author ?? '').trim().length < 2) {
      errors.push('author must be at least 2 characters')
    }
    if (body.content !== undefined && (body.content ?? '').trim().length < 10) {
      errors.push('content must be at least 10 characters')
    }
    if (body.category !== undefined) {
      const cat = (body.category ?? '').trim()
      if (!cat) {
        errors.push('category cannot be empty')
      } else if (!isValidCategory(cat)) {
        errors.push(
          'category must be one of: Healthcare Marketing, SEO, Social Media, Content Marketing, Branding, Digital Strategy'
        )
      }
    }

    // Handle slug changes
    let newSlug = slug
    if (body.slug !== undefined) {
      newSlug = (body.slug ?? '').trim().toLowerCase()
      if (!newSlug) {
        // Derive from updated title if provided
        const newTitle = (body.title ?? existing.title).trim()
        newSlug = slugify(newTitle)
      }
      if (!isValidSlug(newSlug)) {
        errors.push('slug must be lowercase alphanumeric with hyphens (e.g. my-blog-post)')
      } else if (newSlug !== slug && slugExists(newSlug, existing.id)) {
        return NextResponse.json(
          { error: 'Conflict', details: 'A blog with that slug already exists' },
          { status: 409 }
        )
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors.join('; ') },
        { status: 400 }
      )
    }

    // Build the update payload
    const content = (body.content ?? existing.content).trim()
    const updatePayload: Partial<Omit<Blog, 'id' | 'createdAt'>> = {}

    if (body.title !== undefined) updatePayload.title = body.title.trim()
    if (body.slug !== undefined) updatePayload.slug = newSlug
    if (body.category !== undefined) updatePayload.category = body.category.trim()
    if (body.author !== undefined) updatePayload.author = body.author.trim()
    if (body.authorDesignation !== undefined)
      updatePayload.authorDesignation = body.authorDesignation.trim()
    if (body.content !== undefined) {
      updatePayload.content = content
      updatePayload.readTime = calcReadTime(content)
    }
    if (body.excerpt !== undefined) updatePayload.excerpt = body.excerpt.trim()
    if (body.imageUrl !== undefined) updatePayload.imageUrl = body.imageUrl.trim()
    if (body.imageAlt !== undefined) updatePayload.imageAlt = body.imageAlt.trim()
    if (body.publishDate !== undefined) updatePayload.publishDate = body.publishDate.trim()
    if (body.tags !== undefined)
      updatePayload.tags = Array.isArray(body.tags) ? body.tags.map(String) : []
    if (body.status !== undefined && (body.status === 'published' || body.status === 'draft')) {
      updatePayload.status = body.status
    }

    const updated = updateBlog(slug, updatePayload)

    if (!updated) {
      return NextResponse.json(
        { error: 'Not found', details: 'Blog was removed before update could complete' },
        { status: 404 }
      )
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (err) {
    console.error('[PUT /api/blogs/[slug]]', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/blogs/[slug]
// ---------------------------------------------------------------------------

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const deleted = deleteBlog(slug)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Not found', details: 'No blog post found with that slug' },
        { status: 404 }
      )
    }

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[DELETE /api/blogs/[slug]]', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}
