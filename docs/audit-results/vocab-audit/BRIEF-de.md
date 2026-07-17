# Auftrag: muttersprachliche Prüfung des deutschen Bildwortschatzes

> **Dies ist der verbindliche Text.** Jeder Batch wird gegen genau diesen Wortlaut geprüft,
> damit die Urteile aller Batches vergleichbar sind. Nicht sinngemäß umdeuten — was hier
> steht, gilt; was hier nicht steht, ist nicht Teil des Auftrags.

Du bist Muttersprachler:in und Linguist:in für Deutsch (Standarddeutsch, Bundesrepublik)
mit Schwerpunkt Grundschul-/Kita-Wortschatz. Autorität für jede Entscheidung: **Duden**
(Rechtschreibung + Grammatik). Denke auf Deutsch, schreibe `reason` knapp auf Englisch.

## Warum es diesen Auftrag gibt

`REFERENCE TRANSLATIONS/image-vocabulary.js` liefert Wörter für eine Bildungs-Website für
Kinder von 3–7 Jahren. Die Wörter werden **an die Wand projiziert UND laut vorgelesen**
(Text-to-Speech), zusammen mit einem Bild.

**Kein Mensch hat diese Pluralformen je geschrieben.** Ein Skript hat sie maschinell aus
dem Singular erzeugt, nach groben Regeln: „feste Liste → Suffix-Treffer → naiver Default".
Der dokumentierte deutsche Default lautet wörtlich: *Wörter auf `-el`, `-er`, `-en` bleiben
unverändert* — das Skript lässt sie also **ohne Plural**. Belegte Folgefehler:
`Bauer→Bauer` (Duden: *der Bauer → die Bauern*, schwaches Substantiv) und
`Käse→Käsen`, `Kaktus→Kakten`, `Briefumschlag→Briefumschlage`.
**Nimm nichts als richtig an. Prüfe jedes Wort einzeln.**

> ### ⚠ Korrektur eines Fehlers in einer früheren Fassung dieses Briefs
> Eine frühere Fassung nannte `Kugel→Kugeln` und `Brezel→Brezeln` als *Fehler*-Beispiele.
> **Das war falsch, und der Fehler lag beim Auftraggeber, nicht bei Duden.** Nach Duden sind
> *die Kugel → die Kugeln* und *die Brezel → die Brezeln* **korrekt** (feminine `-el`-Wörter
> nehmen `-n`). Der Defekt des Skripts ist das **Gegenteil**: es lässt `Kugel→Kugel` stehen.
> Zwei Prüfer:innen (Batch 01 und 12) haben diesen Briefe-Fehler unabhängig erkannt und ihm
> **zu Recht widersprochen** (`aster→Astern`, `bible→Bibeln`, `Waffel→Waffeln` sind korrekt
> und bleiben `OK`). Genau so ist es richtig: **Wenn dieser Brief und Duden sich
> widersprechen, gilt Duden.** Widersprich dem Brief und schreib es in `reason`.

Der Betreiber sagt: „This is an educational website. It is absolutely not acceptable."
Er hat recht. Ein Kind darf kein falsches Wort hören.

## Die Batch-Datei

Verzeichnis: `C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\batches\`

Pro Zeile in `rows[]`:

| Feld | Bedeutung |
|---|---|
| `key` | interner Schlüssel (englisch) |
| `themes` | **die Bild-Themen. ENTSCHEIDEND: sie sagen dir, WAS DAS BILD ZEIGT.** `orange` mit `[colors,fruits]` ist mehrdeutig; `salt` mit `[at_the_supermarket]` ist Küchensalz (Massenname), NICHT die chemischen `Salze`. |
| `en` | `[Singular, Plural]` englisch = die Glosse, was abgebildet ist |
| `cur` | **die aktuellen deutschen Daten** `{s: Singular, p: Plural, g: Genus}` ← das prüfst du |
| `type` / `countable` | Metadaten aus einer Rohdatei. **NUR HINWEIS, KEIN URTEIL.** Nachweislich fehlbar: `bread` steht dort `countable:false`, aber *das Brot → die Brote* ist völlig korrekt. |
| `nets` | maschinelle Verdachtsflaggen: N1 Plural trotz Unzählbarkeit · N2 kein Plural trotz Zählbarkeit · N3 Kopf-Inkonsistenz · N5 Singular und Plural sind verschiedene Lemmata · N6 Kollision mit anderem Schlüssel · N7 Waise · N8 traf den naiven Default des Skripts. **Eine Flagge ist ein Verdacht, kein Urteil — und das Fehlen einer Flagge ist KEIN Freibrief.** |
| `noImage: true` | zu diesem Schlüssel existiert kein Bild (tote Daten). Trotzdem beurteilen, aber niedrigste Priorität. |

## Datenformat

`p` ist der **bloße Nominativ Plural, großgeschrieben**, ohne Artikel: `["Katze","Katzen","f"]`.
Genus: `m` = der · `f` = die · `n` = das.
**Konvention: hat ein Wort keinen Plural, dann ist `p` identisch mit `s`.** (So kodiert die Datei „kein Plural".)

## Für JEDEN Schlüssel drei Felder prüfen

1. **`singular`** — ist `cur.s` das richtige deutsche Wort für das, was das Bild zeigt
   (`themes` + `en`)? Und ist es wirklich ein **Singular**? (Bekannter Defekt: bei
   `pretzels` steht ein Plural im Singular-Feld.)
2. **`plural`** — ist `cur.p` der korrekte Plural nach Duden?
3. **`gender`** — ist `cur.g` das richtige Genus?

### Verdikte (pro Feld)

- **`OK`** — korrekt. **Sag OK, wenn es stimmt.** Deutsch hat sehr viele Null-Plurale
  (*der Lehrer → die Lehrer*, *das Mädchen → die Mädchen*, *der Löffel → die Löffel*).
  Die sind RICHTIG, auch wenn eine Flagge dranhängt.
- **`FIX`** — falsch, und die Korrektur ist eine reine Formkorrektur **desselben** Wortes → gib `correct`.
- **`NO_PLURAL`** — das Wort hat im Deutschen keinen (kindgerechten) Plural: Massennamen
  (*Wasser*, *Milch*, *Reis*), Abstrakta, Eigennamen (*Jupiter*), Adjektive/Farben (*Rot*),
  substantivierte Infinitive (*das Essen*). → `p` soll gleich `s` werden.
- **`PLURALIA_TANTUM`** — nur Plural (*die Eltern*, *die Ferien*).
- **`HOLD`** — **die Korrektur tut MEHR als die Form zu ändern**: sie erfordert ein anderes
  Lemma (ein anderes Wort), oder der Eintrag ist in sich widersprüchlich, oder es ist eine
  inhaltliche Frage ans Bild. Beispiel: `pepper` = `["Paprika","Pfeffer","m"]` — Singular und
  „Plural" sind **zwei verschiedene Wörter** (Gemüsepaprika vs. Gewürz). Das ist kein
  Plural-Fix, das ist eine Entscheidung. → `HOLD` mit klarer Begründung.
  **Niemals blind umschreiben.**

## Kalibrierung — beide Fehlerarten sind teuer

- **Falsch-negativ:** `Käse→Käsen` durchwinken. Duden: *der Käse → die Käse*. Das ist FIX.
- **Falsch-positiv:** `Brot→Brote` als „Massennamen-Fehler" melden. *Das Brot → die Brote*
  (Laibe) ist KORREKT → OK.

Urteile **Wort für Wort, nicht nach Muster.**

## Bereits belegte Klassen (aus Batch 01/02) — prüfen, aber **nie blind anwenden**

- **Substantivierte Infinitive/Verbalnomen sind ausnahmslos Neutrum** (*das Backen*, *das
  Boxen*, *das Radfahren*) — die Daten hatten `m` → „der Backen". Ebenso Farbnamen als
  Substantiv: *das Blau*, *das Braun*.
- **`-saurus` bildet den Plural auf `-saurier`** (Duden: *Tyrannosaurus, der; -, ...rier*),
  nicht `-sauren`. **ABER:** `carnotaurus` endet auf `-taurus` (lat. *taurus* = Stier) — dort
  gilt die Regel NICHT. Genau so differenziert arbeiten.
- **Plural im Singular-Feld** (`blocks` = „Bauklötze", `candy` = „Süßigkeiten") ist eine
  eigene Defektklasse: der Singular ist zu rekonstruieren (*Bauklotz*, *Süßigkeit*).
- **Erfundene Formen:** `Kakten` existiert nicht (Duden: *der Kaktus → die Kakteen*).
- **Varietät zählt:** *die* Sellerie ist österreichisch; Standarddeutsch ist *der* Sellerie.

## Ausgabe

Schreibe **eine** Datei nach
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\verdicts\de-<NN>.json`
(Verzeichnis ggf. anlegen), mit **einer Zeile pro Schlüssel — ALLE Schlüssel des Batches,
keiner darf fehlen**:

```json
{ "locale":"de", "batch":"<NN>", "reviewed": <N>,
  "rows": [
    { "key":"cheese",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"FIX","correct":"Käse","reason":"Duden: der Käse → die Käse; 'Käsen' is not a form","source":"Duden"},
      "gender":{"verdict":"OK"} },
    { "key":"pepper",
      "singular":{"verdict":"HOLD","reason":"entry conflates bell pepper (Paprika) with the spice (Pfeffer) — needs a lemma decision, not a form fix"},
      "plural":{"verdict":"HOLD","reason":"see singular"},
      "gender":{"verdict":"HOLD","reason":"gender depends on which lemma is chosen"} }
  ] }
```

`correct` **nur** bei `FIX`. `reason` bei allem außer `OK` (bei `OK` weglassen). `source` wo nicht trivial.

## Regeln

- **Alle Schlüssel des Batches beurteilen** — keine Auswahl, keine Stichprobe, keine Abkürzung.
- Bei Mehrdeutigkeit entscheiden `themes` + `en`, welche Bedeutung gemeint ist.
- **Erfinde keine Duden-Zitate.** Unsicher → `HOLD` mit Begründung. Unsicherheit ist ein
  legitimes, wertvolles Ergebnis. **Rate niemals.**
- Ändere **KEINE** andere Datei. Nur die eine Verdikt-Datei schreiben.
- Antworte am Ende NUR mit: Anzahl geprüft, Zählung je Verdikt pro Feld
  (z. B. `plural: 78 OK / 21 FIX / 9 NO_PLURAL / 2 HOLD`), plus die 5 gravierendsten Funde
  in je einer Zeile.
