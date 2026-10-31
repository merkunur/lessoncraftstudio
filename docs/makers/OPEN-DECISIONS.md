# Open decisions for the operator — the worksheet makers (run F3, 2026-10-31)

Every operator-only decision from the four design documents (`ARCHITECTURE.md` §18, `ENGINES.md` "For the operator", `ENGINES-ART.md` §13, `NEW-TEMPLATES.md` "For the operator"), deduplicated and **ordered by what blocks the build first**. Each has a plain-language question, my recommendation, and the cost of each option. Items already decided on 2026-10-31 are marked **DECIDED** and kept so nothing is reopened by accident.

Nothing below needs to be decided before the five measuring spikes (S1–S5) and the platform work (P1–P6) start. #1–#4 must be decided before the pilot ships; #5–#12 before the first batch; the rest can wait for the batch they belong to.

## ✅ OPERATOR RULINGS 2026-10-31 (after F3): every item below is DECIDED

- **#1 Programme: (1b) everything at once.** About 450 sessions; every maker ships with ALL its new templates. Not two releases.
- **#2 Pilot: ten-frames · counting · sight-words.** Spelling is swapped for sight-words; word-scramble and word-guess retire with the literacy batch.
- **#6 Old-app features dropped:**
  - the free text box with 7 fonts;
  - custom page sizes (Letter/A4 portrait + landscape kept);
  - lock / align / layer order;
  - negative results in math;
  - the free title box, by the recommendation.
  - Bingo chip fill stays, in the advanced drawer.
- **#3–#5 and #7–#27: every recommendation below is ACCEPTED as written.** Items that depend on a measurement are decided by that measurement, using the recommended fallback:
  - #3 iPad PDF after S1, and #3b pdf.js only if S2 misses;
  - #20 maze pins vs graphs after S6.
  - #19 (es-MX week start) is asked of the native reviewer.

---

## Already decided (do not reopen)

| # | decision | ruling (2026-10-31) | where it lands |
|---|---|---|---|
| D-1 | Anonymous downloads | **Keep today's rules:** anonymous visitors cannot download; a free account gets 3 downloads a month; subscribers unlimited. Making and previewing stay free and unmetered for everyone. | ARCHITECTURE §9, §18-D |
| D-2 | New build dependency | **`esbuild` approved** as a dev dependency. No runtime dependency is added. | ARCHITECTURE §2.3, §18-H |
| D-3 | Hosted (rendered) worksheets | **Cap stays at 200 MB per subscriber**; the old store keeps working untouched. | ARCHITECTURE §13.5 |
| D-4 | Makers per topic | **One maker per topic (60).** Cross-link cards (#9 below) do not change this — a type still lives in exactly one maker. | MAKERS.md, topic-map |
| D-5 | Science | **Excluded** (76 types). The two sorting attributes `living` / `natural` are science and are never offered (ENGINES [sorting-Q1] tier 3). | MAKERS.md |
| D-6 | Languages | **Only the 11**, with en = American English, es = Mexican Spanish, pt = Brazilian Portuguese in every word, coin, date and convention. | everywhere |
| D-7 | AI | **No local or self-hosted AI, no AI in the product** — nothing generated at run time; "smart" = deterministic code + reviewed data. | everywhere |
| D-8 | Magic Squares uniqueness (G3-349) | Not a decision — a content defect under the standing rule, **fixed in code the same day** (commit `9f7ec9973`). What remains is confirming the live decks were republished in place. | ENGINES [logic-puzzles-Q1] |

---

## To decide — in the order they block the build

### 1. How big a programme are you funding? (blocks planning)
**Question.** The honest total for everything the four documents specify — platform, 60 makers, 33 old-app retirements, the picture engines and **297 brand-new templates** — is **≈ 450 Claude Code sessions** (25 platform + 266 makers + ≈ 160 templates). The earlier "≈ 230" counted the new templates inside 2–4 sessions per maker, which does not add up. Do you want the whole collection in one programme, or the makers first and the long tail of templates later?
- **Recommendation: (1a) build in two releases.** Release 1 = platform + every maker with its existing templates + each maker's **top-3** new templates (≈ 180 templates) ≈ **390 sessions**; Release 2 = the remaining ≈ 117 templates ≈ 60 sessions, purely additive (a new template is one file; nothing already shipped changes).
- (1b) everything in one programme ≈ 450 sessions — cost: ~60 more sessions before any teacher sees the first maker's full set.
- (1c) makers only, no new templates ≈ 290 sessions — cost: the brief's "exhaustive, with new templates" is not met; the gallery shows only what the catalogue already has.

### 2. Which three makers go first? (blocks the pilot)
**Question.** The pilot proves the whole chain (gallery → page → PDF on an iPad → student link) on one maker per language group: ten-frames (no words), counting (a little), and a word-bound one. ARCHITECTURE chose **spelling**; but spelling's two old apps (word-scramble, word-guess) are **new engines** that would be built before the chain is proven.
- **Recommendation: swap spelling for `sight-words`** (bank words only, no new engine; own words allowed as plain letters). The chain is proven one session sooner; word-scramble and word-guess retire later with the literacy batch (B5). Cost: those two old apps stay reachable two batches longer, and sight-words needs its word lists grown from 24 to ≥ 60 per locale (native authoring already counted).
- Alternative: keep spelling — cost: +1 session in the pilot and two engines built before the platform is proven.

### 3. What happens on an iPad when a teacher taps "Download PDF"? (blocks the pilot's download button; decided after spike S1)
**Question.** On Windows, Mac, Chromebook and Android the browser's print engine saves a perfect vector PDF. Spike S1 will show whether iPad Safari can **save** that file.
- **Recommendation: (3a) if it cannot, iPads get a "raster" PDF** (crisp when printed; text not selectable) and every other device keeps the vector PDF. Cost: one sentence of help text.
- (3b) iPads print only, no file — cost: iPad teachers cannot e-mail a worksheet.
- (3c) the server makes iPad PDFs — cost: server work on exactly the path the design keeps off the server; rejected unless (3a) fails too.
- **3b (new, F3): if spike S2 shows the in-browser "Save image" differs visibly from today's output**, the fallback rasterises the PDF with `pdf.js` in the browser — a **runtime dependency that needs your approval** under the no-new-dependencies rule. Recommendation: approve it *conditionally*, only if S2 misses. Cost: ~300 KB more JavaScript, loaded only when "Save image" is used.

### 4. Student links for worksheets that use a teacher's own photo (blocks the pilot's share button)
**Question.** A teacher's photo stays in her browser and never reaches our server (a rule already set). So a student link cannot show the photo on the student's device. What should the link do?
- **Recommendation: (4a) now — the share button is disabled with the reason and offers the PDF instead.** Cost: a small feature gap, zero storage, zero risk.
- (4b) later — a subscriber photo store (Hetzner Object Storage, ≤ 50 MB per subscriber, uploaded only when a link is minted). Cost: ~3 sessions + storage fees + a deletion policy. The recipe already has the slot, so (4b) can be added without redoing anything.
- Affected templates (NEW-TEMPLATES I): comic strip, family tree with photos, grid maze with my photo, the colouring-page frame, I-spy with own pictures. All ship under (4a) with the refusal sentence.

### 5. When a template is corrected for a pedagogical mistake, what happens to saved worksheets and old student links?
**Question.** Your standing rule says a mistake is fixed everywhere at once. The design also promises a saved recipe rebuilds identically.
- **Recommendation: (5a) a *content* fix re-routes every old recipe and student link to the fixed version, with a one-line banner ("This template was corrected on …"); layout polish and new templates leave saved pages exactly as they were.** Cost: one migration record per fix.
- (5b) every new version re-routes everything — cost: a teacher's saved page can silently change its look.
- (5c) never re-route — contradicts your standing rule.

### 6. Which old-app features are dropped on purpose? (needs an explicit yes per item; blocks each retirement)
**Question.** Everything in the 33 old apps maps to a template, a control or an export option **except** these, which only exist because the old apps were free-canvas editors:
1. the free text box with 7 fonts and outline colours;
2. custom page sizes beyond Letter/A4 (portrait **and** landscape are kept);
3. element lock / align / bring-forward / send-back;
4. math-worksheet's "allow negative results" (above the K-3 ceiling);
5. bingo's "chip fill" style (moves to the advanced drawer, not dropped);
6. wordsearch / crossword free "title" box (the page title covers it).
- **Recommendation: drop 1–4 and 6; keep 5 in the drawer.** Cost of keeping 1–3: a free-canvas layer the quality gates cannot judge — the thing this design exists to remove.

### 7. The native-language data the new templates need — one batch up front, or per maker?
**Question.** About 1,400 strings across 14 data items (two-step word-problem frames, daily-routine words, adjective triples, verb person forms, diminutives, the definite-article table, number riddles, fraction words, ordinals 11th–31st, emergency numbers, vowel-length flags, caller/prompt strings) plus the thin banks the makers will expose (sight words 24 → ≥ 60 per locale; reading passages 8 per locale; pixel figures 4 → ≥ 12 per size; cryptogram phrases 0 → 20–40; the 101–1000 number words). Each is drafted in-session and checked by **one reviewer over all 11 locales** (never eleven reviewers).
- **Recommendation: (7a) author per maker inside its batch.** A template is simply not offered in a locale until its data is signed — the standing mechanism, so nothing ships half-authored. Cost: none beyond the sessions already counted; some templates appear in 7–9 locales first and reach 11 a batch later.
- (7b) one authoring batch before B1 — cost: 3–4 sessions early; benefit: every template ships in 11 locales on day one.
- Reading passages (8 per locale) are a separate content programme either way (≈ 0.3 session per 8 passages per locale); the "to 1000" number words are offered per locale only after that locale's table is signed (the alternative — cap the maker at 100 — removes the control everywhere).

### 8. Classroom materials (cut-outs, cards, posters, games, open frames) — are they templates?
**Question.** About 54 of the 297 new templates have no answer key and no student screen: flash cards, word walls, play money, nets to fold, fact triangles, bingo callers, fold booklets, story maps. Teacher searches ask for exactly these ("Bildkarten", "flitswoorden", "tablas en llavero", "imagier", "kuvakortit").
- **Recommendation: (8a) ship them as gallery cards with a "classroom material" badge** — no key, no share-to-students, download metered like any page. Cost: the badge plus one gate rule (a material declares `screen: none` and prints no answer box).
- (8b) exclude them — cost: the most-searched card formats stay unavailable and teachers keep using Canva for them.

### 9. Cross-link cards — may a maker show a card that opens another maker's template?
**Question.** Some strongly searched tasks technically belong to another maker (the odd/even maze → Mazes; sight-word bingo → Bingo; the number-word search → Word Search; the make-ten bridge as a bond → Number Lines; colour by sight word → Colour by Number). The rule is one maker per type.
- **Recommendation: (9a) yes — a *cross-link card*:** a gallery card in maker A that opens maker B's template preset. No type is duplicated, no second code path. Cost: one shell affordance (a card kind with a `link` instead of a `template`).
- (9b) no cross-links — cost: a teacher in Odd & Even never finds the odd/even maze.

### 10. Gallery thumbnails in every language, or English with a caption?
**Question.** The gallery shows a small picture of each finished sheet. Per language that is ≈ 1,052 templates × 11 ≈ 11,600 small images ≈ 140 MB on disk and ≈ 30 minutes of rendering per full rebuild (only changed templates are re-rendered day to day).
- **Recommendation: (10a) per language** — a Finnish teacher sees a Finnish sheet. Cost: 140 MB of served disk (a served-file class, exempt from the disk-hygiene sweeps).
- (10b) English pictures with a translated caption — cost: Finnish teachers see English sheets in the gallery.

### 11. The written column method (carry / borrow) — a control, or silent per country?
**Question.** Schools write addition carries and subtraction borrows differently per country (de "Übertrag" below, fr compensation, en-US borrowing above, the Austrian method). A native reviewer confirms each country's row.
- **Recommendation: (11a) apply each country's method silently; show a "Written method" choice only in de, nl and da, where schools genuinely teach two.** Cost: none; a teacher can never pick a foreign method by mistake.
- (11b) show the choice everywhere, preselected — cost: one more control against the 7-control cap on 25 templates, and a wrong pick is possible.

### 12. Inches and °F for American teachers — default or second option?
**Question.** The existing measuring tools are metric. CCSS 2.MD.A.1 names inches and feet. The other ten countries never see customary units either way.
- **Recommendation: (12a) inches / °F as the default on en-US length and temperature templates, with centimetres / °C as a second gallery card.** Cost: the ruler and thermometer primitives gain a unit option (counted).
- (12b) metric default everywhere — cost: US teachers see centimetres first.

### 13. Rude-word blocklists for word searches — plain text in the repository?
**Question.** A word search must never spell a rude word by accident, in any of the 11 languages. That needs lists of those words as data (≥ 80 per language), never displayed.
- **Recommendation: (13a) plain (folded) word lists in the repository, scanned against the UNION of all 11 lists** (a Danish word in a Swedish grid is still a Danish word; classes are mixed). Cost: the lists exist in the repo; reviewable, testable, diffable.
- (13b) hashed lists — cost: a native reviewer cannot check them and the scan is slower and opaque. (13c) scan only the grid's own language — cost: misses the mixed-class case.

### 14. Sorting by the teacher's own two labels — allowed before the picture-attribute review is complete?
**Question.** The most requested sort is "sort into MY two groups" (At school / At home). The maker can let the teacher type two labels and drag each picture into a bin herself; the page then says "teacher-made" and is scored strictly on her assignment. Automatic attribute sorting (edible / moves by itself) needs the picture-attribute review, which today records only a **count** of reviewed pictures (456 of 933) with no mark on the pictures themselves — so that tier cannot be built until the review is recorded per picture (a data task, ≈ 2 sessions, not a decision).
- **Recommendation: (14a) yes to own labels now**, with the chip. Cost: none; it is the sort teachers ask for. Attribute sorting follows when the per-picture flag lands.
- (14b) no own labels until the review is complete — cost: months of delay on the most-requested sort.

### 15. Teachers' own sentences — where allowed?
**Question.** A teacher can type her own sentences for sentence strips, trace/copy pages, "fix the capital and full stop", and an open cloze (she marks the gap). She **cannot** type them for unscramble puzzles, cloze with a word bank, or question-word matching, because "exactly one right order / one right word" cannot be checked by code and a two-answer puzzle is a defect by your own rule.
- **Recommendation: (15a) exactly that split**, stated on each gallery card. Cost: none.
- (15b) allow unscramble "with a warning" — prints two-answer puzzles; not recommended.

### 16. A left-handed layout option for the tracing makers?
**Question.** German, French and Dutch teachers search for left-handed tracing sheets (model on the RIGHT so the hand does not cover it; rows start at the right margin).
- **Recommendation: (16a) one drawer option "Model on the right"** on pre-writing, number-tracing, letter-tracing, word-writing and cursive. Cost ≈ 0.3 session, no new template.
- (16b) none — cost: a real, searched need unmet where left-handed sheets are standard.

### 17. Coins: drawn tokens or realistic pictures?
**Question.** Today's money pages use stylised tokens (a circle, a ring, the value printed on it), never a picture of a real coin.
- **Recommendation: (17a) keep the tokens.** Reproducing currency is restricted or licence-bound in every one of the 11 markets (US size/colour rules, the ECB's euro design, Banxico, the BCB, the Nordic central banks), a realistic coin prints as a grey disc on a copier, and the published decks already use tokens. Cost: none.
- (17b) realistic coin art — cost ≈ 3 sessions + a legal review per currency. I am not a lawyer; (17a) avoids the question.

### 18. A "numeral style" control (plain / flagged 1 / crossed 7) for bilingual classes?
**Question.** Each country's school form of the digits is applied automatically from the content language (the native reviewers ruled nl/sv/no/da/fi uncrossed 7; es/pt plain; de/fr/it crossed).
- **Recommendation: (18a) no control** — the school form is silent; a control invites a wrong form. Cost: a bilingual class cannot pick the other form.
- (18b) a drawer option — cost: one control + one gate case.

### 19. The Mexican week: Sunday-first or Monday-first calendars?
**Question.** The calendar code has en-US and pt-BR starting on Sunday and the other nine on Monday. Mexican printed calendars are very often Sunday-first; ISO Monday-first also circulates.
- **Recommendation: (19a) ask the es-MX reviewer to rule once and encode it as the locale's fact.** Cost: one question.
- (19b) keep Monday — cost: a possible mismatch on every Mexican calendar page.

### 20. Mazes: pinned fast seeds, or shipped maze graphs? (decide after spike S6)
**Question.** The hand-made maze generator sometimes needs up to 30 seconds to find a good maze — fine offline, impossible in a browser. The maker therefore ships, for every scene and level, a pool of seeds measured to build fast and rebuilds one of them.
- **Recommendation: (20a) pinned seeds** (12–20 per scene × level) — data is a few numbers, the engine is unchanged, "New version" steps to the next pin. Cost: a teacher pressing "New version" 20 times on one scene sees a repeat (she can change scene or level); the pin tool gains a timer (≈ 0.3 session).
- (20b) ship the finished maze graph per pin (≈ 50 MB) — zero build time on any device, same repeat limit; cost ≈ 0.5 session + served disk. S6 decides between (20a) and (20b) by measurement.
- (20c) generate live with a 2-second cut-off — rejected: 10–30 % of presses would fail on an iPad.

### 21. How to Draw "editable step layers" — how free?
**Question.** The competitor lets a teacher toggle and reorder the drawing steps. Our steps are derived from each drawing's ink; a step moved in front of a line it should sit behind teaches erasing, and a step hidden without a traced "kept" drawing leaves ghost lines.
- **Recommendation: (21a) toggle = only steps that ship a traced "kept" variant; reorder = only the inner steps (structure stays first, details last), both re-checked live.** Cost: none beyond the shipped data.
- (21b) free toggle/reorder — rejected (the ghost-line defect the Level Set already paid for).

### 22. Picture tracing: how much of the library gets a trace?
**Question.** The maker cannot ship without a new precomputed trace per black-and-white drawing (today traces are computed at build time on the PC).
- **Recommendation: (22a) all 1,302 traceable drawings now** — one offline run (90 s) plus a contact-sheet read (≈ 0.5 session). Cost: ≈ 13 MB of data.
- (22b) only the 300 drawings the current faces use — cost: the "trace any library picture" template waits.

### 23. Colour-by-code on library art — only the ≈ 20 designs that fit, or review more?
**Question.** A sum like "3+4" needs a region about 2.4× wider than a digit; only ≈ 20 of the 200 designs have room in every region.
- **Recommendation: (23a) ship the code keys on those 20 and keep the generated shape pages for the rest.** Cost: none.
- (23b) review 30–40 bigger-part designs offline — cost ≈ 1 session per 20 designs (build + colour-sheet reads).

### 24. The Nordic alphabet dot-to-dot (29 letters) — hold or ship with 5 pictures?
**Question.** Only 5 pictures today have an outline long enough for 29 letters (sv/da/no/fi).
- **Recommendation: (24a) hold the alphabet face in those four languages** until the two-stretch builder yields ≥ 20 pictures (≈ 1 session offline + a sheet read). Cost: a visible gap for a while.
- (24b) ship with 5 — cost: visible repetition in four markets.

### 25. Three "own picture" features for later (not in the first release)
- **Dot-to-dot from a transparent cut-out (PNG with alpha):** possible and checkable live; recommendation: not in v1; later ≈ 1 session + S6 time.
- **Picture tracing of a scanned child's/teacher's own pen drawing on white paper:** the one own-picture feature that can be *proven*; recommendation: not in v1; later ≈ 1.5 sessions (laws ported to canvas, a plain refusal sentence for shadows/grey paper).
- **A "sketch filter" that turns a photo into a colouring page:** cannot be made reliably without a model (forbidden) and cannot be gated; recommendation: photos stay "as is" on colouring pages; an optional 1-session spike only if you want it, behind a teacher-accepted preview and a "your own changes" chip.

### 26. Cursive in Finnish and Swedish — refused by the curriculum, demanded by search
**Question.** "kaunokirjoitus" is the top Finnish cursive search, and sv "skrivstil" exists; but OPS 2014 teaches only print and Lgr22 has no joined script, so the cursive maker is offered in 9 languages.
- **Recommendation: (26a) keep the refusal**; the fi/sv landing page explains why and points to the print letter-tracing maker. Cost: a visible refusal on a searched term.
- (26b) offer a "kaunokirjoitus" page from a vendored joined font as an optional craft — cost: a font licence and the reviewers' objection that it is not the school script; not recommended.

### 27. Long division and written multiplication
**Question.** Searched in several markets ("uppställning", "schriftlich multiplizieren", "continhas armadas", "long division"), above the K-3 core, no primitive, and the layout differs per country.
- **Recommendation: (27a) out of this programme.** Cost: a searched G3/G4 topic stays unserved.
- (27b) a later "written methods" maker with an 11-country layout table — cost ≈ 2 sessions + native layouts.

---

## What is NOT a decision (recorded so it is not mistaken for one)
- The pedagogical content of every template is fixed by the standing rules (native + pedagogy check before publish; a mistake fixed everywhere at once; one right answer; no answer tells; counting never includes 0; a written box gets a written screen; black-and-white and colour art never mixed; a page fills its body).
- The per-picture `reviewed` flag in `mini tools/object-attributes.json` (#14) is a data task for the review's owner, not a choice.
- G3-358's duplicate multiplication-sign table is a one-line code fix under the notation gate.
