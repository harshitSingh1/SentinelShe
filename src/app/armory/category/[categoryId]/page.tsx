import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { gadgetCategories, armoryProducts } from '@/data/armory'
import { ProductCard } from '@/components/armory/ProductCard'

interface PageProps {
  params: Promise<{
    categoryId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryId } = await params
  const category = gadgetCategories.find(c => c.id === categoryId)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Safety Armory`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params
  const category = gadgetCategories.find(c => c.id === categoryId)
  
  if (!category) {
    notFound()
  }

  const products = armoryProducts.filter(p => p.category === categoryId)

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/armory" className="text-gray-600 hover:text-accent-gold transition">
            ← Back to Armory
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-primary-deep mb-2">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{products.length} products available</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
            <Link href="/armory" className="text-accent-gold hover:underline">
              Browse all categories →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}