import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using SentinelShe',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Terms of Service
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using SentinelShe, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">2. Description of Service</h2>
              <p className="text-gray-700">
                SentinelShe provides a platform for women safety education, community support, 
                and awareness. This includes but is not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Educational content and self-defense courses</li>
                <li>Community stories and incident reporting</li>
                <li>Safety gadget information and reviews</li>
                <li>Interactive safety maps</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">3. User Accounts</h2>
              <p className="text-gray-700">
                To access certain features, you may need to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Not sharing your account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">4. User Content</h2>
              <p className="text-gray-700">
                When you post stories, comments, or reports on SentinelShe:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>You retain ownership of your content</li>
                <li>You grant us license to display and share your content on the platform</li>
                <li>You represent that you have the right to share this content</li>
                <li>Your content may be moderated or removed if it violates guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">5. Prohibited Conduct</h2>
              <p className="text-gray-700">You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Post false, misleading, or harmful information</li>
                <li>Harass, abuse, or harm others</li>
                <li>Impersonate another person or entity</li>
                <li>Post spam or promotional content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for any illegal purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">6. Third-Party Links</h2>
              <p className="text-gray-700">
                Our service may contain links to third-party websites or services. We are not 
                responsible for the content or practices of these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">7. Termination</h2>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account if you violate these 
                terms or engage in harmful behavior. You may also delete your account at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700">
                SentinelShe is provided "as is" without warranties of any kind. We do not guarantee 
                that our service will be error-free or uninterrupted. Safety information provided 
                is for educational purposes and should not replace professional training or 
                emergency services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, SentinelShe shall not be liable for any 
                indirect, incidental, or consequential damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700">
                We may modify these terms at any time. We will notify users of significant changes 
                via email or through the platform. Continued use of the service constitutes 
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">11. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms, please <Link href="/contact" className="text-accent-gold hover:underline">contact us</Link>.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-600">
              By using SentinelShe, you acknowledge that you have read and understood these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}