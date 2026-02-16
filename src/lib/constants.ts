// App Constants
export const APP_NAME = 'SentinelShe'
export const APP_DESCRIPTION = 'Knowledge is Your Shield. Community is Your Strength.'
export const APP_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

// Safety Score Constants
export const SAFETY_SCORE = {
  INITIAL: 100,
  PER_REPORT: 5,
  PER_STORY: 10,
  PER_COURSE_COMPLETE: 20,
  PER_VERIFIED_REPORT: 15,
  MAX: 500
} as const

// Map Constants
export const DEFAULT_MAP_CENTER = { lat: 20.5937, lng: 78.9629 } // India center
export const DEFAULT_MAP_ZOOM = 5
export const INCIDENT_RADIUS_KM = 5
export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11'

// Pagination
export const ITEMS_PER_PAGE = 10
export const STORIES_PER_PAGE = 12
export const REPORTS_PER_PAGE = 15
export const GADGETS_PER_PAGE = 20

// Cache Times (in seconds)
export const CACHE_TIMES = {
  REPORTS: 300, // 5 minutes
  STORIES: 600, // 10 minutes
  GADGETS: 3600, // 1 hour
  COURSES: 86400 // 24 hours
} as const

// Report Categories with descriptions
export const REPORT_CATEGORIES = [
  { value: 'SUSPICIOUS_ACTIVITY', label: '🚨 Suspicious Activity', color: '#FFA500' },
  { value: 'HARASSMENT', label: '⚠️ Harassment', color: '#FF6B6B' },
  { value: 'UNSAFE_CONDITION', label: '🌙 Unsafe Condition', color: '#4A90E2' },
  { value: 'ASSAULT', label: '🔴 Assault', color: '#DC143C' },
  { value: 'STALKING', label: '👁️ Stalking', color: '#9370DB' },
  { value: 'OTHER', label: '📌 Other', color: '#808080' }
] as const

// Story Categories
export const STORY_CATEGORIES = [
  { value: 'PERSONAL_EXPERIENCE', label: '📝 Personal Experience', icon: '📝' },
  { value: 'SAFETY_TIP', label: '💡 Safety Tip', icon: '💡' },
  { value: 'AWARENESS', label: '🔔 Awareness', icon: '🔔' },
  { value: 'SUCCESS_STORY', label: '✨ Success Story', icon: '✨' },
  { value: 'QUESTION', label: '❓ Question', icon: '❓' }
] as const

// Gadget Categories
export const GADGET_CATEGORIES = [
  { value: 'ALARM', label: '🔊 Personal Alarms', icon: '🔊' },
  { value: 'SPRAY', label: '💨 Pepper Sprays', icon: '💨' },
  { value: 'TRACKER', label: '📍 GPS Trackers', icon: '📍' },
  { value: 'PROTECTION', label: '🛡️ Self Defense Tools', icon: '🛡️' },
  { value: 'LIGHT', label: '💡 Tactical Lights', icon: '💡' },
  { value: 'OTHER', label: '📦 Other Gadgets', icon: '📦' }
] as const

// Course Categories
export const COURSE_CATEGORIES = [
  { value: 'SELF_DEFENSE', label: '🥋 Self Defense', icon: '🥋' },
  { value: 'LEGAL_RIGHTS', label: '⚖️ Legal Rights', icon: '⚖️' },
  { value: 'PSYCHOLOGY', label: '🧠 Psychology & Awareness', icon: '🧠' },
  { value: 'DIGITAL_SAFETY', label: '💻 Digital Safety', icon: '💻' },
  { value: 'FIRST_AID', label: '🏥 First Aid', icon: '🏥' }
] as const

// Course Levels
export const COURSE_LEVELS = [
  { value: 'BEGINNER', label: '🌱 Beginner', color: '#4CAF50' },
  { value: 'INTERMEDIATE', label: '📘 Intermediate', color: '#FF9800' },
  { value: 'ADVANCED', label: '🔥 Advanced', color: '#F44336' }
] as const

// Legality Status
export const LEGALITY_STATUS = [
  { value: 'LEGAL', label: '✅ Legal', color: '#4CAF50' },
  { value: 'RESTRICTED', label: '⚠️ Restricted', color: '#FF9800' },
  { value: 'ILLEGAL', label: '❌ Illegal', color: '#F44336' },
  { value: 'UNKNOWN', label: '❓ Check Local Laws', color: '#9E9E9E' }
] as const

// Emergency Numbers by Country
export const EMERGENCY_NUMBERS = {
  IN: { police: '100', ambulance: '102', fire: '101', women: '181' },
  US: { police: '911', ambulance: '911', fire: '911', women: '800-799-7233' },
  UK: { police: '999', ambulance: '999', fire: '999', women: '0808-2000-247' },
  // Add more countries as needed
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'sentinelshe-theme',
  OFFLINE_CONTENT: 'sentinelshe-offline',
  USER_PREFERENCES: 'sentinelshe-preferences',
  LAST_LOCATION: 'sentinelshe-location'
} as const

// Toast Messages
export const TOAST_MESSAGES = {
  REPORT_SUCCESS: 'Report submitted successfully. Thank you for keeping the community safe!',
  REPORT_ERROR: 'Failed to submit report. Please try again.',
  STORY_SUCCESS: 'Story shared successfully. Your voice matters!',
  STORY_ERROR: 'Failed to share story. Please try again.',
  PROFILE_UPDATE: 'Profile updated successfully!',
  COURSE_COMPLETE: 'Congratulations! Course completed. +20 safety score!',
  OFFLINE_SAVED: 'Content saved for offline access.'
} as const

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 2000,
  COMMENT_MIN_LENGTH: 2,
  COMMENT_MAX_LENGTH: 500
} as const

// Feature Flags
export const FEATURES = {
  ENABLE_OFFLINE_MODE: true,
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_DEBUG: process.env.NODE_ENV === 'development',
  ENABLE_PUSH_NOTIFICATIONS: true
} as const

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  REPORTS: {
    BASE: '/api/reports',
    NEARBY: '/api/reports/nearby',
    USER: '/api/reports/user'
  },
  STORIES: {
    BASE: '/api/stories',
    FEED: '/api/stories/feed',
    USER: '/api/stories/user'
  },
  GADGETS: {
    BASE: '/api/gadgets',
    CATEGORY: '/api/gadgets/category'
  },
  COURSES: {
    BASE: '/api/courses',
    PROGRESS: '/api/courses/progress'
  },
  USER: {
    PROFILE: '/api/user/profile',
    BUDDIES: '/api/user/buddies',
    SCORE: '/api/user/score'
  }
} as const