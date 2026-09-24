# Deck action buttons on the maker-page sample decks

## Context
The 2026-09-20 deck action strip (`[Download PDF] [Answer key] [Make your own]`, SoT `scripts/lib/deck-actions.js`) is baked into every deck.html, but it is **hidden whenever the deck runs inside an iframe** (`body.lcs-embedded #lcs-deck-actions{display:none!important}`; the class is added by the deck's own `if(window.parent!==window)` script). The worksheet-maker landing pages (`/[locale]/tools/<slug>`, "See what you can make") play each sample deck in a modal `<iframe>` (`frontend/components/makers/MakerSampleTile.tsx`), so the strip never shows there. The deck landings solved the same problem by rendering the buttons in the HOST page (hero) — the maker modal never got that.

Fix it host-side, not by un-hiding the strip in the iframe: the baked strip's "Make your own" would navigate the iframe to the very maker page the teacher is already on (a site-inside-a-modal), and changing iframe detection would mean re-touching ~39k deck.html files.

## Approach
Render the three buttons in the sample modal's header row (left side; close stays right), same Direction-A pill styles as the baked strip (teal outline ×2, coral outline for make) and the same icons.

1. **`frontend/lib/seo/maker-samples.ts`**
   - Add `answerKeyUrl: true` to `ROW_SELECT` + `DeckRow`.
   - `MakerSample` gains `pdfHref: string` and `answerKeyHref?: string`, built in `toSample()` as the metered proxy `/api/quota/dl?loc=<row.language>&slug=<row.slug>&kind=pdf|answer` (same href shape as `app/[locale]/worksheets/page.tsx:178` — never a raw file link, which would bypass the download allowance). `answerKeyHref` only when `row.answerKeyUrl != null` (the `canonicalDeckAssets` rule; the proxy 404s otherwise). Uses the deck's OWN locale (EN-fallback samples live under /en/).
2. **`frontend/components/makers/MakerSamples.tsx`** — new props `makeYourOwnHref` + `actionLabels {downloadPdf, answerKey, makeYourOwn, ariaLabel}`; pass them plus `sample.pdfHref/answerKeyHref` to every interactive `MakerSampleTile` (mode, single-mode and cross-language tiles).
3. **`frontend/components/makers/MakerLanding.tsx`** — `getTranslations({locale, namespace:'deckActions'})` (already 11-locale, no new strings) and pass `makeYourOwnHref = launchUrl` (the generator itself — on the maker's own page "make your own" means open the maker, the hero CTA's target) to `<MakerSamples>`.
4. **`frontend/components/makers/MakerSampleTile.tsx`** — optional props `pdfHref`, `answerKeyHref`, `makeHref`, `actionLabels`; the header row becomes `justify-between` with a `<nav aria-label>` of `<a>` pills (PDF/answer: `target="_blank" rel="nofollow"`; make: same tab). Wraps on narrow widths; at 360px the pills shrink to icon+short label via `text-[13px] px-3`. Nothing renders when props are absent (PDF variant unchanged).

No change to deck.html, deck-actions.js, the apps, or messages.

⚠ The header comment records that a modal TITLE collided with the sticky CategoryNav at that row (2026-09-11). Verify at 360/768/1024; if the pills collide too, move the nav to a footer bar under the iframe instead.

## Verification
- `npx tsc --noEmit` in `frontend/`.
- Local dev (`npm run dev`, with the §14.5 sitemap rename + restore): open `/en/tools/<addition slug>` and `/de/…`, `/fi/…`; open a sample → the three buttons appear in the modal header in the page language; PDF + answer key open the proxy (200 PDF), make-your-own opens the generator. Screenshot 360 / 768 / 1024 with chrome-devtools `emulate` and read them myself (collision with CategoryNav, wrap, tap ≥40px).
- A maker whose sample has no answer key → only 2 buttons; an EN-fallback sample on a sparse locale → hrefs carry `loc=en`.
- Commit (explicit paths) → push → `deploy.sh` → live-check one maker page in 3 locales, curl each proxy href for 200.
