# PASS A de — word-floor remediation plan

**STATUS UPDATE:** 9 of the 10 extensions are now APPLIED. The K-270 edit (item 6 below) was DENIED by the permission system before plan mode re-engaged — it is the ONLY remaining change. K-270 currently stands at 189 words; the single pending edit appends the sentence in item 6 to the end of K-270's `p3` (before the closing quote), bringing it to 222. All other items in this file are done and kept for record only.


Target file: `C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen\i18n\.landing-var2a-de.json`

Coordinator flagged 10 entries under the ≥200-word body floor; each must reach ≥205 words (p1+p2+p3).
**Already applied (before plan mode):** K-240@vehicles — appended to p3: "Kleiner Tipp: Wer die ausgeschnittenen Fahrzeuge nicht sofort aufklebt, sondern erst in einer Dose sammelt, hat nebenbei ein Sortierspiel für viele weitere Runden gewonnen." → 193+24 = **217**.

**Remaining 9 edits — each appends ONE sentence to the END of that entry's `p3` string (inside the JSON string, before the closing quote):**

1. **K-240@fruits** (185 → 213): append
   ` Und wer jedes Bild vor dem Aufkleben noch einmal laut benennt – am besten gleich mit Artikel, der Apfel, die Banane –, macht aus dem Basteltisch nebenbei eine kleine Sprachförderrunde.`

2. **K-240@toys** (189 → 213): append
   ` Und falls der Klebestift einmal Pause macht: Die ausgeschnittenen Bilder eignen sich auch wunderbar als Kärtchen für ein selbst erfundenes Memory auf dem Teppich.`

3. **K-267** (198 → 224): append
   ` Und wer nach dem Ausmalen noch Energie hat, erzählt zu einer Aufgabe eine kleine Wegnehm-Geschichte – sieben Kekse, drei gegessen – und rechnet sie mit den Fingern nach.`

4. **K-268** (191 → 219): append
   ` Ein bewährter Trick für zwischendurch: Vor dem Rechnen alle Pluszeichen mit dem Finger antippen und laut benennen – so schärft sich der Blick für das Zeichen von ganz allein.`

5. **K-269** (198 → 221): append
   ` Wer den Zehner-Trick sichtbar machen möchte, legt beim Rechnen zehn Muggelsteine oder Nudeln bereit – erst die Zehn voll machen, dann weiterzählen, dann ausmalen.`

6. **K-270** (189 → 222): append
   ` Ein schöner Nebeneffekt für die Allerkleinsten: Wer den Weg zuerst mit dem Finger abfährt und erst danach mit dem Stift zeichnet, übt zweimal – und kommt beim zweiten Mal fast ohne Umweg ans Ziel.`

7. **K-271** (190 → 219): append
   ` Und wenn der Frust doch einmal groß wird, hilft eine kurze Pause mehr als jeder Hinweis – nach zwei Minuten Abstand findet sich der richtige Abzweig oft wie von selbst.`

8. **K-272** (191 → 214): append
   ` Für den Klassenraum ein bewährtes Ritual: das gelöste Riesenlabyrinth mit Namen versehen und aufhängen – so wird die geleistete Ausdauer für alle sichtbar gewürdigt.`

9. **K-242@animals** (189 → 218): append
   ` Wer mag, lässt sich nach dem Lösen erzählen, welches Tier den Weg gegangen ist und was es unterwegs erlebt hat – so bekommt die Konzentrationsübung noch einen kleinen Erzählanlass obendrauf.`

Mechanism: 9 `Edit` calls, each `old_string` = the unique tail of that entry's current p3 (ending `…"` plus the following key line for uniqueness), `new_string` = same tail with the sentence inserted before the closing quote — identical shape to the already-applied K-240@vehicles edit. After edits: re-count all 10 bodies (expect the counts above), no other fields touched.
