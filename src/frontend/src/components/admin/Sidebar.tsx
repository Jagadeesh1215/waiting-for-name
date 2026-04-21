import { LayoutDashboard, PenSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
    ocid: "sidebar.dashboard.link",
  },
  {
    to: "/admin/create",
    label: "New Post",
    icon: PenSquare,
    end: false,
    ocid: "sidebar.create.link",
  },
];

export function Sidebar() {
  return (
    <nav
      className="flex flex-col h-full pt-4 pb-6 px-3 gap-1"
      aria-label="Admin navigation"
    >
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
        Navigation
      </p>
      {NAV_ITEMS.map(({ to, label, icon: Icon, end, ocid }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          data-ocid={ocid}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-smooth ${
              isActive
                ? "bg-[#1A6EA8]/10 text-[#1A6EA8]"
                : "text-slate-500 hover:bg-slate-100 hover:text-[#12344d]"
            }`
          }
        >
          <Icon size={17} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
