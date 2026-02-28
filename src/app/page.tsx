import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { APP_NAME } from '@/lib/constants'
import { AcademyIcon, ArmoryIcon, WatchtowerIcon, CommunityIcon, ShieldIcon, LocationIcon } from '@/components/icons/FeatureIcons'

export default async function Home() {
  const session = await getServerSession()
  const isLoggedIn = !!session

  const features = [
    {
      icon: AcademyIcon,
      title: "The Academy",
      description: "Interactive learning modules and scenario simulations for real-world preparedness.",
      color: "#4A2A5E",
      gradient: "from-amber-50 to-orange-50"
    },
    {
      icon: ArmoryIcon,
      title: "The Armory",
      description: "Smart gadget finder, legality checker, and verified reviews of safety tools.",
      color: "#6D4C7D",
      gradient: "from-purple-50 to-pink-50"
    },
    {
      icon: WatchtowerIcon,
      title: "The Watchtower",
      description: "Community-powered safety map and incident reporting to keep everyone aware.",
      color: "#2E7D5E",
      gradient: "from-blue-50 to-indigo-50"
    }
  ]

  const stats = [
    { value: "10K+", label: "Community Members", icon: CommunityIcon },
    { value: "5K+", label: "Stories Shared", icon: LocationIcon },
    { value: "100+", label: "Safety Tips", icon: ShieldIcon },
  ]

  const testimonials = [
    {
      quote: "I was nervous about walking back from late-night study sessions. The self-defense tips and community support gave me the confidence I needed. Now I share what I've learned with my hostel mates!",
      name: "Anjali Deshmukh",
      role: "College Student, Mumbai",
      initial: "A",
      color: "from-primary-mid to-primary-deep"
    },
    {
      quote: "After joining SentinelShe, I finally feel prepared. The gadget reviews helped me choose the perfect safety alarm, and the community stories remind me I'm not alone. This platform is a lifesaver.",
      name: "Priya Sharma",
      role: "Software Engineer, Bangalore",
      initial: "P",
      color: "from-accent-gold to-amber-600"
    },
    {
      quote: "I've been teaching self-defense for 8 years, and SentinelShe is the most comprehensive platform I've seen. The scenario simulations are brilliant - they prepare you for real situations without the fear.",
      name: "Meera Krishnan",
      role: "Self-Defense Instructor, Delhi",
      initial: "M",
      color: "from-safety-green to-emerald-600"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section with Image Background */}
      <section className="relative h-150 md:h-175 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero1.png"
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Purple overlay with gradient for better text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/70 via-purple-800/60 to-purple-900/70" />
        </div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-gold/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-mid/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative h-full container-custom flex items-center justify-center">
          <div className="max-w-4xl text-center">
            <h1 className="text-white mb-6 leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl">Knowledge is Your Shield,</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-accent-gold mt-2">
                Community is Your Strength.
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 font-light max-w-2xl mx-auto">
              Join {APP_NAME} - Your comprehensive platform for safety awareness,
              self-defense training, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="btn-primary text-lg"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/watchtower"
                    className="btn-secondary text-lg"
                  >
                    View Community
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className="btn-primary text-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/about"
                    className="btn-secondary text-lg"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>

            {/* Stats Banner with Icons */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-8 h-8 text-accent-gold group-hover:scale-110 transition-transform" color="#E5B13A" />
                    </div>
                    <div className="text-3xl font-bold text-accent-gold">{stat.value}</div>
                    <div className="text-sm text-gray-200 uppercase tracking-wider">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-24 bg-linear-to-b from-neutral-light to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mt-3 mb-6">Our Three Pillars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A comprehensive approach to women's safety through education, tools, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="feature-card group">
                  <div className="feature-icon group-hover:scale-110 transition-transform duration-300">
                    <Icon color={feature.color} className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary-deep">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-6">
                    <Link 
                      href={`/${feature.title.toLowerCase().replace(' ', '')}`}
                      className="inline-flex items-center text-accent-gold font-semibold group-hover:gap-2 transition-all"
                    >
                      Learn more 
                      <span className="ml-1 text-xl group-hover:ml-2 transition-all">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary-deep via-primary-mid to-primary-deep">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay" />
        </div>
        
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="container-custom relative text-center">
          <h2 className="text-white mb-4 text-4xl md:text-5xl">Ready to Start Your Safety Journey?</h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Join thousands of women who are learning, sharing, and staying safe together.
          </p>
          {isLoggedIn ? (
            <Link
              href="/academy"
              className="inline-flex items-center bg-white text-primary-deep font-semibold px-10 py-4 rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Continue Learning
              <span className="ml-2 text-xl">→</span>
            </Link>
          ) : (
            <Link
              href="/auth/register"
              className="inline-flex items-center bg-accent-gold text-primary-deep font-semibold px-10 py-4 rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              Join the Community
              <span className="ml-2 text-xl">→</span>
            </Link>
          )}
        </div>
      </section>

      {/* Testimonial Section with Realistic Data */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real stories from real women whose lives have been transformed by our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-neutral-light p-8 rounded-3xl relative hover:shadow-xl transition-all duration-300 ${
                  index === 1 ? 'md:-translate-y-4' : ''
                }`}
              >
                <div className="absolute -top-3 -left-3 text-6xl text-accent-gold/30 font-serif">"</div>
                <div className="relative z-10">
                  <p className="text-gray-700 mb-5 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-linear-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-lg`}>
                      {testimonial.initial}
                    </div>
                    <div>
                      <p className="font-bold text-primary-deep">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[1,2,3,4,5].map(star => (
                          <span key={star} className="text-accent-gold text-xs">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}