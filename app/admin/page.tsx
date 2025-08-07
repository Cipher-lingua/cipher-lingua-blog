'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Trash2, Calendar, Clock, Home } from 'lucide-react'
import Link from "next/link"
import { mockArticles } from '@/lib/supabase'
import type { Article } from '@/lib/supabase'

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use mock data directly - no database calls
    setArticles(mockArticles)
    setLoading(false)
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      alert('To delete articles, you need to edit the code file. I can show you how!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Blog
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions Card */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to Add Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800 space-y-2">
              <p><strong>To add new articles:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Edit the file: <code className="bg-blue-100 px-2 py-1 rounded">lib/supabase.ts</code></li>
                <li>Find the <code className="bg-blue-100 px-2 py-1 rounded">mockArticles</code> array</li>
                <li>Add your new article to the array</li>
                <li>Upload to GitHub and deploy</li>
              </ol>
              <p className="mt-4"><strong>Need help?</strong> I can walk you through adding your first article!</p>
            </div>
          </CardContent>
        </Card>

        {/* Articles Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Articles</CardTitle>
              <Badge className="bg-emerald-100 text-emerald-800">
                {articles.length} Articles
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                      <Badge 
                        variant={article.status === 'published' ? 'default' : 'secondary'}
                        className={article.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}
                      >
                        {article.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => alert('To edit articles, you need to edit the code file. I can show you how!')}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Link href={`/post/${article.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
