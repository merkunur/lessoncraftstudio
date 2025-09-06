import Link from 'next/link';

// This would normally fetch from Strapi
async function getBlogPost(slug: string) {
  // Mock data for now
  return {
    id: 1,
    title: '10 Creative Ways to Use Word Search Generators in Your Classroom',
    content: `
      <p>Word search puzzles are more than just fun activities – they're powerful educational tools that can transform your classroom learning experience. In this comprehensive guide, we'll explore innovative ways to integrate word search generators into your teaching methodology.</p>
      
      <h2>1. Vocabulary Building</h2>
      <p>Use word searches to reinforce new vocabulary. After introducing new terms in science, history, or language arts, create a custom word search that includes these words. Students not only search for the words but also write definitions once they find them.</p>
      
      <h2>2. Pre-Reading Activities</h2>
      <p>Before starting a new chapter or book, create a word search with key terms and character names. This primes students' brains for the content they're about to encounter and builds anticipation for the reading.</p>
      
      <h2>3. Review and Assessment</h2>
      <p>Word searches make excellent review tools before tests. Create puzzles that include important concepts, dates, formulas, or terminology that will appear on the exam. It's a low-stress way for students to review material.</p>
      
      <h2>4. Cross-Curricular Connections</h2>
      <p>Combine subjects by creating word searches that include terms from multiple disciplines. For example, a puzzle about ancient Egypt could include history terms, geography locations, and science concepts about mummification.</p>
      
      <h2>5. Differentiated Learning</h2>
      <p>LessonCraftStudio's word search generator allows you to create puzzles of varying difficulty. Create simpler puzzles for struggling learners and more complex ones for advanced students, all covering the same material.</p>
      
      <h2>6. Early Finisher Activities</h2>
      <p>Keep a collection of subject-related word searches for students who complete their work early. These can be themed around current topics or used for enrichment and extension of learning.</p>
      
      <h2>7. Homework Alternatives</h2>
      <p>Replace traditional worksheets with engaging word search puzzles for homework. Parents often enjoy helping with these, creating positive family engagement with school work.</p>
      
      <h2>8. Language Learning Support</h2>
      <p>For ESL/EFL students, word searches provide visual pattern recognition that helps with spelling and word familiarity. Include both English words and translations for bilingual practice.</p>
      
      <h2>9. Theme-Based Learning</h2>
      <p>Create seasonal or holiday-themed word searches that incorporate academic content. A Halloween puzzle might include math terms like "polygon" shaped like pumpkins.</p>
      
      <h2>10. Student-Created Content</h2>
      <p>Have students create their own word searches using LessonCraftStudio. This reverses the learning process – students must understand the content deeply to create an effective puzzle for their peers.</p>
      
      <h2>Getting Started with LessonCraftStudio</h2>
      <p>Ready to implement these strategies? LessonCraftStudio makes it simple to create professional word searches in minutes. With our free tier, you can start creating immediately, and our paid plans remove watermarks for a polished, professional look.</p>
      
      <p>Visit our <a href="/apps/word-search" class="text-primary hover:underline">Word Search Generator</a> to create your first puzzle today!</p>
    `,
    author: {
      name: 'Sarah Johnson',
      bio: 'Sarah is a veteran educator with 15 years of experience in elementary education. She specializes in creative teaching methods and educational technology integration.',
      avatar: '/images/authors/sarah.jpg'
    },
    date: '2024-01-15',
    category: 'Teaching Tips',
    readTime: '5 min read',
    tags: ['Word Search', 'Teaching Strategies', 'Vocabulary', 'Classroom Activities']
  };
}

// Generate static params for known blog posts
export async function generateStaticParams() {
  // This would normally fetch from Strapi
  return [
    { slug: 'creative-word-search-classroom' },
    { slug: 'building-math-confidence' },
    { slug: 'selling-on-tpt' },
    { slug: 'differentiated-learning' },
    { slug: 'seasonal-worksheets' },
    { slug: 'when-to-upgrade' }
  ];
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  const post = await getBlogPost(params.slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.category}</span>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
                <span>{post.date}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-600">Author</div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <div className="bg-gray-100 rounded-lg p-6 mb-12">
              <h3 className="font-semibold text-gray-900 mb-2">About the Author</h3>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-gray-900 mb-2">{post.author.name}</div>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Create Your Own Worksheets?
              </h2>
              <p className="text-gray-600 mb-6">
                Join thousands of educators using LessonCraftStudio to create engaging educational materials
              </p>
              <Link href="/auth/signup">
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Start Creating Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Related Articles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                  <Link href={`/blog/post-${i}`}>
                    Another Great Article Title Here
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Brief excerpt of the article content goes here...
                </p>
                <Link href={`/blog/post-${i}`} className="text-primary text-sm font-medium hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}