/* =====================================================================
   mending-basket-activity.js — ACTIVITY #115 of the one-by-one rebuild:
   "Granny's Mending Basket" → THE THREAD THAT SNAPS BETWEEN TWO WORDS
   (RF.1.4.a; all 11 locales).
   Design: docs/activities-rebuild/designs/115-mending-basket.md
   ---------------------------------------------------------------------
   THE INVENTION: Granny's needle sews the torn page shut, and the thread
   only holds where the words agree. Put a paper piece in the torn hole
   and press Check: the long red stitch runs from the piece to the word
   the meaning hangs on (the keystone). If they agree it pulls tight and
   the page floods from grey into colour; if they disagree it SNAPS right
   between the two words, both glow and the frayed ends hang there.
   Clues: Fill the gap · Fix the word (tap the word that does not fit, the
   needle unpicks it, then mend) · Who is it? · Do what it says (crayon
   rings on pictures, stickers placed around a picture; the thread snaps
   at the instruction word that was not obeyed) · True or not? (the needle
   sews a true sentence in, the scissors cut a wrong one out) · Story
   questions (the thread looks for the proof sentence). Every mended page
   is bound into Granny's book along the top.
   ACTIVITY LAYER ONLY: the model is mending-basket-core.js; pictures are
   the library's (no hand-drawn character); lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when right).
   Test seams: window.MendingBasketActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var MendingBasketActivity = {
  id: 'mending-basket',
  apparatusClasses: ['mb-'],

  /*STRINGS-BEGIN*/strings: {
    title: {en:"Granny's Mending Basket",de:"Omas Flickkorb",nl:"Oma’s naaimand",fr:"Le panier à couture de Mamie",es:"El costurero de la abuela",it:"Il cestino da cucito della nonna",pt:"A cesta de costura da vovó",sv:"Mormors sykorg",da:"Mormors sykurv",no:"Mormors sykurv",fi:"Mummon ompelukori"},
    instruction: {en:"Read carefully. Mend the page with the piece the meaning needs: the thread only holds if the words agree.",de:"Lies genau. Flicke die Seite mit dem Stück, das der Sinn braucht: Der Faden hält nur, wenn die Wörter zusammenpassen.",nl:"Lees goed. Herstel de bladzijde met het stukje dat de zin nodig heeft: de draad houdt alleen als de woorden bij elkaar passen.",fr:"Lis bien. Répare la page avec le morceau dont le sens a besoin : le fil ne tient que si les mots vont ensemble.",es:"Lee con atención. Remienda la página con el pedazo que el sentido necesita: el hilo solo aguanta si las palabras concuerdan.",it:"Leggi con attenzione. Ricuci la pagina con il pezzo che serve al senso: il filo tiene solo se le parole vanno d’accordo.",pt:"Leia com atenção. Remende a página com o pedaço que o sentido pede: a linha só segura se as palavras combinam.",sv:"Läs noga. Laga sidan med den bit som meningen behöver: tråden håller bara om orden passar ihop.",da:"Læs grundigt. Lap siden med det stykke, som meningen skal bruge: Tråden holder kun, hvis ordene passer sammen.",no:"Les nøye. Lapp siden med biten som meningen trenger: Tråden holder bare hvis ordene passer sammen.",fi:"Lue tarkasti. Paikkaa sivu sillä palalla, jota merkitys tarvitsee: lanka pitää vain, jos sanat sopivat yhteen."},
    instrBubble: {en:"{msg}",de:"{msg}",nl:"{msg}",fr:"{msg}",es:"{msg}",it:"{msg}",pt:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",nl:"{msg}",fr:"{msg}",es:"{msg}",it:"{msg}",pt:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",nl:"Controleer",fr:"Vérifier",es:"Comprobar",it:"Controlla",pt:"Verificar",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tFill: {en:"Which piece mends the sentence?",de:"Welches Stück flickt den Satz?",nl:"Welk stukje herstelt de zin?",fr:"Quel morceau répare la phrase ?",es:"¿Qué pedazo remienda la oración?",it:"Quale pezzo ricuce la frase?",pt:"Qual pedaço remenda a frase?",sv:"Vilken bit lagar meningen?",da:"Hvilket stykke lapper sætningen?",no:"Hvilken bit lapper setningen?",fi:"Mikä pala paikkaa lauseen?"},
    tFix: {en:"Tap the word that doesn't fit, then mend it.",de:"Tippe das Wort an, das nicht passt, und flicke es dann.",nl:"Tik op het woord dat niet past en herstel het dan.",fr:"Touche le mot qui ne va pas, puis répare-le.",es:"Toca la palabra que no encaja y luego remiéndala.",it:"Tocca la parola che non va, poi ricucila.",pt:"Toque na palavra que não combina e depois remende.",sv:"Tryck på ordet som inte passar och laga det sedan.",da:"Tryk på det ord, der ikke passer, og lap det så.",no:"Trykk på ordet som ikke passer, og lapp det så.",fi:"Napauta sanaa, joka ei sovi, ja paikkaa se sitten."},
    tWho: {en:"Who is it? Mend the gap.",de:"Wer ist gemeint? Flicke die Lücke.",nl:"Wie is het? Herstel het gat.",fr:"Qui est-ce ? Répare le trou.",es:"¿Quién es? Remienda el hueco.",it:"Chi è? Ricuci il buco.",pt:"Quem é? Remende o buraco.",sv:"Vem är det? Laga hålet.",da:"Hvem er det? Lap hullet.",no:"Hvem er det? Lapp hullet.",fi:"Kuka se on? Paikkaa aukko."},
    tDo: {en:"Read it, then do exactly what it says.",de:"Lies es, dann mach genau, was dort steht.",nl:"Lees het en doe dan precies wat er staat.",fr:"Lis la phrase, puis fais exactement ce qu’elle dit.",es:"Léelo y haz exactamente lo que dice.",it:"Leggi e poi fai esattamente quello che dice.",pt:"Leia e faça exatamente o que está escrito.",sv:"Läs och gör sedan precis som det står.",da:"Læs det, og gør så præcis, hvad der står.",no:"Les det, og gjør så akkurat det som står.",fi:"Lue ja tee sitten juuri niin kuin lukee."},
    tTrue: {en:"Is it true? Sew it in, or cut it out.",de:"Stimmt das? Näh es ein oder schneide es heraus.",nl:"Klopt het? Naai het vast of knip het eruit.",fr:"Est-ce vrai ? Couds-la ou découpe-la.",es:"¿Es cierto? Cóselo o recórtalo.",it:"È vero? Cucilo o taglialo via.",pt:"É verdade? Costure ou recorte.",sv:"Stämmer det? Sy fast det eller klipp bort det.",da:"Passer det? Sy det fast, eller klip det væk.",no:"Stemmer det? Sy det fast, eller klipp det bort.",fi:"Pitääkö se paikkansa? Ompele se kiinni tai leikkaa pois."},
    tStory: {en:"Read the story. Answer the question.",de:"Lies die Geschichte. Beantworte die Frage.",nl:"Lees het verhaal. Beantwoord de vraag.",fr:"Lis l’histoire. Réponds à la question.",es:"Lee el cuento. Responde la pregunta.",it:"Leggi la storia. Rispondi alla domanda.",pt:"Leia a história. Responda à pergunta.",sv:"Läs berättelsen. Svara på frågan.",da:"Læs historien. Svar på spørgsmålet.",no:"Les historien. Svar på spørsmålet.",fi:"Lue tarina. Vastaa kysymykseen."},
    nudge: {en:"Tap a paper piece: it flies into the torn hole.",de:"Tippe ein Papierstück an: Es fliegt in das Loch.",nl:"Tik op een papiertje: het vliegt in het gat.",fr:"Touche un morceau de papier : il s’envole dans le trou.",es:"Toca un pedazo de papel: vuela al hueco.",it:"Tocca un pezzo di carta: vola nel buco.",pt:"Toque em um pedaço de papel: ele voa para o buraco.",sv:"Tryck på en pappersbit: den flyger in i hålet.",da:"Tryk på et stykke papir: Det flyver ind i hullet.",no:"Trykk på en papirbit: Den flyr inn i hullet.",fi:"Napauta paperinpalaa: se lentää reikään."},
    hintEmptyFill: {en:"Choose a piece for the torn hole.",de:"Wähl ein Stück für das Loch.",nl:"Kies een stukje voor het gat.",fr:"Choisis un morceau pour le trou.",es:"Elige un pedazo para el hueco.",it:"Scegli un pezzo per il buco.",pt:"Escolha um pedaço para o buraco.",sv:"Välj en bit till hålet.",da:"Vælg et stykke til hullet.",no:"Velg en bit til hullet.",fi:"Valitse pala reikään."},
    hintEmptyFix: {en:"First tap the word that doesn't fit.",de:"Tippe zuerst das Wort an, das nicht passt.",nl:"Tik eerst op het woord dat niet past.",fr:"Touche d’abord le mot qui ne va pas.",es:"Primero toca la palabra que no encaja.",it:"Prima tocca la parola che non va.",pt:"Primeiro toque na palavra que não combina.",sv:"Tryck först på ordet som inte passar.",da:"Tryk først på det ord, der ikke passer.",no:"Trykk først på ordet som ikke passer.",fi:"Napauta ensin sanaa, joka ei sovi."},
    hintEmptyDo: {en:"Read the sentence, then do what it says.",de:"Lies den Satz, dann mach, was dort steht.",nl:"Lees de zin en doe dan wat er staat.",fr:"Lis la phrase, puis fais ce qu’elle dit.",es:"Lee la oración y haz lo que dice.",it:"Leggi la frase e fai quello che dice.",pt:"Leia a frase e faça o que ela diz.",sv:"Läs meningen och gör sedan det som står.",da:"Læs sætningen, og gør så det, der står.",no:"Les setningen, og gjør så det som står.",fi:"Lue lause ja tee sitten niin kuin siinä lukee."},
    hintEmptyTrue: {en:"Is it true? Pick the needle or the scissors.",de:"Stimmt das? Nimm die Nadel oder die Schere.",nl:"Klopt het? Kies de naald of de schaar.",fr:"Est-ce vrai ? Prends l’aiguille ou les ciseaux.",es:"¿Es cierto? Elige la aguja o las tijeras.",it:"È vero? Scegli l’ago o le forbici.",pt:"É verdade? Escolha a agulha ou a tesoura.",sv:"Stämmer det? Välj nålen eller saxen.",da:"Passer det? Vælg nålen eller saksen.",no:"Stemmer det? Velg nåla eller saksa.",fi:"Pitääkö se paikkansa? Valitse neula tai sakset."},
    hintSnap: {en:"The thread broke between {a} and {b}. Do those two words go together?",de:"Der Faden ist zwischen {a} und {b} gerissen. Passen die zwei Wörter zusammen?",nl:"De draad is gebroken tussen {a} en {b}. Passen die twee woorden bij elkaar?",fr:"Le fil a cassé entre {a} et {b}. Ces deux mots vont-ils ensemble ?",es:"El hilo se rompió entre {a} y {b}. ¿Esas dos palabras van juntas?",it:"Il filo si è rotto tra {a} e {b}. Queste due parole vanno d’accordo?",pt:"A linha arrebentou entre {a} e {b}. Essas duas palavras combinam?",sv:"Tråden gick av mellan {a} och {b}. Passar de två orden ihop?",da:"Tråden knækkede mellem {a} og {b}. Passer de to ord sammen?",no:"Tråden røk mellom {a} og {b}. Passer de to ordene sammen?",fi:"Lanka katkesi sanojen {a} ja {b} välistä. Sopivatko ne kaksi sanaa yhteen?"},
    hintFixWord: {en:"The thread broke between {a} and {b}. But {b} fits. Which word does not agree with {a}?",de:"Der Faden ist zwischen {a} und {b} gerissen. Aber {b} passt. Welches Wort passt nicht zu {a}?",nl:"De draad is gebroken tussen {a} en {b}. Maar {b} past wel. Welk woord past niet bij {a}?",fr:"Le fil a cassé entre {a} et {b}. Mais {b} va bien. Quel mot ne va pas avec {a} ?",es:"El hilo se rompió entre {a} y {b}. Pero {b} sí encaja. ¿Qué palabra no concuerda con {a}?",it:"Il filo si è rotto tra {a} e {b}. Ma {b} va bene. Quale parola non va d’accordo con {a}?",pt:"A linha arrebentou entre {a} e {b}. Mas {b} combina. Qual palavra não combina com {a}?",sv:"Tråden gick av mellan {a} och {b}. Men {b} passar. Vilket ord passar inte ihop med {a}?",da:"Tråden knækkede mellem {a} og {b}. Men {b} passer. Hvilket ord passer ikke med {a}?",no:"Tråden røk mellom {a} og {b}. Men {b} passer. Hvilket ord passer ikke med {a}?",fi:"Lanka katkesi sanojen {a} ja {b} välistä. Mutta {b} sopii. Mikä sana ei sovi yhteen sanan {a} kanssa?"},
    hintKey: {en:"This word tells you what fits: {w}.",de:"Dieses Wort sagt dir, was passt: {w}.",nl:"Dit woord vertelt je wat past: {w}.",fr:"Ce mot te dit ce qui va : {w}.",es:"Esta palabra te dice qué encaja: {w}.",it:"Questa parola ti dice che cosa va: {w}.",pt:"Esta palavra diz o que combina: {w}.",sv:"Det här ordet visar vad som passar: {w}.",da:"Det her ord viser, hvad der passer: {w}.",no:"Dette ordet viser hva som passer: {w}.",fi:"Tämä sana kertoo, mikä sopii: {w}."},
    hintDo: {en:"The thread broke at {w}. Read that word again.",de:"Der Faden ist bei {w} gerissen. Lies das Wort noch einmal.",nl:"De draad is gebroken bij {w}. Lees dat woord nog eens.",fr:"Le fil a cassé au mot {w}. Relis ce mot.",es:"El hilo se rompió en {w}. Lee otra vez esa palabra.",it:"Il filo si è rotto sulla parola {w}. Rileggi quella parola.",pt:"A linha arrebentou em {w}. Leia essa palavra de novo.",sv:"Tråden gick av vid {w}. Läs det ordet igen.",da:"Tråden knækkede ved {w}. Læs det ord igen.",no:"Tråden røk ved {w}. Les det ordet igjen.",fi:"Lanka katkesi sanan {w} kohdalta. Lue se sana uudestaan."},
    hintDo2: {en:"Read {w} again. Count slowly, one by one, and look where things go.",de:"Lies {w} noch einmal. Zähl langsam, eins nach dem anderen, und schau, wohin alles kommt.",nl:"Lees {w} nog eens. Tel langzaam, één voor één, en kijk waar alles moet.",fr:"Relis {w}. Compte lentement, un par un, et regarde où tout va.",es:"Lee otra vez {w}. Cuenta despacio, uno por uno, y fíjate dónde va cada cosa.",it:"Rileggi {w}. Conta piano, uno alla volta, e guarda dove va ogni cosa.",pt:"Leia {w} de novo. Conte devagar, um por um, e veja onde cada coisa fica.",sv:"Läs {w} igen. Räkna långsamt, en i taget, och titta var sakerna ska vara.",da:"Læs {w} igen. Tæl langsomt, én ad gangen, og se, hvor tingene skal være.",no:"Les {w} igjen. Tell sakte, én og én, og se hvor tingene skal være.",fi:"Lue sana {w} uudestaan. Laske hitaasti yksi kerrallaan ja katso, minne mikin kuuluu."},
    hintTrue: {en:"The thread broke at {w}. Look at the picture again.",de:"Der Faden ist bei {w} gerissen. Schau dir das Bild noch einmal an.",nl:"De draad is gebroken bij {w}. Kijk nog eens naar het plaatje.",fr:"Le fil a cassé au mot {w}. Regarde encore l’image.",es:"El hilo se rompió en {w}. Mira otra vez el dibujo.",it:"Il filo si è rotto sulla parola {w}. Guarda di nuovo il disegno.",pt:"A linha arrebentou em {w}. Olhe a figura de novo.",sv:"Tråden gick av vid {w}. Titta på bilden igen.",da:"Tråden knækkede ved {w}. Se på billedet igen.",no:"Tråden røk ved {w}. Se på bildet igjen.",fi:"Lanka katkesi sanan {w} kohdalta. Katso kuvaa uudestaan."},
    hintTrue2: {en:"Think about {w}. Look at the picture: is it really like that?",de:"Denk an {w}. Schau aufs Bild: Ist es wirklich so?",nl:"Denk aan {w}. Kijk naar het plaatje: is het echt zo?",fr:"Pense au mot {w}. Regarde l’image : est-ce vraiment comme ça ?",es:"Piensa en {w}. Mira el dibujo: ¿de verdad es así?",it:"Pensa a {w}. Guarda il disegno: è davvero così?",pt:"Pense em {w}. Olhe a figura: é mesmo assim?",sv:"Tänk på {w}. Titta på bilden: är det verkligen så?",da:"Tænk på {w}. Se på billedet: Er det virkelig sådan?",no:"Tenk på {w}. Se på bildet: Er det virkelig sånn?",fi:"Mieti sanaa {w}. Katso kuvaa: onko se todella niin?"},
    hintStory: {en:"Find the sentence that tells you.",de:"Such den Satz, der es dir sagt.",nl:"Zoek de zin die het je vertelt.",fr:"Cherche la phrase qui te le dit.",es:"Busca la oración que te lo dice.",it:"Cerca la frase che te lo dice.",pt:"Procure a frase que conta isso.",sv:"Leta reda på meningen som berättar det.",da:"Find den sætning, der fortæller det.",no:"Finn setningen som forteller det.",fi:"Etsi lause, joka kertoo sen."},
    hintStory2: {en:"The answer is in the shaded sentence.",de:"Die Antwort steht im markierten Satz.",nl:"Het antwoord staat in de gekleurde zin.",fr:"La réponse est dans la phrase surlignée.",es:"La respuesta está en la oración marcada.",it:"La risposta è nella frase colorata.",pt:"A resposta está na frase marcada.",sv:"Svaret står i den markerade meningen.",da:"Svaret står i den markerede sætning.",no:"Svaret står i den markerte setningen.",fi:"Vastaus on korostetussa lauseessa."},
    okFill: {en:"{line} Mended!",de:"{line} Geflickt!",nl:"{line} Hersteld!",fr:"{line} Réparé !",es:"{line} ¡Remendado!",it:"{line} Ricucito!",pt:"{line} Remendado!",sv:"{line} Lagat!",da:"{line} Lappet!",no:"{line} Lappet!",fi:"{line} Paikattu!"},
    okFix: {en:"{a} → {b}: now every word agrees.",de:"{a} → {b}: Jetzt passen alle Wörter zusammen.",nl:"{a} → {b}: nu passen alle woorden bij elkaar.",fr:"{a} → {b} : maintenant, tous les mots vont ensemble.",es:"{a} → {b}: ahora todas las palabras concuerdan.",it:"{a} → {b}: ora tutte le parole vanno d’accordo.",pt:"{a} → {b}: agora todas as palavras combinam.",sv:"{a} → {b}: nu passar alla ord ihop.",da:"{a} → {b}: Nu passer alle ordene sammen.",no:"{a} → {b}: Nå passer alle ordene sammen.",fi:"{a} → {b}: nyt kaikki sanat sopivat yhteen."},
    okDo: {en:"Just what it said!",de:"Genau so, wie es dasteht!",nl:"Precies zoals het er staat!",fr:"Exactement ce qui était écrit !",es:"¡Justo lo que decía!",it:"Proprio come diceva!",pt:"Exatamente o que estava escrito!",sv:"Precis som det stod!",da:"Præcis som der stod!",no:"Akkurat som det sto!",fi:"Juuri niin kuin luki!"},
    okTrue: {en:"True: sewn in!",de:"Stimmt: eingenäht!",nl:"Klopt: vastgenaaid!",fr:"C’est vrai : cousu !",es:"Es cierto: ¡cosido!",it:"È vero: cucito!",pt:"É verdade: costurado!",sv:"Det stämmer: fastsytt!",da:"Det passer: syet fast!",no:"Det stemmer: sydd fast!",fi:"Pitää paikkansa: ommeltu kiinni!"},
    okFalse: {en:"Not true: cut out!",de:"Stimmt nicht: herausgeschnitten!",nl:"Klopt niet: eruitgeknipt!",fr:"Ce n’est pas vrai : découpé !",es:"No es cierto: ¡recortado!",it:"Non è vero: tagliato via!",pt:"Não é verdade: recortado!",sv:"Det stämmer inte: bortklippt!",da:"Det passer ikke: klippet væk!",no:"Det stemmer ikke: klippet bort!",fi:"Ei pidä paikkaansa: leikattu pois!"},
    okStory: {en:"Yes: {a}. It says so here.",de:"Ja: {a}. Hier steht es.",nl:"Ja: {a}. Hier staat het.",fr:"Oui : {a}. C’est écrit ici.",es:"Sí: {a}. Aquí lo dice.",it:"Sì: {a}. C’è scritto qui.",pt:"Isso: {a}. Está escrito aqui.",sv:"Ja: {a}. Det står här.",da:"Ja: {a}. Det står her.",no:"Ja: {a}. Det står her.",fi:"Kyllä: {a}. Tässä se lukee."},
    aBook: {en:"Granny's book: the pages you mended",de:"Omas Buch: deine geflickten Seiten",nl:"Oma’s boek: de bladzijden die je hebt hersteld",fr:"Le livre de Mamie : les pages que tu as réparées",es:"El libro de la abuela: las páginas que remendaste",it:"Il libro della nonna: le pagine che hai ricucito",pt:"O livro da vovó: as páginas que você remendou",sv:"Mormors bok: sidorna du har lagat",da:"Mormors bog: de sider, du har lappet",no:"Mormors bok: sidene du har lappet",fi:"Mummon kirja: sivut, jotka paikkasit"},
    aHole: {en:"Torn hole: {w}",de:"Loch: {w}",nl:"Gat: {w}",fr:"Trou : {w}",es:"Hueco: {w}",it:"Buco: {w}",pt:"Buraco: {w}",sv:"Hål: {w}",da:"Hul: {w}",no:"Hull: {w}",fi:"Reikä: {w}"},
    aHoleEmpty: {en:"Torn hole: empty",de:"Loch: leer",nl:"Gat: leeg",fr:"Trou : vide",es:"Hueco: vacío",it:"Buco: vuoto",pt:"Buraco: vazio",sv:"Hål: tomt",da:"Hul: tomt",no:"Hull: tomt",fi:"Reikä: tyhjä"},
    aPiece: {en:"Piece: {w}",de:"Stück: {w}",nl:"Stukje: {w}",fr:"Morceau : {w}",es:"Pedazo: {w}",it:"Pezzo: {w}",pt:"Pedaço: {w}",sv:"Bit: {w}",da:"Stykke: {w}",no:"Bit: {w}",fi:"Pala: {w}"},
    aWord: {en:"Word: {w}",de:"Wort: {w}",nl:"Woord: {w}",fr:"Mot : {w}",es:"Palabra: {w}",it:"Parola: {w}",pt:"Palavra: {w}",sv:"Ord: {w}",da:"Ord: {w}",no:"Ord: {w}",fi:"Sana: {w}"},
    aHeld: {en:"The thread held.",de:"Der Faden hält.",nl:"De draad houdt.",fr:"Le fil tient.",es:"El hilo aguanta.",it:"Il filo tiene.",pt:"A linha segurou.",sv:"Tråden håller.",da:"Tråden holder.",no:"Tråden holder.",fi:"Lanka pitää."},
    aSnapped: {en:"The thread broke between {a} and {b}.",de:"Der Faden ist zwischen {a} und {b} gerissen.",nl:"De draad is gebroken tussen {a} en {b}.",fr:"Le fil a cassé entre {a} et {b}.",es:"El hilo se rompió entre {a} y {b}.",it:"Il filo si è rotto tra {a} e {b}.",pt:"A linha arrebentou entre {a} e {b}.",sv:"Tråden gick av mellan {a} och {b}.",da:"Tråden knækkede mellem {a} og {b}.",no:"Tråden røk mellom {a} og {b}.",fi:"Lanka katkesi sanojen {a} ja {b} välistä."},
    aPic: {en:"Picture: {name}",de:"Bild: {name}",nl:"Plaatje: {name}",fr:"Image : {name}",es:"Dibujo: {name}",it:"Disegno: {name}",pt:"Figura: {name}",sv:"Bild: {name}",da:"Billede: {name}",no:"Bilde: {name}",fi:"Kuva: {name}"},
    aRinged: {en:"{name}, ringed in {c}",de:"{name}, {c} eingekreist",nl:"{name}, {c} omcirkeld",fr:"{name}, entouré en {c}",es:"{name}, encerrado en {c}",it:"{name}, cerchiato di {c}",pt:"{name}, circulado de {c}",sv:"{name}, inringad med {c}",da:"{name}, ringet ind med {c}",no:"{name}, ringet inn med {c}",fi:"{name}, ympyröity: {c}"},
    aCrayon: {en:"Crayon: {c}",de:"Wachsmalstift: {c}",nl:"Waskrijtje: {c}",fr:"Crayon : {c}",es:"Crayola: {c}",it:"Pastello: {c}",pt:"Giz de cera: {c}",sv:"Krita: {c}",da:"Farvekridt: {c}",no:"Fargestift: {c}",fi:"Liitu: {c}"},
    aSticker: {en:"Sticker: {name}",de:"Aufkleber: {name}",nl:"Sticker: {name}",fr:"Autocollant : {name}",es:"Calcomanía: {name}",it:"Adesivo: {name}",pt:"Adesivo: {name}",sv:"Klistermärke: {name}",da:"Klistermærke: {name}",no:"Klistremerke: {name}",fi:"Tarra: {name}"},
    aSpot: {en:"Put it here",de:"Hierhin legen",nl:"Hier neerleggen",fr:"Le poser ici",es:"Ponerlo aquí",it:"Mettilo qui",pt:"Colocar aqui",sv:"Lägg den här",da:"Læg den her",no:"Legg den her",fi:"Laita tähän"},
    aSew: {en:"Needle: it is true, sew it in",de:"Nadel: Es stimmt, näh es ein",nl:"Naald: het klopt, naai het vast",fr:"Aiguille : c’est vrai, couds-la",es:"Aguja: es cierto, cóselo",it:"Ago: è vero, cucilo",pt:"Agulha: é verdade, costure",sv:"Nål: det stämmer, sy fast det",da:"Nål: Det passer, sy det fast",no:"Nål: Det stemmer, sy det fast",fi:"Neula: pitää paikkansa, ompele kiinni"},
    aCut: {en:"Scissors: it is not true, cut it out",de:"Schere: Es stimmt nicht, schneide es heraus",nl:"Schaar: het klopt niet, knip het eruit",fr:"Ciseaux : ce n’est pas vrai, découpe-la",es:"Tijeras: no es cierto, recórtalo",it:"Forbici: non è vero, taglialo via",pt:"Tesoura: não é verdade, recorte",sv:"Sax: det stämmer inte, klipp bort det",da:"Saks: Det passer ikke, klip det væk",no:"Saks: Det stemmer ikke, klipp det bort",fi:"Sakset: ei pidä paikkaansa, leikkaa pois"},
    setClue: {en:"Clue",de:"Aufgabe",nl:"Opdracht",fr:"Consigne",es:"Actividad",it:"Attività",pt:"Atividade",sv:"Uppgift",da:"Opgave",no:"Oppgave",fi:"Tehtävä"},
    cFill: {en:"Fill the gap",de:"Lücke füllen",nl:"Gat vullen",fr:"Remplis le trou",es:"Llena el hueco",it:"Riempi il buco",pt:"Preencha o buraco",sv:"Fyll i luckan",da:"Udfyld hullet",no:"Fyll inn hullet",fi:"Täytä aukko"},
    cFix: {en:"Fix the word",de:"Wort verbessern",nl:"Woord verbeteren",fr:"Corrige le mot",es:"Corrige la palabra",it:"Correggi la parola",pt:"Corrija a palavra",sv:"Rätta ordet",da:"Ret ordet",no:"Rett ordet",fi:"Korjaa sana"},
    cWho: {en:"Who is it?",de:"Wer ist gemeint?",nl:"Wie is het?",fr:"Qui est-ce ?",es:"¿Quién es?",it:"Chi è?",pt:"Quem é?",sv:"Vem är det?",da:"Hvem er det?",no:"Hvem er det?",fi:"Kuka se on?"},
    cDo: {en:"Do what it says",de:"Mach, was dasteht",nl:"Doe wat er staat",fr:"Fais ce qui est écrit",es:"Haz lo que dice",it:"Fai quello che dice",pt:"Faça o que diz",sv:"Gör som det står",da:"Gør, som der står",no:"Gjør som det står",fi:"Tee niin kuin lukee"},
    cTrue: {en:"True or not?",de:"Stimmt das?",nl:"Klopt het?",fr:"Vrai ou pas ?",es:"¿Es cierto?",it:"Vero o no?",pt:"É verdade?",sv:"Stämmer det?",da:"Passer det?",no:"Stemmer det?",fi:"Pitääkö paikkansa?"},
    cStory: {en:"Story questions",de:"Fragen zur Geschichte",nl:"Vragen bij het verhaal",fr:"Questions sur l’histoire",es:"Preguntas del cuento",it:"Domande sulla storia",pt:"Perguntas da história",sv:"Frågor om berättelsen",da:"Spørgsmål til historien",no:"Spørsmål til historien",fi:"Kysymyksiä tarinasta"},
    aTurnQ: {en:"Turn the page: the question",de:"Seite umblättern: die Frage",nl:"Blad om: de vraag",fr:"Tourne la page : la question",es:"Voltea la página: la pregunta",it:"Gira la pagina: la domanda",pt:"Vire a página: a pergunta",sv:"Vänd blad: frågan",da:"Vend siden: spørgsmålet",no:"Bla om: spørsmålet",fi:"Käännä sivu: kysymys"},
    aTurnS: {en:"Turn back: the story",de:"Zurückblättern: die Geschichte",nl:"Blad terug: het verhaal",fr:"Reviens en arrière : l’histoire",es:"Regresa la página: el cuento",it:"Torna indietro: la storia",pt:"Volte a página: a história",sv:"Vänd tillbaka: berättelsen",da:"Vend tilbage: historien",no:"Bla tilbake: historien",fi:"Käännä takaisin: tarina"},
  },/*STRINGS-END*/

  defaults: { clue: 'fill' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'fill', labelKey: 'cFill' }, { value: 'fix', labelKey: 'cFix' }, { value: 'who', labelKey: 'cWho' }, { value: 'do', labelKey: 'cDo' }, { value: 'true', labelKey: 'cTrue' }, { value: 'story', labelKey: 'cStory' }] }
  ],
  OK_MS: 4200, FAST: false,
  CRAYON: { red: '#E04B3C', blue: '#2F7FD1', yellow: '#F2C230', green: '#3FA34D' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._book = {}; this._nudged = false;
    injectMendingBasketCSS();
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
  _loc: function () { return MendingBasketCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return MendingBasketCore.clueOf(this._setting('clue')); },
  _key: function () { return this._loc() + '/' + this._clue(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MendingBasketCore.rounds(this._loc(), this._clue()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MendingBasketCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._clue(), Math.random, fresh ? null : this._prev);
      this._prev = P.order; this._order = P.order.slice(); this._pos = P.pos; this._orderForPool = pool; this._pass = pass;
      this._book[this._key()] = 0;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'mendingbasket.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t({ fill: 'tFill', fix: 'tFix', who: 'tWho', do: 'tDo', true: 'tTrue', story: 'tStory' }[this.st.clue]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    this.st = MendingBasketCore.newState(this._loc(), this._clue(), r, { rnd: Math.random, pos: this._pos ? this._pos[this._at] : null });
    this._view = { note: '', ok: '' }; this._turn = 0;
    if (!this._nudged && ['fill', 'who', 'story'].indexOf(this.st.clue) >= 0) { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
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
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'mb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="mb-book"></div><div class="mb-page"></div><div class="mb-basket"></div><div class="mb-foot"></div><p class="mb-note" aria-live="polite"></p><p class="mb-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = MendingBasketCore.band(W);
    return { W: W, w: w, wide: B.wide, tiny: B.tiny, pic: B.wide ? 120 : B.tiny ? 64 : 76, big: B.wide ? 150 : B.tiny ? 80 : 112 };
  },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _name: function (p) { var n = MendingBasketCore.DATA[this._loc()].names; return (n && n[p]) || p.split('/').pop(); },
  _colourName: function (c) { return MendingBasketCore.DATA[this._loc()].colours[c]; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'phrase', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.mb-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = MendingBasketCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'mb-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue + (C.help(st) ? ' is-help' : '');
    /* Granny's book: a page for each round of the pass, coloured when mended */
    var book = this._qs('.mb-book'), n = this._book[this._key()] || 0; book.setAttribute('role', 'img'); book.setAttribute('aria-label', this._t('aBook'));
    book.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<i class="mb-leaf' + (i < n ? ' is-mended' : '') + '"></i>'; }).join('');
    /* the page */
    var page = this._qs('.mb-page'); page.innerHTML = ''; page.className = 'mb-page' + (st.done ? ' is-healed' : '');
    if (st.clue === 'story') page.appendChild(this._story(D)); else page.appendChild(this._text(D));
    page.appendChild(this._pictures(D));
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'mb-thread'); svg.setAttribute('aria-hidden', 'true'); page.appendChild(svg);
    /* the basket */
    var basket = this._qs('.mb-basket'); basket.innerHTML = ''; this._basket(basket, D);
    basket.classList.toggle('is-away', st.clue === 'story' && D.tiny && !this._turn);
    var foot = this._qs('.mb-foot'); foot.innerHTML = '';
    var chk = this._btn('mb-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 18 L18 4" stroke="#FFF" stroke-width="2.4" stroke-linecap="round"/><circle cx="19" cy="3.6" r="1.6" fill="none" stroke="#FFF" stroke-width="1.6"/><path d="M4 18 C 8 21, 12 16, 16 20" fill="none" stroke="#FFD2C8" stroke-width="2"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.mb-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'mb-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'mb-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'mb-note'; }
    this._drawThread();
  },
  /* the sentence: words (Fix: each word is a button), the torn hole */
  _text: function (D) {
    var C = MendingBasketCore, st = this.st, R = st.R, self = this, help = C.help(st), sn = st.snap;
    var box = document.createElement('p'); box.className = 'mb-text';
    var longest = Math.max.apply(null, (st.pieces || ['']).map(function (p) { return p.length; }));
    R.tok.forEach(function (t, i) {
      var cls = 'mb-w' + (help && i === R.key && st.clue !== 'do' ? ' is-key' : '') + (sn && sn.a === i ? ' is-snap' : '') + (sn && sn.b === i ? ' is-snap' : '');
      var hole = t.gap || st.clue === 'fix' && st.picked === i;
      if (hole) {
        var w = st.hole == null ? '' : st.pieces[st.hole];
        var hb = self._btn('mb-hole' + (st.hole != null ? ' is-full' : '') + (sn && sn.b === 'hole' ? ' is-snap' : ''), 'hole', st.hole == null ? self._t('aHoleEmpty') : self._t('aHole', { w: w }), esc(w));
        hb.style.minWidth = (Math.max(longest, 3) * 0.62 + 1.4) + 'em'; hb.setAttribute('data-t', String(i));
        hb.disabled = st.done || st.hole == null; hb.addEventListener('click', function () { self._mend(st.hole); });
        box.appendChild(hb);
        if (t.after || t.fix && t.after) box.appendChild(document.createTextNode(t.after || ''));
      } else if (st.clue === 'fix' && t.t != null) {
        var wb = self._btn(cls + ' is-tap', 'word-' + i, self._t('aWord', { w: C.word(R.tok, i) }), esc(t.fix ? t.t + (t.after || '') : t.t));
        wb.setAttribute('data-t', String(i)); wb.disabled = st.done;
        wb.addEventListener('click', function () { self._unpick(i); });
        box.appendChild(wb);
      } else {
        var sp = document.createElement('span'); sp.className = cls; sp.setAttribute('data-t', String(i)); sp.textContent = t.fix ? t.t + (t.after || '') : t.t; box.appendChild(sp);
      }
      box.appendChild(document.createTextNode(' '));
    });
    return box;
  },
  _story: function (D) {
    var C = MendingBasketCore, st = this.st, R = st.R, self = this, help = C.help(st);
    var box = document.createElement('div'), turn = D.tiny ? (this._turn ? ' is-q' : ' is-s') : ''; box.className = 'mb-storybox' + turn;
    var p = document.createElement('p'); p.className = 'mb-text mb-tale';
    R.s.forEach(function (s, i) { var sp = document.createElement('span'); sp.className = 'mb-sent' + (help && R.proof.indexOf(i) >= 0 ? ' is-proof' : '') + (st.done && R.proof.indexOf(i) >= 0 ? ' is-proved' : ''); sp.setAttribute('data-s', String(i)); sp.textContent = s; p.appendChild(sp); p.appendChild(document.createTextNode(' ')); });
    box.appendChild(p);
    var q = document.createElement('p'); q.className = 'mb-text mb-q';
    var qs = document.createElement('span'); qs.className = 'mb-qtext'; qs.textContent = R.q; q.appendChild(qs); q.appendChild(document.createTextNode(' '));
    var longest = Math.max.apply(null, st.pieces.map(function (x) { return x.length; }));
    var hb = this._btn('mb-hole' + (st.hole != null ? ' is-full' : '') + (st.snap ? ' is-snap' : ''), 'hole', st.hole == null ? this._t('aHoleEmpty') : this._t('aHole', { w: st.pieces[st.hole] }), esc(st.hole == null ? '' : st.pieces[st.hole]));
    hb.style.minWidth = Math.min(16, Math.max(longest, 3) * 0.55 + 1.4) + 'em'; hb.disabled = st.done || st.hole == null; hb.addEventListener('click', function () { self._mend(st.hole); });
    q.appendChild(hb); box.appendChild(q);
    if (D.tiny) {
      /* at 320 px the story and its question are two sides of the page: turn it */
      var tb = this._btn('mb-turn', 'turn', this._t(this._turn ? 'aTurnS' : 'aTurnQ'), '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="' + (this._turn ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19') + '" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      tb.addEventListener('click', function () { self._turn = self._turn ? 0 : 1; self.api.sound(420); self._paint(); });
      box.appendChild(tb);
    }
    return box;
  },
  /* the picture panel: the round's library pictures, or the Do / True scene */
  _pictures: function (D) {
    var st = this.st, self = this, panel = document.createElement('div'); panel.className = 'mb-pics';
    if (st.clue === 'do' || st.clue === 'true') { panel.appendChild(this._scene(D)); return panel; }
    /* a story's pictures are decoration: below 560 px the story text keeps the room */
    var pics = st.clue === 'story' && !D.wide ? [] : st.R.pics, size = pics.length >= 3 ? D.pic : D.big;
    pics.forEach(function (p) {
      var c = document.createElement('div'); c.className = 'mb-pic' + (p.hide && !st.done ? ' is-hidden' : ''); c.setAttribute('role', 'img');
      c.setAttribute('aria-label', p.hide && !st.done ? '' : self._t('aPic', { name: self._name(p.pic) }));
      c.innerHTML = self._img(p.pic, size) + (p.hide && !st.done ? '<span class="mb-patch" aria-hidden="true"></span>' : '');
      c.style.width = c.style.height = (size + 10) + 'px'; panel.appendChild(c);
    });
    if (!pics.length) panel.classList.add('is-empty');
    return panel;
  },
  _scene: function (D) {
    var C = MendingBasketCore, st = this.st, S = st.S, self = this, help = C.help(st), sn = st.snap;
    var sc = document.createElement('div'); sc.className = 'mb-scene';
    if (S.row) {
      var row = document.createElement('div'); row.className = 'mb-row' + (S.row.length >= 5 ? ' is-five' : '');
      if (S.arrow) { var ar = document.createElement('span'); ar.className = 'mb-arrow'; ar.setAttribute('aria-hidden', 'true'); ar.innerHTML = '<svg viewBox="0 0 30 20" width="30" height="20"><path d="M2 10 H24 M18 4 L26 10 L18 16" fill="none" stroke="#7A5A3A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'; row.appendChild(ar); }
      var size = D.pic;
      S.row.forEach(function (p, i) {
        var ring = st.clue === 'do' ? st.rings[i] : null, label = self._t('aPic', { name: self._name(p) }) + (ring ? ', ' + self._t('aRinged', { name: '', c: self._colourName(ring) }).replace(/^,\s*/, '') : '');
        var el = st.clue === 'do' ? self._btn('mb-ring' + (sn && sn.b === i ? ' is-snap' : ''), 'pic-' + i, label, self._img(p, size) + (help && st.clue === 'do' ? '<b class="mb-tag">' + '•'.repeat(1) + '</b>' : '')) : document.createElement('div');
        if (st.clue !== 'do') { el.className = 'mb-still'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', label); el.innerHTML = self._img(p, size); }
        el.style.width = el.style.height = (size + 12) + 'px';
        if (ring) el.style.setProperty('--mb-ring', self.CRAYON[ring]);
        if (ring) el.classList.add('is-ringed');
        if (st.clue === 'do') { el.disabled = st.done; el.addEventListener('click', function () { self._ring(i); }); }
        row.appendChild(el);
      });
      if (help && st.clue === 'do') row.classList.add('is-counting');
      sc.appendChild(row); return sc;
    }
    /* an anchor picture with places around it */
    var A = D.tiny ? 80 : D.big, s = Math.max(56, Math.round(A * 0.56));
    var stage = document.createElement('div'); stage.className = 'mb-stage';
    var H = Math.round(s * (D.tiny ? 1.05 : 1.15) + A + s * (D.tiny ? 0.85 : 1.0)), Wd = Math.round(A + 2 * (s * 1.25));
    stage.style.width = Wd + 'px'; stage.style.height = H + 'px';
    var aTop = Math.round(s * (D.tiny ? 1.05 : 1.15)), cx = Wd / 2;
    var anc = document.createElement('div'); anc.className = 'mb-anchor'; anc.setAttribute('role', 'img'); anc.setAttribute('aria-label', this._t('aPic', { name: this._name(S.anchor) }));
    anc.innerHTML = this._img(S.anchor, A); anc.style.left = (cx - A / 2) + 'px'; anc.style.top = aTop + 'px'; anc.style.width = anc.style.height = A + 'px';
    stage.appendChild(anc);
    var Z = { above: [cx, s * 0.58], on: [cx, aTop + s * 0.3], beside: [cx + A / 2 + s * 0.62, aTop + A * 0.62], front: [cx - A * 0.08, aTop + A * 0.74], under: [cx, aTop + A + s * 0.5] };
    var placedAt = {}; if (st.clue === 'do') Object.keys(st.placed).forEach(function (k) { placedAt[st.placed[k]] = k; });
    else (S.placed || []).forEach(function (x) { placedAt[x[1]] = x[0]; });
    C.ZONES.forEach(function (z) {
      var who = placedAt[z], pos = Z[z];
      if (st.clue !== 'do') { if (!who) return; var still = document.createElement('div'); still.className = 'mb-spot is-still z-' + z; still.innerHTML = self._img(who, s - 6); still.style.left = (pos[0] - s / 2) + 'px'; still.style.top = (pos[1] - s / 2) + 'px'; still.style.width = still.style.height = s + 'px'; stage.appendChild(still); return; }
      var lab = who ? self._t('aSticker', { name: self._name(who) }) : self._t('aSpot');
      var b = self._btn('mb-spot z-' + z + (who ? ' is-full' : '') + (sn && sn.b === who && who ? ' is-snap' : ''), 'zone-' + z, lab, who ? self._img(who, s - 6) : '');
      b.style.left = (pos[0] - s / 2) + 'px'; b.style.top = (pos[1] - s / 2) + 'px'; b.style.width = b.style.height = s + 'px';
      b.disabled = st.done || (!who && st.lifted == null);
      b.addEventListener('click', function () { if (who && st.lifted == null) self._unplace(who); else self._place(z); });
      stage.appendChild(b);
    });
    if (st.clue === 'do' && (st.lifted != null || help)) stage.classList.add('is-showing');
    sc.appendChild(stage); return sc;
  },
  _basket: function (basket, D) {
    var C = MendingBasketCore, st = this.st, self = this;
    if (st.pieces) {
      st.pieces.forEach(function (p, i) {
        var b = self._btn('mb-piece' + (st.hole === i ? ' is-out' : ''), 'piece-' + i, self._t('aPiece', { w: p }), '<span>' + esc(p) + '</span>');
        b.disabled = st.done || st.clue === 'fix' && st.picked == null; b.addEventListener('click', function () { self._mend(i); }); basket.appendChild(b);
      });
      return;
    }
    if (st.clue === 'true') {
      [['sew', 'aSew', '<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true"><path d="M8 40 L36 12" stroke="#8A8F98" stroke-width="4" stroke-linecap="round"/><ellipse cx="38" cy="10" rx="3.5" ry="2" transform="rotate(-45 38 10)" fill="none" stroke="#8A8F98" stroke-width="2"/><path d="M38 10 C 46 22, 26 30, 30 44" fill="none" stroke="#D93A2B" stroke-width="3" stroke-linecap="round"/></svg>'],
       ['cut', 'aCut', '<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true"><circle cx="12" cy="36" r="6" fill="none" stroke="#3B6EA8" stroke-width="4"/><circle cx="28" cy="40" r="6" fill="none" stroke="#3B6EA8" stroke-width="4"/><path d="M16 31 L40 6 M24 35 L42 14" stroke="#8A8F98" stroke-width="4" stroke-linecap="round"/></svg>']].forEach(function (x) {
        var b = self._btn('mb-tool' + (st.tool === x[0] ? ' is-on' : ''), 'tool-' + x[0], self._t(x[1]), x[2]); b.disabled = st.done;
        b.addEventListener('click', function () { self._tool(x[0]); }); basket.appendChild(b);
      });
      return;
    }
    var S = st.S;
    if (S.crayons) S.crayons.forEach(function (c) {
      var b = self._btn('mb-crayon' + (st.crayon === c ? ' is-on' : ''), 'crayon-' + c, self._t('aCrayon', { c: self._colourName(c) }), '<i style="background:' + self.CRAYON[c] + '"></i><span>' + esc(self._colourName(c)) + '</span>');
      b.disabled = st.done; b.addEventListener('click', function () { self._crayon(c); }); basket.appendChild(b);
    });
    if (S.stickers) S.stickers.forEach(function (k, i) {
      var out = k in st.placed, b = self._btn('mb-sticker' + (st.lifted === k ? ' is-on' : '') + (out ? ' is-out' : ''), 'sticker-' + i, self._t('aSticker', { name: self._name(k) }), out ? '' : self._img(k, D.tiny ? 52 : 60));
      b.disabled = st.done || out; b.addEventListener('click', function () { self._lift(k); }); basket.appendChild(b);
    });
  },
  /* the thread: after a Check it runs from the keystone (or the instruction word, or the proof) to the piece / the thing.
     Held: one tight red line. Snapped: two frayed ends with a gap in the middle. */
  _drawThread: function () {
    var st = this.st, svg = this._qs('.mb-thread'), page = this._qs('.mb-page'); if (!svg || !page) return;
    svg.innerHTML = '';
    var R = st.R, a = null, b = null, held = st.done;
    if (!held && st.last !== 'snap') return;
    var sn = st.snap || {};
    var q = function (sel) { return page.querySelector(sel); };
    if (st.clue === 'story') { a = q('[data-s="' + R.proof[0] + '"]'); b = q('.mb-hole'); }
    else if (st.clue === 'true') { a = q('[data-t="' + R.key + '"]'); var stills = page.querySelectorAll('.mb-spot.is-still,.mb-still'); b = stills.length ? stills[Math.floor((stills.length - 1) / 2)] : q('.mb-anchor'); }
    else if (st.clue === 'do') { if (held) return; a = q('[data-t="' + sn.a + '"]'); b = sn.b != null ? (typeof sn.b === 'number' ? q('[data-k="pic-' + sn.b + '"]') : q('.mb-spot.is-full.is-snap')) : q('.mb-scene'); if (!b) b = q('.mb-scene'); }
    else { a = q('[data-t="' + R.key + '"]'); b = sn.kind === 'word' ? q('[data-t="' + sn.b + '"]') : q('.mb-hole'); }
    /* an end on the other side of a turned page is not drawn */
    if (!a || !b || !a.getClientRects().length || !b.getClientRects().length) return;
    var P = page.getBoundingClientRect(), ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    var x1 = ra.left + ra.width / 2 - P.left, y1 = ra.top + ra.height - 2 - P.top, x2 = rb.left + rb.width / 2 - P.left, y2 = (st.clue === 'do' || st.clue === 'true' ? rb.top + 4 : rb.top + rb.height - 2) - P.top;
    svg.setAttribute('width', P.width); svg.setAttribute('height', P.height); svg.setAttribute('viewBox', '0 0 ' + P.width + ' ' + P.height);
    var mx = (x1 + x2) / 2, my = Math.max(y1, y2) + 26, NS = 'http://www.w3.org/2000/svg';
    var path = function (d, cls) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('class', cls); svg.appendChild(p); };
    if (held) { path('M' + x1 + ' ' + y1 + ' Q ' + mx + ' ' + (my - 8) + ' ' + x2 + ' ' + y2, 'mb-held'); return; }
    /* the snap: the quadratic's two halves pulled back from the middle, each with a frayed tip */
    var pt = function (t) { var u = 1 - t; return [u * u * x1 + 2 * u * t * mx + t * t * x2, u * u * y1 + 2 * u * t * my + t * t * y2]; };
    var A1 = pt(0.38), B1 = pt(0.62), c1 = pt(0.19), c2 = pt(0.81);
    path('M' + x1 + ' ' + y1 + ' Q ' + c1[0] + ' ' + (c1[1] + 6) + ' ' + A1[0] + ' ' + A1[1], 'mb-snapped');
    path('M' + x2 + ' ' + y2 + ' Q ' + c2[0] + ' ' + (c2[1] + 6) + ' ' + B1[0] + ' ' + B1[1], 'mb-snapped');
    [A1, B1].forEach(function (e) { path('M' + e[0] + ' ' + e[1] + ' l -5 7 M' + e[0] + ' ' + e[1] + ' l 5 8 M' + e[0] + ' ' + e[1] + ' l 0 9', 'mb-fray'); });
  },

  /* ---------------- the hand ---------------- */
  _move: function (r, s1, s2) { if (r === 'no' || r === 'nocrayon') { this.api.sound(200); if (r === 'nocrayon') { this._view.note = this._t('hintEmptyDo'); this._view.nudge = false; } this._paint(); return false; } this.api.sound(s1 || 440); this._clearHelp(); this._paint(); return true; },
  _mend: function (i) { var r = MendingBasketCore.mend(this.st, i); this._move(r, r === 'in' ? 520 : 300); },
  _unpick: function (t) { this._move(MendingBasketCore.unpick(this.st, t), 360); },
  _crayon: function (c) { var r = MendingBasketCore.pickCrayon(this.st, c); if (r === 'no') return; this.api.sound(480); this._paint(); },
  _ring: function (i) { this._move(MendingBasketCore.ring(this.st, i), 560); },
  _lift: function (k) { var r = MendingBasketCore.lift(this.st, k); if (r === 'no') return; this.api.sound(480); this._paint(); },
  _place: function (z) { this._move(MendingBasketCore.place(this.st, z), 520); },
  _unplace: function (k) { this._move(MendingBasketCore.unplace(this.st, k), 300); },
  _tool: function (t) { this._move(MendingBasketCore.chooseTool(this.st, t), 520); },

  /* ---------------- Check: the needle sews ---------------- */
  _check: function () {
    var C = MendingBasketCore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'ok') { this._success(); return; }
    var h = C.hint(st); v.nudge = false; v.note = this._t(h.key, h.args);
    if (a.result === 'tray') { this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    this.api.sound(180);
    var R = st.R, sn = st.snap, aw = typeof sn.a === 'number' ? C.word(R.tok, sn.a) : (R.s ? R.s[R.proof[0]] : ''), bw = sn.b === 'hole' ? st.pieces[st.hole] : typeof sn.b === 'number' && R.tok && st.clue !== 'do' ? C.word(R.tok, sn.b) : '';
    this._sr(this._t('aSnapped', { a: aw, b: bw }));
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = MendingBasketCore, st = this.st, v = this._view, R = st.R, k = st.clue;
    if (k === 'fill' || k === 'who') v.ok = this._t('okFill', { line: C.healed(st) });
    else if (k === 'fix') v.ok = this._t('okFix', { a: R.tok[R.wrong].t, b: R.ans });
    else if (k === 'story') v.ok = this._t('okStory', { a: R.ans });
    else if (k === 'true') v.ok = this._t(st.S.truth ? 'okTrue' : 'okFalse');
    else v.ok = this._t('okDo');
    this._book[this._key()] = (this._book[this._key()] || 0) + 1;
    this.api.sound(988); this._sr(this._t('aHeld')); this._paint(); this.api.announce(v.ok);
    if (k === 'fill' || k === 'who' || k === 'fix') this._speak(C.healed(st));
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectMendingBasketCSS() {
  if (typeof document === 'undefined' || document.getElementById('mb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#3B2A1A', RED = '#D93A2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.mb-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .mb-wrap:focus{outline:none;} .mb-wrap.is-narrow{gap:9px;}'
  + '.mb-book{display:flex;gap:5px;justify-content:center;padding:5px 12px;border-radius:8px;background:#7A5A3A;box-shadow:inset 0 -3px 0 #5C4128;} .mb-leaf{display:block;width:18px;height:22px;border-radius:2px 4px 4px 2px;background:#E9DFCF;box-shadow:inset 2px 0 0 #CDBFA8;} .mb-leaf.is-mended{background:linear-gradient(135deg,#F7C59F,#9ED3C6);box-shadow:inset 2px 0 0 #D9A67E;}'
  /* the page: cream paper, grey until it heals */
  + '.mb-page{position:relative;width:100%;box-sizing:border-box;padding:16px 18px 14px;border-radius:6px 18px 18px 6px;background:#FFFDF6;box-shadow:0 2px 0 #E3D5BC,0 6px 14px rgba(59,42,26,.12),inset 0 0 0 1px #EADFC9;}'
  + '.mb-wrap.is-narrow .mb-page{padding:12px 12px 12px;}'
  + '.mb-thread{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;} .mb-held{fill:none;stroke:' + RED + ';stroke-width:3;stroke-linecap:round;} .mb-snapped{fill:none;stroke:' + RED + ';stroke-width:3;stroke-linecap:round;stroke-dasharray:0;} .mb-fray{fill:none;stroke:' + RED + ';stroke-width:1.6;stroke-linecap:round;}'
  + '.mb-text{position:relative;z-index:1;margin:0 0 10px;font-family:' + B + ';font-weight:700;font-size:22px;line-height:1.75;color:' + INK + ';} .mb-wrap.is-narrow .mb-text{font-size:20px;line-height:1.7;} .mb-wrap.is-tiny .mb-text{font-size:18px;}'
  + '.mb-w{border-radius:5px;padding:0 1px;transition:background .2s;} .mb-w.is-snap{background:#FAD3CB;box-shadow:inset 0 -3px 0 ' + RED + ';} .mb-wrap.is-help .mb-w.is-key{background:#FBE7A6;box-shadow:inset 0 -3px 0 #E8A53A;}'
  + 'button.mb-w{display:inline-block;min-width:44px;text-align:center;vertical-align:middle;min-height:44px;margin:0;padding:6px 3px;border:0;border-radius:8px;background:transparent;font:inherit;color:inherit;cursor:pointer;line-height:1.2;} button.mb-w:hover{background:#F3EBDD;} button.mb-w:disabled{cursor:default;}'
  + '.mb-hole{display:inline-flex;align-items:center;justify-content:center;min-height:44px;margin:0 2px;padding:0 10px;vertical-align:middle;border:2px dashed #B98552;border-radius:4px 10px 6px 12px;background:repeating-linear-gradient(45deg,#F4EAD8 0 6px,#EFE2CA 6px 12px);font-family:' + H + ';font-weight:800;font-size:1em;line-height:1;color:' + INK + ';cursor:pointer;}'
  + '.mb-hole.is-full{border-style:solid;border-color:#D7B98C;background:#FFF8EC;} .mb-hole:disabled{cursor:default;} .mb-hole.is-snap{box-shadow:0 0 0 3px #FAD3CB;border-color:' + RED + ';} .mb-page.is-healed .mb-hole{border:0;background:transparent;box-shadow:inset 0 -3px 0 ' + RED + ';border-radius:2px;}'
  + '.mb-sent{border-radius:5px;transition:background .3s;} .mb-sent.is-proof{background:#FBE7A6;} .mb-sent.is-proved{background:#DFF1E9;} .mb-tale{font-size:20px;line-height:1.6;} .mb-wrap.is-narrow .mb-tale{font-size:18px;line-height:1.5;} .mb-wrap.is-tiny .mb-tale{font-size:17px;} .mb-q{font-weight:800;color:#146B5E;}'
  /* pictures: grey until the page heals, then colour */
  + '.mb-pics{display:flex;gap:12px;justify-content:center;align-items:flex-end;flex-wrap:wrap;} .mb-pics.is-empty{display:none;}'
  + '.mb-pic{position:relative;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#FBF6EC;overflow:hidden;} .mb-pic img,.mb-still img,.mb-ring img,.mb-anchor img,.mb-spot img{display:block;object-fit:contain;pointer-events:none;}'
  + '.mb-page:not(.is-healed) .mb-pics img{filter:grayscale(1) contrast(.95);opacity:.85;} .mb-pics img{transition:filter .6s,opacity .6s;} .mb-wrap.is-fast .mb-pics img{transition:none;}'
  + '.mb-wrap.clue-do .mb-page .mb-pics img,.mb-wrap.clue-true .mb-page .mb-pics img{filter:none;opacity:1;}'
  + '.mb-patch{position:absolute;inset:-4px;background:#EDE3D2;clip-path:polygon(0 18%,22% 0,48% 12%,70% 0,100% 16%,90% 46%,100% 72%,78% 100%,50% 88%,24% 100%,0 80%,10% 50%);box-shadow:inset 0 0 0 2px #D9C9AE;}'
  + '.mb-scene{display:flex;justify-content:center;width:100%;}'
  + '.mb-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;} .mb-arrow{display:flex;align-items:center;margin-right:2px;}'
  + '.mb-ring,.mb-still{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:50%;background:#FBF6EC;box-shadow:0 0 0 3px #EADFC9;cursor:pointer;} .mb-still{cursor:default;border-radius:14px;}'
  + '.mb-ring.is-ringed{box-shadow:0 0 0 6px var(--mb-ring),0 0 0 9px #FFFDF6;} .mb-ring.is-snap{outline:3px dashed ' + RED + ';outline-offset:10px;} .mb-ring:disabled{cursor:default;}'
  + '.mb-tag{position:absolute;right:-2px;top:-2px;min-width:16px;height:16px;border-radius:8px;background:#E8A53A;color:#FFF;font:800 11px/16px ' + B + ';text-align:center;} .mb-row.is-counting{counter-reset:mbc;} .mb-row.is-counting .mb-ring{counter-increment:mbc;} .mb-row.is-counting .mb-tag{font-size:0;} .mb-row.is-counting .mb-tag::after{content:counter(mbc);font-size:11px;}'
  + '.mb-stage{position:relative;margin:0 auto;} .mb-anchor{position:absolute;z-index:1;} .mb-spot{position:absolute;z-index:2;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;}'
  + '.mb-stage.is-showing .mb-spot:not(.is-full){box-shadow:inset 0 0 0 3px rgba(185,133,82,.7);background:rgba(255,248,236,.55);} .mb-spot.is-full{background:transparent;} .mb-spot.is-snap{outline:3px dashed ' + RED + ';outline-offset:2px;} .mb-spot.z-under{z-index:0;} .mb-spot.is-still{z-index:2;} .mb-spot.is-still.z-under{z-index:0;} .mb-spot:disabled{cursor:default;}'
  /* the basket */
  + '.mb-basket{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;padding:12px 10px 14px;box-sizing:border-box;border-radius:14px 14px 26px 26px;background:repeating-linear-gradient(90deg,#D8B07A 0 10px,#CDA36C 10px 20px);box-shadow:inset 0 5px 0 #B98552,inset 0 -6px 0 #A9763F;}'
  + '.mb-piece{min-width:108px;min-height:56px;padding:4px 14px;border:0;border-radius:4px 12px 6px 14px;background:#FFFDF6;box-shadow:0 3px 0 #C9B08A,0 0 0 2px #E3D5BC;font-family:' + H + ';font-weight:800;font-size:22px;line-height:1.1;color:' + INK + ';cursor:pointer;clip-path:polygon(0 6%,8% 0,30% 5%,55% 0,80% 6%,100% 0,98% 50%,100% 100%,74% 95%,48% 100%,22% 94%,0 100%,3% 52%);}'
  + '.mb-piece.is-out{opacity:.35;} .mb-piece:disabled{cursor:default;} .mb-wrap.is-narrow .mb-piece{min-width:92px;min-height:52px;font-size:20px;padding:4px 10px;} .mb-wrap.is-tiny .mb-piece{min-width:84px;min-height:48px;font-size:18px;}'
  + '.mb-crayon{display:inline-flex;align-items:center;gap:8px;min-width:96px;min-height:56px;padding:4px 12px 4px 6px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 3px 0 #C9B08A;font-family:' + H + ';font-weight:800;font-size:19px;color:' + INK + ';cursor:pointer;} .mb-crayon i{display:block;width:16px;height:40px;border-radius:5px 5px 2px 2px;clip-path:polygon(50% 0,100% 22%,100% 100%,0 100%,0 22%);} .mb-crayon.is-on{box-shadow:0 0 0 4px #146B5E;}'
  + '.mb-sticker{display:flex;align-items:center;justify-content:center;min-width:72px;min-height:72px;padding:4px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:0 3px 0 #C9B08A;cursor:pointer;} .mb-sticker.is-on{box-shadow:0 0 0 4px #146B5E;transform:translateY(-6px);} .mb-sticker.is-out{opacity:.3;}'
  + '.mb-tool{display:flex;align-items:center;justify-content:center;min-width:96px;min-height:64px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:0 3px 0 #C9B08A;cursor:pointer;} .mb-tool.is-on{box-shadow:0 0 0 4px #146B5E;transform:translateY(-4px);}'
  + '.mb-foot{display:flex;justify-content:center;width:100%;}'
  + '.mb-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .mb-check:disabled{opacity:.5;cursor:default;}'
  + '.mb-note{margin:0;min-height:1.3em;max-width:600px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .mb-note.is-hint{color:#8A3B1F;} .mb-note.is-nudge{color:#5E6770;} .mb-wrap.is-narrow .mb-note{font-size:17px;}'
  + '.mb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.mb-wrap.is-tiny.clue-story .mb-piece{min-width:0;min-height:46px;font-size:16px;padding:3px 9px;}'
  + '.mb-wrap.is-tiny .mb-crayon{flex-direction:column;gap:2px;min-width:80px;min-height:58px;padding:4px 6px;font-size:14px;line-height:1.1;} .mb-wrap.is-tiny .mb-crayon i{width:30px;height:12px;clip-path:polygon(0 0,82% 0,100% 50%,82% 100%,0 100%);border-radius:2px;}'
  + '.mb-wrap.is-tiny .mb-sticker{min-width:60px;min-height:60px;} .mb-wrap.is-tiny .mb-book{display:none;} .mb-wrap.is-narrow button.mb-w{margin:-7px 0;}'
  + '.mb-storybox.is-s .mb-q,.mb-storybox.is-q .mb-tale{display:none;} .mb-basket.is-away{display:none;} .mb-turn{display:flex;align-items:center;justify-content:center;width:52px;height:46px;margin:2px 0 0 auto;border:0;border-radius:12px;background:#E6F2EE;cursor:pointer;} .mb-storybox.is-q .mb-turn{margin:4px auto 0 0;} .mb-wrap.is-tiny{gap:5px;} .mb-wrap.is-tiny .mb-page{padding:8px 9px 8px;} .mb-wrap.is-tiny .mb-text{margin-bottom:4px;} .mb-wrap.is-tiny .mb-pics{gap:8px;}'
  + '.mb-wrap.is-tiny .mb-check{min-width:112px;min-height:50px;padding:6px 14px;font-size:20px;} .mb-wrap.is-tiny .mb-basket{gap:7px;padding:6px 6px 8px;}'
  + '.mb-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'mb-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.MendingBasketActivity = MendingBasketActivity;
