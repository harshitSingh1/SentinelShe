'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { STORY_CATEGORIES } from '@/lib/constants'

const storySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long'),
  content: z.string().min(50, 'Please share more details (minimum 50 characters)').max(5000, 'Story too long'),
  category: z.enum(['PERSONAL_EXPERIENCE', 'SAFETY_TIP', 'AWARENESS', 'SUCCESS_STORY', 'QUESTION']),
  isAnonymous: z.boolean(),
  tags: z.string().optional(),
})

type StoryFormData = z.infer<typeof storySchema>

export function StoryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'PERSONAL_EXPERIENCE',
      isAnonymous: false,
      tags: '',
    },
  })

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const input = e.currentTarget
      const value = input.value.trim()
      
      if (value && !tags.includes(value) && tags.length < 5) {
        const newTags = [...tags, value]
        setTags(newTags)
        setValue('tags', newTags.join(','))
        input.value = ''
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    setTags(newTags)
    setValue('tags', newTags.join(','))
  }

  const onSubmit = async (data: StoryFormData) => {
    try {
      setIsLoading(true)

      // Add tags to the data
      const storyData = {
        ...data,
        tags: tags,
      }

      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to share story')
      }

      toast.success('Story shared successfully! It will be published after review.')
      router.push('/watchtower/feed')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to share story')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Story Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="input-field"
          placeholder="e.g., How I stayed safe during a late-night commute"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-alert-coral">{errors.title.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          {...register('category')}
          id="category"
          className="input-field"
          disabled={isLoading}
        >
          {STORY_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.icon} {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-alert-coral">{errors.category.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Your Story
        </label>
        <textarea
          {...register('content')}
          id="content"
          rows={8}
          className="input-field"
          placeholder="Share your experience, what you learned, and any advice for others..."
          disabled={isLoading}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-alert-coral">{errors.content.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (optional - up to 5, press Enter or comma to add)
        </label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-accent-gold/20 text-primary-deep px-3 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-primary-deep/60 hover:text-alert-coral"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            id="tags"
            className="flex-1 min-w-30 bg-transparent border-none focus:outline-none text-sm"
            placeholder={tags.length < 5 ? "Add tags..." : "Max tags reached"}
            onKeyDown={handleTagKeyDown}
            disabled={isLoading || tags.length >= 5}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Example: self-defense, awareness, commute, work-safety
        </p>
      </div>

      {/* Anonymous Option */}
      <div className="flex items-center">
        <input
          {...register('isAnonymous')}
          type="checkbox"
          id="isAnonymous"
          className="h-4 w-4 text-accent-gold focus:ring-accent-gold border-gray-300 rounded"
        />
        <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
          Post anonymously
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sharing...' : 'Share Story'}
        </button>
      </div>
    </form>
  )
}