import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <span className="text-6xl" role="img" aria-label="confused face">
            🤔
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          The page may have been moved or no longer exists.
        </p>

        <div className="space-y-3">
          <Link
            href="/en"
            className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>

          <Link
            href="/en/apps"
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Browse All Apps
          </Link>

          <Link
            href="/en/blog"
            className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Read Our Blog
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Need help?{' '}
          <Link href="/en/contact" className="text-blue-600 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
