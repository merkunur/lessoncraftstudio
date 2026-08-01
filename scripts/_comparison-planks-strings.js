/* =====================================================================
   _comparison-planks-strings.js — the SoT for TOOL #42's UI strings
   ---------------------------------------------------------------------
   20 keys × 11 locales. Applied by apply-comparison-planks-locales.js.
   ⚠ NEVER hand-edit the strings block in `mini tools/comparison-planks.js`.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Three panels of native
   speakers — a linguist, a K-3 educator and a marketer per locale —
   built each language from the apparatus, not from the English. Every
   panel renamed the tool, and each caught a trap invisible from
   English:

     de  Klammer = PARENTHESIS in maths, unusable in a tool forbidden
         from writing arithmetic; and Bügel + Brett reads as Bügelbrett,
         an ironing board. Hence `Henkel`. `Rest` = division remainder.
     it  graffa = the brace AND a PAPER CLIP — a banned non-standard
         unit smuggled in via the apparatus's own name. Hence
         `parentesi`. And `testa a testa` was rejected for layBtn: it is
         a real butt-joint term, but its dominant reading is
         NECK-AND-NECK, a race — a competition idiom on a tool under a
         no-competition lock.
     es  `tabla` = the TIMES TABLES. `par` = an EVEN NUMBER, so "another
         pair" became `pareja`. `vara` is a real historical unit.
         ⚠ And es `hintCarry` REPEATS the noun where English says "it":
         tablón and recorte are BOTH masculine, so a clitic would leave
         a six-year-old two valid antecedents to guess between.
     pt  `tábua` sits one syllable from `tabuada`.
     nl  ⭐ `plank` means SHELF first and heart-words already owns it
         (Woordplanken) — the tool's own English NAME does not survive
         contact with Dutch. Hence `lat`.
     sv  `bana` is unusable: its definite `banan` is the banana. And
         `kant i kant` is already measurement-bench's, in sv AND no.
     da  `for enden` belongs to #40, the immediate sibling — so the
         BUTTON took `ende mod ende` while the ordinary preposition
         stays in the prose, because a chip label reads as an identity.
     fi  `lauta : laudat` sits one step from `lautanen : lautaset`,
         which fraction-kitchen owns. Hence `lankku`. `jatkoksi` (the
         translative, "as a continuation of") and `paikalleen` each do
         a whole English phrase in one word.

   ⭐ AND THE PANELS AUDITED THE ENGLISH, which is the only review it
   ever gets. They found two live MODEL bugs by reading the code —
   `hintCarry` firing during the phase that LOCKS sideways motion, and
   one element answering to one name in two jobs — plus a FOURTH NAMED
   PART I had introduced while fixing an a11y finding. All fixed in the
   tool, not papered over here.

   ⚠⚠ ONE FENCE IS NOT ENFORCEABLE FROM THIS FILE. `hintSay` asks the
   class to say how long the piece is, which has the SAME ANSWER as
   `span-length-gap`'s banned "how much longer is it". What separates
   the two tools is BEHAVIOURAL — this one takes no input, ever. An
   edit to `hintSay` in any locale could cross that line with no gate
   noticing. If this tool ever grows a keypad, this key goes first.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    title: "The Planks",
    instruction: "Two planks start from the same line. Make one longer than the other, then take the piece that sticks out off the long plank and lay it at the end of the short one.",
    sceneLabel: "Two planks starting from one line. Whenever one reaches further than the other, a bracket appears over the piece that sticks out, and that piece can be carried to the end of the shorter plank.",
    hintSame: "Both planks are the same length, so nothing sticks out. Drag one end to make them different.",
    hintTake: "One plank reaches further than the other. Drag the bracket downwards to take off the piece that sticks out.",
    hintSay: "Before you move it, say out loud how long that piece is.",
    hintCarry: "The long plank is now missing that piece. Carry it to the end of the shorter plank.",
    hintSeated: "The short plank and the piece together reach exactly to where the long plank ends.",
    takeBtn: "Take the piece off",
    layBtn: "Lay it end to end",
    putBackBtn: "Put it back where it was",
    nextBtn: "Another pair",
    printBtn: "Print the sheet",
    plankAAria: "the top plank. Drag its end to make it longer or shorter.",
    plankBAria: "the bottom plank. Drag its end to make it longer or shorter.",
    bracketAria: "the bracket over the piece that sticks out. Drag it down to take the piece off.",
    offcutAria: "the piece that sticks out. Drag it to carry it.",
    gateTitle: "More pairs",
    gateBody: "Eleven more pairs, ordered so each one surprises after the one before, and the sheet to print for working on paper.",
    gateCta: "See the Teacher plan"
  },

  de: {
    title: "Zwei Bretter, eine Linie",
    instruction: "Zwei Bretter beginnen an derselben Linie. Macht eines länger als das andere, nehmt dann das überstehende Endstück vom langen Brett ab und legt es an das Ende des kurzen.",
    sceneLabel: "Zwei Bretter, die an derselben Linie beginnen. Sobald ein Brett weiter reicht als das andere, erscheint ein Henkel über dem überstehenden Endstück, und dieses Endstück lässt sich an das Ende des kürzeren Brettes tragen.",
    hintSame: "Beide Bretter sind gleich lang, also steht nichts über. Zieht an einem Ende, damit sie unterschiedlich lang werden.",
    hintTake: "Ein Brett reicht weiter als das andere. Zieht den Henkel nach unten, dann löst sich das überstehende Endstück ab.",
    hintSay: "Sagt laut, wie lang das Endstück ist, bevor ihr es bewegt.",
    hintCarry: "Dem langen Brett fehlt jetzt dieses Endstück. Tragt es an das Ende des kürzeren Brettes.",
    hintSeated: "Das kurze Brett und das Endstück reichen zusammen genau bis dorthin, wo das lange Brett endet.",
    takeBtn: "Endstück abnehmen",
    layBtn: "Ans Brettende anlegen",
    putBackBtn: "Endstück zurücklegen",
    nextBtn: "Neues Paar",
    printBtn: "Arbeitsblatt drucken",
    plankAAria: "das obere Brett. Zieht am Ende, um es länger oder kürzer zu machen.",
    plankBAria: "das untere Brett. Zieht am Ende, um es länger oder kürzer zu machen.",
    bracketAria: "der Henkel über dem überstehenden Endstück. Zieht ihn nach unten, um das Endstück abzunehmen.",
    offcutAria: "das überstehende Endstück. Zieht es, um es zu tragen.",
    gateTitle: "Mehr Paare",
    gateBody: "Elf weitere Paare, so geordnet, dass jedes nach dem vorherigen überrascht, dazu das Arbeitsblatt zum Ausdrucken.",
    gateCta: "Lehrer-Paket ansehen"
  },

  fr: {
    title: "Deux planches, un même départ",
    instruction: "Deux planches partent de la même ligne. Faites-en une plus longue que l'autre, puis retirez de la planche longue le bout qui dépasse et posez-le à l'extrémité de la courte.",
    sceneLabel: "Deux planches qui partent de la même ligne. Dès qu'une planche va plus loin que l'autre, une accolade apparaît au-dessus du bout qui dépasse, et ce bout peut être porté jusqu'à l'extrémité de la planche courte.",
    hintSame: "Les deux planches ont la même longueur, donc rien ne dépasse. Faites glisser une extrémité pour leur donner des longueurs différentes.",
    hintTake: "Une planche va plus loin que l'autre. Faites glisser l'accolade vers le bas pour détacher le bout qui dépasse.",
    hintSay: "Avant de le déplacer, dites à voix haute quelle est la longueur de ce bout.",
    hintCarry: "Il manque maintenant ce bout à la planche longue. Portez-le jusqu'à l'extrémité de la planche courte.",
    hintSeated: "Ensemble, la planche courte et le bout arrivent exactement là où se termine la planche longue.",
    takeBtn: "Détacher le bout",
    layBtn: "Poser bout à bout",
    putBackBtn: "Remettre à sa place",
    nextBtn: "Une autre paire",
    printBtn: "Imprimer la fiche",
    plankAAria: "la planche du haut. Faites glisser son extrémité pour l'allonger ou la raccourcir.",
    plankBAria: "la planche du bas. Faites glisser son extrémité pour l'allonger ou la raccourcir.",
    bracketAria: "l'accolade au-dessus du bout qui dépasse. Faites-la glisser vers le bas pour détacher le bout.",
    offcutAria: "le bout qui dépasse. Faites-le glisser pour le porter.",
    gateTitle: "D'autres paires",
    gateBody: "Onze autres paires, ordonnées pour que chacune surprenne après la précédente, et la fiche à imprimer pour le travail sur papier.",
    gateCta: "Voir l'offre Enseignant"
  },

  es: {
    title: "Los dos tablones",
    instruction: "Dos tablones salen de la misma línea. Haz uno más largo que el otro, quita del tablón largo el recorte que sobresale y ponlo justo al final del corto.",
    sceneLabel: "Dos tablones que salen de la misma línea. Cuando uno llega más lejos que el otro, aparece un corchete sobre el recorte que sobresale, y ese recorte se puede llevar hasta el extremo del tablón corto.",
    hintSame: "Los dos tablones son igual de largos, así que no sobresale nada. Arrastra un extremo para hacerlos distintos.",
    hintTake: "Un tablón llega más lejos que el otro. Arrastra el corchete hacia abajo para quitar el recorte que sobresale.",
    hintSay: "Antes de moverlo, di en voz alta cuánto mide ese recorte.",
    hintCarry: "Al tablón largo ahora le falta ese recorte. Lleva el recorte hasta el extremo del tablón corto.",
    hintSeated: "El tablón corto con el recorte llega exactamente hasta donde termina el tablón largo.",
    takeBtn: "Quitar el recorte",
    layBtn: "Unirlo punta con punta",
    putBackBtn: "Devolverlo a su lugar",
    nextBtn: "Otra pareja",
    printBtn: "Imprimir la hoja",
    plankAAria: "el tablón de arriba. Arrastra su extremo para hacerlo más largo o más corto.",
    plankBAria: "el tablón de abajo. Arrastra su extremo para hacerlo más largo o más corto.",
    bracketAria: "el corchete sobre el recorte que sobresale. Arrástralo hacia abajo para quitar el recorte.",
    offcutAria: "el recorte que sobresale. Arrástralo para llevarlo.",
    gateTitle: "Más parejas",
    gateBody: "Once parejas más, ordenadas para que cada una sorprenda después de la anterior, y la hoja para imprimir y trabajar en papel.",
    gateCta: "Ver el plan Docente"
  },

  pt: {
    title: "As Duas Ripas",
    instruction: "Duas ripas começam na mesma linha. Deixe uma mais comprida que a outra, tire da comprida o retalho que passa e ponha bem na ponta da curta.",
    sceneLabel: "Duas ripas que começam na mesma linha. Sempre que uma chega mais longe que a outra, aparece um colchete sobre o retalho que passa, e esse retalho pode ser levado até a ponta da ripa curta.",
    hintSame: "As duas ripas estão do mesmo tamanho, então nada passa da outra. Arraste uma ponta para deixá-las diferentes.",
    hintTake: "Uma ripa chega mais longe que a outra. Arraste o colchete para baixo para tirar o retalho que passa.",
    hintSay: "Antes de mover, diga em voz alta quanto mede esse retalho.",
    hintCarry: "Agora a ripa comprida está sem esse retalho. Leve-o até a ponta da ripa curta.",
    hintSeated: "A ripa curta com o retalho chega exatamente até onde a ripa comprida termina.",
    takeBtn: "Tirar o retalho",
    layBtn: "Pôr ponta com ponta",
    putBackBtn: "Pôr de volta no lugar",
    nextBtn: "Outra dupla",
    printBtn: "Imprimir a folha",
    plankAAria: "a ripa de cima. Arraste a ponta para deixá-la mais comprida ou mais curta.",
    plankBAria: "a ripa de baixo. Arraste a ponta para deixá-la mais comprida ou mais curta.",
    bracketAria: "o colchete sobre o retalho que passa. Arraste para baixo para tirar o retalho.",
    offcutAria: "o retalho que passa da outra ripa. Arraste para levá-lo.",
    gateTitle: "Mais duplas",
    gateBody: "Mais onze duplas, na ordem certa para que cada uma surpreenda depois da anterior, e a folha para imprimir e trabalhar no papel.",
    gateCta: "Ver o plano Professor"
  },

  it: {
    title: "Le due travi",
    instruction: "Due travi partono dalla stessa linea. Rendetene una più lunga dell'altra, poi staccate dalla lunga il ritaglio che sporge e mettetelo in fondo a quella corta.",
    sceneLabel: "Due travi che partono dalla stessa linea. Ogni volta che una arriva più lontano dell'altra, sopra il ritaglio che sporge compare una parentesi, e quel ritaglio si può portare in fondo alla trave corta.",
    hintSame: "Le due travi sono lunghe uguali, quindi non sporge niente. Trascinate un'estremità per renderle diverse.",
    hintTake: "Una trave arriva più lontano dell'altra. Trascinate la parentesi verso il basso per staccare il ritaglio che sporge.",
    hintSay: "Prima di spostarlo, dite ad alta voce quanto è lungo quel ritaglio.",
    hintCarry: "Ora alla trave lunga manca quel ritaglio. Portatelo in fondo alla trave corta.",
    hintSeated: "La trave corta con il ritaglio arriva esattamente dove finisce la trave lunga.",
    takeBtn: "Stacca il ritaglio",
    layBtn: "Mettilo di seguito",
    putBackBtn: "Rimettilo a posto",
    nextBtn: "Un'altra coppia",
    printBtn: "Stampa il foglio",
    plankAAria: "la trave in alto. Trascina l'estremità per renderla più lunga o più corta.",
    plankBAria: "la trave in basso. Trascina l'estremità per renderla più lunga o più corta.",
    bracketAria: "la parentesi sopra il ritaglio che sporge. Trascinala verso il basso per staccare il ritaglio.",
    offcutAria: "il ritaglio che sporge. Trascinalo per portarlo.",
    gateTitle: "Altre coppie",
    gateBody: "Altre undici coppie, in un ordine in cui ognuna sorprende dopo la precedente, e il foglio da stampare per lavorare su carta.",
    gateCta: "Il piano Insegnante"
  },

  nl: {
    title: "De latten",
    instruction: "Twee latten beginnen bij dezelfde streep. Maak de ene langer dan de andere, haal dan het stuk dat uitsteekt van de lange lat af en leg het aan het eind van de korte.",
    sceneLabel: "Twee latten die bij dezelfde streep beginnen. Zodra de ene verder komt dan de andere, verschijnt er een beugel over het stuk dat uitsteekt, en dat stuk kun je naar het eind van de korte lat brengen.",
    hintSame: "De latten zijn even lang, dus er steekt niets uit. Sleep aan een uiteinde om ze verschillend te maken.",
    hintTake: "De ene lat komt verder dan de andere. Sleep de beugel naar beneden om het stuk dat uitsteekt eraf te halen.",
    hintSay: "Zeg eerst hardop hoe lang dat stuk is, voordat je het verplaatst.",
    hintCarry: "De lange lat mist dat stuk nu. Breng het naar het eind van de korte lat.",
    hintSeated: "De korte lat en het stuk komen samen precies tot waar de lange lat eindigt.",
    takeBtn: "Haal het stuk eraf",
    layBtn: "Leg het aan het eind",
    putBackBtn: "Leg het weer terug",
    nextBtn: "Ander paar",
    printBtn: "Print het blad",
    plankAAria: "de bovenste lat. Sleep aan het uiteinde om hem langer of korter te maken.",
    plankBAria: "de onderste lat. Sleep aan het uiteinde om hem langer of korter te maken.",
    bracketAria: "de beugel over het stuk dat uitsteekt. Sleep hem naar beneden om het stuk eraf te halen.",
    offcutAria: "het stuk dat uitsteekt. Sleep het om het te verplaatsen.",
    gateTitle: "Meer paren",
    gateBody: "Nog elf paren, zo op volgorde dat elk paar verrast na het vorige, en het blad om af te drukken om op papier te werken.",
    gateCta: "Bekijk het Leerkracht-pakket"
  },

  sv: {
    title: "Plankorna",
    instruction: "Två plankor börjar vid samma streck. Gör den ena längre än den andra, ta sedan av stumpen som sticker ut på den långa plankan och lägg den i änden av den korta.",
    sceneLabel: "Två plankor som börjar vid samma streck. Så snart den ena når längre än den andra visas en klammer över stumpen som sticker ut, och stumpen går att bära till änden av den korta plankan.",
    hintSame: "Plankorna är lika långa, så ingenting sticker ut. Dra i en ände så blir de olika.",
    hintTake: "Den ena plankan når längre än den andra. Dra klammern nedåt för att ta av stumpen som sticker ut.",
    hintSay: "Säg högt hur lång stumpen är innan ni flyttar den.",
    hintCarry: "Den långa plankan saknar nu stumpen. Bär den till änden av den korta plankan.",
    hintSeated: "Den korta plankan och stumpen når tillsammans precis dit den långa plankan slutar.",
    takeBtn: "Ta av stumpen",
    layBtn: "Lägg den i änden",
    putBackBtn: "Lägg den där den satt",
    nextBtn: "Nytt par",
    printBtn: "Skriv ut bladet",
    plankAAria: "den övre plankan. Dra i änden för att göra den längre eller kortare.",
    plankBAria: "den nedre plankan. Dra i änden för att göra den längre eller kortare.",
    bracketAria: "klammern över stumpen som sticker ut. Dra den nedåt för att ta av stumpen.",
    offcutAria: "stumpen som sticker ut. Dra den för att bära den.",
    gateTitle: "Fler par",
    gateBody: "Elva par till, ordnade så att varje par överraskar efter det förra, och bladet att skriva ut för att arbeta på papper.",
    gateCta: "Se Lärarpaketet"
  },

  da: {
    title: "Brædderne",
    instruction: "To brædder starter ved den samme streg. Gør det ene længere end det andet, tag så det stykke, der rager ud, af det lange bræt, og læg det for enden af det korte.",
    sceneLabel: "To brædder, der starter ved den samme streg. Så snart det ene når længere end det andet, kommer der en bøjle over det stykke, der rager ud, og stykket kan flyttes hen for enden af det korte bræt.",
    hintSame: "Brædderne er lige lange, så der rager ikke noget ud. Træk i en ende, så bliver de forskellige.",
    hintTake: "Det ene bræt når længere end det andet. Træk bøjlen nedad for at tage det stykke af, der rager ud.",
    hintSay: "Sig højt, hvor langt stykket er, før I flytter det.",
    hintCarry: "Det lange bræt mangler nu det stykke. Flyt det hen for enden af det korte bræt.",
    hintSeated: "Det korte bræt og stykket når tilsammen præcis derhen, hvor det lange bræt ender.",
    takeBtn: "Tag stykket af",
    layBtn: "Læg det ende mod ende",
    putBackBtn: "Læg det, hvor det sad",
    nextBtn: "Nyt par",
    printBtn: "Print arket",
    plankAAria: "det øverste bræt. Træk i enden for at gøre det længere eller kortere.",
    plankBAria: "det nederste bræt. Træk i enden for at gøre det længere eller kortere.",
    bracketAria: "bøjlen over det stykke, der rager ud. Træk den nedad for at tage stykket af.",
    offcutAria: "det stykke, der rager ud. Træk det for at flytte det.",
    gateTitle: "Flere par",
    gateBody: "Elleve par mere, sat i en rækkefølge, hvor hvert par overrasker efter det forrige, og arket til at printe, så I kan arbejde på papir.",
    gateCta: "Se Lærerabonnementet"
  },

  no: {
    title: "Fjølene",
    instruction: "To fjøler starter fra samme strek. Gjør den ene lengre enn den andre, ta så av biten som stikker ut på den lange fjøla, og legg den i enden av den korte.",
    sceneLabel: "To fjøler som starter fra samme strek. Så snart den ene når lenger enn den andre, kommer det en bue over biten som stikker ut, og biten kan flyttes til enden av den korte fjøla.",
    hintSame: "Fjølene er like lange, så ingenting stikker ut. Dra i en ende, så blir de ulike.",
    hintTake: "Den ene fjøla når lenger enn den andre. Dra buen nedover for å ta av biten som stikker ut.",
    hintSay: "Si høyt hvor lang biten er før dere flytter den.",
    hintCarry: "Den lange fjøla mangler nå biten. Flytt den til enden av den korte fjøla.",
    hintSeated: "Den korte fjøla og biten når til sammen nøyaktig dit den lange fjøla slutter.",
    takeBtn: "Ta av biten",
    layBtn: "Legg den i enden",
    putBackBtn: "Legg den der den satt",
    nextBtn: "Nytt par",
    printBtn: "Skriv ut arket",
    plankAAria: "den øverste fjøla. Dra i enden for å gjøre den lengre eller kortere.",
    plankBAria: "den nederste fjøla. Dra i enden for å gjøre den lengre eller kortere.",
    bracketAria: "buen over biten som stikker ut. Dra den nedover for å ta av biten.",
    offcutAria: "biten som stikker ut. Dra den for å flytte den.",
    gateTitle: "Flere par",
    gateBody: "Elleve par til, satt opp slik at hvert par overrasker etter det forrige, og arket til å skrive ut, så dere kan jobbe på papir.",
    gateCta: "Se Lærerabonnementet"
  },

  fi: {
    title: "Lankut",
    instruction: "Kaksi lankkua lähtee samalta viivalta. Tee toisesta lankusta pidempi kuin toisesta, irrota sitten pitkästä lankusta yli jäävä pala ja aseta se lyhyen lankun jatkoksi.",
    sceneLabel: "Kaksi samalta viivalta lähtevää lankkua. Heti kun toinen yltää pidemmälle kuin toinen, yli jäävän palan päälle ilmestyy kaari, ja palan voi siirtää lyhyen lankun päähän.",
    hintSame: "Lankut ovat yhtä pitkiä, joten mitään ei jää yli. Vedä toisen päästä, niin niistä tulee eripituiset.",
    hintTake: "Toinen lankku yltää pidemmälle kuin toinen. Vedä kaarta alaspäin, niin saat yli jäävän palan irti.",
    hintSay: "Sanokaa ääneen, kuinka pitkä pala on, ennen kuin siirrätte sen.",
    hintCarry: "Pitkästä lankusta puuttuu nyt tuo pala. Siirrä se lyhyen lankun päähän.",
    hintSeated: "Lyhyt lankku ja pala yltävät yhdessä täsmälleen siihen kohtaan, johon pitkä lankku päättyy.",
    takeBtn: "Irrota pala",
    layBtn: "Aseta jatkoksi",
    putBackBtn: "Palauta paikalleen",
    nextBtn: "Uusi pari",
    printBtn: "Tulosta arkki",
    plankAAria: "ylempi lankku. Vedä päästä, niin lankku pitenee tai lyhenee.",
    plankBAria: "alempi lankku. Vedä päästä, niin lankku pitenee tai lyhenee.",
    bracketAria: "kaari yli jäävän palan päällä. Vedä sitä alaspäin, niin pala irtoaa.",
    offcutAria: "yli jäävä pala. Siirrä sitä vetämällä.",
    gateTitle: "Lisää pareja",
    gateBody: "Yksitoista paria lisää järjestyksessä, jossa jokainen pari yllättää edellisen jälkeen, sekä tulostettava arkki paperilla työskentelyyn.",
    gateCta: "Tutustu Opettaja-tilaukseen"
  }
};
