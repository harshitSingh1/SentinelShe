// Centralized service to manage all user data

const STORAGE_KEYS = {
  SAVED_TIPS: 'saved-tips',
  PRACTICED_MOVES: 'practiced-moves',
  CHECKLIST_PROGRESS: 'checklist-progress',
  SAVED_PRODUCTS: 'saved-products',
  SAVED_STORIES: 'saved-stories',
  USER_STORIES: 'community-stories',
  USER_REPORTS: 'community-reports',
  USER_EMAIL: 'user-email',
  USER_NAME: 'user-name',
  UPVOTED_STORIES: 'upvoted-stories',
  UPVOTED_COMMENTS: 'upvoted-comments',
  REPORT_VOTES: 'report-votes',
}

export interface UserStats {
  safetyScore: number
  tipsRead: number
  movesLearned: number
  checklistsCompleted: number
  reportsSubmitted: number
  storiesShared: number
  savedProducts: number
  savedStories: number
  contributions: number
  weeklyActivity: {
    day: string
    count: number
  }[]
}

class UserDataService {
  private getUserEmail(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USER_EMAIL)
  }

  private getUserName(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME)
  }

  // Get current user's stories
  getUserStories() {
    const userEmail = this.getUserEmail()
    if (!userEmail) return []
    
    const allStories = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_STORIES) || '[]')
    return allStories.filter((story: any) => story.author?.id === userEmail)
  }

  // Get current user's reports
  getUserReports() {
    const userEmail = this.getUserEmail()
    if (!userEmail) return []
    
    const allReports = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_REPORTS) || '[]')
    return allReports.filter((report: any) => report.userId === userEmail)
  }

  // Get saved items
  getSavedTips(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_TIPS)
    return saved ? JSON.parse(saved).length : 0
  }

  getPracticedMoves(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.PRACTICED_MOVES)
    return saved ? JSON.parse(saved).length : 0
  }

  getSavedProducts(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS)
    return saved ? JSON.parse(saved).length : 0
  }

  getSavedStories(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_STORIES)
    return saved ? JSON.parse(saved).length : 0
  }

  // Get completed checklists
  getCompletedChecklists(): number {
    const progress = localStorage.getItem(STORAGE_KEYS.CHECKLIST_PROGRESS)
    if (!progress) return 0
    
    const checklistProgress = JSON.parse(progress)
    return Object.values(checklistProgress).filter((completed: any) => 
      Array.isArray(completed) && completed.every(Boolean)
    ).length
  }

  // Calculate safety score
  calculateSafetyScore(): number {
    const tips = this.getSavedTips()
    const moves = this.getPracticedMoves()
    const checklists = this.getCompletedChecklists()
    const stories = this.getUserStories().length
    const reports = this.getUserReports().length
    const products = this.getSavedProducts()

    // Base score: 100
    // Tips: 5 points each (max 100)
    // Moves: 10 points each (max 100)
    // Checklists: 15 points each (max 75)
    // Stories: 20 points each (max 100)
    // Reports: 25 points each (max 125)
    
    const score = 100 + 
      Math.min(tips * 5, 100) +
      Math.min(moves * 10, 100) +
      Math.min(checklists * 15, 75) +
      Math.min(stories * 20, 100) +
      Math.min(reports * 25, 125) +
      Math.min(products * 2, 50) // Bonus for being prepared

    return Math.min(score, 650) // Max score 650
  }

  // Get safety level
  getSafetyLevel(score: number): { label: string; color: string } {
    if (score >= 500) return { label: 'Safety Champion', color: 'text-purple-600' }
    if (score >= 400) return { label: 'Safety Pro', color: 'text-green-600' }
    if (score >= 300) return { label: 'Safety Warrior', color: 'text-accent-gold' }
    if (score >= 200) return { label: 'Safety Seeker', color: 'text-blue-600' }
    if (score >= 100) return { label: 'Safety Starter', color: 'text-primary-deep' }
    return { label: 'Beginner', color: 'text-gray-600' }
  }

  // Get recent activity
  getRecentActivity(limit: number = 5) {
    const activities: any[] = []
    
    // Add story activities
    const stories = this.getUserStories()
    stories.forEach((story: any) => {
      activities.push({
        id: `story-${story.id}`,
        type: 'story',
        title: `Shared: ${story.title.substring(0, 30)}${story.title.length > 30 ? '...' : ''}`,
        timestamp: story.createdAt,
        link: `/watchtower/story/${story.id}`,
        icon: '📖'
      })
    })

    // Add report activities
    const reports = this.getUserReports()
    reports.forEach((report: any) => {
      activities.push({
        id: `report-${report.id}`,
        type: 'report',
        title: `Reported: ${report.title.substring(0, 30)}${report.title.length > 30 ? '...' : ''}`,
        timestamp: report.createdAt,
        link: `/watchtower/reports`,
        icon: '🚨'
      })
    })

    // Add saved activities (simulated with current time)
    if (this.getSavedTips() > 0) {
      activities.push({
        id: 'saved-tips',
        type: 'tip',
        title: `Saved ${this.getSavedTips()} safety tips`,
        timestamp: new Date().toISOString(),
        link: '/academy',
        icon: '💡'
      })
    }

    if (this.getPracticedMoves() > 0) {
      activities.push({
        id: 'practiced-moves',
        type: 'move',
        title: `Learned ${this.getPracticedMoves()} protective moves`,
        timestamp: new Date().toISOString(),
        link: '/academy',
        icon: '🛡️'
      })
    }

    // Sort by timestamp (newest first)
    activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return activities.slice(0, limit)
  }

  // Get saved items for dashboard
  getSavedItems() {
    const items: any[] = []

    // Get saved tips (simplified - in reality you'd fetch tip details)
    const savedTips = localStorage.getItem(STORAGE_KEYS.SAVED_TIPS)
    if (savedTips) {
      const tips = JSON.parse(savedTips)
      tips.slice(0, 2).forEach((tipId: string) => {
        items.push({
          id: `tip-${tipId}`,
          type: 'tip',
          title: 'Safety Tip',
          link: '/academy',
          icon: '💡'
        })
      })
    }

    // Get saved products
    const savedProducts = localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS)
    if (savedProducts) {
      const products = JSON.parse(savedProducts)
      products.slice(0, 2).forEach((productId: string) => {
        items.push({
          id: `product-${productId}`,
          type: 'product',
          title: 'Safety Product',
          link: '/armory',
          icon: '🛡️'
        })
      })
    }

    // Get saved stories
    const savedStories = localStorage.getItem(STORAGE_KEYS.SAVED_STORIES)
    if (savedStories) {
      const stories = JSON.parse(savedStories)
      stories.slice(0, 2).forEach((storyId: string) => {
        items.push({
          id: `story-${storyId}`,
          type: 'story',
          title: 'Saved Story',
          link: '/watchtower/feed',
          icon: '📖'
        })
      })
    }

    return items.slice(0, 4)
  }

  // Get weekly activity data
  getWeeklyActivity() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const now = new Date()
    
    // Initialize with zero counts
    const weeklyData = days.map(day => ({ day, count: 0 }))

    // Get user stories and count by day of week
    const stories = this.getUserStories()
    stories.forEach((story: any) => {
      const storyDate = new Date(story.createdAt)
      const dayIndex = storyDate.getDay() // 0 = Sunday, 1 = Monday, etc.
      // Convert to our Monday-based index
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
      if (adjustedIndex >= 0 && adjustedIndex < 7) {
        weeklyData[adjustedIndex].count++
      }
    })

    // Get user reports
    const reports = this.getUserReports()
    reports.forEach((report: any) => {
      const reportDate = new Date(report.createdAt)
      const dayIndex = reportDate.getDay()
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
      if (adjustedIndex >= 0 && adjustedIndex < 7) {
        weeklyData[adjustedIndex].count++
      }
    })

    return weeklyData
  }
}

export const userDataService = new UserDataService()