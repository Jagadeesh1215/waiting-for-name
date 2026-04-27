import { u as useConsultationModal, r as reactExports, j as jsxRuntimeExports, a as ScrollReveal, s as sectionLabelClass, m as motion, c as containerVariants, f as fadeUpVariants, L as Link } from "./index-CA0QtfeM.js";
const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5+", label: "Industries Served" },
  { value: "∞", label: "Long-term Partnerships" }
];
const services = [
  { icon: "📱", name: "Social Media Management" },
  { icon: "⭐", name: "Online Reputation Management" },
  { icon: "💻", name: "Web Design & Development" },
  { icon: "📊", name: "Digital Marketing" },
  { icon: "🌟", name: "Influencer & City Page Marketing" },
  { icon: "🎨", name: "Branding & Design" }
];
const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "We deep-dive into your business, audience, goals, and competitive landscape"
  },
  {
    num: "02",
    title: "Build",
    desc: "We create content, campaigns, and assets tailored to your brand identity"
  },
  {
    num: "03",
    title: "Execute",
    desc: "We manage all platforms, campaigns, and communications on your behalf"
  },
  {
    num: "04",
    title: "Optimize & Grow",
    desc: "We track performance, iterate, and scale what works continuously"
  }
];
const differentiators = [
  {
    icon: "✅",
    title: "Integrated Strategy",
    desc: "Content, marketing & distribution working as one unified system"
  },
  {
    icon: "🏥",
    title: "Healthcare Focus",
    desc: "Dedicated expertise for hospitals, doctors, and medical professionals"
  },
  {
    icon: "🤝",
    title: "Business Hub Network",
    desc: "Strong influencer network and city-level distribution channels"
  },
  {
    icon: "📋",
    title: "Structured Workflows",
    desc: "Consistent execution frameworks for quality and predictability"
  },
  {
    icon: "🛡️",
    title: "Ethical Approach",
    desc: "Compliance-focused strategy that builds long-lasting trust"
  }
];
const infoColumns = [
  {
    title: "Our Network Advantage",
    content: "We have an established network of Business Hub pages, city pages, and verified influencers across India, giving your business instant access to large, targeted audiences.",
    isList: false,
    slideDir: "left"
  },
  {
    title: "Industries We Serve",
    items: [
      "Hospitals & Healthcare",
      "Individual Doctors & Clinics",
      "Businesses & Service Providers",
      "Emerging Brands",
      "E-commerce",
      "Professional Services"
    ],
    isList: true,
    slideDir: "right"
  },
  {
    title: "Our Vision",
    content: "To be India's most trusted digital growth partner for healthcare and businesses — building systems that deliver consistent, measurable, and ethical results.",
    isList: false,
    slideDir: "left"
  },
  {
    title: "Our Mission",
    content: "To combine content, marketing, and distribution into one integrated growth system that helps every client build visibility, credibility, and business growth.",
    isList: false,
    slideDir: "right"
  }
];
const springCard = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 200,
      delay: i * 0.1
    }
  })
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
function AboutPage() {
  const { openModal } = useConsultationModal();
  reactExports.useEffect(() => {
    document.title = "About Us — VenIQ Media";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gradient-mesh py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { direction: "left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "ABOUT US" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-brand-purple dark:text-white mt-3 mb-5 leading-tight", children: "A Digital Growth Partner Built for Modern Businesses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 text-lg leading-relaxed mb-8", children: "We help hospitals, doctors, and businesses build a strong, consistent, and result-driven digital presence through structured systems and strategic execution." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            onClick: openModal,
            whileTap: { scale: 0.97 },
            className: "inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-7 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] animate-glow-pulse",
            "data-ocid": "about.hero.primary_button",
            children: [
              "Let's Grow Together",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-200 group-hover:translate-x-1", children: "→" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { direction: "right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-brand-purple via-brand-purple-2 to-violet-500 flex items-center justify-center shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-purple/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🏢" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 font-heading font-bold text-2xl tracking-wide", children: "VenIQ Media" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mt-1 font-mono", children: "Digital Growth Agency" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 right-6 w-24 h-24 rounded-full bg-brand-gold/10 blur-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 left-8 w-32 h-32 rounded-full bg-violet-400/20 blur-2xl" })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white dark:bg-brand-card-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-14 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ScrollReveal,
        {
          direction: "left",
          className: "space-y-5 text-brand-text-secondary dark:text-white/70 leading-relaxed text-base",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-6", children: "Who We Are" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "VenIQ Media LLP is a full-service digital growth agency founded with one mission — to help modern businesses build a strong, consistent, and result-driven digital presence." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We specialize in serving hospitals, individual doctors, clinics, and growing businesses across India. Our integrated approach combines content creation, digital marketing, and strategic distribution to deliver measurable results." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Our team of specialists in social media, SEO, branding, and digital advertising work as an extension of your team — consistently executing your digital strategy so you can focus on what matters most: your business." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: i,
          variants: springCard,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
          whileHover: {
            y: -4,
            boxShadow: "0 12px 28px rgba(212,160,23,0.18)"
          },
          className: "bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 text-center transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-display font-bold text-brand-gold mb-1", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-brand-text-secondary dark:text-white/60 font-heading", children: stat.label })
          ]
        },
        stat.label
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-brand-bg-light dark:bg-brand-bg-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "WHAT WE DO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3 mb-12", children: "Our Core Services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: services.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: i,
          variants: springCard,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
          whileHover: {
            y: -6,
            boxShadow: "0 16px 32px rgba(45,27,105,0.15)"
          },
          whileTap: { scale: 0.97 },
          className: "bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 text-center transition-smooth cursor-default",
          "data-ocid": "about.services.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: svc.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading font-semibold text-sm text-brand-purple dark:text-white leading-snug", children: svc.name })
          ]
        },
        svc.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white dark:bg-brand-card-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "OUR APPROACH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mt-3", children: "How We Work With You" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
          className: "grid grid-cols-1 md:grid-cols-4 gap-8 relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-5 left-[12%] right-[12%] h-px border-t-2 border-dashed border-brand-gold/40 z-0" }),
            steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: fadeUpVariants,
                transition: { delay: i * 0.1 },
                className: "relative z-10 flex flex-col items-center text-center",
                "data-ocid": `about.approach.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "process-circle w-10 h-10 rounded-full flex items-center justify-center text-white font-mono font-bold text-sm mb-4 shadow-md",
                      style: {
                        background: "linear-gradient(135deg, #D4A017 0%, #F0C040 100%)",
                        boxShadow: "0 0 12px rgba(212,160,23,0.4)"
                      },
                      children: step.num
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-brand-purple dark:text-white mb-2", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-brand-text-secondary dark:text-white/60 leading-relaxed", children: step.desc })
                ]
              },
              step.num
            ))
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-brand-purple dark:bg-brand-bg-dark",
        "data-ocid": "about.differentiators.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { className: "text-center mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-white", children: "What Makes Us Different" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: differentiators.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: i,
              variants: springCard,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, amount: 0.4 },
              whileHover: { y: -4 },
              whileTap: { scale: 0.97 },
              className: "bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center",
              "data-ocid": `about.differentiator.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: d.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-white text-sm mb-1.5", children: d.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs leading-relaxed", children: d.desc })
              ]
            },
            d.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-brand-bg-light dark:bg-brand-bg-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: infoColumns.map((col, i) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          variants: col.slideDir === "left" ? slideLeft : slideRight,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.4 },
          transition: { delay: i * 0.12 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-2xl p-6 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-bold text-brand-gold mb-3 text-sm uppercase tracking-wide", children: col.title }),
            col.isList ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: (_a = col.items) == null ? void 0 : _a.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm text-brand-text-secondary dark:text-white/70",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gold mt-0.5", children: "•" }),
                  item
                ]
              },
              item
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-brand-text-secondary dark:text-white/70 leading-relaxed", children: col.content })
          ] })
        },
        col.title
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 gradient-mesh", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-brand-purple dark:text-white mb-4", children: "Let's Build Your Digital Presence Together" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 mb-8 text-lg", children: "Ready to grow? Let's create a digital strategy that delivers real results for your business." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: openModal,
            whileTap: { scale: 0.97 },
            className: "inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-[0_0_30px_rgba(212,160,23,0.4)]",
            "data-ocid": "about.cta.primary_button",
            children: "Book a Consultation →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileTap: { scale: 0.97 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/blog",
            className: "inline-flex items-center justify-center gap-2 border-2 border-brand-purple dark:border-white/30 text-brand-purple dark:text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:bg-brand-purple/5 dark:hover:bg-white/5",
            "data-ocid": "about.cta.secondary_button",
            children: "Contact Us →"
          }
        ) })
      ] })
    ] }) }) })
  ] });
}
export {
  AboutPage as default
};
