---
name: Pillar 3 Tool 1 (Collections) — application-layer commission recon
description: Recon-only snapshot of schema substrate state, auth/subscription-gating infrastructure, catalog-surface affordance-attachment plan, API + page-route plans, and 7 open UX adjudication questions. Drives the subsequent Tool 1 implementation pass. Out-of-tree per CLAUDE.md §10.4.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
# Pillar 3 Tool 1 (Collections) — recon at commit `fbff3466`

## Inputs read

- CLAUDE.md (in-tree at `fbff3466`): §3 acquisition flywheel, §4.3 My Decks framing, §7 paid-tier post-Workstream-1, §8.1 Collection/CollectionDeck/DeckFavorite specs (lines 350-386), §10.3, §15.7 routing, §17.2 SubscribeCTA, §17.4 SEO, §A.6 LS conventions
- `docs/SUBSCRIPTION-SCOPE.md` (in-tree at `fbff3466`): Pillar 3 Implementation order (locked) sub-section + Tool 1 spec at line 123
- `frontend/prisma/schema.prisma` (post-`9ba9fa2d`): Collection (lines 1326-1341), CollectionDeck (1343-1358), DeckFavorite (1360-1374)
- `frontend/lib/subscription-helpers.ts`: `isLcsSubscriptionActive` predicate
- `frontend/app/api/auth/me/route.ts`: canonical Bearer-token + Prisma session pattern
- `frontend/app/api/subscription-interest/route.ts`: representative POST + rate-limit + body-parse + JSON-error pattern
- `frontend/contexts/auth-context.tsx`: client-side User shape including subscription
- `frontend/components/homepage-v2/SubscribeCTA.tsx`: gating-on-isLcsSubscriptionActive UI precedent
- `frontend/app/[locale]/topic/[slug]/page.tsx` + `frontend/components/homepage-v2/BreadthGrid.tsx`: catalog-surface deck-card render sites
- `frontend/app/[locale]/**` route tree (20 page.tsx files; relevant subset enumerated below)

## Step 1 — Schema substrate verification

**All three Tool 1 models shipped at commit `9ba9fa2d` match §8.1 spec.** Fields verified one-to-one against §8.1 prose:

### Collection (`schema.prisma:1326-1341`)

| §8.1 field | schema state | Note |
|---|---|---|
| `id String @id @default(cuid())` | ✓ | |
| `teacherId String @map("teacher_id")` | ✓ FK to User.id | |
| `name String` | ✓ | |
| `description String?` | ✓ | |
| `createdAt DateTime` | ✓ | |
| `updatedAt DateTime @updatedAt` | ✓ | |
| Relations | ✓ `teacher User @relation(...)`, back-rel `decks CollectionDeck[]` | |
| `@@index([teacherId])` | ✓ | |
| `@@map("collections")` | ✓ | |

### CollectionDeck (`schema.prisma:1343-1358`)

| §8.1 field | schema state | Note |
|---|---|---|
| `collectionId String @map("collection_id")` | ✓ FK to Collection.id | |
| `deckId String @map("deck_id")` | ✓ FK to Deck.id | |
| `position Int` | ✓ | |
| `addedAt DateTime` | ✓ | |
| `@@id([collectionId, deckId])` | ✓ composite PK — **also enforces uniqueness** preventing duplicate adds | |
| `@@index([collectionId, position])` | ✓ | |
| `@@map("collection_decks")` | ✓ | |

### DeckFavorite (`schema.prisma:1360-1374`)

| §8.1 field | schema state | Note |
|---|---|---|
| `teacherId String @map("teacher_id")` | ✓ FK to User.id | |
| `deckId String @map("deck_id")` | ✓ FK to Deck.id | |
| `favoritedAt DateTime` | ✓ | |
| `@@id([teacherId, deckId])` | ✓ composite PK — uniqueness | |
| `@@index([teacherId, favoritedAt])` | ✓ | |
| `@@map("deck_favorites")` | ✓ | |

**Cascade behavior:** All FKs use `onDelete: Cascade` per the schema. Deleting a User cascade-deletes their Collections (and via Collection cascade, their CollectionDecks). Deleting a Collection cascades to its CollectionDecks. Deleting a Deck cascades to all CollectionDecks pointing at it.

**Back-relations on User + Deck wired** at `schema.prisma:73-76` (User) and `1154-1158` (Deck). Prisma virtual; emit no SQL; available in the regenerated Client.

**Schema diff vs §8.1 spec: zero deltas. No halt.**

## Step 2 — Auth + subscription-gating infrastructure

### `isLcsSubscriptionActive` predicate (`lib/subscription-helpers.ts`)

```ts
export function isLcsSubscriptionActive(session: SessionLikeShape | null | undefined): boolean {
  const sub = session?.subscription;
  if (!sub) return false;
  return sub.status === 'active' && !!sub.lsSubscriptionId;
}
```

Pure function; works server + client. **Two truthy conditions** — `status === 'active'` AND `lsSubscriptionId !== null`. Lemon Squeezy origin filtering keeps legacy Stripe-era data out (per §A.6).

**Consumer sites enumerated:**

| Site | Use |
|---|---|
| `components/homepage-v2/SubscribeCTA.tsx:48` | Branch 3 gate — already-subscribed → "View your subscription" link |
| `components/homepage-v2/SubscribeCTA.tsx:18-19` (referenced via comment) | Branch dispatch logic |
| `app/api/auth/me/route.ts:162` (referenced via comment, used at line 80 via `include: { subscription: true }`) | Session response includes subscription so client can call predicate |
| `contexts/auth-context.tsx:29-30` (comment) | Documents that `subscription.lsSubscriptionId` is the load-bearing field for the predicate |

**Total: 1 active call site (SubscribeCTA branch 3).** Tool 1 is the second consumer family. Pattern is consistent — predicate used client-side after `useAuth()` hook surfaces `user` from `auth-context`.

### Server-side enforcement vs client-side gating

**No existing server-side enforcement of `isLcsSubscriptionActive` on /api/* routes.** All current `/api/*` routes either:
- Don't authenticate (public routes like `/api/health`)
- Authenticate via Bearer token + session lookup (e.g. `/api/auth/me`)
- Authenticate as admin (e.g. `/api/admin/*`, `/api/verify-app-access`, `/api/member/dashboard` post-Pass-8)

**No subscription-tier gate currently exists at the API layer.** Tool 1 is the first feature to introduce it. The API gate pattern Tool 1 will establish: after Bearer-token validation + session lookup + user fetch with `subscription` include, check `isLcsSubscriptionActive(user)` and return `403` if false. This becomes the precedent for future subscriber-only API routes (Tools 2+5+3+4 + Pillar 1 lesson-plan content + Pillar 2 bundle access).

### Grace-period concern (surface for adjudication; not Tool 1-blocking)

`isLcsSubscriptionActive` does NOT honor the 60-day grace period documented in CLAUDE.md §7 + SUBSCRIPTION-SCOPE.md. During grace, status may flip to `past_due` or `canceled`, but per spec subscriber features should remain accessible until `gracePeriodEndsAt` (User column) elapses.

Current predicate gates strictly on `status === 'active'`, so a grace-period subscriber would lose access immediately on status change — contradicting spec.

**This is a doctrine-level wart, not Tool 1-introduced.** Surface for separate adjudication; do NOT silently fold a fix into Tool 1's commission. Tool 1 inherits the existing predicate behavior either way.

### SubscribeCTA wiring intact (§17.2 preservation)

Confirmed at `SubscribeCTA.tsx:6` — imports `SUBSCRIPTION_PRODUCT` from `@/config/lemonsqueezy-product-config` (singular config). Branch 3 routes already-subscribed users to `/member` per `:50`. Tool 1 must not modify this wiring; if Tool 1's non-subscriber affordance routes to a SubscribeCTA-equivalent, it should consume the same `SUBSCRIPTION_PRODUCT.buyNowUrl`, not introduce a new product config path.

## Step 3 — Catalog-browse + deck-page surface inventory

**Where deck cards currently render in the codebase:**

| Surface | File | Affordance attaches? |
|---|---|---|
| Topic page deck-grid | `app/[locale]/topic/[slug]/page.tsx:237-289` (3 `<a>` per card: thumbnail, title, "Play online") | ✅ YES — Next.js-rendered, React component; per-card affordance trivially adds |
| Home page Section 2 (BreadthGrid) — non-featured tiles | `components/homepage-v2/BreadthGrid.tsx:62-86` (plain `<a>` per tile) | ⚠ MAYBE — currently positioned as "demonstration grid, not a catalog browser" per HOMEPAGE-SAVE-STATE.md. Adding affordance per-tile risks turning it into a catalog browser, which contradicts the locked positioning. **UX adjudication question (Step 6 below).** |
| Home page Section 2 — featured tile | `components/homepage-v2/FeaturedDeckTile.tsx` (button → modal-iframe with deck.html inside) | ⚠ MAYBE — affordance could attach on the tile button (before click) OR inside the modal header (post-click). Both add UX friction to the inline-play primary action. **UX adjudication question.** |
| Deck.html (the actual deck page) | nginx-served static at `/var/www/lcs-media/decks/<locale>/<slug>-vN/deck.html` per §15.7 | ❌ NO — pure static HTML, no React mount points, no client-side auth context. Tool 1 affordance physically cannot attach here without restructuring §15.7's nginx-vs-Next.js routing contract. |

**Future surfaces** (don't yet exist; out-of-Tool-1-scope):
- Faceted browse `/[locale]/decks/?<filters>` — placeholder Footer reference; route doesn't exist (per docs Pass 7b filed deferred).
- Search results page — doesn't exist.
- Related-decks rows on topic pages — deferred per Pass 7b.
- Next.js wrapper for deck-detail page — would conflict with §15.7's nginx-served convention; not anticipated.

### Affordance-attachment plan that falls out

- **Tool 1 minimum scope: topic-page deck cards.** Topic page already renders deck cards via Next.js with `<a href={deckLinkFor(deck)}>` shape. Adding an "Add to collection" button next to the existing "Play online" + "Print PDF" links is a per-card additive change.
- **Home page Section 2 affordance — defer to a UX-adjudication Step 6 question.** Operator may want the demonstration-grid posture preserved (no affordance), or may want the affordance added with a positioning concession.
- **Deck.html surface gap is structural.** A subscriber playing a deck via deck.html cannot "Add to collection" from inside the deck — they have to go back to the catalog browse / topic page. This is a known constraint of the nginx-static-deck-page architecture; not a Tool 1 problem to fix.

## Step 4 — API route plan

### Existing /api/* convention (precedent)

From `app/api/auth/me/route.ts` + `app/api/subscription-interest/route.ts`:

```ts
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // 1. Auth: Bearer token from Authorization header
  const token = extractBearerToken(request.headers.get('authorization'));
  if (!token) return NextResponse.json({ error: 'No authentication token' }, { status: 401 });

  // 2. Verify token + session existence
  const payload = verifyAccessToken(token);
  if (!payload) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });

  const session = await prisma.session.findFirst({
    where: { token, userId: payload.userId, expiresAt: { gt: new Date() } },
  });
  if (!session) return NextResponse.json({ error: 'Session expired or revoked' }, { status: 401 });

  // 3. Sliding session expiry update (omit for read-only routes; required for activity)
  // 4. Fetch user with subscription include
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { subscription: true },
  });

  // 5. Subscription gate (NEW for Tool 1)
  if (!isLcsSubscriptionActive(user)) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
  }

  // 6. Domain logic
  const collections = await prisma.collection.findMany({ ... });
  return NextResponse.json({ collections });
}
```

Body-parse + rate-limit + JSON-error patterns from `subscription-interest/route.ts`. Both consistent — Tool 1 routes follow this shape.

### Tool 1 routes enumerated

| Method | Path | Purpose | Body / params | Pattern match |
|---|---|---|---|---|
| POST | `/api/collections` | Create collection | `{ name: string, description?: string }` | ✓ matches subscription-interest POST shape |
| GET | `/api/collections` | List user's collections (with deck counts) | — | ✓ matches auth/me GET shape |
| PATCH | `/api/collections/:id` | Rename / update description | `{ name?, description? }` | ✓ standard REST |
| DELETE | `/api/collections/:id` | Delete collection (cascades to CollectionDeck rows) | — | ✓ standard REST |
| POST | `/api/collections/:id/decks` | Add deck to collection | `{ deckId: string, position?: number }` | ✓ |
| DELETE | `/api/collections/:id/decks/:deckId` | Remove deck from collection | — | ✓ |
| PATCH | `/api/collections/:id/decks/:deckId` | Reorder within collection | `{ position: number }` | ✓ |

**7 routes total.** All follow the existing convention. All require: Bearer-token auth + session lookup + `isLcsSubscriptionActive` gate + Prisma write/read + ownership check (verify Collection.teacherId === userId before any update/delete).

**Rate limiting:** Add a per-user limiter for write-heavy endpoints (POST `/api/collections`, POST `/api/collections/:id/decks`). The existing `lib/rate-limiter.ts` is per-IP — could be extended per-user, or Tool 1 adds a new per-user limiter sibling.

**Ownership-check pattern:** Existing routes don't have an established "row owned by current user" pattern (auth/me returns the user's own data; admin routes check isAdmin). Tool 1 introduces this — `prisma.collection.findUnique({ where: { id, teacherId: userId } })` returning 404 (not 403) on mismatch is the standard pattern. **Surface for adjudication:** 404-on-mismatch (hides existence; standard) vs 403-on-mismatch (acknowledges existence; sometimes preferred for user-friendly errors).

## Step 5 — Page-level Next.js routes

### Routes to add

| Path | Purpose | SEO posture |
|---|---|---|
| `frontend/app/[locale]/collections/page.tsx` | Subscriber's collection list | `noindex` per §17.4 — subscriber-only; should NOT appear in sitemap.ts |
| `frontend/app/[locale]/collections/[collectionId]/page.tsx` | Single collection view + manage | `noindex` |

### CLAUDE.md §4.3 spec divergence

CLAUDE.md §4.3 lines 110 + 431 specify `/[locale]/catalog/my-decks/page.tsx` as the unified "My Decks" page covering "favorited decks (free users) plus collections, embed configs, and saved parent notes (subscribers)" — i.e., **one page covers everything**.

Prompt for this pass implies separate `/collections/` page (and `/collections/[collectionId]/`).

**Doctrine divergence — UX adjudication question.** Either:
- **Option α — follow §4.3 spec.** Build `/[locale]/catalog/my-decks/page.tsx` as a unified surface; collections live as a section within it; per-collection page is `/[locale]/catalog/my-decks/collections/[id]/`.
- **Option β — follow prompt's separation.** Build `/[locale]/collections/` + `/[locale]/collections/[id]/` as standalone routes; CLAUDE.md §4.3 spec gets amended in a subsequent doctrine-hygiene pass to reflect per-feature pages.
- **Option γ — both.** Build standalone `/[locale]/collections/` for the collections feature; defer the unified-My-Decks-page to a later pass that bundles collections + favorites + embed configs together. §4.3 stays as future-state spec.

Recommendation: **Option β or γ** — Tool 1 alone doesn't carry "everything-the-teacher-owns"; Tools 2+5 + future Pillar 1/2 surfaces all want to attach to a workspace shell. A unified My Decks page makes sense as a Tool 2 (Workspace home) deliverable, not Tool 1's responsibility. Tool 1 ships standalone `/collections/` routes; Tool 2 introduces the workspace nav that points at them.

### Locale-prefix vs user-scoped collection note

Collections are user-scoped, NOT locale-scoped. The same User has the same collections regardless of which locale prefix they're viewing under. Per Pass 7b convention, the locale prefix governs UI strings + footer presence; the underlying data is user-scoped.

Implementation pattern: `/en/collections/` and `/de/collections/` both render the same user's collections, just with locale-specific UI strings (i18n via `useTranslations('collectionsPage')` or similar). No locale parameter on Collection model.

This is consistent — Tool 1 doesn't introduce any new locale-vs-user-scope tension. Cross-locale deck inclusion in a single Collection is a separate question (Step 6 below).

## Step 6 — UX adjudication questions (open for copilot decision)

Surface only; do NOT resolve.

### Q-a — Non-subscriber affordance posture

When a non-subscriber views a deck card, what happens with the "Add to collection" affordance?

- **Option I:** Affordance hidden entirely. Non-subscribers never see it.
- **Option II:** Affordance visible; click triggers a SubscribeCTA-equivalent modal/redirect.
- **Option III:** Affordance visible with a subscriber-only label (lock icon / tooltip); click does nothing or opens the SubscribeCTA-equivalent.

§3 acquisition flywheel rationale: the free experience must be substantively complete (per docs/SUBSCRIPTION-SCOPE.md "free/paid boundary discipline"). Hiding affordance entirely keeps free-tier UX uncluttered. Showing it with subscribe-prompt creates conversion friction for non-subscribers (mild) but signals the feature exists (positive for activation).

### Q-b — Collection privacy and shareability

Are collections (i) strictly private to the owner, (ii) optionally shareable via link, (iii) public-by-default with privacy toggle?

docs/SUBSCRIPTION-SCOPE.md Pillar 3 Tool 1 description (line 123) doesn't commit to a posture. SUBSCRIPTION-SCOPE.md Pillar 4 commits embedding to free for all — analogous question for collections doesn't carry the same flywheel rationale (collections are organizational, not distributional like embeds).

Schema doesn't constrain — Collection has no `isPublic`/`shareSlug`/`viewerToken` field. Adding shareability post-launch would be a schema extension.

### Q-c — Cross-locale deck inclusion

Can a single Collection contain decks from multiple locales (en + de + fr decks coexisting in "Week 3 — Animals"), or is each Collection locale-scoped (separate collections per locale)?

Schema doesn't constrain — `CollectionDeck.deckId` references any Deck; locale not part of the join. Purely a UX policy choice.

For dual-language teachers, cross-locale inclusion is the natural posture (they teach Spanish + English; their Halloween collection has decks from both). For monolingual teachers, locale-scoped feels cleaner (smaller collections; less locale clutter).

### Q-d — Default landing + nav affordance

When a subscriber wants to access their collections, how do they get there? Tool 2 (Workspace home) will own the workspace nav surface, but Tool 2 ships AFTER Tool 1 per the locked sequencing 1→2→5→3→4.

- **Option I:** Tool 1 ships ZERO nav affordance to `/collections/`. Subscriber reaches it only via in-card "Add to collection" → "View collection" inline link, OR by typing the URL. Until Tool 2 ships.
- **Option II:** Tool 1 ships a minimal Navigation entry pointing to `/collections/` (e.g., in the existing Navigation component for authenticated subscriber state). Tool 2 later replaces or evolves it.

### Q-e — Empty-state UX on `/collections/`

New subscribers have zero collections. What does `/collections/` render?

- **Option I:** Illustrated empty-state with "Create your first collection" CTA + brief explainer.
- **Option II:** Minimal empty-state; just a "+ New collection" button.
- **Option III:** Blank slate — no UI; the affordance to first add-to-collection lives only on the catalog browse surface; `/collections/` is empty until non-empty.

### Q-f — Localization scope at Tool 1 launch

Tool 1 strings authored for which locales?

- **Option I:** Tier 1 (en + de) consistent with home page + topic pages. Matches per-locale en+de cadence discipline established at the home page recovery pass (commit `a06cd835`).
- **Option II:** EN-only at first; DE follows in a subsequent pass. **Anti-pattern** per F1 of `project_homepage_revision_recon.md` — DE i18n pre-existing collapse is exactly the F1-shape problem; should not collapse again.

### Q-g — Reorder UX mechanic

Drag-and-drop, up/down arrows, manual position-number input?

- **Option I:** Drag-and-drop (HTML5 drag-and-drop API or a library like `@dnd-kit`). Most natural; high implementation cost; touch-device support requires care.
- **Option II:** Up/down arrow buttons per row. Simpler; works everywhere; clunkier UX.
- **Option III:** Manual position-number input. Simplest; ugliest.
- **Option IV:** Defer reordering entirely from Tool 1 v1. Ship without reorder; add when teacher feedback requests it. Doesn't violate any §8.1 spec contract — the `position` column already exists; re-ordering UX can layer on later.

### Q-h (additional, surfaced during recon) — Page route shape per §4.3 vs prompt

§4.3 spec puts collections in `/[locale]/catalog/my-decks/page.tsx` (unified). Prompt implies standalone `/[locale]/collections/`. See Step 5 above. Adjudication options α/β/γ.

## Step 7 — Out-of-scope guardrails (re-stated)

This recon does NOT touch:
- Tools 2 (Workspace home), 3 (Advanced filtering), 4 (Curriculum mapping), 5 (Bulk operations) application-layer scope.
- Pillar 1 (lesson plans) or Pillar 2 (bundles) authoring or schema.
- Phase-3 bulk deck creation.
- Subscription launch / Notify-me flag flip — feature flag remains `notify_me` until `docs/SUBSCRIPTION-SCOPE.md` "Launch readiness" thresholds met.
- Existing tables, existing migrations, existing /api/* routes, auth flow, Lemon Squeezy integration.
- Grace-period predicate amendment (surfaced in Step 2; separate doctrine question).

## Halt-and-surface findings

- **HAS-1 (informational, not blocking):** `isLcsSubscriptionActive` does not honor the 60-day grace period documented in CLAUDE.md §7. Tool 1 inherits the existing predicate; should NOT silently introduce grace-period handling. File for separate adjudication.
- **HAS-2 (informational, not blocking):** CLAUDE.md §4.3 spec puts collections under unified `/catalog/my-decks/` page. Prompt implies standalone `/collections/`. Surface for Step 6 Q-h adjudication.
- **HAS-3 (informational, not blocking):** No existing /api/* route enforces `isLcsSubscriptionActive` server-side. Tool 1 introduces this enforcement as a precedent for all future subscriber-only API routes (Tools 2+5+3+4 + Pillar 1/2 content access). The pattern Tool 1 establishes will be cited by all subsequent commission passes.

No blocking halts. Schema substrate is clean. Auth + subscription-gating infrastructure is well-defined and ready for Tool 1 to consume + extend.

## Summary table for plan-pass adjudication

| Concern | State | Plan-pass scope question |
|---|---|---|
| Schema substrate | ✓ ready (commit `9ba9fa2d`) | none |
| Subscription predicate | ✓ ready, single existing consumer | grace-period wart filed separately |
| Subscriber-API gate pattern | NOT YET — Tool 1 establishes | Establish 403-on-non-subscriber convention |
| Affordance attachment | topic-page deck cards (clear); home Section 2 (Q-a-ish UX call); deck.html cannot attach | Decide attach scope |
| API routes | 7 routes; pattern matches existing | Establish ownership-check return-shape (404 vs 403) |
| Page routes | 2 pages; standalone or unified-My-Decks (Q-h) | α/β/γ adjudication |
| Locale handling | user-scoped data, locale-scoped UI strings | none (clean) |
| Cross-locale collections | schema-permissive | Q-c UX policy |
| UX questions | 7 enumerated (Q-a through Q-h) | Adjudicate all before commission |

**If Q-a through Q-h resolve as recommended (Option β for routes, Option I or II for non-subscriber affordance, etc.):** commission pass implements 7 API routes + 2 page routes + per-card affordance on topic pages + i18n strings in en+de + ownership-check + subscription-gate convention establishment. Single commit feasible if scope stays bounded; may split per single-commit-single-deploy hard constraint if i18n authoring + UI work + 7 API routes exceed one commit's worth.
