import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the SentinelShe team',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-deep mb-8">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary-deep mb-4">Get in Touch</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-accent-gold mb-1">Email</h3>
                <p className="text-gray-600">support@sentinelshe.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-accent-gold mb-1">Phone</h3>
                <p className="text-gray-600">+1 (800) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-accent-gold mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Safety Street<br />
                  Suite 100<br />
                  New York, NY 10001
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-accent-gold mb-1">Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9am - 6pm EST<br />
                  Weekend: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}