'use strict';
/* Norwegian bokmål — TOOL #56, round 2. Authored by the native panel, verbatim.
   ---------------------------------------------------------------------------
   ONLY the keys that change from the `no:` block currently in
   `scripts/_the-gap-strings.js` (lines 464-495). The other 23 keys were
   re-checked against the English as it now sits on disk and are correct
   as shipped — including `test` ('Prøv med'), `ariaGap`, `sheetHint`,
   `saidTryOff`, `saidLocked`, `lockedTitle`, `gateCta` and `gateClose`.

   Placeholder sets match the English exactly: `ariaStart` {n};
   `ariaEnd` {m}{n}; the other five carry none. No refusal or announced
   string here carries a placeholder (`_refuse` and `_again` call
   `api.t()` with no `_fmt`).

   THE TWO RULINGS THAT SHAPE THIS FILE
   ---------------------------------------------------------------------
   1. `står` -> `ligger` is a GENUINE NORWEGIAN ERROR, decided on
      Norwegian's own merits (not on the Swedish result). Norwegian
      grammaticalises placement three ways — stå / ligge / sitte — and it
      is not stylistic. `stå` requires vertical extent or resting on a
      base or legs (et hus står, en flaske står); `ligge` is for something
      flat resting on a surface (en stein ligger på bakken, boka ligger på
      bordet). Flat round dots on a horizontal bar are the canonical
      `ligge` case. The collocation with `bakken` settles it independently:
      Norwegian says "det ligger snø / blader / steiner på bakken", while
      "stå på bakken" implies something upright — a person, a tree. The
      fix is free: the English homograph does not transfer, since
      Norwegian keeps `ligge` (recline) and `lyve` (tell an untruth) as
      separate verbs.

   2. THE ENGLISH SHAPE IS NOT PROPAGATED. English moved `ariaEnd` to a
      label:value form to escape an agreement failure at the reachable
      m = 1 ("1 marks"). Norwegian has no such failure — `punkt` is a
      neuter monosyllable with a ZERO indefinite plural, so the sentence
      is grammatical across the whole measured range m ∈ [1,16]. There is
      a positive reason to keep the sentence too: `sayBefore` / `sayAfter`
      already own the colon idiom ("Før øyeblikket: {n}."), so leaving
      `ariaEnd` as prose keeps the spoken description distinct from the
      visible readout instead of duplicating its register. Only the verb
      was defective, so only the verb changes. For the same reason `test`
      keeps `med`: bare "Prøv 3" reads as *attempt number 3*, while `med`
      marks the numeral as the quantity being tried — the Italian trap,
      arrived at independently in Norwegian.
   --------------------------------------------------------------------- */

module.exports = {
  /* `hvor mye` -> `hvor mange`: punkt are countable, and the tool's own
     `rangeLabel` already says "Hvor mange punkt". Also gains the two
     clauses the Norwegian lacked — the ground staying visible, and
     "mens punktene var borte" for the vaguer "mens dere ikke kunne se".
     Uses `borte` to match the shipped `ariaGap` ("Punktene er borte"). */
  instruction: 'Tell punktene på bakken. Så blir punktene borte et øyeblikk — bakken er der hele tiden, og den viser dere bare om noe kom eller gikk, aldri hvor mange. Når øyeblikket er over, teller dere på nytt og finner ut hva som skjedde mens punktene var borte.',

  /* WAS 'Nye punkt på bakken' — the same defect that was just reversed in
     the English 'New marks'. `_again` calls `newState()`, which picks a
     whole scene: a new `n` AND a new hidden `k`. Naming the dots names
     half of what the button does. This names neither part, so it cannot
     under-name the scene, and it is imperative like the tool's other
     three button labels (Start øyeblikket / Ta bort forslaget / Skriv ut
     arket). "Ny runde" was rejected: `runde` carries a game-loop flavour
     this tool bans, and "Ny oppgave" implies a task with an answer. */
  again: 'La noe annet skje',

  /* verb only: står -> ligger */
  ariaStart: 'Det ligger {n} punkt på bakken.',

  /* verb only: står/sto -> ligger/lå. Sentence form KEPT — see ruling 2. */
  ariaEnd: 'Øyeblikket er over. Nå ligger det {m} punkt på bakken. Før lå det {n}.',

  /* WAS 'Nye punkt på bakken. Tell dem …' — inherited the `again` defect
     in its first sentence and hung "dem" off it. "Noe nytt" is true of a
     whole new scene and echoes the button. The second sentence is
     verified accurate: `_again` is refused while `_busy`, so this only
     ever speaks on a fresh scene in phase `before`, where the gap has not
     started. Now names the dots explicitly rather than by pronoun. */
  saidDealt: 'Noe nytt. Tell punktene på bakken før dere starter øyeblikket.',

  /* WAS 'Bakken før og etter …' — false in phases `before` and `gap`.
     `_buildSheet` does `bands = (s.phase === 'after') ? [s.n, s.m] : [s.n]`,
     so the printed sheet carries ONE band during setup. This holds
     whether one band or two prints. */
  sheetTitle: 'Bakken slik klassen så den, med plass til å skrive hva som skjedde',

  /* Same over-promise removed — and this is the sentence the plan is
     bought on. Now worded as ONE artefact with `sheetTitle`: the sheet
     says "Bakken slik klassen så den", the panel "bakken slik klassen
     nettopp så den" (`nettopp` kept — the sales panel points at what they
     just watched). Also `setningene` -> `regnestykkene`: in Norwegian
     `setning` means a GRAMMATICAL sentence, so it actively misleads in a
     mathematics tool; `regnestykke` is the LK20 term and `sheetHint`
     already ships it. This is a precision fix in Norwegian even though
     the English keeps "sentences". */
  lockedBody: 'Hele apparatet er gratis — hvert øyeblikk, bakken og så mange forslag klassen vil prøve. Lærerabonnementet gir i tillegg arket, som viser bakken slik klassen nettopp så den, med linjer å skrive regnestykkene på.'
};
