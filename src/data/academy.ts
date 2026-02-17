// All Academy data in one place - easy to update

export interface QuickTip {
  id: string
  title: string
  content: string
  category: string
  icon: string
  readTime: number
  isFeatured?: boolean
  forSituation?: string
}

export interface Scenario {
  id: string
  title: string
  description: string
  situation: string
  quickActions: string[]
  icon: string
}

export interface ProtectiveMove {
  id: string
  title: string
  description: string
  steps: string[]
  difficulty: 'beginner' | 'intermediate'
  icon: string
}

export interface Checklist {
  id: string
  title: string
  description: string
  items: string[]
  category: string
  icon: string
}

// Quick Tips Data
export const quickTips: QuickTip[] = [
  {
    id: 'trust-your-gut',
    title: 'Trust Your Gut',
    content: "That uneasy feeling? It's your intuition speaking. Don't ignore it. If something feels off, remove yourself from the situation immediately. No explanation needed.",
    category: 'INTUITION',
    icon: '🧠',
    readTime: 15,
    isFeatured: true,
  },
  {
    id: '3-second-rule',
    title: 'The 3-Second Rule',
    content: "When entering any space, take 3 seconds to: 1) Scan for exits, 2) Notice people around you, 3) Identify potential hazards. This simple habit builds automatic awareness.",
    category: 'AWARENESS',
    icon: '👁️',
    readTime: 20,
    isFeatured: true,
  },
  {
    id: 'confidence-projects',
    title: 'Confidence Projects',
    content: "Walk with purpose - head up, shoulders back, steady pace. Predators often target those who appear distracted or uncertain. Your body language is your first defense.",
    category: 'CONFIDENCE',
    icon: '💪',
    readTime: 15,
    isFeatured: true,
  },
  {
    id: 'phone-distraction',
    title: 'Phone Distraction Danger',
    content: "Being on your phone makes you an easy target. When walking, keep your phone away and eyes up. If you need to use it, step into a store or against a wall first.",
    category: 'AWARENESS',
    icon: '📱',
    readTime: 15,
    forSituation: 'night-commute',
  },
  {
    id: 'oops-technique',
    title: "The 'Oops' Technique",
    content: "If followed, turn suddenly, make eye contact, and say 'Oops, forgot something!' while confidently walking back the way you came. This disrupts their plan.",
    category: 'PREVENTION',
    icon: '🔄',
    readTime: 20,
    forSituation: 'being-followed',
  },
  {
    id: 'elevator-safety',
    title: 'Elevator Safety',
    content: "If someone makes you uncomfortable, don't get in. Wait for the next one. If already inside, stand near the control panel and get off if needed.",
    category: 'PREVENTION',
    icon: '🛗',
    readTime: 15,
    forSituation: 'elevator',
  },
  {
    id: 'car-park-awareness',
    title: 'Car Park Awareness',
    content: "Have keys ready before reaching your car. Check back seat before entering. Lock doors immediately. If followed, walk back to a busy area.",
    category: 'AWARENESS',
    icon: '🚗',
    readTime: 20,
    forSituation: 'parking-lot',
  },
  {
    id: 'fake-call',
    title: 'The Fake Call',
    content: "If feeling unsafe, make a fake call: 'Hey, I'm almost there! Meet me at the entrance?' This signals you're expected and someone is waiting.",
    category: 'DE_ESCALATION',
    icon: '📞',
    readTime: 15,
  },
  {
    id: 'distance-safety',
    title: 'Distance = Safety',
    content: "Keep at least two arm's length from anyone who makes you uncomfortable. This gives you reaction time and sends a clear boundary message.",
    category: 'PREVENTION',
    icon: '↔️',
    readTime: 15,
  },
]

// Scenarios Data
export const scenarios: Scenario[] = [
  {
    id: 'elevator-situation',
    title: 'Elevator Situation',
    description: "You're waiting for an elevator alone. A person who makes you uncomfortable approaches to wait with you.",
    situation: 'elevator',
    icon: '🛗',
    quickActions: [
      'Pretend you forgot something and walk away',
      'Take the stairs instead',
      'If already inside, get off at the next floor',
      'Stand near control panel',
    ],
  },
  {
    id: 'being-followed',
    title: 'Being Followed',
    description: 'You notice someone has been walking behind you for several blocks, matching your pace.',
    situation: 'being-followed',
    icon: '👤',
    quickActions: [
      'Cross the street suddenly',
      'Enter a busy store or cafe',
      'Make eye contact to show you have noticed them',
      'Call someone and describe your location loudly',
    ],
  },
  {
    id: 'parking-lot-night',
    title: 'Parking Lot at Night',
    description: "You're walking to your car alone in a dimly lit parking structure.",
    situation: 'parking-lot',
    icon: '🚗',
    quickActions: [
      'Walk with keys ready between fingers',
      'Stay in well-lit areas',
      'Check back seat before entering car',
      'Lock doors immediately',
    ],
  },
  {
    id: 'public-transport',
    title: 'Public Transport',
    description: 'You are on a bus or train and someone is making you uncomfortable.',
    situation: 'public-transport',
    icon: '🚇',
    quickActions: [
      'Move to a different seat or carriage',
      'Sit near the driver or other passengers',
      'Get off at the next stop',
      'Make noise to draw attention',
    ],
  },
  {
    id: 'stranger-knock',
    title: 'Stranger at Door',
    description: 'Someone you do not know is knocking on your door claiming to be from a utility company.',
    situation: 'home',
    icon: '🏠',
    quickActions: [
      'Do not open the door',
      'Check their ID through the peephole',
      'Call the company to verify',
      'If suspicious, call the police',
    ],
  },
]

// Protective Moves Data
export const protectiveMoves: ProtectiveMove[] = [
  {
    id: 'wrist-release',
    title: 'Wrist Release',
    description: 'Simple technique to break free from wrist grab',
    icon: '✊',
    difficulty: 'beginner',
    steps: [
      'Rotate your wrist toward their thumb (weakest point)',
      'Pull back sharply while stepping back',
      'Create distance immediately and run',
    ],
  },
  {
    id: 'palm-strike',
    title: 'Palm Strike',
    description: 'Effective strike using palm of hand',
    icon: '🖐️',
    difficulty: 'beginner',
    steps: [
      'Step forward with opposite foot',
      'Use heel of palm to strike upward at nose or chin',
      'Follow through and run to safety',
    ],
  },
  {
    id: 'knee-strike',
    title: 'Knee Strike',
    description: 'Close-range defense move',
    icon: '🦵',
    difficulty: 'beginner',
    steps: [
      'Grab attacker for stability',
      'Drive knee upward into groin or stomach',
      'Push away and run',
    ],
  },
  {
    id: 'elbow-strike',
    title: 'Elbow Strike',
    description: 'Powerful close-range strike',
    icon: '💪',
    difficulty: 'beginner',
    steps: [
      'Turn your body to generate power',
      'Drive elbow into attacker\'s face or ribs',
      'Follow with knee strike if needed',
      'Run to safety',
    ],
  },
]

// Checklists Data
export const checklists: Checklist[] = [
  {
    id: 'night-walk',
    title: 'Night Walk Ready',
    description: 'Quick checklist before heading out at night',
    icon: '🌙',
    category: 'travel',
    items: [
      'Phone fully charged',
      'Share location with trusted contact',
      'Keys ready in hand',
      'Know your route',
      'Wear comfortable shoes',
      'Let someone know when you will be back',
    ],
  },
  {
    id: 'first-date',
    title: 'First Date Safety',
    description: 'Simple precautions for meeting someone new',
    icon: '❤️',
    category: 'social',
    items: [
      'Meet in public place',
      'Tell friend where you are going',
      'Share live location',
      'Have exit strategy',
      'Keep your drink in sight',
      'Arrange your own transportation',
    ],
  },
  {
    id: 'travel-prep',
    title: 'Travel Prepared',
    description: 'Before traveling to a new place',
    icon: '✈️',
    category: 'travel',
    items: [
      'Research the area',
      'Save emergency numbers',
      'Share itinerary with family',
      'Pack safety essentials',
      'Check local laws and customs',
    ],
  },
  {
    id: 'home-security',
    title: 'Home Security Basics',
    description: 'Simple home safety checks',
    icon: '🏠',
    category: 'home',
    items: [
      'Doors and windows locked',
      'Good lighting at entrances',
      'Know your neighbors',
      'No spare keys outside',
      'Security cameras if possible',
    ],
  },
]

// Category definitions for filtering
export const tipCategories = [
  { value: 'all', label: 'All Tips', icon: '✨' },
  { value: 'AWARENESS', label: 'Awareness', icon: '👁️' },
  { value: 'INTUITION', label: 'Trust Your Gut', icon: '🧠' },
  { value: 'CONFIDENCE', label: 'Confidence', icon: '💪' },
  { value: 'PREVENTION', label: 'Prevention', icon: '🛡️' },
  { value: 'DE_ESCALATION', label: 'De-escalation', icon: '🤝' },
]