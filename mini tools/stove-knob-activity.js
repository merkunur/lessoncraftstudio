/* =====================================================================
   stove-knob-activity.js — ACTIVITY #134 of the one-by-one rebuild:
   "Pesto's Soup Stall" → THE STOVE KNOB (L.1.5.d; all 11 locales).
   Model: stove-knob-core.js (StoveKnobCore).
   Design: docs/activities-rebuild/designs/134-shades.md
   ---------------------------------------------------------------------
   The invention: a stove knob with a word on every click. The flame
   follows the CLICK (one more tongue per click); the soup in Pesto's pot
   follows the WORD on that click (its colour deepens with the word's real
   strength). The child puts the words on the clicks and turns it up: when
   the order is right, flame and soup rise together; a word out of place
   makes the soup jump. Level 2 reads an order ticket and turns the knob
   to the word it needs; level 3 hangs twin words on one click; level 4
   sorts going and looking words onto two knobs. No timer, no score.
   Test seams: window.StoveKnobActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._tile / ._win / ._turn /
   ._check / .FAST / .OK_MS.
   ===================================================================== */
var StoveKnobActivity = {
  id: 'stove-knob',
  /* the drawn apparatus (the hierarchy gate): the pot and its soup, the flame, the knob and its click windows */
  apparatusClasses: ['sk-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"The Stove Knob",de:"Der Herdknopf",fr:"Le bouton du feu",es:"La perilla de la estufa",pt:"O botão do fogão",it:"La manopola del fornello",nl:"De fornuisknop",sv:"Spisvredet",da:"Komfurknappen",no:"Komfyrbryteren",fi:"Lieden nuppi"},
    instruction: {en:"Put a word on every click of Pesto's knob, from a little to a lot. Then press Turn it up: the flame and the soup should grow together.",de:"Leg auf jede Stufe von Pestos Herdknopf ein Wort, von ein bisschen bis ganz viel. Drück dann auf Aufdrehen: Flamme und Suppe sollen zusammen wachsen.",fr:"Mets un mot sur chaque cran du bouton de Pesto, d’un peu à beaucoup. Puis appuie sur Monter le feu : la flamme et la soupe doivent grandir ensemble.",es:"Pon una palabra en cada punto de la perilla de Pesto, de poquito a muchísimo. Luego aprieta Subir el fuego: la llama y la sopa deben crecer juntas.",pt:"Coloque uma palavra em cada posição do botão do Pesto, de um pouquinho a muito. Depois aperte Aumentar o fogo: a chama e a sopa devem crescer juntas.",it:"Metti una parola su ogni scatto della manopola di Pesto, da poco a tanto. Poi premi Alza la fiamma: la fiamma e la minestra devono crescere insieme.",nl:"Leg op elke stand van Pesto's knop een woord, van een beetje tot heel veel. Druk dan op Vuur hoger: de vlam en de soep moeten samen groeien.",sv:"Lägg ett ord på varje läge på Pestos vred, från lite till mycket. Tryck sedan på Vrid upp: lågan och soppan ska växa tillsammans.",da:"Læg et ord på hvert trin på Pestos knap, fra lidt til meget. Tryk så på Skru op: flammen og suppen skal vokse sammen.",no:"Legg et ord på hvert trinn på Pestos bryter, fra litt til mye. Trykk så på Skru opp: flammen og suppa skal vokse sammen.",fi:"Laita jokaiseen Peston nupin asentoon sana, vähästä paljoon. Paina sitten Käännä isommalle: liekin ja keiton pitää kasvaa yhdessä."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Put the words in order, from a little to a lot.",de:"Ordne die Wörter, von ein bisschen bis ganz viel.",fr:"Range les mots, d’un peu à beaucoup.",es:"Ordena las palabras, de poquito a muchísimo.",pt:"Coloque as palavras em ordem, de um pouquinho a muito.",it:"Metti le parole in ordine, da poco a tanto.",nl:"Zet de woorden op volgorde, van een beetje tot heel veel.",sv:"Sätt orden i ordning, från lite till mycket.",da:"Sæt ordene i rækkefølge, fra lidt til meget.",no:"Sett ordene i rekkefølge, fra litt til mye.",fi:"Laita sanat järjestykseen, vähästä paljoon."},
    t2: {en:"Read the ticket. Turn the knob to the word it needs, then serve.",de:"Lies den Zettel. Dreh den Knopf auf das Wort, das passt, und servier.",fr:"Lis le ticket. Tourne le bouton jusqu’au mot qu’il faut, puis sers.",es:"Lee el papelito. Gira la perilla hasta la palabra que pide y sirve.",pt:"Leia o pedido. Gire o botão até a palavra certa e sirva.",it:"Leggi il biglietto. Gira la manopola sulla parola giusta, poi servi.",nl:"Lees het bonnetje. Draai de knop naar het woord dat past en schep op.",sv:"Läs lappen. Vrid vredet till ordet som behövs och servera.",da:"Læs sedlen. Drej knappen hen til det ord, der passer, og servér.",no:"Les lappen. Vri bryteren til ordet som passer, og server.",fi:"Lue lappu. Käännä nuppi oikeaan sanaan ja tarjoile."},
    t3: {en:"Words that mean the same share a click.",de:"Wörter, die dasselbe bedeuten, teilen sich eine Stufe.",fr:"Les mots qui veulent dire la même chose partagent un cran.",es:"Las palabras que significan lo mismo comparten un punto.",pt:"Palavras que querem dizer a mesma coisa ficam na mesma posição.",it:"Le parole che vogliono dire la stessa cosa stanno sullo stesso scatto.",nl:"Woorden die hetzelfde betekenen, delen een stand.",sv:"Ord som betyder samma sak delar ett läge.",da:"Ord, der betyder det samme, deler et trin.",no:"Ord som betyr det samme, deler et trinn.",fi:"Samaa tarkoittavat sanat ovat samassa asennossa."},
    t4: {en:"Put each word on its own knob, from a little to a lot.",de:"Leg jedes Wort an seinen Knopf, von ein bisschen bis ganz viel.",fr:"Mets chaque mot sur son bouton, d’un peu à beaucoup.",es:"Pon cada palabra en su perilla, de poquito a muchísimo.",pt:"Coloque cada palavra no seu botão, de um pouquinho a muito.",it:"Metti ogni parola sulla sua manopola, da poco a tanto.",nl:"Zet elk woord op zijn eigen knop, van een beetje tot heel veel.",sv:"Lägg varje ord på sitt vred, från lite till mycket.",da:"Læg hvert ord på sin egen knap, fra lidt til meget.",no:"Legg hvert ord på sin egen bryter, fra litt til mye.",fi:"Laita jokainen sana omaan nuppiinsa, vähästä paljoon."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"Order the ladder",de:"Leiter ordnen",fr:"Ranger l’échelle",es:"Ordenar la escalera",pt:"Ordenar a escada",it:"Ordinare la scala",nl:"De ladder ordenen",sv:"Ordna stegen",da:"Ordn stigen",no:"Ordne stigen",fi:"Järjestä tikkaat"},
    l2: {en:"Pick the strength",de:"Die Stärke wählen",fr:"Choisir la force",es:"Elegir la fuerza",pt:"Escolher a força",it:"Scegliere la forza",nl:"De sterkte kiezen",sv:"Välj styrkan",da:"Vælg styrken",no:"Velg styrken",fi:"Valitse voimakkuus"},
    l3: {en:"Twin words",de:"Zwillingswörter",fr:"Mots jumeaux",es:"Palabras gemelas",pt:"Palavras gêmeas",it:"Parole gemelle",nl:"Tweelingwoorden",sv:"Tvillingord",da:"Tvillingeord",no:"Tvillingord",fi:"Kaksoissanat"},
    l4: {en:"Go and look",de:"Gehen und schauen",fr:"Avancer et regarder",es:"Moverse y mirar",pt:"Andar e olhar",it:"Muoversi e guardare",nl:"Gaan en kijken",sv:"Röra sig och titta",da:"Bevæge sig og kigge",no:"Bevege seg og se",fi:"Liikkua ja katsoa"},
    setWords: {en:"Words on the knob",de:"Wörter am Knopf",fr:"Mots sur le bouton",es:"Palabras en la perilla",pt:"Palavras no botão",it:"Parole sulla manopola",nl:"Woorden op de knop",sv:"Ord på vredet",da:"Ord på knappen",no:"Ord på bryteren",fi:"Sanoja nupissa"},
    w3: {en:"Three",de:"Drei",fr:"Trois",es:"Tres",pt:"Três",it:"Tre",nl:"Drie",sv:"Tre",da:"Tre",no:"Tre",fi:"Kolme"},
    w4: {en:"Four",de:"Vier",fr:"Quatre",es:"Cuatro",pt:"Quatro",it:"Quattro",nl:"Vier",sv:"Fyra",da:"Fire",no:"Fire",fi:"Neljä"},
    setPeek: {en:"Soup colours",de:"Suppenfarben",fr:"Couleurs de la soupe",es:"Colores de la sopa",pt:"Cores da sopa",it:"Colori della minestra",nl:"Soepkleuren",sv:"Soppans färger",da:"Suppens farver",no:"Suppefarger",fi:"Keiton värit"},
    peekOff: {en:"Only when I turn it up",de:"Erst beim Aufdrehen",fr:"Seulement quand je monte le feu",es:"Solo al subir el fuego",pt:"Só quando aumento o fogo",it:"Solo quando alzo la fiamma",nl:"Pas bij vuur hoger",sv:"Först när jag vrider upp",da:"Først når jeg skruer op",no:"Først når jeg skrur opp",fi:"Vasta kun käännän isommalle"},
    peekOn: {en:"All the time",de:"Die ganze Zeit",fr:"Tout le temps",es:"Todo el tiempo",pt:"O tempo todo",it:"Sempre",nl:"De hele tijd",sv:"Hela tiden",da:"Hele tiden",no:"Hele tiden",fi:"Koko ajan"},
    turnUp: {en:"Turn it up",de:"Aufdrehen",fr:"Monter le feu",es:"Subir el fuego",pt:"Aumentar o fogo",it:"Alza la fiamma",nl:"Vuur hoger",sv:"Vrid upp",da:"Skru op",no:"Skru opp",fi:"Käännä isommalle"},
    serve: {en:"Serve",de:"Servieren",fr:"Servir",es:"Servir",pt:"Servir",it:"Servi",nl:"Opscheppen",sv:"Servera",da:"Servér",no:"Server",fi:"Tarjoile"},
    hintEmpty: {en:"Every click needs a word.",de:"Jede Stufe braucht ein Wort.",fr:"Chaque cran a besoin d’un mot.",es:"Cada punto necesita una palabra.",pt:"Cada posição precisa de uma palavra.",it:"Ogni scatto ha bisogno di una parola.",nl:"Elke stand heeft een woord nodig.",sv:"Varje läge behöver ett ord.",da:"Hvert trin skal have et ord.",no:"Hvert trinn trenger et ord.",fi:"Jokainen asento tarvitsee sanan."},
    hintBetween: {en:"Put a word on the empty click.",de:"Leg ein Wort auf die leere Stufe.",fr:"Mets un mot sur le cran vide.",es:"Pon una palabra en el punto vacío.",pt:"Coloque uma palavra na posição vazia.",it:"Metti una parola sullo scatto vuoto.",nl:"Leg een woord op de lege stand.",sv:"Lägg ett ord på det tomma läget.",da:"Læg et ord på det tomme trin.",no:"Legg et ord på det tomme trinnet.",fi:"Laita sana tyhjään asentoon."},
    hintTwin: {en:"Put a word next to the first one.",de:"Leg ein Wort neben das erste.",fr:"Mets un mot à côté du premier.",es:"Pon una palabra junto a la primera.",pt:"Coloque uma palavra ao lado da primeira.",it:"Metti una parola accanto alla prima.",nl:"Leg een woord naast het eerste.",sv:"Lägg ett ord bredvid det första.",da:"Læg et ord ved siden af det første.",no:"Legg et ord ved siden av det første.",fi:"Laita sana ensimmäisen viereen."},
    missJump: {en:"The soup jumped at {w}. Is it stronger or weaker than its neighbours?",de:"Bei {w} hat die Suppe gezuckt. Ist das Wort stärker oder schwächer als seine Nachbarn?",fr:"La soupe a sursauté à {w}. Ce mot est-il plus fort ou moins fort que ses voisins ?",es:"La sopa dio un salto en {w}. ¿Es más fuerte o más suave que sus vecinas?",pt:"A sopa deu um pulo em {w}. Essa palavra é mais forte ou mais fraca que as vizinhas?",it:"La minestra ha fatto un salto su {w}. È più forte o più debole delle vicine?",nl:"Bij {w} sprong de soep. Is het sterker of zwakker dan zijn buren?",sv:"Soppan hoppade vid {w}. Är det starkare eller svagare än grannarna?",da:"Suppen hoppede ved {w}. Er det stærkere eller svagere end naboerne?",no:"Suppa hoppet ved {w}. Er det sterkere eller svakere enn naboene?",fi:"Keitto hyppäsi kohdassa {w}. Onko se vahvempi vai heikompi kuin naapurit?"},
    missGlow: {en:"Put the pale soup at the small flame and the deep soup at the big flame.",de:"Die helle Suppe gehört zur kleinen Flamme, die dunkle zur großen.",fr:"La soupe pâle va avec la petite flamme, la soupe foncée avec la grande.",es:"La sopa clara va con la llama chica y la oscura con la llama grande.",pt:"A sopa clarinha vai com a chama pequena, e a escura com a chama grande.",it:"La minestra chiara va con la fiamma piccola, quella scura con la fiamma grande.",nl:"De lichte soep hoort bij de kleine vlam, de donkere bij de grote.",sv:"Den ljusa soppan hör till den lilla lågan och den mörka till den stora.",da:"Den lyse suppe hører til den lille flamme og den mørke til den store.",no:"Den lyse suppa hører til den lille flammen og den mørke til den store.",fi:"Vaalea keitto kuuluu pieneen liekkiin ja tumma suureen."},
    missPick: {en:"Read the ticket again: does it need a little or a lot?",de:"Lies den Zettel noch einmal: Braucht es ein bisschen oder ganz viel?",fr:"Relis le ticket : il faut un peu ou beaucoup ?",es:"Vuelve a leer el papelito: ¿pide poquito o muchísimo?",pt:"Leia o pedido de novo: precisa de um pouquinho ou de muito?",it:"Rileggi il biglietto: serve poco o tanto?",nl:"Lees het bonnetje nog eens: is het een beetje of heel veel?",sv:"Läs lappen igen: behövs det lite eller mycket?",da:"Læs sedlen igen: skal der lidt eller meget til?",no:"Les lappen igjen: trengs det litt eller mye?",fi:"Lue lappu uudelleen: tarvitaanko vähän vai paljon?"},
    missPick2: {en:"Pale soup is a little, deep soup is a lot. Turn to the one the ticket needs.",de:"Helle Suppe ist ein bisschen, dunkle Suppe ist ganz viel. Dreh auf die, die der Zettel braucht.",fr:"Une soupe pâle, c’est un peu ; une soupe foncée, c’est beaucoup. Tourne vers celle que le ticket demande.",es:"Sopa clara es poquito, sopa oscura es muchísimo. Gira hasta la que pide el papelito.",pt:"Sopa clarinha é um pouquinho, sopa escura é muito. Gire até a que o pedido precisa.",it:"Minestra chiara è poco, minestra scura è tanto. Gira su quella che chiede il biglietto.",nl:"Lichte soep is een beetje, donkere soep is heel veel. Draai naar de soep die het bonnetje vraagt.",sv:"Ljus soppa är lite, mörk soppa är mycket. Vrid till den som lappen behöver.",da:"Lys suppe er lidt, mørk suppe er meget. Drej hen til den, sedlen skal bruge.",no:"Lys suppe er litt, mørk suppe er mye. Vri til den lappen trenger.",fi:"Vaalea keitto on vähän, tumma keitto on paljon. Käännä siihen, jota lappu tarvitsee."},
    missBetween: {en:"Not in the middle. Find one stronger than {low} and weaker than {high}.",de:"Das liegt nicht dazwischen. Such eins: stärker als {low}, schwächer als {high}.",fr:"Pas au milieu. Il faut un mot plus fort que {low} et moins fort que {high}.",es:"No va en medio. Busca una más fuerte que {low} y más suave que {high}.",pt:"Não fica no meio. Procure uma mais forte que {low} e mais fraca que {high}.",it:"Non sta in mezzo. Cercane una più forte di {low} e più debole di {high}.",nl:"Dat ligt er niet tussen. Zoek een woord: sterker dan {low}, zwakker dan {high}.",sv:"Inte emellan. Hitta ett ord som är starkare än {low} och svagare än {high}.",da:"Ikke imellem. Find et ord, der er stærkere end {low} og svagere end {high}.",no:"Ikke imellom. Finn et ord som er sterkere enn {low} og svakere enn {high}.",fi:"Ei välissä. Etsi sana, joka on vahvempi kuin {low} ja heikompi kuin {high}."},
    missTwin: {en:"{w} does not mean the same as {t}. Try the other word.",de:"{w} bedeutet nicht dasselbe wie {t}. Probier das andere Wort.",fr:"{w} ne veut pas dire la même chose que {t}. Essaie l’autre mot.",es:"{w} no significa lo mismo que {t}. Prueba la otra palabra.",pt:"{w} não quer dizer o mesmo que {t}. Tente a outra palavra.",it:"{w} non vuol dire la stessa cosa di {t}. Prova l’altra parola.",nl:"{w} betekent niet hetzelfde als {t}. Probeer het andere woord.",sv:"{w} betyder inte samma sak som {t}. Prova det andra ordet.",da:"{w} betyder ikke det samme som {t}. Prøv det andet ord.",no:"{w} betyr ikke det samme som {t}. Prøv det andre ordet.",fi:"{w} ei tarkoita samaa kuin {t}. Kokeile toista sanaa."},
    missField: {en:"A word is on the wrong knob. Going words on one knob, looking words on the other.",de:"Ein Wort sitzt am falschen Knopf. Gehwörter auf den einen, Schauwörter auf den anderen.",fr:"Un mot est sur le mauvais bouton. Les mots pour avancer d’un côté, les mots pour regarder de l’autre.",es:"Una palabra está en la perilla equivocada. Las de moverse en una, las de mirar en la otra.",pt:"Uma palavra está no botão errado. As de andar num botão, as de olhar no outro.",it:"Una parola è sulla manopola sbagliata. Quelle per muoversi su una, quelle per guardare sull’altra.",nl:"Een woord staat op de verkeerde knop. Gaan-woorden op de ene, kijk-woorden op de andere.",sv:"Ett ord sitter på fel vred. Ord för att röra sig på det ena, ord för att titta på det andra.",da:"Et ord sidder på den forkerte knap. Ord for at bevæge sig på den ene, ord for at kigge på den anden.",no:"Et ord står på feil bryter. Ord for å bevege seg på den ene, ord for å se på den andre.",fi:"Sana on väärässä nupissa. Liikkumisen sanat toiseen, katsomisen sanat toiseen."},
    okOrder: {en:"From a little to a lot: {list}!",de:"Von ein bisschen bis ganz viel: {list}!",fr:"D’un peu à beaucoup : {list} !",es:"De poquito a muchísimo: ¡{list}!",pt:"De um pouquinho a muito: {list}!",it:"Da poco a tanto: {list}!",nl:"Van een beetje tot heel veel: {list}!",sv:"Från lite till mycket: {list}!",da:"Fra lidt til meget: {list}!",no:"Fra litt til mye: {list}!",fi:"Vähästä paljoon: {list}!"},
    okPick: {en:"Just the right strength: {w}!",de:"Genau die richtige Stärke: {w}!",fr:"Juste la bonne force : {w} !",es:"Justo la fuerza correcta: ¡{w}!",pt:"Na força certinha: {w}!",it:"Proprio la forza giusta: {w}!",nl:"Precies de goede sterkte: {w}!",sv:"Precis rätt styrka: {w}!",da:"Præcis den rigtige styrke: {w}!",no:"Akkurat riktig styrke: {w}!",fi:"Juuri oikea voimakkuus: {w}!"},
    okTwin: {en:"{a} and {b} mean the same: same click, same soup.",de:"{a} und {b} bedeuten dasselbe: gleiche Stufe, gleiche Suppe.",fr:"{a} et {b} veulent dire la même chose : même cran, même soupe.",es:"{a} y {b} significan lo mismo: mismo punto, misma sopa.",pt:"{a} e {b} querem dizer a mesma coisa: mesma posição, mesma sopa.",it:"{a} e {b} vogliono dire la stessa cosa: stesso scatto, stessa minestra.",nl:"{a} en {b} betekenen hetzelfde: zelfde stand, zelfde soep.",sv:"{a} och {b} betyder samma sak: samma läge, samma soppa.",da:"{a} og {b} betyder det samme: samme trin, samme suppe.",no:"{a} og {b} betyr det samme: samme trinn, samme suppe.",fi:"{a} ja {b} tarkoittavat samaa: sama asento, sama keitto."},
    okGoLook: {en:"{f1}: {l1}. {f2}: {l2}.",de:"{f1}: {l1}. {f2}: {l2}.",fr:"{f1} : {l1}. {f2} : {l2}.",es:"{f1}: {l1}. {f2}: {l2}.",pt:"{f1}: {l1}. {f2}: {l2}.",it:"{f1}: {l1}. {f2}: {l2}.",nl:"{f1}: {l1}. {f2}: {l2}.",sv:"{f1}: {l1}. {f2}: {l2}.",da:"{f1}: {l1}. {f2}: {l2}.",no:"{f1}: {l1}. {f2}: {l2}.",fi:"{f1}: {l1}. {f2}: {l2}."},
    between: {en:"Which word goes between {low} and {high}?",de:"Welches Wort gehört zwischen {low} und {high}?",fr:"Quel mot va entre {low} et {high} ?",es:"¿Qué palabra va entre {low} y {high}?",pt:"Que palavra fica entre {low} e {high}?",it:"Quale parola va tra {low} e {high}?",nl:"Welk woord hoort tussen {low} en {high}?",sv:"Vilket ord passar mellan {low} och {high}?",da:"Hvilket ord passer mellem {low} og {high}?",no:"Hvilket ord passer mellom {low} og {high}?",fi:"Mikä sana sopii sanojen {low} ja {high} väliin?"},
    aWin: {en:"Click {n}: {w}",de:"Stufe {n}: {w}",fr:"Cran {n} : {w}",es:"Punto {n}: {w}",pt:"Posição {n}: {w}",it:"Scatto {n}: {w}",nl:"Stand {n}: {w}",sv:"Läge {n}: {w}",da:"Trin {n}: {w}",no:"Trinn {n}: {w}",fi:"Asento {n}: {w}"},
    aWinEmpty: {en:"Click {n}: empty",de:"Stufe {n}: leer",fr:"Cran {n} : vide",es:"Punto {n}: vacío",pt:"Posição {n}: vazia",it:"Scatto {n}: vuoto",nl:"Stand {n}: leeg",sv:"Läge {n}: tomt",da:"Trin {n}: tomt",no:"Trinn {n}: tomt",fi:"Asento {n}: tyhjä"},
    aTile: {en:"Word: {w}",de:"Wort: {w}",fr:"Mot : {w}",es:"Palabra: {w}",pt:"Palavra: {w}",it:"Parola: {w}",nl:"Woord: {w}",sv:"Ord: {w}",da:"Ord: {w}",no:"Ord: {w}",fi:"Sana: {w}"},
    aKnob: {en:"Knob, click {n} of {m}",de:"Knopf, Stufe {n} von {m}",fr:"Bouton, cran {n} sur {m}",es:"Perilla, punto {n} de {m}",pt:"Botão, posição {n} de {m}",it:"Manopola, scatto {n} di {m}",nl:"Knop, stand {n} van {m}",sv:"Vred, läge {n} av {m}",da:"Knap, trin {n} af {m}",no:"Bryter, trinn {n} av {m}",fi:"Nuppi, asento {n}/{m}"},
    t2b: {en:"Put the word that goes between them on the empty click, then serve.",de:"Leg das Wort, das dazwischen gehört, auf die leere Stufe, und servier.",fr:"Mets le mot qui va entre les deux sur le cran vide, puis sers.",es:"Pon en el punto vacío la palabra que va en medio y sirve.",pt:"Coloque na posição vazia a palavra que fica no meio e sirva.",it:"Metti sullo scatto vuoto la parola che sta in mezzo, poi servi.",nl:"Leg het woord dat ertussen hoort op de lege stand en schep op.",sv:"Lägg ordet som passar emellan på det tomma läget och servera.",da:"Læg det ord, der passer imellem, på det tomme trin, og servér.",no:"Legg ordet som passer imellom, på det tomme trinnet, og server.",fi:"Laita väliin sopiva sana tyhjään asentoon ja tarjoile."},
  },/*STRINGS-END*/

  defaults: { level: '1', words: '3', peek: 'off' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }] },
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: '3', labelKey: 'w3' }, { value: '4', labelKey: 'w4' }] },
    { key: 'peek', type: 'choice', labelKey: 'setPeek', options: [{ value: 'off', labelKey: 'peekOff' }, { value: 'on', labelKey: 'peekOn' }] }
  ],
  OK_MS: 500, FAST: false, STEP_MS: 320,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null;
    this._timers = []; this._ro = null; this._view = {};
    injectStoveKnobCSS();
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
  _loc: function () { return StoveKnobCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return StoveKnobCore.levelOf(this._setting('level')); },
  _words: function () { return StoveKnobCore.wordsOf(this._setting('words')); },
  _peek: function () { return this._setting('peek') === 'on' || this._level() === '2'; },
  _key: function () { return this._loc() + '/' + this._level() + '/' + (this._level() === '1' ? this._words() : 3); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = StoveKnobCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = StoveKnobCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev, this._words()); this._prev = P.order; this._order = P.order.slice(); this._plan = P; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'stoveknob.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st && this.st.rd.kind === 'between' ? 't2b' : 't' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    /* never a round without a plan: an unplanned shelf would stand in a fixed order */
    if (!this._plan || this._plan.order.indexOf(r) < 0) this._plan = StoveKnobCore.plan(this._loc(), this._level(), Math.random, null, this._words());
    this.st = StoveKnobCore.newState(this._loc(), this._level(), r, { words: this._words(), order: this._plan.orders[r] });
    this._view = { note: '', ok: '', busy: false, sweep: null, show: null, served: null, k: 0 };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
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
  _dims: function () { var W = this._width(), B = StoveKnobCore.band(W); return { W: W, wide: B.wide, cramp: W < 310, pot: B.wide ? 210 : W < 310 ? 92 : 140, pot2: B.wide ? 200 : W < 310 ? 96 : 116, knob: B.wide ? 112 : W < 310 ? 72 : 84 }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sk-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<p class="sk-note" aria-live="polite"></p><div class="sk-main"></div><p class="sk-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('pointerdown', function (e) { self._pdown(e); });
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
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
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _sr: function (s) { var el = this._qs('.sk-sr'); if (el) el.textContent = s; },
  _list: function (a) {
    var loc = this._loc();
    try { if (typeof Intl !== 'undefined' && Intl.ListFormat) return new Intl.ListFormat(loc === 'no' ? 'nb' : loc, { style: 'long', type: 'conjunction' }).format(a); } catch (e) {}
    return a.join(', ');
  },
  /* a soup value (0..1 along the ladder's scale, 'grey', or null) → a colour */
  _colour: function (ladder, t) {
    if (t == null) return '#F2E6D0';
    if (t === 'grey') return '#B9B4AC';
    var S = (StoveKnobCore.DATA.SCALE || {})[ladder] || ['#F8E1B4', '#E2574B'];
    var p = function (h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }, a = p(S[0]), b = p(S[1]);
    return 'rgb(' + a.map(function (x, i) { return Math.round(x + (b[i] - x) * t); }).join(',') + ')';
  },
  /* which window the pot is showing, and how strong the flame is */
  _showing: function () {
    var st = this.st, v = this._view, C = StoveKnobCore;
    if (v.sweep) return { w: C.windowOf(st, v.sweep.k, v.sweep.c, 0), k: v.sweep.k, c: v.sweep.c, colour: true };
    if (v.show != null) { var W = st.rd.windows[v.show]; return { w: v.show, k: W.knob, c: W.click, colour: true }; }
    var k = v.k || 0; return { w: C.windowOf(st, k, st.knob[k], st.rd.kind === 'twin' ? 1 : 0), k: k, c: st.knob[k], colour: this._peek() || st.done };
  },
  _paint_: function () {
    var st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, C = StoveKnobCore;
    this._wrap.className = 'sk-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + rd.lvl + ' k-' + rd.kind + (v.busy ? ' is-busy' : '');
    var main = this._qs('.sk-main'); main.innerHTML = '';
    if (rd.kind === 'pick' || rd.kind === 'between') main.appendChild(this._ticketEl(D));
    var stove = this._el('div', 'sk-stove n-' + rd.knobs.length);
    var pot = this._potEl(D); stove.appendChild(pot);
    var knobs = this._el('div', 'sk-knobs');
    rd.knobs.forEach(function (K, k) { knobs.appendChild(self._knobEl(K, k, D)); });
    /* the button lives on the stove: under the knob, or (two knobs) under the pot */
    if (!st.done) { var dc = rd.knobs.length > 1 ? pot : knobs.querySelector('.sk-dialcol'); if (dc) dc.appendChild(this._goEl()); }
    stove.appendChild(knobs);
    main.appendChild(stove);
    var shelf = this._shelfEl(D); if (shelf) main.appendChild(shelf);
    var note = this._qs('.sk-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'sk-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'sk-note is-hint'; }
    else { note.textContent = ''; note.className = 'sk-note'; }
  },
  _goEl: function () {
    var st = this.st, rd = st.rd, v = this._view, self = this, lab = this._t(rd.kind === 'pick' || rd.kind === 'between' ? 'serve' : 'turnUp');
    var go = this._btn('sk-go', 'check', lab, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3c2 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-4 2-5 0 2 1 3 2 3 0-3-1-5 1-8z" fill="#FFE07A" stroke="#FFF" stroke-width="1.4"/></svg><span>' + esc(lab) + '</span>');
    go.disabled = st.done || v.busy; go.addEventListener('click', function () { self._check(); }); return go;
  },
  /* the order ticket (level 2) with the served bowl */
  _ticketEl: function (D) {
    var st = this.st, rd = st.rd, v = this._view, t = this._el('div', 'sk-ticket sk-art' + (st.done ? ' is-done' : ''));
    var text = rd.kind === 'between' ? this._t('between', { low: rd.low, high: rd.high }) : rd.ticket;
    var p = this._el('p', 'sk-ttext'); p.innerHTML = esc(text).replace('___', '<span class="sk-blank">____</span>'); t.appendChild(p);
    if (v.served != null || st.done) {
      var w = st.done ? (rd.kind === 'pick' ? rd.answer : 1) : v.served, col = this._colour(rd.knobs[0].ladder, StoveKnobCore.soupAt(st, w));
      var bowl = this._el('div', 'sk-bowl' + (st.done ? ' is-in' : ' is-short'));
      bowl.innerHTML = '<span class="sk-bowlsoup" style="background:' + col + '"></span>' + this._img('kitchen tools/bowl', D.wide ? 96 : 64, 'sk-pic sk-bowlpic');
      t.appendChild(bowl);
      if (st.done) t.insertAdjacentHTML('beforeend', '<span class="sk-tick" aria-hidden="true">✓</span>');
    }
    return t;
  },
  _img: function (path, size, cls) { return '<img class="' + cls + '" src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  /* the pot: the library picture with the soup laid into its measured rim, the flame under it */
  _potEl: function (D) {
    var st = this.st, rd = st.rd, v = this._view, s = this._showing(), C = StoveKnobCore, K = rd.knobs[s.k];
    var t = s.w >= 0 ? C.soupAt(st, s.w) : null, lad = rd.kind === 'golook' ? K.ladder : (st.win[s.w] != null && rd.tiles[st.win[s.w]].ladder) || K.ladder;
    var col = s.colour ? this._colour(lad === 'twin' ? 'heat' : lad, t) : '#F2E6D0', strength = s.c + 1, n = K.n;
    var jump = v.sweep && v.sweep.jump;
    var box = this._el('div', 'sk-pot sk-art' + (jump ? ' is-jump' : ''));
    box.style.width = (rd.knobs.length > 1 ? D.pot2 : D.pot) + 'px';
    /* the picture's measured opening (1024 px source): x 168–854, y 224–371; the box crops the picture to y 160–900 */
    var bub = '', speed = Math.max(1, Math.round(4 * strength / Math.max(n, 1)));
    for (var i = 0; i < 6; i++) bub += '<circle class="sk-bub s' + speed + '" cx="' + (250 + i * 105) + '" cy="320" r="' + (14 + (i % 3) * 7) + '" style="animation-delay:' + (i * 0.23).toFixed(2) + 's"/>';
    box.innerHTML = this._img('kitchen tools/pot', D.pot, 'sk-pic sk-potpic')
      + '<svg class="sk-soup sk-art" viewBox="20 160 990 740" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="sk-rim"><ellipse cx="511" cy="300" rx="336" ry="68"/></clipPath></defs>'
      + '<ellipse cx="511" cy="300" rx="336" ry="68" fill="' + col + '" stroke="#FFF3DF" stroke-width="14"/><g clip-path="url(#sk-rim)" fill="rgba(255,255,255,.55)">' + bub + '</g></svg>';
    box.setAttribute('role', 'img'); box.setAttribute('aria-label', this._t('aKnob', { n: strength, m: n }));
    var wrap = this._el('div', 'sk-potwrap');
    wrap.appendChild(box);
    var fl = '', fw = Math.min(60, (D.pot - 20) / Math.max(n, 1));
    for (var f = 0; f < n; f++) fl += '<g class="sk-tongue' + (f < strength ? ' is-on' : '') + '" transform="translate(' + (f * fw + fw / 2) + ',0)"><path d="M0 34 C-12 30 -12 16 0 2 C12 16 12 30 0 34z" fill="#F2784B"/><path d="M0 32 C-6 29 -6 21 0 13 C6 21 6 29 0 32z" fill="#E8A53A"/></g>';
    var frow = this._el('div', 'sk-flamerow'); wrap.appendChild(frow);
    frow.insertAdjacentHTML('beforeend', '<svg class="sk-flame sk-art" viewBox="0 0 ' + (n * fw) + ' 36" width="' + Math.round(n * fw) + '" height="36" aria-hidden="true">' + fl + '</svg>');
    /* the stronger showing: the strip of soup colours pale → deep, unlabelled */
    if (st.help && rd.kind !== 'twin') {
      var sw = this._el('div', 'sk-swatches sk-art'), ladS = rd.kind === 'golook' ? null : rd.knobs[0].ladder;
      var steps = rd.kind === 'golook' ? 3 : rd.knobs[0].n;
      for (var q = 0; q < steps; q++) sw.insertAdjacentHTML('beforeend', '<i style="background:' + this._colour(ladS || 'speed', steps < 2 ? 0.7 : 0.12 + 0.88 * q / (steps - 1)) + '"></i>');
      frow.appendChild(sw);
    }
    return wrap;
  },
  /* one knob: the dial (tap to turn one click, drag round it, arrows) and its column of click windows, high at the top */
  _knobEl: function (K, k, D) {
    var st = this.st, rd = st.rd, v = this._view, self = this, C = StoveKnobCore, g = this._el('div', 'sk-kgroup g' + k);
    var c = v.sweep && v.sweep.k === k ? v.sweep.c : st.knob[k], n = K.n, ang = n < 2 ? 0 : 60 - 120 * c / (n - 1), R = D.knob;
    var dial = this._btn('sk-knob sk-art', 'knob-' + k, this._t('aKnob', { n: c + 1, m: n }),
      '<svg viewBox="-50 -50 100 100" width="' + R + '" height="' + R + '" aria-hidden="true"><circle r="46" fill="#E9E4DA" stroke="#B8AE9C" stroke-width="3"/>'
      + (function () { var s = ''; for (var i = 0; i < 18; i++) { var a = i * 20 * Math.PI / 180; s += '<line x1="' + (40 * Math.cos(a)).toFixed(1) + '" y1="' + (40 * Math.sin(a)).toFixed(1) + '" x2="' + (45 * Math.cos(a)).toFixed(1) + '" y2="' + (45 * Math.sin(a)).toFixed(1) + '" stroke="#B8AE9C" stroke-width="2"/>'; } return s; })()
      + '<circle r="30" fill="#FFFFFF" stroke="#D3CAB8" stroke-width="2"/><g class="sk-pointer" style="transform:rotate(' + ang + 'deg)"><rect x="-6" y="-8" width="40" height="16" rx="8" fill="#2F2A3B"/><circle cx="26" cy="0" r="4" fill="#F2784B"/></g></svg>');
    dial.disabled = st.done || v.busy;
    dial.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } self._turn(k, (st.knob[k] + 1) % n); });
    var col = this._el('div', 'sk-col n-' + n);
    for (var cc = n - 1; cc >= 0; cc--) {
      var row = this._el('div', 'sk-click' + (cc === c ? ' is-at' : ''));
      [0, 1].forEach(function (slot) {
        var w = C.windowOf(st, k, cc, slot); if (w < 0) return;
        row.appendChild(self._winEl(w, D));
      });
      col.appendChild(row);
    }
    var dcol = this._el('div', 'sk-dialcol'); dcol.appendChild(dial);
    if (K.field != null) dcol.appendChild(this._el('p', 'sk-field', esc(C.DATA[this._loc()].field[K.field])));
    g.appendChild(dcol); g.appendChild(col);
    return g;
  },
  _winEl: function (w, D) {
    var st = this.st, rd = st.rd, v = this._view, self = this, C = StoveKnobCore, j = st.win[w], W = rd.windows[w];
    var fixed = rd.fixed[w] != null, jumped = st.jumped.indexOf(w) >= 0;
    var cls = 'sk-win sk-art' + (j == null ? ' is-empty' : ' is-full') + (fixed ? ' is-fixed' : '') + (jumped ? ' is-jump' : '') + (st.done ? ' is-in' : '') + (st.last === 'empty' && j == null ? ' is-pulse' : '');
    var label = j == null ? this._t('aWinEmpty', { n: W.click + 1 }) : this._t('aWin', { n: W.click + 1, w: rd.tiles[j].text });
    var html = j == null ? '' : '<span class="sk-word">' + esc(rd.tiles[j].text) + '</span>';
    /* the stronger showing: each word wears a dot of its own soup colour */
    if (j != null && st.help && rd.kind !== 'twin') html += '<i class="sk-dot" style="background:' + this._colour(rd.tiles[j].ladder === 'twin' ? 'heat' : rd.tiles[j].ladder, C.soupAt(st, w)) + '"></i>';
    var b = this._btn(cls, 'win-' + w, label, html);
    b.disabled = st.done || v.busy || (fixed && rd.kind !== 'pick');
    b.addEventListener('click', function () { self._win(w); });
    return b;
  },
  _shelfEl: function (D) {
    var st = this.st, rd = st.rd, v = this._view, self = this, list = [];
    rd.tiles.forEach(function (t, j) { if (st.win.indexOf(j) < 0) list.push(j); });
    if (rd.kind === 'pick' || !list.length) return null;
    var shelf = this._el('div', 'sk-shelf sk-art n-' + rd.tiles.length);
    list.forEach(function (j) {
      var b = self._btn('sk-tile' + (st.sel === j ? ' is-sel' : ''), 'tile-' + j, self._t('aTile', { w: rd.tiles[j].text }), '<span class="sk-word">' + esc(rd.tiles[j].text) + '</span>');
      b.setAttribute('aria-pressed', st.sel === j ? 'true' : 'false'); b.disabled = st.done || v.busy;
      b.addEventListener('click', function () { self._tile(j); });
      shelf.appendChild(b);
    });
    return shelf;
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.show = null; this._view.served = null; },
  _tile: function (j) { var r = StoveKnobCore.pick(this.st, j); if (r === 'no') return; this._moved(); this.api.sound(r === 'home' ? 380 : 560); this._paint(); },
  _win: function (w) {
    var st = this.st, C = StoveKnobCore, W = st.rd.windows[w];
    if (st.rd.kind === 'pick') { this._turn(W.knob, W.click); return; }
    if (st.sel != null) { if (C.place(st, null, w) === 'no') return; this._moved(); this._view.k = W.knob; this.api.sound(660); this._paint(); this._sr(this._t('aWin', { n: W.click + 1, w: st.rd.tiles[st.win[w]].text })); return; }
    if (st.win[w] != null && st.rd.fixed[w] == null) { this._tile(st.win[w]); return; }
    this._turn(W.knob, W.click);
  },
  _turn: function (k, c) {
    var r = StoveKnobCore.turn(this.st, k, c); if (r === 'no' || r === 'same') return;
    if (this.st.rd.kind === 'pick') { this._view.note = ''; this._view.served = null; }
    this._view.k = k; this._view.show = null; this.api.sound(300 + 90 * c); this._paint();
    var w = StoveKnobCore.windowOf(this.st, k, this.st.knob[k], 0), j = w >= 0 ? this.st.win[w] : null;
    this._sr(this._t('aKnob', { n: this.st.knob[k] + 1, m: this.st.rd.knobs[k].n }) + (j != null ? ' · ' + this.st.rd.tiles[j].text : ''));
  },
  _pdown: function (e) {
    var st = this.st; if (!st || st.done || this._view.busy || (e.button != null && e.button !== 0)) return;
    var knob = e.target.closest && e.target.closest('[data-k^="knob-"]');
    if (knob) { this._knobDrag(e, knob); return; }
    var src = e.target.closest && e.target.closest('[data-k^="tile-"],[data-k^="win-"]'); if (!src || src.disabled) return;
    var self = this, k = src.getAttribute('data-k'), j = k.indexOf('tile-') === 0 ? +k.slice(5) : st.win[+k.slice(4)];
    if (j == null || (k.indexOf('win-') === 0 && st.rd.fixed[+k.slice(4)] != null)) return;
    var sx = e.clientX, sy = e.clientY, ghost = null;
    var stop = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cancel); };
    var move = function (ev) {
      if (!ghost) { if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 10) return; ghost = self._el('div', 'sk-ghost', esc(st.rd.tiles[j].text)); document.body.appendChild(ghost); src.classList.add('is-dragging'); }
      ghost.style.left = (ev.clientX - 40) + 'px'; ghost.style.top = (ev.clientY - 22) + 'px';
    };
    var cancel = function () { stop(); if (ghost) { ghost.remove(); src.classList.remove('is-dragging'); } };
    var up = function (ev) {
      stop(); if (!ghost) return; ghost.remove(); src.classList.remove('is-dragging');
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), t = hit && hit.closest && hit.closest('[data-k^="win-"]'), sh = hit && hit.closest && hit.closest('.sk-shelf');
      self._swallow = src;
      if (t) { var w = +t.getAttribute('data-k').slice(4); if (StoveKnobCore.place(st, j, w) !== 'no') { self._moved(); self._view.k = st.rd.windows[w].knob; self.api.sound(660); self._paint(); } }
      else if (sh && st.win.indexOf(j) >= 0) self._tile(j);
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', cancel);
  },
  /* turning by hand: the angle round the dial snaps to the nearest click */
  _knobDrag: function (e, el) {
    var self = this, k = +el.getAttribute('data-k').slice(5), n = this.st.rd.knobs[k].n, sx = e.clientX, sy = e.clientY, moved = false;
    if (n < 2) return;
    /* the centre is fixed when the hand goes down: every click repaints the dial, so the element under the hand is replaced */
    var R0 = el.getBoundingClientRect(), cx = R0.left + R0.width / 2, cy = R0.top + R0.height / 2;
    var at = function (ev) { var dx = ev.clientX - cx, dy = ev.clientY - cy, a = Math.atan2(dy, dx) * 180 / Math.PI; a = Math.max(-60, Math.min(60, a)); return Math.round((60 - a) / 120 * (n - 1)); };
    var stop = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); };
    var move = function (ev) { if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 8) return; moved = true; self._dragged = true; var c = at(ev); if (c !== self.st.knob[k]) self._turn(k, c); };
    var up = function () { stop(); if (!moved) self._dragged = false; };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _key_: function (e) {
    var t = e.target; if (!t || !t.getAttribute) return;
    var k = t.getAttribute('data-k'); if (!k || k.indexOf('knob-') !== 0) return;
    var i = +k.slice(5), st = this.st;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); this._turn(i, st.knob[i] + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); this._turn(i, st.knob[i] - 1); }
  },
  /* Turn it up / Serve: the knob sweeps from the smallest flame to the biggest and the soup shows each word; then the result */
  _check: function () {
    var C = StoveKnobCore, st = this.st, v = this._view, self = this; if (st.done || v.busy) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'done') return;
    if (res.result === 'empty') { v.note = this._t(C.hint(st)); v.ok = ''; this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    if (st.rd.kind === 'pick') { if (res.result === 'ok') { this._success(); return; } v.served = res.served; v.note = this._t(C.hint(st)); this.api.sound(240); this._paint(); this.api.announce(v.note); return; }
    var steps = []; st.rd.knobs.forEach(function (K, k) { for (var c = 0; c < K.n; c++) { var w = C.windowOf(st, k, c, st.rd.kind === 'twin' ? 1 : 0); steps.push({ k: k, c: c, jump: (res.jumped || []).indexOf(w) >= 0 }); } });
    var finish = function () {
      v.busy = false; v.sweep = null;
      if (res.result === 'ok') { self._success(); return; }
      var hw = C.hintWord(st); if (C.hint(st) === 'missTwin') hw = hw.charAt(0).toLocaleUpperCase(self._loc()) + hw.slice(1);
      v.show = res.jumped[0]; v.note = self._t(C.hint(st), { w: hw, t: st.rd.tiles[0].text, low: st.rd.low, high: st.rd.high });
      self.api.sound(240); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    v.busy = true; v.note = ''; v.ok = '';
    steps.forEach(function (s, i) { self._later(function () { v.sweep = s; self.api.sound(s.jump ? 220 : 330 + 80 * s.c); self._paint(); }, i * self.STEP_MS); });
    this._later(finish, steps.length * this.STEP_MS + (res.result === 'ok' ? 0 : 200));
    v.sweep = steps[0]; this._paint();
  },
  _success: function () {
    var C = StoveKnobCore, st = this.st, v = this._view, self = this, p = C.okParts(st), cap = function (s) { return s.charAt(0).toLocaleUpperCase(self._loc()) + s.slice(1); };
    var msg = p.key === 'okOrder' ? this._t('okOrder', { list: p.list.join(', ') }) : p.key === 'okPick' ? this._t('okPick', { w: p.w }) : p.key === 'okTwin' ? this._t('okTwin', { a: cap(p.a), b: p.b })
      : this._t('okGoLook', { f1: cap(p.f1), l1: p.l1.join(', '), f2: cap(p.f2), l2: p.l2.join(', ') });
    v.note = ''; v.ok = msg; v.show = null; v.busy = false; v.sweep = null;
    var top = st.rd.knobs[0].n - 1; if (st.rd.kind === 'order' || st.rd.kind === 'golook') { st.knob[0] = top; v.k = 0; } if (st.rd.kind === 'between') st.knob[0] = 1;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectStoveKnobCSS() {
  if (typeof document === 'undefined' || document.getElementById('sk-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sk-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:10px;row-gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sk-wrap:focus{outline:none;}'
  + '.sk-note{grid-column:1 / -1;grid-row:1;margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sk-note.is-hint{color:#9A3D1C;} .sk-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;} .sk-note:empty{display:none;}'
    + '.sk-main{grid-column:1 / -1;grid-row:2;display:flex;flex-direction:column;align-items:stretch;gap:10px;}'
  + '.sk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.sk-go{display:inline-flex;align-items:center;gap:8px;min-height:56px;padding:8px 22px;border:0;border-radius:28px;background:#E0663A;box-shadow:0 5px 0 #A8431F;color:#FFF;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;} .sk-go:disabled{opacity:.5;cursor:default;}'
  /* the ticket */
  + '.sk-ticket{position:relative;display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:6px 6px 14px 14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D6BE,0 3px 0 #D9C29A;}'
  + '.sk-ttext{flex:1;margin:0;font-family:' + B + ';font-weight:800;font-size:18px;line-height:1.3;color:' + INK + ';} .sk-blank{display:inline-block;min-width:3em;border-bottom:2px solid ' + INK + ';color:transparent;}'
  + '.sk-bowl{position:relative;flex:none;transition:transform .5s ease-out;} .sk-bowl.is-short{transform:translateX(-14px);opacity:.92;} .sk-bowlsoup{position:absolute;left:14%;right:14%;top:31%;height:14%;border-radius:50%;}'
  + '.sk-tick{position:absolute;right:8px;top:4px;font-size:22px;font-weight:900;color:#E0663A;}'
  /* the stove: pot + flame, knobs */
  + '.sk-stove{display:flex;align-items:center;justify-content:center;gap:16px;padding:12px;border-radius:16px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #E0C99A,0 4px 0 #D9C29A;}'
  + '.sk-potwrap{display:flex;flex-direction:column;align-items:center;gap:2px;flex:none;}'
  + '.sk-pot{position:relative;aspect-ratio:990/740;overflow:hidden;} .sk-potpic{position:absolute;display:block;width:103.4%;height:auto;left:-2.02%;top:-21.6%;max-width:none;}'
  + '.sk-soup{position:absolute;inset:0;width:100%;height:100%;} .sk-soup ellipse{transition:fill .3s ease;} .sk-pot.is-jump{animation:skJump .3s ease-in-out 2;} @keyframes skJump{30%{transform:translateY(-5px) rotate(-3deg);}70%{transform:translateY(2px) rotate(2deg);}}'
  + '.sk-bub{animation:skBub 2.4s linear infinite;opacity:0;} .sk-bub.s2{animation-duration:1.6s;} .sk-bub.s3{animation-duration:1.05s;} .sk-bub.s4{animation-duration:.7s;} @keyframes skBub{0%{transform:translateY(40px);opacity:0;}30%{opacity:1;}100%{transform:translateY(-40px);opacity:0;}}'
  + '.sk-flame .sk-tongue{opacity:.15;transition:opacity .12s;} .sk-flame .sk-tongue.is-on{opacity:1;animation:skFlick 1.2s ease-in-out infinite alternate;} @keyframes skFlick{100%{opacity:.82;}}'
  + '.sk-flamerow{display:flex;align-items:center;gap:8px;} .sk-swatches{display:flex;flex-direction:column-reverse;gap:3px;} .sk-swatches i{display:block;width:26px;height:10px;border-radius:8px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);}'
  + '.sk-knobs{display:flex;gap:14px;align-items:center;min-width:0;}'
  + '.sk-kgroup{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:8px;min-width:0;}'
  + '.sk-dialcol{grid-column:1;grid-row:1;display:flex;flex-direction:column;align-items:center;gap:10px;} .sk-knob{padding:0;border:0;background:none;border-radius:50%;cursor:grab;touch-action:none;} .sk-knob:disabled{cursor:default;} .sk-pointer{transition:transform .25s ease;transform-origin:0 0;}'
  + '.sk-col{grid-column:2;grid-row:1;display:flex;flex-direction:column;gap:6px;min-width:0;}'
  + '.sk-click{display:flex;gap:6px;align-items:center;border-radius:10px;padding:2px;} .sk-click.is-at{box-shadow:0 0 0 3px #F4CF62;background:#FFF3C4;}'
  + '.sk-field{margin:0;text-align:center;max-width:110px;line-height:1.3;font-family:' + H + ';font-weight:800;font-size:18px;color:#146B5E;}'
  + '.sk-win,.sk-tile{display:flex;align-items:center;justify-content:center;gap:6px;min-height:48px;min-width:0;padding:4px 10px;border:0;border-radius:10px;font:inherit;color:' + INK + ';cursor:pointer;}'
  + '.sk-win{flex:1;width:190px;background:#FFF;box-shadow:inset 0 0 0 2px #C9B48E;} .sk-win.is-empty{background:repeating-linear-gradient(45deg,#FFFDF6,#FFFDF6 6px,#F6EEDC 6px,#F6EEDC 12px);box-shadow:inset 0 0 0 2px #D9C29A;} .sk-win.is-fixed{background:#FAF5EA;} .sk-win:disabled{cursor:default;}'
  + '.sk-win.is-jump{box-shadow:inset 0 0 0 3px #E0663A;animation:skShake .35s ease-in-out 2;} @keyframes skShake{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}} .sk-win.is-pulse{animation:skPulse .6s ease-in-out 2;} @keyframes skPulse{50%{box-shadow:inset 0 0 0 3px #F2784B;}}'
  + '.sk-win.is-in{box-shadow:inset 0 0 0 3px #F4CF62;}'
  + '.sk-word{font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.15;text-align:center;overflow-wrap:anywhere;hyphens:auto;}'
  + '.sk-dot{display:block;flex:none;width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.2);}'
  + '.sk-shelf{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;padding:10px;border-radius:12px;background:#EFE4CF;box-shadow:inset 0 0 0 2px #D9C29A;min-height:68px;}'
  + '.sk-tile{background:#FFFDF6;box-shadow:inset 0 0 0 2px #C9B48E,0 3px 0 #A8915F;min-width:96px;touch-action:none;} .sk-tile.is-sel{background:#FBE9D2;box-shadow:inset 0 0 0 3px #F2784B,0 0 12px rgba(242,120,75,.5);} .sk-tile.is-dragging{opacity:.35;} .sk-tile:disabled{cursor:default;}'
  + '.sk-ghost{position:fixed;z-index:9999;pointer-events:none;padding:8px 14px;border-radius:10px;background:#FBE9D2;box-shadow:0 4px 12px rgba(0,0,0,.25);font-family:' + B + ';font-weight:800;font-size:20px;color:' + INK + ';}'
  /* level 4: one stove row — the going knob (its field word under it), the pot, the looking knob — and each knob's words under it, half and half */
  + '.sk-stove.n-2{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1fr) auto;align-items:center;justify-items:center;column-gap:8px;row-gap:8px;} .sk-stove.n-2 .sk-knobs,.sk-stove.n-2 .sk-kgroup{display:contents;}'
  + '.sk-stove.n-2 .g0 .sk-dialcol{grid-column:1;grid-row:1;gap:2px;} .sk-stove.n-2 .sk-potwrap{grid-column:2 / 4;grid-row:1;} .sk-stove.n-2 .g1 .sk-dialcol{grid-column:4;grid-row:1;gap:2px;}'
  + '.sk-stove.n-2 .g0 .sk-col{grid-column:1 / 3;grid-row:2;width:100%;} .sk-stove.n-2 .g1 .sk-col{grid-column:3 / 5;grid-row:2;width:100%;} .sk-stove.n-2 .sk-win{width:auto;} .sk-stove.n-2 .sk-potwrap .sk-go{margin-top:6px;} .sk-field{margin:0;}'
  /* phones: the pot above the knob, words a little smaller */
  + '.sk-wrap.is-narrow .sk-stove{flex-direction:column;gap:6px;padding:8px;} .sk-wrap.is-narrow .sk-flame{height:26px;width:auto;} .sk-wrap.is-narrow .sk-win{min-height:44px;} .sk-wrap.is-narrow .sk-col{gap:5px;} .sk-wrap.is-narrow .sk-tile{min-height:44px;} .sk-wrap.is-narrow .sk-note{font-size:16px;} .sk-wrap.is-narrow .sk-go{min-height:48px;padding:6px 14px;font-size:18px;}'
  + '.sk-wrap.is-narrow .sk-win{width:auto;min-width:0;} .sk-wrap.is-narrow .sk-kgroup{width:100%;} .sk-wrap.is-narrow .sk-knobs{width:100%;} .sk-wrap.is-narrow .sk-word{font-size:17px;}'
  + '.sk-wrap.is-narrow .sk-stove.n-2{display:grid;column-gap:6px;padding:8px;}'
  + '.sk-wrap.is-narrow .sk-tile{min-width:72px;padding:4px 8px;} .sk-wrap.is-narrow .sk-ttext{font-size:16px;} .sk-wrap.is-narrow .sk-shelf{padding:6px;gap:6px;min-height:56px;}'
  + '.sk-go{white-space:nowrap;} .sk-wrap.is-narrow .sk-field{font-size:15px;max-width:76px;overflow-wrap:anywhere;} .sk-wrap.is-cramp .sk-stove.n-2 .sk-go{font-size:15px;padding:6px 10px;gap:4px;}'
  + '.sk-wrap.is-narrow .sk-shelf.n-6{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));} .sk-wrap.is-narrow .sk-shelf.n-6 .sk-tile{min-width:0;}'
  + '.sk-wrap.is-narrow.k-twin .sk-click{flex-direction:column;align-items:stretch;}'
  + '.sk-wrap.is-narrow .sk-click{padding:0;} .sk-wrap.is-narrow .sk-click.is-at{box-shadow:0 0 0 2px #F4CF62;} .sk-wrap.is-narrow .sk-swatches{flex-direction:row;} .sk-wrap.is-narrow .sk-swatches i{width:14px;height:10px;} .sk-wrap.is-cramp .sk-stove{padding:6px;}'
  + '.sk-wrap.is-cramp .sk-ticket{padding:6px 10px;} .sk-wrap.is-cramp .sk-ttext{font-size:15px;} .sk-wrap.is-cramp .sk-main{gap:8px;}'
  + '.sk-wrap.is-cramp .sk-word{font-size:15px;} .sk-wrap.is-cramp .sk-win,.sk-wrap.is-cramp .sk-tile{min-height:44px;padding:2px 6px;} .sk-wrap.is-cramp .sk-go{padding:6px 11px;font-size:16px;} .sk-wrap.is-cramp .sk-note{font-size:15px;}'
  + '.sk-wrap.is-done .sk-shelf{display:none;}'
  + '.sk-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.sk-wrap *{animation:none !important;transition:none !important;}}'
  + '.sk-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'sk-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.StoveKnobActivity = StoveKnobActivity;
