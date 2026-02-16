import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoryDetail } from '@/components/watchtower/StoryDetail'

interface PageProps {
  params: Promise<{
    storyId: string
  }>
}

// Mock function to get story data - replace with API call
const getStory = async (storyId: string) => {
  const stories = {
    '1': {
      id: '1',
      title: 'How I stayed safe during a late-night commute',
      content: `I want to share some tips that helped me feel safer during my night shifts. 

Last month, I started a new job that requires me to commute home around 11 PM. At first, I was really nervous about walking from the bus stop to my apartment. Here's what I learned:

1. Always stay aware of your surroundings - no phone distractions
2. Keep your keys ready before you reach your door
3. Trust your instincts - if something feels wrong, it probably is
4. Share your location with a trusted friend
5. Consider taking a self-defense class - it builds confidence

I also invested in a personal safety alarm that gives me peace of mind. The most important thing I learned is that being prepared doesn't mean being scared - it means being empowered.

Stay safe, everyone! 💪`,
      category: 'PERSONAL_EXPERIENCE',
      author: { 
        name: 'Priya M.', 
        isAnonymous: false,
        id: 'user1',
        safetyScore: 450
      },
      upvotes: 234,
      comments: [
        {
          id: 'c1',
          content: 'Thank you for sharing this! I also commute at night and these tips are really helpful.',
          author: { name: 'Anonymous', isAnonymous: true },
          createdAt: '2024-01-15T14:30:00Z',
          upvotes: 12
        },
        {
          id: 'c2',
          content: 'The key tip about having keys ready is so important! I started doing this after reading your post.',
          author: { name: 'Sarah K.', isAnonymous: false },
          createdAt: '2024-01-15T16:45:00Z',
          upvotes: 8
        }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      tags: ['commute', 'night-safety', 'tips'],
      views: 1245,
      savedBy: 56
    },
    '2': {
      id: '2',
      title: 'Self-defense class changed my life',
      content: `A year ago, I was nervous about walking alone. After taking a self-defense course, I feel so much more confident. The best investment I ever made in myself...

The course taught me not just physical techniques, but also:
- How to project confidence in your body language
- Verbal de-escalation techniques
- How to identify potential threats before they escalate
- Basic moves to escape common attacks

I highly recommend every woman take at least a basic self-defense class. It's not about being paranoid - it's about being prepared.`,
      category: 'SUCCESS_STORY',
      author: { 
        name: null, 
        isAnonymous: true,
        id: 'user2',
        safetyScore: 380
      },
      upvotes: 567,
      comments: [
        {
          id: 'c3',
          content: 'Where did you take your class? I\'ve been thinking about doing this.',
          author: { name: 'Jessica R.', isAnonymous: false },
          createdAt: '2024-01-14T16:20:00Z',
          upvotes: 5
        }
      ],
      createdAt: '2024-01-14T15:30:00Z',
      tags: ['self-defense', 'empowerment'],
      views: 2341,
      savedBy: 89
    }
  }
  
  return stories[storyId as keyof typeof stories]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params
  const story = await getStory(storyId)
  
  if (!story) {
    return {
      title: 'Story Not Found',
    }
  }

  return {
    title: story.title,
    description: story.content.substring(0, 160),
  }
}

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params
  const story = await getStory(storyId)

  if (!story) {
    notFound()
  }

  return <StoryDetail story={story} />
}