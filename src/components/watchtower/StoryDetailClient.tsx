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
}

interface StoryDetailClientProps {
  storyId: string
}

const STORIES_STORAGE_KEY = 'community-stories'
const COMMENTS_STORAGE_KEY = 'story-comments'

export function StoryDetailClient({ storyId }: StoryDetailClientProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [hasUpvoted, setHasUpvoted] = useState(false)

  useEffect(() => {
    // Load story from localStorage
    const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
    const foundStory = stories.find((s: Story) => s.id === storyId)
    
    if (foundStory) {
      setStory(foundStory)
      setUpvoteCount(foundStory.upvotes)
      
      // Load comments
      const savedComments = localStorage.getItem(`${COMMENTS_STORAGE_KEY}-${storyId}`)
      if (savedComments) {
        setComments(JSON.parse(savedComments))
      }

      // Check if user has upvoted this story
      const upvotedStories = JSON.parse(localStorage.getItem('upvoted-stories') || '[]')
      setHasUpvoted(upvotedStories.includes(storyId))

      // Check if story is saved
      const savedStories = JSON.parse(localStorage.getItem('saved-stories') || '[]')
      setIsSaved(savedStories.includes(storyId))

      // Increment view count
      const updatedStories = stories.map((s: Story) => 
        s.id === storyId ? { ...s, views: (s.views || 0) + 1 } : s
      )
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))
    }
    
    setLoading(false)
  }, [storyId])

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleUpvote = () => {
    if (!session) {
      toast.error('Please login to upvote')
      return
    }

    const upvotedStories = JSON.parse(localStorage.getItem('upvoted-stories') || '[]')
    
    if (!hasUpvoted) {
      upvotedStories.push(storyId)
      setUpvoteCount(prev => prev + 1)
      setHasUpvoted(true)
      toast.success('Story upvoted!')
    } else {
      const index = upvotedStories.indexOf(storyId)
      upvotedStories.splice(index, 1)
      setUpvoteCount(prev => prev - 1)
      setHasUpvoted(false)
      toast.success('Upvote removed')
    }
    
    localStorage.setItem('upvoted-stories', JSON.stringify(upvotedStories))

    const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
    const updatedStories = stories.map((s: Story) => 
      s.id === storyId ? { ...s, upvotes: hasUpvoted ? s.upvotes - 1 : s.upvotes + 1 } : s
    )
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))
  }

  const handleSave = () => {
    if (!session) {
      toast.error('Please login to save stories')
      return
    }

    const savedStories = JSON.parse(localStorage.getItem('saved-stories') || '[]')
    
    if (!isSaved) {
      savedStories.push(storyId)
      setIsSaved(true)
      toast.success('Story saved!')
    } else {
      const index = savedStories.indexOf(storyId)
      savedStories.splice(index, 1)
      setIsSaved(false)
      toast.success('Story removed from saved')
    }
    
    localStorage.setItem('saved-stories', JSON.stringify(savedStories))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      toast.error('Please login to comment')
      return
    }
    if (!commentText.trim()) return

    setIsSubmittingComment(true)
    
const newComment: Comment = {
  id: Date.now().toString(),
  content: commentText,
  author: { 
    name: session.user?.name || 'User', 
    isAnonymous: false,
    id: session.user?.email || undefined 
  },
  createdAt: new Date().toISOString(),
  upvotes: 0
}

    const updatedComments = [newComment, ...comments]
    setComments(updatedComments)
    localStorage.setItem(`${COMMENTS_STORAGE_KEY}-${storyId}`, JSON.stringify(updatedComments))

    const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
    const updatedStories = stories.map((s: Story) => 
      s.id === storyId ? { ...s, comments: (s.comments || 0) + 1 } : s
    )
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))

    setCommentText('')
    setIsSubmittingComment(false)
    toast.success('Comment added!')
  }

  const handleCommentUpvote = (commentId: string) => {
    const updatedComments = comments.map(c => 
      c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c
    )
    setComments(updatedComments)
    localStorage.setItem(`${COMMENTS_STORAGE_KEY}-${storyId}`, JSON.stringify(updatedComments))
  }

  const handleEdit = () => {
    router.push(`/watchtower/story/${storyId}/edit`)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      const stories = JSON.parse(localStorage.getItem(STORIES_STORAGE_KEY) || '[]')
      const updatedStories = stories.filter((s: Story) => s.id !== storyId)
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(updatedStories))
      toast.success('Story deleted successfully')
      router.push('/watchtower/feed')
    }
  }

  const handleReport = () => {
    toast.success('Thank you for reporting. Our team will review this story.')
  }

  const isOwnStory = session?.user?.email === story.author.id

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/watchtower/feed"
            className="text-gray-600 hover:text-accent-gold transition inline-flex items-center gap-2"
          >
            ← Back to Stories
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${categoryColor}20` }}>
                <Icon className="w-6 h-6" color={categoryColor} />
              </div>
              <span className="text-sm font-medium" style={{ color: categoryColor }}>
                {category?.label}
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

          <div className="p-8">
            <div className="prose max-w-none mb-8">
              {story.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 pt-6 border-t">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  hasUpvoted 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">❤️</span>
                <span className="font-medium">{upvoteCount}</span>
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isSaved 
                    ? 'text-accent-gold bg-accent-gold/10' 
                    : 'text-gray-500 hover:text-accent-gold hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{isSaved ? '🔖' : '📑'}</span>
                <span className="font-medium">{story.savedBy}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-accent-gold hover:bg-gray-100 rounded-lg transition"
              >
                <Icons.Share className="w-5 h-5" />
              </button>

              {!isOwnStory && (
                <button
                  onClick={handleReport}
                  className="p-2 text-gray-500 hover:text-alert-coral hover:bg-gray-100 rounded-lg transition ml-auto"
                >
                  <Icons.Report className="w-5 h-5" />
                </button>
              )}

              {isOwnStory && (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-2 text-gray-500 hover:text-accent-gold hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Icons.Delete className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </article>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary-deep mb-6">
            Comments ({comments.length})
          </h2>

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

          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b last:border-0 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {comment.author.isAnonymous ? 'Anonymous' : comment.author.name}
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
                      <span className="text-xs">{comment.upvotes}</span>
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