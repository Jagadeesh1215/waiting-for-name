'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CATEGORIES } from '@/types/blog'
import type { Blog, BlogFormData } from '@/types/blog'
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  status: z.enum(['published', 'draft']),
})

type FormValues = z.infer<typeof schema>

interface BlogFormProps {
  initialData?: Blog
  onSubmit: (data: BlogFormData) => Promise<void>
  isSubmitting?: boolean
}

const steps = ['Basic Info', 'Content', 'Publish']

export function BlogForm({ initialData, onSubmit, isSubmitting = false }: BlogFormProps) {
  const [step, setStep] = useState(0)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? '',
      excerpt: initialData?.excerpt ?? '',
      content: initialData?.content ?? '',
      category: initialData?.category ?? '',
      status: initialData?.status ?? 'draft',
      thumbnail: initialData?.thumbnail ?? '',
      tags: initialData?.tags ?? [],
    },
  })

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) {
      const next = [...tags, t]
      setTags(next)
      setValue('tags', next)
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    const next = tags.filter((t) => t !== tag)
    setTags(next)
    setValue('tags', next)
  }

  const handleFormSubmit = async (data: FormValues) => {
    await onSubmit({ ...data, tags, thumbnail: data.thumbnail ?? '' })
  }

  const content = watch('content') ?? ''

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                i < step
                  ? 'bg-green-500 text-white cursor-pointer'
                  : i === step
                  ? 'bg-[#2d1b69] text-white'
                  : 'bg-[#2d1b69]/20 text-gray-500'
              )}
              data-ocid={`blog_form.step_${i + 1}.button`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </button>
            <span
              className={cn(
                'text-sm font-medium hidden sm:block',
                i === step ? 'text-white' : 'text-gray-500'
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Basic Info */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Digital Marketing for Hospitals in 2025"
              className="mt-1 bg-[#160d2e] border-[#2d1b69] text-white placeholder:text-gray-500"
              data-ocid="blog_form.title.input"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1" data-ocid="blog_form.title.field_error">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="excerpt" className="text-gray-300">Excerpt *</Label>
            <textarea
              id="excerpt"
              rows={3}
              {...register('excerpt')}
              placeholder="A short summary for blog listings..."
              className="mt-1 w-full rounded-lg border border-[#2d1b69] bg-[#160d2e] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2d1b69] resize-none"
              data-ocid="blog_form.excerpt.textarea"
            />
            {errors.excerpt && (
              <p className="text-red-400 text-xs mt-1" data-ocid="blog_form.excerpt.field_error">
                {errors.excerpt.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="category" className="text-gray-300">Category *</Label>
            <select
              id="category"
              {...register('category')}
              className="mt-1 w-full rounded-lg border border-[#2d1b69] bg-[#160d2e] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2d1b69]"
              data-ocid="blog_form.category.select"
            >
              <option value="">Select category...</option>
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-xs mt-1" data-ocid="blog_form.category.field_error">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Content */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="content" className="text-gray-300">Content *</Label>
              <span className="text-xs text-gray-500">{content.length} chars</span>
            </div>
            <textarea
              id="content"
              rows={16}
              {...register('content')}
              placeholder="Write your full blog post here..."
              className="w-full rounded-lg border border-[#2d1b69] bg-[#160d2e] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2d1b69] resize-none font-mono"
              data-ocid="blog_form.content.textarea"
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1" data-ocid="blog_form.content.field_error">
                {errors.content.message}
              </p>
            )}
          </div>
          <div>
            <Label className="text-gray-300">Tags</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add a tag and press Enter"
                className="bg-[#160d2e] border-[#2d1b69] text-white placeholder:text-gray-500"
                data-ocid="blog_form.tags.input"
              />
              <Button
                type="button"
                variant="outline-purple"
                onClick={addTag}
                data-ocid="blog_form.tags.add_button"
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 bg-[#2d1b69]/30 text-purple-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-400 transition-colors"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Publish */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="thumbnail" className="text-gray-300">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              {...register('thumbnail')}
              placeholder="https://example.com/image.jpg"
              className="mt-1 bg-[#160d2e] border-[#2d1b69] text-white placeholder:text-gray-500"
              data-ocid="blog_form.thumbnail.input"
            />
          </div>
          <div>
            <Label className="text-gray-300">Status</Label>
            <div className="flex gap-4 mt-2">
              {(['draft', 'published'] as const).map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={s}
                    {...register('status')}
                    className="accent-[#d4a017]"
                    data-ocid={`blog_form.status_${s}.radio`}
                  />
                  <span className="text-sm text-gray-300 capitalize">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#2d1b69]/40 bg-[#2d1b69]/10 p-4 space-y-2">
            <p className="text-sm font-medium text-white">Pre-publish Checklist</p>
            {[
              'Title is descriptive and engaging',
              'Excerpt summarizes the post well',
              'Content is complete and proofread',
              'Category is correctly assigned',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400 shrink-0" />
                <span className="text-xs text-gray-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2d1b69]/30">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="text-gray-400 hover:text-white"
          data-ocid="blog_form.prev_step.button"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {step < steps.length - 1 ? (
          <Button
            type="button"
            variant="primary"
            onClick={() => setStep((s) => s + 1)}
            data-ocid="blog_form.next_step.button"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            data-ocid="blog_form.submit_button"
          >
            {isSubmitting
              ? 'Saving...'
              : initialData
              ? 'Update Post'
              : 'Publish Post'}
          </Button>
        )}
      </div>
    </form>
  )
}
