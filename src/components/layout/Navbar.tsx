'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Academy', href: '/academy' },
  { name: 'Armory', href: '/armory' },
  { name: 'Watchtower', href: '/watchtower' },
  { name: 'Resources', href: '/resources' },
]

export function Navbar() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary-deep text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-poppins text-xl font-bold">
            SentinelShe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-accent-gold transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-primary-mid animate-pulse rounded" />
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-accent-gold transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-accent-gold text-primary-deep px-4 py-2 rounded-lg hover:bg-accent-gold/90 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hover:text-accent-gold transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-accent-gold text-primary-deep px-4 py-2 rounded-lg hover:bg-accent-gold/90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-mid">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-accent-gold transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary-mid">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block hover:text-accent-gold transition mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full bg-accent-gold text-primary-deep px-4 py-2 rounded-lg hover:bg-accent-gold/90 transition"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block hover:text-accent-gold transition mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block w-full bg-accent-gold text-primary-deep px-4 py-2 rounded-lg hover:bg-accent-gold/90 transition text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}