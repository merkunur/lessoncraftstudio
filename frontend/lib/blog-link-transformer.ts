import { parse } from 'node-html-parser';

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// Pages that need locale prefix
const STATIC_PAGES = [
  'pricing', 'blog', 'contact', 'privacy', 'terms',
  'testimonials', 'generators', 'apps', 'support', 'research', 'tools',
  'auth/signup', 'auth/signin', 'auth/forgot-password', 'signup',
];

// Localized page names → canonical English path
const LOCALIZED_PATH_MAP: Record<string, string> = {
  'blogg': 'blog',
  'blogi': 'blog',
  'kontakt': 'contact',
  'tuki': 'support',
  'tarifs': 'pricing',
  'priser': 'pricing',
  'preise': 'pricing',
  'precios': 'pricing',
  'prezzi': 'pricing',
  'precos': 'pricing',
  'prijzen': 'pricing',
  'hinnoittelu': 'pricing',
  'rekenpuzzel': 'apps/math-puzzle-worksheets',
  'finn-objekter': 'apps/find-objects-worksheets',
};

export function transformBlogLinks(html: string, locale: string): string {
  const root = parse(html);
  const links = root.querySelectorAll('a[href]');

  for (const link of links) {
    let href = link.getAttribute('href') || '';

    // Skip anchors, mailto, tel, javascript, external non-LCS links
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('javascript:')) continue;

    // Normalize full LCS URLs to relative paths
    if (href.startsWith(BASE_URL)) {
      href = href.slice(BASE_URL.length) || '/';
    }
    // Also handle without www
    if (href.startsWith('https://lessoncraftstudio.com')) {
      href = href.slice('https://lessoncraftstudio.com'.length) || '/';
    }

    // Skip external links
    if (href.startsWith('http://') || href.startsWith('https://')) continue;

    // Skip if already has a locale prefix
    if (LOCALES.some(l => href === `/${l}` || href.startsWith(`/${l}/`))) continue;

    // Must start with / to be an absolute internal path
    if (!href.startsWith('/')) continue;

    // Remove leading slash for matching
    const pathWithoutSlash = href.slice(1);

    // Split path and query/hash
    const hashIdx = pathWithoutSlash.indexOf('#');
    const queryIdx = pathWithoutSlash.indexOf('?');
    let splitIdx = -1;
    if (hashIdx >= 0 && queryIdx >= 0) splitIdx = Math.min(hashIdx, queryIdx);
    else if (hashIdx >= 0) splitIdx = hashIdx;
    else if (queryIdx >= 0) splitIdx = queryIdx;

    const pathPart = splitIdx >= 0 ? pathWithoutSlash.slice(0, splitIdx) : pathWithoutSlash;
    const suffix = splitIdx >= 0 ? pathWithoutSlash.slice(splitIdx) : '';

    // Check localized path names first (e.g., /blogg → /{locale}/blog)
    if (LOCALIZED_PATH_MAP[pathPart]) {
      link.setAttribute('href', `/${locale}/${LOCALIZED_PATH_MAP[pathPart]}${suffix}`);
      continue;
    }

    // Check static pages (e.g., /pricing → /{locale}/pricing)
    if (STATIC_PAGES.some(p => pathPart === p || pathPart.startsWith(p + '/'))) {
      link.setAttribute('href', `/${locale}/${pathWithoutSlash}`);
      continue;
    }
  }

  // Strip <footer> elements (Next.js layout provides its own footer)
  const footers = root.querySelectorAll('footer');
  for (const footer of footers) {
    footer.remove();
  }

  return root.toString();
}
