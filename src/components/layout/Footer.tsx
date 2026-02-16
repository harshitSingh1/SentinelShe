import Link from 'next/link'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Safety Tips', href: '/resources/safety-tips' },
    { name: 'Legal Info', href: '/resources/legal' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Community Guidelines', href: '/guidelines' },
  ],
  social: [
    { name: 'Twitter', href: 'https://twitter.com/sentinelshe', icon: '𝕏' },
    { name: 'Instagram', href: 'https://instagram.com/sentinelshe', icon: '📷' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/sentinelshe', icon: '💼' },
    { name: 'YouTube', href: 'https://youtube.com/sentinelshe', icon: '▶️' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary-deep text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-poppins text-xl font-bold mb-4">SentinelShe</h3>
            <p className="text-gray-300 text-sm">
              Knowledge is Your Shield. Community is Your Strength.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-gold text-sm transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-gold text-sm transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent-gold text-sm transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent-gold transition text-xl"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-mid mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} SentinelShe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}