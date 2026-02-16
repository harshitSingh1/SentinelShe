import { Metadata } from 'next'
import { SafetyMap } from '@/components/watchtower/SafetyMap'

export const metadata: Metadata = {
  title: 'Safety Map',
  description: 'Interactive map showing safety incidents and safe zones',
}

export default function MapPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b py-4 px-6">
        <h1 className="text-2xl font-bold text-primary-deep">Community Safety Map</h1>
      </div>
      <div className="flex-1">
        <SafetyMap />
      </div>
    </div>
  )
}