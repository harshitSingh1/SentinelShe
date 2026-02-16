import { Metadata } from 'next'
import Link from 'next/link'
import { GADGET_CATEGORIES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Safety Armory',
  description: 'Discover and compare safety gadgets and self-defense tools',
}

// Mock data - replace with database calls
const featuredGadgets = [
  {
    id: '1',
    name: 'Personal Safety Alarm',
    category: 'ALARM',
    price: 19.99,
    rating: 4.5,
    reviews: 128,
    image: '/images/gadgets/alarm.jpg',
    legality: 'LEGAL',
  },
  {
    id: '2',
    name: 'Pepper Spray Keychain',
    category: 'SPRAY',
    price: 14.99,
    rating: 4.3,
    reviews: 256,
    image: '/images/gadgets/pepper-spray.jpg',
    legality: 'RESTRICTED',
  },
  {
    id: '3',
    name: 'GPS Tracker',
    category: 'TRACKER',
    price: 49.99,
    rating: 4.7,
    reviews: 89,
    image: '/images/gadgets/gps.jpg',
    legality: 'LEGAL',
  },
  {
    id: '4',
    name: 'Tactical Flashlight',
    category: 'LIGHT',
    price: 29.99,
    rating: 4.6,
    reviews: 167,
    image: '/images/gadgets/flashlight.jpg',
    legality: 'LEGAL',
  },
]

export default function ArmoryPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-deep mb-4">
            Safety Armory
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our curated collection of safety gadgets. Compare features, check legality, and read verified reviews.
          </p>
        </div>

        {/* Smart Finder CTA */}
        <div className="bg-linear-to-r from-primary-deep to-primary-mid text-white rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Not sure what you need?</h2>
              <p className="opacity-90">Take our smart finder quiz to get personalized recommendations</p>
            </div>
            <Link
              href="/armory/finder"
              className="bg-accent-gold text-primary-deep px-8 py-3 rounded-lg font-semibold hover:bg-accent-gold/90 transition"
            >
              Start Smart Finder
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-deep mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GADGET_CATEGORIES.map((category) => (
              <Link
                key={category.value}
                href={`/armory/category/${category.value.toLowerCase()}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <span className="text-sm font-medium">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Gadgets */}
        <div>
          <h2 className="text-2xl font-bold text-primary-deep mb-6">Featured Gadgets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGadgets.map((gadget) => {
              const category = GADGET_CATEGORIES.find(c => c.value === gadget.category)
              
              return (
                <Link
                  key={gadget.id}
                  href={`/armory/${gadget.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 bg-primary-mid/20 flex items-center justify-center">
                    <span className="text-6xl">{category?.icon}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-accent-gold">
                        {category?.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        gadget.legality === 'LEGAL' ? 'bg-green-100 text-green-700' :
                        gadget.legality === 'RESTRICTED' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {gadget.legality}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{gadget.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent-gold">
                        ${gadget.price}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm text-gray-600">
                          {gadget.rating} ({gadget.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Legality Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Legal Notice</h3>
          <p className="text-sm text-yellow-700">
            Safety gadget laws vary by location. Always check local regulations before purchasing or carrying any self-defense tool. Use our legality checker for specific information about your area.
          </p>
          <Link href="/armory/legality" className="inline-block mt-3 text-accent-gold hover:underline">
            Check Local Laws →
          </Link>
        </div>
      </div>
    </div>
  )
}