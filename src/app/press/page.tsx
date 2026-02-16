import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press',
  description: 'Press releases and media resources',
}

const pressReleases = [
  {
    date: '2024-02-15',
    title: 'SentinelShe Launches Community Safety Map Feature',
    summary: 'New interactive map allows women to report and view safety incidents in real-time.',
  },
  {
    date: '2024-01-20',
    title: 'SentinelShe Reaches 10,000 Community Members',
    summary: 'Women safety platform celebrates major milestone in mission to empower women.',
  },
  {
    date: '2023-12-10',
    title: 'SentinelShe Partners with Women Safety Foundation',
    summary: 'Partnership aims to bring self-defense training to underserved communities.',
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-4">
          Press Resources
        </h1>
        <p className="text-gray-600 mb-8">
          Latest news and media resources about SentinelShe.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-deep mb-6">Press Releases</h2>
              <div className="space-y-6">
                {pressReleases.map((release) => (
                  <div key={release.title} className="border-b last:border-0 pb-6 last:pb-0">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(release.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <h3 className="text-lg font-semibold text-primary-deep mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{release.summary}</p>
                    <Link 
                      href={`/press/${release.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-accent-gold hover:underline text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-primary-deep mb-4">Media Contact</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Press Inquiries</p>
                  <a href="mailto:press@sentinelshe.com" className="text-accent-gold hover:underline text-sm">
                    press@sentinelshe.com
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h2 className="text-lg font-bold text-primary-deep mb-4">Media Kit</h2>
                <button className="w-full btn-primary">
                  Download Press Kit
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Includes logos, brand guidelines, and fact sheet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}