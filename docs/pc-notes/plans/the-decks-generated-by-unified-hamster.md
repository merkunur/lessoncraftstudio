# Deck action buttons — "Download PDF · Answer key · Make your own" on every worksheet-generator deck (+ "Make your own" on the landings)

## Context

Two teacher-facing gaps, both reported by the operator on 2026-09-20:

1. **A deck without a landing page has no PDF / Answer-key buttons on the page itself.** The `deck.html` player (nginx-served at `/<locale>/decks/<slug>/`, ~54,265 symlinks → ~45,756 physical files) carries a title bar (title · progress dots · mute · share · embed), the worksheet, Check/Try-again, the "Want more?" topic links, the suggestions strip and the baked site chrome — but **no link to its own printable PDF or answer key anywhere** (measured: `catalog-export.js` only names the PDFs as ZIP artifacts; the 29 apps emit no `<a>` to them). Only deck *cards* (hub / topic grid) and the *landing* hero carry those buttons. ~9.7–13k decks have no landing at all (the landing-less subset in sitemap shards 0/1), so for those the buttons exist nowhere on the page a teacher actually opens.
2. **No deck or landing offers a "Make your own" path to the worksheet generator.** Every one of the 33 generators has a public, per-locale landing at `/<locale>/tools/<native-slug>` (`frontend/messages/maker-content/<locale>.json[key].slug`, e.g. `addition` → `/de/tools/additions-arbeitsblatt-ersteller`). The landing only links it via a "Made with the … maker" card at the very bottom; deck.html has no link at all.

Outcome: every interactive deck page gets a compact, localized action strip **Download PDF · Answer key · Make your own** directly under its title bar (all 11 locales), and every deck landing gets a 4th hero button **Make your own** beside Play interactive / Download PDF / Answer key. Same visual language as the landing hero (Direction-A teal outline pills, coral accent for the maker button).

## Decisions (made; state once, do not re-litigate)

- **Scope = ALL interactive app decks, not just the landing-less ones.** The operator asked for "Make your own" on *all* decks; adding PDF/Answer-key to the same strip costs nothing and gives every deck.html one consistent affordance regardless of how the teacher arrived (hub card, topic grid, landing "Play interactive", search, embed). Printable-only worksheet-gen decks (`manifest.printable_only` / `isPrintOnlyType`) are **skipped** — they already carry `.lcs-download` and have no answer key and no maker.
- **Placement = a strip directly under `.lcs-bar`, above the worksheet** (anchor: the uniform literal `<div class="lcs-worksheet-wrap">`, present in all 29 apps — verified). It is the first thing after the title, mirrors the landing hero's button row, is not sticky (scrolls away like the site header), and is hidden in the three deck hide-states (print / `body.lcs-embedded` / landscape-compact), exactly like the site chrome.
- **PDF + answer-key hrefs go through the metered proxy** `https://www.lessoncraftstudio.com/api/quota/dl?loc=<loc>&slug=<slug>&kind=pdf|answer` — the SAME href the static landings use (`render-landing-html.js: dlHref`). Raw file links would bypass the 3-downloads/month free tier (memory: "nothing is free — limited trial only"). `rel="nofollow" target="_blank"` as on the hub cards. **Answer-key button only when `<slug>-answer-key.pdf` exists in the version dir** (the proxy 404s otherwise).
- **"Make your own" href = `https://www.lessoncraftstudio.com/<loc>/tools/<maker-slug>`** (absolute www, NO trailing slash — `trailingSlash:false`, site-chrome precedent). Maker key = `manifest.generator.app` with the `picture-trail → picture-path` alias; if the key is not in `MAKER_KEYS` or the locale has no slug → **omit the button**, never a dead link (counted in the summary).
- **Slug for the proxy = the slug encoded in the dir's `*-printable.pdf` filename** (the on-disk tree is coherent with `Deck.slug` catalog-wide, §8.1), fallback = version-dir name minus `-vN`. Never the symlink name (~8,500 alias symlinks share one file).
- **One SoT for markup + CSS + strings: `scripts/lib/deck-actions.js`** (sibling of `scripts/lib/site-chrome.js`), consumed by the deck injector AND the static landing renderer. No emitter in `catalog-export.js`, no edits to the 29 app files (§21.8-A drift trap; site-chrome rule).
- **Labels live in `frontend/messages/<locale>.json` under a new `deckActions` namespace** (4 keys × 11) — the publish-cli `i18n`/site-chrome loader reads these already. `downloadPdf`/`answerKey` copied verbatim from the landing `UI_STRINGS` so deck strip == landing hero wording. `makeYourOwn` is new (≤10 strings → hybrid authoring per §A.13.48; `[NSR-FLAG]` sv/da/no/fi).
- **No `.bak` files** (server-disk rule §A.14.12): the block is marker-paired and `--remove` is the byte-exact inverse, proven by the round-trip test.
- **Additive body content → outside the §21.5a churn freeze** (which is past anyway); no title/description/canonical/slug/URL touched.

## Proposed strings (`deckActions.*`, all 11 locales)

| loc | downloadPdf | answerKey | makeYourOwn | ariaLabel (nav) |
|---|---|---|---|---|
| en | Download PDF | Answer key | Make your own | Download this worksheet or make your own |
| de | PDF herunterladen | Lösungen | Selbst erstellen | Arbeitsblatt herunterladen oder selbst erstellen |
| es | Descargar PDF | Solución | Crea tu propia ficha | Descargar esta ficha o crear la tuya |
| fr | Télécharger le PDF | Corrigé | Créez votre fiche | Télécharger cette fiche ou créer la vôtre |
| it | Scarica PDF | Soluzioni | Crea la tua scheda | Scarica questa scheda o creane una tua |
| pt | Baixar PDF | Gabarito | Crie a sua ficha | Baixar esta ficha ou criar a sua |
| nl | PDF downloaden | Antwoorden | Maak je eigen werkblad | Dit werkblad downloaden of zelf maken |
| sv | Ladda ner PDF | Facit | Skapa ditt eget arbetsblad | Ladda ner arbetsbladet eller skapa ett eget |
| da | Hent PDF | Facitliste | Lav dit eget arbejdsark | Hent arbejdsarket eller lav dit eget |
| no | Last ned PDF | Fasit | Lag ditt eget arbeidsark | Last ned arbeidsarket eller lag ditt eget |
| fi | Lataa PDF | Vastaukset | Tee oma tehtävä | Lataa tämä tehtävä tai tee oma |

## Design (deck strip)

```
┌ .lcs-bar (sticky) ─────────────────────────────────────────────┐
│ Addition Fun            ○○○○○○           [🔇] [⇪] [</>]        │
└────────────────────────────────────────────────────────────────┘
        [ ⬇ Download PDF ]  [ ✓ Answer key ]  [ ✎ Make your own ]     ← new #lcs-deck-actions
┌ .lcs-worksheet-wrap ───────────────────────────────────────────┐
│                       worksheet image                          │
```

`<nav id="lcs-deck-actions" class="lcs-da" aria-label="…">` with three `<a class="lcs-da-btn">` (inline 16px SVG icon + label). Pills: `min-height:40px` (matches the bar's 40px buttons), `border-radius:999px`, `border:2px solid #146B5E`, teal text on white, hover `#E3EEEB`, `font:700 14px/1 inherit` (Fredoka on decks), `gap:8px`, `flex-wrap:wrap`, `justify-content:center`, `padding:2px 4px 10px`. "Make your own" = coral variant (`border-color:#F2784B; color:#9A4521`, hover `#FBEDE6`) so it reads as *create*, distinct from the two *download* actions. Focus ring `outline:3px solid #146B5E`. Everything namespaced under `#lcs-deck-actions` (ID selector outranks the deck's class rules; `!important` only in the three hide states). Three pills wrap to two lines at 320–360px — acceptable, still ≥40px tap targets.

Hide states (all three, MEASURED not assumed, same as site-chrome):
`@media print{#lcs-deck-actions{display:none!important}}` · `body.lcs-embedded #lcs-deck-actions{display:none!important}` (the landing's own iframe + third-party embeds; keeps the embed `chrome=200` height math intact) · `@media (max-width:1024px) and (orientation:landscape){body.lcs-worksheet-landscape #lcs-deck-actions{display:none!important}}` (the overflow:hidden fit mode would otherwise clip the worksheet).

## Files

### New
- **`scripts/lib/deck-actions.js`** — SoT. Exports `MARKER` (`id="lcs-deck-actions"`), `START/END` sentinels (`<!--LCS_DECK_ACTIONS_START-->` / `_END`), `STRIP_RE` (non-greedy, both sentinels, leading `\n?` only — the exact inverse of the injector's one leading newline), `strings(locale)` (STRING_SPEC → `deckActions.*` with en → hardcoded-EN fallback, HTML-escaped once, like `site-chrome.strings`), `makerSlug(locale, appKey)` (reads `frontend/messages/maker-content/<locale>.json`, applies `MAKER_TYPE_ALIAS`, returns null if absent), `makerUrl(locale, appKey)`, `dlHref(locale, slug, kind)`, `block({locale, slug, hasAnswerKey, appKey})` → the sentinel-wrapped `<style>` + `<nav>` (CSS inside the block: ONE marker pair, one anchor, one strip regex), and `LOCALES`, `CANONICAL_BASE`, `REPO_ROOT`. Reuse `interactive-types.js: isPrintOnlyType` for the skip.
- **`scripts/publish-cli/inject-deck-actions.js`** — clone of `inject-deck-site-chrome.js` (same flags `--dry-run --rewrite --remove --locale= --limit= --slugs-file= --decks-root=`, `wave-scope`, symlink walk, `resolveLocale` cross-check manifest/html/dir, atomic `.tmp`+rename, per-locale summary, exit 1 on any failure). Differences: dedupe physical files via `fs.realpathSync` (aliases → processed once, reported as `alias`); read `manifest.json` (`generator.app`, `printable_only`, `language`); `readdirSync(dir)` for `*-printable.pdf` (slug) and `*-answer-key.pdf` (hasAnswerKey); skip printable-only / missing-PDF decks with a named reason; **anchor = first `<div class="lcs-worksheet-wrap">` AFTER `</head>`** (guard against the CSS literal in `<head>`), all-or-nothing, insert `'\n' + block` before it; `--rewrite` = strip + re-inject (re-emits after a string/maker-slug change); `--remove` = strip only. Exports `injectIntoDeckHtml` for the test/verifier.
- **`scripts/publish-cli/verify-deck-actions.js`** — gate (`--locale --limit --slugs-file --decks-root --poison --verbose`), mirrors `verify-deck-site-chrome.js`: per deck assert (1) exactly one START/END pair and one `id="lcs-deck-actions"`; (2) block sits after `</head>` and before `lcs-worksheet-wrap`; (3) PDF href is the proxy with `loc` = dir locale and `slug` = the `*-printable.pdf` stem on disk; (4) answer-key anchor present IFF the file exists; (5) make-your-own href == `CANONICAL_BASE/<loc>/tools/<maker-content slug for manifest.generator.app>` (or absent iff no maker/slug); (6) labels == `deckActions.*` of that locale (no English on non-en — the contamination class); (7) the three hide-state rules present; (8) no NUL bytes, no `'</body>'` duplication; (9) `<a>` count 2–3, non-vacuous. `--poison` mutates a synthetic injected deck per assertion (wrong slug, English label on de, dropped hide rule, answer-key link on a deck without the file, trailing slash on the maker URL, block moved into `<head>`) and includes a CONTROL proving a correct deck passes in all 11 locales.
- **`scripts/publish-cli/deck-actions.test.js`** — wired into `deploy.sh` next to `site-chrome.test.js`: strings present ×11 (`deckActions` 4 keys, no raw dot-path, no `{name}`-style leftovers); maker slug resolvable ×11 for every one of the 29 interactive apps (+alias); `tools` route segment still has `frontend/app/[locale]/tools/[tool]/page.tsx` (route-drift guard); round-trip on the committed fixture (a real production deck.html captured from Hetzner into `scripts/publish-cli/fixtures/deck-actions/`): inject → re-inject is `alreadyApplied` → 5× `--rewrite` byte-identical → `--remove` restores the original byte-for-byte; anchor-in-head poison (a deck whose only `lcs-worksheet-wrap` is inside `<head>` must error, not inject into the head).

### Modified
- **`frontend/messages/{en,de,es,fr,it,pt,nl,sv,da,no,fi}.json`** — add the `deckActions` namespace (table above). Both-direction parity check via the test.
- **`scripts/seo-landing/render-landing-html.js`** (the LIVE static landing renderer, regenerated by `deploy.sh` for all 30,078 landings): `require('../lib/deck-actions')`; in the hero `.ctas` block (line ~1271) add, when `!printOnly && !xlang && maker`, a 4th button `<a href="${localePath(locale,'tools',maker.slug)}" class="btn btn-outline btn-make">${icon}${deckActions.strings(locale).makeYourOwn}</a>`; add `.btn-make{border-color:var(--coral);color:var(--coral-text)} .btn-make:hover{background:#FBEDE6}` next to `.btn-outline` (line ~850). Keep the bottom "Made with the … maker" card as is.
- **`frontend/app/[locale]/worksheets/[slug]/page.tsx`** (the `force-dynamic` fallback route; keep in sync per its own header comment): same 4th button after Answer key, label via `getTranslations({ locale, namespace: 'deckActions' })` (`t('makeYourOwn')`), href `localePath(locale, 'tools', maker.slug)`, same `maker`/`xlang` gating already computed at line ~231–251, coral-outline Tailwind classes (`border-[#F2784B] text-[#9A4521] hover:bg-[#FBEDE6]`).
- **`scripts/publish-cli/publish-wave.js`** — new **STEP 6d** right after STEP 6c (site chrome), before STEP 7 hreflang: per wave locale `inject-deck-actions.js --locale=<loc> --slugs-file=…`. Ordering note in the comment: after end-links/site-chrome so the `<head>`/body anchors see the final document; before hreflang so `<head>` order is untouched (the block lives in `<body>` anyway).
- **`deploy.sh`** — add `node scripts/publish-cli/deck-actions.test.js || { echo "ERROR: deck action strip broken — strings/maker slug/route drift; see scripts/lib/deck-actions.js"; exit 1; }` beside the site-chrome test.
- **`CLAUDE.md`** §21.2 step list (+ STEP 6d) and §17.8.2 body contract (one line: the action strip); memory file for the arc.

## Execution order

1. Strings → `frontend/messages/*.json` (11 files).
2. `scripts/lib/deck-actions.js` + unit test; capture one production deck.html (landing-less, en) into the fixture dir via scp; run the test locally until green; **poison every assertion** (§21.7: prove each check FAILS on a synthetic violation before trusting it).
3. `inject-deck-actions.js` + `verify-deck-actions.js`; run `verify --poison` locally (synthetic decks, no /var/www).
4. Landing renderer + Next fallback route + `publish-wave.js` STEP 6d + `deploy.sh` test wiring.
5. Local render check of the landing change: `node scripts/seo-landing/render-landing-html.js --out=<scratch> --locales=en,de,fi --limit=…` (check its flags) → open the HTML at 360/768/1024 (chrome-devtools MCP) → 4 buttons, wrap OK.
6. Commit (explicit paths; never `git add .`; `frontend/messages/*.json` + scripts + page.tsx + deploy.sh + publish-wave.js) → push → `ssh … "bash /opt/lessoncraftstudio/deploy.sh > /root/deploy-deck-actions.log 2>&1; echo EXIT=$?"` (never `| tail`). Deploy regenerates the 30,078 landings with the 4th button and runs the new test.
7. On Hetzner: `node scripts/publish-cli/inject-deck-actions.js --dry-run` (full census: anchor hit-rate per locale, skip reasons — printable-only / no PDF / no maker slug — alias count). **If any interactive deck lacks the `lcs-worksheet-wrap` anchor, stop and report before writing.** Then `--locale=en --limit=50` → `verify-deck-actions.js --locale=en --limit=50` → eyeball 3 decks live → run all 11 locales → verify all (sampled 500/locale + the poison run) → `audit-deck-html.js --locales=<all>` unchanged.
8. Cloudflare 5-min TTL, then live verification (below).

## Verification

- **Unit/gates:** `node scripts/publish-cli/deck-actions.test.js` green (incl. round-trip + poisons); `node scripts/publish-cli/verify-deck-actions.js --poison` all poisons caught + control passes ×11; on Hetzner `verify-deck-actions.js --locale=<each>` 0 failures; `audit-deck-html.js` invariants unchanged (single h1, hreflang last in head, canonical untouched).
- **Rendered, not source (chrome-devtools MCP from the PC — server-side curl to www gets a Cloudflare 403):**
  - Landing-less deck ×3 locales (e.g. `/en/decks/addition-find-addend-accessories/`, one `de`, one `fi`) at 360 / 768 / 1024: strip visible under the title bar, 3 pills ≥40px, no horizontal overflow, labels in the page language; click **Make your own** → 200 on `/<loc>/tools/<maker-slug>` in that language; **Download PDF** → 302 chain to the PDF (or signup when anonymous over quota — expected, tier truth); **Answer key** absent on a deck with no `*-answer-key.pdf`.
  - Same deck loaded inside a landing's iframe → strip hidden (`body.lcs-embedded`); print preview → hidden; 844×390 landscape with `body.lcs-worksheet-landscape` → hidden and `elementFromPoint(400,8)` is the worksheet.
  - A landing ×3 locales: 4 hero buttons; "Make your own" → maker landing 200; `printOnly` landings unchanged (1 button); cross-language landings unchanged (3 buttons).
- **Link sweep:** HEAD every distinct maker URL the injector emitted (≤ 33 × 11) → all 200 (script prints the set at the end of the run).
- **Counts (measured, never quoted):** per-locale applied / already / alias / skipped-by-reason totals from the injector summary; spot `grep -c 'id="lcs-deck-actions"'` on 5 random physical files = 1.

## Out of scope (say so, don't do)
- No change to the 29 app HTML files or `catalog-export.js` (§10.3; the injector IS the forward path via publish-wave).
- No "Make your own" on deck *cards* (not asked; the operator said cards are not enough, not that cards need it).
- Printable-only worksheet-gen decks keep their existing `.lcs-download` CTA.
- The Next fallback route's PDF hrefs stay raw (pre-existing; landings are static anyway).
