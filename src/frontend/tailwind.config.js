import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "medical-blue": "#1A6EA8",
        "soft-blue-grey": "#f5f7fa",
        "dark-text": "#12344d",
        brand: {
          purple: "#2D1B69",
          "purple-2": "#4A2C9E",
          gold: "#D4A017",
          "gold-light": "#F0C040",
          "bg-light": "#F8F7FF",
          "bg-dark": "#0D0A1A",
          "card-dark": "#1A1035",
          "border-light": "#E8E3FF",
          "text-primary": "#1A1035",
          "text-secondary": "#6B6B8A",
        },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "var(--font-display)", "serif"],
        heading: ["Sora", "sans-serif"],
        body: ["DM Sans", "var(--font-body)", "sans-serif"],
        mono: ["Space Mono", "var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "purple-glow": "0 0 20px oklch(0.48 0.13 289 / 0.2), 0 0 40px oklch(0.48 0.13 289 / 0.1)",
        "purple-glow-deep": "0 0 30px rgba(45,27,105,0.45), 0 0 60px rgba(45,27,105,0.25), 0 0 100px rgba(74,44,158,0.15)",
        "gold-glow": "0 0 20px oklch(0.63 0.15 72 / 0.3), 0 0 40px oklch(0.63 0.15 72 / 0.15)",
        "gold-glow-deep": "0 0 30px rgba(212,160,23,0.5), 0 0 60px rgba(212,160,23,0.3), 0 0 100px rgba(212,160,23,0.15)",
        "bloom-glow": "0 0 15px rgba(212,160,23,0.4), 0 0 40px rgba(212,160,23,0.2), 0 0 80px rgba(212,160,23,0.1)",
        "card-lift": "0 12px 32px oklch(0.48 0.13 289 / 0.15), 0 4px 12px oklch(0.48 0.13 289 / 0.08)",
        "brand-gold-glow": "0 0 30px rgba(212,160,23,0.45), 0 0 60px rgba(212,160,23,0.25)",
        "brand-purple-glow": "0 0 20px rgba(45,27,105,0.3), 0 0 40px rgba(45,27,105,0.15)",
        "card-hover": "0 20px 40px rgba(45,27,105,0.25), 0 4px 12px rgba(45,27,105,0.12)",
        "pbr-material": "0 8px 24px oklch(0.48 0.13 289 / 0.12), 0 2px 6px oklch(0.48 0.13 289 / 0.08)",
        "pbr-material-hover": "0 16px 48px oklch(0.48 0.13 289 / 0.25), 0 4px 12px oklch(0.48 0.13 289 / 0.15)",
        "bloom-effect": "0 0 40px oklch(0.63 0.15 72 / 0.3), 0 0 80px oklch(0.63 0.15 72 / 0.15)",
        "dof-blur": "0 12px 48px oklch(0.12 0.04 285 / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,160,23,0.4), 0 0 40px rgba(212,160,23,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(212,160,23,0.7), 0 0 80px rgba(212,160,23,0.35), 0 0 120px rgba(212,160,23,0.15)" },
        },
        /* Spring-up: natural overshoot entrance */
        "spring-up": {
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.95)" },
          "60%": { opacity: "1", transform: "translateY(-4px) scale(1.02)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "spring-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "70%": { opacity: "1", transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        /* Headline-line: premium curve entrance with staggered delays */
        "headline-line": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "headline-1": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "headline-2": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "headline-3": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Legacy headline-split keyframes */
        "headline-split-1": {
          "0%": { opacity: "0", transform: "translateY(80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "headline-split-2": {
          "0%": { opacity: "0", transform: "translateY(80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "headline-split-3": {
          "0%": { opacity: "0", transform: "translateY(80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* Slide-in from sides — ±60px premium ease */
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "magnetic-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        "counter": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        /* Scroll-to-top rotation on appear */
        "spin-in": {
          "0%": { opacity: "0", transform: "scale(0.5) rotate(-180deg)" },
          "70%": { transform: "scale(1.1) rotate(10deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        /* WhatsApp bounce */
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "40%": { transform: "translateY(-6px) scale(1.05)" },
          "60%": { transform: "translateY(-3px) scale(1.02)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease",
        "slide-up": "slide-up 0.28s ease",
        "scale-in": "scale-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-up": "fade-up 0.6s ease-out",
        "ticker": "ticker 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "spring-up": "spring-up 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-in": "spring-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.33, 0.66, 0.66, 1)",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.33, 0.66, 0.66, 1)",
        "headline-line": "headline-line 0.8s cubic-bezier(0.33, 0.66, 0.66, 1)",
        "headline-1": "headline-1 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) 0.05s both",
        "headline-2": "headline-2 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) 0.15s both",
        "headline-3": "headline-3 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) 0.25s both",
        "headline-split-1": "headline-split-1 0.8s ease-out 0s",
        "headline-split-2": "headline-split-2 0.8s ease-out 0.1s",
        "headline-split-3": "headline-split-3 0.8s ease-out 0.2s",
        "magnetic-pulse": "magnetic-pulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "counter": "counter 0.6s ease-out",
        "spin-in": "spin-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "bounce-subtle": "bounce-subtle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
