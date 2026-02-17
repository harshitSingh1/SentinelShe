'use client'

import { useState, useEffect } from 'react'
import { checklists } from '@/data/academy'

export function SafetyChecklists() {
  const [activeChecklist, setActiveChecklist] = useState<string | null>(null)
  const [completedItems, setCompletedItems] = useState<Record<string, boolean[]>>({})

  // Load completed items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('checklist-progress')
    if (saved) {
      setCompletedItems(JSON.parse(saved))
    }
  }, [])

  const toggleItem = (checklistId: string, itemIndex: number) => {
    setCompletedItems(prev => {
      const checklistCompleted = prev[checklistId] || new Array(
        checklists.find(c => c.id === checklistId)?.items.length || 0
      ).fill(false)

      const updated = {
        ...prev,
        [checklistId]: checklistCompleted.map((completed, i) => 
          i === itemIndex ? !completed : completed
        )
      }
      
      localStorage.setItem('checklist-progress', JSON.stringify(updated))
      return updated
    })
  }

  const getProgress = (checklistId: string) => {
    const checklist = checklists.find(c => c.id === checklistId)
    if (!checklist) return 0
    
    const completed = completedItems[checklistId] || new Array(checklist.items.length).fill(false)
    const doneCount = completed.filter(Boolean).length
    return Math.round((doneCount / checklist.items.length) * 100)
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {checklists.map(list => {
        const progress = getProgress(list.id)
        const isActive = activeChecklist === list.id

        return (
          <div key={list.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="text-3xl mb-3">{list.icon}</div>
              <h3 className="text-lg font-semibold text-primary-deep mb-2">{list.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{list.description}</p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-gold rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveChecklist(isActive ? null : list.id)}
                className="text-accent-gold hover:underline text-sm w-full text-left"
              >
                {isActive ? '− Hide items' : '+ View checklist'}
              </button>
            </div>

            {isActive && (
              <div className="border-t px-6 py-4 bg-gray-50">
                <ul className="space-y-3">
                  {list.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={completedItems[list.id]?.[i] || false}
                        onChange={() => toggleItem(list.id, i)}
                        className="mt-1 w-4 h-4 text-accent-gold rounded border-gray-300 focus:ring-accent-gold"
                      />
                      <span className={`text-sm ${completedItems[list.id]?.[i] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}