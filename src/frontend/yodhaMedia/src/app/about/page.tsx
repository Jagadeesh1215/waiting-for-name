import Link from 'next/link'
import { ArrowRight, Target, Users, TrendingUp, Globe, Award, Heart } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'

const stats = [
  { value: '200+', label: 'Healthcare Clients', icon: Users },
  { value: '₹50Cr+', label: 'Revenue Generated', icon: TrendingUp },
  { value: '12+', label: 'States Covered', icon: Globe },
  { value: '98%', label: 'Client Retention', icon: Award },
]

const differentiators = [
  {
    icon: Target,
    title: 'Healthcare Specialization',
    desc: 'We understand medical regulations, patient psychology, and healthcare marketing compliance better than any generalist agency.',
  },
  {
    icon: TrendingUp,
    title: 'Data-First Approach',
    desc: 'Every decision is backed by data. We track, measure, and optimize every campaign for maximum ROI.',
  },
  {
    icon: Heart,
    title: 'Patient-Centric Focus',
    desc: 'We design campaigns that build genuine trust with patients, not just drive clicks.',
  },
  {
    icon: Globe,
    title: 'Pan-India Reach',
    desc: 'From metro hospitals to Tier-3 clinics, we know how to grow practices across every market.',
  },
]

const team = [
  {
    name: 'Arjun Sharma',
    role: 'Founder & CEO',
    bio: '10+ years in healthcare digital marketing. Previously at Practo and Apollo.',
    initials: 'AS',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Strategy',
    bio: 'Growth strategist with expertise in healthcare SEO and content marketing.',
    initials: 'PN',
  },
  {
    name: 'Rohan Gupta',
    role: 'Creative Director',
    bio: 'Brand identity expert who has crafted visual identities for 50+ healthcare brands.',
    initials: 'RG',
  },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="about.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">About Us</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              We&apos;re on a Mission to Transform Healthcare Marketing in India
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              yodhaMedia was founded with a single purpose: to help healthcare providers reach the
              patients who need them most through ethical, effective digital marketing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[var(--background)] py-20" data-ocid="about.story.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
                <p>
                  In 2019, our founder Arjun Sharma noticed a critical gap: India&apos;s best
                  doctors and hospitals were invisible online, while patients struggled to find
                  quality care. He set out to bridge that gap.
                </p>
                <p>
                  What started as a small SEO consultancy for two clinics in Bengaluru has grown into
                  yodhaMedia — a full-service digital growth agency serving 200+ healthcare providers
                  across 12 Indian states.
                </p>
                <p>
                  Today, we combine deep healthcare domain knowledge with cutting-edge digital
                  marketing to help our clients achieve predictable, sustainable growth.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] text-white text-center"
                    data-ocid={`about.stat.${stat.label.toLowerCase().replace(/\s/g, '_')}.card`}
                  >
                    <stat.icon className="h-6 w-6 text-[#d4a017] mx-auto mb-3" />
                    <p className="text-3xl font-bold font-display text-[#d4a017]">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-[var(--muted)]/30 py-20" data-ocid="about.differentiators.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              Why yodhaMedia?
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              We&apos;re not just a digital agency — we&apos;re your specialized healthcare growth partner.
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-2 gap-6">
            {differentiators.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d1b69]/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-[#2d1b69] dark:text-[#d4a017]" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-display text-[#2d1b69] dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[var(--background)] py-20" data-ocid="about.team.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              Meet the Team
            </h2>
          </ScrollReveal>
          <StaggerReveal className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]" data-ocid={`about.team.${member.name.toLowerCase().replace(/\s/g, '_')}.card`}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-[#d4a017]">{member.initials}</span>
                  </div>
                  <h3 className="font-semibold text-[#2d1b69] dark:text-white">{member.name}</h3>
                  <p className="text-xs text-[#d4a017] mb-2">{member.role}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20 text-white" data-ocid="about.vision.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-12">
          <ScrollReveal>
            <h3 className="text-xl font-bold font-display text-[#d4a017] mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To be India&apos;s most trusted healthcare digital marketing agency, enabling every
              quality healthcare provider to be found and chosen by the patients who need them most.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h3 className="text-xl font-bold font-display text-[#d4a017] mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To deliver ethical, data-driven digital marketing strategies that grow healthcare
              practices, build patient trust, and create lasting positive impact on public health.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--card)] py-20 border-t border-[var(--border)]" data-ocid="about.cta.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-6">
              Ready to partner with yodhaMedia?
            </h2>
            <Button variant="hero" asChild data-ocid="about.cta.primary_button">
              <Link href="/services">
                Explore Our Services <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  )
}
