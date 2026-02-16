import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GadgetDetail } from '@/components/armory/GadgetDetail'

interface PageProps {
  params: Promise<{
    gadgetId: string
  }>
}

// Mock function to get gadget data - replace with API call
const getGadget = async (gadgetId: string) => {
  const gadgets = {
    '1': {
      id: '1',
      name: 'Personal Safety Alarm',
      category: 'ALARM',
      description: 'A compact, powerful personal alarm that emits a 130dB sound when activated. Features a built-in LED light and keychain attachment.',
      longDescription: 'This personal safety alarm is designed to be your everyday companion. When activated, it emits a deafening 130dB sound that can deter attackers and alert others nearby. The device also includes a bright LED flashlight and a convenient keychain attachment. Perfect for students, night shift workers, or anyone who wants an extra layer of security.',
      price: 19.99,
      currency: 'USD',
      brand: 'SafeGuard',
      legality: 'LEGAL',
      features: [
        '130dB loud alarm',
        'Built-in LED flashlight',
        'Keychain attachment',
        'Battery included (lasts up to 1 year)',
        'Easy one-button activation',
        'Compact design (2" x 1")',
      ],
      specifications: {
        'Sound Level': '130dB',
        'Battery': 'CR2032 (included)',
        'Material': 'ABS Plastic',
        'Weight': '25g',
        'Color': 'Black/Pink/Purple',
      },
      imageUrls: ['/images/gadgets/alarm-1.jpg', '/images/gadgets/alarm-2.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=example',
      averageRating: 4.5,
      totalReviews: 128,
      reviews: [
        {
          id: 'r1',
          user: 'Priya S.',
          rating: 5,
          comment: 'Great little device. Loud enough to alert the whole neighborhood. I carry it on my keys everywhere.',
          date: '2024-01-10',
        },
        {
          id: 'r2',
          user: 'Anonymous',
          rating: 4,
          comment: 'Works as advertised. Wish it was a bit smaller, but overall good value.',
          date: '2024-01-05',
        },
      ],
    },
    '2': {
      id: '2',
      name: 'Pepper Spray Keychain',
      category: 'SPRAY',
      description: 'Compact pepper spray with quick-release keychain. Contains 10% OC pepper spray with UV dye for attacker identification.',
      longDescription: 'This pepper spray is designed for quick access in emergency situations. The included quick-release keychain allows you to detach the spray instantly. The formula contains 10% OC pepper spray and UV dye that helps law enforcement identify attackers. Each unit provides up to 10 bursts and has a range of 10 feet.',
      price: 14.99,
      currency: 'USD',
      brand: 'DefendX',
      legality: 'RESTRICTED',
      features: [
        '10% OC pepper spray',
        'UV dye for identification',
        'Quick-release keychain',
        '10-foot range',
        '10 bursts per unit',
        'Safety lock to prevent accidental discharge',
      ],
      specifications: {
        'OC Percentage': '10%',
        'Range': '10 feet',
        'Bursts': '10',
        'Size': '3" x 1"',
        'Weight': '45g',
      },
      imageUrls: ['/images/gadgets/pepper-1.jpg', '/images/gadgets/pepper-2.jpg'],
      averageRating: 4.3,
      totalReviews: 256,
      reviews: [
        {
          id: 'r1',
          user: 'Maria G.',
          rating: 5,
          comment: 'Peace of mind in a small package. The quick-release is very convenient.',
          date: '2024-01-12',
        },
      ],
    },
  }
  
  return gadgets[gadgetId as keyof typeof gadgets]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { gadgetId } = await params
  const gadget = await getGadget(gadgetId)
  
  if (!gadget) {
    return {
      title: 'Gadget Not Found',
    }
  }

  return {
    title: gadget.name,
    description: gadget.description,
  }
}

export default async function GadgetPage({ params }: PageProps) {
  const { gadgetId } = await params
  const gadget = await getGadget(gadgetId)

  if (!gadget) {
    notFound()
  }

  return <GadgetDetail gadget={gadget} />
}