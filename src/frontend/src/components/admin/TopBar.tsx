import { BookOpenCheck } from "lucide-react";

export function TopBar() {
  return (
    <header
      data-ocid="topbar"
      className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-xs"
    >
      {/* Left — logo + title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#1A6EA8] flex items-center justify-center text-white">
          <BookOpenCheck size={16} strokeWidth={2.5} />
        </div>
        <span className="text-base font-extrabold text-[#12344d] tracking-tight">
          Blog Admin
        </span>
      </div>

      {/* Right — avatar placeholder */}
      <button
        type="button"
        data-ocid="topbar.avatar_button"
        aria-label="User menu"
        className="w-9 h-9 rounded-full bg-[#1A6EA8]/10 border border-[#1A6EA8]/20 flex items-center justify-center text-[#1A6EA8] text-sm font-bold hover:bg-[#1A6EA8]/20 transition-smooth"
      >
        A
      </button>
    </header>
  );
}
