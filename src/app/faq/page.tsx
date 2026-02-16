import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about SentinelShe',
}

const faqs = [
  {
    question: 'Is SentinelShe completely free?',
    answer: 'Yes! Our core features including the Academy courses, Community Watchtower, and Armory guides are completely free. We may introduce premium features in the future, but our mission is to keep safety education accessible to all.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'You can browse most content without an account, but creating a free account allows you to track your learning progress, save stories, and participate in the community.',
  },
  {
    question: 'How are stories moderated?',
    answer: 'All stories are reviewed by our moderation team before being published to ensure they follow our community guidelines and provide helpful, respectful content.',
  },
  {
    question: 'Can I post anonymously?',
    answer: 'Yes! You can choose to post stories and reports anonymously. Your identity will be protected while still allowing you to share valuable information with the community.',
  },
  {
    question: 'How do I report an emergency?',
    answer: 'SentinelShe is not an emergency service. If you are in immediate danger, please call your local emergency number (911 in the US) first. Our platform is for community awareness and education.',
  },
  {
    question: 'What should I do if I see incorrect information?',
    answer: 'You can flag any content that seems inaccurate or inappropriate. Our moderation team will review it and take appropriate action.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Frequently Asked Questions
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                <h2 className="text-lg font-semibold text-primary-deep mb-2">
                  {faq.question}
                </h2>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}