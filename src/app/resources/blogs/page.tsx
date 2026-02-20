import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '5 Self-Defense Tips Every Woman Should Know',
  description: 'Practical safety tips for everyday situations',
}

const selfDefenseTips = [
  {
    title: 'Trust Your Instincts',
    tips: [
      'If something feels wrong, act immediately — don’t ignore your intuition',
      'Leave uncomfortable situations early',
      'Avoid isolated or poorly lit areas whenever possible',
      'Keep emergency contacts on speed dial',
      'Your safety is more important than being polite',
    ],
    icon: '🧠',
  },
  {
    title: 'Stay Aware of Your Surroundings',
    tips: [
      'Avoid distractions like excessive phone use while walking',
      'Scan your environment regularly',
      'Walk confidently with good posture',
      'Notice exits when entering new places',
      'Be aware of people around you and their behavior',
    ],
    icon: '👀',
  },
  {
    title: 'Use Your Voice as a Weapon',
    tips: [
      'Shout loudly to attract attention if threatened',
      'Use clear commands like “STOP” or “BACK OFF”',
      'Practice speaking firmly and confidently',
      'Don’t hesitate to create a scene if needed',
      'Call emergency services immediately when unsafe',
    ],
    icon: '📢',
  },
  {
    title: 'Target Vulnerable Areas',
    tips: [
      'Aim for eyes, nose, throat, groin, or knees',
      'Use quick, decisive movements',
      'Strike and move — don’t stay engaged',
      'Use everyday objects (keys, pen, bag) to defend yourself',
      'Focus on escaping rather than fighting',
    ],
    icon: '🥋',
  },
  {
    title: 'Learn Basic Self-Defense Techniques',
    tips: [
      'Take a self-defense or martial arts class',
      'Practice basic moves regularly',
      'Learn how to break free from wrist or choke holds',
      'Build physical strength and stamina',
      'Stay mentally prepared for emergency situations',
    ],
    icon: '💪',
  },
];


export default function womenDefenceTechniques() {
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
          {selfDefenseTips.map((section) => (
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