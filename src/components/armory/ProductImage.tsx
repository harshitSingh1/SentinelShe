'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Fallback images in case the product image fails to load
  const fallbackImages = [
    'https://m.media-amazon.com/images/I/61Lp02O7arL._AC_SL1500_.jpg?w=400&h=400&fit=crop', // Safety alarm
    'https://images.unsplash.com/photo-1624004104386-d4b8d7c6f7a1?w=400&h=400&fit=crop', // Pepper spray
    'https://images.unsplash.com/photo-1611077541876-4b0d0d5f1b5e?w=400&h=400&fit=crop', // Tracker
    'https://images.unsplash.com/photo-1625772452859-1f03f6f8a5b6?w=400&h=400&fit=crop', // Flashlight
    'https://images.unsplash.com/photo-1624004104386-d4b8d7c6f7a1?w=400&h=400&fit=crop', // Tool
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop', // App icon
  ]

  const handleError = () => {
    if (!imageError) {
      setImageError(true)
      // Use a random fallback image
      const randomIndex = Math.floor(Math.random() * fallbackImages.length)
      setImageSrc(fallbackImages[randomIndex])
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-contain"
        onError={handleError}
      />
    </div>
  )
}