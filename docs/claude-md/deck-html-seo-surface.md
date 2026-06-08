# §17.8 The deck.html SEO Surface — full spec (relocated from CLAUDE.md)

> Full <head>/<body> spec, slug ASCII-fold rules + example tables, the age-range→educational-level mapping, the 7 Phase-2 invariants, image-SEO signal stack, and per-app emit detail for §17.8. CLAUDE.md keeps the terse contract + pointer. Relocated 2026-06-08 — nothing deleted.

### 17.8 The deck.html SEO surface

Each deck published is a self-contained static HTML at a public URL (§4.4). Google sees each deck.html as its own page. Across 400-600 launch target growing to thousands in 11 language variants, this is a meaningful long-tail SEO surface.

SEO design is locked **before bulk generation begins**. Retroactively adding markup would require regenerating thousands of decks.

Two constraints: **§4.4 cacheability** — deck.html served to all teachers + Googlebot is the same bytes; all SEO baked at publish time; no request-time templating. **§14.3 attribution neutrality** — SEO additions do not modify attribution footer.

**v1 / v2 scope split.** v1 (now): each deck.html carries the SEO surface but no cross-language sibling tracking. `content_family_id` reserved nullable schema field ships day one; stays `null` for every v1 deck; hreflang block empty. v2 (later): "translate this deck" workflow generates siblings sharing `content_family_id`; publish-cli injects hreflang. Reserving schema field now avoids migrating v1 decks once v2 lands.

#### 17.8.1 deck.html `<head>` requirements

1. **`<html lang="...">`** from manifest's `language`.
2. **`<title>`** — `<Exercise type capitalized> Worksheet — <Theme capitalized> — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio`. Example: `Addition Worksheet — Animals — Kindergarten | LessonCraftStudio`. Fallbacks: omit theme segment if none; omit ed-level segment + em-dash if no `age_range`. 50–60 chars; truncate. Localized.
3. **`<meta name="description">`** — `Free interactive <exercise type> worksheet <theme phrase> for __EDUCATIONAL_LEVEL_LOCALIZED__. <Activity instruction sentence>. Print or play online.` 150–160 chars; truncate. Localized.
4. **`<link rel="canonical" href="__CANONICAL_URL__">`** substituted by publish-cli. Pattern: **`https://lessoncraftstudio.com/<locale>/decks/<native-language-slug>/`** — locale-prefixed; `decks` constant English noun; native-language slug deterministic from localized title. Trailing slash; no `.html`. Examples: `/de/decks/addition-tiere-kindergarten/`, `/en/decks/addition-animals-kindergarten/`, `/fi/decks/yhteenlasku-elaimet-esikoulu/`. Internal `deck_id` stays as DB key + manifest key + ZIP filename; not in public URL. Slug generation in §17.8.5.
5. **`<!-- HREFLANG_INSERTION_POINT -->`** at end of `<head>`. publish-cli substitutes: v1 → empty string. v2 → one `<link rel="alternate" hreflang>` per sibling + `hreflang="x-default"` to English (or first published). On new sibling publish, re-injects into all existing siblings.
6. **`<script type="application/ld+json">`** Schema.org `LearningResource`:
   - `@context`, `@type: LearningResource`
   - `name` (title minus suffix; substituted)
   - `description` (same as meta description; substituted)
   - `learningResourceType: Worksheet`
   - `educationalLevel` (English from `__EDUCATIONAL_LEVEL__`: `Preschool`/`Kindergarten`/`Grade 1`/`Grade 2`/`Grade 3`)
   - `teaches` (exercise type's topic slug)
   - `inLanguage`, `isAccessibleForFree: true`
   - `creator: {"@type":"Organization", "name":"LessonCraftStudio", "url":"https://lessoncraftstudio.com"}`
   - `audience: {"@type":"EducationalAudience", "educationalRole":"student"}`
   - `url` (substituted via `__CANONICAL_URL__`)

   Compact JSON; no newlines/comments/trailing whitespace.

#### 17.8.2 deck.html `<body>` requirements

1. **One `<h1>` per deck** with worksheet title. Replace existing `<div>` wrapper.
2. **Instruction sentence wrapped in `<p>`**, not `<div>`. Semantic markup only.
3. **`alt` on every `<img>`** from image library. Alt = vocabulary entry in deck's language. No empty alts — a missing vocab entry is a vocab bug.
4. **Hidden text describing exercise content** via `aria-label` or visually-hidden span. Generated from manifest's `exercises` array. Standard `sr-only` CSS.
5. **End-of-deck internal links** — 3-4 real `<a href>` to topic destination pages, rendered at end-screen. Per §16.5 α-granular axes: `/<locale>/topic/<exercise-type-slug>/` + `/<locale>/topic/<theme-slug>/` (only when theme set) + `/<locale>/topic/<educational-level-slug>/` + `/<locale>/`. Real anchors, not JS-driven buttons. Link text in deck's language. publish-cli substitutes via placeholder pairs in §16.5.

#### 17.8.3 Out of scope (anti-SEO)
No keyword stuffing · no competing for high-volume head terms (long-tail specificity only) · no platform-wide content in each deck.html · no AI-generated marketing copy in decks · no tier-dependent SEO content · no request-time templating.

#### 17.8.4 Changes in `catalogExport()` (shared module §15.2)
`catalogExport()` emits structure without filling values dependent on `metadata.json` or published context: `<title>` with `__EDUCATIONAL_LEVEL_LOCALIZED__`; meta description with same; Schema.org JSON-LD with `__EDUCATIONAL_LEVEL__`, `__EDUCATIONAL_LEVEL_LOCALIZED__`, `__CANONICAL_URL__`; HREFLANG_INSERTION_POINT marker; `__CANONICAL_URL__` in canonical link + JSON-LD url; topic-destination URL placeholders; `aria-label`/`sr-only` per exercise row.

Per-app changes surgical: title wrapper `<div>` → `<h1>`; instruction wrapper `<div>` → `<p>`; add `alt`; add `aria-label`. Apps do NOT populate `educational_level` or canonical URL (publish-cli's job).

**Multi-template-variant pattern (Group B Phase 2 — picture-path).** Per-row pattern generalizes to multiple template keys dispatched on `bundle.mode`. Picture-path: `srPuzzlePicturePathPathway` / `srPuzzlePicturePathClassicMaze` / `srPuzzlePicturePathChoosePathSingle` / `srPuzzlePicturePathChoosePath`. Per-app code in `renderStandaloneHTML()` selects on `bundle.mode` (+ secondary discriminators per §17.8.12). Conditional segments appended after mode-template-fill. Originating: `75d4a27c`.

#### 17.8.5 Changes in `publish-cli`

publish-cli inherits these substitutions on every upload:

1. **Generates native-language slug** from manifest's localized title. Lowercase, hyphen-separated, ASCII-folded (`ä`→`a`, `ñ`→`n`); de-duplicated by appending numeric suffix on collision for same locale. Stored in new **`slug` column on `Deck`** — additive, nullable for pre-existing, required for new, `@@unique([language, slug])`. Migration must land before first publish.

2. **Substitutes `__CANONICAL_URL__`** with `https://lessoncraftstudio.com/<locale>/decks/<slug>/`.

3. **Computes `educational_level` + `educational_level_localized`** from `age_range` via §17.8.6. Stored on merged manifest; substituted into deck.html.

4. **Substitutes `<!-- HREFLANG_INSERTION_POINT -->`** with hreflang block (v2 with siblings) OR empty string (v1).

5. **Substitutes topic-destination URL placeholders** in end-of-deck links per §16.5 α-granular schema, reading `topics-taxonomy.json` (§16.4). Four `__LINK_*__` URL + four `__LINK_TEXT_*__` localized-text.

When v2 sibling published, publish-cli re-injects updated hreflang into all already-published siblings — only operation that touches an already-published deck.html.

**ASCII-fold implementation.** `scripts/publish-cli/slug.js` uses `String.prototype.normalize('NFD').replace(/[̀-ͯ]/g, '')` for combining-mark strip; explicit map for non-decomposable (`ä→a`, `ß→ss`, `æ→ae`, `ø→o`, `å→a`, `ł→l`). Romance-apostrophe v1 hyphenates (`l'addition → l-addition`); v2 strip deferred.

**Empirical examples** (from `134614dc` + `947ad260`):

| Input displayName | Output slug | Notes |
|---|---|---|
| `4. Juli` (de) | `4-juli` | period → hyphen; collapse runs |
| `Süßigkeiten` (de) | `sussigkeiten` | ü→u, ß→ss |
| `Bäume` (de) | `baume` | ä→a |
| `Vögel 2` (de) | `vogel-2` | ö→o; numeric variant preserved |
| `Christmas B&W` (en) | `christmas-b-w` | `&` → hyphen; collapse |
| `Postres y dulces` (es) | `postres-y-dulces` | spaces → hyphens; lowercase |
| `Réveil` (fr) | `reveil` | é → e |
| `Hogar BN` (es, Class 2 fallback) | `hogar-bn` standard OR `household-bw` Option A for `household_bw` only | §16.5.1 |

**Slug-shape canonical for theme-bearing decks** (locked at `785d63f6`). `manifest.theme` non-null → **`<exercise-type>-<exercise-mode>-<theme-axis-key>`** — operation+mechanic+content ordering. Examples: `addition-find-addend-animals` (en), `addition-image-image-4th-of-july` (en), `subtraction-cross-out-valentine-bw` (en). Themeless decks (manifest.theme=null) preserve `<exercise-type>-<exercise-mode>` shape per `if (manifest.theme)` guard.

**Why operation+mechanic+content ordering:** URL-prefix-match aligns with Google search-snippet leading-segment prominence + teacher operation-first search grammar. Mechanic-clustering reads naturally across alphabetic-sort positions. Reads as deck-identity claim. Distinct from intersection-URL axis-ordering (theme→level→type per §16.5.3 navigation grammar); deck-page URLs are leaf-level destinations.

**Slug-derivation gap class.** Slug rules dropping manifest fields propagate SEO degradation. Phase 1 inventory includes slug-pattern preview via `publish-bulk --dry-run` BEFORE `--confirm`. The 443-deck Track C en addition+subtraction wave (2026-05-05) surfaced this when dry-run revealed slugs collapsed to 8 unique patterns because pre-fix slug-derivation read only `exercise_type + exercise_mode`.

**Anti-pattern:** auto-suffix-and-proceed when within-batch slug collisions surface at dry-run. Default to surfacing inspection report per §15.13.

Origin: `785d63f6` (theme-aware slug + single-SoT refactor).

**Default-mode-emits-null contract pattern.** For multi-mode apps (§A.13.4 DERIVED), most-common mode emits null (shorter URL); non-default modes get explicit slug component. Kindergarten-default sudoku slugs as `sudoku-animals` (cleaner) not `sudoku-easy-animals`; non-default `medium`/`hard` become `sudoku-medium-animals`/`sudoku-hard-animals`. Locked taxonomy for 10 multi-mode apps from Commission ε in commit `109a91d4` body (no embedded table; avoids CLAUDE.md drift). Operator-strategic per §1 SEO-first: default = most-common authoring intent + shortest URL.

Origin: `109a91d4` (16 hardcoded-null apps → DERIVED post-`5078f491` code-addition reference).

**Native-language slug derivation** (native-language-slug commission 2026-05-11). publish-cli derives slug components per-locale from `topics-taxonomy.json` rather than raw English-canonical axis-keys. Closes §17.4 native-language-slug doctrine gap latent since publish-cli's first slug derivation; surfaced at first non-EN catalog publish at scale (1018-deck ES math-cluster wave 2026-05-11).

Component resolution:
- `manifest.exercise_type` → `axes.exercise-type.<key>.slug.<manifest.language>`
- `manifest.exercise_mode` → `axes.exercise-mode.<key>.slug.<manifest.language>`
- `manifest.theme` → `axes.theme.<key>.slug.<manifest.language>`
- `manifest.variant_id` → appended bare (NOT localizable)

**Fallback chain (`slug.js localizeAxisKey`):** (1) taxonomy entry missing → WARN, fall back to bare key; (2) entry present but `slug.<locale>` null/missing → WARN, fall back to `slug.en`; (3) `slug.en` missing → fall back to bare axis-key. WARN entries surface locale-coverage gaps per §16.6.1.

**Example (es):** manifest `{exercise_type:'subtraction', exercise_mode:'find-subtrahend', theme:'animals', language:'es', variant_id:'1507'}` → seed `resta buscar-sustraendo animales 1507` → slug `resta-buscar-sustraendo-animales-1507`.

**Backwards compat:** EN decks slug identically pre-amendment because `axes.<axis>.<key>.slug.en === <key>` (taxonomy invariant). No EN retrofit needed.

**Anti-scope:** non-EN already-published retrofit is per-commission scope. The ES wave (1018 decks) retrofit at native-language-slug commission via unpublish-then-republish. Future de/nl/fr/it/pt/sv/da/no/fi waves derive natively at first publish.

Origin: native-language-slug commission 2026-05-11.

#### 17.8.6 The age-range → educational-level mapping

`educational_level` is **deterministically derived** from `metadata.json`'s `age_range` by publish-cli. Apps never compute. Single source of truth.

| `age_range` | `educational_level` (English; Schema.org) | i18n key for localized form |
|---|---|---|
| `3-5` | `Preschool` | `seo.educational_level.preschool` |
| `5-7` | `Kindergarten` | `seo.educational_level.kindergarten` |
| `6-8` | `Grade 1` | `seo.educational_level.grade_1` |
| `7-9` | `Grade 2` | `seo.educational_level.grade_2` |
| `8-10` | `Grade 3` | `seo.educational_level.grade_3` |

English populates Schema.org `educationalLevel`. Localized (via `seo.educational_level.<key>` in next-intl) populates localized `<title>` + meta description. Both stored on `metadata.json` so publish-cli doesn't recompute.

**Per-tier i18n coverage at Phase 6:** Tier 1-2 (en/de/es/nl) operator-authored; Tier 3 (sv/fi/no) authored with operator-best-effort + NSR flag; Tier 4 (da) NSR per Nordic; Tier 4 (fr/it/pt) operator-best-effort without NSR.

**Corpus ceiling note.** 5 axis-keys defined; Pass 1-6 exercised 4-of-5 across 29 apps: preschool 4 / kindergarten 19 / grade-1 5 / grade-2 1 / grade-3 0. grade-3 (8-10) defined-but-unused at K-3 natural ceiling. Stays at 5 keys for forward compat.

#### 17.8.7 v1 vs v2 scope: cross-language sibling tracking

Hreflang only matters when real cross-language siblings exist. Real siblings exist when operator explicitly translates a deck OR when retroactive tuple-matching identifies concept-level siblings across locales.

**v1 (historical):** `content_family_id` nullable column on `Deck`. Always `null` for every v1 deck. publish-cli substituted `<!-- HREFLANG_INSERTION_POINT -->` with empty string.

**v2 (SHIPPED 2026-05-19 SEO-100pct commission):**
- **Retroactive tuple-matching:** `scripts/publish-cli/populate-and-inject-hreflang.js` groups published decks by 5-tuple (exercise_type, exercise_mode, theme, age_range, variant_id). Multi-locale groups (≥2 distinct languages) get a fresh `content_family_id` (cf-prefixed cuid); each member's deck.html is injected with a `<!-- HREFLANG_BLOCK_START -->...<!-- HREFLANG_BLOCK_END -->` block carrying one `<link rel="alternate" hreflang="<lang>">` per sibling + an `x-default` (preferring en).
- **Forward-path emission:** `scripts/publish-cli/substitute.js` accepts `opts.siblings = [{language, slug}, ...]` — when non-empty, emits the same shape at `HREFLANG_INSERTION_POINT` for new publishes. Callers (publish.js single-deck + bulk.js batch) must look up siblings via DB before invoking substitute when `manifest.content_family_id` is set; warning emitted when content_family_id is set but siblings absent.
- **Empirical state (2026-05-19):** 77 decks across 29 cross-locale sibling groups carry content_family_id + hreflang alternates. 9114 single-locale decks correctly have content_family_id=null + no hreflang block.

**Translate-this-deck UI:** deferred to follow-on commission. The substrate (hreflang emission + content_family_id population) is in place; the admin workflow tooling for explicit translation is operator-facing and doesn't affect SEO of existing decks.

#### 17.8.8 What this section does NOT change
Attribution per §14.3 (tier-neutral). Tier model per §7. Cache per §4.4. Pricing per §7. Apps that export per §14.9. Catalog-export ZIP per §15.2; manifest gains one field on generation.json + two on metadata.json per §15.1. URL pattern for `/<locale>/topic/<slug>/` per §16.5.

#### 17.8.9 Answer-bearing-field hygiene
Bundle fields containing puzzle answers comment-marked at construction: `// ANSWER-BEARING — sr-only template MUST NOT echo this`. Concrete: sudoku `holes[].correctImageIndex`; picture-path `solutionPath` + `legend.items[].correctCount`; cryptogram `slots[].cipherLetter` AND `slots[].expected` (naming misleading; both hold plaintext); subtraction + Brief A 5A apps `slot.expected`.

#### 17.8.10 Row+col 1-indexed indexing convention for sr-only
Bundle 0-indexed; per-app code converts to 1-indexed at template-fill: `var startRow1 = (bundle.startCell.r != null) ? (bundle.startCell.r + 1) : '';`. First surfacing: picture-path Phase 2 `75d4a27c`.

#### 17.8.11 Defensive-skip discipline for sr-only emission
When bundle invariants violated at sr-only emission, emission is **skipped entirely** — do NOT render degraded variant. Invariants per app: sudoku skips if `uniqueImageKeys`/`gridDims`/`holes` missing; cryptogram skips if `cipherMap` missing OR `legendSlots` empty; picture-path skips if `mode` unrecognized OR `gridDims`/`startCell`/`endCell` missing OR mode-specific image-field contracts violated OR choose-path with null/0/non-numeric `endpointCount`. Originating: sudoku `37cbec62`, cryptogram `9c9b1b55`, picture-path `75d4a27c`.

#### 17.8.12 Mode-conditional dispatch with sub-variants
Extension of §17.8.4. Dispatch order: (1) mode primary → one of N templates; (2) secondary scalar branching within mode (picture-path `endpointCount === 1` → ChoosePathSingle; `>= 2` → ChoosePath); (3) conditional segment presence (collectibles when `legend.items[]` non-empty). First surfacing: picture-path Phase 2 `75d4a27c`; Phase 1 reopen `a3697abe` added `endpointCount` bundle field.

#### 17.8.13 List-joiner convention (promote at 4th-consumer threshold)
`Intl.ListFormat` directly with defensive fallback (`try { Intl.ListFormat(srLang, {style:'long',type:'conjunction'}) } catch { hardcoded English Oxford-comma }`). Three call sites: sudoku, cryptogram, picture-path. Promote to `LCSCatalogExport.formatList(items, locale)` at 4th consumer. Originating hotfix: `8f4f9685`.

#### 17.8.14 Sr-only-emission srLang-keyed lookup convention
Sr-only emission sites use **srLang-keyed `translations[srLang][key]` lookup directly**, bypassing per-app `t()`. Three-level fallback: srLang → en → hardcoded EN. `srLang` derived from `bundle.contentLanguage`. Reason: per-app `t()` locale-binding architectural divergence causes mixed-locale sr-only. Convention: at sr-only emission in `renderStandaloneHTML()`, do NOT call `t(key)`. Hotfix `573f69e0`.

#### 17.8.15 In-deck share affordance
Each deck.html ships in-deck share via `LCSCatalogExport.buildShareAffordance` (§14.3a). Placement: top-right of `lcs-bar` after `<button class="lcs-mute">`, 40×40 with `.lcs-share` class. **Web Share API progressive enhancement:** capable → `navigator.share({title, url})` OS-rendered share sheet; no Web Share → self-contained 5-platform overlay in deck's content-locale. v1 platforms locked: Facebook, WhatsApp, Pinterest, email, copy-link + Web Share API. Pre-filled captions empty. No platform SDKs; plain anchor links (`facebook.com/sharer/sharer.php?u=...`, `api.whatsapp.com/send?text=...`, `pinterest.com/pin/create/button/?url=...`, `mailto:?subject=...&body=...`); copy-link invokes `navigator.clipboard.writeText(url)` with 2s `srShareCopied` toast. Defensive-skip per §17.8.11 when `canonicalURL` missing AND `locale + title` cannot construct one. Second consumer of §17.8.14 srLang-keyed lookup (`bbcb444c` initial typo corrected). v1 Option A predicted-slug fallback: `https://lessoncraftstudio.com/<locale>/decks/<slugify(bundle.title)>/` (catalog deck route not yet shipped; deferred items: slug collision rare; apps hardcode English `bundle.title`). Tier-neutral + SEO-neutral; same bytes; immutable per Cloudflare cache key.

#### 17.8.16 Mutable-regions contract via SEO_INSERTION_POINT marker pair
deck.html `<head>` SEO uses paired `<!-- SEO_INSERTION_POINT_START -->` + `<!-- SEO_INSERTION_POINT_END -->` defining mutable region for retrofit. **Class A (post-Phase-3a.2):** markers present; retrofit replaces between-markers, leaves outside intact. **Class A.1 (post-Phase-3b):** marker pair + `manifest.seo_trace` present; retrofit sources from trace. **Class A.2:** marker pair present; trace absent; retrofit derives from i18n + taxonomy + EN fallback. **Class B (pre-Phase-3a.2):** markers ABSENT; retrofit strips pre-existing SEO elements (title / meta / canonical / og:* / twitter:* / JSON-LD) + injects marker pair + canonical surface + preserves outside. Defensive strip per Phase 4a CP1 fix-2 (`b5c1f3c1`). Atomicity: temp+rename per `republish-seo.js: rewriteDeckHtmlAtomic`; `rename(2)` kernel-atomic. Origin: Phase 4a Checkpoint 1 (`a0ab3cf0` → `b5c1f3c1`).

#### 17.8.17 Phase 2 §1-§7 invariants codified as deck-page SEO doctrine

`[ARC][SEO][DECK-PAGE]` commission's Phase 2 doctrine (`docs/SEO/deck-page-arc-phase-2-doctrine-draft.md`) enumerated 7 deck-page SEO invariants. Each enforced by a predicate at `scripts/publish-cli/seo-reconciliation.js`.

| # | Invariant | Predicate | Class |
|---|---|---|---|
| 1 | Title uniqueness per (language, titleHash) | `reconcileTitleUniqueness` | HALT |
| 2 | Description uniqueness per (language, descriptionHash) | `reconcileDescriptionUniqueness` | HALT |
| 3 | Canonical-URL pattern (www-form + locale + native slug + trailing slash) | `reconcileCanonicalURLPattern` | HALT |
| 4 | OG tag completeness (14 tags: 7 og:* + 7 twitter:*) | `reconcileOGTags` | HALT |
| 5 | Inbound-link minimum N≥3 non-sitemap surfaces | `reconcileInboundLinkSurface` | HALT (post-Phase-5) |
| 6 | Locale-residue absence (path-(b) trace per Phase 3b) | `reconcileLocaleResidue` | HALT |
| 7 | Single-h1 per deck | `reconcileSingleH1` | HALT |

**1 WARN-class retained:** `OG_IMAGE_FALLBACK_USED` (informational; per-deck thumbnail vs site-default fallback).

**Invariant 1 + 2:** enforced at DB via `@@unique([language, titleHash])` + `@@unique([language, descriptionHash])`. Predicate-side check pre-INSERT/UPDATE via `findExistingByTitleHash` + `findExistingByDescriptionHash` callbacks. Forward-flow at 100% post-(θ); backward-flow at 63.3% en + 100% non-en (Phase 4a (ι) close).

**Invariant 3:** www-form per §A.10; locale prefix per §17.4; native slug per §17.4.1 + §17.8.5; trailing slash per §15.7.

**Invariant 4:** 14 tags emitted by `LCSCatalogExport.buildSeoHead` + `build-seo-head.js` Node-CJS port (republish-seo retrofit).

**Invariant 5:** N≥3 non-sitemap surfaces via 8-surface counter at `scripts/publish-cli/count-inbound-surfaces.js`. HALT post-Phase-5 close.

**Invariant 6:** path-(b) origin-tracing via `manifest.seo_trace` (Phase 3b primary); path-(a) lexicon-fallback at `seo-reconciliation-exceptions.json` (deprecated; defensive only).

**Invariant 7:** structural HTML; predicate counts h1 elements post-substitution. Phase 3b sweep moved celebration h1 → h2 across 29 apps.

**Auto-control state at commission close:** all 7 enforced HALT-class on every new publish via `reconcileDeckPageSEO` at `seo-reconciliation.js:778`. Operator does not need to remind CC; gate IS the reminder.

Origin: Phase 2 doctrine (`ac9109c7`).

#### 17.8.19 Image SEO signal stack (multi-signal for Google thumbnails)

Per SEO-thumbnail commission (2026-05-19), every deck page exposes a redundant 5-channel image signal stack so Google can confidently render the thumbnail in search results:

1. **HTML `<head>` meta tags** — emitted by `buildSeoHead` (mirror sources: `scripts/publish-cli/build-seo-head.js` + `REFERENCE TRANSLATIONS/catalog-export.js`):
   - `<meta property="og:image">` + `:width`/`:height`/`:alt`/`:secure_url`/`:type`
   - `<meta name="twitter:image">` + `:image:alt`
   - `<link rel="image_src">`
   - `<meta name="robots" content="max-image-preview:large">` (global at `frontend/app/layout.tsx`)

2. **Schema.org JSON-LD** — `LearningResource` with full `ImageObject` (`url`, `contentUrl`, `width:1200`, `height:630`, `caption`) + separate `thumbnailUrl` field pointing at `thumbnail.png` + `keywords` (comma-joined localized: exercise-type/theme/level + worksheet/interactive/free) + `typicalAgeRange` + `publisher`.

3. **XML sitemap `<image:image>` entries** — emitted by custom routes at `frontend/app/sitemap/0.xml/route.ts` + `1.xml/route.ts`. Two image entries per deck (og-image.png + thumbnail.png) inline with `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`. `image:title` from `Deck.title` JSON; `image:caption` from `Deck.description`. **Next.js 14.2.18's `MetadataRoute.Sitemap` does NOT support image entries** — hence the custom routes; sitemap.ts's `generateSitemaps()` returns `[{id:2},{id:3}]` only to cede `/sitemap/0.xml` + `/sitemap/1.xml` to the static custom routes.

4. **Embedded XMP packet in og-image.png** — `scripts/publish-cli/og-image-xmp.js: buildXmpPacket` builds dc:title + dc:description + dc:creator + dc:rights + dc:subject (Bag) + xmpRights:Marked. Embedded via Sharp's `withXmp(string)` (Sharp 0.34.5 API; accepts string only, not Buffer). Adds ~1KB per og-image.

5. **Visual og-image two-column composite** — `scripts/publish-cli/og-image.js: derive(thumbnailBuffer, opts)` extended with `opts.title`/`themeName`/`levelName`/`locale`/`xmpPacket`. Left column 487×630 = scaled thumbnail (fit:cover); right column 713×630 = cream `#FEFAF3` + deck title (DejaVu Sans Bold 48px, wrapped to 3 lines max) + theme/level subhead (28px brand-blue) + LessonCraftStudio wordmark (28px). SVG-text rendered via `scripts/publish-cli/og-image-text.js: buildRightColumnSvg` (librsvg-compatible; manual char-width word-wrap since librsvg lacks `<foreignObject>` support).

**Retrofit script:** `scripts/publish-cli/regenerate-og-images.js` walks all decks under `--locales`, reads thumbnail.png + manifest + post-republish-seo deck.html, derives og-image with two-column + XMP, writes atomically. ~100ms/deck on Hetzner; 9296 decks regenerated in 15min at SEO-thumbnail commission close.

**Forward path:** new publishes via originating apps' `LCSCatalogExport.export()` use the same buildSeoHead emission; og-image generation at the operator-side authoring path retains the legacy `deriveLegacy` centered-on-white layout (no title context available at that gen-time). Hetzner publish-cli + retrofit calls take the two-column path. To upgrade operator-side gen, pass title context into `catalog-export.js`'s og-image derive call.

**For future image SEO work:** invoke `regenerate-og-images.js`; do NOT re-author Sharp pipeline. SVG-text rendering depends on system fonts (Hetzner has DejaVu Sans); changing font requires verifying with `fc-list` first.

#### 17.8.18 Canonical hash algorithm for titleHash + descriptionHash

**SHA-1 normalized** is the canonical hash function for `Deck.titleHash` + `Deck.descriptionHash` per §17.8.17 invariants 1+2. Computed via `scripts/publish-cli/seo-reconciliation.js: hashTitleOrDescription(s)`:

```js
function hashTitleOrDescription(s) {
  if (!s) return null;
  var normalized = String(s).trim().toLowerCase().replace(/\s+/g, ' ');
  if (!normalized) return null;
  return crypto.createHash('sha1').update(normalized, 'utf8').digest('hex');
}
```

Length 40 hex. Normalization (trim + lowercase + whitespace collapse) makes hash robust to cosmetic differences — `"Title — Theme"` and `"  title — theme  "` hash identically.

**Standardized 2026-05-19 SEO-100pct commission.** Prior to standardization, the catalog had a mix:
- `seo-reconciliation.js` predicate wrote SHA-256 raw for new INSERTs
- `republish-seo.js` + all `rewrite-deck-html-*.js` retrofit paths wrote SHA-1 normalized
- After full-catalog republish-seo run, 7847 of 9191 decks were SHA-1; 1124 were SHA-256 stuck due to unique-constraint blocks during retrofit.

Unifying on SHA-1 normalized matches the retrofit-canonical state + adds whitespace robustness. The `sha256()` helper is RETAINED at `seo-reconciliation.js` for backwards-compatibility callers but is NOT used by the uniqueness predicates.

**For future hash-writing code:** import + use `hashTitleOrDescription`. Never call `sha256()` for title/description hash computation. Audit script `audit-deck-html.js` flags any DB hash of length 64 as `TITLE_HASH_ALGORITHM_STALE`.

#### 17.8.20 Printable-PDF indexing policy: deck.html is the single indexable surface

**Locked 2026-05-31 (operator decision); REVIEWED + KEPT 2026-06.** Each deck ships two PDF assets (`<slug>-printable.pdf`, `<slug>-answer-key.pdf`) served by nginx under `/<locale>/decks/<slug>/`. They are **linked from deck.html but MUST NOT be indexed** — they duplicate the interactive deck page's content as thin standalone documents, and Google was indexing them in parallel (operator saw `…/decks/<slug>/<slug>-printable.pdf` URLs surface in Search Console). The deck.html page is the sole ranking surface. The noindex policy was re-reviewed and **kept**; an optional **PDF quality pass** (footer brand-anchor backlink + filename + compression) is a candidate future initiative, **not yet commissioned**.

**Mechanism: `X-Robots-Tag: noindex` at the nginx layer (server-side, NOT in git).** A dedicated `location ~ ^/(en|de|…|fi)/decks/([^/]+)/(.+\.pdf)$` block in `/etc/nginx/sites-enabled/lessoncraftstudio` emits `add_header X-Robots-Tag "noindex" always;` and aliases the file. It is inserted **before** the generic deck-asset catch-all (`(.+\.(png|jpg|jpeg|webp|pdf|json|svg))$`) so that `og-image.png` + `thumbnail.png` stay **indexable** (they are load-bearing image-sitemap entries per §17.8.19) — only `.pdf` is de-indexed. `noindex` only (NOT `nofollow`): PDFs stay crawlable so Google sees the header, and follow-default preserves internal link equity from the deck page. **Do NOT use `robots.txt Disallow: *.pdf`** — blocking the crawl would stop Google from ever seeing the noindex, leaving bare URL-only entries in the index. PDFs remain fully downloadable, shareable, and embeddable; they just leave the search index.

**Tooling:** `scripts/publish-cli/patch-nginx-pdf-noindex.py` (idempotent via marker comment; backs up to `/root/nginx-backups/` per §A.14.11; `nginx -t` with auto-rollback; reload). Re-run after any nginx-config rebuild that drops the block. PDFs are **not** in the sitemap and never were (sitemap carries deck-PAGE URLs + `<image:image>` PNG entries only).

**Slug-catalog integrity auditor:** `scripts/publish-cli/audit-slug-fs-db-consistency.js` (read-only) cross-checks every published deck's `slug` against its 5 DB URL columns, the on-disk symlink + asset tree, and the slug re-derived from the on-disk manifest. HARD defects (symlink/asset/PDF-file missing, slug↔htmlUrl mismatch, column-path drift) mean a real 404/wrong-asset; INFO buckets (`NATIVE_SLUG_REDERIVE_DIFF` = benign derivation drift since publish; `PDF_FILENAME_DRIFT` = re-slugged non-EN decks keep the old English-token PDF filename, harmless once noindexed) are awareness-only. 2026-05-31 full-catalog run: **0 hard defects across 19,537 decks** (en/de/es/fr/it/pt full markets + small Nordic/nl). Pairs with `audit-deck-html.js` (deck.html content invariants) + `audit-canonicals-crawl.js` (live self-canonical) per §A.14.9.

**`thanksgivinng` typo — FIXED 2026-05-31** (operator authorized). 73 published decks (en 63, es 4, pt 3, de 2, fr 1) carried a `thanksgivinng` (double-n) typo in the slug + on-disk PDF filenames + manifest theme + DB title/description JSON, baked from an old theme-source typo. `scripts/publish-cli/fix-thanksgivinng-typo.js` applied a uniform `thanksgivinng`→`thanksgiving` token correction across all surfaces (FS dir + PDF-file renames, deck.html, manifest, DB slug + 5 URL columns + title + description, symlink repoint), then `gen-old-slug-redirects.js` + `patch-nginx-deck-redirects.py` regenerated the 301 map so each old typo URL redirects to its corrected slug. Verified: corrected pages 200 + self-canonical, old URLs 301, 0 hard defects on re-audit. 7 **archived** (non-served) es rows retain the typo by design (out of scope — not indexed). The token is unambiguous, so this fixer is the template for any future single-token slug-data typo.

