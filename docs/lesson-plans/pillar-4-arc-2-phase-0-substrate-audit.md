# Pillar 4 Arc 2 Phase 0 — substrate audit

**Type:** `[DOCS][PILLAR-4]` substrate-audit recon (analysis only; no production code)
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Phase 0 close — ready for Phase 1 commencement (no operator-strategic blockers surfaced).

## 0. Purpose

Per Phase 6 fold-queue Item 6 (Explore-agent fidelity discipline) + Pillar 4 Arc 2 commission spec (`docs/lesson-plans/flashcard-arc-2-commission-spec.md`) — direct grep + file inspection across 4 substrate dimensions before Phase 1 commencement. Phase 0 verifies the Pillar 4 Arc 1 ship state (commits `64c6e06d` → `da7887d2`) is intact and the substrate is ready for Phase 1 substrate audit + extension work.

## 1. Audit Dimension 1 — `frontend/scripts/generate-flashcards.ts` current state

**State: INTACT. No drift from Arc 1 Phase 5 spec at `da7887d2`.**

- Pipeline entry point at `frontend/scripts/generate-flashcards.ts` (407 LoC). CLI surfaces: `--validation-batch`, `--image <ref>`, `--images <list>`, `--locale <loc>`, `--locales <list>`, `--out <dir>`, `--layouts <6,9>`, `--digital-only`, `--print-only`, `--help`.
- Helper libs: `frontend/scripts/lib/flashcard-data.ts` (10,589 bytes) + `frontend/scripts/lib/flashcard-render.ts` (16,790 bytes). Both intact.
- Output pipeline: per-locale `deck.html` (single-card-focus modal + deck overview) + `print-6up.pdf` + `print-9up.pdf` per Sky+v2 design canonical.
- `VALIDATION_BATCH_IMAGES` (12 images) + `VALIDATION_BATCH_LOCALES` (`en + de + fi + es + it + nl`) per Arc 1 ratification constraints.
- Validation-batch output present at `docs/lesson-plans/flashcard-validation-batch/{en,de,es,fi,it,nl}/{deck.html,print-6up.pdf,print-9up.pdf}` + `README.md`.
- File mtimes 2026-05-08 — consistent with Arc 1 close commits, no post-close drift.

**Verdict:** pipeline READY for Phase 1 substrate-audit run + Phase 2 full-scale generation execution. No reauthoring needed.

## 2. Audit Dimension 2 — Flashcard CDN output dir state

**State: NOT YET PRESENT. Expected per Arc 2 commission scope.**

- `/var/www/lcs-media/flashcards/` does **NOT** exist on Hetzner (verified via plink). Confirmed sibling dirs at `/var/www/lcs-media/`: `admin-panels`, `backups`, `blog`, `decks`, `design-elements`, `image-library`, `image-library-webp`, `scripts`, `worksheet-generators`.
- Per Pillar 4 Arc 2 commission spec §3 Phase 2: storage destination is operator-strategic decision at Phase 2 entry — (a) commit to git (~3.3GB repo growth), (b) ship to Hetzner CDN-served storage (`/var/www/lcs-media/flashcards/`), or (c) hybrid. CC default-recommendation: option (b).
- Carry-forward: option (b) requires Hetzner-side dir creation (`mkdir -p /var/www/lcs-media/flashcards`) + nginx route + per-CLAUDE.md-§A.1 isolated-storage backup script (matching `backup-decks.sh` shape per §A.14.6). Surface at Phase 2 entry alongside grouping decision.

**Verdict:** expected absence; no blocker for Phase 1. Surface at Phase 2 entry per Arc 2 spec §5.

## 3. Audit Dimension 3 — `frontend/` paid-tier gating territory current state

**State: INTACT. Subscriber-gating pattern locked at Tool 1A Collections + Pillar 1 lesson-plan-reader. Pillar 4 Arc 2 Phase 3 inherits verbatim.**

- **`frontend/lib/subscription-helpers.ts` (44 LoC)** — pure `isLcsSubscriptionActive(session)` predicate. Two paths: admin-bypass (`session.isAdmin === true`) + active-LS-subscription (`status === 'active' && lsSubscriptionId !== null`). Works both server + client contexts.
- **`frontend/lib/subscriber-api-gate.ts` (133 LoC)** — `requireSubscriber(request)` Bearer-auth gate. Returns NextResponse error (401/403) OR `SubscriberContext { userId, user }`. Tool 1A established; downstream subscriber-API surfaces inherit per `project_pillar3_tool1_collections_recon.md` HAS-3.
- **`frontend/app/[locale]/lesson-plans/[slug]/page.tsx`** — canonical subscriber-gated route example. Client-side gating via `useAuth` + `isLcsSubscriptionActive`; server-side enforcement at `/api/lesson-plans/[slug]` via `subscriber-api-gate`. Per-locale topic-page slug resolution; `robots: { index: false, follow: false }` per noindex pattern (subscriber-only; not in sitemap).
- **`frontend/app/api/webhooks/lemonsqueezy/`** — webhook handler populating `Subscription.lsSubscriptionId` + `Subscription.status` on `subscription_*` events.
- **`frontend/config/lemonsqueezy-product-config.ts`** — `SUBSCRIPTION_PRODUCT` definition ($69/year) per CLAUDE.md §A.6.
- **`frontend/lib/auth-middleware.ts`** + **`frontend/lib/auth.ts`** + **`frontend/lib/auth-utils.ts`** — Bearer-token + session-lookup substrate; integral to `requireSubscriber`.

**Pillar 4 Arc 2 Phase 3 reuse:**
- `frontend/app/api/flashcards/access-check/route.ts` — wraps `requireSubscriber` + free-tier-3-package allowlist; structural parallel to `/api/lesson-plans/[slug]`.
- `frontend/lib/flashcards/access-control.ts` — composes `isLcsSubscriptionActive` predicate with free-tier-3-package allowlist (operator-strategic Phase 3 entry decision).
- `frontend/app/[locale]/flashcards/<package-slug>/page.tsx` — mirrors `lesson-plans/[slug]/page.tsx` noindex + client-gate-then-server-enforce pattern.

**Verdict:** READY. No net-new gating substrate; Phase 3 inherits the lesson-plan-reader pattern verbatim. Pattern locked across Tool 1A + Pillar 1 + future Tool 2/3/4/5 + Pillar 2/Pillar 4 work.

## 4. Audit Dimension 4 — DB schema state for paid-tier

**State: INTACT. No schema work required for Pillar 4 Arc 2.**

Per `frontend/prisma/schema.prisma`:

- **`User` model (line 31-32):** `subscriptionTier String @default("free")` (`"free"`/`"core"`/`"full"`) + `subscriptionStatus String?` (Stripe-era; `"active"`/`"past_due"`/`"canceled"`/etc.). `isAdmin` flag elsewhere for admin-bypass path.
- **`Subscription` model (line 189-238):**
  - Stripe-era fields: `stripeSubscriptionId`, `stripePriceId` (legacy reference per §A.6).
  - **Lemon Squeezy fields (load-bearing for current platform):** `lsSubscriptionId String? @unique` + `lsVariantId String?`. Populated by `/api/webhooks/lemonsqueezy/route.ts` on `subscription_*` events.
  - Plan details: `planName` (`"free"`/`"core_monthly"`/`"core_yearly"`/`"full_monthly"`/`"full_yearly"`), `status` (`"active"`/`"past_due"`/`"canceled"`/`"incomplete"`/`"unpaid"`), `billingInterval`.
  - Billing period: `currentPeriodStart`, `currentPeriodEnd`.
  - Cancellation/dunning: `cancelAtPeriodEnd`, `canceledAt`, `cancelReason`, `pastDueAt`, `unpaidInvoiceId`.
  - Active-LCS-subscription predicate per SUBSCRIPTION-SCOPE.md: `lsSubscriptionId !== null AND status === 'active'`.
- **`Payment` model (line 240-272)** + **`PaymentFailure` model (line 274-306)** + **`WebhookEvent` model (line 308-322)** — billing-event audit trail; not load-bearing for flashcard-access gating but ready for any Pillar 4 Arc 2 billing-flow verification.
- **`SubscriptionInterest` model (line 1539)** — pre-launch waitlist; orthogonal to Arc 2.

**Pillar 4 Arc 2 free-tier-3-package allowlist storage decision (Phase 3 entry):**
Two options surface at Phase 3 entry:
- (a) **Small constant table** at `frontend/lib/flashcards/access-control.ts` — e.g., `const FREE_TIER_PACKAGES: Set<string> = new Set(['count-objects-1-to-10', 'recognize-numerals-1-to-20', 'identify-living-vs-nonliving'])` per operator strategic-pick at Phase 3 entry.
- (b) **`Bundle` row metadata flag** — `freeTierFlashcards: Boolean` column on existing Bundle/TeachingPackage row schema.

CC default-recommendation: **option (a) constant table** for v1 — simplest; no schema migration; allowlist changes via small code commit; operator can override (b) at Phase 3 entry if subscriber-data-driven dynamic allowlist becomes important post-launch.

**Verdict:** schema READY. Zero schema migrations needed for Pillar 4 Arc 2. All paid-tier predicates already populated by existing LS webhook handler.

## 5. Phase-structure verification per Arc 1 Phase 5 spec

Per `docs/lesson-plans/flashcard-arc-2-commission-spec.md` (DRAFT at filesystem; ratification at Arc 2 commencement):

| Phase | Scope | Estimated sub-commits | Status |
|---|---|---|---|
| **Phase 1** | Pre-generation substrate audit (SOFT_HYPHENS coverage, image-key alias table, THEME_PALETTE coverage, performance characterization) + substrate extensions | 1 | READY — Phase 0 complete, no blockers |
| **Phase 2** | Full-scale generation (~16,632 renders; 1,512 color images × 11 platform locales × 3 deliverables = 49,896 files); storage destination decision at entry; per-package vs per-image grouping decision at entry | 1-2 | downstream Phase 1 close |
| **Phase 3** | 200-package integration + free-tier-3-package allowlist + subscription-gating implementation | 1-2 | downstream Phase 2 close |
| **Phase 4** | Production ship + TWO-STEP deploy + cross-browser verification | 1 | downstream Phase 3 close |
| **Phase 5** | Recon + Pillar 4 Arc 3 commission spec drafting | 1 | downstream Phase 4 close |

**Total estimated:** 5 phases / 5-7 sub-commits / ~3,500-5,500 LoC / 3-4 sessions per Arc 2 spec §0 envelope.

## 6. Cost-balloon trigger conditions documented for 3-4 session envelope

Per Arc 2 spec §5 "Surface only at" + Phase 1 deliverable C4:

- **(C4-a) Phase 1 substrate-extension scope materially exceeds estimates** — e.g., SOFT_HYPHENS extension needs >1,000 entries (vs 250-600 estimated) OR image-key mismatches require operator-coordination filename renames at scale. → halt; surface for operator adjudication.
- **(C4-b) Phase 1 performance characterization reveals architectural concerns** — e.g., 16,632 renders projected to take days, not hours; OR memory budget exceeds Hetzner capacity. → halt; surface for operator adjudication on parallelization / chunking / off-host generation strategy.
- **(C4-c) Phase 2 storage destination decision blocked** — operator-strategic at Phase 2 entry; halt-class until operator picks (a) git / (b) Hetzner CDN / (c) hybrid.
- **(C4-d) Phase 2 mid-run generation failure rate >1% recovered** — surface for operator review of failure pattern; possibly indicates substrate gap (image-key mismatch, vocab miss, Sharp processing edge case).
- **(C4-e) Phase 3 free-tier-3-package allowlist undecided** — operator-strategic at Phase 3 entry; halt-class until 3 packages picked.
- **(C4-f) Phase 4 production deploy gate** — TWO-STEP deploy operator-coordination per CLAUDE.md §A.5.
- **(C4-g) 200-package integration surfaces UI/UX scope expansion** — subscriber-side flashcard search / advanced filtering / bulk operations → Pillar 4 Arc 3+ candidates, NOT Arc 2 scope; halt and defer.

## 7. Pillar 4 Arc 2 Phase 1 commencement readiness

**Phase 1 entry: READY. No operator-strategic blockers surfaced at Phase 0.**

- Pipeline intact (Dimension 1)
- CDN-served destination absent but expected (Dimension 2)
- Paid-tier gating substrate locked across Tool 1A + Pillar 1 (Dimension 3)
- DB schema requires zero migrations (Dimension 4)
- Phase structure aligned with Arc 1 ratification (§5)
- Cost-balloon triggers documented (§6)

**Standing position at next-session β resumption:**

- Pillar 4 Arc 2 Phase 1 — substrate audit + extensions (CC adjudicator-forward; surface only at material-gap class)
- Pillar 2 Arc 5 Phase 2 — continued bundle expansion (per Pillar 2 Arc 5 spec Shape A) — paired commencement with Pillar 4 Arc 2 Phase 1

## 8. Cross-references

- `docs/lesson-plans/flashcard-arc-2-commission-spec.md` — full Arc 2 spec (DRAFT at filesystem; ratification implicit per `93aa6b7b` Arc 15 close adjudication batch (P3) lock)
- `docs/lesson-plans/flashcard-arc-1-recon.md` — Arc 1 close-out recon
- `docs/lesson-plans/flashcard-design-exploration.md` — Sky+v2 canonical design
- `docs/lesson-plans/flashcard-image-inventory.md` — image library substrate
- CLAUDE.md §A.6 (Lemon Squeezy integration) + §A.1 (isolated storage) + §A.5 (deploy TWO-STEP) + §A.14.6 (backup coverage) + §4.4 (cacheability tier-neutral)
- `docs/SUBSCRIPTION-SCOPE.md` §1 Condition 5 (free-tier surface)

---

*End of Pillar 4 Arc 2 Phase 0 substrate audit. Status: Phase 1 commencement READY.*
