'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ConsultationModal } from '@/components/layout/ConsultationModal'
import { ScrollReveal, sectionLabelClass } from '@/lib/animations'
import { fetchBlog } from '@/services/blogService'
import type { Blog } from '@/types/blog'

// ─── Types & Data ─────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'Healthcare Marketing': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300',
  'Social Media Strategy': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300',
  'Local SEO & Google Business': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300',
  'Digital Marketing': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300',
  'Influencer Marketing': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300',
  'Website & Branding': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300',
}

const CARD_GRADIENTS = [
  'from-brand-purple via-brand-purple-2 to-indigo-600',
  'from-indigo-600 via-purple-600 to-brand-purple-2',
  'from-brand-purple-2 via-violet-600 to-purple-700',
  'from-violet-700 via-brand-purple to-indigo-700',
  'from-purple-600 via-brand-purple-2 to-violet-700',
]

interface MockPost {
  id: string; title: string; slug: string; category: string; readTime: string;
  excerpt: string; publishDate: string; keyTakeaway: string; tags: string[]; gradientIndex: number;
}

const MOCK_POSTS: MockPost[] = [
  { id: '1', slug: 'social-media-marketing-transforms-healthcare', title: 'How Social Media Marketing Transforms Healthcare in India', category: 'Healthcare Marketing', readTime: '5 min', excerpt: 'Discover how leading hospitals and clinics are leveraging Instagram, Facebook, and YouTube to build patient trust and drive appointments.', publishDate: '2025-12-15', keyTakeaway: 'Hospitals using a consistent social media strategy see up to 3x more online appointment bookings within 6 months of implementation.', tags: ['Healthcare Marketing', 'Social Media', 'Patient Trust', 'India'], gradientIndex: 0 },
  { id: '2', slug: 'google-business-profile-guide-doctors', title: 'The Ultimate Guide to Google Business Profile for Doctors', category: 'Local SEO & Google Business', readTime: '8 min', excerpt: 'A complete step-by-step guide to optimize your Google Business Profile and dominate local search for your medical practice.', publishDate: '2025-12-10', keyTakeaway: 'A fully optimized Google Business Profile can increase your clinic\'s local search visibility by 70% and drive significantly more walk-in and appointment-based patients.', tags: ['Local SEO', 'Google Business', 'Doctors', 'Clinic Growth'], gradientIndex: 1 },
  { id: '3', slug: 'instagram-reels-ideas-hospitals', title: '10 Instagram Reels Ideas for Hospitals & Healthcare Brands', category: 'Social Media Strategy', readTime: '6 min', excerpt: 'Struggling to create engaging reels for your healthcare brand? Here are 10 proven content ideas that drive views and build trust.', publishDate: '2025-12-05', keyTakeaway: 'Educational reels that address common patient questions consistently outperform promotional content, generating 4x more organic reach for healthcare brands.', tags: ['Instagram Reels', 'Healthcare Content', 'Social Media Strategy'], gradientIndex: 2 },
  { id: '4', slug: 'meta-ads-vs-google-ads-clinics', title: 'Meta Ads vs Google Ads: Which is Better for Clinics?', category: 'Digital Marketing', readTime: '7 min', excerpt: 'A data-driven comparison of Meta Ads and Google Ads specifically for healthcare providers — find out which delivers better ROI.', publishDate: '2025-11-28', keyTakeaway: 'For most clinics, Google Ads delivers higher-intent leads while Meta Ads excel at brand awareness — a combined strategy typically yields the best ROI.', tags: ['Meta Ads', 'Google Ads', 'Digital Marketing', 'ROI'], gradientIndex: 3 },
  { id: '5', slug: 'digital-branding-strategy-2025', title: 'Why Every Business Needs a Digital Branding Strategy in 2025', category: 'Website & Branding', readTime: '4 min', excerpt: 'Your brand is more than a logo. Learn how digital branding can differentiate your business and build lasting customer loyalty.', publishDate: '2025-11-20', keyTakeaway: 'Businesses with a defined digital branding strategy retain customers 33% longer and see significantly higher referral rates than those without one.', tags: ['Branding', 'Digital Strategy', 'Business Growth', '2025'], gradientIndex: 4 },
  { id: '6', slug: 'influencer-marketing-healthcare', title: 'Influencer Marketing for Healthcare: What Works and What Doesn\'t', category: 'Influencer Marketing', readTime: '6 min', excerpt: 'Not all influencer collaborations are equal. Learn the proven framework for successful healthcare influencer campaigns.', publishDate: '2025-11-15', keyTakeaway: 'Micro-influencers with 10k–50k followers in healthcare niches deliver 60% higher engagement rates than macro-influencers for medical and wellness brands.', tags: ['Influencer Marketing', 'Healthcare', 'Campaign Strategy'], gradientIndex: 0 },
  { id: '7', slug: 'local-seo-rank-clinic-google-maps', title: 'Local SEO Secrets: How to Rank Your Clinic on Google Maps', category: 'Local SEO & Google Business', readTime: '9 min', excerpt: 'Rank higher on Google Maps and attract more local patients with these proven local SEO strategies specifically for clinics.', publishDate: '2025-11-08', keyTakeaway: 'Clinics that consistently post updates and manage reviews on Google Business Profile rank in the top 3 local results 2x more often than those that don\'t.', tags: ['Local SEO', 'Google Maps', 'Clinic Marketing', 'Patient Acquisition'], gradientIndex: 1 },
  { id: '8', slug: 'content-calendar-healthcare-social-media', title: 'Content Calendar Templates for Healthcare Social Media', category: 'Social Media Strategy', readTime: '5 min', excerpt: 'Download-ready content calendar framework for hospitals and clinics, including post ideas, hashtag strategies, and posting schedules.', publishDate: '2025-11-01', keyTakeaway: 'Healthcare brands posting 4–5 times per week with a structured content calendar see 45% higher follower growth compared to ad-hoc posting strategies.', tags: ['Content Calendar', 'Social Media', 'Healthcare', 'Templates'], gradientIndex: 2 },
  { id: '9', slug: 'five-star-reviews-medical-practice', title: 'How to Get More 5-Star Reviews for Your Medical Practice', category: 'Healthcare Marketing', readTime: '4 min', excerpt: 'Practical strategies to generate authentic 5-star Google reviews that build trust and drive new patient appointments.', publishDate: '2025-10-22', keyTakeaway: 'Simply asking patients to leave a review at checkout increases review generation by 300% — timing and the right ask make all the difference.', tags: ['Reviews', 'Reputation Management', 'Healthcare Marketing', 'Google'], gradientIndex: 3 },
]

const FAQ_ITEMS = [
  { q: 'How long does it take to see results?', a: 'Results vary by service — social media typically shows engagement improvement within 4–6 weeks, while SEO results take 3–6 months.' },
  { q: 'Do you serve businesses outside of healthcare?', a: 'Yes! While we specialize in healthcare, we work with businesses, e-commerce brands, and service providers across industries.' },
  { q: 'What makes VenIQ Media different from other agencies?', a: 'We focus on integrated systems — combining content, marketing, and distribution — rather than offering siloed services.' },
]

const TOC_ITEMS = [
  { id: 'why-matters', label: 'Why This Matters' },
  { id: 'key-strategies', label: 'Key Strategies' },
  { id: 'implementation-tips', label: 'Implementation Tips' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'conclusion', label: 'Conclusion' },
]

const POPULAR_TOPICS = ['Digital Marketing', 'Healthcare SEO', 'Social Media', 'Content Strategy', 'Google Business', 'Influencer Marketing', 'Brand Strategy', 'Meta Ads']

const SIDEBAR_CATEGORIES = [
  { name: 'Healthcare Marketing', count: 3 },
  { name: 'Social Media Strategy', count: 2 },
  { name: 'Local SEO & Google Business', count: 2 },
  { name: 'Digital Marketing', count: 2 },
  { name: 'Influencer Marketing', count: 1 },
  { name: 'Website & Branding', count: 1 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] || 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300'
  return <span className={`inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${cls}`}>{category}</span>
}

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <div className="space-y-3" data-ocid="blog.post.faq.section">
      {FAQ_ITEMS.map((item, i) => (
        <div key={item.q} className="border border-brand-border-light dark:border-white/10 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-heading font-semibold text-brand-text-primary dark:text-white hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth"
            data-ocid={`blog.post.faq.item.${i + 1}`}
          >
            <span className="pr-4">{item.q}</span>
            <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-brand-gold text-xl leading-none">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIdx === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <div className="px-5 pb-5 pt-1 text-brand-text-secondary dark:text-white/70 text-sm leading-relaxed border-t border-brand-border-light dark:border-white/10">{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ArticleContent({ title }: { title: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p className="text-brand-text-secondary dark:text-white/70 leading-relaxed text-base">
        In today's competitive digital landscape, businesses and healthcare professionals cannot afford to ignore their online presence. The strategies we're about to explore have been proven across 50+ client engagements, delivering consistent, measurable growth for hospitals, clinics, and modern businesses across India.
      </p>
      <h2 id="why-matters" className="font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28">Why This Matters</h2>
      <p className="text-brand-text-secondary dark:text-white/70 leading-relaxed text-base">
        The digital revolution has fundamentally changed how patients choose healthcare providers and how customers discover businesses. Over 87% of Indians now search online before making a healthcare decision. Without a strong digital presence, even the most skilled professionals risk remaining invisible to their ideal clients.
      </p>
      <h2 id="key-strategies" className="font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28">
        Key Strategies for {title.split(':')[0]}
      </h2>
      <ol className="list-decimal list-inside space-y-3 text-brand-text-secondary dark:text-white/70 text-base">
        {[
          ['Establish a consistent brand voice', '— Consistency across all touchpoints builds recognition and trust over time.'],
          ['Leverage data-driven content', '— Use analytics to understand what resonates with your audience and double down on high-performing content formats.'],
          ['Optimize for local search intent', '— Most healthcare and service queries are local. Ensure your Google Business Profile and local SEO are airtight.'],
          ['Build social proof systematically', '— Reviews, testimonials, and case studies convert far better than promotional content.'],
          ['Integrate all channels', '— A siloed approach to digital marketing leaves significant growth on the table. Integration multiplies results.'],
        ].map(([bold, rest]) => (
          <li key={bold} className="leading-relaxed">
            <strong className="text-brand-text-primary dark:text-white">{bold}</strong> {rest}
          </li>
        ))}
      </ol>
      <h2 id="implementation-tips" className="font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28">Implementation Tips</h2>
      <p className="text-brand-text-secondary dark:text-white/70 leading-relaxed text-base">
        Starting can feel overwhelming. The key is to begin with a solid foundation and build systematically. Focus on the 20% of actions that drive 80% of results — typically your Google Business Profile, a consistent social media cadence, and proactive review management form this core foundation for most healthcare and service businesses.
      </p>
      <h2 id="faq" className="font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-6 scroll-mt-28">Frequently Asked Questions</h2>
      <FaqAccordion />
      <h2 id="conclusion" className="font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28">Conclusion</h2>
      <p className="text-brand-text-secondary dark:text-white/70 leading-relaxed text-base">
        The path to sustainable digital growth isn't about chasing trends — it's about building integrated systems that compound over time. Whether you're a hospital, a solo practitioner, or a growing business, the fundamentals remain the same: visibility, trust, and consistency. Start today, stay consistent, and let the data guide your evolution.
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const [blog, setBlog] = useState<Blog | null>(null)
  const [mockPost, setMockPost] = useState<MockPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const loadPost = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchBlog(slug)
      if (data) { setBlog(data); setMockPost(null) }
      else {
        const mock = MOCK_POSTS.find((p) => p.slug === slug) ?? MOCK_POSTS[0]
        setMockPost(mock); setBlog(null)
      }
    } catch {
      const mock = MOCK_POSTS.find((p) => p.slug === slug) ?? MOCK_POSTS[0]
      setMockPost(mock); setBlog(null)
    } finally { setLoading(false) }
  }, [slug])

  useEffect(() => { loadPost() }, [loadPost])

  const post = blog
    ? { title: blog.title, category: blog.category, readTime: blog.readTime ?? '5 min', publishDate: blog.publishedAt ?? blog.publishDate ?? '', excerpt: blog.excerpt ?? blog.content.replace(/<[^>]+>/g, '').slice(0, 200), keyTakeaway: `Read this article to learn everything about ${blog.title}.`, tags: [blog.category, 'Digital Strategy'], gradientIndex: 0, content: blog.content }
    : mockPost ? { ...mockPost, content: null as string | null }
    : null

  const gradIdx = post?.gradientIndex ?? 0
  const currentMockIdx = MOCK_POSTS.findIndex((p) => p.slug === slug)
  const prevPost = currentMockIdx > 0 ? MOCK_POSTS[currentMockIdx - 1] : null
  const nextPost = currentMockIdx < MOCK_POSTS.length - 1 ? MOCK_POSTS[currentMockIdx + 1] : null

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  function handleSubscribe(e: React.FormEvent) { e.preventDefault(); if (subscribeEmail) { setSubscribed(true); setSubscribeEmail('') } }

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
              <div className="lg:col-span-7 space-y-6 animate-pulse">
                <div className="h-4 w-40 bg-brand-border-light dark:bg-white/10 rounded-full" />
                <div className="h-10 w-3/4 bg-brand-border-light dark:bg-white/10 rounded-lg" />
                <div className="h-64 bg-brand-border-light dark:bg-white/10 rounded-2xl" />
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="h-48 bg-brand-border-light dark:bg-white/10 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    )
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
          <div className="text-center">
            <p className="text-6xl mb-4">📄</p>
            <h1 className="font-display text-3xl font-bold text-brand-text-primary dark:text-white mb-4">Article Not Found</h1>
            <p className="text-brand-text-secondary dark:text-white/60 mb-6">This article doesn't exist or has been removed.</p>
            <Link href="/blog" className="bg-brand-purple text-white px-6 py-3 rounded-full font-heading font-semibold hover:bg-brand-purple-2 transition-smooth">← Back to Blog</Link>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className={`bg-gradient-to-br ${CARD_GRADIENTS[gradIdx]} h-2 w-full`} />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-10" data-ocid="blog.post.layout">
            {/* ── Article ── */}
            <article className="lg:col-span-7" data-ocid="blog.post.article">
              <nav className="flex items-center gap-2 text-sm text-brand-text-secondary dark:text-white/60 mb-6 flex-wrap" aria-label="Breadcrumb" data-ocid="blog.post.breadcrumb">
                <Link href="/" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">Blog</Link>
                <span>/</span>
                <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-brand-purple dark:hover:text-brand-gold transition-colors">{post.category}</Link>
                <span>/</span>
                <span className="text-brand-text-primary dark:text-white truncate max-w-[200px]" title={post.title}>{post.title}</span>
              </nav>

              <ScrollReveal>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text-primary dark:text-white leading-tight mb-5">{post.title}</h1>
              </ScrollReveal>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-2 flex items-center justify-center text-white text-xs font-bold">V</div>
                  <span className="text-sm font-heading font-medium text-brand-text-primary dark:text-white">VenIQ Media Team</span>
                </div>
                <span className="text-brand-border-light dark:text-white/20">•</span>
                <span className="text-sm text-brand-text-secondary dark:text-white/60 font-mono">
                  {new Date(post.publishDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-brand-border-light dark:text-white/20">•</span>
                <span className="bg-brand-bg-light dark:bg-white/5 text-brand-text-secondary dark:text-white/60 px-3 py-1 rounded-full text-xs font-mono">{post.readTime} read</span>
                <CategoryBadge category={post.category} />
              </div>

              <div className={`w-full h-64 rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[gradIdx]} relative overflow-hidden mb-8`}>
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-8xl font-display font-bold select-none">VQ</span>
                </div>
              </div>

              <div className="border-l-4 border-brand-gold bg-amber-50 dark:bg-yellow-900/20 rounded-r-xl p-5 mb-8" style={{ boxShadow: '0 0 16px rgba(212,160,23,0.15)' }}>
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">⭐</span>
                  <div>
                    <p className="font-heading font-bold text-brand-text-primary dark:text-white text-sm mb-1">Key Takeaway:</p>
                    <p className="text-brand-text-secondary dark:text-white/70 text-sm leading-relaxed">{post.keyTakeaway}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl p-5 mb-8">
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-3 text-sm uppercase tracking-wide">Table of Contents</h3>
                <ol className="space-y-2">
                  {TOC_ITEMS.map((item, i) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="flex items-center gap-2 text-sm text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-brand-gold transition-colors group relative pl-3" data-ocid={`blog.post.toc.item.${i + 1}`}>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-brand-gold font-mono text-xs w-5 shrink-0">0{i + 1}</span>
                        <span className="group-hover:underline underline-offset-2">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <ArticleContent title={post.title} />

              <div className="my-10 bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-7 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,160,23,0.4),transparent_60%)]" />
                <div className="relative">
                  <p className="text-white/70 text-xs font-mono uppercase tracking-widest mb-2">Ready to grow?</p>
                  <p className="font-display text-2xl font-bold text-white mb-2">Ready to implement these strategies?</p>
                  <p className="text-white/70 text-sm mb-5">Our team can help you build a complete digital growth system.</p>
                  <button type="button" onClick={() => setModalOpen(true)} className="bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-6 py-3 rounded-full transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse" data-ocid="blog.post.mid_cta.book_button">
                    Book a Consultation →
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8" data-ocid="blog.post.tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 rounded-full text-xs font-mono text-brand-text-secondary dark:text-white/60 hover:border-brand-purple/30 hover:text-brand-purple dark:hover:text-brand-gold transition-colors cursor-default">
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-brand-border-light dark:border-white/10" data-ocid="blog.post.share">
                <span className="text-sm font-heading font-medium text-brand-text-secondary dark:text-white/60">Share:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-heading font-semibold hover:bg-blue-700 transition-colors" data-ocid="blog.post.share.facebook">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-[#1DA1F2] text-white rounded-full text-xs font-heading font-semibold hover:bg-[#1a91da] transition-colors" data-ocid="blog.post.share.twitter">X / Twitter</a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-[#0077B5] text-white rounded-full text-xs font-heading font-semibold hover:bg-[#006699] transition-colors" data-ocid="blog.post.share.linkedin">LinkedIn</a>
                <button type="button" onClick={handleCopyLink} className="flex items-center gap-1.5 px-4 py-2 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 text-brand-text-secondary dark:text-white/70 rounded-full text-xs font-heading font-semibold hover:border-brand-purple/30 transition-colors" data-ocid="blog.post.share.copy_link">
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8" data-ocid="blog.post.navigation">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col gap-1 p-4 bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl hover:border-brand-purple/30 transition-smooth" data-ocid="blog.post.prev_link">
                    <span className="text-xs text-brand-text-secondary dark:text-white/50 font-mono">← Previous Article</span>
                    <span className="text-sm font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors">{prevPost.title}</span>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col gap-1 p-4 bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl hover:border-brand-purple/30 transition-smooth text-right sm:items-end" data-ocid="blog.post.next_link">
                    <span className="text-xs text-brand-text-secondary dark:text-white/50 font-mono">Next Article →</span>
                    <span className="text-sm font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors">{nextPost.title}</span>
                  </Link>
                ) : <div />}
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-3 space-y-6" data-ocid="blog.post.sidebar">
              <div className="bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5">
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-3 text-sm">Search Articles</h3>
                <div className="relative">
                  <input type="search" placeholder="Search articles..." className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-white/5 text-brand-text-primary dark:text-white placeholder:text-brand-text-secondary/50 dark:placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 transition-smooth" data-ocid="blog.post.sidebar.search_input"
                    onKeyDown={(e) => { if (e.key === 'Enter') { const val = (e.target as HTMLInputElement).value.trim(); if (val) router.push(`/blog?q=${encodeURIComponent(val)}`) } }} />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary/50 dark:text-white/30 text-sm">🔍</span>
                </div>
              </div>

              <div className="bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5">
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm">Categories</h3>
                <ul className="space-y-2">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <li key={cat.name}>
                      <Link href={`/blog?category=${encodeURIComponent(cat.name)}`} className="flex items-center justify-between text-sm text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-brand-gold transition-colors group py-1" data-ocid="blog.post.sidebar.category.link">
                        <span className="group-hover:underline underline-offset-2 leading-snug">{cat.name}</span>
                        <span className="text-xs bg-brand-bg-light dark:bg-white/5 px-2 py-0.5 rounded-full font-mono shrink-0 ml-2">{cat.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5">
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm">Featured Posts</h3>
                <div className="space-y-3">
                  {MOCK_POSTS.slice(0, 3).map((fp, i) => (
                    <Link key={fp.id} href={`/blog/${fp.slug}`} className="flex items-start gap-3 group" data-ocid={`blog.post.sidebar.featured.item.${i + 1}`}>
                      <div className={`w-14 h-14 rounded-lg shrink-0 bg-gradient-to-br ${CARD_GRADIENTS[fp.gradientIndex]} flex items-center justify-center text-white text-xs font-bold`}>VQ</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug">{fp.title}</p>
                        <span className="text-xs text-brand-text-secondary dark:text-white/50 font-mono mt-0.5 block">{fp.readTime} read</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-5">
                <h3 className="font-heading font-semibold text-white mb-1 text-sm">Stay Updated</h3>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">Get the latest digital marketing insights delivered to your inbox.</p>
                {subscribed ? (
                  <div className="text-center py-3 text-white/80 text-sm" data-ocid="blog.post.sidebar.subscribe.success_state">✅ You're subscribed!</div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <input type="email" placeholder="your@email.com" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} required className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30" data-ocid="blog.post.sidebar.subscribe.input" />
                    <button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-light text-white py-2.5 rounded-lg text-sm font-heading font-semibold transition-smooth" data-ocid="blog.post.sidebar.subscribe.submit_button">Subscribe →</button>
                  </form>
                )}
              </div>

              <div className="bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5">
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TOPICS.map((topic) => (
                    <Link key={topic} href={`/blog?category=${encodeURIComponent(topic)}`} className="px-3 py-1.5 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 rounded-full text-xs font-mono text-brand-text-secondary dark:text-white/60 hover:border-brand-purple/40 hover:text-brand-purple dark:hover:text-brand-gold transition-colors" data-ocid="blog.post.sidebar.topic.link">
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-3"><span className="text-lg">💡</span></div>
                <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-2 text-sm">Need Help With Your Digital Strategy?</h3>
                <p className="text-brand-text-secondary dark:text-white/60 text-xs mb-4 leading-relaxed">Our team of experts is ready to build a custom digital growth system for your business.</p>
                <button type="button" onClick={() => setModalOpen(true)} className="w-full bg-brand-gold hover:bg-brand-gold-light text-white py-2.5 rounded-full text-sm font-heading font-semibold transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse" data-ocid="blog.post.sidebar.cta.book_button">
                  Book Consultation →
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PublicLayout>
  )
}
