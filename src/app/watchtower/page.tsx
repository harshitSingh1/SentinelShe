import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community Watchtower',
  description: 'Community-powered safety map and incident reporting',
}

// Mock data - replace with database calls
const recentReports = [
  {
    id: '1',
    type: 'SUSPICIOUS_ACTIVITY',
    location: 'Central Park, NY',
    time: '2 hours ago',
    verified: true,
  },
  {
    id: '2',
    type: 'UNSAFE_CONDITION',
    location: 'Main St & 5th Ave',
    time: '5 hours ago',
    verified: false,
  },
  {
    id: '3',
    type: 'HARASSMENT',
    location: 'Downtown Metro Station',
    time: '1 day ago',
    verified: true,
  },
]

const recentStories = [
  {
    id: '1',
    title: 'How I stayed safe during a late-night commute',
    author: 'Anonymous',
    likes: 234,
    comments: 45,
  },
  {
    id: '2',
    title: 'Self-defense class changed my life',
    author: 'Priya M.',
    likes: 567,
    comments: 89,
  },
  {
    id: '3',
    title: 'Warning: New scam targeting women',
    author: 'Anonymous',
    likes: 892,
    comments: 123,
  },
]

export default function WatchtowerPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-deep mb-4">
            Community Watchtower
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Stay informed and help others by sharing incidents and experiences in your area.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/watchtower/reports"
            className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition group"
          >
            <div className="text-5xl mb-4">📢</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition">
              Report an Incident
            </h2>
            <p className="text-gray-600">
              Share suspicious activities or unsafe conditions to alert your community
            </p>
          </Link>

          <Link
            href="/watchtower/feed"
            className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition group"
          >
            <div className="text-5xl mb-4">📖</div>
            <h2 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition">
              Share Your Story
            </h2>
            <p className="text-gray-600">
              Inspire and educate others by sharing your experiences
            </p>
          </Link>
        </div>

        {/* Map Preview */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-primary-deep">Live Safety Map</h2>
            </div>
            <div className="h-96 bg-primary-mid/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 mb-4">Interactive map loading...</p>
                <Link 
                  href="/watchtower/map"
                  className="btn-primary inline-block"
                >
                  View Full Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Reports */}
          <div>
            <h2 className="text-2xl font-bold text-primary-deep mb-6">Recent Reports</h2>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium">{report.type.replace('_', ' ')}</span>
                    {report.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{report.location}</p>
                  <p className="text-xs text-gray-500">{report.time}</p>
                </div>
              ))}
            </div>
            <Link 
  href="/watchtower/reports" 
  className="inline-block mt-4 text-accent-gold hover:underline"
>
  View all reports →
</Link>
          </div>

          {/* Recent Stories */}
          <div>
            <h2 className="text-2xl font-bold text-primary-deep mb-6">Community Stories</h2>
            <div className="space-y-4">
              {recentStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold mb-2">{story.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">By {story.author}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>❤️ {story.likes}</span>
                    <span>💬 {story.comments}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              href="/watchtower/feed"
              className="inline-block mt-4 text-accent-gold hover:underline"
            >
              Read more stories →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}