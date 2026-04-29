'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState, Suspense } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ConsultationModal } from '@/components/layout/ConsultationModal'
import { ScrollReveal, MagneticCTA, SplitHeadline, containerVariants, sectionLabelClass } from '@/lib/animations'

const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene'), {
  ssr: false,
  loading: () => <Scene3DFallback />,
})

// ─── Animation variants ───────────────────────────────────────────────────────

const cardSpringVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, damping: 10, stiffness: 200 },
  },
}

const serviceCardSpring = {
  rest: { y: 0, boxShadow: '0 4px 20px rgba(45,27,105,0.1)' },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: '0 0 0 1.5px #D4A017, 0 24px 48px rgba(45,27,105,0.22)',
    transition: { type: 'spring' as const, damping: 8, stiffness: 250 },
  },
}

const processSlideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}

const processSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}

// ─── Static data ──────────────────────────────────────────────────────────────

const WHO_WE_HELP = [
  {
    id: 'hospitals',
    emoji: '🏥',
    title: 'Hospitals & Healthcare Institutions',
    desc: 'Complete digital presence management for hospitals and multi-specialty clinics',
  },
  {
    id: 'doctors',
    emoji: '🩺',
    title: 'Individual Doctors & Clinics',
    desc: 'Build your online reputation and attract more patients with strategic digital marketing',
  },
  {
    id: 'businesses',
    emoji: '🏢',
    title: 'Businesses & Service Providers',
    desc: 'Grow your brand visibility and customer base with integrated marketing systems',
  },
  {
    id: 'brands',
    emoji: '🛍️',
    title: 'Emerging Brands & Product Sellers',
    desc: 'Launch and scale your brand with content, ads, and influencer partnerships',
  },
]

const SERVICES = [
  { id: 'smp', emoji: '📱', title: 'Social Media Partner', desc: 'End-to-end content creation, video production, and platform management', slug: 'social-media-partner' },
  { id: 'orm', emoji: '⭐', title: 'Online Reputation Management', desc: 'Google Business optimization, reviews, and local SEO for visibility', slug: 'orm' },
  { id: 'brand', emoji: '🎨', title: 'Branding Partner', desc: 'Professional design for print and offline branding materials', slug: 'branding-partner' },
  { id: 'web', emoji: '💻', title: 'Web Designing', desc: 'Modern, responsive websites for performance and scalability', slug: 'web-designing' },
  { id: 'ads', emoji: '📊', title: 'Digital Marketing', desc: 'Data-driven Meta & Google ad campaigns for measurable ROI', slug: 'digital-marketing' },
  { id: 'infl', emoji: '🌟', title: 'Influencer Marketing', desc: 'Trusted influencer networks and city page partnerships', slug: 'influencer-marketing' },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Strategy', desc: 'Understand your business, audience, and goals', dir: 'left' as const },
  { num: '02', title: 'Creation', desc: 'Build content and assets that reflect your brand', dir: 'right' as const },
  { num: '03', title: 'Execution', desc: 'Manage platforms, campaigns, communications', dir: 'left' as const },
  { num: '04', title: 'Growth', desc: 'Track, optimize, and scale continuously', dir: 'right' as const },
]

const ADVANTAGE_ITEMS = [
  { emoji: '📡', title: 'Business Hub Pages', desc: 'Reach thousands through our city and niche business pages' },
  { emoji: '🤝', title: 'Influencer Network', desc: 'Access our trusted network of verified influencers and creators' },
  { emoji: '📊', title: 'Data-driven Marketing', desc: 'Every campaign tracked, measured, and optimized continuously' },
  { emoji: '🎯', title: 'Integrated Strategy', desc: 'Content, marketing, and distribution working as one unified system' },
]

const TRUST_LOGOS = [
  'Apollo Hospitals', 'City Clinic', 'MediCare Plus', 'HealthFirst',
  'Dr. Sharma Clinic', 'TechBrand India', 'LocalBiz Co', 'GrowthStartup',
]

const OUTCOMES = [
  'Consistent month-over-month content output',
  'Measurable improvement in online visibility',
  'Structured workflows with no gaps',
  'Long-term partners, not one-time vendors',
]

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 })
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
      motionValue.set(target)
    }
  }, [isInView, motionValue, target, started])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <span ref={ref} className="inline-flex items-baseline gap-0.5">
      <span>{display}</span>
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-brand-gold"
      >
        {suffix}
      </motion.span>
    </span>
  )
}

// ─── 3D scene fallback ────────────────────────────────────────────────────────

function Scene3DFallback() {
  return (
    <div
      className="w-full h-full rounded-2xl flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 30% 50%, rgba(74,44,158,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.25) 0%, transparent 60%), radial-gradient(ellipse at 50% 85%, rgba(45,27,105,0.5) 0%, transparent 70%), #1A1035',
      }}
    >
      <div className="text-center space-y-6 p-8">
        <div
          className="w-28 h-20 mx-auto rounded-xl flex items-center justify-center text-5xl"
          style={{ background: 'rgba(74,44,158,0.5)', boxShadow: '0 0 30px rgba(74,44,158,0.4)' }}
        >
          💻
        </div>
        <div className="flex gap-4 justify-center">
          {['📱', '⭐', '📊', '🚀'].map((icon) => (
            <div
              key={icon}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl animate-float"
              style={{ background: 'rgba(212,160,23,0.2)' }}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className="w-32 h-2 mx-auto rounded-full" style={{ background: 'rgba(74,44,158,0.6)' }} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <PublicLayout>
      <div className="overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center gradient-mesh pt-20" data-ocid="hero.section">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(74,44,158,0.12)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(212,160,23,0.08)' }} />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-5 gap-12 items-center py-16">
            {/* Left text */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <span className={`${sectionLabelClass} inline-block mb-3`}>Digital Growth Agency</span>
              </motion.div>

              <SplitHeadline
                text="We Build Digital Growth Systems for Modern Businesses"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-brand-text-primary dark:text-white"
                lineClassName="block"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-lg font-body text-brand-text-secondary dark:text-white/70 leading-relaxed max-w-xl"
              >
                From content to conversions — we design, manage, and scale your digital presence with precision and performance.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-sm font-body text-brand-text-secondary/80 dark:text-white/50 leading-relaxed max-w-lg"
              >
                Serving hospitals, doctors, and businesses with structured digital solutions that drive visibility, trust, and measurable growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <MagneticCTA>
                  <motion.button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-white transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 animate-glow-pulse"
                    style={{ background: '#D4A017' }}
                    data-ocid="hero.book_consultation_button"
                  >
                    Book Consultation
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </motion.button>
                </MagneticCTA>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold border-2 transition-smooth hover:bg-brand-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
                    style={{ borderColor: '#2D1B69', color: '#2D1B69' }}
                    data-ocid="hero.explore_services_link"
                  >
                    Explore Services →
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right 3D Scene */}
            <motion.div
              className="lg:col-span-2 h-[420px] lg:h-[520px] w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Suspense fallback={<Scene3DFallback />}>
                <Hero3DScene />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="py-10 border-y border-brand-border-light dark:border-white/10 bg-white dark:bg-brand-card-dark/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-5 text-center">
            <p className="text-sm font-mono text-brand-text-secondary dark:text-white/50 tracking-wider uppercase">
              Trusted by Hospitals, Clinics, and Growing Brands
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-10 ticker-animation" style={{ width: 'max-content' }}>
              {[...TRUST_LOGOS, ...TRUST_LOGOS].map((name, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: ticker duplicates need index key
                  key={`${name}-${i}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-white/5 shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs font-bold text-brand-purple dark:text-brand-gold">
                    {name.charAt(0)}
                  </div>
                  <span className="text-sm font-heading font-medium text-brand-text-primary dark:text-white whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE HELP ── */}
        <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark" data-ocid="who-we-help.section">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal className="text-center mb-14">
              <span className={`${sectionLabelClass} block mb-3`}>WHO WE HELP</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white mb-4">
                Built for Professionals Who Want to Grow
              </h2>
              <p className="text-brand-text-secondary dark:text-white/60 max-w-xl mx-auto font-body">
                We partner with businesses and professionals who value consistency, quality, and long-term growth.
              </p>
            </ScrollReveal>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              data-ocid="who-we-help.list"
            >
              {WHO_WE_HELP.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={cardSpringVariants}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212,160,23,0.18)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white dark:bg-brand-card-dark rounded-2xl p-6 border border-brand-border-light dark:border-white/10 shadow-sm cursor-default"
                  data-ocid={`who-we-help.item.${i + 1}`}
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-body text-brand-text-secondary dark:text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CORE SERVICES ── */}
        <section className="py-20 bg-white dark:bg-brand-card-dark/30" data-ocid="services.section">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal className="text-center mb-4">
              <span className={`${sectionLabelClass} block mb-3`}>OUR SERVICES</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white mb-4">
                Complete Digital Growth, Under One System
              </h2>
              <p className="text-brand-text-secondary dark:text-white/60 max-w-2xl mx-auto font-body">
                We don't offer isolated services — we build integrated systems that work together to deliver results.
              </p>
            </ScrollReveal>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              data-ocid="services.list"
            >
              {SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  variants={serviceCardSpring}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                  animate="rest"
                  className="group bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-6 border border-brand-border-light dark:border-white/10 transition-smooth cursor-default"
                  style={{ willChange: 'transform, box-shadow', transitionDelay: `${i * 0.08}s` }}
                  data-ocid={`services.item.${i + 1}`}
                >
                  <motion.div
                    className="text-3xl mb-4 inline-block"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {svc.emoji}
                  </motion.div>
                  <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm font-body text-brand-text-secondary dark:text-white/60 mb-4 leading-relaxed">
                    {svc.desc}
                  </p>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-heading font-medium text-brand-gold hover:text-brand-gold-light transition-smooth group-hover:gap-2"
                    data-ocid={`services.learn_more_link.${i + 1}`}
                  >
                    Learn More{' '}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark" data-ocid="process.section">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal className="text-center mb-14">
              <span className={`${sectionLabelClass} block mb-3`}>OUR PROCESS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white">
                Our Structured Approach to Growth
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px border-t-2 border-dashed border-brand-gold/30" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    variants={step.dir === 'left' ? processSlideLeft : processSlideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.15 }}
                    className="text-center"
                    data-ocid={`process.item.${i + 1}`}
                  >
                    <div
                      className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-brand-gold/40 mb-5 mx-auto process-circle"
                      style={{ background: 'linear-gradient(135deg, #D4A017 0%, #F0C040 100%)' }}
                    >
                      <span className="font-mono font-bold text-white text-lg">{step.num}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-brand-text-primary dark:text-white text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm font-body text-brand-text-secondary dark:text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR ADVANTAGE (Dark Block) ── */}
        <section className="py-20 bg-brand-purple" data-ocid="advantage.section">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5">
                More Than an Agency — A Growth Ecosystem
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto font-body text-lg leading-relaxed">
                Unlike traditional agencies, we combine content, marketing, and distribution systems to create compounding growth for your business.
              </p>
            </ScrollReveal>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {ADVANTAGE_ITEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardSpringVariants}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-xl p-5 backdrop-blur-md"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  data-ocid={`advantage.item.${i + 1}`}
                >
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-heading font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm font-body text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS COUNTERS ── */}
        <section className="py-20 bg-white dark:bg-brand-card-dark/30" data-ocid="stats.section">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal className="text-center mb-14">
              <span className={`${sectionLabelClass} block mb-3`}>OUR IMPACT</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white">
                Focused on Measurable Growth
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
              {[
                { target: 50, suffix: '+', label: 'Happy Clients' },
                { target: 100, suffix: '+', label: 'Projects Delivered' },
                { target: 5, suffix: '+', label: 'Industries Served' },
              ].map((stat, i) => (
                <ScrollReveal
                  key={stat.label}
                  delay={i * 0.15}
                  className="text-center bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-8 border-t-4 border-brand-gold shadow-sm"
                  data-ocid={`stats.item.${i + 1}`}
                >
                  <div className="font-display text-5xl font-bold text-brand-purple dark:text-brand-gold mb-2">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="font-heading font-medium text-brand-text-secondary dark:text-white/60">
                    {stat.label}
                  </p>
                </ScrollReveal>
              ))}
              <ScrollReveal
                delay={0.45}
                className="text-center bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-8 border-t-4 border-brand-gold shadow-sm"
                data-ocid="stats.item.4"
              >
                <div className="font-display text-4xl font-bold text-brand-purple dark:text-brand-gold mb-2">
                  Long-term
                </div>
                <p className="font-heading font-medium text-brand-text-secondary dark:text-white/60">
                  Partnerships
                </p>
              </ScrollReveal>
            </div>

            {/* Outcome bullets */}
            <motion.div
              className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {OUTCOMES.map((outcome) => (
                <motion.div
                  key={outcome}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 text-brand-gold text-lg">✓</span>
                  <p className="font-body text-brand-text-secondary dark:text-white/70 text-sm">{outcome}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA BLOCK ── */}
        <section
          className="relative py-24 overflow-hidden cta-gradient-shift"
          style={{ background: '#0D0A1A' }}
          data-ocid="cta.section"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,44,158,0.3) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-10 right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none animate-float"
            style={{ background: 'rgba(212,160,23,0.15)' }}
          />
          <div
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full blur-2xl pointer-events-none animate-float"
            style={{ background: 'rgba(74,44,158,0.2)', animationDelay: '1.5s' }}
          />

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                Ready to Build Your Digital Presence?
              </h2>
              <p className="text-white/70 font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Let's create a system that works for your business — consistently and professionally.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <MagneticCTA>
                  <motion.button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-white transition-smooth animate-glow-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
                    style={{ background: '#D4A017' }}
                    data-ocid="cta.book_consultation_button"
                  >
                    Book a Consultation
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </motion.button>
                </MagneticCTA>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    data-ocid="cta.get_started_link"
                  >
                    Get Started Today →
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PublicLayout>
  )
}
