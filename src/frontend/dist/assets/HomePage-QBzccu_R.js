const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Hero3DScene-YO4NTcle.js","assets/index-CA0QtfeM.js","assets/index-CrUsJyDB.css"])))=>i.map(i=>d[i]);
import { u as useConsultationModal, r as reactExports, j as jsxRuntimeExports, m as motion, s as sectionLabelClass, S as SplitHeadline, M as MagneticCTA, L as Link, a as ScrollReveal, c as containerVariants, _ as __vitePreload, b as useInView, d as useMotionValue, e as useSpring } from "./index-CA0QtfeM.js";
const Hero3DScene = reactExports.lazy(
  () => __vitePreload(() => import("./Hero3DScene-YO4NTcle.js"), true ? __vite__mapDeps([0,1,2]) : void 0).then((m) => ({
    default: m.Hero3DScene
  }))
);
const cardSpringVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 10, stiffness: 200 }
  }
};
const serviceCardSpring = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(45,27,105,0.1)" },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: "0 0 0 1.5px #D4A017, 0 24px 48px rgba(45,27,105,0.22)",
    transition: { type: "spring", damping: 8, stiffness: 250 }
  }
};
const processSlideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" }
  }
};
const processSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" }
  }
};
const WHO_WE_HELP = [
  {
    id: "hospitals",
    emoji: "🏥",
    title: "Hospitals & Healthcare Institutions",
    desc: "Complete digital presence management for hospitals and multi-specialty clinics"
  },
  {
    id: "doctors",
    emoji: "🩺",
    title: "Individual Doctors & Clinics",
    desc: "Build your online reputation and attract more patients with strategic digital marketing"
  },
  {
    id: "businesses",
    emoji: "🏢",
    title: "Businesses & Service Providers",
    desc: "Grow your brand visibility and customer base with integrated marketing systems"
  },
  {
    id: "brands",
    emoji: "🛍️",
    title: "Emerging Brands & Product Sellers",
    desc: "Launch and scale your brand with content, ads, and influencer partnerships"
  }
];
const SERVICES = [
  {
    id: "smp",
    emoji: "📱",
    title: "Social Media Partner",
    desc: "End-to-end content creation, video production, and platform management",
    slug: "social-media-partner"
  },
  {
    id: "orm",
    emoji: "⭐",
    title: "Online Reputation Management",
    desc: "Google Business optimization, reviews, and local SEO for visibility",
    slug: "orm"
  },
  {
    id: "brand",
    emoji: "🎨",
    title: "Branding Partner",
    desc: "Professional design for print and offline branding materials",
    slug: "branding-partner"
  },
  {
    id: "web",
    emoji: "💻",
    title: "Web Designing",
    desc: "Modern, responsive websites for performance and scalability",
    slug: "web-designing"
  },
  {
    id: "ads",
    emoji: "📊",
    title: "Digital Marketing",
    desc: "Data-driven Meta & Google ad campaigns for measurable ROI",
    slug: "digital-marketing"
  },
  {
    id: "infl",
    emoji: "🌟",
    title: "Influencer Marketing",
    desc: "Trusted influencer networks and city page partnerships",
    slug: "influencer-marketing"
  }
];
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Strategy",
    desc: "Understand your business, audience, and goals",
    dir: "left"
  },
  {
    num: "02",
    title: "Creation",
    desc: "Build content and assets that reflect your brand",
    dir: "right"
  },
  {
    num: "03",
    title: "Execution",
    desc: "Manage platforms, campaigns, communications",
    dir: "left"
  },
  {
    num: "04",
    title: "Growth",
    desc: "Track, optimize, and scale continuously",
    dir: "right"
  }
];
const ADVANTAGE_ITEMS = [
  {
    emoji: "📡",
    title: "Business Hub Pages",
    desc: "Reach thousands through our city and niche business pages"
  },
  {
    emoji: "🤝",
    title: "Influencer Network",
    desc: "Access our trusted network of verified influencers and creators"
  },
  {
    emoji: "📊",
    title: "Data-driven Marketing",
    desc: "Every campaign tracked, measured, and optimized continuously"
  },
  {
    emoji: "🎯",
    title: "Integrated Strategy",
    desc: "Content, marketing, and distribution working as one unified system"
  }
];
const TRUST_LOGOS = [
  "Apollo Hospitals",
  "City Clinic",
  "MediCare Plus",
  "HealthFirst",
  "Dr. Sharma Clinic",
  "TechBrand India",
  "LocalBiz Co",
  "GrowthStartup"
];
const OUTCOMES = [
  "Consistent month-over-month content output",
  "Measurable improvement in online visibility",
  "Structured workflows with no gaps",
  "Long-term partners, not one-time vendors"
];
function AnimatedCounter({
  target,
  suffix = "+"
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = reactExports.useState(0);
  const [started, setStarted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      motionValue.set(target);
    }
  }, [isInView, motionValue, target, started]);
  reactExports.useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className: "inline-flex items-baseline gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: display }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        initial: { opacity: 0, y: 4 },
        animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
        transition: { duration: 0.3, delay: 0.2 },
        className: "text-brand-gold",
        children: suffix
      }
    )
  ] });
}
function Scene3DFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full h-full rounded-2xl flex items-center justify-center",
      style: {
        background: "radial-gradient(ellipse at 30% 50%, rgba(74,44,158,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.25) 0%, transparent 60%), radial-gradient(ellipse at 50% 85%, rgba(45,27,105,0.5) 0%, transparent 70%), #1A1035"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-28 h-20 mx-auto rounded-xl flex items-center justify-center text-5xl",
            style: {
              background: "rgba(74,44,158,0.5)",
              boxShadow: "0 0 30px rgba(74,44,158,0.4)"
            },
            children: "💻"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 justify-center", children: ["📱", "⭐", "📊", "🚀"].map((icon) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-lg flex items-center justify-center text-2xl animate-float",
            style: { background: "rgba(212,160,23,0.2)" },
            children: icon
          },
          icon
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-32 h-2 mx-auto rounded-full",
            style: { background: "rgba(74,44,158,0.6)" }
          }
        )
      ] })
    }
  );
}
function HomePage() {
  const { openModal } = useConsultationModal();
  reactExports.useEffect(() => {
    document.title = "VenIQ Media — Digital Growth Agency";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-screen flex items-center gradient-mesh pt-20",
        "data-ocid": "hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none",
              style: { background: "rgba(74,44,158,0.12)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl pointer-events-none",
              style: { background: "rgba(212,160,23,0.08)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-5 gap-12 items-center py-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.1 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${sectionLabelClass} inline-block mb-3`, children: "Digital Growth Agency" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SplitHeadline,
                {
                  text: "We Build Digital Growth Systems for Modern Businesses",
                  className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight",
                  lineClassName: "block"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.45 },
                  className: "text-lg font-body text-brand-text-secondary dark:text-white/70 leading-relaxed max-w-xl",
                  children: "From content to conversions — we design, manage, and scale your digital presence with precision and performance."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.55 },
                  className: "text-sm font-body text-brand-text-secondary/80 dark:text-white/50 leading-relaxed max-w-lg",
                  children: "Serving hospitals, doctors, and businesses with structured digital solutions that drive visibility, trust, and measurable growth."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.65 },
                  className: "flex flex-wrap gap-4 pt-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticCTA, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        onClick: openModal,
                        whileTap: { scale: 0.97 },
                        className: "group inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-white transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 animate-glow-pulse",
                        style: { background: "#D4A017" },
                        "data-ocid": "hero.book_consultation_button",
                        children: [
                          "Book Consultation",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileTap: { scale: 0.97 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/services",
                        className: "inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold border-2 transition-smooth hover:bg-brand-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40",
                        style: { borderColor: "#2D1B69", color: "#2D1B69" },
                        "data-ocid": "hero.explore_services_link",
                        children: "Explore Services →"
                      }
                    ) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "lg:col-span-2 h-[420px] lg:h-[520px] w-full",
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.3 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Scene3DFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hero3DScene, {}) })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-10 border-y border-brand-border-light dark:border-white/10 bg-white dark:bg-brand-card-dark/50 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 mb-5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-brand-text-secondary dark:text-white/50 tracking-wider uppercase", children: "Trusted by Hospitals, Clinics, and Growing Brands" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-10 ticker-animation",
          style: { width: "max-content" },
          children: [...TRUST_LOGOS, ...TRUST_LOGOS].map((name, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-6 py-3 rounded-xl border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-white/5 shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs font-bold text-brand-purple dark:text-brand-gold", children: name.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-heading font-medium text-brand-text-primary dark:text-white whitespace-nowrap", children: name })
              ]
            },
            `${name}-${i}`
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-brand-bg-light dark:bg-brand-bg-dark",
        "data-ocid": "who-we-help.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${sectionLabelClass} block mb-3`, children: "WHO WE HELP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white mb-4", children: "Built for Professionals Who Want to Grow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 max-w-xl mx-auto font-body", children: "We partner with businesses and professionals who value consistency, quality, and long-term growth." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, amount: 0.4 },
              "data-ocid": "who-we-help.list",
              children: WHO_WE_HELP.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  custom: i,
                  variants: cardSpringVariants,
                  transition: { delay: i * 0.1 },
                  whileHover: {
                    y: -8,
                    boxShadow: "0 20px 40px rgba(212,160,23,0.18)"
                  },
                  whileTap: { scale: 0.97 },
                  className: "bg-white dark:bg-brand-card-dark rounded-2xl p-6 border border-brand-border-light dark:border-white/10 shadow-sm cursor-default",
                  "data-ocid": `who-we-help.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: item.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-2 leading-tight", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-brand-text-secondary dark:text-white/60 leading-relaxed", children: item.desc })
                  ]
                },
                item.id
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-white dark:bg-brand-card-dark/30",
        "data-ocid": "services.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${sectionLabelClass} block mb-3`, children: "OUR SERVICES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white mb-4", children: "Complete Digital Growth, Under One System" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 max-w-2xl mx-auto font-body", children: "We don't offer isolated services — we build integrated systems that work together to deliver results." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12",
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, amount: 0.4 },
              "data-ocid": "services.list",
              children: SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: serviceCardSpring,
                  initial: "rest",
                  whileHover: "hover",
                  whileTap: { scale: 0.97 },
                  animate: "rest",
                  className: "group bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-6 border border-brand-border-light dark:border-white/10 transition-smooth cursor-default",
                  style: {
                    willChange: "transform, box-shadow",
                    transitionDelay: `${i * 0.08}s`
                  },
                  "data-ocid": `services.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "text-3xl mb-4 inline-block",
                        whileHover: { scale: 1.15 },
                        transition: { type: "spring", stiffness: 300 },
                        children: svc.emoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-2", children: svc.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-brand-text-secondary dark:text-white/60 mb-4 leading-relaxed", children: svc.desc }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: `/services/${svc.slug}`,
                        className: "inline-flex items-center gap-1 text-sm font-heading font-medium text-brand-gold hover:text-brand-gold-light transition-smooth group-hover:gap-2",
                        "data-ocid": `services.learn_more_link.${i + 1}`,
                        children: [
                          "Learn More",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
                        ]
                      }
                    )
                  ]
                },
                svc.id
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-brand-bg-light dark:bg-brand-bg-dark",
        "data-ocid": "process.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${sectionLabelClass} block mb-3`, children: "OUR PROCESS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white", children: "Our Structured Approach to Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px border-t-2 border-dashed border-brand-gold/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: PROCESS_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: step.dir === "left" ? processSlideLeft : processSlideRight,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, amount: 0.4 },
                transition: { delay: i * 0.15 },
                className: "text-center",
                "data-ocid": `process.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "relative inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-brand-gold/40 mb-5 mx-auto process-circle",
                      style: {
                        background: "linear-gradient(135deg, #D4A017 0%, #F0C040 100%)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-white text-lg", children: step.num })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white text-lg mb-2", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-brand-text-secondary dark:text-white/60 leading-relaxed", children: step.desc })
                ]
              },
              step.num
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-brand-purple", "data-ocid": "advantage.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-white mb-5", children: "More Than an Agency — A Growth Ecosystem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 max-w-2xl mx-auto font-body text-lg leading-relaxed", children: "Unlike traditional agencies, we combine content, marketing, and distribution systems to create compounding growth for your business." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
          children: ADVANTAGE_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: cardSpringVariants,
              transition: { delay: i * 0.1 },
              whileHover: { y: -6 },
              className: "rounded-xl p-5 backdrop-blur-md",
              style: {
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)"
              },
              "data-ocid": `advantage.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: item.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-white mb-2", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-white/60 leading-relaxed", children: item.desc })
              ]
            },
            item.title
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-white dark:bg-brand-card-dark/30",
        "data-ocid": "stats.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${sectionLabelClass} block mb-3`, children: "OUR IMPACT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-brand-text-primary dark:text-white", children: "Focused on Measurable Growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14", children: [
            [
              { target: 50, suffix: "+", label: "Happy Clients" },
              { target: 100, suffix: "+", label: "Projects Delivered" },
              { target: 5, suffix: "+", label: "Industries Served" }
            ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              ScrollReveal,
              {
                delay: i * 0.15,
                className: "text-center bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-8 border-t-4 border-brand-gold shadow-sm",
                "data-ocid": `stats.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl font-bold text-brand-purple dark:text-brand-gold mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: stat.target, suffix: stat.suffix }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading font-medium text-brand-text-secondary dark:text-white/60", children: stat.label })
                ]
              },
              stat.label
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              ScrollReveal,
              {
                delay: 0.45,
                className: "text-center bg-brand-bg-light dark:bg-brand-card-dark rounded-2xl p-8 border-t-4 border-brand-gold shadow-sm",
                "data-ocid": "stats.item.4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl font-bold text-brand-purple dark:text-brand-gold mb-2", children: "Long-term" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading font-medium text-brand-text-secondary dark:text-white/60", children: "Partnerships" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto",
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, amount: 0.4 },
              children: OUTCOMES.map((outcome) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  },
                  className: "flex items-start gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-brand-gold text-lg", children: "✓" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-brand-text-secondary dark:text-white/70 text-sm", children: outcome })
                  ]
                },
                outcome
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-24 overflow-hidden cta-gradient-shift",
        style: { background: "#0D0A1A" },
        "data-ocid": "cta.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none",
              style: {
                background: "radial-gradient(circle, rgba(74,44,158,0.3) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-10 right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none animate-float",
              style: { background: "rgba(212,160,23,0.15)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-10 left-10 w-24 h-24 rounded-full blur-2xl pointer-events-none animate-float",
              style: { background: "rgba(74,44,158,0.2)", animationDelay: "1.5s" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5", children: "Ready to Build Your Digital Presence?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed", children: "Let's create a system that works for your business — consistently and professionally." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticCTA, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: openModal,
                  whileTap: { scale: 0.97 },
                  className: "group inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-white transition-smooth animate-glow-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60",
                  style: { background: "#D4A017" },
                  "data-ocid": "cta.book_consultation_button",
                  children: [
                    "Book a Consultation",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileTap: { scale: 0.97 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/services",
                  className: "inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                  "data-ocid": "cta.get_started_link",
                  children: "Get Started Today →"
                }
              ) })
            ] })
          ] }) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};
