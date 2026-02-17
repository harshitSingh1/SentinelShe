import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EditStoryForm } from '@/components/watchtower/EditStoryForm'

interface PageProps {
  params: Promise<{
    storyId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params
  
  return {
    title: `Edit Story`,
  }
}

export default async function EditStoryPage({ params }: PageProps) {
  const { storyId } = await params
  
  // Just pass the ID to the client component
  return <EditStoryForm storyId={storyId} />
}