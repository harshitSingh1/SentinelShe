import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CourseDetail } from '@/components/academy/CourseDetail'

interface PageProps {
  params: Promise<{
    courseId: string
  }>
}

// Mock function to get course data - replace with API call
const getCourse = async (courseId: string) => {
  const courses = {
    '1': {
      id: '1',
      title: 'Basic Self-Defense for Beginners',
      description: 'Learn fundamental self-defense techniques and awareness skills. This comprehensive course covers essential moves, situational awareness, and building confidence in potentially dangerous situations.',
      category: 'SELF_DEFENSE',
      level: 'BEGINNER',
      duration: 120,
      lessons: [
        { id: 'l1', title: 'Introduction to Self-Defense', duration: 15, isFree: true },
        { id: 'l2', title: 'Situational Awareness', duration: 20, isFree: true },
        { id: 'l3', title: 'Basic Stances and Movements', duration: 25, isFree: false },
        { id: 'l4', title: 'Defending Against Grabs', duration: 30, isFree: false },
        { id: 'l5', title: 'Ground Defense Techniques', duration: 30, isFree: false },
      ],
      instructor: 'Master Priya Sharma',
      studentsEnrolled: 1234,
      rating: 4.8,
      reviews: 89,
    }
  }
  
  return courses[courseId as keyof typeof courses]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseId } = await params
  const course = await getCourse(courseId)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.title,
    description: course.description,
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { courseId } = await params
  const course = await getCourse(courseId)

  if (!course) {
    notFound()
  }

  return <CourseDetail course={course} />
}