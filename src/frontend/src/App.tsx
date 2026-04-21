import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import CreateBlogPageImpl from "@/pages/admin/CreateBlogPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import EditBlogPageComponent from "@/pages/admin/EditBlogPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

/* ── Admin layout shell ── */
function AdminLayout() {
  return (
    <div className="min-h-screen bg-soft-blue-grey">
      <TopBar />
      <div className="flex min-h-[calc(100vh-64px)] pt-16">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 border-r border-slate-200 bg-soft-blue-grey fixed top-16 bottom-0 left-0 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 ml-60 overflow-y-auto min-h-[calc(100vh-64px)] bg-soft-blue-grey/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ── App root ── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="create" element={<CreateBlogPageImpl />} />
          <Route path="edit/:slug" element={<EditBlogPageComponent />} />
        </Route>
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
