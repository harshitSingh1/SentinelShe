'use client'

import { useState } from 'react'
import { protectiveMoves } from '@/data/academy'

export function ProtectiveMoves() {
  const [selectedMove, setSelectedMove] = useState<typeof protectiveMoves[0] | null>(null)

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        {protectiveMoves.map(move => (
          <button
            key={move.id}
            onClick={() => setSelectedMove(move)}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-left border-2 border-transparent hover:border-accent-gold"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{move.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-primary-deep mb-1">{move.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{move.description}</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {move.difficulty === 'beginner' ? '🌱 Beginner friendly' : '⚡ Practice recommended'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Move Details Modal */}
      {selectedMove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-4xl mb-2 block">{selectedMove.icon}</span>
                <h3 className="text-xl font-bold text-primary-deep">{selectedMove.title}</h3>
              </div>
              <button
                onClick={() => setSelectedMove(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedMove.description}</p>
            
            <h4 className="font-semibold text-primary-deep mb-3">Simple steps:</h4>
            <ol className="space-y-3 mb-6">
              {selectedMove.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-accent-gold/20 text-accent-gold w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-medium">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={() => setSelectedMove(null)}
              className="w-full btn-primary py-3"
            >
              Practice safely
            </button>
          </div>
        </div>
      )}
    </div>
  )
}