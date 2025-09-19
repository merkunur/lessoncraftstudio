import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Supported languages
const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string; slug: string[] } }
) {
  const { locale, slug } = params;

  // Check if locale is supported
  if (!supportedLocales.includes(locale)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Build the file path
  const pagePath = slug.join('/');

  // Try different possible paths
  const possiblePaths = [
    // Direct path with .html
    path.join(process.cwd(), 'public', 'static-pages', locale, `${pagePath}.html`),
    // Path under pages directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'pages', `${pagePath}.html`),
    // Path under blog directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'blog', `${pagePath}.html`),
    // Try without .html extension
    path.join(process.cwd(), 'public', 'static-pages', locale, 'pages', pagePath),
    // Index file in directory
    path.join(process.cwd(), 'public', 'static-pages', locale, pagePath, 'index.html'),
  ];

  // Find the first existing file
  let htmlContent = '';
  let fileFound = false;

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        htmlContent = fs.readFileSync(filePath, 'utf-8');
        fileFound = true;
        break;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  if (!fileFound) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Update paths in HTML to work with our routing
  htmlContent = htmlContent
    // Fix navigation links
    .replace(/href="\/static-pages\//g, 'href="/static/')
    .replace(/href="\/([a-z]{2})\/pages\//g, 'href="/static/$1/')
    .replace(/href="\/([a-z]{2})\/blog\//g, 'href="/static/$1/blog/')
    // Fix language switcher links
    .replace(/href="\/([a-z]{2})\/pages\/homepage\.html"/g, 'href="/static/$1/homepage"')
    // Fix asset paths
    .replace(/src="\/css\//g, 'src="/css/')
    .replace(/src="\/images\//g, 'src="/images/')
    .replace(/src="\/js\//g, 'src="/js/');

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}