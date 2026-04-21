import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { BlogFormData } from "@/types/blog";
import { CATEGORIES } from "@/types/blog";

export type { BlogFormData };

/* ── Constants ─────────────────────────────────────────────────── */
const STEPS = ["Basic Info", "Content", "Media"] as const;
type StepIndex = 0 | 1 | 2;
type Errors = Partial<Record<keyof BlogFormData, string>>;

const QUILL_MODULES = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: [1, 2, 3, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "header",
  "list",
  "link",
];

const EMPTY: BlogFormData = {
  title: "",
  slug: "",
  category: "",
  author: "",
  authorDesignation: "",
  content: "",
  imageUrl: "",
  imageAlt: "",
  publishDate: new Date().toISOString().slice(0, 10),
};

/* ── Helpers ────────────────────────────────────────────────────── */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function plainCharCount(html: string): number {
  return stripHtml(html).length;
}

/* ── Shared input class ─────────────────────────────────────────── */
const baseInput =
  "w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-dark-text outline-none transition placeholder:text-slate-300 font-body";

function inputCls(err?: string): string {
  return `${baseInput} ${
    err
      ? "border-red-400 shadow-[0_0_0_3px_rgba(225,29,72,.08)]"
      : "border-slate-200 focus:border-medical-blue focus:shadow-[0_0_0_3px_rgba(26,110,168,.1)]"
  }`;
}

/* ── Field wrapper ──────────────────────────────────────────────── */
function Field({
  label,
  name,
  required,
  helper,
  errors,
  children,
}: {
  label: string;
  name: keyof BlogFormData;
  required?: boolean;
  helper?: string;
  errors: Errors;
  children: React.ReactNode;
}) {
  const fieldId = `field-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-[11px] font-bold text-slate-500 uppercase tracking-wider"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {errors[name] ? (
          <motion.p
            key="err"
            data-ocid={`${name}.field_error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-red-500 text-[12px] overflow-hidden"
          >
            {errors[name]}
          </motion.p>
        ) : helper ? (
          <p key="helper" className="text-slate-400 text-[12px]">
            {helper}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ── BlogForm Props ─────────────────────────────────────────────── */
interface BlogFormProps {
  isEdit?: boolean;
  initialData?: BlogFormData;
  isSubmitting?: boolean;
  onSubmit: (data: BlogFormData) => void;
  onCancel: () => void;
}

/* ════════════════════════════════════════════════════════════════
   BlogForm
════════════════════════════════════════════════════════════════ */
export function BlogForm({
  isEdit = false,
  initialData,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: BlogFormProps) {
  const [step, setStep] = useState<StepIndex>(0);
  const [form, setForm] = useState<BlogFormData>(initialData ?? EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setErrors({});
    }
  }, [initialData]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);
  const charCount = useMemo(() => plainCharCount(form.content), [form.content]);

  /* ── Validation ── */
  const validateField = useCallback(
    (
      field: keyof BlogFormData,
      value: string,
      source?: BlogFormData,
    ): string => {
      const data = source ?? form;
      switch (field) {
        case "title":
          if (!value.trim()) return "Title is required.";
          if (value.trim().length < 8)
            return "Title must be at least 8 characters.";
          if (value.trim().length > 120)
            return "Title must be under 120 characters.";
          return "";
        case "slug":
          if (!value.trim()) return "Slug is required.";
          if (!/^[a-z0-9-]+$/.test(value))
            return "Only lowercase letters, numbers & hyphens.";
          if (value.length < 3) return "Slug must be at least 3 characters.";
          return "";
        case "category":
          if (!value) return "Please select a category.";
          if (!(CATEGORIES as readonly string[]).includes(value))
            return "Invalid category.";
          return "";
        case "author":
          if (!value.trim()) return "Author is required.";
          if (value.trim().length < 2) return "Must be at least 2 characters.";
          if (value.trim().length > 50) return "Must be under 50 characters.";
          return "";
        case "authorDesignation":
          if (value.trim().length > 80) return "Must be under 80 characters.";
          return "";
        case "content": {
          const chars = plainCharCount(value);
          if (chars === 0) return "Content is required.";
          if (chars < 150)
            return `Need at least 150 characters (${chars} so far).`;
          return "";
        }
        case "imageAlt":
          if (data.imageUrl && !value.trim())
            return "Alt text is required when an image is uploaded.";
          if (value && value.trim().length < 5)
            return "Alt text must be at least 5 characters.";
          if (value && value.trim().length > 120)
            return "Alt text must be under 120 characters.";
          return "";
        case "publishDate":
          if (!value) return "Date is required.";
          if (Number.isNaN(Date.parse(value))) return "Enter a valid date.";
          return "";
        default:
          return "";
      }
    },
    [form],
  );

  const setField = useCallback(
    (field: keyof BlogFormData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "title") next.slug = slugify(value);

        setErrors((prevErrors) => {
          const nextErrors: Errors = {
            ...prevErrors,
            [field]: validateField(field, value, next),
          };
          if (field === "title")
            nextErrors.slug = validateField("slug", next.slug, next);
          if (field === "imageUrl")
            nextErrors.imageAlt = validateField(
              "imageAlt",
              next.imageAlt,
              next,
            );
          return nextErrors;
        });

        return next;
      });
    },
    [validateField],
  );

  const validateStep = useCallback(
    (s: number): boolean => {
      const stepErrors: Errors = {};
      if (s === 0) {
        stepErrors.title = validateField("title", form.title);
        stepErrors.slug = validateField("slug", form.slug);
        stepErrors.category = validateField("category", form.category);
        stepErrors.author = validateField("author", form.author);
        stepErrors.authorDesignation = validateField(
          "authorDesignation",
          form.authorDesignation,
        );
        stepErrors.publishDate = validateField("publishDate", form.publishDate);
      }
      if (s === 1) {
        stepErrors.content = validateField("content", form.content);
      }
      if (s === 2) {
        stepErrors.imageAlt = validateField("imageAlt", form.imageAlt);
      }

      const filtered = Object.fromEntries(
        Object.entries(stepErrors).filter(([, v]) => v),
      ) as Errors;
      setErrors((p) => ({ ...p, ...filtered }));
      return Object.keys(filtered).length === 0;
    },
    [form, validateField],
  );

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((p) => Math.min(p + 1, STEPS.length - 1) as StepIndex);
  };

  const handleBack = () => {
    if (step === 0) {
      onCancel();
      return;
    }
    setStep((p) => Math.max(p - 1, 0) as StepIndex);
  };

  const handleSubmit = () => {
    const ok = [0, 1, 2].map(validateStep).every(Boolean);
    if (!ok) return;
    onSubmit(form);
  };

  /* ── Render ── */
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        {/* ── Header / Step indicator ── */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-100 bg-gradient-to-b from-soft-blue-grey/60 to-transparent">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-extrabold text-dark-text leading-tight">
                {isEdit ? "Edit Blog Post" : "Create New Post"}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isEdit
                  ? "Update your existing article"
                  : "Write clearly, validate fast, publish with confidence"}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-medical-blue bg-soft-blue-grey px-3 py-1.5 rounded-full border border-blue-100">
              Step {step + 1} / {STEPS.length}
            </span>
          </div>

          {/* Step pills */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {STEPS.map((label, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <div
                  key={label}
                  data-ocid={`form.step.${i + 1}`}
                  className={`py-1.5 px-3 rounded-xl text-center text-[12px] font-bold border transition-all ${
                    done
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : active
                        ? "bg-blue-50 border-blue-200 text-medical-blue"
                        : "bg-white border-slate-200 text-slate-400"
                  }`}
                >
                  {done ? `✓ ${label}` : label}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full bg-gradient-to-r from-medical-blue to-sky-400"
            />
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-6 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              {/* ════ Step 0 – Basic Info ════ */}
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title – full width */}
                  <div className="md:col-span-2">
                    <Field
                      label="Title"
                      name="title"
                      required
                      errors={errors}
                      helper="Clear and descriptive. 8–120 characters."
                    >
                      <input
                        id="field-title"
                        data-ocid="form.title.input"
                        className={inputCls(errors.title)}
                        value={form.title}
                        onChange={(e) => setField("title", e.target.value)}
                        placeholder="e.g. 7 signs of early spinal nerve compression"
                      />
                    </Field>
                  </div>

                  {/* Slug – read-only */}
                  <div className="md:col-span-2">
                    <Field
                      label="Slug"
                      name="slug"
                      required
                      errors={errors}
                      helper={
                        isEdit
                          ? "Slug is locked in edit mode."
                          : "Auto-generated from title."
                      }
                    >
                      <input
                        id="field-slug"
                        data-ocid="form.slug.input"
                        className={`${inputCls(errors.slug)} bg-slate-50 text-slate-400 cursor-not-allowed`}
                        value={form.slug}
                        readOnly
                      />
                    </Field>
                  </div>

                  {/* Category */}
                  <Field
                    label="Category"
                    name="category"
                    required
                    errors={errors}
                  >
                    <select
                      id="field-category"
                      data-ocid="form.category.select"
                      className={inputCls(errors.category)}
                      value={form.category}
                      onChange={(e) => setField("category", e.target.value)}
                    >
                      <option value="">Select category…</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Publish Date */}
                  <Field
                    label="Publish Date"
                    name="publishDate"
                    required
                    errors={errors}
                  >
                    <input
                      id="field-publishDate"
                      type="date"
                      data-ocid="form.publish_date.input"
                      className={inputCls(errors.publishDate)}
                      value={form.publishDate}
                      onChange={(e) => setField("publishDate", e.target.value)}
                    />
                  </Field>

                  {/* Author */}
                  <Field label="Author" name="author" required errors={errors}>
                    <input
                      id="field-author"
                      data-ocid="form.author.input"
                      className={inputCls(errors.author)}
                      value={form.author}
                      onChange={(e) => setField("author", e.target.value)}
                      placeholder="Doctor or writer name"
                    />
                  </Field>

                  {/* Designation */}
                  <Field
                    label="Author Designation"
                    name="authorDesignation"
                    errors={errors}
                  >
                    <input
                      id="field-authorDesignation"
                      data-ocid="form.author_designation.input"
                      className={inputCls(errors.authorDesignation)}
                      value={form.authorDesignation}
                      onChange={(e) =>
                        setField("authorDesignation", e.target.value)
                      }
                      placeholder="e.g. Consultant Neurologist"
                    />
                  </Field>
                </div>
              )}

              {/* ════ Step 1 – Content ════ */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  {/* Label + char counter */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Content <span className="text-red-500">*</span>
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-colors ${
                        charCount < 150
                          ? "text-red-500 bg-red-50 border-red-100"
                          : "text-emerald-600 bg-emerald-50 border-emerald-100"
                      }`}
                    >
                      {charCount} / 150 chars{" "}
                      {charCount >= 150
                        ? "✓"
                        : `— need ${150 - charCount} more`}
                    </span>
                  </div>

                  {/* Quill editor */}
                  <div
                    data-ocid="form.content.editor"
                    className={`rounded-xl overflow-hidden border transition-shadow ${
                      errors.content
                        ? "border-red-400 shadow-[0_0_0_3px_rgba(225,29,72,.08)]"
                        : "border-slate-200"
                    }`}
                  >
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={(val) => setField("content", val)}
                      modules={QUILL_MODULES}
                      formats={QUILL_FORMATS}
                      placeholder="Start writing your article here…"
                      className="quill-editor-custom"
                    />
                  </div>

                  {/* Content error */}
                  <AnimatePresence>
                    {errors.content && (
                      <motion.p
                        data-ocid="content.field_error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-red-500 text-xs overflow-hidden"
                      >
                        {errors.content}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tip box */}
                  <div className="flex items-start gap-2.5 bg-blue-50/60 border border-blue-100 rounded-xl p-3.5">
                    <span className="text-medical-blue text-base mt-0.5">
                      💡
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-semibold text-medical-blue">
                        Formatting tip:
                      </span>{" "}
                      Use the toolbar for <strong>Bold</strong>, <em>Italic</em>
                      , Underline, Blockquote, Headers, Lists, and Links. Select
                      text to activate inline formatting options.
                    </p>
                  </div>
                </div>
              )}

              {/* ════ Step 2 – Media ════ */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Image upload – 3 cols */}
                  <div className="md:col-span-3">
                    <Field
                      label="Featured Image"
                      name="imageUrl"
                      errors={errors}
                      helper="JPG, PNG or WebP. Displays as the article cover."
                    >
                      <button
                        id="field-imageUrl"
                        type="button"
                        aria-label="Upload featured image"
                        data-ocid="form.image.upload_button"
                        onClick={() => fileRef.current?.click()}
                        className={`w-full rounded-2xl cursor-pointer transition overflow-hidden text-left ${
                          form.imageUrl
                            ? "border border-slate-200 bg-slate-50 p-2"
                            : "border-2 border-dashed border-slate-200 bg-soft-blue-grey/30 hover:bg-soft-blue-grey/60 min-h-[200px] flex items-center justify-center"
                        }`}
                      >
                        {form.imageUrl ? (
                          <div className="relative w-full group">
                            <img
                              src={form.imageUrl}
                              alt={form.imageAlt || "Preview"}
                              className="w-full h-48 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-dark-text/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">
                                Click to replace
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-10 px-6">
                            <div className="w-14 h-14 rounded-2xl bg-medical-blue/10 text-medical-blue flex items-center justify-center mx-auto mb-3 text-2xl font-black">
                              ↑
                            </div>
                            <p className="text-sm font-bold text-dark-text mb-1">
                              Click to upload image
                            </p>
                            <p className="text-xs text-slate-400">
                              JPG, PNG, WebP
                            </p>
                          </div>
                        )}
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setField("imageUrl", URL.createObjectURL(f));
                        }}
                      />
                    </Field>
                  </div>

                  {/* Right column – 2 cols */}
                  <div className="md:col-span-2 flex flex-col gap-5">
                    <Field
                      label="Image Alt Text"
                      name="imageAlt"
                      errors={errors}
                      helper="Describe the image for accessibility & SEO."
                    >
                      <input
                        id="field-imageAlt"
                        data-ocid="form.image_alt.input"
                        className={inputCls(errors.imageAlt)}
                        value={form.imageAlt}
                        onChange={(e) => setField("imageAlt", e.target.value)}
                        placeholder="e.g. MRI scan showing lumbar disc issue"
                      />
                    </Field>

                    {/* Pre-publish checklist */}
                    <div className="bg-soft-blue-grey/50 rounded-xl border border-slate-100 p-4">
                      <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                        Pre-publish checklist
                      </p>
                      {[
                        {
                          label: "Title added",
                          ok: form.title.trim().length >= 8,
                        },
                        { label: "Category selected", ok: !!form.category },
                        {
                          label: "Author filled",
                          ok: form.author.trim().length >= 2,
                        },
                        { label: "Content ≥ 150 chars", ok: charCount >= 150 },
                        {
                          label: "Alt text (if image)",
                          ok: !form.imageUrl || !!form.imageAlt.trim(),
                        },
                        { label: "Publish date set", ok: !!form.publishDate },
                      ].map(({ label, ok }) => (
                        <div
                          key={label}
                          className="flex items-center gap-2.5 py-1.5 border-b border-slate-100 last:border-0"
                        >
                          <span
                            className={`text-xs font-bold w-4 ${ok ? "text-emerald-500" : "text-slate-300"}`}
                          >
                            {ok ? "✓" : "○"}
                          </span>
                          <span
                            className={`text-xs ${ok ? "text-slate-600" : "text-slate-400"}`}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
          <button
            type="button"
            data-ocid="form.back_button"
            onClick={handleBack}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-dark-text text-sm font-semibold hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 0 ? "Cancel" : "← Back"}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              data-ocid="form.next_button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-medical-blue hover:bg-medical-blue/90 text-white text-sm font-bold shadow-md shadow-medical-blue/20 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              data-ocid="form.submit_button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-medical-blue hover:bg-medical-blue/90 text-white text-sm font-bold shadow-md shadow-medical-blue/20 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {isEdit ? "Updating…" : "Publishing…"}
                </>
              ) : isEdit ? (
                "✓ Update Post"
              ) : (
                "✓ Publish Post"
              )}
            </button>
          )}
        </div>
      </div>

      {/* Quill override styles */}
      <style>{`
        .quill-editor-custom .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background: #f8fafc;
          padding: 8px 12px;
          font-family: var(--font-body);
        }
        .quill-editor-custom .ql-container {
          border: none !important;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.75;
          color: #12344d;
        }
        .quill-editor-custom .ql-editor {
          min-height: 320px;
          padding: 16px 18px;
        }
        .quill-editor-custom .ql-editor.ql-blank::before {
          color: #cbd5e1;
          font-style: normal;
        }
        .quill-editor-custom .ql-toolbar button:hover,
        .quill-editor-custom .ql-toolbar button.ql-active {
          color: #1A6EA8 !important;
        }
        .quill-editor-custom .ql-toolbar button:hover .ql-stroke,
        .quill-editor-custom .ql-toolbar button.ql-active .ql-stroke {
          stroke: #1A6EA8 !important;
        }
        .quill-editor-custom .ql-toolbar button:hover .ql-fill,
        .quill-editor-custom .ql-toolbar button.ql-active .ql-fill {
          fill: #1A6EA8 !important;
        }
        .quill-editor-custom .ql-picker-label:hover,
        .quill-editor-custom .ql-picker-label.ql-active {
          color: #1A6EA8 !important;
        }
        .quill-editor-custom blockquote {
          border-left: 4px solid #1A6EA8;
          padding-left: 14px;
          color: #567189;
          font-style: italic;
        }
        .quill-editor-custom pre {
          background: #f1f5f9;
          border: 1px solid #d6e2ee;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: #1e3a4c;
        }
      `}</style>
    </div>
  );
}
