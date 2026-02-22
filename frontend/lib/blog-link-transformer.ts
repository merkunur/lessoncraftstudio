import { parse, HTMLElement as NHTMLElement } from 'node-html-parser';
import { getKeywordLinkTargets, type KeywordLinkTarget } from './internal-linking';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { GRADE_IDS, getGradeSlug, gradeDisplayNames } from '@/config/grade-slugs';

const BASE_URL = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// Pages that need locale prefix
const STATIC_PAGES = [
  'pricing', 'blog', 'contact', 'privacy', 'terms',
  'testimonials', 'apps', 'support', 'research', 'tools',
  'auth/signup', 'auth/signin', 'auth/forgot-password',
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
  'prising': 'pricing',
  'word-scramble': 'apps/word-scramble-worksheets',
  'find-objects': 'apps/find-objects-worksheets',
  'generators': 'apps',
  'signup': 'auth/signup',
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

    // If link has locale prefix, check if path after locale needs rewriting
    if (LOCALES.some(l => href === `/${l}` || href.startsWith(`/${l}/`))) {
      const localeMatch = href.match(/^\/([a-z]{2})\/(.+)$/);
      if (localeMatch) {
        const [, linkLocale, rest] = localeMatch;
        const hashIdx = rest.indexOf('#');
        const queryIdx = rest.indexOf('?');
        let splitAt = -1;
        if (hashIdx >= 0 && queryIdx >= 0) splitAt = Math.min(hashIdx, queryIdx);
        else if (hashIdx >= 0) splitAt = hashIdx;
        else if (queryIdx >= 0) splitAt = queryIdx;
        const cleanPath = splitAt >= 0 ? rest.slice(0, splitAt) : rest;
        const restSuffix = splitAt >= 0 ? rest.slice(splitAt) : '';
        if (LOCALIZED_PATH_MAP[cleanPath]) {
          link.setAttribute('href', `/${linkLocale}/${LOCALIZED_PATH_MAP[cleanPath]}${restSuffix}`);
        }
      }
      continue;
    }

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

/**
 * Localized keywords for worksheets hub pages.
 * Maps locale -> array of keywords that should link to /{locale}/worksheets
 */
const WORKSHEETS_HUB_KEYWORDS: Record<string, string[]> = {
  en: ['printable worksheets', 'worksheet collection'],
  de: ['druckbare Arbeitsbl\u00e4tter', 'Arbeitsblatt-Sammlung'],
  fr: ['fiches imprimables', 'collection de fiches'],
  es: ['fichas imprimibles', 'colecci\u00f3n de fichas'],
  pt: ['atividades imprim\u00edveis', 'cole\u00e7\u00e3o de atividades'],
  it: ['schede stampabili', 'raccolta di schede'],
  nl: ['printbare werkbladen', 'werkbladverzameling'],
  sv: ['utskrivbara arbetsblad', 'arbetsbladsamling'],
  da: ['printbare arbejdsark', 'arbejdsarksamling'],
  no: ['utskrivbare arbeidsark', 'arbeidsarksamling'],
  fi: ['tulostettavat ty\u00f6arkit', 'ty\u00f6arkkikokoelma'],
};

/**
 * Grade keyword aliases for inline link matching.
 * Maps locale -> gradeId -> array of keyword variants.
 */
const GRADE_KEYWORD_ALIASES: Record<string, Record<string, string[]>> = {
  en: {
    preschool: ['preschool worksheets', 'preschool activities'],
    kindergarten: ['kindergarten worksheets', 'kindergarten activities'],
    'first-grade': ['first grade worksheets', '1st grade worksheets'],
    'second-grade': ['second grade worksheets', '2nd grade worksheets'],
    'third-grade': ['third grade worksheets', '3rd grade worksheets'],
  },
};

/**
 * Get landing page link targets for grade hubs and worksheets hub.
 * Returns KeywordLinkTarget[] with synthetic appIds (grade:X, hub:worksheets).
 */
export function getLandingPageLinkTargets(locale: string): KeywordLinkTarget[] {
  const targets: KeywordLinkTarget[] = [];

  // Grade hub targets
  for (const gradeId of GRADE_IDS) {
    const slug = getGradeSlug(gradeId, locale);
    if (!slug) continue;
    const url = `/${locale}/apps/grades/${slug}`;
    const appId = `grade:${gradeId}`;
    const productName = gradeDisplayNames[gradeId]?.[locale] || gradeDisplayNames[gradeId]?.en || gradeId;

    // Use locale-specific aliases if available, otherwise build from display name
    const aliases = GRADE_KEYWORD_ALIASES[locale]?.[gradeId];
    if (aliases) {
      for (const keyword of aliases) {
        targets.push({ keyword, appId, url, productName });
      }
    } else {
      targets.push({ keyword: productName, appId, url, productName });
    }
  }

  // Worksheets hub targets
  const worksheetsKeywords = WORKSHEETS_HUB_KEYWORDS[locale] || WORKSHEETS_HUB_KEYWORDS.en;
  for (const keyword of worksheetsKeywords) {
    targets.push({
      keyword,
      appId: 'hub:worksheets',
      url: `/${locale}/worksheets`,
      productName: 'Worksheets',
    });
  }

  // Sort longest first (prevents partial matches)
  targets.sort((a, b) => b.keyword.length - a.keyword.length);

  return targets;
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
 * - Max 4 product links per post (first pass)
 * - Max 2 landing page links per post (second pass: grade hubs + worksheets hub)
 * - Only match in <p> and <li> text nodes
 * - Skip first <p> (intro paragraph)
 * - One link per target (deduplicated by appId)
 * - Longest keyword matched first
 * - Case-insensitive, Unicode-safe word boundaries
 * - Second pass skips paragraphs that already received a link
 */
export function injectInternalLinks(html: string, locale: string): string {
  // Fetch more candidates than we'll inject (max 4 links) so the matcher
  // has diverse keywords to find. Dedup keeps 1 keyword per product,
  // so 15 candidates gives ~15 different products to match against.
  const targets = getKeywordLinkTargets(locale as SupportedLocale, 15);

  const root = parse(html);

  let linksInjected = 0;
  const linkedAppIds = new Set<string>();
  let firstParagraphSeen = false;
  const linkedParagraphs = new Set<NHTMLElement>(); // Track paragraphs that received a link

  // Recursive DOM walker — injects keyword links into text nodes
  function walkNode(
    node: NHTMLElement,
    walkTargets: KeywordLinkTarget[],
    maxLinks: number,
    skipLinkedParagraphs: boolean,
  ): void {
    if (linksInjected >= maxLinks) return;

    // Skip entire subtrees of certain tags
    if (node.tagName && SKIP_TAGS.has(node.tagName)) return;

    // Track first <p> to skip it (intro paragraph)
    if (node.tagName === 'P') {
      if (!firstParagraphSeen) {
        firstParagraphSeen = true;
        return;
      }
      // Second pass: skip paragraphs that already got a link in first pass
      if (skipLinkedParagraphs && linkedParagraphs.has(node)) return;
    }

    // Process child nodes
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (linksInjected >= maxLinks) return;

      const child = children[i];

      // If it's an element node, recurse
      if ((child as NHTMLElement).tagName) {
        walkNode(child as NHTMLElement, walkTargets, maxLinks, skipLinkedParagraphs);
        continue;
      }

      // It's a text node - check if parent is linkable
      if (!node.tagName || !LINKABLE_PARENT_TAGS.has(node.tagName)) continue;

      const text = child.rawText;
      if (!text || text.trim().length < 10) continue;

      // Try each keyword target (longest first)
      for (const target of walkTargets) {
        if (linkedAppIds.has(target.appId)) continue;
        if (linksInjected >= maxLinks) break;

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
        const parentRegex = new RegExp(
          `(^|[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D])` +
          `(${escaped})` +
          `(?=[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D]|$)`,
          'i'
        );
        const parentMatch = parentRegex.exec(parentHtml);

        if (parentMatch && parentMatch[2] !== undefined) {
          const boundary = parentMatch[1];
          const matchedText = parentMatch[2];
          const linkTag = `<a href="${target.url}" class="auto-internal-link">${matchedText}</a>`;
          const before = parentHtml.substring(0, parentMatch.index);
          const after = parentHtml.substring(parentMatch.index + parentMatch[0].length);
          node.set_content(before + boundary + linkTag + after);

          linkedAppIds.add(target.appId);
          linkedParagraphs.add(node);
          linksInjected++;
          break; // Move to next text node (parent innerHTML was re-parsed)
        }
      }
    }
  }

  // First pass: up to 4 product page links
  if (targets.length > 0) {
    walkNode(root as unknown as NHTMLElement, targets, 4, false);
  }

  // Second pass: up to 2 landing page links (grade hubs + worksheets hub)
  // Reset counter for second pass (separate budget)
  const firstPassCount = linksInjected;
  const landingTargets = getLandingPageLinkTargets(locale);
  if (landingTargets.length > 0) {
    firstParagraphSeen = false; // Reset for second walk
    walkNode(root as unknown as NHTMLElement, landingTargets, firstPassCount + 2, true);
  }

  return root.toString();
}
