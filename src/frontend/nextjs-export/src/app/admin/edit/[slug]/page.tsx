'use client';

import { BlogForm } from '@/components/admin/BlogForm';
import { Toast } from '@/components/admin/Toast';
import { useBlogService } from '@/services/blogService';
import type { Blog, BlogFormData } from '@/types/blog';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type ToastState = { msg: string; type: 'ok' | 'err' } | null;

/* ── Loading spinner ── */
function LoadingState() {
  return (
    <div
      data-ocid="edit.loading_state"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
    >
      <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-medical-blue animate-spin" />
      <p className="text-slate-400 text-sm font-medium">Loading post data…</p>
    </div>
  );
}

/* ── 404 not found ── */
function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <div
      data-ocid="edit.error_state"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center px-6"
    >
      <span className="text-5xl">📄</span>
      <div>
        <p className="text-lg font-bold text-dark-text mb-1">Post not found</p>
        <p className="text-sm text-slate-400 mb-6">
          The article you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <button
          type="button"
          data-ocid="edit.back_button"
          onClick={onBack}
          className="px-6 py-2.5 bg-medical-blue text-white rounded-xl font-semibold text-sm hover:bg-medical-blue/90 transition hover:-translate-y-0.5"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

/* ── EditBlogPage ── */
export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const serviceRef = useRef(useBlogService());

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
  };

  /* Fetch blog on mount */
  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const result = await serviceRef.current.getBlogBySlug(slug);
        if (cancelled) return;
        if (!result) {
          setNotFound(true);
        } else {
          setBlog(result);
        }
      } catch {
        if (!cancelled) {
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleSubmit = async (data: BlogFormData) => {
    if (!slug) return;
    setIsSubmitting(true);
    try {
      await serviceRef.current.updateBlog(slug, data);
      showToast('Post updated successfully!');
      setTimeout(() => router.push('/admin'), 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update post';
      showToast(msg, 'err');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (notFound || !blog)
    return <NotFoundState onBack={() => router.push('/admin')} />;

  const initialData: BlogFormData = {
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    author: blog.author,
    authorDesignation: blog.authorDesignation,
    content: blog.content,
    imageUrl: blog.imageUrl,
    imageAlt: blog.imageAlt,
    publishDate:
      blog.publishDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  };

  return (
    <div data-ocid="edit.page" className="min-h-full bg-soft-blue-grey/30">
      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav
          data-ocid="edit.breadcrumb"
          className="flex items-center gap-1.5 text-sm mb-6"
          aria-label="Breadcrumb"
        >
          <button
            type="button"
            data-ocid="edit.dashboard_link"
            onClick={() => router.push('/admin')}
            className="text-medical-blue font-semibold hover:underline underline-offset-2 transition"
          >
            Dashboard
          </button>
          <span className="text-slate-300" aria-hidden="true">
            /
          </span>
          <span className="text-dark-text font-medium">Edit Post</span>
        </nav>

        {/* Page heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-dark-text leading-tight">
            Edit Post
          </h1>
          <p
            className="text-sm text-slate-400 mt-1 max-w-lg truncate"
            title={blog.title}
          >
            {blog.title}
          </p>
        </div>

        {/* Form */}
        <BlogForm
          isEdit
          initialData={initialData}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin')}
        />
      </div>

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
