'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GADGET_CATEGORIES, LEGALITY_STATUS } from '@/lib/constants'

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

interface Gadget {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  price: number
  currency: string
  brand: string
  legality: string
  features: string[]
  specifications: Record<string, string>
  imageUrls: string[]
  videoUrl?: string
  affiliateUrl?: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

interface GadgetDetailProps {
  gadget: Gadget
}

export function GadgetDetail({ gadget }: GadgetDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const category = GADGET_CATEGORIES.find(c => c.value === gadget.category)
  const legality = LEGALITY_STATUS.find(l => l.value === gadget.legality)

  const handleBuyNow = () => {
    // Add to cart / redirect to affiliate link
    if (gadget.affiliateUrl) {
      window.open(gadget.affiliateUrl, '_blank')
    } else {
      alert('Purchase link coming soon!')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/armory"
            className="text-gray-600 hover:text-accent-gold transition"
          >
            ← Back to Armory
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-4 flex items-center justify-center h-96">
              <div className="text-8xl">{category?.icon}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {gadget.imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg shadow p-2 h-24 flex items-center justify-center border-2 transition ${
                    selectedImage === index ? 'border-accent-gold' : 'border-transparent'
                  }`}
                >
                  <div className="text-3xl">{category?.icon}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category?.icon}</span>
              <span className="text-sm font-medium text-accent-gold">
                {category?.label}
              </span>
              <span 
                className={`text-xs px-3 py-1 rounded-full ${
                  gadget.legality === 'LEGAL' ? 'bg-green-100 text-green-700' :
                  gadget.legality === 'RESTRICTED' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}
              >
                {legality?.label}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-primary-deep mb-2">
              {gadget.name}
            </h1>

            <p className="text-gray-600 mb-4">{gadget.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="font-semibold ml-1">{gadget.averageRating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({gadget.totalReviews} reviews)
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-600">Brand: {gadget.brand}</span>
            </div>

            <div className="text-3xl font-bold text-accent-gold mb-6">
              ${gadget.price} {gadget.currency}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border-l hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary py-3"
              >
                Buy Now
              </button>
              <button className="px-6 py-3 border-2 border-primary-deep rounded-lg hover:bg-primary-deep hover:text-white transition">
                ♡ Save
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {gadget.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary-deep mb-4">
                Product Details
              </h2>
              <p className="text-gray-600 mb-8">{gadget.longDescription}</p>

              {gadget.videoUrl && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Video Demo</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video player would go here</p>
                  </div>
                </div>
              )}

              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(gadget.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="text-sm text-gray-500">{key}:</span>
                    <span className="text-sm font-medium ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">
                Customer Reviews ({gadget.totalReviews})
              </h3>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-bold">{gadget.averageRating}</span>
                <div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(gadget.averageRating))}
                    {'☆'.repeat(5 - Math.floor(gadget.averageRating))}
                  </div>
                  <span className="text-xs text-gray-500">Overall rating</span>
                </div>
              </div>

              <div className="space-y-4">
                {gadget.reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400 text-sm mb-2">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 text-accent-gold hover:underline">
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Legal Warning */}
        {gadget.legality !== 'LEGAL' && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Legal Notice</h3>
            <p className="text-sm text-yellow-700">
              This item has {gadget.legality === 'RESTRICTED' ? 'restrictions' : 'legal limitations'} in some jurisdictions. 
              Please check your local laws before purchasing.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}