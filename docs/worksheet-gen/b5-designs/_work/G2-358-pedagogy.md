# G2-358 `synonyms` - pedagogy + content (nt10-E / b5)

Measured 2026-09-23 with read-only node over `data/b3/locales/opposites.<loc>.json`, `data/b2/word-classes.js`, `lib/b2-common.js entriesFor()`, `frontend/content/seo-landing/<loc>.json`, `types/G1/G1-3{07,35,36,37}*.js`, `types/G2/G2-3{16,20,29..333}*.js`, `types/G1/G1-367*.js`, `../b4-designs/G1-350-cloze.md`. Pictures OPENED on contact sheets `%TEMP%/.../scratchpad/G2-358-{emo,obj}.png` (sharp, 170 px tiles). (m) = measured; (d) = my draft, only a native panel can sign it; UNKNOWN = engineer/panel must measure. The synonym lexicon does NOT exist yet in any locale: every pool size below that is not (m) is a floor the panel must reach, not a count.

## Boundary (load-bearing)

1. **`opposites` (G1-307 base + K-351, G1-335, G1-336, G1-337, G2-320) OWNS antonyms, and G1-337 already runs a synonym contact** (m): "Read the word. One of the three words under it means the opposite. Circle it, not the one that means the same." Its bank carries a near-synonym `syn.a` per pair (m: en 12 · de 10 · es 12 · pt 12 · fr 14 · it 16 · nl 10 · sv 10 · da 10 · no 10 · fi 14), and several of those are SHADES, not synonyms (en hot~warm, wet~damp; de heiß~warm; es caliente~cálido; sv varm~het; fi kuuma~lämmin). Live landing titles that already carry the synonym word (m): es "Sinónimo o antónimo primer grado", fr "Contraire ou synonyme CP", it "Sinonimi e contrari: cerchia il contrario". G2-320 owns un-/dis-/in- (so `unhappy` is never a synonym chip). G1-335 owns the ADJECTIVE gap after "not"; G1-336 owns writing pairs from a pool.
2. **`cloze` G1-350 + G1-366..368, G2-349/350 OWNS the NOUN gap in a sentence** (validator: the gap is always a noun). G1-367 "Choose the Word" = 2 chips + write, noun only.
3. **`word-classes` G2-275/285/286/287, G1-293/300 OWNS sorting by word CLASS** (noun / verb / adjective bins; bank `data/b2/word-classes.js`, m: 28-32 verbs + 28-32 adjectives per locale).
4. **`compound-words` G2-316 + G2-329..333 OWNS "Word Web"** (G2-333 "Word Web: One Word, Many Compounds", m): no synonyms title uses "web".
5. **`feelings` K-319 + K-331..335 OWNS face ↔ ONE feeling word** (m: "Which Face Shows the Feeling?", "Feelings: Match the Face to the Word").

**What this type therefore owns:** the relation SAME-OR-NEARLY-SAME MEANING between two content words, in five moves nobody ships: select the synonym (base), find TWO words for one picture (F1), pair synonyms (F2), ORDER near-synonyms by strength (F3, the shades move), choose the precise member of ONE word field by sentence context (F4, the Wortfeld "say" routine), and sort words into TWO word fields (F5). Fences the validator enforces: no antonym of the target on any row (read from `bank('opposites', loc).pairs`); no prefix-antonym (`opposites.prefix.items[].expected`) anywhere; no noun gap; no word-class bins; no face title carries an opposites head (list in D rule 12).

## A. Identity

| loc | genre head (_PANEL-FINDINGS + selection reports) | school year (base) | national strand (framework NAME) | CCSS (en only, honest) |
|---|---|---|---|---|
| en | synonyms | grade 2 (`grade-2`) | - | base: none named (synonyms = L.4.5.c, above band); page is L.2.5 word-relationships practice, stated as "related", no sub-code. F3 **L.1.5.d** (adjectives differing in intensity) · F4 **L.2.5.b** (closely related verbs) · F1 none (readiness) · F2 none · F5 L.3.5 parent only |
| de | **Wortfeld** (primary) / Synonyme (secondary) | 2. Klasse (`2-klasse`) | Lehrplan Deutsch: Sprache und Sprachgebrauch untersuchen (Wortschatz, Wortfelder) | - |
| es | sinónimos (never "y antónimos") | segundo grado (`segundo-grado`) | SEP/NEM Lenguajes: reflexión sobre la lengua (campo formativo Lenguajes) | - |
| pt | sinônimos (BR spelling) | 2º ano (`2o-ano`) | BNCC Língua Portuguesa: Análise linguística/semiótica | - |
| fr | les synonymes | CE1 (`ce1`) | programmes officiels, Étude de la langue: lexique | - |
| it | i sinonimi (never "sinonimi e contrari") | classe seconda (`classe-seconda`) | Indicazioni nazionali: acquisizione ed espansione del lessico | - |
| nl | synoniemen | groep 4 (`groep-4`) | SLO kerndoelen, Taal: woordenschat | - |
| sv | synonymer | åk 2 (`ak-2`) | Lgr22 svenska: språkets struktur (ord och begrepp); taught åk 3, the page is early | - |
| da | synonymer | 2. klasse (`2-klasse`) | Fælles Mål dansk: sprog og sprogbrug (ordforråd) | - |
| no | synonymer | 3. trinn (`3-trinn`) | LK20 norsk: språk (ordforråd) | - |
| fi | synonyymit / samaa tarkoittavat sanat | 2. luokka (`2-luokka`) | OPS 2014 Äidinkieli ja kirjallisuus: kielen rakenteet (sanasto) | - |

**Theme axis: THEMELESS** (`themeAxis.applicable:false`, `coordinate.theme:''`). The content is words; no theme holds ≥8 synonym groups. F1 draws its pictures by explicit `{theme, noun}` from the bank (the opened set below), not from a theme. **No `unitAxis` at launch.** ⚠ Open for the critic: de F4/F5 heads are per-verb queries ("Wortfeld sagen / gehen / sehen / machen"); a later additive `unitAxis` over `fields[]` (units = field ids) would fan F4 per head verb. Shipping one exemplar per face keeps the hub at 6 rows per key; a field swap is data, never a face (doctrine 1).

**The rule that locks the type:** every word shown is a panel-signed citation literal inside a **synonym group** (`groups[].words`, all members mutually substitutable for a K-3 child in that locale's school register), and a row is single-answer because **exactly one chip shares the target's group, no chip is in a `near` pair with the target or with the answer, no chip is the target's antonym, and no two chips share a group with each other**. Where context decides (F4), the panel authors the full sentence × bank FIT MATRIX and the validator requires it to be a permutation matrix; semantic fit is never inferred by code.

### Pictures opened for F1 (the only face with pictures)

| picture | ruling (opened) | usable group |
|---|---|---|
| emotions/happy | grinning face, one tooth | happy (glad) |
| emotions/merry, content, excited | all smiling faces | **never with emotions/happy on one page; not used** (a child reads all four as "happy") |
| emotions/sad | frown, droopy brows | sad |
| emotions/angry | knitted brows, bared teeth | angry (mad) |
| emotions/scared | wide eyes, open mouth, teeth | scared (afraid) |
| emotions/surprised | round eyes, "O" mouth | surprised; **never on a page with scared** (confusable at 44-96 px) |
| emotions/tired | closed eyes, yawning | tired (sleepy) |
| emotions/bored, confused, shy | ambiguous faces | not used |
| zoo animals/elephant | cute sitting calf, no scale cue | big (large): meaning carried by the CONCEPT, not the drawing |
| insects and bugs/ant | red ant | small (little/tiny per locale, see traps) |
| pets/mouse | standing mouse | small (alternate to ant; never both on one page) |
| zoo animals/cheetah | standing cub | fast (quick) |
| zoo animals/giraffe | calf | tall: **no K-3 synonym in en/de/sv; not used** unless a panel signs a pair |
| forest creatures/snail, camping/campfire, weather/snowflake, around the house/pillow, camping/rock | opened | **not used**: slow / hot / cold / soft / hard have only SHADES (warm, chilly) or no child synonym in en; a panel may sign one for its locale (e.g. fi kova~luja?) only as a group, never a near pair |
| activities/running, jumping (jump rope), reading, dancing, hiking, writing | opened | not used: action synonyms (run/race, jump/skip) are shades or polysemous (skip); rejected for F1 |

Pictured-group candidates: 8 in en (happy, sad, angry, scared, tired, surprised, big, small, fast minus the scared/surprised exclusion = 8 usable per page set of 6). Per-locale count UNKNOWN until the panel signs groups; F1 refuses below 8 signed pictured groups.

## B. The six faces

### Base: Synonyms: Circle the Word That Means the Same (G2, G2-358, CODE `mode:'base'`)
- **Move:** SELECT the one same-meaning word among four same-part-of-speech words (G1-337 rejects the synonym to find the antonym; here there is no antonym on the row at all).
- **Child:** en "Read the word in the box. Circle the word next to it that means the same." (73 chars)
- **Params:** d1 `{rows:6, chips:3, tiers:[1]}` · **d2 (ships) `{rows:8, chips:4, tiers:[1,2], pos:['adj','verb'], plateW:150, chipPx:18, chipH:44, maxChars:11, answerSlots:'balanced'}`** · d3 `{rows:8, chips:4, write:true}` (circle, then write it on a line). Row = teal plate (target, Baloo 22) + 4 pill chips; 8 rows × 84 = 672 ≤ 722 (est.; rows `minmax(64px,1fr)`). Chip width at 11 chars ≈ 11 × 8.5 + 24 = 118 → 4 × 118 + 3 × 8 = 496 + plate 150 = 646 > 639 (est.) → engineer measures; fallback chip font 17 or `maxChars:10` per locale (fi/de long words, see C).
- **verify():** stamps `data-lcs-face="base"`, per row `data-lcs-target` (group id + word), per chip `data-lcs-group`; re-derive answer = the unique chip whose group === target group; FAIL on 0 or ≥2; FAIL if any chip ∈ `antonymsOf(target)` or any (target|answer, chip) ∈ `near`; FAIL if two chips share a group; answer slot counts 1..3 per slot over 8 rows (both directions); no answer printed outside its chip; each group at most once per page.
- **Refusals:** none by grammar; floor ≥16 signed groups per locale (≥8 adj + ≥6 verb), else REFUSED (count UNKNOWN until authoring).
- **Query face:** bare head (synonyms / Wortfeld / sinónimos / sinônimos / les synonymes / i sinonimi / synoniemen / synonymer / synonyymit).

### F1: Synonyms with Pictures: Two Words, One Picture (G1, G1-3xx TBD by the emitter, CODE `mode:'pictures'`)
- **Move:** the PICTURE carries the meaning; the child finds BOTH words that name it (two circles per card), the only face where the relation is grounded in an image. Not feelings K-319 (one word per face) and not G1-337.
- **Child:** en "Look at each picture. Circle the two words that tell about it and mean the same." (80)
- **Params:** d1 `{cards:4}` · **d2 `{cards:6, chips:4, answers:2, cols:2, picPx:88, chipPx:18, chipH:44, maxEmotions:4}`** · d3 `{cards:6, chips:5}`. `cardGrid({cols:2, rows:3})`, card ≈ 310 × 220 (picture left 88, chips 2 × 2 right). G1 floors 44 / 26.
- **verify():** per card `data-lcs-pic` (theme/noun), chips `data-lcs-group`; the answer set = the 2 chips in the card's group (group must have ≥2 members on the card, exactly 2); the 2 distractors are words of OTHER cards' groups on the SAME page that are in the card picture's `falseOf` list (panel-authored per picture: e.g. on `emotions/sad`, "glad" is false); FAIL if a distractor is not in `falseOf`, if scared + surprised or two positive faces share a page, if mouse + ant share a page; `picOpened:true` on every picture.
- **Refusals:** any locale with < 8 signed pictured groups (UNKNOWN; watch es-MX, where sad/angry lack a register-clean second word, see C).
- **Query face:** "+ with pictures" (en "synonyms with pictures", es "sinónimos con imágenes primer grado", fr "synonymes en images", it "sinonimi con le immagini", sv "synonymer med bilder").

### F2: Match the Synonyms (G2, G2-3xx TBD, CODE `mode:'pairs'`)
- **Move:** PAIR: two columns of 6 words, draw a line between the two that mean the same (a bijection; recall across a set, not a row).
- **Child:** en "Draw a line from each word on the left to the word on the right that means the same." (84)
- **Params:** d1 `{pairs:4}` · **d2 `{pairs:6, pos:'mixed', itemH:56, derange:true}`** · d3 `{pairs:8}` (two groups per POS max). `.ws-match` two columns + dots.
- **verify():** `data-lcs-group` per item; each left item's group appears exactly once on the right; no two left items share a group; no left/right item is an antonym (opposites bank) or `near` of any other item on the page; right order ≠ left order and no item sits at its partner's row index more than 1 time in 6.
- **Refusals:** none beyond the base floor.
- **Query face:** "match synonyms" / "Synonyme zuordnen" / "une los sinónimos" / "relie les synonymes" / "collega i sinonimi" / "verbind de synoniemen".

### F3: Shades of Meaning: From a Little to a Lot (G1, G1-3xx TBD, CODE `mode:'shades'`)
- **Move:** ORDER three near-synonyms by strength (warm → hot → boiling; nibble → eat → gobble): the relation is "nearly the same, but stronger", the explicit teaching point that true synonyms are rare. Distinct from every sort/compare face (no sizes, no numbers).
- **Child:** en "Read the three words. Write 1, 2, 3 under them, from the weakest to the strongest." (80)
- **Params:** d1 `{rows:4}` · **d2 `{rows:6, perRow:3, scaleIcon:true, box:'blankNumeralBox', boxPx:34}`** · d3 `{rows:6, perRow:4}` (panel scales of 4, UNKNOWN pool). Row header = a 3-step bar icon (small / middle / tall bars, palette SVG, no words) so "1 = a little" is visible without text. 6 rows × 96 = 576 (est.).
- **verify():** `data-lcs-scale` + per chip `data-lcs-rank` (1..3, from the stored scale order); chips printed in a derangement of the stored order: never identity, never reversed on more than 2 of 6 rows, each rank appears at each slot 1..3 times; open boxes are `blankNumeralBox` (no `data-lcs-answer="undefined"`); no scale member is in the F4 `say` field (page disjointness with F4 is a data rule, D.5).
- **Refusals:** a locale with < 8 signed 3-step scales (UNKNOWN). Intensifier compounds count as words (de riesengroß, sv jättestor, fi tulikuuma) only if the panel signs them as the locale's school word.
- **Query face:** "shades of meaning" (en L.1.5.d head); de "Wörter nach Stärke ordnen" (never "steigern"); es "de menos a más"; fr "du plus faible au plus fort"; panels name theirs.
- **⚠ Conflict for the critic:** G1-337 treats hot~warm (and 9 locale equivalents, m) as "the same". F3 teaches that they differ in strength. The pages do not contradict (G1-337 only asks for the opposite), but no F3 scale may be titled or instructed "mean the same"; the instruction says "nearly the same" nowhere either: it just orders by strength.

### F4: Synonyms for "Said": Pick the Word That Fits (G2, G2-3xx TBD, CODE `mode:'say'`)
- **Move:** CHOOSE BY CONTEXT inside ONE word field (the de Wortfeld "sagen" routine; en "instead of said"; fr "remplacer le verbe dire"; it/es/pt "sinonimi / sinónimos / sinônimos del verbo dire / decir / dizer"). The field members are NOT interchangeable (whisper vs shout): the sentence decides. Distinct from the base (sameness) and from cloze (noun gap).
- **Child:** en "Read each sentence. Write the word from the box that fits best instead of said." (79)
- **Params:** d1 `{rows:4, bank:4}` · **d2 `{rows:6, bank:6, bankOnce:true, gapW:'max', write:true, fontPx:18}`** · d3 `{rows:6, bank:7, extra:1}` (one foil). Bank (`wordBank`, 59 px) + 6 lanes × ~96 = 645 ≤ 722 (est.). Every gap box = the width of the LONGEST bank word (no length leak). The head verb is written out in the instruction by the panel, never a token.
- **verify():** `data-lcs-sentence` id + `data-lcs-answer` per gap; the bank set === the row answers (d2), deranged vs row order; the stored `fit` matrix (6 × bank) is a permutation matrix (exactly one `true` per row and per column) and the stamped answers are its `true` cells; every bank literal carries the same `form` tag (en past, de/others 3sg present, panel tag); no bank word appears in any sentence text (word-boundary `(?<!\p{L})…(?!\p{L})`, NFD); gap widths identical.
- **Refusals:** none by grammar (every locale has a say field: en whispered/shouted/asked/answered…, fi kuiskaa/huutaa/kysyy/vastaa…). A locale whose panel cannot sign 6 sentences with a permutation fit matrix is refused (UNKNOWN).
- **Query face:** "synonyms for said" / **"Wortfeld sagen"** (the de WINNABLE query) / "sinónimos de decir" / "sinônimos de dizer" / "le verbe dire" / "sinonimi del verbo dire" / "andere woorden voor zeggen" / "synonymer till säga/sige/si" / "sanoa-verbin synonyymit".

### F5: Synonym Sort: Words for "Go" and "Look" (G3, G3-3xx TBD, CODE `mode:'fields'`)
- **Move:** CATEGORISE by meaning into TWO word fields (walk, crawl, march… vs peek, stare, glance…), writing each word in its field box. A semantic sort, not a word-class sort (every word is a verb; G2-275 cannot separate them).
- **Child:** en "Read the ten words. Write each one in the box of the word it means almost the same as." (86)
- **Params:** d1 `{words:8}` · **d2 `{words:10, fields:['go','look'], split:[5,5]|[4,6], bins:'lined', binH:220}`** · d3 `{words:12, fields:3}`. Chip strip 2 × 5 (44 high) + two lined bins side by side (310 wide each, head = the field verb in Baloo 26 in quotes). Reuse a b3/b4 bins component (`ruleBins` / `qwBins` / `rhymeBins`; engineer picks).
- **verify():** `data-lcs-field` per chip; each chip ∈ exactly one of the page's two fields (a word in both fields' lists FAILS at validation); the field head words are not chips; split within [4,6]; chip strip order ≠ field order (no run of ≥4 same-field chips).
- **Refusals:** none by grammar; floor ≥8 signed members per field per locale.
- **Query face:** de "Wortfelder gehen und sehen sortieren" (the two other per-verb de queries); es/pt "campo semántico / campo semântico"; fr "trier par champ lexical"; it "il campo semantico"; en "synonym sort".

**Rejected non-moves.** circle the opposite / synonym-or-antonym judgement (G1-337); synonyms-and-antonyms mixed page (opposites owns the combined head); write a synonym from a bank for isolated words (the base at d3, not a face); memorama / bingo / flashcards (open games, no verify; cut-out cards = picture-word-cards K-324); crossword / wordsearch (apps); "synonym word ladder" (undefined; a change-one-letter ladder is spelling); a K picture-pair face (reading 4 chips at K is not honest: fr "synonymes maternelle" and es "sinónimos preescolar" are oral games); a noun-synonym face (the picture vocab stores nouns; noun synonymy is regional, carro/coche); a second word field as a face (data swap); "word web" (compound-words G2-333).

## C. Native rebuild ×11

Frames never inflect; every inflected form is a whole literal. No `objForms` key is needed: no face substitutes a picture noun into a sentence. `{name}` from `data/b2/sentences.js` is allowed ONLY in F4 frames (verb, no agreement); es/pt/it/fr may use it there because present/past verbs do not agree with the subject's gender; F3/base/F2/F5 have no sentences.

| loc | literals the panel authors (counts) | slots/forms | refusal / re-target | traps |
|---|---|---|---|---|
| en | groups ≥16 (≥8 pictured-capable); near ≥12; scales ≥8; say field 6-7 past-tense verbs + ≥8 sentences + fit matrix; go ≥8, look ≥8; `falseOf` per F1 picture; 6 × {title, instruction} | `{name}` in F4 only | - | polysemy ban: light, right, kind, mean, fine, bright, cool, skip, cried (weep/shout), watch (noun); `unhappy` (G2-320 item) never a chip; big~tall and happy~excited are `near`; large/little are `alt` answers in opposites (still fine as synonyms here) |
| de | same counts; say field in Präsens 3sg (Kl. 2) (d: flüstert, ruft, fragt, antwortet, schreit, erzählt); go (d: läuft, rennt, schleicht, hüpft, klettert, kriecht, marschiert, stolpert); look (d: schaut, guckt, starrt, blinzelt, beobachtet, späht) | nouns keep the capital (none expected); verbs lowercase | - | base title carries "Wortfeld" (lock), F4 "Wortfeld „sagen“"; `schwer` (heavy/difficult), `sauer` (sour/angry), `toll`, `hell` banned; never "steigern" / "Steigerung" (comparative morphology topic); never "Gegenteil"; `„…“` quotes |
| es | same; MX register only | adjectives in masc. sg citation; F4 3sg present (susurra, grita, pregunta, contesta, cuenta, exclama d) | F1 at risk (sad: triste/?; `apenado` = embarrassed in MX; `enfadado` = Spain; `enojado` is MX) | carro/coche, lindo/bonito are REGIONAL pairs: `near` or banned, never a group; `listo` (ready/clever), `rico` (tasty/rich) banned; never "antónimo"; "encierra" vs "rodea" (MX says encierra; G1-337 uses rodea: panel rules) |
| pt | same; BR register | masc. sg citation; F4 3sg present | - | `sinônimo` (BR); `legal`, `esperto` banned; `bonito/lindo` near; never "antônimo"; never "atividade" in a title; never "família silábica" |
| fr | same; CP-CE1 vocabulary (content/joyeux ok; logis/demeure too literary) | masc. sg citation; F4 3sg present (chuchote, crie, demande, répond, raconte, s'exclame d) | - | `fort` (strong/loud), `bon`, `chouette` banned; `content/heureux` are group, `joyeux` near? (panel); never "contraire", never "fiche"; F5 "champ lexical" CE2 |
| it | same | masc. sg citation; F4 3sg present (sussurra, grida, chiede, risponde, racconta d) | - | never "contrari" / "sinonimi e contrari" (G1-337 it title, m); `furbo`, `forte` banned; arrabbiato~furioso is a SCALE, not a group; "scheda" never in a title |
| nl | same | base form; F4 3sg present (fluistert, roept, vraagt, antwoordt, schreeuwt, vertelt d) | - | never "tegenstellingen"; `leuk`, `mooi`, `lekker` polysemous/vague: banned as targets; de/het irrelevant (no nouns) |
| sv | same | indefinite common sg citation; F4 present (viskar, ropar, frågar, svarar, skriker, berättar d) | - | `glad` = happy (not en glad: no clash inside sv); `rolig` (fun/funny) banned; never "motsatsord"; hreflang exact (sv/da/no share "Synonymer") |
| da | same | citation; F4 present (hvisker, råber, spørger, svarer, skriger, fortæller d) | - | `sjov` banned; K-1 vocabulary only; never "modsætninger" |
| no | same (bokmål) | citation; F4 present (hvisker, roper, spør, svarer, skriker, forteller d) | - | `morsom`, `grei` banned; never "motsetninger"; "Synonymer oppgaver" |
| fi | same; the F4 frames written out whole (case!) | nominative sg citation; F4 3sg present (kuiskaa, huutaa, kysyy, vastaa, kertoo, sanoo? (head, excluded)) | - | `kova` (hard/loud), `hyvä` banned; iso~suuri is a GROUP (both neutral), pieni~pikkuinen: diminutive, panel rules group vs scale; never "vastakohta"; `[NSR-FLAG][fi]` |

## D. Data + gates

```js
// data/b5/synonyms.js (+ data/b5/locales/synonyms.<loc>.json via tools/apply-b5-locale.js)
SYNONYMS[loc] = {
  head, ban: ['light','right',...],                 // polysemous / regional / vague: never target, chip or bank word
  groups: [{ id, pos:'adj'|'verb', tier:1|2, words:['big','large'],   // >=2, mutually substitutable, citation form
             pic: null | { theme, noun, picOpened:true, falseOf:['sad','glad', ...] } }],   // F1 only
  near: [{ a:'big', b:'tall', why:'different dimension' }, { a:'hot', b:'warm', why:'shade' }, ...],
  scales: [{ id, pos, words:['warm','hot','boiling'] }],             // F3, stored weakest -> strongest, >= 8
  fields: { say: { head:'said', form:'past', words:[...6-7],
                   sentences:[{ id, text:'The baby is asleep, so {name} ___ very softly.', fit:{ whispered:true, shouted:false, ... } }] },
            go:   { head:'go',   words:[...>=8] },
            look: { head:'look', words:[...>=8] } },
  strings: { 'G2-358':{title,instruction}, '<face ids>':{title,instruction} }
}
```
Reuses: `bank('opposites', loc).pairs` (antonym ban, read at validation AND build) and `.prefix.items` (prefix-antonym ban); opposites `syn.a` as a SEED list only (re-signed; its shades move to `near`/`scales`); `data/b2/word-classes.js` adjectives/verbs as candidate words (m: 28-32 each; itself contains synonyms: en big/tiny, happy/cheerful, so never a raw distractor pool); `data/b2/sentences.js` names; `blankNumeralBox` (components-b3/ordinal-numbers); `wordBank`, `pillChoice` (components-b2); `.ws-match`; a b3/b4 bins component. New: `lib/b5-common.js bank()`.

**Validator (`tools/validate-b5-draft.js`, synonyms part; exit 1 on any):**
1. every word is a non-empty letters-only literal (hyphen/apostrophe/space allowed per locale list); no word is in `ban`.
2. a word appears in at most ONE group (a word in two groups = polysemy → ban it).
3. every group has ≥2 words and one `pos`; no group member is an antonym of another member (opposites pairs) or a prefix-antonym.
4. no `near` pair lies inside one group; `near` members exist in groups or scales.
5. scales: exactly 3 (or 4) distinct words, no scale member is a member of another scale's group; no scale member is in `fields.say.words`.
6. counts: groups ≥16 (≥8 adj, ≥6 verb) · pictured groups ≥8 (else F1 `refused` with the count) · scales ≥8 · say words 6-7, sentences ≥8 · go ≥8 · look ≥8 · go ∩ look = ∅ and neither contains its own head.
7. F4 fit matrix: for every page draw of 6 sentences the sub-matrix over the bank is a permutation matrix; every sentence has exactly one `true`; the answer literal does not occur in its text; all say words share one `form` tag.
8. F1: `pic.picOpened === true`; `falseOf` ⊆ words of other pictured groups; exclusivity groups (`emotions/scared`+`surprised`; `happy`+`merry|content|excited`; `ant`+`mouse`) enforced by `pageExclusive` lists.
9. base/F2 draw: the target's antonyms, `near` partners and group-mates-of-other-chips never co-occur; each group ≤1 per page.
10. chip literal length ≤ `maxChars` per face (base/F1 11, F2 14, F5 12; UNKNOWN px until measured).
11. no title/instruction contains an opposites head, per locale: antonym, opposite, Gegenteil, antónimo, antônimo, contraire, contrari, tegenstelling, motsats, modsæt, motsatt, motsetning, vastakohta (NFD, case-insensitive); no "web" / "Netz" / "red de palabras" (compound-words).
12. titles ≤70 without the worksheet word, unique in band, never "free" / "gratis" / "kostenlos" in visible fields; instructions ≤150 with an end mark, naming only on-page apparatus (box, words, pictures, lines, boxes 1-2-3, word box).

**Poison cases (each must FAIL; the correct draft is the control):** (1) en group `['light','bright']` (light is banned polysemy); (2) en base row target `big`, chips `large, small, …` (antonym on the row); (3) en `hot` + `warm` in one group (shade); (4) es-MX group `['carro','coche']`; (5) de group containing `schwer`; (6) en F1 card `emotions/happy` on a page with `emotions/excited`; (7) F1 card `emotions/scared` + `emotions/surprised` on one page; (8) F4 sentence whose fit row has two `true` (whispered + said-quietly); (9) F4 bank word printed inside a sentence; (10) F3 scale `['warm','hot','boiling']` printed in stored order on 3 of 6 rows; (11) F5 `march` in both go and look lists; (12) it title "Sinonimi e contrari: …"; (13) en chip `unhappy` (G2-320 prefix antonym); (14) a group of one word; (15) F1 picture with `picOpened:false`; (16) F2 left `big`, right `large` and `huge` both present (two partners); (17) F4 gap boxes of different widths.

**`qa/verify-b5-synonyms.js` on the render (every face × 11 locales × d2; 722 stack and the fi 677 chrome):** `verify()` empty; `qa/lints.js` clean; floors itself (G1: pictures ≥44, text ≥16, chips ≥44 high, answer boxes ≥26; G2-G3: text ≥16, chips ≥36, boxes ≥22); no chip or bank word clipped (bbox inside lane 639); uniqueness (one group-mate per row; F2 bijection; F4 permutation; F5 each chip one field); **no answer printed** (F3 ranks absent; F4 answers only inside the bank; F5 no word inside a bin at d2); answer-slot distribution measured in BOTH directions (base: each of 4 slots 1..3 times; F3 rank-per-slot 1..3); `[data-ws-content]` on every stage; palette tokens only; 20-seed sweep shows row sets and orders vary.

## E. SEO

Title patterns (engine appends the worksheet word; the panel writes the native literal; no digits needed):

| face | Germanic (en / de / nl) | Romance (es / pt / fr / it) | Nordic + fi (sv / da / no / fi) |
|---|---|---|---|
| base | Synonyms: Circle the Word That Means the Same / Wortfeld: Wörter mit gleicher Bedeutung finden / Synoniemen: omcirkel het woord dat hetzelfde betekent | Sinónimos: encierra la palabra que significa lo mismo / Sinônimos: circule a palavra de mesmo sentido / Les synonymes : entoure le mot de même sens / I sinonimi: cerchia la parola con lo stesso significato | Synonymer: ringa in ordet som betyder samma sak / Synonymer: sæt ring om ordet der betyder det samme / Synonymer: sett ring rundt ordet som betyr det samme / Synonyymit: ympyröi sana, joka tarkoittaa samaa |
| F1 | Synonyms with Pictures: Two Words, One Picture / Synonyme mit Bildern / Synoniemen met plaatjes | Sinónimos con imágenes / Sinônimos com figuras / Les synonymes en images / I sinonimi con le immagini | Synonymer med bilder / Synonymer med billeder / Synonymer med bilder / Samaa tarkoittavat sanat kuvin |
| F2 | Match the Synonyms / Synonyme zuordnen / Verbind de synoniemen | Une los sinónimos / Ligue os sinônimos / Relie les synonymes / Collega i sinonimi | Para ihop synonymerna / Find synonympar / Finn synonymparene / Yhdistä synonyymit |
| F3 | Shades of Meaning: From a Little to a Lot / Wörter nach Stärke ordnen / Van een beetje naar heel erg | De menos a más: ordena las palabras / Do mais fraco ao mais forte / Du plus faible au plus fort / Dal più debole al più forte | panel (d: Från lite till mycket / Fra lidt til meget / Fra litt til mye / Vähän, enemmän, eniten) |
| F4 | Synonyms for Said: Pick the Word That Fits / Wortfeld „sagen“ / Andere woorden voor zeggen | Sinónimos de decir / Sinônimos de dizer / Remplacer le verbe dire / I sinonimi del verbo dire | Synonymer till säga / Synonymer for sige / Synonymer for si / Sanoa-verbin synonyymit |
| F5 | Synonym Sort: Words for Go and Look / Wortfelder „gehen“ und „sehen“ sortieren / Woorden sorteren: gaan en kijken | Campo semántico: ir y mirar / Campo semântico: ir e olhar / Champ lexical : aller et regarder / Il campo semantico: andare e guardare | Sortera synonymer: gå och titta / Sortér synonymer: gå og se / Sorter synonymer: gå og se / Lajittele: mennä ja katsoa |

Meta MIDDLEs = the six instructions in B (en 73-86 chars; with title + level the whole meta lands 120-170 in en; de/fi/pt ~35% longer → panels shorten the instruction, never the head). The instruction must say what differs on THIS page (two words per picture; lines; 1-2-3 order; instead of said; two word boxes).

Coordinates `{type:'synonyms', mode, level, theme:''}`: base `base` G2 · F1 `pictures` G1 · F2 `pairs` G2 · F3 `shades` G1 · F4 `say` G2 · F5 `fields` G3. Level keys (m, from live landings): G1 grade-1 · 1-klasse · primer-grado · 1o-ano · cp · classe-prima · groep-3 · ak-1 · 1-klasse · 2-trinn · 1-luokka; G2 grade-2 · 2-klasse · segundo-grado · 2o-ano · ce1 · classe-seconda · groep-4 · ak-2 · 2-klasse · 3-trinn · 2-luokka; G3 grade-3 · 3-klasse · tercer-grado · 3o-ano · ce2 · classe-terza · groep-5 · ak-3 · 3-klasse · 4-trinn · 3-luokka.

Non-cannibalisation (whole-page 3-gram Jaccard, est.): base ↔ G1-337 **~0.18, highest external pair** (both "circle one of N words"; fenced by head, by G2 vs G1, and by no antonym on the base page) · F2 ↔ G1-336 ~0.12 · F4 ↔ G1-367 choose-the-word ~0.10 (verb field vs noun gap) · F4 ↔ G2-335 verb forms in sentences ~0.10 (field member vs tense form) · F5 ↔ G2-275 word-classes ~0.08 · F1 ↔ K-333 face↔word ~0.06 · F3 ↔ size-compare K-032..040 ~0.03. Face ↔ face: base ↔ F2 ~0.16 (same groups, different act) · base ↔ F1 ~0.14 · F4 ↔ F5 ~0.10 (disjoint fields) · others < 0.10.

## F. Open questions + summary

**Engineer must measure:** base row fit (plate 150 + 4 chips at 11 chars, est. 646 > 639: font or maxChars per locale); F1 card fit with 4 chips at de/fi lengths; F4 lane height with a 2-line de/fi sentence + uniform gap box; F5 two bins at 310 wide with 5 lined rows; the 3-step bar icon (new palette SVG, ~40 × 32) under the 722 stack; fi 677 chrome on F3/F5.
**Only a native panel can rule:** every group, `near`, `ban`, scale and field (no lexicon exists; opposites `syn.a` is a seed with shades mixed in); F1 pictured groups ≥8 (es-MX and de are at risk); the F4 fit matrices (two readers per locale should sign them); de base title with "Wortfeld" vs "Synonyme" (lock says Wortfeld); es "encierra" vs "rodea"; whether fi pieni~pikkuinen is a group or a scale; the F3 head in each locale (no Romance/Nordic shades genre name exists).
**Critic / operator:** a later `unitAxis` over `fields` for de per-verb heads (sagen/gehen/sehen/machen); the G1-337 hot~warm "same" vs F3 "stronger" tension (no page contradicts, but the opposites bank's `syn.a` shades could be re-signed at a later touch).

**Summary.** Six faces: base Circle the Synonym (G2, 4 chips) · F1 Synonyms with Pictures, two words per picture (G1) · F2 Match the Synonyms (G2) · F3 Shades of Meaning, order 1-2-3 by strength (G1, L.1.5.d) · F4 Synonyms for "Said", choose by context from one word field (G2, L.2.5.b; de Wortfeld „sagen“) · F5 Synonym Sort into two word fields go / look (G3; de Wortfelder gehen und sehen). Themeless, text-first; single answer by signed groups + near/ban lists + antonym ban + F4 permutation fit matrix. No refusal is certain at design; conditional refusals: F1 below 8 signed pictured groups (es-MX, de at risk), F3 below 8 scales, any face below the base floor. Hub expectation 66 provisional.
