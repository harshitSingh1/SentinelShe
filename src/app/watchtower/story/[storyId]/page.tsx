import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoryDetailClient } from '@/components/watchtower/StoryDetailClient'

interface PageProps {
  params: Promise<{
    storyId: string
  }>
}

// This is a server component that just passes the ID to a client component
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params
  
  return {
    title: `Story ${storyId}`,
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params
  
  // Just render the client component with the ID
  // The client component will handle loading the story from localStorage
  return <StoryDetailClient storyId={storyId} />
}