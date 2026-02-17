'use client'

import { useState } from 'react'
import { scenarios } from '@/data/academy'

export function ScenariosGrid() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(null)

  return (
    <div>
      {/* Scenario Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario)}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-left border-2 border-transparent hover:border-accent-gold"
          >
            <div className="text-4xl mb-3">{scenario.icon}</div>
            <h3 className="text-lg font-semibold text-primary-deep mb-2">{scenario.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
            <div className="text-accent-gold text-sm flex items-center gap-1">
              <span>Quick actions</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for quick actions */}
      {selectedScenario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-4xl mb-2 block">{selectedScenario.icon}</span>
                <h3 className="text-xl font-bold text-primary-deep">{selectedScenario.title}</h3>
              </div>
              <button
                onClick={() => setSelectedScenario(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{selectedScenario.description}</p>
            
            <h4 className="font-semibold text-primary-deep mb-3">Quick Actions:</h4>
            <ul className="space-y-3 mb-6">
              {selectedScenario.quickActions.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedScenario(null)}
              className="w-full btn-primary py-3"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {scenarios.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No scenarios available.</p>
        </div>
      )}
    </div>
  )
}