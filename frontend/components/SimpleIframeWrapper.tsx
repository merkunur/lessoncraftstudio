'use client';

import { useEffect, useRef, useState } from 'react';

interface SimpleIframeWrapperProps {
  appId: string;
  userTier: 'free' | 'core' | 'full';
  userId?: string;
  locale?: string;
}

export default function SimpleIframeWrapper({ 
  appId, 
  userTier, 
  userId,
  locale = 'en'
}: SimpleIframeWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeSrc = `http://localhost:3002/${appId}.html?locale=${locale}&tier=${userTier}`;

  useEffect(() => {
    console.log('SimpleIframeWrapper mounting with:', {
      appId,
      userTier,
      locale,
      iframeSrc
    });
  }, [appId, userTier, locale, iframeSrc]);

  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully');
    setIsLoading(false);
    
    // Add watermark for free tier
    if (userTier === 'free' && iframeRef.current) {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          const watermark = iframeDoc.createElement('div');
          watermark.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            color: rgba(0, 0, 0, 0.1);
            z-index: 9999;
            pointer-events: none;
            font-weight: bold;
            white-space: nowrap;
          `;
          watermark.textContent = 'FREE VERSION - LessonCraftStudio.com';
          iframeDoc.body.appendChild(watermark);
        }
      } catch (e) {
        console.error('Could not add watermark (cross-origin):', e);
      }
    }
  };

  const handleIframeError = (e: any) => {
    console.error('Iframe failed to load:', e);
    setError(`Failed to load app from: ${iframeSrc}`);
    setIsLoading(false);
  };

  return (
    <div className="relative w-full" style={{ minHeight: '600px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading {appId}...</p>
            <p className="text-xs text-gray-400 mt-2">{iframeSrc}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center p-8">
            <p className="text-red-600 font-semibold">Error Loading App</p>
            <p className="text-sm text-red-500 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full border-0"
        style={{ minHeight: '600px', display: isLoading ? 'none' : 'block' }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title={`${appId} Worksheet Generator`}
        sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox"
      />
      
      {userTier === 'free' && !isLoading && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div 
            className="text-6xl font-bold opacity-10 transform -rotate-45 select-none"
            style={{ color: 'rgba(0, 0, 0, 0.1)' }}
          >
            FREE VERSION
          </div>
        </div>
      )}
    </div>
  );
}