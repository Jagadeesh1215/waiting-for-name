import type { Metadata } from "next";
import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard overview with stats, recent activity, and UI component demos.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
