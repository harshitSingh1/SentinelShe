'use client'

import Link from 'next/link'
import { GadgetCategory } from '@/data/armory'

interface CategoryCardProps {
  category: GadgetCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/armory/category/${category.id}`}
      className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-center group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition">
        {category.icon}
      </div>
      <h3 className="font-semibold text-primary-deep mb-1">{category.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{category.count} products</p>
      <p className="text-xs text-accent-gold opacity-0 group-hover:opacity-100 transition">
        Browse →
      </p>
    </Link>
  )
}