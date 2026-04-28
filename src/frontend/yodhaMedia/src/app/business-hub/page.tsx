'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Video, Download, Calculator, Newspaper, Lightbulb } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'

const resources = [
  {
    icon: BookOpen,
    title: 'Healthcare Marketing Handbook 2025',
    desc: 'The complete guide to digital marketing for hospitals and clinics. Covers SEO, social, content, and more.',
    type: 'eBook',
    color: '#2d1b69',
  },
  {
    icon: Video,
    title: 'Webinar: Growing a Medical Practice Online',
    desc: 'Watch our 60-minute masterclass on building a digital presence as a healthcare provider.',
    type: 'Webinar',
    color: '#4a2d9e',
  },
  {
    icon: Download,
    title: 'Social Media Content Calendar Template',
    desc: 'Ready-to-use 30-day content calendar with healthcare-specific post ideas and prompts.',
    type: 'Template',
    color: '#d4a017',
  },
  {
    icon: Calculator,
    title: 'Healthcare Marketing ROI Calculator',
    desc: 'Calculate your expected ROI from different marketing channels based on your practice type and budget.',
    type: 'Tool',
    color: '#1a0f3d',
  },
  {
    icon: Newspaper,
    title: 'Weekly Healthcare Marketing Digest',
    desc: 'Get the latest trends, algorithm updates, and case studies from the healthcare marketing world.',
    type: 'Newsletter',
    color: '#a07810',
  },
  {
    icon: Lightbulb,
    title: 'Patient Persona Workshop Kit',
    desc: 'Understand your ideal patients better with our structured persona development framework.',
    type: 'Workshop',
    color: '#4a2d9e',
  },
]

export default function BusinessHubPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d0a1e] to-[#2d1b69] py-24 text-white" data-ocid="business_hub.hero.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-[#d4a017] font-semibold mb-3 text-sm uppercase tracking-wider">Resources</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6">
              Business Hub
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Free resources, tools, and insights to help you grow your healthcare practice or business.
              Everything you need to master digital marketing — in one place.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-[var(--background)] py-20" data-ocid="business_hub.resources.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              Free Resources
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              Download, watch, and use our free resources to level up your marketing game.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, i) => {
              const Icon = resource.icon
              return (
                <StaggerItem key={resource.title}>
                  <div
                    className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[#d4a017]/40 hover:shadow-xl transition-all duration-300"
                    data-ocid={`business_hub.resource.${i + 1}`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${resource.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: resource.color }} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-1 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#2d1b69] dark:text-white mb-3 group-hover:text-[#d4a017] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
                      {resource.desc}
                    </p>
                    <Button
                      variant="outline-purple"
                      size="sm"
                      className="w-full group-hover:bg-[#2d1b69] group-hover:text-white transition-colors"
                      data-ocid={`business_hub.resource.${i + 1}.button`}
                    >
                      Access Free
                    </Button>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20" data-ocid="business_hub.newsletter.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-white mb-4">
              Get Weekly Healthcare Marketing Insights
            </h2>
            <p className="text-gray-300 mb-8">
              Join 2,000+ healthcare marketers getting actionable insights every Tuesday.
              No spam — only value.
            </p>

            {subscribed ? (
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center" data-ocid="business_hub.newsletter.success_state">
                <p className="text-green-400 font-semibold text-lg">🎉 You&apos;re subscribed!</p>
                <p className="text-gray-300 text-sm mt-2">Your first digest arrives this Tuesday.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  data-ocid="business_hub.newsletter.email.input"
                />
                <Button type="submit" variant="default" className="shrink-0" data-ocid="business_hub.newsletter.submit_button">
                  Subscribe Free
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--card)] py-20 border-t border-[var(--border)]" data-ocid="business_hub.cta.section">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold font-display text-[#2d1b69] dark:text-white mb-6">
              Need personalized guidance?
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8">
              Our team of healthcare marketing experts is ready to help you create a custom growth strategy.
            </p>
            <Button variant="hero" asChild data-ocid="business_hub.cta.primary_button">
              <Link href="/services">
                Talk to an Expert <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  )
}
