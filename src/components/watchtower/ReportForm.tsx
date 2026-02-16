'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { REPORT_CATEGORIES } from '@/lib/constants'

// Define the schema with all fields properly typed
const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long'),
  description: z.string().min(20, 'Please provide more details').max(2000, 'Description too long'),
  category: z.enum(['SUSPICIOUS_ACTIVITY', 'HARASSMENT', 'UNSAFE_CONDITION', 'ASSAULT', 'STALKING', 'OTHER']),
  incidentDate: z.string(),
  location: z.string().min(3, 'Please enter a location'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isAnonymous: z.boolean(),
})

// Infer the type from the schema
type ReportFormData = z.infer<typeof reportSchema>

export function ReportForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'SUSPICIOUS_ACTIVITY',
      incidentDate: new Date().toISOString().split('T')[0],
      location: '',
      isAnonymous: true,
    },
  })

  const getCurrentLocation = () => {
    setLocationError(null)
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', position.coords.latitude)
        setValue('longitude', position.coords.longitude)
        toast.success('Location detected!')
      },
      () => {
        setLocationError('Unable to get your location. Please enter manually.')
      }
    )
  }

  const onSubmit = async (data: ReportFormData) => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit report')
      }

      toast.success('Report submitted successfully! Thank you for keeping the community safe.')
      router.push('/watchtower')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit report')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Incident Title
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="input-field"
          placeholder="e.g., Suspicious person near park"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-alert-coral">{errors.title.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Incident Category
        </label>
        <select
          {...register('category')}
          id="category"
          className="input-field"
          disabled={isLoading}
        >
          {REPORT_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-alert-coral">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Incident
        </label>
        <input
          {...register('incidentDate')}
          type="date"
          id="incidentDate"
          className="input-field"
          max={new Date().toISOString().split('T')[0]}
          disabled={isLoading}
        />
        {errors.incidentDate && (
          <p className="mt-1 text-sm text-alert-coral">{errors.incidentDate.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <div className="flex gap-2">
          <input
            {...register('location')}
            type="text"
            id="location"
            className="input-field flex-1"
            placeholder="e.g., Central Park, NY"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-primary-mid text-white rounded-lg hover:bg-primary-deep transition whitespace-nowrap"
          >
            📍 Detect
          </button>
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-alert-coral">{errors.location.message}</p>
        )}
        {locationError && (
          <p className="mt-1 text-sm text-yellow-600">{locationError}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={5}
          className="input-field"
          placeholder="Please provide as much detail as possible..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-alert-coral">{errors.description.message}</p>
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
          Report anonymously
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  )
}