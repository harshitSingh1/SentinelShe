import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Partners',
  description: 'Organizations we work with',
}

const partners = [
  {
    name: 'Women Safety Foundation',
    description: 'NGO dedicated to women safety awareness and training.',
    website: '#',
  },
  {
    name: 'Safe City Initiative',
    description: 'Urban safety program for women in metropolitan areas.',
    website: '#',
  },
  {
    name: 'Legal Aid for Women',
    description: 'Providing legal support and guidance to women in need.',
    website: '#',
  },
  {
    name: 'Self-Defense Alliance',
    description: 'Network of self-defense instructors across the country.',
    website: '#',
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/about" className="text-accent-gold hover:underline mb-8 inline-block">
          ← Back to About
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Our Partners
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <div key={partner.name} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-deep mb-2">{partner.name}</h2>
              <p className="text-gray-600 mb-4">{partner.description}</p>
              <a 
                href={partner.website} 
                className="text-accent-gold hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}