import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById, gadgetCategories, legalityInfo, armoryProducts } from '@/data/armory'
import { ProductCard } from '@/components/armory/ProductCard'
import { ProductImage } from '@/components/armory/ProductImage'

interface PageProps {
  params: Promise<{
    productId: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params
  const product = getProductById(productId)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  const category = gadgetCategories.find(c => c.id === product.category)
  
  // Get similar products from same category (excluding current product)
  const similarProducts = armoryProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const platformIcons: Record<string, string> = {
    amazon: '🛒',
    flipkart: '🛍️',
    meesho: '📦',
    blinkit: '⚡',
    zepto: '🚀',
    nykaa: '💄',
    ajio: '👕',
    official: '🏢',
  }

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/armory" className="text-gray-600 hover:text-accent-gold transition">
            ← Back to Armory
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link 
            href={`/armory/category/${product.category}`} 
            className="text-gray-600 hover:text-accent-gold transition"
          >
            {category?.name || product.category}
          </Link>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="bg-primary-deep/5 rounded-lg p-8 flex items-center justify-center min-h-100">
              <ProductImage src={product.imageUrl} alt={product.name} className="max-w-full max-h-75" />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary-deep mb-2">{product.name}</h1>
                  <p className="text-gray-500">{product.brand}</p>
                </div>
                <span className="text-xl font-bold text-accent-gold">{product.price}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.reviews.toLocaleString()} verified reviews</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">{product.longDescription || product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-primary-deep mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Specs */}
              {(product.color || product.weight || product.battery) && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-primary-deep mb-2">Specifications:</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {product.color && product.color.length > 0 && (
                      <div>
                        <span className="text-gray-500">Colors:</span>
                        <span className="ml-2 text-gray-700">{product.color.join(', ')}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <span className="ml-2 text-gray-700">{product.weight}</span>
                      </div>
                    )}
                    {product.battery && (
                      <div>
                        <span className="text-gray-500">Battery:</span>
                        <span className="ml-2 text-gray-700">{product.battery}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legality */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-primary-deep mb-2">⚖️ Legality</h3>
                <p className="text-sm text-gray-700">{legalityInfo[product.legality]}</p>
              </div>

              {/* Best For */}
              {product.bestFor && product.bestFor.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-deep mb-2">Best For:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor.map(item => (
                      <span key={item} className="text-xs bg-primary-deep/10 text-primary-deep px-3 py-1 rounded-full">
                        {item.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Badge */}
              <div className="mb-6">
                <span className="text-sm bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full">
                  {product.priceRange}
                </span>
              </div>

              {/* Shopping Links */}
              <div>
                <h3 className="font-semibold text-primary-deep mb-3">Available on:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.platformLinks).map(([platform, url]) => {
                    if (!url) return null
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{platformIcons[platform] || '🛒'}</span>
                          <span className="capitalize text-sm font-medium">{platform}</span>
                        </span>
                        <span className="text-xs text-accent-gold">→</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary-deep mb-6">You might also like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}