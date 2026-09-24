---
name: project-premium-tools-v2-design
description: "The SECOND premium-tools program — 20 new K-3 classroom teaching instruments. DESIGN APPROVED 2026-07-30, BUILD NOT STARTED. The design thesis, the five-property spec, the 20 tools, the pilot order, and the resume trigger."
metadata: 
  node_type: memory
  type: project
  originSessionId: 4e6f1f6a-04b7-4b94-93cc-fd9a19ede19e
  modified: 2026-07-30T08:04:18.765Z
---

# Premium Tools v2 — 20 new classroom teaching instruments (DESIGN APPROVED 2026-07-30)

> ⛔ **THIS FILE'S *LIST OF 20* IS DEAD.** The operator rejected it on 2026-07-30 and commissioned a
ground-up replacement — see **[[project_premium_tools_v3_catalog]]** for the live catalog, the
six-gate test, and the discourse-instrument diagnosis. **The BUILD LOG below for tools #1-#3 is
still accurate and still the reference for how a tool ships.** Do not build anything from the
"The 20" section of this file.


## ✅ BUILD #3 — Say It Board (id `home-language-bridge`, TOOL #29): **LIVE + REGISTERED IN 11 LOCALES**, `8bfe53a3` (2026-07-30). Tool key #32.

⚠ **SCOPE CHANGE from the approved plan — the word half was CUT mid-build.** Planned as
"Home-Language Bridge" (bilingual word list + survival board). Two facts verified in the
codebase killed the word half: (1) `picture-word-wall.js:163` is ALREADY
`compose(loc, card, plural)` — locale is already an argument, every call site just passes
`api.lang` — and PWW already ships "Our words" with the placeholder "Name this wall (e.g. Week
12 — On the farm)", so a bilingual column is ~80 lines INSIDE PWW, not a second tool;
(2) `lcs-shell.js:22` fixes 11 Latin-script European locales, so a home-language-WORD tool
serves the international-school child while wearing the newcomer's name (the newcomer who
actually arrives speaks Ukrainian / Arabic / Turkish / Somali).
**→ CARRY-FORWARD: add the bilingual column to Picture Word Wall as its own small commission.**

Shipped shape: ICON-FIRST board — 12 inline SVG icons + 12 first-person child phrases × 11
locales, no data file at all. **Complete with NO home language** (gate H3 asserts it never
invents one); a home line is a bonus, printed FIRST at identical size / weight / colour.
**Whole board FREE forever** (the `feelings-check-in` precedent: "the supportive half is never
sold"); premium is the printable card only. Endonyms, never flags. Native slugs:
say-it-board · sag-es-tafel · tableau-pour-se-faire-comprendre · tavola-per-farsi-capire ·
tablero-para-decirlo · quadro-para-falar · zegbord · sag-det-tavlan · sig-det-tavlen ·
si-det-tavla · sanomistaulu.

**Gates:** `verify-home-language-bridge.js` 12 invariants incl. structural fence H1 (the build
FAILS if this tool ever reads pww-index or builds an image URL), 26/26 mutations killed via
`HLB_TOOL_DIR` · `local-test-` 91 assertions · `smoke-…-locales` 132 ×11 ·
`live-verify-home-language-bridge.js` 11/11 RENDERED on production.

**⚠ LESSONS (each cost real time; do not relearn):**
- **Heredoc mangling put literal BACKSPACE bytes (0x08) where `\b` was meant** in the gate's own
  regexes — H6 could never fire, and Read renders 0x08 INVISIBLY. Only mutation testing found
  it. **Author regexes in files written with the Write tool; never inside a bash heredoc, and
  never inside a double-quoted `node -e` string (backticks there become command substitution —
  that bug then corrupted this very memory file).** After generating a file, sweep it for
  control characters (`c < 0x20 && c !== 0x09 && c !== 0x0d`).
- **A source-text scan is not a value scan.** The no-flags gate missed an escaped `\u{1F1E9}`.
  Walk the RUNTIME values, not just the source.
- **`vw` inside the shell is a trap: `.lcs-app` is capped at 720px.** A `20vw` grid-column
  minimum kept growing after the container had stopped, so 1024 got THREE columns where 768 got
  four — the board grew TALLER on the wider screen. Size grid columns from the container.
- **Do not soften the desktop bar.** §A.13.62 demands FITS at desktop; I had accepted
  "reachable". Fix: sweep TWO states — resting MUST fit at desktop, transients (chooser open)
  must be proven reachable. Measure the right state instead of loosening the gate.
- **A digest that prints every string is worth more than the assertions around it.** The
  11-locale smoke leaked `localStorage` between locales (same origin), so every board after the
  first booted already paired — invisible to 100+ passing assertions, obvious in the printout.
  The same printout caught pt written in EUROPEAN Portuguese against §6 (pt = BR canonical).
- **Icons need an eye, not a gate.** Three were wrong: a ✓ for "I have finished" on a board
  whose doctrine refuses verdicts (a teacher glancing reads "correct"), a circular arrow for
  "my turn" indistinguishable from the one for "say it again", and a "friend" glyph that read
  as one person. The gates reported "12 drawn icons" throughout.

## ✅ BUILD #2 — Dictation Desk (`dictation-desk`, TOOL #28): **LIVE + REGISTERED IN 11 LOCALES**, `7694f3cc` (2026-07-30). Tool key #31.
The write side of phonics: teacher says a word → class writes it **on paper** → one tap assembles
it on the slate one unit at a time → each child checks their own handwriting. **No child input
exists** (structural: no answer-shaped field, zero text-entry in the child-facing stage; the ONE
input is the premium adult word-list panel). Slugs: `dictation-desk · diktat · la-dictee · dettato
· dictado · ditado · dictee · diktamen · diktat · diktat · sanelu` (de/da/no share `diktat` —
fine, per the `tom-tallinje` precedent). **Registration shipped IN the same commit** — the #1
lesson applied.
Gates: verify 12 invariants + **30/30 mutations** · local-test **49** · smoke **132 ×11** ·
0 protected-core lines (sound-boxes core/tool/banks + heart-words byte-untouched).
Live-verified rendered on en/de/es/fi: slate starts covered, a real tap reveals exactly one.

**⚠ THREE FINDINGS FROM THE DATA — reusable for any tool touching the phonics banks:**
1. **The sound-boxes banks are ONE BOX PER SOUND, so silent letters are ABSENT from `boxes`.**
   `mouse` = m·ou·s, `hund` = h·u·n. Any tool that renders `boxes` as the spelling will show a
   child "mous" and teach them their CORRECT spelling was wrong. Use the declared `silentTail`.
   **MEASURED: 332/332 words × 11 banks satisfy `boxes(+split digraph a_e) + silentTail ===
   display`**, and every declared silentTail matches the derivation. `a_e` is discontinuous — the
   vowel sits in place, the `e` travels to the END of the word.
2. **The reveal/segmentation unit is PER-STAGE data.** es/pt/it/fi declare `type:'syllables'`
   stages (syllable-first phonics); Germanic locales are grapheme-boxed. READ `stage.type`.
3. **NO ISOLATED-PHONEME TTS, EVER** (`sound-boxes.js:18`: *"synthetic 'buh' is pedagogy poison;
   the teacher's mouth is the phoneme model"*). A synthesiser handed "c" says "see". Chime the
   unit, speak only WHOLE words (`type:'word'`). I had this wrong and gated it after fixing.

**⚠ Also worth carrying forward:** the bank's stage `label`s are full descriptive sentences
authored for a settings drawer — unclamped in a chip row they wrap to three rows and swallow the
stage. And the corpus is thin for a *daily* routine (en/de 60 words, **da 16**), which is why
premium is the teacher's own list with the teacher marking the units — the tool never guesses a
segmentation it cannot verify. Phrase/sentence levels deferred, and stated as deferred.

**⚠ fi grammatical number caught by READING the smoke output, not by a gate:** "2 tavut" → Finnish
takes the **partitive singular** after a numeral (`tavua`, `äännettä`). This is precisely why that
script prints the readout for a human instead of regexing grammatical number.

**⚠ Live-probe false negative:** the first page in a live loop needs to WAIT FOR THE IFRAME, not a
fixed delay — en "failed" at 4.5s while de/es/fi passed, and the tool was perfect. Poll for the
frame + `waitForFunction` on real content before believing a live failure.

## ✅ BUILD #1 — Number Bonds Board (id `part-whole-frame`): **REGISTERED, DEPLOYED, LIVE-VERIFIED IN 11 LOCALES** — `c508a567` (instrument) + `97abd2ec` (registration), 2026-07-30. Tool #30.
**Live, rendered-verified** (not just curl): all 11 landings 200 on native slugs, the tool MOUNTS
inside the landing iframe and a real click carries a counter, `LearningResource` + `BreadcrumbList`
JSON-LD, hreflang chain 12, 563-824 words of crawlable prose per locale, card + link on `/tools`.
Slugs: `number-bonds · zahlen-zerlegen · splitsen · decomposer-les-nombres · scomporre-i-numeri ·
descomponer-numeros · decompor-numeros · dela-upp-tal · del-tal-op · del-opp-tall · luvun-hajotelma`.
EN renamed **Part–Whole Frame → "Number Bonds Board"** (search term over academic term; id unchanged,
`?v=2`); nl keeps `splitsen` = the Dutch national term. Non-EN prose is **builder drafts**
(sv/da/no/fi `[NSR-FLAG]`) — the 10-agent ensemble pass + `apply-part-whole-frame-fanout.js` (not yet
written) is the remaining follow-up.

**⚠ THE PROCESS MISTAKE, worth not repeating: I deployed the instrument BEFORE registering it.**
`middleware.ts` 410s every `/tools/*` slug absent from `LIVE_TOOL_SLUGS`, so the first deploy
produced a raw `/mini-tools/…html` URL and a dead page in every language — and I then explained the
410 as though it were fine. **A tool is not shippable until `config/live-tool-slugs.ts:49` has its
key.** Registration is 5 files + 11 locale entries and everything else (sitemap, hreflang,
CategoryNav, search, static params) derives itself. Bundle registration INTO the build; never deploy
the asset alone.

### (superseded) the instrument-only state

**Live:** `https://www.lessoncraftstudio.com/mini-tools/part-whole-frame.html` 200 (52,332 b, served
bytes carry the fixes). Rendered drive on en/de/nl/fi through production: a real click carries
exactly one counter, the whole is unchanged, five per row, spoken per locale
(*fünf ist eins und vier* · *vijf is een en vier* · *viisi on yksi ja neljä*), 0 console errors.
`/en/tools/part-whole-frame` **410 by design** — the middleware carve-out only admits registered
`TOOL_KEYS`, so the tool is reachable only by its direct mini-tools URL until registration lands.
Deploy was the §20.4 one-chain (pull → cp → deploy.sh); payment canary OK; 44/44 chunks 200.

Files: `mini tools/part-whole-frame.{js,html}` (`?v=1`) + `scripts/{verify,local-test,smoke}-part-whole-frame*.js`.
**Gates green:** verify 12 invariants + **26/26 mutations killed** · drift gate 231 number words vs the
live `place-value-core` · local-test **57** (real pointer drags, sweep 320-1366) · smoke **110 ×11**.
**0 lines** to `lcs-shell.{js,css}` / `number-bond-core` / `place-value-core` / `sort-bins-core` /
`ten-frame-core`. QA shots: `docs/audit-results/part-whole-frame/qa/` (untracked).

**REMAINING for #1** (in order): 10 native 3-agent ensembles → `apply-part-whole-frame-fanout.js`
(not yet written) → registration (`tool-content.ts` ×4 edits, `config/live-tool-slugs.ts:49`,
`manipulatives.ts`, `TOOL_WRAPPER_VERSION` 7.39→7.40, 11 `tool-content/*.json` ToolEntries) →
`master-sync` → push → deploy as ONE chain (`git pull && cp "mini tools"/*.{html,js,css}
/var/www/lcs-media/mini-tools/ && deploy.sh`). **Until registered the tool is inert** — nothing
references it, so the commit is safe to carry on any unrelated deploy.

**⚠ THE MODEL IS THE SAFETY ARGUMENT:** `{whole, a}` and nothing else; `partB = whole − a` derived
on every read. Conservation is not checked, it is **unrepresentable** — no second slot exists to
corrupt. Gate includes the poke test. Copy this discipline into every v2 build that has an invariant.

**⚠ THREE OF MY OWN TESTS WERE LYING (fixed the tests, not the code) — all three recur, watch for them:**
(1) an order assertion a `.sort()` mutant survived because the fixture was already sorted;
(2) a "reachable by scrolling" check that inferred from `scrollHeight` while the shell's
`html, body { overflow:hidden }` made content genuinely UNREACHABLE — **drive every scroll
candidate, measure which took, assert the control is VISIBLE**, and scroll by the exact amount
needed (scrolling to 99999 pushes it off the top and `bottom <= h` passes trivially);
(3) a print check where `indexOf('pwf-dot')` was satisfied by `.pwf-dotZ` — **match the SELECTOR
with a boundary, not the substring**; it was hiding a real hole (counters would print invisible).
Also: **reset scroll at the start of every viewport iteration** or later widths measure negative
rects and `Math.max(…,0)` reports a lowest of 0 — an assertion that passes having measured nothing.

**⚠ DEFECTS ONLY A PERSONAL LOOK CAUGHT** (all gates were green): absolute x/y coordinates from the
descriptor cannot survive trays that grow one row to five (nest overflowed the frame and collided
with the header at whole=20) → **flow layout, descriptor names the ARRANGEMENT not raw coords**;
counters packed six per row → **derive tray width from dot size so they cannot drift**; the
all-ways record pushed past the desktop fold → **put it BESIDE the frame**; and the de draft name
*Zerlegehaus* promised a Zahlenhaus the renderer does not draw → **a name may not promise a
convention the renderer lacks**; if the de ensemble rules the Zahlenhaus IS the convention it must
ship WITH a `ways:'house'` renderer.

**⚠ Tap-floor design ruling, reusable:** twenty 44px counter-buttons cannot fit a phone tray, so the
fix for an under-size counter is NOT a bigger dot — the counters are interchangeable, so **the TRAY
is the handle** (one affordance per container, measured 150×76+). Dots became decorative.

**⚠ The bond territory is DENSER than this design assumed:** `number-bond-activities.json` ships
**six** graded activities (make-ten, make-ten-to-add, find-the-total, subtraction-unknown-addend,
add-three, story-problem), and **Gynzy ships a Number Bonds board** among its 32 math tools. The
fence is categorical (free-play teacher instrument vs graded child task) and is enforced by a gate,
not by prose. Precedent for building beside an owned mechanic: `ten-stones-core.js:14-17`.


**SoT = the plan file `C:\Users\rkgen\.claude\plans\i-want-you-to-fuzzy-wave.md`** (full per-tool
specs). Do NOT fork a second catalog file — v1's split between plan + `premium-tools-catalog.md`
is exactly the multi-copy drift §A.8.2 warns about. One file, this one points at it.

Opened by the operator immediately after [[project-premium-tools-program]] closed at 26 of 30
("later we will work on designing new tools"). **This is that commission, and it is DESIGN — the
build has not started and no tool has been picked.**

## The operator's brief (verbatim constraints)
20 NEW tools, **not expansions of the current set**; genuinely solve real K-3 problems
professionally + pedagogically; make teachers **seriously consider paying**; become the most
valuable assets of the whole site. Quality anchor: *"among the current tools only **Number Talk
Easel, Rekenrek, Learning Clock, Story Line, Fraction Kitchen** are close to this expectation —
the new 20 should exceed them."* Mid-session correction: **"the new tools should make teaching
much easier and effective in the classroom for the k3 teachers"** → classroom teaching
instruments, NOT back-office/teacher-productivity apps. (I had been drifting toward sub-plans /
parent notes / planning surfaces; that direction was cut. Do not revive it here.)

## ⚠ The five-property spec, read out of the source — this is the real deliverable
Analysing the five named tools produced the spec every new tool must meet. **The deepest
through-line, and the thing the other 21 lack:**

1. **The tool NEVER judges — the MATERIAL pushes back.** Fraction Kitchen: the wobble is "PHYSICS,
   never a verdict". Story Line: connectives pin to POSITIONS not cards, so a jumbled line makes
   the semantics audibly collide and "the laughter IS the feedback". Rekenrek: the per-travel
   clack-run lets the teacher **hear** one-push (structuring) vs seven-pushes (counting). Easel:
   the flash is too short to count one-by-one, so structure-seeing is *forced*. Clock: the honey
   arc shows *why* "halb drei". → Build a situation where the maths/language itself resists the
   wrong move; the child gets information without correction and the teacher gets a free window
   into thinking.
2. **The teacher's hand on the lever** — curtain/cover/reveal/count-it; nothing auto-advances;
   sun-moon is explicit teacher state, never derived.
3. **A deliberate ABSENCE that is itself pedagogy** + an explicit refuse-list in the file header.
   *A tool without an anti-feature list is a widget.*
4. **The moat is a language fact, not a feature** (einundzwanzig, halb drei, counted fraction forms).
5. **One screen, ready in 3 seconds, with a metaphor a six-year-old reads instantly.**

**Why the other 21 fall short** (useful triage vocabulary): they are a *utility* (Class Timer,
Name Sticks, Hush Owl, Our Day, Center Board, Feelings Check-In — manage the room, don't teach),
a *thin container for a word list* (Sound Boxes, Blending Board, Letter Tiles, Heart Words,
Syllable Splitter), or a *reference surface* (Picture Word Wall).

## The v2 thesis (what makes 20 exceed the 5)
> **Each tool ships a REPERTOIRE, not a sandbox** — a curriculum-ordered bank so the teacher opens
> it and *today's lesson is already in it*. Easier (zero prep) + more effective (a researched
> progression). And it is the honest paywall: **instrument free, repertoire premium** — Number
> Talk Easel's strings library made the rule instead of the exception.

## The 20 (six suites; full specs in the plan file)
- **A — Number Structure Bench (5):** Number Balance (equality-as-balance) · Part–Whole Frame
  (splitsen/Zerlegen) · Difference Bar (compare ≠ take-away) · Bridge to Ten (Zehnerübergang) ·
  Counting Collections.
- **B — Thinking Table (4):** ★ **Story Problem Stage** (CGI matrix, 3 number sets per story =
  differentiation with zero prep; the flagship) · Strategy Wall · Mystery Number · Guess My Rule.
- **C — Shape Studio (3):** Shape Workshop · **Build It** (NL *bouwsels* / DE *Würfelgebäude* —
  a European curriculum requirement with no product) · Mirror Bench.
- **D — Reading Circle (4):** Shared Reading Easel · **Read-Aloud Companion** (scaffolds the
  teacher's REAL physical picture book — no content pipeline, highest frequency, cheapest build) ·
  Word Machine (compounds/morphemes — the Germanic lever) · Dictation Desk (the encode side).
- **E — Talking & Writing (2):** Morning Message (shared pen, reuses the 11 school rulings) ·
  Notice & Wonder Window.
- **F — Many-Languages Classroom (2):** **Home-Language Bridge** · Cognate Bridge. CLAUDE.md §1
  names this audience and **not one of the 26 serves it**; the state of the art teachers are told
  to use is "visuals + Google Translate".

**Pilot order (approved):** A2 Part–Whole Frame → D14 Read-Aloud Companion → A1 Number Balance →
F19 Home-Language Bridge. Then Wave 2 (A4·A3·D16·B8·E18·C12), Wave 3 (A5·B7·B9·C10·D15·F20),
Wave 4 heavy (B6·D13·E17·C11).

## ⚠ Three shared pieces to build ONCE, before the pilot (found in the inventory)
1. **A real server-side Saved Setups store.** ALL persistence in ALL 26 tools is
   `localStorage['lcs:<tool>:v1']`, hand-rolled per tool, per browser, wiped by a cache clear —
   and *saving is itself a premium gate*. **We charge for "save" and what we sell can evaporate.**
   Every one of the 20 promises "keep this board". One `ToolSetup` model + one API behind
   `requireActiveSubscriber` + one shell module; localStorage demoted to offline cache.
2. **A shared print/export module.** No print helper exists; `lcs-shell.css` has **zero
   `@media print`**; 4 tools call bare `window.print()`; export is zero across all 26. Letter
   Studio's lesson: a print path must re-tone EVERY ink, not just the headline one.
3. **Promote `_freshSession`** (number-talk-easel's deterministic UTC-day rotation) into a shared
   repertoire loader — it is already the "today's instance" ritual shape the thesis needs.

Also noted: **no per-tool OG image** — `tools/[tool]/page.tsx` hardcodes `og-homepage.png`.

## Scope fences to state in each build (anti-cannibalisation)
Bridge to Ten vs the free Ten Frame (one frame you fill vs a two-frame TRANSFER) · Notice & Wonder
vs WODB (open scene generating the question vs closed defensible 2×2) · Word Machine vs Syllable
Splitter (splits by MEANING vs by SOUND) · Mirror Bench vs `robin-mirror-activity` (geometry vs
reflexive-pronoun grammar — name fence).

## Reuse facts verified this session (don't re-derive; several first guesses were WRONG)
`number-bond-core.js` 538ln ✓ · `compare-balance-core.js` 163ln ✓ · `shapeforge-core.js` = the
shape-composition engine (there is **no** `shape-fit-core`) · make-ten family = `ten-stones-core`
/ `ten-frame-tank-core` / `jump-tens-core` (**no** `make-ten-core`) · **no comparison-bar core**
(`comparison-creek-activity` runs on `river-steer-core.js`, a navigation engine) · no
`domino-two-part-core` (that activity runs on `read-bisyllable-core`). Story Line at 970 ln is the
size benchmark; premium tools average ~1,370 ln (35,630 across 26).

## RESUME TRIGGER
Operator says "let's build the first tool" or names one → do NOT re-research or re-design. Read
the plan file, EnterPlanMode for that ONE tool, build the instrument first and the repertoire
second, honour §A.13.62 DoD + §A.13.55 mobile gate + §A.13.60 variety + §A.13.42 cache-busters +
§A.13.48 native ensembles, and register per §21 (`TOOL_KEYS` in BOTH `tool-content.ts` and
`config/live-tool-slugs.ts` — miss the second and every locale 410s).

**Open decision the operator has not made:** commit to all twenty, or run the pilot four and
re-rank on what teachers actually open. Twenty is a program the size of the one just closed.

Related: [[project-premium-tools-program]] (the closed 26) · [[project-business-strategy-2026-07]]
(Teacher $69/yr; free discovery, paid depth) · [[feedback-visual-qa-container-containment]] (DoD).
