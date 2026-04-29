'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Blog, BlogFormData } from '@/types/blog'
import { BLOG_CATEGORIES } from '@/types/blog'
import { cn } from '@/lib/utils'

export type { BlogFormData }

// ── Constants ─────────────────────────────────────────────────
const STEPS = ['Basic Info', 'Content', 'Media'] as const
type StepIndex = 0 | 1 | 2
type FieldErrors = Partial<Record<keyof BlogFormData | 'author', string>>

const EMPTY: BlogFormData & { author: string } = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  thumbnail: '',
  imageAlt: '',
  author: '',
  status: 'draft',
  featured: false,
}

// ── Helpers ────────────────────────────────────────────────────
function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return mins + ' min read'
}

// ── Input class helpers ───────────────────────────────────────
const BASE_INPUT =
  'w-full rounded-xl border bg-[#160d2e] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 font-body'

function inputCls(err?: string) {
  return cn(
    BASE_INPUT,
    err
      ? 'border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,.12)]'
      : 'border-[#2d1b69]/60 focus:border-[#2d1b69] focus:shadow-[0_0_0_3px_rgba(45,27,105,.2)]'
  )
}

// ── Field wrapper ─────────────────────────────────────────────
function Field({
  label,
  name,
  required,
  helper,
  errors,
  children,
}: {
  label: string
  name: string
  required?: boolean
  helper?: string
  errors: FieldErrors
  children: React.ReactNode
}) {
  const fieldId = 'field-' + name
  const err = errors[name as keyof FieldErrors]
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {err ? (
          <motion.p
            key="err"
            data-ocid={name + '.field_error'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-red-400 text-[12px] overflow-hidden"
          >
            {err}
          </motion.p>
        ) : helper ? (
          <p key="helper" className="text-gray-600 text-[12px]">
            {helper}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

// ── BlogForm Props ────────────────────────────────────────────
interface BlogFormProps {
  isEdit?: boolean
  initialData?: Blog
  isSubmitting?: boolean
  onSubmit: (data: BlogFormData) => void
  onCancel?: () => void
}

// ════════════════════════════════════════════════════════════════
//  BlogForm
// ════════════════════════════════════════════════════════════════
export function BlogForm({
  isEdit = false,
  initialData,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: BlogFormProps) {
  const [step, setStep] = useState<StepIndex>(0)
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setFormState] = useState({
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    category: initialData?.category ?? '',
    thumbnail: initialData?.thumbnail ?? initialData?.imageUrl ?? '',
    imageAlt: initialData?.imageAlt ?? '',
    author: initialData?.author ?? '',
    status: initialData?.status ?? ('draft' as const),
    featured: initialData?.featured ?? false,
  })
  const [errors, setErrors] = useState<FieldErrors>({})

  useEffect(() => {
    if (initialData) {
      setFormState({
        title: initialData.title,
        excerpt: initialData.excerpt,
        content: initialData.content,
        category: initialData.category,
        thumbnail: initialData.thumbnail ?? initialData.imageUrl ?? '',
        imageAlt: initialData.imageAlt ?? '',
        author: initialData.author ?? '',
        status: initialData.status,
        featured: initialData.featured ?? false,
      })
      setSlug(initialData.slug)
      setTags(initialData.tags ?? [])
      setErrors({})
    }
  }, [initialData])

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step])
  const readTime = useMemo(() => estimateReadTime(form.content), [form.content])

  // ── Validation ──
  const validateField = useCallback(
    (field: string, value: string): string => {
      switch (field) {
        case 'title':
          if (!value.trim()) return 'Title is required.'
          if (value.trim().length < 5) return 'Title must be at least 5 characters.'
          if (value.trim().length > 160) return 'Title must be under 160 characters.'
          return ''
        case 'category':
          if (!value) return 'Please select a category.'
          return ''
        case 'excerpt':
          if (!value.trim()) return 'Excerpt is required.'
          if (value.trim().length < 20) return 'Excerpt must be at least 20 characters.'
          if (value.trim().length > 300) return 'Excerpt must be under 300 characters.'
          return ''
        case 'content':
          if (!value.trim()) return 'Content is required.'
          if (value.trim().length < 50) return 'Content must be at least 50 characters.'
          return ''
        case 'imageAlt':
          if (form.thumbnail && !value.trim()) return 'Alt text is required when an image is set.'
          if (value && value.trim().length < 5) return 'Alt text must be at least 5 characters.'
          return ''
        default:
          return ''
      }
    },
    [form.thumbnail]
  )

  const setField = useCallback(
    (field: keyof typeof form, value: string | boolean) => {
      setFormState((prev) => {
        const next = { ...prev, [field]: value }
        if (field === 'title' && typeof value === 'string' && !isEdit) {
          setSlug(slugify(value))
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: typeof value === 'string' ? validateField(field, value) : '',
        }))
        return next
      })
    },
    [validateField, isEdit]
  )

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t])
    setTagInput('')
  }

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag))

  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: FieldErrors = {}
      if (s === 0) {
        const titleErr = validateField('title', form.title)
        const catErr = validateField('category', form.category)
        const excerptErr = validateField('excerpt', form.excerpt)
        if (titleErr) errs.title = titleErr
        if (catErr) errs.category = catErr
        if (excerptErr) errs.excerpt = excerptErr
      }
      if (s === 1) {
        const contentErr = validateField('content', form.content)
        if (contentErr) errs.content = contentErr
      }
      if (s === 2) {
        const altErr = validateField('imageAlt', form.imageAlt ?? '')
        if (altErr) errs.imageAlt = altErr
      }
      setErrors((prev) => ({ ...prev, ...errs }))
      return Object.keys(errs).length === 0
    },
    [form, validateField]
  )

  const handleNext = () => {
    if (!validateStep(step)) return
    setStep((p) => Math.min(p + 1, STEPS.length - 1) as StepIndex)
  }

  const handleBack = () => {
    if (step === 0) {
      onCancel?.()
      return
    }
    setStep((p) => Math.max(p - 1, 0) as StepIndex)
  }

  const handleSubmit = () => {
    const ok = ([0, 1, 2] as const).map(validateStep).every(Boolean)
    if (!ok) return
    const data: BlogFormData = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      tags,
      thumbnail: form.thumbnail,
      imageAlt: form.imageAlt,
      author: form.author,
      status: form.status,
      featured: form.featured,
    }
    onSubmit(data)
  }

  // ── Checklist items ──
  const checklist = [
    { label: 'Title (≥5 chars)', ok: form.title.trim().length >= 5 },
    { label: 'Category selected', ok: !!form.category },
    { label: 'Excerpt written', ok: form.excerpt.trim().length >= 20 },
    { label: 'Content (≥50 chars)', ok: form.content.trim().length >= 50 },
    { label: 'Alt text (if image)', ok: !form.thumbnail || !!form.imageAlt?.trim() },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#0d0a1e] rounded-2xl border border-[#2d1b69]/40 shadow-2xl overflow-hidden">

        {/* Header / Step indicator */}
        <div className="px-6 pt-6 pb-5 border-b border-[#2d1b69]/30 bg-gradient-to-b from-[#2d1b69]/10 to-transparent">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-extrabold text-white leading-tight font-display">
                {isEdit ? 'Edit Blog Post' : 'Create New Post'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isEdit ? 'Update your existing article' : 'Write clearly, validate fast, publish with confidence'}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-[#d4a017] bg-[#d4a017]/10 px-3 py-1.5 rounded-full border border-[#d4a017]/20">
              Step {step + 1} / {STEPS.length}
            </span>
          </div>

          {/* Step pills */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {STEPS.map((label, i) => {
              const active = i === step
              const done = i < step
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => done && setStep(i as StepIndex)}
                  data-ocid={'blog_form.step_' + (i + 1) + '.button'}
                  className={cn(
                    'py-1.5 px-3 rounded-xl text-center text-[12px] font-bold border transition-all',
                    done
                      ? 'bg-green-900/30 border-green-700/40 text-green-400 cursor-pointer'
                      : active
                      ? 'bg-[#2d1b69]/40 border-[#4a2d9e]/60 text-white'
                      : 'bg-[#160d2e] border-[#2d1b69]/30 text-gray-600'
                  )}
                >
                  {done ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check className="h-3 w-3" /> {label}
                    </span>
                  ) : (
                    label
                  )}
                </button>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-[#2d1b69]/20 overflow-hidden">
            <motion.div
              animate={{ width: progress + '%' }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full bg-gradient-to-r from-[#2d1b69] to-[#d4a017]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              {/* ══ Step 0 – Basic Info ══ */}
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <Field label="Title" name="title" required errors={errors} helper="Clear and descriptive. 5–160 characters.">
                      <input
                        id="field-title"
                        data-ocid="blog_form.title.input"
                        className={inputCls(errors.title)}
                        value={form.title}
                        onChange={(e) => setField('title', e.target.value)}
                        placeholder="Digital Marketing for Hospitals in 2025"
                      />
                    </Field>
                  </div>

                  {/* Slug (read-only / auto) */}
                  <div className="md:col-span-2">
                    <Field
                      label="Slug"
                      name="slug"
                      errors={errors}
                      helper={isEdit ? 'Slug is locked in edit mode.' : 'Auto-generated from title.'}
                    >
                      <input
                        id="field-slug"
                        data-ocid="blog_form.slug.input"
                        className={cn(inputCls(), 'opacity-60 cursor-not-allowed')}
                        value={slug}
                        readOnly
                      />
                    </Field>
                  </div>

                  {/* Category */}
                  <Field label="Category" name="category" required errors={errors}>
                    <select
                      id="field-category"
                      data-ocid="blog_form.category.select"
                      className={cn(inputCls(errors.category), 'bg-[#160d2e]')}
                      value={form.category}
                      onChange={(e) => setField('category', e.target.value)}
                    >
                      <option value="">Select category…</option>
                      {BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Author */}
                  <Field label="Author" name="author" errors={errors}>
                    <input
                      id="field-author"
                      data-ocid="blog_form.author.input"
                      className={inputCls(errors.author)}
                      value={form.author}
                      onChange={(e) => setField('author', e.target.value)}
                      placeholder="e.g. Dr. Priya Sharma"
                    />
                  </Field>

                  {/* Excerpt – full width */}
                  <div className="md:col-span-2">
                    <Field label="Excerpt" name="excerpt" required errors={errors} helper="A short summary for blog listings. 20–300 characters.">
                      <textarea
                        id="field-excerpt"
                        data-ocid="blog_form.excerpt.textarea"
                        rows={3}
                        className={cn(inputCls(errors.excerpt), 'resize-none')}
                        value={form.excerpt}
                        onChange={(e) => setField('excerpt', e.target.value)}
                        placeholder="A brief, engaging summary of the post…"
                      />
                    </Field>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Status
                    </p>
                    <div className="flex gap-4">
                      {(['draft', 'published'] as const).map((s) => (
                        <label
                          key={s}
                          className="flex items-center gap-2 cursor-pointer"
                          data-ocid={'blog_form.status_' + s + '.radio'}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={s}
                            checked={form.status === s}
                            onChange={() => setField('status', s)}
                            className="accent-[#d4a017] w-4 h-4"
                          />
                          <span className="text-sm text-gray-300 capitalize">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ══ Step 1 – Content ══ */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Content <span className="text-red-400">*</span>
                    </span>
                    <span
                      className={cn(
                        'text-[11px] font-semibold px-3 py-1 rounded-full border transition-colors',
                        form.content.trim().length < 50
                          ? 'text-red-400 bg-red-950/30 border-red-800/30'
                          : 'text-green-400 bg-green-950/30 border-green-800/30'
                      )}
                    >
                      {form.content.trim().length} chars
                      {form.content.trim().length >= 50 ? ' ✓' : ' — need ' + (50 - form.content.trim().length) + ' more'}
                    </span>
                  </div>

                  <div
                    data-ocid="blog_form.content.editor"
                    className={cn(
                      'rounded-xl border transition-shadow overflow-hidden',
                      errors.content
                        ? 'border-red-500/60'
                        : 'border-[#2d1b69]/60 focus-within:border-[#2d1b69] focus-within:shadow-[0_0_0_3px_rgba(45,27,105,.2)]'
                    )}
                  >
                    <div className="bg-[#160d2e] border-b border-[#2d1b69]/30 px-4 py-2 flex flex-wrap gap-1">
                      {['Bold', 'Italic', 'H1', 'H2', 'H3', 'List', 'Quote', 'Code'].map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-xs text-gray-500 bg-[#2d1b69]/20 rounded border border-[#2d1b69]/30 select-none"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <textarea
                      id="field-content"
                      data-ocid="blog_form.content.textarea"
                      rows={14}
                      value={form.content}
                      onChange={(e) => setField('content', e.target.value)}
                      placeholder="Write your full blog post here… (Markdown supported)"
                      className="w-full bg-[#0a061a] px-5 py-4 text-sm text-white placeholder:text-gray-700 outline-none resize-none font-mono leading-relaxed"
                    />
                  </div>

                  <AnimatePresence>
                    {errors.content && (
                      <motion.p
                        data-ocid="content.field_error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs overflow-hidden"
                      >
                        {errors.content}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tags */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tags</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        placeholder="Add a tag and press Enter"
                        className={cn(BASE_INPUT, 'flex-1 border-[#2d1b69]/60 focus:border-[#2d1b69]')}
                        data-ocid="blog_form.tags.input"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 rounded-xl border border-[#2d1b69] text-[#d4a017] text-sm font-semibold hover:bg-[#2d1b69]/30 transition-colors"
                        data-ocid="blog_form.tags.add_button"
                      >
                        Add
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#2d1b69]/30 text-purple-300 border border-[#2d1b69]/40"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-400 transition-colors"
                              aria-label={'Remove tag ' + tag}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#2d1b69]/10 border border-[#2d1b69]/20 rounded-xl p-3.5">
                    <span className="text-base mt-0.5">💡</span>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <span className="font-semibold text-[#d4a017]">Formatting tip:</span>{' '}
                      Use Markdown syntax — <strong className="text-white">**bold**</strong>,{' '}
                      <em className="text-white">*italic*</em>, # for headings, - for lists, and {'>'} for blockquotes.
                      Estimated read time: <strong className="text-[#d4a017]">{readTime}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* ══ Step 2 – Media ══ */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Image – 3 cols */}
                  <div className="md:col-span-3">
                    <Field
                      label="Featured Image"
                      name="thumbnail"
                      errors={errors}
                      helper="Enter an image URL or upload a file."
                    >
                      <input
                        id="field-thumbnail"
                        data-ocid="blog_form.thumbnail.input"
                        className={inputCls(errors.thumbnail)}
                        value={form.thumbnail}
                        onChange={(e) => setField('thumbnail', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </Field>

                    {/* Upload button */}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      data-ocid="blog_form.image.upload_button"
                      className="mt-3 w-full rounded-2xl border-2 border-dashed border-[#2d1b69]/40 bg-[#160d2e] hover:bg-[#2d1b69]/10 transition cursor-pointer"
                    >
                      {form.thumbnail ? (
                        <div className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.thumbnail}
                            alt={form.imageAlt || 'Preview'}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">Click to replace</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10 px-6">
                          <div className="w-12 h-12 rounded-2xl bg-[#2d1b69]/30 text-[#d4a017] flex items-center justify-center mx-auto mb-3 text-2xl font-black">
                            ↑
                          </div>
                          <p className="text-sm font-bold text-gray-300 mb-1">Click to upload image</p>
                          <p className="text-xs text-gray-600">JPG, PNG, WebP</p>
                        </div>
                      )}
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) setField('thumbnail', URL.createObjectURL(f))
                      }}
                    />
                  </div>

                  {/* Right – 2 cols */}
                  <div className="md:col-span-2 flex flex-col gap-5">
                    <Field label="Image Alt Text" name="imageAlt" errors={errors} helper="Describe the image for accessibility & SEO.">
                      <input
                        id="field-imageAlt"
                        data-ocid="blog_form.image_alt.input"
                        className={inputCls(errors.imageAlt)}
                        value={form.imageAlt ?? ''}
                        onChange={(e) => setField('imageAlt', e.target.value)}
                        placeholder="e.g. Hospital digital marketing team"
                      />
                    </Field>

                    {/* Pre-publish checklist */}
                    <div className="bg-[#160d2e] rounded-xl border border-[#2d1b69]/30 p-4">
                      <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                        Pre-publish checklist
                      </p>
                      {checklist.map(({ label, ok }) => (
                        <div
                          key={label}
                          className="flex items-center gap-2.5 py-1.5 border-b border-[#2d1b69]/20 last:border-0"
                        >
                          <span className={cn('text-xs font-bold w-4', ok ? 'text-green-400' : 'text-gray-700')}>
                            {ok ? '✓' : '○'}
                          </span>
                          <span className={cn('text-xs', ok ? 'text-gray-300' : 'text-gray-600')}>{label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#2d1b69]/10 border border-[#2d1b69]/20 rounded-xl p-3.5">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                        Estimated read time
                      </p>
                      <p className="text-lg font-bold text-[#d4a017]">{readTime}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2d1b69]/30 bg-[#0d0a1e]/80 flex items-center justify-between gap-3">
          <button
            type="button"
            data-ocid="blog_form.prev_step.button"
            onClick={handleBack}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#2d1b69]/50 bg-transparent text-gray-300 text-sm font-semibold hover:bg-[#2d1b69]/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              data-ocid="blog_form.next_step.button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#2d1b69] hover:bg-[#4a2d9e] text-white text-sm font-bold shadow-lg shadow-[#2d1b69]/20 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              data-ocid="blog_form.submit_button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#d4a017] hover:bg-[#f0c040] text-[#1a0f3d] text-sm font-bold shadow-lg shadow-[#d4a017]/20 transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-[#1a0f3d]/30 border-t-[#1a0f3d] animate-spin" />
                  {isEdit ? 'Updating…' : 'Publishing…'}
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  {isEdit ? 'Update Post' : 'Publish Post'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
