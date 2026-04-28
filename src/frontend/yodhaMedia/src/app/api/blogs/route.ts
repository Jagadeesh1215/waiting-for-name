import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface BlogPost {
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
  status: string
  readTime: string
}

// In-memory mock store (resets on server restart — replace with DB in production)
// eslint-disable-next-line prefer-const
let blogs: BlogPost[] = [
  {
    id: '1',
    slug: 'digital-marketing-for-hospitals',
    title: 'Digital Marketing Strategies for Hospitals in 2025',
    excerpt: 'How modern hospitals can leverage digital channels to reach more patients and build trust.',
    content:
      'Digital marketing has transformed how hospitals connect with patients. From social media to Google Ads, the opportunities are vast. Modern healthcare providers need a multi-channel approach that builds trust while reaching the right patients at the right time. Key strategies include local SEO optimization, content marketing with medical expertise, patient testimonials, and targeted social media campaigns. Hospitals that invest in digital marketing see significant improvements in patient acquisition, retention, and overall brand recognition in their communities.',
    category: 'Healthcare Marketing',
    tags: ['healthcare', 'digital marketing', 'hospitals'],
    author: 'yodhaMedia Team',
    publishedAt: '2025-01-15T10:00:00Z',
    thumbnail: '',
    status: 'published',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'seo-for-clinics',
    title: 'SEO Best Practices for Medical Clinics',
    excerpt: 'A complete guide to search engine optimization for healthcare providers.',
    content:
      'Search engine optimization is critical for medical clinics wanting to be found online. With the right SEO strategy, your clinic can appear at the top of search results when patients are looking for care. This includes optimizing your Google Business Profile, building local citations, creating valuable medical content, and ensuring your website is mobile-friendly and fast. Local SEO is especially important for clinics, as most patients search for healthcare providers near them. A well-optimized Google Business Profile can dramatically increase walk-ins and appointment bookings.',
    category: 'SEO',
    tags: ['seo', 'clinics', 'healthcare'],
    author: 'yodhaMedia Team',
    publishedAt: '2025-02-01T10:00:00Z',
    thumbnail: '',
    status: 'published',
    readTime: '7 min read',
  },
  {
    id: '3',
    slug: 'social-media-for-doctors',
    title: 'Building a Social Media Presence as a Doctor',
    excerpt: 'How physicians can use social media ethically and effectively to grow their practice.',
    content:
      'Social media provides doctors with an unprecedented opportunity to reach patients and build their reputation. When done correctly and ethically, a strong social media presence can help you attract new patients, share health education, and position yourself as a trusted expert. Key platforms include LinkedIn for professional networking, Instagram for visual health content, and YouTube for educational videos. The key is consistency, authenticity, and always prioritizing patient privacy. Doctors who engage on social media report higher patient satisfaction and stronger referral networks.',
    category: 'Social Media',
    tags: ['social media', 'doctors', 'personal brand'],
    author: 'yodhaMedia Team',
    publishedAt: '2025-02-20T10:00:00Z',
    thumbnail: '',
    status: 'published',
    readTime: '6 min read',
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')

  let result = [...blogs]

  if (category && category !== 'all' && category !== 'All') {
    result = result.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (q) {
    const query = q.toLowerCase()
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.excerpt.toLowerCase().includes(query)
    )
  }

  const page = Number.parseInt(searchParams.get('page') || '1', 10)
  const limit = Number.parseInt(searchParams.get('limit') || '10', 10)
  const start = (page - 1) * limit

  return NextResponse.json({
    blogs: result.slice(start, start + limit),
    total: result.length,
    page,
    limit,
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newBlog: BlogPost = {
    id: Date.now().toString(),
    slug:
      body.title
        ?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || Date.now().toString(),
    publishedAt: new Date().toISOString(),
    status: 'draft',
    thumbnail: '',
    tags: [],
    author: 'yodhaMedia Team',
    readTime: '5 min read',
    ...body,
  }
  blogs.push(newBlog)
  return NextResponse.json(newBlog, { status: 201 })
}
