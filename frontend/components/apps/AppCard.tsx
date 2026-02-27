import Link from 'next/link';

interface AppCardProps {
  appName: string;
  htmlFile: string;
  detailSlug: string;
  locale: string;
  tryFreeLabel: string;
  detailsLabel: string;
  accentColor: string;
}

export default function AppCard({ appName, htmlFile, detailSlug, locale, tryFreeLabel, detailsLabel, accentColor }: AppCardProps) {
  const tryFreeUrl = `/worksheet-generators/${encodeURIComponent(htmlFile)}?tier=free&locale=${locale}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <h3 className="font-semibold text-gray-900">{appName}</h3>
      </div>
      <div className="flex gap-2">
        <a
          href={tryFreeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}
        >
          {tryFreeLabel}
          <svg className="w-4 h-4 ml-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <Link
          href={`/${locale}/apps/${detailSlug}`}
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          {detailsLabel}
        </Link>
      </div>
    </div>
  );
}
