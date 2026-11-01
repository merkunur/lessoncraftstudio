# 02 — Student play page + sharing (task 2, Fable 5.1, 2026-11-01)

Design: `docs/makers/INTERACTIVE-AND-SHARING.md` §C (verified against the code: both play precedents noindex, the
middleware matcher had no `s/` carve-out, `/api/qr` exists, the deck embed snippet keeps its own contract) and §F;
ARCHITECTURE §8, §9, §13. Built and tested LOCALLY; nothing deployed, no Prisma, no nginx, no deploy.sh.

## What is built — commit 8bf516cd5

- **`/s/<linkId>`, the student page.** ONE static shell `scripts/makers/play/{index.html,play.js,play.css}` whose
  `<head>` (title, description, Open Graph + Twitter card, `og:locale`, `<meta robots noindex>`), `<html lang>` and
  site chrome (`scripts/lib/site-chrome.js` header + footer: brand, the four sections, 11 language links with hreflang)
  are filled PER LINK by the server through the pure module `scripts/makers/play/ssr.js` (typed by `ssr.d.ts`). The
  bar under the chrome carries the page's h1 and the two indexable links — "Make your own" → the maker's landing in the
  recipe's language (`play/makers-index.js`: the first old app the maker absorbs, ARCHITECTURE §13; a maker with no old
  app → `/<loc>/tools`) and "Made with LessonCraftStudio" → the locale root. Headers `X-Robots-Tag: noindex` +
  `Cache-Control: public, max-age=0, s-maxage=300`; no canonical, hreflang or JSON-LD. Unknown / taken-back link → a
  kid-safe 404 page (noindex). `play.js` reads the link (`GET /api/makers/links/<id>` → `{recipe, kind, meter}`), pins
  the maker version like the maker screen (`resolve-version.js`: a content fix re-routes student links too), rebuilds
  every page through the same gated `generate()` ladder with the same options as `shell.js pageOptions` (gate: page 1
  byte-identical to the Node render), plays each `marks` screen built by `scripts/makers/screen.js` (the teacher's
  drawing rides on it; the celebration's "Print my worksheet" prints the page), and shows a page without a screen as the
  printable page with ONE honest sentence (`noScreen` for writing / many answers / material, `noScreenYet` for a
  declared screen the maker does not build yet) and a Print button (a `download` on the meter; anonymous → "ask your
  teacher"). Several pages = tabs. `?embed=1` → `body.lcs-embedded` (no chrome, no bar) + the deck `lcs-embed-resize`
  postMessage contract.
- **Play meter** (ruling D.4-4): `POST check-and-increment {kind:'play'}` once per load unless the link says
  `meter:false`; 402 → the daily wall card (kid line + one teacher line). The local store records who minted a link
  (`minter`); the website computes `meter = !isSubscriptionUsable(teacher)` at READ time (contract in `link-store.ts`).
- **Website side (unbacked until task 3):** `frontend/app/s/[id]/route.ts` (one store read → the same `ssr.js`;
  reads the play tree `MAKERS_PLAY_DIR/<current>/` and the maker tree `MAKERS_DIR`), `frontend/lib/makers/link-store.ts`
  (`getLink`, `presetForDeck` — the CONTRACT, documented in the file, returns null today),
  `frontend/app/api/makers/preset/[deckId]/route.ts`, the middleware matcher carve-out `s/`. `tsc --noEmit` clean for
  these files (the repo's pre-existing blog/e2e errors are untouched).
- **Share sheet** (`shell.js` share part + `shell.css`): student link + QR (`/api/qr?u=`; locally served by serve.js
  from `frontend/node_modules/qrcode`) + Copy; the **embed code** — iframe of the student link (`?embed=1`) + a caption
  OUTSIDE it with exactly two anchors (the maker's landing in the page's language, the locale root) + the resize
  listener; the link to the maker's indexable page; the colleague link. Mints `student` + `colleague` links.
- **Deck → maker preset:** `?preset=<deckId>` on the maker (`openingRecipe`): `play/preset.js presetFromManifest`
  (manifest `settings.worksheet_type/difficulty`, `theme` key → cache name, `unit`, `variant`) → the first page of a new
  worksheet on the deck's settings; another maker's deck redirects to its maker; unknown → the maker as it is.
- **Local stand-ins** (`serve.js`, `local-store.js`): `/s/<id>`, `/makers/play/*` (+ `strings.json`, `landings.json`),
  `/api/qr`, `GET/DELETE /api/makers/links/<id>` with `meter`, `GET /api/makers/preset/<deckId>` (reads
  `out/makers/_local/decks/<deckId>.json`), the play meter (`played`, 10/day), the chrome's logo files.
- **Build:** `scripts/makers/build-play.js` → `out/makers/play/<hash>/` (shell, the two shell modules, strings,
  landings, `chrome/<loc>.json` ×11) + `current.txt`. NOT yet called by `build-bundles.js` (task 5's file).
- **Gate** `scripts/makers/gates/play-shell.js` + test `tests/play-ssr.test.js` (12).

## Measured (against the current build, WITHOUT the lock — the main session asked all three agents not to run or
wait for the full build + all-gates loop; the lock was another agent's the whole time)

`play-shell.js`: **83 checks pass**, poisons fire both ways. `play-ssr.test.js` 12 pass. `saves-shell.js` all pass (one
line changed: it reads the colleague link from the new share sheet). `click-shell.js` 0 FAIL. NOT run by me:
`build-bundles.js`, `exports-shell.js`, the rest of the gate loop — the main session runs the suite once.
Gate content: share sheet by real clicks (de); the student page en + de + fi × 1024 + 360: headers, head card (og:image loads),
chrome with 11 hreflang links, bar links, 3 tabs in the language, page 1 solved by real clicks → all right + celebration,
page 1 byte-identical to Node (asset addresses aside), no answer attribute served, tap floor at 1024 (items ≥ 34 px,
controls ≥ 44 px; 360 reported: 23 px — the page scales to the phone, agent 1's open decision), no sideways scroll at
360, page 2 honest + anonymous Print → "ask your teacher"; meter: free-minted link = 1 play per load, subscriber-minted
= 0, 11th play → the fi wall; embed from a cross-origin host page: no chrome, height posted and applied, caption outside;
revoke → 404 noindex; preset ×3; declared G1-116 → "coming soon"; poisons both ways ×5 (+ the meter suppressed in the
browser). Renders read by me: de + fi at 1024 and 360 (page 1 before/after Check, page 2), the embed, the wall.

## NOT done / decisions

- **The 443 declared screens are not playable in the maker/student page** — they need `render-instance.js`'s per-kind
  capture ported to the browser (+ task 4's `screen-geometry` gate); the page says "coming soon" honestly. Own task.
- `og:image` is the 320 px sample thumbnail (`twitter:card=summary`); the 1200 × 630 composite of §C.6 is not built.
- `build-bundles.js` must call `build-play.js` (or deploy.sh must) and copy `scripts/makers/play/` — task 5 / task 3.
- Task 3: back `link-store.ts`; nginx `location /s/` is NOT needed (Next serves it) — but `X-Robots-Tag` must stay;
  serve `/makers/play/<v>/` static + immutable like the bundles; `MAKERS_PLAY_DIR` / `MAKERS_DIR` env.
- Operator: a lapsed subscriber's links become METERED (not paused) — the kinder reading of D.4-4; confirm.
- Operator: the share sheet shows the teacher's typed title on the student page (§C.8) — fine?
- Cosmetic, open: once the celebration opens, the screen iframe grows by a blank band below "Try again" (the
  celebration overlay's own height drives the iframe's fit); seen on the fi 1024 render, not gated.
- Phone (360): the page scales to 0.49, items ≈ 23 px — agent 1's open decision, reported not failed.

## Native review needed (26 keys × 11)

`scripts/worksheet-gen/i18n/play-strings.json`: `play.*` (14, child-facing + one teacher line) and `share.*` (12,
teacher-facing). en-US / es-MX (tú register for the teacher) / pt-BR. German teacher strings use Sie.

## Traps paid for

- A fresh gate reads a `#pl-brand` that the markup never had an id for (class only) — assert against the artefact.
- Node and browser pages differ ONLY by asset addresses (`file://` vs `/makers-assets/`): normalise as `parity.js` does
  before calling two pages different.
- A `setContent` host page is `about:blank` — cross-origin to the iframe; reach the embed through puppeteer's
  `contentFrame()`, which is also the faithful test (a blog is cross-origin).
- `waitUntil:'networkidle0'` never settles on the play page (the Google Fonts @import); wait on the `__lcsPlay.ready` hook.
- `const opening` + a later `opening = null` in `boot()`: the throw was swallowed by `boot().catch`, so the preset page
  LOOKED right (template, level, copy) while the theme was never resolved — only the gate's theme assertion saw it.
