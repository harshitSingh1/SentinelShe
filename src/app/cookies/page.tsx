import { Metadata } from 'next'
import Link from 'next/link'
import { CookiePreferences } from '@/components/cookies/CookiePreferences'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How we use cookies on SentinelShe',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Cookie Policy
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">What Are Cookies</h2>
              <p className="text-gray-700">
                Cookies are small text files that are placed on your computer or mobile device when 
                you visit a website. They are widely used to make websites work more efficiently and 
                provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">How We Use Cookies</h2>
              <p className="text-gray-700">SentinelShe uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for you to stay logged in and access protected areas of the site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Security Cookies:</strong> Help protect your account and detect suspicious activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">Types of Cookies We Use</h2>
              
              <h3 className="font-semibold text-primary-deep mt-4 mb-2">Essential Cookies</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Cookie</th>
                      <th className="text-left py-2 pr-4">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4">next-auth.session-token</td>
                      <td className="py-2 pr-4">Maintains your login session</td>
                      <td className="py-2">30 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">next-auth.csrf-token</td>
                      <td className="py-2 pr-4">Prevents cross-site request forgery</td>
                      <td className="py-2">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-primary-deep mt-6 mb-2">Analytics Cookies</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Cookie</th>
                      <th className="text-left py-2 pr-4">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Distinguishes unique users</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">_gid</td>
                      <td className="py-2 pr-4">Distinguishes users</td>
                      <td className="py-2">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">Managing Cookies</h2>
              <p className="text-gray-700">
                Most web browsers allow you to control cookies through their settings preferences. 
                However, if you limit the ability of websites to set cookies, you may worsen your 
                overall user experience and lose access to certain features.
              </p>
              <p className="text-gray-700 mt-2">
                To learn more about how to manage cookies, visit:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">Third-Party Cookies</h2>
              <p className="text-gray-700">
                In some special cases, we also use cookies provided by trusted third parties. The 
                following section details which third-party cookies you might encounter through this site.
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Google Analytics: Used to understand how visitors use our site</li>
                <li>Mapbox: Used for interactive safety maps</li>
                <li>Cloudinary: Used for image optimization and delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-deep mb-3">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about our use of cookies, please <Link href="/contact" className="text-accent-gold hover:underline">contact us</Link>.
              </p>
            </section>
          </div>

          {/* Use the client component here */}
          <CookiePreferences />
        </div>
      </div>
    </div>
  )
}