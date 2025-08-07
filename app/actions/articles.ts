'use server'

import { supabase } from '@/lib/supabase'
import { generateSlug, calculateReadTime } from '@/lib/articles'
import { revalidatePath } from 'next/cache'

export async function createArticle(formData: FormData) {
  // If Supabase is not configured, show helpful message
  if (!supabase) {
    return { 
      error: 'Database not configured yet. Please set up Supabase environment variables to save articles permanently.' 
    }
  }

  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const status = formData.get('status') as 'draft' | 'published'
  const featuredImage = formData.get('featuredImage') as string

  if (!title || !content) {
    return { error: 'Title and content are required' }
  }

  const slug = generateSlug(title)
  const readTime = calculateReadTime(content)

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title,
      excerpt,
      content,
      category,
      status,
      featured_image: featuredImage,
      slug,
      read_time: readTime
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating article:', error)
    return { error: 'Failed to create article' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  
  return { success: true, article: data }
}

export async function updateArticle(id: string, formData: FormData) {
  // If Supabase is not configured, show helpful message
  if (!supabase) {
    return { 
      error: 'Database not configured yet. Please set up Supabase environment variables to save changes permanently.' 
    }
  }

  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const status = formData.get('status') as 'draft' | 'published'
  const featuredImage = formData.get('featuredImage') as string

  if (!title || !content) {
    return { error: 'Title and content are required' }
  }

  const slug = generateSlug(title)
  const readTime = calculateReadTime(content)

  const { data, error } = await supabase
    .from('articles')
    .update({
      title,
      excerpt,
      content,
      category,
      status,
      featured_image: featuredImage,
      slug,
      read_time: readTime
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating article:', error)
    return { error: 'Failed to update article' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath(`/post/${slug}`)
  
  return { success: true, article: data }
}

export async function deleteArticle(id: string) {
  // If Supabase is not configured, show helpful message
  if (!supabase) {
    return { 
      error: 'Database not configured yet. Please set up Supabase environment variables to delete articles permanently.' 
    }
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting article:', error)
    return { error: 'Failed to delete article' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  
  return { success: true }
}
