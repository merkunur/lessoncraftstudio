/* =====================================================================
   growing-picture-activity.js — ACTIVITY #154 of the one-by-one rebuild:
   "Gauge's Good Guess" → THE GROWING PICTURE (2.MD.A.3; all 11 locales).
   Model: growing-picture-core.js (GrowingPictureCore).
   Design: docs/activities-rebuild/designs/154-gauge-good-guess.md
   ---------------------------------------------------------------------
   The invention: tap an estimate and the picture grows or shrinks to
   exactly that size beside a 30-cm school ruler or a 1-m metre stick,
   drawn to the same scale — a wrong estimate looks wrong. Level 2 gives
   the number and asks for the unit, with both sticks in the frame.
   A miss leaves a dashed true-size outline beside the guess (no number);
   a win settles the picture, stamps it and files it in Gauge's size album,
   a ladder of real sizes from the smallest to the biggest.
   No timer, no score, no words on the apparatus: numerals, cm and m.
   Test seams: window.GrowingPictureActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._choose / ._check / ._album /
   .FAST / .OK_MS.
   ===================================================================== */
var GrowingPictureActivity = {
  id: 'growing-picture',
  /* the drawn apparatus (the hierarchy gate): the size frame, the ruler, the metre stick, the size bars */
  apparatusClasses: ['gp-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Gauge's Good Guess","de":"Gauges gute Schätzung","fr":"La bonne estimation de Gauge","es":"La buena estimación de Gauge","pt":"O bom palpite da cabra","it":"La buona stima della capra","nl":"De goede schatting van Maatje","sv":"Getens goda gissning","da":"Gedens gode gæt","no":"Geitas gode gjetning","fi":"Vuohen hyvä arvio"},
    instruction: {"en":"Picture the real size, then tap the estimate that makes sense. The picture grows to your estimate next to the ruler.","de":"Stell dir die echte Größe vor und tipp dann auf die Schätzung, die passt. Das Bild wächst neben dem Lineal auf deine Schätzung.","fr":"Imagine la vraie taille, puis touche l’estimation qui convient. L’image grandit jusqu’à ton estimation à côté de la règle.","es":"Imagina el tamaño real y luego toca la estimación que tenga sentido. El dibujo crece hasta tu estimación junto a la regla.","pt":"Imagine o tamanho de verdade e depois toque na estimativa que faz sentido. A figura cresce até a sua estimativa ao lado da régua.","it":"Immagina la grandezza vera, poi tocca la stima che ha senso. L’immagine cresce fino alla tua stima accanto al righello.","nl":"Stel je de echte grootte voor en tik dan op de schatting die klopt. Het plaatje groeit naast de liniaal tot jouw schatting.","sv":"Tänk dig den riktiga storleken och tryck sedan på den uppskattning som verkar rimlig. Bilden växer till din uppskattning bredvid linjalen.","da":"Forestil dig den rigtige størrelse, og tryk så på det skøn, der giver mening. Billedet vokser til dit skøn ved siden af linealen.","no":"Tenk deg den ekte størrelsen, og trykk så på anslaget som virker riktig. Bildet vokser til anslaget ditt ved siden av linjalen.","fi":"Kuvittele oikea koko ja napauta sitten järkevää arviota. Kuva kasvaa arviosi kokoiseksi viivaimen vieressä."},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lEstimate: {"en":"pick the estimate","de":"die Schätzung wählen","fr":"choisir l’estimation","es":"elegir la estimación","pt":"escolher a estimativa","it":"scegliere la stima","nl":"de schatting kiezen","sv":"välj uppskattningen","da":"vælg skønnet","no":"velg anslaget","fi":"valitse arvio"},
    lUnit: {"en":"pick the unit","de":"die Einheit wählen","fr":"choisir l’unité","es":"elegir la unidad","pt":"escolher a unidade","it":"scegliere l’unità","nl":"de eenheid kiezen","sv":"välj enheten","da":"vælg enheden","no":"velg enheten","fi":"valitse yksikkö"},
    setGrow: {"en":"Size check","de":"Größe zeigen","fr":"Voir la taille","es":"Ver el tamaño","pt":"Ver o tamanho","it":"Vedere la grandezza","nl":"Grootte laten zien","sv":"Visa storleken","da":"Vis størrelsen","no":"Vis størrelsen","fi":"Näytä koko"},
    gTap: {"en":"grow the picture when I tap","de":"beim Antippen","fr":"quand je touche","es":"al tocar","pt":"ao tocar","it":"quando tocco","nl":"bij het tikken","sv":"när jag trycker","da":"når jeg trykker","no":"når jeg trykker","fi":"kun napautan"},
    gCheck: {"en":"only after Check","de":"erst nach Prüfen","fr":"seulement après Vérifier","es":"solo después de Revisar","pt":"só depois de Conferir","it":"solo dopo Controlla","nl":"pas na Controleer","sv":"först efter Kontrollera","da":"først efter Tjek","no":"først etter Sjekk","fi":"vasta Tarkista-painalluksen jälkeen"},
    taskLine: {"en":"Picture the real size, then tap the estimate that makes sense.","de":"Stell dir die echte Größe vor und tipp auf die Schätzung, die passt.","fr":"Imagine la vraie taille, puis touche l’estimation qui convient.","es":"Imagina el tamaño real y toca la estimación que tenga sentido.","pt":"Imagine o tamanho de verdade e toque na estimativa que faz sentido.","it":"Immagina la grandezza vera e tocca la stima che ha senso.","nl":"Stel je de echte grootte voor en tik op de schatting die klopt.","sv":"Tänk dig den riktiga storleken och tryck på en rimlig uppskattning.","da":"Forestil dig den rigtige størrelse, og tryk på et skøn, der giver mening.","no":"Tenk deg den ekte størrelsen, og trykk på et anslag som virker riktig.","fi":"Kuvittele oikea koko ja napauta järkevää arviota."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    hintPick: {"en":"Tap an estimate to see that size.","de":"Tipp auf eine Schätzung, dann siehst du die Größe.","fr":"Touche une estimation pour voir cette taille.","es":"Toca una estimación para ver ese tamaño.","pt":"Toque numa estimativa para ver esse tamanho.","it":"Tocca una stima per vedere quella grandezza.","nl":"Tik op een schatting om die grootte te zien.","sv":"Tryck på en uppskattning för att se den storleken.","da":"Tryk på et skøn for at se den størrelse.","no":"Trykk på et anslag for å se den størrelsen.","fi":"Napauta arviota, niin näet sen koon."},
    hintBigRuler: {"en":"Look at the ruler. Could the real thing be that big?","de":"Schau auf das Lineal. Kann es in echt so groß sein?","fr":"Regarde la règle. Est-ce qu’en vrai, ça peut être aussi grand ?","es":"Mira la regla. ¿De verdad puede ser tan grande?","pt":"Olhe para a régua. Pode ser tão grande assim de verdade?","it":"Guarda il righello. Può essere davvero così grande?","nl":"Kijk naar de liniaal. Kan het echt zo groot zijn?","sv":"Titta på linjalen. Kan det verkligen vara så stort?","da":"Se på linealen. Kan det virkelig være så stort?","no":"Se på linjalen. Kan det virkelig være så stort?","fi":"Katso viivainta. Voiko se oikeasti olla noin iso?"},
    hintSmallRuler: {"en":"Look at the ruler. Could the real thing be that small?","de":"Schau auf das Lineal. Kann es in echt so klein sein?","fr":"Regarde la règle. Est-ce qu’en vrai, ça peut être aussi petit ?","es":"Mira la regla. ¿De verdad puede ser tan pequeño?","pt":"Olhe para a régua. Pode ser tão pequeno assim de verdade?","it":"Guarda il righello. Può essere davvero così piccolo?","nl":"Kijk naar de liniaal. Kan het echt zo klein zijn?","sv":"Titta på linjalen. Kan det verkligen vara så litet?","da":"Se på linealen. Kan det virkelig være så lille?","no":"Se på linjalen. Kan det virkelig være så lite?","fi":"Katso viivainta. Voiko se oikeasti olla noin pieni?"},
    hintBigStick: {"en":"Look at the meter stick. Could the real thing be that big?","de":"Schau auf den Meterstab. Kann es in echt so groß sein?","fr":"Regarde le mètre. Est-ce qu’en vrai, ça peut être aussi grand ?","es":"Mira el metro. ¿De verdad puede ser tan grande?","pt":"Olhe para o metro. Pode ser tão grande assim de verdade?","it":"Guarda il metro. Può essere davvero così grande?","nl":"Kijk naar de meterlat. Kan het echt zo groot zijn?","sv":"Titta på meterstocken. Kan det verkligen vara så stort?","da":"Se på meterstokken. Kan det virkelig være så stort?","no":"Se på meterstokken. Kan det virkelig være så stort?","fi":"Katso metrin mittakeppiä. Voiko se oikeasti olla noin iso?"},
    hintSmallStick: {"en":"Look at the meter stick. Could the real thing be that small?","de":"Schau auf den Meterstab. Kann es in echt so klein sein?","fr":"Regarde le mètre. Est-ce qu’en vrai, ça peut être aussi petit ?","es":"Mira el metro. ¿De verdad puede ser tan pequeño?","pt":"Olhe para o metro. Pode ser tão pequeno assim de verdade?","it":"Guarda il metro. Può essere davvero così piccolo?","nl":"Kijk naar de meterlat. Kan het echt zo klein zijn?","sv":"Titta på meterstocken. Kan det verkligen vara så litet?","da":"Se på meterstokken. Kan det virkelig være så lille?","no":"Se på meterstokken. Kan det virkelig være så lite?","fi":"Katso metrin mittakeppiä. Voiko se oikeasti olla noin pieni?"},
    hintBigBoth: {"en":"Look at the ruler and the meter stick. Could it really be that big?","de":"Schau auf das Lineal und den Meterstab. Kann es wirklich so groß sein?","fr":"Regarde la règle et le mètre. Est-ce que ça peut vraiment être aussi grand ?","es":"Mira la regla y el metro. ¿De verdad puede ser tan grande?","pt":"Olhe para a régua e o metro. Pode ser mesmo tão grande?","it":"Guarda il righello e il metro. Può essere davvero così grande?","nl":"Kijk naar de liniaal en de meterlat. Kan het echt zo groot zijn?","sv":"Titta på linjalen och meterstocken. Kan det verkligen vara så stort?","da":"Se på linealen og meterstokken. Kan det virkelig være så stort?","no":"Se på linjalen og meterstokken. Kan det virkelig være så stort?","fi":"Katso viivainta ja metrin mittakeppiä. Voiko se oikeasti olla noin iso?"},
    hintSmallBoth: {"en":"Look at the ruler and the meter stick. Could it really be that small?","de":"Schau auf das Lineal und den Meterstab. Kann es wirklich so klein sein?","fr":"Regarde la règle et le mètre. Est-ce que ça peut vraiment être aussi petit ?","es":"Mira la regla y el metro. ¿De verdad puede ser tan pequeño?","pt":"Olhe para a régua e o metro. Pode ser mesmo tão pequeno?","it":"Guarda il righello e il metro. Può essere davvero così piccolo?","nl":"Kijk naar de liniaal en de meterlat. Kan het echt zo klein zijn?","sv":"Titta på linjalen och meterstocken. Kan det verkligen vara så litet?","da":"Se på linealen og meterstokken. Kan det virkelig være så lille?","no":"Se på linjalen og meterstokken. Kan det virkelig være så lite?","fi":"Katso viivainta ja metrin mittakeppiä. Voiko se oikeasti olla noin pieni?"},
    hintUnits: {"en":"Small things are measured in centimeters, big things in meters.","de":"Kleine Dinge misst man in Zentimetern, große in Metern.","fr":"On mesure les petites choses en centimètres et les grandes en mètres.","es":"Las cosas pequeñas se miden en centímetros y las grandes, en metros.","pt":"As coisas pequenas medimos em centímetros, e as grandes, em metros.","it":"Le cose piccole si misurano in centimetri, quelle grandi in metri.","nl":"Kleine dingen meet je in centimeters, grote in meters.","sv":"Små saker mäter man i centimeter, stora i meter.","da":"Små ting måler man i centimeter, store i meter.","no":"Små ting måler vi i centimeter, store i meter.","fi":"Pienet asiat mitataan senttimetreinä, suuret metreinä."},
    okUnit: {"en":"{v}: centimeters for small things, meters for big ones.","de":"{v}: Zentimeter für kleine Dinge, Meter für große.","fr":"{v} : des centimètres pour les petites choses, des mètres pour les grandes.","es":"{v}: centímetros para lo pequeño, metros para lo grande.","pt":"{v}: centímetros para o que é pequeno, metros para o que é grande.","it":"{v}: centimetri per le cose piccole, metri per quelle grandi.","nl":"{v}: centimeters voor kleine dingen, meters voor grote.","sv":"{v}: centimeter för små saker, meter för stora.","da":"{v}: centimeter til små ting, meter til store.","no":"{v}: centimeter for små ting, meter for store.","fi":"{v}: senttimetrit pienille asioille, metrit suurille."},
    aCard: {"en":"estimate {v}","de":"Schätzung {v}","fr":"estimation {v}","es":"estimación {v}","pt":"estimativa {v}","it":"stima {v}","nl":"schatting {v}","sv":"uppskattning {v}","da":"skøn {v}","no":"anslag {v}","fi":"arvio {v}"},
    aGhost: {"en":"The real size is shown as a dashed outline.","de":"Die echte Größe ist gestrichelt eingezeichnet.","fr":"La vraie taille est dessinée en pointillé.","es":"El tamaño real aparece con una línea punteada.","pt":"O tamanho de verdade aparece com uma linha tracejada.","it":"La grandezza vera è disegnata tratteggiata.","nl":"De echte grootte staat er gestippeld bij.","sv":"Den riktiga storleken visas streckad.","da":"Den rigtige størrelse er vist stiplet.","no":"Den ekte størrelsen er vist stiplet.","fi":"Oikea koko näkyy katkoviivana."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    q1_ant: {"en":"About how long is an ant?","de":"Wie lang ist ungefähr eine Ameise?","fr":"Quelle est à peu près la longueur d’une fourmi ?","es":"¿Más o menos cuánto mide una hormiga?","pt":"Mais ou menos quanto mede uma formiga?","it":"Più o meno quanto è lunga una formica?","nl":"Hoe lang is een mier ongeveer?","sv":"Ungefär hur lång är en myra?","da":"Cirka hvor lang er en myre?","no":"Omtrent hvor lang er en maur?","fi":"Suunnilleen kuinka pitkä muurahainen on?"},
    cmp1_ant: {"en":"An ant is about as long as a grain of rice.","de":"Eine Ameise ist ungefähr so lang wie ein Reiskorn.","fr":"Une fourmi est à peu près aussi longue qu’un grain de riz.","es":"Una hormiga mide más o menos lo que un grano de arroz.","pt":"Uma formiga mede mais ou menos o mesmo que um grão de arroz.","it":"Una formica è lunga più o meno come un chicco di riso.","nl":"Een mier is ongeveer zo lang als een rijstkorrel.","sv":"En myra är ungefär lika lång som ett riskorn.","da":"En myre er cirka lige så lang som et riskorn.","no":"En maur er omtrent like lang som et riskorn.","fi":"Muurahainen on suunnilleen yhtä pitkä kuin riisinjyvä."},
    ok1_ant: {"en":"Yes — an ant is about 1 cm long.","de":"Ja – eine Ameise ist ungefähr 1 cm lang.","fr":"Oui, une fourmi mesure environ 1 cm.","es":"Sí, una hormiga mide más o menos 1 cm.","pt":"Isso! Uma formiga mede mais ou menos 1 cm.","it":"Sì, una formica è lunga circa 1 cm.","nl":"Ja, een mier is ongeveer 1 cm lang.","sv":"Ja, en myra är ungefär 1 cm lång.","da":"Ja, en myre er cirka 1 cm lang.","no":"Ja, en maur er omtrent 1 cm lang.","fi":"Kyllä, muurahainen on noin 1 cm pitkä."},
    q1_spoon: {"en":"About how long is a spoon?","de":"Wie lang ist ungefähr ein Löffel?","fr":"Quelle est à peu près la longueur d’une cuillère ?","es":"¿Más o menos cuánto mide una cuchara?","pt":"Mais ou menos quanto mede uma colher?","it":"Più o meno quanto è lungo un cucchiaio?","nl":"Hoe lang is een lepel ongeveer?","sv":"Ungefär hur lång är en sked?","da":"Cirka hvor lang er en ske?","no":"Omtrent hvor lang er en skje?","fi":"Suunnilleen kuinka pitkä lusikka on?"},
    cmp1_spoon: {"en":"A spoon is about half a school ruler long.","de":"Ein Löffel ist ungefähr ein halbes Schullineal lang.","fr":"Une cuillère mesure à peu près la moitié d’une règle d’école.","es":"Una cuchara mide más o menos la mitad de una regla de la escuela.","pt":"Uma colher mede mais ou menos metade de uma régua da escola.","it":"Un cucchiaio è lungo più o meno come mezzo righello di scuola.","nl":"Een lepel is ongeveer een halve schoolliniaal lang.","sv":"En sked är ungefär en halv skollinjal lång.","da":"En ske er cirka en halv skolelineal lang.","no":"En skje er omtrent en halv skolelinjal lang.","fi":"Lusikka on suunnilleen puolen kouluviivaimen pituinen."},
    ok1_spoon: {"en":"Yes — a spoon is about 15 cm long.","de":"Ja – ein Löffel ist ungefähr 15 cm lang.","fr":"Oui, une cuillère mesure environ 15 cm.","es":"Sí, una cuchara mide más o menos 15 cm.","pt":"Isso! Uma colher mede mais ou menos 15 cm.","it":"Sì, un cucchiaio è lungo circa 15 cm.","nl":"Ja, een lepel is ongeveer 15 cm lang.","sv":"Ja, en sked är ungefär 15 cm lång.","da":"Ja, en ske er cirka 15 cm lang.","no":"Ja, en skje er omtrent 15 cm lang.","fi":"Kyllä, lusikka on noin 15 cm pitkä."},
    q1_snail: {"en":"About how long is a snail?","de":"Wie lang ist ungefähr eine Schnecke?","fr":"Quelle est à peu près la longueur d’un escargot ?","es":"¿Más o menos cuánto mide un caracol?","pt":"Mais ou menos quanto mede um caracol?","it":"Più o meno quanto è lunga una chiocciola?","nl":"Hoe lang is een slak ongeveer?","sv":"Ungefär hur lång är en snäcka?","da":"Cirka hvor lang er en snegl?","no":"Omtrent hvor lang er en snegle?","fi":"Suunnilleen kuinka pitkä kotilo on?"},
    cmp1_snail: {"en":"A garden snail is about as long as the top part of your thumb.","de":"Eine Gartenschnecke ist ungefähr so lang wie das obere Glied deines Daumens.","fr":"Un escargot de jardin est à peu près aussi long que le bout de ton pouce.","es":"Un caracol de jardín mide más o menos lo que la punta de tu pulgar.","pt":"Um caracol de jardim mede mais ou menos o mesmo que a ponta do seu polegar.","it":"Una chiocciola dell’orto è lunga più o meno come la punta del tuo pollice.","nl":"Een tuinslak is ongeveer zo lang als het topje van je duim.","sv":"En trädgårdssnäcka är ungefär lika lång som översta delen av din tumme.","da":"En havesnegl er cirka lige så lang som det øverste led af din tommelfinger.","no":"En hagesnegle er omtrent like lang som det øverste leddet på tommelen din.","fi":"Kotilo on suunnilleen yhtä pitkä kuin peukalosi yläosa."},
    ok1_snail: {"en":"Yes — a snail is about 3 cm long.","de":"Ja – eine Schnecke ist ungefähr 3 cm lang.","fr":"Oui, un escargot mesure environ 3 cm.","es":"Sí, un caracol mide más o menos 3 cm.","pt":"Isso! Um caracol mede mais ou menos 3 cm.","it":"Sì, una chiocciola è lunga circa 3 cm.","nl":"Ja, een slak is ongeveer 3 cm lang.","sv":"Ja, en snäcka är ungefär 3 cm lång.","da":"Ja, en snegl er cirka 3 cm lang.","no":"Ja, en snegle er omtrent 3 cm lang.","fi":"Kyllä, kotilo on noin 3 cm pitkä."},
    q1_bed: {"en":"About how long is a bed?","de":"Wie lang ist ungefähr ein Bett?","fr":"Quelle est à peu près la longueur d’un lit ?","es":"¿Más o menos cuánto mide una cama?","pt":"Mais ou menos quanto mede uma cama?","it":"Più o meno quanto è lungo un letto?","nl":"Hoe lang is een bed ongeveer?","sv":"Ungefär hur lång är en säng?","da":"Cirka hvor lang er en seng?","no":"Omtrent hvor lang er en seng?","fi":"Suunnilleen kuinka pitkä sänky on?"},
    cmp1_bed: {"en":"A bed is a little longer than a grown-up.","de":"Ein Bett ist etwas länger als ein Erwachsener.","fr":"Un lit est un peu plus long qu’un adulte.","es":"Una cama es un poco más larga que una persona adulta.","pt":"Uma cama é um pouco mais comprida que um adulto.","it":"Un letto è un po’ più lungo di un adulto.","nl":"Een bed is iets langer dan een volwassene.","sv":"En säng är lite längre än en vuxen.","da":"En seng er lidt længere end en voksen.","no":"En seng er litt lengre enn en voksen.","fi":"Sänky on vähän pidempi kuin aikuinen."},
    ok1_bed: {"en":"Yes — a bed is about 2 m long.","de":"Ja – ein Bett ist ungefähr 2 m lang.","fr":"Oui, un lit mesure environ 2 m.","es":"Sí, una cama mide más o menos 2 m.","pt":"Isso! Uma cama mede mais ou menos 2 m.","it":"Sì, un letto è lungo circa 2 m.","nl":"Ja, een bed is ongeveer 2 m lang.","sv":"Ja, en säng är ungefär 2 m lång.","da":"Ja, en seng er cirka 2 m lang.","no":"Ja, en seng er omtrent 2 m lang.","fi":"Kyllä, sänky on noin 2 m pitkä."},
    q1_door: {"en":"About how tall is a door?","de":"Wie hoch ist ungefähr eine Tür?","fr":"Quelle est à peu près la hauteur d’une porte ?","es":"¿Más o menos cuánto mide de alto una puerta?","pt":"Mais ou menos qual é a altura de uma porta?","it":"Più o meno quanto è alta una porta?","nl":"Hoe hoog is een deur ongeveer?","sv":"Ungefär hur hög är en dörr?","da":"Cirka hvor høj er en dør?","no":"Omtrent hvor høy er en dør?","fi":"Suunnilleen kuinka korkea ovi on?"},
    cmp1_door: {"en":"A door is a little taller than a grown-up.","de":"Eine Tür ist etwas höher als ein Erwachsener.","fr":"Une porte est un peu plus haute qu’un adulte.","es":"Una puerta es un poco más alta que una persona adulta.","pt":"Uma porta é um pouco mais alta que um adulto.","it":"Una porta è un po’ più alta di un adulto.","nl":"Een deur is iets hoger dan een volwassene.","sv":"En dörr är lite högre än en vuxen.","da":"En dør er lidt højere end en voksen.","no":"En dør er litt høyere enn en voksen.","fi":"Ovi on vähän korkeampi kuin aikuinen."},
    ok1_door: {"en":"Yes — a door is about 2 m tall.","de":"Ja – eine Tür ist ungefähr 2 m hoch.","fr":"Oui, une porte mesure environ 2 m de haut.","es":"Sí, una puerta mide más o menos 2 m de alto.","pt":"Isso! Uma porta tem mais ou menos 2 m de altura.","it":"Sì, una porta è alta circa 2 m.","nl":"Ja, een deur is ongeveer 2 m hoog.","sv":"Ja, en dörr är ungefär 2 m hög.","da":"Ja, en dør er cirka 2 m høj.","no":"Ja, en dør er omtrent 2 m høy.","fi":"Kyllä, ovi on noin 2 m korkea."},
    q1_pencil: {"en":"About how long is a pencil?","de":"Wie lang ist ungefähr ein Bleistift?","fr":"Quelle est à peu près la longueur d’un crayon ?","es":"¿Más o menos cuánto mide un lápiz?","pt":"Mais ou menos quanto mede um lápis?","it":"Più o meno quanto è lunga una matita?","nl":"Hoe lang is een potlood ongeveer?","sv":"Ungefär hur lång är en blyertspenna?","da":"Cirka hvor lang er en blyant?","no":"Omtrent hvor lang er en blyant?","fi":"Suunnilleen kuinka pitkä lyijykynä on?"},
    cmp1_pencil: {"en":"A new pencil is a bit more than half a school ruler long.","de":"Ein neuer Bleistift ist etwas länger als ein halbes Schullineal.","fr":"Un crayon neuf est un peu plus long que la moitié d’une règle d’école.","es":"Un lápiz nuevo mide un poco más de la mitad de una regla de la escuela.","pt":"Um lápis novo mede um pouco mais que metade de uma régua da escola.","it":"Una matita nuova è lunga un po’ più di mezzo righello di scuola.","nl":"Een nieuw potlood is iets langer dan een halve schoolliniaal.","sv":"En ny blyertspenna är lite längre än en halv skollinjal.","da":"En ny blyant er lidt længere end en halv skolelineal.","no":"En ny blyant er litt lengre enn en halv skolelinjal.","fi":"Uusi lyijykynä on vähän pidempi kuin puolikas kouluviivain."},
    ok1_pencil: {"en":"Yes — a pencil is about 17 cm long.","de":"Ja – ein Bleistift ist ungefähr 17 cm lang.","fr":"Oui, un crayon mesure environ 17 cm.","es":"Sí, un lápiz mide más o menos 17 cm.","pt":"Isso! Um lápis mede mais ou menos 17 cm.","it":"Sì, una matita è lunga circa 17 cm.","nl":"Ja, een potlood is ongeveer 17 cm lang.","sv":"Ja, en blyertspenna är ungefär 17 cm lång.","da":"Ja, en blyant er cirka 17 cm lang.","no":"Ja, en blyant er omtrent 17 cm lang.","fi":"Kyllä, lyijykynä on noin 17 cm pitkä."},
    q1_truck: {"en":"About how long is a truck?","de":"Wie lang ist ungefähr ein Lastwagen?","fr":"Quelle est à peu près la longueur d’un camion ?","es":"¿Más o menos cuánto mide un camión de carga?","pt":"Mais ou menos quanto mede um caminhão?","it":"Più o meno quanto è lungo un camion?","nl":"Hoe lang is een vrachtwagen ongeveer?","sv":"Ungefär hur lång är en lastbil?","da":"Cirka hvor lang er en lastbil?","no":"Omtrent hvor lang er en lastebil?","fi":"Suunnilleen kuinka pitkä kuorma-auto on?"},
    cmp1_truck: {"en":"A truck is about as long as four beds.","de":"Ein Lastwagen ist ungefähr so lang wie vier Betten.","fr":"Un camion est à peu près aussi long que quatre lits.","es":"Un camión de carga mide más o menos lo que cuatro camas.","pt":"Um caminhão mede mais ou menos o mesmo que quatro camas.","it":"Un camion è lungo più o meno come quattro letti.","nl":"Een vrachtwagen is ongeveer zo lang als vier bedden.","sv":"En lastbil är ungefär lika lång som fyra sängar.","da":"En lastbil er cirka lige så lang som fire senge.","no":"En lastebil er omtrent like lang som fire senger.","fi":"Kuorma-auto on suunnilleen yhtä pitkä kuin neljä sänkyä."},
    ok1_truck: {"en":"Yes — a truck is about 8 m long.","de":"Ja – ein Lastwagen ist ungefähr 8 m lang.","fr":"Oui, un camion mesure environ 8 m.","es":"Sí, un camión de carga mide más o menos 8 m.","pt":"Isso! Um caminhão mede mais ou menos 8 m.","it":"Sì, un camion è lungo circa 8 m.","nl":"Ja, een vrachtwagen is ongeveer 8 m lang.","sv":"Ja, en lastbil är ungefär 8 m lång.","da":"Ja, en lastbil er cirka 8 m lang.","no":"Ja, en lastebil er omtrent 8 m lang.","fi":"Kyllä, kuorma-auto on noin 8 m pitkä."},
    q1_lighthouse: {"en":"About how tall is a lighthouse?","de":"Wie hoch ist ungefähr ein Leuchtturm?","fr":"Quelle est à peu près la hauteur d’un phare ?","es":"¿Más o menos cuánto mide de alto un faro?","pt":"Mais ou menos qual é a altura de um farol?","it":"Più o meno quanto è alto un faro?","nl":"Hoe hoog is een vuurtoren ongeveer?","sv":"Ungefär hur hög är en fyr?","da":"Cirka hvor højt er et fyrtårn?","no":"Omtrent hvor høyt er et fyrtårn?","fi":"Suunnilleen kuinka korkea majakka on?"},
    cmp1_lighthouse: {"en":"A lighthouse is about as tall as four houses.","de":"Ein Leuchtturm ist ungefähr so hoch wie vier Häuser.","fr":"Un phare est à peu près aussi haut que quatre maisons.","es":"Un faro es más o menos tan alto como cuatro casas.","pt":"Um farol é mais ou menos tão alto quanto quatro casas.","it":"Un faro è alto più o meno come quattro case.","nl":"Een vuurtoren is ongeveer zo hoog als vier huizen.","sv":"En fyr är ungefär lika hög som fyra hus.","da":"Et fyrtårn er cirka lige så højt som fire huse.","no":"Et fyrtårn er omtrent like høyt som fire hus.","fi":"Majakka on suunnilleen yhtä korkea kuin neljä taloa."},
    ok1_lighthouse: {"en":"Yes — a lighthouse is about 30 m tall.","de":"Ja – ein Leuchtturm ist ungefähr 30 m hoch.","fr":"Oui, un phare mesure environ 30 m de haut.","es":"Sí, un faro mide más o menos 30 m de alto.","pt":"Isso! Um farol tem mais ou menos 30 m de altura.","it":"Sì, un faro è alto circa 30 m.","nl":"Ja, een vuurtoren is ongeveer 30 m hoog.","sv":"Ja, en fyr är ungefär 30 m hög.","da":"Ja, et fyrtårn er cirka 30 m højt.","no":"Ja, et fyrtårn er omtrent 30 m høyt.","fi":"Kyllä, majakka on noin 30 m korkea."},
    q1_house: {"en":"About how tall is a house?","de":"Wie hoch ist ungefähr ein Haus?","fr":"Quelle est à peu près la hauteur d’une maison ?","es":"¿Más o menos cuánto mide de alto una casa?","pt":"Mais ou menos qual é a altura de uma casa?","it":"Più o meno quanto è alta una casa?","nl":"Hoe hoog is een huis ongeveer?","sv":"Ungefär hur högt är ett hus?","da":"Cirka hvor højt er et hus?","no":"Omtrent hvor høyt er et hus?","fi":"Suunnilleen kuinka korkea talo on?"},
    cmp1_house: {"en":"A house is about as tall as four doors.","de":"Ein Haus ist ungefähr so hoch wie vier Türen.","fr":"Une maison est à peu près aussi haute que quatre portes.","es":"Una casa es más o menos tan alta como cuatro puertas.","pt":"Uma casa é mais ou menos tão alta quanto quatro portas.","it":"Una casa è alta più o meno come quattro porte.","nl":"Een huis is ongeveer zo hoog als vier deuren.","sv":"Ett hus är ungefär lika högt som fyra dörrar.","da":"Et hus er cirka lige så højt som fire døre.","no":"Et hus er omtrent like høyt som fire dører.","fi":"Talo on suunnilleen yhtä korkea kuin neljä ovea."},
    ok1_house: {"en":"Yes — a house is about 8 m tall.","de":"Ja – ein Haus ist ungefähr 8 m hoch.","fr":"Oui, une maison mesure environ 8 m de haut.","es":"Sí, una casa mide más o menos 8 m de alto.","pt":"Isso! Uma casa tem mais ou menos 8 m de altura.","it":"Sì, una casa è alta circa 8 m.","nl":"Ja, een huis is ongeveer 8 m hoog.","sv":"Ja, ett hus är ungefär 8 m högt.","da":"Ja, et hus er cirka 8 m højt.","no":"Ja, et hus er omtrent 8 m høyt.","fi":"Kyllä, talo on noin 8 m korkea."},
    q1_airplane: {"en":"About how long is a passenger plane?","de":"Wie lang ist ungefähr ein Passagierflugzeug?","fr":"Quelle est à peu près la longueur d’un avion de ligne ?","es":"¿Más o menos cuánto mide un avión de pasajeros?","pt":"Mais ou menos quanto mede um avião de passageiros?","it":"Più o meno quanto è lungo un aereo di linea?","nl":"Hoe lang is een passagiersvliegtuig ongeveer?","sv":"Ungefär hur långt är ett passagerarflygplan?","da":"Cirka hvor langt er et passagerfly?","no":"Omtrent hvor langt er et passasjerfly?","fi":"Suunnilleen kuinka pitkä matkustajakone on?"},
    cmp1_airplane: {"en":"A passenger plane is about as long as five trucks.","de":"Ein Passagierflugzeug ist ungefähr so lang wie fünf Lastwagen.","fr":"Un avion de ligne est à peu près aussi long que cinq camions.","es":"Un avión de pasajeros mide más o menos lo que cinco camiones de carga.","pt":"Um avião de passageiros mede mais ou menos o mesmo que cinco caminhões.","it":"Un aereo di linea è lungo più o meno come cinque camion.","nl":"Een passagiersvliegtuig is ongeveer zo lang als vijf vrachtwagens.","sv":"Ett passagerarflygplan är ungefär lika långt som fem lastbilar.","da":"Et passagerfly er cirka lige så langt som fem lastbiler.","no":"Et passasjerfly er omtrent like langt som fem lastebiler.","fi":"Matkustajakone on suunnilleen yhtä pitkä kuin viisi kuorma-autoa."},
    ok1_airplane: {"en":"Yes — a passenger plane is about 40 m long.","de":"Ja – ein Passagierflugzeug ist ungefähr 40 m lang.","fr":"Oui, un avion de ligne mesure environ 40 m.","es":"Sí, un avión de pasajeros mide más o menos 40 m.","pt":"Isso! Um avião de passageiros mede mais ou menos 40 m.","it":"Sì, un aereo di linea è lungo circa 40 m.","nl":"Ja, een passagiersvliegtuig is ongeveer 40 m lang.","sv":"Ja, ett passagerarflygplan är ungefär 40 m långt.","da":"Ja, et passagerfly er cirka 40 m langt.","no":"Ja, et passasjerfly er omtrent 40 m langt.","fi":"Kyllä, matkustajakone on noin 40 m pitkä."},
    q1_ferry: {"en":"About how long is this ferry?","de":"Wie lang ist ungefähr diese Fähre?","fr":"Quelle est à peu près la longueur de ce ferry ?","es":"¿Más o menos cuánto mide este ferri?","pt":"Mais ou menos quanto mede esta balsa?","it":"Più o meno quanto è lungo questo traghetto?","nl":"Hoe lang is deze veerboot ongeveer?","sv":"Ungefär hur lång är den här färjan?","da":"Cirka hvor lang er den her færge?","no":"Omtrent hvor lang er denne fergen?","fi":"Suunnilleen kuinka pitkä tämä lautta on?"},
    cmp1_ferry: {"en":"This ferry is about as long as a soccer field.","de":"Diese Fähre ist ungefähr so lang wie ein Fußballfeld.","fr":"Ce ferry est à peu près aussi long qu’un terrain de football.","es":"Este ferri mide más o menos lo que una cancha de futbol.","pt":"Esta balsa mede mais ou menos o mesmo que um campo de futebol.","it":"Questo traghetto è lungo più o meno come un campo da calcio.","nl":"Deze veerboot is ongeveer zo lang als een voetbalveld.","sv":"Den här färjan är ungefär lika lång som en fotbollsplan.","da":"Den her færge er cirka lige så lang som en fodboldbane.","no":"Denne fergen er omtrent like lang som en fotballbane.","fi":"Tämä lautta on suunnilleen yhtä pitkä kuin jalkapallokenttä."},
    ok1_ferry: {"en":"Yes — this ferry is about 100 m long.","de":"Ja – diese Fähre ist ungefähr 100 m lang.","fr":"Oui, ce ferry mesure environ 100 m.","es":"Sí, este ferri mide más o menos 100 m.","pt":"Isso! Esta balsa mede mais ou menos 100 m.","it":"Sì, questo traghetto è lungo circa 100 m.","nl":"Ja, deze veerboot is ongeveer 100 m lang.","sv":"Ja, den här färjan är ungefär 100 m lång.","da":"Ja, den her færge er cirka 100 m lang.","no":"Ja, denne fergen er omtrent 100 m lang.","fi":"Kyllä, tämä lautta on noin 100 m pitkä."},
    q1_whale: {"en":"About how long is a whale?","de":"Wie lang ist ungefähr ein Wal?","fr":"Quelle est à peu près la longueur d’une baleine ?","es":"¿Más o menos cuánto mide una ballena?","pt":"Mais ou menos quanto mede uma baleia?","it":"Più o meno quanto è lunga una balena?","nl":"Hoe lang is een walvis ongeveer?","sv":"Ungefär hur lång är en val?","da":"Cirka hvor lang er en hval?","no":"Omtrent hvor lang er en hval?","fi":"Suunnilleen kuinka pitkä valas on?"},
    cmp1_whale: {"en":"A whale is about as long as two trucks.","de":"Ein Wal ist ungefähr so lang wie zwei Lastwagen.","fr":"Une baleine est à peu près aussi longue que deux camions.","es":"Una ballena mide más o menos lo que dos camiones de carga.","pt":"Uma baleia mede mais ou menos o mesmo que dois caminhões.","it":"Una balena è lunga più o meno come due camion.","nl":"Een walvis is ongeveer zo lang als twee vrachtwagens.","sv":"En val är ungefär lika lång som två lastbilar.","da":"En hval er cirka lige så lang som to lastbiler.","no":"En hval er omtrent like lang som to lastebiler.","fi":"Valas on suunnilleen yhtä pitkä kuin kaksi kuorma-autoa."},
    ok1_whale: {"en":"Yes — a whale is about 15 m long.","de":"Ja – ein Wal ist ungefähr 15 m lang.","fr":"Oui, une baleine mesure environ 15 m.","es":"Sí, una ballena mide más o menos 15 m.","pt":"Isso! Uma baleia mede mais ou menos 15 m.","it":"Sì, una balena è lunga circa 15 m.","nl":"Ja, een walvis is ongeveer 15 m lang.","sv":"Ja, en val är ungefär 15 m lång.","da":"Ja, en hval er cirka 15 m lang.","no":"Ja, en hval er omtrent 15 m lang.","fi":"Kyllä, valas on noin 15 m pitkä."},
    q1_banana: {"en":"About how long is a banana?","de":"Wie lang ist ungefähr eine Banane?","fr":"Quelle est à peu près la longueur d’une banane ?","es":"¿Más o menos cuánto mide un plátano?","pt":"Mais ou menos quanto mede uma banana?","it":"Più o meno quanto è lunga una banana?","nl":"Hoe lang is een banaan ongeveer?","sv":"Ungefär hur lång är en banan?","da":"Cirka hvor lang er en banan?","no":"Omtrent hvor lang er en banan?","fi":"Suunnilleen kuinka pitkä banaani on?"},
    cmp1_banana: {"en":"A banana is longer than half a school ruler but shorter than the whole ruler.","de":"Eine Banane ist länger als ein halbes Schullineal, aber kürzer als das ganze.","fr":"Une banane est plus longue qu’une demi-règle d’école, mais plus courte que la règle entière.","es":"Un plátano es más largo que media regla de la escuela, pero más corto que la regla entera.","pt":"Uma banana é mais comprida que meia régua da escola, mas mais curta que a régua inteira.","it":"Una banana è più lunga di mezzo righello di scuola, ma più corta del righello intero.","nl":"Een banaan is langer dan een halve schoolliniaal, maar korter dan de hele liniaal.","sv":"En banan är längre än en halv skollinjal men kortare än hela linjalen.","da":"En banan er længere end en halv skolelineal, men kortere end hele linealen.","no":"En banan er lengre enn en halv skolelinjal, men kortere enn hele linjalen.","fi":"Banaani on pidempi kuin puoli kouluviivainta mutta lyhyempi kuin koko viivain."},
    ok1_banana: {"en":"Yes — a banana is about 20 cm long.","de":"Ja – eine Banane ist ungefähr 20 cm lang.","fr":"Oui, une banane mesure environ 20 cm.","es":"Sí, un plátano mide más o menos 20 cm.","pt":"Isso! Uma banana mede mais ou menos 20 cm.","it":"Sì, una banana è lunga circa 20 cm.","nl":"Ja, een banaan is ongeveer 20 cm lang.","sv":"Ja, en banan är ungefär 20 cm lång.","da":"Ja, en banan er cirka 20 cm lang.","no":"Ja, en banan er omtrent 20 cm lang.","fi":"Kyllä, banaani on noin 20 cm pitkä."},
    q2_bee: {"en":"A bee is about 2 {gap} long.","de":"Eine Biene ist ungefähr 2 {gap} lang.","fr":"Une abeille mesure environ 2 {gap}.","es":"Una abeja mide más o menos 2 {gap}.","pt":"Uma abelha mede mais ou menos 2 {gap}.","it":"Un’ape è lunga circa 2 {gap}.","nl":"Een bij is ongeveer 2 {gap} lang.","sv":"Ett bi är ungefär 2 {gap} långt.","da":"En bi er cirka 2 {gap} lang.","no":"En bie er omtrent 2 {gap} lang.","fi":"Mehiläinen on noin 2 {gap} pitkä."},
    q2_door: {"en":"A door is about 2 {gap} tall.","de":"Eine Tür ist ungefähr 2 {gap} hoch.","fr":"Une porte mesure environ 2 {gap} de haut.","es":"Una puerta mide más o menos 2 {gap} de alto.","pt":"Uma porta tem mais ou menos 2 {gap} de altura.","it":"Una porta è alta circa 2 {gap}.","nl":"Een deur is ongeveer 2 {gap} hoog.","sv":"En dörr är ungefär 2 {gap} hög.","da":"En dør er cirka 2 {gap} høj.","no":"En dør er omtrent 2 {gap} høy.","fi":"Ovi on noin 2 {gap} korkea."},
    q2_car: {"en":"A car is about 4 {gap} long.","de":"Ein Auto ist ungefähr 4 {gap} lang.","fr":"Une voiture mesure environ 4 {gap}.","es":"Un carro mide más o menos 4 {gap}.","pt":"Um carro mede mais ou menos 4 {gap}.","it":"Un’automobile è lunga circa 4 {gap}.","nl":"Een auto is ongeveer 4 {gap} lang.","sv":"En bil är ungefär 4 {gap} lång.","da":"En bil er cirka 4 {gap} lang.","no":"En bil er omtrent 4 {gap} lang.","fi":"Auto on noin 4 {gap} pitkä."},
    q2_key: {"en":"A key is about 6 {gap} long.","de":"Ein Schlüssel ist ungefähr 6 {gap} lang.","fr":"Une clé mesure environ 6 {gap}.","es":"Una llave mide más o menos 6 {gap}.","pt":"Uma chave mede mais ou menos 6 {gap}.","it":"Una chiave è lunga circa 6 {gap}.","nl":"Een sleutel is ongeveer 6 {gap} lang.","sv":"En nyckel är ungefär 6 {gap} lång.","da":"En nøgle er cirka 6 {gap} lang.","no":"En nøkkel er omtrent 6 {gap} lang.","fi":"Avain on noin 6 {gap} pitkä."},
    q2_truck: {"en":"A truck is about 8 {gap} long.","de":"Ein Lastwagen ist ungefähr 8 {gap} lang.","fr":"Un camion mesure environ 8 {gap}.","es":"Un camión de carga mide más o menos 8 {gap}.","pt":"Um caminhão mede mais ou menos 8 {gap}.","it":"Un camion è lungo circa 8 {gap}.","nl":"Een vrachtwagen is ongeveer 8 {gap} lang.","sv":"En lastbil är ungefär 8 {gap} lång.","da":"En lastbil er cirka 8 {gap} lang.","no":"En lastebil er omtrent 8 {gap} lang.","fi":"Kuorma-auto on noin 8 {gap} pitkä."},
    q2_spoon: {"en":"A spoon is about 15 {gap} long.","de":"Ein Löffel ist ungefähr 15 {gap} lang.","fr":"Une cuillère mesure environ 15 {gap}.","es":"Una cuchara mide más o menos 15 {gap}.","pt":"Uma colher mede mais ou menos 15 {gap}.","it":"Un cucchiaio è lungo circa 15 {gap}.","nl":"Een lepel is ongeveer 15 {gap} lang.","sv":"En sked är ungefär 15 {gap} lång.","da":"En ske er cirka 15 {gap} lang.","no":"En skje er omtrent 15 {gap} lang.","fi":"Lusikka on noin 15 {gap} pitkä."},
    q2_whale: {"en":"A whale is about 15 {gap} long.","de":"Ein Wal ist ungefähr 15 {gap} lang.","fr":"Une baleine mesure environ 15 {gap}.","es":"Una ballena mide más o menos 15 {gap}.","pt":"Uma baleia mede mais ou menos 15 {gap}.","it":"Una balena è lunga circa 15 {gap}.","nl":"Een walvis is ongeveer 15 {gap} lang.","sv":"En val är ungefär 15 {gap} lång.","da":"En hval er cirka 15 {gap} lang.","no":"En hval er omtrent 15 {gap} lang.","fi":"Valas on noin 15 {gap} pitkä."},
    q2_banana: {"en":"A banana is about 20 {gap} long.","de":"Eine Banane ist ungefähr 20 {gap} lang.","fr":"Une banane mesure environ 20 {gap}.","es":"Un plátano mide más o menos 20 {gap}.","pt":"Uma banana mede mais ou menos 20 {gap}.","it":"Una banana è lunga circa 20 {gap}.","nl":"Een banaan is ongeveer 20 {gap} lang.","sv":"En banan är ungefär 20 {gap} lång.","da":"En banan er cirka 20 {gap} lang.","no":"En banan er omtrent 20 {gap} lang.","fi":"Banaani on noin 20 {gap} pitkä."},
    q2_book: {"en":"A book is about 25 {gap} long.","de":"Ein Buch ist ungefähr 25 {gap} lang.","fr":"Un livre mesure environ 25 {gap}.","es":"Un libro mide más o menos 25 {gap}.","pt":"Um livro mede mais ou menos 25 {gap}.","it":"Un libro è lungo circa 25 {gap}.","nl":"Een boek is ongeveer 25 {gap} lang.","sv":"En bok är ungefär 25 {gap} lång.","da":"En bog er cirka 25 {gap} lang.","no":"En bok er omtrent 25 {gap} lang.","fi":"Kirja on noin 25 {gap} pitkä."},
    q2_lighthouse: {"en":"A lighthouse is about 30 {gap} tall.","de":"Ein Leuchtturm ist ungefähr 30 {gap} hoch.","fr":"Un phare mesure environ 30 {gap} de haut.","es":"Un faro mide más o menos 30 {gap} de alto.","pt":"Um farol tem mais ou menos 30 {gap} de altura.","it":"Un faro è alto circa 30 {gap}.","nl":"Een vuurtoren is ongeveer 30 {gap} hoog.","sv":"En fyr är ungefär 30 {gap} hög.","da":"Et fyrtårn er cirka 30 {gap} højt.","no":"Et fyrtårn er omtrent 30 {gap} høyt.","fi":"Majakka on noin 30 {gap} korkea."}
  },/*STRINGS-END*/
  defaults: { level: 'estimate', grow: 'tap' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'estimate', labelKey: 'lEstimate' }, { value: 'unit', labelKey: 'lUnit' }] },
    { key: 'grow', type: 'choice', labelKey: 'setGrow', options: [{ value: 'tap', labelKey: 'gTap' }, { value: 'check', labelKey: 'gCheck' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['insects and bugs', 'kitchen tools', 'furniture', 'around the house', 'classroom', 'vehicles', 'beach', 'miscellaneous', 'ocean life', 'fruits', 'farm animals'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._cards = {};
    this._timers = []; this._ro = null; this._view = {}; this._album = []; this._themes = {}; this._picsReady = false;
    injectGrowingPictureCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return GrowingPictureCore.levelOf(this._setting('level')); },
  _growOnTap: function () { return this._setting('grow') !== 'check'; },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _cardText: function (r, c) { return r.level === 'unit' ? c : c + ' ' + r.unit; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = GrowingPictureCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._cards = {}; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = GrowingPictureCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._cards = P.cards; this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'growing-picture.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = GrowingPictureCore.newState(this._level(), k, this._cards && this._cards[k]);
    this._view = { note: '', soft: false, win: false, grown: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'gp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="gp-main"><div class="gp-frame" data-qa="frame"></div><div class="gp-side"></div></div><p class="gp-note" data-qa="note" aria-live="polite"></p><div class="gp-bar"></div><div class="gp-album"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), wide = W >= 560, cramp = W < 340;
    this._wide = wide;
    this._wrap.className = 'gp-wrap' + (wide ? ' is-wide' : ' is-narrow') + (cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.level;
    var fw = wide ? W - 236 : W, fh = wide ? 300 : cramp ? 200 : 220;
    this._paintFrame(fw, fh);
    this._paintSide();
    this._paintBar();
    this._paintAlbum();
    var note = this._qs('.gp-note');
    if (v.note) { note.textContent = v.note; note.className = 'gp-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'gp-note'; }
    this._setPrompt();
  },

  /* ---------- the size frame: the benchmark(s) and the picture, one scale ---------- */
  _paintFrame: function (fw, fh) {
    var st = this.st, r = st.round, v = this._view, C = GrowingPictureCore, self = this, wide = this._wide;
    var frame = this._qs('.gp-frame'); frame.innerHTML = ''; frame.style.width = fw + 'px'; frame.style.height = fh + 'px';
    var pad = wide ? 14 : 10, floorPx = wide ? 96 : 64, benchT = wide ? 26 : 20, gap = wide ? 10 : 8;
    var bs = C.benches(r), tall = r.axis === 'tall', ink = C.ink(r.obj);
    var grown = st.chosen !== null && (this._growOnTap() || st.done || st.verdict || v.grown);
    var chosenCm = grown ? C.sizeOf(r, C.chosenCard(st)) : null, ghostCm = st.verdict ? C.trueCm(r) : null;
    /* the space: benchmarks in rows (long) or columns (tall), the object on the floor */
    var benchBlock = bs.length * benchT + (bs.length - 1) * gap;
    var lenPx = tall ? fh - 2 * pad : fw - 2 * pad, thickPx = tall ? fw - 2 * pad - benchBlock - gap : fh - 2 * pad - benchBlock - gap;
    var items = bs.map(function (b) { return { cm: C.benchCm(b) }; });
    if (chosenCm) items.push({ cm: chosenCm, across: ink.across / ink.along });
    if (ghostCm) items.push({ cm: ghostCm, across: ink.across / ink.along });
    var s = C.scale(lenPx, thickPx, items);
    var o = '', svgW = fw, svgH = fh;
    /* the frame panel and its floor */
    o += '<rect class="gp-panel" x="1" y="1" width="' + (fw - 2) + '" height="' + (fh - 2) + '" rx="14"/>';
    o += '<path class="gp-floor" d="M' + pad + ' ' + (fh - pad) + 'H' + (fw - pad) + '"/>';
    var x0 = tall ? pad + benchBlock + gap : pad, floorY = fh - pad;
    bs.forEach(function (b, i) {
      var cm = C.benchCm(b), L = cm * s, along0 = tall ? floorY : pad;
      if (tall) { var bx = pad + i * (benchT + gap); o += self._bench(b, bx, floorY - L, benchT, L, true, s); }
      else { var by = pad + i * (benchT + gap); o += self._bench(b, pad, by, L, benchT, false, s); }
    });
    /* the ghost: the real size, dashed, no number — drawn last, OVER the picture, so a wrong picture never hides it */
    var og = '';
    if (ghostCm) {
      var gl = ghostCm * s, gt = Math.max(8, gl * ink.across / ink.along);
      og += tall ? '<rect class="gp-ghost" data-ghost="1" x="' + x0.toFixed(1) + '" y="' + (floorY - gl).toFixed(1) + '" width="' + gt.toFixed(1) + '" height="' + gl.toFixed(1) + '" rx="4"/>'
                : '<rect class="gp-ghost" data-ghost="1" x="' + x0.toFixed(1) + '" y="' + (floorY - gt).toFixed(1) + '" width="' + gl.toFixed(1) + '" height="' + gt.toFixed(1) + '" rx="4"/>';
    }
    frame.insertAdjacentHTML('beforeend', '<svg class="gp-art gp-frame-svg" width="' + svgW + '" height="' + svgH + '" viewBox="0 0 ' + svgW + ' ' + svgH + '" aria-hidden="true">' + o + '</svg>');
    var ghostLayer = og ? '<svg class="gp-art gp-frame-svg gp-ghostlayer" width="' + svgW + '" height="' + svgH + '" viewBox="0 0 ' + svgW + ' ' + svgH + '" aria-hidden="true">' + og + '</svg>' : '';
    /* the picture: at its estimate, or neutral (a dashed "which size?" frame) before any tap */
    var th = this._themes[C.PICS[r.obj].theme];
    if (!th || typeof LCSPictures === 'undefined') return;
    if (chosenCm) {
      var along = chosenCm * s;
      if (along >= floorPx) this._pic(frame, r.obj, along, x0, floorY, tall, st.done && v.win);
      else {
        /* too small to draw as a picture: a size bar of the true length, the picture beside it as its label */
        var bar = document.createElement('div'); bar.className = 'gp-sizebar gp-art'; bar.setAttribute('data-bar', '1');
        var bl = Math.max(2, along), bt = Math.max(4, Math.min(14, along * ink.across / ink.along));
        bar.style.cssText = tall ? 'left:' + x0.toFixed(1) + 'px;top:' + (floorY - bl).toFixed(1) + 'px;width:' + bt.toFixed(1) + 'px;height:' + bl.toFixed(1) + 'px;' : 'left:' + x0.toFixed(1) + 'px;top:' + (floorY - bt).toFixed(1) + 'px;width:' + bl.toFixed(1) + 'px;height:' + bt.toFixed(1) + 'px;';
        frame.appendChild(bar);
        /* the label: the picture in a framed chip, off to the side, with a leader line to its bar — never read as the size itself */
        var chip = document.createElement('div'); chip.className = 'gp-chip'; chip.setAttribute('data-label', '1');
        var lab = LCSPictures.img(th, r.obj, this._loc(), { size: floorPx }); lab.className = 'gp-label'; chip.appendChild(lab);
        var cw = floorPx + 10, chx, chy, ax, ay;
        if (tall) { chx = Math.min(fw - cw - pad, x0 + bt + 40); chy = Math.max(pad, floorY - bl - cw - 30); ax = x0 + bt / 2; ay = floorY - bl; }
        else { chx = Math.min(fw - cw - pad, x0 + bl + 40); chy = Math.max(pad + benchBlock + 4, floorY - bt - cw - 34); ax = x0 + bl; ay = floorY - bt; }
        chip.style.cssText = 'left:' + chx.toFixed(1) + 'px;top:' + chy.toFixed(1) + 'px;';
        frame.appendChild(chip);
        frame.insertAdjacentHTML('beforeend', '<svg class="gp-art gp-leader" width="' + fw + '" height="' + fh + '" viewBox="0 0 ' + fw + ' ' + fh + '" aria-hidden="true"><path d="M' + ax.toFixed(1) + ' ' + ay.toFixed(1) + 'L' + (chx + cw / 2).toFixed(1) + ' ' + (chy + cw).toFixed(1) + '"/><circle cx="' + ax.toFixed(1) + '" cy="' + ay.toFixed(1) + '" r="3"/></svg>');
      }
      if (ghostLayer) frame.insertAdjacentHTML('beforeend', ghostLayer);
      if (st.done && v.win) { var tag = document.createElement('div'); tag.className = 'gp-stamp'; tag.textContent = '≈ ' + (r.level === 'unit' ? r.n + ' ' + r.answer : this._cardText(r, r.answer)); tag.style.left = (tall ? x0 + 8 : x0 + Math.min(along, fw - 2 * pad) / 2) + 'px'; tag.style.top = (tall ? floorY - Math.min(along, fh) + 8 : floorY - 34) + 'px'; frame.appendChild(tag);
        /* the stamp never covers the thing: beside the label for a size bar, over the picture otherwise; always inside the frame */
        var tw = tag.offsetWidth, thh = tag.offsetHeight, tx, ty;
        if (along < floorPx) { tx = chx + cw + 8 + tw <= fw - pad ? chx + cw + 8 : chx - 8 - tw; ty = chy + (cw - thh) / 2; }
        else if (tall) { tx = x0 + 8; ty = floorY - Math.min(along, fh) + 8; }
        else { tx = x0 + Math.min(along, fw - 2 * pad) / 2 - tw / 2; ty = floorY - 34; }
        tag.style.left = Math.max(pad, Math.min(fw - pad - tw, tx)).toFixed(1) + 'px'; tag.style.top = Math.max(pad, Math.min(fh - pad - thh, ty)).toFixed(1) + 'px'; }
    } else {
      var nx = tall ? x0 + 12 : Math.max(pad, (fw - (wide ? 150 : 110)) / 2), ny = floorY - (wide ? 150 : 110);
      var box = document.createElement('div'); box.className = 'gp-neutral'; box.setAttribute('data-neutral', '1');
      box.style.cssText = 'left:' + nx.toFixed(1) + 'px;top:' + ny.toFixed(1) + 'px;width:' + (wide ? 150 : 110) + 'px;height:' + (wide ? 150 : 110) + 'px;';
      var im = LCSPictures.img(th, r.obj, this._loc(), {}); im.className = 'gp-npic'; box.appendChild(im);
      box.insertAdjacentHTML('beforeend', '<span class="gp-q">?</span>');
      frame.appendChild(box);
    }
  },
  /* place the picture so its ink runs from x0 (or the floor, standing) for exactly `along` px */
  _pic: function (frame, obj, along, x0, floorY, tall, win) {
    var C = GrowingPictureCore, p = C.PICS[obj], ink = C.ink(obj), S = along / ink.along, im = LCSPictures.img(this._themes[p.theme], obj, this._loc(), {});
    var cx = x0 - p.l * S, cy = floorY - p.b * S;
    /* the picture file is a square with transparent margins: a box the size of the ink clips them, so only the drawing takes space */
    var bx = cx + p.l * S, by = cy + p.t * S, box = document.createElement('div');
    box.className = 'gp-picbox' + (win ? ' is-win' : ''); box.setAttribute('data-picbox', obj);
    box.style.cssText = 'left:' + bx.toFixed(2) + 'px;top:' + by.toFixed(2) + 'px;width:' + ((p.r - p.l) * S).toFixed(2) + 'px;height:' + ((p.b - p.t) * S).toFixed(2) + 'px;';
    im.className = 'gp-pic'; im.setAttribute('data-pic', obj); im.setAttribute('data-qa-skip', '');
    im.style.cssText = 'left:' + (cx - S / 2 - bx).toFixed(2) + 'px;top:' + (cy - S / 2 - by).toFixed(2) + 'px;width:' + S.toFixed(2) + 'px;height:' + S.toFixed(2) + 'px;transform:rotate(' + p.ang + 'deg);';
    box.appendChild(im); frame.appendChild(box);
  },
  /* a 30-cm school ruler (0 10 20 30) or a 1-m metre stick (ten stripes), drawn to the frame's scale */
  _bench: function (b, x, y, w, h, upright, s) {
    var L = upright ? h : w, T = upright ? w : h, o = '', cm = GrowingPictureCore.benchCm(b);
    if (L < 6) L = 6;
    if (upright) { y = y + h - L; h = L; } else w = L;
    if (b === 'ruler') {
      o += '<rect class="gp-ruler" data-bench="ruler" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3"/>';
      var step = s >= 3 ? 1 : 10;
      for (var c = 0; c <= cm; c += step) { var f = c / cm, tl = c % 10 === 0 ? T * 0.45 : T * 0.25; o += upright ? '<path class="gp-tick" d="M' + x.toFixed(1) + ' ' + (y + h - f * h).toFixed(1) + 'h' + tl.toFixed(1) + '"/>' : '<path class="gp-tick" d="M' + (x + f * w).toFixed(1) + ' ' + y.toFixed(1) + 'v' + tl.toFixed(1) + '"/>'; }
      if (L >= 70) [0, 10, 20, 30].forEach(function (n) { var f = n / cm; o += upright ? '<text class="gp-bnum" x="' + (x + T * 0.72).toFixed(1) + '" y="' + (y + h - f * h + 4).toFixed(1) + '">' + n + '</text>' : '<text class="gp-bnum" x="' + (x + f * w).toFixed(1) + '" y="' + (y + T - 3).toFixed(1) + '" text-anchor="middle">' + n + '</text>'; });
    } else {
      for (var i = 0; i < 10; i++) { var a = i / 10, z = 1 / 10; o += upright ? '<rect class="gp-stripe' + (i % 2 ? ' is-b' : '') + '" x="' + x.toFixed(1) + '" y="' + (y + h - (a + z) * h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (z * h + 0.3).toFixed(1) + '"/>' : '<rect class="gp-stripe' + (i % 2 ? ' is-b' : '') + '" x="' + (x + a * w).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (z * w + 0.3).toFixed(1) + '" height="' + h.toFixed(1) + '"/>'; }
      o += '<rect class="gp-stick" data-bench="stick" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="2"/>';
      o += upright ? '<text class="gp-bnum" x="' + (x + w / 2).toFixed(1) + '" y="' + (y - 4).toFixed(1) + '" text-anchor="middle">1 m</text>' : '<text class="gp-bnum" x="' + (x + w + 4).toFixed(1) + '" y="' + (y + h - 6).toFixed(1) + '">1 m</text>';
    }
    return o;
  },

  /* ---------- the side: Gauge, the question, the cards ---------- */
  _paintSide: function () {
    var st = this.st, r = st.round, self = this, side = this._qs('.gp-side'); side.innerHTML = '';
    var head = document.createElement('div'); head.className = 'gp-head';
    var q = document.createElement('p'); q.className = 'gp-question'; q.setAttribute('data-qa', 'question');
    var chosen = GrowingPictureCore.chosenCard(st);
    var gapHtml = '<span class="gp-gap' + (chosen ? ' is-filled' : '') + '">' + (r.level === 'unit' && chosen ? chosen : '___') + '</span>';
    q.innerHTML = this._esc(this._t(GrowingPictureCore.questionKey(r))).replace('{gap}', gapHtml);
    head.appendChild(q);
    var g = this._themes['farm animals'];
    if (g && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(g, 'goat', this._loc(), { size: this._wide ? 96 : 64 }); im.className = 'gp-gauge' + (st.done && this._view.win ? ' is-nod' : ''); head.appendChild(im); }
    side.appendChild(head);
    var cards = document.createElement('div'); cards.className = 'gp-cards is-' + r.cards.length;
    st.order.forEach(function (ci, slot) {
      var c = r.cards[ci], txt = self._cardText(r, c);
      var b = self._btn('gp-card' + (st.chosen === ci ? ' is-on' : '') + (st.done && st.chosen === ci ? ' is-right' : '') + (st.verdict && st.chosen === ci ? ' is-wrong' : ''), 'card-' + slot, self._t('aCard', { v: txt }), self._esc(txt));
      b.setAttribute('data-card', String(c));
      b.addEventListener('click', function () { self._choose(ci); });
      cards.appendChild(b);
    });
    side.appendChild(cards);
  },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.gp-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('gp-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._check(); });
    el.appendChild(c);
  },
  /* ---------- Gauge's size album: the finished things, smallest to biggest ---------- */
  _paintAlbum: function () {
    var el = this._qs('.gp-album'), self = this; el.innerHTML = '';
    if (!this._album.length) { el.style.display = 'none'; return; }
    el.style.display = '';
    var cur = this.st && this.st.done ? this.st.level + '.' + this.st.k : null, size = this._wide ? 44 : 30;
    this._album.slice().sort(function (a, b) { return a.cm - b.cm || (a.obj < b.obj ? -1 : 1); }).forEach(function (it) {
      var cell = document.createElement('div'); cell.className = 'gp-acell' + (it.id === cur ? ' is-new' : '');
      var th = self._themes[GrowingPictureCore.PICS[it.obj].theme];
      if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, it.obj, self._loc(), { size: size }); im.className = 'gp-athumb'; im.setAttribute('data-mark', ''); cell.appendChild(im); }
      cell.insertAdjacentHTML('beforeend', '<span class="gp-aval">' + it.txt + '</span>');
      el.appendChild(cell);
    });
    /* on a phone the album is one row: keep the newest thing in view */
    var nw = el.querySelector('.is-new'); if (nw && !this._wide) el.scrollLeft = Math.max(0, nw.offsetLeft - (el.clientWidth - nw.offsetWidth) / 2);
  },

  /* ---------------- the hand ---------------- */
  _choose: function (ci) {
    var st = this.st, C = GrowingPictureCore;
    if (!C.choose(st, ci)) return false;
    this._view.note = ''; this._view.grown = false;
    var cm = C.sizeOf(st.round, st.round.cards[ci]);
    this.api.sound(Math.max(180, Math.min(1400, 1100 - 160 * Math.log10(cm + 1))));
    this._paint();
    return true;
  },
  _keyboard: function (e) {
    var st = this.st; if (!st) return;
    var n = st.round.cards.length, k = e.key;
    if (/^[1-3]$/.test(k) && +k <= n) { e.preventDefault(); this._choose(st.order[+k - 1]); }
    else if (k === 'ArrowLeft' || k === 'ArrowRight') { e.preventDefault(); var slot = st.chosen === null ? -1 : st.order.indexOf(st.chosen); slot = k === 'ArrowRight' ? Math.min(n - 1, slot + 1) : Math.max(0, slot - 1); this._choose(st.order[slot]); }
    else if (k === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = GrowingPictureCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    v.grown = true;
    if (r.result === 'ok') { this._success(); return; }
    v.soft = false; v.note = this._t(C.hint(st));
    this._paint();
    this.api.announce(this._t('aGhost') + ' ' + v.note);
    this.api.sound(240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = GrowingPictureCore, id = st.level + '.' + st.k;
    var msg = r.level === 'unit' ? this._t('okUnit', { v: r.n + ' ' + r.answer }) : this._t(C.okKey(r));
    v.note = ''; v.win = true;
    if (!this._album.some(function (x) { return x.id === id; })) this._album.push({ id: id, obj: r.obj, cm: C.trueCm(r), txt: r.level === 'unit' ? r.n + ' ' + r.answer : r.answer + ' ' + r.unit });
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectGrowingPictureCSS() {
  if (typeof document === 'undefined' || document.getElementById('gp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.gp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .gp-wrap:focus{outline:none;}'
  + '.gp-main{display:flex;gap:16px;align-items:stretch;width:100%;} .gp-wrap.is-narrow .gp-main{flex-direction:column;gap:8px;align-items:center;}'
  + '.gp-frame{position:relative;flex:none;overflow:hidden;border-radius:14px;}'
  + '.gp-frame-svg{position:absolute;left:0;top:0;}'
  + '.gp-panel{fill:#FBF3E4;stroke:#CDBFA4;stroke-width:2;} .gp-floor{stroke:#B08550;stroke-width:3;stroke-linecap:round;}'
  + '.gp-ruler{fill:#F6E7C8;stroke:#B08550;stroke-width:1.5;} .gp-tick{stroke:#6B4E2E;stroke-width:1.2;} .gp-bnum{font-family:' + B + ';font-weight:800;font-size:14px;fill:' + INK + ';}'
  + '.gp-stripe{fill:#2E9C88;} .gp-stripe.is-b{fill:#FFFDF6;} .gp-stick{fill:none;stroke:#146B5E;stroke-width:1.5;}'
  + '.gp-ghostlayer{pointer-events:none;} .gp-ghost{fill:rgba(255,253,246,.62);stroke:#0F5247;stroke-width:3;stroke-dasharray:8 5;}'
  + '.gp-pic{position:absolute;display:block;object-fit:contain;pointer-events:none;transform-origin:50% 50%;transition:none;} .gp-picbox{position:absolute;overflow:hidden;pointer-events:none;} .gp-picbox.is-win{filter:drop-shadow(0 0 6px rgba(46,156,136,.55));}'
  + '.gp-sizebar{position:absolute;background:#F2784B;border-radius:3px;} .gp-chip{position:absolute;padding:4px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #F2784B;} .gp-label{display:block;object-fit:contain;} .gp-leader{position:absolute;left:0;top:0;pointer-events:none;} .gp-leader path{stroke:#F2784B;stroke-width:2;stroke-dasharray:4 3;fill:none;} .gp-leader circle{fill:#F2784B;}'
  + '.gp-neutral{position:absolute;border:3px dashed #9AB8B1;border-radius:14px;box-sizing:border-box;} .gp-npic{width:100%;height:100%;object-fit:contain;display:block;opacity:.9;}'
  + '.gp-q{position:absolute;right:6px;top:2px;font-family:' + H + ';font-weight:800;font-size:28px;color:#146B5E;line-height:1;}'
  + '.gp-stamp{position:absolute;padding:2px 10px;border-radius:10px;background:#FFE9C9;box-shadow:inset 0 0 0 2px #F2B33D;font-family:' + H + ';font-weight:800;font-size:20px;color:' + INK + ';white-space:nowrap;}'
  + '.gp-side{display:flex;flex-direction:column;gap:12px;flex:1;min-width:0;} .gp-wrap.is-narrow .gp-side{width:100%;gap:8px;}'
  + '.gp-head{display:flex;align-items:flex-start;gap:8px;} .gp-question{margin:0;flex:1;font-family:' + B + ';font-weight:800;font-size:22px;line-height:1.3;color:' + INK + ';} .gp-wrap.is-narrow .gp-question{font-size:19px;}'
  + '.gp-gauge{display:block;width:96px;height:96px;object-fit:contain;flex:none;} .gp-wrap.is-narrow .gp-gauge{width:64px;height:64px;} .gp-gauge.is-nod{animation:gpNod .6s ease-in-out 2;}'
  + '.gp-gap{display:inline-block;min-width:46px;padding:0 4px;border-bottom:3px solid #146B5E;text-align:center;color:#146B5E;} .gp-gap.is-filled{color:#C4522F;}'
  + '.gp-cards{display:flex;flex-direction:column;gap:10px;} .gp-wrap.is-narrow .gp-cards{flex-direction:row;justify-content:center;gap:8px;}'
  + '.gp-card{min-height:60px;padding:0 12px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';cursor:pointer;}'
  + '.gp-wrap.is-narrow .gp-card{flex:1;min-width:0;max-width:130px;min-height:56px;font-size:20px;padding:0 6px;} .gp-cards.is-2 .gp-card{font-size:28px;}'
  + '.gp-card.is-on{box-shadow:inset 0 0 0 3px #F2784B,0 3px 0 #F2784B;background:#FFF1E8;} .gp-card.is-right{box-shadow:inset 0 0 0 3px #2E9C88,0 3px 0 #2E9C88;background:#E9F4EE;}'
  + '.gp-bar{display:flex;justify-content:center;} .gp-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .gp-go svg{width:22px;height:22px;display:block;}'
  + '.gp-wrap.is-narrow .gp-go{height:44px;font-size:20px;}'
  + '.gp-note{margin:0;max-width:640px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .gp-wrap.is-narrow .gp-note{font-size:16px;line-height:1.25;} .gp-note:empty{display:none;} .gp-note.is-hint{color:#9A3D1C;}'
  + '.gp-album{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:6px;max-width:100%;padding:6px 8px;border-radius:12px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;box-sizing:border-box;} .gp-wrap.is-narrow .gp-album{flex-wrap:nowrap;justify-content:safe center;overflow-x:auto;width:100%;scrollbar-width:thin;} .gp-wrap.is-narrow .gp-acell{flex:none;} .gp-wrap.is-narrow.is-done .gp-side{display:none;}'
  + '.gp-acell{display:flex;flex-direction:column;align-items:center;gap:1px;} .gp-athumb{display:block;object-fit:contain;} .gp-aval{font-family:' + H + ';font-weight:800;font-size:14px;line-height:1.1;color:' + INK + ';white-space:nowrap;} .gp-acell.is-new .gp-aval{color:#C4522F;}'
  + '.gp-card:focus-visible,.gp-go:focus-visible{outline:3px solid #2E5BD6;outline-offset:2px;}'
  + '@keyframes gpNod{0%,100%{transform:none}50%{transform:translateY(-6px) rotate(-4deg)}}'
  + '@media (prefers-reduced-motion:reduce){.gp-gauge{animation:none !important;}}';
  var st = document.createElement('style'); st.id = 'gp-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.GrowingPictureActivity = GrowingPictureActivity;
