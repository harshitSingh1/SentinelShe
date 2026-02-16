'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { STORY_CATEGORIES } from '@/lib/constants'
import toast from 'react-hot-toast'

interface Comment {
  id: string
  content: string
  author: {
    name: string | null
    isAnonymous: boolean
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
    id: string
    safetyScore?: number
  }
  upvotes: number
  comments: Comment[]
  createdAt: string
  tags: string[]
  views: number
  savedBy: number
}

interface StoryDetailProps {
  story: Story
}

export function StoryDetail({ story }: StoryDetailProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(story.upvotes)
  const [commentText, setCommentText] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [comments, setComments] = useState(story.comments)

  const category = STORY_CATEGORIES.find(c => c.value === story.category)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
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
    setIsUpvoted(!isUpvoted)
    setUpvoteCount(prev => isUpvoted ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    if (!session) {
      toast.error('Please login to save stories')
      return
    }
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Story removed from saved' : 'Story saved!')
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
    
    try {
      const response = await fetch(`/api/stories/${story.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post comment')
      }

      setComments([data.comment, ...comments])
      setCommentText('')
      toast.success('Comment added!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to post comment')
    } finally {
      setIsSubmittingComment(false)
    }
  }

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
              <span className="text-3xl">{category?.icon}</span>
              <span className="text-sm font-medium text-accent-gold">
                {category?.label}
              </span>
              {story.author.isAnonymous && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Anonymous
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-primary-deep mb-4">
              {story.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>
                  By {story.author.isAnonymous ? 'Anonymous' : story.author.name}
                </span>
                <span>•</span>
                <span>{formatDate(story.createdAt)}</span>
                <span>•</span>
                <span>{story.views} views</span>
              </div>
              {story.author.safetyScore && (
                <span className="bg-primary-deep/10 text-primary-deep px-3 py-1 rounded-full text-xs">
                  Safety Score: {story.author.safetyScore}
                </span>
              )}
            </div>
          </div>

          <div className="p-8">
            <div className="prose max-w-none mb-8">
              {story.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {story.tags.length > 0 && (
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

            <div className="flex items-center gap-6 pt-6 border-t">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 transition ${
                  isUpvoted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <span className="text-xl">❤️</span>
                <span>{upvoteCount}</span>
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 transition ${
                  isSaved ? 'text-accent-gold' : 'text-gray-500 hover:text-accent-gold'
                }`}
              >
                <span className="text-xl">{isSaved ? '🔖' : '📑'}</span>
                <span>{story.savedBy}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-500 hover:text-accent-gold transition"
              >
                <span className="text-xl">📤</span>
                <span>Share</span>
              </button>

              <button
                onClick={() => router.push('/watchtower/report')}
                className="flex items-center gap-2 text-gray-500 hover:text-alert-coral transition ml-auto"
              >
                <span className="text-xl">🚩</span>
                <span>Report</span>
              </button>
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
                    <div>
                      <span className="font-medium">
                        {comment.author.isAnonymous ? 'Anonymous' : comment.author.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <span className="text-sm">❤️ {comment.upvotes}</span>
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