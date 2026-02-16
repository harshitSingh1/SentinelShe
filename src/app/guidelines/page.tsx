import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community Guidelines',
  description: 'Guidelines for participating in the SentinelShe community',
}

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Community Guidelines
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none space-y-6">
            <div className="bg-primary-deep/5 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-primary-deep mb-3">Our Community Promise</h2>
              <p className="text-gray-700">
                SentinelShe is a safe, supportive space for women to learn, share, and grow together. 
                These guidelines help us maintain a respectful and empowering environment for everyone.
              </p>
            </div>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">1. Be Respectful</h2>
              <p className="text-gray-700">Treat others with kindness and respect. We do not tolerate:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Harassment, bullying, or intimidation</li>
                <li>Hate speech or discrimination</li>
                <li>Personal attacks or name-calling</li>
                <li>Dismissive or belittling comments</li>
                <li>Unsolicited advances or inappropriate messages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">2. Share Responsibly</h2>
              <p className="text-gray-700">When sharing stories and reports:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Only share information you know to be true</li>
                <li>Do not share others' personal information</li>
                <li>Be mindful of triggering content (use content warnings)</li>
                <li>Focus on your experience and lessons learned</li>
                <li>Do not post graphic violence or explicit content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">3. Report Incidents Accurately</h2>
              <p className="text-gray-700">For safety reports on the map:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Only report incidents you have personally witnessed</li>
                <li>Provide accurate location and time information</li>
                <li>Do not exaggerate or sensationalize</li>
                <li>For emergencies, always call local authorities first</li>
                <li>Updates are appreciated if situation changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">4. Protect Privacy</h2>
              <p className="text-gray-700">Respect everyone's privacy:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Do not share others' names, photos, or contact information</li>
                <li>Use the anonymous option when appropriate</li>
                <li>Do not screenshot and share content outside the platform</li>
                <li>Be cautious about sharing identifying details in stories</li>
                <li>Report any privacy violations to moderators</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">5. Support Survivors</h2>
              <p className="text-gray-700">When engaging with trauma-related content:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Believe and validate survivors' experiences</li>
                <li>Do not ask for graphic details or "proof"</li>
                <li>Avoid victim-blaming language</li>
                <li>Offer support, not unsolicited advice</li>
                <li>Use trigger warnings for sensitive topics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">6. No Promotional Content</h2>
              <p className="text-gray-700">Our community is not a marketplace:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Do not post advertisements or spam</li>
                <li>No selling products or services</li>
                <li>No affiliate links without disclosure</li>
                <li>No recruiting for external platforms</li>
                <li>Genuine product recommendations are okay in context</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">7. Content Moderation</h2>
              <p className="text-gray-700">Our moderation team may:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Review posts before they go public</li>
                <li>Remove content that violates guidelines</li>
                <li>Issue warnings for minor violations</li>
                <li>Suspend accounts for repeated or serious violations</li>
                <li>Report illegal content to authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">8. How to Report Violations</h2>
              <p className="text-gray-700">If you see content that violates these guidelines:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Use the "Report" button on posts and comments</li>
                <li>Email <span className="text-accent-gold">moderators@sentinelshe.com</span> for urgent issues</li>
                <li>Provide specific information about the violation</li>
                <li>Do not engage with or confront violators directly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">9. Consequences for Violations</h2>
              <p className="text-gray-700">Depending on severity, consequences may include:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li>Content removal and warning</li>
                <li>Temporary posting restrictions</li>
                <li>Temporary account suspension</li>
                <li>Permanent account ban</li>
                <li>Reporting to law enforcement (if illegal)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">10. Appeals Process</h2>
              <p className="text-gray-700">
                If you believe a moderation decision was made in error, you can appeal by emailing 
                <span className="text-accent-gold"> appeals@sentinelshe.com</span> with your account information 
                and reason for appeal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">11. Our Commitment</h2>
              <p className="text-gray-700">
                We are committed to maintaining SentinelShe as a safe, supportive space. These 
                guidelines are enforced fairly and consistently. We welcome feedback on how we can 
                better serve our community.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">Together We're Stronger</h3>
              <p className="text-sm text-green-700 mb-4">
                By following these guidelines, you help create a community where women can learn, 
                share, and support each other safely.
              </p>
              <div className="flex gap-4">
                <Link href="/watchtower/feed" className="text-accent-gold hover:underline">
                  Browse Stories →
                </Link>
                <Link href="/watchtower/story/new" className="text-accent-gold hover:underline">
                  Share Your Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}