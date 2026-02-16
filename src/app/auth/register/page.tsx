import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your SentinelShe account',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Join SentinelShe
          </h1>
          <p className="text-gray-600">
            Create an account to start your safety journey
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <RegisterForm />
          
          <p className="mt-6 text-center text-sm text-gray-600">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-accent-gold hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-accent-gold hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}