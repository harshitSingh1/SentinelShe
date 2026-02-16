import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SentinelShe and our mission',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          About SentinelShe
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-8">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-primary-deep mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              SentinelShe was founded with a single mission: to empower women with the knowledge, 
              tools, and community support they need to feel safe and confident in their daily lives. 
              We believe that every woman deserves to move through the world without fear.
            </p>
          </section>

          {/* Vision */}
          <section>
            <h2 className="text-2xl font-bold text-primary-deep mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where women are equipped with the skills and awareness to protect 
              themselves, where communities look out for one another, and where safety is not a 
              luxury but a fundamental right.
            </p>
          </section>

          {/* What We Do */}
          <section>
            <h2 className="text-2xl font-bold text-primary-deep mb-4">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">Educate</h3>
                <p className="text-sm text-gray-600">Self-defense courses and safety awareness training</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-semibold mb-2">Equip</h3>
                <p className="text-sm text-gray-600">Smart gadget recommendations and reviews</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🗼</div>
                <h3 className="font-semibold mb-2">Empower</h3>
                <p className="text-sm text-gray-600">Community support and incident reporting</p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-2xl font-bold text-primary-deep mb-4">Our Team</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SentinelShe is built by a diverse team of safety experts, self-defense instructors, 
              legal professionals, and technologists who are passionate about women's safety.
            </p>
            <Link 
              href="/about/team" 
              className="text-accent-gold hover:underline"
            >
              Meet our team →
            </Link>
          </section>

          {/* Partners */}
          <section>
            <h2 className="text-2xl font-bold text-primary-deep mb-4">Our Partners</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with NGOs, women's shelters, and safety organizations worldwide.
            </p>
            <Link 
              href="/about/partners" 
              className="text-accent-gold hover:underline"
            >
              View our partners →
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}