import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your SentinelShe account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-deep mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to access your safety dashboard and community
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}