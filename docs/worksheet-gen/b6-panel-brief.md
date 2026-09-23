# nt5-F — native panel brief (one panel per locale: linguist · K-3 teacher of THAT country · SEO, in one head)

You are REBUILDING five K-3 printable worksheet families — 5 base pages + 25 variation faces = 30 types — for **your language and your country's school**, not translating the English. The English is the SOURCE you must also AUDIT (every earlier batch's panels found real defects in it; list yours in `enAudit`). Read, in this order:

1. `docs/worksheet-gen/b6-designs/README.md` — the 5 families, ids, the hub matrix (which faces your locale is EXPECTED to refuse), cross-type rulings, and `_PANEL-FINDINGS.md` (the lock and naming rules). "Free" may appear in SEO metadata (skills, topicMeta) but never in anything the child or teacher SEES.
2. Per family: the FINAL design file `docs/worksheet-gen/b6-designs/<ID>-<key>.md` (§3 faces, **§4 the native rebuild plan for your locale**, §5 data shape + rules, **§6 the title heads for your locale** — measured from Google autocomplete in your market), then `_work/<ID>-build.md` and `_work/<ID>-faces.md` (measured deviations, width caps, refusals already visible).
3. The rendered EN pages: `scripts/worksheet-gen/out/dev/<id>-null-d2-en.png` (cursive: `…-d2-en-uus-trad.png`) — LOOK at each family's pages before writing a string. After a first draft is applied to a temp dir by the validator, render YOUR locale (`node scripts/worksheet-gen/render/one.js <id> null 2 <loc> [unit]`) and READ it: overflow, orphan lines, a label that names the wrong thing, a word that means something else on the page.
4. The EN bank: `scripts/worksheet-gen/data/b6/<key>.js` — its `en` block IS the shape; its header + `qa/verify-b6-<key>.js validateBank` are the rules.
5. The validator: `node scripts/worksheet-gen/tools/validate-b6-draft.js <loc>` (it BUILDS all 30 types against your blocks and refuses an undeclared refusal). Iterate until `0 error(s)`.

## Deliver ONE file: `scripts/worksheet-gen/i18n/.draft-b6-<loc>.json`
Shape: `locale`, `types` (every id you SHIP: {title, instruction}), `families` (5 × {slug, name} — `name` is the sidebar rail label teachers see), `skills` (5 × {full 60-180, short 15-90}), `topicMeta` (5 × ≥50 chars), `banks` (5 × your locale's block, exact shape of the en block), `refusals` (id → reason ≥12 chars), optional `strandNames`, `enAudit` (array).
The 30 ids: the 5 bases + the 25 faces in `docs/worksheet-gen/b6-designs/_records/b6var-id-allocation.json` (EN titles/modes in `scripts/worksheet-gen/tools/b6var-rows/<key>.js`).

## Load-bearing rules (every one cost a defect in an earlier batch)
- **Titles = the genre name a teacher in your country types into Google** (use the heads in each final's §6 and the four `_work/_selection-*.md` reports), ≤ 70 chars, never your language's worksheet word (the engine appends it), unique in the band against ALL existing titles, never a theme slug alone, never a neighbour's title: the live G1-204 "sink or float?" and G1-202 "where do animals live?" titles in your locale, science-sequence's "life cycles", the tracing families' "tracing" words, K-374's "step by step" family, food words on healthy-habits. A face title names what CHANGES on that face.
- **Instructions ≤ 150 chars, one child-level sentence, name ONLY apparatus that is on that face's page.** Fit the chrome (722 body; 677 with a 4-line fi title).
- **Picture LABELS are your literals, never the raw vocabulary** (the vocab `nail` is a fingernail in several locales, `rock` a cliff, `driftwood` names the answer). Open every picture you label and write the word a 6-year-old in your country says for THAT drawing.
- **No NBSP / soft hyphen / zero-width characters.** Slugs ASCII-kebab, folded (da ø→oe å→aa æ→ae · no ø→o · sv/fi ä→a ö→o · es ñ→n · de ä→ae ö→oe ü→ue ß→ss), unique in your locale.
- **Banks substitute stored literals only — the code never inflects.**
- **Refuse, never pad.** Declare every face your language cannot honestly carry under `refusals` with the reason and omit it from `types`. Known: cursive-writing whole family in **sv and fi** (no joined school script in Lgr22 / OPS 2014; no matching font) — the validator expects these refusals; it/es may refuse the cursive capitals face if cursive capitals are not taught (say why).

## Locale data this batch needs from YOU (each family's §4 has the detail)
- **story-sequencing**: the temporal words your school uses (first / next / then / last — 3 chip words for the K face, 4 sentence openers, 4 writing starters that never force a case or word-order error), the beginning/middle/end labels, the story sentences for the sentences face (each fits exactly one panel), the story word bank for the retell face. Check every drawn story reads the same way in your culture (a snowman may be foreign in es-MX/pt-BR: the bank says which stories to exclude).
- **healthy-habits**: the habit words and the tools' names as children say them, the brushing phase chips (before / while / after; fi needs short forms that fit the measured chip width), the reason sentences (none names its own tool or body part; none fits two habits), your week start + day abbreviations from your calendar convention, the germ-choice sentences if any. Public-health truth in YOUR country (cough into the elbow; no times, no numbers).
- **habitats**: your habitat SET and names (§4: de Wald/Wiese/Teich/Meer, Nordic forest/meadow/lake/sea — no "sjø" for lake in no, pt-BR biomes without "Cerrado" for the savanna tile, es-MX selva/bosque/mar/lago…), animal names for the opened pictures (a duckling may be a "chick" to a child: choose honestly), home words (one word per drawn home; fi "pesä" covers several: pick distinct ones or rely on the pictures), adaptation sentences.
- **sink-or-float**: float / sink verbs children use (de "schwimmt" also means "swims": prefer "schwimmt oben / geht unter" if your panel judges it clearer), the apparatus words (ring / tank / star) — no picture label may contain them, every picture label, the true/false sentences (checked science), the investigation questions.
- **cursive-writing** (not sv/fi): confirm your script unit (en us-trad · de va + la · fr fr-trad · it it-trad · es mx · pt br · nl nl · da dk-uloopet · no no) matches what children learn TODAY and look at the rendered glyphs; the stroke-family letter lessons in YOUR school order; the join pairs; the word list (opened pictures, de nouns capitalised); the copy sentences (4-6 words, K-3 vocabulary, measured width cap); the names for the capitals face (from your names bank); your ruling system's name. Never call the page "tracing".

## Self-check before you finish
- Every family: §4 for YOUR locale re-read — every table authored, every refusal declared?
- Every title: would a teacher in your country type it? Distinct from siblings in the band and from the live G1-204/G1-202 titles?
- Every literal: what a 5-8-year-old in your country reads at school (national register, never a US calque)?
- You rendered and READ at least one page per family in your locale.
- `enAudit` non-empty unless you genuinely found nothing (say so).
- `node scripts/worksheet-gen/tools/validate-b6-draft.js <loc>` → `0 error(s)`.
