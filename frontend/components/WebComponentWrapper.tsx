'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface WebComponentWrapperProps {
  appId: string;
  sourceFile?: string;  // Optional sourceFile from Strapi
  userTier: 'free' | 'core' | 'full';
  userId?: string;
  locale?: string;
}

// Define the custom element interface
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lcs-app-wrapper': any;
    }
  }
}

export default function WebComponentWrapper({ 
  appId, 
  sourceFile,
  userTier, 
  userId,
  locale = 'en'
}: WebComponentWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadWebComponent = async () => {
      try {
        // Check if the web component is already defined
        if (!customElements.get('lcs-app-wrapper')) {
          // Define the web component class
          class LCSAppWrapper extends HTMLElement {
            private appFrame: HTMLIFrameElement | null = null;
            private watermarkLayer: HTMLDivElement | null = null;
            
            constructor() {
              super();
              this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
              const appId = this.getAttribute('app-id');
              const userTier = this.getAttribute('user-tier');
              const locale = this.getAttribute('locale') || 'en';
              const sourceFile = this.getAttribute('source-file');
              
              if (!this.shadowRoot) return;

              // Create styles
              const style = document.createElement('style');
              style.textContent = `
                :host {
                  display: block;
                  width: 100%;
                  height: 100vh;
                  position: relative;
                }
                
                .app-container {
                  width: 100%;
                  height: 100%;
                  min-height: calc(100vh - 200px);
                  position: relative;
                  background: white;
                  overflow: hidden;
                }
                
                .app-frame {
                  width: 100%;
                  height: 100%;
                  min-height: calc(100vh - 200px);
                  border: none;
                  display: block;
                }
                
                .watermark-layer {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  pointer-events: none;
                  z-index: 1000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                
                .watermark-text {
                  transform: rotate(-45deg);
                  font-size: 48px;
                  color: rgba(0, 0, 0, 0.1);
                  font-weight: bold;
                  white-space: nowrap;
                  user-select: none;
                }
                
                .loading {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 400px;
                }
                
                .spinner {
                  width: 40px;
                  height: 40px;
                  border: 3px solid #f3f3f3;
                  border-top: 3px solid #1E40AF;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                
                @media print {
                  .watermark-layer {
                    display: flex !important;
                  }
                }
              `;
              
              this.shadowRoot.appendChild(style);
              
              // Create container
              const container = document.createElement('div');
              container.className = 'app-container';
              
              // Create loading state
              const loading = document.createElement('div');
              loading.className = 'loading';
              loading.innerHTML = '<div class="spinner"></div>';
              container.appendChild(loading);
              
              // Determine the HTML filename to use
              let htmlFilename: string;
              
              if (sourceFile) {
                // Use sourceFile from Strapi if provided (already includes .html)
                htmlFilename = sourceFile;
              } else {
                // Fall back to mapping for backwards compatibility
                const appFileMap: { [key: string]: string } = {
                  'word-search': 'wordsearch.html',
                  'image-addition': 'addition.html',
                  'alphabet-train': 'alphabet train.html',
                  'math-worksheet': 'math worksheet.html',
                  'find-and-count': 'find and count.html',
                  'matching-app': 'matching.html',
                  'drawing-lines': 'drawing lines.html',
                  'picture-bingo': 'bingo.html',
                  'big-small-app': 'big small.html',
                  'chart-count-color': 'chart count.html',
                  'code-addition': 'code addition.html',
                  'draw-and-color': 'draw and color.html',
                  'find-objects': 'find objects.html',
                  'grid-match': 'grid match.html',
                  'image-crossword': 'crossword.html',
                  'image-cryptogram': 'cryptogram.html',
                  'math-puzzle': 'math puzzle.html',
                  'missing-pieces': 'missing pieces.html',
                  'more-less': 'more less.html',
                  'odd-one-out': 'odd one out.html',
                  'pattern-train': 'pattern train.html',
                  'pattern-worksheet': 'pattern worksheet.html',
                  'picture-path': 'picture path.html',
                  'picture-sort': 'picture sort.html',
                  'shadow-match': 'shadow match.html',
                  'story-dice': 'story dice.html',
                  'treasure-hunt': 'treasure hunt.html',
                  'word-guess': 'word guess.html',
                  'word-scramble': 'word scramble.html',
                  'writing-app': 'writing.html',
                  'sudoku': 'sudoku.html',
                  'coloring': 'coloring.html',
                  'subtraction': 'subtraction.html',
                  'prepositions': 'prepositions.html'
                };
                
                htmlFilename = (appId && appFileMap[appId]) || (appId ? appId + '.html' : 'unknown.html');
              }
              
              // Create iframe for the legacy app
              const iframe = document.createElement('iframe');
              iframe.className = 'app-frame';
              // Use API route to serve the HTML file (bypasses locale middleware)
              iframe.src = `/api/worksheet/${encodeURIComponent(htmlFilename)}?locale=${locale}&tier=${userTier}`;
              
              iframe.onload = () => {
                loading.remove();
                
                // Add watermark for free tier
                if (userTier === 'free') {
                  this.addWatermark(container);
                }
                
                // Inject communication script
                this.setupCommunication(iframe);
              };
              
              iframe.onerror = () => {
                loading.innerHTML = '<div style="color: red;">Failed to load app</div>';
              };
              
              // Add container to shadow root first
              this.shadowRoot.appendChild(container);
              
              // Then add iframe to container to trigger loading
              container.appendChild(iframe);
              this.appFrame = iframe;
            }
            
            private addWatermark(container: HTMLElement) {
              const watermark = document.createElement('div');
              watermark.className = 'watermark-layer';
              watermark.innerHTML = `
                <div class="watermark-text">
                  FREE VERSION - LessonCraftStudio.com
                </div>
              `;
              container.appendChild(watermark);
              this.watermarkLayer = watermark;
            }
            
            private setupCommunication(iframe: HTMLIFrameElement) {
              // Listen for messages from the iframe
              window.addEventListener('message', (event) => {
                if (event.source !== iframe.contentWindow) return;
                
                // Handle different message types
                switch (event.data.type) {
                  case 'worksheet-generated':
                    this.handleWorksheetGenerated(event.data.payload);
                    break;
                  case 'download-request':
                    this.handleDownloadRequest(event.data.payload);
                    break;
                  case 'print-request':
                    this.handlePrintRequest();
                    break;
                  case 'track-usage':
                    this.trackUsage(event.data.payload);
                    break;
                }
              });
              
              // Send initial configuration to the iframe
              iframe.addEventListener('load', () => {
                iframe.contentWindow?.postMessage({
                  type: 'init',
                  config: {
                    userTier: this.getAttribute('user-tier'),
                    locale: this.getAttribute('locale'),
                    userId: this.getAttribute('user-id'),
                    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
                  }
                }, '*');
              });
            }
            
            private handleWorksheetGenerated(data: any) {
              // Emit custom event
              this.dispatchEvent(new CustomEvent('worksheet-generated', {
                detail: data,
                bubbles: true,
                composed: true
              }));
            }
            
            private handleDownloadRequest(data: any) {
              // Add watermark to download data if free tier
              if (this.getAttribute('user-tier') === 'free') {
                data.watermarked = true;
              }
              
              // Emit download event
              this.dispatchEvent(new CustomEvent('download-request', {
                detail: data,
                bubbles: true,
                composed: true
              }));
            }
            
            private handlePrintRequest() {
              // Ensure watermark is visible for printing
              if (this.watermarkLayer) {
                this.watermarkLayer.style.display = 'flex';
              }
              
              // Trigger print
              if (this.appFrame) {
                this.appFrame.contentWindow?.print();
              }
            }
            
            private async trackUsage(data: any) {
              try {
                const response = await fetch('/api/worksheets/track', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                  },
                  body: JSON.stringify({
                    appId: this.getAttribute('app-id'),
                    ...data
                  })
                });
                
                if (!response.ok) {
                  console.error('Failed to track usage');
                }
              } catch (error) {
                console.error('Error tracking usage:', error);
              }
            }
            
            disconnectedCallback() {
              // Cleanup
              window.removeEventListener('message', () => {});
            }
            
            // Public methods
            public setLocale(locale: string) {
              this.setAttribute('locale', locale);
              if (this.appFrame) {
                this.appFrame.src = this.appFrame.src.replace(/locale=[^&]*/, `locale=${locale}`);
              }
            }
            
            public reload() {
              if (this.appFrame) {
                this.appFrame.src = this.appFrame.src;
              }
            }
          }
          
          // Register the custom element
          customElements.define('lcs-app-wrapper', LCSAppWrapper);
        }
        
        // Create and append the web component
        if (containerRef.current) {
          const element = document.createElement('lcs-app-wrapper');
          element.setAttribute('app-id', appId);
          element.setAttribute('user-tier', userTier);
          element.setAttribute('locale', locale);
          if (sourceFile) {
            element.setAttribute('source-file', sourceFile);
          }
          if (userId) {
            element.setAttribute('user-id', userId);
          }
          
          // Listen for events from the web component
          element.addEventListener('worksheet-generated', (e: any) => {
            console.log('Worksheet generated:', e.detail);
            // Track generation in our system
            trackGeneration(e.detail);
          });
          
          element.addEventListener('download-request', (e: any) => {
            console.log('Download requested:', e.detail);
            // Handle download with watermark if needed
            handleDownload(e.detail);
          });
          
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(element);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load web component:', err);
        setError('Failed to load the app. Please try again.');
        setIsLoading(false);
      }
    };
    
    loadWebComponent();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [appId, sourceFile, userTier, userId, locale]);
  
  const trackGeneration = async (data: any) => {
    try {
      await fetch('http://localhost:3001/api/worksheets/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          appName: appId,
          configuration: data.configuration || {},
          watermarked: userTier === 'free'
        })
      });
    } catch (error) {
      console.error('Failed to track generation:', error);
    }
  };
  
  const handleDownload = (data: any) => {
    // Implementation for handling downloads
    // This could trigger a download with watermark overlay if needed
    console.log('Processing download:', data);
  };
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading App</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/apps">
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              Back to Apps
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full min-h-screen bg-white">
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <div ref={containerRef} className="h-full min-h-screen" />
    </div>
  );
}