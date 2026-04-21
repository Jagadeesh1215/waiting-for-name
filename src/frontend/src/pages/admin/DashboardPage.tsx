import { CategoryBadge } from "@/components/admin/CategoryBadge";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { SkeletonRow } from "@/components/admin/SkeletonRow";
import { StatCard } from "@/components/admin/StatCard";
import { Toast } from "@/components/admin/Toast";
import { useBlogService } from "@/services/blogService";
import type { Blog } from "@/types/blog";
import { CATEGORIES } from "@/types/blog";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Icons ── */
function IconSearch() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ── Constants ── */
const PAGE_SIZE = 8;
const ALL_FILTER = "ALL";
const FILTER_CHIPS = [ALL_FILTER, ...CATEGORIES];

const STAT_ACCENTS = {
  total: "#1A6EA8",
  month: "#F5A623",
  categories: "#7c3aed",
} as const;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ════════════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const navigate = useNavigate();
  const blogService = useBlogService();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_FILTER);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
  }, []);

  const blogServiceRef = useRef(blogService);
  const showToastRef = useRef(showToast);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await blogServiceRef.current.getAllBlogs();
      setBlogs(data);
    } catch {
      showToastRef.current("Failed to load blogs", "err");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  /* ── Derived state ── */
  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = category === ALL_FILTER || b.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [blogs, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const thisMonth = new Date().getMonth();
    return [
      { label: "Total Posts", value: blogs.length, accent: STAT_ACCENTS.total },
      {
        label: "This Month",
        value: blogs.filter(
          (b) => new Date(b.publishDate).getMonth() === thisMonth,
        ).length,
        accent: STAT_ACCENTS.month,
      },
      {
        label: "Categories",
        value: new Set(blogs.map((b) => b.category)).size,
        accent: STAT_ACCENTS.categories,
      },
    ];
  }, [blogs]);

  /* ── Delete handler ── */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await blogService.deleteBlog(deleteTarget.slug);
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      showToast("Post deleted successfully");
    } catch {
      showToast("Failed to delete post", "err");
    } finally {
      setDeleteTarget(null);
    }
  };

  /* ── Search / category change resets page ── */
  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }
  function handleCategoryChange(cat: string) {
    setCategory(cat);
    setPage(1);
  }

  /* ════════════════════════════════════════════════════════════════════════ */
  return (
    <div data-ocid="dashboard.page" className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-dark-text leading-tight">
              Blog Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {blogs.length} published articles across{" "}
              {new Set(blogs.map((b) => b.category)).size} categories
            </p>
          </div>
          <button
            type="button"
            data-ocid="dashboard.new_post_button"
            onClick={() => navigate("/admin/create")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-medical-blue hover:bg-medical-blue/90 text-white text-sm font-semibold rounded-xl shadow-md shadow-medical-blue/20 transition-smooth hover:-translate-y-0.5"
          >
            <IconPlus /> New Post
          </button>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <StatCard label={s.label} value={s.value} accent={s.accent} />
            </motion.div>
          ))}
        </div>

        {/* ── Search ── */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 flex pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              data-ocid="dashboard.search_input"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-dark-text placeholder-slate-300 outline-none focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 transition-smooth"
              placeholder="Search by title or author…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* ── Category filter chips ── */}
        <div className="flex gap-2 flex-wrap mb-5">
          {FILTER_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              data-ocid={`dashboard.filter.${c.toLowerCase()}`}
              onClick={() => handleCategoryChange(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-smooth select-none ${
                category === c
                  ? "bg-medical-blue text-white border-medical-blue"
                  : "bg-soft-blue-grey text-medical-blue border-blue-100 hover:border-medical-blue"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-soft-blue-grey/60 border-b border-slate-100">
                {["Image", "Title / Author", "Category", "Date", "Actions"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap ${
                        i === 4 ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are purely positional
                  <SkeletonRow key={i} />
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-20 text-center text-slate-400"
                    data-ocid="dashboard.empty_state"
                  >
                    <p className="text-lg font-bold mb-1">No posts found</p>
                    <p className="text-sm">
                      Try changing your filters or create a new post.
                    </p>
                  </td>
                </tr>
              ) : (
                paginated.map((blog, index) => (
                  <motion.tr
                    key={blog.id}
                    data-ocid={`dashboard.blog.item.${index + 1}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="border-b border-slate-50 hover:bg-soft-blue-grey/20 transition-smooth"
                  >
                    {/* Image */}
                    <td className="px-5 py-3.5">
                      <img
                        src={blog.imageUrl || "/placeholder.svg"}
                        alt={blog.imageAlt || blog.title}
                        className="w-14 h-10 rounded-lg object-cover bg-slate-100"
                      />
                    </td>

                    {/* Title / Author */}
                    <td className="px-5 py-3.5 max-w-[260px]">
                      <span className="block font-semibold text-dark-text truncate">
                        {blog.title}
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {blog.author}
                        {blog.authorDesignation
                          ? ` · ${blog.authorDesignation}`
                          : ""}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <CategoryBadge category={blog.category} />
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap text-xs">
                      {formatDate(blog.publishDate)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          data-ocid={`dashboard.view_button.${index + 1}`}
                          onClick={() => navigate(`/admin/edit/${blog.slug}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-smooth"
                        >
                          <IconEye /> View
                        </button>
                        <button
                          type="button"
                          data-ocid={`dashboard.edit_button.${index + 1}`}
                          onClick={() => navigate(`/admin/edit/${blog.slug}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-soft-blue-grey text-medical-blue text-xs font-semibold hover:bg-blue-100 transition-smooth"
                        >
                          <IconEdit /> Edit
                        </button>
                        <button
                          type="button"
                          data-ocid={`dashboard.delete_button.${index + 1}`}
                          onClick={() => setDeleteTarget(blog)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-smooth"
                        >
                          <IconTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>

          {/* ── Pagination ── */}
          {!loading && filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-50 text-xs text-slate-400">
              <span>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  data-ocid="dashboard.pagination_prev"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-dark-text hover:border-medical-blue hover:text-medical-blue transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <IconChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: page buttons are positional
                    key={i + 1}
                    type="button"
                    data-ocid={`dashboard.page_button.${i + 1}`}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-lg border text-xs font-bold transition-smooth ${
                      page === i + 1
                        ? "bg-medical-blue border-medical-blue text-white"
                        : "border-slate-200 bg-white text-dark-text hover:border-medical-blue hover:text-medical-blue"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  type="button"
                  data-ocid="dashboard.pagination_next"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-dark-text hover:border-medical-blue hover:text-medical-blue transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <IconChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Delete modal ── */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
