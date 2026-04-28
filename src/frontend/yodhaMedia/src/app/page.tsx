'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award, Clock } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ConsultationModal } from '@/components/layout/ConsultationModal'
import { Button } from '@/components/ui/button'
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/lib/animations'

const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a0f3d] to-[#2d1b69] rounded-2xl min-h-[400px]">
      <div className="w-16 h-16 rounded-full border-2 border-[#d4a017] border-t-transparent animate-spin" />
    </div>
  ),
})

const services = [
  { icon: '🔍', title: 'SEO & Search', desc: 'Dominate search rankings and drive organic patient traffic.' },
  { icon: '📱', title: 'Social Media', desc: 'Build authentic connections across Instagram, LinkedIn, YouTube.' },
  { icon: '✍️', title: 'Content Marketing', desc: 'Educational content that builds trust and authority.' },
  { icon: '🎨', title: 'Brand Strategy', desc: 'A brand identity that commands trust and recognition.' },
  { icon: '📊', title: 'Analytics', desc: 'Data-driven insights to maximize your marketing ROI.' },
  { icon: '🏥', title: 'Healthcare Marketing', desc: 'Specialized HIPAA-compliant marketing for healthcare.' },
]

const audience = [
  { icon: '🏥', title: 'Hospitals', desc: 'Multi-specialty and super-specialty hospitals wanting to grow patient volume.' },
  { icon: '🏨', title: 'Clinics', desc: 'Single and multi-location clinics seeking more appointments.' },
  { icon: '👨‍⚕️', title: 'Individual Doctors', desc: 'Physicians building a personal brand and online reputation.' },
  { icon: '🚀', title: 'Modern Businesses', desc: 'Growth-stage businesses in health tech and wellness.' },
]

const processSteps = [
  { num: '01', title: 'Discover', desc: 'Deep dive into your goals, audience, and competitive landscape.' },
  { num: '02', title: 'Strategize', desc: 'Custom growth strategy aligned to your specific market.' },
  { num: '03', title: 'Execute', desc: 'Multi-channel campaigns delivered with precision.' },
  { num: '04', title: 'Grow', desc: 'Continuous optimization based on real performance data.' },
]

const stats = [
  { value: '200+', label: 'Clients Served', icon: Users },
  { value: '500+', label: 'Campaigns Run', icon: TrendingUp },
  { value: '98%', label: 'Satisfaction Rate', icon: Award },
  { value: '5+', label: 'Years Experience', icon: Clock },
]

const trustBrands = [
  'Apollo Network', 'Fortis Care', 'Narayana Health', 'Max Healthcare', 'Medanta Group',
]

function AnimatedCounter({ target }: { target: string }) {
  const [display, setDisplay] = useState('0')
  const num = Number.parseInt(target)

  useEffect(() => {
    if (Number.isNaN(num)) { setDisplay(target); return }
    let start = 0
    const step = Math.ceil(num / 60)
    const timer = setInterval(() => {
      start = Math.min(start + step, num)
      setDisplay(String(start) + (target.includes('+') ? '+' : target.includes('%') ? '%' : ''))
      if (start >= num) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [target, num])

  return <span>{display}</span>
}

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0d0a1e] via-[#1a0f3d] to-[#2d1b69] flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#d4a017]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#4a2d9e]/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/30 rounded-full px-4 py-1.5 text-sm text-[#d4a017] mb-6"
                data-ocid="hero.badge"
              >
                <span className="w-2 h-2 rounded-full bg-[#d4a017] animate-pulse" />
                Digital Growth Agency for Healthcare
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
                Grow Your Practice with{' '}
                <span className="text-[#d4a017]">yodhaMedia</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                Digital marketing solutions built for healthcare professionals and modern businesses.
                We help you reach more patients, build trust, and grow sustainably.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="hero"
                  onClick={() => setModalOpen(true)}
                  data-ocid="hero.cta.primary_button"
                >
                  Start Growing
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  data-ocid="hero.cta.secondary_button"
                >
                  <Link href="/our-work">View Our Work</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-10">
                {[
                  { label: '200+ Clients', icon: CheckCircle2 },
                  { label: 'HIPAA Compliant', icon: CheckCircle2 },
                  { label: '5★ Rated', icon: CheckCircle2 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400">
                    <item.icon className="h-4 w-4 text-[#d4a017]" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="h-[450px] lg:h-[520px]"
              data-ocid="hero.3d_scene"
            >
              <Hero3DScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#0d0a1e] border-y border-[#2d1b69]/30 py-8" data-ocid="trust_bar.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by leading healthcare providers</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustBrands.map((brand) => (
              <div
                key={brand}
                className="px-4 py-2 rounded-lg border border-[#2d1b69]/40 text-sm text-gray-400 font-medium hover:border-[#d4a017]/40 hover:text-[#d4a017] transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Cards */}
      <section className="bg-[var(--background)] py-20" data-ocid="audience.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              Specialized digital marketing for every segment of the healthcare ecosystem.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audience.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[#d4a017]/40 hover:shadow-xl transition-all duration-300 cursor-default"
                  data-ocid={`audience.${item.title.toLowerCase().replace(/\s/g, '_')}.card`}
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-lg font-semibold text-[#2d1b69] dark:text-white mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-[var(--muted)]/30 py-20" data-ocid="services.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              Full-spectrum digital marketing services tailored for healthcare and modern businesses.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <StaggerItem key={s.title}>
                <Link
                  href={`/services/${s.title.toLowerCase().replace(/\s&\s/g, '-').replace(/\s+/g, '-')}`}
                  className="group block p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[#2d1b69]/40 hover:shadow-xl transition-all duration-300"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <h3 className="text-lg font-semibold text-[#2d1b69] dark:text-white mb-2 font-display group-hover:text-[#d4a017] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-[#d4a017] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-[var(--background)] py-20" data-ocid="process.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              How We Work
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              A proven 4-step process that delivers consistent, measurable results.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]" data-ocid={`process.step.${i + 1}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2d1b69] to-[#4a2d9e] flex items-center justify-center mb-4">
                    <span className="text-[#d4a017] font-bold font-mono text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold font-display text-[#2d1b69] dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1a0f3d] py-20" data-ocid="stats.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#d4a017]/20 border border-[#d4a017]/30 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-[#d4a017]" />
                </div>
                <p className="text-4xl font-bold font-display text-[#d4a017] mb-1" data-ocid={`stats.${stat.label.toLowerCase().replace(/\s/g, '_')}.value`}>
                  <AnimatedCounter target={stat.value} />
                </p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--card)] py-20 border-t border-[var(--border)]" data-ocid="cta.section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#2d1b69] dark:text-white mb-4">
              Ready to grow your digital presence?
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 text-lg">
              Join 200+ healthcare providers who trust yodhaMedia for their digital growth.
            </p>
            <Button
              variant="hero"
              size="xl"
              onClick={() => setModalOpen(true)}
              data-ocid="cta.consultation.primary_button"
            >
              Schedule a Free Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PublicLayout>
  )
}
