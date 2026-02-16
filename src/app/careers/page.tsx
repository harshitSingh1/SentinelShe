import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the SentinelShe team',
}

const jobs = [
  {
    title: 'Community Manager',
    department: 'Community',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help grow and moderate our community of women supporting women.',
  },
  {
    title: 'Self-Defense Instructor',
    department: 'Education',
    location: 'New York, NY',
    type: 'Part-time',
    description: 'Create and deliver self-defense content for our Academy.',
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and improve our platform using Next.js and React.',
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-4">
          Join Our Team
        </h1>
        <p className="text-gray-600 mb-8">
          Help us build a safer world for women. Check out our open positions below.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job.title} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-primary-deep">{job.title}</h2>
                  <span className="text-sm bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{job.department} · {job.location}</p>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <Link 
                  href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-accent-gold hover:underline text-sm"
                >
                  View Position →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600 mb-4">Don't see a matching position?</p>
            <Link href="/contact" className="btn-primary inline-block">
              Send us your resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}