import { FloatingComponents } from "@/components/public/FloatingComponents";
import { Footer } from "@/components/public/Footer";
import { Navbar } from "@/components/public/Navbar";
import { ScrollProgressBar } from "@/lib/animations";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      {/* Scroll progress indicator — gold gradient line at top */}
      <ScrollProgressBar />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.28,
              ease: [0.33, 0.66, 0.66, 1],
            },
          }}
          exit={{
            opacity: 0,
            y: -8,
            transition: {
              duration: 0.18,
              ease: "easeIn",
            },
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <FloatingComponents />
    </div>
  );
}
