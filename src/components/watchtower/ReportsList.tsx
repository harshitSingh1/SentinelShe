'use client'

import { useState, useEffect } from 'react'
import { REPORT_CATEGORIES } from '@/lib/constants'
import { Icons } from '@/components/icons/SafetyIcons'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Report {
  id: string
  title: string
  description: string
  category: string
  location: string
  latitude?: number
  longitude?: number
  incidentDate: string
  createdAt: string
  isAnonymous: boolean
  isVerified: boolean
  upvotes: number
  downvotes: number
  user: {
    name: string | null
    isAnonymous: boolean
  }
}

interface VoteState {
  upvoted: Set<string>
  downvoted: Set<string>
}

const REPORTS_STORAGE_KEY = 'community-reports'

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')
  const [votes, setVotes] = useState<VoteState>({ upvoted: new Set(), downvoted: new Set() })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationRadius, setLocationRadius] = useState<number>(10)
  const [useLocationFilter, setUseLocationFilter] = useState(false)

  useEffect(() => {
    loadReports()
    loadVotes()
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          console.log('Location access denied')
        }
      )
    }
  }, [])

  const loadReports = async () => {
    try {
      // Try to load from API first
      const response = await fetch('/api/reports')
      const data = await response.json()
      
      if (data.success && data.reports.length > 0) {
        setReports(data.reports)
        // Backup to localStorage
        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(data.reports))
      } else {
        // Fallback to localStorage
        const saved = localStorage.getItem(REPORTS_STORAGE_KEY)
        if (saved) {
          setReports(JSON.parse(saved))
        }
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      // Fallback to localStorage
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY)
      if (saved) {
        setReports(JSON.parse(saved))
      }
    } finally {
      setLoading(false)
    }
  }

  const loadVotes = () => {
    const saved = localStorage.getItem('report-votes')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setVotes({
          upvoted: new Set(parsed.upvoted || []),
          downvoted: new Set(parsed.downvoted || [])
        })
      } catch (e) {
        console.error('Error loading votes')
      }
    }
  }

  const saveVotes = (newVotes: VoteState) => {
    localStorage.setItem('report-votes', JSON.stringify({
      upvoted: Array.from(newVotes.upvoted),
      downvoted: Array.from(newVotes.downvoted)
    }))
  }

  const handleVote = (reportId: string, voteType: 'up' | 'down') => {
    const newVotes = { ...votes }
    let voteChange = { up: 0, down: 0 }

    if (voteType === 'up') {
      if (votes.upvoted.has(reportId)) {
        newVotes.upvoted.delete(reportId)
        voteChange.up = -1
      } else {
        newVotes.upvoted.add(reportId)
        voteChange.up = 1
        if (votes.downvoted.has(reportId)) {
          newVotes.downvoted.delete(reportId)
          voteChange.down = -1
        }
      }
    } else {
      if (votes.downvoted.has(reportId)) {
        newVotes.downvoted.delete(reportId)
        voteChange.down = -1
      } else {
        newVotes.downvoted.add(reportId)
        voteChange.down = 1
        if (votes.upvoted.has(reportId)) {
          newVotes.upvoted.delete(reportId)
          voteChange.up = -1
        }
      }
    }

    setVotes(newVotes)
    saveVotes(newVotes)

    setReports(prev => prev.map(r => 
      r.id === reportId ? {
        ...r,
        upvotes: r.upvotes + voteChange.up,
        downvotes: r.downvotes + voteChange.down
      } : r
    ))

    // Update localStorage
    const updatedReports = reports.map(r => 
      r.id === reportId ? {
        ...r,
        upvotes: r.upvotes + voteChange.up,
        downvotes: r.downvotes + voteChange.down
      } : r
    )
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports))
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCategoryDetails = (categoryValue: string) => {
    return REPORT_CATEGORIES.find(c => c.value === categoryValue) || REPORT_CATEGORIES[0]
  }

  // Filter reports
  let filteredReports = filter
    ? reports.filter(r => r.category === filter)
    : reports

  if (useLocationFilter && userLocation) {
    filteredReports = filteredReports.filter(report => {
      if (!report.latitude || !report.longitude) return false
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        report.latitude,
        report.longitude
      )
      return distance <= locationRadius
    })
  }

  filteredReports.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
              filter === ''
                ? 'bg-accent-gold text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Reports
          </button>
          {REPORT_CATEGORIES.map(category => {
            const Icon = category.icon
            return (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                  filter === category.value
                    ? 'bg-accent-gold text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            )
          })}
        </div>

        {userLocation && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icons.Location className="w-5 h-5 text-primary-deep" />
                <span className="font-medium text-primary-deep">Nearby reports</span>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useLocationFilter}
                  onChange={(e) => setUseLocationFilter(e.target.checked)}
                  className="rounded text-accent-gold"
                />
                <span className="text-sm text-gray-600">Filter by location</span>
              </label>
            </div>
            
            {useLocationFilter && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Within:</span>
                <select
                  value={locationRadius}
                  onChange={(e) => setLocationRadius(Number(e.target.value))}
                  className="input-field text-sm py-1"
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reports list */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => {
            const category = getCategoryDetails(report.category)
            const Icon = category.icon
            const isUpvoted = votes.upvoted.has(report.id)
            const isDownvoted = votes.downvoted.has(report.id)
            const score = report.upvotes - report.downvotes
            
            return (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                      <Icon className="w-5 h-5" color={category.color} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: category.color }}>
                      {category.label}
                    </span>
                    {report.isVerified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <span>✓</span> Verified
                      </span>
                    )}
                    {report.isAnonymous ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Anonymous
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {report.user?.name || 'Community Member'}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(report.createdAt)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-deep mb-2">
                  {report.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {report.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Icons.Location className="w-4 h-4" />
                      <span>{report.location}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      🕒 {new Date(report.incidentDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(report.id, 'up')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                        isUpvoted
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title="Helpful"
                    >
                      <Icons.Upvote className={`w-4 h-4 ${isUpvoted ? 'text-green-700' : ''}`} />
                      <span className="text-sm font-medium">{report.upvotes}</span>
                    </button>
                    
                    <span className="text-sm font-medium text-gray-400 min-w-10 text-center">
                      {score > 0 ? `+${score}` : score}
                    </span>
                    
                    <button
                      onClick={() => handleVote(report.id, 'down')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                        isDownvoted
                          ? 'bg-red-100 text-red-700'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title="Not helpful"
                    >
                      <Icons.Downvote className={`w-4 h-4 ${isDownvoted ? 'text-red-700' : ''}`} />
                      <span className="text-sm font-medium">{report.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No reports found.</p>
            <Link 
              href="/watchtower/report"
              className="text-accent-gold hover:underline font-medium"
            >
              Be the first to report an incident →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}