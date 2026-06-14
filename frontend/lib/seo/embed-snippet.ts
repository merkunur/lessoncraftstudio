/**
 * Builds the copy-paste embed snippet surfaced on worksheet LANDING pages.
 *
 * Mirrors the locked deck.html embed shape (REFERENCE TRANSLATIONS/catalog-export.js
 * `buildEmbedAffordance`, 2026-05-05 spec): a responsive `<div>` + `<iframe>` + a
 * `<p>` caption carrying TWO crawlable `<a href>` backlinks OUTSIDE the iframe (an
 * iframe passes no link equity — the visible `<a>` are the SEO surface, CLAUDE.md §1),
 * plus a tiny inline `<script>` that auto-resizes the iframe to the deck's posted
 * content height (the `lcs-embed-resize` postMessage the deck.html emits when embedded).
 *
 * Backlink targets: `brandHref` → the landing's own canonical (concentrates equity on
 * the rankable page) with the brand anchor; `homeHref` → the homepage with a keyword
 * anchor (anchor diversity). All inline-styled, no classes/`<style>`, so the snippet
 * survives strict CMS sanitizers (WordPress, Squarespace, Wix, Medium). The caption is
 * visible-load-bearing, NOT technically enforced — removing it visibly breaks the embed.
 *
 * Pure/server-safe (no DOM). The returned string is shown verbatim in a read-only
 * textarea for the teacher to copy.
 */
export interface EmbedSnippetOpts {
  /** Absolute www URL of the playable deck (the deck.html dir). */
  iframeUrl: string;
  /** Absolute www canonical URL of THIS landing (brand-anchor target). */
  brandHref: string;
  /** Homepage URL (keyword-anchor target). */
  homeHref: string;
  /** Localized caption prefix, e.g. "Worksheet from". */
  prefix: string;
  /** Localized keyword anchor text, e.g. "free printable worksheets". */
  keyword: string;
  /** iframe title (accessibility). */
  title: string;
  /** Stable, collision-safe iframe id, e.g. `lcs-embed-<slug>`. */
  id: string;
  /** Brand anchor text. Default "LessonCraftStudio". */
  brand?: string;
  /** Separator between the two links. Default " — ". */
  sep?: string;
  width?: number;
  height?: number;
}

export function buildEmbedSnippet(o: EmbedSnippetOpts): string {
  const w = o.width || 800;
  const h = o.height || 1000;
  const brand = o.brand || 'LessonCraftStudio';
  const sep = o.sep || ' — ';
  const title = o.title.replace(/"/g, '&quot;');
  return [
    `<div style="max-width: ${w}px; margin: 0 auto;">`,
    `  <iframe id="${o.id}" title="${title}" src="${o.iframeUrl}" frameborder="0" style="display: block; width: 100%; max-width: ${w}px; aspect-ratio: ${w} / ${h}; border: 1px solid #e0d8c5; border-radius: 8px;"></iframe>`,
    `  <p style="font-size: 13px; color: #6b6357; text-align: center; margin: 8px 0 0; font-family: system-ui, sans-serif;">`,
    `    ${o.prefix} <a href="${o.brandHref}" style="color: #6b6357; text-decoration: underline;">${brand}</a>${sep}<a href="${o.homeHref}" style="color: #6b6357; text-decoration: underline;">${o.keyword}</a>`,
    `  </p>`,
    `</div>`,
    `<script>(function(){var f=document.getElementById("${o.id}");if(!f)return;window.addEventListener("message",function(e){if(!e.data||e.data.type!=="lcs-embed-resize")return;if(e.data.url&&f.src&&e.data.url.split("?")[0]!==f.src.split("?")[0])return;f.style.aspectRatio="auto";f.style.height=e.data.height+"px";});})();</script>`,
  ].join('\n');
}
