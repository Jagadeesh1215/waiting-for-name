import type React from "react";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export type ChangeType = "positive" | "negative" | "neutral";

export interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon?: React.ReactNode;
}

export type ActivityStatus = "success" | "warning" | "danger" | "info";

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  status: ActivityStatus;
}
