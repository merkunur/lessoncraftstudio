export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-primary to-primary-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-10 w-80 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/15 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Category Bar Skeleton */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-full bg-gray-200 animate-pulse"
                style={{ width: `${80 + i * 20}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="h-4 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gray-200 animate-pulse" style={{ height: '200px' }} />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded mb-1 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-blue-100 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
