import { parse, HTMLElement as NHTMLElement } from 'node-html-parser';
import { prisma } from './prisma';

/**
 * Blog-to-blog internal link injection.
 *
 * Scans blog article body HTML for mentions of other blog posts' focus keywords
 * or title fragments, then injects <a> links to those posts.
 * This creates a contextual cross-linking mesh between blog articles.
 *
 * Rules:
 * - Max 3 blog-to-blog links per article
 * - Only match in <p> and <li> text nodes
 * - Skip first <p> (intro paragraph)
 * - One link per target blog post (deduplicated by slug)
 * - Longest keyword matched first
 * - Case-insensitive, Unicode-safe word boundaries
 * - Never link to the current post itself
 */

// Tags whose entire subtree should be skipped
const SKIP_TAGS = new Set([
  'A', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'CODE', 'PRE', 'SCRIPT', 'STYLE', 'BUTTON', 'IMG', 'SVG', 'IFRAME', 'BLOCKQUOTE',
]);

// Tags where text nodes are eligible for linking
const LINKABLE_PARENT_TAGS = new Set(['P', 'LI']);

interface BlogLinkTarget {
  keyword: string;
  url: string;
  slug: string;
}

/**
 * Build a list of keyword -> blog URL targets for a given locale.
 * Sources keywords from each post's focusKeyword and significant title words.
 * Excludes the current post.
 */
async function getBlogLinkTargets(
  locale: string,
  currentSlug: string
): Promise<BlogLinkTarget[]> {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true }
  });

  const targets: BlogLinkTarget[] = [];
  // Common stop words to exclude from title-derived keywords
  const stopWords = new Set([
    // English
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'how', 'what', 'why', 'when', 'where', 'who', 'which', 'that', 'this',
    'your', 'our', 'their', 'its', 'my', 'his', 'her', 'you', 'we', 'they',
    'can', 'will', 'do', 'does', 'did', 'has', 'have', 'had', 'not', 'no',
    'all', 'any', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
    'some', 'such', 'than', 'too', 'very', 'just', 'about', 'into', 'over',
    'after', 'before', 'between', 'through', 'during', 'without', 'again',
    // German
    'der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'aber', 'mit', 'von',
    'f\u00fcr', 'auf', 'ist', 'sind', 'wie', 'was', 'ihr', 'wir', 'sie',
    // French
    'le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'mais', 'avec',
    'pour', 'sur', 'est', 'sont', 'comment', 'qui', 'que', 'dans',
    // Spanish
    'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'del', 'al',
    'con', 'para', 'por', 'como', 'que', 'es', 'son', 'sus',
    // Italian
    'il', 'lo', 'gli', 'una', 'dei', 'del', 'della', 'con', 'per',
    'come', 'che', 'sono',
    // Portuguese
    'os', 'as', 'um', 'uma', 'uns', 'umas', 'do', 'da', 'dos', 'das',
    'com', 'para', 'como', 'que', 's\u00e3o',
    // Dutch
    'het', 'een', 'en', 'of', 'maar', 'met', 'van', 'voor', 'op',
    'hoe', 'wat', 'zijn', 'hun', 'uw',
    // Nordic common
    'och', 'eller', 'men', 'med', 'av', 'og', 'ja', 'tai',
  ]);

  for (const post of posts) {
    const translations = post.translations as Record<string, any>;
    const translation = translations[locale];
    if (!translation || !translation.title) continue;

    const postSlug = translation.slug || post.slug;
    // Never link to self
    if (postSlug === currentSlug) continue;

    const url = `/${locale}/blog/${postSlug}`;

    // Priority 1: focusKeyword (most relevant, usually a multi-word phrase)
    if (translation.focusKeyword && translation.focusKeyword.length >= 4) {
      targets.push({
        keyword: translation.focusKeyword,
        url,
        slug: postSlug,
      });
    }

    // Priority 2: Multi-word title phrases (2-3 word combinations from title)
    const title = (translation.title as string) || '';
    const words = title
      .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep letters, numbers, spaces, hyphens
      .split(/\s+/)
      .filter(w => w.length >= 3 && !stopWords.has(w.toLowerCase()));

    // Generate 2-word phrases from consecutive significant title words
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (phrase.length >= 6) {
        targets.push({ keyword: phrase, url, slug: postSlug });
      }
    }

    // Generate 3-word phrases for longer titles
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (phrase.length >= 10) {
        targets.push({ keyword: phrase, url, slug: postSlug });
      }
    }
  }

  // Sort by keyword length descending (longest match first)
  targets.sort((a, b) => b.keyword.length - a.keyword.length);

  return targets;
}

/**
 * Inject blog-to-blog internal links into blog body HTML.
 *
 * @param html - The blog post body HTML
 * @param locale - Current locale
 * @param currentSlug - Slug of the current post (to exclude self-links)
 * @returns HTML with up to 3 blog-to-blog links injected
 */
export async function injectBlogLinks(
  html: string,
  locale: string,
  currentSlug: string
): Promise<string> {
  const targets = await getBlogLinkTargets(locale, currentSlug);
  if (targets.length === 0) return html;

  const root = parse(html);

  let linksInjected = 0;
  const linkedSlugs = new Set<string>();
  let firstParagraphSeen = false;
  const MAX_BLOG_LINKS = 3;

  function walkNode(node: NHTMLElement): void {
    if (linksInjected >= MAX_BLOG_LINKS) return;

    if (node.tagName && SKIP_TAGS.has(node.tagName)) return;

    if (node.tagName === 'P') {
      if (!firstParagraphSeen) {
        firstParagraphSeen = true;
        return;
      }
    }

    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (linksInjected >= MAX_BLOG_LINKS) return;

      const child = children[i];

      if ((child as NHTMLElement).tagName) {
        walkNode(child as NHTMLElement);
        continue;
      }

      if (!node.tagName || !LINKABLE_PARENT_TAGS.has(node.tagName)) continue;

      const text = child.rawText;
      if (!text || text.trim().length < 10) continue;

      for (const target of targets) {
        if (linkedSlugs.has(target.slug)) continue;
        if (linksInjected >= MAX_BLOG_LINKS) break;

        const escaped = target.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(
          `(?:^|[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D])` +
          `(${escaped})` +
          `(?=[\\s,;.!?()\\[\\]"'\u2018\u2019\u201C\u201D]|$)`,
          'i'
        );

        const match = regex.exec(text);
        if (!match || match[1] === undefined) continue;

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
          const linkTag = `<a href="${target.url}" class="auto-blog-link">${matchedText}</a>`;
          const before = parentHtml.substring(0, parentMatch.index);
          const after = parentHtml.substring(parentMatch.index + parentMatch[0].length);
          node.set_content(before + boundary + linkTag + after);

          linkedSlugs.add(target.slug);
          linksInjected++;
          break;
        }
      }
    }
  }

  walkNode(root as unknown as NHTMLElement);
  return root.toString();
}
