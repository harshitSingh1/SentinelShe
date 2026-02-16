import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Safety resources, blog posts, and educational content',
}

const categories = [
  { name: 'Blog', slug: 'blog', count: 12, icon: '📝' },
  { name: 'Safety Tips', slug: 'safety-tips', count: 8, icon: '💡' },
  { name: 'Legal Info', slug: 'legal', count: 5, icon: '⚖️' },
  { name: 'Success Stories', slug: 'success-stories', count: 15, icon: '✨' },
  { name: 'Expert Interviews', slug: 'interviews', count: 6, icon: '🎙️' },
  { name: 'Research', slug: 'research', count: 4, icon: '📊' },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary-deep mb-4">Resources</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Explore our collection of articles, guides, and expert insights to help you stay informed and safe.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/resources/${category.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-accent-gold transition">
                {category.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {category.count} {category.count === 1 ? 'article' : 'articles'}
              </p>
              <span className="text-accent-gold">Browse →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}