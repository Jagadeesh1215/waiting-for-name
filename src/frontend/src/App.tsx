import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import { ConsultationModalProvider } from "@/components/public/ConsultationModal";
import { PublicLayout } from "@/components/public/PublicLayout";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Admin pages (eager)
import CreateBlogPageImpl from "@/pages/admin/CreateBlogPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import EditBlogPageComponent from "@/pages/admin/EditBlogPage";

// Public pages (lazy)
const HomePage = lazy(() => import("@/pages/public/HomePage"));
const AboutPage = lazy(() => import("@/pages/public/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/public/ServicesPage"));
const ServiceDetailPage = lazy(
  () => import("@/pages/public/ServiceDetailPage"),
);
const BlogListPage = lazy(() => import("@/pages/public/BlogListPage"));
const BlogPostPage = lazy(() => import("@/pages/public/BlogPostPage"));
const BusinessHubPage = lazy(() => import("@/pages/public/BusinessHubPage"));
const OurWorkPage = lazy(() => import("@/pages/public/OurWorkPage"));

/* ── Admin layout shell ── */
function AdminLayout() {
  return (
    <div className="min-h-screen bg-soft-blue-grey">
      <TopBar />
      <div className="flex min-h-[calc(100vh-64px)] pt-16">
        <aside className="w-60 shrink-0 border-r border-slate-200 bg-soft-blue-grey fixed top-16 bottom-0 left-0 overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="flex-1 min-w-0 ml-60 overflow-y-auto min-h-[calc(100vh-64px)] bg-soft-blue-grey/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ── Loading fallback ── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg-light dark:bg-brand-bg-dark">
      <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/* ── App root ── */
export default function App() {
  return (
    <DarkModeProvider>
      <ConsultationModalProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <HomePage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <AboutPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <ServicesPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <ServiceDetailPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/blog"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <BlogListPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <BlogPostPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/business-hub"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <BusinessHubPage />
                  </Suspense>
                </PublicLayout>
              }
            />
            <Route
              path="/our-work"
              element={
                <PublicLayout>
                  <Suspense fallback={<PageLoader />}>
                    <OurWorkPage />
                  </Suspense>
                </PublicLayout>
              }
            />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="create" element={<CreateBlogPageImpl />} />
              <Route path="edit/:slug" element={<EditBlogPageComponent />} />
            </Route>

            {/* 404 — unknown routes redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ConsultationModalProvider>
    </DarkModeProvider>
  );
}
