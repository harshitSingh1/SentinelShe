'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
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

interface CommentsListProps {
  storyId: string
}

const COMMENTS_STORAGE_KEY = 'story-comments'

export function CommentsList({ storyId }: CommentsListProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [upvotedComments, setUpvotedComments] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadComments()
    
    // Load upvoted comments from localStorage
    const saved = localStorage.getItem(`upvoted-comments-${storyId}`)
    if (saved) {
      setUpvotedComments(new Set(JSON.parse(saved)))
    }
  }, [storyId])

  const loadComments = () => {
    const saved = localStorage.getItem(`${COMMENTS_STORAGE_KEY}-${storyId}`)
    if (saved) {
      setComments(JSON.parse(saved))
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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session) {
      toast.error('Please login to comment')
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: session.user?.name || 'User',
        isAnonymous: false,
        id: session.user?.email || undefined,
      },
      createdAt: new Date().toISOString(),
      upvotes: 0,
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    localStorage.setItem(`${COMMENTS_STORAGE_KEY}-${storyId}`, JSON.stringify(updatedComments))
    
    setNewComment('')
    setIsSubmitting(false)
    toast.success('Comment added!')
  }

  const handleUpvote = (commentId: string) => {
    if (!session) {
      toast.error('Please login to upvote')
      return
    }

    const newUpvoted = new Set(upvotedComments)
    let voteChange = 0

    // Toggle upvote
    if (newUpvoted.has(commentId)) {
      newUpvoted.delete(commentId) // Remove upvote
      voteChange = -1
    } else {
      newUpvoted.add(commentId) // Add upvote
      voteChange = 1
    }

    setUpvotedComments(newUpvoted)
    localStorage.setItem(`upvoted-comments-${storyId}`, JSON.stringify(Array.from(newUpvoted)))

    // Update comment upvote count
    const updatedComments = comments.map(c => 
      c.id === commentId ? { ...c, upvotes: c.upvotes + voteChange } : c
    )
    setComments(updatedComments)
    localStorage.setItem(`${COMMENTS_STORAGE_KEY}-${storyId}`, JSON.stringify(updatedComments))
  }

  const handleDelete = (commentId: string) => {
    if (!session) {
      toast.error('Please login to delete comments')
      return
    }

    const comment = comments.find(c => c.id === commentId)
    if (comment?.author.id !== session.user?.email) {
      toast.error('You can only delete your own comments')
      return
    }

    if (window.confirm('Delete this comment?')) {
      const updatedComments = comments.filter(c => c.id !== commentId)
      setComments(updatedComments)
      localStorage.setItem(`${COMMENTS_STORAGE_KEY}-${storyId}`, JSON.stringify(updatedComments))
      toast.success('Comment deleted')
    }
  }

  const handleReport = (commentId: string) => {
    toast.success('Thank you for reporting. Our team will review this comment.')
  }

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="input-field w-full mb-3"
            rows={3}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="btn-primary px-6 py-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
          <p className="text-gray-600 mb-3">Please login to join the discussion</p>
          <a href="/auth/login" className="btn-primary inline-block">
            Login
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const isOwnComment = session?.user?.email === comment.author.id
            const isUpvoted = upvotedComments.has(comment.id)
            
            return (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary-deep">
                      {comment.author.isAnonymous ? 'Anonymous' : comment.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleUpvote(comment.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                        isUpvoted 
                          ? 'text-red-500 bg-red-50' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                      }`}
                      title={isUpvoted ? 'Remove upvote' : 'Upvote'}
                    >
                      <span className="text-sm">❤️</span>
                      <span className="text-xs font-medium">{comment.upvotes}</span>
                    </button>

                    {!isOwnComment && (
                      <button
                        onClick={() => handleReport(comment.id)}
                        className="p-1 text-gray-400 hover:text-alert-coral hover:bg-gray-100 rounded transition"
                        title="Report"
                      >
                        <Icons.Report className="w-4 h-4" />
                      </button>
                    )}

                    {isOwnComment && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded transition"
                        title="Delete"
                      >
                        <Icons.Delete className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm ml-1">{comment.content}</p>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500 py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  )
}