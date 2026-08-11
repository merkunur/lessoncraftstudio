'use strict';
/* Swedish — TOOL #56, round 2. Authored by the native panel, verbatim.
 *
 * ⚠ NEVER WRITE THE SWEDISH DEFINITE PLURAL `förslagen` — it is spelt
 *   identically to the adjective meaning "sly / cunning", so a sentence
 *   like "Alla förslagen står kvar" ships "All the sly ones remain" to a
 *   class of seven-year-olds. Use `förslaget` (def. sg.) or bare `förslag`.
 *   This is the recorded `banan` defect one keystroke away.
 *
 * ⚠ `ariaEnd` DELIBERATELY REFUSES THE ENGLISH LABEL FORM. English moved to
 *   "Marks on the ground now: {m}" to survive {m}=1. Swedish never had that
 *   problem — `antalet` takes a number and not agreement — and this string
 *   is an aria-label rendered as prose, where "Prickar på golvet nu kolon
 *   ett" is worse than a sentence. DO NOT "fix" it toward the English.
 *   ⚠ And do NOT upgrade it to "Nu ligger det {m} prickar på golvet": that
 *   BREAKS AT {m}=1, which is reachable (22 of 240 scenes). The noun-free
 *   construction is load-bearing.
 *
 * Only keys that CHANGE from the current `sv:` block in
 * `scripts/_the-gap-strings.js` appear below. Placeholder sets match the
 * English exactly; no refusal string carries a placeholder.
 */
module.exports = {
  instruction: 'Räkna prickarna som ligger på golvet. Sedan täcker ögonblicket prickarna en stund — golvet syns hela tiden och visar bara om något kom eller gick, aldrig hur många. När ögonblicket är över räknar ni igen och listar ut vad som hände medan ni inte kunde se dem.',
  again: 'Låt något annat hända',
  test: 'Pröva',
  ariaStart: 'Det ligger {n} prickar på golvet.',
  ariaGap: 'Ögonblicket täcker prickarna. Ingenting går att räkna. Golvet finns kvar.',
  ariaEnd: 'Ögonblicket är över. Nu är antalet på golvet {m}. Innan var det {n}.',
  ariaTry: 'Förslaget {k}: från {n} till {r}. Klassen räknade {m}.',
  sheetTitle: 'Golvet precis som klassen såg det, med plats att skriva vad som hände',
  sheetHint: 'Skriv en rad för varje ögonblick klassen har sett, och likheten som hör ihop med det.',
  lockedBody: 'Allt här är gratis — varje nytt ögonblick, golvet och så många förslag som klassen vill. Lärarplanen lägger till arbetsbladet, som visar golvet precis som klassen såg det, med linjerade rader för de likheter klassen skriver.'
};
