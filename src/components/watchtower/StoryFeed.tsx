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

export function StoryFeed() {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [upvotedStories, setUpvotedStories] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchStories()
    
    const saved = localStorage.getItem('upvoted-stories')
    if (saved) {
      setUpvotedStories(new Set(JSON.parse(saved)))
    }
  }, [selectedCategory])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const url = new URL('/api/stories', window.location.origin)
      if (selectedCategory) {
        url.searchParams.append('category', selectedCategory)
      }
      
      const response = await fetch(url.toString())
      const data = await response.json()
      
      if (data.success) {
        setStories(data.stories)
      } else {
        setStories([])
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
      toast.error('Failed to load stories')
      setStories([])
    } finally {
      setLoading(false)
    }
  }

const handleUpvote = async (storyId: string, e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  
  if (!session) {
    toast.error('Please login to upvote')
    return
  }

  // Get current state from localStorage
  const upvotedStories = JSON.parse(localStorage.getItem('upvoted-stories') || '[]')
  const isCurrentlyUpvoted = upvotedStories.includes(storyId)
  
  let newUpvotedStories = [...upvotedStories]
  let voteChange = 0

  if (!isCurrentlyUpvoted) {
    // Add upvote
    newUpvotedStories.push(storyId)
    voteChange = 1
    toast.success('Story upvoted!')
  } else {
    // Remove upvote
    const index = newUpvotedStories.indexOf(storyId)
    newUpvotedStories.splice(index, 1)
    voteChange = -1
    toast.success('Upvote removed')
  }
  
  // Update localStorage
  setUpvotedStories(new Set(newUpvotedStories))
  localStorage.setItem('upvoted-stories', JSON.stringify(newUpvotedStories))

  // Update UI
  setStories(prev => prev.map(s => 
    s.id === storyId ? { ...s, upvotes: (s.upvotes || 0) + voteChange } : s
  ))

  // Update database
  try {
    await fetch(`/api/stories/${storyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upvote', change: voteChange }),
    })
  } catch (error) {
    console.error('Error updating vote:', error)
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
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryIcon = (categoryValue: string) => {
    const category = STORY_CATEGORIES.find(c => c.value === categoryValue)
    return category?.icon || Icons.AllStories
  }

  const getCategoryColor = (categoryValue: string) => {
    const category = STORY_CATEGORIES.find(c => c.value === categoryValue)
    return category?.color || '#6B4E71'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
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
          onClick={() => {
            setSelectedCategory('')
            fetchStories()
          }}
          className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
            selectedCategory === ''
              ? 'bg-accent-gold text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              onClick={() => {
                setSelectedCategory(category.value)
                fetchStories()
              }}
              className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                selectedCategory === category.value
                  ? 'bg-accent-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Stories List */}
      {stories.length > 0 ? (
        <div className="space-y-4">
          {stories.map((story) => {
            const Icon = getCategoryIcon(story.category)
            const categoryColor = getCategoryColor(story.category)
            const isUpvoted = upvotedStories.has(story.id)

            return (
              <div key={story.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <Link href={`/watchtower/story/${story.id}`} className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${categoryColor}20` }}>
                        <Icon className="w-5 h-5" color={categoryColor} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: categoryColor }}>
                        {STORY_CATEGORIES.find(c => c.value === story.category)?.label}
                      </span>
                      {story.author?.isAnonymous ? (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Anonymous
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {story.author?.name || 'User'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(story.createdAt)}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-primary-deep mb-2">
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

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleUpvote(story.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition ${
                          isUpvoted
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-lg">❤️</span>
                        <span className="text-sm font-medium">{story.upvotes}</span>
                      </button>
                      
                      <span className="flex items-center gap-1 text-gray-500">
                        <span className="text-lg">💬</span>
                        <span className="text-sm font-medium">{story.comments || 0}</span>
                      </span>
                      
                      <span className="flex items-center gap-1 text-gray-400 text-sm">
                        <span>👁️</span>
                        {story.views || 0}
                      </span>
                    </div>

                    <span className="text-accent-gold text-sm font-medium hover:underline">
                      Read full story →
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 mb-4">No stories yet. Be the first to share!</p>
          <Link
            href="/watchtower/story/new"
            className="btn-primary inline-block"
          >
            Share Your Story
          </Link>
        </div>
      )}
    </div>
  )
}