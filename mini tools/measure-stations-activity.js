/* =====================================================================
   measure-stations-activity.js — ACTIVITY #32 of the one-by-one rebuild:
   "Describe Measurable Attributes" (K.MD.A.1) — THE MEASURING STATIONS.
   Design sheet: docs/activities-rebuild/designs/032-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: long, tall and heavy are three different ways to measure,
   so the child answers by choosing the station that can find out — lay the
   picture on the TRACK (it tips over and lies down: how long), stand it at
   the POST (a cap clunks onto its top: how tall) or hang it on the SPRING
   (the pan drops and bobs: how heavy). A wrong station still measures,
   honestly, the wrong thing, and its sign stands beside the question's.
   "Harder": one object measured two ways, a card with two badges. "Big or
   small": a square SIZE WINDOW glides over the pictures — a big one pokes
   out, a small one fits with room. "Try anything" is open play.

   ACTIVITY LAYER ONLY: the model is measure-stations-core.js; lcs-shell.js
   is untouched (its Check is hidden and pressed by this activity when the
   round is complete). Test seams: window.MeasureStationsActivity.st /
   ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var MeasureStationsActivity = {
  id: 'measure-stations',
  apparatusClasses: ['ms-'],

  strings: {
    title:        {en:'The Measuring Stations',de:'Die Mess-Stationen',fr:'Les stations de mesure',it:'Le stazioni di misura',es:'Las estaciones de medir',pt:'As estações de medida',nl:'De meetstations',sv:'Mätstationerna',da:'Målestationerne',no:'Målestasjonene',fi:'Mittausasemat'},
    instruction:  {en:'Long, tall or heavy? Put the picture on the station that can find out.',de:'Lang, hoch oder schwer? Leg das Bild auf die Station, die es herausfinden kann.',fr:'Long, haut ou lourd ? Pose l’image sur la station qui peut le mesurer.',it:'Lungo, alto o pesante? Metti l’immagine sulla stazione che lo può scoprire.',es:'¿Largo, alto o pesado? Pon la imagen en la estación que lo puede averiguar.',pt:'Comprido, alto ou pesado? Coloque a figura na estação que consegue descobrir.',nl:'Lang, hoog of zwaar? Zet het plaatje op het station dat het kan meten.',sv:'Lång, hög eller tung? Lägg bilden på den station som kan ta reda på det.',da:'Lang, høj eller tung? Læg billedet på den station, der kan finde ud af det.',no:'Lang, høy eller tung? Legg bildet på stasjonen som kan finne det ut.',fi:'Pitkä, korkea vai painava? Laita kuva asemalle, joka voi selvittää sen.'},
    promptLong:   {en:'How long? Find out!',de:'Wie lang? Finde es heraus!',fr:'Quelle longueur ? Découvre-le !',it:'Quanto misura in lunghezza? Scoprilo!',es:'¿Cuánto mide de largo? ¡Descúbrelo!',pt:'Quanto mede de comprimento? Descubra!',nl:'Hoe lang? Zoek het uit!',sv:'Hur lång? Ta reda på det!',da:'Hvor lang? Find ud af det!',no:'Hvor lang? Finn det ut!',fi:'Kuinka pitkä? Selvitä!'},
    promptTall:   {en:'How tall? Find out!',de:'Wie hoch? Finde es heraus!',fr:'Quelle hauteur ? Découvre-le !',it:'Quanto misura in altezza? Scoprilo!',es:'¿Cuánto mide de alto? ¡Descúbrelo!',pt:'Quanto mede de altura? Descubra!',nl:'Hoe hoog? Zoek het uit!',sv:'Hur hög? Ta reda på det!',da:'Hvor høj? Find ud af det!',no:'Hvor høy? Finn det ut!',fi:'Kuinka korkea? Selvitä!'},
    promptHeavy:  {en:'How heavy? Find out!',de:'Wie schwer? Finde es heraus!',fr:'Quel poids ? Découvre-le !',it:'Quanto pesa? Scoprilo!',es:'¿Cuánto pesa? ¡Descúbrelo!',pt:'Quanto pesa? Descubra!',nl:'Hoe zwaar? Zoek het uit!',sv:'Hur tung? Ta reda på det!',da:'Hvor tung? Find ud af det!',no:'Hvor tung? Finn det ut!',fi:'Kuinka painava? Selvitä!'},
    promptTwoWays:{en:'Measure it two ways!',de:'Miss es auf zwei Arten!',fr:'Mesure de deux façons !',it:'Misura in due modi!',es:'¡Mide de dos maneras!',pt:'Meça de dois jeitos!',nl:'Meet het op twee manieren!',sv:'Mät den på två sätt!',da:'Mål den på to måder!',no:'Mål den på to måter!',fi:'Mittaa se kahdella tavalla!'},
    promptBigOne: {en:'Tap the big one.',de:'Tipp auf das große Bild.',fr:'Touche la grande image.',it:'Tocca l’immagine grande.',es:'Toca la imagen grande.',pt:'Toque na figura grande.',nl:'Tik op het grote plaatje.',sv:'Tryck på den stora bilden.',da:'Tryk på det store billede.',no:'Trykk på det store bildet.',fi:'Napauta isoa kuvaa.'},
    promptBigAll: {en:'Tap all the big ones.',de:'Tipp auf alle großen Bilder.',fr:'Touche toutes les grandes images.',it:'Tocca tutte le immagini grandi.',es:'Toca todas las imágenes grandes.',pt:'Toque em todas as figuras grandes.',nl:'Tik op alle grote plaatjes.',sv:'Tryck på alla stora bilder.',da:'Tryk på alle de store billeder.',no:'Trykk på alle de store bildene.',fi:'Napauta kaikkia isoja kuvia.'},
    hintIdle:     {en:'Drag the picture onto a measuring station, or tap a station.',de:'Zieh das Bild auf eine Mess-Station oder tipp auf eine Station.',fr:'Fais glisser l’image sur une station de mesure, ou touche une station.',it:'Trascina l’immagine su una stazione di misura o tocca una stazione.',es:'Arrastra la imagen a una estación de medir o toca una estación.',pt:'Arraste a figura para uma estação de medida ou toque numa estação.',nl:'Sleep het plaatje naar een meetstation of tik op een station.',sv:'Dra bilden till en mätstation eller tryck på en station.',da:'Træk billedet over på en målestation, eller tryk på en station.',no:'Dra bildet til en målestasjon, eller trykk på en stasjon.',fi:'Vedä kuva mittausasemalle tai napauta asemaa.'},
    hintTrackTall:{en:'The track shows how long. The question is how tall.',de:'Die Schiene zeigt, wie lang. Gefragt ist, wie hoch.',fr:'Le rail montre la longueur. La question, c’est la hauteur.',it:'Il binario mostra la lunghezza. La domanda è sull’altezza.',es:'El riel muestra el largo. Pero la pregunta es de alto.',pt:'O trilho mostra o comprimento. A pergunta é sobre a altura.',nl:'De rails laat zien hoe lang. De vraag is hoe hoog.',sv:'Skenan visar hur lång. Frågan är hur hög.',da:'Skinnen viser, hvor lang. Spørgsmålet er, hvor høj.',no:'Skinnen viser hvor lang. Spørsmålet er hvor høy.',fi:'Kisko näyttää, kuinka pitkä. Kysymys on, kuinka korkea.'},
    hintTrackHeavy:{en:'The track shows how long. The question is how heavy.',de:'Die Schiene zeigt, wie lang. Gefragt ist, wie schwer.',fr:'Le rail montre la longueur. La question, c’est le poids.',it:'Il binario mostra la lunghezza. La domanda è sul peso.',es:'El riel muestra el largo. Pero la pregunta es de peso.',pt:'O trilho mostra o comprimento. A pergunta é sobre o peso.',nl:'De rails laat zien hoe lang. De vraag is hoe zwaar.',sv:'Skenan visar hur lång. Frågan är hur tung.',da:'Skinnen viser, hvor lang. Spørgsmålet er, hvor tung.',no:'Skinnen viser hvor lang. Spørsmålet er hvor tung.',fi:'Kisko näyttää, kuinka pitkä. Kysymys on, kuinka painava.'},
    hintPostLong: {en:'The post shows how tall. The question is how long.',de:'Die Messlatte zeigt, wie hoch. Gefragt ist, wie lang.',fr:'La toise montre la hauteur. La question, c’est la longueur.',it:'L’asta mostra l’altezza. La domanda è sulla lunghezza.',es:'El poste muestra el alto. Pero la pregunta es de largo.',pt:'O poste mostra a altura. A pergunta é sobre o comprimento.',nl:'De paal laat zien hoe hoog. De vraag is hoe lang.',sv:'Stolpen visar hur hög. Frågan är hur lång.',da:'Stangen viser, hvor høj. Spørgsmålet er, hvor lang.',no:'Stolpen viser hvor høy. Spørsmålet er hvor lang.',fi:'Pylväs näyttää, kuinka korkea. Kysymys on, kuinka pitkä.'},
    hintPostHeavy:{en:'The post shows how tall. The question is how heavy.',de:'Die Messlatte zeigt, wie hoch. Gefragt ist, wie schwer.',fr:'La toise montre la hauteur. La question, c’est le poids.',it:'L’asta mostra l’altezza. La domanda è sul peso.',es:'El poste muestra el alto. Pero la pregunta es de peso.',pt:'O poste mostra a altura. A pergunta é sobre o peso.',nl:'De paal laat zien hoe hoog. De vraag is hoe zwaar.',sv:'Stolpen visar hur hög. Frågan är hur tung.',da:'Stangen viser, hvor høj. Spørgsmålet er, hvor tung.',no:'Stolpen viser hvor høy. Spørsmålet er hvor tung.',fi:'Pylväs näyttää, kuinka korkea. Kysymys on, kuinka painava.'},
    hintSpringLong:{en:'The spring shows how heavy. The question is how long.',de:'Die Federwaage zeigt, wie schwer. Gefragt ist, wie lang.',fr:'Le peson montre le poids. La question, c’est la longueur.',it:'La molla mostra il peso. La domanda è sulla lunghezza.',es:'El resorte muestra el peso. Pero la pregunta es de largo.',pt:'A mola mostra o peso. A pergunta é sobre o comprimento.',nl:'De veer laat zien hoe zwaar. De vraag is hoe lang.',sv:'Fjädern visar hur tung. Frågan är hur lång.',da:'Fjederen viser, hvor tung. Spørgsmålet er, hvor lang.',no:'Fjæra viser hvor tung. Spørsmålet er hvor lang.',fi:'Jousi näyttää, kuinka painava. Kysymys on, kuinka pitkä.'},
    hintSpringTall:{en:'The spring shows how heavy. The question is how tall.',de:'Die Federwaage zeigt, wie schwer. Gefragt ist, wie hoch.',fr:'Le peson montre le poids. La question, c’est la hauteur.',it:'La molla mostra il peso. La domanda è sull’altezza.',es:'El resorte muestra el peso. Pero la pregunta es de alto.',pt:'A mola mostra o peso. A pergunta é sobre a altura.',nl:'De veer laat zien hoe zwaar. De vraag is hoe hoog.',sv:'Fjädern visar hur tung. Frågan är hur hög.',da:'Fjederen viser, hvor tung. Spørgsmålet er, hvor høj.',no:'Fjæra viser hvor tung. Spørsmålet er hvor høy.',fi:'Jousi näyttää, kuinka painava. Kysymys on, kuinka korkea.'},
    hintTrySign:  {en:'Try the station with the same sign as the question.',de:'Probier die Station mit demselben Zeichen wie die Frage.',fr:'Essaie la station qui a le même signe que la question.',it:'Prova la stazione con lo stesso segno della domanda.',es:'Prueba la estación que tiene el mismo signo que la pregunta.',pt:'Tente a estação com o mesmo sinal da pergunta.',nl:'Probeer het station met hetzelfde teken als de vraag.',sv:'Prova stationen med samma tecken som frågan.',da:'Prøv stationen med samme tegn som spørgsmålet.',no:'Prøv stasjonen med samme tegn som spørsmålet.',fi:'Kokeile asemaa, jossa on sama merkki kuin kysymyksessä.'},
    hintTapFirst: {en:'Tap the big ones first.',de:'Tipp zuerst auf die großen Bilder.',fr:'Touche d’abord les grandes images.',it:'Prima tocca le immagini grandi.',es:'Primero toca las imágenes grandes.',pt:'Primeiro toque nas figuras grandes.',nl:'Tik eerst op de grote plaatjes.',sv:'Tryck först på de stora bilderna.',da:'Tryk først på de store billeder.',no:'Trykk først på de store bildene.',fi:'Napauta ensin isoja kuvia.'},
    hintTapFirstOne:{en:'Tap the big one first.',de:'Tipp zuerst auf das große Bild.',fr:'Touche d’abord la grande image.',it:'Prima tocca l’immagine grande.',es:'Primero toca la imagen grande.',pt:'Primeiro toque na figura grande.',nl:'Tik eerst op het grote plaatje.',sv:'Tryck först på den stora bilden.',da:'Tryk først på det store billede.',no:'Trykk først på det store bildet.',fi:'Napauta ensin isoa kuvaa.'},
    hintWindow:   {en:'The window shows it: big ones stick out, small ones fit inside.',de:'Das Fenster zeigt es: Große ragen heraus, kleine passen hinein.',fr:'La fenêtre le montre : les grandes dépassent, les petites tiennent dedans.',it:'La finestra lo mostra: le grandi escono fuori, le piccole ci stanno dentro.',es:'La ventana lo muestra: las grandes se salen, las pequeñas caben adentro.',pt:'A janela mostra: as grandes ficam para fora, as pequenas cabem dentro.',nl:'Het venster laat het zien: grote steken uit, kleine passen erin.',sv:'Fönstret visar det: stora sticker ut, små får plats inuti.',da:'Vinduet viser det: store stikker ud, små kan være indeni.',no:'Vinduet viser det: store stikker ut, små får plass inni.',fi:'Ikkuna näyttää sen: isot ulottuvat reunan yli, pienet mahtuvat sisään.'},
    hintLook:     {en:'Look at this one in the window.',de:'Schau dir dieses Bild im Fenster an.',fr:'Regarde celle-ci dans la fenêtre.',it:'Guarda questa nella finestra.',es:'Mira esta en la ventana.',pt:'Olhe esta na janela.',nl:'Kijk naar dit plaatje in het venster.',sv:'Titta på den här bilden i fönstret.',da:'Se på det her billede i vinduet.',no:'Se på dette bildet i vinduet.',fi:'Katso tätä kuvaa ikkunassa.'},
    okLong:       {en:'Yes! The track shows how long it is.',de:'Ja! Die Schiene zeigt, wie lang es ist.',fr:'Oui ! Le rail montre sa longueur.',it:'Sì! Il binario mostra la lunghezza.',es:'¡Sí! El riel muestra cuánto mide de largo.',pt:'Isso! O trilho mostra o comprimento.',nl:'Ja! De rails laat zien hoe lang het is.',sv:'Ja! Skenan visar hur lång den är.',da:'Ja! Skinnen viser, hvor lang den er.',no:'Ja! Skinnen viser hvor lang den er.',fi:'Kyllä! Kisko näyttää, kuinka pitkä se on.'},
    okTall:       {en:'Yes! The post shows how tall it is.',de:'Ja! Die Messlatte zeigt, wie hoch es ist.',fr:'Oui ! La toise montre sa hauteur.',it:'Sì! L’asta mostra l’altezza.',es:'¡Sí! El poste muestra cuánto mide de alto.',pt:'Isso! O poste mostra a altura.',nl:'Ja! De paal laat zien hoe hoog het is.',sv:'Ja! Stolpen visar hur hög den är.',da:'Ja! Stangen viser, hvor høj den er.',no:'Ja! Stolpen viser hvor høy den er.',fi:'Kyllä! Pylväs näyttää, kuinka korkea se on.'},
    okHeavy:      {en:'Yes! The spring shows how heavy it is.',de:'Ja! Die Federwaage zeigt, wie schwer es ist.',fr:'Oui ! Le peson montre son poids.',it:'Sì! La molla mostra quanto pesa.',es:'¡Sí! El resorte muestra cuánto pesa.',pt:'Isso! A mola mostra o peso.',nl:'Ja! De veer laat zien hoe zwaar het is.',sv:'Ja! Fjädern visar hur tung den är.',da:'Ja! Fjederen viser, hvor tung den er.',no:'Ja! Fjæra viser hvor tung den er.',fi:'Kyllä! Jousi näyttää, kuinka painava se on.'},
    okTwoWays:    {en:'You measured it two ways: {badge1} and {badge2}!',de:'Du hast es auf zwei Arten gemessen: {badge1} und {badge2}!',fr:'Tu as mesuré de deux façons : {badge1} et {badge2} !',it:'Hai misurato in due modi: {badge1} e {badge2}!',es:'¡Mediste de dos maneras: {badge1} y {badge2}!',pt:'Você mediu de dois jeitos: {badge1} e {badge2}!',nl:'Je hebt het op twee manieren gemeten: {badge1} en {badge2}!',sv:'Du mätte den på två sätt: {badge1} och {badge2}!',da:'Du målte den på to måder: {badge1} og {badge2}!',no:'Du målte den på to måter: {badge1} og {badge2}!',fi:'Mittasit sen kahdella tavalla: {badge1} ja {badge2}!'},
    okBigOne:     {en:'Yes, that is the big one!',de:'Ja, das ist das große Bild!',fr:'Oui, c’est la grande image !',it:'Sì, è quella grande!',es:'¡Sí, esa es la grande!',pt:'Isso, essa é a grande!',nl:'Ja, dat is het grote plaatje!',sv:'Ja, det är den stora bilden!',da:'Ja, det er det store billede!',no:'Ja, det er det store bildet!',fi:'Kyllä, tuo on iso kuva!'},
    okBigAll:     {en:'Yes, {n} big ones!',de:'Ja, {n} große Bilder!',fr:'Oui, {n} grandes images !',it:'Sì, {n} immagini grandi!',es:'¡Sí, {n} imágenes grandes!',pt:'Isso, {n} figuras grandes!',nl:'Ja, {n} grote plaatjes!',sv:'Ja, {n} stora bilder!',da:'Ja, {n} store billeder!',no:'Ja, {n} store bilder!',fi:'Kyllä, isoja kuvia on {n}!'},
    badgeLong:    {en:'long',de:'lang',fr:'long',it:'lungo',es:'largo',pt:'comprido',nl:'lang',sv:'lång',da:'lang',no:'lang',fi:'pitkä'},
    badgeShortLength:{en:'short',de:'kurz',fr:'court',it:'corto',es:'corto',pt:'curto',nl:'kort',sv:'kort',da:'kort',no:'kort',fi:'lyhyt'},
    badgeTall:    {en:'tall',de:'hoch',fr:'haut',it:'alto',es:'alto',pt:'alto',nl:'hoog',sv:'hög',da:'høj',no:'høy',fi:'korkea'},
    badgeShortHeight:{en:'short',de:'niedrig',fr:'bas',it:'basso',es:'bajo',pt:'baixo',nl:'laag',sv:'låg',da:'lav',no:'lav',fi:'matala'},
    badgeHeavy:   {en:'heavy',de:'schwer',fr:'lourd',it:'pesante',es:'pesado',pt:'pesado',nl:'zwaar',sv:'tung',da:'tung',no:'tung',fi:'painava'},
    badgeLight:   {en:'light',de:'leicht',fr:'léger',it:'leggero',es:'ligero',pt:'leve',nl:'licht',sv:'lätt',da:'let',no:'lett',fi:'kevyt'},
    badgeLongF:   {en:'long',de:'lang',fr:'longue',it:'lunga',es:'larga',pt:'comprida',nl:'lang',sv:'lång',da:'lang',no:'lang',fi:'pitkä'},
    badgeShortLengthF:{en:'short',de:'kurz',fr:'courte',it:'corta',es:'corta',pt:'curta',nl:'kort',sv:'kort',da:'kort',no:'kort',fi:'lyhyt'},
    badgeTallF:   {en:'tall',de:'hoch',fr:'haute',it:'alta',es:'alta',pt:'alta',nl:'hoog',sv:'hög',da:'høj',no:'høy',fi:'korkea'},
    badgeShortHeightF:{en:'short',de:'niedrig',fr:'basse',it:'bassa',es:'baja',pt:'baixa',nl:'laag',sv:'låg',da:'lav',no:'lav',fi:'matala'},
    badgeHeavyF:  {en:'heavy',de:'schwer',fr:'lourde',it:'pesante',es:'pesada',pt:'pesada',nl:'zwaar',sv:'tung',da:'tung',no:'tung',fi:'painava'},
    badgeLightF:  {en:'light',de:'leicht',fr:'légère',it:'leggera',es:'ligera',pt:'leve',nl:'licht',sv:'lätt',da:'let',no:'lett',fi:'kevyt'},
    bayTrack:     {en:'The track: it measures how long',de:'Die Schiene: Sie misst, wie lang',fr:'Le rail : il mesure la longueur',it:'Il binario: misura la lunghezza',es:'El riel: mide el largo',pt:'O trilho: mede o comprimento',nl:'De rails: meet hoe lang',sv:'Skenan: den mäter hur lång',da:'Skinnen: den måler, hvor lang',no:'Skinnen: den måler hvor lang',fi:'Kisko: se mittaa, kuinka pitkä'},
    bayPost:      {en:'The post: it measures how tall',de:'Die Messlatte: Sie misst, wie hoch',fr:'La toise : elle mesure la hauteur',it:'L’asta: misura l’altezza',es:'El poste: mide el alto',pt:'O poste: mede a altura',nl:'De paal: meet hoe hoog',sv:'Stolpen: den mäter hur hög',da:'Stangen: den måler, hvor høj',no:'Stolpen: den måler hvor høy',fi:'Pylväs: se mittaa, kuinka korkea'},
    baySpring:    {en:'The spring: it measures how heavy',de:'Die Federwaage: Sie misst, wie schwer',fr:'Le peson : il mesure le poids',it:'La molla: misura il peso',es:'El resorte: mide el peso',pt:'A mola: mede o peso',nl:'De veer: meet hoe zwaar',sv:'Fjädern: den mäter hur tung',da:'Fjederen: den måler, hvor tung',no:'Fjæra: den måler hvor tung',fi:'Jousi: se mittaa, kuinka painava'},
    plinth:       {en:'The picture: drag it to a station',de:'Das Bild: Zieh es auf eine Station',fr:'L’image : fais-la glisser sur une station',it:'L’immagine: trascinala su una stazione',es:'La imagen: arrástrala a una estación',pt:'A figura: arraste para uma estação',nl:'Het plaatje: sleep het naar een station',sv:'Bilden: dra den till en station',da:'Billedet: træk det over på en station',no:'Bildet: dra det til en stasjon',fi:'Kuva: vedä se asemalle'},
    question:     {en:'The question',de:'Die Frage',fr:'La question',it:'La domanda',es:'La pregunta',pt:'A pergunta',nl:'De vraag',sv:'Frågan',da:'Spørgsmålet',no:'Spørsmålet',fi:'Kysymys'},
    album:        {en:'Measure cards',de:'Messkarten',fr:'Cartes de mesure',it:'Schede di misura',es:'Tarjetas de medidas',pt:'Cartões de medida',nl:'Meetkaarten',sv:'Mätkort',da:'Målekort',no:'Målekort',fi:'Mittakortit'},
    sizeWindow:   {en:'Size window',de:'Größenfenster',fr:'Fenêtre de taille',it:'Finestra della grandezza',es:'Ventana de tamaños',pt:'Janela do tamanho',nl:'Groottevenster',sv:'Storleksfönster',da:'Størrelsesvindue',no:'Størrelsesvindu',fi:'Kokoikkuna'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Controlla',es:'Revisar',pt:'Conferir',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    play:         {en:'Try anything',de:'Alles ausprobieren',fr:'Tout essayer',it:'Prova tutto',es:'Probar de todo',pt:'Testar tudo',nl:'Alles proberen',sv:'Prova allt',da:'Prøv alt',no:'Prøv alt',fi:'Kokeile mitä vain'},
    playBack:     {en:'Back to the questions',de:'Zurück zu den Fragen',fr:'Retour aux questions',it:'Torna alle domande',es:'Volver a las preguntas',pt:'Voltar às perguntas',nl:'Terug naar de vragen',sv:'Tillbaka till frågorna',da:'Tilbage til spørgsmålene',no:'Tilbake til spørsmålene',fi:'Takaisin kysymyksiin'},
    playNote:     {en:'Put any picture on any station and watch what it measures.',de:'Leg ein Bild auf eine Station und schau, was sie misst.',fr:'Pose une image sur une station et regarde ce qu’elle mesure.',it:'Metti un’immagine su una stazione e guarda che cosa misura.',es:'Pon una imagen en una estación y mira qué mide.',pt:'Coloque uma figura numa estação e veja o que ela mede.',nl:'Zet een plaatje op een station en kijk wat het meet.',sv:'Lägg en bild på en station och se vad den mäter.',da:'Læg et billede på en station, og se, hvad den måler.',no:'Legg et bilde på en stasjon og se hva den måler.',fi:'Laita kuva asemalle ja katso, mitä se mittaa.'},
    setMeasure:   {en:'Measure',de:'Messen',fr:'Mesurer',it:'Misurare',es:'Medir',pt:'Medir',nl:'Meten',sv:'Mäta',da:'Måle',no:'Måle',fi:'Mittaus'},
    mStations:    {en:'Long, tall, heavy',de:'Lang, hoch, schwer',fr:'Long, haut, lourd',it:'Lungo, alto, pesante',es:'Largo, alto, pesado',pt:'Comprido, alto, pesado',nl:'Lang, hoog, zwaar',sv:'Lång, hög, tung',da:'Lang, høj, tung',no:'Lang, høy, tung',fi:'Pitkä, korkea, painava'},
    mSize:        {en:'Big or small',de:'Groß oder klein',fr:'Grand ou petit',it:'Grande o piccolo',es:'Grande o pequeño',pt:'Grande ou pequeno',nl:'Groot of klein',sv:'Stor eller liten',da:'Stor eller lille',no:'Stor eller liten',fi:'Iso vai pieni'},
    setLevel:     {en:'Level',de:'Stufe',fr:'Niveau',it:'Livello',es:'Nivel',pt:'Nível',nl:'Niveau',sv:'Nivå',da:'Niveau',no:'Nivå',fi:'Taso'},
    lvOne:        {en:'Easier',de:'Leichter',fr:'Plus facile',it:'Più facile',es:'Más fácil',pt:'Mais fácil',nl:'Makkelijker',sv:'Lättare',da:'Lettere',no:'Lettere',fi:'Helpompi'},
    lvTwo:        {en:'Harder',de:'Schwerer',fr:'Plus difficile',it:'Più difficile',es:'Más difícil',pt:'Mais difícil',nl:'Moeilijker',sv:'Svårare',da:'Sværere',no:'Vanskeligere',fi:'Vaikeampi'}
  },

  defaults: { measure: 'stations', level: 'one' },
  settings: [
    { key: 'measure', type: 'choice', labelKey: 'setMeasure', options: [{ value: 'stations', labelKey: 'mStations' }, { value: 'size', labelKey: 'mSize' }] },
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'one', labelKey: 'lvOne' }, { value: 'two', labelKey: 'lvTwo' }] }
  ],

  OK_MS: 500, BACK_MS: 1500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._idle = null; this._sel = false; this._fx = {}; this._faint = {}; this._album = []; this._win = null;
    injectMeasureStationsCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var st = self._cur(); if (!st || st.mode !== 'stations') return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (!self._sel) return;
      var i = MeasureStationsCore.BAYS.indexOf(self._focusBay || 'track');
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') { i = (i + (ev.key === 'ArrowRight' ? 1 : 2)) % 3; self._focusBay = MeasureStationsCore.BAYS[i]; var b = self._bays[self._focusBay]; if (b) b.focus(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers(); this._stopIdle();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._key();
    if (this._poolKey !== key) { this._pool = null; this._order = null; this._playing = false; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _lang: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _pic: function (noun) { var o = MeasureStationsCore.OBJ[noun]; return '/image-library-webp/themes/' + encodeURIComponent(o.dir) + '/' + noun + '@2x.webp'; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _key: function () { return MeasureStationsCore.measure(this._set('measure')) + '.' + MeasureStationsCore.harder(this._set('level')); },
  _ensurePool: function () { var key = this._key(); if (!this._pool || this._poolKey !== key) { var p = key.split('.'); this._pool = MeasureStationsCore.rounds(p[0], p[1]); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = MeasureStationsCore, self = this;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = C.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = C.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]], mirror = (this._curPass % 2) === 1;
    var t = function (k) { return self.api && self.api.t ? self.api.t(k) : k; };
    var promptKey = r.mode === 'size' ? (r.two ? 'promptBigAll' : 'promptBigOne') : r.two ? 'promptTwoWays' : C.PROMPT[r.qs[0]];
    var celebrateKey = r.mode === 'size' ? (r.two ? 'okBigAll' : 'okBigOne') : r.two ? 'okTwoWays' : { long: 'okLong', tall: 'okTall', heavy: 'okHeavy' }[r.qs[0]];
    var args = {};
    if (r.mode === 'size') args.n = (mirror ? r.row.split('').reverse().join('') : r.row).split('').filter(function (c) { return c === 'B'; }).length;
    if (r.two && r.mode === 'stations') { args.badge1 = t(C.badge(r.noun, r.qs[0], this._lang())); args.badge2 = t(C.badge(r.noun, r.qs[1], this._lang())); }
    return {
      id: 'measure-stations.' + r.id,
      promptKey: promptKey,
      promptArgs: args,
      celebrateKey: celebrateKey,
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._round = r; tool._playing = false; tool._sel = false; tool._fx = {}; tool._faint = {}; tool._win = null; tool._busy = false;
        tool.st = C.newState(r, { mirror: mirror });
        tool._armIdle();
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },
  _armIdle: function () {
    var self = this; this._stopIdle();
    if (this.FAST) return;
    this._idle = setTimeout(function () { var st = self._cur(); if (st && !st.done && !st.explore && st.mode === 'stations' && !st.placed && !st.last) { st.last = { result: 'idle' }; self._paint(); } }, MeasureStationsCore.IDLE_MS);
  },
  _stopIdle: function () { if (this._idle) { clearTimeout(this._idle); this._idle = null; } },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = MeasureStationsCore.rounds('stations', 'one')[0]; this._round = r0; this.st = MeasureStationsCore.newState(r0); }
    this._render2();
    this._watchWidth();
  },
  _render2: function () {
    var api = this.api, self = this, st = this._cur();
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'ms-wrap'); this._wrap = wrap;
    this._L = MeasureStationsCore.layout(this._width());
    wrap.classList.add(this._L.mode === 'wide' ? 'is-wide' : 'is-narrow');
    var step = api.el('div', 'ms-step'); step.setAttribute('aria-live', 'polite'); this._step = step; wrap.appendChild(step);
    if (st.mode === 'stations') this._buildStations(wrap); else this._buildSize(wrap);
    var note = api.el('div', 'ms-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'ms-actions');
    var chk = api.el('button', 'ms-check'); chk.type = 'button'; chk.addEventListener('click', function () { self._sizeCheck(); }); this._checkBtn = chk; row.appendChild(chk);
    var play = api.el('button', 'ms-tool ms-playbtn'); play.type = 'button'; play.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = play; row.appendChild(play);
    wrap.appendChild(row);
    stage.appendChild(wrap);
    this._applyVars();
    this._paint();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _applyVars: function () {
    var L = this._L, w = this._wrap;
    w.style.setProperty('--ms-bayw', L.bayW + 'px'); w.style.setProperty('--ms-bayh', L.bayH + 'px'); w.style.setProperty('--ms-gap', L.gap + 'px');
    w.style.setProperty('--ms-obj', L.obj + 'px'); w.style.setProperty('--ms-card', L.card + 'px'); w.style.setProperty('--ms-pan', L.pan + 'px');
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

  /* the icons: ↔ long (over a floor), ↕ tall (standing on a floor), heavy (a weight under a hook) */
  _icon: function (attr) {
    if (attr === 'long') return '<svg viewBox="0 0 64 64" aria-hidden="true"><line x1="6" y1="50" x2="58" y2="50" class="ms-floor"/><path d="M10 32 H54 M10 32 l9 -8 M10 32 l9 8 M54 32 l-9 -8 M54 32 l-9 8" class="ms-arrow"/></svg>';
    if (attr === 'tall') return '<svg viewBox="0 0 64 64" aria-hidden="true"><line x1="10" y1="58" x2="54" y2="58" class="ms-floor"/><path d="M32 8 V52 M32 8 l-8 9 M32 8 l8 9 M32 52 l-8 -9 M32 52 l8 -9" class="ms-arrow"/></svg>';
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4 v10" class="ms-arrow"/><circle cx="32" cy="17" r="4" class="ms-hook"/><path d="M18 26 H46 L52 58 H12 Z" class="ms-weight"/><path d="M32 34 V50 M32 50 l-6 -6 M32 50 l6 -6" class="ms-arrow ms-arrow-w"/></svg>';
  },
  /* a library picture placed by its INK: rotation rot, ink box (x0,y0,x1,y1) relative to the picture's centre at
     256 units; scale k px/unit; the ink box's left edge at `left` and its bottom at `bottom` (both px, in the parent) */
  _place: function (noun, pose, k, left, bottom, cls, vars) {
    var o = MeasureStationsCore.OBJ[noun], p = o[pose], S = 256 * k;
    var cx = left - p[1] * k, cy = bottom - p[4] * k;
    return '<img class="ms-img' + (cls ? ' ' + cls : '') + '" alt="" draggable="false" src="' + this._pic(noun) + '" style="' + (vars || '') + 'width:' + S.toFixed(1) + 'px;height:' + S.toFixed(1) + 'px;left:' + (cx - S / 2).toFixed(1) + 'px;top:' + (cy - S / 2).toFixed(1) + 'px;transform:rotate(' + p[0] + 'deg)">';
  },
  _inkSize: function (noun, pose, k) { var p = MeasureStationsCore.OBJ[noun][pose]; return { w: (p[3] - p[1]) * k, h: (p[4] - p[2]) * k }; },

  _buildStations: function (wrap) {
    var api = this.api, self = this;
    var top = api.el('div', 'ms-top');
    var q = api.el('div', 'ms-qcard'); q.setAttribute('role', 'img'); this._qcard = q; top.appendChild(q);
    var plinth = api.el('button', 'ms-plinth'); plinth.type = 'button'; this._plinth = plinth; this._bindPlinth(plinth); top.appendChild(plinth);
    var album = api.el('div', 'ms-album'); album.setAttribute('role', 'list'); this._albumEl = album; top.appendChild(album);
    wrap.appendChild(top);
    var tray = api.el('div', 'ms-tray'); this._tray = tray; wrap.appendChild(tray);
    var bays = api.el('div', 'ms-bays'); this._baysEl = bays; this._bays = {};
    MeasureStationsCore.BAYS.forEach(function (b) {
      var el = api.el('button', 'ms-bay ms-' + b); el.type = 'button'; el.setAttribute('data-bay', b);
      el.innerHTML = '<span class="ms-sign">' + self._icon(MeasureStationsCore.ATTR[b]) + '</span><span class="ms-rig"></span><span class="ms-flag">' + self._icon(MeasureStationsCore.ATTR[b]) + '</span>';
      el.addEventListener('click', function () { self._drop(b); });
      bays.appendChild(el); self._bays[b] = el;
    });
    wrap.appendChild(bays);
  },
  _buildSize: function (wrap) {
    var api = this.api, self = this;
    var shelf = api.el('div', 'ms-shelf'); this._shelf = shelf;
    var win = api.el('div', 'ms-window'); win.setAttribute('aria-hidden', 'true'); this._windowEl = win;
    shelf.appendChild(win);
    wrap.appendChild(shelf);
    void self;
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, C = MeasureStationsCore;
    if (!st || !this._wrap) return;
    var w = this._wrap;
    w.classList.toggle('is-play', !!st.explore); w.classList.toggle('is-done', !!st.done); w.classList.toggle('is-two', !!st.two);
    if (st.mode === 'stations') this._paintStations(st); else this._paintSize(st);
    /* the step line: the two-ways round's current question */
    var stepText = st.mode === 'stations' && st.two && !st.done && !st.explore ? t(C.PROMPT[C.question(st)]) : '';
    if (this._step.textContent !== stepText) this._step.textContent = stepText;
    this._step.hidden = !stepText;
    /* the note */
    var h = st.explore ? { key: 'playNote' } : C.hint(st), ok = st.explore ? null : C.success(st), text = '';
    if (ok) {
      if (ok.attrs) text = interp(t('okTwoWays'), { badge1: t(C.badge(st.noun, ok.attrs[0], this._lang())), badge2: t(C.badge(st.noun, ok.attrs[1], this._lang())) });
      else text = interp(t(ok.key), ok.args);
    } else if (h) {
      var key = h.key === 'hintTapFirst' && !st.two ? 'hintTapFirstOne' : h.key;
      text = t(key);
    }
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !ok && !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!ok);
    this._checkBtn.textContent = t('check'); this._checkBtn.hidden = st.mode !== 'size' || !!st.done; this._checkBtn.disabled = !!this._busy;
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play'); this._playBtn.hidden = st.mode !== 'stations'; this._playBtn.disabled = !!this._busy;
  },
  _paintStations: function (st) {
    var t = this.api.t, C = MeasureStationsCore, L = this._L, self = this, q = C.question(st), noun = st.noun;
    /* the question card */
    this._qcard.hidden = !!st.explore;
    if (q) { var qh = this._icon(q); if (this._qcard.getAttribute('data-q') !== q) { this._qcard.innerHTML = qh; this._qcard.setAttribute('data-q', q); } this._qcard.setAttribute('aria-label', t('question') + ': ' + t(C.PROMPT[q])); }
    this._qcard.classList.toggle('is-pulse', !!(st.last && st.last.result === 'wrong'));
    this._qcard.classList.toggle('is-ok', !!(st.placed && st.last && st.last.result === 'ok'));
    this._qcard.setAttribute('data-attr', q || '');
    /* the object on its plinth (when it is not on a station) */
    var onPlinth = !st.placed || this._fx.back;
    var ink = this._inkSize(noun, 'rest', 1), kP = (L.obj - 12) / Math.max(ink.w, ink.h);
    var pi = this._inkSize(noun, 'rest', kP);
    var ph = onPlinth ? this._place(noun, 'rest', kP, (L.obj + 8 - pi.w) / 2, L.obj - 6) : '';
    if (this._plinth.getAttribute('data-h') !== ph + (this._sel ? 's' : '')) { this._plinth.innerHTML = ph + '<i class="ms-base"></i>'; this._plinth.setAttribute('data-h', ph + (this._sel ? 's' : '')); }
    this._plinth.classList.toggle('is-sel', !!this._sel); this._plinth.disabled = !!st.done;
    this._plinth.setAttribute('aria-label', t('plinth'));
    /* the album (two-ways) */
    var ah = '';
    if (st.two || this._album.length) this._album.slice(-3).forEach(function (a) { ah += '<span class="ms-acard" role="listitem"><img alt="" src="' + self._pic(a.noun) + '"><b>' + esc(t(a.b1)) + '</b><b>' + esc(t(a.b2)) + '</b></span>'; });
    if (st.two) for (var e = Math.min(3, this._album.length); e < 3; e++) ah += '<span class="ms-acard is-empty"></span>';
    if (this._albumEl.getAttribute('data-h') !== ah) { this._albumEl.innerHTML = ah; this._albumEl.setAttribute('data-h', ah); }
    this._albumEl.hidden = !ah || !!st.explore; this._albumEl.setAttribute('aria-label', t('album'));
    /* the free-play tray */
    var th = '';
    if (st.explore) C.PLAY.forEach(function (n) { th += '<button type="button" class="ms-chip' + (n === noun ? ' is-on' : '') + '" data-n="' + n + '"><img alt="" src="' + self._pic(n) + '"></button>'; });
    if (this._tray.getAttribute('data-h') !== th) {
      this._tray.innerHTML = th; this._tray.setAttribute('data-h', th);
      [].forEach.call(this._tray.querySelectorAll('.ms-chip'), function (b) { b.addEventListener('click', function () { self._play.noun = b.getAttribute('data-n'); self._play.placed = null; self._faint = {}; self._paint(); }); b.setAttribute('aria-label', b.getAttribute('data-n')); });
    }
    this._tray.hidden = !st.explore;
    /* the stations */
    var gl = C.glow(st);
    C.BAYS.forEach(function (b) {
      var el = self._bays[b], here = st.placed === b && !self._fx.back, rig = el.querySelector('.ms-rig');
      var key = b + '|' + noun + '|' + (here ? 'on' : self._faint[b] ? 'faint' : 'off') + '|' + L.bayW + '|' + (st.placed === b && st.last ? st.last.result : '');
      if (rig.getAttribute('data-k') !== key) { rig.innerHTML = self._rig(b, here ? noun : null, self._faint[b]); rig.setAttribute('data-k', key); if (here && !self.FAST) self._animate(el, b); }
      el.classList.toggle('is-here', here);
      el.classList.toggle('is-glow', gl === b);
      el.classList.toggle('is-flag', here && !!(st.last && st.last.result === 'wrong'));
      el.classList.toggle('is-right', here && !!(st.last && st.last.result === 'ok'));
      el.disabled = !!st.done || !!self._busy;
      el.setAttribute('aria-label', t(b === 'track' ? 'bayTrack' : b === 'post' ? 'bayPost' : 'baySpring'));
    });
  },
  /* one station's apparatus, with the object on it (or its faint last bar) */
  _rig: function (bay, noun, faint) {
    var C = MeasureStationsCore, L = this._L, W = L.bayW, H = L.bayH, h = '', narrow = L.mode === 'narrow';
    var k = noun ? C.scaleFor(noun, L) : 0;
    if (bay === 'track') {
      var railY = H - (narrow ? 26 : 34), stopX = narrow ? 6 : 10;
      h += '<i class="ms-rail" style="left:' + stopX + 'px;width:' + L.rail + 'px;top:' + railY + 'px"></i><i class="ms-stop" style="left:' + (stopX - 4) + 'px;top:' + (railY - 18) + 'px"></i>';
      var len = noun ? C.shown(noun, 'track', k).bar : (faint ? faint.bar : 0);
      if (noun) h += this._place(noun, 'lie', k, stopX + 4, railY - 2, 'ms-tip', '--ms-r0:' + C.OBJ[noun].rest[0] + 'deg;--ms-r1:' + C.OBJ[noun].lie[0] + 'deg;');
      if (len) h += '<i class="ms-bar ms-bar-long' + (noun ? '' : ' is-faint') + '" style="left:' + (stopX + 4) + 'px;top:' + (railY + 8) + 'px;width:' + len.toFixed(1) + 'px"></i>';
      if (noun) h += '<i class="ms-slider" style="left:' + (stopX + 4 + len - 6).toFixed(1) + 'px;top:' + (railY - 6) + 'px"></i>';
    } else if (bay === 'post') {
      var baseY = H - (narrow ? 14 : 18), postX = narrow ? 12 : 22, postTop = baseY - L.postH;
      h += '<i class="ms-postbar" style="left:' + postX + 'px;top:' + postTop + 'px;height:' + L.postH + 'px"></i><i class="ms-base2" style="top:' + baseY + 'px"></i>';
      var hh = noun ? C.shown(noun, 'post', k).bar : (faint ? faint.bar : 0);
      if (noun) { var iw = this._inkSize(noun, 'rest', k).w, ox = Math.max(postX + 14, (W + postX + 10 - iw) / 2); h += this._place(noun, 'rest', k, ox, baseY); }
      if (hh) h += '<i class="ms-bar ms-bar-tall' + (noun ? '' : ' is-faint') + '" style="left:' + (postX + 1) + 'px;top:' + (baseY - hh).toFixed(1) + 'px;height:' + hh.toFixed(1) + 'px"></i>';
      if (noun) h += '<i class="ms-cap" style="left:' + (postX - 6) + 'px;top:' + (baseY - hh - 6).toFixed(1) + 'px;width:' + (W - postX - 4) + 'px"></i>';
    } else {
      var hangY = narrow ? 18 : 22, coil0 = narrow ? 34 : 48, st2 = noun ? C.stretch(noun, narrow) : (faint ? faint.bar : 0);
      var panY = hangY + coil0 + st2;
      h += '<i class="ms-hanger" style="top:' + (hangY - 8) + 'px"></i>';
      h += '<svg class="ms-coil" viewBox="0 0 40 100" preserveAspectRatio="none" style="top:' + hangY + 'px;height:' + (coil0 + st2) + 'px"><path d="M20 0 L20 6 ' + [1, 2, 3, 4, 5, 6, 7].map(function (i) { return 'L' + (i % 2 ? 34 : 6) + ' ' + (6 + i * 12); }).join(' ') + ' L20 100"/></svg>';
      h += '<i class="ms-pan" style="top:' + panY + 'px"></i>';
      var scaleX = W - (narrow ? 18 : 26), sh = H - hangY - 30;
      h += '<i class="ms-scale" style="left:' + scaleX + 'px;top:' + hangY + 'px;height:' + sh + 'px"></i><i class="ms-pointer' + (noun ? '' : faint ? ' is-faint' : '') + '" style="left:' + (scaleX - 8) + 'px;top:' + (hangY + 8 + st2 * (sh - 20) / 62).toFixed(1) + 'px"></i>';
      if (noun) { var o = C.OBJ[noun], kk = L.pan / Math.max(o.rest[3] - o.rest[1], o.rest[4] - o.rest[2]), pw = (o.rest[3] - o.rest[1]) * kk; h += this._place(noun, 'rest', kk, (W - 14 - pw) / 2, panY + 2, 'ms-spring-img'); }
    }
    return h;
  },
  /* the measuring motions: the tip onto the track, the cap onto the post, the spring's bob */
  _animate: function (el, bay) {
    el.classList.remove('is-anim'); void el.offsetWidth; el.classList.add('is-anim');
    if (bay === 'track') this.api.sound(520); else if (bay === 'post') this.api.sound(180); else this.api.sound(260);
  },

  _paintSize: function (st) {
    var t = this.api.t, C = MeasureStationsCore, L = this._L, self = this, item = st.item, n = st.row.length;
    /* the big picture: as large as the design asks, but one row of up to six fits the stage (phones: rows of three) */
    var narrow = L.mode === 'narrow', W = this._width(), perRow = n > 3 ? 3 : n;
    var big = Math.min(st.two ? (narrow ? 90 : 120) : (narrow ? 124 : 176), Math.floor((W - (perRow - 1) * 10) / perRow) - 12), cw = Math.max(88, big + 12);
    var h = '';
    st.row.forEach(function (isBig, i) {
      var side = isBig ? big : big * C.SMALL, cls = 'ms-card' + (st.rings.indexOf(i) >= 0 ? ' is-ring' : '');
      var fx = self._win && self._win.res;
      if (fx && fx.done.indexOf(i) >= 0) cls += isBig ? ' is-poke' : ' is-fit';
      if (fx && st.last && st.last.result === 'miss' && st.last.wrongSmall.indexOf(i) >= 0 && fx.done.indexOf(i) >= 0) cls += ' is-loose';
      if (fx && st.last && st.last.result === 'miss' && st.last.missedBig.indexOf(i) >= 0 && fx.done.indexOf(i) >= 0) cls += ' is-missed';
      if (st.done && isBig) cls += ' is-win';
      h += '<button type="button" class="' + cls + '" data-i="' + i + '" style="width:' + cw + 'px;height:' + (big + 16) + 'px">' + self._sizePic(item, side, big) + '</button>';
    });
    var cards = this._shelf.querySelectorAll('.ms-card');
    var key = h + '|' + (this._win ? this._win.at : '');
    if (this._shelf.getAttribute('data-h') !== key) {
      [].forEach.call(cards, function (c) { c.remove(); });
      this._shelf.insertAdjacentHTML('beforeend', h); this._shelf.setAttribute('data-h', key);
      [].forEach.call(this._shelf.querySelectorAll('.ms-card'), function (b) { b.addEventListener('click', function () { self._ring(+b.getAttribute('data-i')); }); });
    }
    this._shelf.classList.toggle('is-pair', !st.two);
    this._shelf.style.maxWidth = (perRow * cw + (perRow - 1) * 10) + 'px';
    [].forEach.call(this._shelf.querySelectorAll('.ms-card'), function (b, i) { b.disabled = !!st.done || !!self._busy; b.setAttribute('aria-pressed', st.rings.indexOf(i) >= 0 ? 'true' : 'false'); b.setAttribute('aria-label', (st.rings.indexOf(i) >= 0 ? '✓ ' : '') + String(i + 1)); });
    /* the window: parked over the card it visits */
    var win = this._windowEl, at = this._win ? this._win.at : -1, side = C.windowSide(big);
    this._bigPx = big;
    win.style.width = side.toFixed(1) + 'px'; win.style.height = side.toFixed(1) + 'px';
    if (at >= 0) {
      var c = this._shelf.querySelectorAll('.ms-card')[at];
      if (c) { var sr = this._shelf.getBoundingClientRect(), cr = c.getBoundingClientRect(); win.style.left = (cr.left - sr.left + cr.width / 2 - side / 2).toFixed(1) + 'px'; var own = st.row[at] ? big : big * C.SMALL; win.style.top = (cr.top - sr.top + 8 + big - own / 2 - side / 2).toFixed(1) + 'px'; }
      win.classList.add('is-on');
    } else { win.classList.remove('is-on'); win.style.left = '-' + (side + 20) + 'px'; win.style.top = '8px'; }
    win.setAttribute('aria-label', t('sizeWindow'));
  },
  /* a picture (or a drawn shape) whose INK is `side` px, centred on the card's picture box (`box` px) */
  _sizePic: function (item, side, box) {
    var C = MeasureStationsCore;
    if (C.isShape(item)) {
      var pth = { circle: '<circle cx="50" cy="50" r="50"/>', square: '<rect x="0" y="0" width="100" height="100" rx="6"/>', triangle: '<path d="M50 0 L100 100 L0 100 Z"/>', star: '<path d="M50 0 L61.8 34.5 L97.6 34.5 L68.8 55.9 L79.4 90.5 L50 69.1 L20.6 90.5 L31.2 55.9 L2.4 34.5 L38.2 34.5 Z"/>', hexagon: '<path d="M25 3 L75 3 L100 50 L75 97 L25 97 L0 50 Z"/>' }[item];
      return '<svg class="ms-shape" viewBox="0 0 100 100" aria-hidden="true" style="width:' + side.toFixed(1) + 'px;height:' + side.toFixed(1) + 'px;left:calc(50% - ' + (side / 2).toFixed(1) + 'px);top:' + (8 + box - side).toFixed(1) + 'px">' + pth + '</svg>';
    }
    var o = C.OBJ[item], inkSide = C.inkSide(item), k = side / inkSide, S = 256 * k;
    var icx = (o.rest[1] + o.rest[3]) / 2 * k, icy = (o.rest[2] + o.rest[4]) / 2 * k;
    return '<img class="ms-img" alt="" draggable="false" src="' + this._pic(item) + '" style="width:' + S.toFixed(1) + 'px;height:' + S.toFixed(1) + 'px;left:calc(50% - ' + (S / 2 + icx).toFixed(1) + 'px);top:' + (8 + box - side / 2 - S / 2 - icy).toFixed(1) + 'px">';
  },

  /* ---------------- the hand ---------------- */
  _bindPlinth: function (el) {
    var self = this, drag = null;
    el.addEventListener('pointerdown', function (ev) {
      if (el.disabled) return;
      drag = { x: ev.clientX, y: ev.clientY, moved: false, ghost: null };
      try { el.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
    });
    el.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      if (!drag.moved && Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) < 8) return;
      if (!drag.moved) { drag.moved = true; var img = el.querySelector('.ms-img'); if (img) { var g = img.cloneNode(true); g.className = 'ms-ghost'; g.style.left = '0'; g.style.top = '0'; document.body.appendChild(g); drag.ghost = g; drag.w = parseFloat(img.style.width); } el.classList.add('is-lifted'); }
      if (drag.ghost) drag.ghost.style.transform = 'translate(' + (ev.clientX - drag.w / 2) + 'px,' + (ev.clientY - drag.w / 2) + 'px) rotate(' + MeasureStationsCore.OBJ[self._cur().noun].rest[0] + 'deg)';
    });
    var end = function (ev, cancel) {
      if (!drag) return;
      var d = drag; drag = null; el.classList.remove('is-lifted');
      if (d.ghost) d.ghost.remove();
      if (!d.moved) { if (!cancel) { self._sel = !self._sel; self._paint(); } return; }
      if (cancel) return;
      var hit = null;
      MeasureStationsCore.BAYS.forEach(function (b) { var r = self._bays[b].getBoundingClientRect(); if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) hit = b; });
      if (hit) self._drop(hit);
    };
    el.addEventListener('pointerup', function (ev) { end(ev, false); });
    el.addEventListener('pointercancel', function (ev) { end(ev, true); });
    el.addEventListener('click', function (ev) { if (ev.detail === 0) { self._sel = !self._sel; self._paint(); } });
  },
  _drop: function (bay) {
    var st = this._cur(), self = this, C = MeasureStationsCore;
    if (!st || st.done || this._busy) return;
    this._stopIdle();
    /* the previous measurement stays faint on its station */
    if (st.placed && st.placed !== bay) { var pb = st.placed, k0 = C.scaleFor(st.noun, this._L); this._faint[pb] = { bar: pb === 'spring' ? C.stretch(st.noun, this._L.mode === 'narrow') : C.shown(st.noun, pb, k0).bar }; }
    delete this._faint[bay];
    this._fx.back = false; this._sel = false;
    var res = C.drop(st, bay);
    if (!res) return;
    if (!st.explore) this.api.track('check', { id: st.id, result: res.result, bay: bay });
    this._paint();
    if (st.explore) return;
    if (res.result === 'wrong') { this.api.sound(220); this._busy = true; this._later(function () { self._busy = false; self._fx.back = true; self._paint(); }, this._ms(this.BACK_MS)); return; }
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    if (!st.done) { this._busy = true; this._later(function () { self._busy = false; self._fx.back = true; var k1 = C.scaleFor(st.noun, self._L); self._faint[bay] = { bar: bay === 'spring' ? C.stretch(st.noun, self._L.mode === 'narrow') : C.shown(st.noun, bay, k1).bar }; st.placed = null; self._paint(); }, this._ms(this.BACK_MS)); return; }
    if (st.two) this._album.push({ noun: st.noun, b1: C.badge(st.noun, st.answers[0], this._lang()), b2: C.badge(st.noun, st.answers[1], this._lang()) });
    this._win2();
  },
  _ring: function (i) {
    var st = this._cur(); if (!st || st.done || this._busy) return;
    if (!MeasureStationsCore.ring(st, i)) return;
    this._win = null; this.api.sound(st.rings.indexOf(i) >= 0 ? 440 : 330); this._paint();
  },
  /* Check: the window glides from card to card, then the verdict */
  _sizeCheck: function () {
    var st = this.st, self = this, C = MeasureStationsCore;
    if (!st || st.done || this._busy || st.mode !== 'size') return;
    var res = C.sizeCheck(st);
    if (!res) return;
    this.api.track('check', { id: st.id, result: res.result });
    if (res.result === 'empty') { this.api.sound(240); this._paint(); return; }
    var n = st.row.length, stop = res.result === 'miss' && st.help >= 2 ? res.first : n - 1;
    this._win = { at: 0, res: { done: [] } };
    this._busy = true;
    var visit = function (i) {
      self._win.at = i; self._win.res.done.push(i);
      self.api.sound(st.row[i] ? 523 : 392);
      self._paint();
      if (i < stop) self._later(function () { visit(i + 1); }, self._ms(540));
      else self._later(function () { self._busy = false; self._paint(); if (res.result === 'ok') self._win2(); else self.api.sound(220); }, self._ms(300));
    };
    if (this.FAST) { for (var j = 0; j <= stop; j++) this._win.res.done.push(j); this._win.at = stop; this._busy = false; this._paint(); if (res.result === 'ok') this._win2(); return; }
    visit(0);
  },
  _win2: function () {
    var self = this, st = this.st;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    if (st && st.done) { this._busy = true; this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS)); }
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy) return;
    this._sel = false; this._faint = {}; this._fx = {};
    if (this._playing) { this._playing = false; this._render2(); return; }
    this._playing = true; this._play = MeasureStationsCore.newPlay(this.st && this.st.noun ? this.st.noun : 'giraffe');
    this._render2();
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

var msCssDone = false;
function injectMeasureStationsCSS() {
  if (msCssDone || typeof document === 'undefined') return;
  msCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ms-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;--ms-ink:#2B3A36;--ms-teal:#146B5E;--ms-coral:#F2784B;--ms-gold:#E2B54A;}'
  + '.ms-step{align-self:center;font:800 22px/1.25 var(--lcs-font-display);color:var(--ms-teal);text-align:center;} .ms-step[hidden]{display:none;}'
  /* top row: the question card, the object, the album */
  + '.ms-top{display:flex;align-items:flex-end;justify-content:center;gap:16px;}'
  + '.ms-qcard{flex:none;width:var(--ms-card);height:var(--ms-card);box-sizing:border-box;padding:0;border-radius:16px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--ms-teal);} .ms-qcard[hidden]{display:none;}'
  + '.ms-qcard{display:grid;place-items:center;} .ms-qcard svg{width:calc(var(--ms-card) * .74);height:calc(var(--ms-card) * .74);display:block;} .ms-sign svg,.ms-flag svg{width:100%;height:100%;display:block;}'
  + '.ms-floor{stroke:#8C9894;stroke-width:4;stroke-linecap:round;} .ms-arrow{fill:none;stroke:var(--ms-teal);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;} .ms-hook{fill:none;stroke:var(--ms-teal);stroke-width:4;} .ms-weight{fill:#E3F1EC;stroke:var(--ms-teal);stroke-width:4;stroke-linejoin:round;} .ms-arrow-w{stroke:var(--ms-coral);}'
  + '.ms-qcard.is-pulse{animation:ms-pulse .4s ease-in-out 3;} @keyframes ms-pulse{50%{transform:scale(1.08);box-shadow:inset 0 0 0 3px var(--ms-teal),0 0 0 6px rgba(20,107,94,.25);}}'
  + '.ms-qcard.is-ok{background:#FFF6DA;box-shadow:inset 0 0 0 3px #A9812A;}'
  + '.ms-plinth{position:relative;flex:none;width:calc(var(--ms-obj) + 8px);height:calc(var(--ms-obj) + 4px);padding:0;border:0;background:none;cursor:grab;touch-action:none;}'
  + '.ms-plinth .ms-base{position:absolute;left:4px;right:4px;bottom:0;height:14px;border-radius:50%;background:#E8DCC2;box-shadow:inset 0 -3px 0 #CDBB95;}'
  + '.ms-plinth.is-sel{outline:3px solid var(--ms-coral);outline-offset:4px;border-radius:14px;} .ms-plinth.is-lifted .ms-img{opacity:.35;} .ms-plinth:disabled{cursor:default;}'
  + '.ms-img{position:absolute;object-fit:contain;pointer-events:none;transform-origin:50% 50%;}'
  + '.ms-ghost{position:fixed;z-index:50;pointer-events:none;object-fit:contain;transform-origin:50% 50%;filter:drop-shadow(0 6px 6px rgba(0,0,0,.2));}'
  + '.ms-album{display:flex;gap:6px;} .ms-album[hidden]{display:none;}'
  + '.ms-acard{width:76px;height:92px;box-sizing:border-box;padding:4px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px #C9BFA8;display:flex;flex-direction:column;align-items:center;gap:1px;font:700 14px/1.15 var(--lcs-font-body);color:var(--ms-ink);animation:ms-drop .4s ease-out both;}'
  + '.ms-acard img{width:34px;height:34px;object-fit:contain;} .ms-acard.is-empty{background:transparent;box-shadow:none;outline:2px dashed #C9BFA8;outline-offset:-2px;animation:none;}'
  + '@keyframes ms-drop{0%{transform:translateY(-20px);opacity:0;}100%{transform:none;opacity:1;}}'
  /* the tray (free play) */
  + '.ms-tray{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;} .ms-wrap.is-narrow .ms-tray{gap:4px;} .ms-wrap.is-narrow .ms-chip{width:44px;height:44px;padding:2px;} .ms-tray[hidden]{display:none;}'
  + '.ms-chip{flex:none;width:48px;height:48px;padding:3px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #DDE6E3;cursor:pointer;} .ms-chip img{width:100%;height:100%;object-fit:contain;} .ms-chip.is-on{box-shadow:inset 0 0 0 3px var(--ms-coral);}'
  /* the three stations */
  + '.ms-bays{display:grid;grid-template-columns:repeat(3,var(--ms-bayw));gap:var(--ms-gap);justify-content:center;}'
  + '.ms-bay{position:relative;width:var(--ms-bayw);height:var(--ms-bayh);padding:0;border:0;border-radius:14px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--ms-teal);cursor:pointer;overflow:visible;}'
  + '.ms-bay:disabled{cursor:default;} .ms-bay.is-glow{animation:ms-glow .7s ease-in-out 2;box-shadow:inset 0 0 0 4px var(--ms-teal),0 0 0 6px rgba(20,107,94,.3);}'
  + '@keyframes ms-glow{50%{box-shadow:inset 0 0 0 4px var(--ms-teal),0 0 0 10px rgba(20,107,94,.35);}}'
  + '.ms-bay.is-right{box-shadow:inset 0 0 0 4px #A9812A,0 0 0 5px #F7E3A6;}'
  + '.ms-sign{position:absolute;left:50%;top:-16px;width:36px;height:36px;margin-left:-18px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px var(--ms-teal);padding:4px;box-sizing:border-box;z-index:3;}'
  + '.ms-flag{display:none;position:absolute;left:6px;top:-18px;width:44px;height:44px;padding:5px;box-sizing:border-box;border-radius:12px;background:#FFF5F0;box-shadow:0 0 0 3px var(--ms-coral);z-index:4;}'
  + '.ms-bay.is-flag .ms-flag{display:block;animation:ms-pop .35s ease-out both;} @keyframes ms-pop{0%{transform:scale(.3);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.ms-rig{position:absolute;inset:0;overflow:hidden;border-radius:14px;}'
  + '.ms-rail{position:absolute;height:6px;border-radius:3px;background:#8C9894;} .ms-stop{position:absolute;width:8px;height:24px;border-radius:3px;background:var(--ms-ink);}'
  + '.ms-bar{position:absolute;border-radius:5px;} .ms-bar-long{height:10px;background:var(--ms-coral);} .ms-bar-tall{width:10px;background:#2E9C88;} .ms-bar.is-faint{opacity:.3;}'
  + '.ms-slider{position:absolute;width:12px;height:20px;border-radius:4px;background:var(--ms-ink);}'
  + '.ms-postbar{position:absolute;width:12px;border-radius:6px;background:#DDE6E3;box-shadow:inset 0 0 0 2px #8C9894;} .ms-base2{position:absolute;left:6px;right:6px;height:8px;border-radius:4px;background:#8C9894;}'
  + '.ms-cap{position:absolute;height:6px;border-radius:3px;background:var(--ms-ink);}'
  + '.ms-hanger{position:absolute;left:20%;right:20%;height:8px;border-radius:4px;background:var(--ms-ink);}'
  + '.ms-coil{position:absolute;left:calc(50% - 7px - 20px);width:40px;} .ms-coil path{fill:none;stroke:#5E7480;stroke-width:4;stroke-linejoin:round;vector-effect:non-scaling-stroke;}'
  + '.ms-pan{position:absolute;left:calc(50% - 7px - var(--ms-pan) / 2 - 8px);width:calc(var(--ms-pan) + 16px);height:8px;border-radius:0 0 12px 12px;background:#8C9894;}'
  + '.ms-scale{position:absolute;width:8px;border-radius:4px;background:linear-gradient(#E3F1EC 0 62%,#F2CF6E 62%);box-shadow:inset 0 0 0 2px #8C9894;}'
  + '.ms-pointer{position:absolute;width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:10px solid var(--ms-coral);} .ms-pointer.is-faint{opacity:.3;}'
  /* the motions */
  + '.ms-bay.is-anim .ms-tip{animation:ms-tipk .5s ease-out both;} @keyframes ms-tipk{0%{transform:rotate(var(--ms-r0));opacity:.4;}100%{transform:rotate(var(--ms-r1));opacity:1;}}'
  + '.ms-bay.is-anim .ms-bar-long{animation:ms-growx .45s .25s ease-out both;transform-origin:0 50%;} @keyframes ms-growx{0%{transform:scaleX(0);}100%{transform:scaleX(1);}}'
  + '.ms-bay.is-anim .ms-bar-tall{animation:ms-growy .4s ease-out both;transform-origin:50% 100%;} @keyframes ms-growy{0%{transform:scaleY(0);}100%{transform:scaleY(1);}}'
  + '.ms-bay.is-anim .ms-cap{animation:ms-capk .4s ease-out both;} @keyframes ms-capk{0%{transform:translateY(-60px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.ms-bay.is-anim .ms-pan,.ms-bay.is-anim .ms-spring-img{animation:ms-bob .6s ease-out both;} @keyframes ms-bob{0%{transform:translateY(-24px);}45%{transform:translateY(6px);}70%{transform:translateY(-3px);}100%{transform:none;}}'
  /* size mode */
  + '.ms-shelf{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px;align-self:center;padding:6px 0 12px;border-bottom:5px solid #C9BFA8;}'
  + '.ms-card{position:relative;padding:0;border:0;border-radius:14px;background:#FFFBF2;box-shadow:inset 0 0 0 2px #DDE6E3;cursor:pointer;overflow:visible;}'
  + '.ms-card.is-ring{box-shadow:inset 0 0 0 4px var(--ms-teal),0 0 0 4px rgba(20,107,94,.18);} .ms-card:disabled{cursor:default;}'
  + '.ms-shape{position:absolute;fill:#9ED9CF;stroke:#2E9C88;stroke-width:3;vector-effect:non-scaling-stroke;}'
  + '.ms-card.is-poke .ms-img,.ms-card.is-poke .ms-shape{filter:drop-shadow(0 0 6px rgba(242,193,78,.9));}'
  + '.ms-card.is-loose{animation:ms-rattle .12s linear 4;} @keyframes ms-rattle{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.ms-card.is-missed{animation:ms-pulse2 .6s ease-in-out 3;} @keyframes ms-pulse2{50%{box-shadow:inset 0 0 0 4px #F2C14E,0 0 0 6px rgba(242,193,78,.5);}}'
  + '.ms-card.is-win{box-shadow:inset 0 0 0 4px #A9812A,0 0 0 5px #F7E3A6;}'
  + '.ms-window{position:absolute;z-index:5;box-sizing:border-box;border:4px solid var(--ms-teal);border-radius:6px;background:rgba(255,255,255,.08);pointer-events:none;transition:left .24s ease-in-out,top .24s ease-in-out;}'
  + '.ms-window:not(.is-on){opacity:.85;}'
  /* the note + actions */
  + '.ms-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--ms-ink);text-align:center;} .ms-note[hidden]{display:none;}'
  + '.ms-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .ms-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:21px;font-weight:800;}'
  + '.ms-actions{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;}'
  + '.ms-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .ms-check[hidden]{display:none;} .ms-check:disabled{opacity:.5;cursor:default;}'
  + '.ms-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .ms-tool[hidden]{display:none;} .ms-tool:disabled{opacity:.45;cursor:default;}'
  + '.ms-plinth:focus-visible,.ms-bay:focus-visible,.ms-card:focus-visible,.ms-chip:focus-visible,.ms-check:focus-visible,.ms-tool:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.ms-wrap.is-narrow{gap:10px;} .ms-wrap.is-narrow .ms-top{gap:10px;flex-wrap:wrap;} .ms-wrap.is-narrow .ms-note{font-size:15px;padding:6px 10px;} .ms-wrap.is-narrow .ms-step{font-size:19px;}'
  + '.ms-wrap.is-narrow .ms-sign{width:30px;height:30px;margin-left:-15px;top:-13px;} .ms-wrap.is-narrow .ms-flag{width:32px;height:32px;top:-14px;left:2px;padding:4px;}'
  + '@media (prefers-reduced-motion:reduce){.ms-wrap *{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'ms-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = MeasureStationsActivity;
if (typeof window !== 'undefined') window.MeasureStationsActivity = MeasureStationsActivity;
