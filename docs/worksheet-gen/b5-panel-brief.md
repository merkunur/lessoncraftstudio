# nt10-E — native panel brief (one panel per locale: linguist · K-3 educator · SEO, in one head)

You are REBUILDING ten K-3 printable worksheet families — 10 base pages + 50 variation faces = 60 types — for **your language and your country's school**, not translating the English. The English is the SOURCE you must also AUDIT (every earlier batch's panels found real defects in it; list yours in `enAudit`). Read, in this order:

1. `docs/worksheet-gen/b5-designs/README.md` — the 10 families, ids, the hub matrix (which faces your locale is EXPECTED to refuse), cross-type rulings. "Free" may appear in SEO metadata (skills, topicMeta) but never in anything the child or teacher SEES (titles, instructions, the family name in the hub rail, bank literals).
2. Per family: the FINAL design file `docs/worksheet-gen/b5-designs/<ID>-<key>.md` (§3 the five faces, **§4 the native rebuild plan for your locale — it names what you must author, refuse or re-target**, §5 the data shape + rules), then `_work/<ID>-build.md` and `_work/<ID>-faces.md` (measured deviations, width/length caps from the real fonts, refusals already visible).
3. The rendered EN pages: `scripts/worksheet-gen/out/dev/<id>-null-d2-en.png` for the 10 bases and 50 faces — LOOK at each family's pages before writing a string. Render YOUR locale's sample after applying a first draft (`node scripts/worksheet-gen/render/one.js <id> null 2 <loc>`) and READ it: overflow, orphan lines, a word that means something else on the page.
4. The EN bank: `scripts/worksheet-gen/data/b5/<key>.js` — its `en` block IS the shape; its header + `qa/verify-b5-<key>.js validateBank` are the rules.
5. The validator: `node scripts/worksheet-gen/tools/validate-b5-draft.js <loc>` (it also BUILDS all 60 types against your blocks and refuses an undeclared refusal). Iterate until `0 error(s)`.

## Deliver ONE file: `scripts/worksheet-gen/i18n/.draft-b5-<loc>.json`
Shape identical to the nt10-D panels' (see `docs/worksheet-gen/b4-panel-brief.md` "What you deliver"): `locale`, `types` (every id you SHIP: title + instruction), `families` (10 × {slug, name}), `skills` (10 × {full 60-180, short 15-90}), `topicMeta` (10 × ≥50 chars), `banks` (10 × your locale's block, exact shape of the en block), `refusals` (id → reason ≥12 chars), optional `strandNames`, `enAudit`.
The 60 ids: the 10 bases + the 50 faces in `docs/worksheet-gen/b5-designs/_records/b5var-id-allocation.json` (titles/modes in `scripts/worksheet-gen/tools/b5var-rows/<key>.js`).

## Load-bearing rules (every one cost a defect in an earlier batch)
- **Titles = the genre name a teacher in your country types into Google** (the four selection reports `docs/worksheet-gen/b5-designs/_work/_selection-*.md` hold your locale's measured heads and winnable long-tail faces — use them), ≤ 70 chars, never your language's worksheet word (the engine appends it), unique in the band against ALL existing titles, never a theme slug alone (compound heads for 2d-shapes / earth-and-space: `shapes`, `space` are theme slugs), never the name of a neighbouring family (science-sequence's "life cycles", syllable-reading's "word families", opposites' "synonyms and antonyms", the geometry family's "geometric shapes" title in your locale — the validator checks the taxonomy). A face title names what CHANGES on that face.
- **Instructions ≤ 150 chars, one child-level sentence, name ONLY apparatus that is on that face's page** (a base was sent back for quoting "stop or go" over cards that say "wait / walk"). Fit the chrome: 722 body (3-line title + 3-line instruction), 677 with a 4-line fi title — keep fi titles to ≤ 3 lines where the records say so.
- **No NBSP / soft hyphen / zero-width characters in any string** (they leak into SEO titles and slugs). Titles wrap balanced by CSS; never hand-break them.
- **Slugs** ASCII-kebab, folded (da ø→oe å→aa æ→ae · no ø→o · sv/fi ä→a ö→o · es ñ→n · de ä→ae ö→oe ü→ue ß→ss), unique across the locale's families.
- **Banks substitute stored literals only — the code never inflects.** Every printed word is a literal from your block. Where a frame needs a case/definite/article form, the block carries it for every word it uses.
- **Refuse, never pad.** Declare every face your language cannot honestly carry under `refusals` with the reason, and omit it from `types`. Known at design time: digraphs whole family in es/it/sv/da/no (the validator expects these refusals), digraphs F4 pt, word-parts F4 es/fr and F3 fi. If you find a GENUINE native re-target for a refused face (evidence: your national curriculum + ≥6 approved picture words per team), say so in `enAudit` with the evidence — do not ship it silently.
- **Open every picture the bank pins**: filenames lie (a plum is an apple, a cherry reads as an apple, `crossing_guard_2` is a red octagon with English text). Never a B&W theme (the marker is localized: BW/SW/BN/NB/ZW/SH/PB/MV/SV).

## Locale data this batch needs from YOU (each family's §4 has the detail)
- **road-safety**: your country's sign set a K-2 child learns and each sign's meaning; the pedestrian light (standing/walking figure or hand), whether amber exists on the pedestrian light, the STOP-sign text (STOP / PARE / ALTO); sign classes for the sort face. These are LAW-level facts — cite the regulation name in `enAudit` when you are sure, mark `unsure` where you are not.
- **maps**: compass letters (de O, fr/it/es/pt O for west and L/E for east traps, fi P/E/I/L, sv/da/no Ø/V…), the number and names of continents and oceans your schools teach, map-key words.
- **earth-and-space**: Sun/Earth/Moon capitalisation convention, phase names your school uses (four main shapes), planet names; pt-BR mirrors the moon (southern hemisphere), everyone else is northern.
- **family**: kin terms incl. lineage terms (sv/da/no mormor/farmor/morfar/farfar; fi isoäiti/mummo, eno/setä), the register children use (mom/mum/mamma), names for the tree people (a balanced set of names).
- **digraphs** (en de fr nl pt fi only): your letter-team inventory NOT owned by spelling-rules/syllable-reading, each word with a signed grapheme segmentation, only from `approved-words-<loc>.json`, pictures opened.
- **synonyms**: ≥ 21 word groups (13 adjectives + 8 verbs) a 7-8-year-old knows, near-synonym bans, concept-opposite links, the "said" field (de Wortfeld sagen), go/look fields.
- **word-parts**: ≥ 6 root families × 7 members natural in your language (at most one compound; none from the compound-words bank; no negating prefixes), a prefix key with meanings, agent nouns.
- **plants / animal-life-cycles / 2d-shapes**: the school names of the plant parts, life stages (pt sapo vs rã; never "cocoon" for the butterfly), and shape names (fr rond/cercle/disque by grade; sv fyrkant vs kvadrat).

## Self-check before you finish
- Every family: read §4 for YOUR locale again — every table authored, every listed refusal declared?
- Every title: would a teacher in your country type it? Distinct from its siblings in the band?
- Every literal: is it what a 5-8-year-old in your country reads at school (national-framework register, never a US calque)?
- You rendered and READ at least one page per family in your locale.
- `enAudit` non-empty unless you genuinely found nothing (say so).
- `node scripts/worksheet-gen/tools/validate-b5-draft.js <loc>` → `0 error(s)`.
