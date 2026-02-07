'use client';

import Link from 'next/link';

// Blog post metadata interface
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  hasSampleWorksheets?: boolean;
}

interface BlogPageClientProps {
  locale: string;
  translations: {
    hero: {
      title: string;
      subtitle: string;
    };
    categories: {
      all: string;
      worksheetTips: string;
      teachingResources: string;
      educationalActivities: string;
      learningStrategies: string;
      curriculumGuides: string;
      parentResources: string;
      seasonalContent: string;
    };
    loading: {
      message: string;
    };
    empty: {
      title: string;
      description: string;
    };
    postCard: {
      pdfSamples: string;
      readTime: string;
    };
    pagination: {
      previous: string;
      next: string;
      showing: string;
      of: string;
      posts: string;
    };
    newsletter: {
      title: string;
      subtitle: string;
      emailPlaceholder: string;
      subscribe: string;
      noSpam: string;
    };
  };
  // Server-provided pre-paginated data
  initialPosts: BlogPost[];
  initialCategories: Array<{id: string; label: string}>;
  // Server-computed pagination
  initialPage: number;
  totalPages: number;
  totalPosts: number;
}

const POSTS_PER_PAGE = 12;

export default function BlogPageClient({
  locale,
  translations: t,
  initialPosts,
  initialCategories,
  initialPage,
  totalPages,
  totalPosts
}: BlogPageClientProps) {
  const currentPage = initialPage;

  // Build category id-to-label map
  const categoryIdToLabel: Record<string, string> = {};
  initialCategories.forEach(cat => {
    categoryIdToLabel[cat.id] = cat.label;
  });

  const allCategories = [{ id: 'all', label: t.categories.all }, ...initialCategories];

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

  // Calculate display range
  const rangeStart = ((currentPage - 1) * POSTS_PER_PAGE) + 1;
  const rangeEnd = Math.min(currentPage * POSTS_PER_PAGE, totalPosts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categories - Using Links for SEO crawlability */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-4 py-4 overflow-x-auto" aria-label="Blog categories">
            {allCategories.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? `/${locale}/blog` : `/${locale}/blog/category/${category.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category.id === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {initialPosts.length === 0 ? (
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
                {t.empty.title}
              </h3>
              <p className="mt-2 text-gray-500">
                {t.empty.description}
              </p>
            </div>
          ) : (
            <>
              {/* Posts count */}
              <div className="mb-6 text-sm text-gray-600">
                {t.pagination.showing} {rangeStart}-{rangeEnd} {t.pagination.of} {totalPosts} {t.pagination.posts}
              </div>

              {/* Posts grid - matching homepage worksheet sample card styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {initialPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {/* Image - flexible height to show natural aspect ratio without cropping */}
                      <div className="bg-gray-100 overflow-hidden" style={{ minHeight: '200px', maxHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-auto object-contain"
                            style={{ maxHeight: '300px' }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center" style={{ minHeight: '200px' }}>
                            {post.hasSampleWorksheets ? (
                              <div className="text-center">
                                <span className="text-6xl opacity-50">{'\uD83D\uDCC4'}</span>
                                <p className="text-xs text-primary-600 mt-2 font-medium">{t.postCard.pdfSamples}</p>
                              </div>
                            ) : (
                              <span className="text-6xl opacity-50">{'\uD83D\uDCDD'}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content - matching p-4 padding and text sizes from worksheet samples */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-3">
                          {post.excerpt}
                        </p>

                        {/* Bottom badges - matching worksheet sample layout */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {categoryIdToLabel[post.category] || post.category}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination - Using Links for SEO crawlability */}
              {totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
                  {/* Previous link */}
                  {currentPage === 1 ? (
                    <span className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
                      {t.pagination.previous}
                    </span>
                  ) : (
                    <Link
                      href={currentPage === 2 ? `/${locale}/blog` : `/${locale}/blog?page=${currentPage - 1}`}
                      className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors"
                      rel="prev"
                    >
                      {t.pagination.previous}
                    </Link>
                  )}

                  {/* Page numbers */}
                  {currentPage > 3 && (
                    <>
                      <Link
                        href={`/${locale}/blog`}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        1
                      </Link>
                      {currentPage > 4 && <span className="text-gray-400">...</span>}
                    </>
                  )}

                  {getPageNumbers().map((page) => (
                    page === currentPage ? (
                      <span
                        key={page}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white"
                        aria-current="page"
                      >
                        {page}
                      </span>
                    ) : (
                      <Link
                        key={page}
                        href={page === 1 ? `/${locale}/blog` : `/${locale}/blog?page=${page}`}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors"
                      >
                        {page}
                      </Link>
                    )
                  ))}

                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && <span className="text-gray-400">...</span>}
                      <Link
                        href={`/${locale}/blog?page=${totalPages}`}
                        className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      >
                        {totalPages}
                      </Link>
                    </>
                  )}

                  {/* Next link */}
                  {currentPage === totalPages ? (
                    <span className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
                      {t.pagination.next}
                    </span>
                  ) : (
                    <Link
                      href={`/${locale}/blog?page=${currentPage + 1}`}
                      className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors"
                      rel="next"
                    >
                      {t.pagination.next}
                    </Link>
                  )}
                </nav>
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
              {t.newsletter.title}
            </h2>
            <p className="text-gray-600 mb-8">
              {t.newsletter.subtitle}
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.newsletter.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {t.newsletter.subscribe}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              {t.newsletter.noSpam}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
