'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GADGET_CATEGORIES } from '@/lib/constants'

interface Question {
  id: string
  text: string
  options: {
    value: string
    label: string
    icon?: string
  }[]
}

const questions: Question[] = [
  {
    id: 'situation',
    text: 'What is your primary concern?',
    options: [
      { value: 'night-commute', label: 'Night commute / walking alone', icon: '🌙' },
      { value: 'public-transport', label: 'Public transport safety', icon: '🚇' },
      { value: 'campus-safety', label: 'Campus / school safety', icon: '🎓' },
      { value: 'travel', label: 'Travel / hotel safety', icon: '✈️' },
      { value: 'home-safety', label: 'Home / apartment safety', icon: '🏠' },
      { value: 'general', label: 'General peace of mind', icon: '🛡️' },
    ],
  },
  {
    id: 'comfort',
    text: 'What is your comfort level with self-defense tools?',
    options: [
      { value: 'beginner', label: 'Beginner - Prefer non-violent options', icon: '🌱' },
      { value: 'intermediate', label: 'Intermediate - Open to various tools', icon: '⚡' },
      { value: 'advanced', label: 'Advanced - Comfortable with training', icon: '🔥' },
    ],
  },
  {
    id: 'size',
    text: 'What size tool would you prefer?',
    options: [
      { value: 'keychain', label: 'Keychain sized (very compact)', icon: '🔑' },
      { value: 'pocket', label: 'Pocket sized', icon: '👖' },
      { value: 'bag', label: 'Bag sized (can carry in purse)', icon: '👜' },
    ],
  },
  {
    id: 'features',
    text: 'What features are most important to you?',
    options: [
      { value: 'loud', label: 'Loud alarm / noise maker', icon: '🔊' },
      { value: 'physical', label: 'Physical self-defense tool', icon: '🛡️' },
      { value: 'tracking', label: 'GPS tracking / location sharing', icon: '📍' },
      { value: 'light', label: 'Bright light / strobe', icon: '💡' },
      { value: 'multi', label: 'Multi-function tool', icon: '🔧' },
    ],
  },
]

// Mock recommendations based on answers
const getRecommendations = (answers: Record<string, string>) => {
  return [
    {
      id: '1',
      name: 'Personal Safety Alarm',
      category: 'ALARM',
      description: 'Compact 130dB alarm with LED light',
      price: 19.99,
      match: 95,
      image: '🔊',
    },
    {
      id: '2',
      name: 'Pepper Spray Keychain',
      category: 'SPRAY',
      description: 'Quick-release pepper spray with UV dye',
      price: 14.99,
      match: 88,
      image: '💨',
    },
    {
      id: '3',
      name: 'GPS Tracker',
      category: 'TRACKER',
      description: 'Real-time location tracking with app',
      price: 49.99,
      match: 82,
      image: '📍',
    },
  ]
}

export function GadgetFinder() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      const results = getRecommendations(newAnswers)
      setRecommendations(results)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentStep(0)
    setShowResults(false)
    setRecommendations([])
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-deep mb-2">
            Your Personalized Recommendations
          </h2>
          <p className="text-gray-600">
            Based on your answers, here are the best matches for you
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((item) => {
            const category = GADGET_CATEGORIES.find(c => c.value === item.category)
            
            return (
              <div
                key={item.id}
                className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/armory/${item.id}`)}
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl bg-primary-mid/10 w-20 h-20 rounded-lg flex items-center justify-center">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-accent-gold">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        {category?.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.match}% match</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent-gold rounded-full"
                            style={{ width: `${item.match}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={handleRestart}
            className="btn-secondary"
          >
            Start Over
          </button>
          <button
            onClick={() => router.push('/armory')}
            className="btn-primary"
          >
            Browse All Gadgets
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-gold rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-primary-deep mb-8">
          {currentQuestion.text}
        </h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className="w-full p-6 border-2 rounded-lg hover:border-accent-gold hover:bg-accent-gold/5 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{option.icon}</span>
                <span className="flex-1 text-left font-medium">
                  {option.label}
                </span>
                <span className="text-accent-gold opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg transition ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-accent-gold'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleRestart}
          className="text-gray-600 hover:text-accent-gold transition"
        >
          Restart
        </button>
      </div>
    </div>
  )
}