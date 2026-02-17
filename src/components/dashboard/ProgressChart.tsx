'use client'

import { useState, useEffect } from 'react'
import { userDataService } from '@/lib/userDataService'

export function ProgressChart() {
  const [weeklyData, setWeeklyData] = useState<{ day: string; count: number }[]>([])
  const [maxCount, setMaxCount] = useState(5)

  useEffect(() => {
    const data = userDataService.getWeeklyActivity()
    setWeeklyData(data)
    setMaxCount(Math.max(...data.map(d => d.count), 5))
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary-deep">Weekly Activity</h2>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent-gold"></span>
          <span className="text-xs text-gray-600">Contributions</span>
        </div>
      </div>

      <div className="relative h-64">
        {/* Chart grid */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[4, 3, 2, 1, 0].map(i => (
            <div key={i} className="border-t border-gray-100 h-12 relative">
              <span className="absolute -left-6 -top-2 text-xs text-gray-400">
                {Math.round((i / 4) * maxCount)}
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around">
          {weeklyData.map((day, idx) => (
            <div key={idx} className="w-12 flex flex-col items-center">
              <div 
                className="w-8 bg-accent-gold rounded-t transition-all duration-500 hover:bg-accent-gold/80 cursor-pointer relative group"
                style={{ height: `${(day.count / maxCount) * 180}px` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {day.count} activities
                </span>
              </div>
              <span className="text-xs text-gray-600 mt-2">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {weeklyData.every(d => d.count === 0) && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">No activity this week</p>
          <p className="text-xs text-gray-400 mt-1">
            Share stories or report incidents to see your progress
          </p>
        </div>
      )}
    </div>
  )
}