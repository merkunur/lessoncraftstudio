# Maker: Cursive Handwriting (`cursive`)

Group **writing** · language need **bound** · 6 existing templates + 1 new · replaces old app(s): —

## Settings a teacher sets

- letters / joins / words / sentences / names
- school script per country
- trace and copy rows
- (plus the settings every maker has: language (one of our 11); template (gallery by sub-topic); level 1-3; picture theme / own pictures where pictures appear; number of problems / page fill; title + instruction text (editable); answer key on/off; pages: add / duplicate / delete; regenerate (new seed, same settings); paper: Letter for en-US, A4 elsewhere (switchable))

## Locale conventions (en = American English, es = Mexican Spanish, pt = Brazilian Portuguese)

- sv and fi refused (no joined school script) — the maker is offered in 9 locales
- de ships VA and LA

## Templates from today's worksheet types

**Write cursive lowercase letters, capitals, the joins between letters, and whole words**

- `G2-377` Cursive Letters: i, t, u and w — Trace the grey letters, then keep writing each letter joined on your own to the end of its line and on the empty line below. (scripts/worksheet-gen/types/g2/G2-377-cursive-writing.js)
- `G2-384` Cursive Capital Letters: Write the Names — Trace each grey capital letter and name, then write them on the empty line below. (scripts/worksheet-gen/types/g2/G2-384-cursive-capitals-with-names.js)
- `G2-385` Cursive Connecting Letters: Joining Two Letters — Trace each grey pair of joined letters and the word, then write them on the empty line below. (scripts/worksheet-gen/types/g2/G2-385-cursive-letter-connections.js)
- `G2-386` Cursive Words to Write with Pictures — Trace each grey word, joining the letters first and adding the dots and crosses last, then write it the same way on the line below. (scripts/worksheet-gen/types/g2/G2-386-cursive-words-with-pictures.js)

**Read words written in cursive**

- `G2-387` Reading Cursive: Match Each Word to Its Picture — Read each word in cursive and draw a line to its picture. (scripts/worksheet-gen/types/g2/G2-387-reading-cursive.js)

**Trace and copy a sentence in joined (cursive) handwriting**

- `G3-401` Cursive Sentences to Copy — Trace the grey sentence, then copy each printed sentence in cursive on the two lines below it. (scripts/worksheet-gen/types/g3/G3-401-copy-a-sentence-in-cursive.js)

## New templates to add

- **Own words and sentences in cursive** — spelling lists in cursive

## FABLE-QUESTIONS (answered before the build)

1. [cursive-Q1] Cursive uses vendored Playwrite fonts measured on the PC (Linux renders 1-2 px differently). In the browser every OS/browser renders differently — how to keep the trace guides, joins and ruling aligned on Windows/Mac/iPad/Chromebook?
