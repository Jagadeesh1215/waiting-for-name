'use client'

import Link from 'next/link'
import { motion, useInView, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ConsultationModal } from '@/components/layout/ConsultationModal'
import {
  ScrollReveal,
  containerVariants,
  fadeUpVariants,
  sectionLabelClass,
} from '@/lib/animations'

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => { if (isInView) spring.set(target) }, [isInView, spring, target])

  return <motion.span ref={ref}>{display}</motion.span>
}

// ─── Static data ──────────────────────────────────────────────────────────────

const whatIsHub = [
  { icon: '📱', title: 'City-Specific Pages', desc: 'Dedicated pages for major Indian cities with location-targeted audiences who are actively looking for local businesses and services.' },
  { icon: '🎯', title: 'Niche-Targeted Content', desc: 'Industry and niche pages focused on healthcare, food, lifestyle, and business that attract your ideal customers.' },
  { icon: '📊', title: 'Engaged Audiences', desc: 'Unlike paid ads, our Business Hub pages have organic, engaged followers who trust and respond to featured businesses.' },
]

const howItWorks = [
  { num: '01', title: 'You Join', desc: 'Contact us and share your business details — we\'ll identify the best Hub pages for your audience.' },
  { num: '02', title: 'We Create Content', desc: 'Our team creates engaging posts, stories, and promotional content tailored to the Hub audience.' },
  { num: '03', title: 'We Publish', desc: 'Your business gets featured on high-reach Hub pages at scheduled intervals for maximum exposure.' },
  { num: '04', title: 'You Get Reach', desc: 'Your brand reaches thousands of local, interested followers — building awareness and driving inquiries.' },
]

const hubStats = [
  { label: 'Active Hub Pages', value: 50, suffix: '+' },
  { label: 'Combined Reach', value: 500, suffix: 'K+' },
  { label: 'Cities Covered', value: 20, suffix: '+' },
  { label: 'Niches Served', value: 15, suffix: '+' },
]

const categories = [
  { icon: '🏥', label: 'Healthcare & Medical' }, { icon: '🍽️', label: 'Restaurants & Food' },
  { icon: '🏪', label: 'Retail & Shopping' }, { icon: '💆', label: 'Beauty & Wellness' },
  { icon: '🏋️', label: 'Fitness & Sports' }, { icon: '🎓', label: 'Education & Training' },
  { icon: '🏠', label: 'Real Estate & Property' }, { icon: '⚖️', label: 'Professional Services' },
  { icon: '🛒', label: 'E-commerce' }, { icon: '🎭', label: 'Events & Entertainment' },
  { icon: '🚗', label: 'Auto & Transport' }, { icon: '💼', label: 'B2B Services' },
]

const benefits = [
  { title: 'Instant Audience Access', desc: 'Reach thousands of followers without building your own pages from scratch' },
  { title: 'Hyper-Local Targeting', desc: 'City and neighborhood-level pages mean your posts reach genuinely local audiences' },
  { title: 'Trust Through Association', desc: 'Being featured on established pages transfers credibility to your brand' },
  { title: 'Cost-Effective Reach', desc: 'More affordable than paid ads for organic reach with similar targeting' },
  { title: 'Consistent Exposure', desc: 'Regular feature slots mean sustained visibility, not one-time bursts' },
  { title: 'Cross-Platform Distribution', desc: 'Hub pages often cross-post across Instagram, Facebook, and WhatsApp groups' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessHubPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToHub = () => {
    document.getElementById('what-is-hub')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PublicLayout>
      <main className="overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="gradient-mesh py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <span className={sectionLabelClass}>BUSINESS HUB NETWORK</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight">
                India's Premier Business Hub Network
              </h1>
              <p className="text-brand-text-secondary dark:text-white/70 text-xl leading-relaxed mb-4 max-w-3xl mx-auto">
                Connecting businesses, brands, and professionals with targeted, engaged audiences across cities and niches.
              </p>
              <p className="text-brand-text-secondary dark:text-white/60 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
                Our Business Hub pages are city-specific and niche-targeted social media pages with large, engaged followings — giving your business instant access to the right audience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse"
                  data-ocid="business-hub.hero.primary_button"
                >
                  Get Listed <span>→</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={scrollToHub}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border-2 border-brand-purple dark:border-white/40 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5"
                  data-ocid="business-hub.hero.secondary_button"
                >
                  Learn More ↓
                </motion.button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-14 relative max-w-2xl mx-auto">
                <div className="rounded-3xl overflow-hidden h-64 bg-gradient-to-br from-brand-purple via-brand-purple-2 to-violet-500 flex items-center justify-center shadow-2xl relative">
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">🌐</div>
                    <span className="text-white font-heading font-bold text-2xl tracking-wide block">Business Hub Network</span>
                    <p className="text-white/70 font-mono text-sm mt-2">50+ Pages · 500K+ Reach · 20+ Cities</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── What is Business Hub ── */}
        <section id="what-is-hub" className="py-20 bg-white dark:bg-brand-card-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-14">
              <span className={sectionLabelClass}>WHAT IS BUSINESS HUB</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3 max-w-2xl mx-auto leading-tight">
                More Than Just Social Pages — It's Your Distribution Network
              </h2>
            </ScrollReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {whatIsHub.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUpVariants}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(45,27,105,0.2)' }}
                  className="bg-white dark:bg-brand-bg-dark border border-brand-border-light dark:border-brand-purple/30 rounded-2xl p-8 text-center shadow-sm transition-smooth"
                  data-ocid="business-hub.what-is.card"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-heading font-bold text-brand-purple dark:text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-brand-text-secondary dark:text-white/60 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-14">
              <span className={sectionLabelClass}>HOW IT WORKS</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3 leading-tight">
                How the Business Hub Network Works
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-brand-gold/40 z-0" />
              {howItWorks.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.15} className="relative z-10">
                  <div className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-brand-purple/30 rounded-2xl p-6 text-center shadow-sm" data-ocid={`business-hub.process.item.${i + 1}`}>
                    <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center mx-auto mb-5 shadow-md">
                      <span className="font-mono font-bold text-white text-lg">{step.num}</span>
                    </div>
                    <h3 className="font-heading font-bold text-brand-purple dark:text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-brand-text-secondary dark:text-white/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hub Stats (Dark Purple) ── */}
        <section className="py-20 bg-brand-purple">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">The VenIQ Business Hub Advantage</h2>
              <p className="text-white/70 text-base mb-12 max-w-xl mx-auto">Our growing network of city and niche pages gives your business access to ready, engaged audiences without the wait.</p>
            </ScrollReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {hubStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUpVariants}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  data-ocid={`business-hub.stats.item.${i + 1}`}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold mb-2">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/80 font-heading text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Hub Categories ── */}
        <section className="py-20 bg-white dark:bg-brand-card-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <span className={sectionLabelClass}>HUB CATEGORIES</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3 leading-tight">
                Business Categories We Feature
              </h2>
            </ScrollReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.05 }}
                  data-ocid={`business-hub.category.item.${i + 1}`}
                  className="inline-flex items-center gap-2 border border-brand-border-light dark:border-brand-purple/30 px-5 py-2.5 rounded-full font-heading text-sm text-brand-purple dark:text-white/80 cursor-pointer transition-smooth hover:bg-brand-purple hover:text-white hover:border-brand-purple dark:hover:bg-brand-purple"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white leading-tight">
                Benefits of Being Featured on Business Hub
              </h2>
            </ScrollReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={fadeUpVariants}
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(45,27,105,0.15)' }}
                  className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-brand-purple/30 rounded-2xl p-6 shadow-sm transition-smooth"
                  data-ocid={`business-hub.benefit.item.${i + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-brand-purple dark:text-white text-base mb-1">{b.title}</h3>
                      <p className="text-brand-text-secondary dark:text-white/60 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-gradient-to-br from-brand-purple via-brand-purple-2 to-violet-600 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 12 }, (_, i) => i).map((i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: decorative
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{ width: 40 + (i * 7), height: 40 + (i * 7), left: `${(i * 8) % 100}%`, top: `${(i * 15) % 100}%` }}
                animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3 + i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Ready to Join the VenIQ Business Hub Network?
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Get your business featured on our city and niche pages — reach thousands of local, engaged followers.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.5)] animate-glow-pulse"
                  data-ocid="business-hub.cta.primary_button"
                >
                  Get Listed Today <span>→</span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-white/10"
                  data-ocid="business-hub.cta.secondary_button"
                >
                  Contact Our Team
                </motion.button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PublicLayout>
  )
}
