'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { STORY_CATEGORIES } from '@/lib/constants'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const storySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long'),
  content: z.string().min(50, 'Please share more details').max(5000, 'Story too long'),
  category: z.enum(['PERSONAL_EXPERIENCE', 'SAFETY_TIP', 'AWARENESS', 'SUCCESS_STORY', 'QUESTION']),
  isAnonymous: z.boolean(),
  tags: z.string().optional(),
})

type StoryFormData = z.infer<typeof storySchema>

const STORIES_STORAGE_KEY = 'community-stories'

interface EditStoryFormProps {
  storyId: string
}

export function EditStoryForm({ storyId }: EditStoryFormProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [story, setStory] = useState<any>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  useEffect(() => {
    // Load story from localStorage
    const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
    const foundStory = stories.find((s: any) => s.id === storyId)
    
    if (foundStory) {
      setStory(foundStory)
      setTags(foundStory.tags || [])
      
      // Set form values
      setValue('title', foundStory.title)
      setValue('content', foundStory.content)
      setValue('category', foundStory.category)
      setValue('isAnonymous', foundStory.author.isAnonymous)
      setValue('tags', foundStory.tags?.join(',') || '')
    }
    
    setIsLoading(false)
  }, [storyId, setValue])

  const isAnonymous = watch('isAnonymous')

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
    if (!session) {
      toast.error('Please login to edit')
      return
    }

    if (!story) {
      toast.error('Story not found')
      return
    }

    if (session.user?.email !== story.author.id) {
      toast.error('You can only edit your own stories')
      return
    }

    setIsSubmitting(true)

    try {
      const updatedStory = {
        ...story,
        title: data.title,
        content: data.content,
        category: data.category,
        author: {
          ...story.author,
          isAnonymous: data.isAnonymous,
        },
        tags: tags,
      }

      const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
      const updatedStories = stories.map((s: any) => 
        s.id === storyId ? updatedStory : s
      )
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))

      toast.success('Story updated successfully!')
      router.push(`/watchtower/story/${storyId}`)
    } catch (error) {
      toast.error('Failed to update story')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-light py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-neutral-light py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-primary-deep mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-8">The story you're trying to edit doesn't exist or has been deleted.</p>
          <Link href="/watchtower/feed" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary-deep mb-8">Edit Story</h1>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Story Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.title && <p className="mt-1 text-sm text-alert-coral">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          {...register('category')}
          id="category"
          className="input-field"
          disabled={isSubmitting}
        >
          {STORY_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-alert-coral">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Your Story
        </label>
        <textarea
          {...register('content')}
          id="content"
          rows={8}
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.content && <p className="mt-1 text-sm text-alert-coral">{errors.content.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="flex-1 min-w-30 bg-transparent border-none focus:outline-none text-sm"
            placeholder={tags.length < 5 ? "Add tags..." : "Max tags reached"}
            onKeyDown={handleTagKeyDown}
            disabled={isSubmitting || tags.length >= 5}
          />
        </div>
      </div>

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
          disabled={isSubmitting}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Update Story'}
        </button>
      </div>
    </form>
  )
}