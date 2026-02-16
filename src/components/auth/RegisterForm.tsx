'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

// Define the schema with all fields as required in the schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isAnonymous: z.boolean(),
})

// Infer the type from the schema
type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      city: '',
      country: '',
      isAnonymous: false,
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      toast.success('Registration successful! Please login.')
      router.push('/auth/login')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name (Optional) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name (Optional)
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="input-field"
          placeholder="Jane Doe"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-alert-coral">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input-field"
          placeholder="you@example.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-alert-coral">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="input-field"
          placeholder="••••••••"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-alert-coral">{errors.password.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number (Optional)
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className="input-field"
          placeholder="+1 234 567 8900"
          disabled={isLoading}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-alert-coral">{errors.phone.message}</p>
        )}
      </div>

      {/* City (Optional) */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          City (Optional)
        </label>
        <input
          {...register('city')}
          type="text"
          id="city"
          className="input-field"
          placeholder="Mumbai"
          disabled={isLoading}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-alert-coral">{errors.city.message}</p>
        )}
      </div>

      {/* Country (Optional) */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
          Country (Optional)
        </label>
        <input
          {...register('country')}
          type="text"
          id="country"
          className="input-field"
          placeholder="India"
          disabled={isLoading}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-alert-coral">{errors.country.message}</p>
        )}
      </div>

      {/* Anonymous Option */}
      <div className="flex items-center">
        <input
          {...register('isAnonymous')}
          type="checkbox"
          id="isAnonymous"
          className="h-4 w-4 text-accent-gold focus:ring-accent-gold border-gray-300 rounded"
        />
        <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
          I want to browse anonymously
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-accent-gold hover:underline">
          Login
        </Link>
      </p>
    </form>
  )
}