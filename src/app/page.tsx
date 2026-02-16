import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary-deep to-primary-mid text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-poppins text-5xl font-bold mb-6">
            Knowledge is Your Shield.
            <br />
            Community is Your Strength.
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join {APP_NAME} - Your comprehensive platform for safety awareness,
            self-defense training, and community support.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/register"
              className="bg-accent-gold hover:bg-accent-gold/90 text-primary-deep font-semibold px-8 py-3 rounded-lg transition"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="border-2 border-white hover:bg-white hover:text-primary-deep px-8 py-3 rounded-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Three Pillars</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Academy */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">The Academy</h3>
              <p className="text-gray-600">
                Interactive learning modules, scenario simulations, and expert-led
                self-defense courses.
              </p>
            </div>

            {/* Armory */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">The Armory</h3>
              <p className="text-gray-600">
                Smart gadget finder, legality checker, and verified reviews of
                safety tools.
              </p>
            </div>

            {/* Watchtower */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🗼</div>
              <h3 className="text-xl font-bold mb-2">The Watchtower</h3>
              <p className="text-gray-600">
                Community-powered safety map, incident reports, and story sharing
                to keep everyone aware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-deep text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Safety Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of women who are learning, sharing, and staying safe together.
          </p>
          <Link
            href="/auth/register"
            className="bg-accent-gold hover:bg-accent-gold/90 text-primary-deep font-semibold px-8 py-3 rounded-lg transition inline-block"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </div>
  )
}