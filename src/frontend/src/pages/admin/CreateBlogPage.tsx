import { BlogForm } from "@/components/admin/BlogForm";
import { Toast } from "@/components/admin/Toast";
import { useBlogService } from "@/services/blogService";
import type { BlogFormData } from "@/types/blog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { createBlog } = useBlogService();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "err";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
  };

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      await createBlog(data);
      showToast("Post published successfully!");
      setTimeout(() => navigate("/admin"), 1200);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      showToast(message, "err");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-ocid="create.page" className="min-h-full bg-soft-blue-grey/30">
      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm mb-6"
          aria-label="Breadcrumb"
        >
          <button
            type="button"
            data-ocid="create.breadcrumb_dashboard.link"
            onClick={() => navigate("/admin")}
            className="text-medical-blue font-semibold hover:underline underline-offset-2 transition-colors"
          >
            Dashboard
          </button>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <span className="text-dark-text font-medium">New Post</span>
        </nav>

        {/* Page heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-dark-text leading-tight">
            Create New Post
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fill in the details, write your content, and publish with
            confidence.
          </p>
        </div>

        {/* Form */}
        <BlogForm
          isEdit={false}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin")}
        />
      </div>

      {/* Toast */}
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
