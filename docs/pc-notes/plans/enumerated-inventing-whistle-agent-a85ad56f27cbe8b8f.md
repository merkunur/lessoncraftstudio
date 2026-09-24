# Plan: finish word-floor fix for .landing-var2a-sv.json (PASS A, sv)

## State
File: `C:\Users\rkgen\lessoncraftstudio\scripts\worksheet-gen\i18n\.landing-var2a-sv.json` (written; 23 landings).
Coordinator flagged 12 entries under the ≥205-word body floor. **Already fixed (5): K-248 (226), K-262 (217), K-263 (213), K-264 (216)** — plus K-262 got both p2+p3 extensions. **Remaining short (8, my whitespace-split counts):** K-240@vehicles 199 · K-240@toys 198 · K-267 197 · K-268 192 · K-270 195 · K-271 188 · K-242@animals 192 · K-242@fruits 196.

## Remaining edits (append the sentence to the end of the named paragraph, inside the closing quote; natural Swedish, no filler; titles untouched)

1. **K-240@vehicles · p3** — after `…en berättarstund direkt ur arbetsbladet.` — WAIT: that sentence is the one to ADD. Current p3 ends: `…där varje bild kräver ett tydligt antingen–eller-val."` → append: ` Och den som vill fortsätta prata fordon kan låta varje inklistrad bild få en egen mening högt – en liten berättarstund direkt ur arbetsbladet.` (→ ~223)
2. **K-240@toys · p2** — ends `…Tänkandet och finmotoriken tränas i samma stund.` → append: ` Fråga gärna efteråt hur barnet tänkte när grupperna valdes – svaret brukar avslöja mer om tankearbetet än själva det färdiga bladet.` (→ ~219)
3. **K-267 · p2** — ends `…gör gärna många fler minusuppgifter än på ett vanligt räkneblad.` → append: ` Den som vill kan låta barnet skriva differensen med blyerts i fältets kant innan färgen läggs på – då blir den egna kontrollen ännu tydligare.` (→ ~221)
4. **K-268 · p2** — ends `…fel svar ger fel färg, och det syns.` → append: ` Ett bra knep är att låta barnet ringa in alla minustecken innan räknandet börjar – då är den vanligaste fällan redan avväpnad innan pennan byts mot färgpennorna.` (→ ~219)
5. **K-270 · p3** — ends `…bland annat med djur och frukter.` → append: ` Spara gärna bladet och låt barnet rita om vägen med en ny färg en annan dag – samma glädje en gång till, och dubbel träning på köpet.` (→ ~221)
6. **K-271 · p2** — ends `…fast förklätt till lek.` → append: ` Och till skillnad från många andra uppgifter känns ett misslyckat vägval här aldrig som ett fel – det är en del av spelet, och nästa försök ligger bara en pennrörelse bort.` (→ ~218)
7. **K-242@animals · p3** — ends `…och till sist jättelabyrinten för de riktigt uthålliga.` → append: ` Plasta gärna in ett exemplar och låt barnen rita vägen med whiteboardpenna – då räcker samma labyrint många gånger om i stationsarbetet.` (→ ~213)
8. **K-242@fruits · p2** — ends `…och märker det snabbt själva.` → append: ` Ett enkelt sätt att öva in strategin är att låta barnet peka vägen med fingret först och först därefter plocka upp pennan och rita.` (→ ~220)

## Verify
Re-run the word counter (`python`, split on whitespace, p1+p2+p3) → all 23 entries ≥205 (the 8 land ~213–223, margin against the coordinator's stricter tokenizer). JSON re-parses clean. Then reply to coordinator with `id: wordcount` for the 12 flagged ids.
