import React from 'react'

interface IconProps {
  className?: string
  size?: number
  color?: string
}

export const DashboardIcons = {
  // Shield icons for safety score
  Shield: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12l3 3 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Book/Learning icon
  Learning: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Community icon
  Community: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Alert/Bell icon for reports
  Alert: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Star icon for saved items
  Star: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Checkmark icon for completed
  Check: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Clock icon for recent activity
  Clock: ({ className = "w-6 h-6", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Arrow Right
  ArrowRight: ({ className = "w-5 h-5", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Trend up icon
  TrendUp: ({ className = "w-5 h-5", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M23 6l-9.5 9.5-5-5L2 17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // User icon
  User: ({ className = "w-5 h-5", color = "currentColor" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}