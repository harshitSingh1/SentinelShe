import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Safety Tips',
  description: 'Practical safety tips for everyday situations',
}

const tips = [
  {
    title: 'Walking Alone at Night',
    tips: [
      'Stay in well-lit areas',
      'Keep your phone accessible, not in your bag',
      'Share your location with a trusted friend',
      'Walk confidently and stay aware of your surroundings',
      'Have your keys ready before reaching your door',
    ],
    icon: '🌙',
  },
  {
    title: 'Public Transport Safety',
    tips: [
      'Sit near the driver or in well-lit areas',
      'Keep your belongings close',
      'Trust your instincts - move if you feel uncomfortable',
      'Let someone know your expected arrival time',
      'Stay awake and aware during your journey',
    ],
    icon: '🚇',
  },
  {
    title: 'Digital Safety',
    tips: [
      'Use strong, unique passwords',
      'Enable two-factor authentication',
      'Be careful what you share on social media',
      'Don\'t share your location in real-time',
      'Regularly check your privacy settings',
    ],
    icon: '💻',
  },
  {
    title: 'Home Security',
    tips: [
      'Always lock doors and windows',
      'Use a peephole before opening the door',
      'Install motion-sensor lights',
      'Get to know your neighbors',
      'Consider a security camera or doorbell',
    ],
    icon: '🏠',
  },
]

export default function SafetyTipsPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/resources" className="text-accent-gold hover:underline mb-8 inline-block">
          ← Back to Resources
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Safety Tips
        </h1>

        <div className="space-y-6">
          {tips.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-xl font-bold text-primary-deep">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}