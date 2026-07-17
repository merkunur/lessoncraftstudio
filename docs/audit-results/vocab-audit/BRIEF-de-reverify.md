# Zweite Prüfung (Gegenprüfung) — deutscher Bildwortschatz

> **Dies ist der verbindliche Text.** Nicht sinngemäß umdeuten.
> **Wenn dieser Brief und Duden sich widersprechen, gilt Duden.** Widersprich dem Brief
> ausdrücklich und schreib es in `note`. Das ist erwünscht, nicht riskant: in der ersten
> Runde stand in einem Brief des Auftraggebers ein sachlicher Fehler
> (`Kugel→Kugeln` wurde als „Defekt" bezeichnet, obwohl es nach Duden korrekt ist).
> **Drei Prüfer:innen haben ihm widersprochen — sie hatten recht, der Brief hatte unrecht.**

## Deine Rolle

Du bist eine **zweite, unabhängige** muttersprachliche Instanz (Deutsch, Standarddeutsch,
Bundesrepublik; Autorität: **Duden**). Eine erste Runde hat 1.263 Wörter geprüft und
Korrekturen vorgeschlagen. **Deine Aufgabe ist NICHT, ihr zuzustimmen.**

Deine Aufgabe ist, **jede vorgeschlagene Änderung zu widerlegen zu versuchen.**
Eine Korrektur, die deiner Prüfung standhält, ist belastbar. Eine, die fällt, hat uns vor
einem Fehler in einer Bildungs-Website für 3–7-Jährige bewahrt. Beides ist ein Erfolg.

Warum diese zweite Runde existiert (Doktrin §A.13.58): **die Ausgabe einer Prüfinstanz ist
eine Ausgangsbasis, keine Wahrheit.** Sie wurde in dieser Arbeit bereits zweimal empirisch
widerlegt.

## Deine Dateien

- **Die Vorschläge:** `C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\corrections-de.json`
  Aufbau: `corrections.<feld>.<key> = { to: <neuer Wert>, from: <aktueller Wert>, why: <Begründung>, src: <Quelle>, cls: <FIX|NO_PLURAL|PLURALIA_TANTUM> }`
- **Die Zurückgestellten:** `docs/audit-results/vocab-audit/held-de.json` — Einträge, bei denen
  die erste Runde eine Entscheidung verweigert hat (Lemma-Wechsel, widersprüchliche Einträge).
- **Der Kontext je Wort** (Bild-Themen, englische Glosse, aktueller Stand):
  `docs/audit-results/vocab-audit/batches/de-*.json` — dort steht `themes`, das sagt dir,
  **WAS DAS BILD ZEIGT**. Ohne dieses Feld ist z. B. `salt` (Küchensalz vs. chemische Salze)
  nicht entscheidbar.
- **Der Auftrag der ersten Runde** (damit du ihre Maßstäbe kennst): `BRIEF-de.md` im selben Ordner.

## Kontext

Die Wörter werden **an die Wand projiziert UND laut vorgelesen** (TTS) für Kinder von 3–7,
zusammen mit einem Bild. `p` = **bloßer Nominativ Plural, großgeschrieben**.
Genus: `m`=der · `f`=die · `n`=das. **Konvention: kein Plural → `p` ist identisch mit `s`.**

## Für JEDE vorgeschlagene Korrektur ein Urteil

- **`CONFIRM`** — die Korrektur ist richtig. Nenne in `note` die Duden-Grundlage.
- **`REJECT`** — die Korrektur ist **falsch**; der aktuelle Wert (`from`) war richtig oder
  besser. → `note` mit Begründung. **Das ist der wertvollste Befund dieser Runde.**
- **`AMEND`** — eine Korrektur ist nötig, aber `to` ist nicht die richtige Form.
  → gib `better` an + `note`.
- **`ESCALATE`** — der Vorschlag tut mehr als eine Formkorrektur (anderer Lemma-Wechsel,
  Bildfrage, Dublette mit einem anderen Schlüssel) und gehört zurückgestellt statt angewandt.
  → `note`.

Prüfe dabei ausdrücklich mit:
1. **Ist `to` überhaupt eine existierende deutsche Form?** (Die Maschine hat u. a.
   *Kakten*, *Küchenchefe*, *Onkel Same* erfunden — eine Korrektur darf das nicht wiederholen.)
2. **Passt sie zum Bild?** (`themes` + `en` in den Batch-Dateien.)
3. **Standarddeutsch, nicht regional?** (*die* Sellerie und *Sonnencremen* sind
   österreichisch; Standard ist *der* Sellerie / *Sonnencremes*.)
4. **Wurde eine Klasse blind überdehnt?** `-saurus` → `-saurier` ist korrekt, gilt aber
   **nicht** für `carnotaurus` (lat. *taurus*), `triceratops`, `velociraptor` (→ *-oren*).
5. **Ist ein echter Nullplural fälschlich „repariert" worden?** *der Löffel → die Löffel*,
   *das Mädchen → die Mädchen*, *der Lehrer → die Lehrer* sind **korrekt**.
6. **Bei `NO_PLURAL`:** hat das Wort im kindgerechten Sinn wirklich keinen Plural?
   (*das Brot → die Brote* ist korrekt und wäre ein Fehlurteil.)

## Ausgabe

Schreibe **eine** Datei:
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\reverify\de-<TEIL>.json`

```json
{ "locale":"de", "part":"<TEIL>", "reviewed": <N>,
  "rows": [
    { "key":"cheese", "field":"plural", "verdict":"CONFIRM",
      "note":"Duden: der Käse → die Käse (Nullplural); 'Käsen' existiert nicht" },
    { "key":"sphere", "field":"plural", "verdict":"REJECT",
      "note":"'Kugeln' ist korrekt (Duden: Kugel, die; -, -n); die Änderung wäre eine Verschlechterung" },
    { "key":"x", "field":"gender", "verdict":"AMEND", "better":"n",
      "note":"..." }
  ] }
```

## Regeln

- **Jede** Korrektur im dir zugewiesenen Teil beurteilen — keine Stichprobe.
- **Erfinde keine Duden-Zitate.** Unsicher → `ESCALATE` mit Begründung. Rate niemals.
- Ändere **KEINE** andere Datei. Nur die eine Reverify-Datei.
- Antworte am Ende NUR mit: Anzahl geprüft, Zählung je Verdikt
  (`CONFIRM / REJECT / AMEND / ESCALATE`), und **jede REJECT/AMEND in je einer Zeile** —
  das sind die Befunde, auf die es ankommt.
