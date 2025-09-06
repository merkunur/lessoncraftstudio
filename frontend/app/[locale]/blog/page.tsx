import Link from 'next/link';

// Mock blog data - this will be replaced with Strapi data later
const blogPosts = [
  {
    id: 1,
    title: '10 Creative Ways to Use Word Search Generators in Your Classroom',
    excerpt: 'Discover innovative teaching strategies using word search puzzles to enhance vocabulary learning and student engagement.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Teaching Tips',
    image: '/images/blog/word-search-tips.jpg',
    readTime: '5 min read',
    slug: 'creative-word-search-classroom'
  },
  {
    id: 2,
    title: 'Building Math Confidence with Visual Worksheets',
    excerpt: 'Learn how image-based addition worksheets can help young learners develop strong mathematical foundations.',
    author: 'Michael Chen',
    date: '2024-01-12',
    category: 'Math Education',
    image: '/images/blog/math-confidence.jpg',
    readTime: '7 min read',
    slug: 'building-math-confidence'
  },
  {
    id: 3,
    title: 'The Complete Guide to Selling Educational Materials on TPT',
    excerpt: 'Everything you need to know about creating and selling worksheets on Teachers Pay Teachers marketplace.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    category: 'Business',
    image: '/images/blog/tpt-guide.jpg',
    readTime: '10 min read',
    slug: 'selling-on-tpt'
  },
  {
    id: 4,
    title: 'Differentiated Learning with Custom Worksheets',
    excerpt: 'How to create personalized learning materials that cater to different learning styles and abilities.',
    author: 'David Thompson',
    date: '2024-01-08',
    category: 'Special Education',
    image: '/images/blog/differentiated-learning.jpg',
    readTime: '6 min read',
    slug: 'differentiated-learning'
  },
  {
    id: 5,
    title: 'Seasonal Worksheets: Keeping Learning Fun Year-Round',
    excerpt: 'Creative ideas for incorporating seasonal themes into your educational materials throughout the year.',
    author: 'Lisa Park',
    date: '2024-01-05',
    category: 'Teaching Tips',
    image: '/images/blog/seasonal-worksheets.jpg',
    readTime: '4 min read',
    slug: 'seasonal-worksheets'
  },
  {
    id: 6,
    title: 'From Free to Full: When to Upgrade Your LessonCraftStudio Plan',
    excerpt: 'A practical guide to understanding when it\'s time to move from the free tier to a paid subscription.',
    author: 'James Wilson',
    date: '2024-01-03',
    category: 'Platform Tips',
    image: '/images/blog/upgrade-guide.jpg',
    readTime: '5 min read',
    slug: 'when-to-upgrade'
  }
];

const categories = [
  'All Posts',
  'Teaching Tips',
  'Math Education',
  'Language Arts',
  'Business',
  'Special Education',
  'Platform Tips'
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              LessonCraftStudio Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tips, tutorials, and insights for educators creating amazing learning materials
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === 'All Posts'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-6xl opacity-50">📝</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        <span className="text-gray-700">{post.author}</span>
                      </div>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Educational Tips
            </h2>
            <p className="text-gray-600 mb-8">
              Get weekly insights on creating better educational materials and growing your teaching business
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}