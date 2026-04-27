import { u as useConsultationModal, i as useSearchParams, r as reactExports, j as jsxRuntimeExports, a as ScrollReveal, s as sectionLabelClass, m as motion, A as AnimatePresence, c as containerVariants, f as fadeUpVariants, L as Link } from "./index-CA0QtfeM.js";
const PROJECTS = [
  {
    name: "Apollo Specialty Hospital",
    category: "Healthcare",
    service: "Social Media Partner",
    outcome: "3x increase in patient inquiries",
    gradient: "from-blue-600 to-purple-600"
  },
  {
    name: "City Dental Clinic",
    category: "Healthcare",
    service: "ORM + Web Design",
    outcome: "4.8★ Google rating, 2x website traffic",
    gradient: "from-teal-500 to-blue-600"
  },
  {
    name: "Dr. Sharma Orthopedic Center",
    category: "Healthcare",
    service: "Social Media + ORM",
    outcome: "200% follower growth in 6 months",
    gradient: "from-purple-600 to-pink-500"
  },
  {
    name: "TechBrand India",
    category: "E-commerce",
    service: "Digital Marketing",
    outcome: "5x ROAS on Meta Ads campaigns",
    gradient: "from-orange-500 to-red-600"
  },
  {
    name: "FashionHub Online",
    category: "E-commerce",
    service: "Influencer Marketing",
    outcome: "1M+ reach, 15K new followers",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    name: "GreenMart Superstore",
    category: "Retail",
    service: "Social Media + Branding",
    outcome: "Launched new brand identity",
    gradient: "from-green-500 to-teal-600"
  },
  {
    name: "Prestige Fitness Club",
    category: "Wellness",
    service: "Social Media Partner",
    outcome: "150+ new memberships from Instagram",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    name: "LocalEats Restaurant Chain",
    category: "Restaurants",
    service: "Social Media + ORM",
    outcome: "4.9★ Zomato rating, 30% more orders",
    gradient: "from-red-500 to-orange-500"
  },
  {
    name: "Premier Real Estate",
    category: "Professional Services",
    service: "Digital Marketing",
    outcome: "40+ qualified leads per month",
    gradient: "from-slate-600 to-blue-700"
  },
  {
    name: "EduSkill Academy",
    category: "Education",
    service: "Web Design + Digital Marketing",
    outcome: "New website + 3x enrollment inquiries",
    gradient: "from-indigo-600 to-purple-700"
  },
  {
    name: "GlowBeauty Salon",
    category: "Beauty & Wellness",
    service: "Influencer Marketing",
    outcome: "Featured by 10+ local influencers",
    gradient: "from-rose-400 to-pink-600"
  },
  {
    name: "StartupTech Co.",
    category: "Startup",
    service: "Branding + Web Design",
    outcome: "Full brand identity from scratch",
    gradient: "from-cyan-500 to-blue-600"
  }
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
  "Startup"
];
const STATS = [
  { label: "Projects Featured", value: "12" },
  { label: "Service Categories", value: "6" },
  { label: "Happy Clients", value: "50+" },
  { label: "Industries", value: "5+" }
];
function ProjectCard({ project, index }) {
  const initials = project.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      variants: fadeUpVariants,
      initial: "hidden",
      animate: "visible",
      exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
      transition: { delay: index * 0.07 },
      whileHover: { y: -8, boxShadow: "0 20px 40px rgba(45,27,105,0.2)" },
      className: "bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-brand-purple/30 rounded-2xl overflow-hidden shadow-sm transition-smooth group",
      "data-ocid": `our-work.project.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/20 transition-smooth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-white font-display font-bold text-5xl select-none", children: initials })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-mono font-semibold bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full mb-3", children: project.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-brand-purple dark:text-white text-base mb-1 leading-snug", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/50 text-sm mb-3", children: project.service }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-3 py-1.5 rounded-lg mb-4 font-body", children: [
            "📈 ",
            project.outcome
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/btn", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: true,
                className: "w-full text-sm font-heading font-semibold border border-brand-border-light dark:border-brand-purple/30 text-brand-text-secondary dark:text-white/40 py-2 rounded-lg cursor-not-allowed opacity-60 transition-smooth",
                "data-ocid": `our-work.case-study.button.${index + 1}`,
                children: "View Case Study →"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-brand-purple text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-smooth pointer-events-none z-10", children: "Case study coming soon" })
          ] })
        ] })
      ]
    }
  );
}
function OurWorkPage() {
  const { openModal } = useConsultationModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  reactExports.useEffect(() => {
    document.title = "Our Work — VenIQ Media";
  }, []);
  const filtered = reactExports.useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);
  const setCategory = (cat) => {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-mesh py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "OUR WORK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight", children: [
        "Delivering Digital Presence",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
        " That Drives Results"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 text-xl leading-relaxed max-w-3xl mx-auto", children: "From healthcare institutions to emerging brands — we build digital systems that generate real business outcomes." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sticky top-[72px] z-40 bg-white/95 dark:bg-brand-card-dark/95 backdrop-blur border-b border-brand-border-light dark:border-brand-purple/20 py-3 shadow-sm",
        "data-ocid": "our-work.filter.tab",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: () => setCategory(cat),
            whileTap: { scale: 0.95 },
            whileHover: activeCategory !== cat ? { backgroundColor: "rgba(45,27,105,0.08)" } : {},
            transition: { type: "spring", stiffness: 300, damping: 12 },
            className: `whitespace-nowrap px-4 py-2 rounded-full text-sm font-heading font-semibold transition-smooth shrink-0 ${activeCategory === cat ? "bg-brand-gold text-white shadow-md shadow-brand-gold/30" : "text-brand-text-secondary dark:text-white/60 hover:bg-brand-bg-light dark:hover:bg-brand-purple/20"}`,
            "data-ocid": `our-work.filter.${cat.toLowerCase().replace(/\s+/g, "-")}`,
            children: cat
          },
          cat
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-brand-bg-light dark:bg-brand-bg-dark min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
        children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "col-span-full text-center py-20",
            "data-ocid": "our-work.portfolio.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading text-brand-purple dark:text-white text-lg font-semibold", children: "No projects in this category yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 text-sm mt-2", children: "Check back soon — we're always adding new case studies." })
            ]
          }
        ) : filtered.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project, index: i }, project.name))
      },
      activeCategory
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 bg-brand-purple", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        className: "grid grid-cols-2 md:grid-cols-4 gap-6",
        children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: fadeUpVariants,
            className: "text-center",
            "data-ocid": `our-work.stats.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl md:text-4xl font-display font-bold text-brand-gold mb-1", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-heading text-sm", children: s.label })
            ]
          },
          s.label
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white dark:bg-brand-card-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-5 leading-tight", children: "Ready to Add Your Business to Our Success Stories?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 text-lg mb-10 max-w-2xl mx-auto", children: "Let's discuss how we can help you build a digital presence that delivers real results." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            onClick: openModal,
            whileTap: { scale: 0.97 },
            className: "inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse",
            "data-ocid": "our-work.cta.primary_button",
            children: [
              "Start Your Project ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/services",
            className: "inline-flex items-center gap-2 border-2 border-brand-purple dark:border-white/40 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5",
            "data-ocid": "our-work.cta.secondary_button",
            children: "View Our Services"
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  OurWorkPage as default
};
