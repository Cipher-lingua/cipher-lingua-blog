import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getArticles } from '@/lib/articles'

export default async function HomePage() {
  const articles = await getArticles('published')
  const featuredPost = articles[0]
  const recentPosts = articles.slice(1, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Cipher Lingua</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-emerald-600 transition-colors">Home</Link>
              <Link href="/language" className="text-gray-600 hover:text-emerald-600 transition-colors">Language</Link>
              <Link href="/culture" className="text-gray-600 hover:text-emerald-600 transition-colors">Culture</Link>
              <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <Link href="/admin" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-white/40"></div>
          <Image
            src="/saudi-dunes-with-camels.png"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Exploring Saudi Language & Culture
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover the rich linguistic heritage and cultural traditions of Saudi Arabia through in-depth articles, analysis, and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Explore Articles
              </Button>
              <Button variant="outline" size="lg">
                About the Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h3>
              <div className="w-12 h-1 bg-emerald-600 rounded"></div>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.featured_image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {featuredPost.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.created_at).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.read_time}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link href={`/post/${featuredPost.slug}`}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recent Articles</h3>
              <div className="w-12 h-1 bg-emerald-600 rounded"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <Image
                    src={post.featured_image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.read_time}
                      </span>
                      <Link href={`/post/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0">
                          Read more →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-emerald-100 mb-8 text-lg">
            Get notified when new articles about Saudi language and culture are published.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
            />
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CL</span>
                </div>
                <h4 className="text-xl font-bold">Cipher Lingua</h4>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Exploring the rich linguistic heritage and cultural traditions of Saudi Arabia through thoughtful analysis and engaging content.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/language" className="hover:text-white transition-colors">Language</Link></li>
                <li><Link href="/culture" className="hover:text-white transition-colors">Culture</Link></li>
                <li><Link href="/history" className="hover:text-white transition-colors">History</Link></li>
                <li><Link href="/traditions" className="hover:text-white transition-colors">Traditions</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cipher Lingua. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
