import { i as useSearchParams, r as reactExports, k as useBlogService, u as useConsultationModal, j as jsxRuntimeExports, a as ScrollReveal, s as sectionLabelClass, m as motion, c as containerVariants, A as AnimatePresence, L as Link, f as fadeUpVariants } from "./index-CA0QtfeM.js";
const BACKEND_TO_DISPLAY = {
  SPINE: "Local SEO & Google Business",
  BRAIN: "Healthcare Marketing",
  NEUROLOGY: "Social Media Strategy",
  REHABILITATION: "Digital Marketing",
  GENERAL: "Website & Branding"
};
const DISPLAY_CATEGORIES = [
  "All",
  "Healthcare Marketing",
  "Social Media Strategy",
  "Local SEO & Google Business",
  "Digital Marketing",
  "Influencer Marketing",
  "Website & Branding"
];
const CATEGORY_COLORS = {
  "Healthcare Marketing": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  "Social Media Strategy": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
  "Local SEO & Google Business": "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
  "Digital Marketing": "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
  "Influencer Marketing": "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800",
  "Website & Branding": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800"
};
const CARD_GRADIENTS = [
  "from-brand-purple via-brand-purple-2 to-indigo-600",
  "from-indigo-600 via-purple-600 to-brand-purple-2",
  "from-brand-purple-2 via-violet-600 to-purple-700",
  "from-violet-700 via-brand-purple to-indigo-700",
  "from-purple-600 via-brand-purple-2 to-violet-700",
  "from-indigo-700 via-brand-purple to-violet-600"
];
function getGradient(index) {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
}
const MOCK_POSTS = [
  {
    id: "1",
    slug: "social-media-marketing-transforms-healthcare",
    title: "How Social Media Marketing Transforms Healthcare in India",
    category: "Healthcare Marketing",
    readTime: "5 min",
    excerpt: "Discover how leading hospitals and clinics are leveraging Instagram, Facebook, and YouTube to build patient trust and drive appointments.",
    publishDate: "2025-12-15"
  },
  {
    id: "2",
    slug: "google-business-profile-guide-doctors",
    title: "The Ultimate Guide to Google Business Profile for Doctors",
    category: "Local SEO & Google Business",
    readTime: "8 min",
    excerpt: "A complete step-by-step guide to optimize your Google Business Profile and dominate local search for your medical practice.",
    publishDate: "2025-12-10"
  },
  {
    id: "3",
    slug: "instagram-reels-ideas-hospitals",
    title: "10 Instagram Reels Ideas for Hospitals & Healthcare Brands",
    category: "Social Media Strategy",
    readTime: "6 min",
    excerpt: "Struggling to create engaging reels for your healthcare brand? Here are 10 proven content ideas that drive views and build trust.",
    publishDate: "2025-12-05"
  },
  {
    id: "4",
    slug: "meta-ads-vs-google-ads-clinics",
    title: "Meta Ads vs Google Ads: Which is Better for Clinics?",
    category: "Digital Marketing",
    readTime: "7 min",
    excerpt: "A data-driven comparison of Meta Ads and Google Ads specifically for healthcare providers — find out which delivers better ROI.",
    publishDate: "2025-11-28"
  },
  {
    id: "5",
    slug: "digital-branding-strategy-2025",
    title: "Why Every Business Needs a Digital Branding Strategy in 2025",
    category: "Website & Branding",
    readTime: "4 min",
    excerpt: "Your brand is more than a logo. Learn how digital branding can differentiate your business and build lasting customer loyalty.",
    publishDate: "2025-11-20"
  },
  {
    id: "6",
    slug: "influencer-marketing-healthcare",
    title: "Influencer Marketing for Healthcare: What Works and What Doesn't",
    category: "Influencer Marketing",
    readTime: "6 min",
    excerpt: "Not all influencer collaborations are equal. Learn the proven framework for successful healthcare influencer campaigns.",
    publishDate: "2025-11-15"
  },
  {
    id: "7",
    slug: "local-seo-rank-clinic-google-maps",
    title: "Local SEO Secrets: How to Rank Your Clinic on Google Maps",
    category: "Local SEO & Google Business",
    readTime: "9 min",
    excerpt: "Rank higher on Google Maps and attract more local patients with these proven local SEO strategies specifically for clinics.",
    publishDate: "2025-11-08"
  },
  {
    id: "8",
    slug: "content-calendar-healthcare-social-media",
    title: "Content Calendar Templates for Healthcare Social Media",
    category: "Social Media Strategy",
    readTime: "5 min",
    excerpt: "Download-ready content calendar framework for hospitals and clinics, including post ideas, hashtag strategies, and posting schedules.",
    publishDate: "2025-11-01"
  },
  {
    id: "9",
    slug: "five-star-reviews-medical-practice",
    title: "How to Get More 5-Star Reviews for Your Medical Practice",
    category: "Healthcare Marketing",
    readTime: "4 min",
    excerpt: "Practical strategies to generate authentic 5-star Google reviews that build trust and drive new patient appointments.",
    publishDate: "2025-10-22"
  }
];
function CategoryBadge({
  category,
  hover
}) {
  const colorClass = CATEGORY_COLORS[category] || "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 ${colorClass} ${hover ? "brightness-110 saturate-150" : ""}`,
      children: category
    }
  );
}
function BlogCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-brand-border-light dark:bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 bg-brand-border-light dark:bg-white/10 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-full bg-brand-border-light dark:bg-white/10 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-5/6 bg-brand-border-light dark:bg-white/10 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-2/3 bg-brand-border-light dark:bg-white/10 rounded" })
    ] })
  ] });
}
function BlogCard({ post, index }) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: fadeUpVariants,
      className: "group bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 hover:border-brand-purple/30 dark:hover:border-brand-purple/40 transition-smooth hover:shadow-xl hover:shadow-brand-purple/10 flex flex-col",
      onHoverStart: () => setHovered(true),
      onHoverEnd: () => setHovered(false),
      "data-ocid": `blog.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/blog/${post.slug}`, className: "block overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `h-40 bg-gradient-to-br ${getGradient(index)} relative`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 transition-transform duration-500",
                  style: { transform: hovered ? "scale(1.08)" : "scale(1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.3),transparent_70%)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: post.category, hover: hovered }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/blog/${post.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-base text-brand-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug", children: post.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-brand-text-secondary dark:text-white/60 line-clamp-2 flex-1 leading-relaxed", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-brand-border-light dark:border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-brand-text-secondary dark:text-white/50 font-mono", children: new Date(post.publishDate).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-brand-bg-light dark:bg-white/5 text-brand-text-secondary dark:text-white/60 px-2.5 py-1 rounded-full font-mono", children: [
              post.readTime,
              " read"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function FeaturedBlogCard({
  post,
  index
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { delay: index * 0.12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: `/blog/${post.slug}`,
      className: "group block bg-white dark:bg-brand-card-dark rounded-2xl overflow-hidden border border-brand-border-light dark:border-white/10 hover:border-brand-purple/30 dark:hover:border-brand-purple/40 transition-smooth hover:shadow-xl hover:shadow-brand-purple/10",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": `blog.featured.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `h-48 bg-gradient-to-br ${getGradient(index)} overflow-hidden relative`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 transition-transform duration-500",
                  style: { transform: hovered ? "scale(1.06)" : "scale(1)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.4),transparent_70%)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: post.category, hover: hovered }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-mono", children: [
                post.readTime,
                " read"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading font-semibold text-lg text-brand-text-primary dark:text-white mb-2 line-clamp-2 group-hover:text-brand-purple dark:group-hover:text-brand-gold transition-colors leading-snug", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-brand-text-secondary dark:text-white/60 line-clamp-2 leading-relaxed mb-4", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-brand-gold text-sm font-heading font-semibold group-hover:gap-2.5 transition-all", children: [
            "Read More",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
          ] })
        ] })
      ]
    }
  ) });
}
function InlineCTACard({ onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: fadeUpVariants,
      className: "col-span-full bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-purple/30",
      "data-ocid": "blog.inline_cta",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs font-mono uppercase tracking-widest mb-1", children: "Need Expert Help?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-heading font-semibold text-lg leading-snug", children: "Need help implementing these strategies for your business?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: onOpen,
            whileTap: { scale: 0.97 },
            className: "shrink-0 bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-6 py-3 rounded-full transition-smooth whitespace-nowrap hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse",
            "data-ocid": "blog.inline_cta.book_button",
            children: "Book Consultation →"
          }
        )
      ]
    }
  );
}
const POSTS_PER_PAGE = 9;
function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filterStuck, setFilterStuck] = reactExports.useState(false);
  const sentinelRef = reactExports.useRef(null);
  const blogService = useBlogService();
  const { openModal } = useConsultationModal();
  const selectedCategory = searchParams.get("category") || "All";
  const currentPage = Number(searchParams.get("page") || "1");
  reactExports.useEffect(() => {
    document.title = "Blog — VenIQ Media";
  }, []);
  reactExports.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFilterStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const getAllBlogs = blogService.getAllBlogs;
  const loadBlogs = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [getAllBlogs]);
  reactExports.useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);
  const backendPosts = reactExports.useMemo(
    () => blogs.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      category: BACKEND_TO_DISPLAY[b.category] || b.category,
      readTime: "5 min",
      excerpt: `${b.content.replace(/<[^>]+>/g, "").slice(0, 160)}…`,
      publishDate: b.publishDate
    })),
    [blogs]
  );
  const allPosts = backendPosts.length > 0 ? backendPosts : MOCK_POSTS;
  const featuredPosts = allPosts.slice(0, 3);
  const filteredPosts = selectedCategory === "All" ? allPosts : allPosts.filter((p) => p.category === selectedCategory);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  function setCategory(cat) {
    const next = new URLSearchParams(searchParams);
    if (cat === "All") next.delete("category");
    else next.set("category", cat);
    next.delete("page");
    setSearchParams(next);
  }
  function setPage(p) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(p));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "gradient-mesh py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/4 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-60 h-60 bg-brand-gold/8 rounded-full blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "OUR BLOG" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text-primary dark:text-white mt-3 mb-5 leading-tight", children: [
          "Digital Growth Insights &",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-purple dark:text-brand-gold", children: "Industry Knowledge" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-brand-text-secondary dark:text-white/70 max-w-2xl mx-auto leading-relaxed", children: "Expert insights on social media, healthcare marketing, SEO, and digital growth strategies." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: sentinelRef, className: "h-px" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `sticky top-16 z-40 bg-white/95 dark:bg-brand-bg-dark/95 backdrop-blur-md border-b border-brand-border-light dark:border-white/10 transition-shadow duration-300 ${filterStuck ? "shadow-md" : ""}`,
        "data-ocid": "blog.category_filter",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden", children: DISPLAY_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: () => setCategory(cat),
            whileTap: { scale: 0.95 },
            className: `shrink-0 px-4 py-2 rounded-full text-sm font-heading font-medium transition-smooth border ${selectedCategory === cat ? "bg-brand-purple text-white border-brand-purple shadow-md" : "bg-transparent border-brand-border-light dark:border-white/20 text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5"}`,
            "data-ocid": "blog.filter.tab",
            children: cat
          },
          cat
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-12 space-y-16", children: [
      selectedCategory === "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "blog.featured.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollReveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: "FEATURED POSTS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl font-bold text-brand-text-primary dark:text-white mt-2 mb-8", children: "Must-Read Articles" })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, i)
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedBlogCard, { post, index: i }, post.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "blog.grid.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: sectionLabelClass, children: selectedCategory === "All" ? "ALL ARTICLES" : selectedCategory.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl font-bold text-brand-text-primary dark:text-white mt-2", children: selectedCategory === "All" ? "Browse All Articles" : `Articles on ${selectedCategory}` })
          ] }),
          filteredPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-brand-text-secondary dark:text-white/60 font-mono", children: [
            filteredPosts.length,
            " article",
            filteredPosts.length !== 1 ? "s" : ""
          ] })
        ] }) }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCardSkeleton, {}, i)
        )) }) : filteredPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-20",
            "data-ocid": "blog.grid.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📝" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-xl font-semibold text-brand-text-primary dark:text-white mb-2", children: "No articles yet in this category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-text-secondary dark:text-white/60 mb-6", children: "Check back soon or browse other categories." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCategory("All"),
                  className: "bg-brand-purple text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-smooth hover:bg-brand-purple-2",
                  children: "View All Articles"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.4 },
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: pagedPosts.map((post, i) => {
              const globalIdx = (currentPage - 1) * POSTS_PER_PAGE + i;
              const showCta = (i + 1) % 6 === 0 && i < pagedPosts.length - 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: globalIdx }),
                showCta && /* @__PURE__ */ jsxRuntimeExports.jsx(InlineCTACard, { onOpen: openModal })
              ] }, post.id);
            }) })
          }
        ),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-3 mt-12",
            "data-ocid": "blog.pagination",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: () => setPage(currentPage - 1),
                  disabled: currentPage === 1,
                  whileTap: { scale: 0.95 },
                  className: "px-4 py-2 rounded-full border border-brand-border-light dark:border-white/20 text-sm font-heading font-medium text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed",
                  "data-ocid": "blog.pagination_prev",
                  children: "← Previous"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-brand-text-secondary dark:text-white/60 font-mono px-3", children: [
                "Page ",
                currentPage,
                " of ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: () => setPage(currentPage + 1),
                  disabled: currentPage === totalPages,
                  whileTap: { scale: 0.95 },
                  className: "px-4 py-2 rounded-full border border-brand-border-light dark:border-white/20 text-sm font-heading font-medium text-brand-text-secondary dark:text-white/70 hover:bg-brand-bg-light dark:hover:bg-white/5 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed",
                  "data-ocid": "blog.pagination_next",
                  children: "Next →"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollReveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-gradient-to-br from-brand-purple to-brand-purple-2 rounded-3xl p-10 text-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,160,23,0.5),transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gold-light text-xs font-mono uppercase tracking-widest", children: "GROW YOUR BUSINESS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4", children: "Ready to Implement These Strategies?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 max-w-xl mx-auto mb-8 text-lg", children: "Let our team handle the digital strategy while you focus on your business." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: openModal,
              whileTap: { scale: 0.97 },
              className: "bg-brand-gold hover:bg-brand-gold-light text-white font-heading font-semibold px-8 py-3.5 rounded-full transition-smooth hover:shadow-lg hover:shadow-brand-gold/30 animate-glow-pulse text-base",
              "data-ocid": "blog.bottom_cta.book_button",
              children: "Book a Free Consultation →"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  BlogListPage as default
};
