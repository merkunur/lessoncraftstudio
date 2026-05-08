# Phase 1 recon — deck-end suggestion strip

**Type:** `[FEATURE][CATALOG-VARIETY]` Phase 1 recon (read-only audit; output of Commission B).
**Generated:** 2026-05-08
**Scope:** Completion-flow audit across 29 §14.10 catalog apps + helper-callability verification + theme-thumbnails accessibility check.
**Verdict:** **PROCEED to Phase 2.** No blocking architectural issues. Single-line per-app fan-out is feasible; publish-cli has Prisma access for server-side selectDeckEndSuggestions.

## §1. Per-app completion-flow shape

All 29 apps share a unified completion-flow architecture across runtime families A-F:

- **Completion event trigger:** internal validation check fires `setTimeout(showCelebration, 500)` ~500ms after the kid's final answer is submitted/validated. (e.g., `if (correct === total)` for fill-in apps; `if (res.allCorrect)` for puzzle apps.)
- **Celebration UI (runtime-generated):** `showCelebration()` builds the modal via `celebrationEl.innerHTML = "..."` string concatenation. Modal contains: `<h1 lcs-celebration__title>` + `<div lcs-stars>` + `<p lcs-celebration__sub>` + `<img lcs-mini>` + `<div lcs-celebration__cta>` (Do Another / Print buttons) + `<div lcs-confetti aria-hidden="true">`.
- **Static deck.html source structure:** the `<div id="lcs-celebration">` element exists in deck.html source as an empty container; runtime populates it. The `lcs-end-deck` section ALSO exists at the bottom of deck.html source, statically pre-rendered, containing the existing topic-page links + canonical-URL anchors per Brief A §5.5.
- **Per-app variations:** none. All 29 apps follow identical celebration structure, CSS class naming, completion triggers. Variations exist only in score computation logic (variable vs fixed star awards) — internal to score logic, not UI shell.

**Implication for strip integration:** the strip cannot live inside the runtime-generated `<div id="lcs-celebration">` modal because that violates the spec's "Server-rendered HTML (NOT JavaScript-only); Google crawler must see the links without JS execution" requirement. Strip must be PRE-RENDERED in deck.html source HTML at generation time, hidden by default, un-hidden by `showCelebration()` at completion.

## §2. Recommended strip insertion architecture

**Static section in deck.html source, hidden by default, unhidden at celebration:**

```html
<!-- emitted at deck.html generation time by LCSCatalogExport.buildDeckEndSuggestionsPlaceholder() -->
<section class="lcs-deckend-suggestions" hidden aria-label="...">
  <h2>__DECK_END_SUGGESTIONS_HEADER__</h2>
  <ul>
    <li><a href="__SUGGESTION_1_URL__"><img src="__SUGGESTION_1_THUMB__" alt=""><span>__SUGGESTION_1_TITLE__</span></a></li>
    <li><a href="__SUGGESTION_2_URL__"><img src="__SUGGESTION_2_THUMB__" alt=""><span>__SUGGESTION_2_TITLE__</span></a></li>
    <!-- ... 4 more slots ... -->
  </ul>
</section>
```

**Runtime un-hide:** `showCelebration()` adds one line to remove `hidden` attribute on the `lcs-deckend-suggestions` section. The strip becomes visible co-rendered with the celebration overlay.

**SEO surface:** ✓ — links are in source HTML at deck.html generation time. Google crawler sees the 6 outbound `<a href>` anchors without JS execution.

**Spec compliance:**
- 6 slots ✓
- Image-first tile (img + span title) ✓
- Server-rendered (no JS-only) ✓
- Anchor text = full deck title (NOT generic) ✓
- 44×44px+ touch targets (CSS responsibility; design decision in Phase 3) ✓
- Locale-natural header copy via i18n key ✓

## §3. Helper-callability verification

### `selectBreadthGridDecks(visitorLocale)` location + extension target

- **Location:** `frontend/lib/breadth-grid-selection.ts` (Next.js server-side TypeScript).
- **Architecture:** imports `prisma` from `./prisma`; runs `prisma.deck.findMany` + `prisma.deck.groupBy` queries; returns `Promise<BreadthGridSelection>`.
- **Performance:** per-locale candidate fetch bounded at `CANDIDATES_PER_LOCALE = 20` rows; total 220 rows max + 1 groupBy aggregate. ~30ms wall-time regardless of catalog size.
- **Composition:** 6 visiting-locale + 2 cross-locale + 1 featured = 9 grid thumbnails. Day-of-week rotation for cross-locale variety; sibling-pool + structurally-different-pool 4-family hybrid (Germanic / Nordic / Romance / Finnic).
- **Reuse for `selectDeckEndSuggestions`:** the existing module structure (per-locale candidate fetch + Map-based byLocale + Set-based mechanic-diversity tracking) generalizes cleanly to the 4-strategy reweighting required for deck-end suggestions. Phase 2 extension creates a sibling function `selectDeckEndSuggestions(locale, completedDeckSlug, count = 6)` in the same module OR a new sibling module `frontend/lib/deck-end-suggestions.ts`. Plan agent decides at Phase 2 implementation.

### publish-cli Prisma access

- **Location:** `scripts/publish-cli/db.js` already imports `PrismaClient` from `frontend/node_modules/@prisma/client`.
- **Architecture:** publish-cli runs from Hetzner where `DATABASE_URL` is local (via `frontend/.env`). The Prisma client singleton is shared between Next.js app + publish-cli per Phase 3 v4.
- **Implication:** publish-cli can call `selectDeckEndSuggestions(locale, deckSlug, 6)` server-side, just like Next.js routes. Substitution happens at upload time per the existing pattern in `scripts/publish-cli/substitute.js` (already substitutes 13 placeholders per the file header inventory).

### theme-thumbnails accessibility

- **theme-thumbnails.json:** `frontend/lib/theme-thumbnails.json` (production-resolved per Alt A Arc 2 thumbnail-fix; usable at server-side render time).
- **Deck.thumbnailUrl:** the `Deck` Prisma model has `thumbnailUrl String @map("thumbnail_url")` field (verified at `frontend/prisma/schema.prisma`). Each published deck has a thumbnail URL accessible via the same DB query that returns deck slug + title + language.
- **Implication:** `selectDeckEndSuggestions` queries return `thumbnailUrl` alongside slug + title; publish-cli substitutes `__SUGGESTION_N_THUMB__` placeholders with these URLs at upload time. No separate theme-thumbnails.json lookup needed at substitution time.

## §4. buildEmbedAffordance fan-out call-site shape (canonical pattern reference)

Per Embed Layer 2 commit `e8cec493`, every app's `renderStandaloneHTML()` calls the helper at single line:

```javascript
parts.push('    ' + LCSCatalogExport.buildEmbedAffordance({ locale: lang, title: title }));
```

- Parameters: `locale` (2-letter code from `bundle.contentLanguage`, default 'en') + `title` (from `bundle.title` or app-specific default).
- The helper returns a self-contained HTML+CSS+inline-JS string.
- No `canonicalURL` parameter passed; helper emits `__CANONICAL_URL__` placeholder for publish-cli substitution.

**Phase 3 strip-helper pattern follows the SAME call-site shape:**

```javascript
parts.push('    ' + LCSCatalogExport.buildDeckEndSuggestionsPlaceholder({ locale: lang, title: title }));
```

Single-line per-app fan-out across all 29 apps. The placement decision (where in `parts` array) is uniform: after `buildEndDeckLinks()` call, before the closing `</body>` (i.e., as a sibling of `lcs-end-deck` section, structurally adjacent at deck-bottom).

## §5. Placeholder inventory addition for substitute.js

The existing `scripts/publish-cli/substitute.js` substitutes 13 placeholders per its file-header inventory. Phase 2 extends with 12-13 NEW placeholders for the strip:

```
14.  __DECK_END_SUGGESTIONS_HEADER__  i18n: deckEndSuggestionsHeader.<locale>
15.  __SUGGESTION_1_URL__  selectDeckEndSuggestions[0].canonical-url
16.  __SUGGESTION_1_TITLE__  selectDeckEndSuggestions[0].title.<locale>
17.  __SUGGESTION_1_THUMB__  selectDeckEndSuggestions[0].thumbnailUrl
18.  __SUGGESTION_2_URL__  selectDeckEndSuggestions[1].canonical-url
19.  __SUGGESTION_2_TITLE__  selectDeckEndSuggestions[1].title.<locale>
20.  __SUGGESTION_2_THUMB__  selectDeckEndSuggestions[1].thumbnailUrl
21-26: __SUGGESTION_3_*__ through __SUGGESTION_6_*__ (URL + TITLE + THUMB triplets)
```

= 1 header + 6 × 3 = **19 new placeholders** (assuming THUMB included; can defer THUMB to v2 if image-loading complexity outweighs Phase 3 scope).

**Defer-THUMB option (simpler v1):** drop THUMB placeholders; tile renders title-only without image. Would lose the "image-first tile" spec requirement. NOT recommended for v1; Phase 3 should include THUMB.

## §6. Implementation contract summary

| Layer | Component | Action |
|---|---|---|
| **Apps (29)** | `renderStandaloneHTML()` | Add 1 line: `parts.push('    ' + LCSCatalogExport.buildDeckEndSuggestionsPlaceholder({locale, title}));` after `buildEndDeckLinks()` call. |
| **Apps (29)** | `showCelebration()` | Add 1 line at celebration setup: `var stripEl = document.querySelector('.lcs-deckend-suggestions'); if (stripEl) stripEl.hidden = false;` to un-hide strip when celebration shows. |
| **catalog-export.js** | New helper `buildDeckEndSuggestionsPlaceholder(opts)` | Returns HTML string with 19 placeholders + CSS for the strip + locale-natural header reading from `translations[srLang]['deckEndSuggestionsHeader']`. Same pattern as `buildEmbedAffordance`. |
| **translations-shared.js** | New i18n keys | `deckEndSuggestionsHeader.<locale>` + optional `deckEndSuggestionsAriaLabel.<locale>` × 11 locales. Nordic NSR-flagged. |
| **frontend/lib (Next.js + publish-cli)** | New `selectDeckEndSuggestions(locale, deckSlug, count)` | Sibling to `selectBreadthGridDecks`. Imports prisma. 4-strategy reweighting + deduplication + fallback chain + locale-match enforcement. Returns `Array<{slug, title, language, thumbnailUrl, canonicalURL}>`. Performance O(log N) per-call via pre-computed indices. |
| **publish-cli `substitute.js`** | Extend placeholder inventory | Add 19 new placeholders (header + 6 × 3 URL/TITLE/THUMB). Call `selectDeckEndSuggestions(locale, deckSlug, 6)` once per deck.html being processed; substitute placeholders with results. |

## §7. Identified blockers

**None.**

- ✓ All 29 apps share unified completion-flow shape (no per-app custom integration required).
- ✓ publish-cli has Prisma access (server-side selectDeckEndSuggestions callable at substitute.js stage).
- ✓ theme-thumbnails accessible via existing Deck.thumbnailUrl field; no separate JSON lookup.
- ✓ buildEmbedAffordance pattern (commit `e8cec493`) provides canonical fan-out template for Phase 4 per-app integration.
- ✓ Existing placeholder substitution mechanism (`substitute.js`) extends to 19 new placeholders without architectural change.
- ✓ Existing `lcs-end-deck` static section (Brief A §5.5) precedent confirms server-rendered SEO-friendly deck-bottom content is a shipped pattern.

## §8. Phase 2 entry conditions cleared

Per Commission B spec §"Phase 1 surface gate":
- **Per-app variations affecting integration:** NONE. Single-line fan-out across all 29 apps feasible.
- **Helper-callability:** ✓ verified.
- **theme-thumbnails accessibility:** ✓ verified via Deck.thumbnailUrl + thumbnail-substitution at publish-cli stage.

**Phase 2 commences autonomously per Commission B authorization.** Surface posture: standard (Phase 1 surface gate cleared; surface only at architectural blockers, §14.6 deploy issues, OR Phase 5 verification surfaces).

## §9. Phase 2 implementation plan (handoff to next phase)

1. **Implement `selectDeckEndSuggestions(locale, deckSlug, count = 6)` in `frontend/lib/deck-end-suggestions.ts` (new sibling module to breadth-grid-selection.ts).**
   - 4-strategy reweighting per spec.
   - Pre-computed indices: keyed by (app, theme, locale, mode, level) tuples.
   - Per-call O(log N) on catalog size.
   - Random-strategy slot uses pre-computed per-locale shuffled lists with rotating cursor.
   - Deduplication mandatory across slots; locale-match hard-required; fallback chain on thin substrate.

2. **Add unit tests for selector** in `frontend/scripts/__tests__/deck-end-suggestions.test.ts` or sibling test path.
   - Deduplication correctness.
   - Locale-match enforcement (test cross-locale rejection explicitly).
   - Fallback behavior when substrate is thin.
   - Empty-result handling.

3. **Add helper `buildDeckEndSuggestionsPlaceholder(opts)` to `REFERENCE TRANSLATIONS/catalog-export.js`.**
   - Returns HTML string with 19 placeholders + per-strip CSS.
   - Reads i18n header from `translations[srLang]['deckEndSuggestionsHeader']`.
   - No deck-context awareness (locale + title only); deck-context resolution happens at publish-cli substitution.

4. **Phase 3 scope:** i18n keys × 11 locales (Nordic NSR-flagged) + visual implementation + ThemeStrip mobile-scroll pattern reuse.

5. **Phase 4 scope:** per-app fan-out (29 apps × 2 lines each = 58 small edits) + §14.6 TWO-STEP deploy.

6. **Phase 5 scope:** operator browser-verification across multi-app + multi-locale + multi-device matrix.
