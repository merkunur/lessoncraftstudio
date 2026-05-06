# Phase 1 audit — Image library access patterns

**Audit scope:** how the existing 29 apps consume the image library, and what reusable abstractions a Phase 3 material-generator subsystem (flashcards, bingo boards, picture cards, answer keys) should expose. Per CLAUDE.md §10.3, modifying the existing `/api/images` endpoint is forbidden without explicit operator approval — all abstractions must consume the existing endpoint as-is.

## 1. `/api/images` endpoint contract

`frontend/app/api/images/route.ts` — no auth gating; publicly accessible.

**Query parameters:**
- `theme` (optional) — theme `name` or `'all'`; default `'all'`
- `search` (optional) — substring search across image translations in current locale
- `locale` (optional) — ISO 639-1 code; default `'en'`
- `page` (optional) — pagination page; default `1`
- `limit` (optional) — items per page; default `100`

**Response:**
```json
{
  "images": [
    { "path": "/images/animals/cat.png", "url": "/images/animals/cat.png",
      "name": "Katze", "word": "Cat", "theme": "animals" }
  ],
  "pagination": {
    "page": 1, "limit": 100, "total": 1246, "totalPages": 13, "hasMore": true
  }
}
```

**Resolution behavior:**
- DB-first: queries `image_themes` + `image_library_items`; falls back to filesystem scan if DB returns zero
- Search is locale-aware (filters `translations[locale]`)
- Theme name resolves either by exact `image_themes.name` match or filename-to-slug derivation
- Excluded folders hardcoded (borders, backgrounds, templates, icons) so they don't pollute results

## 2. `/api/thumbnail` endpoint contract

`frontend/app/api/thumbnail/route.ts` — Sharp-based resize-to-WebP for sidebar/picker UI.

**Query parameters:**
- `path` (required) — relative `/public` image path (must start with `/images/`; rejects `..`)
- `w` (optional) — width px; default 150; clamp 1-400
- `h` (optional) — height px; clamp 1-400; if omitted, aspect ratio preserved
- `q` (optional) — quality 1-100; default 75

**Pipeline:** read disk → `sharp().resize({width, height, fit: 'inside', withoutEnlargement: true}).webp({quality}).toBuffer()` → respond with WebP bytes.

**Cache:** in-memory map keyed by `{path}_{w}_{h}_{q}`; 24h TTL; LRU eviction at 500 entries (purges oldest 100); HTTP `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`; `X-Cache: HIT|MISS` header.

**Constraint:** thumbnail-grade only — max 400×400. NOT suitable for print-ready material rendering (insufficient resolution).

## 3. Postgres models

```prisma
model ImageTheme {
  id            String   @id @default(cuid())
  name          String   @unique             // e.g., "animals", "food_bw"
  displayNames  Json                         // {en, de, es, ..., fi}
  type          String   @default("images")  // images|borders|backgrounds|train|worksheet
  sortOrder     Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  images        ImageLibraryItem[]

  @@index([name])
  @@index([type])
}

model ImageLibraryItem {
  id            String   @id @default(cuid())
  themeId       String
  filename      String                       // e.g., "cat.png"
  filePath      String                       // e.g., "/images/animals/cat.png"
  fileSize      Int
  mimeType      String                       // image/png | image/svg+xml | image/webp
  width         Int?
  height        Int?
  translations  Json                         // {en: "Cat", de: "Katze", ...}
  sortOrder     Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  theme         ImageTheme @relation(fields: [themeId], references: [id], onDelete: Cascade)

  @@index([themeId])
  @@index([filename])
  @@index([themeId, sortOrder])
}
```

**Scale:** ~1,246 unique vocab keys × asset variants ≈ 2,800+ rows in `image_library_items`. 100 themes (50 color + 50 BW per §16.5.1) plus decoration-tree rows (12 backgrounds + 5 borders) at `type !== 'images'`.

## 4. `IMAGE_VOCABULARY` shape (`REFERENCE TRANSLATIONS/image-vocabulary.js`)

Loaded as global script tag (NOT a module). Direct lookup `IMAGE_VOCABULARY[<key>][<locale>]`.

**Per-entry shape:**
```js
"cat": {
  "en": ["Cat", "Cats"],                    // [singular, plural]
  "de": ["Katze", "Katzen", "f"],            // [singular, plural, gender]
  "fr": ["Chat", "Chats", "m"],
  "es": ["Gato", "Gatos", "m"],
  "pt": ["Gato", "Gatos", "m"],
  "it": ["Gatto", "Gatti", "m"],
  "nl": ["Kat", "Katten", "d"],              // d = de-word
  "sv": ["Katt", "Katter", "n"],             // en/n-genus
  "da": ["Kat", "Katte", "n"],               // n = neuter
  "no": ["Katt", "Katter", "m"],
  "fi": ["Kissa", "Kissat"]                  // no gender
}
```

**Locale set (11):** `en, de, fr, es, pt, it, nl, sv, da, no, fi`

**Gender code legend:**
| Code | Languages | Meaning |
|---|---|---|
| `m` | de, fr, es, pt, it, no | masculine |
| `f` | de, fr, es, pt, it | feminine |
| `n` | de, sv, da | neuter / common |
| `d` | nl | de-word (common gender) |
| `h` | nl | het-word (neuter) |
| `t` | sv | ett-word (neuter) |
| (omitted) | en, fi | no grammatical gender |

**Entry count:** 1,246 unique keys (matches DB row count for `image_library_items`).

**File metadata:** generated `2026-03-02T22:18:31.413Z` from DB; rebuilds against canonical translations.

## 5. `vocabKeyFromImage(img)` helper (`REFERENCE TRANSLATIONS/catalog-export.js`)

**Signature:** `(img: string | { path?, word?, name? }) → string | null`

**Three real-world image source forms it dispatches across:**
1. **Theme path** — `/images/animals/cat.png` → `"cat"` (regex `keyFromPath`)
2. **Server-uploaded** — `/images/animals/cat-1769386104282-2351c8c4.png` → strips `-<13digit>-<hash>` → `"cat"`
3. **Data URL upload** — `data:image/png;base64,...` → falls back to `img.word` or `img.name` (extension + suffix stripped)

**Strip order:** `.\w+$` (extension) → `-\d{13}-[a-z0-9]+$` (server-upload suffix) → `-\d+$` (numeric variant)

**Failure mode:** returns `null` for nullish input or unresolvable shape.

## 6. App consumption pattern (representative samples)

**`addition.html`** (representative of all 29 apps):
- User selects theme dropdown OR enters search keyword → button click triggers `await fetch('/api/images?theme=<>&locale=<>')`
- Response `data.images` consumed; sorted by `name || word`; lazy-loaded (first 6 immediate, rest deferred via `dataset.src`)
- Each rendered as `<div class="dictionary-item"><img><span>{label}</span></div>` with `onclick` toggling membership in `selectedImages` array
- During worksheet generation, selected images embedded directly into Fabric.js canvas

**`wordsearch.html`** has an internal `THEME_DB_MAP` translating UI theme names to DB names (e.g., `'food' → 'food_bw'`). Otherwise identical fetch pattern.

**Per-app consumption summary:** all 29 apps consume the same `/api/images` shape. They differ only in:
- Whether they need single-image-per-cell, theme-bulk, or pair-lookup
- Whether they use `IMAGE_VOCABULARY` directly for labels or only display the API-returned `name`
- Whether they accept user uploads (data URLs) — most do

## 7. Reusable abstractions for Phase 3 material generators

The Phase 3 material generators (flashcards, bingo boards, picture cards, answer key) need the same core operations as the 29 apps:
1. Fetch a themed asset set in the current locale
2. Resolve singular/plural/gender for a vocab key
3. Resolve a vocab key from a path (for displaying labels on assets that came from operator-uploaded files)
4. Resolve localized theme display names
5. Know the canonical 11-locale list

**Recommended helper module:** new file `frontend/public/worksheet-generators/js/materials-asset-loader.js` (loaded alongside existing `image-reference.js` and `catalog-export.js` via `<script>` tag, matching the existing distribution pattern). Exposes `window.LCSMaterialsAssetLoader` with:

### 7.1 `getThemeAssets(themeName, locale, count?)`

```js
window.LCSMaterialsAssetLoader.getThemeAssets(themeName, locale, count = null)
  → Promise<[{path, url, name, word, theme}, ...]>
```

Bulk-fetch theme assets in one go. Wraps `/api/images?theme=<>&locale=<>&limit=<>` with optional shuffle + slice. `count` of `null` means "all". Used by flashcards (for "10 farm animals"), bingo (for "5×5 + 14 distractors"), picture cards (for arbitrary count).

### 7.2 `lookupVocabulary(key, locale)`

```js
window.LCSMaterialsAssetLoader.lookupVocabulary(key, locale)
  → { singular: string, plural: string, gender?: 'm'|'f'|'n'|'d'|'h'|'t' } | null
```

Direct `IMAGE_VOCABULARY` lookup with fallback chain (`<locale>` → `en` → `null`). Used by flashcards (for the localized label per card) and answer key (for spelling out vocab forms).

### 7.3 `imageToVocabKey(image)`

```js
window.LCSMaterialsAssetLoader.imageToVocabKey(image)
  → string | null
```

Thin wrapper over the existing `LCSCatalogExport.vocabKeyFromImage` (re-exposes for consistency at the materials layer; SAME helper, no duplicate logic). Enables material generators to accept user-uploaded images (data URLs) and still resolve labels.

### 7.4 `getThemeDisplayName(themeName, locale)`

```js
window.LCSMaterialsAssetLoader.getThemeDisplayName(themeName, locale)
  → Promise<string>
```

Localized theme name. Reads `image_themes.displayNames[locale]` via a new lightweight cache; returns `themeName` as fallback. Used by all materials (for the title block — "Farm Animals Flashcards" / "Tiere-Bauernhof Lernkarten").

### 7.5 `LCS_LOCALES` constant

```js
window.LCSMaterialsAssetLoader.LCS_LOCALES
  // ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']
```

Frozen array; matches `IMAGE_VOCABULARY` key set + §6 platform locales. Used for any per-locale render or validation pass.

## 8. Endpoint-modification check (per CLAUDE.md §10.3)

**Confirmed: none of the 5 abstractions require new server endpoints or modifications to `/api/images`.** All five operate purely on read paths:
- `getThemeAssets` consumes the existing `/api/images?theme=<>&locale=<>&limit=<>` contract as-is
- `lookupVocabulary` is purely client-side (uses preloaded `IMAGE_VOCABULARY` global)
- `imageToVocabKey` is purely client-side (existing `vocabKeyFromImage` helper)
- `getThemeDisplayName` either reads from a small client-side `displayNames` cache (loaded once per session) OR could use a new lightweight read-only endpoint if cache cold-start becomes prohibitive — Phase 3 adjudicates final shape
- `LCS_LOCALES` is a frozen constant — no server interaction

**Filed deferred concern:** if Phase 4 + Arc 2 reveal heavy theme-display-name lookup pressure (e.g., if 11-locale × 100-theme cache cold-start blocks first render), Phase 3 may add a new lightweight read-only endpoint `/api/themes` returning `[{name, displayNames, type, sortOrder}]`. This is a NEW endpoint, not a modification to `/api/images`, so it does not violate §10.3. Default lean: don't add until empirical pressure justifies it.

## 9. Print-ready image generation — Phase 3 scope flag

The existing image pipeline only produces:
- **Worksheet PDFs** — client-side jsPDF in the apps; high-res because Fabric.js renders at multiplier 2 + jsPDF re-encodes WebP losslessly via Flate
- **Thumbnail WebPs** — server-side `/api/thumbnail`; max 400×400, NOT print-ready

**For Phase 3 material generators**, print-ready PDFs are required (8-12" × 5-7" flashcards at 300 DPI = ~2400×1800 px). Per pre-locked adjudication §3.3 in the plan file, default lean is **client-side Fabric.js → jsPDF pattern**, mirroring the existing 29-app pipeline. This works because:
- jsPDF + Fabric.js is already a proven pipeline at print quality (the apps' worksheet PDFs are already at 300 DPI equivalent)
- No new server dependencies, no new Sharp pipeline, no Puppeteer subprocess
- Reuses `IMAGE_VOCABULARY`, `vocabKeyFromImage`, `/api/images` consume pattern verbatim
- Per CLAUDE.md §3.5: "no microservices, no serverless functions, no Docker clusters" — server-side template rendering would push this lock

**Implication:** material generators are new HTML files (`flashcards.html`, `bingo-board.html`, `picture-cards.html`, `answer-key.html`) that the operator opens in a browser, configures, and downloads PDFs from — paralleling the existing 29-app workflow. They live at a path TBD in Phase 3 (likely `REFERENCE APPS/material-generators/` or a sibling `REFERENCE MATERIAL GENERATORS/` to keep the canonical 29 §14.10 list undisturbed).

## 10. Out-of-scope / forbidden per CLAUDE.md §10.3

- Modifying `/api/images` query parameters or response shape
- Modifying `image-vocabulary.js` directly (regenerate from DB only)
- Modifying `image_library_items.translations` content
- Renaming or deleting the 33 worksheet generator app HTMLs
- Adding columns to `image_themes` or `image_library_items` without operator approval
