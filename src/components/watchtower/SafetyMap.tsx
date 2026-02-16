'use client'

import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Mock data - replace with API calls
const mockIncidents = [
  {
    id: '1',
    latitude: 40.785091,
    longitude: -73.968285,
    type: 'SUSPICIOUS_ACTIVITY',
    title: 'Suspicious person near park',
    severity: 'medium',
    time: '2 hours ago',
  },
  {
    id: '2',
    latitude: 40.758896,
    longitude: -73.98513,
    type: 'UNSAFE_CONDITION',
    title: 'Poor lighting in parking lot',
    severity: 'low',
    time: '5 hours ago',
  },
  {
    id: '3',
    latitude: 40.748817,
    longitude: -73.985428,
    type: 'HARASSMENT',
    title: 'Harassment incident reported',
    severity: 'high',
    time: '1 day ago',
  },
]

const getMarkerColor = (severity: string) => {
  switch (severity) {
    case 'high': return '#FF6B6B'
    case 'medium': return '#FFA500'
    case 'low': return '#4A90E2'
    default: return '#808080'
  }
}

const getMarkerIcon = (type: string) => {
  switch (type) {
    case 'SUSPICIOUS_ACTIVITY': return '👁️'
    case 'HARASSMENT': return '⚠️'
    case 'UNSAFE_CONDITION': return '🌙'
    case 'ASSAULT': return '🔴'
    case 'STALKING': return '👤'
    default: return '📍'
  }
}

export function SafetyMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapboxToken, setMapboxToken] = useState<string>('')
  const [filter, setFilter] = useState({
    high: true,
    medium: true,
    low: true,
  })

  useEffect(() => {
    // Get Mapbox token from environment variable
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      console.error('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env file')
      return
    }
    setMapboxToken(token)
  }, [])

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.968285, 40.785091], // Default to NYC
      zoom: 12,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    }), 'top-right')

    // Add markers for incidents
    mockIncidents.forEach((incident) => {
      if (!map.current) return

      const markerColor = getMarkerColor(incident.severity)
      const markerIcon = getMarkerIcon(incident.type)

      // Create a custom marker element
      const el = document.createElement('div')
      el.className = 'custom-marker'
      el.innerHTML = markerIcon
      el.style.backgroundColor = markerColor
      el.style.width = '36px'
      el.style.height = '36px'
      el.style.borderRadius = '50%'
      el.style.border = '3px solid white'
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'
      el.style.cursor = 'pointer'
      el.style.display = 'flex'
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
      el.style.fontSize = '18px'

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${incident.title}</h3>
          <p class="text-xs text-gray-600 mt-1">Type: ${incident.type.replace('_', ' ')}</p>
          <p class="text-xs text-gray-600">Severity: ${incident.severity}</p>
          <p class="text-xs text-gray-500 mt-1">${incident.time}</p>
        </div>
      `)

      // Add marker
      new mapboxgl.Marker(el)
        .setLngLat([incident.longitude, incident.latitude])
        .setPopup(popup)
        .addTo(map.current)
    })

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapboxToken])

  const toggleFilter = (severity: keyof typeof filter) => {
    setFilter(prev => ({ ...prev, [severity]: !prev[severity] }))
  }

  if (!mapboxToken) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">Mapbox token is not configured</p>
          <p className="text-sm text-gray-500">
            Add <code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your .env file
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold mb-3">Filter Incidents</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-alert-coral"></span>
              High Severity
            </span>
            <input
              type="checkbox"
              checked={filter.high}
              onChange={() => toggleFilter('high')}
              className="rounded text-accent-gold"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
              Medium Severity
            </span>
            <input
              type="checkbox"
              checked={filter.medium}
              onChange={() => toggleFilter('medium')}
              className="rounded text-accent-gold"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4A90E2]"></span>
              Low Severity
            </span>
            <input
              type="checkbox"
              checked={filter.low}
              onChange={() => toggleFilter('low')}
              className="rounded text-accent-gold"
            />
          </label>
        </div>
        <button className="w-full mt-4 text-sm text-accent-gold hover:underline">
          Reset Filters
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-alert-coral border-2 border-white shadow" />
            <span className="text-xs">Assault</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FFA500] border-2 border-white shadow" />
            <span className="text-xs">Harassment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#4A90E2] border-2 border-white shadow" />
            <span className="text-xs">Suspicious</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#808080] border-2 border-white shadow" />
            <span className="text-xs">Unsafe</span>
          </div>
        </div>
      </div>

      {/* Report Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={() => window.location.href = '/watchtower/report'}
          className="bg-accent-gold text-primary-deep px-6 py-3 rounded-lg font-semibold hover:bg-accent-gold/90 transition shadow-lg flex items-center gap-2"
        >
          <span>📢</span>
          Report Incident
        </button>
      </div>
    </div>
  )
}