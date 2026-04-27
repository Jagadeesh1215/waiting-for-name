import { useConsultationModal } from "@/components/public/ConsultationModal";
import {
  ScrollReveal,
  containerVariants,
  fadeUpVariants,
  sectionLabelClass,
} from "@/lib/animations";
import { type ServicePage, getServiceBySlug } from "@/lib/services-data";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// ─── Hero Section ───────────────────────────────────────────────────────────
function HeroSection({
  service,
  onBookClick,
}: {
  service: ServicePage;
  onBookClick: () => void;
}) {
  return (
    <section className="relative overflow-hidden min-h-[540px] flex items-center py-20 px-4">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${service.hero.gradientFrom}33 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 20%, #D4A01722 0%, transparent 60%),
                       radial-gradient(ellipse at 50% 80%, ${service.hero.gradientTo}22 0%, transparent 60%)`,
        }}
      />
      {/* Pulsing gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${service.hero.gradientFrom}22 0%, transparent 70%)`,
        }}
        animate={{ opacity: [0.6, 0.85, 0.6] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-brand-bg-light/80 dark:bg-brand-bg-dark/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brand-purple/60 dark:text-white/50 mb-4 font-body">
            <Link
              to="/services"
              className="hover:text-brand-gold transition-colors"
            >
              Services
            </Link>
            <span>/</span>
            <span className="text-brand-purple dark:text-white/80">
              {service.hero.categoryLabel
                .replace(/ MANAGEMENT| & DESIGN| & DEVELOPMENT/g, "")
                .replace(
                  /[A-Z]+/,
                  (s) => s.charAt(0) + s.slice(1).toLowerCase(),
                )}
            </span>
          </nav>

          <ScrollReveal>
            <span className={sectionLabelClass}>
              {service.hero.categoryLabel}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-brand-purple dark:text-white leading-tight">
              {service.hero.heading}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-lg text-brand-purple/70 dark:text-white/70 font-body leading-relaxed max-w-lg">
              {service.hero.subheading}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                data-ocid="service-detail.book_consultation_button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 bg-brand-gold text-white font-heading font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_#D4A01755] hover:scale-[1.03] active:scale-[0.97]"
              >
                Book Consultation
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <a
                href="tel:+919876543210"
                data-ocid="service-detail.talk_team_button"
                className="inline-flex items-center gap-2 border-2 border-brand-purple dark:border-white/40 text-brand-purple dark:text-white font-heading font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-purple/10 dark:hover:bg-white/10"
              >
                Talk to Our Team →
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Visual */}
        <ScrollReveal
          direction="scale"
          delay={0.2}
          className="hidden lg:flex justify-center"
        >
          <div
            className="w-72 h-72 rounded-3xl flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${service.hero.gradientFrom} 0%, ${service.hero.gradientTo} 100%)`,
              boxShadow: `0 30px 80px ${service.hero.gradientFrom}44`,
            }}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/10" />
            <div className="absolute -inset-4 rounded-[32px] border border-white/5" />
            <motion.span
              className="text-8xl select-none"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {service.hero.icon}
            </motion.span>
            {/* Gold accent dot */}
            <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_12px_#D4A017]" />
            <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-brand-gold-light/80" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Challenge vs Solution ───────────────────────────────────────────────────
function ChallengeSection({ service }: { service: ServicePage }) {
  return (
    <section className="py-16 px-4 bg-white dark:bg-brand-card-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-brand-purple dark:text-white text-center mb-10">
            {service.challenge.heading}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <ScrollReveal direction="left">
            <div className="h-full border border-red-200 dark:border-red-900/40 bg-red-50/80 dark:bg-red-950/20 rounded-2xl p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔴</span>
                <h3 className="font-heading text-xl font-semibold text-red-700 dark:text-red-400">
                  The Challenge
                </h3>
              </div>
              <p className="font-body text-red-800/80 dark:text-red-300/80 leading-relaxed text-base">
                {service.challenge.problem}
              </p>
            </div>
          </ScrollReveal>

          {/* Solution */}
          <ScrollReveal direction="right">
            <div className="h-full border border-green-200 dark:border-green-900/40 bg-green-50/80 dark:bg-green-950/20 rounded-2xl p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">✅</span>
                <h3 className="font-heading text-xl font-semibold text-green-700 dark:text-green-400">
                  Our Solution
                </h3>
              </div>
              <p className="font-body text-green-800/80 dark:text-green-300/80 leading-relaxed text-base">
                {service.challenge.solution}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── What We Offer ───────────────────────────────────────────────────────────
function WhatWeOfferSection({ service }: { service: ServicePage }) {
  return (
    <section className="py-20 px-4 bg-brand-bg-light dark:bg-brand-bg-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <span className={sectionLabelClass}>WHAT WE OFFER</span>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold text-brand-purple dark:text-white">
            {service.whatWeOffer.heading}
          </h2>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {service.whatWeOffer.items.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              data-ocid={`service-detail.offer.item.${idx + 1}`}
              className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 flex flex-col gap-3 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,27,105,0.15)] dark:hover:shadow-[0_20px_40px_rgba(212,160,23,0.1)] transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 dark:bg-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-brand-purple dark:text-white text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-sm text-brand-purple/60 dark:text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ul className="mt-auto space-y-1.5">
                {item.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2 text-sm font-body text-brand-purple/70 dark:text-white/70"
                  >
                    <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-2.5 h-2.5 text-brand-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Our Process ─────────────────────────────────────────────────────────────
function ProcessSection({ service }: { service: ServicePage }) {
  const { steps } = service.process;
  return (
    <section className="py-20 px-4 bg-white dark:bg-brand-card-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <span className={sectionLabelClass}>OUR PROCESS</span>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold text-brand-purple dark:text-white">
            How We Deliver Results
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal — Mobile: vertical */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, idx) => (
            <ScrollReveal
              key={step.number}
              delay={idx * 0.1}
              className="flex-1"
            >
              <div className="relative flex flex-col items-center text-center px-4">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+1.5rem)] right-0 h-px border-t-2 border-dashed border-brand-gold/40" />
                )}
                {/* Gold circle */}
                <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center font-mono font-bold text-white text-lg shadow-[0_0_20px_#D4A01744] shrink-0 z-10">
                  {step.number}
                </div>
                <h3 className="mt-4 font-heading font-semibold text-brand-purple dark:text-white text-sm leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs font-body text-brand-purple/60 dark:text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: vertical stacked */}
        <div className="flex lg:hidden flex-col gap-0">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 0.1}>
              <div className="relative flex gap-5 pb-8">
                {/* Vertical connector */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-0 w-px border-l-2 border-dashed border-brand-gold/40" />
                )}
                {/* Gold circle */}
                <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center font-mono font-bold text-white text-lg shadow-[0_0_20px_#D4A01744] shrink-0">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading font-semibold text-brand-purple dark:text-white text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-body text-brand-purple/60 dark:text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ────────────────────────────────────────────────────────────────
function BenefitsSection({ service }: { service: ServicePage }) {
  return (
    <section className="py-20 px-4 bg-brand-purple">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <span className="text-brand-gold text-xs font-mono uppercase tracking-widest">
            YOUR ADVANTAGE
          </span>
          <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold text-white">
            {service.benefits.heading}
          </h2>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {service.benefits.items.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              data-ocid={`service-detail.benefit.item.${idx + 1}`}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 flex flex-col gap-3 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-heading font-semibold text-white text-base">
                {item.title}
              </h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Industries ──────────────────────────────────────────────────────────────
function IndustriesSection({ service }: { service: ServicePage }) {
  return (
    <section className="py-16 px-4 bg-brand-bg-light dark:bg-brand-bg-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <span className={sectionLabelClass}>SECTORS WE SERVE</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-brand-purple dark:text-white">
            Industries We Serve
          </h2>
        </ScrollReveal>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {service.industries.map((industry, idx) => (
            <motion.span
              key={industry}
              variants={fadeUpVariants}
              data-ocid={`service-detail.industry.item.${idx + 1}`}
              className="inline-flex items-center px-5 py-2.5 rounded-full border-2 border-brand-gold/60 text-brand-purple dark:text-white font-heading font-medium text-sm bg-white dark:bg-brand-card-dark hover:bg-brand-gold/10 hover:border-brand-gold transition-all duration-200 cursor-default"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection({
  service,
  onBookClick,
}: {
  service: ServicePage;
  onBookClick: () => void;
}) {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-brand-purple-2 dark:bg-brand-card-dark">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-brand-gold/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-brand-purple/30 blur-3xl animate-pulse [animation-delay:1.5s]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            {service.cta.heading}
          </h2>
          <p className="font-body text-white/70 text-lg leading-relaxed mb-10">
            {service.cta.subtext}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              data-ocid="service-detail.cta.book_consultation_button"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 bg-brand-gold text-white font-heading font-semibold px-8 py-4 rounded-full text-lg shadow-[0_0_30px_#D4A01755] transition-all duration-300 hover:shadow-[0_0_50px_#D4A01788] hover:scale-[1.03] active:scale-[0.97]"
            >
              Book a Consultation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <a
              href="tel:+919876543210"
              data-ocid="service-detail.cta.talk_team_button"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-heading font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              Talk to Our Team →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openModal } = useConsultationModal();

  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (slug && !service) {
      navigate("/services", { replace: true });
    }
  }, [slug, service, navigate]);

  useEffect(() => {
    if (service) {
      document.title = service.meta.title;
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
        <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div data-ocid="service-detail.page" className="min-w-0">
      <HeroSection service={service} onBookClick={openModal} />
      <ChallengeSection service={service} />
      <WhatWeOfferSection service={service} />
      <ProcessSection service={service} />
      <BenefitsSection service={service} />
      <IndustriesSection service={service} />
      <CTASection service={service} onBookClick={openModal} />
    </div>
  );
}
