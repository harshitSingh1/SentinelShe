import { Metadata } from 'next'
import { ReportForm } from '@/components/watchtower/ReportForm'

export const metadata: Metadata = {
  title: 'Report Incident',
  description: 'Report suspicious activities or unsafe conditions in your area',
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Report an Incident
          </h1>
          <p className="text-gray-600">
            Your report helps keep the community safe. All reports are anonymous by default.
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
          </ul>
        </div>
      </div>
    </div>
  )
}