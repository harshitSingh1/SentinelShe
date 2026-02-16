import { Metadata } from 'next'
import { GadgetFinder } from '@/components/armory/GadgetFinder'

export const metadata: Metadata = {
  title: 'Smart Gadget Finder',
  description: 'Find the perfect safety gadget for your needs',
}

export default function FinderPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Smart Gadget Finder
          </h1>
          <p className="text-gray-600">
            Answer a few questions to get personalized safety gadget recommendations
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <GadgetFinder />
        </div>
      </div>
    </div>
  )
}