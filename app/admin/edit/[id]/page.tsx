'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { updateArticle } from '@/app/actions/articles'
import { getArticleById } from '@/lib/articles'
import { useRouter } from 'next/navigation'
import type { Article } from '@/lib/supabase'

export default function EditArticle({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Language',
    status: 'draft' as 'draft' | 'published',
    featuredImage: ''
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const categories = ['Language', 'Culture', 'History', 'Traditions', 'Literature']

  useEffect(() => {
    loadArticle()
  }, [params.id])

  const loadArticle = async () => {
    try {
      const data = await getArticleById(params.id)
      if (data) {
        setArticle({
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          category: data.category,
          status: data.status,
          featuredImage: data.featured_image || ''
        })
      }
    } catch (error) {
      console.error('Error loading article:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    if (!article.title || !article.content) {
      alert('Please fill in the title and content')
      return
    }

    setSaving(true)
    
    const formData = new FormData()
    formData.append('title', article.title)
    formData.append('excerpt', article.excerpt)
    formData.append('content', article.content)
    formData.append('category', article.category)
    formData.append('status', status)
    formData.append('featuredImage', article.featuredImage)

    try {
      const result = await updateArticle(params.id, formData)
      
      if (result.success) {
        alert(`Article ${status === 'draft' ? 'saved as draft' : 'updated'} successfully!`)
        router.push('/admin')
      } else {
        alert(result.error || 'Failed to update article')
      }
    } catch (error) {
      console.error('Error updating article:', error)
      alert('Failed to update article')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Preview Header */}
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button 
                variant="outline" 
                onClick={() => setPreviewMode(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Editor
              </Button>
              <Badge className="bg-orange-100 text-orange-800">Preview Mode</Badge>
            </div>
          </div>
        </header>

        {/* Article Preview */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          </div>

          {article.featuredImage && (
            <div className="mb-12">
              <Image
                src={article.featuredImage || "/placeholder.svg"}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="prose prose-lg prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">Editing Article</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setPreviewMode(true)}
                className="flex items-center gap-2"
                disabled={saving}
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleSave('draft')}
                className="flex items-center gap-2"
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button 
                onClick={() => handleSave('published')}
                className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
                disabled={saving}
              >
                {saving ? 'Updating...' : 'Update Article'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={article.excerpt}
                    onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Featured Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={article.featuredImage}
                    onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                    placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {article.featuredImage && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <Image
                        src={article.featuredImage || "/placeholder.svg"}
                        alt="Featured image preview"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Use free images from Unsplash.com or upload to Imgur.com and copy the URL
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: You can use HTML tags like {'<h2>'}, {'<p>'}, {'<strong>'}, {'<ul>'}, {'<li>'} for formatting.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={article.category}
                    onChange={(e) => setArticle({ ...article, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <Badge 
                    variant={article.status === 'published' ? 'default' : 'secondary'}
                    className={article.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}
                  >
                    {article.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
