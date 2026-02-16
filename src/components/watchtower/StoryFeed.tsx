'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { STORY_CATEGORIES } from '@/lib/constants'

interface Story {
  id: string
  title: string
  content: string
  category: string
  author: {
    name: string | null
    isAnonymous: boolean
  }
  upvotes: number
  comments: number
  createdAt: string
  tags: string[]
}

export function StoryFeed() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStories()
  }, [selectedCategory, page])

  const fetchStories = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const url = new URL('/api/stories', window.location.origin)
      if (selectedCategory) {
        url.searchParams.append('category', selectedCategory)
      }
      url.searchParams.append('page', page.toString())
      
      const response = await fetch(url.toString())
      
      if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }
      
      const data = await response.json()
      
      // Ensure data.stories exists and is an array
      const fetchedStories = data.stories || []
      
      if (page === 1) {
        setStories(fetchedStories)
      } else {
        setStories(prev => [...prev, ...fetchedStories])
      }
      
      setHasMore(data.pagination?.page < data.pagination?.pages)
    } catch (error) {
      console.error('Error fetching stories:', error)
      setError('Failed to load stories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch {
      return dateString
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPage(1)
    setStories([])
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => fetchStories()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-4 py-2 rounded-full text-sm transition ${
            selectedCategory === ''
              ? 'bg-accent-gold text-primary-deep font-medium'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Stories
        </button>
        {STORY_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedCategory === category.value
                ? 'bg-accent-gold text-primary-deep font-medium'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="space-y-6">
        {isLoading && page === 1 ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))
        ) : stories.length > 0 ? (
          stories.map((story) => {
            const category = STORY_CATEGORIES.find(c => c.value === story.category)
            
            // Safely access author properties with defaults
            const authorName = story.author?.name
            const isAnonymous = story.author?.isAnonymous ?? true
            
            return (
              <article key={story.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category?.icon || '📝'}</span>
                    <span className="text-sm font-medium text-accent-gold">
                      {category?.label || 'Story'}
                    </span>
                    {isAnonymous && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Anonymous
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(story.createdAt)}
                  </span>
                </div>

                <Link href={`/watchtower/story/${story.id}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-accent-gold transition">
                    {story.title || 'Untitled Story'}
                  </h2>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.content || 'No content available.'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      <span>❤️</span>
                      <span className="text-sm">{story.upvotes || 0}</span>
                    </span>
                    <Link 
                      href={`/watchtower/story/${story.id}#comments`}
                      className="flex items-center gap-1 text-gray-500 hover:text-accent-gold transition"
                    >
                      <span>💬</span>
                      <span className="text-sm">{story.comments || 0}</span>
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    {(story.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {isAnonymous ? 'Anonymous' : (authorName || 'Unknown')}
                  </span>
                  <Link 
                    href={`/watchtower/story/${story.id}`}
                    className="text-accent-gold hover:underline text-sm"
                  >
                    Read full story →
                  </Link>
                </div>
              </article>
            )
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No stories found.</p>
            <Link 
              href="/watchtower/story/new"
              className="inline-block text-accent-gold hover:underline"
            >
              Be the first to share a story →
            </Link>
          </div>
        )}
      </div>

      {/* Load More */}
      {hasMore && !isLoading && stories.length > 0 && (
        <div className="text-center">
          <button 
            onClick={loadMore}
            className="btn-secondary px-8"
            disabled={isLoading}
          >
            Load More Stories
          </button>
        </div>
      )}

      {isLoading && page > 1 && (
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-gold border-r-transparent"></div>
        </div>
      )}
    </div>
  )
}