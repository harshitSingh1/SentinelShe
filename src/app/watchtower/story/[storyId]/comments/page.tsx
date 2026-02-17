import { Metadata } from 'next'
import Link from 'next/link'
import { CommentsList } from '@/components/watchtower/CommentsList'

interface PageProps {
  params: Promise<{
    storyId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params
  
  return {
    title: `Comments`,
  }
}

export default async function CommentsPage({ params }: PageProps) {
  const { storyId } = await params

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link 
            href={`/watchtower/story/${storyId}`}
            className="text-gray-600 hover:text-accent-gold transition inline-flex items-center gap-2"
          >
            ← Back to Story
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-primary-deep mb-6">Comments</h1>
          <CommentsList storyId={storyId} />
        </div>
      </div>
    </div>
  )
}