// User types
export interface User {
  id: string
  email: string
  name?: string | null
  phone?: string | null
  city?: string | null
  country?: string | null
  isAnonymous: boolean
  safetyScore: number
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'EXPERT'
  createdAt: Date
}

// Report types
export interface Report {
  id: string
  userId: string
  title: string
  description: string
  latitude: number
  longitude: number
  location?: string | null
  category: ReportCategory
  incidentDate: Date
  isAnonymous: boolean
  isVerified: boolean
  status: 'PENDING' | 'VERIFIED' | 'DISMISSED'
  mediaUrls: string[]
  upvotes: number
  createdAt: Date
  user?: {
    name?: string | null
    isAnonymous: boolean
  }
}

export type ReportCategory = 
  | 'SUSPICIOUS_ACTIVITY'
  | 'HARASSMENT'
  | 'UNSAFE_CONDITION'
  | 'ASSAULT'
  | 'STALKING'
  | 'OTHER'

// Story types
export interface Story {
  id: string
  userId: string
  title: string
  content: string
  category: StoryCategory
  isAnonymous: boolean
  isVerified: boolean
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  mediaUrls: string[]
  tags: string[]
  upvotes: number
  views: number
  createdAt: Date
  user?: {
    name?: string | null
    isAnonymous: boolean
  }
  _count?: {
    comments: number
    savedBy: number
  }
}

export type StoryCategory =
  | 'PERSONAL_EXPERIENCE'
  | 'SAFETY_TIP'
  | 'AWARENESS'
  | 'SUCCESS_STORY'
  | 'QUESTION'

// Gadget types
export interface Gadget {
  id: string
  name: string
  category: GadgetCategory
  description: string
  price?: number | null
  currency?: string | null
  imageUrls: string[]
  videoUrl?: string | null
  brand?: string | null
  legality: 'LEGAL' | 'RESTRICTED' | 'ILLEGAL' | 'UNKNOWN'
  affiliateUrl?: string | null
  averageRating: number
  totalReviews: number
}

export type GadgetCategory =
  | 'ALARM'
  | 'SPRAY'
  | 'TRACKER'
  | 'PROTECTION'
  | 'LIGHT'
  | 'OTHER'

// Course types
export interface Course {
  id: string
  title: string
  description: string
  category: 'SELF_DEFENSE' | 'LEGAL_RIGHTS' | 'PSYCHOLOGY' | 'DIGITAL_SAFETY' | 'FIRST_AID'
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  thumbnail: string
  duration: number
  lessons: Lesson[]
  progress?: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl?: string | null
  content: string
  order: number
  duration: number
  isFree: boolean
  completed?: boolean
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Map types
export interface MapMarker {
  id: string
  latitude: number
  longitude: number
  type: 'report' | 'safe_place' | 'alert'
  category?: ReportCategory
  title: string
  description?: string
  severity?: 'low' | 'medium' | 'high'
}

// Form types
export interface ReportFormData {
  title: string
  description: string
  category: ReportCategory
  incidentDate: Date
  latitude: number
  longitude: number
  location?: string
  isAnonymous: boolean
  mediaUrls?: string[]
}

export interface StoryFormData {
  title: string
  content: string
  category: StoryCategory
  isAnonymous: boolean
  tags?: string[]
  mediaUrls?: string[]
}