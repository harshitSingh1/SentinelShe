'use client'

import Link from 'next/link'
import { DashboardIcons } from '@/components/icons/DashboardIcons'

const actions = [
  {
    title: 'Learn a Tip',
    description: 'Quick safety awareness',
    icon: <DashboardIcons.Learning className="w-6 h-6 text-accent-gold" />,
    href: '/academy',
    color: 'bg-accent-gold/10 hover:bg-accent-gold/20'
  },
  {
    title: 'Share Story',
    description: 'Inspire others',
    icon: <DashboardIcons.Community className="w-6 h-6 text-primary-mid" />,
    href: '/watchtower/story/new',
    color: 'bg-primary-mid/10 hover:bg-primary-mid/20'
  },
  {
    title: 'Report Incident',
    description: 'Alert community',
    icon: <DashboardIcons.Alert className="w-6 h-6 text-alert-coral" />,
    href: '/watchtower/report',
    color: 'bg-alert-coral/10 hover:bg-alert-coral/20'
  },
  {
    title: 'Browse Armory',
    description: 'Find safety tools',
    icon: <DashboardIcons.Shield className="w-6 h-6 text-safety-green" />,
    href: '/armory',
    color: 'bg-safety-green/10 hover:bg-safety-green/20'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-primary-deep mb-6">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <Link
            key={action.title}
            href={action.href}
            className={`p-4 rounded-lg transition text-center ${action.color}`}
          >
            <div className="flex justify-center mb-2">
              {action.icon}
            </div>
            <h3 className="text-sm font-medium text-primary-deep">{action.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <Link
          href="/academy/checklists"
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <DashboardIcons.Check className="w-5 h-5 text-safety-green" />
            <div>
              <p className="text-sm font-medium text-primary-deep">Daily Safety Checklist</p>
              <p className="text-xs text-gray-500">3 items remaining</p>
            </div>
          </div>
          <DashboardIcons.ArrowRight className="w-4 h-4 text-gray-400" />
        </Link>
      </div>
    </div>
  )
}