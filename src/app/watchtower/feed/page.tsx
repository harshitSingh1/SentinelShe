import { Metadata } from 'next'
import Link from 'next/link'
import { StoryFeed } from '@/components/watchtower/StoryFeed'

export const metadata: Metadata = {
  title: 'Community Stories',
  description: 'Read and share experiences from the community',
}

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-deep mb-2">
              Community Stories
            </h1>
            <p className="text-gray-600">
              Real experiences, shared to educate and empower
            </p>
          </div>
          <Link
            href="/watchtower/story/new"
            className="btn-primary"
          >
            Share Your Story
          </Link>
        </div>

        <StoryFeed />
      </div>
    </div>
  )
}