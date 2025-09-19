'use client';

import { X } from 'lucide-react';

interface BlogPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  locale: string;
  keywords: string[];
  sampleWorksheets: any[];
}

export default function BlogPreviewModal({
  isOpen,
  onClose,
  title,
  metaTitle,
  metaDescription,
  content,
  category,
  author,
  date,
  readTime,
  locale,
  keywords,
  sampleWorksheets = []
}: BlogPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Blog Post Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto">
            <iframe
              srcDoc={generatePreviewHTML({
                title,
                metaTitle,
                metaDescription,
                content,
                category,
                author,
                date,
                readTime,
                locale,
                keywords,
                sampleWorksheets
              })}
              className="w-full h-full border-0"
              title="Blog Post Preview"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              This is a preview. The actual blog post will include full SEO optimization and styling.
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePreviewHTML(data: any): string {
  const {
    title,
    metaTitle,
    metaDescription,
    content,
    category,
    author,
    date,
    readTime,
    locale,
    keywords = [],
    sampleWorksheets = []
  } = data;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metaTitle || title}</title>
  <meta name="description" content="${metaDescription || title}">
  <meta name="keywords" content="${keywords.join(', ')}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 0;
      text-align: center;
      margin-bottom: 40px;
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 20px;
    }

    .meta {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      opacity: 0.9;
      font-size: 0.95em;
    }

    .meta span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    article {
      padding: 40px 0;
      font-size: 1.1em;
      line-height: 1.8;
    }

    article h2 {
      margin: 30px 0 20px;
      color: #2d3748;
    }

    article h3 {
      margin: 25px 0 15px;
      color: #4a5568;
    }

    article p {
      margin-bottom: 20px;
    }

    article ul, article ol {
      margin: 20px 0;
      padding-left: 30px;
    }

    article li {
      margin-bottom: 10px;
    }

    article img {
      max-width: 100%;
      height: auto;
      margin: 20px 0;
      border-radius: 8px;
    }

    article blockquote {
      border-left: 4px solid #667eea;
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
      color: #555;
    }

    article pre {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
      margin: 20px 0;
    }

    article code {
      background: #f7fafc;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }

    .sample-worksheets {
      background: #f7fafc;
      padding: 40px 0;
      margin: 40px -20px 0;
    }

    .sample-worksheets h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #2d3748;
    }

    .worksheet-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 0 20px;
    }

    .worksheet-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .worksheet-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .worksheet-card h3 {
      margin-bottom: 10px;
      color: #4a5568;
    }

    .worksheet-card p {
      margin-bottom: 15px;
      font-size: 0.9em;
      color: #718096;
    }

    .worksheet-meta {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      font-size: 0.85em;
      color: #a0aec0;
    }

    .download-btn {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 0.9em;
      transition: transform 0.2s;
      text-align: center;
      width: 100%;
    }

    .download-btn:hover {
      transform: translateY(-2px);
    }

    .seo-preview {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin: 40px 0;
    }

    .seo-preview h3 {
      color: #2d3748;
      margin-bottom: 15px;
    }

    .seo-preview .google-result {
      font-family: arial, sans-serif;
    }

    .seo-preview .google-title {
      color: #1a0dab;
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .seo-preview .google-url {
      color: #006621;
      font-size: 14px;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .seo-preview .google-description {
      color: #545454;
      font-size: 14px;
      line-height: 1.58;
    }

    footer {
      background: #2d3748;
      color: white;
      text-align: center;
      padding: 40px 0;
      margin-top: 60px;
    }

    footer a {
      color: #a0aec0;
      text-decoration: none;
    }

    footer a:hover {
      color: white;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2em;
      }

      .meta {
        font-size: 0.9em;
      }

      article {
        font-size: 1em;
      }

      .worksheet-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>${title}</h1>
      <div class="meta">
        <span>📝 ${category}</span>
        <span>👤 ${author || 'LessonCraftStudio Team'}</span>
        <span>📅 ${date || new Date().toLocaleDateString()}</span>
        <span>⏱️ ${readTime || '5 min read'}</span>
      </div>
    </div>
  </header>

  <main class="container">
    ${keywords && keywords.length > 0 ? `
    <div class="seo-preview">
      <h3>Google Search Preview</h3>
      <div class="google-result">
        <div class="google-title">${metaTitle || title}</div>
        <div class="google-url">lessoncraftstudio.com › ${locale} › blog</div>
        <div class="google-description">${metaDescription || title}</div>
      </div>
    </div>
    ` : ''}

    <article>
      ${content || '<p>No content added yet...</p>'}
    </article>

    ${sampleWorksheets && sampleWorksheets.length > 0 ? `
    <section class="sample-worksheets">
      <h2>Download Free Sample Worksheets</h2>
      <div class="worksheet-grid">
        ${sampleWorksheets.map(worksheet => {
          const wsTitle = typeof worksheet.title === 'object' ?
            (worksheet.title[locale] || worksheet.title.en || 'Sample Worksheet') :
            (worksheet.title || 'Sample Worksheet');
          const wsDescription = typeof worksheet.description === 'object' ?
            (worksheet.description[locale] || worksheet.description.en || '') :
            (worksheet.description || '');

          return `
          <div class="worksheet-card">
            <h3>${wsTitle}</h3>
            <p>${wsDescription}</p>
            <div class="worksheet-meta">
              <span class="file-size">${worksheet.fileSize || 'PDF'}</span>
              <span class="file-type">PDF</span>
            </div>
            <div class="download-btn">
              Download Free Sample
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
    ` : ''}
  </main>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
      <p><a href="https://lessoncraftstudio.com">Create Your Own Worksheets</a></p>
    </div>
  </footer>
</body>
</html>`;
}