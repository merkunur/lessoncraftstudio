# Commission stub — flashcard deck.html external image-reference architectural pivot

**Type:** Future-arc candidate; preserved option per operator (C) acknowledgment at Pillar 4 Arc 2 Phase 2 ratification (2026-05-11).
**Status:** STUB — not commissioned. Filed for re-evaluation at post-Pillar-4-Arc-2 strategic review.
**Triggered by:** Phase 2 mass-run revealed scale impact of base64-embedded images on deck.html size (~1.5MB/deck × ~1,045 decks = ~1.6GB digital surface).

## 1. Pivot description

Restructure flashcard `deck.html` from base64-embedded image data to external image references. Each deck.html links to images served from Hetzner CDN paths rather than embedding image bytes inline.

**Current architecture (Arc 1 + Arc 2 Phase 2):**
- `deck.html` self-contained per Sky+v2 design canonical
- All card images embedded as `data:image/png;base64,...` data-URLs
- ~1.5MB per deck.html (12-card validation batch) → ~1.5MB-3MB per package deck at Arc 2 scale
- Trade-off: offline-capable + share-friendly + no broken-image risk; cost is file size

**Proposed architecture:**
- `deck.html` references external image URLs (e.g., `https://www.lessoncraftstudio.com/image-library/<theme>/<image>.png`)
- Image-library content served from Hetzner CDN at `/var/www/lcs-media/image-library/`
- ~5KB per deck.html (HTML + CSS + minimal JS; no image bytes)
- Trade-off: ~10× file-size reduction; cost is loss of offline-capability + dependency on CDN availability

## 2. Quantified scale impact

At Pillar 4 Arc 2 Phase 2 scale (~1,045 package-locale deck.html files):
- **Current:** ~1.6GB digital deck surface (base64-embedded)
- **Pivot:** ~5-10MB digital deck surface (~300× reduction)

Print PDF files (~1.2MB each) are unaffected by this pivot — PDFs always embed image data per print rendering requirements.

At downstream scale (per-image standalone deck.html commission per Decision 3 (D)'s deferred per-image surface, ~16,632 standalone decks):
- **Current:** ~25GB digital surface (catastrophic for storage + CDN bandwidth)
- **Pivot:** ~80-160MB digital surface (~300× reduction)

The per-image standalone surface becomes viable only with this pivot.

## 3. Forward-flow impact

- `frontend/scripts/lib/flashcard-render.ts` — emission pattern changes; `imageToDataUrl()` Sharp-preprocessing helper retires OR shifts to URL-construction helper
- `frontend/scripts/generate-flashcards.ts` — pipeline pattern unaffected; per-task wall-clock potentially faster (no Sharp encoding) but offset by CDN URL resolution
- Sky+v2 design canonical — unchanged (visual rendering identical)
- Cloudflare CDN — must serve image-library images at the referenced URL pattern; verify cache headers + atomic-swap semantics still hold

## 4. Architectural trade-offs

**Gains:**
- ~10× to ~300× reduction in deck.html file size (varies by scale)
- Faster deck.html load on browser (parse-time bounded by HTML size)
- Lower CDN bandwidth for deck.html serving
- Per-image standalone surface (Decision 3 (D) deferred option) becomes feasible
- Shared image cache across decks (browser caches once per image, reuses across decks)

**Losses:**
- Loss of offline-capability — deck.html requires CDN online to render images
- Loss of share-friendliness — sharing deck.html alone doesn't include images
- Broken-image risk if CDN path changes or image deleted
- Dependency on Hetzner uptime + Cloudflare cache freshness

## 5. Commission triggers

Commission only if post-launch data signals one or more:

- **Storage cost:** Hetzner disk usage approaches operator-defined threshold; deck.html file size is non-trivial contributor
- **CDN bandwidth cost:** Cloudflare or Hetzner egress costs warrant size reduction
- **Performance signal:** deck.html load time degrades user experience (LCP > target on flashcard browse surfaces)
- **Per-image surface demand:** operator commissions Decision 3 (D)'s per-image standalone surface; storage scale forces pivot adoption
- **Mobile experience:** mobile network bandwidth on flashcard browse surfaces causes K-3 teacher friction

Until at least one trigger fires, current base64-embedded architecture per Sky+v2 holds. Self-containment + offline + share-friendliness are real-world value at low-scale (validation batch + 100-package Phase 2 scale).

## 6. Scope estimate (when commissioned)

- Phase 1: external-reference render adapter + URL-construction helper (~200-300 LoC in flashcard-render.ts)
- Phase 2: pipeline integration + verification on mass-run (existing renders re-generated; ~3,135 files)
- Phase 3: Sky+v2 design canonical validation post-pivot (visual rendering unchanged but loading dynamics differ)
- Estimated: 1 session; ~500 LoC delta; minimal architectural risk if image-library URLs are stable

## 7. Cross-references

- `docs/lesson-plans/flashcard-arc-2-commission-spec.md` — canonical Arc 2 spec
- `docs/lesson-plans/pillar-4-arc-2-phase-0-substrate-audit.md` — Phase 0 META-audit
- `docs/lesson-plans/flashcard-arc-2-substrate-audit.md` — Phase 1 substrate audit
- `frontend/scripts/lib/flashcard-render.ts` — current base64-embedded emission
- `frontend/scripts/lib/flashcard-data.ts` — vocab + image-key alias substrate
- CLAUDE.md §A.1 (isolated storage) + §4.4 (cacheability) + §14.1 (self-contained deck.html — flashcard's structural parallel)

## 8. Sibling stubs

Filed alongside (μ) slug-rationalization commission stub (operator's pattern for preserved-option future-arc candidates).

---

*Status: STUB. Commission only if §5 trigger fires post-launch.*
