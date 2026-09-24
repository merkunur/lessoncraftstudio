---
name: Pillar 3 Tool 5 (Bulk operations) — recon report
description: Substrate verification + halt-and-surface findings + Q-o through Q-u adjudication questions + Tool 5A/5B/5C split recommendation. Recon-only output (no code changes, no commits). Drives the subsequent plan-then-pass cycle.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
**Reading rule:** read at start of Tool 5 plan-pass session. Adjudicate Q-o through Q-u + Tool 5A/5B/5C split + zip-lib approval before commissioning the implementation pass.

**Status:** recon-only pass complete (2026-05-03). Schema substrate PASS at `9ba9fa2d`; three halt-and-surface findings shape the plan-pass scope; no commits, no in-tree edits.

---

## 1. Schema substrate verification (PASS — no new tables)

All Pillar 3 models match `CLAUDE.md` §8.1 exactly. Field-by-field at `frontend/prisma/schema.prisma`:

**Collection** (lines 1326–1339):
- `id String @id @default(cuid())`, `teacherId String @map("teacher_id")`, `name String`, `description String?`, `createdAt`, `updatedAt`
- Relations: `teacher User onDelete: Cascade`, `decks CollectionDeck[]`
- `@@index([teacherId])`

**CollectionDeck** (lines 1343–1355):
- Composite PK `@@id([collectionId, deckId])` (line 1352) — bulk-add idempotency via `prisma.collectionDeck.createMany({ data, skipDuplicates: true })` works out of the box, no application-side dedup needed.
- `position Int`, `addedAt DateTime @default(now())`
- `@@index([collectionId, position])`

**PlayLink** (lines 1305–1319):
- `linkId String @unique @map("link_id") @db.VarChar(10)` (line 1307) — confirms 10-char alphanumeric per §4.4.
- `embedConfigId String?` (nullable; non-embed PlayLinks omit it).
- `@@index([teacherId])` — Tool 2A's recent-activity feed reads via this index.

**EmbedConfig** (lines 1284–1299):
- `allowedOrigins String[] @default([]) @map("allowed_origins")` (line 1290) — array confirmed per §4.4.

**Deck** (relevant fields per §8.1):
- `pdfUrl String` — non-nullable; published decks always have printable.pdf.
- `answerKeyUrl String?` — nullable; some published decks lack answer key.
- `status String @default("draft")` — `'draft' | 'published' | 'archived'`. Bulk-export filters `where: { status: 'published' }` per §15.10.

**User-side relations** (per §8.1 line 72 comment "Catalog-side back-relations"): `playLinks`, `collections`, `favorites`, `embedConfigs` — all present.

### HAS-Tool-5-1: PlayLink generation route does NOT yet exist

Confirmed via codebase audit:
- No file under `frontend/app/api/play**/route.ts`.
- No `prisma.playLink.create` site anywhere in app code.
- The only `prisma.playLink` consumer in app code is `frontend/app/api/workspace/route.ts` (Tool 2A's recent-activity READ).

**Implication:** Tool 5 owns the entire PlayLink surface, not just bulk. Single-deck create path, linkId generator (10-char alphanumeric per §4.4 — uses `crypto.randomBytes` per the `/api/admin/profile/api-keys` precedent), idempotency model (re-share same deck twice — new link or existing link?), response shape (full URL `/play/<linkId>` or just linkId), and bulk variant must be designed together. The plan-pass commissions both single-deck `POST /api/play-links` and bulk `POST /api/play-links/bulk` in the same scope.

---

## 2. Multi-select primitive — host-surface inventory

Two hosts recommended for v1. Two surfaces explicitly OUT. Admin pattern documented as the convention Tool 5 mirrors.

### Topic-page deck grid (PASS — primary host)

**File:** `frontend/app/[locale]/topic/[slug]/page.tsx`. Server component, ISR with `revalidate: 3600`, decks fetched server-side via `fetchDecksForAxis()`. Deck cards rendered as inline `<li>` JSX (no DeckCard wrapper component). Per-card affordances: Play online (link), Print PDF (link), AddToCollectionButton (only `'use client'` boundary on the page).

**Bulk-mode attachment requires extracting the grid `<main>` to a client-child wrapper** (mirrors Tool 1A's CollectionDetailPage → CollectionDetailClient pattern). Server-component parent retains metadata generation + Schema.org JSON-LD. Low effort, no component-tree refactor.

**Recommended UI placement:**
- Bulk-mode toggle: top-right of header (next to "X decks" subtitle).
- Checkboxes: top-left corner of each card (overlaid on thumbnail).
- Action toolbar: sticky/floating bottom bar with selection count + bulk-action CTAs (Add to Collection, Share Link Batch, Export as PDF Pack).

### Collection-detail-page (PASS — secondary host)

**File:** `frontend/app/[locale]/collections/[collectionId]/CollectionDetailClient.tsx`. Already a client component with modal state (`renameOpen`, `deleteConfirmOpen`). Per-row affordances: Play online, Print PDF, Remove (single-deck via `handleRemoveDeck` calling DELETE `/api/collections/{collectionId}/decks/{deckId}`, with native `confirm()` dialog).

**Selection state bolts in directly** — `const [selectedDeckIds, setSelectedDeckIds] = useState<string[]>([]);` matches the existing modal-state pattern. Very low effort.

**Recommended UI placement:**
- Bulk-mode toggle: header alongside Rename / Delete collection buttons.
- Checkboxes per row.
- Action toolbar: same sticky bottom bar pattern as topic page (Add to Other Collection, Remove from This Collection, Share Link Batch, Export as PDF Pack).

### Workspace home (NOT a host candidate at v1)

**Files:** `frontend/app/[locale]/workspace/WorkspaceClient.tsx` + `CollectionsWidget.tsx`. Workspace is a summary surface — decks are not enumerated; only collection summary cards (top 5) plus recent-activity entries. Cross-collection bulk-select would require enumerating all subscriber's decks (defeats the dashboard purpose) or refactoring CollectionsWidget to expand decks per card (component-tree explosion).

**Defer to v1.1+.** If user feedback demands cross-collection bulk-mode, Tool 5C or a new tool can introduce it.

### Search page (out of scope at v1)

**File:** `frontend/app/search/page.tsx`. Placeholder skeleton (~600 lines of mock data), not localized (no `[locale]` prefix), not subscriber-facing per current architecture. Skip for v1; revisit when public/subscriber search ships.

### Admin multi-select prior-art

`frontend/app/admin/files/page.tsx` and `frontend/app/admin/search/client.tsx` use `useState<string[]>` for selected IDs + checkbox-per-item + action toolbar pattern. **Tool 5 mirrors this convention** for codebase consistency (no custom selection hook, no provider, no context — plain useState array).

---

## 3. Bulk-action inventory + feasibility per action

| Action | Feasibility | New deps? | Single-commit? | Notes |
|---|---|---|---|---|
| Bulk add to collection | PASS | None | YES | `createMany({ skipDuplicates: true })` after pre-computing position offsets + `where: { status: 'published' }` filter. |
| Bulk remove from collection | PASS | None | YES | `deleteMany({ where: { collectionId, deckId: { in } } })` + single `Collection.updatedAt` bump. |
| Bulk share-link-batch | PASS | None | YES (bundles single-deck PlayLink path per HAS-Tool-5-1) | `createMany` with pre-generated linkIds via `crypto.randomBytes(6).toString('hex').slice(0, 10)`. `skipDuplicates: true` covers theoretical linkId collisions (≈3.6 × 10^12 namespace; collisions are vanishingly rare). |
| Bulk PDF-pack option (a) — ZIP | PASS structurally | **1 new dep (zip lib)** | After approval | `fs.readFile('/var/www/lcs-media/decks/<locale>/<slug>/printable.pdf')` per the `/api/design-elements/list/route.ts` precedent. ZIP buffer → `NextResponse(buf, { headers: { 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename="..."' } })` per the `/api/admin/backup/export/route.ts` precedent. |
| Bulk PDF-pack option (b) — concat-PDF | PASS structurally | **2 new deps (zip lib + pdf-lib)** | Separate approval cycle | pdf-lib reads N PDFs → concat into single PDF → return as `application/pdf`. |
| Bulk PDF-pack option (c) — net-new pack format | OUT-OF-SCOPE | Multiple | NO | Cover page + ToC + custom rendering pipeline. Defer indefinitely. |

### HAS-Tool-5-2: Zip library is NOT in `package.json`

Confirmed via grep: `archiver`, `jszip`, `adm-zip`, `yazl` all absent. `fflate` is transitive only (via some other dep's tree). **Per CLAUDE.md §10.3, new direct dependency requires explicit operator approval at plan-pass time, not silent inclusion.**

**Recommendation for plan-pass approval:** `jszip` (browser/Node hybrid, simple synchronous API, well-maintained, ≈100 KB) for v1. `archiver` (Node streaming, larger surface) is overkill for the typical pack size (10–20 decks × ~200KB-2MB each). `jszip` lands in a single `npm install` cycle.

### HAS-Tool-5-3: pdf-lib / pdfkit / hummus are NOT in `package.json`

Confirmed: `jsPDF ^3.0.3` is present at `frontend/package.json:44` but unused (zero imports across `frontend/app`, `frontend/components`, `frontend/lib`). jsPDF is generation (canvas → PDF), not concatenation. **Second new direct dependency required for option (b); separate approval cycle.**

---

## 4. API route plan

Five candidate routes. The single-deck PlayLink companion is required by HAS-Tool-5-1; the four bulk routes follow.

| Route | Method | Body | Response | Notes |
|---|---|---|---|---|
| `/api/play-links` | POST | `{ deckId: string }` | `{ playLink: { id, linkId, deckId, teacherId, createdAt, shareUrl } }` | Single-deck companion required by HAS-Tool-5-1. Idempotency model TBD (operator decision: fresh link each call, or return existing if (teacherId, deckId) already exists?). |
| `/api/play-links/bulk` | POST | `{ deckIds: string[] }` | `{ playLinks: [{ deckId, linkId, shareUrl }] }` | `prisma.playLink.createMany({ data: [...prebuiltWithLinkIds], skipDuplicates: true })`. Subscriber gate. Filter `where: { status: 'published' }` against deckIds. |
| `/api/collections/[id]/decks/bulk` | POST | `{ deckIds: string[] }` | `{ added: number, skipped: number, total: number }` | Mirrors single-add pattern: ownership check, deck-publish filter, position-max+1 once, `createMany({ skipDuplicates: true })`, single `Collection.updatedAt` bump. |
| `/api/collections/[id]/decks/bulk` | DELETE | `{ deckIds: string[] }` | `{ removed: number }` | `deleteMany({ where: { collectionId, deckId: { in } } })` + single `Collection.updatedAt` bump. |
| `/api/decks/bulk-export` | POST | `{ deckIds: string[], format?: 'zip' }` | binary `application/zip` streaming | Reads `/var/www/lcs-media/decks/<locale>/<slug>/printable.pdf` per design-elements filesystem precedent. NextResponse binary-streaming per backup-export precedent. Tool 5B only (post zip-lib approval). |

**Ownership for bulk-export:** unlike collection bulk routes, bulk-export operates on an arbitrary deckIds array (not bound to a collection). Subscriber gate is the only access control — bulk-export is "any subscriber can ZIP any published deck's PDF" (consistent with the free-PDF tier policy in §7; the gate exists because bulk-export is a subscriber-tier convenience affordance, not because the underlying PDFs are gated).

**Filesystem-read precedents** (Next.js → `/var/www/lcs-media/`):
- `/api/design-elements/list/route.ts:63–78` — `fs.readFile('/var/www/lcs-media/design-elements/palettes.json', 'utf-8')`.
- `/api/design-elements/palettes/route.ts` — same pattern.
- `/api/health/design-elements/route.ts` — health check.

Permissions confirmed in production via these existing routes; no new permission configuration required.

**Binary-streaming precedents** (NextResponse with non-JSON content-types):
- `/api/admin/backup/export/route.ts:137–167` — `Blob` → NextResponse with `application/zip` + `Content-Disposition: attachment`.
- `/api/admin/analytics/export/route.ts:30–49` — `Buffer` → NextResponse with `application/pdf`.
- `/api/thumbnail/route.ts:57–64` — `ReadableStream` for chunked binary response.

---

## 5. Activity-feed integration

Tool 2A's query at `frontend/app/api/workspace/route.ts:25–117` (3-source merge of CollectionDeck.addedAt + Collection.updatedAt + PlayLink.createdAt, sorted desc, sliced to RECENT_LIMIT=10) handles bulk emissions out of the box without modification:

| Bulk operation | Activity rows emitted |
|---|---|
| Bulk-add 8 decks to collection | 8 separate `'collected'` entries + 1 `'modified'` entry (shared updatedAt timestamp on Collection) = 9 rows toward RECENT_LIMIT |
| Bulk share-link-batch 8 decks | 8 separate `'shared'` entries |
| Bulk remove 8 decks | 0 row deletions surface as activity ('removed' activity-type doesn't exist) + 1 `'modified'` entry |
| Bulk PDF-pack export | 0 rows (no DB write) |

**Surfaces Q-s for adjudication:** should bulk operations collapse into single feed entries ("Added 8 decks to {collection}") or render N individual entries? Either is functional; the collapse rendering would require additional query logic (group by `addedAt` rounded to nearest second + same `collectionId`) but improves feed readability for high-volume bulk users.

---

## 6. Adjudication questions Q-o through Q-u (recon-informed defaults)

The plan-pass adjudicates each before commissioning the implementation pass. Recon recommends defaults but does NOT resolve.

**Q-o — Multi-select host surfaces.** **Recon recommends:** topic-page deck grid + collection-detail page. No cross-page selection persistence. No workspace home, no search page. Confirm or override.

**Q-p — PDF-pack scope.**
- **Option I (recon recommends for Tool 5A → Tool 5B split):** ZIP-only, deferred to Tool 5B post zip-lib approval.
- **Option II:** ship Tool 5A WITHOUT PDF-pack (add+remove+share-link only); Tool 5B introduces PDF-pack post-approval.
- **Option III:** scope-out PDF-pack entirely; Tool 5 ships add+remove+share-link only, PDF-pack permanently deferred.

**Q-q — Bulk-mode UI pattern.** **Recon recommends:** Option I (mode toggle: explicit "Select" button puts page in selection mode, checkboxes appear, floating action toolbar surfaces). Matches admin-files / admin-search precedent. Alternative: Option II (always-on checkboxes), Option III (long-press / shift-click — mobile-style).

**Q-r — Cross-page selection persistence.** **Recon recommends:** Option I (in-page only — selection clears on navigation). Cross-page persistence adds session-storage complexity for limited K-3-teacher value. Defer to v2 if user feedback demands it.

**Q-s — Activity-feed entry collapse.** **Operator decision** — no strong recon recommendation. Both Option I (collapse: "Added 8 decks to {collection}") and Option II (don't collapse: render N entries) are functional. Option II is simpler (zero query changes; existing Tool 2A behavior); Option I improves readability at the cost of additional grouping logic.

**Q-t — Share-link-batch return UX.** **Recon recommends:** Option I (modal with list of N links + per-link copy + "Copy all" button). Matches in-app modal patterns from Tool 1A's create-collection / rename / delete-confirm flows. Option II (download as `.txt`) is mechanical but loses the per-link copy affordance. Option III (email draft) is out of Tool 5 scope.

**Q-u — Localization scope at Tool 5 launch.** **Recon recommends:** Option I (en + de Tier 1, consistent with Tool 1A + Tool 2A cadence). Option II (EN-only) is the F1 anti-pattern per established discipline.

### HAS-Tool-5-1 follow-up: PlayLink idempotency model (sub-question of Q-t)

PlayLink table has no `(teacherId, deckId)` unique constraint — multiple PlayLinks per (teacher, deck) pair are allowed by schema. Two policy options:

- **Option A (fresh link per call):** Every `POST /api/play-links` and every bulk-batch entry generates a new linkId. PlayLink rows accumulate. Subscriber feed shows multiple "shared" entries for the same deck.
- **Option B (return existing if any):** Check for existing PlayLink for (teacherId, deckId) — return existing linkId if found, else create. Idempotent at the (teacher, deck) level. PlayLink rows are 1:1 with deck-shares-by-teacher.

**Recon recommends Option B** for K-3 teacher mental model (one persistent link per deck per teacher; share once, distribute the same URL to students all year). Option A is simpler but accumulates rows and surfaces noisy activity-feed entries on re-share. Operator decision at plan-pass.

---

## 7. Single-commit feasibility + Tool 5A/5B/5C split recommendation

| Sub-tool | Scope | Dep approval needed? | Single-commit? |
|---|---|---|---|
| **Tool 5A** | Bulk-mode UI on 2 host surfaces + bulk add/remove/share-link routes + single-deck PlayLink companion (HAS-Tool-5-1) + i18n en+de Tier 1 | None | YES |
| **Tool 5B** | PDF-pack option (a) ZIP route + bulk-export-as-PDF-pack action toolbar entry on the 2 host surfaces + i18n en+de | YES — `jszip` (HAS-Tool-5-2) | YES post-approval |
| **Tool 5C** | PDF-pack option (b) concat-PDF route + UI toggle/preference for PDF format | YES — `pdf-lib` (HAS-Tool-5-3) | Deferred indefinitely; ship only if user feedback demands single-PDF over ZIP |

**Recommended cadence:**
1. Adjudicate Q-o through Q-u (and the HAS-Tool-5-1 sub-question on PlayLink idempotency) at the plan-pass.
2. Operator approves `jszip` if Tool 5B ships imminently; otherwise Tool 5A ships first and Tool 5B follows in a separate approval cycle.
3. Tool 5A commission pass — single commit, single deploy. Mirrors Tool 1A + Tool 2A discipline.
4. Tool 5B commission pass — separate single commit + deploy after `jszip` lands.
5. Tool 5C remains in deferred queue; pull only on demand.

---

## 8. Out-of-scope guardrails

This recon and the subsequent plan-then-pass do NOT touch:
- Tools 3 (Advanced filtering), Tool 4 (Curriculum mapping) — separate recon-then-plan-then-pass cycles.
- Tool 1B (Collection deck reorder), Tool 2B (Favorites surface) — separately tracked deferred entries in `project_deferred_items_queue.md`.
- Pillar 1 (lesson plans), Pillar 2 (themed bundles).
- Phase-3 bulk deck creation (operator-side content production tooling).
- Subscription launch / Notify-me flag flip (per `docs/SUBSCRIPTION-SCOPE.md`).
- Modification of existing `/api/*` routes (Tool 5 bulk routes are net-new; the single-deck PlayLink route per HAS-Tool-5-1 is also net-new).
- Modification of publish-cli PDF-rendering pipeline (per §10.3); Tool 5's PDF-pack reads existing assets at `/var/www/lcs-media/decks/<locale>/<slug>-vN/printable.pdf`.
- Modification of nginx-served deck.html files or asset serving.

---

## Summary for plan-pass adjudication

**Substrate:** PASS. Schema at `9ba9fa2d` matches §8.1 exactly. No new tables; Tool 5 is application-layer only.

**Three halt-and-surface findings:**
1. **HAS-Tool-5-1** — PlayLink generation route doesn't exist yet; Tool 5 owns single + bulk together.
2. **HAS-Tool-5-2** — `jszip` (or equivalent) needs §10.3 approval before Tool 5B ships.
3. **HAS-Tool-5-3** — `pdf-lib` (or equivalent) needs separate §10.3 approval; Tool 5C deferred indefinitely.

**Two host surfaces** for v1: topic-page deck grid + collection-detail page. Workspace home + search page out of scope.

**Five candidate API routes** (4 bulk + 1 single-deck PlayLink companion).

**Tool 5A / Tool 5B / Tool 5C split** by dependency-approval cadence. Tool 5A is single-commit-single-deploy now; Tool 5B follows post-`jszip`-approval; Tool 5C deferred indefinitely.

**Q-o through Q-u + HAS-Tool-5-1 idempotency sub-question** await operator adjudication.

After adjudication, the next plan-pass commissions Tool 5A.
