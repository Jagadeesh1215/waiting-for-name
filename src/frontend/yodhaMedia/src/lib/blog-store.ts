/**
 * blog-store.ts
 * In-memory singleton blog data store for YodhaMedia Next.js app.
 * Replace with a real database adapter in production.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const BLOG_CATEGORIES = [
  'Healthcare Marketing',
  'SEO',
  'Social Media',
  'Content Marketing',
  'Branding',
  'Digital Strategy',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export type BlogStatus = 'published' | 'draft'

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  authorDesignation: string
  imageUrl: string
  imageAlt: string
  publishDate: string // ISO 8601
  createdAt: string   // ISO 8601
  updatedAt: string   // ISO 8601
  readTime: string    // e.g. "5 min read"
  status: BlogStatus
}

export type BlogFormData = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'readTime'>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(): string {
  // crypto.randomUUID is available in Node 19+ and modern browsers
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback: timestamp + random suffix
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export function isValidCategory(cat: string): boolean {
  return BLOG_CATEGORIES.includes(cat as BlogCategory)
}

// ---------------------------------------------------------------------------
// Seed data — 6 realistic healthcare-marketing blog posts
// ---------------------------------------------------------------------------

const now = new Date().toISOString()

const SEED_BLOGS: Blog[] = [
  {
    id: '1',
    slug: 'digital-marketing-for-hospitals',
    title: 'Digital Marketing Strategies for Hospitals in 2025',
    excerpt:
      'How modern hospitals can leverage digital channels to reach more patients, build trust, and grow their brand in a competitive healthcare landscape.',
    content: `
<h2>Why Digital Marketing Is Non-Negotiable for Hospitals</h2>
<p>Healthcare consumers increasingly search online before choosing a hospital. A 2024 Pew Research study found that <strong>77% of patients</strong> use the internet as their first step when seeking a new provider. If your hospital isn't visible online, you're invisible to most of your potential patients.</p>

<h2>1. Local SEO — Your Most Valuable Organic Channel</h2>
<p>Local SEO ensures your hospital appears when patients search "hospital near me" or "emergency care [city]". Optimise your Google Business Profile with accurate hours, photos, and responses to reviews. Build consistent NAP citations across healthcare directories like Practo, JustDial, and Healthgrades.</p>

<h2>2. Content That Builds Trust</h2>
<p>Publish condition guides, procedure explainers, and doctor Q&A articles. Medical content that genuinely helps patients earns backlinks, builds E-E-A-T (Experience, Expertise, Authoritativeness, Trust), and ranks well on Google. Avoid thin content — every article should be medically reviewed.</p>

<h2>3. Paid Advertising for Patient Acquisition</h2>
<p>Google Search Ads targeting high-intent terms ("knee replacement surgeon Delhi") deliver immediate traffic. Combine with remarketing to re-engage visitors who explored but didn't book. Budget $200–$1,000/month for a mid-sized hospital to see measurable ROI within 60 days.</p>

<h2>4. Patient Testimonial Campaigns</h2>
<p>Nothing converts better than authentic patient stories. Video testimonials on YouTube and Instagram Reels earn trust that no ad can replicate. Always obtain written consent and comply with healthcare privacy regulations before publishing.</p>

<h2>5. Analytics & Continuous Optimisation</h2>
<p>Set up GA4 + Google Search Console. Track appointment bookings as conversion goals. Run monthly audits on top landing pages. The hospitals winning online aren't those with the biggest budgets — they're the ones that iterate fastest.</p>
    `.trim(),
    category: 'Healthcare Marketing',
    tags: ['hospitals', 'digital marketing', 'patient acquisition', 'local seo'],
    author: 'Arjun Mehta',
    authorDesignation: 'Head of Healthcare Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    imageAlt: 'Doctor reviewing digital marketing analytics on a tablet',
    publishDate: '2025-01-15T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '6 min read',
    status: 'published',
  },
  {
    id: '2',
    slug: 'seo-best-practices-for-medical-clinics',
    title: 'SEO Best Practices for Medical Clinics: A 2025 Complete Guide',
    excerpt:
      'A step-by-step SEO playbook for clinics — from Google Business Profile optimisation to building authority with medical content.',
    content: `
<h2>Why SEO Is the Best Long-Term Investment for Clinics</h2>
<p>Unlike paid ads that stop the moment you pause the budget, SEO compounds. A well-optimised clinic website continues attracting patients for years. The key is to treat SEO as a strategic asset, not a one-time task.</p>

<h2>Step 1 — Nail Your Google Business Profile</h2>
<p>Your Google Business Profile (GBP) is often the very first impression patients get. Ensure your profile includes: accurate name, address, and phone number; high-quality photos of your clinic; a complete list of services; and answers to common patient questions. Respond to every review within 24 hours.</p>

<h2>Step 2 — Build Local Citations</h2>
<p>Consistent NAP (Name, Address, Phone) data across directories like Practo, Lybrate, JustDial, and Sulekha signals trustworthiness to Google. Use a tool like BrightLocal to audit and fix inconsistencies.</p>

<h2>Step 3 — Create Genuinely Helpful Medical Content</h2>
<p>Focus on the questions your patients actually ask: "Is lower back pain serious?", "How long does a root canal take?", "When should I see a neurologist?" Answer them thoroughly with medically accurate information. Involve your doctors in content creation — it builds E-E-A-T and earns media coverage.</p>

<h2>Step 4 — Technical SEO Fundamentals</h2>
<p>Ensure your site loads in under 3 seconds on mobile, uses HTTPS, has no broken links, and is crawlable by Google. A fast, clean website is the technical foundation everything else rests on.</p>

<h2>Step 5 — Build Authority Through Backlinks</h2>
<p>Get featured in local news, contribute to health publications, and partner with complementary services. Each high-quality backlink increases your domain authority and lifts all your pages in search rankings.</p>
    `.trim(),
    category: 'SEO',
    tags: ['seo', 'clinics', 'google business profile', 'local search'],
    author: 'Priya Sharma',
    authorDesignation: 'SEO Lead',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    imageAlt: 'SEO analytics dashboard showing search rankings for a medical clinic',
    publishDate: '2025-02-01T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '7 min read',
    status: 'published',
  },
  {
    id: '3',
    slug: 'building-social-media-presence-as-a-doctor',
    title: 'Building a Social Media Presence as a Doctor: An Ethical Guide',
    excerpt:
      'How physicians can use Instagram, LinkedIn, and YouTube to grow their practice, share medical knowledge, and build an authoritative personal brand.',
    content: `
<h2>Why Doctors Should Be on Social Media</h2>
<p>Medical misinformation spreads faster on social media than accurate health information. When doctors show up with credible, evidence-based content, they counteract myths and genuinely improve public health outcomes. As a bonus, a thoughtful social media presence drives referrals and new patient appointments.</p>

<h2>Platform Strategy</h2>
<p><strong>Instagram</strong> — Visual content works best here. Share infographics, condition explainers, and short Reels debunking health myths. Patients looking for specialists often check Instagram before booking.</p>
<p><strong>LinkedIn</strong> — Ideal for connecting with fellow clinicians, hospital administrators, and healthcare journalists. Thought-leadership posts perform particularly well.</p>
<p><strong>YouTube</strong> — Long-form education earns trust at scale. A 10-minute video explaining a procedure answers the question your patients are too nervous to ask in the consultation room.</p>

<h2>Content That Performs</h2>
<ul>
  <li>Myth vs. fact posts in your specialty</li>
  <li>Behind-the-scenes looks at your clinic or hospital</li>
  <li>Patient success stories (with written consent)</li>
  <li>Day-in-the-life content that humanises medicine</li>
  <li>Q&A sessions on Instagram Live or YouTube</li>
</ul>

<h2>Staying Ethical & Compliant</h2>
<p>Never share identifiable patient information without explicit written consent. Avoid making diagnostic claims to followers ("based on your symptoms, you have…"). Clearly disclose any commercial relationships. When in doubt, refer followers to consult their own doctor.</p>

<h2>Getting Started: 30-Day Plan</h2>
<p>Week 1: Set up profiles, write a compelling bio, post an introduction. Week 2: Create 5 educational posts. Week 3: Engage — comment on others' content, respond to every reply. Week 4: Analyse what performed best, double down. Consistency beats viral moments every time.</p>
    `.trim(),
    category: 'Social Media',
    tags: ['doctors', 'social media', 'instagram', 'personal brand', 'medical education'],
    author: 'Dr. Kavita Nair',
    authorDesignation: 'Medical Content Strategist',
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b814a3?w=1200&q=80',
    imageAlt: 'Doctor recording a social media video on a smartphone',
    publishDate: '2025-02-20T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '6 min read',
    status: 'published',
  },
  {
    id: '4',
    slug: 'content-marketing-for-healthcare-brands',
    title: 'Content Marketing for Healthcare Brands: Building Authority at Scale',
    excerpt:
      'A strategic framework for healthcare organisations to produce patient-centric content that earns trust, ranks on Google, and drives appointments.',
    content: `
<h2>Content Marketing Is Healthcare's Most Scalable Trust Channel</h2>
<p>Content marketing costs <strong>62% less than traditional marketing</strong> and generates 3× as many leads, according to Demand Metric research. For healthcare brands competing on trust, it's the single highest-leverage investment you can make.</p>

<h2>The Content Pyramid for Healthcare</h2>
<p><strong>Foundation (evergreen content)</strong> — Comprehensive condition guides, treatment explainers, and FAQs that rank for years. Example: "Complete Guide to Managing Type 2 Diabetes."</p>
<p><strong>Middle layer (topical content)</strong> — Timely articles on seasonal health trends, new treatment approvals, and public health campaigns. Example: "5 Things to Know About the New COVID Variant."</p>
<p><strong>Top layer (conversion content)</strong> — Case studies, doctor profiles, patient testimonials, and service landing pages designed to convert researchers into patients.</p>

<h2>Editorial Quality Standards</h2>
<p>Every article must be reviewed by a licensed clinician before publication. Cite peer-reviewed sources (PubMed, Cochrane). Include a "medically reviewed by" byline. Update articles when clinical guidelines change. Google's health content quality guidelines are strict — thin or inaccurate content will be penalised.</p>

<h2>Distribution Strategy</h2>
<p>Publish on your website first (SEO authority stays with you). Share via email newsletter to existing patients. Repurpose into social media snippets. Pitch data-rich articles to healthcare journalists as background resources — this earns high-authority backlinks.</p>

<h2>Measuring Success</h2>
<p>Track: organic search impressions, click-through rates, time on page, and appointment conversions attributed to organic traffic. Set 6-month and 12-month benchmarks. Content authority compounds — the returns at month 12 typically 4× the returns at month 3.</p>
    `.trim(),
    category: 'Content Marketing',
    tags: ['content marketing', 'healthcare', 'blogging', 'authority building'],
    author: 'Rahul Verma',
    authorDesignation: 'Content Strategy Director',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
    imageAlt: 'Content strategist planning a healthcare blog editorial calendar',
    publishDate: '2025-03-05T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '8 min read',
    status: 'published',
  },
  {
    id: '5',
    slug: 'healthcare-branding-how-to-stand-out',
    title: 'Healthcare Branding: How to Make Your Clinic Stand Out in a Crowded Market',
    excerpt:
      'Why most healthcare brands look identical — and the proven brand strategy framework that helps clinics and hospitals build lasting differentiation.',
    content: `
<h2>The Healthcare Branding Problem</h2>
<p>Open five hospital websites at random. You'll likely see the same stock photo of a smiling doctor, the same "Patient First" tagline, and the same blue-and-white color palette. When every brand looks alike, patients default to whoever is closest or cheapest. Strong branding breaks this pattern.</p>

<h2>Brand Identity vs. Brand Image</h2>
<p><strong>Brand identity</strong> is what you choose to project — your logo, colors, typography, tone of voice, and messaging. <strong>Brand image</strong> is what patients actually perceive. Great healthcare branding aligns both, ensuring that your intended positioning matches the experience patients actually have.</p>

<h2>Finding Your Brand Differentiator</h2>
<p>Answer these three questions honestly: What do we do better than anyone else locally? What do our best patients say about us unprompted? What would be lost if we ceased to exist? The intersection of those answers is your differentiator. Build your brand around it.</p>

<h2>Visual Identity in Healthcare</h2>
<p>Move beyond generic blue. Consider warm, approachable palettes for family practices; bold, confident tones for specialist surgeons; calming, natural colors for wellness clinics. Your visual identity should feel instinctively right for your patient demographic.</p>

<h2>Tone of Voice: Be Human</h2>
<p>Patients are often scared, confused, or in pain when they interact with your brand. Write like a knowledgeable, caring friend — not a corporate brochure. Swap "our state-of-the-art facilities" for "we've invested in the latest technology so you get more accurate diagnoses, faster." Make it about the patient, always.</p>

<h2>Consistency Across Every Touchpoint</h2>
<p>Your brand lives in: your website, your reception area, your staff uniforms, how the phone is answered, your discharge letters, your social media, and your Google reviews. Audit every touchpoint annually. Inconsistency erodes trust faster than a bad ad campaign.</p>
    `.trim(),
    category: 'Branding',
    tags: ['branding', 'healthcare', 'clinic marketing', 'brand strategy'],
    author: 'Sneha Kapoor',
    authorDesignation: 'Brand Strategy Lead',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
    imageAlt: 'Healthcare brand identity design — logo and color palette on a desk',
    publishDate: '2025-03-22T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '7 min read',
    status: 'published',
  },
  {
    id: '6',
    slug: 'digital-strategy-for-multi-specialty-hospitals',
    title: 'Digital Strategy for Multi-Specialty Hospitals: A CXO Playbook',
    excerpt:
      'A senior leadership guide to building a cohesive digital strategy that unifies marketing, patient experience, and revenue growth for multi-specialty hospitals.',
    content: `
<h2>Why Most Hospital Digital Strategies Fail</h2>
<p>Most hospitals approach digital marketing as a collection of disconnected tactics — a website here, some Google Ads there, an Instagram account that gets posted to sporadically. Without a unified strategy, these efforts don't compound. The hospitals winning online treat digital as a system, not a set of tools.</p>

<h2>The Digital Strategy Framework for Multi-Specialty Hospitals</h2>
<p><strong>1. Centralise Governance</strong> — Appoint a Chief Digital Officer or Digital Marketing Lead who owns the full patient digital journey. Fragmented ownership is the #1 reason hospital digital strategies underperform.</p>
<p><strong>2. Define Specialty-Level Priorities</strong> — Each department (cardiology, orthopaedics, oncology) has different patient acquisition economics. Identify which specialties have the highest revenue per patient and build specialty-specific digital campaigns accordingly.</p>
<p><strong>3. Build the Digital Patient Journey</strong> — Map every touchpoint from "symptom search" to "post-discharge follow-up." Identify gaps. Most hospitals have strong acquisition (ads, SEO) but weak activation (appointment booking UX) and almost no retention (patient portal, follow-up emails).</p>

<h2>Technology Stack Essentials</h2>
<p><strong>Website CMS</strong> — Headless or modern CMS with fast load times. <strong>Appointment Booking</strong> — Online scheduling with minimal friction (under 3 clicks to book). <strong>CRM</strong> — Track patient interactions across channels. <strong>Analytics</strong> — GA4 + Search Console + call tracking. <strong>Reviews Platform</strong> — Automated post-visit review requests.</p>

<h2>The 90-Day Digital Transformation Sprint</h2>
<p>Days 1–30: Audit existing digital presence, install analytics, claim all directory listings. Days 31–60: Rebuild or significantly improve the website's appointment booking flow. Days 61–90: Launch specialty-specific paid campaigns, establish monthly reporting cadence.</p>

<h2>Measuring What Matters</h2>
<p>The ultimate metric is revenue attributable to digital channels. Track: cost per appointment by channel, lifetime patient value by acquisition source, and net promoter score. Report quarterly to leadership. Tie digital KPIs to clinical growth targets — this is how digital gets the investment it deserves.</p>
    `.trim(),
    category: 'Digital Strategy',
    tags: ['digital strategy', 'hospitals', 'CXO', 'patient journey', 'multi-specialty'],
    author: 'Vikram Anand',
    authorDesignation: 'Managing Director, YodhaMedia',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    imageAlt: 'Senior executives reviewing hospital digital strategy on a large screen',
    publishDate: '2025-04-10T10:00:00.000Z',
    createdAt: now,
    updatedAt: now,
    readTime: '9 min read',
    status: 'published',
  },
]

// ---------------------------------------------------------------------------
// Singleton store
// ---------------------------------------------------------------------------

// Store is module-level — persists across requests in the same Node process.
// In production, replace with a database client.
let _store: Blog[] | null = null

function getBlogStore(): Blog[] {
  if (_store === null) {
    _store = [...SEED_BLOGS]
  }
  return _store
}

// ---------------------------------------------------------------------------
// CRUD operations
// ---------------------------------------------------------------------------

export function getAllBlogs(): Blog[] {
  return getBlogStore()
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return getBlogStore().find((b) => b.slug === slug)
}

export function getBlogById(id: string): Blog | undefined {
  return getBlogStore().find((b) => b.id === id)
}

export function createBlog(data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog {
  const timestamp = new Date().toISOString()
  const blog: Blog = {
    ...data,
    id: generateId(),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  getBlogStore().push(blog)
  return blog
}

export function updateBlog(slug: string, data: Partial<Omit<Blog, 'id' | 'createdAt'>>): Blog | null {
  const store = getBlogStore()
  const index = store.findIndex((b) => b.slug === slug)
  if (index === -1) return null
  const existing = store[index]
  const updated: Blog = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  }
  store[index] = updated
  return updated
}

export function deleteBlog(slug: string): boolean {
  const store = getBlogStore()
  const index = store.findIndex((b) => b.slug === slug)
  if (index === -1) return false
  store.splice(index, 1)
  return true
}

export function slugExists(slug: string, excludeId?: string): boolean {
  return getBlogStore().some((b) => b.slug === slug && b.id !== excludeId)
}
