'use client'

import { useState } from 'react'
import { quickTips, tipCategories } from '@/data/academy'
import type { QuickTip } from '@/data/academy'

export function QuickTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [savedTips, setSavedTips] = useState<string[]>(() => {
    // Load saved tips from localStorage for dashboard tracking
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved-tips')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const filteredTips = selectedCategory === 'all' 
    ? quickTips 
    : quickTips.filter(tip => tip.category === selectedCategory)

  const saveTip = (tipId: string) => {
    const newSaved = savedTips.includes(tipId)
      ? savedTips.filter(id => id !== tipId)
      : [...savedTips, tipId]
    
    setSavedTips(newSaved)
    localStorage.setItem('saved-tips', JSON.stringify(newSaved))
    
    // Also update dashboard progress
    const progress = {
      tipsRead: newSaved.length,
      lastActive: new Date().toISOString()
    }
    localStorage.setItem('academy-progress', JSON.stringify(progress))
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tipCategories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-1 ${
              selectedCategory === cat.value
                ? 'bg-accent-gold text-primary-deep font-medium'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTips.map(tip => (
          <div key={tip.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">{tip.icon}</div>
            <h3 className="text-lg font-semibold text-primary-deep mb-2">{tip.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{tip.content}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{tip.readTime} sec read</span>
              
              <button
                onClick={() => saveTip(tip.id)}
                className={`text-sm transition ${
                  savedTips.includes(tip.id)
                    ? 'text-accent-gold'
                    : 'text-gray-400 hover:text-accent-gold'
                }`}
              >
                {savedTips.includes(tip.id) ? '✓ Saved' : '📌 Save tip'}
              </button>
            </div>

            {tip.isFeatured && (
              <span className="absolute top-2 right-2 text-xs bg-accent-gold/20 text-accent-gold px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No tips in this category yet.</p>
        </div>
      )}
    </div>
  )
}