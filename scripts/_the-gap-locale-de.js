'use strict';
/* German — TOOL #56, round 2. Authored by the native panel, verbatim.
   ONLY the keys that change from the current `de:` block in
   `scripts/_the-gap-strings.js`. Everything else is deliberately omitted.

   Held on German's own merits, NOT changed (do not "fix" these):
   - `test` stays 'Versuch mit'. Bare 'Versuch' composes at the rail to
     "Versuch 3", read as *Versuch Nummer 3* — trial number three — which
     inverts a magnitude into an ordinal. This is the positive form of
     Italian's `Prova 3` argument. German never had the "Try this many 3"
     defect that forced the English shortening.
   - `ariaEnd` stays. It was already a label form for a GERMAN reason, not
     a copied one: the colon fragment sidesteps verb agreement, and
     `der Kiesel` is sg. = pl., so {m}=1 is correct. Expanding it into a
     clause would produce *'Auf dem Boden liegen 1 Kiesel'*, which is the
     error the colon exists to avoid.
     Recorded dependency: `ariaStart`'s plural verb *liegen* is safe ONLY
     because `GEO.FLOOR = 3`. If that floor ever drops, that string breaks.
   - `Versuch` vs `Vermutung` ruled TASTE, not defect. `der Versuch` is a
     plain everyday attempt and transparent at 6-7; the experiment sense
     does not mislead here. `Vermutung` is the better classroom word for a
     stated theory, but `Versuch` is not false and it is not worth the
     churn. It would touch 7 keys: test, clear, ariaTry, sayLands,
     saidNoTry, saidTryOff, lockedBody.

   No key below carries a placeholder, matching its English counterpart;
   `saidTryOff` is a refusal and is placeholder-free as `_refuse` requires
   (it calls `api.announce(api.t(msg))` with no `_fmt`). */

module.exports = {
  /* Two fixes, both German-internal. (a) `wie viel` is MASS-only and the
     referent is countable Kiesel -> `wie viele`; German breaks here exactly
     as Danish (*hvor meget*) and Portuguese (*quantas*) did. (b) The German
     never said the ground stays visible, which is the clause the whole
     routine turns on: during the gap the Boden is deliberately the one
     thing left in view, because the pulse has to read against it. */
  instruction: 'Zählt die Kiesel auf dem Boden. Dann kommt die Zwischenzeit: Die Kiesel sind verdeckt, nur der Boden bleibt zu sehen. Er verrät, ob etwas dazugekommen oder weggegangen ist — nie, wie viele. Danach zählt noch einmal und überlegt gemeinsam, was passiert ist, während die Kiesel verdeckt waren.',

  /* The German control row had TWO declarative outliers, not one:
     `clear` and `print` are infinitives ('Versuch wegnehmen', 'Blatt
     drucken') — the standard German rendering of an English imperative
     button — while `again` and `run` were sentences. Both move to the
     infinitive and the row becomes uniform.
     `again` names the whole event, not the dots: `_again` calls
     `newState()`, which picks a fresh scene — a new `n` AND a new hidden
     `k` — so a noun phrase about the Kiesel would under-describe it. */
  again: 'Etwas anderes passieren lassen',
  run: 'Die Zwischenzeit zeigen',

  /* BOTH halves over-promised, not just the first. `_buildSheet` does
     `bands = (s.phase === 'after') ? [s.n, s.m] : [s.n]`, so a sheet
     printed during `before` or `gap` carries ONE band: "vorher und
     nachher" fails, and so does "was DAZWISCHEN passiert ist" — there is
     no *between* with one band. True now at one band or two. */
  sheetTitle: 'Der Boden, wie ihn die Klasse gesehen hat — und Platz für das, was passiert ist',

  /* Fix taken, English SHAPE declined — the Italian answer. German
     "Für jede Zwischenzeit eine Zeile" is a verbless worksheet caption and
     reads ALLOCATIONALLY ("one line per gap"), never as an inventory claim
     about the sheet, so the falsity the English imperative repairs does not
     arise in German. Two real defects did:
     - `daneben` -> `darauf`. Measured: `lines` is six stacked full-width
       `crt-sh-line` divs, so nothing is beside anything; the child writes
       ON the line. The German had invented a position the English never
       claimed.
     - dropped "die ihr beobachtet", the one clause pulling the caption
       toward a descriptive reading (and the tense question goes with it). */
  sheetHint: 'Für jede Zwischenzeit eine Zeile — und darauf die passende Rechnung.',

  /* LOCATION -> IDENTITY, following the corrected English. The old German
     said the try "steht schon da"; what actually happened is that the hand
     pressed a numeral that is already the stated theory. Measured: the sole
     reachable branch is the repeat press (`null:repeat` 1960 over 20,806
     rail presses from every reachable state; every other refusal branch 0),
     because `rail()` and `tryK()` share their bounds.
     `euer`, NOT `dein`: the tool addresses the class as *ihr* (Zählt,
     überlegt), so a singular possessive would be the only singular address
     in the file — and the theory belongs to the class by design. */
  saidTryOff: 'Diese Zahl ist schon euer Versuch.',

  /* Same over-promise as `sheetTitle`, in the sentence a teacher BUYS the
     plan on: "der Boden vorher und nachher" describes an artefact the
     `before`/`gap` sheet does not have. Now word-for-word the same as
     `sheetTitle`, so the sales panel and the printed sheet describe ONE
     artefact.
     Only the deletion of "vorher und nachher" is truth-critical;
     `mag` -> `möchte` is register for that panel and can be reverted
     without touching truth. */
  lockedBody: 'Alles hier ist kostenlos — jede Zwischenzeit, der Boden und so viele Versuche, wie die Klasse möchte. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken: der Boden, wie ihn die Klasse gerade gesehen hat, und Linien zum Aufschreiben.'
};
