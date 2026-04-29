import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | NextStarter",
  description:
    "Learn about the NextStarter project — a production-ready Next.js 15 starter built with TypeScript, Tailwind CSS v4, and modern best practices.",
};

const techItems = [
  {
    name: "Next.js 15",
    description: "App Router, Server Components, streaming, image optimization, and built-in SEO.",
  },
  {
    name: "TypeScript 5",
    description: "Strict mode across the entire codebase — no `any`, no runtime surprises.",
  },
  {
    name: "Tailwind CSS v4",
    description: "CSS-first approach with design tokens in CSS custom properties. Zero config file.",
  },
  {
    name: "React 19",
    description: "Latest React with concurrent features, use() hook, and optimized transitions.",
  },
  {
    name: "ESLint 9 + Prettier",
    description: "Flat config ESLint with Next.js rules. Prettier for consistent formatting.",
  },
  {
    name: "Custom Hooks",
    description: "useLocalStorage, useDebounce, useMediaQuery — SSR-safe and fully typed.",
  },
];

const values = [
  {
    title: "Developer Experience",
    description:
      "Absolute imports, strict TypeScript, hot module replacement, and a clean folder structure make working in this codebase a pleasure.",
  },
  {
    title: "Production Quality",
    description:
      "SEO metadata, dark mode without FOUC, accessible components, error boundaries, and proper loading states — all included.",
  },
  {
    title: "Zero Bloat",
    description:
      "Only what you actually need. No heavy component libraries, no opinionated state managers, no lock-in. Add what you need, nothing more.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-ocid="about.hero_section"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NextStarter
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            An opinionated yet flexible starting point for building modern web applications. Skip
            the boilerplate and focus on your product from day one.
          </p>
        </div>
      </section>

      {/* About section */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        data-ocid="about.story_section"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-6 text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Why this starter?
          </h2>
          <div className="space-y-4" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              Every new project starts with the same setup ritual — configure TypeScript, install
              Tailwind, wire up ESLint, add dark mode, build a button component. It wastes hours
              before you write a single line of real product code.
            </p>
            <p>
              NextStarter codifies five years of Next.js production experience into a single
              starting point. The design system is CSS-first with Tailwind v4, so you get full
              control over your tokens without maintaining a separate config file.
            </p>
            <p>
              Every component is built for accessibility and keyboard navigation. Every hook is
              SSR-safe. The dark mode is zero-flash. The TypeScript is strict. This is the starter
              we wished existed.
            </p>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-ocid="about.tech_section"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-10 text-center text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Tech stack
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techItems.map((item, i) => (
              <div
                key={item.name}
                className="rounded-xl border p-5 dark:border-slate-700"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
                data-ocid={`about.tech.item.${i + 1}`}
              >
                <h3
                  className="mb-2 font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        data-ocid="about.values_section"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-10 text-center text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Our principles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className="text-center" data-ocid={`about.value.item.${i + 1}`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/30">
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
