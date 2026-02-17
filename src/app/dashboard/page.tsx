import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { SavedItems } from '@/components/dashboard/SavedItems'
import { ProgressChart } from '@/components/dashboard/ProgressChart'
import { QuickActions } from '@/components/dashboard/QuickActions'

export const metadata: Metadata = {
  title: 'Dashboard | SentinelShe',
  description: 'Your personal safety dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Welcome back, {session.user?.name || 'Safety Warrior'}!
          </h1>
          <p className="text-gray-600">
            Here's your safety journey progress and community impact.
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Progress Chart */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressChart />
            <RecentActivity />
          </div>

          {/* Right Column - Saved Items & Quick Actions */}
          <div className="space-y-6">
            <SavedItems />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}