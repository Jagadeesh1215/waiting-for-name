import { useConsultationModal } from "@/components/public/ConsultationModal";
import {
  ScrollReveal,
  containerVariants,
  fadeUpVariants,
  sectionLabelClass,
} from "@/lib/animations";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ── Static data ── */
const coreServices = [
  {
    num: "01",
    icon: "📱",
    name: "Social Media Partner",
    category: "Content Strategy",
    desc: "End-to-end social media management that builds brand visibility and drives engagement across all platforms.",
    bullets: [
      "Content calendar & script writing",
      "Video shooting & reel editing",
      "Carousel design & content approval",
      "Account management & engagement monitoring",
    ],
    bestFor:
      "Hospitals, doctors, and businesses needing consistent social presence",
    slug: "social-media-partner",
  },
  {
    num: "02",
    icon: "⭐",
    name: "Online Reputation Management",
    category: "ORM",
    desc: "Protect and enhance your online reputation with proven strategies that build trust and visibility.",
    bullets: [
      "Google Business Profile optimization",
      "Review management & response strategy",
      "Local SEO and map visibility",
      "Digital visiting cards",
    ],
    bestFor: "Doctors, clinics, and local businesses",
    slug: "orm",
  },
  {
    num: "03",
    icon: "🎨",
    name: "Branding Partner",
    category: "Print & Offline Design",
    desc: "Professional design services that make your brand stand out — both online and in the physical world.",
    bullets: [
      "Banners, hoardings & canopy tents",
      "Posters, flyers & print collateral",
      "Brand guidelines & identity design",
      "Offline marketing materials",
    ],
    bestFor: "Businesses establishing or refreshing their brand",
    slug: "branding-partner",
  },
  {
    num: "04",
    icon: "💻",
    name: "Web Designing",
    category: "Digital Presence",
    desc: "Modern, responsive websites built for performance, user experience, and search engine visibility.",
    bullets: [
      "Modern responsive website development",
      "Blog integration & maintenance",
      "SEO structure & performance optimization",
      "UI/UX design with conversion focus",
    ],
    bestFor: "Any business needing a professional website",
    slug: "web-designing",
  },
  {
    num: "05",
    icon: "📊",
    name: "Digital Marketing",
    category: "Paid Ads",
    desc: "Data-driven paid advertising campaigns on Meta and Google that deliver measurable ROI.",
    bullets: [
      "Meta Ads (Facebook + Instagram) management",
      "Google Ads campaign setup & management",
      "Strategy, optimization & A/B testing",
      "Detailed reporting & performance tracking",
    ],
    bestFor: "Businesses ready to invest in paid growth",
    slug: "digital-marketing",
  },
  {
    num: "06",
    icon: "🌟",
    name: "Influencer Marketing",
    category: "Network Reach",
    desc: "Leverage our network of trusted influencers and city pages to reach targeted local audiences at scale.",
    bullets: [
      "Influencer collaborations & negotiations",
      "City page promotions & sponsored posts",
      "Campaign management & execution",
      "Budget optimization & ROI tracking",
    ],
    bestFor: "Brands needing reach and trust through creators",
    slug: "influencer-marketing",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Strategy",
    desc: "Understand your business, audience, and goals",
  },
  {
    num: "02",
    title: "Creation",
    desc: "Build content and assets that reflect your brand",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Manage platforms, campaigns, and communications",
  },
  {
    num: "04",
    title: "Growth",
    desc: "Track, optimize, and scale continuously",
  },
];

const whyChoose = [
  {
    icon: "🔗",
    title: "Integrated Ecosystem",
    desc: "All services work together for amplified results",
  },
  {
    icon: "🏥",
    title: "Healthcare Focus",
    desc: "Deep expertise in medical & healthcare marketing",
  },
  {
    icon: "📡",
    title: "Strong Distribution",
    desc: "Business Hub network + influencer reach",
  },
  {
    icon: "⚙️",
    title: "Consistent Execution",
    desc: "Structured workflows ensure quality every time",
  },
  {
    icon: "🛡️",
    title: "Ethical Approach",
    desc: "Compliance-focused, transparent practices",
  },
];

const distributionBenefits = [
  {
    icon: "🌐",
    text: "Access to 50+ Business Hub pages and city-specific audiences",
  },
  {
    icon: "📱",
    text: "Established influencer network across multiple categories",
  },
  {
    icon: "📊",
    text: "Paid ad expertise reaching hyper-targeted local audiences",
  },
];

/* ── Service card spring variant ── */
const serviceCardSpring = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 10,
      stiffness: 200,
      delay: i * 0.08,
    },
  }),
};

/* ── Floating particle dots for dark distribution block ── */
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${10 + i * 12}%`,
  top: `${15 + (i % 3) * 30}%`,
  delay: i * 0.4,
  size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
}));

export default function ServicesPage() {
  const { openModal } = useConsultationModal();

  useEffect(() => {
    document.title = "Services — VenIQ Media";
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="gradient-mesh py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <span className={sectionLabelClass}>OUR SERVICES</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight">
                Comprehensive Digital Solutions Built for Growth
              </h1>
              <p className="text-brand-text-secondary dark:text-white/70 text-lg leading-relaxed mb-2">
                We offer integrated digital services that help businesses,
                hospitals, and professionals build visibility, credibility, and
                consistent growth.
              </p>
              <p className="text-brand-text-secondary dark:text-white/60 text-base leading-relaxed mb-8">
                From content creation to marketing execution and distribution —
                everything is managed under one structured system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="button"
                  onClick={openModal}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-7 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse"
                  data-ocid="services.hero.primary_button"
                >
                  Book Consultation →
                </motion.button>
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/services/social-media-partner"
                    className="inline-flex items-center justify-center gap-2 border-2 border-brand-purple dark:border-white/30 text-brand-purple dark:text-white font-heading font-semibold px-7 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5 dark:hover:bg-white/5"
                    data-ocid="services.hero.secondary_button"
                  >
                    Get Started →
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative rounded-2xl overflow-hidden h-80 bg-gradient-to-br from-brand-purple via-indigo-700 to-brand-purple-2 flex items-center justify-center shadow-2xl">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 40%, #D4A017 0%, transparent 50%), radial-gradient(circle at 70% 60%, #4A2C9E 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-2">🚀</div>
                  <span className="text-white/80 font-mono text-sm uppercase tracking-widest">
                    Growth Platform
                  </span>
                  <p className="text-white/50 text-xs mt-1">
                    Integrated Digital System
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-brand-gold/20 blur-xl" />
                <div className="absolute bottom-6 left-6 w-28 h-28 rounded-full bg-indigo-400/20 blur-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Growth System Intro ── */}
      <section className="py-14 bg-white dark:bg-brand-card-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="border-2 border-brand-border-light dark:border-white/10 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-purple dark:text-white mb-4">
                Not Just Services — A Complete Growth System
              </h2>
              <p className="text-brand-text-secondary dark:text-white/70 leading-relaxed">
                At VenIQ Media, we don't offer isolated services. We build an
                integrated digital growth system where every component —
                content, marketing, SEO, and distribution — works together to
                amplify your results. Our structured approach ensures
                consistency, quality, and measurable outcomes at every stage.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className={sectionLabelClass}>OUR SERVICES</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3">
              What We Offer
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((svc, i) => (
              <motion.div
                key={svc.slug}
                custom={i}
                variants={serviceCardSpring}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                // Hover spring
                whileHover="hover"
                animate="rest"
                data-ocid={`services.card.item.${i + 1}`}
                className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 flex flex-col transition-smooth group"
                style={{ willChange: "transform, box-shadow" }}
              >
                {/* Number + icon */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Gold number badge — process-circle style */}
                  <div
                    className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white font-mono font-bold text-xs shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, #D4A017 0%, #F0C040 100%)",
                      boxShadow: "0 0 10px rgba(212,160,23,0.35)",
                    }}
                  >
                    {svc.num}
                  </div>
                  <motion.div
                    className="text-4xl"
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {svc.icon}
                  </motion.div>
                </div>

                {/* Name + category */}
                <h3 className="font-heading font-bold text-brand-purple dark:text-white text-lg mb-1">
                  {svc.name}
                </h3>
                <span className="text-brand-gold text-xs font-mono uppercase tracking-wide mb-3">
                  {svc.category}
                </span>

                {/* Desc */}
                <p className="text-sm text-brand-text-secondary dark:text-white/60 leading-relaxed mb-4">
                  {svc.desc}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-4 flex-1">
                  {svc.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-brand-text-secondary dark:text-white/60"
                    >
                      <span className="text-brand-gold mt-0.5 shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Best For */}
                <p className="text-xs italic text-brand-text-secondary/70 dark:text-white/40 mb-4">
                  <span className="font-semibold not-italic text-brand-purple dark:text-white/70">
                    Best For:
                  </span>{" "}
                  {svc.bestFor}
                </p>

                {/* Gold left border on hover via box-shadow framing */}
                <div className="relative">
                  <motion.div
                    className="absolute -left-6 top-0 bottom-0 w-0.5 rounded-full"
                    style={{ background: "#D4A017" }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-brand-gold hover:text-brand-gold-light font-heading font-semibold text-sm transition-smooth hover:underline inline-flex items-center gap-1"
                    data-ocid={`services.card.link.${i + 1}`}
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Distribution Advantage (Dark Block) ── */}
      <section
        className="py-20 bg-brand-purple dark:bg-brand-bg-dark relative overflow-hidden"
        data-ocid="services.distribution.section"
      >
        {/* Floating particle dots */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-gold/25 pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + p.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Our Distribution Advantage
              </h2>
              <p className="text-white/60 font-heading text-lg mb-8">
                Powered by Our Business Hub Network
              </p>
              <ul className="space-y-5">
                {distributionBenefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{b.icon}</span>
                    <span className="text-white/80 leading-relaxed">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" className="flex justify-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-gold/30 via-violet-500/20 to-brand-purple-2/30 border border-white/10 flex items-center justify-center shadow-2xl">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-white/5 to-brand-gold/10 border border-white/10 flex items-center justify-center">
                    <span className="text-5xl">🌐</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border border-dashed border-brand-gold/25 scale-110" />
                <div className="absolute inset-0 rounded-full border border-dashed border-white/10 scale-125" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 bg-white dark:bg-brand-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className={sectionLabelClass}>OUR PROCESS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3">
              Our Structured Approach to Growth
            </h2>
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px border-t-2 border-dashed border-brand-gold/40 z-0" />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUpVariants}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
                data-ocid={`services.process.item.${i + 1}`}
              >
                <div
                  className="process-circle w-10 h-10 rounded-full flex items-center justify-center text-white font-mono font-bold text-sm mb-4 shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A017 0%, #F0C040 100%)",
                    boxShadow: "0 0 12px rgba(212,160,23,0.4)",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-brand-purple dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-text-secondary dark:text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose VenIQ ── */}
      <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <span className={sectionLabelClass}>WHY CHOOSE US</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3">
              Why 50+ Businesses Trust VenIQ Media
            </h2>
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUpVariants}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 28px rgba(45,27,105,0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl px-6 py-5 flex flex-col items-center text-center w-40 md:w-48 transition-smooth shadow-sm"
                data-ocid={`services.why.item.${i + 1}`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-heading font-bold text-brand-purple dark:text-white text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-text-secondary dark:text-white/50 leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-4">
              Let's Build Your Digital Growth System
            </h2>
            <p className="text-brand-text-secondary dark:text-white/70 mb-8 text-lg">
              Ready to scale your digital presence? Let's create an integrated
              system that delivers real, measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                onClick={openModal}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)]"
                data-ocid="services.cta.primary_button"
              >
                Book a Consultation →
              </motion.button>
              <motion.button
                type="button"
                onClick={openModal}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-purple dark:border-white/30 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5 dark:hover:bg-white/5"
                data-ocid="services.cta.secondary_button"
              >
                Talk to Our Team →
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
