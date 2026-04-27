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
const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5+", label: "Industries Served" },
  { value: "∞", label: "Long-term Partnerships" },
];

const services = [
  { icon: "📱", name: "Social Media Management" },
  { icon: "⭐", name: "Online Reputation Management" },
  { icon: "💻", name: "Web Design & Development" },
  { icon: "📊", name: "Digital Marketing" },
  { icon: "🌟", name: "Influencer & City Page Marketing" },
  { icon: "🎨", name: "Branding & Design" },
];

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "We deep-dive into your business, audience, goals, and competitive landscape",
  },
  {
    num: "02",
    title: "Build",
    desc: "We create content, campaigns, and assets tailored to your brand identity",
  },
  {
    num: "03",
    title: "Execute",
    desc: "We manage all platforms, campaigns, and communications on your behalf",
  },
  {
    num: "04",
    title: "Optimize & Grow",
    desc: "We track performance, iterate, and scale what works continuously",
  },
];

const differentiators = [
  {
    icon: "✅",
    title: "Integrated Strategy",
    desc: "Content, marketing & distribution working as one unified system",
  },
  {
    icon: "🏥",
    title: "Healthcare Focus",
    desc: "Dedicated expertise for hospitals, doctors, and medical professionals",
  },
  {
    icon: "🤝",
    title: "Business Hub Network",
    desc: "Strong influencer network and city-level distribution channels",
  },
  {
    icon: "📋",
    title: "Structured Workflows",
    desc: "Consistent execution frameworks for quality and predictability",
  },
  {
    icon: "🛡️",
    title: "Ethical Approach",
    desc: "Compliance-focused strategy that builds long-lasting trust",
  },
];

const infoColumns = [
  {
    title: "Our Network Advantage",
    content:
      "We have an established network of Business Hub pages, city pages, and verified influencers across India, giving your business instant access to large, targeted audiences.",
    isList: false,
    slideDir: "left" as const,
  },
  {
    title: "Industries We Serve",
    items: [
      "Hospitals & Healthcare",
      "Individual Doctors & Clinics",
      "Businesses & Service Providers",
      "Emerging Brands",
      "E-commerce",
      "Professional Services",
    ],
    isList: true,
    slideDir: "right" as const,
  },
  {
    title: "Our Vision",
    content:
      "To be India's most trusted digital growth partner for healthcare and businesses — building systems that deliver consistent, measurable, and ethical results.",
    isList: false,
    slideDir: "left" as const,
  },
  {
    title: "Our Mission",
    content:
      "To combine content, marketing, and distribution into one integrated growth system that helps every client build visibility, credibility, and business growth.",
    isList: false,
    slideDir: "right" as const,
  },
];

/* ── Animation variants ── */
const springCard = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 10,
      stiffness: 200,
      delay: i * 0.1,
    },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function AboutPage() {
  const { openModal } = useConsultationModal();

  useEffect(() => {
    document.title = "About Us — VenIQ Media";
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="gradient-mesh py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <span className={sectionLabelClass}>ABOUT US</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight">
                A Digital Growth Partner Built for Modern Businesses
              </h1>
              <p className="text-brand-text-secondary dark:text-white/70 text-lg leading-relaxed mb-8">
                We help hospitals, doctors, and businesses build a strong,
                consistent, and result-driven digital presence through
                structured systems and strategic execution.
              </p>
              <motion.button
                type="button"
                onClick={openModal}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-7 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse"
                data-ocid="about.hero.primary_button"
              >
                Let's Grow Together
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </motion.button>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-brand-purple via-brand-purple-2 to-violet-500 flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-brand-purple/30" />
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-3">🏢</div>
                  <span className="text-white/90 font-heading font-bold text-2xl tracking-wide">
                    VenIQ Media
                  </span>
                  <p className="text-white/60 text-sm mt-1 font-mono">
                    Digital Growth Agency
                  </p>
                </div>
                <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-brand-gold/10 blur-xl" />
                <div className="absolute bottom-10 left-8 w-32 h-32 rounded-full bg-violet-400/20 blur-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="py-20 bg-white dark:bg-brand-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <ScrollReveal
              direction="left"
              className="space-y-5 text-brand-text-secondary dark:text-white/70 leading-relaxed text-base"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-6">
                Who We Are
              </h2>
              <p>
                VenIQ Media LLP is a full-service digital growth agency founded
                with one mission — to help modern businesses build a strong,
                consistent, and result-driven digital presence.
              </p>
              <p>
                We specialize in serving hospitals, individual doctors, clinics,
                and growing businesses across India. Our integrated approach
                combines content creation, digital marketing, and strategic
                distribution to deliver measurable results.
              </p>
              <p>
                Our team of specialists in social media, SEO, branding, and
                digital advertising work as an extension of your team —
                consistently executing your digital strategy so you can focus on
                what matters most: your business.
              </p>
            </ScrollReveal>

            {/* Stats grid with spring entrance */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={springCard}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 28px rgba(212,160,23,0.18)",
                  }}
                  className="bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 text-center transition-smooth"
                >
                  <div className="text-4xl font-display font-bold text-brand-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-text-secondary dark:text-white/60 font-heading">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className={sectionLabelClass}>WHAT WE DO</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3 mb-12">
              Our Core Services
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={svc.name}
                custom={i}
                variants={springCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 32px rgba(45,27,105,0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 text-center transition-smooth cursor-default"
                data-ocid="about.services.card"
              >
                <div className="text-4xl mb-3">{svc.icon}</div>
                <p className="font-heading font-semibold text-sm text-brand-purple dark:text-white leading-snug">
                  {svc.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-20 bg-white dark:bg-brand-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <span className={sectionLabelClass}>OUR APPROACH</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3">
              How We Work With You
            </h2>
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {/* dashed connector (desktop only) */}
            <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px border-t-2 border-dashed border-brand-gold/40 z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUpVariants}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
                data-ocid={`about.approach.item.${i + 1}`}
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

      {/* ── What Makes Us Different (Dark Block) ── */}
      <section
        className="py-20 bg-brand-purple dark:bg-brand-bg-dark"
        data-ocid="about.differentiators.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              What Makes Us Different
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                custom={i}
                variants={springCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center"
                data-ocid={`about.differentiator.item.${i + 1}`}
              >
                <div className="text-3xl mb-3">{d.icon}</div>
                <h3 className="font-heading font-bold text-white text-sm mb-1.5">
                  {d.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network / Industries / Vision / Mission ── */}
      <section className="py-20 bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoColumns.map((col, i) => (
              <motion.div
                key={col.title}
                variants={col.slideDir === "left" ? slideLeft : slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 h-full">
                  <h3 className="font-heading font-bold text-brand-gold mb-3 text-sm uppercase tracking-wide">
                    {col.title}
                  </h3>
                  {col.isList ? (
                    <ul className="space-y-1.5">
                      {col.items?.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-brand-text-secondary dark:text-white/70"
                        >
                          <span className="text-brand-gold mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-text-secondary dark:text-white/70 leading-relaxed">
                      {col.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 gradient-mesh">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-4">
              Let's Build Your Digital Presence Together
            </h2>
            <p className="text-brand-text-secondary dark:text-white/70 mb-8 text-lg">
              Ready to grow? Let's create a digital strategy that delivers real
              results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                onClick={openModal}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)]"
                data-ocid="about.cta.primary_button"
              >
                Book a Consultation →
              </motion.button>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-purple dark:border-white/30 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5 dark:hover:bg-white/5"
                  data-ocid="about.cta.secondary_button"
                >
                  Contact Us →
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
