import { supabase, mockArticles } from './supabase'
import type { Article } from './supabase'

export async function getArticles(status?: 'published' | 'draft'): Promise<Article[]> {
  // If Supabase is not configured, return mock data
  if (!supabase) {
    console.log('Supabase not configured, using mock data')
    let articles = mockArticles
    if (status) {
      articles = articles.filter(article => article.status === status)
    }
    return articles
  }

  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching articles:', error)
    return mockArticles.filter(article => status ? article.status === status : true)
  }

  return data || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // If Supabase is not configured, return mock data
  if (!supabase) {
    console.log('Supabase not configured, using mock data')
    return mockArticles.find(article => article.slug === slug) || null
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return mockArticles.find(article => article.slug === slug) || null
  }

  return data
}

export async function getArticleById(id: string): Promise<Article | null> {
  // If Supabase is not configured, return mock data
  if (!supabase) {
    console.log('Supabase not configured, using mock data')
    return mockArticles.find(article => article.id === id) || null
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return mockArticles.find(article => article.id === id) || null
  }

  return data
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
