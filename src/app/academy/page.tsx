import { Metadata } from 'next'
import Link from 'next/link'
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Safety Academy',
  description: 'Learn self-defense, legal rights, and safety awareness',
}

// Mock data - replace with database calls
const courses = [
  {
    id: '1',
    title: 'Basic Self-Defense for Beginners',
    description: 'Learn fundamental self-defense techniques and awareness skills',
    category: 'SELF_DEFENSE',
    level: 'BEGINNER',
    duration: 120,
    lessons: 8,
    thumbnail: '/images/courses/self-defense-basics.jpg',
    progress: 0,
  },
  {
    id: '2',
    title: 'Understanding Your Legal Rights',
    description: 'Know your rights and how to navigate the legal system',
    category: 'LEGAL_RIGHTS',
    level: 'BEGINNER',
    duration: 90,
    lessons: 6,
    thumbnail: '/images/courses/legal-rights.jpg',
    progress: 0,
  },
  {
    id: '3',
    title: 'Advanced Situational Awareness',
    description: 'Develop heightened awareness and threat detection skills',
    category: 'PSYCHOLOGY',
    level: 'INTERMEDIATE',
    duration: 150,
    lessons: 10,
    thumbnail: '/images/courses/awareness.jpg',
    progress: 0,
  },
  {
    id: '4',
    title: 'Digital Safety & Privacy',
    description: 'Protect yourself online and secure your digital presence',
    category: 'DIGITAL_SAFETY',
    level: 'BEGINNER',
    duration: 60,
    lessons: 5,
    thumbnail: '/images/courses/digital-safety.jpg',
    progress: 0,
  },
  {
    id: '5',
    title: 'Basic First Aid & Emergency Response',
    description: 'Essential first aid skills for emergency situations',
    category: 'FIRST_AID',
    level: 'BEGINNER',
    duration: 180,
    lessons: 12,
    thumbnail: '/images/courses/first-aid.jpg',
    progress: 0,
  },
]

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-deep mb-4">
            Safety Academy
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Empowering women through knowledge. Explore our courses designed to build your confidence and safety awareness.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-deep mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {COURSE_CATEGORIES.map((category) => (
              <button
                key={category.value}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div>
          <h2 className="text-2xl font-bold text-primary-deep mb-6">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const category = COURSE_CATEGORIES.find(c => c.value === course.category)
              const level = COURSE_LEVELS.find(l => l.value === course.level)
              
              return (
                <Link
                  key={course.id}
                  href={`/academy/${course.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-48 bg-primary-mid/20 flex items-center justify-center">
                    <span className="text-6xl">{category?.icon}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-accent-gold">
                        {category?.label}
                      </span>
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: level?.color + '20', color: level?.color }}
                      >
                        {level?.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.duration} min</span>
                      <span>{course.lessons} lessons</span>
                    </div>
                    {course.progress > 0 && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-accent-gold rounded-full h-2" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}