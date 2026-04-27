import { g as useParams, h as useNavigate, r as reactExports, k as useBlogService, u as useConsultationModal, j as jsxRuntimeExports, L as Link, a as ScrollReveal, m as motion, A as AnimatePresence } from "./index-CA0QtfeM.js";
const BACKEND_TO_DISPLAY = {
  SPINE: "Local SEO & Google Business",
  BRAIN: "Healthcare Marketing",
  NEUROLOGY: "Social Media Strategy",
  REHABILITATION: "Digital Marketing",
  GENERAL: "Website & Branding"
};
const CATEGORY_COLORS = {
  "Healthcare Marketing": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
  "Social Media Strategy": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300",
  "Local SEO & Google Business": "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300",
  "Digital Marketing": "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300",
  "Influencer Marketing": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300",
  "Website & Branding": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300"
};
const CARD_GRADIENTS = [
  "from-brand-purple via-brand-purple-2 to-indigo-600",
  "from-indigo-600 via-purple-600 to-brand-purple-2",
  "from-brand-purple-2 via-violet-600 to-purple-700",
  "from-violet-700 via-brand-purple to-indigo-700",
  "from-purple-600 via-brand-purple-2 to-violet-700"
];
const MOCK_POSTS = [
  {
    id: "1",
    slug: "social-media-marketing-transforms-healthcare",
    title: "How Social Media Marketing Transforms Healthcare in India",
    category: "Healthcare Marketing",
    readTime: "5 min",
    excerpt: "Discover how leading hospitals and clinics are leveraging Instagram, Facebook, and YouTube to build patient trust and drive appointments.",
    publishDate: "2025-12-15",
    keyTakeaway: "Hospitals using a consistent social media strategy see up to 3x more online appointment bookings within 6 months of implementation.",
    tags: ["Healthcare Marketing", "Social Media", "Patient Trust", "India"],
    gradientIndex: 0
  },
  {
    id: "2",
    slug: "google-business-profile-guide-doctors",
    title: "The Ultimate Guide to Google Business Profile for Doctors",
    category: "Local SEO & Google Business",
    readTime: "8 min",
    excerpt: "A complete step-by-step guide to optimize your Google Business Profile and dominate local search for your medical practice.",
    publishDate: "2025-12-10",
    keyTakeaway: "A fully optimized Google Business Profile can increase your clinic's local search visibility by 70% and drive significantly more walk-in and appointment-based patients.",
    tags: ["Local SEO", "Google Business", "Doctors", "Clinic Growth"],
    gradientIndex: 1
  },
  {
    id: "3",
    slug: "instagram-reels-ideas-hospitals",
    title: "10 Instagram Reels Ideas for Hospitals & Healthcare Brands",
    category: "Social Media Strategy",
    readTime: "6 min",
    excerpt: "Struggling to create engaging reels for your healthcare brand? Here are 10 proven content ideas that drive views and build trust.",
    publishDate: "2025-12-05",
    keyTakeaway: "Educational reels that address common patient questions consistently outperform promotional content, generating 4x more organic reach for healthcare brands.",
    tags: ["Instagram Reels", "Healthcare Content", "Social Media Strategy"],
    gradientIndex: 2
  },
  {
    id: "4",
    slug: "meta-ads-vs-google-ads-clinics",
    title: "Meta Ads vs Google Ads: Which is Better for Clinics?",
    category: "Digital Marketing",
    readTime: "7 min",
    excerpt: "A data-driven comparison of Meta Ads and Google Ads specifically for healthcare providers — find out which delivers better ROI.",
    publishDate: "2025-11-28",
    keyTakeaway: "For most clinics, Google Ads delivers higher-intent leads while Meta Ads excel at brand awareness — a combined strategy typically yields the best ROI.",
    tags: ["Meta Ads", "Google Ads", "Digital Marketing", "ROI"],
    gradientIndex: 3
  },
  {
    id: "5",
    slug: "digital-branding-strategy-2025",
    title: "Why Every Business Needs a Digital Branding Strategy in 2025",
    category: "Website & Branding",
    readTime: "4 min",
    excerpt: "Your brand is more than a logo. Learn how digital branding can differentiate your business and build lasting customer loyalty.",
    publishDate: "2025-11-20",
    keyTakeaway: "Businesses with a defined digital branding strategy retain customers 33% longer and see significantly higher referral rates than those without one.",
    tags: ["Branding", "Digital Strategy", "Business Growth", "2025"],
    gradientIndex: 4
  },
  {
    id: "6",
    slug: "influencer-marketing-healthcare",
    title: "Influencer Marketing for Healthcare: What Works and What Doesn't",
    category: "Influencer Marketing",
    readTime: "6 min",
    excerpt: "Not all influencer collaborations are equal. Learn the proven framework for successful healthcare influencer campaigns.",
    publishDate: "2025-11-15",
    keyTakeaway: "Micro-influencers with 10k–50k followers in healthcare niches deliver 60% higher engagement rates than macro-influencers for medical and wellness brands.",
    tags: ["Influencer Marketing", "Healthcare", "Campaign Strategy"],
    gradientIndex: 0
  },
  {
    id: "7",
    slug: "local-seo-rank-clinic-google-maps",
    title: "Local SEO Secrets: How to Rank Your Clinic on Google Maps",
    category: "Local SEO & Google Business",
    readTime: "9 min",
    excerpt: "Rank higher on Google Maps and attract more local patients with these proven local SEO strategies specifically for clinics.",
    publishDate: "2025-11-08",
    keyTakeaway: "Clinics that consistently post updates and manage reviews on Google Business Profile rank in the top 3 local results 2x more often than those that don't.",
    tags: [
      "Local SEO",
      "Google Maps",
      "Clinic Marketing",
      "Patient Acquisition"
    ],
    gradientIndex: 1
  },
  {
    id: "8",
    slug: "content-calendar-healthcare-social-media",
    title: "Content Calendar Templates for Healthcare Social Media",
    category: "Social Media Strategy",
    readTime: "5 min",
    excerpt: "Download-ready content calendar framework for hospitals and clinics, including post ideas, hashtag strategies, and posting schedules.",
    publishDate: "2025-11-01",
    keyTakeaway: "Healthcare brands posting 4–5 times per week with a structured content calendar see 45% higher follower growth compared to ad-hoc posting strategies.",
    tags: ["Content Calendar", "Social Media", "Healthcare", "Templates"],
    gradientIndex: 2
  },
  {
    id: "9",
    slug: "five-star-reviews-medical-practice",
    title: "How to Get More 5-Star Reviews for Your Medical Practice",
    category: "Healthcare Marketing",
    readTime: "4 min",
    excerpt: "Practical strategies to generate authentic 5-star Google reviews that build trust and drive new patient appointments.",
    publishDate: "2025-10-22",
    keyTakeaway: "Simply asking patients to leave a review at checkout increases review generation by 300% — timing and the right ask make all the difference.",
    tags: [
      "Reviews",
      "Reputation Management",
      "Healthcare Marketing",
      "Google"
    ],
    gradientIndex: 3
  }
];
const FAQ_ITEMS = [
  {
    q: "How long does it take to see results?",
    a: "Results vary by service — social media typically shows engagement improvement within 4–6 weeks, while SEO results take 3–6 months."
  },
  {
    q: "Do you serve businesses outside of healthcare?",
    a: "Yes! While we specialize in healthcare, we work with businesses, e-commerce brands, and service providers across industries."
  },
  {
    q: "What makes VenIQ Media different from other agencies?",
    a: "We focus on integrated systems — combining content, marketing, and distribution — rather than offering siloed services."
  }
];
const TOC_ITEMS = [
  { id: "why-matters", label: "Why This Matters" },
  { id: "key-strategies", label: "Key Strategies" },
  { id: "implementation-tips", label: "Implementation Tips" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "conclusion", label: "Conclusion" }
];
const POPULAR_TOPICS = [
  "Digital Marketing",
  "Healthcare SEO",
  "Social Media",
  "Content Strategy",
  "Google Business",
  "Influencer Marketing",
  "Brand Strategy",
  "Meta Ads"
];
const SIDEBAR_CATEGORIES = [
  { name: "Healthcare Marketing", count: 3 },
  { name: "Social Media Strategy", count: 2 },
  { name: "Local SEO & Google Business", count: 2 },
  { name: "Digital Marketing", count: 2 },
  { name: "Influencer Marketing", count: 1 },
  { name: "Website & Branding", count: 1 }
];
function CategoryBadge({ category }) {
  const cls = CATEGORY_COLORS[category] || "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${cls}`,
      children: category
    }
  );
}
function FaqAccordion() {
  const [openIdx, setOpenIdx] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "blog.post.faq.section", children: FAQ_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-brand-border-light dark:border-white/10 rounded-xl overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpenIdx(openIdx === i ? null : i),
            className: "w-full flex items-center justify-between px-5 py-4 text-left font-heading font-semibold text-brand-text-primary dark:text-white hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth",
            "data-ocid": `blog.post.faq.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pr-4", children: item.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  animate: { rotate: openIdx === i ? 45 : 0 },
                  transition: { duration: 0.2 },
                  className: "shrink-0 text-brand-gold text-xl leading-none",
                  children: "+"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: openIdx === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25, ease: "easeInOut" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 pt-1 text-brand-text-secondary dark:text-white/70 text-sm leading-relaxed border-t border-brand-border-light dark:border-white/10", children: item.a })
          }
        ) })
      ]
    },
    item.q
  )) });
}
function ArticleContent({ title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-slate dark:prose-invert max-w-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base", children: "In today's competitive digital landscape, businesses and healthcare professionals cannot afford to ignore their online presence. The strategies we're about to explore have been proven across 50+ client engagements, delivering consistent, measurable growth for hospitals, clinics, and modern businesses across India." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "why-matters",
        className: "font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28",
        children: "Why This Matters"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base", children: "The digital revolution has fundamentally changed how patients choose healthcare providers and how customers discover businesses. Over 87% of Indians now search online before making a healthcare decision. Without a strong digital presence, even the most skilled professionals risk remaining invisible to their ideal clients." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base mt-4", children: "This isn't just about having a website or social media account — it's about building a cohesive, trust-driven digital ecosystem that works 24/7 to grow your practice or business." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "h2",
      {
        id: "key-strategies",
        className: "font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28",
        children: [
          "Key Strategies for ",
          title.split(":")[0]
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-3 text-brand-text-secondary dark:text-white/70 text-base", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-brand-text-primary dark:text-white", children: "Establish a consistent brand voice" }),
        " ",
        "— Consistency across all touchpoints builds recognition and trust over time."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-brand-text-primary dark:text-white", children: "Leverage data-driven content" }),
        " ",
        "— Use analytics to understand what resonates with your audience and double down on high-performing content formats."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-brand-text-primary dark:text-white", children: "Optimize for local search intent" }),
        " ",
        "— Most healthcare and service queries are local. Ensure your Google Business Profile and local SEO are airtight."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-brand-text-primary dark:text-white", children: "Build social proof systematically" }),
        " ",
        "— Reviews, testimonials, and case studies convert far better than promotional content."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-brand-text-primary dark:text-white", children: "Integrate all channels" }),
        " ",
        "— A siloed approach to digital marketing leaves significant growth on the table. Integration multiplies results."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "implementation-tips",
        className: "font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28",
        children: "Implementation Tips"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base", children: "Starting can feel overwhelming. The key is to begin with a solid foundation and build systematically. Focus on the 20% of actions that drive 80% of results — typically your Google Business Profile, a consistent social media cadence, and proactive review management form this core foundation for most healthcare and service businesses." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base mt-4", children: "Track your metrics weekly, not monthly. Early data signals help you course-correct before investing too much in a direction that isn't yielding results." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "faq",
        className: "font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-6 scroll-mt-28",
        children: "Frequently Asked Questions"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FaqAccordion, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "conclusion",
        className: "font-display text-2xl font-bold text-brand-text-primary dark:text-white mt-10 mb-4 scroll-mt-28",
        children: "Conclusion"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 leading-relaxed text-base", children: "The path to sustainable digital growth isn't about chasing trends — it's about building integrated systems that compound over time. Whether you're a hospital, a solo practitioner, or a growing business, the fundamentals remain the same: visibility, trust, and consistency. Start today, stay consistent, and let the data guide your evolution." })
  ] });
}
function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = reactExports.useState(null);
  const [mockPost, setMockPost] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [copied, setCopied] = reactExports.useState(false);
  const [subscribeEmail, setSubscribeEmail] = reactExports.useState("");
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const blogService = useBlogService();
  const { openModal } = useConsultationModal();
  const currentSlug = slug ?? "";
  const getBlogBySlug = blogService.getBlogBySlug;
  const loadPost = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBlogBySlug(currentSlug);
      if (data) {
        setBlog(data);
        setMockPost(null);
      } else {
        const mock = MOCK_POSTS.find((p) => p.slug === currentSlug) ?? MOCK_POSTS[0];
        setMockPost(mock);
        setBlog(null);
      }
    } catch {
      const mock = MOCK_POSTS.find((p) => p.slug === currentSlug) ?? MOCK_POSTS[0];
      setMockPost(mock);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [getBlogBySlug, currentSlug]);
  reactExports.useEffect(() => {
    loadPost();
  }, [loadPost]);
  const post = blog ? {
    title: blog.title,
    category: BACKEND_TO_DISPLAY[blog.category] ?? blog.category,
    readTime: "5 min",
    publishDate: blog.publishDate,
    excerpt: blog.content.replace(/<[^>]+>/g, "").slice(0, 200),
    keyTakeaway: `Read this article to learn everything about ${blog.title}.`,
    tags: [blog.category, "Digital Strategy"],
    gradientIndex: 0,
    content: blog.content
  } : mockPost ? {
    ...mockPost,
    content: null
  } : null;
  reactExports.useEffect(() => {
    if (post) document.title = `${post.title} — VenIQ Media`;
  }, [post]);
  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  function handleSubscribe(e) {
    e.preventDefault();
    if (subscribeEmail) {
      setSubscribed(true);
      setSubscribeEmail("");
    }
  }
  const gradIdx = (post == null ? void 0 : post.gradientIndex) ?? 0;
  const currentMockIdx = MOCK_POSTS.findIndex((p) => p.slug === currentSlug);
  const prevPost = currentMockIdx > 0 ? MOCK_POSTS[currentMockIdx - 1] : null;
  const nextPost = currentMockIdx < MOCK_POSTS.length - 1 ? MOCK_POSTS[currentMockIdx + 1] : null;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-10 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-6 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-40 bg-brand-border-light dark:bg-white/10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-3/4 bg-brand-border-light dark:bg-white/10 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-48 bg-brand-border-light dark:bg-white/10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-brand-border-light dark:bg-white/10 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-4 bg-brand-border-light dark:bg-white/10 rounded"
          },
          k
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-brand-border-light dark:bg-white/10 rounded-2xl animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-brand-border-light dark:bg-white/10 rounded-2xl animate-pulse" })
      ] })
    ] }) }) });
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl mb-4", children: "📄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-brand-text-primary dark:text-white mb-4", children: "Article Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 mb-6", children: "This article doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog",
          className: "bg-brand-purple text-white px-6 py-3 rounded-full font-heading font-semibold hover:bg-brand-purple-2 transition-smooth",
          children: "← Back to Blog"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `bg-gradient-to-br ${CARD_GRADIENTS[gradIdx]} h-2 w-full`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 lg:grid-cols-10 gap-10",
        "data-ocid": "blog.post.layout",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "lg:col-span-7", "data-ocid": "blog.post.article", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "nav",
              {
                className: "flex items-center gap-2 text-sm text-brand-text-secondary dark:text-white/60 mb-6 flex-wrap",
                "aria-label": "Breadcrumb",
                "data-ocid": "blog.post.breadcrumb",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:text-brand-purple dark:hover:text-brand-gold transition-colors",
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/blog",
                      className: "hover:text-brand-purple dark:hover:text-brand-gold transition-colors",
                      children: "Blog"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: `/blog?category=${encodeURIComponent(post.category)}`,
                      className: "hover:text-brand-purple dark:hover:text-brand-gold transition-colors",
                      children: post.category
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-brand-text-primary dark:text-white truncate max-w-[200px]",
                      title: post.title,
                      children: post.title
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text-primary dark:text-white leading-tight mb-5", children: post.title }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-2 flex items-center justify-center text-white text-xs font-bold", children: "V" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-heading font-medium text-brand-text-primary dark:text-white", children: "VenIQ Media Team" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-border-light dark:text-white/20", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-brand-text-secondary dark:text-white/60 font-mono", children: new Date(post.publishDate).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-border-light dark:text-white/20", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-brand-bg-light dark:bg-white/5 text-brand-text-secondary dark:text-white/60 px-3 py-1 rounded-full text-xs font-mono", children: [
                post.readTime,
                " read"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: post.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `w-full h-64 rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[gradIdx]} relative overflow-hidden mb-8`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-8xl font-display font-bold select-none", children: "VQ" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "border-l-4 border-brand-gold bg-amber-50 dark:bg-yellow-900/20 rounded-r-xl p-5 mb-8",
                style: { boxShadow: "0 0 16px rgba(212,160,23,0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0 mt-0.5", children: "⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-heading font-bold text-brand-text-primary dark:text-white text-sm mb-1", children: "Key Takeaway:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/70 text-sm leading-relaxed", children: post.keyTakeaway })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl p-5 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-3 text-sm uppercase tracking-wide", children: "Table of Contents" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: TOC_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `#${item.id}`,
                  className: "flex items-center gap-2 text-sm text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-brand-gold transition-colors group relative pl-3",
                  "data-ocid": `blog.post.toc.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-brand-gold font-mono text-xs w-5 shrink-0", children: [
                      "0",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:underline underline-offset-2", children: item.label })
                  ]
                }
              ) }, item.id)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleContent, { title: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-10 bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-7 text-center relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,160,23,0.4),transparent_60%)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs font-mono uppercase tracking-widest mb-2", children: "Ready to grow?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-white mb-2", children: "Ready to implement these strategies?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mb-5", children: "Our team can help you build a complete digital growth system." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: openModal,
                    className: "bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-6 py-3 rounded-full transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse",
                    "data-ocid": "blog.post.mid_cta.book_button",
                    children: "Book a Consultation →"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-2 mb-8",
                "data-ocid": "blog.post.tags",
                children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "px-3 py-1.5 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 rounded-full text-xs font-mono text-brand-text-secondary dark:text-white/60 hover:border-brand-purple/30 hover:text-brand-purple dark:hover:text-brand-gold transition-colors cursor-default",
                    children: [
                      "#",
                      tag.replace(/\s+/g, "")
                    ]
                  },
                  tag
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-wrap items-center gap-3 pb-8 border-b border-brand-border-light dark:border-white/10",
                "data-ocid": "blog.post.share",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-heading font-medium text-brand-text-secondary dark:text-white/60", children: "Share:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-heading font-semibold hover:bg-blue-700 transition-colors",
                      "data-ocid": "blog.post.share.facebook",
                      children: "Facebook"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1.5 px-4 py-2 bg-[#1DA1F2] text-white rounded-full text-xs font-heading font-semibold hover:bg-[#1a91da] transition-colors",
                      "data-ocid": "blog.post.share.twitter",
                      children: "X / Twitter"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1.5 px-4 py-2 bg-[#0077B5] text-white rounded-full text-xs font-heading font-semibold hover:bg-[#006699] transition-colors",
                      "data-ocid": "blog.post.share.linkedin",
                      children: "LinkedIn"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleCopyLink,
                      className: "flex items-center gap-1.5 px-4 py-2 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 text-brand-text-secondary dark:text-white/70 rounded-full text-xs font-heading font-semibold hover:border-brand-purple/30 transition-colors",
                      "data-ocid": "blog.post.share.copy_link",
                      children: copied ? "✓ Copied!" : "Copy Link"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8",
                "data-ocid": "blog.post.navigation",
                children: [
                  prevPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: `/blog/${prevPost.slug}`,
                      className: "group flex flex-col gap-1 p-4 bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl hover:border-brand-purple/30 transition-smooth",
                      "data-ocid": "blog.post.prev_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-brand-text-secondary dark:text-white/50 font-mono", children: "← Previous Article" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors", children: prevPost.title })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                  nextPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: `/blog/${nextPost.slug}`,
                      className: "group flex flex-col gap-1 p-4 bg-white dark:bg-brand-card-dark border border-brand-border-light dark:border-white/10 rounded-xl hover:border-brand-purple/30 transition-smooth text-right sm:items-end",
                      "data-ocid": "blog.post.next_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-brand-text-secondary dark:text-white/50 font-mono", children: "Next Article →" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors", children: nextPost.title })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "aside",
            {
              className: "lg:col-span-3 space-y-6",
              "data-ocid": "blog.post.sidebar",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-3 text-sm", children: "Search Articles" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "search",
                        placeholder: "Search articles...",
                        className: "w-full pl-9 pr-4 py-2.5 rounded-lg border border-brand-border-light dark:border-white/10 bg-brand-bg-light dark:bg-white/5 text-brand-text-primary dark:text-white placeholder:text-brand-text-secondary/50 dark:placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 transition-smooth",
                        "data-ocid": "blog.post.sidebar.search_input",
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            const val = e.target.value.trim();
                            if (val) navigate(`/blog?q=${encodeURIComponent(val)}`);
                          }
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-secondary/50 dark:text-white/30 text-sm", children: "🔍" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm", children: "Categories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: SIDEBAR_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: `/blog?category=${encodeURIComponent(cat.name)}`,
                      className: "flex items-center justify-between text-sm text-brand-text-secondary dark:text-white/60 hover:text-brand-purple dark:hover:text-brand-gold transition-colors group py-1",
                      "data-ocid": "blog.post.sidebar.category.link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:underline underline-offset-2 leading-snug", children: cat.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-brand-bg-light dark:bg-white/5 px-2 py-0.5 rounded-full font-mono shrink-0 ml-2", children: cat.count })
                      ]
                    }
                  ) }, cat.name)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm", children: "Featured Posts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: MOCK_POSTS.slice(0, 3).map((fp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: `/blog/${fp.slug}`,
                      className: "flex items-start gap-3 group",
                      "data-ocid": `blog.post.sidebar.featured.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-14 h-14 rounded-lg shrink-0 bg-gradient-to-br ${CARD_GRADIENTS[fp.gradientIndex]} flex items-center justify-center text-white text-xs font-bold`,
                            children: "VQ"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-heading font-semibold text-brand-text-primary dark:text-white line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug", children: fp.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-brand-text-secondary dark:text-white/50 font-mono mt-0.5 block", children: [
                            fp.readTime,
                            " read"
                          ] })
                        ] })
                      ]
                    },
                    fp.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-white mb-1 text-sm", children: "Stay Updated" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mb-4 leading-relaxed", children: "Get the latest digital marketing insights delivered to your inbox." }),
                  subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-center py-3 text-white/80 text-sm",
                      "data-ocid": "blog.post.sidebar.subscribe.success_state",
                      children: "✅ You're subscribed!"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubscribe, className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        placeholder: "your@email.com",
                        value: subscribeEmail,
                        onChange: (e) => setSubscribeEmail(e.target.value),
                        required: true,
                        className: "w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30",
                        "data-ocid": "blog.post.sidebar.subscribe.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        className: "w-full bg-brand-gold hover:bg-brand-gold-light text-white py-2.5 rounded-lg text-sm font-heading font-semibold transition-smooth",
                        "data-ocid": "blog.post.sidebar.subscribe.submit_button",
                        children: "Subscribe →"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-4 text-sm", children: "Popular Topics" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: POPULAR_TOPICS.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: `/blog?category=${encodeURIComponent(topic)}`,
                      className: "px-3 py-1.5 bg-brand-bg-light dark:bg-white/5 border border-brand-border-light dark:border-white/10 rounded-full text-xs font-mono text-brand-text-secondary dark:text-white/60 hover:border-brand-purple/40 hover:text-brand-purple dark:hover:text-brand-gold transition-colors",
                      "data-ocid": "blog.post.sidebar.topic.link",
                      children: topic
                    },
                    topic
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl border border-brand-border-light dark:border-white/10 p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💡" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-brand-text-primary dark:text-white mb-2 text-sm", children: "Need Help With Your Digital Strategy?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 text-xs mb-4 leading-relaxed", children: "Our team of experts is ready to build a custom digital growth system for your business." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: openModal,
                      className: "w-full bg-brand-gold hover:bg-brand-gold-light text-white py-2.5 rounded-full text-sm font-heading font-semibold transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse",
                      "data-ocid": "blog.post.sidebar.cta.book_button",
                      children: "Book Consultation →"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  BlogPostPage as default
};
