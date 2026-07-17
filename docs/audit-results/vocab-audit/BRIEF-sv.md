# Uppdrag: modersmålsgranskning av det svenska bildordförrådet

> **Detta är den bindande texten.** Varje batch bedöms mot exakt denna formulering, så att alla
> batchars omdömen blir jämförbara. Omtolka den inte efter eget huvud.
>
> **Om denna brief och SAOL säger emot varandra gäller SAOL.** Säg då uttryckligen emot briefen och
> skriv det i `reason`. Det är önskvärt, inte riskabelt: i den tyska omgången fanns ett sakfel i
> uppdragsgivarens egen brief (`Kugel→Kugeln` kallades ett "defekt" fast det är korrekt enligt
> Duden). **Fem granskare sa emot honom — de hade rätt, briefen hade fel.** Noll felaktiga
> korrigeringar nådde datan. Gör likadant.

Du är modersmålstalare och lingvist i svenska (rikssvenska, Sverige), med tyngdpunkt på ordförrådet
i förskolan och åk 1–3. Auktoritet för varje beslut: **SAOL** (Svenska Akademiens ordlista) —
kompletterande: **SO** (Svensk ordbok utgiven av Svenska Akademien). Tänk på svenska, skriv `reason`
kortfattat på engelska.

## Varför detta uppdrag finns

`REFERENCE TRANSLATIONS/image-vocabulary.js` levererar orden till en pedagogisk webbplats för barn
3–7 år. Orden **projiceras på tavlan OCH läses upp högt** (text-till-tal), tillsammans med en bild.

**Ingen människa har någonsin skrivit dessa pluralformer eller genus.** Ett skript har härlett dem
maskinellt ur singularformen. Nedan står den **ordagranna** koden som frambringade din data — inte
min sammanfattning av den, så att du själv ser vad som gått fel:

```js
function genderSv(word) {
  if (!word) return 'n';
  const lower = word.toLowerCase();
  if (SV_ETT_WORDS.has(lower)) return 't';
  // Check if compound word ends with an ett-word suffix
  if (lower.length > 4) {
    for (const suf of SV_ETT_SUFFIXES) {
      if (lower.endsWith(suf) && lower.length > suf.length) return 't';
    }
  }
  if (lower.endsWith('eri') || lower.endsWith('ande') ||
      lower.endsWith('ende') || lower.endsWith('um') || lower.endsWith('ment')) {
    return 't';
  }
  return 'n';          // ← ALLT ANNAT BLIR 'en-ord'. Detta är buggen.
}
```

`SV_ETT_WORDS` är en **handskriven lista på ca 100 ord** (`barn`, `djur`, `träd`, `hus`, `bord` …).
`SV_ETT_SUFFIXES` är ca 35 efterled. **Står ditt ord inte på någon av de listorna kan skriptet inte
veta att det är ett ett-ord** — då blir det `n`.

**Följden, uppmätt:** datan innehåller **1093 `n` mot 170 `t` = 86,5 % en-ord**, medan den verkliga
andelen ligger runt **~75 %**. Det innebär **ungefär 146 felkodade ett-ord**.

## ⚠ Det viktigaste i hela briefen: genus och plural är KOPPLADE

Titta på koden igen. `pluralizeSvSingle` frågar **samma två listor**:

```js
function pluralizeSvSingle(word) {
  const lower = word.toLowerCase();
  // Ett-words are often unchanged in indefinite plural
  if (SV_ETT_WORDS.has(lower)) return word;              // ← samma lista som genus
  if (lower.length > 4) {
    for (const suf of SV_ETT_SUFFIXES) {
      if (lower.endsWith(suf) && lower.length > suf.length) return word;   // ← samma lista
    }
  }
  ...
  return word + 'ar';   // ← standard: lägg på -ar
}
```

**Alltså: ETT saknat listord ger TVÅ fel på samma nyckel.**

- ordet **saknas** felaktigt i ett-listorna → genus `n` **och** plural `+ar`
- ordet **träffas** felaktigt av ett-listorna → genus `t` **och** nollplural

Detta är verifierat i din egen data. `läger` finns inte i listorna (kontrollerat: 0 träffar):

| nyckel | i datan nu | rätt | varför |
|---|---|---|---|
| `camp` | `["Läger","Lägerar","n"]` | `["Läger","Läger","t"]` | **båda fälten fel, EN orsak.** *Ett läger → flera läger.* "Lägerar" är ett påhittat ord. |
| `camel` | `["Kamel","Kameler","n"]` | `["Kamel","Kameler","n"]` | **KONTROLL: helt rätt.** Saknas också i listorna — men *en kamel* ÄR ett en-ord. |

**Kontrollen är själva poängen: felet är specifikt, inte "allt är trasigt".** Döm ord för ord.

Och märk: `camp` är **inte flaggat av något maskinellt nät** (se `nets` nedan). De ~146 felkodade
ett-orden ligger just i den oflaggade `n`-massan. **Flaggorna rangordnar — de avgränsar inte.
Din ord-för-ord-läsning är inte avgränsad av någonting. Det är därför detta uppdrag finns.**

Uppdragsgivaren säger: "This is an educational website. It is absolutely not acceptable." Han har
rätt. Ett barn får inte höra ett felaktigt ord.

## Batchfilerna

Mapp: `C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\batches\`

Per rad i `rows[]`:

| Fält | Betydelse |
|---|---|
| `key` | intern nyckel (engelsk) |
| `themes` | **bildens teman. AVGÖRANDE: de talar om VAD BILDEN VISAR.** `orange` med `[colors,fruits]` är tvetydigt; `salt` med `[at_the_supermarket]` är koksalt (ämnesnamn), inte kemins *salter*. |
| `en` | `[singular, plural]` engelska = glosan, det som är avbildat |
| `cur` | **den nuvarande svenska datan** `{s: singular, p: plural, g: genus}` ← det är detta du bedömer |
| `type` / `countable` | metadata ur en råfil. **ENDAST LEDTRÅD, INTE DOM.** Bevisligen felbar: `bread` står som `countable:false`, medan *ett bröd → flera bröd* är fullkomligt korrekt. |
| `nets` | maskinella misstankeflaggor: N1 plural trots oräknebarhet · N2 ingen plural trots räknebarhet · N3 huvudledsinkonsekvens · N4 avviker från danska+norska · N5 singular och plural är olika lemman · N6 krock med annan nyckel · N7 föräldralös · N8 skriptets standardregel slog till. **En flagga är en misstanke, inte en dom — och ingen flagga är INGEN frisedel** (`camp` har ingen flagga och är fel i två fält). |
| `noImage: true` | det finns ingen bild till nyckeln (död data). Bedöm ändå, men lägst prioritet. |

## Dataformat

`p` är den **nakna pluralformen med versal**, utan artikel och utan bestämdhet: `["Katt","Katter","n"]`.

> ## ⚠⚠ LÄS DETTA TVÅ GÅNGER — koden betyder inte vad den ser ut att betyda
>
> **`n` = e`n`-ord (utrum/reale) — INTE "neutrum".**
> **`t` = e`tt`-ord (neutrum).**
>
> Minnesregel: **n som i *en*, t som i *ett*.** Läser du `n` som "neuter" inverterar du hela ditt
> arbete. Kontrollexempel ur datan, alla korrekta:
> `["Hus","Hus","t"]` (ett hus) · `["Bord","Bord","t"]` (ett bord) · `["Katt","Katter","n"]` (en katt)
> · `["Blomma","Blommor","n"]` (en blomma).

> ⚠ **`n`/`t` är svenska koder och gäller ENDAST svenska.** Andra språk i filen använder andra
> system (`m/f/n`, `d/h`) som betyder något **annat**. Bevis för att en kod aldrig får kopieras
> mellan språk: `lås` är **ett** lås på svenska (`t` = neutrum) men *en* lås/*et* lås beter sig olika
> i danska och norska — och tyskans `n` betyder neutrum, inte utrum. Bedöm uteslutande mot svenskan.

**Konvention: saknar ordet plural sätts `p` lika med `s`.** (Så kodar filen "ingen plural".)
Observera: **detta är också hur ett korrekt ett-ord med nollplural ser ut** (*ett hus → flera hus*).
Skilj på dem — se `NO_PLURAL` nedan.

## För VARJE nyckel bedöms tre fält

1. **`singular`** — är `cur.s` rätt svenskt ord för det bilden visar (`themes` + `en`)? Och är det
   verkligen ett **singular**? (Känt defekt: en pluralform står i singularfältet.)
2. **`plural`** — är `cur.p` korrekt obestämd plural enligt SAOL? Klassiska fallgropar:
   - **de fem deklinationerna** — `-or` (*flicka→flickor*), `-ar` (*stol→stolar*), `-er`
     (*katt→katter*), `-n` (*äpple→äpplen*), **`-∅` nollplural** (*hus→hus*, *barn→barn*).
     Skriptets standard är `-ar`; den är **rätt ofta men långt ifrån alltid**.
   - **omljud**: *hand→händer*, *bok→böcker*, *fot→fötter*, *tand→tänder*, *mus→möss*, *gås→gäss*.
     Skriptet kan inte omljud alls.
   - **`-are` är oförändrat**: *en lärare → flera lärare* (skriptet klarar detta — verifiera ändå).
   - **`-el/-er/-en` tappar vokal**: *nyckel→nycklar*, *cykel→cyklar*, *finger→fingrar*,
     *segel→segel*. Skriptet har en halv regel här — kontrollera noga.
   - **ett-ord på vokal tar `-n` — den mest produktiva defektklassen i denna data.** Skriptet ger
     ett-ord **blank nollplural**, vilket är rätt för konsonantslut men **fel på vokalslut**:

     | i datan nu | dom | varför |
     |---|---|---|
     | `["Ansikte","Ansikte","t"]` | **FIX → Ansikten** | *ett ansikte → flera ansikten* |
     | `["Piano","Piano","t"]` | **FIX → Pianon** | *ett piano → flera pianon* |
     | `["Äpple","Äpplen","t"]` | **OK** | redan rätt — rör inte |
     | `["Öga","Ögon","t"]` | **OK** | oregelbundet, redan rätt |
     | `["Hjärta","Hjärtan","t"]` | **OK** | redan rätt |
     | `["Ankare","Ankare","t"]` | **OK** | `-are`-neutrum ÄR nollplural |
     | `["Hus","Hus","t"]` · `["Bord","Bord","t"]` · `["Träd","Träd","t"]` | **OK** | konsonantslut = nollplural |

   - **påhittade ord** — den grövsta klassen: `"Lägerar"`. Om formen inte finns i SAOL är den påhittad.
3. **`genus`** — är `cur.g` rätt? Se buggen ovan: sannolikheten att ett `n` är felaktigt är
   avsevärd, särskilt för ett-ord som inte råkar stå på skriptets handskrivna lista.
   **Men kontrollera — omfördela inte för att träffa en procentsats.**

**Eftersom fälten är kopplade (se ovan): hittar du ett fel i genus, misstänk plural på samma nyckel
— och tvärtom.**

### Omdömen (per fält)

- **`OK`** — korrekt. **Säg OK när det stämmer.** Även med flagga.
- **`FIX`** — fel, och rättelsen är en ren formrättelse av **samma** ord → ange `correct`.
- **`NO_PLURAL`** — ordet har ingen (barnanpassad) plural: ämnesnamn (*vatten*, *mjölk*, *salt*),
  abstrakta, egennamn (*Jupiter*), adjektiv/färger (*Röd*), substantiverade verb (*simmandet*).
  → `p` sätts lika med `s`.
  ⚠ **Blanda inte ihop detta med nollplural.** *Ett hus → flera hus* har en plural; den råkar bara
  se likadan ut. Det är `OK`, inte `NO_PLURAL`.
- **`PLURALIA_TANTUM`** — bara plural (*glasögon*, *byxor*, *sopor*). Får även stå på `singular`:
  det betyder "detta ord saknar singular, pluralformen i fältet är korrekt".
- **`HOLD`** — **rättelsen gör MER än att ändra formen**: ett annat lemma, en inre motsägelse, eller
  en innehållsfråga om bilden. → `HOLD` med tydligt skäl. **Skriv aldrig om i blindo.**

## Kalibrering — båda feltyperna är dyra

- **Falskt negativt:** låta `"Lägerar"` stå. SAOL: *ett läger → flera läger*. Det är FIX.
- **Falskt positivt:** anmäla `"Kameler"` som fel. *En kamel → flera kameler* är KORREKT → OK.

**Döm ord för ord, inte på mönster.** En tysk granskare vägrade med rätta tillämpa regeln
`-saurus → -saurier` på `carnotaurus` (latinets *taurus* = tjur). Var lika diskriminerande: en klass
är ett hjälpmedel, inte en automat.

## Homonymer — här ÄR genus betydelsen

Den tyska omgången hittade `pine-tree` = `["Kiefer","Kiefer","m"]`: *die Kiefer* är tallen, *der
Kiefer* är **käkbenet** — datan innehöll käkbenet. Svenskan har samma fälla. Kontrollera för varje
tvetydigt ord vilken betydelse **bilden** visar:
*en vak* (hål i isen) vs *ett vak* · *en lag* (grupp) vs *ett lag* · *en val* (djuret/valet) vs
*ett val* · *en fjäder* (på fågeln) vs *en fjäder* (i mekanik) · *ett parti* vs *en parti*.
Känner du till distinktionen — rapportera den i `reason` även när du svarar `OK`.

## Utdata

Skriv **en** fil till
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\verdicts\sv-<NN>.json`
(skapa mappen vid behov), med **en rad per nyckel — ALLA nycklar i batchen, ingen får saknas**:

```json
{ "locale":"sv", "batch":"<NN>", "reviewed": <N>,
  "rows": [
    { "key":"camp",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"FIX","correct":"Läger","reason":"SAOL: ett läger -> flera läger (zero plural, 4th declension neuter); 'Lägerar' is not a Swedish word","source":"SAOL"},
      "gender":{"verdict":"FIX","correct":"t","reason":"ett läger — neuter; 'läger' is simply absent from the script's hand-written SV_ETT_WORDS list","source":"SAOL"} },
    { "key":"camel",
      "singular":{"verdict":"OK"},
      "plural":{"verdict":"OK"},
      "gender":{"verdict":"OK"} }
  ] }
```

`correct` **endast** vid `FIX`. `reason` vid allt utom `OK`. `source` där det inte är trivialt.
För `gender` är `correct` exakt `"n"` eller `"t"`.

## Regler

- **Bedöm alla nycklar i batchen** — inget urval, ingen stickprovskontroll.
- Vid tvetydighet avgör `themes` + `en` vilken betydelse som avses.
- **Hitta inte på SAOL-citat.** Osäker → `HOLD` med skäl. Osäkerhet är ett legitimt och värdefullt
  resultat. **Gissa aldrig.**
- Ändra **INGEN** annan fil. Endast den enda omdömesfilen.
- Svara till sist ENDAST med: antal kontrollerade, räkningen per omdöme per fält
  (t.ex. `plural: 78 OK / 21 FIX / 9 NO_PLURAL / 2 HOLD`), samt de 5 allvarligaste fynden på en rad var.
