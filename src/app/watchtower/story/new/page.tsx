import { Metadata } from 'next'
import { StoryForm } from '@/components/watchtower/StoryForm'

export const metadata: Metadata = {
  title: 'Share Your Story',
  description: 'Share your experience to educate and empower others',
}

export default function NewStoryPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Share Your Story
          </h1>
          <p className="text-gray-600">
            Your experience can help and inspire others in the community.
            All stories are moderated before publishing.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <StoryForm />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-800 mb-2">📝 Story Guidelines</h2>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Be respectful and considerate of others</li>
            <li>• Do not share personal contact information</li>
            <li>• Focus on your experience and lessons learned</li>
            <li>• You can post anonymously if you prefer</li>
            <li>• Your story will be reviewed within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  )
}