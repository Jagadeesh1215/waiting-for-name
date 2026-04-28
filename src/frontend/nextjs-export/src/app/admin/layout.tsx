'use client';

import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F1F5FA]">
      {/* Fixed top bar */}
      <TopBar />

      {/* Sidebar + main content */}
      <div className="flex pt-16 min-h-screen">
        {/* Fixed sidebar */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 fixed top-16 left-0 bottom-0 bg-white border-r border-slate-200 overflow-y-auto z-30">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-60 min-h-[calc(100vh-4rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
