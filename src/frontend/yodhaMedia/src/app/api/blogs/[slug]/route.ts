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

function getMockBlogs(): BlogPost[] {
  return [
    {
      id: '1',
      slug: 'digital-marketing-for-hospitals',
      title: 'Digital Marketing Strategies for Hospitals in 2025',
      excerpt: 'How modern hospitals can leverage digital channels to reach more patients and build trust.',
      content:
        'Digital marketing has transformed how hospitals connect with patients. From social media to Google Ads, the opportunities are vast. Modern healthcare providers need a multi-channel approach that builds trust while reaching the right patients at the right time.\n\nKey strategies include:\n\n**Local SEO Optimization** — Ensure your hospital appears in local search results when patients search for services nearby.\n\n**Content Marketing** — Share medical expertise through blogs, videos, and social media to build trust and authority.\n\n**Patient Testimonials** — Authentic patient stories are your most powerful marketing asset.\n\n**Targeted Campaigns** — Use paid advertising to reach specific demographics and medical conditions.\n\nHospitals that invest in digital marketing see significant improvements in patient acquisition, retention, and overall brand recognition in their communities.',
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
        'Search engine optimization is critical for medical clinics wanting to be found online. With the right SEO strategy, your clinic can appear at the top of search results when patients are looking for care.\n\n**Google Business Profile** — Your GBP is often the first thing patients see. Keep it updated with photos, hours, and services.\n\n**Local Citations** — Consistent NAP (Name, Address, Phone) across all directories builds local authority.\n\n**Medical Content** — Create helpful, accurate content that answers patient questions.\n\n**Mobile Optimization** — Most patients search on mobile. A fast, mobile-friendly site is essential.\n\n**Review Strategy** — Actively encourage satisfied patients to leave reviews. Respond to all reviews professionally.\n\nLocal SEO is especially important for clinics, as most patients search for healthcare providers near them.',
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
        'Social media provides doctors with an unprecedented opportunity to reach patients and build their reputation. When done correctly and ethically, a strong social media presence can help you attract new patients, share health education, and position yourself as a trusted expert.\n\n**Choose the Right Platforms** — LinkedIn for professional networking, Instagram for visual content, YouTube for education.\n\n**Content That Educates** — Share health tips, debunk myths, and explain complex medical concepts simply.\n\n**Maintain Privacy** — Never share patient information. Always follow HIPAA guidelines.\n\n**Consistency Wins** — Post regularly on a schedule your audience can count on.\n\n**Engage Authentically** — Respond to comments, answer questions, and show the human side of medicine.\n\nDoctors who engage on social media report higher patient satisfaction and stronger referral networks.',
      category: 'Social Media',
      tags: ['social media', 'doctors', 'personal brand'],
      author: 'yodhaMedia Team',
      publishedAt: '2025-02-20T10:00:00Z',
      thumbnail: '',
      status: 'published',
      readTime: '6 min read',
    },
  ]
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const blogs = getMockBlogs()
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(blog)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()
  return NextResponse.json({
    ...body,
    slug,
    updatedAt: new Date().toISOString(),
  })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return NextResponse.json({ message: `Blog ${slug} deleted`, slug })
}
