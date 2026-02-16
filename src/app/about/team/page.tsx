import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the team behind SentinelShe',
}

const team = [
  {
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    bio: 'Self-defense expert with 15+ years of experience in women safety training.',
    image: '👩',
  },
  {
    name: 'Anjali Patel',
    role: 'Head of Community',
    bio: 'Community organizer dedicated to building safe spaces for women.',
    image: '👩‍💼',
  },
  {
    name: 'Dr. Meera Krishnan',
    role: 'Safety Advisor',
    bio: 'Criminologist specializing in women safety and prevention strategies.',
    image: '👩‍⚕️',
  },
  {
    name: 'Kavita Singh',
    role: 'Legal Expert',
    bio: 'Lawyer focusing on women rights and legal protection.',
    image: '👩‍⚖️',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/about" className="text-accent-gold hover:underline mb-8 inline-block">
          ← Back to About
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Our Team
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-5xl mb-4">{member.image}</div>
              <h2 className="text-xl font-bold text-primary-deep mb-1">{member.name}</h2>
              <p className="text-accent-gold font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}