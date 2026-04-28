import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Star } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'

const caseStudies = [
  {
    id: 'apollo-seo',
    title: 'Apollo Network — 300% Organic Traffic Growth',
    category: 'SEO',
    desc: 'Implemented comprehensive local SEO strategy across 12 hospital locations, tripling organic search visibility in 8 months.',
    stats: ['+300%', 'Organic Traffic'],
    color: 'from-[#2d1b69] to-[#4a2d9e]',
    icon: TrendingUp,
  },
  {
    id: 'sunrise-social',
    title: 'Sunrise Clinics — 15K Instagram Followers',
    category: 'Social Media',
    desc: 'Built a vibrant healthcare community on Instagram with patient education content, growing to 15K followers in 6 months.',
    stats: ['15K+', 'Followers'],
    color: 'from-[#4a2d9e] to-[#d4a017]',
    icon: Users,
  },
  {
    id: 'fortis-brand',
    title: 'Fortis Wellness — Brand Revamp',
    category: 'Brand Strategy',
    desc: 'Complete brand identity overhaul including logo, messaging, website, and all patient touchpoints.',
    stats: ['5★', 'Rating'],
    color: 'from-[#d4a017] to-[#a07810]',
    icon: Star,
  },
  {
    id: 'medanta-content',
    title: 'Medanta Group — 2M Content Impressions',
    category: 'Content Marketing',
    desc: 'Medical education blog strategy generated 2 million impressions and positioned Medanta as India\'s top health content hub.',
    stats: ['2M+', 'Impressions'],
    color: 'from-[#1a0f3d] to-[#2d1b69]',
    icon: TrendingUp,
  },
  {
    id: 'dr-patel-personal',
    title: 'Dr. Rajan Patel — Personal Brand Launch',
    category: 'Social Media',
    desc: 'Launched complete personal brand for a top cardiologist, growing LinkedIn presence to 25K+ followers.',
    stats: ['25K+', 'LinkedIn'],
    color: 'from-[#2d1b69] to-[#1a0f3d]',
    icon: Users,
  },
  {
    id: 'max-analytics',
    title: 'Max Healthcare — ROI Dashboard',
    category: 'Analytics',
    desc: 'Built comprehensive marketing analytics dashboard tracking CAC, LTV, and attribution across 8 channels.',
    stats: ['8x', 'ROI Clarity'],
    color: 'from-[#4a2d9e] to-[#2d1b69]',
    icon: TrendingUp,
  },
]

const overallStats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '₹500Cr+', label: 'Revenue Generated for Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12', label: 'States Covered' },
]

export default function OurWorkPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="our_work.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Results That Speak for Themselves
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real campaigns, real results. See how yodhaMedia has transformed digital presence
              for healthcare providers across India.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0d0a1e] border-y border-[#2d1b69]/30 py-10" data-ocid="our_work.stats.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {overallStats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold font-display text-[#d4a017]">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-[var(--background)] py-20" data-ocid="our_work.portfolio.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <StaggerItem key={cs.id}>
                <div
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:shadow-xl transition-all duration-300"
                  data-ocid={`our_work.item.${i + 1}`}
                >
                  <div className={`h-48 bg-gradient-to-br ${cs.color} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <p className="text-5xl font-bold font-display text-[#d4a017]">{cs.stats[0]}</p>
                      <p className="text-sm text-gray-300 mt-1">{cs.stats[1]}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-1 rounded-full font-medium">
                      {cs.category}
                    </span>
                    <h3 className="text-lg font-bold font-display text-[#2d1b69] dark:text-white mt-3 mb-2 group-hover:text-[#d4a017] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{cs.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20" data-ocid="our_work.cta.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Ready to be our next success story?
            </h2>
            <p className="text-gray-300 mb-8">
              Join 200+ healthcare providers who have grown with yodhaMedia.
            </p>
            <Button variant="hero" asChild data-ocid="our_work.cta.primary_button">
              <Link href="/services">
                Start Your Journey <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  )
}
