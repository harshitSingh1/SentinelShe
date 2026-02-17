import { Metadata } from 'next'
import Link from 'next/link'
import { ReportForm } from '@/components/watchtower/ReportForm'

export const metadata: Metadata = {
  title: 'Report an Incident',
  description: 'Report suspicious activities or unsafe conditions in your area',
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/watchtower"
            className="text-gray-600 hover:text-accent-gold transition inline-flex items-center gap-2"
          >
            ← Back to Watchtower
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Report an Incident
          </h1>
          <p className="text-gray-600">
            Your report helps keep the community safe. All reports are reviewed by moderators.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <ReportForm />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-800 mb-2">📋 Reporting Guidelines</h2>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Only report incidents you have personally witnessed or verified</li>
            <li>• Do not share personal information about others</li>
            <li>• For emergencies, always call local emergency services first</li>
            <li>• Your report will be reviewed by moderators before going public</li>
            <li>• False reports may result in account suspension</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need to report an emergency? Call your local emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  )
}