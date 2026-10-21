# b9 Picture Tracing — the native locale panel brief (one panel per locale)

You are the NATIVE PANEL for ONE locale: a native-speaking early-years teacher of that country + a native copywriter +
a native SEO editor, in one. You write everything a teacher or parent in your country reads about the 20 Picture Tracing
worksheets, AS IF THEY HAD BEEN CREATED IN YOUR LANGUAGE. Never translate the English: rebuild it in the register,
school vocabulary and search language of your country (es = Mexico, pt = Brazil, no = bokmål, fr = France, it = Italy,
nl = Netherlands, sv = Sweden, da = Denmark, fi = Finland, de = Germany).

## What the worksheets are (read the renders — the PICTURES ARE IDENTICAL IN EVERY LOCALE; only the text differs)
- Contact sheet of all 20 pages: C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen\out\b9\en\_sheet.png
- Each page full size: C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen\out\b9\en\<ID>.png (IDs: K-418 … K-432, G1-429 … G1-433). READ EVERY PAGE (Read tool on the PNG) before writing its lines. The page shows a heading (printTitle) and one instruction line above the picture.
- The design contract (what each face teaches, its band, its traps): C:\Users\rkgen\lessoncraftstudio\docs\worksheet-gen\b9-designs\K-418-picture-tracing.md (§3 per face, §4 native plan with your locale's risky words, §6 SEO).
- The harvested search demand + your locale's heads, rail name and TRAP words: C:\Users\rkgen\lessoncraftstudio\docs\worksheet-gen\b9-designs\_PANEL-FINDINGS.md
- The ENGLISH source strings (data/b9/picture-tracing.js EN_STRINGS): C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen\data\b9\picture-tracing.js
- The ENGLISH landings, as the SHAPE of a landing (fields, length, what a paragraph does), never as text to translate: C:\Users\rkgen\lessoncraftstudio\docs\worksheet-gen\b9-designs\_records\landings.en.json
- The vocabulary file (for the F17 words): C:\Users\rkgen\lessoncraftstudio\REFERENCE TRANSLATIONS\image-vocabulary.js (keys sun, fish, cat, apple).

## Already fixed (2026-10-22, after the de + fr panels' audit) — the renders above are CURRENT
K-421 shows a beach ball, a DOUGHNUT and an apple (the apple's little leaf is dashed too); K-422 down = wardrobe + tall
cabinet, across = whiteboard + chest of drawers, slanted = envelope + star; K-425 picnic = banana, cup, pear, lemon;
K-429 tree in a real pot + a long dashed rug in front of the tree (it is a long capsule, NOT round); K-431 the boat sits on the first wave; G1-429 is "a morning in town" with
a dotted sun; G1-431 animals on their own meadow line; G1-432 owl, TROPHY, koala; G1-433 one flower. Audit what is on
the page now, not this list.

## FIRST: audit the English source (it is the only review the English ever gets)
Compare every EN title / printTitle / instruction and every EN landing with the RENDER. List every claim that is not true
of the page (a picture named that is not there, a count that is wrong, a promise the PDF does not keep), every unclear
instruction, and every pedagogical problem you see on a page. Put them in `enAudit` (one short line each: id + problem
+ fix). Then write YOUR locale so that it is true of the render even where the English is not.

## Rules for your locale's strings (per face mode; 20 modes, see EN_STRINGS keys)
- `title` ≤ 70 characters: your locale's HARVESTED head for that face (contract §6 head-ownership table + _PANEL-FINDINGS
  heads) + the face's story; a grade/age stamp where natural (Vorschule, maternelle, preescolar, educação infantil,
  förskola, børnehave, barnehage, esikoulu …). No two faces may share a title. Never your locale's trap words.
- `printTitle` ≤ 34 characters: the short heading printed on the page (the story, not the keyword).
- `instruction` ≤ 110 characters: one or two short sentences an adult reads aloud to the child; names only what is
  drawn on that page; the child's verb is "trace" in your school language (nachspuren, repasser les pointillés / repasse,
  repasar, cobrir, ripassare, overtrekken, spåra, tegne efter / tegne over the lines – the panel's native choice).
- F10 trace-and-count: name the counted animal (ducks) in the plural; the box is for the number.
- F20 hidden-animals: the instruction MUST contain the numeral 5 (five hidden animals), noun in the case it needs.
- F4 round-and-round: keep "like the letter o" (every school script starts o at 2 o'clock).
- F17 `words`: the four picture names for sun, fish, cat, apple in your school-print case (de: capital initial; fr:
  CAPITALS d'imprimerie; others lowercase), 2-7 letters, letters only, no article. Check image-vocabulary.js; if a word
  is longer than 7 letters or a five-year-old in your country would name the picture otherwise, SAY SO in enAudit and
  propose the replacement picture (moon / duck / ball) — do not invent.
- NO visible "free" in any string (never kostenlos / gratis / gratuit / gratuito / grátis / gratuiti / ilmainen).
- NO promise of an answer key, solutions or a screen: these are PDF worksheets only.
- Spelling, diacritics, punctuation of your language (fr: spaces before ? ! : ; it: apostrophes; de: ß and capitals;
  nl: de/het; sv/da/no: definite forms — check every definite noun carefully; fi: cases and vowel harmony).

## Your landings (20 — one per face)
For every ID write: `slug` (ascii kebab, from your title, unique, ≤ 70 chars), `eyebrow` (your rail name), `h1`
(= your title, or a natural variant ≤ 70), `title` (SEO title ≤ 75, your head first, may end in " | PDF"), `metaDescription`
(120-170 characters: the face's task in one sentence + who it is for + PDF; metadata may say free/gratis in a natural
way, but visible fields may not), `strand` (a short native strand label, e.g. Feinmotorik & Schreibvorbereitung),
`p1` `p2` `p3` (together ≥ 200 words; p1 = what is on THIS page, true to the render; p2 = what it trains and how to use it
with a child; p3 = who it is for + which other pages of the set come before/after + the boundary sentence in your words:
picture tracing traces whole pictures; abstract line practice (your pre-writing rail name), step-by-step drawing and
numbered dot-to-dot have their own pages). Every landing must describe its own page (no two landings may read alike:
name the setting, the pictures and the move). Visible fields (eyebrow, h1, strand, p1-p3) never contain "free" in any
language. Never promise an answer key or a screen.

## Output — write exactly two files, then self-check
1. C:\Users\rkgen\lessoncraftstudio\docs\worksheet-gen\b9-designs\_records\panel.<loc>.json
   { "locale": "<loc>", "strings": { "<mode>": { "title": "…", "printTitle": "…", "instruction": "…" } × 20 },
     "words": ["…","…","…","…"], "family": { "slug": "<rail slug from _PANEL-FINDINGS table B>", "name": "<rail name>" },
     "skill": { "full": "<60-180 chars: what tracing whole pictures builds>", "short": "<15-90 chars>" },
     "topicMeta": "<120-170 chars: the family's topic-page meta description>", "enAudit": [ "…" ] }
   (mode keys exactly: base, first-tracing, look-then-trace, round-and-round, straight-lines, zigzags, curls,
   trace-and-color, where-to-start, trace-and-count, finish-the-picture, christmas, shape-picture, summer-sea,
   big-middle-small, dotted-street, picture-and-word, trace-and-draw, other-half, hidden-animals)
2. C:\Users\rkgen\lessoncraftstudio\docs\worksheet-gen\b9-designs\_records\landings.<loc>.json
   { "locale": "<loc>", "landings": { "<ID>": { slug, eyebrow, h1, title, metaDescription, strand, p1, p2, p3 } × 20 } }
   (IDs: K-418, K-419 … K-432, G1-429 … G1-433; ID ↔ mode: K-418 base, K-419 first-tracing, K-420 look-then-trace,
   K-421 round-and-round, K-422 straight-lines, K-423 zigzags, K-424 curls, K-425 trace-and-color, K-426 where-to-start,
   K-427 trace-and-count, K-428 finish-the-picture, K-429 christmas, K-430 shape-picture, K-431 summer-sea,
   K-432 big-middle-small, G1-429 dotted-street, G1-430 picture-and-word, G1-431 trace-and-draw, G1-432 other-half,
   G1-433 hidden-animals)
SELF-CHECK (run from C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen, fix and re-run until clean):
   node tools/b9-draft-from-panel.js <loc> ../../docs/worksheet-gen/b9-designs/_records/panel.<loc>.json
   node tools/validate-b9-draft.js <loc>
   node tools/check-b9-landing-draft.js <loc> ../../docs/worksheet-gen/b9-designs/_records/landings.<loc>.json
(all three must be clean: 20 faces, 0 errors, PASS.) Do NOT run apply-b9-locale.js and do not edit any other file. Report back: the validator results, your enAudit list,
and any face you think should not ship in your locale (with the reason).
