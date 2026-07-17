# Opdracht: moedertaalcontrole van de Nederlandse beeldwoordenschat

> **Dit is de bindende tekst.** Elke batch wordt tegen exact deze formulering beoordeeld, zodat de
> oordelen van alle batches vergelijkbaar zijn. Niet naar eigen inzicht herinterpreteren.
>
> **Als deze brief en Van Dale elkaar tegenspreken, geldt Van Dale.** Spreek de brief dan
> uitdrukkelijk tegen en schrijf het in `reason`. Dat is gewenst, niet riskant: in de Duitse ronde
> stond er een feitelijke fout in de brief van de opdrachtgever (`Kugel→Kugeln` werd een "defect"
> genoemd terwijl het volgens Duden correct is). **Vijf beoordelaars spraken hem tegen — zij hadden
> gelijk, de brief had ongelijk.** Nul foutieve correcties bereikten de data. Doe hetzelfde.

Je bent moedertaalspreker en linguïst Nederlands (Standaardnederlands, Nederland), met nadruk op de
woordenschat van kleuters en groep 3-5. Autoriteit voor elke beslissing: **Van Dale** (aanvullend:
de Woordenlijst Nederlandse Taal / het Groene Boekje). Denk in het Nederlands, schrijf `reason`
beknopt in het Engels.

## Waarom deze opdracht bestaat

`REFERENCE TRANSLATIONS/image-vocabulary.js` levert de woorden voor een educatieve website voor
kinderen van 3–7 jaar. De woorden worden **op het digibord geprojecteerd ÉN hardop voorgelezen**
(tekst-naar-spraak), samen met een plaatje.

**Geen mens heeft deze meervouden of geslachten ooit geschreven.** Een script heeft ze machinaal uit
het enkelvoud afgeleid. Hieronder staat de **letterlijke** code die jouw data heeft voortgebracht —
niet mijn samenvatting ervan, zodat je zelf ziet wat er is misgegaan:

```js
function genderNl(word) {
  if (!word) return 'd';
  const lower = word.toLowerCase();
  // Het-words: diminutives, -isme, -ment, -um, -sel, ge- prefix nouns
  if (lower.endsWith('je') || lower.endsWith('tje') || lower.endsWith('pje') ||
      lower.endsWith('isme') || lower.endsWith('ment') || lower.endsWith('um') ||
      lower.endsWith('sel') || lower.endsWith('schap')) {
    return 'h';
  }
  if (lower.startsWith('ge') && lower.length > 4 &&
      !lower.startsWith('geel') && !lower.startsWith('geen') && !lower.startsWith('geer')) {
    return 'h';
  }
  return 'd';          // ← ALLES ANDERS WORDT 'de'. Dit is de bug.
}
```

**Het gevolg, gemeten:** de data telt **1083 `d` tegen 180 `h` = 85,7% de-woorden**, terwijl het
werkelijke aandeel rond **~67%** ligt. Dat impliceert **ongeveer 237 verkeerd gecodeerde
het-woorden**. Een eerdere ronde heeft er 66 hersteld, maar via een **op achtervoegsels begrensde**
zoekactie (`-tuig/-pak/-mes/-bed/-hoofd/-fruit/-eau`). Zo'n zoekactie vindt per definitie alleen wat
op haar eigen lijst staat. **Jouw woord-voor-woord-lezing is nergens door begrensd. Dát is de reden
dat deze opdracht bestaat.**

Het meervoudsdeel van hetzelfde script (`pluralizeNlSingle`) is aantoonbaar de herkomst van o.a.:
de regel `-lf → -lven` maakte van *kalf* → **"Kalven"** (Nederlands is onregelmatig: *kalveren*);
de medeklinkerverdubbeling maakte **"Hangslotten"**, **"Driebladden"**, **"Padden"**, **"Zouten"**,
**"Onweren"**; en omdat alleen het láátste woord van een woordgroep vervoegd wordt, ontstond
**"Medisch dossieren"** (correct: *medische dossiers*).

**Neem niets als juist aan. Beoordeel elk woord afzonderlijk.**

De opdrachtgever zegt: "This is an educational website. It is absolutely not acceptable." Hij heeft
gelijk. Een kind mag geen fout woord horen.

## De batchbestanden

Map: `C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\batches\`

Per regel in `rows[]`:

| Veld | Betekenis |
|---|---|
| `key` | interne sleutel (Engels) |
| `themes` | **de beeldthema's. DOORSLAGGEVEND: ze vertellen je WAT HET PLAATJE TOONT.** `orange` met `[colors,fruits]` is dubbelzinnig; `salt` met `[at_the_supermarket]` is keukenzout (stofnaam), niet de scheikundige *zouten*. |
| `en` | `[enkelvoud, meervoud]` Engels = de glosse, wat er is afgebeeld |
| `cur` | **de huidige Nederlandse data** `{s: enkelvoud, p: meervoud, g: geslacht}` ← dít beoordeel je |
| `type` / `countable` | metadata uit een ruwbestand. **ALLEEN AANWIJZING, GEEN OORDEEL.** Aantoonbaar feilbaar: `bread` staat er als `countable:false`, terwijl *het brood → de broden* volkomen correct is. |
| `nets` | machinale verdenkingsvlaggen: N1 meervoud ondanks ontelbaarheid · N2 geen meervoud ondanks telbaarheid · N3 kop-inconsistentie · N5 enkelvoud en meervoud zijn verschillende lemma's · N6 botsing met een andere sleutel · N7 wees. **Een vlag is een verdenking, geen oordeel — en géén vlag is GEEN vrijbrief.** |
| `noImage: true` | er bestaat geen plaatje bij deze sleutel (dode data). Toch beoordelen, maar laagste prioriteit. |

## Dataformaat

`p` is het **kale meervoud met hoofdletter**, zonder lidwoord: `["Kat","Katten","d"]`.
**Geslacht: `d` = de-woord (commuun) · `h` = het-woord (onzijdig).**

> ⚠ **`d`/`h` zijn Nederlandse codes en gelden ALLEEN voor het Nederlands.** Andere talen in dit
> bestand gebruiken andere stelsels (`m/f/n`, `n/t`) en die betekenen iets ánders. Bewijs dat je een
> code nooit mag overnemen: `rectangle` is *das Rechteck* (Duits `n` = onzijdig) maar **de rechthoek**
> (Nederlands `d` = commuun). Zelfde vorm, ander geslachtsstelsel. Beoordeel uitsluitend tegen het
> Nederlands.

**Conventie: heeft een woord geen meervoud, dan is `p` gelijk aan `s`.** (Zo codeert het bestand
"geen meervoud".)

## Voor ELKE sleutel drie velden beoordelen

1. **`singular`** — is `cur.s` het juiste Nederlandse woord voor wat het plaatje toont (`themes` +
   `en`)? En is het echt een **enkelvoud**? (Bekend defect: er staat een meervoud in het
   enkelvoudsveld.)
2. **`plural`** — is `cur.p` het correcte meervoud volgens Van Dale? Let op de klassieke valkuilen:
   **-en vs -s** (*appels* niet *appelen*), **klinkerverkorting** (*huis → huizen*),
   **verstemlozing** (*brief → brieven*), **medeklinkerverdubbeling** (*pot → potten*),
   **onregelmatig -eren** (*kalf → kalveren*, *ei → eieren*, *kind → kinderen*),
   en woordgroepen waar het **bijvoeglijk naamwoord mee moet buigen** (*medisch dossier → medische
   dossiers*).
3. **`gender`** — is `cur.g` juist? Verkleinwoorden (-je/-tje/-pje) zijn **altijd het**. Voor de rest:
   zie de bug hierboven — de kans dat een `d` onterecht is, is aanzienlijk. **Maar controleer, ga niet
   herverdelen om een percentage te halen.**

### Oordelen (per veld)

- **`OK`** — correct. **Zeg OK als het klopt.** Ook mét een vlag.
- **`FIX`** — fout, en de correctie is een zuivere vormcorrectie van **hetzelfde** woord → geef `correct`.
- **`NO_PLURAL`** — het woord heeft geen (kindgericht) meervoud: stofnamen (*water*, *melk*, *zout*),
  abstracta, eigennamen (*Jupiter*), bijvoeglijke naamwoorden/kleuren (*Rood*), zelfstandig gebruikte
  werkwoorden (*het zwemmen*). → `p` wordt gelijk aan `s`.
- **`PLURALIA_TANTUM`** — alleen meervoud (*de hersenen*, *de notulen*). Mag ook op `singular` staan:
  dat betekent "dit woord heeft geen enkelvoud, het meervoud in dat veld is correct".
- **`HOLD`** — **de correctie doet MEER dan de vorm veranderen**: een ander lemma, een innerlijk
  tegenstrijdige regel, of een inhoudelijke vraag over het plaatje. → `HOLD` met heldere reden.
  **Nooit blind herschrijven.**

## Kalibratie — beide soorten fouten zijn duur

- **Vals negatief:** *"Kalven"* laten staan. Van Dale: *het kalf → de kalveren*. Dat is FIX.
- **Vals positief:** *"broden"* melden als stofnaamfout. *Het brood → de broden* is CORRECT → OK.

**Oordeel woord voor woord, niet op patroon.** Een Duitse beoordelaar weigerde terecht de regel
`-saurus → -saurier` toe te passen op `carnotaurus` (Latijn *taurus* = stier). Werk net zo
onderscheidend: een klasse is een hulpmiddel, geen automaat.

## Homoniemen — het geslacht ís hier de betekenis

De Duitse ronde vond `pine-tree` = `["Kiefer","Kiefer","m"]`: *die Kiefer* is de den, *der Kiefer* is
het **kaakbeen** — de data bevatte het kaakbeen. Het Nederlands heeft dezelfde valstrik. Controleer bij
elk dubbelzinnig woord welke betekenis het **plaatje** toont:
*het bot* (been) vs *de bot* (vis) · *het vest* (kledingstuk) vs *de vest* (gracht) ·
*het pad* (weggetje) vs *de pad* (dier) · *het blad* vs *de blad*- samenstellingen.
Ken je het onderscheid, meld het dan in `reason` ook als je `OK` geeft.

## Uitvoer

Schrijf **één** bestand naar
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\verdicts\nl-<NN>.json`
(map eventueel aanmaken), met **één regel per sleutel — ALLE sleutels van de batch, geen enkele mag
ontbreken**:

```json
{ "locale":"nl", "batch":"<NN>", "reviewed": <N>,
  "rows": [
    { "key":"calf",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"FIX","correct":"Kalveren","reason":"Van Dale: het kalf -> de kalveren (irregular -eren); 'Kalven' comes from a -lf->-lven rule that does not apply","source":"Van Dale"},
      "gender":{"verdict":"OK"} },
    { "key":"medical-chart",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"FIX","correct":"Medische dossiers","reason":"adjective must agree in the plural; the script inflected only the last token","source":"Van Dale"},
      "gender":{"verdict":"OK"} }
  ] }
```

`correct` **alleen** bij `FIX`. `reason` bij alles behalve `OK`. `source` waar niet triviaal.

## Regels

- **Alle sleutels van de batch beoordelen** — geen selectie, geen steekproef.
- Bij dubbelzinnigheid beslissen `themes` + `en` welke betekenis bedoeld is.
- **Verzin geen Van Dale-citaten.** Onzeker → `HOLD` met reden. Onzekerheid is een legitiem,
  waardevol resultaat. **Gok nooit.**
- Wijzig **GEEN** ander bestand. Alleen het ene oordeelbestand.
- Antwoord aan het eind ALLEEN met: aantal gecontroleerd, de telling per oordeel per veld
  (bv. `plural: 78 OK / 21 FIX / 9 NO_PLURAL / 2 HOLD`), plus de 5 ernstigste bevindingen in
  elk één regel.
