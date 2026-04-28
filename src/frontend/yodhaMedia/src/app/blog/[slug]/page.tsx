import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getBlog(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? '/api'
  const url = typeof window !== 'undefined'
    ? `${baseUrl}/blogs/${slug}`
    : `http://localhost:3000${baseUrl}/blogs/${slug}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) notFound()

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-20 text-white" data-ocid="blog_post.hero.section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#d4a017] transition-colors mb-8"
            data-ocid="blog_post.back.link"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-medium text-[#1a0f3d] bg-[#d4a017] px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" /> {blog.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-300 text-lg">{blog.excerpt}</p>
          <p className="text-sm text-gray-500 mt-4">By {blog.author}</p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2" data-ocid="blog_post.article">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {blog.content.split('\n').map((para: string, i: number) => {
                  if (para.trim() === '') return null
                  const key = `para-${para.slice(0, 20)}-${i}`
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return (
                      <h3 key={key} className="text-xl font-bold font-display text-[#2d1b69] dark:text-white mt-8 mb-3">
                        {para.replace(/\*\*/g, '')}
                      </h3>
                    )
                  }
                  return (
                    <p key={key} className="text-[var(--foreground)] leading-relaxed mb-4">
                      {para}
                    </p>
                  )
                })}
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="mt-10 pt-8 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-[var(--muted-foreground)]" />
                    {blog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#2d1b69]/10 text-[#2d1b69] dark:text-[#d4a017] text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6" data-ocid="blog_post.sidebar">
              {/* Key Takeaways */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <h3 className="font-bold font-display text-[#2d1b69] dark:text-white mb-4">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {[
                    'Healthcare marketing requires specialized knowledge',
                    'Patient trust is built through consistent, quality content',
                    'Data-driven strategies deliver the best ROI',
                    'Local SEO is critical for practice growth',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="w-2 h-2 rounded-full bg-[#d4a017] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Box */}
              <div className="rounded-2xl bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] p-6 text-white">
                <h3 className="font-bold font-display text-[#d4a017] mb-3">
                  Grow Your Practice
                </h3>
                <p className="text-sm text-gray-300 mb-5">
                  Let yodhaMedia handle your digital marketing while you focus on patient care.
                </p>
                <Button variant="default" className="w-full" asChild data-ocid="blog_post.sidebar.cta.button">
                  <Link href="/services">
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* More Posts */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <h3 className="font-bold font-display text-[#2d1b69] dark:text-white mb-4">
                  More Articles
                </h3>
                <Button variant="outline-purple" className="w-full" asChild>
                  <Link href="/blog">Browse All Posts</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
