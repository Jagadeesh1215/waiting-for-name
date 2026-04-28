'use client';

import { LayoutDashboard, PenSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    to: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
    ocid: 'sidebar.dashboard.link',
  },
  {
    to: '/admin/create',
    label: 'New Post',
    icon: PenSquare,
    exact: false,
    ocid: 'sidebar.create.link',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col h-full pt-4 pb-6 px-3 gap-1"
      aria-label="Admin navigation"
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
        Navigation
      </p>
      {NAV_ITEMS.map(({ to, label, icon: Icon, exact, ocid }) => {
        const isActive = exact ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            href={to}
            data-ocid={ocid}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-smooth ${
              isActive
                ? 'bg-[#1A6EA8]/10 text-[#1A6EA8]'
                : 'text-slate-500 hover:bg-slate-100 hover:text-[#12344d]'
            }`}
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
