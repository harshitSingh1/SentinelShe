'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { STORY_CATEGORIES } from '@/lib/constants'
import { Icons } from '@/components/icons/SafetyIcons'
import toast from 'react-hot-toast'

interface Story {
  id: string
  title: string
  content: string
  category: string
  author: {
    name: string | null
    isAnonymous: boolean
    id?: string
  }
  upvotes: number
  comments: number
  createdAt: string
  tags: string[]
  views: number
  savedBy: number
}

const STORIES_STORAGE_KEY = 'community-stories'

export function StoryFeed() {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [upvotedStories, setUpvotedStories] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadStories()
    // Load upvoted stories from localStorage
    const saved = localStorage.getItem('upvoted-stories')
    if (saved) {
      setUpvotedStories(new Set(JSON.parse(saved)))
    }
  }, [])

  const loadStories = () => {
    setIsLoading(true)
    try {
      const savedStories = localStorage.getItem(STORIES_STORAGE_KEY)
      const allStories = savedStories ? JSON.parse(savedStories) : []
      
      // Sort by date (newest first)
      allStories.sort((a: Story, b: Story) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      setStories(allStories)
      setHasMore(allStories.length > page * 10)
    } catch (error) {
      console.error('Error loading stories:', error)
      toast.error('Failed to load stories')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpvote = (storyId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
      toast.error('Please login to upvote')
      return
    }

    const newUpvoted = new Set(upvotedStories)
    let newUpvoteCount = 0

    if (newUpvoted.has(storyId)) {
      // Remove upvote
      newUpvoted.delete(storyId)
      newUpvoteCount = -1
    } else {
      // Add upvote
      newUpvoted.add(storyId)
      newUpvoteCount = 1
    }

    setUpvotedStories(newUpvoted)
    localStorage.setItem('upvoted-stories', JSON.stringify(Array.from(newUpvoted)))

    // Update story upvotes
    setStories(prev => prev.map(s => 
      s.id === storyId ? { ...s, upvotes: s.upvotes + newUpvoteCount } : s
    ))

    // Update in localStorage
    const allStories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
    const updatedStories = allStories.map((s: Story) => 
      s.id === storyId ? { ...s, upvotes: s.upvotes + newUpvoteCount } : s
    )
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))

    toast.success(newUpvoteCount > 0 ? 'Upvoted!' : 'Upvote removed')
  }

  const handleShare = async (storyId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const url = `${window.location.origin}/watchtower/story/${storyId}`
    await navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard!')
  }

  const handleReport = (storyId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    toast.success('Thank you for reporting. Our team will review this story.')
  }

  const handleDelete = (storyId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (window.confirm('Are you sure you want to delete this story?')) {
      const updatedStories = stories.filter(s => s.id !== storyId)
      setStories(updatedStories)
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))
      toast.success('Story deleted successfully')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    })
  }

  const filteredStories = selectedCategory
    ? stories.filter(s => s.category === selectedCategory)
    : stories

  const displayedStories = filteredStories.slice(0, page * 10)

  const getCategoryIcon = (categoryValue: string) => {
    const category = STORY_CATEGORIES.find(c => c.value === categoryValue)
    return category?.icon || Icons.AllStories
  }

  const getCategoryColor = (categoryValue: string) => {
    const category = STORY_CATEGORIES.find(c => c.value === categoryValue)
    return category?.color || '#6B4E71'
  }

  const isOwnStory = (story: Story) => {
    return session?.user?.email === story.author.id
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
            selectedCategory === ''
              ? 'bg-accent-gold text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
          }`}
        >
          <Icons.AllStories className="w-4 h-4" />
          All Stories
        </button>
        {STORY_CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                selectedCategory === category.value
                  ? 'bg-accent-gold text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Stories Grid */}
      <div className="space-y-4">
        {displayedStories.map((story) => {
          const Icon = getCategoryIcon(story.category)
          const categoryColor = getCategoryColor(story.category)
          const isUpvoted = upvotedStories.has(story.id)
          
          return (
            <div key={story.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition relative group">
              {/* Main content clickable area */}
              <Link href={`/watchtower/story/${story.id}`} className="block p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${categoryColor}20` }}>
  <Icon className="w-5 h-5" color={categoryColor} />
</div>
                    <span className="text-sm font-medium" style={{ color: categoryColor }}>
                      {STORY_CATEGORIES.find(c => c.value === story.category)?.label}
                    </span>
                    {story.author.isAnonymous ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Anonymous
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {story.author.name}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(story.createdAt)}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-primary-deep mb-2 group-hover:text-accent-gold transition">
                  {story.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.content}
                </p>

                {/* Tags */}
                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>

              {/* Stats and Actions - Positioned at bottom of card */}
<div className="px-6 pb-4 flex items-center justify-between border-t pt-4">
  <div className="flex items-center gap-4">
    <button 
      onClick={(e) => handleUpvote(story.id, e)}
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition ${
        isUpvoted 
          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
          : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
      }`}
      title={isUpvoted ? 'Remove upvote' : 'Upvote this story'}
    >
      <span className="text-lg">❤️</span>
      <span className="text-sm font-medium">{story.upvotes}</span>
    </button>
    
    <Link 
      href={`/watchtower/story/${story.id}#comments`}
      className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-500 hover:text-accent-gold hover:bg-gray-100 transition"
      title="View comments"
    >
      <span className="text-lg">💬</span>
      <span className="text-sm font-medium">{story.comments}</span>
    </Link>
    
    <span className="flex items-center gap-1 px-2 py-1 text-gray-400 text-sm">
      <span>👁️</span>
      {story.views || 0}
    </span>
  </div>

  <div className="flex items-center gap-1">
    {/* Share Button - Independent hover */}
    <div className="relative">
      <button
        onClick={(e) => handleShare(story.id, e)}
        className="p-2 text-gray-400 hover:text-accent-gold transition rounded-full hover:bg-gray-100"
        onMouseEnter={(e) => {
          const tooltip = e.currentTarget.nextElementSibling
          if (tooltip) tooltip.classList.remove('opacity-0', 'invisible')
        }}
        onMouseLeave={(e) => {
          const tooltip = e.currentTarget.nextElementSibling
          if (tooltip) tooltip.classList.add('opacity-0', 'invisible')
        }}
      >
        <Icons.Share className="w-4 h-4" />
      </button>
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 invisible transition-all duration-200 pointer-events-none z-10">
        Share
      </span>
    </div>
    
    {/* Report Button - Independent hover (only if not own story) */}
    {!isOwnStory(story) && (
      <div className="relative">
        <button
          onClick={(e) => handleReport(story.id, e)}
          className="p-2 text-gray-400 hover:text-alert-coral transition rounded-full hover:bg-gray-100"
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.remove('opacity-0', 'invisible')
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.add('opacity-0', 'invisible')
          }}
        >
          <Icons.Report className="w-4 h-4" />
        </button>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 invisible transition-all duration-200 pointer-events-none z-10">
          Report
        </span>
      </div>
    )}
    
    {/* Edit Button - Independent hover (only if own story) */}
    {isOwnStory(story) && (
      <div className="relative">
        <Link
          href={`/watchtower/story/${story.id}/edit`}
          className="p-2 text-gray-400 hover:text-accent-gold transition rounded-full hover:bg-gray-100 block"
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.remove('opacity-0', 'invisible')
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.add('opacity-0', 'invisible')
          }}
        >
          <Icons.Edit className="w-4 h-4" />
        </Link>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 invisible transition-all duration-200 pointer-events-none z-10">
          Edit
        </span>
      </div>
    )}
    
    {/* Delete Button - Independent hover (only if own story) */}
    {isOwnStory(story) && (
      <div className="relative">
        <button
          onClick={(e) => handleDelete(story.id, e)}
          className="p-2 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-gray-100"
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.remove('opacity-0', 'invisible')
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.nextElementSibling
            if (tooltip) tooltip.classList.add('opacity-0', 'invisible')
          }}
        >
          <Icons.Delete className="w-4 h-4" />
        </button>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 invisible transition-all duration-200 pointer-events-none z-10">
          Delete
        </span>
      </div>
    )}
  </div>
</div>
            </div>
          )
        })}
      </div>

      {/* Load More */}
      {hasMore && displayedStories.length < filteredStories.length && (
        <div className="text-center">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="btn-secondary px-8 hover:shadow-lg transition"
          >
            Load More Stories
          </button>
        </div>
      )}

      {displayedStories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 mb-4">No stories found.</p>
          <Link 
            href="/watchtower/story/new"
            className="inline-block text-accent-gold hover:underline font-medium"
          >
            Be the first to share a story →
          </Link>
        </div>
      )}
    </div>
  )
}