import { parse, HTMLElement as NHTMLElement } from 'node-html-parser';
import { getKeywordLinkTargets } from './internal-linking';
import type { SupportedLocale } from '@/config/product-page-slugs';

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

// Tags whose entire subtree should be skipped during internal link injection
const SKIP_TAGS = new Set([
  'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'CODE', 'PRE', 'SCRIPT', 'STYLE', 'BUTTON', 'IMG', 'SVG', 'IFRAME', 'BLOCKQUOTE',
]);

// Tags where text nodes are eligible for linking
const LINKABLE_PARENT_TAGS = new Set(['P', 'LI']);

/**
 * Inject contextual internal links into blog body HTML.
 *
 * Scans paragraph and list-item text for keyword matches and inserts
 * <a> tags pointing to localized product pages. Follows Wikipedia-style
 * first-occurrence linking with conservative limits.
 *
 * Rules:
 * - Max 4 links per post
 * - Only match in <p> and <li> text nodes
 * - Skip first <p> (intro paragraph)
 * - One link per product (deduplicated by appId)
 * - Longest keyword matched first
 * - Case-insensitive, Unicode-safe word boundaries
 */
export function injectInternalLinks(html: string, locale: string): string {
  const targets = getKeywordLinkTargets(locale as SupportedLocale, 4);
  if (targets.length === 0) return html;

  const root = parse(html);

  let linksInjected = 0;
  const linkedAppIds = new Set<string>();
  let firstParagraphSeen = false;

  // Recursive DOM walker
  function walkNode(node: NHTMLElement): void {
    if (linksInjected >= 4) return;

    // Skip entire subtrees of certain tags
    if (node.tagName && SKIP_TAGS.has(node.tagName)) return;

    // Track first <p> to skip it
    if (node.tagName === 'P') {
      if (!firstParagraphSeen) {
        firstParagraphSeen = true;
        return; // Skip first paragraph entirely
      }
    }

    // Process child nodes
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (linksInjected >= 4) return;

      const child = children[i];

      // If it's an element node, recurse
      if ((child as NHTMLElement).tagName) {
        walkNode(child as NHTMLElement);
        continue;
      }

      // It's a text node - check if parent is linkable
      if (!node.tagName || !LINKABLE_PARENT_TAGS.has(node.tagName)) continue;

      const text = child.rawText;
      if (!text || text.trim().length < 10) continue;

      // Try each keyword target (longest first)
      for (const target of targets) {
        if (linkedAppIds.has(target.appId)) continue;
        if (linksInjected >= 4) break;

        // Build Unicode-safe regex with word boundaries
        // Uses punctuation/whitespace boundaries instead of \b (which breaks on accented chars)
        const escaped = target.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(
          `(?:^|[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D])` +
          `(${escaped})` +
          `(?=[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D]|$)`,
          'i'
        );

        const match = regex.exec(text);
        if (!match || match[1] === undefined) continue;

        // Found a match - replace via parent innerHTML manipulation
        // node-html-parser TextNodes can't contain child HTML,
        // so we must modify the parent's innerHTML directly

        // Replace only the first occurrence of the matched text in parent innerHTML
        const parentHtml = node.innerHTML;
        // Use same boundary pattern as the text-node match, capturing boundary + keyword
        const parentRegex = new RegExp(
          `(^|[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D])` +
          `(${escaped})` +
          `(?=[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D]|$)`,
          'i'
        );
        const parentMatch = parentRegex.exec(parentHtml);

        if (parentMatch && parentMatch[2] !== undefined) {
          const boundary = parentMatch[1]; // Preceding whitespace/punctuation (or empty at start)
          const matchedText = parentMatch[2]; // Preserves original case from HTML
          const linkTag = `<a href="${target.url}" class="auto-internal-link">${matchedText}</a>`;
          const before = parentHtml.substring(0, parentMatch.index);
          const after = parentHtml.substring(parentMatch.index + parentMatch[0].length);
          node.set_content(before + boundary + linkTag + after);

          linkedAppIds.add(target.appId);
          linksInjected++;
          break; // Move to next text node (parent innerHTML was re-parsed)
        }
      }
    }
  }

  walkNode(root as unknown as NHTMLElement);
  return root.toString();
}
