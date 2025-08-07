import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Linkedin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { getArticles } from '@/lib/articles'

export default async function HomePage() {
  const articles = await getArticles('published')

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Cipher Lingua</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://linkedin.com/in/ibrahim-almahboob-b4a334281" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <Link href="/admin" className="text-gray-400 hover:text-emerald-600 transition-colors text-sm">
                Admin
              </Link>
            </div>
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
              Discover the rich linguistic heritage and cultural traditions of Saudi Arabia through in-depth articles and insights.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <Image
                    src={article.featured_image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time}
                      </span>
                      <Link href={`/post/${article.slug}`}>
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0">
                          Read more →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <h4 className="text-xl font-bold">Cipher Lingua</h4>
            </div>
            <div className="flex items-center space-x-6">
              <p className="text-gray-400">
                Exploring Saudi language and culture
              </p>
              <a 
                href="https://linkedin.com/in/ibrahim-almahboob-b4a334281" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; 2024 Cipher Lingua. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
