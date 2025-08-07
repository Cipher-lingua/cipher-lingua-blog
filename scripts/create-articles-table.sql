-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Language',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image TEXT,
  slug TEXT UNIQUE NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample articles
INSERT INTO articles (title, excerpt, content, category, status, slug, featured_image) VALUES
(
  'The Evolution of Saudi Arabic: From Bedouin Roots to Modern Expression',
  'Explore how the Saudi dialect has transformed over centuries, maintaining its authentic character while adapting to contemporary life.',
  '<p>The Saudi dialect of Arabic represents one of the most fascinating linguistic journeys in the Arabian Peninsula. From its ancient Bedouin roots to its contemporary urban expressions, Saudi Arabic has maintained its authentic character while continuously adapting to the changing social and cultural landscape.</p>

<h2>Historical Foundations</h2>
<p>The foundation of Saudi Arabic can be traced back to the classical Arabic of the Quran and the various tribal dialects that flourished in the Arabian Peninsula. The Najdi dialect, in particular, has played a central role in shaping what we recognize today as Saudi Arabic.</p>

<p>The nomadic Bedouin tribes contributed significantly to the vocabulary and pronunciation patterns that characterize Saudi speech today. Words related to desert life, camel herding, and tribal social structures remain deeply embedded in the modern Saudi lexicon.</p>

<h2>Regional Variations</h2>
<p>Saudi Arabia''s vast geographical expanse has given rise to distinct regional variations in the Arabic dialect:</p>

<ul>
<li><strong>Najdi Arabic:</strong> Spoken in the central region, including Riyadh, this is often considered the "standard" Saudi dialect</li>
<li><strong>Hejazi Arabic:</strong> Found in the western region, influenced by the diverse pilgrimage population</li>
<li><strong>Eastern Arabic:</strong> Spoken in the Eastern Province, with some Persian Gulf influences</li>
<li><strong>Southern Arabic:</strong> Includes various dialects from the Asir and Jazan regions</li>
</ul>

<h2>Modern Influences</h2>
<p>The discovery of oil and subsequent modernization of Saudi Arabia has introduced new vocabulary and expressions into the language. Technical terms, business language, and international concepts have been seamlessly integrated into Saudi Arabic, often through creative adaptation rather than direct borrowing.</p>',
  'Language',
  'published',
  'evolution-saudi-arabic',
  '/saudi-desert-architecture.png'
),
(
  'Traditional Saudi Hospitality: The Art of Welcoming Guests',
  'Understanding the deep cultural significance of hospitality in Saudi society and its linguistic expressions.',
  '<p>Saudi hospitality, known as "karam" in Arabic, represents one of the most cherished and deeply rooted traditions in Saudi culture. This ancient practice goes far beyond simple courtesy—it embodies the very essence of Saudi social values and cultural identity.</p>

<h2>The Cultural Foundation</h2>
<p>The tradition of hospitality in Saudi Arabia stems from Bedouin customs that developed over centuries in the harsh desert environment. In a land where survival often depended on the kindness of strangers, offering shelter, food, and protection to travelers became not just a social norm, but a sacred duty.</p>

<h2>Linguistic Expressions of Hospitality</h2>
<p>The Arabic language contains numerous expressions that reflect the importance of hospitality:</p>

<ul>
<li><strong>"Ahlan wa sahlan"</strong> - Welcome, you are among family</li>
<li><strong>"Baytik baytna"</strong> - Your house is our house</li>
<li><strong>"Tfaddal"</strong> - Please, be our honored guest</li>
</ul>

<p>These phrases are not mere pleasantries but carry deep cultural meaning and genuine invitation to share in the warmth of Saudi homes.</p>',
  'Culture',
  'published',
  'saudi-hospitality-traditions',
  '/saudi-coffee-ceremony.png'
),
(
  'Najdi Dialect: The Heart of Saudi Linguistic Identity',
  'A deep dive into the Najdi dialect, its unique characteristics, and its influence on modern Saudi Arabic.',
  '<p>The Najdi dialect stands as the linguistic heart of Saudi Arabia, representing not just a regional variation of Arabic, but the very foundation of Saudi national identity. Spoken primarily in the central region of Saudi Arabia, including the capital Riyadh, Najdi Arabic has evolved to become the de facto standard for Saudi speech.</p>

<h2>Geographic and Historical Context</h2>
<p>The Najd region, literally meaning "highland" in Arabic, encompasses the central plateau of the Arabian Peninsula. This area has been the political and cultural center of Saudi Arabia since the establishment of the modern kingdom, making its dialect particularly influential.</p>

<h2>Distinctive Features</h2>
<p>Najdi Arabic is characterized by several unique linguistic features:</p>

<ul>
<li><strong>Pronunciation:</strong> The distinctive pronunciation of certain consonants, particularly the "qaf" sound</li>
<li><strong>Vocabulary:</strong> Rich terminology related to desert life, tribal customs, and traditional occupations</li>
<li><strong>Grammar:</strong> Specific grammatical constructions that differ from other Arabic dialects</li>
</ul>',
  'Language',
  'draft',
  'najdi-dialect-exploration',
  '/placeholder.svg?height=400&width=600&text=Najdi+Dialect'
);
