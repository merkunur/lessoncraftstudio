# CLAUDE.md — LessonCraftStudio Interactive Worksheets Platform

**Version:** 1.1
**Last updated:** 2026-04-23
**Audience:** Every Claude Code session working on this project reads this file first.

---

## 1. What we are building

We are transforming LessonCraftStudio from a tool-sold-to-sellers site into a **subscription catalog platform for teachers**. Teachers browse a catalog of ready-made interactive worksheet decks, find ones that match their lesson, and share a link with their students. Students play the deck in the browser — on iPads, Chromebooks, smartboards, phones — with instant feedback, no student account required.

The 31 existing worksheet generator apps (excluding the coloring and writing apps) are being extended with an interactive output mode alongside their existing PDF output. The operator uses these apps internally to produce decks that populate the catalog. Teachers never touch the apps.

Revenue comes primarily from annual subscriptions (~$69/year unlimited access) with individual deck purchases (~$5 each) available as an alternative. A free tier provides 3 decks per month to drive conversion.

## 2. Why this matters — the operator's situation

The operator has spent two years building the 31 apps, the 3,000-image library, and the 11-language vocabulary system. This technical foundation is genuinely rare and valuable. The previous positioning (selling individual app licenses to KDP/Etsy sellers) has not produced sustainable revenue. This pivot is the operator's chance to monetize the existing asset by repackaging it for the market that actually wants ready-made content: teachers.

Runway is limited. Time-to-revenue matters. This project must ship within approximately four months, not twelve.

## 3. Core principles — read these before writing any code

### 3.1 The existing codebase is production; treat it with care

This project extends the existing LessonCraftStudio codebase at `C:\Users\rkgen\lessoncraftstudio\`. It does not create a parallel project. The Next.js frontend, Prisma database, authentication, Lemon Squeezy integration, the 33 HTML apps, the image library, and the vocabulary files all continue to live where they are.

**Before modifying any existing file**, check whether the change affects production behavior. The existing 33 apps still serve existing customers. The existing `/api/images` endpoint still serves the apps. The existing user accounts still work. All of this must continue working during and after the new work.

When in doubt: add new files rather than modifying existing ones. Create new routes alongside old ones. Introduce new database tables, don't migrate existing ones destructively. The interactive platform is **additive**.

### 3.2 The 31 apps' generation logic is not to be rewritten

The apps work. They produce deterministic, consistent content. They are the result of thousands of hours of work and subtle fixes. We extend them — we do not rewrite them.

Specifically: each app's existing rendering code (which builds Fabric.js canvas scenes) is the source of truth for what the worksheet looks like. The interactive output mode reuses this rendering logic; it does not duplicate or reimplement it. The new work is adding a second serialization target (interactive deck bundle) alongside the existing one (PDF). The apps' generation algorithms, image selection, layout, and customization surfaces are preserved unchanged.

If extending an app requires touching its core logic, stop and ask the operator before proceeding.

### 3.3 The catalog is the product; the apps are internal tooling

Teachers never see the apps. Teachers see the catalog, browse decks, click to share. The apps are the operator's production workstation — accessed through the existing app URLs or a new admin interface, not through the teacher-facing site.

When designing the teacher-facing UI: no "create worksheet" buttons, no "customize" flows, no app configurators. The teacher sees finished content, filter and search, a subscribe button, and a share link. That's the whole experience.

### 3.4 Launch with breadth, not depth of features

The minimum viable launch includes: all 31 eligible apps converted to interactive mode, a catalog of 400-600 seeded decks, subscription and individual-purchase billing, a student play experience that works across all 31 exercise types, and a teacher-facing catalog with search and filter. This is the floor, not the ceiling.

Things **deliberately excluded from launch**: student accounts, class management, progress tracking, teacher dashboards with analytics, parent portals, SSO, school-district features, complex DRM, custom worksheet creation tools for teachers, AI-assisted deck generation. Each of these is a rabbit hole. Do not add any of them without explicit operator direction.

### 3.5 Standard infrastructure, not custom

Use what's already in the codebase: Next.js 14 App Router, Prisma + Postgres, NextAuth, Lemon Squeezy, next-intl, Tailwind, existing `/api/*` route patterns. Do not introduce new frameworks, databases, ORMs, or auth systems. Do not introduce Redis, Elasticsearch, message queues, or distributed systems.

Deployment stays on the existing Hetzner server. Cloudflare free tier sits in front for CDN caching. That's the entire infrastructure. No microservices, no serverless functions, no Docker clusters.

### 3.6 Writing code: prefer clarity over cleverness

Every future Claude Code session and every human reviewer should be able to understand any piece of code on first reading. Favor explicit over implicit. Favor long clear names over short cryptic ones. Avoid frameworks-within-frameworks. Avoid abstractions that exist only to be flexible someday.

### 3.7 When uncertain, ask

If a task requires interpreting operator intent beyond what this document or the specific task prompt provides, stop and ask. Do not guess. The cost of a clarifying question is five minutes; the cost of building the wrong thing is a week.

## 4. The four architectural layers

### 4.1 Layer 1 — The existing apps (unchanged foundation)

33 worksheet generator apps in the existing repo. 31 of them will be extended with an interactive output mode (all except `coloring.html` and `writing.html`, which remain PDF-only). Each app contains its own Fabric.js-based rendering logic, its own UI for customization, its own consumption of the image library and vocabulary.

**What changes:** A new export function is added to each app that serializes the current Fabric canvas and associated answer data to a JSON format (the "deck bundle"). This is a few hundred lines of new code per app, isolated from the existing PDF export path.

**What does not change:** The apps' generation algorithms, customization UIs, image selection, layout code, PDF export, or any behavior visible to existing users.

### 4.2 Layer 2 — The deck storage and publishing system (new)

A new Prisma model `Deck` stores published decks. Fields include: id, operator-authored title, description, subject, age range, language, exercise type (which of the 31 apps produced it), topic tags, the deck bundle JSON (the Fabric canvas state plus answer data), preview image URL, publish status, creation timestamp, and an indexed slug for SEO URLs.

A new admin route lets the operator publish a deck. The flow: the operator uses one of the 31 apps as normal, clicks a new "Publish as interactive deck" button, the current canvas state is captured, a preview image is generated, the deck is saved to the database with draft status. The operator then fills in metadata (title, subject, age, tags, language) and publishes.

Decks are immutable after publish — editing a published deck creates a new version, not an in-place edit. This keeps shared links stable over time.

### 4.3 Layer 3 — The teacher-facing catalog (new)

New Next.js routes under `/[locale]/catalog/` provide:
- Catalog landing page with category tiles (subject, age, exercise type, language)
- Browse/search/filter page with pagination
- Individual deck page with preview animation, metadata, and share/purchase actions
- My Decks page for subscribers showing their shared links
- Subscription management page

All catalog pages are server-rendered for SEO. Deck slugs in URLs. Schema.org educational markup on deck pages. hreflang for the 11 language variants.

Authentication gating: browsing is public (for SEO), the "get shareable link" action requires subscription, individual deck purchase available as an alternative.

### 4.4 Layer 4 — The student play experience (new)

Route pattern: `/play/[linkId]` where `linkId` is a random 10-character alphanumeric code. No authentication. No student account. The page loads the deck bundle as a static JSON file (served through Cloudflare CDN), renders the interactive version using a shared play-mode renderer, handles student interactions in the browser, validates answers client-side, shows feedback and score.

The server is involved only in serving the initial HTML shell and the static deck bundle. Student interactions do not round-trip to the server. This is architecturally essential: it means one server handles unbounded concurrent play sessions without straining, and CDN caching means viral decks become free.

Access control: the linkId is random enough to be unguessable (10 chars alphanumeric = 3.6 quadrillion combinations). The play page checks whether the link's creator has an active subscription or is within the 60-day grace period; if not, the page shows "this content is no longer available — [subscribe to get your own]".

## 5. Technology decisions — locked for v1

These are not up for debate without operator sign-off:

- **Framework:** Next.js 14 App Router (existing)
- **Language:** TypeScript
- **Database:** Postgres via Prisma (existing)
- **Auth:** NextAuth with email+password (existing)
- **Billing:** Lemon Squeezy (existing integration extended)
- **i18n:** next-intl (existing)
- **UI:** Tailwind CSS (existing)
- **Canvas rendering:** Fabric.js 5.3.1 (existing, used by the apps)
- **CDN:** Cloudflare free tier
- **Hosting:** existing Hetzner dedicated server
- **File storage:** local filesystem, served via Next.js
- **Image processing:** Sharp (existing)

No additions without explicit justification and operator approval.

## 6. The 11 languages

English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, Finnish.

The vocabulary file `REFERENCE TRANSLATIONS/image-vocabulary.js` is the canonical source of linguistic data. It contains 1,246 entries with singular, plural, and grammatical gender across all 11 languages. It is never modified directly without operator approval.

All teacher-facing UI must work in all 11 languages via next-intl. All catalog metadata (subjects, ages, tags) must have 11-language translations. Deck content generated by the apps already handles all 11 languages through the vocabulary system.

## 7. Pricing and subscription model

**Free tier:**
- 3 decks per month can be generated with shareable links
- Decks display "Free Sample — Subscribe for unlimited" banner
- All decks (free and paid) display a small "Made with LessonCraftStudio" attribution footer

**Annual subscription: $69/year**
- Unlimited deck generation
- No "Free Sample" banner (attribution footer remains on all decks as product branding)
- Access to all 11 languages
- All 31 app types
- Auto-renew with 30/14/3 day notification emails

**Individual deck purchase: $5 per deck**
- Permanent access to that specific deck (not time-limited like subscription access)
- Available as alternative to subscription for teachers who want only one or two decks

**Grace period on subscription lapse:** 60 days. Links generated while subscribed continue to work for 60 days after subscription ends, then return the "expired" page with a subscription prompt.

## 8. Technical standards

### 8.1 Database schema additions

All new tables are added via Prisma migrations. Do not modify existing migrations. Do not rename existing tables. Do not remove existing columns. Any change to an existing table requires operator approval.

Key new tables (minimum; more added as needed):

```prisma
model Deck {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           Json     // {en: "...", de: "...", ...} for 11 languages
  description     Json
  exerciseType    String   // "word-search" | "matching" | "sudoku" | ... (one of 31 app types)
  language        String   // deck's primary content language
  subjectTags     String[]
  ageRange        String   // "3-5" | "6-8" | "9-11"
  bundleUrl       String   // path to static deck bundle JSON on disk/CDN
  previewImageUrl String
  publishedAt     DateTime?
  status          String   @default("draft") // "draft" | "published" | "archived"
  createdBy       String   // operator user id
  version         Int      @default(1)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  playLinks       PlayLink[]
  purchases       DeckPurchase[]

  @@index([status, publishedAt])
  @@index([exerciseType, language])
}

model PlayLink {
  id         String   @id @default(cuid())
  linkId     String   @unique @db.VarChar(10)  // the 10-char random public ID
  deckId     String
  teacherId  String
  createdAt  DateTime @default(now())
  deck       Deck     @relation(fields: [deckId], references: [id])
  teacher    User     @relation(fields: [teacherId], references: [id])

  @@index([teacherId])
}

model DeckPurchase {
  id         String   @id @default(cuid())
  deckId     String
  userId     String
  priceCents Int
  purchasedAt DateTime @default(now())
  deck       Deck     @relation(fields: [deckId], references: [id])
  user       User     @relation(fields: [userId], references: [id])

  @@unique([deckId, userId])
}

model Subscription {
  // extend existing subscription tracking as needed
  // grace-period end computed as (lapsed_at + 60 days) when checking link validity
}
```

### 8.2 File organization

New code follows the existing repo conventions:

```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── catalog/                  # NEW — teacher-facing catalog
│   │   │   ├── page.tsx              # catalog landing
│   │   │   ├── browse/page.tsx       # search/filter/paginate
│   │   │   ├── deck/[slug]/page.tsx  # individual deck view
│   │   │   └── my-decks/page.tsx     # subscriber's link history
│   │   └── ...
│   ├── api/
│   │   ├── decks/                    # NEW — deck CRUD, play link generation
│   │   ├── play/                     # NEW — play link resolution, access check
│   │   └── ...
│   └── play/
│       └── [linkId]/page.tsx         # NEW — student play page, no locale prefix
├── components/
│   ├── catalog/                      # NEW
│   └── play/                         # NEW — interactive deck renderer
└── lib/
    ├── deck-publishing/              # NEW — bundle extraction, preview generation
    ├── play-access/                  # NEW — subscription + grace period check
    └── ...

apps/
└── (existing 33 apps, each gets a new "Publish as deck" button)
```

### 8.3 Play-mode renderer

The play-mode renderer is one shared module used by all 31 deck types. It takes a deck bundle JSON and renders the interactive version. Each app's interactive behavior (how you drag a match, how you circle a word, how you type a sudoku answer) is implemented as an "interaction plugin" specific to that exercise type. The shared renderer handles canvas setup, answer validation framework, feedback display, scoring, and accessibility.

Interaction plugins live at `frontend/lib/play-mode/interactions/{type}.ts`. A new exercise type = add a new plugin. The shared renderer does not need to change for new exercise types.

### 8.4 Caching and CDN

Deck bundles are written as static JSON files at publish time. File path includes a version hash so deck updates don't cache-collide. These files are served through Next.js static asset routing and cached aggressively by Cloudflare.

The play page HTML is short-cache (5 minutes) because it does the subscription-status check on every request. If subscription is active or grace-period-valid, the page renders and loads the cached deck bundle. If not, the page shows the expired state.

Student interactions never touch the server. All answer validation is client-side JavaScript referencing the deck bundle's embedded answer data.

### 8.5 SEO considerations

Every catalog page is server-rendered. Every deck page has:
- Unique, descriptive title tag
- Meta description with deck content summary
- Open Graph tags for Pinterest/Facebook previews
- Schema.org `LearningResource` markup
- hreflang alternates for all 11 language variants
- Canonical URL
- XML sitemap entry

The sitemap auto-generates from published decks and is submitted to Google, Bing, and Pinterest.

## 9. What "done" looks like for the launch

**Engineering completeness:**
- All 31 eligible apps have working interactive-output mode
- Catalog browse, search, filter, individual deck pages all work
- Student play page works across all 31 exercise types on mobile and desktop
- Subscription checkout, individual purchase checkout, and free tier limits all enforced
- Grace period on lapsed subscriptions works correctly
- Cloudflare CDN in front of the site
- All SEO basics in place (meta, schema, sitemap, hreflang)

**Content completeness:**
- 400-600 published decks in the catalog at launch
- Distribution across subjects and age ranges broadly covering early-childhood and primary education
- Distribution across languages weighted toward target markets (English, German, French, Spanish, Dutch, Swedish as initial priorities; the other 5 represented more sparsely)

**Website transformation:**
- Home page reworked to lead with the catalog and teacher subscription
- Legacy seller-focused content moved to `/sellers` or similar secondary path
- Pricing page presents Free/Subscribe/Buy-one structure clearly
- About, FAQ, and support pages updated for teacher audience
- Free sample decks prominently linked from the home page for zero-friction trial

**Launch readiness:**
- Pinterest account set up with initial 100+ pins queued
- Facebook group presence established (30-day waiting period required by many groups, so start early)
- TPT seller account open for free-sample listings
- Email waitlist of teachers built before launch
- Teacher-creator outreach list compiled

## 10. How Claude Code sessions should operate

### 10.1 Before starting a task

- Read the specific task prompt carefully
- Check if it conflicts with anything in this CLAUDE.md — if so, flag it to the operator rather than proceeding
- Look at the relevant existing code before writing new code
- If the task touches an existing file, understand what that file currently does before modifying it

### 10.2 During a task

- Write TypeScript, not JavaScript
- Follow the existing code's style conventions even if they're not your preferred style
- Add new files rather than modifying existing ones whenever possible
- If you must modify an existing file, make the smallest change that works
- Run the existing test suite before considering a task done (if tests exist for that area)
- When adding a database table, add a Prisma migration; do not edit existing migrations

### 10.3 What to never do without explicit operator approval

- Rename or delete any existing file
- Modify any of the 33 app HTML files' generation or customization logic
- Modify `REFERENCE TRANSLATIONS/image-vocabulary.js` directly
- Modify the existing `/api/images` endpoint's behavior
- Change existing database tables or migrations
- Add new dependencies to `package.json`
- Change the Next.js or Prisma major versions
- Remove or alter existing authentication flows
- Remove or alter existing Lemon Squeezy integration
- Commit credentials, API keys, or `.env` contents

### 10.4 What to always do

- Ask if a task is ambiguous
- Flag if a task requires one of the "never do without approval" actions
- Write small commits with clear messages
- Test your work in the existing dev environment before saying it's done
- Document new components and new modules with brief JSDoc or TS comments explaining purpose and usage

### 10.5 What to flag to the operator

- Anything that seems to conflict with production behavior
- Any place where this CLAUDE.md is ambiguous or contradicts the specific task
- Any time a task as specified would break something that currently works
- Any time you are about to do something that feels irreversible
- Any performance concern that could affect production traffic

## 11. Scope discipline — what stays out of v1

These ideas have come up in conversation and have been explicitly deferred. Do not build any of them without explicit operator direction:

- Unified worksheet creation studio for teachers (cut: teachers buy finished content, not tools)
- Local AI automation for content generation (cut: operator produces content manually with strategic input)
- RTILA or similar scraping infrastructure
- n8n or similar workflow orchestration
- Mac Studio or any second-machine infrastructure
- Knowledge base with RAG retrieval
- LoRA fine-tuning or any model training
- Student accounts, logins, or per-student data
- Class management, assignment delivery, gradebooks
- Parent portals or parent-facing features
- School-district admin features, SSO, SAML
- Real-time collaboration features
- Mobile apps (native iOS/Android)
- Offline play
- AI-powered anything for v1

These may become relevant in year two or three. They are not relevant now.

## 12. When this document is wrong

This CLAUDE.md will be wrong about some things. The operator's thinking will evolve. The product will reveal new constraints after launch. When you (Claude Code) find something in this document that seems to contradict current reality:

- Do not quietly ignore it
- Do not assume the new situation overrides it
- Flag the contradiction to the operator explicitly
- Ask for updated guidance before proceeding

This document is the stable reference. When reality diverges from it, the operator updates the document, not you.

## 13. The one sentence summary for every future session

> Extend the existing LessonCraftStudio codebase to add an interactive-output mode to 31 worksheet apps, build a teacher-facing catalog and subscription product on top, launch within four months on existing infrastructure without destabilizing the production site.

If your task appears to be outside this scope, stop and ask the operator before proceeding.

---

## 14. Interactive-HTML export — current implementation status & porting recipe

As of 2026-04-23, two of the 31 apps ship the interactive-HTML export: **addition (v4)** and **subtraction (v5)**. The remaining 29 are not yet converted. This section documents what's actually built so a new session can continue the port without re-deriving the architecture.

### 14.1 What the current implementation is

Each converted app has a new **Download → "Interactive Worksheet (HTML)"** button that emits a single self-contained `.html` file. The file works fully offline once downloaded:

1. **Snapshot + overlay architecture.** The operator's Fabric canvas is captured as a JPEG (via `canvas.toDataURL({format:'jpeg', quality:0.85, multiplier:2})`) — this preserves every design element, border, background, theme image and header exactly as authored. The JPEG is the backdrop in the downloaded HTML.
2. **Overlay layer with input boxes.** For each exercise, the exporter records the answer-line's world coordinates (via `calcTransformMatrix`) and the equals-sign's world center (via a helper that scans for a sub-group containing `fabric.Text` with content `"="`). An HTML input is overlaid at those coordinates in the standalone file. Position percentages are relative to the JPEG dimensions so the layout scales proportionally on any viewport.
3. **Batch-check interaction.** The student fills every input at their own pace; a sticky "Check Answers" button at the bottom of the page stays disabled until every input has a value, then enables. Tap Check → every answer turns green (correct) or red (wrong). Wrong answers show the correct value in a green pill beside the crossed-out typed value. "Try Again" resets. Celebration modal (stars-out-of-3, worksheet thumbnail, Do Another / Print) triggers on 100% first-pass correct.
4. **No Fabric.js on the student side.** The downloaded HTML is pure HTML + CSS + vanilla JS + a single Google Fonts link for Fredoka. Typical file size: ~200–300 KB including the JPEG backdrop.
5. **Per-app interactive extensions.** Beyond the base batch-check, individual apps can layer app-specific interactions. Example: **subtraction's cross-out mode** adds a transparent clickable hitbox over each minuend image so the student must both type the answer AND click exactly `subtrahend` images to cross them out. Validation checks both conditions.

### 14.2 Where the code lives

Each converted app's HTML contains one self-contained export block delimited by `// BEGIN: Interactive-HTML export v<N>` and `// END: Interactive-HTML export v<N>` inside the main inline `<script>`:

- `REFERENCE APPS/addition.html` — v4 block
- `REFERENCE APPS/subtraction.html` — v5 block (v4 + cross-out)

The block contains: `extractDeckBundle()`, `renderStandaloneHTML()`, `downloadInteractiveHtml()`, plus three arrays — `INTERACTIVE_CSS_LINES`, `INTERACTIVE_RUNTIME_LINES`, and helper functions (`_captureWorksheetImage`, `_findAnswerLineDeep`, `_findEqualsSign`, `_worldLineRect`, and for subtraction: `_collectMinuendImages`, `_worldImageRect`). The runtime is stored as an array of line-strings joined at render time — this avoids template-literal escaping issues with `${` and `</script>`.

### 14.3 How to port to a new app (the recipe)

Apps share the same scaffolding (`generateWorksheet()`, `exerciseRowGroup` with `isGeneratedItem` + `originalIndex`, answer lines, equals-sign sub-groups). To port:

**Step A — Metadata patches in the operator app's rendering code** (all additive, no visual change):
1. `worksheetCanvas.problemsData = problemsData;` inside `generateWorksheet()` so the exporter reads the data uniformly.
2. `<rowGroup>.resolvedMode = exerciseMode;` after the row group is constructed, so mixed-mode sub-mode is preserved per problem.
3. Add `isAnswerLine: true` to every `fabric.Line` the student fills in.
4. For apps with interactive extensions (tap-to-classify, drag-to-match, cross-out, etc.), tag the relevant child objects with a per-feature boolean (e.g., `isMinuendImage: true`) so the exporter can enumerate them.

**Step B — Download button + wiring** (4 edits, same pattern as addition's first commit):
1. New `<button id="downloadInteractiveHtmlBtn">` in the download dropdown.
2. `const downloadInteractiveHtmlBtn = document.getElementById(...)`.
3. Un-disable it in `generateWorksheet()` alongside the other download buttons.
4. Click listener: `downloadInteractiveHtml(worksheetCanvas, '<app>_interactive.html')`.

**Step C — Copy and adapt the v5 block**:
1. Copy `// BEGIN: Interactive-HTML export v5` through `// END:` from `REFERENCE APPS/subtraction.html`.
2. Change `appType`, `title`, and bump `bundleVersion`.
3. Adjust the mode list in `expectedAnswer(s)` so the right operand/result is expected per mode. **Critical branching rule**: for any mode where the student types a missing OPERAND (find-addend / find-subtrahend / etc.), expected is `operandB`; for modes where the student types the RESULT, expected is the arithmetic result. This is a frequent off-by-one source of "answers marked wrong."
4. If the app has interactive extensions not in subtraction, extend `renderSlots`, `checkAll`, `resetAll`, and CSS as needed (pattern: one helper to build the extra hitbox element, one state field, one branch in `checkAll`).

**Step D — Validate, sync, commit, deploy** (see §14.4–§14.5).

### 14.4 Local dev loop

A pre-existing unrelated Next.js route conflict blocks `npm run dev` until `frontend/app/sitemap.xml/route.ts` is renamed to `route.ts.DISABLED-FOR-DEV`. **Rename it back before any push to production** or the live sitemap breaks. This is a known wart; fixing it at the source is deferred.

After edits to `REFERENCE APPS/<app>.html`:
1. `scripts\master-sync.bat` (refreshes the two sibling tracked copies and the gitignored frontend/public copy).
2. Hard-refresh `http://localhost:3000/worksheet-generators/<app>.html`.
3. Click Generate, Download → Interactive Worksheet (HTML), open the downloaded file.

### 14.5 Deployment — the TWO-STEP rule

Worksheet-generator HTML updates require BOTH steps; `deploy.sh` alone is not enough because the served copy is `chattr +i` (immutable):

1. **Push + build:** `plink ... "bash /opt/lessoncraftstudio/deploy.sh"` — runs `git pull`, builds, smoke tests. Updates `/opt/lessoncraftstudio/REFERENCE APPS/<app>.html` but NOT the served copy.
2. **Sync the served copy** (the critical second step that is easy to forget):
   ```
   plink ... "cp '/opt/lessoncraftstudio/REFERENCE APPS/<app>.html' /tmp/<app>.html && /var/www/lcs-media/scripts/update-worksheet.sh /tmp/<app>.html <app>.html"
   ```
3. **Verify:** `curl -s https://www.lessoncraftstudio.com/worksheet-generators/<app>.html | grep -c 'Interactive-HTML export v<N>'` must return ≥ 1.

Skip step 2 and the site keeps serving the old HTML — we hit this on the addition deploy.

### 14.6 Known gotchas (read before debugging)

- **`getBoundingRect(true, true)` on a grouped child returns GROUP-LOCAL coords in Fabric 5.x**, not world coords. Use `calcTransformMatrix()` + `fabric.util.transformPoint` instead. This is why v1 slots clustered at the top-left of the worksheet.
- **`calcTransformMatrix()` already includes the object's own scale.** Do not also feed `getScaledWidth()/getScaledHeight()` into `transformPoint` — that double-scales. Use intrinsic `img.width` / `img.height`. This is why v5's first cross-out hitboxes were tiny.
- **`exerciseRowGroup.getCenterPoint().y` drifts off the equals sign when operand images aren't square** because the bbox center tracks the image span, not the equation centerline. Anchor to the actual `=` sign via `_findEqualsSign`. This is why addition v4 answer boxes visibly floated above the `=`.
- **`expectedAnswer` MUST branch on mode** for find-addend / find-subtrahend / any "missing operand" mode. Otherwise every answer is compared against the arithmetic result and the student's correct answer is marked wrong.
- **Inline `<script>` inside a string must escape `</script>` as `<\/script>`** to avoid the outer HTML parser closing the script prematurely.
- **The operator may transform (scale/translate/rotate) the exerciseRowGroup after generation.** `calcTransformMatrix` and `getCenterPoint` both honor these transforms, which is why they're used instead of hardcoded offsets.

### 14.7 Remaining apps (29 of 31)

alphabet-train, big-small, bingo, chart-count, code-addition, crossword, cryptogram, draw-and-color, drawing-lines, find-and-count, find-objects, grid-match, matching, math-puzzle, math-worksheet, missing-pieces, more-less, odd-one-out, pattern-train, pattern-worksheet, picture-path, picture-sort, prepositions, shadow-match, treasure-hunt, word-guess, word-scramble, wordsearch.

(Coloring and writing are excluded per §1 — PDF-only, no interactive output.)

Math apps likely port in an afternoon each (same `exerciseRowGroup` + `isAnswerLine` pattern). Puzzle apps (wordsearch, crossword, cryptogram, sudoku, matching) will need new interactive extensions beyond the base batch-check — expect a larger per-app budget.

---

## Appendix A — Production safety rules (operational guardrails)

These are concrete operational rules that have prevented real incidents. They supplement §3.1 and §10.3 with specific paths and commands. Treat them as non-negotiable.

### A.1 Server & isolated storage

- **Host:** `65.108.5.250` (root). SSH via plink/pscp with `-pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU`.
- **Code (git repo):** `/opt/lessoncraftstudio`
- **Isolated storage (NOT in git, bulletproof):** `/var/www/lcs-media/`
  - `samples/` — product sample images
  - `image-library/` — source PNGs (2.6 GB, 3000+ files)
  - `worksheet-generators/` — 33 HTML apps + `js/` translations
  - `admin-panels/` — content-manager HTMLs
  - `design-elements/` — 81+ SVGs + palettes + manifest
  - `backups/` — hourly/daily/weekly/monthly tarballs
  - `scripts/` — update/backup/health/restore helpers
- **Symlinks** (follow transparently from the code repo; never remove them):
  - `frontend/public/worksheet-generators` → `/var/www/lcs-media/worksheet-generators`
  - `frontend/public/admin` → `/var/www/lcs-media/admin-panels`
  - `image library` → `/var/www/lcs-media/image-library`
- Samples are served by nginx directly (`location /samples/`), bypassing Next.js.

### A.2 Reference folders (source of truth)

Always edit these first; they are canonical for deployment:
- `REFERENCE APPS/` — 33 worksheet generator HTML files
- `REFERENCE TRANSLATIONS/` — translation JS files
- `REFERENCE CONTENT MANAGERS/` — content-manager HTML files

After modifying, run `scripts\master-sync.bat` to update local copies.

### A.3 NEVER DO

**Git:**
- `git add .` in project root (could pull in samples/images).
- `git add samples/` or any image/PDF/sample file — the pre-commit hook blocks sample commits; 16 GB would crash the repo.

**Never `rm -rf`, `mv`, bulk-delete, `find -delete`, or `chattr -i` on:**
- `/var/www/lcs-media/samples`
- `/var/www/lcs-media/image-library` (and the `image library` symlink)
- `/var/www/lcs-media/worksheet-generators`
- `/var/www/lcs-media/admin-panels`
- `/var/www/lcs-media/design-elements`
- `/opt/lessoncraftstudio/stripe-backup` (immutable; legacy reference — not the active payment system)

**Never delete these files/symlinks:**
- `frontend/public/worksheet-generators` (symlink)
- `frontend/public/admin` (symlink)
- `frontend/app/api/webhooks/lemonsqueezy/route.ts`
- `frontend/config/lemonsqueezy-products.ts`
- Immutable content managers in `frontend/public/` (`homepage-content-manager.html`, `user-control.html`)

**Never run without EXPLICIT operator approval:**
- `chattr -i` / `chattr -R -i` on any protected path.
- Modify any `LEMONSQUEEZY_*` env var.
- `DELETE` / `TRUNCATE` / `DROP` on: `users`, `purchases`, `ls_webhook_events`, `design_elements`, `image_library_items`.
- Re-run `scripts/import-*-images.js` — these strip diacritics; must re-run fix scripts afterward.
- Regenerate `image-vocabulary.js` without verifying diacritics in the raw JSON source.

### A.4 Update helpers — never direct `cp` on immutable files

- Worksheet / translation / content-manager updates: `/var/www/lcs-media/scripts/update-worksheet.sh`
- Design-element updates: `/var/www/lcs-media/scripts/update-design-element.sh`

These handle unlock → copy → re-lock. Direct `cp` on an immutable file fails and leaves the path in an inconsistent state.

### A.5 Deployment

**ALWAYS commit + push BEFORE running deploy.** `deploy.sh` runs `git pull`, so unpushed commits never arrive.

- Code deploy: `plink ... "bash /opt/lessoncraftstudio/deploy.sh"`
- Per-scenario commands for worksheet / translation / content-manager updates live in **`DEPLOYMENT.md`**.

### A.6 Lemon Squeezy (current payment integration — extended, not replaced, by the new subscription model)

- **Source of truth:** `frontend/config/lemonsqueezy-products.ts`
- **Webhook handler:** `frontend/app/api/webhooks/lemonsqueezy/route.ts` (HMAC-SHA256, idempotent via `ls_webhook_events.event_id`)
- **Required env vars:** `LEMONSQUEEZY_WEBHOOK_SECRET`, `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_STORE_SLUG`, plus `SMTP_*` / `EMAIL_PROVIDER`.
- Stripe is **not** the active processor. The backup at `/opt/lessoncraftstudio/stripe-backup/` is immutable historical reference — do not use, do not delete.

### A.7 Diacritics (image translations)

`image_library_items.translations` was fully corrected on 2026-03-03. `deploy.sh` runs auto-healing every deployment; Test 13 is the smoke test.

Fix scripts at `/opt/lessoncraftstudio/server-scripts/`:
- `audit-db-diacritics.js` — reports mismatches
- `fix-db-diacritics.js` — base-key translations
- `fix-db-diacritics-numbered.js` — numbered variants
- `image-vocabulary-raw.json` — source of truth

### A.8 Sample-commit protection

- Local `samples/` is in `.gitignore`.
- `.git/hooks/pre-commit` blocks any sample-file commit.
- Uploads flow: **Content Manager UI → API → `/var/www/lcs-media/samples/`** — never via git.

### A.9 More detail

- **`DEPLOYMENT.md`** — full deployment scenarios + recovery workflows.
- **`docs/reference/server-verification.md`** — health checks, file-count verification, backup inspection, image/payment recovery commands.
- **`docs/reference/design-elements-integration.md`** — 22 load-bearing rules for the Design Elements accordion (read before porting it to a new app).
- **`docs/reference/12-content-creation-guide.md`** — content creation guide.

*End of CLAUDE.md.*
