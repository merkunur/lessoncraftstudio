import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const tier = searchParams.get('tier') || 'free';
  const filename = decodeURIComponent(params.filename);

  // Security check - prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  // Ensure it's an HTML file
  if (!filename.endsWith('.html')) {
    return NextResponse.json({ error: 'Only HTML files are allowed' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'worksheet-generators', filename);

  try {
    let htmlContent = await fs.promises.readFile(filePath, 'utf-8');

    // Inject configuration script that connects to our Strapi image library
    const configScript = `
    <script>
      // Configuration injected by server
      window.LCS_CONFIG = {
        locale: '${locale}',
        tier: '${tier}',
        apiUrl: '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}',
        strapiUrl: '${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}',
        imageApiUrl: '/api/image-library'
      };

      // Override image loading to use our Strapi-managed library
      (function() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initImageLibrary);
        } else {
          initImageLibrary();
        }

        function initImageLibrary() {
          // Override folder scanning to use our API
          const originalScanFolders = window.scanImageFolders;
          if (typeof originalScanFolders === 'function' || !window.scanImageFolders) {
            window.scanImageFolders = async function() {
              try {
                const response = await fetch(\`/api/themes?locale=\${window.LCS_CONFIG.locale}\`);
                const data = await response.json();

                // Update theme selector if it exists
                const themeSelect = document.getElementById('themeSelect') ||
                                   document.getElementById('theme-select') ||
                                   document.querySelector('select[name="theme"]');

                if (themeSelect) {
                  themeSelect.innerHTML = '';
                  data.themes.forEach(theme => {
                    const option = document.createElement('option');
                    option.value = theme.folderName;
                    option.textContent = theme.name;
                    themeSelect.appendChild(option);
                  });
                }

                return data.themes;
              } catch (error) {
                console.error('Failed to load themes:', error);
                return [];
              }
            };
          }

          // Override image loading
          const originalLoadImages = window.loadImagesFromFolder;
          if (typeof originalLoadImages === 'function' || !window.loadImagesFromFolder) {
            window.loadImagesFromFolder = async function(theme) {
              try {
                const response = await fetch(\`/api/image-library?theme=\${theme}&locale=\${window.LCS_CONFIG.locale}\`);
                const data = await response.json();

                // Transform to format expected by legacy apps
                const images = data.images.map(img => ({
                  src: img.url,
                  url: img.url,
                  name: img.displayName,
                  fileName: img.fileName,
                  alt: img.displayName
                }));

                // Update image grid if function exists
                if (window.displayImages) {
                  window.displayImages(images);
                }

                // Store globally for other functions
                window.currentImages = images;

                return images;
              } catch (error) {
                console.error('Failed to load images:', error);
                return [];
              }
            };
          }

          // Initialize on page load
          if (window.scanImageFolders) {
            window.scanImageFolders();
          }
        }

        // Listen for parent frame messages
        window.addEventListener('message', function(event) {
          if (event.data.type === 'init') {
            Object.assign(window.LCS_CONFIG, event.data.config);
            initImageLibrary();
          }
        });

        // Notify parent that we're ready
        if (window.parent !== window) {
          window.parent.postMessage({ type: 'app-ready' }, '*');
        }
      })();
    </script>
    `;

    // Inject the script before closing body tag
    htmlContent = htmlContent.replace('</body>', `${configScript}</body>`);

    // Add watermark CSS for free tier
    if (tier === 'free') {
      const watermarkCSS = `
      <style>
        @media print {
          body::before {
            content: 'FREE VERSION - LessonCraftStudio.com';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 48px;
            color: rgba(0, 0, 0, 0.1);
            font-weight: bold;
            z-index: 9999;
            pointer-events: none;
          }
        }
      </style>
      `;
      htmlContent = htmlContent.replace('</head>', `${watermarkCSS}</head>`);
    }

    // Return the HTML content with proper headers
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Worksheet generator not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error loading worksheet generator' }, { status: 500 });
  }
}