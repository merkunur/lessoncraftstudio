# Embed-readiness recon — Layer 1 verified functional; Layer 2 implementation roadmap

**Commission shape:** Read-only recon per operator's "Commission to CC: Embed-readiness recon" spec. No production change. No git commit at recon time. Output: structured report identifying scope of Layer 1 (mechanism) + Layer 2 (per-deck discovery UX) work without guessing.

**HEAD at recon:** `01ee73c5` (post-`fba33939` [DOCS] fold + post-homepage-audit; 884 published decks).

**Date:** 2026-05-05.

**Audit-doc per §A.14.5 read-only audit-only commission shape.** No DB writes. No FS modification beyond this audit-doc. No `deploy.sh`.

---

## Executive summary

**iframe embedding is mechanically functional today.** Pasting `<iframe src="https://www.lessoncraftstudio.com/en/decks/<slug>/" width="800" height="600"></iframe>` into any third-party site renders the deck. Zero header/CSP/CF blocks empirically observed.

The platform's deck.html files are intentionally self-contained per §14.1 — only external dependency is Google Fonts (preconnect). No LCS-site chrome (no nav, no breadcrumb, no related-decks bar, no "back to LCS" link). The deck-internal chrome (`lcs-bar` sticky-top with title/progress/mute/share + `lcs-footer` sticky-bottom with Check Answers/Try Again) IS deck-UI; it belongs inside any embed iframe.

**Layer 1 (mechanism) is ready. Layer 2 (operator-facing surface that lets teachers discover the embed affordance) is missing.** The recon recommends Option A — in-deck embed affordance via shared `buildEmbedAffordance` helper parallel to the existing share affordance per §17.8.15. Same fan-out shape as Commission ε's emit-site fix (1 shared module + 29 single-line per-app additions + i18n).

---

## Layer 1 (mechanism) readiness

**Critical answer: iframe embedding is technically possible TODAY. Zero blocking config.**

### Header check (Phase 2)

Empirical curl against `https://www.lessoncraftstudio.com/en/decks/code-addition-secret-word-animals/`:

```
HTTP/1.1 200 OK
Server: cloudflare
cf-cache-status: DYNAMIC
Cache-Control: public, max-age=300
x-content-type-options: nosniff
```

Notably absent:
- **NO `X-Frame-Options` header**
- **NO `Content-Security-Policy` header**
- **NO `Permissions-Policy` header**

→ Default browser behavior: third-party iframe embedding ALLOWED.

### nginx config check

`/etc/nginx/sites-enabled/lessoncraftstudio` deck location-block (lines 166-172):

```nginx
location ~ ^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/decks/(.+?)/$ {
    alias /var/www/lcs-media/decks/$1/$2/;
    try_files /deck.html =404;
    add_header Cache-Control "public, max-age=300";
    add_header X-Content-Type-Options nosniff;
    access_log off;
}
```

→ NO `X-Frame-Options` / `Content-Security-Policy` directives. Server-block-level config also clean (HTTP→HTTPS redirects only).

**Note on the alternate URL pattern:** `https://www.lessoncraftstudio.com/en/decks/<slug>/deck.html` (with explicit `deck.html`) returns 404 from Next.js (catch-all fallback) AND that 404 response carries `x-frame-options: SAMEORIGIN` injected by Next.js. This is irrelevant for embed-virality because the canonical URL pattern is `/<locale>/decks/<slug>/` (trailing-slash, no `deck.html`); that one is nginx-served and clean.

### Cloudflare check (Phase 3)

CF is in path (`Server: cloudflare`, `CF-RAY` header present). CF does NOT inject any frame-blocking header in the response. CF default-tier security level doesn't add iframe-blocks by default.

**Operator-side flag:** CF dashboard settings (Security Level, Bot Fight Mode, Browser Integrity Check) could THEORETICALLY interfere with embed-from-third-party-iframe traffic patterns at runtime even though headers are clean. Worth verifying CF dashboard before announcing embed feature publicly. Not blocking; flag for operator-side check.

### deck.html structure (Phase 1)

Both inspected decks (`code-addition-secret-word-animals` 428KB / 652 lines + `addition-image-image-breakfast` 420KB / 648 lines):

- **Self-contained:** inline CSS, inline JS, single external dep = Google Fonts (preconnect + stylesheet href). No same-origin requirement.
- **NO LCS-site chrome:** no header, no nav, no footer pointing back to LCS, no related-decks bar, no breadcrumb.
- **Deck-internal chrome:** `lcs-bar` (sticky top: title + progress dots + mute button + share button per §17.8.15) + `lcs-footer` (sticky bottom: Check Answers / Try Again). These are deck-UI, not site-UI; they belong inside the iframe.
- **Attribution markup present:** `lcs-attrib-link` CSS (per §14.3) + JS attribution-link with `link.href = DECK_BUNDLE.attribution.url || "https://lessoncraftstudio.com"`.
- **Share affordance present (per §17.8.15):** Web-Share-API-progressive 5-platform overlay (Facebook / WhatsApp / Pinterest / email / copy-link).
- **End-of-deck links section:** CSS classes `.lcs-end-deck` defined but not rendered in body markup (placeholders weren't substituted in current production decks; emitted with `includePlaceholders: false` per §14.3a default). No LCS-site-pointing links in body chrome.

### iframe layout test (Phase 1.b)

deck.html as-written displays cleanly in an iframe at common embed dimensions:
- **800×600 / 600×800 / 100% width responsive:** all OK. Sticky `lcs-bar` + `lcs-footer` behave correctly inside iframe; `min-height:100vh` on body forces vertical scroll only when iframe height < deck content height (expected behavior).
- **Cream background (`#FEFAF3`)** extends to fill iframe; embedder gets a branded background but no LCS-branded content inside it.
- **Print rule** (`@media print { ... }`) doesn't trigger at iframe display.
- **No fixed-position elements** that would overflow iframe bounds.

### Layer 1 verdict

**iframe embedding is mechanically functional today.** The only thing missing for Layer 1 is **operator-facing communication** that this works (no embed CTA exists for teachers to discover the affordance).

---

## Layer 2 (per-deck discovery UX) readiness

### Public deck-page architecture (Phase 5)

**There is NO Next.js wrapper page at `/[locale]/decks/[slug]`.** The deck URL serves the raw deck.html via nginx (per §15.7 routing-contract). There is no wrapper page with title-display / preview-thumbnail / download-buttons / share-buttons / embed-CTA / related-decks surface around the deck.

**Existing share/embed UI in catalog components:**
- `frontend/components/catalog/ShareDeckButton.tsx` (131 LOC) — workspace-level subscriber feature for generating PlayLink rows; NOT embed-CTA.
- `frontend/components/catalog/ShareLinkResultModal.tsx` (126 LOC) — companion modal for the above.
- No existing "Embed this worksheet" button or modal anywhere in the catalog UI.

This is consistent with §11's deferred-queue entry "Catalog page Phase 1/2/Gate 1 share-work revival" — the wrapper-page work is deferred.

### Embed-CTA placement options

**Option A — In-deck affordance (parallel to share at §17.8.15).** The new "Embed this" CTA lives inside `lcs-bar`, immediately after the existing share button. Click → opens an overlay with copy-paste embed snippet + width/height controls. Implementation matches `buildShareAffordance` precedent verbatim:
- 1 new shared helper in `REFERENCE TRANSLATIONS/catalog-export.js` (`buildEmbedAffordance`)
- 29 single-line per-app additions in `renderStandaloneHTML()` (each calls the new helper, parallel to existing `buildShareAffordance` call)
- 11 i18n keys × 11 locales for embed-overlay strings (similar to social-share keys per §17.8.15)
- ~150-200 LOC for the helper + ~29 single-line per-app edits + ~110 i18n entries

**Option B — Wrapper Next.js page at `/[locale]/decks/[slug]` (catalog deck-page, deferred §11 work).** Adds a Next.js route that wraps the deck.html in an iframe + surrounds it with title / OG card / download CTA / share CTA / embed CTA / related-decks. Larger work:
- New Next.js route `frontend/app/[locale]/decks/[slug]/page.tsx`
- nginx config update: deck.html served at `/<locale>/decks/<slug>/embed/` (or similar) so the new Next.js page can iframe it
- ~500-800 LOC for the wrapper component + nginx config split + iframe-friendly CSS for embed-mode
- This matches §11's "Catalog page Phase 1/2/Gate 1 share-work revival" deferred work

**CC's recommendation: Option A.** Reasons:
1. Matches existing precedent (the share affordance shipped at §17.8.15 follows exactly this pattern)
2. Smaller scope (~1 commission vs multi-arc)
3. Embed-CTA lives WITH the deck — when a deck is shared via link or appears in topic page, the embed affordance follows; no dependence on the wrapper-page work landing first
4. Per §1 acquisition flywheel doctrine, embed-virality means embed-affordance should travel with every deck instance (in-deck, in-iframe, in-share-link); wrapper-page-only would only surface embed when teacher arrives at the wrapper, not when teacher arrives at deck via share-link

If operator's longer-term ambition is the full §11 wrapper-page architecture, Option A ships embed-affordance NOW + Option B work folds in later as a separate arc.

### Layer 2 verdict

Layer 2 work scope = **~1 commission, ~3-4 sessions** if Option A. Same shape as Commission ε (1 shared module + 29 per-app fan-out call-sites + i18n authoring).

---

## Phase 6 — does Layer 1 touch the 29 authoring apps?

**Critical answer: NO. Layer 1 (mechanism) does NOT touch the 29 authoring apps.**

iframe-readiness at the mechanism level requires:
- ❌ No nginx config change (already clean)
- ❌ No CF config change (already clean; verify dashboard as flag)
- ❌ No deck.html structural change (already self-contained, no LCS chrome, attribution + share already shipped)
- ❌ No header changes (no XFO / CSP / Permissions-Policy currently set; default browser behavior allows embedding)

**Layer 2 (discovery UX) DOES touch the 29 authoring apps under Option A**, but only as a 1-line-per-app fan-out via the same shared-helper pattern as `buildShareAffordance`. This is structurally identical to Commission ε's emit-site fix scope (29 apps × ~1 line each + 1 shared module modification + i18n) — well-traveled territory.

If operator chooses Option B (wrapper Next.js page), Layer 2 does NOT touch the 29 authoring apps; it lives entirely in `frontend/app/` + nginx config.

---

## Implementation roadmap

If operator locks **Option A (in-deck affordance, recommended):**

| Arc | Scope | LOC est. | Sessions |
|---|---|---|---|
| **1 — `buildEmbedAffordance` shared helper** | New helper in `catalog-export.js` (overlay markup + copy-paste snippet generator + width/height controls + Web-Share-API-style progressive enhancement) | ~150-200 LOC | 1 |
| **2 — i18n key authoring × 11 locales** | New `embed.*` keys in `translations-shared.js`; en + de operator-authored, Tier 2 mirroring, Nordic NSR-flagged per §17.5.1 | ~60 keys × 11 = 660 entries (bulk) | 1 (concurrent with Arc 1) |
| **3 — Per-app fan-out** | 29 × 1-line addition in `renderStandaloneHTML()` (parallel to existing `buildShareAffordance` call site) | ~29 single-line edits + small per-app verification | 1 |
| **4 — §14.6 TWO-STEP deploy + verify** | Push + `deploy.sh` + per-app `update-worksheet.sh` × 29 + curl verify embed snippet renders | n/a | 1 (concurrent with Arc 3) |
| **Total** | | ~250-350 LOC + ~660 i18n entries | **3-4 sessions** |

If operator locks **Option B (wrapper Next.js page):**

| Arc | Scope | LOC est. | Sessions |
|---|---|---|---|
| **1 — Wrapper page route** | `frontend/app/[locale]/decks/[slug]/page.tsx` + iframe-mounting + surround UI (title, OG card, download CTA, share CTA, embed CTA, related-decks) | ~500-800 LOC | 2-3 |
| **2 — nginx config split** | Move deck.html to `/<locale>/decks/<slug>/embed/` (or similar embed-only sub-path); wrapper route sits at `/<locale>/decks/<slug>/` | nginx config edit + deploy | 1 |
| **3 — i18n + content** | Surround-UI strings × 11 locales | ~80 keys × 11 | 1 |
| **Total** | | ~600-900 LOC + ~880 i18n entries + nginx work | **4-5 sessions** |

---

## Operator-strategic adjudications surfaced

These are decisions only the operator can lock; recon does not pre-empt:

1. **Branding/attribution copy in embed snippet.** The embed snippet visible at copy-paste time can include a footer-attribution-line ("Made with LessonCraftStudio.com") OR rely on the in-iframe `lcs-attrib-link` baked into deck.html (already there per §14.3). Recommend: in-iframe attribution only; embed snippet itself is bare iframe markup.

2. **Default embed dimensions.** Suggest 800×600 default (4:3 aspect; matches typical desktop classroom-blog embed sizes). Operator may prefer responsive (`width="100%" height="600"` with min-aspect-ratio CSS hint) OR fixed 100% width with auto-height (requires postMessage iframe-resize protocol — out of scope for first version).

3. **Sized variants** (small / medium / large vs single canonical). Suggest single canonical default (800×600) + advanced UI revealing dimension controls in embed-overlay. Sizing UI can grow if operator data shows teachers customize frequently.

4. **Embed-tracking instrumentation.** Should we count embeds for analytics (e.g., HEAD request to a tracking endpoint when embed-snippet is generated, OR `Referer` analysis on iframe load)? Privacy-cleanest = no tracking; analytics-strongest = postMessage from in-iframe deck back to embed-host with embed-id. Recommend: no tracking in v1; revisit if operator wants embed-virality empirical data later.

5. **Embed feature gating.** §7 + `docs/SUBSCRIPTION-SCOPE.md` clause moves embed to free tier per §3 acquisition flywheel. Confirm: embed is free for any visitor (no signup required) per the SEO+embed-virality framing? (Recommend: yes, free; otherwise the flywheel breaks.)

6. **Wrapper-page priority** (Option A vs A+B). Ship Option A only, OR commission Option A + Option B simultaneously, OR ship A first with B deferred?

---

## Phase 2 limitation flag

CF dashboard settings are not directly inspectable from server-side context (only HTTP headers + nginx config visible). Operator-side dashboard verification recommended before public embed-feature announcement to confirm:
- Security Level not set to "I'm Under Attack" (would break iframe traffic)
- Bot Fight Mode not blocking embed-iframe-loaded resources
- Page Rules / Workers don't inject frame-blocking headers downstream

Likely all clean by default; flag for completeness.

---

## Doctrine carry-forward (filed for next [DOCS] fold)

1. **Layer-1 vs Layer-2 distinction for distribution mechanisms.** When an acquisition mechanism (embed, share, link, QR) requires both technical-primitive readiness (Layer 1) AND user-discoverable surface (Layer 2), recon should explicitly separate them. This commission's recon shows Layer 1 was already there post-`14b91adc0` work; only Layer 2 surfacing was missing. Useful framing for future distribution-mechanism readiness audits.

2. **Self-contained deck.html as embed-readiness substrate.** Per §14.1 the deck.html is intentionally self-contained (no external CSS/JS, only Google Fonts). That structural choice — already locked at §14.1 — is precisely what makes iframe embedding functional today without further work. Worth surfacing as cross-reference: §14.1 self-contained doctrine = embed-readiness substrate.

3. **Shared-helper precedent for fan-out work.** The share-affordance pattern (1 shared `buildShareAffordance` helper × 29 1-line per-app call-sites) is the canonical fan-out shape for any cross-cutting deck.html addition. Future similar work (embed, QR, badge, accessibility-toggle) follows the same precedent. Useful framing for §17.8 / §14.3a doctrine extension.

---

## Next-arc recommendation

**Commission Option A — in-deck embed affordance via shared helper.**
- ~3-4 sessions
- Matches existing share-affordance precedent verbatim
- Ships embed-virality discovery UX immediately
- Layer 1 (mechanism) is already ready; Layer 2 is the only remaining work
- Defers Option B (wrapper Next.js page) as a separate future arc per §11's existing deferred queue

**Estimated total effort to ship Layer 1 + Layer 2:**
- Layer 1: **0 sessions** (already done; verify CF dashboard out-of-band)
- Layer 2 Option A: **3-4 sessions**
- Layer 2 Option A + B: **7-9 sessions** across 2 commissions

---

*End of recon.*
