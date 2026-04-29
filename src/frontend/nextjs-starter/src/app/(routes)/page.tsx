import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | NextStarter",
  description:
    "A production-ready Next.js 15 starter with TypeScript, Tailwind CSS v4, dark mode, and a polished UI component library.",
};

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Blazing Fast",
    description:
      "Built on Next.js 15 with Turbopack. Server components, streaming, and ISR deliver sub-second page loads out of the box.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Fully Typed",
    description:
      "TypeScript strict mode throughout. No `any`, no surprises. Catch bugs at compile time, not in production.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Tailwind v4",
    description:
      "CSS-first design tokens with Tailwind CSS v4. No config file needed — all theme variables live in globals.css.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: "Dark Mode",
    description:
      "Persistent dark mode with zero flash. Theme is applied before React hydrates via an inline script in the document head.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9a9 9 0 100 18A9 9 0 0012 3z" />
      </svg>
    ),
    title: "Accessible",
    description:
      "WCAG-compliant components: focus traps, aria labels, keyboard navigation, skip links, and proper heading hierarchy.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO Ready",
    description:
      "Metadata API with title templates, OpenGraph, Twitter cards, and dynamic descriptions. Structured data support built in.",
  },
];

const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "ESLint 9",
  "Prettier 3",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-ocid="home.hero_section"
      >
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-secondary)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Next.js 15 · TypeScript · Tailwind v4
          </div>

          <h1
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Ship{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              faster
            </span>{" "}
            with a production-ready starter
          </h1>

          <p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Everything you need to build a modern web app — TypeScript, Tailwind v4, dark mode,
            accessible UI components, custom hooks, and SEO metadata. Zero boilerplate, maximum
            momentum.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              data-ocid="home.hero.get_started_button"
            >
              Get Started
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-base font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              data-ocid="home.hero.learn_more_button"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section
        className="px-4 py-20 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
        data-ocid="home.features_section"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
              Everything you need
            </h2>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              A complete foundation for building modern, production-grade web apps.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className="rounded-xl border bg-white p-6 transition-shadow hover:shadow-md dark:bg-slate-800 dark:border-slate-700"
                style={{ borderColor: "var(--color-border)" }}
                data-ocid={`home.feature.item.${i + 1}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech stack */}
      <section
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-bg)" }}
        data-ocid="home.tech_stack_section"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            Powered by
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-4 py-1.5 text-sm font-medium"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-secondary)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
