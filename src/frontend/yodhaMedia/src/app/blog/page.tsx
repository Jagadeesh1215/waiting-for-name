'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ConsultationModal } from '@/components/layout/ConsultationModal'
import {
  ScrollReveal,
  containerVariants,
  fadeUpVariants,
  sectionLabelClass,
} from '@/lib/animations'
import { fetchBlogs } from '@/services/blogService'
import type { Blog } from '@/types/blog'

// ─── Category mapping ─────────────────────────────────────────────────────────

const DISPLAY_CATEGORIES = [
  'All', 'Healthcare Marketing', 'Social Media Strategy',
  'Local SEO & Google Business', 'Digital Marketing', 'Influencer Marketing', 'Website & Branding',
]

const CATEGORY_COLORS: Record<string, string> = {
  'Healthcare Marketing': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
  'Social Media Strategy': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
  'Local SEO & Google Business': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  'Digital Marketing': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  'Influencer Marketing': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
  'Website & Branding': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
}

const CARD_GRADIENTS = [
  'from-brand-purple via-brand-purple-2 to-indigo-600',
  'from-indigo-600 via-purple-600 to-brand-purple-2',
  'from-brand-purple-2 via-violet-600 to-purple-700',
  'from-violet-700 via-brand-purple to-indigo-700',
  'from-purple-600 via-brand-purple-2 to-violet-700',
  'from-indigo-700 via-brand-purple to-violet-600',
]

function getGradient(index: number) {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length]
}

// ─── Mock data ────────────────────────────────────────────────────────────────

interface DisplayPost {
  id: string; title: string; slug: string; category: string; readTime: string; excerpt: string; publishDate: string;
}

const MOCK_POSTS: DisplayPost[] = [
  { id: '1', slug: 'social-media-marketing-transforms-healthcare', title: 'How Social Media Marketing Transforms Healthcare in India', category: 'Healthcare Marketing', readTime: '5 min', excerpt: 'Discover how leading hospitals and clinics are leveraging Instagram, Facebook, and YouTube to build patient trust and drive appointments.', publishDate: '2025-12-15' },
  { id: '2', slug: 'google-business-profile-guide-doctors', title: 'The Ultimate Guide to Google Business Profile for Doctors', category: 'Local SEO & Google Business', readTime: '8 min', excerpt: 'A complete step-by-step guide to optimize your Google Business Profile and dominate local search for your medical practice.', publishDate: '2025-12-10' },
  { id: '3', slug: 'instagram-reels-ideas-hospitals', title: '10 Instagram Reels Ideas for Hospitals & Healthcare Brands', category: 'Social Media Strategy', readTime: '6 min', excerpt: 'Struggling to create engaging reels for your healthcare brand? Here are 10 proven content ideas that drive views and build trust.', publishDate: '2025-12-05' },
  { id: '4', slug: 'meta-ads-vs-google-ads-clinics', title: 'Meta Ads vs Google Ads: Which is Better for Clinics?', category: 'Digital Marketing', readTime: '7 min', excerpt: 'A data-driven comparison of Meta Ads and Google Ads specifically for healthcare providers — find out which delivers better ROI.', publishDate: '2025-11-28' },
  { id: '5', slug: 'digital-branding-strategy-2025', title: 'Why Every Business Needs a Digital Branding Strategy in 2025', category: 'Website & Branding', readTime: '4 min', excerpt: 'Your brand is more than a logo. Learn how digital branding can differentiate your business and build lasting customer loyalty.', publishDate: '2025-11-20' },
  { id: '6', slug: 'influencer-marketing-healthcare', title: 'Influencer Marketing for Healthcare: What Works and What Doesn\'t', category: 'Influencer Marketing', readTime: '6 min', excerpt: 'Not all influencer collaborations are equal. Learn the proven framework for successful healthcare influencer campaigns.', publishDate: '2025-11-15' },
  { id: '7', slug: 'local-seo-rank-clinic-google-maps', title: 'Local SEO Secrets: How to Rank Your Clinic on Google Maps', category: 'Local SEO & Google Business', readTime: '9 min', excerpt: 'Rank higher on Google Maps and attract more local patients with these proven local SEO strategies specifically for clinics.', publishDate: '2025-11-08' },
  { id: '8', slug: 'content-calendar-healthcare-social-media', title: 'Content Calendar Templates for Healthcare Social Media', category: 'Social Media Strategy', readTime: '5 min', excerpt: 'Download-ready content calendar framework for hospitals and clinics, including post ideas, hashtag strategies, and posting schedules.', publishDate: '2025-11-01' },
  { id: '9', slug: 'five-star-reviews-medical-practice', title: 'How to Get More 5-Star Reviews for Your Medical Practice', category: 'Healthcare Marketing', readTime: '4 min', excerpt: 'Practical strategies to generate authentic 5-star Google reviews that build trust and drive new patient appointments.', publishDate: '2025-10-22' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category, hover }: { category: string; hover?: boolean }) {
  const colorClass = CATEGORY_COLORS[category] || 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800'
  return (
    <span className={`inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 ${colorClass} ${hover ? 'brightness-110 saturate-150' : ''}`}>
      {category}
    </span>
  )
}

function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 animate-pulse">
      <div className="h-40 bg-brand-border-light dark:bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 bg-brand-border-light dark:bg-white/10 rounded-full" />
        <div className="h-5 w-full bg-brand-border-light dark:bg-white/10 rounded" />
        <div className="h-4 w-5/6 bg-brand-border-light dark:bg-white/10 rounded" />
        <div className="h-4 w-2/3 bg-brand-border-light dark:bg-white/10 rounded" />
      </div>
    </div>
  )
}

function BlogCard({ post, index }: { post: DisplayPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUpVariants}
      className="group bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 hover:border-brand-purple/30 dark:hover:border-brand-purple/40 transition-smooth hover:shadow-xl hover:shadow-brand-purple/10 flex flex-col"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-ocid={`blog.item.${index + 1}`}
    >
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className={`h-40 bg-gradient-to-br ${getGradient(index)} relative`}>
          <div className="absolute inset-0 transition-transform duration-500" style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.3),transparent_70%)]" />
          <div className="absolute bottom-3 left-3">
            <CategoryBadge category={post.category} hover={hovered} />
          </div>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading font-semibold text-base text-brand-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-brand-text-secondary dark:text-white/60 line-clamp-2 flex-1 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border-light dark:border-white/10">
          <span className="text-xs text-brand-text-secondary dark:text-white/50 font-mono">
            {new Date(post.publishDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs bg-brand-bg-light dark:bg-white/5 text-brand-text-secondary dark:text-white/60 px-2.5 py-1 rounded-full font-mono">
            {post.readTime} read
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedBlogCard({ post, index }: { post: DisplayPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <ScrollReveal delay={index * 0.12}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 hover:border-brand-purple/30 dark:hover:border-brand-purple/40 transition-smooth hover:shadow-xl hover:shadow-brand-purple/10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-ocid={`blog.featured.item.${index + 1}`}
      >
        <div className={`h-48 bg-gradient-to-br ${getGradient(index)} overflow-hidden relative`}>
          <div className="absolute inset-0 transition-transform duration-500" style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.4),transparent_70%)]" />
          <div className="absolute bottom-4 left-4"><CategoryBadge category={post.category} hover={hovered} /></div>
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-mono">{post.readTime} read</div>
        </div>
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg text-brand-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug">{post.title}</h3>
          <p className="text-sm text-brand-text-secondary dark:text-white/60 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-brand-gold text-sm font-heading font-semibold group-hover:gap-2.5 transition-all">
            Read More <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </ScrollReveal>
  )
}

function InlineCTACard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="col-span-full bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-purple/30"
      data-ocid="blog.inline_cta"
    >
      <div>
        <p className="text-white/70 text-xs font-mono uppercase tracking-widest mb-1">Need Expert Help?</p>
        <p className="text-white font-heading font-semibold text-lg leading-snug">Need help implementing these strategies for your business?</p>
      </div>
      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        className="shrink-0 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-6 py-3 rounded-full transition-smooth whitespace-nowrap hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse"
        data-ocid="blog.inline_cta.book_button"
      >
        Book Consultation →
      </motion.button>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const POSTS_PER_PAGE = 9

function BlogListInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [filterStuck, setFilterStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const selectedCategory = searchParams.get('category') || 'All'
  const currentPage = Number(searchParams.get('page') || '1')

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setFilterStuck(!entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['blogs-all'],
    queryFn: () => fetchBlogs({ limit: 100 }),
    staleTime: 5 * 60 * 1000,
  })

  const backendPosts: DisplayPost[] = useMemo(
    () =>
      (data?.blogs ?? []).map((b: Blog) => ({
        id: b.id, title: b.title, slug: b.slug,
        category: b.category, readTime: b.readTime ?? '5 min',
        excerpt: b.excerpt ?? b.content.replace(/<[^>]+>/g, '').slice(0, 160),
        publishDate: b.publishedAt ?? b.publishDate ?? '',
      })),
    [data]
  )

  const allPosts: DisplayPost[] = backendPosts.length > 0 ? backendPosts : MOCK_POSTS
  const featuredPosts = allPosts.slice(0, 3)
  const filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter((p) => p.category === selectedCategory)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const pagedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  function setCategory(cat: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') params.delete('category')
    else params.set('category', cat)
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  function setPage(p: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    router.push(`/blog?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark">
        {/* ── Hero ── */}
        <section className="gradient-mesh py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-brand-gold/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <ScrollReveal>
              <span className={sectionLabelClass}>OUR BLOG</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text-primary dark:text-white mt-3 mb-5 leading-tight">
                Digital Growth Insights &{' '}
                <span className="text-brand-purple dark:text-brand-gold">Industry Knowledge</span>
              </h1>
              <p className="text-lg text-brand-text-secondary dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
                Expert insights on social media, healthcare marketing, SEO, and digital growth strategies.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div ref={sentinelRef} className="h-px" />

        {/* ── Sticky Category Filter ── */}
        <div
          className={`sticky top-16 z-40 bg-white/95 dark:bg-brand-bg-dark/95 backdrop-blur-md border-b border-brand-border-light dark:border-white/10 transition-shadow duration-300 ${filterStuck ? 'shadow-md' : ''}`}
          data-ocid="blog.category_filter"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {DISPLAY_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-smooth border ${
                    selectedCategory === cat
                      ? 'bg-brand-purple text-white border-brand-purple shadow-md'
                      : 'bg-transparent border-brand-border-light dark:border-white/20 text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5'
                  }`}
                  data-ocid="blog.filter.tab"
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          {/* ── Featured Posts ── */}
          {selectedCategory === 'All' && (
            <section data-ocid="blog.featured.section">
              <ScrollReveal>
                <span className={sectionLabelClass}>FEATURED POSTS</span>
                <h2 className="font-heading text-2xl font-bold text-brand-text-primary dark:text-white mt-2 mb-8">Must-Read Articles</h2>
              </ScrollReveal>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                    <BlogCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post, i) => (
                    <FeaturedBlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── Blog Grid ── */}
          <section data-ocid="blog.grid.section">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className={sectionLabelClass}>
                    {selectedCategory === 'All' ? 'ALL ARTICLES' : selectedCategory.toUpperCase()}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-brand-text-primary dark:text-white mt-2">
                    {selectedCategory === 'All' ? 'Browse All Articles' : `Articles on ${selectedCategory}`}
                  </h2>
                </div>
                {filteredPosts.length > 0 && (
                  <span className="text-sm text-brand-text-secondary dark:text-white/60 font-mono">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </ScrollReveal>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20" data-ocid="blog.grid.empty_state">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="font-heading text-xl font-semibold text-brand-text-primary dark:text-white mb-2">No articles yet in this category</h3>
                <p className="text-brand-text-secondary dark:text-white/60 mb-6">Check back soon or browse other categories.</p>
                <button
                  type="button"
                  onClick={() => setCategory('All')}
                  className="bg-brand-purple text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-smooth hover:bg-brand-purple-2"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="wait">
                  {pagedPosts.map((post, i) => {
                    const globalIdx = (currentPage - 1) * POSTS_PER_PAGE + i
                    const showCta = (i + 1) % 6 === 0 && i < pagedPosts.length - 1
                    return (
                      <Fragment key={post.id}>
                        <BlogCard post={post} index={globalIdx} />
                        {showCta && <InlineCTACard onOpen={() => setModalOpen(true)} />}
                      </Fragment>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12" data-ocid="blog.pagination">
                <motion.button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full border border-brand-border-light dark:border-white/20 text-sm font-heading font-medium text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                  data-ocid="blog.pagination_prev"
                >
                  ← Previous
                </motion.button>
                <span className="text-sm text-brand-text-secondary dark:text-white/60 font-mono px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <motion.button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full border border-brand-border-light dark:border-white/20 text-sm font-heading font-medium text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                  data-ocid="blog.pagination_next"
                >
                  Next →
                </motion.button>
              </div>
            )}
          </section>

          {/* ── Bottom CTA ── */}
          <ScrollReveal>
            <section className="bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,160,23,0.5),transparent_60%)]" />
              <div className="relative">
                <span className="text-brand-gold-light text-xs font-mono uppercase tracking-widest">GROW YOUR BUSINESS</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Ready to Implement These Strategies?</h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">Let our team handle the digital strategy while you focus on your business.</p>
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  whileTap={{ scale: 0.97 }}
                  className="bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse text-base"
                  data-ocid="blog.bottom_cta.book_button"
                >
                  Book a Free Consultation →
                </motion.button>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PublicLayout>
  )
}

export default function BlogListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" /></div>}>
      <BlogListInner />
    </Suspense>
  )
}
