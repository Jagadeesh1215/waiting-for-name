'use client';

import { useConsultationModal } from "@/components/layout/ConsultationModal";
import {
  ScrollReveal,
  containerVariants,
  fadeUpVariants,
  sectionLabelClass,
} from "@/lib/animations";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

/* ── Portfolio data ── */
interface Project {
  name: string;
  category: string;
  service: string;
  outcome: string;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    name: "Apollo Specialty Hospital",
    category: "Healthcare",
    service: "Social Media Partner",
    outcome: "3x increase in patient inquiries",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    name: "City Dental Clinic",
    category: "Healthcare",
    service: "ORM + Web Design",
    outcome: "4.8★ Google rating, 2x website traffic",
    gradient: "from-teal-500 to-blue-600",
  },
  {
    name: "Dr. Sharma Orthopedic Center",
    category: "Healthcare",
    service: "Social Media + ORM",
    outcome: "200% follower growth in 6 months",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    name: "TechBrand India",
    category: "E-commerce",
    service: "Digital Marketing",
    outcome: "5x ROAS on Meta Ads campaigns",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "FashionHub Online",
    category: "E-commerce",
    service: "Influencer Marketing",
    outcome: "1M+ reach, 15K new followers",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "GreenMart Superstore",
    category: "Retail",
    service: "Social Media + Branding",
    outcome: "Launched new brand identity",
    gradient: "from-green-500 to-teal-600",
  },
  {
    name: "Prestige Fitness Club",
    category: "Wellness",
    service: "Social Media Partner",
    outcome: "150+ new memberships from Instagram",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "LocalEats Restaurant Chain",
    category: "Restaurants",
    service: "Social Media + ORM",
    outcome: "4.9★ Zomato rating, 30% more orders",
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Premier Real Estate",
    category: "Professional Services",
    service: "Digital Marketing",
    outcome: "40+ qualified leads per month",
    gradient: "from-slate-600 to-blue-700",
  },
  {
    name: "EduSkill Academy",
    category: "Education",
    service: "Web Design + Digital Marketing",
    outcome: "New website + 3x enrollment inquiries",
    gradient: "from-indigo-600 to-purple-700",
  },
  {
    name: "GlowBeauty Salon",
    category: "Beauty & Wellness",
    service: "Influencer Marketing",
    outcome: "Featured by 10+ local influencers",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    name: "StartupTech Co.",
    category: "Startup",
    service: "Branding + Web Design",
    outcome: "Full brand identity from scratch",
    gradient: "from-cyan-500 to-blue-600",
  },
];

const CATEGORIES = [
  "All",
  "Healthcare",
  "E-commerce",
  "Retail",
  "Wellness",
  "Restaurants",
  "Professional Services",
  "Education",
  "Startup",
];

const STATS = [
  { label: "Projects Featured", value: "12" },
  { label: "Service Categories", value: "6" },
  { label: "Happy Clients", value: "50+" },
  { label: "Industries", value: "5+" },
];

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <motion.div
      layout
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(45,27,105,0.2)" }}
      className="bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-brand-purple/30 rounded-2xl overflow-hidden shadow-sm transition-smooth group"
      data-ocid={`our-work.project.item.${index + 1}`}
    >
      {/* Gradient thumbnail */}
      <div
        className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/20 transition-smooth" />
        <span className="relative z-10 text-white font-display font-bold text-5xl select-none">
          {initials}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Category badge */}
        <span className="inline-block text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full mb-3">
          {project.category}
        </span>

        <h3 className="font-heading font-bold text-brand-purple dark:text-white text-base mb-1 leading-snug">
          {project.name}
        </h3>
        <p className="text-brand-text-secondary dark:text-white/50 text-sm mb-3">
          {project.service}
        </p>

        {/* Outcome badge */}
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-3 py-1.5 rounded-lg mb-4 font-body">
          📈 {project.outcome}
        </div>

        {/* Case study CTA */}
        <div className="relative group/btn">
          <button
            type="button"
            disabled
            className="w-full text-sm font-heading font-semibold border border-brand-border-light dark:border-brand-purple/30 text-brand-text-secondary dark:text-white/40 py-2 rounded-lg cursor-not-allowed opacity-60 transition-smooth"
            data-ocid={`our-work.case-study.button.${index + 1}`}
          >
            View Case Study →
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-brand-purple text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-smooth pointer-events-none z-10">
            Case study coming soon
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurWorkPage() {
  const { openModal } = useConsultationModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") ?? "All";

  useEffect(() => {
    document.title = "Our Work — VenIQ Media";
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const setCategory = (cat: string) => {
    if (cat === "All") {
      router.push("/our-work");
    } else {
      router.push(`/our-work?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="gradient-mesh py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className={sectionLabelClass}>OUR WORK</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight">
              Delivering Digital Presence
              <br className="hidden md:block" /> That Drives Results
            </h1>
            <p className="text-brand-text-secondary dark:text-white/70 text-xl leading-relaxed max-w-3xl mx-auto">
              From healthcare institutions to emerging brands — we build digital
              systems that generate real business outcomes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div
        className="sticky top-[72px] z-40 bg-white/95 dark:bg-brand-card-dark/95 backdrop-blur border-b border-brand-border-light dark:border-brand-purple/20 py-3 shadow-sm"
        data-ocid="our-work.filter.tab"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                whileTap={{ scale: 0.95 }}
                whileHover={
                  activeCategory !== cat
                    ? { backgroundColor: "rgba(45,27,105,0.08)" }
                    : {}
                }
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-heading font-semibold transition-smooth shrink-0 ${
                  activeCategory === cat
                    ? "bg-brand-gold text-white shadow-md shadow-brand-gold/30"
                    : "text-brand-text-secondary dark:text-white/60 hover:bg-brand-bg-light dark:hover:bg-brand-purple/20"
                }`}
                data-ocid={`our-work.filter.${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Portfolio Grid ── */}
      <section className="py-16 bg-brand-bg-light dark:bg-brand-bg-dark min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                  data-ocid="our-work.portfolio.empty_state"
                >
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-heading text-brand-purple dark:text-white text-lg font-semibold">
                    No projects in this category yet
                  </p>
                  <p className="text-brand-text-secondary dark:text-white/60 text-sm mt-2">
                    Check back soon — we're always adding new case studies.
                  </p>
                </motion.div>
              ) : (
                filtered.map((project, i) => (
                  <ProjectCard key={project.name} project={project} index={i} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-14 bg-brand-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUpVariants}
                className="text-center"
                data-ocid={`our-work.stats.item.${i + 1}`}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold mb-1">
                  {s.value}
                </div>
                <p className="text-white/70 font-heading text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white dark:bg-brand-card-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-5 leading-tight">
              Ready to Add Your Business to Our Success Stories?
            </h2>
            <p className="text-brand-text-secondary dark:text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you build a digital presence that
              delivers real results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                type="button"
                onClick={openModal}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse"
                data-ocid="our-work.cta.primary_button"
              >
                Start Your Project <span>→</span>
              </motion.button>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-brand-purple dark:border-white/40 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5"
                data-ocid="our-work.cta.secondary_button"
              >
                View Our Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
