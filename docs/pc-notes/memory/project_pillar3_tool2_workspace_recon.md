---
name: Pillar 3 Tool 2 (Workspace home) — application-layer commission recon
description: Recon-only snapshot for Tool 2. Surfaces schema substrate state for DeckFavorite + Collection + CollectionDeck + PlayLink, sign-in redirect inventory, recent-activity data-source inventory (with one critical gap), and 6 open UX adjudication questions (Q-i through Q-n). Drives the subsequent Tool 2 implementation pass. Out-of-tree per CLAUDE.md §10.4.
type: project
originSessionId: b1fc4fb5-c078-4a51-a4e1-b3680342e11b
---
# Pillar 3 Tool 2 (Workspace home) — recon at commit `53519e0c`

## Inputs read

- `memory/project_pillar3_tool1_collections_recon.md` — Tool 1A recon for inheritance patterns
- CLAUDE.md (in-tree at `53519e0c`): §3, §7, §8.1 DeckFavorite/Collection/CollectionDeck/PlayLink specs, §10.3, §15.7, §17.4
- `docs/SUBSCRIPTION-SCOPE.md` (in-tree at `fbff3466`): Pillar 3 Implementation order (locked) + Essential tools sub-section
- `frontend/prisma/schema.prisma` post-`9ba9fa2d`: lines 1290-1371 (PlayLink, Collection, CollectionDeck, DeckFavorite)
- `frontend/lib/subscriber-api-gate.ts` (commit `53519e0c`)
- `frontend/app/api/collections/*` (commit `53519e0c`) — 4 route files, pattern-precedent for Tool 2 API routes
- `frontend/app/[locale]/collections/*` (commit `53519e0c`) — 2 page files + 2 client components, pattern-precedent
- `frontend/components/catalog/AddToCollectionButton.tsx` (commit `53519e0c`) — per-card subscriber-only affordance pattern
- `frontend/components/layout/Navigation.tsx` (commit `53519e0c`) — nav hosting + current "Collections" entry
- `frontend/messages/{en,de}.json` `collections.*` namespace (53 keys × 2 locales) — i18n authoring pattern
- `frontend/app/[locale]/auth/signin/signin-client.tsx` — redirect target enumeration
- `frontend/contexts/auth-context.tsx` — login()/signup() redirect logic

## Step 1 — Schema substrate verification

All four models (DeckFavorite, Collection, CollectionDeck, PlayLink) match §8.1 spec. Field-level diff: zero deltas.

### DeckFavorite (`schema.prisma:1360-1371`)

| §8.1 field | schema state | Note |
|---|---|---|
| `teacherId String @map("teacher_id")` | ✓ | FK to User.id |
| `deckId String @map("deck_id")` | ✓ | FK to Deck.id |
| `favoritedAt DateTime` | ✓ | **`favoritedAt`, not `createdAt`** — prompt referenced `DeckFavorite.createdAt`; actual field is `favoritedAt`. Queryable timestamp for "recently favorited" widget. |
| `@@id([teacherId, deckId])` | ✓ | Composite PK enforces uniqueness — prevents duplicate favorites |
| `@@index([teacherId, favoritedAt])` | ✓ | Index on (teacherId, favoritedAt) directly supports "list user's favorites by recency" + "recent activity feed" queries |
| `@@map("deck_favorites")` | ✓ | |

### Collection (`schema.prisma:1326-1339`) + CollectionDeck (`1343-1355`)

Already verified at Tool 1A recon. Re-confirmed:
- `Collection.updatedAt @updatedAt` — auto-tracked; queryable for "last-modified collections" widget.
- `CollectionDeck.addedAt` — queryable for "recently added to collection" widget.
- `@@index([teacherId])` on Collection — supports list-user's-collections-recently-modified.
- `@@index([collectionId, position])` on CollectionDeck — supports per-collection ordering (Tool 1B reorder dependency, not Tool 2).

### PlayLink (`schema.prisma:1305-1319`)

| §8.1 field | schema state |
|---|---|
| `id String @id @default(cuid())` | ✓ |
| `linkId String @unique @db.VarChar(10) @map("link_id")` | ✓ — 10-char public ID |
| `deckId String @map("deck_id")` | ✓ FK to Deck.id |
| `teacherId String @map("teacher_id")` | ✓ FK to User.id |
| `embedConfigId String?` | ✓ nullable; SetNull on EmbedConfig delete |
| `createdAt DateTime` | ✓ |
| `@@index([teacherId])` | ✓ |

**Critical semantic note:** PlayLink rows record **link generation** (teacher action — when the teacher created a shareable link), NOT play events (student action — when a student played the deck). `PlayLink.createdAt` answers "when did this teacher generate this link?" not "when was this deck last played?" — the play event itself is purely client-side per CLAUDE.md §4.4 ("Student interactions never touch the server during play. CDN caching means viral decks become free.").

This is **load-bearing for Step 3** (recent-activity inventory): "Recently played decks" CANNOT be derived from existing schema. Would require net-new event-tracking infrastructure.

**Schema diff vs §8.1 spec: zero deltas. No halt.**

## Step 2 — Sign-in flow + post-sign-in redirect inventory

### Current redirect target

| Surface | Default redirect target |
|---|---|
| `signin-client.tsx:199` (post-credential-login success) | `${redirect || \`/${locale}/dashboard\`}` |
| `signin-client.tsx:296` (post-force-signin success) | `${redirect || \`/${locale}/dashboard\`}` |
| `signin-client.tsx:178` (post-checkout success after billing flow) | LS checkout URL |
| `auth-context.tsx:294` (login() default) | `/${locale}/dashboard` |
| `auth-context.tsx:354` (signup() default) | `/${getCurrentLocale()}/dashboard` |
| `auth-context.tsx:574` (post-checkAuth refresh) | `/${getCurrentLocale()}/dashboard` |

`/dashboard` exists at `frontend/app/[locale]/dashboard/page.tsx` and is a 5-line redirect to `/member/dashboard` (commit `53519e0c` state).

`/member/dashboard` is **admin-only** as of Pass 8 of the seller-era teardown (commit `7c24630e` per CLAUDE.md §17.2). Non-admin sees redirect to `/`.

### Effective post-sign-in flow today

For a non-admin user (covers all subscribers; admin is operator-only):

```
Sign in → /[locale]/dashboard → redirect to /member/dashboard
       → /member/dashboard checks isAdmin → not admin → redirect to /
       → User lands on home page
```

**Functional but ugly UX.** A subscriber who just signed in lands back at the marketing home page rather than at any subscriber-specific surface. Tool 2's `/workspace` would naturally take over this redirect target — that's the point of Tool 2 (subscriber landing surface).

### Q-l implications

- **Option I (change redirect to /workspace for everyone):** modifies `auth-context.tsx:294 + 354 + 574` + `signin-client.tsx:199 + 296`. Each is a `router.push()` line. Six total touch points. Functional improvement for subscribers; non-subscriber-user flow goes /workspace → "subscribe to access" gate UI per Tool 1A precedent. Acceptable.
- **Option II (keep current target, /workspace independently discoverable):** zero auth-flow changes. /workspace reachable only via the new nav entry. Subscriber post-sign-in still lands at home (current broken state).
- **Option III (subscriber-only redirect change):** requires gating logic in auth-context.tsx — read user's subscription state and branch redirect target. Higher complexity; requires touching auth-flow code with conditional logic. **§10.3 boundary risk** — modifying auth flows requires explicit approval; surface for adjudication.

**Recommendation: Option I.** Existing redirect to `/dashboard` is broken post-Pass-8 for non-admin users (lands at home via redirect chain). Changing to `/workspace` fixes the broken state for subscribers + leaves non-subscriber-user flow at the gate UI (already-rendered Tool 1A pattern). Six `router.push()` lines is mechanical.

**Also note:** the current redirect chain landing at home for non-admin sign-in is itself a pre-existing wart — surface as informational for separate doctrine-hygiene tracking.

### HALT-AND-SURFACE

**HAS-Tool-2-1:** post-sign-in redirect chain is currently broken for non-admin users (lands at home via /dashboard → /member/dashboard → / chain). Tool 2 can fix this by changing the redirect target to `/workspace`, but this modifies auth-flow code (not just adds new code). Adjudicate via Q-l before commission.

## Step 3 — Recent-activity data-source inventory

For each candidate "recent activity" data type:

| Data type | Queryable from existing schema? | Source | Notes |
|---|:-:|---|---|
| Recently played decks | ❌ NO | n/a | PlayLink records LINK GENERATION not play events. Student plays are pure client-side per §4.4. Net-new event-tracking infrastructure required (PlayEvent table or analytics integration). |
| Recently favorited decks | ✅ YES | `DeckFavorite` order by `favoritedAt desc` | Direct use of existing `@@index([teacherId, favoritedAt])`. |
| Recently collected decks | ✅ YES | `CollectionDeck` order by `addedAt desc` (joined to Collection for teacherId scope) | One join hop; clean query. |
| Recently visited topic pages | ❌ NO | n/a | Not recorded. Net-new schema required. |
| Last-modified collections | ✅ YES | `Collection` order by `updatedAt desc` | Tool 1A's GET /api/collections already orders this way; pattern reusable. |
| Recently generated share links | ✅ YES | `PlayLink` order by `createdAt desc` | Different from "recently played" — records teacher's link-generation activity, not student-play activity. |

### Q-k implications

- **Option I (Combined recent-activity widget):** pulls from DeckFavorite + CollectionDeck + Collection.updatedAt + PlayLink.createdAt. **All four sources queryable.** Heterogeneous union returning normalized `{type, deckId | collectionId, when}` rows. Slightly complex backend query; UI presents a chronological feed. **Caveat:** "recently played" ≠ "recently generated share link"; widget framing must avoid implying student-play data.
- **Option II ("Recently added to collections" only):** simplest; CollectionDeck.addedAt joined to Collection for teacherId scope. Marginal value vs the collections widget already showing recent collections by updatedAt.
- **Option III ("Last-modified collections" only):** simplest alternative; Collection.updatedAt. Already partially surfaced by the existing collections widget (Tool 1A list view orders by updatedAt desc) — would be redundant.
- **Option IV (Recent-activity scope-OUT for Tool 2):** ship workspace home with collections + (optionally) favorites widgets only; recent-activity defers entirely.

**Recommendation: Option I or Option IV.** Options II/III add little marginal value over the collections widget itself. Option I delivers a meaningful "what have I been doing" feed; Option IV ships smaller scope with cleaner Tool 2 close-out.

If Option I picked, framing must be teacher-action-specific: "Your recent activity" or "Recent updates" — never "Recently played" (which implies student-play data we don't have).

## Step 4 — Tool 2 page + API scope inventory

**Assuming Q-i = β (collapse Collections into Workspace), Q-j = I (favorites scope-IN), Q-k = I (combined recent-activity widget), Q-l = I (change post-sign-in redirect):**

### Pages

- **`frontend/app/[locale]/workspace/page.tsx`** — server component shell, noindex metadata.
- **`frontend/app/[locale]/workspace/WorkspaceClient.tsx`** — client component. Assembles Collections widget + Favorites widget + Recent activity widget. Subscriber-gated (same Tool 1A page-level gate pattern).

If Q-i = α/γ (keep Collections nav entry), the existing `/[locale]/collections/*` files at commit `53519e0c` stay untouched. If Q-i = β, the Collections nav entry is removed but the page routes stay (reachable from workspace home as `/[locale]/collections/`).

### API routes

**Single endpoint approach** (recommended):
- **GET /api/workspace** — returns combined payload `{ collections: [...], favorites: [...], recentActivity: [...] }`. Single fetch from WorkspaceClient. Avoids 3 round-trips.

**Multi-endpoint alternative:**
- GET /api/favorites + reuse GET /api/collections + GET /api/workspace/recent-activity (3 endpoints).
- More cacheable individually; more network round-trips.

### Favorite affordance API routes (if Q-j = I scope-IN)

- **POST /api/favorites** — body `{ deckId }`. Composite-PK uniqueness via DeckFavorite `@@id([teacherId, deckId])` — 409 on duplicate.
- **DELETE /api/favorites/:deckId** — idempotent (200 even if not favorited; mirror Tool 1A's CollectionDeck DELETE pattern).
- **GET /api/favorites** — list user's favorites by `favoritedAt desc` with deck refs (or fold into GET /api/workspace as `favorites` field).

If GET /api/workspace is single-endpoint, the GET /api/favorites is redundant for the workspace view but useful for the dedicated favorites surface (no current scope; could ship later as Tool 2C if operator wants standalone /favorites/ page).

### Components

- **`frontend/components/catalog/FavoriteToggleButton.tsx`** — per-card affordance, mirrors `AddToCollectionButton.tsx` pattern. Heart-icon toggle; subscriber-only render (per Q-a Option I precedent from Tool 1A). POST + DELETE; optimistic UI; revert on 409 or network error.
- **Topic-page deck cards** — modify `frontend/app/[locale]/topic/[slug]/page.tsx` to add `<FavoriteToggleButton deckId={deck.id} />` next to existing `<AddToCollectionButton>`. One-line addition per card.

### Workspace widgets (UI components inside WorkspaceClient)

- `<CollectionsWidget collections={...} />` — list of recent collections; "+ New collection" CTA; "View all" link to /[locale]/collections/.
- `<FavoritesWidget favorites={...} />` (if scope-IN) — grid of recent favorites; per-card "Remove from favorites" affordance; deck links.
- `<RecentActivityWidget items={...} />` (if scope-IN) — chronological feed of teacher actions.

Each widget renders empty state per Q-n adjudication.

### Navigation modification

- **Add "Workspace" nav entry** subscriber-gated (per Tool 1A pattern + Q-d Option II precedent).
- **Q-i β scope:** remove the existing "Collections" nav entry (Tool 1A's standalone entry); /collections becomes reachable via Workspace home's "View all" link.
- **Q-i α scope:** keep "Collections" + add "Workspace" (two top-level subscriber entries).
- **Q-i γ scope:** same as α but framed as "Workspace primary, Collections secondary."

### i18n

- New `workspace.*` namespace (en + de Tier 1) — meta + page header + 3 widget sub-namespaces (collections, favorites, recentActivity) + empty states + gate UI.
- New `favorites.*` namespace (en + de) — toggle label, picker affordance, alreadyFavorited state, errors. Or fold into `collections.addAffordance` peer-namespace `favorites.affordance` — pick one pattern.
- New `navigation.workspace` key (en + de).
- If Q-i = β: existing `navigation.collections` key stays in messages but unused at top-level nav. Could remove or leave for the in-page "View all collections" link.

### Estimated commit-scope feasibility

| Item | Count |
|---|---|
| New API routes | 1-3 (GET /api/workspace + 0-2 favorite routes) |
| Modified API routes | 0 |
| New pages | 1 (workspace) |
| New components | 1-3 (Workspace + 0-2 favorite-related) |
| Modified components | 2 (Navigation, topic-page deck cards) |
| New i18n strings | ~50-100 keys × 2 locales |
| Deferred-queue filings | 1+ (deploy.sh wart per Step 8) |

**Single-commit feasibility:** likely yes if Q-j = II (favorites scope-OUT) — Tool 2 ships as workspace home + collections widget + recent-activity widget; no per-card favorite affordance work. If Q-j = I (favorites scope-IN), scope grows by 2-3 API routes + per-card affordance + favorites widget + favorites i18n — probably still feasible single-commit but trending toward "may split per §9."

**Recommendation: split if scope gets uncertain.** Tool 2A = workspace home + collections widget + recent-activity widget + post-sign-in redirect. Tool 2B = favorite-toggle affordance + favorites widget. Two clean commits if needed.

## Step 5 — Decisions surfacing for adjudication

### Q-i — Tool 1A nav entry restructure

- **α:** Keep standalone "Collections" + add "Workspace" — two top-level subscriber entries.
- **β:** Collapse "Collections" → "Workspace"; /collections reachable via workspace home only.
- **γ:** Both, with /workspace as primary subscriber landing.

### Q-j — Favorites scope at Tool 2

- **I:** Scope-IN. DeckFavorite affordance + Favorites widget commission this pass.
- **II:** Scope-OUT. Tool 2 ships collections + recent-activity only; favorites defers to Tool 2B.

### Q-k — Recent activity widget scope

- **I:** Combined widget (DeckFavorite.favoritedAt + CollectionDeck.addedAt + Collection.updatedAt + PlayLink.createdAt). Heterogeneous chronological feed. **All four sources queryable.**
- **II:** "Recently added to collections" only.
- **III:** "Last-modified collections" only.
- **IV:** Recent-activity scope-OUT.

### Q-l — Post-sign-in redirect

- **I:** Change to /workspace for everyone (6 touch points; Tool 1A gate UI handles non-subscribers).
- **II:** Keep current target; /workspace independently discoverable. Doesn't fix the post-Pass-8 broken-redirect-chain wart.
- **III:** Subscriber-only redirect change (conditional logic in auth-context). Higher complexity; §10.3 boundary risk. Surface for explicit approval if picked.

### Q-m — Layout pattern

- **I:** Vertical stack — single column, mobile-first.
- **II:** Two-column desktop / single mobile — collections left + (favorites + recent-activity) right.
- **III:** Dashboard grid — multi-column widget cards.

### Q-n — Empty state

- **I:** Per-widget empty states.
- **II:** Whole-page welcome + "Browse the catalog" CTA until any signal exists.
- **III:** Hybrid — page header + welcome + per-widget empty states.

## Step 6 — SEO posture confirmation

`/[locale]/workspace` = subscriber-only = **noindex** per §17.4. Tool 1A pattern applies verbatim:
- `metadata.robots: { index: false, follow: false }` in server-component `page.tsx`.
- Not added to `frontend/app/sitemap.ts` `staticPages` array.
- Verified at production curl post-Tool-1A: `<meta name="robots" content="noindex, nofollow"/>` + 0 `/collections` paths in sitemap.

Same posture for `/[locale]/workspace`. No deviation.

## Step 7 — Out-of-scope guardrails

This recon does NOT touch:
- Tools 5, 3, 4 application-layer scope.
- Tool 1B (collection deck reorder).
- Pillar 1, Pillar 2 authoring or schema.
- Phase-3 bulk deck creation.
- Subscription launch / Notify-me flag flip.
- Auth-flow modifications beyond Q-l adjudication.
- Existing Tool 1A artifacts beyond Q-i nav restructure decision + (potentially) Q-l redirect target change.
- Net-new event-tracking schema for "recently played" data (deferred indefinitely; no Tool 2 scope).

## Step 8 — Operational filings to surface

### deploy.sh Prisma Client regeneration wart

At Tool 1A commission (commit `53519e0c`), the production deploy failed on first attempt because the Prisma Client (`node_modules/@prisma/client` generated TypeScript types) was stale: `npm ci` wiped node_modules; `next build` ran before any `prisma generate` step; build failed on `Property 'collectionDeck' does not exist on type 'PrismaClient'`. Recovery: SSH'd in, ran `npx prisma generate` manually, re-ran `deploy.sh` — second attempt clean.

This is an **operational wart**, not Tool 1A or Tool 2 scope. Should be filed as a deferred-queue entry. Recommended fold-in: Tool 2 commission's "filed deferred entries" section can include this as one of the 1+ filings (no additional code scope).

**Resolution path when picked up:** amend `deploy.sh` to insert `npx prisma generate` between `npm ci` and `next build` (or as an `npm postinstall` hook in `package.json`). Either approach idempotent and zero-risk.

### Other operational/doctrine surfaces (informational, not for filing)

- **Pre-Pass-8 broken sign-in redirect chain.** /dashboard → /member/dashboard → / for non-admin. Q-l Option I fixes this at Tool 2; if Q-l = II/III the wart persists separately. Worth noting as part of Q-l adjudication context, not a separate filing.

## Halt-and-surface findings

- **HAS-Tool-2-1 (informational, surfaced):** post-Pass-8 sign-in redirect chain lands non-admin users at home (broken UX). Tool 2 Q-l Option I fixes this by retargeting to /workspace. Q-l Option III modifies auth-flow code with conditional logic (§10.3 boundary risk).
- **HAS-Tool-2-2 (informational, surfaced):** "Recently played decks" widget IMPOSSIBLE without net-new event-tracking schema. PlayLink.createdAt records LINK GENERATION (teacher action), not play events (student action; client-side per §4.4). Tool 2's recent-activity widget framing must avoid implying student-play data.
- **HAS-Tool-2-3 (informational):** DeckFavorite uses field name `favoritedAt`, not `createdAt` per the prompt's reference. Verified against §8.1 spec at `schema.prisma:1363`; commission code references `favoritedAt`.

No blocking halts. Schema substrate clean. Auth + subscriber-API gate inheritance from Tool 1A available. Recent-activity sources well-defined modulo "play event" gap.

## Summary table for plan-pass adjudication

| Concern | State | Plan-pass scope question |
|---|---|---|
| Schema substrate | ✓ ready (commit `9ba9fa2d`) | none |
| Subscriber-API gate inheritance | ✓ Tool 1A's `lib/subscriber-api-gate.ts` | reuse + extend pattern |
| Sign-in redirect | broken post-Pass-8 (lands at home) | Q-l adjudication |
| Recently played decks | NOT QUERYABLE — net-new schema required | exclude from recent-activity widget framing |
| Recently favorited / collected / link-generated | ✓ queryable | Q-k Option I uses these |
| Tool 1A nav entry | exists at Navigation.tsx | Q-i restructure |
| Favorites affordance | NOT YET — Tool 2 introduces or defers | Q-j scope-IN/OUT |
| Workspace page route | NOT YET | Tool 2 commissions |
| API routes | 1-5 new (depends on Q-j + GET-shape choice) | scope-feasibility check |
| i18n new namespace | workspace.* + (optionally) favorites.* | en+de Tier 1 per Tool 1A precedent |
| SEO posture | noindex per §17.4 + Tool 1A pattern | none |
| Operational filing | deploy.sh prisma generate wart | fold into Tool 2 commission's deferred filings |

**If Q-i+Q-j+Q-k+Q-l+Q-m+Q-n resolve as recommended (β + I + I + I + minimal layout + III hybrid empty state):** commission pass implements 1 new page + 1 client component + 3 widget sub-components + 1-2 new API routes (GET /api/workspace + favorites routes) + 1 component (FavoriteToggleButton) + per-card affordance wiring + Navigation restructure + ~80-100 i18n keys × 2 locales + 1 deploy.sh deferred filing. Likely single-commit feasible; may split into Tool 2A (page + collections widget + recent-activity widget) + Tool 2B (favorite affordance) per §9 single-commit-single-deploy hard constraint if scope grows during execution.
