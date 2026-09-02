# nt20-B — native panel brief (one 3-agent panel per locale)

You are rebuilding TWENTY new K-3 printable worksheet types for **your language**, not translating the English. The English is the SOURCE you must also AUDIT (every nt20 panel found defects in it; report yours in `enAudit`). Read, in this order:

1. `docs/worksheet-gen/b2-design-specs.md` — the locked design + amendments (what each page IS).
2. The rendered EN pages (PNG) — `scripts/worksheet-gen/out/b2-sweep/<TYPE>-<theme>-d2-en.png` — LOOK at each of the 20 before writing a single string.
3. The EN data modules you are rebuilding: `scripts/worksheet-gen/data/b2/{sentences,word-classes,shop-frames,wp-muldiv-frames,labels,figure-names,calendar}.js`, `data/color-words.js`, and `i18n/strings.en.json` (the 20 ids K-284…G3-370).
4. The validator you must pass: `scripts/worksheet-gen/tools/validate-b2-draft.js` (its header lists every rule).

## What you deliver — ONE file: `scripts/worksheet-gen/i18n/.draft-b2-<loc>.json`

```jsonc
{
  "locale": "de",
  "types": { "K-284": { "title": "…", "instruction": "…" }, … 20 ids … },
  "families": { "word-tracing": { "slug": "woerter-nachspuren", "name": "Wörter nachspuren" }, … 17 … },
  "skills":   { "word-tracing": { "full": "60-180 chars", "short": "15-90 chars" }, … 17 … },
  "topicMeta":{ "word-tracing": "≥ 50 chars, the hub-card meta description", … 17 … },
  "colorWords": { "orange": "…", "purple": "…", "brown": "…", "pink": "…" },
  "figureNames": { "star": "…", … 25 keys (see data/b2/figure-names.js en) … },
  "labels": { "numberOfDay": {14 keys}, "doublesHalves": {"double","half" ≤14 chars}, "singularPlural": {"one","many" ≤12},
              "pictureWriting": {"d1": [3 starters], "d2": [2 NARRATIVE starters]} (≤22 chars, no end mark),
              "fixChecklist": {"capital","name","end"}, "articles": {"title": "…"} },
  "calendar": { "weekStart": 1, "dayAbbr": [7, Sunday-first] (only if you change ours), "dayPlural": [7] (audit ours),
                "frames": { "dayOfDate": "… {date} …", "countWeekday": "… {dayPlural} …", "stickerDate": "… {sticker} …",
                            "weekLater": "… {date} …", "daysInMonth": "…", "firstDay": "…", "lastDay": "…", "after": "… {stickerA} … {stickerB} …" } },
  "sentences": { "nounCase": "lower|keep", "endSpace": false, "names": [8 native first names],
                 "colorWords": null | {in-sentence colour forms}, "nounForms": {} | {"partitive": {vocabKey: form…}},
                 "fixLabels": {"capital","name","end"},
                 "frames": [ 12-20 frames: {"id","kind":"color|simple","text","noun":"sg|pl|<table>","uses":["unscramble","fix"],"exclaimStrict"?} ] },
  "wordClasses": { "terms": {"noun","verb","adj"}, "chipCase": "keep|lower", "chipCaseD3": "lower",
                   "verbs": [≥24 {"w","tier":1|2|3}], "adjectives": [≥24 {"w","tier"}], "nounExclude": [homographs] },
  "shopFrames": { "yes": "…", "no": "…", "frames": { "total": [≥2], "total3": [≥1], "change": [≥2], "canBuy": [≥2], "diff": [≥2] } },
  "wpMulDiv": { "nounForm": "plural|partitive", "nounCase": "lower|keep", "nounForms"?: {…}, "names": [8],
                "frames": { "mul": [≥3], "share": [≥3], "group": [≥3] } },
  "articles": { "refuse": false, "note": "…" }            // optional: fi may set refuse:true (then no K-288 ships)
  "enAudit": [ "defects you found in the EN source, one per line" ]
}
```

## Load-bearing rules (each one cost a defect in nt20 — do not re-learn them)
- **Titles = the GENRE NAME a teacher in your country types into Google** (Schwungübungen, coloriage magique, tabuada…). Never contain your language's worksheet-word (Arbeitsblatt / feuille / ficha / werkblad / arbetsblad / tehtävä…) — the engine appends it. Unique within the grade band against ALL existing titles (the validator checks).
- **Slugs** ASCII-kebab, folded (da ø→oe å→aa æ→ae · no ø→o · sv/fi ä→a ö→o · es ñ→n), unique across the locale's 95 families.
- **Frames substitute stored literals only.** `{noun}` = the vocab singular/plural EXACTLY as stored (or your curated table); the code never inflects. Articles, prepositions, adjectives live INSIDE your frame text. Available noun forms: singular, plural (+ gender code for the article page). If your grammar needs a case form (fi partitive, de dative) supply a `nounForms.<table>` covering EVERY noun of the wave themes (fruits, vehicles, toys, animals; BW: animals bw, fruits bw, farm animals bw, toys bw) — the validator lists gaps.
- **`{name}` repeats — never a pronoun** (gender underivable). Two `{name}` in one frame get two different names automatically.
- **Read-and-color frames** "Color {n} {noun} {color}.": n is 2-6, noun is PLURAL (or your table), colour is the in-sentence form (sv/da/no plural adjective `röda`; fi translative `siniseksi`; de `… blau an`; Romance `en bleu / de azul / di blu`). The legend shows the dictionary word from `colorWords`.
- **Unscramble frames** must have ONE unmarked natural order — no movable adverbial (heute/hier/every day), de = verb-second with the subject first; fi: pick frames whose case marking fixes the order, or refuse (`uses` without 'unscramble').
- **Fix frames**: the page lowercases everything and strips the end mark — so `{name}` (and de nouns via `nounCase:"keep"`) are what the child restores. ≥ 6 with `{name}`, ≥ 2 questions; `!` only with `exclaimStrict:true` (an interjection — "Wie schön!").
- **Word classes**: citation forms (de/fr/fi infinitive; adjectives masculine/nominative); `nounExclude` must list every verb/adjective that is a homograph of a vocab noun in your language (the validator prints candidates).
- **Shopping frames** carry NO noun: items are inline PICTURES `{item1} {item2} {item3}`, `{coins}` is the coin row, `{money}` renders "60 ct" in YOUR unit (the nt20 currency rulings stand: de ct · es cts · fr c · it cent · pt centavos · nl/fi ct · sv kr · da kr. · no kr · en ¢).
- **Calendar**: audit our pre-authored day/month names + weekStart (en/pt-BR Sunday, others Monday); frames ≤ 90 chars with exactly their slots; `{date}` is an ordinal in your style; `{dayPlural}` is your plural of the weekday.
- **Articles (K-288)** is REBUILT per locale by code (de der/die/das · nl de/het · fr le/la · es el/la · pt o/a · it il/la · sv en/ett · da en/et · no en/et · en a/an · fi yksikkö/monikko). You author only its title/instruction (and may `refuse`).
- **Length budgets**: instructions ≤ 2 lines at 17 px on 660 px (≈ 150 chars); labels are pills (see caps above); skill `full` 60-180, `short` 15-90; topicMeta ≥ 50.
- Write the JSON with the Write tool (clean accents), run `node scripts/worksheet-gen/tools/validate-b2-draft.js <loc>` yourself, and fix until it prints `ok`.
