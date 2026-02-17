'use client'

import { useState, useEffect } from 'react'
import { DashboardIcons } from '@/components/icons/DashboardIcons'
import { userDataService } from '@/lib/userDataService'

export function DashboardStats() {
  const [stats, setStats] = useState({
    safetyScore: 0,
    tipsRead: 0,
    movesLearned: 0,
    checklistsCompleted: 0,
    reportsSubmitted: 0,
    storiesShared: 0,
    savedProducts: 0,
    savedStories: 0,
    safetyLevel: { label: 'Beginner', color: 'text-gray-600' }
  })

  useEffect(() => {
    // Load all stats from the data service
    const safetyScore = userDataService.calculateSafetyScore()
    
    setStats({
      safetyScore,
      tipsRead: userDataService.getSavedTips(),
      movesLearned: userDataService.getPracticedMoves(),
      checklistsCompleted: userDataService.getCompletedChecklists(),
      reportsSubmitted: userDataService.getUserReports().length,
      storiesShared: userDataService.getUserStories().length,
      savedProducts: userDataService.getSavedProducts(),
      savedStories: userDataService.getSavedStories(),
      safetyLevel: userDataService.getSafetyLevel(safetyScore)
    })
  }, [])

  return (
    <>
      {/* Safety Score Card */}
      <div className="bg-linear-to-br from-primary-deep to-primary-mid text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <DashboardIcons.Shield className="w-8 h-8 text-accent-gold" />
          <span className={`text-xs bg-white/20 px-2 py-1 rounded-full ${stats.safetyLevel.color}`}>
            {stats.safetyLevel.label}
          </span>
        </div>
        <div className="text-3xl font-bold mb-1">{stats.safetyScore}</div>
        <div className="text-sm text-white/80">Safety Score</div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-gold rounded-full transition-all duration-500"
            style={{ width: `${(stats.safetyScore / 650) * 100}%` }}
          />
        </div>
      </div>

      {/* Learning Progress Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <DashboardIcons.Learning className="w-8 h-8 text-primary-mid" />
          <span className="text-xs bg-primary-deep/10 text-primary-deep px-2 py-1 rounded-full">
            {stats.tipsRead + stats.movesLearned} total
          </span>
        </div>
        <div className="text-3xl font-bold text-primary-deep mb-1">
          {stats.tipsRead}
        </div>
        <div className="text-sm text-gray-600">Tips Saved</div>
        <div className="mt-2 text-sm text-gray-500">
          {stats.movesLearned} moves · {stats.checklistsCompleted} checklists
        </div>
      </div>

      {/* Community Impact Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <DashboardIcons.Community className="w-8 h-8 text-primary-mid" />
          <span className="text-xs bg-primary-deep/10 text-primary-deep px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="text-3xl font-bold text-primary-deep mb-1">
          {stats.storiesShared + stats.reportsSubmitted}
        </div>
        <div className="text-sm text-gray-600">Contributions</div>
        <div className="mt-2 text-sm text-gray-500">
          {stats.storiesShared} stories · {stats.reportsSubmitted} reports
        </div>
      </div>

      {/* Saved Items Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <DashboardIcons.Star className="w-8 h-8 text-primary-mid" />
          <span className="text-xs bg-primary-deep/10 text-primary-deep px-2 py-1 rounded-full">
            Saved
          </span>
        </div>
        <div className="text-3xl font-bold text-primary-deep mb-1">
          {stats.savedProducts + stats.savedStories}
        </div>
        <div className="text-sm text-gray-600">Saved Items</div>
        <div className="mt-2 text-sm text-gray-500">
          {stats.savedProducts} products · {stats.savedStories} stories
        </div>
      </div>
    </>
  )
}