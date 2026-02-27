'use client';

interface LaunchAppButtonProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier?: string;
  tierColor?: string;
}

export default function LaunchAppButton({
  sourceFile,
  locale,
  appName,
}: LaunchAppButtonProps) {
  const handleLaunchApp = () => {
    const url = `/worksheet-generators/${sourceFile}?tier=free&locale=${locale}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {appName} Worksheet Generator
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Click the button below to launch <strong>{appName}</strong> in a new window.
            Create, customize, and export professional worksheets instantly.
          </p>
          <button
            onClick={handleLaunchApp}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Try Free with Watermark
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Opens in a new window. No signup required.
          </p>
        </div>
      </div>
    </section>
  );
}
