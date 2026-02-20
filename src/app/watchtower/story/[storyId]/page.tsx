import { Metadata } from 'next'
import { StoryDetailClient } from '@/components/watchtower/StoryDetailClient'

interface PageProps {
  params: Promise<{
    storyId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params
  
  return {
    title: `Story`,
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params
  
  return <StoryDetailClient storyId={storyId} />
}