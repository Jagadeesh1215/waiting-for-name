'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchBlogs } from '@/services/blogService'
import { CATEGORIES } from '@/types/blog'
import type { Blog } from '@/types/blog'

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[#d4a017]/40 hover:shadow-xl transition-all duration-300"
      data-ocid={`blog.item.${index}`}
    >
      <div className="h-48 bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center">
        <span className="text-5xl">📝</span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-1 rounded-full">
            {blog.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
            <Clock className="h-3 w-3" />
            {blog.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold font-display text-[#2d1b69] dark:text-white mb-2 group-hover:text-[#d4a017] transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-4">{blog.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <Calendar className="h-3 w-3" />
            {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <span className="text-xs text-[#d4a017] font-semibold flex items-center gap-1">
            Read <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blogs', { category, page }],
    queryFn: () =>
      fetchBlogs({ category: category === 'All' ? undefined : category, page, limit: 6 }),
  })

  const blogs = data?.blogs ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / 6)

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="blog.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">Insights & Resources</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Healthcare Marketing Blog
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Expert insights on digital marketing for healthcare providers and modern businesses.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[var(--card)] border-b border-[var(--border)] sticky top-16 lg:top-20 z-20" data-ocid="blog.filter.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  category === cat
                    ? 'bg-[#2d1b69] text-white'
                    : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[#2d1b69]/20'
                }`}
                data-ocid={`blog.filter.${cat.toLowerCase().replace(/\s/g, '_')}.tab`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-[var(--background)] py-16" data-ocid="blog.grid.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['s1', 's2', 's3', 's4', 's5', 's6'].map((sk) => (
                <div key={sk} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                  <Skeleton className="h-48" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20" data-ocid="blog.grid.error_state">
              <p className="text-[var(--muted-foreground)]">Failed to load posts. Please try again.</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20" data-ocid="blog.grid.empty_state">
              <Tag className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#2d1b69] dark:text-white mb-2">No posts found</h3>
              <p className="text-[var(--muted-foreground)]">Try selecting a different category.</p>
            </div>
          ) : (
            <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, i) => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} index={i + 1} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              <Button
                type="button"
                variant="outline-purple"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                data-ocid="blog.pagination_prev"
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-[var(--muted-foreground)]">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline-purple"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                data-ocid="blog.pagination_next"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
