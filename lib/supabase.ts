import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Article = {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published'
  featured_image?: string
  slug: string
  created_at: string
  updated_at: string
  read_time: string
}

// Mock data for when Supabase isn't configured
export const mockArticles: Article[] = [
  {
    id: '1',
    title: "The Evolution of Saudi Arabic: From Bedouin Roots to Modern Expression",
    excerpt: "Explore how the Saudi dialect has transformed over centuries, maintaining its authentic character while adapting to contemporary life.",
    content: `<p>The Saudi dialect of Arabic represents one of the most fascinating linguistic journeys in the Arabian Peninsula. From its ancient Bedouin roots to its contemporary urban expressions, Saudi Arabic has maintained its authentic character while continuously adapting to the changing social and cultural landscape.</p>

<h2>Historical Foundations</h2>
<p>The foundation of Saudi Arabic can be traced back to the classical Arabic of the Quran and the various tribal dialects that flourished in the Arabian Peninsula. The Najdi dialect, in particular, has played a central role in shaping what we recognize today as Saudi Arabic.</p>

<p>The nomadic Bedouin tribes contributed significantly to the vocabulary and pronunciation patterns that characterize Saudi speech today. Words related to desert life, camel herding, and tribal social structures remain deeply embedded in the modern Saudi lexicon.</p>

<h2>Regional Variations</h2>
<p>Saudi Arabia's vast geographical expanse has given rise to distinct regional variations in the Arabic dialect:</p>

<ul>
<li><strong>Najdi Arabic:</strong> Spoken in the central region, including Riyadh, this is often considered the "standard" Saudi dialect</li>
<li><strong>Hejazi Arabic:</strong> Found in the western region, influenced by the diverse pilgrimage population</li>
<li><strong>Eastern Arabic:</strong> Spoken in the Eastern Province, with some Persian Gulf influences</li>
<li><strong>Southern Arabic:</strong> Includes various dialects from the Asir and Jazan regions</li>
</ul>

<h2>Modern Influences</h2>
<p>The discovery of oil and subsequent modernization of Saudi Arabia has introduced new vocabulary and expressions into the language. Technical terms, business language, and international concepts have been seamlessly integrated into Saudi Arabic, often through creative adaptation rather than direct borrowing.</p>`,
    category: 'Language',
    status: 'published',
    featured_image: '/saudi-desert-architecture.png',
    slug: 'evolution-saudi-arabic',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    read_time: '8 min read'
  },
  {
    id: '2',
    title: "Traditional Saudi Hospitality: The Art of Welcoming Guests",
    excerpt: "Understanding the deep cultural significance of hospitality in Saudi society and its linguistic expressions.",
    content: `<p>Saudi hospitality, known as "karam" in Arabic, represents one of the most cherished and deeply rooted traditions in Saudi culture. This ancient practice goes far beyond simple courtesy—it embodies the very essence of Saudi social values and cultural identity.</p>

<h2>The Cultural Foundation</h2>
<p>The tradition of hospitality in Saudi Arabia stems from Bedouin customs that developed over centuries in the harsh desert environment. In a land where survival often depended on the kindness of strangers, offering shelter, food, and protection to travelers became not just a social norm, but a sacred duty.</p>

<h2>Linguistic Expressions of Hospitality</h2>
<p>The Arabic language contains numerous expressions that reflect the importance of hospitality:</p>

<ul>
<li><strong>"Ahlan wa sahlan"</strong> - Welcome, you are among family</li>
<li><strong>"Baytik baytna"</strong> - Your house is our house</li>
<li><strong>"Tfaddal"</strong> - Please, be our honored guest</li>
</ul>

<p>These phrases are not mere pleasantries but carry deep cultural meaning and genuine invitation to share in the warmth of Saudi homes.</p>`,
    category: 'Culture',
    status: 'published',
    featured_image: '/saudi-coffee-ceremony.png',
    slug: 'saudi-hospitality-traditions',
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
    read_time: '6 min read'
  },
  {
    id: '3',
    title: "Najdi Dialect: The Heart of Saudi Linguistic Identity",
    excerpt: "A deep dive into the Najdi dialect, its unique characteristics, and its influence on modern Saudi Arabic.",
    content: `<p>The Najdi dialect stands as the linguistic heart of Saudi Arabia, representing not just a regional variation of Arabic, but the very foundation of Saudi national identity. Spoken primarily in the central region of Saudi Arabia, including the capital Riyadh, Najdi Arabic has evolved to become the de facto standard for Saudi speech.</p>

<h2>Geographic and Historical Context</h2>
<p>The Najd region, literally meaning "highland" in Arabic, encompasses the central plateau of the Arabian Peninsula. This area has been the political and cultural center of Saudi Arabia since the establishment of the modern kingdom, making its dialect particularly influential.</p>

<h2>Distinctive Features</h2>
<p>Najdi Arabic is characterized by several unique linguistic features:</p>

<ul>
<li><strong>Pronunciation:</strong> The distinctive pronunciation of certain consonants, particularly the "qaf" sound</li>
<li><strong>Vocabulary:</strong> Rich terminology related to desert life, tribal customs, and traditional occupations</li>
<li><strong>Grammar:</strong> Specific grammatical constructions that differ from other Arabic dialects</li>
</ul>`,
    category: 'Language',
    status: 'draft',
    featured_image: '/placeholder.svg?height=400&width=600&text=Najdi+Dialect',
    slug: 'najdi-dialect-exploration',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    read_time: '7 min read'
  },
  {
    id: '4',
    title: "The Significance of Poetry in Saudi Culture",
    excerpt: "From ancient Nabati poetry to contemporary expressions, discover how poetry shapes Saudi cultural identity.",
    content: `<p>Poetry holds a special place in Saudi culture, serving as both an artistic expression and a vehicle for preserving cultural heritage. From the ancient Nabati poetry of the Bedouins to contemporary verse, poetry continues to shape and reflect Saudi identity.</p>

<h2>Nabati Poetry Tradition</h2>
<p>Nabati poetry, written in the vernacular Arabic of the Arabian Peninsula, represents one of the most authentic forms of Saudi cultural expression. This oral tradition has been passed down through generations, preserving stories, wisdom, and cultural values.</p>

<h2>Modern Poetry Movement</h2>
<p>Contemporary Saudi poets continue to draw inspiration from traditional forms while addressing modern themes and experiences. This evolution demonstrates the dynamic nature of Saudi cultural expression.</p>`,
    category: 'Culture',
    status: 'published',
    featured_image: '/arabic-calligraphy-poetry.png',
    slug: 'saudi-poetry-tradition',
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
    read_time: '5 min read'
  }
]
