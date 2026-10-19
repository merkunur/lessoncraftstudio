/* =====================================================================
   sorting-chutes-activity.js — ACTIVITY #35 of the one-by-one rebuild:
   "Sort and Count" (K.MD.B.3) — THE SORTING CHUTES.
   Design sheet: docs/activities-rebuild/designs/035-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: the mixed pile rides a belt ONE thing at a time and waits;
   the child drops it down the chute of its kind (a wrong chute bounces it
   back), so nothing is skipped or counted twice. Each thing takes one equal
   slot in a glass tube, so the tubes ARE a picture graph: how many, which
   most / fewest, the order from most to fewest, how many more — and in
   the 2 × 2, by kind AND by "does it fly".

   ACTIVITY LAYER ONLY: the model is sorting-chutes-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity when the
   round is complete). Test seams: window.SortingChutesActivity.st /
   ._order / ._pool / .FAST. Tube contents and funnel labels are DATA MARKS
   (data-mark, ≥ 40 px at 704 / ≥ 30 px at 360 — RULINGS); the thing the
   child judges waits on the belt at full size.
   ===================================================================== */
'use strict';

var SortingChutesActivity = {
  id: 'sorting-chutes',
  apparatusClasses: ['sc-'],

  strings: {
    title:                {en:'The Sorting Chutes',de:'Die Sortier-Trichter',fr:'Les entonnoirs de tri',es:'Los embudos para clasificar',pt:'Os funis de separar',it:'Gli imbuti per smistare',nl:'De sorteertrechters',sv:'Sorteringstrattarna',da:'Sorteringstragtene',no:'Sorteringstraktene',fi:'Lajittelusuppilot'},
    instruction:          {en:'Drop each picture down the right chute, then answer the question about the tubes.',de:'Wirf jedes Bild in den richtigen Trichter und beantworte dann die Frage zu den Röhren.',fr:'Mets chaque image dans le bon entonnoir, puis réponds à la question sur les tubes.',es:'Echa cada imagen en el embudo correcto y luego contesta la pregunta sobre los tubos.',pt:'Coloque cada figura no funil certo e depois responda à pergunta sobre os tubos.',it:'Metti ogni immagine nell’imbuto giusto, poi rispondi alla domanda sui tubi.',nl:'Gooi elk plaatje in de goede trechter en beantwoord dan de vraag over de buizen.',sv:'Släpp varje bild i rätt tratt och svara sedan på frågan om rören.',da:'Smid hvert billede i den rigtige tragt, og svar så på spørgsmålet om rørene.',no:'Slipp hvert bilde i riktig trakt, og svar så på spørsmålet om rørene.',fi:'Pudota jokainen kuva oikeaan suppiloon ja vastaa sitten kysymykseen putkista.'},
    pSort:                {en:'Drop each one down the right chute.',de:'Wirf jedes Bild in den richtigen Trichter.',fr:'Mets chaque image dans le bon entonnoir.',es:'Echa cada imagen en el embudo correcto.',pt:'Coloque cada figura no funil certo.',it:'Metti ogni immagine nell’imbuto giusto.',nl:'Gooi elk plaatje in de goede trechter.',sv:'Släpp varje bild i rätt tratt.',da:'Smid hvert billede i den rigtige tragt.',no:'Slipp hvert bilde i riktig trakt.',fi:'Pudota jokainen kuva oikeaan suppiloon.'},
    pSortFly:             {en:'Drop each one into the right tube: does it fly?',de:'Wirf jedes Bild in die richtige Röhre: Fliegt es?',fr:'Mets chaque image dans le bon tube : est-ce que ça vole ?',es:'Echa cada imagen en el tubo correcto: ¿vuela?',pt:'Coloque cada figura no tubo certo: isso voa?',it:'Metti ogni immagine nel tubo giusto: vola?',nl:'Gooi elk plaatje in de goede buis: vliegt het?',sv:'Släpp varje bild i rätt rör: flyger det?',da:'Smid hvert billede i det rigtige rør: flyver det?',no:'Slipp hvert bilde i riktig rør: flyr det?',fi:'Pudota jokainen kuva oikeaan putkeen: lentääkö se?'},
    pCountAnimals:        {en:'How many animals?',de:'Wie viele Tiere?',fr:'Combien d’animaux ?',es:'¿Cuántos animales?',pt:'Quantos animais?',it:'Quanti animali?',nl:'Hoeveel dieren?',sv:'Hur många djur?',da:'Hvor mange dyr?',no:'Hvor mange dyr?',fi:'Kuinka monta eläintä?'},
    pCountFruits:         {en:'How many fruits?',de:'Wie viele Früchte?',fr:'Combien de fruits ?',es:'¿Cuántas frutas?',pt:'Quantas frutas?',it:'Quanti frutti?',nl:'Hoeveel vruchten?',sv:'Hur många frukter?',da:'Hvor mange frugter?',no:'Hvor mange frukter?',fi:'Kuinka monta hedelmää?'},
    pCountVehicles:       {en:'How many vehicles?',de:'Wie viele Fahrzeuge?',fr:'Combien de véhicules ?',es:'¿Cuántos vehículos?',pt:'Quantos veículos?',it:'Quanti veicoli?',nl:'Hoeveel voertuigen?',sv:'Hur många fordon?',da:'Hvor mange køretøjer?',no:'Hvor mange kjøretøy?',fi:'Kuinka monta kulkuneuvoa?'},
    pMost:                {en:'Which group has the most?',de:'Wovon gibt es am meisten?',fr:'De quoi y en a-t-il le plus ?',es:'¿De qué hay más?',pt:'Qual grupo tem mais?',it:'Di quale gruppo ce ne sono di più?',nl:'Van welke groep zijn er de meeste?',sv:'Vilken grupp har flest?',da:'Hvilken gruppe har flest?',no:'Hvilken gruppe har flest?',fi:'Missä ryhmässä on eniten?'},
    pMostTwo:             {en:'Which group has more?',de:'Wovon gibt es mehr?',fr:'De quoi y en a-t-il le plus ?',es:'¿De qué hay más?',pt:'Qual grupo tem mais?',it:'Di quale gruppo ce ne sono di più?',nl:'Van welke groep zijn er meer?',sv:'Vilken grupp har flest?',da:'Hvilken gruppe har flest?',no:'Hvilken gruppe har flest?',fi:'Kummassa ryhmässä on enemmän?'},
    pFewestTwo:           {en:'Which group has fewer?',de:'Wovon gibt es weniger?',fr:'De quoi y en a-t-il le moins ?',es:'¿De qué hay menos?',pt:'Qual grupo tem menos?',it:'Di quale gruppo ce ne sono di meno?',nl:'Van welke groep zijn er minder?',sv:'Vilken grupp har färst?',da:'Hvilken gruppe har færrest?',no:'Hvilken gruppe har færrest?',fi:'Kummassa ryhmässä on vähemmän?'},
    pFewest:              {en:'Which group has the fewest?',de:'Wovon gibt es am wenigsten?',fr:'De quoi y en a-t-il le moins ?',es:'¿De qué hay menos?',pt:'Qual grupo tem menos?',it:'Di quale gruppo ce ne sono di meno?',nl:'Van welke groep zijn er de minste?',sv:'Vilken grupp har färst?',da:'Hvilken gruppe har færrest?',no:'Hvilken gruppe har færrest?',fi:'Missä ryhmässä on vähiten?'},
    pOrder:               {en:'Put the tubes in order — most first.',de:'Ordne die Röhren – die mit den meisten zuerst.',fr:'Range les tubes : celui qui en a le plus en premier.',es:'Ordena los tubos: primero el que tiene más.',pt:'Coloque os tubos em ordem: primeiro o que tem mais.',it:'Metti in ordine i tubi: prima quello che ne ha di più.',nl:'Zet de buizen op volgorde – de volste eerst.',sv:'Ställ rören i ordning – det med flest först.',da:'Stil rørene i rækkefølge – det med flest først.',no:'Sett rørene i rekkefølge – det med flest først.',fi:'Järjestä putket – ensin se, jossa on eniten.'},
    pMoreVehiclesAnimals: {en:'How many more vehicles than animals?',de:'Wie viele Fahrzeuge sind es mehr als Tiere?',fr:'Combien de véhicules de plus que d’animaux ?',es:'¿Cuántos vehículos más que animales hay?',pt:'Quantos veículos a mais do que animais?',it:'Quanti veicoli ci sono in più rispetto agli animali?',nl:'Hoeveel voertuigen zijn er meer dan dieren?',sv:'Hur många fler fordon än djur?',da:'Hvor mange flere køretøjer end dyr?',no:'Hvor mange flere kjøretøy enn dyr?',fi:'Kuinka monta kulkuneuvoa on enemmän kuin eläimiä?'},
    pMoreAnimalsFruits:   {en:'How many more animals than fruits?',de:'Wie viele Tiere sind es mehr als Früchte?',fr:'Combien d’animaux de plus que de fruits ?',es:'¿Cuántos animales más que frutas hay?',pt:'Quantos animais a mais do que frutas?',it:'Quanti animali ci sono in più rispetto ai frutti?',nl:'Hoeveel dieren zijn er meer dan vruchten?',sv:'Hur många fler djur än frukter?',da:'Hvor mange flere dyr end frugter?',no:'Hvor mange flere dyr enn frukter?',fi:'Kuinka monta eläintä on enemmän kuin hedelmiä?'},
    pCellAnimalsFly:      {en:'How many animals fly?',de:'Wie viele Tiere fliegen?',fr:'Combien d’animaux volent ?',es:'¿Cuántos animales vuelan?',pt:'Quantos animais voam?',it:'Quanti animali volano?',nl:'Hoeveel dieren vliegen?',sv:'Hur många djur flyger?',da:'Hvor mange dyr flyver?',no:'Hvor mange dyr flyr?',fi:'Kuinka monta eläintä lentää?'},
    pCellVehiclesGround:  {en:'How many vehicles do not fly?',de:'Wie viele Fahrzeuge fliegen nicht?',fr:'Combien de véhicules ne volent pas ?',es:'¿Cuántos vehículos no vuelan?',pt:'Quantos veículos não voam?',it:'Quanti veicoli non volano?',nl:'Hoeveel voertuigen vliegen niet?',sv:'Hur många fordon flyger inte?',da:'Hvor mange køretøjer flyver ikke?',no:'Hvor mange kjøretøy flyr ikke?',fi:'Kuinka monta kulkuneuvoa ei lennä?'},
    pFly:                 {en:'How many things fly?',de:'Wie viele Dinge fliegen?',fr:'Combien de choses volent ?',es:'¿Cuántas cosas vuelan?',pt:'Quantas coisas voam?',it:'Quante cose volano?',nl:'Hoeveel dingen vliegen?',sv:'Hur många saker flyger?',da:'Hvor mange ting flyver?',no:'Hvor mange ting flyr?',fi:'Kuinka moni asia lentää?'},
    pAllAnimals:          {en:'How many animals are there in all?',de:'Wie viele Tiere sind es insgesamt?',fr:'Combien d’animaux y a-t-il en tout ?',es:'¿Cuántos animales hay en total?',pt:'Quantos animais há ao todo?',it:'Quanti animali ci sono in tutto?',nl:'Hoeveel dieren zijn er in totaal?',sv:'Hur många djur är det sammanlagt?',da:'Hvor mange dyr er der i alt?',no:'Hvor mange dyr er det til sammen?',fi:'Kuinka monta eläintä on yhteensä?'},
    pMostCell:            {en:'Which tube has the most?',de:'In welcher Röhre sind die meisten?',fr:'Quel tube en contient le plus ?',es:'¿Qué tubo tiene más?',pt:'Qual tubo tem mais?',it:'Quale tubo ne ha di più?',nl:'In welke buis zitten de meeste?',sv:'Vilket rör har flest?',da:'Hvilket rør har flest?',no:'Hvilket rør har flest?',fi:'Missä putkessa on eniten?'},
    tapNumber:            {en:'Tap the number.',de:'Tippe auf die Zahl.',fr:'Touche le nombre.',es:'Toca el número.',pt:'Toque no número.',it:'Tocca il numero.',nl:'Tik op het getal.',sv:'Tryck på talet.',da:'Tryk på tallet.',no:'Trykk på tallet.',fi:'Napauta lukua.'},
    tapTube:              {en:'Tap a tube.',de:'Tippe auf eine Röhre.',fr:'Touche un tube.',es:'Toca un tubo.',pt:'Toque em um tubo.',it:'Tocca un tubo.',nl:'Tik op een buis.',sv:'Tryck på ett rör.',da:'Tryk på et rør.',no:'Trykk på et rør.',fi:'Napauta putkea.'},
    dragOrder:            {en:'Drag the tubes into order.',de:'Zieh die Röhren in die richtige Reihenfolge.',fr:'Fais glisser les tubes dans l’ordre.',es:'Arrastra los tubos para ordenarlos.',pt:'Arraste os tubos para colocá-los em ordem.',it:'Trascina i tubi per metterli in ordine.',nl:'Sleep de buizen op volgorde.',sv:'Dra rören i rätt ordning.',da:'Træk rørene i rækkefølge.',no:'Dra rørene i riktig rekkefølge.',fi:'Vedä putket järjestykseen.'},
    hintCountUp:          {en:'Count them from the bottom of the tube.',de:'Zähl sie in der Röhre von unten nach oben.',fr:'Compte-les depuis le bas du tube.',es:'Cuéntalos desde abajo del tubo.',pt:'Conte a partir do fundo do tubo.',it:'Contali dal fondo del tubo.',nl:'Tel ze vanaf de onderkant van de buis.',sv:'Räkna dem nerifrån i röret.',da:'Tæl dem fra bunden af røret.',no:'Tell dem fra bunnen av røret.',fi:'Laske ne putken pohjalta alkaen.'},
    hintCountBoth:        {en:'Count both lit tubes, from the bottom up.',de:'Zähl in beiden leuchtenden Röhren von unten nach oben.',fr:'Compte dans les deux tubes allumés, depuis le bas.',es:'Cuenta en los dos tubos iluminados, desde abajo.',pt:'Conte nos dois tubos acesos, a partir do fundo.',it:'Conta nei due tubi illuminati, partendo dal fondo.',nl:'Tel in beide verlichte buizen, van onder naar boven.',sv:'Räkna i båda de upplysta rören, nerifrån och upp.',da:'Tæl i begge de oplyste rør, nedefra og op.',no:'Tell i begge de opplyste rørene, nedenfra og opp.',fi:'Laske molemmissa valaistuissa putkissa alhaalta ylös.'},
    hintReadTopTwo:       {en:'Read the top number of each lit tube, then put them together.',de:'Lies in jeder leuchtenden Röhre die oberste Zahl ab und zähl sie zusammen.',fr:'Lis le nombre du haut de chaque tube allumé, puis mets-les ensemble.',es:'Lee el número de hasta arriba de cada tubo iluminado y luego júntalos.',pt:'Leia o número de cima de cada tubo aceso e depois junte os dois.',it:'Leggi il numero in cima a ogni tubo illuminato, poi mettili insieme.',nl:'Lees het bovenste getal van elke verlichte buis en tel ze bij elkaar.',sv:'Läs det översta talet i varje upplyst rör och lägg ihop dem.',da:'Læs det øverste tal i hvert oplyst rør, og læg dem sammen.',no:'Les det øverste tallet i hvert opplyst rør, og legg dem sammen.',fi:'Lue kummankin valaistun putken ylin luku ja laske ne yhteen.'},
    hintReadTop:          {en:'Read the number at the top.',de:'Lies die Zahl ganz oben ab.',fr:'Lis le nombre tout en haut.',es:'Lee el número de hasta arriba.',pt:'Leia o número lá em cima.',it:'Leggi il numero in cima.',nl:'Lees het getal bovenaan.',sv:'Läs talet högst upp.',da:'Læs tallet øverst.',no:'Les tallet øverst.',fi:'Lue ylin luku.'},
    hintHeight:           {en:'Look at how high each tube is filled.',de:'Schau, wie hoch jede Röhre gefüllt ist.',fr:'Regarde jusqu’où chaque tube est rempli.',es:'Mira qué tan lleno está cada tubo.',pt:'Veja até onde cada tubo está cheio.',it:'Guarda fin dove è pieno ogni tubo.',nl:'Kijk hoe hoog elke buis gevuld is.',sv:'Titta hur högt varje rör är fyllt.',da:'Se, hvor højt hvert rør er fyldt.',no:'Se hvor høyt hvert rør er fylt.',fi:'Katso, kuinka korkealle kukin putki on täytetty.'},
    hintWrongWay:         {en:'These two are the wrong way round.',de:'Diese zwei sind vertauscht.',fr:'Ces deux-là sont dans le mauvais ordre.',es:'Estos dos están al revés.',pt:'Esses dois estão trocados.',it:'Questi due sono al contrario.',nl:'Deze twee staan verkeerd om.',sv:'De här två står i fel ordning.',da:'De her to står i forkert rækkefølge.',no:'Disse to står i feil rekkefølge.',fi:'Nämä kaksi ovat väärin päin.'},
    hintPairUp:           {en:'Pair them up. How many have no partner?',de:'Bilde Paare. Wie viele haben keinen Partner?',fr:'Fais des paires. Combien restent tout seuls ?',es:'Forma parejas. ¿Cuántos se quedan sin pareja?',pt:'Forme pares. Quantos ficam sem par?',it:'Forma le coppie. Quanti restano senza compagno?',nl:'Maak paartjes. Hoeveel hebben er geen maatje?',sv:'Gör par. Hur många blir utan par?',da:'Lav par. Hvor mange har ingen makker?',no:'Lag par. Hvor mange er uten makker?',fi:'Tee pareja. Kuinka moni jää ilman paria?'},
    hintBounce:           {en:'Not this one — look at the little pictures on each chute.',de:'Nicht hier – schau auf die kleinen Bilder an jedem Trichter.',fr:'Pas celui-ci : regarde les petites images sur chaque entonnoir.',es:'Aquí no: mira los dibujitos de cada embudo.',pt:'Aqui não: veja as figurinhas de cada funil.',it:'Non qui: guarda le figurine su ogni imbuto.',nl:'Niet hier – kijk naar de plaatjes bij elke trechter.',sv:'Inte här – titta på de små bilderna vid varje tratt.',da:'Ikke her – se på de små billeder ved hver tragt.',no:'Ikke her – se på de små bildene ved hver trakt.',fi:'Ei tähän – katso pieniä kuvia kunkin suppilon kohdalla.'},
    hintBounceFly:        {en:'Not this tube — does it fly?',de:'Nicht diese Röhre – fliegt es?',fr:'Pas ce tube : est-ce que ça vole ?',es:'Este tubo no: ¿vuela?',pt:'Esse tubo não: isso voa?',it:'Non questo tubo: vola?',nl:'Niet deze buis – vliegt het?',sv:'Inte det här röret – flyger det?',da:'Ikke det rør – flyver det?',no:'Ikke det røret – flyr det?',fi:'Ei tähän putkeen – lentääkö se?'},
    okCountAnimals:       {en:'Yes — {n} animals!',de:'Ja – {n} Tiere!',fr:'Oui, {n} animaux !',es:'¡Sí! {n} animales.',pt:'Isso! {n} animais!',it:'Sì! {n} animali!',nl:'Ja! {n} dieren!',sv:'Ja – {n} djur!',da:'Ja – {n} dyr!',no:'Ja – {n} dyr!',fi:'Kyllä – {n} eläintä!'},
    okCountFruits:        {en:'Yes — {n} fruits!',de:'Ja – {n} Früchte!',fr:'Oui, {n} fruits !',es:'¡Sí! {n} frutas.',pt:'Isso! {n} frutas!',it:'Sì! {n} frutti!',nl:'Ja! {n} vruchten!',sv:'Ja – {n} frukter!',da:'Ja – {n} frugter!',no:'Ja – {n} frukter!',fi:'Kyllä – {n} hedelmää!'},
    okCountVehicles:      {en:'Yes — {n} vehicles!',de:'Ja – {n} Fahrzeuge!',fr:'Oui, {n} véhicules !',es:'¡Sí! {n} vehículos.',pt:'Isso! {n} veículos!',it:'Sì! {n} veicoli!',nl:'Ja! {n} voertuigen!',sv:'Ja – {n} fordon!',da:'Ja – {n} køretøjer!',no:'Ja – {n} kjøretøy!',fi:'Kyllä – {n} kulkuneuvoa!'},
    okMostAnimals:        {en:'Yes — there are the most animals!',de:'Ja – von den Tieren gibt es am meisten!',fr:'Oui, ce sont les animaux les plus nombreux !',es:'¡Sí! Los animales son los que más hay.',pt:'Isso! Os animais são os que aparecem mais!',it:'Sì! Gli animali sono i più numerosi!',nl:'Ja! Er zijn de meeste dieren!',sv:'Ja – det finns flest djur!',da:'Ja – der er flest dyr!',no:'Ja – det er flest dyr!',fi:'Kyllä – eläimiä on eniten!'},
    okMostFruits:         {en:'Yes — there are the most fruits!',de:'Ja – von den Früchten gibt es am meisten!',fr:'Oui, ce sont les fruits les plus nombreux !',es:'¡Sí! Las frutas son las que más hay.',pt:'Isso! As frutas são as que aparecem mais!',it:'Sì! I frutti sono i più numerosi!',nl:'Ja! Er zijn de meeste vruchten!',sv:'Ja – det finns flest frukter!',da:'Ja – der er flest frugter!',no:'Ja – det er flest frukter!',fi:'Kyllä – hedelmiä on eniten!'},
    okMostVehicles:       {en:'Yes — there are the most vehicles!',de:'Ja – von den Fahrzeugen gibt es am meisten!',fr:'Oui, ce sont les véhicules les plus nombreux !',es:'¡Sí! Los vehículos son los que más hay.',pt:'Isso! Os veículos são os que aparecem mais!',it:'Sì! I veicoli sono i più numerosi!',nl:'Ja! Er zijn de meeste voertuigen!',sv:'Ja – det finns flest fordon!',da:'Ja – der er flest køretøjer!',no:'Ja – det er flest kjøretøy!',fi:'Kyllä – kulkuneuvoja on eniten!'},
    okMostTwoAnimals:     {en:'Yes — there are more animals!',de:'Ja – es gibt mehr Tiere!',fr:'Oui, il y a plus d’animaux !',es:'¡Sí! Hay más animales.',pt:'Isso! Há mais animais!',it:'Sì! Ci sono più animali!',nl:'Ja! Er zijn meer dieren!',sv:'Ja – det finns fler djur!',da:'Ja – der er flere dyr!',no:'Ja – det er flere dyr!',fi:'Kyllä – eläimiä on enemmän!'},
    okMostTwoFruits:      {en:'Yes — there are more fruits!',de:'Ja – es gibt mehr Früchte!',fr:'Oui, il y a plus de fruits !',es:'¡Sí! Hay más frutas.',pt:'Isso! Há mais frutas!',it:'Sì! Ci sono più frutti!',nl:'Ja! Er zijn meer vruchten!',sv:'Ja – det finns fler frukter!',da:'Ja – der er flere frugter!',no:'Ja – det er flere frukter!',fi:'Kyllä – hedelmiä on enemmän!'},
    okMostTwoVehicles:    {en:'Yes — there are more vehicles!',de:'Ja – es gibt mehr Fahrzeuge!',fr:'Oui, il y a plus de véhicules !',es:'¡Sí! Hay más vehículos.',pt:'Isso! Há mais veículos!',it:'Sì! Ci sono più veicoli!',nl:'Ja! Er zijn meer voertuigen!',sv:'Ja – det finns fler fordon!',da:'Ja – der er flere køretøjer!',no:'Ja – det er flere kjøretøy!',fi:'Kyllä – kulkuneuvoja on enemmän!'},
    okFewestTwoAnimals:   {en:'Yes — there are fewer animals!',de:'Ja – es gibt weniger Tiere!',fr:'Oui, il y a moins d’animaux !',es:'¡Sí! Hay menos animales.',pt:'Isso! Há menos animais!',it:'Sì! Ci sono meno animali!',nl:'Ja! Er zijn minder dieren!',sv:'Ja – det finns färre djur!',da:'Ja – der er færre dyr!',no:'Ja – det er færre dyr!',fi:'Kyllä – eläimiä on vähemmän!'},
    okFewestTwoFruits:    {en:'Yes — there are fewer fruits!',de:'Ja – es gibt weniger Früchte!',fr:'Oui, il y a moins de fruits !',es:'¡Sí! Hay menos frutas.',pt:'Isso! Há menos frutas!',it:'Sì! Ci sono meno frutti!',nl:'Ja! Er zijn minder vruchten!',sv:'Ja – det finns färre frukter!',da:'Ja – der er færre frugter!',no:'Ja – det er færre frukter!',fi:'Kyllä – hedelmiä on vähemmän!'},
    okFewestTwoVehicles:  {en:'Yes — there are fewer vehicles!',de:'Ja – es gibt weniger Fahrzeuge!',fr:'Oui, il y a moins de véhicules !',es:'¡Sí! Hay menos vehículos.',pt:'Isso! Há menos veículos!',it:'Sì! Ci sono meno veicoli!',nl:'Ja! Er zijn minder voertuigen!',sv:'Ja – det finns färre fordon!',da:'Ja – der er færre køretøjer!',no:'Ja – det er færre kjøretøy!',fi:'Kyllä – kulkuneuvoja on vähemmän!'},
    okFewestAnimals:      {en:'Yes — there are the fewest animals!',de:'Ja – von den Tieren gibt es am wenigsten!',fr:'Oui, ce sont les animaux les moins nombreux !',es:'¡Sí! Los animales son los que menos hay.',pt:'Isso! Os animais são os que aparecem menos!',it:'Sì! Gli animali sono i meno numerosi!',nl:'Ja! Er zijn de minste dieren!',sv:'Ja – det finns färst djur!',da:'Ja – der er færrest dyr!',no:'Ja – det er færrest dyr!',fi:'Kyllä – eläimiä on vähiten!'},
    okFewestFruits:       {en:'Yes — there are the fewest fruits!',de:'Ja – von den Früchten gibt es am wenigsten!',fr:'Oui, ce sont les fruits les moins nombreux !',es:'¡Sí! Las frutas son las que menos hay.',pt:'Isso! As frutas são as que aparecem menos!',it:'Sì! I frutti sono i meno numerosi!',nl:'Ja! Er zijn de minste vruchten!',sv:'Ja – det finns färst frukter!',da:'Ja – der er færrest frugter!',no:'Ja – det er færrest frukter!',fi:'Kyllä – hedelmiä on vähiten!'},
    okFewestVehicles:     {en:'Yes — there are the fewest vehicles!',de:'Ja – von den Fahrzeugen gibt es am wenigsten!',fr:'Oui, ce sont les véhicules les moins nombreux !',es:'¡Sí! Los vehículos son los que menos hay.',pt:'Isso! Os veículos são os que aparecem menos!',it:'Sì! I veicoli sono i meno numerosi!',nl:'Ja! Er zijn de minste voertuigen!',sv:'Ja – det finns färst fordon!',da:'Ja – der er færrest køretøjer!',no:'Ja – det er færrest kjøretøy!',fi:'Kyllä – kulkuneuvoja on vähiten!'},
    okOrder:              {en:'Yes — {list}: from most to fewest!',de:'Ja – {list}: von den meisten zu den wenigsten!',fr:'Oui : {list}, du plus nombreux au moins nombreux !',es:'¡Sí! De más a menos: {list}.',pt:'Isso! Do que tem mais para o que tem menos: {list}!',it:'Sì! Dal più numeroso al meno numeroso: {list}!',nl:'Ja! Van de meeste naar de minste: {list}!',sv:'Ja – {list}: från flest till färst!',da:'Ja – {list}: fra flest til færrest!',no:'Ja – {list}: fra flest til færrest!',fi:'Kyllä – {list}: eniten ensin, vähiten viimeisenä!'},
    okOrderShort:         {en:'Yes — from most to fewest!',de:'Ja – von den meisten zu den wenigsten!',fr:'Oui, du plus nombreux au moins nombreux !',es:'¡Sí! De más a menos.',pt:'Isso! Do que tem mais para o que tem menos!',it:'Sì! Dal più numeroso al meno numeroso!',nl:'Ja! Van de meeste naar de minste!',sv:'Ja – från flest till färst!',da:'Ja – fra flest til færrest!',no:'Ja – fra flest til færrest!',fi:'Kyllä – eniten ensin, vähiten viimeisenä!'},
    okMoreVehiclesAnimals:{en:'Yes — {n} more vehicles than animals!',de:'Ja – {n} Fahrzeuge mehr als Tiere!',fr:'Oui, {n} véhicules de plus que d’animaux !',es:'¡Sí! {n} vehículos más que animales.',pt:'Isso! {n} veículos a mais do que animais!',it:'Sì! {n} veicoli in più degli animali!',nl:'Ja! {n} voertuigen meer dan dieren!',sv:'Ja – {n} fler fordon än djur!',da:'Ja – {n} flere køretøjer end dyr!',no:'Ja – {n} flere kjøretøy enn dyr!',fi:'Kyllä – {n} kulkuneuvoa enemmän kuin eläimiä!'},
    okMoreAnimalsFruits:  {en:'Yes — {n} more animals than fruits!',de:'Ja – {n} Tiere mehr als Früchte!',fr:'Oui, {n} animaux de plus que de fruits !',es:'¡Sí! {n} animales más que frutas.',pt:'Isso! {n} animais a mais do que frutas!',it:'Sì! {n} animali in più dei frutti!',nl:'Ja! {n} dieren meer dan vruchten!',sv:'Ja – {n} fler djur än frukter!',da:'Ja – {n} flere dyr end frugter!',no:'Ja – {n} flere dyr enn frukter!',fi:'Kyllä – {n} eläintä enemmän kuin hedelmiä!'},
    okN:                  {en:'Yes — {n}!',de:'Ja – {n}!',fr:'Oui, {n} !',es:'¡Sí! {n}.',pt:'Isso! {n}!',it:'Sì! {n}!',nl:'Ja! {n}!',sv:'Ja – {n}!',da:'Ja – {n}!',no:'Ja – {n}!',fi:'Kyllä – {n}!'},
    okMostCell:           {en:'Yes — that tube has the most!',de:'Ja – in dieser Röhre sind die meisten!',fr:'Oui, c’est ce tube qui en contient le plus !',es:'¡Sí! Ese tubo es el que tiene más.',pt:'Isso! Esse tubo é o que tem mais!',it:'Sì! Quel tubo è quello che ne ha di più!',nl:'Ja! In die buis zitten de meeste!',sv:'Ja – det röret har flest!',da:'Ja – det rør har flest!',no:'Ja – det røret har flest!',fi:'Kyllä – siinä putkessa on eniten!'},
    catAnimals:           {en:'Animals',de:'Tiere',fr:'Animaux',es:'Animales',pt:'Animais',it:'Animali',nl:'Dieren',sv:'Djur',da:'Dyr',no:'Dyr',fi:'Eläimet'},
    catFruits:            {en:'Fruits',de:'Früchte',fr:'Fruits',es:'Frutas',pt:'Frutas',it:'Frutti',nl:'Vruchten',sv:'Frukter',da:'Frugter',no:'Frukter',fi:'Hedelmät'},
    catVehicles:          {en:'Vehicles',de:'Fahrzeuge',fr:'Véhicules',es:'Vehículos',pt:'Veículos',it:'Veicoli',nl:'Voertuigen',sv:'Fordon',da:'Køretøjer',no:'Kjøretøy',fi:'Kulkuneuvot'},
    listAnimals:          {en:'animals',de:'Tiere',fr:'les animaux',es:'animales',pt:'animais',it:'animali',nl:'dieren',sv:'djur',da:'dyr',no:'dyr',fi:'eläimet'},
    listFruits:           {en:'fruits',de:'Früchte',fr:'les fruits',es:'frutas',pt:'frutas',it:'frutti',nl:'vruchten',sv:'frukter',da:'frugter',no:'frukter',fi:'hedelmät'},
    listVehicles:         {en:'vehicles',de:'Fahrzeuge',fr:'les véhicules',es:'vehículos',pt:'veículos',it:'veicoli',nl:'voertuigen',sv:'fordon',da:'køretøjer',no:'kjøretøy',fi:'kulkuneuvot'},
    then:                 {en:', then ',de:', dann ',fr:', puis ',es:', luego ',pt:', depois ',it:', poi ',nl:', dan ',sv:', sedan ',da:', så ',no:', så ',fi:', sitten '},
    setGroups:            {en:'Groups',de:'Gruppen',fr:'Groupes',es:'Grupos',pt:'Grupos',it:'Gruppi',nl:'Groepen',sv:'Grupper',da:'Grupper',no:'Grupper',fi:'Ryhmät'},
    g2:                   {en:'2',de:'2',fr:'2',es:'2',pt:'2',it:'2',nl:'2',sv:'2',da:'2',no:'2',fi:'2'},
    g3:                   {en:'3',de:'3',fr:'3',es:'3',pt:'3',it:'3',nl:'3',sv:'3',da:'3',no:'3',fi:'3'},
    g22:                  {en:'2 × 2',de:'2 × 2',fr:'2 × 2',es:'2 × 2',pt:'2 × 2',it:'2 × 2',nl:'2 × 2',sv:'2 × 2',da:'2 × 2',no:'2 × 2',fi:'2 × 2'},
    setNumbers:           {en:'Tube numbers',de:'Zahlen an den Röhren',fr:'Nombres sur les tubes',es:'Números en los tubos',pt:'Números nos tubos',it:'Numeri sui tubi',nl:'Getallen bij de buizen',sv:'Tal vid rören',da:'Tal ved rørene',no:'Tall ved rørene',fi:'Putkien numerot'},
    nShown:               {en:'Shown',de:'Angezeigt',fr:'Affichés',es:'Visibles',pt:'Visíveis',it:'Visibili',nl:'Zichtbaar',sv:'Visas',da:'Vist',no:'Vist',fi:'Näkyvissä'},
    nHidden:              {en:'Hidden',de:'Versteckt',fr:'Cachés',es:'Ocultos',pt:'Ocultos',it:'Nascosti',nl:'Verborgen',sv:'Dolda',da:'Skjult',no:'Skjult',fi:'Piilossa'},
    check:                {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    ariaHopper:           {en:'The basket of things still to come',de:'Der Korb mit den Dingen, die noch kommen',fr:'Le panier des choses qui vont arriver',es:'La canasta con lo que falta',pt:'A cesta com o que ainda vem',it:'Il cesto delle cose che arrivano',nl:'De mand met wat er nog komt',sv:'Korgen med det som kommer',da:'Kurven med det, der kommer',no:'Kurven med det som kommer',fi:'Kori, jossa on tulevat asiat'},
    ariaBelt:             {en:'The next picture on the belt',de:'Das nächste Bild auf dem Band',fr:'L’image suivante sur le tapis',es:'La siguiente imagen en la banda',pt:'A próxima figura na esteira',it:'La prossima immagine sul nastro',nl:'Het volgende plaatje op de band',sv:'Nästa bild på bandet',da:'Det næste billede på båndet',no:'Neste bilde på båndet',fi:'Seuraava kuva hihnalla'},
    ariaSky:              {en:'fly',de:'fliegen',fr:'volent',es:'vuelan',pt:'voam',it:'volano',nl:'vliegen',sv:'flyger',da:'flyver',no:'flyr',fi:'lentävät'},
    ariaGround:           {en:'do not fly',de:'fliegen nicht',fr:'ne volent pas',es:'no vuelan',pt:'não voam',it:'non volano',nl:'vliegen niet',sv:'flyger inte',da:'flyver ikke',no:'flyr ikke',fi:'eivät lennä'}
  },
  defaults: { groups: 'two', numbers: 'shown' },
  settings: [
    { key: 'groups', type: 'choice', labelKey: 'setGroups', options: [{ value: 'two', labelKey: 'g2' }, { value: 'three', labelKey: 'g3' }, { value: 'fly', labelKey: 'g22' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'shown', labelKey: 'nShown' }, { value: 'hidden', labelKey: 'nHidden' }] }
  ],

  OK_MS: 1700, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._sel = false; this._lit = {}; this._fx = {};
    injectSortingChutesCSS();
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
  },
  onSettings: function () {
    var key = this._key();
    if (this._poolKey !== key.split('.')[0]) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (dir, noun) { return '/image-library-webp/themes/' + encodeURIComponent(dir) + '/' + noun + '@2x.webp'; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _key: function () { return SortingChutesCore.groups(this._set('groups')) + '.' + SortingChutesCore.numbers(this._set('numbers')); },
  _ensurePool: function () { var g = this._key().split('.')[0]; if (!this._pool || this._poolKey !== g) { this._pool = SortingChutesCore.rounds(g); this._poolKey = g; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = SortingChutesCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], t = C.truth(r), args = { n: typeof t === 'number' ? t : '' };
    return {
      id: 'sorting-chutes.' + r.id,
      promptKey: C.prompt(r),
      promptArgs: args,
      celebrateKey: r.q.type === 'order' ? 'okOrderShort' : (function () { var p = C.newState(r); p.phase = 'ask'; p.done = true; return C.success(p).key; })(),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._round = r; tool._busy = false; tool._sel = false; tool._lit = {}; tool._fx = {};
        tool.st = C.newState(r);
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = SortingChutesCore.rounds('two')[0]; this._round = r0; this.st = SortingChutesCore.newState(r0); }
    this._render2();
    this._watchWidth();
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, C = SortingChutesCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width(), st.fly ? 'fly' : st.r.id.charAt(0) === 'B' ? 'three' : 'two', C.capOf(st.r));
    var wrap = api.el('div', 'sc-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow')); this._wrap = wrap;
    var stage = api.el('div', 'sc-stage'); this._stage = stage; wrap.appendChild(stage);
    var note = api.el('div', 'sc-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var ask = api.el('div', 'sc-ask'); this._ask = ask;
    var nums = api.el('div', 'sc-nums'); this._nums = nums; this._numBtns = [];
    for (var v = 1; v <= 10; v++) (function (v) {
      var b = api.el('button', 'sc-num'); b.type = 'button'; b.textContent = String(v); b.setAttribute('data-v', v);
      b.addEventListener('click', function () { if (SortingChutesCore.setNum(self.st, v)) { self.api.sound(660); self._paint(); } });
      nums.appendChild(b); self._numBtns.push(b);
    })(v);
    ask.appendChild(nums);
    var chk = api.el('button', 'sc-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    this._build();
    this._paint();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._render2();
    });
    this._ro.observe(this.api.stage);
  },
  /* the vertical layout of the stage (px) */
  _rows: function () {
    var L = this._L, belt = 0, asking = this.st && this.st.phase === 'ask', bh = asking ? 0 : L.beltH + 8, head = bh, funnel = head + L.labelH, tube = funnel + (asking ? 4 : L.funnelH);
    var base = this.st && this.st.fly ? 28 : 0;
    return { belt: belt, head: head, funnel: funnel, tube: tube, bottom: tube + L.tubeH, H: tube + L.tubeH + 8 + base };
  },
  _build: function () {
    var api = this.api, self = this, st = this.st, C = SortingChutesCore, L = this._L, R = this._rows(), stage = this._stage;
    stage.style.height = R.H + 'px';
    /* the hopper: drawn tokens, one per thing still to come */
    var hop = api.el('div', 'sc-hopper'); hop.setAttribute('role', 'img'); hop.setAttribute('aria-label', this._t('ariaHopper')); this._hopper = hop; stage.appendChild(hop);
    /* the belt and its rollers */
    var belt = api.el('div', 'sc-belt'); this._belt = belt;
    for (var k = 0; k < 12; k++) { var rl = api.el('span', 'sc-roller'); belt.appendChild(rl); }
    stage.appendChild(belt);
    /* the waiting thing */
    var obj = api.el('button', 'sc-obj'); obj.type = 'button';
    var oi = document.createElement('img'); oi.alt = ''; oi.draggable = false; obj.appendChild(oi); this._objImg = oi;
    this._bindObj(obj); this._obj = obj; stage.appendChild(obj);
    /* column heads (2 × 2): the kind's labels over each pair of tubes */
    this._heads = [];
    if (st.fly) ['animals', 'vehicles'].forEach(function (cat, ci) {
      var h = api.el('div', 'sc-head'); h.setAttribute('data-cat', cat);
      C.LABELS[cat].forEach(function (lb) { var im = document.createElement('img'); im.className = 'sc-lab'; im.alt = ''; im.draggable = false; im.setAttribute('data-mark', ''); im.src = self._pic(lb[0], lb[1]); h.appendChild(im); });
      stage.appendChild(h); self._heads.push(h);
    });
    /* each tube: its labels (groups), its funnel, its glass */
    this._t2 = {};
    C.tubeKeys(st.r).forEach(function (key) {
      var o = {};
      if (!st.fly) {
        var lab = api.el('div', 'sc-labels');
        C.LABELS[key].forEach(function (lb) { var im = document.createElement('img'); im.className = 'sc-lab'; im.alt = ''; im.draggable = false; im.setAttribute('data-mark', ''); im.src = self._pic(lb[0], lb[1]); lab.appendChild(im); });
        stage.appendChild(lab); o.lab = lab;
      }
      var f = api.el('button', 'sc-funnel'); f.type = 'button'; f.setAttribute('data-key', key);
      f.innerHTML = '<span class="sc-funbox"><svg class="sc-funsvg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="sc-fun" d="M2 2 L98 2 L70 38 L30 38 Z"/></svg>' + (st.fly ? (key.indexOf('.fly') > 0 ? SKY_ICON : GROUND_ICON) : '') + '</span>';
      f.setAttribute('aria-label', self._tubeName(key));
      f.addEventListener('click', function () { self._dropTo(key); });
      stage.appendChild(f); o.f = f;
      var tb = api.el('button', 'sc-tube' + (st.fly ? (key.indexOf('.fly') > 0 ? ' is-sky' : ' is-ground') : '')); tb.type = 'button'; tb.setAttribute('data-key', key);
      self._bindTube(tb, key);
      stage.appendChild(tb); o.tube = tb;
      if (st.fly) { var bs = api.el('div', 'sc-base'); bs.setAttribute('aria-hidden', 'true'); bs.innerHTML = key.indexOf('.fly') > 0 ? SKY_ICON : GROUND_ICON; stage.appendChild(bs); o.base = bs; }
      self._t2[key] = o;
    });
    var help = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); help.setAttribute('class', 'sc-help'); help.setAttribute('aria-hidden', 'true'); this._help = help; stage.appendChild(help);
  },
  _tubeName: function (key) {
    var p = key.split('.');
    return this._t('cat' + SortingChutesCore.cap(p[0])) + (p[1] ? ' — ' + this._t(p[1] === 'fly' ? 'ariaSky' : 'ariaGround') : '');
  },
  _tubeBox: function (key) {
    var C = SortingChutesCore, L = this._L, R = this._rows(), i = this.st.order.indexOf(key);
    var x = (this._drag && this._drag.key === key) ? this._drag.x : C.tubeX(L, i);
    return { x: x, y: R.tube, w: L.tubeW, h: L.tubeH, i: i };
  },
  /* slot j's centre (from the bottom) in tube key */
  _slot: function (key, j) { var b = this._tubeBox(key), L = this._L; return { x: b.x + b.w / 2, y: b.y + b.h - 5 - L.slot * (j + 0.5) }; },
  _paint: function () {
    if (!this._stage) return;
    var C = SortingChutesCore, st = this.st, L = this._L, R = this._rows(), self = this, api = this.api;
    var hp = C.help(st), shown = C.numbers(this._set('numbers')) === 'shown';
    /* hopper + belt + the waiting thing */
    var hopW = L.mode === 'wide' ? 120 : 64, hopH = L.mode === 'wide' ? 88 : 60;
    var sorting = st.phase === 'sort';
    this._stage.style.height = this._rows().H + 'px';
    this._hopper.hidden = !sorting; this._belt.hidden = !sorting;
    this._hopper.style.cssText = 'left:0;top:' + (L.beltH - hopH - 8) + 'px;width:' + hopW + 'px;height:' + hopH + 'px;';
    var rest = Math.max(0, st.belt.length - 1), tok = '';
    for (var k = 0; k < Math.min(rest, 14); k++) tok += '<span class="sc-tok" style="left:' + (8 + (k % 5) * (hopW - 24) / 5) + 'px;top:' + (hopH - 20 - Math.floor(k / 5) * 14) + 'px"></span>';
    this._hopper.innerHTML = '<svg class="sc-basket" viewBox="0 0 120 88" preserveAspectRatio="none" aria-hidden="true"><path d="M4 30 L116 30 L104 84 L16 84 Z"/><path class="sc-weave" d="M10 46 L110 46 M14 62 L106 62"/></svg>' + tok;
    this._belt.style.cssText = 'left:' + (hopW + 6) + 'px;right:0;top:' + (L.beltH - 30) + 'px;height:22px;';
    this._belt.classList.toggle('is-spin', !!this._fx.spin);
    var cur = C.current(st), obj = this._obj;
    obj.hidden = !cur;
    if (cur) {
      this._objImg.src = this._pic(C.dirOf(cur), cur);
      var ox = this._objAt ? this._objAt.x : L.W - L.obj - 6, oy = this._objAt ? this._objAt.y : L.beltH - 30 - L.obj;
      obj.style.cssText = 'left:' + ox + 'px;top:' + oy + 'px;width:' + L.obj + 'px;height:' + L.obj + 'px;';
      obj.classList.toggle('is-sel', !!this._sel);
      obj.setAttribute('aria-label', this._t('ariaBelt'));
    }
    /* column heads */
    this._heads.forEach(function (h, ci) {
      var a = self._tubeBox(ci ? 'vehicles.fly' : 'animals.fly'), b = self._tubeBox(ci ? 'vehicles.ground' : 'animals.ground');
      var l = Math.min(a.x, b.x), r = Math.max(a.x, b.x) + L.tubeW;
      h.style.cssText = 'left:' + l + 'px;width:' + (r - l) + 'px;top:' + R.head + 'px;height:' + L.labelH + 'px;';
      h.classList.toggle('is-flash', self._fx.flash === h.getAttribute('data-cat'));
    });
    var c = C.tubeCounts(st), wantT = st.done ? null : null;
    void wantT;
    C.tubeKeys(st.r).forEach(function (key) {
      var o = self._t2[key], b = self._tubeBox(key), n = st.tubes[key].length;
      if (o.lab) { var e = Math.min(L.gap, 24); o.lab.style.cssText = 'left:' + (b.x - e / 2) + 'px;width:' + (b.w + e) + 'px;top:' + R.head + 'px;height:' + L.labelH + 'px;'; o.lab.classList.toggle('is-flash', self._fx.flash === key); }
      o.f.style.cssText = 'left:' + (b.x - 6) + 'px;width:' + (b.w + 12) + 'px;top:' + R.head + 'px;height:' + (L.labelH + L.funnelH) + 'px;--sc-funh:' + L.funnelH + 'px;';
      o.f.hidden = st.phase !== 'sort';
      o.f.disabled = st.phase !== 'sort';
      o.f.classList.toggle('is-flash', self._fx.flash === key);
      if (o.base) o.base.style.cssText = 'left:' + b.x + 'px;width:' + b.w + 'px;top:' + (b.y + b.h + 4) + 'px;height:24px;';
      var tb = o.tube;
      tb.style.left = b.x + 'px'; tb.style.top = b.y + 'px'; tb.style.width = b.w + 'px'; tb.style.height = b.h + 'px';
      tb.setAttribute('aria-label', self._tubeName(key) + ': ' + n);
      /* the slots and their marks */
      var lit = self._lit[key] || 0, numOn = shown || (hp && hp.level >= 2 && (hp.kind !== 'count' || hp.tubes.indexOf(key) >= 0) && (hp.kind !== 'pair' || key === hp.a)), html = '';
      for (var j = 0; j < L.cap; j++) {
        var y = b.h - 5 - L.slot * (j + 1), cls = 'sc-slot';
        if (j < lit) cls += ' is-lit';
        if (hp && hp.kind === 'count' && hp.level === 1 && hp.tubes.indexOf(key) >= 0 && j < n) cls += ' is-lit';
        if (hp && hp.kind === 'pair' && key === hp.a && j >= c[hp.b] && j < n) cls += ' is-extra';
        html += '<span class="' + cls + '" style="bottom:' + (5 + L.slot * j) + 'px;height:' + L.slot + 'px"></span>';
        if (j < n) { var nn = st.tubes[key][j]; html += '<img class="sc-mark' + (self._fx.thunk === key && j === n - 1 ? ' is-thunk' : '') + '" data-mark="" alt="" draggable="false" src="' + self._pic(C.dirOf(nn), nn) + '" style="width:' + L.mark + 'px;height:' + L.mark + 'px;bottom:' + (5 + L.slot * j + (L.slot - L.mark) / 2) + 'px">'; }
        if (numOn) {
          var label = (hp && hp.kind === 'pair' && hp.level >= 2 && key === hp.a) ? (j >= c[hp.b] && j < n ? String(j - c[hp.b] + 1) : '') : String(j + 1);
          var topN = hp && hp.level >= 2 && j === n - 1 && (hp.kind !== 'count' || hp.tubes.indexOf(key) >= 0) && hp.kind !== 'pair';
          if (label) html += '<span class="sc-n' + (topN ? ' is-top' : '') + '" style="bottom:' + (5 + L.slot * j) + 'px;height:' + L.slot + 'px;line-height:' + L.slot + 'px">' + label + '</span>';
        }
        void y;
      }
      tb.innerHTML = html;
      var pick = st.pick === key, kind = C.answerKind(st.r);
      tb.className = 'sc-tube' + (st.fly ? (key.indexOf('.fly') > 0 ? ' is-sky' : ' is-ground') : '') + (pick && kind === 'tube' ? (st.done ? ' is-gold' : ' is-on') : '')
        + (st.done ? ' is-wash is-' + key.split('.')[0] : '') + (hp && hp.kind === 'height' && hp.from && self._above(key, hp) ? ' is-above' : '')
        + (hp && hp.kind === 'count' && hp.level === 1 && hp.tubes.indexOf(key) < 0 ? ' is-dim' : '')
        + (hp && hp.kind === 'order' && hp.level === 1 && self._leans(key, hp) ? ' ' + self._leans(key, hp) : '')
        + (self._drag && self._drag.key === key ? ' is-drag' : '') + (st.phase === 'ask' && kind === 'order' && !st.done ? ' is-movable' : '');
    });
    /* help lines: the dashed height line, the pairing lines */
    var svg = '';
    if (hp && hp.kind === 'height' && hp.from && hp.level === 1) { var ch = st.tubes[hp.from].length, yb = this._tubeBox(hp.from), yy = yb.y + yb.h - 5 - L.slot * ch; svg += '<line class="sc-dash" x1="' + (C.tubeX(L, 0) - 8) + '" x2="' + (C.tubeX(L, L.n - 1) + L.tubeW + 8) + '" y1="' + yy + '" y2="' + yy + '"/>'; }
    if (hp && hp.kind === 'pair' && hp.level === 1) { for (var p = 0; p < c[hp.b]; p++) { var s1 = this._slot(hp.a, p), s2 = this._slot(hp.b, p); svg += '<line class="sc-pair" x1="' + s1.x + '" y1="' + s1.y + '" x2="' + s2.x + '" y2="' + s2.y + '"/>'; } }
    this._help.innerHTML = svg;
    this._help.setAttribute('viewBox', '0 0 ' + L.W + ' ' + R.H);
    /* the answer row */
    var kind2 = C.answerKind(st.r);
    this._ask.hidden = st.phase !== 'ask';
    this._nums.hidden = kind2 !== 'number';
    this._numBtns.forEach(function (b) { var v = +b.getAttribute('data-v'); b.classList.toggle('is-on', st.num === v); b.classList.toggle('is-gold', st.done && st.num === v); b.disabled = st.done; });
    this._checkBtn.hidden = !!st.done;
    this._checkBtn.disabled = !!this._busy;
    /* the words */
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._okLine();
    else if (h) msg = this._t(h.key);
    else if (st.phase === 'sort') msg = this._t(st.fly ? 'pSortFly' : 'pSort');
    else if (st.last && st.last.result === 'in' && st.phase === 'ask') msg = '';
    if (this._announce && !h) msg = this._announce;
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
  },
  _okLine: function () {
    var C = SortingChutesCore, s = C.success(this.st), self = this;
    if (!s) return '';
    if (s.list) return this._t('okOrder', { list: s.list.map(function (k) { return self._t('list' + C.cap(k)); }).join(this._t('then')) });
    return this._t(s.key, s.args);
  },
  _above: function (key, hp) { var c = SortingChutesCore.tubeCounts(this.st), ch = c[hp.from]; return this.st.r.q.type === 'fewest' ? c[key] < ch : c[key] > ch; },
  _leans: function (key, hp) { var i = this.st.order.indexOf(key); if (hp.breaks.indexOf(i) >= 0) return 'is-lean-r'; if (hp.breaks.indexOf(i - 1) >= 0) return 'is-lean-l'; return ''; },

  /* ---------------- the hand: sorting ---------------- */
  _dropTo: function (key) {
    var C = SortingChutesCore, st = this.st, self = this;
    if (this._busy || st.phase !== 'sort') return;
    this._sel = false; this._objAt = null;
    var res = C.drop(st, key);
    if (res.result === 'bounce') {
      this.api.sound(240);
      this._fx.flash = st.fly && res.why === 'fly' ? null : (st.fly ? key.split('.')[0] : key);
      this._obj.classList.remove('is-bounce'); void this._obj.offsetWidth; this._obj.classList.add('is-bounce');
      this._announce = '';
      this._paint();
      this._later(function () { self._fx.flash = null; self._paint(); }, this._ms(700));
      return;
    }
    if (res.result !== 'in') return;
    this.api.sound(160);
    this._fx.thunk = key; this._fx.spin = true;
    this._announce = '';
    this._paint();
    this._later(function () { self._fx.spin = false; self._fx.thunk = null; self._paint(); }, this._ms(420));
  },
  _bindObj: function (el) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.phase !== 'sort') return;
      ev.preventDefault();
      var sr = self._stage.getBoundingClientRect(), x0 = ev.clientX, y0 = ev.clientY, moved = false, L = self._L;
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        moved = true; self._sel = false;
        self._objAt = { x: e.clientX - sr.left - L.obj / 2, y: e.clientY - sr.top - L.obj / 2 }; el.classList.add('is-drag'); self._paint();
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        el.classList.remove('is-drag');
        if (!moved) { self._sel = !self._sel; self._paint(); return; }
        var key = self._hitTube(e.clientX, e.clientY);
        self._objAt = null;
        if (key) self._dropTo(key); else self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _hitTube: function (cx, cy) {
    var best = null, self = this;
    SortingChutesCore.tubeKeys(this.st.r).forEach(function (key) {
      var o = self._t2[key];
      [o.f, o.tube, o.lab].forEach(function (el) { if (!el || best) return; var r = el.getBoundingClientRect(); if (cx >= r.left - 6 && cx <= r.right + 6 && cy >= r.top - 16 && cy <= r.bottom) best = key; });
    });
    return best;
  },
  /* the tube: during sorting a drop (or the top comes back); asking: count aid, pick, or slide */
  _bindTube: function (el, key) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var C = SortingChutesCore, st = self.st;
      if (self._busy) return;
      if (st.phase === 'sort') {
        ev.preventDefault();
        self._dropTo(key); return;
      }
      if (st.done) return;
      var kind = C.answerKind(st.r);
      if (kind === 'tube') { if (C.setPick(st, key)) { self.api.sound(660); self._paint(); } return; }
      if (kind === 'number') { var n = st.tubes[key].length, lit = self._lit[key] || 0; self._lit[key] = lit >= n ? 0 : lit + 1; self.api.sound(lit >= n ? 300 : 880); self._paint(); return; }
      /* order: slide the tube along the rail */
      ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var sr = self._stage.getBoundingClientRect(), x0 = ev.clientX, bx = self._tubeBox(key).x;
      self._drag = { key: key, x: bx };
      var move = function (e) { self._drag.x = bx + (e.clientX - x0); self._paint(); };
      var up = function () {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        var cx = self._drag.x + self._L.tubeW / 2, from = st.order.indexOf(key), to = 0, L = self._L;
        /* the tube lands in the slot whose centre is nearest */
        for (var i = 1; i < st.order.length; i++) if (Math.abs(cx - (C.tubeX(L, i) + L.tubeW / 2)) < Math.abs(cx - (C.tubeX(L, to) + L.tubeW / 2))) to = i;
        self._drag = null;
        if (C.move(st, from, to)) self.api.sound(1200); else if (from === to) { st.moved = true; }
        self._paint();
        void sr;
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) {
      var C = SortingChutesCore, st = self.st;
      if (st.phase === 'ask' && C.answerKind(st.r) === 'order' && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) {
        ev.preventDefault(); var i = st.order.indexOf(key); if (C.move(st, i, i + (ev.key === 'ArrowLeft' ? -1 : 1))) { self._paint(); var t = self._t2[key].tube; if (t) t.focus(); }
      }
    });
    el.addEventListener('click', function (ev) {
      /* keyboard Enter / Space on a tube (pointer handled above) */
      if (ev.detail !== 0) return;
      var C = SortingChutesCore, st = self.st;
      if (st.phase === 'sort') self._dropTo(key);
      else if (C.answerKind(st.r) === 'tube') { if (C.setPick(st, key)) self._paint(); }
    });
  },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = SortingChutesCore, st = this.st, self = this;
    if (this._busy || st.done) return;
    var res = C.check(st);
    this._lit = {};
    if (res.result === 'ok') { this._win(); return; }
    if (res.result === 'wrong') this.api.sound(196);
    this._paint();
  },
  _win: function () {
    var self = this;
    this._fx.spin = true;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._fx.spin = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var SKY_ICON = '<svg class="sc-ico" viewBox="0 0 40 24" aria-hidden="true"><path class="sc-cloud" d="M10 20 Q2 20 4 13 Q6 7 13 9 Q16 2 24 4 Q31 5 31 11 Q38 11 37 17 Q36 20 31 20 Z"/></svg>';
/* "does not fly": the same cloud, crossed out (not grass: a boat does not fly either, and it is not on the ground) */
var GROUND_ICON = '<svg class="sc-ico" viewBox="0 0 40 24" aria-hidden="true"><path class="sc-cloud is-no" d="M10 20 Q2 20 4 13 Q6 7 13 9 Q16 2 24 4 Q31 5 31 11 Q38 11 37 17 Q36 20 31 20 Z"/><path class="sc-cross" d="M6 22 L34 2"/></svg>';

var scCssDone = false;
function injectSortingChutesCSS() {
  if (scCssDone || typeof document === 'undefined') return;
  scCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sc-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--sc-ink:#0F4A40;--sc-teal:#146B5E;--sc-coral:#F2784B;--sc-gold:#E0A400;}'
  + '.sc-stage{position:relative;width:100%;user-select:none;-webkit-user-select:none;}'
  + '.sc-hopper{position:absolute;} .sc-hopper[hidden],.sc-belt[hidden],.sc-obj[hidden],.sc-funnel[hidden]{display:none;} .sc-basket{position:absolute;inset:0;width:100%;height:100%;} .sc-basket path{fill:#E7C98E;stroke:#9C7A3C;stroke-width:2;vector-effect:non-scaling-stroke;} .sc-basket .sc-weave{fill:none;stroke:#C9A25F;}'
  + '.sc-tok{position:absolute;width:12px;height:12px;border-radius:50%;background:#FFF3DA;box-shadow:inset 0 0 0 2px #9C7A3C;}'
  + '.sc-belt{position:absolute;border-radius:11px;background:repeating-linear-gradient(90deg,#55615E 0 14px,#47524F 14px 28px);box-shadow:inset 0 -3px 0 rgba(0,0,0,.25);display:flex;align-items:center;justify-content:space-around;overflow:hidden;}'
  + '.sc-roller{width:14px;height:14px;border-radius:50%;background:#B9C3C0;box-shadow:inset 0 0 0 3px #7E8986;}'
  + '.sc-belt.is-spin .sc-roller{animation:sc-roll .4s linear 2;} @keyframes sc-roll{to{transform:rotate(360deg);}}'
  + '.sc-obj{position:absolute;padding:0;border:0;background:transparent;cursor:grab;touch-action:none;z-index:6;transition:left .2s ease,top .2s ease;}'
  + '.sc-obj img{width:100%;height:100%;display:block;object-fit:contain;pointer-events:none;}'
  + '.sc-obj.is-drag{transition:none;cursor:grabbing;transform:scale(1.06);} .sc-obj.is-sel{filter:drop-shadow(0 0 0 #146B5E) drop-shadow(0 6px 6px rgba(0,0,0,.25));transform:translateY(-6px);}'
  + '.sc-obj.is-bounce{animation:sc-bounce .45s ease-out;} @keyframes sc-bounce{30%{transform:translate(-18px,-10px) rotate(-10deg);}60%{transform:translate(6px,0) rotate(4deg);}}'
  + '.sc-head,.sc-labels{position:absolute;display:flex;justify-content:center;align-items:center;gap:2px;pointer-events:none;z-index:3;}'
  + '.sc-lab{width:var(--sc-lab,40px);height:var(--sc-lab,40px);object-fit:contain;} .is-narrow .sc-lab{--sc-lab:30px;}'
  + '.is-flash{animation:sc-flash .35s ease-in-out 2;} @keyframes sc-flash{50%{filter:brightness(1.35) drop-shadow(0 0 6px rgba(242,120,75,.9));}}'
  + '.sc-funnel{position:absolute;padding:0;border:0;background:transparent;cursor:pointer;z-index:2;} .sc-funbox{position:absolute;left:0;right:0;bottom:0;height:var(--sc-funh,34px);} .sc-funsvg{position:absolute;inset:0;width:100%;height:100%;} .sc-fun{fill:#EAF6F8;stroke:var(--sc-ink);stroke-width:2.4;vector-effect:non-scaling-stroke;stroke-linejoin:round;}'
  + '.sc-funnel:disabled{cursor:default;} .sc-funbox svg.sc-ico{position:absolute;inset:auto;left:50%;top:50%;width:34px;height:20px;transform:translate(-50%,-55%);} .sc-cloud{fill:#fff;stroke:#7FA9C9;stroke-width:1.6;} .sc-base{position:absolute;display:flex;justify-content:center;pointer-events:none;} .sc-base svg.sc-ico{width:40px;height:24px;} .sc-cloud.is-no{fill:#F4F4F2;stroke:#A9A9A4;} .sc-cross{fill:none;stroke:#A6461F;stroke-width:2.6;stroke-linecap:round;}'
  + '.sc-tube{position:absolute;padding:0;border:0;border-radius:0 0 18px 18px;background:rgba(234,246,248,.75);box-shadow:inset 0 0 0 2.5px var(--sc-ink);cursor:pointer;transition:left .2s ease,transform .2s ease;}'
  + '.sc-tube.is-sky{background:linear-gradient(#DCEEFB,#EEF7FD);} .sc-tube.is-ground{background:linear-gradient(#EAF5E2,#DDEFD2);}'
  + '.sc-slot{position:absolute;left:4px;right:4px;border-top:1px dashed rgba(15,74,64,.18);} .sc-slot.is-lit{background:rgba(224,164,0,.28);border-radius:6px;} .sc-slot.is-extra{background:rgba(242,120,75,.35);border-radius:6px;}'
  + '.sc-mark{position:absolute;left:50%;transform:translateX(-50%);object-fit:contain;pointer-events:none;} .sc-mark.is-thunk{animation:sc-thunk .3s ease-out;} @keyframes sc-thunk{0%{transform:translate(-50%,-40px);opacity:.3;}100%{transform:translate(-50%,0);}}'
  + '.sc-n{position:absolute;left:3px;font-weight:800;font-size:14px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:#4B6A63;pointer-events:none;} .sc-n.is-top{left:1px;padding:0 3px;border-radius:6px;background:var(--sc-coral);color:#fff;font-size:16px;animation:sc-flash .5s ease-in-out 2;}'
  + '.sc-tube.is-on{box-shadow:inset 0 0 0 2.5px var(--sc-ink),0 0 0 4px var(--sc-teal);} .sc-tube.is-gold{box-shadow:inset 0 0 0 2.5px var(--sc-ink),0 0 0 4px var(--sc-gold);}'
  + '.sc-tube.is-dim{opacity:.45;} .sc-tube.is-above{box-shadow:inset 0 0 0 2.5px var(--sc-ink),0 0 0 4px rgba(242,120,75,.7);}'
  + '.sc-tube.is-lean-r{transform:rotate(4deg);transform-origin:bottom right;animation:sc-lean .5s ease-in-out 2;} .sc-tube.is-lean-l{transform:rotate(-4deg);transform-origin:bottom left;animation:sc-lean .5s ease-in-out 2;} @keyframes sc-lean{50%{filter:drop-shadow(0 0 6px rgba(242,120,75,.9));}}'
  + '.sc-tube.is-movable{cursor:grab;touch-action:none;} .sc-tube.is-drag{transition:none;z-index:5;cursor:grabbing;box-shadow:inset 0 0 0 2.5px var(--sc-ink),0 8px 14px rgba(0,0,0,.18);}'
  + '.sc-tube.is-wash.is-animals{background:linear-gradient(rgba(20,107,94,.08),rgba(20,107,94,.28));} .sc-tube.is-wash.is-fruits{background:linear-gradient(rgba(242,120,75,.08),rgba(242,120,75,.3));} .sc-tube.is-wash.is-vehicles{background:linear-gradient(rgba(224,164,0,.1),rgba(224,164,0,.34));}'
  + '.sc-help{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:4;overflow:visible;} .sc-dash{stroke:var(--sc-coral);stroke-width:2.5;stroke-dasharray:7 5;} .sc-pair{stroke:var(--sc-teal);stroke-width:2.5;stroke-linecap:round;opacity:.8;}'
  + '.sc-note{min-height:28px;align-self:center;font:700 20px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--sc-ink);text-align:center;max-width:620px;} .sc-note.is-ok{color:var(--sc-teal);font-weight:800;} .sc-note.is-wrong{color:#A6461F;}'
  + '.sc-ask{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;} .sc-ask[hidden]{display:none;}'
  + '.sc-nums{display:grid;grid-template-columns:repeat(10,52px);gap:6px;} .is-narrow .sc-nums{grid-template-columns:repeat(5,44px);gap:5px;} .sc-nums[hidden]{display:none;}'
  + '.sc-num{height:52px;border-radius:12px;border:0;background:#FFFBF2;box-shadow:inset 0 0 0 2px #C9B897;font:800 22px var(--lcs-font-display);color:var(--sc-ink);cursor:pointer;} .is-narrow .sc-num{height:44px;} .is-narrow.sc-wrap{gap:7px;} .is-narrow .sc-ask{gap:8px;}'
  + '.sc-num.is-on{box-shadow:inset 0 0 0 3px var(--sc-teal);background:#E3F1EC;} .sc-num.is-gold{box-shadow:inset 0 0 0 3px var(--sc-gold);background:#FFF6DA;} .sc-num:disabled{cursor:default;}'
  + '.sc-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .sc-check[hidden]{display:none;} .sc-check:disabled{opacity:.5;}'
  + '.sc-obj:focus-visible,.sc-funnel:focus-visible,.sc-tube:focus-visible,.sc-num:focus-visible,.sc-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow .sc-note{font-size:17px;}'
  + '@media (prefers-reduced-motion: reduce){.sc-obj,.sc-tube{transition:none;} .sc-belt.is-spin .sc-roller,.sc-mark.is-thunk,.sc-obj.is-bounce,.is-flash,.sc-tube.is-lean-r,.sc-tube.is-lean-l{animation:none;}}';
  var el = document.createElement('style'); el.id = 'sc-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.SortingChutesActivity = SortingChutesActivity;
