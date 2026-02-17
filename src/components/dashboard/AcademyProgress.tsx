'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { quickTips, protectiveMoves, checklists } from '@/data/academy'

export function AcademyProgress() {
  const [stats, setStats] = useState({
    tipsRead: 0,
    movesPracticed: 0,
    checklistsCompleted: 0,
    lastActive: '',
  })

  useEffect(() => {
    // Load progress from localStorage
    const savedTips = localStorage.getItem('saved-tips')
    const savedChecklists = localStorage.getItem('checklist-progress')
    const savedMoves = localStorage.getItem('practiced-moves')

    const tips = savedTips ? JSON.parse(savedTips).length : 0
    const moves = savedMoves ? JSON.parse(savedMoves).length : 0
    
    // Calculate completed checklists
    let checklistsDone = 0
    if (savedChecklists) {
      const checklistProgress = JSON.parse(savedChecklists)
      checklists.forEach(list => {
        const completed = checklistProgress[list.id] || []
        if (completed.filter(Boolean).length === list.items.length) {
          checklistsDone++
        }
      })
    }

    setStats({
      tipsRead: tips,
      movesPracticed: moves,
      checklistsCompleted: checklistsDone,
      lastActive: new Date().toLocaleDateString(),
    })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-primary-deep mb-4">Your Safety Journey</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-gold">{stats.tipsRead}</div>
          <div className="text-xs text-gray-500">Tips Saved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-gold">{stats.movesPracticed}</div>
          <div className="text-xs text-gray-500">Moves Learned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-gold">{stats.checklistsCompleted}</div>
          <div className="text-xs text-gray-500">Checklists Done</div>
        </div>
      </div>

      <div className="space-y-3">
        <Link 
          href="/academy#quick-tips"
          className="block w-full text-center py-2 bg-primary-deep/10 text-primary-deep rounded-lg hover:bg-primary-deep/20 transition"
        >
          Continue Learning
        </Link>
        <Link 
          href="/academy#checklists"
          className="block w-full text-center py-2 border-2 border-primary-deep text-primary-deep rounded-lg hover:bg-primary-deep hover:text-white transition"
        >
          View Checklists
        </Link>
      </div>

      {stats.lastActive && (
        <p className="text-xs text-gray-400 mt-4 text-center">
          Last active: {stats.lastActive}
        </p>
      )}
    </div>
  )
}