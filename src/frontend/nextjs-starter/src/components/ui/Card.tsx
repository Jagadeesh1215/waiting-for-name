import type React from "react";
import { cn } from "@/lib/utils";

// ── Card root ──────────────────────────────────────────────────────────────────
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm dark:bg-slate-800 dark:border-slate-700",
        className
      )}
      style={{ borderColor: "var(--color-border)" }}
    >
      {children}
    </div>
  );
}

// ── Card Header ───────────────────────────────────────────────────────────────
interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div
      className={cn("border-b px-6 py-4", className)}
      style={{ borderColor: "var(--color-border)" }}
    >
      {children}
    </div>
  );
}

// ── Card Body ─────────────────────────────────────────────────────────────────
interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn("px-6 py-5", className)}>{children}</div>;
}

// ── Card Footer ───────────────────────────────────────────────────────────────
interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div
      className={cn("rounded-b-xl border-t px-6 py-4 bg-gray-50 dark:bg-slate-900/40", className)}
      style={{ borderColor: "var(--color-border)" }}
    >
      {children}
    </div>
  );
}
