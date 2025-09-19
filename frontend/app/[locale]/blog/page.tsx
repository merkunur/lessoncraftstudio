'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Blog post metadata interface
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  hasSampleWorksheets?: boolean;
}

// Categories list
const categories = [
  'All Posts',
  'Worksheet Tips',
  'Teaching Resources',
  'Educational Activities',
  'Learning Strategies',
  'Curriculum Guides',
  'Parent Resources',
  'Seasonal Content'
];

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        // Fetch blog metadata from API
        const response = await fetch(`/api/blog/posts?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.posts || []);
          setFilteredPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // If API fails, set empty array (no placeholder content)
        setBlogPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [locale]);

  // Filter by category
  useEffect(() => {
    if (selectedCategory === 'All Posts') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(
        post => post.category === selectedCategory
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory, blogPosts]);

  // Calculate pagination
  useEffect(() => {
    setTotalPages(Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  }, [filteredPosts]);

  // Get posts for current page
  const getPaginatedPosts = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

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
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === selectedCategory
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
          {loading ? (
            // Loading state
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No blog posts available
              </h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new educational content!
              </p>
            </div>
          ) : (
            <>
              {/* Posts count */}
              <div className="mb-6 text-sm text-gray-600">
                Showing {((currentPage - 1) * POSTS_PER_PAGE) + 1}-
                {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
              </div>

              {/* Posts grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPaginatedPosts().map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                          {post.hasSampleWorksheets ? (
                            <div className="text-center">
                              <span className="text-6xl opacity-50">📄</span>
                              <p className="text-xs text-primary-600 mt-2 font-medium">PDF Samples</p>
                            </div>
                          ) : (
                            <span className="text-6xl opacity-50">📝</span>
                          )}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => goToPage(1)}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        1
                      </button>
                      {currentPage > 4 && <span className="text-gray-400">...</span>}
                    </>
                  )}

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
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