'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DashboardIcons } from '@/components/icons/DashboardIcons'
import { userDataService } from '@/lib/userDataService'

export function SavedItems() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const saved = userDataService.getSavedItems()
    setItems(saved)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary-deep">Saved Items</h2>
        <DashboardIcons.Star className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-accent-gold/5 transition group"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-deep">{item.title}</p>
                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No saved items yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Save tips and products to see them here
            </p>
          </div>
        )}
      </div>

      <Link
        href="/academy"
        className="mt-6 block text-center text-sm text-accent-gold hover:underline"
      >
        Browse and save more
      </Link>
    </div>
  )
}