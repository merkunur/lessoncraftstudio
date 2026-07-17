# Andra kontrollen (motkontroll) — svenskt bildordförråd

> **Detta är den bindande texten.** Omtolka den inte efter eget huvud.
> **Om denna brief och SAOL säger emot varandra gäller SAOL.** Säg då uttryckligen emot briefen och
> skriv det i `note`. Det är önskvärt och det har redan skett med rätta två gånger: i den tyska
> omgången kallade briefen `Kugel→Kugeln` felaktigt för ett defekt (fem granskare sa emot — de hade
> rätt), och i den första nederländska omgången kallade briefen `Padden` och `Onweren` för
> "skriptartefakter", medan *de pad → padden* är korrekt (defekten sitter i `trail`, inte i `toad`).
> **Uppdragsgivaren har bevisligen fel ibland. Kontrollera honom.**

## Din roll

Du är en **andra, oberoende** modersmålsinstans (svenska, rikssvenska; auktoritet: **SAOL**,
kompletterande **SO**). En första omgång har granskat 1 263 ord och föreslagit korrigeringar.
**Din uppgift är INTE att hålla med.**

Din uppgift är att **försöka vederlägga varje föreslagen ändring.**
En korrigering som klarar din prövning är pålitlig. En som stupar har räddat oss från ett fel på en
pedagogisk sajt för 3–7-åringar. **Bådadera är vinst.**

Varför denna omgång finns (doktrin §A.13.58): **utdatan från en granskningsinstans är en utgångspunkt,
inte en sanning.** I den tyska omgången stupade två korrigeringar som annars hade skeppats: `lego`
(Duden känner *das Lego, Plural: die Legos* — "korrigeringen" hade raderat en belagd form) och
`lettuce` (Duden markerar just den avbildade betydelsen "ohne Plural"). Sju andra visade sig vara
dubbletter av en befintlig systernyckel. **Leta efter precis det.**

## Dina filer

- **Förslagen:** `docs\audit-results\vocab-audit\corrections-sv.json`
  `corrections.<fält>.<key> = { to, from, why, src, cls }`
- **Konflikterna:** `docs\audit-results\vocab-audit\conflicts-sv.json` — **läs den.** Den innehåller
  `conflicts`: förslag som **omkullkastar ett tidigare modersmålsbeslut som redan är skeppat**
  (commit `c8c16d11` / `3314cb5c` / `cedb564e` — 34 genusbeslut). De förtjänar din strängaste
  prövning (se nedan).
- **De tillbakahållna fallen:** `held-sv.json`
- **Kontexten per ord** (teman, engelsk glosa, nuvarande stånd): `batches\sv-*.json` — där står
  `themes`: **vad bilden visar**. Utan det fältet går t.ex. `salt` inte att avgöra.
- **Första omgångens uppdrag:** `BRIEF-sv.md` (så att du känner deras måttstock).

## Kontext

Orden **projiceras på tavlan OCH läses upp högt** för barn 3–7 år, tillsammans med en bild.
`p` = **naken plural med versal**.

> ⚠ Genus: **`n` = e`n`-ord (utrum) · `t` = e`tt`-ord (neutrum)** — svenska koder, aldrig övertagna
> från ett annat språk. **`n` betyder INTE "neuter".** Läser du det så inverterar du hela ditt arbete.

**Konvention: ingen plural → `p` sätts lika med `s`.** Observera att ett korrekt ett-ord med
**nollplural** (*ett hus → flera hus*) ser exakt likadant ut. De är inte samma sak.

**Den strukturella särdragen i svenska (läs `BRIEF-sv.md` § "genus och plural är KOPPLADE"):** samma
handskrivna listor (`SV_ETT_WORDS` / `SV_ETT_SUFFIXES`) styr **både** genus och plural i skriptet.
Ett saknat listord ger därför **två** fel på samma nyckel (`camp` = `["Läger","Lägerar","n"]`, rätt
är `["Läger","Läger","t"]`). **Följd för dig: när första omgången rättar det ena fältet men inte det
andra på en sådan nyckel — är det ett förbiseende? Kontrollera systematiskt.**

## Per förslag ett omdöme

- **`CONFIRM`** — korrigeringen stämmer. Ange SAOL-grunden i `note`.
- **`REJECT`** — korrigeringen är **fel**; det nuvarande värdet (`from`) var rätt eller bättre.
  → `note` med skäl. **Detta är omgångens värdefullaste fynd.**
- **`AMEND`** — något måste ändras, men `to` är inte rätt form. → ange `better` + `note`.
- **`ESCALATE`** — förslaget gör **mer** än en formrättelse (lemmabyte, bildfråga, dubblett med en
  befintlig systernyckel) och bör hållas tillbaka i stället för tillämpas. → `note`.

Pröva uttryckligen på:
1. **Existerar `to` överhuvudtaget som svensk form?** Maskinen hittade på *Lägerar*. En korrigering
   får inte upprepa det. Finns formen inte i SAOL är den påhittad.
2. **Passar det bilden?** (`themes` + `en`.)
3. **Rikssvenska**, inte finlandssvenskt/ålderdomligt alternativ?
4. **Är en klassregel blint överförd?** Två granskare vägrade med rätta importera den tyska regeln
   `-saurus → -saurier` (svenskan bildar *-saurier* men inte alltid). Var lika diskriminerande.
5. **Har en korrekt plural "reparerats"?** N8-flaggan pekar ut just de nycklar där skriptet gav
   nollplural — och där är sanningen **delad, åt båda hållen**. Uppmätt i denna data:
   - **konsonantslut → nollplural är RÄTT**: *ett hus → flera hus*, *ett barn → barn*, *ett träd →
     träd*, *ett bord → bord*, *ett djur → djur*. Även `-are`-neutrum: *ett ankare → flera ankare*.
     En "fix" till *Husar* / *Barnar* / *Trädar* / *Ankaren* vore en katastrofal försämring → `REJECT`.
   - **vokalslut → `-n`, och där har skriptet FEL**: `["Ansikte","Ansikte","t"]` och
     `["Piano","Piano","t"]` är **levande defekter** (*ansikten*, *pianon*) → en `FIX` där är riktig.
   - **redan rätt, rör inte**: `Äpple→Äpplen`, `Öga→Ögon`, `Hjärta→Hjärtan`.

   **Så: döm inte N8 som klass åt något håll.** Fråga efter sista ljudet i ordet, inte efter flaggan.
6. **Vid `NO_PLURAL`:** saknar ordet verkligen plural för barn? (*ett bröd → flera bröd* vore ett
   felaktigt omdöme — det har plural, den är bara noll.) **Skilj `NO_PLURAL` från nollplural.**
7. **Dubbletter:** skulle `to` göra raden identisk med en **befintlig systernyckel**? Då `ESCALATE`.

## `conflicts`-fallen — din tyngsta prövning

`conflicts-sv.json → conflicts` innehåller förslag som **omkullkastar ett skeppat, modersmålsbekräftat
genusbeslut** från de tre tidigare svenska omgångarna (`c8c16d11` 22 nycklar · `3314cb5c` 11 nycklar
· `cedb564e` 1 nyckel).

**Bedöm dessa själv, från grunden.** Två modersmålstalare är oense; du är den tredje rösten, inte
skiljedomare-på-auktoritet. Antingen har den nya granskaren rätt (**ett verkligt fynd, värt mer än
hundra bekräftelser**) eller fel (**då ska du döda förslaget**). Ger du första omgången rätt:
`CONFIRM` med uttrycklig SAOL-grund. Tvekar du: `ESCALATE` — då beslutar uppdragsgivaren, inte vi.

⚠ **En gissad form med tom `src` är ett varningstecken.** I den tyska omgången eskalerades `hot`
m→n just därför: "n" var lika påhittat som "m", det var den enda korrigeringen utan källa, och
21 identiska adjektiv bar samma standardvärde orört — att rätta 1 av 22 gör datan *mindre*
konsekvent. Leta efter det mönstret.

## Utdata

Skriv **en** fil till
`C:\Users\rkgen\lessoncraftstudio\docs\audit-results\vocab-audit\reverify\sv-<DEL>.json`

```json
{ "locale":"sv", "part":"<DEL>", "reviewed": <N>,
  "rows": [
    { "key":"camp", "field":"plural", "verdict":"CONFIRM",
      "note":"SAOL: ett läger -> flera läger (nollplural); 'Lägerar' finns inte" },
    { "key":"x", "field":"plural", "verdict":"REJECT",
      "note":"nuvarande form var korrekt; ändringen vore en försämring" },
    { "key":"y", "field":"gender", "verdict":"AMEND", "better":"t", "note":"..." }
  ] }
```

## Regler

- **Varje** förslag i din del ska bedömas — inget stickprov.
- **Hitta inte på SAOL-citat.** Osäker → `ESCALATE` med skäl. **Gissa aldrig.**
- Ändra **INGEN** annan fil.
- Svara till sist ENDAST med: antal kontrollerade, räkning per omdöme
  (`CONFIRM / REJECT / AMEND / ESCALATE`), och **varje REJECT/AMEND/ESCALATE på en rad var** — det är
  de fynd det handlar om.
