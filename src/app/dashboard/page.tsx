import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal safety dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-deep mb-8">My Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Safety Score Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-2">🛡️</div>
            <h2 className="text-lg font-semibold mb-2">Safety Score</h2>
            <div className="text-3xl font-bold text-accent-gold mb-2">100</div>
            <p className="text-sm text-gray-600">Complete courses to increase your score</p>
          </div>

          {/* Learning Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-2">📚</div>
            <h2 className="text-lg font-semibold mb-2">Learning Progress</h2>
            <div className="text-3xl font-bold text-accent-gold mb-2">0%</div>
            <p className="text-sm text-gray-600">0 of 5 courses completed</p>
          </div>

          {/* Community Contributions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-2">🗼</div>
            <h2 className="text-lg font-semibold mb-2">Contributions</h2>
            <div className="text-3xl font-bold text-accent-gold mb-2">0</div>
            <p className="text-sm text-gray-600">Reports and stories shared</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary-deep mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/watchtower/report"
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📢</div>
              <span className="font-medium">Report Incident</span>
            </Link>
            <Link
              href="/watchtower/feed"
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📖</div>
              <span className="font-medium">Share Story</span>
            </Link>
            <Link
              href="/academy"
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">🎓</div>
              <span className="font-medium">Continue Learning</span>
            </Link>
            <Link
              href="/armory/finder"
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">🛒</div>
              <span className="font-medium">Find Safety Gadgets</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}