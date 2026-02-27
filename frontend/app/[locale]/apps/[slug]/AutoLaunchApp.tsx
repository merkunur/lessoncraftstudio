'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AutoLaunchAppProps {
  appSlug: string;
  sourceFile: string;
  locale: string;
  appName: string;
  appTier?: string;
}

export default function AutoLaunchApp({
  sourceFile,
  locale,
  appName,
}: AutoLaunchAppProps) {
  const [launched, setLaunched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!launched) {
      setLaunched(true);
      const url = `/worksheet-generators/${sourceFile}?tier=free&locale=${locale}`;
      setTimeout(() => {
        window.open(url, '_blank');
        router.push(`/${locale}/apps`);
      }, 300);
    }
  }, [launched, sourceFile, locale, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 text-5xl animate-bounce">
            🚀
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Launching {appName}...
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Opening your worksheet generator in a new window
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
          <span>Please wait...</span>
        </div>
      </div>
    </div>
  );
}
