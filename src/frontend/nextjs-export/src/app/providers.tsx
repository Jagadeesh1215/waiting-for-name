"use client";

import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { ConsultationModalProvider } from "@/components/layout/ConsultationModal";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ConsultationModalProvider>{children}</ConsultationModalProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}
