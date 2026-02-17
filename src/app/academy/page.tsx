import { Metadata } from 'next'
import Link from 'next/link'
import { QuickTips } from '@/components/academy/QuickTips'
import { ScenariosGrid } from '@/components/academy/ScenariosGrid'
import { ProtectiveMoves } from '@/components/academy/ProtectiveMoves'
import { SafetyChecklists } from '@/components/academy/SafetyChecklists'

export const metadata: Metadata = {
  title: 'Safety Awareness Hub',
  description: 'Quick, practical safety awareness tips and protective techniques',
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-deep to-primary-mid text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Safety <span className="text-accent-gold">Instincts</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Quick, practical awareness tips that become second nature. 
            No long courses - just real-world protection that fits your life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#quick-tips" className="bg-accent-gold text-primary-deep px-6 py-3 rounded-lg font-semibold hover:bg-accent-gold/90 transition">
              Start Learning
            </Link>
            <Link href="#checklists" className="border-2 border-white hover:bg-white hover:text-primary-deep px-6 py-3 rounded-lg transition">
              Safety Checklists
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section id="quick-tips" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">⚡ Quick Awareness Tips</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Simple habits that take seconds to learn, a lifetime to benefit from.
          </p>
          <QuickTips />
        </div>
      </section>

      {/* Real Scenarios Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">🗺️ Real Situations</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Quick thinking for common scenarios. Know what to do before it happens.
          </p>
          <ScenariosGrid />
        </div>
      </section>

      {/* Simple Protective Moves */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">🛡️ Simple Protective Moves</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Easy-to-remember techniques that can create distance and help you escape.
          </p>
          <ProtectiveMoves />
        </div>
      </section>

      {/* Quick Checklists */}
      <section id="checklists" className="py-16 bg-primary-deep/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">✅ Safety Checklists</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Quick reminders for different situations. Check and go.
          </p>
          <SafetyChecklists />
        </div>
      </section>

      {/* Daily Reminder */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-accent-gold/10 rounded-lg p-8 max-w-3xl mx-auto">
            <p className="text-xl text-primary-deep mb-4">
              "Awareness isn't about being scared - it's about being prepared."
            </p>
            <p className="text-gray-600">
              Check in daily. One tip at a time builds lasting protection.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}