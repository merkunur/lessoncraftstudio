# Worksheet makers — the launch handoff (written 2026-11-06, end of the local build)

**Read this first when the operator says "deploy the new worksheet makers"** (or gives the launch goal quoted in §3).
The makers are BUILT and TESTED locally; nothing maker-related is live. This file is the entry point; it points at the
detailed documents instead of repeating them.

## Status 2026-11-06: LIVE

The release and the launch goal below are done: makers installed, 647 landings, hub, homepage room, old landings upgraded, the
maker band on worksheet landings, topic pages, Level Set hubs and all decks, the 33 old apps removed. Evidence and traps:
CLAUDE.md §32. Everything below this heading is the plan as written before the launch.

**Still open:**
- **Catalogue republish queue (§2):** untouched by the launch.
- **British wording in en template strings:** K-421, K-429 ("trace round", "bauble"), G1-283, G2-311 ("full stop"), G2-252, G2-260,
  G2-262, G2-263 ("measuring jug"), G3-407 ("multiplication square"), G3-411 ("keyring"). en must be American: fix in
  `scripts/worksheet-gen/i18n/strings.en.json`, rebuild the makers, rebuild those en previews, republish the en decks in place
  (about 150; `fix-republish.sh`). The en landing copy already uses the American words.
- **Old landings carry frozen text** that is no longer quite true (for example "no account"): left as it is on purpose, because
  their words are frozen for SEO. The operator decides.
- **da, no, fi demand data is partial:** autocomplete rate-limited those three, so their headlines rest on the old pages' keywords
  and native terms. Re-run `scripts/seo-research/harvest-maker-landings.js` for them and compare.
- **Google Search Console** was not available to the session: submit the sitemap index there and check thumbnails in the results.

## 0. State at handoff

- **59 makers built** (ARCHITECTURE §14 B1–B7; `health-safety` NOT built — operator ruling 2026-11-02), **1,042 templates,
  11,314 template × language cells** (en = en-US, pt = pt-BR, es = es-MX). **647 maker × language pairs, not 649:**
  58 makers ship in all 11 languages; Cursive ships in 9 — no Swedish or Finnish template (neither school system
  teaches a joined script; the same refusal as the printable cursive family, CLAUDE.md §28).
- **Tested:** 13 full rounds of the whole gate suite (`scripts/makers/run-all-gates.sh`, 30 gates: parity, copy range
  past every pool, browser zoom 0.8–2, answer keys, screens, slots, collision, own input, settings space, PDF parity,
  thumbnails, registration, old landings, the shell gates, the live browser gate over every maker × language × level ×
  copies 1/2/157). **Round 13 was the last full round** (operator 2026-11-06: "round 13 should be the last round"); its
  one failing gate (collision: Comic Strip tails over the speakers' heads) is fixed and re-checked — see the round-13
  entry in `BUILD-LOG.md`. The operator re-checked every problem he had reported: all fixed.
- **Local preview:** `node scripts/makers/serve.js` → http://localhost:8490/makers/app/?maker=counting&lang=en (any maker
  id from `scripts/makers/topic-map.js`, any of the 11 languages). Hub of the build: http://localhost:8490/
- **Build tree:** `out/makers/` (gitignored, on the PC's disk; ONE full `build-bundles.js` run made it — every maker on
  one data version). If it is missing or stale: `node scripts/makers/build-bundles.js` (all makers, ≈ 1 h 45 min).
  ⚠ Never leave a `--makers=<id>` run as the final state: it repoints the shared `out/makers/data/current.txt` at that
  maker's files only (the release packer reads it).
- **Nothing is pushed:** the branch `pivot/printable-business-toolkit` is ~38 commits ahead of `origin`. The next
  `deploy.sh` carries ALL of them — the maker website code (APIs, smart links, `messages/makers/*`, the Prisma models),
  the vocabulary fixes (`server-scripts/image-vocabulary-raw.json`, healed into the DB by deploy.sh). The maker code is
  dormant until a release is installed (every maker path reads the served tree, absent today). Count them with
  `git log --oneline origin/pivot/printable-business-toolkit..HEAD`.

## 1. Deploy the makers — the release, in order

Full recipe + reasoning: `docs/makers/handoff/03-release-wiring.md` (written when 13 makers were built; unchanged for 59).
**Live-server commands are given to the operator as pasted `! ssh …` lines** — the session prepares them, the operator
runs them (standing rule). SSH: `ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250` (CLAUDE.md §A.1).

1. **PC pre-checks:** `git status` shows no maker work uncommitted; `node scripts/makers/gates/registration.js` → all
   registered; `node scripts/makers/gates/old-landings.js` → all pass; every maker's `currentData` in
   `out/makers/versions.json` equals `out/makers/data/current.txt` (one data version).
2. **Push:** `git push` (plain, fast-forward — §A.12).
3. **Pack (PC):** `node scripts/makers/release-pack.js` → `out/makers-release/` (+ `RELEASE.json`, sha256 per file).
   Measured 2026-11-06 on the final build: **21,036 files, 821.5 MB** (61 version folders, 59 makers; the data snapshot
   is 531 MB, the pictures 64 MB) — a long upload, stream it as one tar. ⚠ `out/makers-release/` is NOT gitignored (only
   `out/makers/` is): never `git add` it; delete it after the install.
4. **Upload** to `/var/www/lcs-media/_staging/makers-release/` (staging lives under `_staging/`, never `/tmp` —
   §A.14.12), e.g. `tar -C out/makers-release -cf - . | ssh … "mkdir -p /var/www/lcs-media/_staging/makers-release && tar -C /var/www/lcs-media/_staging/makers-release -xf -"`.
5. **Server code + nginx:** `cd /opt/lessoncraftstudio && git pull`, then `python3 scripts/makers/patch-nginx-makers.py --dry-run`,
   then without `--dry-run` (once; `nginx -t`-guarded, idempotent).
6. **Database (new tables only, `maker_recipes` + `maker_share_links`, no existing table altered):**
   `cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && npx prisma migrate deploy` (§A.5.1).
7. **`bash /opt/lessoncraftstudio/deploy.sh`** — step 1c runs `install-release.js` (verifies every sha256, installs
   version folders, pointers last, removes the stage) and gate 13 `registration.js --served=…` HARD; then the build.
8. **Verify live:** `curl -I https://www.lessoncraftstudio.com/makers/versions.json` (200, noindex, 5-min cache);
   `/makers/<maker>/<hash>/templates.json` (immutable); open a maker in a real browser on production in a few languages
   (gallery → page → New version → PDF download → answer key → interactive screen → save → share link as a student);
   an old landing `/<loc>/tools/<slug>` keeps its text/canonical and its launch button opens the new maker.
   Cloudflare TTL is 5 min (§15.8).
9. **Clean the server** after it (staging, /tmp — memory "clean the server after every (re)publish").

## 2. After the release — the catalogue republish queue (content fixes already made at the source)

These are LIVE catalogue decks whose source the maker work corrected (pedagogical fixes → republish in place; standing
rule). Each is listed with its method in `BUILD-LOG.md` (NEXT line + the round entries):
- fix waves `fix1115` (702) → `fix1119` (49); local `fix1106` (2,201) and `fix1120` (240);
- `docs/makers/republish-2026-11-03-bank-words.json` — `oldWords`, `vocabOldWords`, `scopedOldWords`, `levelRepublish`,
  `layoutRepublish` (incl. K-053), `vocabGenderFixes`, `parityRepublish`, `stringRepublish`, `_note` … `_note9`;
- the B5–B7 vocabulary / bank scans (B7 entry of BUILD-LOG);
- srd G1-331 level 3 (Join the Syllables, copies 12-16 × 11, ≤ 55 decks; pinned fix wave per locale — round-12 note);
- copy the changed `mini tools/pictures/*.json` and the rebuilt `mini tools/pww-index-*.json` to
  `/var/www/lcs-media/mini-tools/` (picture indexes: three copies — memory "picture indexes have three copies").
App-generated decks (the 29 apps) are regenerated by the OPERATOR only. An in-place republish drops the teaching block and
the meter — run `audit-update-injections.js` + `restore-update-injections.sh confirm` after (memory).

## 3. The operator's launch goal (given 2026-11-06 for the next session) — facts and constraints for its plan

The goal, in short: (1) deploy the makers; (2) redesign the homepage's worksheet-maker section from the ground up;
(3) redesign the hub https://www.lessoncraftstudio.com/en/worksheet-makers from the ground up; (4) a landing page for
EACH maker in EACH of the 11 languages, showing every template, professional, non-generic, built to convert visitors into
paying subscribers; (5) remove the old worksheet makers but KEEP their landing pages, linking them to the new makers'
landing pages WITHOUT harming their SEO, and add thumbnails from the corresponding new makers so these old landings are
as impressive as the new ones; (6) link every page of the site (worksheets, decks, TOPICS) to its maker's landing page in
its language with a beautiful, prominent, non-generic design that makes the maker immediately visible. **The SEO of the
new maker landings is a first-class requirement** (operator 2026-11-06): as strong as possible, as many impressions and
clicks as possible, and Google must show them with very good thumbnails in the results. **Every new maker landing links
back to the main hub `/<loc>/worksheet-makers` in its own language** with an elegant, designed link (wording like "See
all the worksheet makers", native ×11 — not a plain button). **The maker link on each landing opens the maker IN THE
LANDING'S LANGUAGE** (operator 2026-11-06): `/makers/app/?maker=<id>&lang=<loc>`, and a template's thumbnail opens that
template (`&t=<templateId>`, the smart-link form `frontend/lib/makers/smart-link.ts` already builds); a gate asserts
every launch URL's `lang` equals the page locale and every `t` is offered in that locale. Strategy: ready worksheets
ATTRACT visitors (SEO); makers CONVERT and RETAIN. Selling points to convey: comprehensiveness, quality, the large picture library, all 11 languages, printable AND
interactive output, easy to save and share, a very easy UI.

**Where things are now**
- Homepage (v10.x, live): `frontend/app/[locale]/page.tsx` → `frontend/components/homepage-v10/` — the makers room is in
  `Rooms.tsx` (studio room, `/homepage/<dir>maker.webp` art, CTA → `/<loc>/worksheet-makers`).
- Hub: `frontend/app/[locale]/worksheet-makers/page.tsx` → `frontend/components/worksheet-makers/PressHallPage.tsx`
  (today's hub of the OLD apps); a v2 preview route exists at `frontend/app/[locale]/preview/worksheet-makers-v2/`.
- Old maker landings (363 URLs): `/<loc>/tools/<slug>` → `frontend/components/makers/MakerLanding.tsx`, content
  `frontend/lib/seo/maker-content.ts` + `frontend/messages/maker-content/<loc>.json`; frozen list
  `docs/makers/old-landings.frozen.json`; their launch button is already SMART (`frontend/lib/makers/smart-link.ts`,
  `smart-links.json`: opens the new maker on the matching template once it is released).
- Worksheet landings (`/<loc>/worksheets/<slug>`): `frontend/app/[locale]/worksheets/[slug]/page.tsx` already has a
  "Made with the … maker" block → the OLD maker landing (`maker-content`), "Worksheet-maker page coming soon" otherwise.
- Topic pages: `frontend/app/[locale]/topic/[slug]/page.tsx` (single axis) + `topic/[slug]/[secondary]/page.tsx`
  (intersections) + the Level Set hub pages (146 indexable topic hubs, memory `project_level_set_hub_pages.md`) — no maker
  link today; an exercise-type topic maps to a maker through its types, a theme/level topic needs a ruling (which makers).
- Decks (`deck.html`, nginx): the action strip "Make your own" → `/<loc>/tools/<maker-slug>` is baked by
  `scripts/publish-cli/inject-deck-actions.js` (SoT `scripts/lib/deck-actions.js`) — only for decks whose type has an old
  maker. Changing it is a rewrite of every live deck.html.
- Template → maker: `makerOf(templateId)` in `frontend/lib/makers/released.ts` (reads the served tree); old app → maker
  template: `topic-map.js` `oldAppTemplates` / `smart-links.json`; deck → maker preset: `link-store.ts presetForDeck`.
- Per maker and language, already built and released with it: the template titles (`templates.json` + `strings.<loc>.json`)
  and a thumbnail per template per language (`/makers/<maker>/<hash>/thumbs/<loc>/<templateId>.webp`) — the landing pages
  can show every template without new per-template copy. The maker NAMES ×11 are in `frontend/messages/makers/<loc>.json`.
- Interactive + student sharing design: `docs/makers/INTERACTIVE-AND-SHARING.md`; architecture `docs/makers/ARCHITECTURE.md`.

**Binding rules (each from a memory file / CLAUDE.md) and the conflicts the plan must settle with the operator**
- **Old landings keep their SEO** (operator 2026-10-31; restated 2026-11-06 "this shouldn't harm the SEO of these
  pages"): their URL/slug, canonical, hreflang, title, meta description and JSON-LD stay, no redirect, no noindex (gate
  `scripts/makers/gates/old-landings.js`, frozen slugs). The 2026-11-06 goal now ASKS for them to be upgraded — thumbnails
  of the new maker's templates, a design as impressive as the new landings, a link to the new maker landing — so the plan
  ADDS to the page (keep the existing indexable text and headings, add the new sections) and states for the operator
  exactly what changes; the gate must stay green (extend it if it does not cover what must stay fixed).
- **"Remove the old worksheet makers":** the 33 `REFERENCE APPS/` are also the OPERATOR's tool for regenerating the app
  decks (memory: app decks are regenerated by the operator only; ARCHITECTURE: an old app stays as an operator tool) —
  confirm whether "remove" means from every teacher-facing surface (launch buttons, hub, nav) or deleting the files (§10.3).
- **Deck links:** the 2026-10-31 rule "deck 'Make your own' keeps pointing at the old slugs" is superseded by the
  2026-11-06 goal (link every deck to its maker's NEW landing). It is a mass deck.html rewrite (every live deck, every
  locale): batch by locale, idempotent, marker-guarded injector, keep the hreflang block last, Cloudflare 5 min.
- **Homepage laws** (memory `project_homepage_v6_lesson_line.md`, v9.1, permanent): **NO NUMBERS for any content** — no
  counts of makers, templates, pictures or languages, numeral or written out (so "11 languages" is shown without the
  number: the language names / the flags of the page itself); pure-CSS apparatus animations are the signature (transform/
  opacity only, motion budget); the live v10.1 homepage stays — redesign the makers section inside it; the gated
  screenshot + visual-critic process; nothing cut off up to 2560 px.
- **Tier truth before marketing copy** (memory): verify every free/paid claim against `frontend/lib/quota.ts` and the
  pricing page (makers: generate free, exports consume the free account's 3 PDFs a month; saving, sharing links and
  hosted worksheets are Teacher-only — re-verify, do not trust this line). "Free printable" only in SEO metadata, never
  in visible text (CLAUDE.md §25).
- **Native + pedagogy check (#2 rule)** on every new string in all 11 languages before it publishes; **#1 rule**: no agent
  fan-outs — **647 landings** (operator 2026-11-06: Cursive gets NO Swedish or Finnish landing page) = one designed
  template + per-maker copy; one reviewer per batch over a compact text dump.
- **SEO (§21):** new indexable pages get native slugs, canonical, hreflang (`frontend/lib/seo/hreflang.ts`), JSON-LD,
  sitemap entries, and pass `scripts/preflight-indexable-routes.js`; adding pages is fine, renaming existing URLs is not.
- Landings/metadata are otherwise never touched unless the operator asks — this goal IS the ask for the surfaces it names.

**SEO of the new maker landings — facts measured 2026-11-06 that the plan must handle**
- ⚠ **The maker thumbnails cannot be the search images as they stand:** `patch-nginx-makers.py` serves EVERY `/makers/`
  path with `X-Robots-Tag: noindex` (thumbnails included), the thumbnail URLs sit under the version hash
  (`/makers/<maker>/<hash>/thumbs/<loc>/<id>.webp` — a new URL on every release), and they are 320 × 430 px (~17 KB).
  Google's large previews want big images (≈ 1,200 px wide, `max-image-preview:large`) at stable, indexable URLs. Plan:
  preview renders and a 1200 × 630 share image per maker × language at a stable public path (the deck pages' 5-channel
  image stack is the model — CLAUDE.md §17.8.19: og/twitter image, `ImageObject` + `primaryImageOfPage`, `<image:image>`
  sitemap entries, `max-image-preview:large`, XMP in the og image).
- ⚠ **Cannibalisation with the old landings:** the 363 old `/<loc>/tools/<slug>` pages already rank for maker queries
  ("word search maker", …). A new landing aimed at the same query competes with them. The plan must give old and new
  pages distinct query targets (or a ruling from the operator), measure the current queries first (GSC), and link the
  two both ways.
- **Born keyword-correct:** harvest each locale's real demand before writing titles / metas / H1s (the landing program's
  rule, CLAUDE.md §22.4: per-locale autocomplete harvest, locked title pattern per locale, honest-fit qualifiers;
  `scripts/seo-research/harvest-candidates.js`). Native slugs (`/^[a-z0-9-]+$/`, folded per locale), unique titles and
  metas per locale, JSON-LD, hreflang across the 11 (Cursive across its 9), sitemap with images, and the similarity gate
  across the 647 pages (`scripts/seo-landing/gate.js`: no two near-duplicate pages).
- Internal links ARE the ranking lever here: every worksheet / deck / topic page linking to its maker landing (the
  launch goal's last part) is also the strongest SEO signal those landings will get; the hub and homepage link to all.

**Open items carried from the build (not blockers)**
- Mazes: noted 2026-11-02 and not re-verified since — real levels from `data/hmx/levels.js`, the strands seam, the
  picture-path face.
- The slowest maze pages take seconds in the browser (round 13 live gate: K-410 level 3 up to 9.6 s at copy 157, ≈ 5 s
  at copy 2; G1-427 "make 10" ≈ 4 s; p95 of all pages 117 ms); exact-output
  speed-ups to `lib/hm-graph.js` were prototyped (index sort, cached distances, a bounding-box skip) and verified
  identical on 522 pages, NOT applied — a shared engine of published mazes; apply only with the identity check. The
  prototype is kept in `scripts/makers/spikes/hm-graph-speed/` (`hm-graph-opt.js` = the edits as exact text
  replacements; `maze-identity.js orig|opt <out.json>` = sha1 + ms of every mazes-maker page — compare both runs).
- The old landings' mode cards still launch the old app per mode (only the two launch buttons are smart).
- `makers-assets` is unversioned (30-day cache): a changed picture needs a new file name.
- After the makers: the activities resume at `docs/activities-rebuild/ORDER.md` row 177 ("build the next activity").
