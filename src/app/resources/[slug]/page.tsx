import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// This would normally come from a database
const getCategoryContent = (slug: string) => {
  const categories = {
    'blog': {
      title: 'Blog',
      description: 'Latest news and updates from SentinelShe',
      articles: [
        { id: 1, title: '5 Self-Defense Tips Every Woman Should Know', date: '2024-01-15' },
        { id: 2, title: 'Understanding Your Legal Rights', date: '2024-01-10' },
        { id: 3, title: 'Community Spotlight: Mumbai Chapter', date: '2024-01-05' },
      ]
    },
    'safety-tips': {
      title: 'Safety Tips',
      description: 'Practical advice for everyday safety',
      articles: [
        { id: 4, title: 'Night Walking Safety Guide', date: '2024-01-12' },
        { id: 5, title: 'Public Transport Safety Tips', date: '2024-01-08' },
        { id: 6, title: 'Digital Safety for Women', date: '2024-01-03' },
      ]
    },
    'legal': {
      title: 'Legal Information',
      description: 'Know your rights and legal protections',
      articles: [
        { id: 7, title: 'Self-Defense Laws by State', date: '2024-01-14' },
        { id: 8, title: 'Filing a Police Report Guide', date: '2024-01-09' },
      ]
    }
  }
  
  return categories[slug as keyof typeof categories]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryContent(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: category.title,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategoryContent(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <Link 
          href="/resources"
          className="inline-flex items-center text-accent-gold hover:underline mb-8"
        >
          ← Back to Resources
        </Link>

        <h1 className="text-4xl font-bold text-primary-deep mb-4">{category.title}</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">{category.description}</p>

        <div className="space-y-6">
          {category.articles.map((article) => (
            <Link
              key={article.id}
              href={`/resources/articles/${article.id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 hover:text-accent-gold transition">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}