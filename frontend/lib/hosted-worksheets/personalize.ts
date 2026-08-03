/**
 * Hosted-worksheet HTML personalization — PURE string transforms, no imports.
 *
 * WHY THIS FILE HAS NO DEPENDENCIES. `core.ts` imports Prisma, so anything
 * living there can only be exercised by booting the app. These transforms are
 * the part that actually needs adversarial testing against real 224KB deck
 * bytes, so they live where a plain `tsc` + `node` gate can reach them.
 * `core.ts` re-exports them and owns the one lookup that needs a SoT
 * (locale -> og:locale), passing the resolved value in.
 *
 * WHAT IT FIXES. `catalog-export.js` emits `__CANONICAL_URL__` and ~13 sibling
 * tokens that ONLY `scripts/publish-cli/substitute.js` resolves. The catalog
 * path runs it; the Save-Interactive-Worksheet path never has, so every saved
 * sheet served at /play/w/<linkId> shipped raw tokens — in the browser tab, in
 * screen-reader alt/aria text, in link unfurls, and in the share panel's
 * clipboard. Measured 34 leaks across 14 tokens on a live sheet.
 */

/**
 * Any leftover `__SCREAMING_TOKEN__`. The residue gate keys on this.
 *
 * ⚠ TWO regexes, deliberately. A `/g` regex carries `lastIndex` ACROSS calls,
 * so `RE.test(x)` inside a loop alternates true/false and silently passes half
 * the inputs. Anything that TESTS uses the non-global twin.
 */
const PLACEHOLDER_RE = /__[A-Z][A-Z0-9_]{2,}__/g;
const PLACEHOLDER_TEST = /__[A-Z][A-Z0-9_]{2,}__/;

/** Every `__TOKEN__` still present, deduped — [] means clean. */
export function findPlaceholderResidue(html: string): string[] {
  return Array.from(new Set(html.match(PLACEHOLDER_RE) || []));
}

/**
 * Rules force-hidden on a hosted sheet. Three groups, three reasons:
 *  - deckend/suggestions  — catalog showreel, publish-only placeholders (1c188e90).
 *  - .lcs-embed-wrap      — the embed snippet exists to earn SEO backlinks to a
 *                           catalog deck page; a noindex private play URL has
 *                           none to earn, and an embed of it becomes the
 *                           "paused" notice if the teacher's plan lapses.
 *  - a.lcs-share-platform — Facebook/WhatsApp/Pinterest/email. The play URL IS
 *                           the capability, and the person on this screen is
 *                           usually the child who just finished.
 *                           ⭐ Copy-link is a <button>, NOT an <a>, so this
 *                           selector removes the social row and KEEPS it.
 */
export const HOSTED_HIDE_CSS =
  '.lcs-deckend-suggestions,.lcs-deckend,.lcs-end-deck{display:none!important}' +
  '.lcs-embed-wrap{display:none!important}' +
  'a.lcs-share-platform{display:none!important}';

const HOSTED_HIDE_STYLE = `<style id="lcs-hosted-hide">${HOSTED_HIDE_CSS}</style>`;

export function stripCatalogChrome(html: string): string {
  let out = html
    // Belt: remove any STATIC suggestions markup.
    .replace(/<section class="lcs-deckend-suggestions"[\s\S]*?<\/section>/gi, '')
    .replace(/<aside class="lcs-end-deck"[\s\S]*?<\/aside>/gi, '')
    .replace(/<aside class="lcs-deckend-suggestions"[\s\S]*?<\/aside>/gi, '');
  // Suspenders: the deck runtime BUILDS the suggestions showreel from the
  // bundle at play-time (it is not static HTML), so a marker-guarded style
  // that force-hides the container is the reliable strip for a hosted sheet.
  //
  // ⚠ UPGRADE, don't skip-if-present. The original probed for the marker and
  // returned early, so a sheet saved before the rule set grew would keep the
  // OLD rules forever — and the backfill over existing sheets would silently
  // no-op. Replacing an existing block keeps this idempotent AND self-updating.
  if (/<style id="lcs-hosted-hide">[\s\S]*?<\/style>/i.test(out)) {
    out = out.replace(/<style id="lcs-hosted-hide">[\s\S]*?<\/style>/i, HOSTED_HIDE_STYLE);
  } else if (/<\/head>/i.test(out)) {
    out = out.replace(/<\/head>/i, HOSTED_HIDE_STYLE + '</head>');
  } else {
    out = HOSTED_HIDE_STYLE + out;
  }
  return out;
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Drop placeholder tokens from a human string without leaving debris.
 * The deck title is `<Type> Worksheet — <Theme> — __LEVEL__ | LessonCraftStudio`,
 * so the token arrives with a leading separator that has to go with it.
 */
export function cleanPlaceholderPhrase(s: string): string {
  return s
    .replace(/\s*[—–|-]\s*__[A-Z][A-Z0-9_]{2,}__/g, '')
    .replace(PLACEHOLDER_RE, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/^[\s—–|-]+|[\s—–|-]+$/g, '')
    .trim();
}

/**
 * Sentence-level clean for the description. The token sits MID-sentence
 * ("... Worksheet (Animals) for __LEVEL__."), so deleting just the token
 * strands a dangling "for .". Drop the whole sentence and keep the rest,
 * which is already serviceable on its own.
 */
export function cleanPlaceholderSentences(s: string): string {
  return s
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence && !PLACEHOLDER_TEST.test(sentence))
    .join(' ')
    .trim();
}

function extractTagText(html: string, re: RegExp): string {
  const m = html.match(re);
  return m && m[1] ? m[1].trim() : '';
}

export interface HostedPersonalization {
  playUrl: string;
  /** The teacher's saved title — FALLBACK only; it is usually auto-generated. */
  title: string;
  /** Already resolved through ogLocaleMap by the caller (core.ts). */
  ogLocale: string;
}

const SEO_REGION_RE =
  /<!-- SEO_INSERTION_POINT_START -->[\s\S]*?<!-- SEO_INSERTION_POINT_END -->/;

/**
 * Fill in what publish-cli would have filled in.
 *
 * The head is REBUILT rather than patched token-by-token: a hosted sheet is
 * noindex/nofollow and private, so canonical, JSON-LD, og:image and hreflang
 * have no purpose there — and we genuinely do not know the grade band and have
 * no OG image, so emitting them would mean inventing values. Honest omission
 * beats a fabricated tag.
 */
export function applyHostedPersonalization(
  html: string,
  { playUrl, title, ogLocale }: HostedPersonalization
): string {
  const region = html.match(SEO_REGION_RE);
  const regionText = region ? region[0] : '';

  // Prefer the deck's OWN title. The stored one is auto-generated
  // ("additionGenerator · 2026-08-03") and makes a worse browser tab.
  const rawTitle = extractTagText(regionText, /<title>([\s\S]*?)<\/title>/i);
  const rawDesc = extractTagText(regionText, /<meta name="description" content="([^"]*)"/i);

  const cleanTitle = cleanPlaceholderPhrase(rawTitle) || `${title} | LessonCraftStudio`;
  const cleanDesc = cleanPlaceholderSentences(cleanPlaceholderPhrase(rawDesc)) || cleanTitle;

  const head = [
    '<!-- SEO_INSERTION_POINT_START -->',
    `<title>${escapeAttr(cleanTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(cleanDesc)}">`,
    // Belt to the route's X-Robots-Tag: teacher content never indexes.
    '<meta name="robots" content="noindex, nofollow">',
    `<meta property="og:title" content="${escapeAttr(cleanTitle)}">`,
    `<meta property="og:description" content="${escapeAttr(cleanDesc)}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:url" content="${escapeAttr(playUrl)}">`,
    `<meta property="og:locale" content="${escapeAttr(ogLocale)}">`,
    '<meta property="og:site_name" content="LessonCraftStudio">',
    '<!-- SEO_INSERTION_POINT_END -->',
  ].join('\n');

  let out = region ? html.replace(SEO_REGION_RE, head) : html;

  // No cross-language siblings exist for a private sheet.
  out = out.replace(/<!-- HREFLANG_INSERTION_POINT -->\s*/g, '');

  // Body tokens. The share/embed scripts hold `var url="__CANONICAL_URL__"`,
  // and the platform hrefs carry it too — encodeURIComponent leaves `_`
  // untouched, which is exactly why it survives as a substitutable token.
  out = out
    .replace(/__CANONICAL_URL__/g, playUrl)
    .replace(/__WORKSHEET_MAIN_ALT__/g, escapeAttr(cleanTitle))
    .replace(/__APP_ARIA_LABEL__/g, escapeAttr(cleanTitle));

  /**
   * Last: DECK_BUNDLE.seoTrace. It is publish-pipeline PROVENANCE — written by
   * catalog-export and read only by publish-cli tooling (audit-deck-html,
   * republish-seo, preband-staged-descriptions), never by the deck runtime — so
   * on a hosted sheet it is inert, but it still carries `"value":"__TOKEN__"`
   * entries that the residue gate rightly refuses.
   *
   * ⚠ Blank the VALUE, do not delete the key. Removing a nested object from a
   * 224KB JSON literal by string surgery risks corrupting the bundle, which
   * would break the whole worksheet — a far worse outcome than an inert empty
   * string. This substitution cannot change the JSON shape: a string stays a
   * string. (The gate asserts DECK_BUNDLE still parses, so this is measured,
   * not hoped.) An empty value is also the honest record: on this path the
   * token genuinely never resolved.
   */
  out = out.replace(/("value":)"__[A-Z][A-Z0-9_]{2,}__"/g, '$1""');

  return out;
}
