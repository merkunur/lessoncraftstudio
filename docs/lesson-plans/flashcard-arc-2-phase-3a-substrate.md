# Pillar 4 Arc 2 Phase 3a — access-control substrate

**Type:** `[BUILD][PILLAR-4]` Phase 3a access-control substrate (subscription-gating layer)
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Phase 3a CLOSED. Phase 3b (UI components + tests) READY at next session.

## 0. Scope

Per Arc 2 spec §3 Phase 3 split: Phase 3a ships substrate (access-control library + access-check API endpoint). Phase 3b ships UI components + subscription-gating tests at next session.

**Phase 3a deliverables:**
1. `frontend/lib/flashcards/access-control.ts` — `canAccessFlashcard()` predicate + `FREE_TIER_FLASHCARD_PACKAGES` allowlist
2. `frontend/app/api/flashcards/access-check/route.ts` — GET endpoint returning `{allowed, reason}`
3. This substrate doc — C5 free-tier-3-package allowlist surface for operator

## 1. Access-control predicate composition

`canAccessFlashcard(packageSlug, session)` composes 3 paths in resolution order:

1. **Free-tier path:** `FREE_TIER_FLASHCARD_PACKAGES.has(packageSlug)` → allowed; reason='free-tier'
2. **Admin-bypass path:** `session.isAdmin === true` → allowed; reason='admin-bypass'
3. **Active-subscription path:** `session.subscription.status === 'active' && session.subscription.lsSubscriptionId !== null` → allowed; reason='subscription'
4. **Default:** allowed=false; reason='gated'

Free-tier path is checked FIRST so anonymous visitors (no session) access the allowlist without authentication. Mirrors §7 + SUBSCRIPTION-SCOPE.md active-LCS-subscription predicate; admin-bypass mirrors `lib/subscription-helpers.ts:isLcsSubscriptionActive` admin short-circuit.

## 2. Access-check API endpoint

`GET /api/flashcards/access-check?package=<slug>` returns:
```json
{ "allowed": true,  "reason": "free-tier" }       // package in allowlist
{ "allowed": true,  "reason": "admin-bypass" }    // session.isAdmin
{ "allowed": true,  "reason": "subscription" }    // active LCS subscription
{ "allowed": false, "reason": "gated" }           // none of above
```

Auth model: Bearer-token optional. Anonymous requests fall through to free-tier-or-gated. Authenticated requests run admin-bypass + active-subscription checks via DB session lookup.

`Cache-Control: public, max-age=300` — uniform 5-min TTL matches §15.7 flashcard CDN block. Subscription-state changes propagate to clients within 5 min (acceptable per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5).

## 3. C5 free-tier-3-package allowlist — operator surface

**Initial picks (CC pre-recommendation):**

| Package | Cluster | Rationale |
|---|---|---|
| `count-objects-1-to-10` | numeracy | Cross-domain representation: math; theme-derived imageSource (works with any animals/objects); broad K-3 appeal; one of the most-reused packages in bundle catalog |
| `identify-and-name-emotions` | personal-social-emotional | Cross-domain representation: SEL; vocabKeyList imageSource (10 emotions); high K-3 utility for multilingual classrooms; SEL is increasingly load-bearing K-3 curriculum |
| `identify-letter-sounds-vowels` | early-literacy | Cross-domain representation: literacy; theme-derived imageSource; phonics foundation; canonical early-K-3 substrate |

**Cluster spread:** math + SEL + literacy = 3 distinct K-3 curriculum domains. Each pick maximally-representative within its domain.

**Operator-strategic decision at Phase 3a close:**
- **(i) Ratify pre-recommendation** — 3 picks above; constant table at access-control.ts ships current
- **(ii) Override 1 pick** — substitute one pre-recommendation for a different package; surface specific pick at next session
- **(iii) Override multiple picks** — substantial re-pick; surface for adjudication
- **(iv) Defer C5 lock** — keep current 3 picks until launch-phase data warrants refinement

CC default: **(i) Ratify pre-recommendation** per adjudicator-forward discipline. Operator override at glance-review surface.

## 4. Constant-table substrate decision (per Phase 0 audit)

Storage decision: **constant table at `frontend/lib/flashcards/access-control.ts`** (option a per Phase 0 audit Dimension 4 framing).

Trade-offs:
- ✓ Simplest substrate (no schema migration)
- ✓ Allowlist change via small code commit (auditable)
- ✓ Fast path (Set.has() O(1) membership check)
- ✗ Cannot dynamically adjust without code deploy
- ✗ Operator-data-driven allowlist changes require commission

Migration to Bundle metadata flag (option b) is future-arc candidate if post-launch signal warrants dynamic allowlist (subscriber-data-driven allowlist optimization). Not in Phase 3a scope.

## 5. Phase 3b deferred (next session)

Per Arc 2 spec §3 Phase 3 remaining deliverables:

1. `frontend/app/[locale]/flashcards/<package-slug>/page.tsx` — per-package flashcard browse + access-gated deck rendering
2. `frontend/components/flashcards/<components>` — browse UI + paywall preview component
3. Subscription-gating tests (unit + integration) — verify free-tier-3 + paid-subscriber + grace-period + lapsed-subscriber paths

Phase 3b commences at next-session paired commencement with Pillar 2 Arc 6 Phase 2.

## 6. Verification

- `frontend/lib/flashcards/access-control.ts` — TypeScript compile clean
- `frontend/app/api/flashcards/access-check/route.ts` — TypeScript compile clean
- Predicate composition mirrors `lib/subscription-helpers.ts:isLcsSubscriptionActive` admin-bypass + active-LCS-subscription paths
- API endpoint shape mirrors `lib/subscriber-api-gate.ts:requireSubscriber` Bearer-auth + session-lookup pattern

## 7. Cross-references

- `frontend/lib/subscription-helpers.ts` (44 LoC; `isLcsSubscriptionActive` predicate; pattern reference)
- `frontend/lib/subscriber-api-gate.ts` (133 LoC; `requireSubscriber` gate; pattern reference)
- `frontend/app/[locale]/lesson-plans/[slug]/page.tsx` (canonical subscriber-gated route example)
- `frontend/app/api/lesson-plans/[slug]/route.ts` (canonical subscriber-API endpoint example)
- `frontend/config/lemonsqueezy-product-config.ts` ($69/year SUBSCRIPTION_PRODUCT)
- `docs/lesson-plans/pillar-4-arc-2-phase-0-substrate-audit.md` (Dimension 3 paid-tier gating territory)
- `docs/lesson-plans/flashcard-arc-2-commission-spec.md` §3 Phase 3
- CLAUDE.md §7 (paid-tier framing) + §A.6 (Lemon Squeezy integration)

---

*End of Phase 3a substrate doc. Standing position: C5 surface for operator pick; Phase 3b (UI + tests) READY at next session.*
