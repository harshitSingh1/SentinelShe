'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DashboardIcons } from '@/components/icons/DashboardIcons'
import { userDataService } from '@/lib/userDataService'

export function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const recent = userDataService.getRecentActivity(5)
    setActivities(recent)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays}d ago`
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'tip': return <span className="text-xl">💡</span>
      case 'move': return <span className="text-xl">🛡️</span>
      case 'story': return <span className="text-xl">📖</span>
      case 'report': return <span className="text-xl">🚨</span>
      default: return <DashboardIcons.Check className="w-5 h-5 text-safety-green" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary-deep">Recent Activity</h2>
        <DashboardIcons.Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map(activity => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-deep">{activity.title}</p>
                <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
              </div>
              <DashboardIcons.ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No recent activity</p>
            <p className="text-xs text-gray-400 mt-1">
              Share stories or report incidents to see activity here
            </p>
          </div>
        )}
      </div>

      <Link
        href="/watchtower/feed"
        className="mt-6 block text-center text-sm text-accent-gold hover:underline"
      >
        View all activity
      </Link>
    </div>
  )
}