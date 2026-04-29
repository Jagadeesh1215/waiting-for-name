"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { StatCard, ActivityItem } from "@/types";

const stats: StatCard[] = [
  {
    label: "Total Users",
    value: "1,284",
    change: "+12%",
    changeType: "positive",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Revenue",
    value: "$42,900",
    change: "+8.2%",
    changeType: "positive",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Active Projects",
    value: "64",
    change: "-3",
    changeType: "negative",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    label: "Uptime",
    value: "99.9%",
    change: "Stable",
    changeType: "neutral",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const activity: ActivityItem[] = [
  { id: "1", user: "Alice Johnson", action: "Created project", target: "Alpha Dashboard", time: "2 min ago", status: "success" },
  { id: "2", user: "Bob Martinez", action: "Deployed build", target: "v2.4.1", time: "18 min ago", status: "success" },
  { id: "3", user: "Carol White", action: "Reported issue", target: "Login flow bug", time: "1 hr ago", status: "warning" },
  { id: "4", user: "Dan Kim", action: "Removed member", target: "Emma Taylor", time: "3 hr ago", status: "danger" },
  { id: "5", user: "Eve Thompson", action: "Updated settings", target: "Billing plan", time: "Yesterday", status: "info" },
];

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export function DashboardClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleModalSubmit = () => {
    if (!inputValue.trim()) {
      setInputError("Please enter a project name.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalOpen(false);
      setInputValue("");
      setInputError("");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
      data-ocid="dashboard.page"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--color-text-primary)" }}>
              Dashboard
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Welcome back! Here&apos;s what&apos;s happening.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setModalOpen(true)}
            data-ocid="dashboard.new_project_button"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-ocid="dashboard.stats_section">
          {stats.map((stat, i) => (
            <Card key={stat.label} data-ocid={`dashboard.stat.item.${i + 1}`}>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                      {stat.value}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-600 dark:text-green-400"
                          : stat.changeType === "negative"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    {stat.icon}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity table */}
          <div className="lg:col-span-2" data-ocid="dashboard.activity_section">
            <Card>
              <CardHeader>
                <h2 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Recent Activity
                </h2>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                      {["User", "Action", "Target", "Time", "Status"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((item, i) => (
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/30"
                        style={{ borderBottom: "1px solid var(--color-border)" }}
                        data-ocid={`dashboard.activity.item.${i + 1}`}
                      >
                        <td className="px-6 py-3 font-medium" style={{ color: "var(--color-text-primary)" }}>
                          {item.user}
                        </td>
                        <td className="px-6 py-3" style={{ color: "var(--color-text-secondary)" }}>
                          {item.action}
                        </td>
                        <td className="px-6 py-3" style={{ color: "var(--color-text-secondary)" }}>
                          {item.target}
                        </td>
                        <td className="px-6 py-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                          {item.time}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Component demos */}
          <div className="space-y-6" data-ocid="dashboard.components_section">
            <Card>
              <CardHeader>
                <h2 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  UI Components
                </h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm" data-ocid="dashboard.demo.primary_button">Primary</Button>
                  <Button variant="secondary" size="sm" data-ocid="dashboard.demo.secondary_button">Secondary</Button>
                  <Button variant="ghost" size="sm" data-ocid="dashboard.demo.ghost_button">Ghost</Button>
                  <Button variant="danger" size="sm" data-ocid="dashboard.demo.danger_button">Danger</Button>
                </div>
                <Button variant="primary" size="sm" isLoading data-ocid="dashboard.demo.loading_button">
                  Loading
                </Button>
                <Input
                  label="Project name"
                  placeholder="e.g. My Awesome App"
                  helperText="Used in your project URL"
                  data-ocid="dashboard.demo.input"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  error="Invalid email address"
                  data-ocid="dashboard.demo.input_error"
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  Open Modal Demo
                </h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  The Modal component supports focus trapping, Escape key close, backdrop dismiss,
                  and scroll locking.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setModalOpen(true)}
                  data-ocid="dashboard.open_modal_button"
                >
                  Open Modal
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setInputError("");
          setInputValue("");
        }}
        title="Create New Project"
        size="md"
      >
        <div className="space-y-4" data-ocid="dashboard.modal">
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Fill in the details below to create your new project.
          </p>
          <Input
            label="Project Name"
            placeholder="My Awesome Project"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (inputError) setInputError("");
            }}
            error={inputError}
            required
            data-ocid="dashboard.modal.project_name_input"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setInputError("");
                setInputValue("");
              }}
              data-ocid="dashboard.modal.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleModalSubmit}
              isLoading={isLoading}
              data-ocid="dashboard.modal.submit_button"
            >
              Create Project
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
