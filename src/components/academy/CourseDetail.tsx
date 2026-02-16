'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants'

interface Lesson {
  id: string
  title: string
  duration: number
  isFree: boolean
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  lessons: Lesson[]
  instructor: string
  studentsEnrolled: number
  rating: number
  reviews: number
}

interface CourseDetailProps {
  course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  
  const category = COURSE_CATEGORIES.find(c => c.value === course.category)
  const level = COURSE_LEVELS.find(l => l.value === course.level)

  const totalLessons = course.lessons.length
  const freeLessons = course.lessons.filter(l => l.isFree).length

  const handleEnroll = () => {
    // Add enrollment logic here
    setIsEnrolled(true)
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary-deep to-primary-mid text-white py-12">
        <div className="container mx-auto px-4">
          <Link 
            href="/academy"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition"
          >
            ← Back to Academy
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category?.icon}</span>
                <span 
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: level?.color + '20', color: level?.color }}
                >
                  {level?.label}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-white/70">Instructor</span>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
                <div>
                  <span className="text-white/70">Students</span>
                  <p className="font-semibold">{course.studentsEnrolled.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-white/70">Rating</span>
                  <p className="font-semibold">⭐ {course.rating} ({course.reviews})</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-primary-deep">
              <div className="text-3xl font-bold mb-2">
                {freeLessons}/{totalLessons} Free Lessons
              </div>
              <p className="text-gray-600 mb-4">
                Total duration: {course.duration} minutes
              </p>
              <button
                onClick={handleEnroll}
                className="w-full btn-primary mb-3"
              >
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                {isEnrolled ? 'You are enrolled in this course' : 'Free forever • No credit card required'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary-deep mb-6">Course Content</h2>
            
            <div className="bg-white rounded-lg shadow-md divide-y">
              {course.lessons.map((lesson, index) => (
                <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 w-6">{index + 1}</span>
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{lesson.duration} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lesson.isFree ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Free
                      </span>
                    ) : (
                      <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                    {lesson.isFree && (
                      <button className="text-accent-gold hover:underline text-sm">
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">What you'll learn</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Fundamental self-defense techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Situational awareness skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">How to stay calm under pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Legal rights and responsibilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}