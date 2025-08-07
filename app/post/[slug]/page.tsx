import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

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
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                Cipher Lingua
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">Home</Link>
              <Link href="/language" className="text-gray-600 hover:text-emerald-600 transition-colors">Language</Link>
              <Link href="/culture" className="text-gray-600 hover:text-emerald-600 transition-colors">Culture</Link>
              <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to articles
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-emerald-100 text-emerald-800">
              {article.category}
            </Badge>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.read_time}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CL</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Cipher Lingua</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="mb-12">
            <Image
              src={article.featured_image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comments</h3>
            <p className="text-gray-600 mb-4">
              Comments are currently disabled to maintain focus on the content. 
              Feel free to share your thoughts on our social media channels.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                Facebook Page
              </Button>
              <Button variant="outline" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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
