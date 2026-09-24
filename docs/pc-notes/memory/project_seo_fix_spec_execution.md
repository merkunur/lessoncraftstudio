---
name: project_seo_fix_spec_execution
description: Execution of the external seo-fix-spec.md (2026-07-31) — 5 of 9 tasks were false premises; the deckend tile repoint moved ~168k internal links onto landings
metadata: 
  node_type: memory
  type: project
  originSessionId: 95f3e213-9159-483b-93fb-26a968935df7
  modified: 2026-07-31T12:21:23.196Z
---

Executed `c:\Users\rkgen\Downloads\seo-fix-spec.md` on 2026-07-31. Commits `56765957`,
`9dd80d02`, `5dfa60ee`, `d2316896` on `pivot/printable-business-toolkit`.

⭐ **Five of the spec's nine tasks rested on FALSE PREMISES.** The author used naive
single-line greps, which under-count on Next.js's minified single-line `<head>`, and
checked only HTML meta tags while this site enforces several directives at the **nginx
header** layer. Before implementing any externally-authored audit, re-measure every
claim against production yourself.

- **T1 mini-tools "fully indexable"** — FALSE. All serve `X-Robots-Tag: noindex`.
- **T6 "only one og:locale:alternate (fi_FI)"** — FALSE. All 10 present. `grep -c`
  counts LINES, not occurrences; on a minified head everything is one line and a naive
  extraction keeps only the last match. **hreflang is present everywhere too** — Next
  emits `hrefLang` (camelCase), so a case-sensitive grep finds nothing. HTML attributes
  are case-insensitive; this is correct output, not a defect.
- **T8 "tool pages may not be in a sitemap"** — FALSE. All 802 already were.
- **T9 "JSON-LD may be missing"** — FALSE. Comprehensive on every page type.
- **T4 partly false** — the 2 remaining homepage deck tiles point at decks with NO
  landing; those are self-canonical + NOT noindexed, so `/decks/` is correct there.

**The real one (T2).** Deck strips linked 6 tiles each to `/decks/` URLs that are
canonicalized away + `X-Robots-Tag: noindex`. Retrofit via new
`scripts/publish-cli/repoint-deckend-tile-links.js` across all 11 locales:
**168,375 of 274,434 tiles (61%) repointed to `/worksheets/` landings**, 106,059
correctly kept as `/decks/` (landing-less decks are self-canonical + indexable — the
rule is CONDITIONAL, never a blanket rewrite), plus ~81,660 apex thumbnail `src`
normalized to www. Idempotent (verified: second run = 0 changed).

⚠ **Chose a surgical href rewrite over `inject-deck-end-strip.js --rewrite`.** The
`--rewrite` path skips **675 of 6093 EN version dirs**: `scripts/worksheet-gen` decks
carry a strip but have no `<div class="lcs-celebration"` anchor, so re-insertion fails
and they keep their bad links. Rewriting only the href is shape-agnostic, covers both
emitters, and re-rolls no suggestions/thumbnails/titles. (That failure path is safe —
it returns without content, so no strip is destroyed.)

⚠ **Anchor a link-rewrite regex on the tile CLASS** (`" class="lcs-deckend-tile">`),
never on the URL shape alone — the same `/decks/<slug>/` string is also the deck's own
canonical, its og-image/thumbnail/PDF assets, and its share links.

Related: [[project_internal_linking_indexability_repair]], [[feedback_verify_rendered_not_source]],
[[feedback_indexable_route_gate]], [[project_seo_forensic_audit_2026_07_10]].

## Residuals reported, deliberately NOT done
- **1,504 published decks hold apex `thumbnail_url` in the DB.** Inert for rendering
  (live reads are slug-derived per §8.1, and `deck-end-suggestions.js` now normalizes
  at read). `fix-deck-url-columns.js` **cannot** fix it — it is host-PRESERVING by
  design. Needs a deliberate `UPDATE decks SET thumbnail_url = replace(...)`.
- **`LCSAttribution.URL` is apex**, baked into every deck's bundle JSON and used to
  build the runtime attribution link. Lives in `attribution-manager.js`, which is
  served from `/var/www/lcs-media` and is NOT in git (§14.3); §10.3 protects it.
- **Old-slug tiles take one 301 hop** (e.g. `pattern-train-abc-thanksgivinng`): the DB
  slug is the typo, the landing map keys the corrected slug, so the resolver returns
  null → keeps `/decks/` → 301 → correct deck → canonical to landing. Sampled ~1 in 13
  kept tiles. Not broken, just an extra hop.
- **`audit-deck-html.js` invariant #3 is STALE**: it flags `CANONICAL_NO_TRAILING_SLASH`
  on 210/296 EN decks because canonicals now point at `/worksheets/<landing>` (no
  trailing slash, resolves 200) after the 2026-07-10 repoint. Pre-dates this work.
