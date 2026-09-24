---
name: project_static_surface_site_chrome
description: The worksheets landings and deck pages had NO site header/footer because nginx serves them outside Next; fixed 2026-08-05 via one shared module. Read before touching either static surface.
metadata: 
  node_type: memory
  type: project
  originSessionId: d4192bb8-51c4-4af8-8c5a-cd3da4abe89d
  modified: 2026-08-05T12:36:25.542Z
---

# Site chrome on the two nginx-served static surfaces (LIVE 2026-08-05)

**The two biggest public surfaces bypass `app/[locale]/layout.tsx` entirely**, so they
inherited no `Navigation` and no `Footer`. A visitor from Google got a worksheet and no
way into the site. Both are now fixed and verified live in all 11 locales.

| Surface | URL | Count | Producer | Ships via |
|---|---|---|---|---|
| worksheet landings | `/<loc>/worksheets/<slug>` | 30,078 | `scripts/seo-landing/render-landing-html.js` | `deploy.sh` regenerates them every deploy (~13s) |
| deck players | `/<loc>/decks/<slug>/` | **54,265** | `scripts/publish-cli/inject-deck-site-chrome.js` | that script + `publish-wave.js` **STEP 6c** |

⚠ **54,265 decks, not ~9,752.** The ~9,752 figure that appears in the docs is the
*landing-LESS* subset only. Count before scoping.

## The architecture rule

**`scripts/lib/site-chrome.js` is the ONE place the markup and CSS exist.** Both producers
`require()` it. There is deliberately **no emitter in `catalog-export.js`** — a browser file
cannot `require`, so it would need byte-duplicated constants plus a `__SITE_*__` placeholder
group, recreating the exact drift trap §21.8-A records (a hreflang fix shipped to a
duplicated copy and changed nothing on 30,078 live pages). Every deck reaches production
through publish-wave, so STEP 6c is both the retrofit **and** the forward path. Zero edits to
the 29 app HTML files.

## Three hide states on decks — all mandatory, all MEASURED not assumed

`@media print` · `body.lcs-embedded` · `body.lcs-worksheet-landscape` inside
`@media (max-width:1024px) and (orientation:landscape)`.

The third is the dangerous one: that mode sets `body{overflow:hidden}` and JS-sizes the
worksheet to the full visual viewport, so a header in normal flow would push the worksheet
down and **clip it unreachably on a phone, mid-exercise**. Verified by eye at 844×390 with
the class applied — `elementFromPoint(400,8)` is `.lcs-worksheet`.

## Gates

- `scripts/publish-cli/verify-deck-site-chrome.js` — 11 assertions, `--poison` runs 8 modes
  plus a control proving a *correct* deck is clean in all 11 locales.
- `scripts/publish-cli/site-chrome.test.js` — 1660 assertions, **wired into `deploy.sh`**.
  Its route-drift check is the load-bearing one: nine path segments are frozen into ~84,000
  static files with **no build-time reference**, so a route rename would orphan every one
  silently.
- Both were poison-tested before being trusted; see [[feedback_poison_every_assertion_not_just_the_first]].

## Standing traps recorded here

- **`--rewrite` must be byte-idempotent.** Inject and strip have to be exact inverses. A
  trailing `\n?` in `STRIP_RES` ate the *document's own* newline after `<head>`/`<body>`
  (every cycle shrank each file by 2 bytes); omitting the leading `\n?` would grow it by a
  blank line per block. Prove it with a 5× round trip **and** a full-strip-restores-original
  check on a real production file.
- **Aliased symlinks inflate "already-applied".** Several slugs can point at the same
  `-v<N>` directory, so a first run legitimately reports thousands already-applied. Not a bug.
- **`pt/chart-count` is a pre-existing dangling symlink** → `contagem-em-grafico-v1`, which
  does not exist. The sibling `inject-deck-end-topic-links.js` has reported the same failure
  for months. Content is gone; it cannot be repaired by a script.
- **A landing slug may 301 to a renamed canonical** (es `…-easy-…` → `…-facil-…`). Follow
  redirects before calling a locale broken.

Related: [[feedback_verify_the_measurement_before_the_defect]] ·
[[feedback_never_file_a_live_bug_you_could_fix_now]] · [[feedback_verify_rendered_not_source]]
