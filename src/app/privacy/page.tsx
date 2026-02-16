import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and data protection practices',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 prose max-w-none">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, share a story, or contact us for support.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our community.</p>

          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with your consent or as required by law.</p>

          <h2>4. Data Security</h2>
          <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>

          <h2>5. Your Choices</h2>
          <p>You can access and update your account information at any time. You may also choose to post anonymously.</p>

          <h2>6. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please <Link href="/contact" className="text-accent-gold">contact us</Link>.</p>
        </div>
      </div>
    </div>
  )
}