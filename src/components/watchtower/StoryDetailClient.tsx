'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { STORY_CATEGORIES } from '@/lib/constants'
import { Icons } from '@/components/icons/SafetyIcons'
import toast from 'react-hot-toast'

interface Comment {
  id: string
  content: string
  author: {
    name: string | null
    isAnonymous: boolean
    id?: string
  }
  createdAt: string
  upvotes: number
}

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
  commentsList?: Comment[]
}

interface StoryDetailClientProps {
  storyId: string
}

export function StoryDetailClient({ storyId }: StoryDetailClientProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)
  const [showReportTooltip, setShowReportTooltip] = useState(false)
  const [showEditTooltip, setShowEditTooltip] = useState(false)
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false)

  useEffect(() => {
    fetchStory()
    loadUserInteractions()
  }, [storyId])

  const fetchStory = async () => {
    try {
      const response = await fetch(`/api/stories/${storyId}`)
      const data = await response.json()
      
      if (data.story) {
        setStory(data.story)
        setUpvoteCount(data.story.upvotes || 0)
        setComments(data.story.commentsList || [])
        
        // Increment view count
        await fetch(`/api/stories/${storyId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'view' }),
        })
      }
    } catch (error) {
      console.error('Error fetching story:', error)
      toast.error('Failed to load story')
    } finally {
      setLoading(false)
    }
  }

  const loadUserInteractions = () => {
    // Load upvote state
    const upvotedStories = JSON.parse(localStorage.getItem('upvoted-stories') || '[]')
    setHasUpvoted(upvotedStories.includes(storyId))
    
    // Load saved state
    const savedStories = JSON.parse(localStorage.getItem('saved-stories') || '[]')
    setIsSaved(savedStories.includes(storyId))
  }

  const handleUpvote = async () => {
    if (!session) {
      toast.error('Please login to upvote')
      return
    }

    // Get current state from localStorage
    const upvotedStories = JSON.parse(localStorage.getItem('upvoted-stories') || '[]')
    const isCurrentlyUpvoted = upvotedStories.includes(storyId)
    
    let newUpvoteCount = upvoteCount
    let newUpvotedStories = [...upvotedStories]

    if (!isCurrentlyUpvoted) {
      // Add upvote
      newUpvotedStories.push(storyId)
      newUpvoteCount = upvoteCount + 1
      setHasUpvoted(true)
      toast.success('Story upvoted!')
      
      // Update database with +1
      await fetch(`/api/stories/${storyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', change: 1 }),
      })
    } else {
      // Remove upvote
      const index = newUpvotedStories.indexOf(storyId)
      newUpvotedStories.splice(index, 1)
      newUpvoteCount = upvoteCount - 1
      setHasUpvoted(false)
      toast.success('Upvote removed')
      
      // Update database with -1
      await fetch(`/api/stories/${storyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', change: -1 }),
      })
    }
    
    // Update localStorage
    localStorage.setItem('upvoted-stories', JSON.stringify(newUpvotedStories))
    setUpvoteCount(newUpvoteCount)
  }

  const handleSave = async () => {
    if (!session) {
      toast.error('Please login to save stories')
      return
    }

    const savedStories = JSON.parse(localStorage.getItem('saved-stories') || '[]')
    
    if (!isSaved) {
      savedStories.push(storyId)
      setIsSaved(true)
      toast.success('Story saved!')
      
      // Update database
      await fetch(`/api/stories/${storyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', change: 1 }),
      })
    } else {
      const index = savedStories.indexOf(storyId)
      savedStories.splice(index, 1)
      setIsSaved(false)
      toast.success('Story removed from saved')
      
      // Update database
      await fetch(`/api/stories/${storyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', change: -1 }),
      })
    }
    
    localStorage.setItem('saved-stories', JSON.stringify(savedStories))
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      toast.error('Please login to comment')
      return
    }
    if (!commentText.trim()) return

    setIsSubmittingComment(true)
    
    try {
      const response = await fetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post comment')
      }

      // Add new comment to list
      const newComment = {
        id: data.comment.id,
        content: data.comment.content,
        author: data.comment.author,
        createdAt: data.comment.createdAt,
        upvotes: 0
      }
      
      setComments([newComment, ...comments])
      setCommentText('')
      toast.success('Comment added!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to post comment')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleCommentUpvote = async (commentId: string) => {
    if (!session) {
      toast.error('Please login to upvote')
      return
    }

    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c
    ))

    try {
      await fetch(`/api/stories/${storyId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote' }),
      })
    } catch (error) {
      console.error('Error upvoting comment:', error)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleReport = () => {
    toast.success('Thank you for reporting. Our team will review this story.')
  }

  const handleEdit = () => {
    router.push(`/watchtower/story/${storyId}/edit`)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story?')) return

    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Story deleted successfully')
        router.push('/watchtower/feed')
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete story')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-light py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
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
          <p className="text-gray-600 mb-8">The story you're looking for doesn't exist or has been deleted.</p>
          <Link href="/watchtower/feed" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  const category = STORY_CATEGORIES.find(c => c.value === story.category)
  const Icon = category?.icon || Icons.AllStories
  const categoryColor = category?.color || '#6B4E71'
  const isOwnStory = session?.user?.email === story.author?.id

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/watchtower/feed"
            className="text-gray-600 hover:text-accent-gold transition inline-flex items-center gap-2"
          >
            ← Back to Stories
          </Link>
        </div>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${categoryColor}20` }}>
                <Icon className="w-6 h-6" color={categoryColor} />
              </div>
              <span className="text-sm font-medium" style={{ color: categoryColor }}>
                {category?.label}
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

            <h1 className="text-3xl font-bold text-primary-deep mb-4">
              {story.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(story.createdAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>👁️</span>
                {story.views || 0} views
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose max-w-none mb-8">
              {story.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {story.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/watchtower/feed?tag=${tag}`}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-accent-gold hover:text-white transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-6 border-t">
              {/* Upvote Button */}
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  hasUpvoted 
                    ? 'bg-red-50 text-red-500' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">❤️</span>
                <span className="font-medium">{upvoteCount}</span>
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isSaved 
                    ? 'bg-accent-gold/10 text-accent-gold' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{isSaved ? '🔖' : '📑'}</span>
                <span className="font-medium">{story.savedBy}</span>
              </button>

              {/* Share Button - for everyone */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  onMouseEnter={() => setShowShareTooltip(true)}
                  onMouseLeave={() => setShowShareTooltip(false)}
                  className="p-2 text-gray-500 hover:text-accent-gold hover:bg-gray-100 rounded-lg transition"
                >
                  <Icons.Share className="w-5 h-5" />
                </button>
                {showShareTooltip && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Share
                  </span>
                )}
              </div>

              {/* Report Button - only for other users */}
              {!isOwnStory && (
                <div className="relative">
                  <button
                    onClick={handleReport}
                    onMouseEnter={() => setShowReportTooltip(true)}
                    onMouseLeave={() => setShowReportTooltip(false)}
                    className="p-2 text-gray-500 hover:text-alert-coral hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Report className="w-5 h-5" />
                  </button>
                  {showReportTooltip && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Report
                    </span>
                  )}
                </div>
              )}

              {/* Edit Button - only for owner */}
              {isOwnStory && (
                <div className="relative ml-auto">
                  <button
                    onClick={handleEdit}
                    onMouseEnter={() => setShowEditTooltip(true)}
                    onMouseLeave={() => setShowEditTooltip(false)}
                    className="p-2 text-gray-500 hover:text-accent-gold hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Edit className="w-5 h-5" />
                  </button>
                  {showEditTooltip && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Edit
                    </span>
                  )}
                </div>
              )}

              {/* Delete Button - only for owner */}
              {isOwnStory && (
                <div className="relative">
                  <button
                    onClick={handleDelete}
                    onMouseEnter={() => setShowDeleteTooltip(true)}
                    onMouseLeave={() => setShowDeleteTooltip(false)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Delete className="w-5 h-5" />
                  </button>
                  {showDeleteTooltip && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Delete
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-deep mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment */}
          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="input-field w-full mb-3"
                rows={3}
              />
              <button
                type="submit"
                disabled={isSubmittingComment || !commentText.trim()}
                className="btn-primary px-6 py-2 disabled:opacity-50"
              >
                {isSubmittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
              <p className="text-gray-600 mb-3">Please login to join the discussion</p>
              <Link href="/auth/login" className="btn-primary inline-block">
                Login
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b last:border-0 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {comment.author?.isAnonymous ? 'Anonymous' : (comment.author?.name || 'User')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleCommentUpvote(comment.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition"
                    >
                      <span className="text-sm">❤️</span>
                      <span className="text-xs">{comment.upvotes || 0}</span>
                    </button>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}