import { Metadata } from 'next'
import Link from 'next/link'
import { gadgetCategories, armoryProducts, featuredProducts } from '@/data/armory'
import { ProductCard } from '@/components/armory/ProductCard'
import { CategoryCard } from '@/components/armory/CategoryCard'

export const metadata: Metadata = {
  title: 'Safety Armory',
  description: 'Discover safety gadgets and self-defense tools from Amazon, Flipkart, Meesho and more',
}

export default function ArmoryPage() {
  const totalProducts = armoryProducts.length

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-deep to-primary-mid text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Safety <span className="text-accent-gold">Armory</span>
          </h1>
          <p className="text-xl max-w-3xl mb-6">
            Discover trusted safety gadgets from Amazon, Flipkart, Meesho, Blinkit and more.
            {totalProducts}+ products curated for your safety.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#categories" className="bg-accent-gold text-primary-deep px-6 py-3 rounded-lg font-semibold hover:bg-accent-gold/90 transition">
              Browse Categories
            </Link>
            <Link href="#featured" className="border-2 border-white hover:bg-white hover:text-primary-deep px-6 py-3 rounded-lg transition">
              Featured Products
            </Link>
          </div>
        </div>
      </section>

      {/* Shopping Info Banner */}
      <div className="bg-accent-gold/10 border-y border-accent-gold/20 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-primary-deep text-sm md:text-base">
            🛍️ Products available on Amazon, Flipkart, Meesho, Blinkit, Zepto, Nykaa & more • 
            Prices updated daily • Affiliate links support our mission
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">Shop by Category</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Find the perfect safety tool for your needs
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gadgetCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">✨ Featured Products</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Highly rated safety gadgets loved by our community
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/armory/category/all" className="text-accent-gold hover:underline">
              View all {totalProducts} products →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links by Platform */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-deep mb-3">🛒 Shop by Platform</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Find safety products on your favorite shopping sites
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="https://www.amazon.in/s?k=women+safety" target="_blank" rel="noopener noreferrer" 
               className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-center group">
              <span className="text-4xl mb-2 block group-hover:scale-110 transition">🛒</span>
              <h3 className="font-bold text-primary-deep">Amazon</h3>
              <p className="text-xs text-gray-500">2000+ products</p>
            </a>
            <a href="https://www.flipkart.com/search?q=women+safety" target="_blank" rel="noopener noreferrer"
               className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-center group">
              <span className="text-4xl mb-2 block group-hover:scale-110 transition">🛍️</span>
              <h3 className="font-bold text-primary-deep">Flipkart</h3>
              <p className="text-xs text-gray-500">1500+ products</p>
            </a>
            <a href="https://www.meesho.com/search?q=safety%20products" target="_blank" rel="noopener noreferrer"
               className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-center group">
              <span className="text-4xl mb-2 block group-hover:scale-110 transition">📦</span>
              <h3 className="font-bold text-primary-deep">Meesho</h3>
              <p className="text-xs text-gray-500">800+ products</p>
            </a>
            <a href="https://blinkit.com/search?q=safety" target="_blank" rel="noopener noreferrer"
               className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition text-center group">
              <span className="text-4xl mb-2 block group-hover:scale-110 transition">⚡</span>
              <h3 className="font-bold text-primary-deep">Blinkit</h3>
              <p className="text-xs text-gray-500">10 min delivery</p>
            </a>
          </div>
        </div>
      </section>

      {/* Legality Notice */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Legal Notice</h3>
            <p className="text-sm text-yellow-700">
              Some products like pepper spray may have legal restrictions in certain states. 
              Always check local laws before purchasing. We provide information for awareness - 
              please verify legality in your area.
            </p>
            <Link href="/armory/legality" className="inline-block mt-3 text-accent-gold hover:underline text-sm">
              Check state-wise legality →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}