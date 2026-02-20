import { Metadata } from 'next'
import Link from 'next/link'
import { ReportsList } from '@/components/watchtower/ReportsList'

export const metadata: Metadata = {
  title: 'Safety Reports | SentinelShe',
  description: 'View community safety reports in your area',
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-deep mb-2">
              Community Safety Reports
            </h1>
            <p className="text-gray-600">
              Recent safety incidents reported by community members
            </p>
          </div>
          <Link
            href="/watchtower/report"
            className="btn-primary whitespace-nowrap"
          >
            + Report Incident
          </Link>
        </div>

        <ReportsList />
      </div>
    </div>
  )
}