# Tweede controle (tegencontrole) — Nederlandse beeldwoordenschat

> **Dit is de bindende tekst.** Niet naar eigen inzicht herinterpreteren.
> **Als deze brief en Van Dale elkaar tegenspreken, geldt Van Dale.** Spreek de brief dan
> uitdrukkelijk tegen en schrijf het in `note`. Dat is gewenst en het is al tweemaal terecht
> gebeurd: in de Duitse ronde noemde de brief `Kugel→Kugeln` ten onrechte een defect (vijf
> beoordelaars spraken hem tegen — zij hadden gelijk), en in de eerste Nederlandse ronde noemde
> de brief `Padden` en `Onweren` "scriptartefacten", terwijl *de pad → padden* correct is (het
> defect zit bij `trail`, niet bij `toad`) en *onweren* een zeldzaam maar bestaand Van
> Dale-meervoud is. **De opdrachtgever vergist zich aantoonbaar. Controleer hem.**

## Jouw rol

Je bent een **tweede, onafhankelijke** moedertaalinstantie (Nederlands, Standaardnederlands,
Nederland; autoriteit: **Van Dale**, aanvullend de Woordenlijst/het Groene Boekje). Een eerste ronde
heeft 1.263 woorden gecontroleerd en correcties voorgesteld. **Jouw taak is NIET om het daarmee eens
te zijn.**

Jouw taak is **elke voorgestelde wijziging te proberen te weerleggen.**
Een correctie die jouw toets doorstaat, is betrouwbaar. Een die sneuvelt, heeft ons behoed voor een
fout op een educatieve site voor 3–7-jarigen. **Beide zijn winst.**

Waarom deze ronde bestaat (doctrine §A.13.58): **de uitvoer van één controle-instantie is een
uitgangspunt, geen waarheid.** In de Duitse ronde sneuvelden er zo twee correcties die anders waren
verscheept: `lego` (Van Dale kent wél *de Legos* — de "correctie" zou een bestaande vorm hebben
gewist) en `lettuce` (Van Dale markeert juist de afgebeelde betekenis als "geen meervoud"). Zeven
andere bleken dubbelen van een bestaande zustersleutel. **Zoek precies dat.**

## Jouw bestanden

- **De voorstellen:** `docs\audit-results\vocab-audit\corrections-nl.json`
  `corrections.<veld>.<key> = { to, from, why, src, cls }`
- **De conflicten:** `docs\audit-results\vocab-audit\conflicts-nl.json` — **lees dit.** Het bevat
  `reLitigated`: voorstellen die een **eerdere moedertaalspreker bewust anders heeft besloten**.
  Die verdienen jouw strengste toets (zie hieronder).
- **De teruggehouden gevallen:** `held-nl.json`
- **De context per woord** (thema's, Engelse glosse, huidige stand): `batches\nl-*.json` — daar staat
  `themes`: **wat het plaatje toont**. Zonder dat veld is bv. `salt` niet te beslissen.
- **De opdracht van de eerste ronde:** `BRIEF-nl.md` (zodat je hun maatstaf kent).

## Context

De woorden worden **op het digibord geprojecteerd ÉN hardop voorgelezen** aan kinderen van 3–7, samen
met een plaatje. `p` = **kaal meervoud met hoofdletter**. Geslacht: **`d` = de-woord (commuun) ·
`h` = het-woord (onzijdig)** — Nederlandse codes, nooit uit een andere taal overnemen.
**Conventie: geen meervoud → `p` is gelijk aan `s`.**

## Per voorstel één oordeel

- **`CONFIRM`** — de correctie klopt. Noem in `note` de Van Dale-grond.
- **`REJECT`** — de correctie is **fout**; de huidige waarde (`from`) was juist of beter.
  → `note` met reden. **Dit is de waardevolste bevinding van deze ronde.**
- **`AMEND`** — er moet iets veranderen, maar `to` is niet de juiste vorm. → geef `better` + `note`.
- **`ESCALATE`** — het voorstel doet méér dan een vormcorrectie (lemmawissel, plaatjesvraag, dubbel
  met een bestaande zustersleutel) en hoort teruggehouden i.p.v. toegepast. → `note`.

Toets uitdrukkelijk op:
1. **Bestaat `to` überhaupt als Nederlandse vorm?** De machine verzon o.a. *Bijjen*, *Havikken*,
   *Zeekoen*, *Schroevendraaieren*, *T-Rexxen*. Een correctie mag dat niet herhalen.
2. **Past het bij het plaatje?** (`themes` + `en`.)
3. **Standaardnederlands (Nederland)**, geen Belgisch/verouderd alternatief?
4. **Is een klasseregel blind overgetrokken?** Twee beoordelaars weigerden terecht de Duitse
   `-saurus → -saurier`-regel te importeren (Nederlands vormt *-ussen*). Werk net zo onderscheidend.
5. **Is een correct meervoud "gerepareerd"?** *de broden*, *de sappen*, *de lammeren*, *de bladeren*,
   *Gebraden kalkoenen*, *Piramiden*, *Stegosaurussen*, *open haard → open haarden* zijn **juist**.
6. **Bij `NO_PLURAL`:** heeft het woord kindgericht écht geen meervoud? (*het brood → de broden* zou
   een misoordeel zijn.)
7. **Dubbelen:** zou `to` de rij identiek maken aan een **bestaande zustersleutel** (`pea`/`peas`,
   `ice-skate`/`ice-skates`, `crayon`/`crayons`, `bookcase`/`bookshelf`)? Dan `ESCALATE`.

## De `reLitigated`-gevallen — jouw zwaarste toets

`conflicts-nl.json → reLitigated` bevat 7 voorstellen die een **eerdere moedertaalspreker heeft
onderzocht en bewust ongemoeid gelaten** (commit `c7de1a40`/`5310b329`, Van Dale-gecontroleerd):
de sportnamen **football / golf / hockey / table-tennis / tennis** (destijds "twijfel", bleven `de`),
plus **tape** en **grapefruit**.

De eerste ronde stelt nu een **regel** voor: *Nederlandse sportnamen zijn onzijdig* (het voetbal, het
hockey, het tennis, het tafeltennis, het golf), en bij `golf` bovendien een homoniemargument
(*de golf* = watergolf, *het golf* = de balsport).

**Beoordeel dit zelf, van de grond af.** Twee moedertaalsprekers zijn het oneens; jij bent de derde
stem, niet de scheidsrechter-op-autoriteit. Concreet:
- Is de regel "sportnamen zijn onzijdig" **werkelijk algemeen**, of kent Van Dale per sport een
  eigen ingang (en bestaat er de/het-variatie)?
- Is `de golf` bij het thema `sports` echt fout, of is de balsport ook als `de` gangbaar?
- `tape`: is *het plakband* het lemma dat hier bedoeld is, of is *de tape* (het bandje) even geldig?
- `grapefruit`: is *Grapefruiten* echt geen Nederlands?
Als je de eerste ronde gelijk geeft: `CONFIRM` met een expliciete Van Dale-grond. Als je twijfelt:
`ESCALATE` — de opdrachtgever beslist dan, niet wij.

## Uitvoer

Schrijf **één** bestand naar
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\reverify\nl-<DEEL>.json`

```json
{ "locale":"nl", "part":"<DEEL>", "reviewed": <N>,
  "rows": [
    { "key":"calf", "field":"plural", "verdict":"CONFIRM",
      "note":"Van Dale: het kalf -> de kalveren (onregelmatig -eren); 'Kalven' bestaat niet" },
    { "key":"x", "field":"plural", "verdict":"REJECT",
      "note":"de huidige vorm was correct; de wijziging zou een verslechtering zijn" },
    { "key":"y", "field":"gender", "verdict":"AMEND", "better":"d", "note":"..." }
  ] }
```

## Regels

- **Elk** voorstel in jouw deel beoordelen — geen steekproef.
- **Verzin geen Van Dale-citaten.** Onzeker → `ESCALATE` met reden. **Gok nooit.**
- Wijzig **GEEN** ander bestand.
- Antwoord aan het eind ALLEEN met: aantal gecontroleerd, telling per oordeel
  (`CONFIRM / REJECT / AMEND / ESCALATE`), en **elke REJECT/AMEND/ESCALATE in één regel** — dat zijn
  de bevindingen waar het om gaat.
