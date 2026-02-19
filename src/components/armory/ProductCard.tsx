'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProductImage } from './ProductImage'
import { GadgetProduct } from '@/data/armory'

interface ProductCardProps {
  product: GadgetProduct
  compact?: boolean
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Check if product is saved
    const savedProducts = JSON.parse(localStorage.getItem('saved-products') || '[]')
    setSaved(savedProducts.includes(product.id))
  }, [product.id])

  const saveProduct = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const savedProducts = JSON.parse(localStorage.getItem('saved-products') || '[]')
    let newSaved
    
    if (!saved) {
      newSaved = [...savedProducts, product.id]
    } else {
      newSaved = savedProducts.filter((id: string) => id !== product.id)
    }
    
    localStorage.setItem('saved-products', JSON.stringify(newSaved))
    setSaved(!saved)
  }

  const getLegalityBadge = () => {
    switch(product.legality) {
      case 'legal':
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Legal</span>
      case 'restricted':
        return <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Check Laws</span>
      default:
        return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Verify</span>
    }
  }

  if (compact) {
    return (
      <Link href={`/armory/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary-deep/5 rounded-lg overflow-hidden shrink-0">
              <ProductImage src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain p-4 bg-blue-500 rounded-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-deep mb-1 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-accent-gold">{product.price}</span>
                {getLegalityBadge()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative">
      <Link href={`/armory/product/${product.id}`} className="block">
        <div className="relative h-48 bg-primary-deep/5">
          <ProductImage src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-4 bg-gray-100 rounded-lg" />
          <button
            onClick={saveProduct}
            className={`absolute top-2 right-2 text-2xl ${
              saved ? 'text-accent-gold' : 'text-gray-300'
            } hover:text-accent-gold transition z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm`}
            aria-label={saved ? 'Remove from saved' : 'Save product'}
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-primary-deep">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.brand}</p>
            </div>
            {getLegalityBadge()}
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-accent-gold">{product.price}</span>
            <span className="text-xs text-gray-400">{product.priceRange}</span>
          </div>

          {/* Platform Icons */}
          <div className="mt-3 flex gap-2">
            {product.platformLinks.amazon && <span className="text-xs bg-gray-100 px-2 py-1 rounded">🛒 Amazon</span>}
            {product.platformLinks.flipkart && <span className="text-xs bg-gray-100 px-2 py-1 rounded">🛍️ FK</span>}
            {product.platformLinks.blinkit && <span className="text-xs bg-gray-100 px-2 py-1 rounded">⚡ Blinkit</span>}
          </div>
        </div>
      </Link>
    </div>
  )
}