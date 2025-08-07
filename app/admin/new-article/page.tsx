'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Upload, ImageIcon } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { createArticle } from '@/app/actions/articles'
import { useRouter } from 'next/navigation'

export default function NewArticle() {
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

  const categories = ['Language', 'Culture', 'History', 'Traditions', 'Literature']

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
      const result = await createArticle(formData)
      
      if (result.success) {
        alert(`Article ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`)
        router.push('/admin')
      } else {
        alert(result.error || 'Failed to save article')
      }
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Failed to save article')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a storage service
      const imageUrl = URL.createObjectURL(file)
      setArticle({ ...article, featuredImage: imageUrl })
    }
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
              {article.title || 'Article Title'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt || 'Article excerpt will appear here...'}
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
            <div dangerouslySetInnerHTML={{ __html: article.content || 'Article content will appear here...' }} />
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
                {saving ? 'Publishing...' : 'Publish Article'}
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
                    Title *
                  </label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    placeholder="Enter article title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
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
                    placeholder="Brief description of the article..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {article.featuredImage ? (
                      <div className="space-y-4">
                        <Image
                          src={article.featuredImage || "/placeholder.svg"}
                          alt="Featured"
                          width={300}
                          height={200}
                          className="mx-auto rounded-lg shadow-md"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setArticle({ ...article, featuredImage: '' })}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Button variant="outline" className="flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </Button>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    placeholder="Write your article content here... You can use HTML tags for formatting."
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                    required
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
                    Status
                  </label>
                  <div className="flex gap-2">
                    <Badge 
                      variant={article.status === 'draft' ? 'default' : 'outline'}
                      className={article.status === 'draft' ? 'bg-orange-100 text-orange-800' : ''}
                    >
                      Draft
                    </Badge>
                    <Badge 
                      variant={article.status === 'published' ? 'default' : 'outline'}
                      className={article.status === 'published' ? 'bg-emerald-100 text-emerald-800' : ''}
                    >
                      Published
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Write a compelling title that includes your main topic</p>
                  <p>• Keep your excerpt under 160 characters for better SEO</p>
                  <p>• Use high-quality images that relate to your content</p>
                  <p>• Break up long paragraphs for better readability</p>
                  <p>• Save as draft first, then preview before publishing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
