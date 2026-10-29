/* =====================================================================
   landing-pad-activity.js — ACTIVITY #157 of the one-by-one rebuild:
   "Hopper's Number Line" → THE SPRING AND THE LANDING PAD (2.MD.B.6;
   all 11 locales). Model: landing-pad-core.js (LandingPadCore).
   Design: docs/activities-rebuild/designs/157-hoppers-number-line.md
   ---------------------------------------------------------------------
   The invention: the hop is LOADED and the landing is PREDICTED. The
   number line is a row of equally spaced stones across a pond. The child
   puts Hopper on the story's start stone, turns him the way the story
   goes (he hops the way his nose points), loads his spring with fat
   ten-coils and thin one-coils, and floats a lily pad where they think he
   will land. On Check the spring lets go: one arc per coil, every arc from
   a stone to a stone. If the pad is not under his last landing he splashes
   into the pond, and the stones between him and the pad ripple. Equal hops
   (level 3) repeat the spring for the number of hop marks lit: a product
   from 0, or a count of hops back to the bank.
   No timer, no score; numerals only on the stones and in the story.
   Test seams: window.LandingPadActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._frog / ._turn / ._coil / ._undo /
   ._count / ._pad / ._check / ._g / .FAST / .OK_MS.
   ===================================================================== */
var LandingPadActivity = {
  id: 'landing-pad',
  /* the drawn apparatus (the hierarchy gate): the pond, the stones, the spring */
  apparatusClasses: ['lp-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Hopper's Number Line","de":"Hopper am Zahlenstrahl","fr":"Hopper sur la droite graduée","es":"La recta numérica de Hopper","pt":"A Reta Numérica do Saltão","it":"La linea dei numeri di Hopper","nl":"Hopper op de getallenlijn","sv":"Hoppers tallinje","da":"Hoppers tallinje","no":"Hoppers tallinje","fi":"Hopperin lukusuora"},
    instruction: {"en":"Read the story. Drag Hopper onto his start stone and tap him to turn him the way he hops. Load his spring with ten-coils and one-coils, drag the lily pad to where you think he will land, then press Let go!","de":"Lies die Geschichte. Zieh Hopper auf seinen Startstein und tipp ihn an, damit er in die richtige Richtung schaut. Lade seine Feder mit Zehnerringen und Einerringen, zieh das Seerosenblatt dorthin, wo er deiner Meinung nach landet, und drück auf Los!","fr":"Lis l’histoire. Fais glisser Hopper sur sa pierre de départ et touche-le pour le tourner du côté où il saute. Charge son ressort avec des anneaux de dix et des anneaux de un, pose le nénuphar là où tu penses qu’il va arriver, puis appuie sur Saute !","es":"Lee la historia. Arrastra a Hopper a su piedra de salida y tócalo para voltearlo hacia donde brinca. Carga su resorte con anillos de diez y anillos de uno, arrastra el nenúfar adonde crees que va a caer y presiona ¡Suelta!","pt":"Leia a história. Arraste o Saltão até a pedra de saída e toque nele para virá-lo para o lado em que ele pula. Carregue a mola com anéis de dez e anéis de um, arraste a vitória-régia até onde você acha que ele vai parar e aperte Pula!","it":"Leggi la storia. Trascina Hopper sul sasso di partenza e toccalo per girarlo dalla parte in cui salta. Carica la sua molla con anelli da dieci e anelli da uno, trascina la ninfea dove pensi che atterrerà e premi Salta!","nl":"Lees het verhaal. Sleep Hopper naar zijn startsteen en tik op hem om hem de goede kant op te draaien. Laad zijn veer met tienringen en eenringen, sleep het leliblad naar de plek waar hij volgens jou landt en druk op Spring!","sv":"Läs berättelsen. Dra Hopper till hans startsten och tryck på honom för att vända honom åt det håll han hoppar. Ladda hans fjäder med tiotalsringar och entalsringar, dra näckrosbladet dit där du tror att han landar och tryck på Hoppa!","da":"Læs historien. Træk Hopper hen på hans startsten, og tryk på ham for at vende ham den vej, han hopper. Fyld hans fjeder med tierringe og enerringe, træk åkandebladet derhen, hvor du tror, han lander, og tryk på Hop!","no":"Les historien. Dra Hopper til startsteinen hans, og trykk på ham for å snu ham den veien han hopper. Fyll fjæren hans med tierringer og enerringer, dra vannliljebladet dit du tror han lander, og trykk på Hopp!","fi":"Lue tarina. Vedä Hopper lähtökivelleen ja napauta häntä, niin hän kääntyy siihen suuntaan, johon hän hyppää. Lataa hänen jousensa kymppirenkailla ja ykkösrenkailla, vedä lumpeenlehti sinne, mihin luulet hänen laskeutuvan, ja paina Hyppää!"},
    taskLine: {"en":"Put Hopper on his start, load his spring, and float the pad where he'll land.","de":"Setz Hopper auf den Start, lade seine Feder und leg das Seerosenblatt dorthin, wo er landet.","fr":"Place Hopper sur son départ, charge son ressort et pose le nénuphar là où il arrivera.","es":"Pon a Hopper en su salida, carga su resorte y pon el nenúfar donde va a caer.","pt":"Coloque o Saltão na saída, carregue a mola e ponha a vitória-régia onde ele vai parar.","it":"Metti Hopper sulla partenza, carica la molla e porta la ninfea dove atterrerà.","nl":"Zet Hopper op zijn start, laad zijn veer en leg het leliblad waar hij landt.","sv":"Sätt Hopper på starten, ladda fjädern och lägg näckrosbladet där han landar.","da":"Sæt Hopper på starten, fyld fjederen, og læg åkandebladet, hvor han lander.","no":"Sett Hopper på starten, fyll fjæren og legg vannliljebladet der han lander.","fi":"Laita Hopper lähtökivelle, lataa jousi ja vie lumpeenlehti sinne, mihin hän laskeutuu."},
    taskDiv: {"en":"Put Hopper on his start, load his spring, and tap how many hops reach the bank.","de":"Setz Hopper auf den Start, lade seine Feder und tipp an, wie viele Sprünge er bis zum Ufer braucht.","fr":"Place Hopper sur son départ, charge son ressort et touche le nombre de sauts jusqu’à la rive.","es":"Pon a Hopper en su salida, carga su resorte y toca cuántos brincos llegan a la orilla.","pt":"Coloque o Saltão na saída, carregue a mola e toque em quantos pulos chegam à margem.","it":"Metti Hopper sulla partenza, carica la molla e tocca quanti salti servono per arrivare alla riva.","nl":"Zet Hopper op zijn start, laad zijn veer en tik aan hoeveel sprongen hij tot de kant nodig heeft.","sv":"Sätt Hopper på starten, ladda fjädern och tryck på hur många hopp som når stranden.","da":"Sæt Hopper på starten, fyld fjederen, og tryk på, hvor mange hop der når bredden.","no":"Sett Hopper på starten, fyll fjæren og trykk på hvor mange hopp som når bredden.","fi":"Laita Hopper lähtökivelle, lataa jousi ja napauta, montako hyppyä rantaan tarvitaan."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    s_add: {"en":"Hopper sits on {s}. He hops {n} forward. Where does he land?","de":"Hopper sitzt auf der {s}. Er hüpft {n} nach vorne. Wo landet er?","fr":"Hopper est sur le {s}. Il saute {n} en avant. Où arrive-t-il ?","es":"Hopper está en el {s}. Brinca {n} hacia adelante. ¿Dónde cae?","pt":"O Saltão está no {s}. Ele pula {n} para frente. Onde ele vai parar?","it":"Hopper è sul numero {s}. Salta di {n} in avanti. Dove va a finire?","nl":"Hopper zit op {s}. Hij springt {n} vooruit. Waar landt hij?","sv":"Hopper sitter på {s}. Han hoppar {n} framåt. Var landar han?","da":"Hopper sidder på {s}. Han hopper {n} frem. Hvor lander han?","no":"Hopper sitter på {s}. Han hopper {n} framover. Hvor lander han?","fi":"Hopper on luvun {s} kohdalla. Hän hyppää {n} eteenpäin. Mihin hän laskeutuu?"},
    s_sub: {"en":"Hopper sits on {s}. He hops {n} back. Where does he land?","de":"Hopper sitzt auf der {s}. Er hüpft {n} zurück. Wo landet er?","fr":"Hopper est sur le {s}. Il saute {n} en arrière. Où arrive-t-il ?","es":"Hopper está en el {s}. Brinca {n} hacia atrás. ¿Dónde cae?","pt":"O Saltão está no {s}. Ele pula {n} para trás. Onde ele vai parar?","it":"Hopper è sul numero {s}. Salta di {n} indietro. Dove va a finire?","nl":"Hopper zit op {s}. Hij springt {n} achteruit. Waar landt hij?","sv":"Hopper sitter på {s}. Han hoppar {n} bakåt. Var landar han?","da":"Hopper sidder på {s}. Han hopper {n} tilbage. Hvor lander han?","no":"Hopper sitter på {s}. Han hopper {n} bakover. Hvor lander han?","fi":"Hopper on luvun {s} kohdalla. Hän hyppää {n} taaksepäin. Mihin hän laskeutuu?"},
    s_mul: {"en":"Hopper starts at {s}. He makes {k} hops of {n}. Where does he land?","de":"Hopper startet bei {s}. Er macht {k} Sprünge mit je {n}. Wo landet er?","fr":"Hopper part de {s}. Il fait {k} sauts de {n}. Où arrive-t-il ?","es":"Hopper empieza en el {s}. Da {k} brincos de {n}. ¿Dónde cae?","pt":"O Saltão começa no {s}. Ele dá {k} pulos de {n}. Onde ele vai parar?","it":"Hopper parte dal numero {s}. Fa {k} salti da {n}. Dove va a finire?","nl":"Hopper begint bij {s}. Hij maakt {k} sprongen van {n}. Waar landt hij?","sv":"Hopper börjar på {s}. Han gör {k} hopp på {n}. Var landar han?","da":"Hopper starter på {s}. Han laver {k} hop på {n}. Hvor lander han?","no":"Hopper starter på {s}. Han gjør {k} hopp på {n}. Hvor lander han?","fi":"Hopper lähtee luvun {s} kohdalta. Hän tekee {k} hyppyä, joiden pituus on {n}. Mihin hän laskeutuu?"},
    s_div: {"en":"Hopper is on {s}. He hops back {n} at a time. How many hops to the bank?","de":"Hopper sitzt auf der {s}. Er hüpft immer {n} zurück. Wie viele Sprünge braucht er bis zum Ufer?","fr":"Hopper est sur le {s}. Il recule de {n} à chaque saut. Combien de sauts pour arriver à la rive ?","es":"Hopper está en el {s}. Brinca hacia atrás de {n} en {n}. ¿Cuántos brincos hasta la orilla?","pt":"O Saltão está no {s}. Ele pula para trás de {n} em {n}. Quantos pulos até a margem?","it":"Hopper è sul numero {s}. Salta indietro di {n} alla volta. Quanti salti servono per arrivare alla riva?","nl":"Hopper zit op {s}. Hij springt steeds {n} achteruit. Hoeveel sprongen tot de kant?","sv":"Hopper sitter på {s}. Han hoppar {n} bakåt varje gång. Hur många hopp behövs till stranden?","da":"Hopper sidder på {s}. Han hopper {n} tilbage hver gang. Hvor mange hop er der til bredden?","no":"Hopper sitter på {s}. Han hopper {n} bakover hver gang. Hvor mange hopp er det til bredden?","fi":"Hopper on luvun {s} kohdalla. Hän hyppää taaksepäin {n} kerrallaan. Montako hyppyä rantaan tarvitaan?"},
    ok_add: {"en":"{s} + {n} = {e} — Hopper landed on {e}!","de":"{s} + {n} = {e} – Hopper ist auf der {e} gelandet!","fr":"{s} + {n} = {e} : Hopper est arrivé sur le {e} !","es":"{s} + {n} = {e}: ¡Hopper cayó en el {e}!","pt":"{s} + {n} = {e}: o Saltão parou no {e}!","it":"{s} + {n} = {e}: Hopper è atterrato sul numero {e}!","nl":"{s} + {n} = {e}: Hopper is op {e} geland!","sv":"{s} + {n} = {e}: Hopper landade på {e}!","da":"{s} + {n} = {e}: Hopper landede på {e}!","no":"{s} + {n} = {e}: Hopper landet på {e}!","fi":"{s} + {n} = {e}: Hopper laskeutui luvun {e} kohdalle!"},
    ok_sub: {"en":"{s} − {n} = {e} — Hopper landed on {e}!","de":"{s} − {n} = {e} – Hopper ist auf der {e} gelandet!","fr":"{s} − {n} = {e} : Hopper est arrivé sur le {e} !","es":"{s} − {n} = {e}: ¡Hopper cayó en el {e}!","pt":"{s} − {n} = {e}: o Saltão parou no {e}!","it":"{s} − {n} = {e}: Hopper è atterrato sul numero {e}!","nl":"{s} − {n} = {e}: Hopper is op {e} geland!","sv":"{s} − {n} = {e}: Hopper landade på {e}!","da":"{s} − {n} = {e}: Hopper landede på {e}!","no":"{s} − {n} = {e}: Hopper landet på {e}!","fi":"{s} − {n} = {e}: Hopper laskeutui luvun {e} kohdalle!"},
    ok_mul: {"en":"{k} hops of {n}: {sum} = {e}. That's {k} × {n} = {e}!","de":"{k} Sprünge mit je {n}: {sum} = {e}. Also {k} · {n} = {e}!","fr":"{k} sauts de {n} : {sum} = {e}. Donc {k} × {n} = {e} !","es":"{k} brincos de {n}: {sum} = {e}. ¡Eso es {k} × {n} = {e}!","pt":"{k} pulos de {n}: {sum} = {e}. Isso é {k} × {n} = {e}!","it":"{k} salti da {n}: {sum} = {e}. Cioè {k} × {n} = {e}!","nl":"{k} sprongen van {n}: {sum} = {e}. Dat is {k} × {n} = {e}!","sv":"{k} hopp på {n}: {sum} = {e}. Alltså {k} · {n} = {e}!","da":"{k} hop på {n}: {sum} = {e}. Altså {k} · {n} = {e}!","no":"{k} hopp på {n}: {sum} = {e}. Altså {k} · {n} = {e}!","fi":"{k} hyppyä, pituus {n}: {sum} = {e}. Siis {k} · {n} = {e}!"},
    ok_div: {"en":"From {s}, hops of {n} reach 0 in {k} hops!","de":"Von der {s} bis zur 0: {k} Sprünge mit je {n}!","fr":"Du {s} jusqu’au 0 : {k} sauts de {n} !","es":"Del {s} al 0: ¡{k} brincos de {n}!","pt":"Do {s} até o 0: {k} pulos de {n}!","it":"Dal numero {s} fino allo 0: {k} salti da {n}!","nl":"Van {s} naar 0: {k} sprongen van {n}!","sv":"Från {s} till 0: {k} hopp på {n}!","da":"Fra {s} til 0: {k} hop på {n}!","no":"Fra {s} til 0: {k} hopp på {n}!","fi":"Luvusta {s} nollaan: {k} hyppyä, pituus {n}!"},
    hintFrog: {"en":"Put Hopper on the stone he starts on.","de":"Setz Hopper auf den Stein, auf dem er startet.","fr":"Place Hopper sur la pierre d’où il part.","es":"Pon a Hopper en la piedra donde empieza.","pt":"Coloque o Saltão na pedra onde ele começa.","it":"Metti Hopper sul sasso da cui parte.","nl":"Zet Hopper op de steen waar hij begint.","sv":"Sätt Hopper på stenen där han börjar.","da":"Sæt Hopper på den sten, han starter på.","no":"Sett Hopper på steinen han starter på.","fi":"Laita Hopper sille kivelle, jolta hän lähtee."},
    hintLoad: {"en":"Load his spring.","de":"Lade seine Feder.","fr":"Charge son ressort.","es":"Carga su resorte.","pt":"Carregue a mola dele.","it":"Carica la sua molla.","nl":"Laad zijn veer.","sv":"Ladda hans fjäder.","da":"Fyld hans fjeder.","no":"Fyll fjæren hans.","fi":"Lataa hänen jousensa."},
    hintMarks: {"en":"How many hops? Tap the hop marks.","de":"Wie viele Sprünge? Tipp die Sprungbögen an.","fr":"Combien de sauts ? Touche les marques de saut.","es":"¿Cuántos brincos? Toca las marcas de brinco.","pt":"Quantos pulos? Toque nas marcas de pulo.","it":"Quanti salti? Tocca i segni dei salti.","nl":"Hoeveel sprongen? Tik op de sprongboogjes.","sv":"Hur många hopp? Tryck på hoppbågarna.","da":"Hvor mange hop? Tryk på hopbuerne.","no":"Hvor mange hopp? Trykk på hoppbuene.","fi":"Montako hyppyä? Napauta hyppykaaria."},
    hintPad: {"en":"Float the lily pad where he'll land.","de":"Leg das Seerosenblatt dorthin, wo er landet.","fr":"Pose le nénuphar là où il va arriver.","es":"Pon el nenúfar donde va a caer.","pt":"Ponha a vitória-régia onde ele vai parar.","it":"Porta la ninfea dove atterrerà.","nl":"Leg het leliblad waar hij landt.","sv":"Lägg näckrosbladet där han landar.","da":"Læg åkandebladet, hvor han lander.","no":"Legg vannliljebladet der han lander.","fi":"Vie lumpeenlehti sinne, mihin hän laskeutuu."},
    hintStartFind: {"en":"Hopper starts on {s}. Find {s} on the stones.","de":"Hopper startet auf der {s}. Such die {s} auf den Steinen.","fr":"Hopper part du {s}. Trouve le {s} sur les pierres.","es":"Hopper empieza en el {s}. Busca el {s} en las piedras.","pt":"O Saltão começa no {s}. Procure o {s} nas pedras.","it":"Hopper parte dal numero {s}. Trova il numero {s} sui sassi.","nl":"Hopper begint op {s}. Zoek {s} op de stenen.","sv":"Hopper börjar på {s}. Leta upp {s} bland stenarna.","da":"Hopper starter på {s}. Find {s} blandt stenene.","no":"Hopper starter på {s}. Finn {s} blant steinene.","fi":"Hopper lähtee luvun {s} kohdalta. Etsi luku {s} kiviltä."},
    hintStart: {"en":"Hopper starts on {s}. Count the stones from {lab}.","de":"Hopper startet auf der {s}. Zähl die Steine ab der {lab}.","fr":"Hopper part du {s}. Compte les pierres à partir du {lab}.","es":"Hopper empieza en el {s}. Cuenta las piedras desde el {lab}.","pt":"O Saltão começa no {s}. Conte as pedras a partir do {lab}.","it":"Hopper parte dal numero {s}. Conta i sassi a partire dal numero {lab}.","nl":"Hopper begint op {s}. Tel de stenen vanaf {lab}.","sv":"Hopper börjar på {s}. Räkna stenarna från {lab}.","da":"Hopper starter på {s}. Tæl stenene fra {lab}.","no":"Hopper starter på {s}. Tell steinene fra {lab}.","fi":"Hopper lähtee luvun {s} kohdalta. Laske kivet luvusta {lab} alkaen."},
    hintDir: {"en":"Hopper hops the way his nose points. Which way does this story go?","de":"Hopper hüpft immer dorthin, wohin seine Nase zeigt. In welche Richtung geht diese Geschichte?","fr":"Hopper saute du côté où pointe son nez. Dans quel sens va cette histoire ?","es":"Hopper brinca hacia donde apunta su nariz. ¿Hacia dónde va esta historia?","pt":"O Saltão pula para o lado em que o nariz aponta. Para que lado vai esta história?","it":"Hopper salta dalla parte in cui punta il naso. In che direzione va questa storia?","nl":"Hopper springt de kant op waar zijn neus naar wijst. Welke kant gaat dit verhaal op?","sv":"Hopper hoppar åt det håll som nosen pekar. Åt vilket håll går den här berättelsen?","da":"Hopper hopper den vej, hans næse peger. Hvilken vej går denne historie?","no":"Hopper hopper den veien nesen peker. Hvilken vei går denne historien?","fi":"Hopper hyppää sinne, mihin hänen nenänsä osoittaa. Kumpaan suuntaan tämä tarina menee?"},
    hintLoadWrong: {"en":"Count the coils. Does the spring hold {n}?","de":"Zähl die Ringe. Sind es zusammen {n}?","fr":"Compte les anneaux. Le ressort fait-il bien {n} ?","es":"Cuenta los anillos. ¿El resorte tiene {n}?","pt":"Conte os anéis. A mola tem {n}?","it":"Conta gli anelli. La molla fa proprio {n}?","nl":"Tel de ringen. Is de veer samen {n}?","sv":"Räkna ringarna. Blir fjädern {n}?","da":"Tæl ringene. Bliver fjederen {n}?","no":"Tell ringene. Blir fjæren {n}?","fi":"Laske renkaat. Onko jousessa yhteensä {n}?"},
    hintCountWrong: {"en":"How many hops does the story say? Light that many hop marks.","de":"Wie viele Sprünge stehen in der Geschichte? Mach so viele Sprungbögen an.","fr":"Combien de sauts dit l’histoire ? Allume autant de marques.","es":"¿Cuántos brincos dice la historia? Enciende esas marcas.","pt":"Quantos pulos diz a história? Acenda essa quantidade de marcas.","it":"Quanti salti dice la storia? Accendi altrettanti segni.","nl":"Hoeveel sprongen staan er in het verhaal? Zet zoveel boogjes aan.","sv":"Hur många hopp står det i berättelsen? Tänd lika många bågar.","da":"Hvor mange hop står der i historien? Tænd lige så mange buer.","no":"Hvor mange hopp står det i historien? Tenn like mange buer.","fi":"Montako hyppyä tarinassa sanotaan? Sytytä yhtä monta kaarta."},
    hintBank: {"en":"Does Hopper reach the bank exactly? Change the number of hops.","de":"Kommt Hopper genau am Ufer an? Ändere die Zahl der Sprünge.","fr":"Hopper arrive-t-il juste sur la rive ? Change le nombre de sauts.","es":"¿Hopper llega justo a la orilla? Cambia el número de brincos.","pt":"O Saltão chega certinho na margem? Mude o número de pulos.","it":"Hopper arriva proprio alla riva? Cambia il numero dei salti.","nl":"Komt Hopper precies aan de kant? Verander het aantal sprongen.","sv":"Kommer Hopper precis fram till stranden? Ändra antalet hopp.","da":"Kommer Hopper præcis ind til bredden? Skift antallet af hop.","no":"Kommer Hopper akkurat inn til bredden? Endre antall hopp.","fi":"Pääseekö Hopper tarkalleen rantaan? Muuta hyppyjen määrää."},
    hintPadOff: {"en":"Look where Hopper is — and where your pad is.","de":"Schau, wo Hopper ist – und wo dein Seerosenblatt liegt.","fr":"Regarde où est Hopper, et où est ton nénuphar.","es":"Mira dónde está Hopper y dónde está tu nenúfar.","pt":"Veja onde o Saltão está e onde está a sua vitória-régia.","it":"Guarda dov’è Hopper, e dov’è la tua ninfea.","nl":"Kijk waar Hopper is, en waar jouw leliblad ligt.","sv":"Titta var Hopper är, och var ditt näckrosblad ligger.","da":"Se, hvor Hopper er – og hvor dit åkandeblad ligger.","no":"Se hvor Hopper er – og hvor vannliljebladet ditt ligger.","fi":"Katso, missä Hopper on – ja missä lumpeenlehtesi on."},
    hintGhost: {"en":"Follow the dotted hops, one stone at a time.","de":"Folge den gepunkteten Sprüngen, Stein für Stein.","fr":"Suis les sauts en pointillés, pierre après pierre.","es":"Sigue los brincos punteados, piedra por piedra.","pt":"Siga os pulos pontilhados, pedra por pedra.","it":"Segui i salti tratteggiati, un sasso alla volta.","nl":"Volg de gestippelde sprongen, steen voor steen.","sv":"Följ de prickade hoppen, en sten i taget.","da":"Følg de prikkede hop, én sten ad gangen.","no":"Følg de prikkete hoppene, én stein om gangen.","fi":"Seuraa pisteviivahyppyjä, kivi kerrallaan."},
    setLine: {"en":"Line","de":"Zahlenstrahl","fr":"Droite","es":"Recta","pt":"Reta","it":"Linea","nl":"Getallenlijn","sv":"Tallinje","da":"Tallinje","no":"Tallinje","fi":"Lukusuora"},
    l20: {"en":"Within 20","de":"Bis 20","fr":"Jusqu’à 20","es":"Hasta 20","pt":"Até 20","it":"Fino a 20","nl":"Tot 20","sv":"Upp till 20","da":"Op til 20","no":"Opp til 20","fi":"Lukuun 20 asti"},
    l100: {"en":"Within 100","de":"Bis 100","fr":"Jusqu’à 100","es":"Hasta 100","pt":"Até 100","it":"Fino a 100","nl":"Tot 100","sv":"Upp till 100","da":"Op til 100","no":"Opp til 100","fi":"Lukuun 100 asti"},
    lEq: {"en":"Equal hops","de":"Gleich große Sprünge","fr":"Sauts égaux","es":"Brincos iguales","pt":"Pulos iguais","it":"Salti uguali","nl":"Gelijke sprongen","sv":"Lika långa hopp","da":"Lige store hop","no":"Like lange hopp","fi":"Yhtä pitkät hypyt"},
    setLabels: {"en":"Numbers on the stones","de":"Zahlen an den Steinen","fr":"Nombres sur les pierres","es":"Números en las piedras","pt":"Números nas pedras","it":"Numeri sui sassi","nl":"Getallen bij de stenen","sv":"Tal vid stenarna","da":"Tal ved stenene","no":"Tall ved steinene","fi":"Luvut kivissä"},
    lbSome: {"en":"Some","de":"Einige","fr":"Quelques-uns","es":"Algunos","pt":"Alguns","it":"Alcuni","nl":"Een paar","sv":"Några","da":"Nogle","no":"Noen","fi":"Osa"},
    lbEvery: {"en":"Every number","de":"Jede Zahl","fr":"Tous","es":"Todos","pt":"Todos","it":"Tutti","nl":"Alle","sv":"Alla","da":"Alle","no":"Alle","fi":"Kaikki"},
    lbTen: {"en":"Every 10","de":"Nur Zehner","fr":"De 10 en 10","es":"De 10 en 10","pt":"De 10 em 10","it":"Di 10 in 10","nl":"Alleen tientallen","sv":"Bara tiotal","da":"Kun tiere","no":"Bare tiere","fi":"Vain kymmenet"},
    marksLabel: {"en":"How many hops?","de":"Wie viele Sprünge?","fr":"Combien de sauts ?","es":"¿Cuántos brincos?","pt":"Quantos pulos?","it":"Quanti salti?","nl":"Hoeveel sprongen?","sv":"Hur många hopp?","da":"Hvor mange hop?","no":"Hvor mange hopp?","fi":"Montako hyppyä?"},
    tenBtn: {"en":"ten","de":"Zehner","fr":"dix","es":"diez","pt":"dez","it":"dieci","nl":"tien","sv":"tio","da":"ti","no":"ti","fi":"kymppi"},
    oneBtn: {"en":"one","de":"Einer","fr":"un","es":"uno","pt":"um","it":"uno","nl":"één","sv":"en","da":"en","no":"en","fi":"ykkönen"},
    checkBtn: {"en":"Let go!","de":"Los!","fr":"Saute !","es":"¡Suelta!","pt":"Pula!","it":"Salta!","nl":"Spring!","sv":"Hoppa!","da":"Hop!","no":"Hopp!","fi":"Hyppää!"},
    aFrog: {"en":"Hopper on {n}.","de":"Hopper auf der {n}.","fr":"Hopper sur le {n}.","es":"Hopper en el {n}.","pt":"Saltão no {n}.","it":"Hopper sul numero {n}.","nl":"Hopper op {n}.","sv":"Hopper på {n}.","da":"Hopper på {n}.","no":"Hopper på {n}.","fi":"Hopper luvun {n} kohdalla."},
    aFrogDock: {"en":"Hopper, waiting to go on a stone","de":"Hopper wartet darauf, auf einen Stein zu kommen","fr":"Hopper attend d’aller sur une pierre","es":"Hopper espera para ir a una piedra","pt":"Saltão esperando para ir a uma pedra","it":"Hopper aspetta di andare su un sasso","nl":"Hopper wacht om op een steen te gaan","sv":"Hopper väntar på att komma upp på en sten","da":"Hopper venter på at komme op på en sten","no":"Hopper venter på å komme opp på en stein","fi":"Hopper odottaa pääsyä kivelle"},
    aFwd: {"en":"He faces forward.","de":"Er schaut nach vorne.","fr":"Il regarde en avant.","es":"Mira hacia adelante.","pt":"Ele olha para frente.","it":"Guarda in avanti.","nl":"Hij kijkt vooruit.","sv":"Han tittar framåt.","da":"Han kigger frem.","no":"Han ser framover.","fi":"Hän katsoo eteenpäin."},
    aBack: {"en":"He faces back.","de":"Er schaut zurück.","fr":"Il regarde en arrière.","es":"Mira hacia atrás.","pt":"Ele olha para trás.","it":"Guarda indietro.","nl":"Hij kijkt achteruit.","sv":"Han tittar bakåt.","da":"Han kigger tilbage.","no":"Han ser bakover.","fi":"Hän katsoo taaksepäin."},
    aSpring: {"en":"Spring: tens {t}, ones {o}","de":"Feder: Zehner {t}, Einer {o}","fr":"Ressort : dizaines {t}, unités {o}","es":"Resorte: decenas {t}, unidades {o}","pt":"Mola: dezenas {t}, unidades {o}","it":"Molla: decine {t}, unità {o}","nl":"Veer: tientallen {t}, eenheden {o}","sv":"Fjäder: tiotal {t}, ental {o}","da":"Fjeder: tiere {t}, enere {o}","no":"Fjær: tiere {t}, enere {o}","fi":"Jousi: kymppejä {t}, ykkösiä {o}"},
    aTen: {"en":"Add a ten-coil","de":"Einen Zehnerring dazu","fr":"Ajouter un anneau de dix","es":"Agregar un anillo de diez","pt":"Pôr um anel de dez","it":"Aggiungi un anello da dieci","nl":"Een tienring erbij","sv":"Lägg till en tiotalsring","da":"Læg en tierring på","no":"Legg på en tierring","fi":"Lisää kymppirengas"},
    aOne: {"en":"Add a one-coil","de":"Einen Einerring dazu","fr":"Ajouter un anneau de un","es":"Agregar un anillo de uno","pt":"Pôr um anel de um","it":"Aggiungi un anello da uno","nl":"Een eenring erbij","sv":"Lägg till en entalsring","da":"Læg en enerring på","no":"Legg på en enerring","fi":"Lisää ykkösrengas"},
    aOneShut: {"en":"No one-coils on this line: the stones go up in tens","de":"Einerringe gehen hier nicht: die Steine gehen in Zehnerschritten","fr":"Pas d’anneau de un ici : les pierres vont de 10 en 10","es":"Aquí no hay anillos de uno: las piedras van de 10 en 10","pt":"Aqui não há anéis de um: as pedras vão de 10 em 10","it":"Qui niente anelli da uno: i sassi vanno di 10 in 10","nl":"Hier geen eenringen: de stenen gaan per 10","sv":"Inga entalsringar här: stenarna går i tiotal","da":"Ingen enerringe her: stenene går i tiere","no":"Ingen enerringer her: steinene går i tiere","fi":"Ykkösrenkaat eivät käy tässä: kivet etenevät kymmenen kerrallaan"},
    aUndo: {"en":"Take off the last coil","de":"Den letzten Ring wegnehmen","fr":"Enlever le dernier anneau","es":"Quitar el último anillo","pt":"Tirar o último anel","it":"Togli l’ultimo anello","nl":"Haal de laatste ring eraf","sv":"Ta bort den sista ringen","da":"Tag den sidste ring af","no":"Ta av den siste ringen","fi":"Poista viimeinen rengas"},
    aHops: {"en":"Hops: {k}","de":"Sprünge: {k}","fr":"Sauts : {k}","es":"Brincos: {k}","pt":"Pulos: {k}","it":"Salti: {k}","nl":"Sprongen: {k}","sv":"Hopp: {k}","da":"Hop: {k}","no":"Hopp: {k}","fi":"Hyppyjä: {k}"},
    aPadOut: {"en":"Lily pad on a stone","de":"Seerosenblatt auf einem Stein","fr":"Nénuphar sur une pierre","es":"Nenúfar en una piedra","pt":"Vitória-régia numa pedra","it":"Ninfea su un sasso","nl":"Leliblad op een steen","sv":"Näckrosblad på en sten","da":"Åkandeblad på en sten","no":"Vannliljeblad på en stein","fi":"Lumpeenlehti kivellä"},
    aPadDock: {"en":"Lily pad, waiting at the edge","de":"Seerosenblatt am Rand","fr":"Nénuphar qui attend au bord","es":"Nenúfar esperando en el borde","pt":"Vitória-régia esperando na beira","it":"Ninfea in attesa sul bordo","nl":"Leliblad wacht aan de rand","sv":"Näckrosbladet väntar vid kanten","da":"Åkandebladet venter ved kanten","no":"Vannliljebladet venter ved kanten","fi":"Lumpeenlehti odottaa reunalla"}
  },/*STRINGS-END*/
  defaults: { line: '20', labels: 'some' },
  settings: [
    { key: 'line', type: 'choice', labelKey: 'setLine', options: [{ value: '20', labelKey: 'l20' }, { value: '100', labelKey: 'l100' }, { value: 'eq', labelKey: 'lEq' }] },
    { key: 'labels', type: 'choice', labelKey: 'setLabels', options: [{ value: 'some', labelKey: 'lbSome' }, { value: 'every', labelKey: 'lbEvery' }, { value: 'ten', labelKey: 'lbTen' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['pets', 'flowers'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._drag = null; this._skipClick = 0; this._busy = false;
    injectLandingPadCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._busy = false; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return LandingPadCore.levelOf(this._setting('line')); },
  _labels: function () { var v = this._setting('labels'); return v === 'every' || v === 'ten' ? v : 'some'; },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LandingPadCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LandingPadCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'landing-pad.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () {
    if (!this.st || this.st.done) return;
    var line = this._t(this.st.round.kind === 'div' ? 'taskDiv' : 'taskLine'); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = LandingPadCore.newState(this._level(), k);
    this._view = { note: '', soft: false, win: false, anim: null, bump: null, target: null };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'lp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="lp-ticket" data-qa="ticket"></div><div class="lp-pond" data-qa="pond"></div><p class="lp-note" data-qa="note" aria-live="polite"></p><div class="lp-box" data-qa="spring"></div><div class="lp-marks" data-qa="marks"></div><div class="lp-goline"></div>';
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
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  /* the pond geometry: stone v sits at x(v); Hopper above the row, the numerals under it, the dock (Hopper and the pad before they go out) below */
  _geometry: function (W) {
    var st = this.st, r = st.round, C = LandingPadCore, wide = W >= 560, cramp = W < 330;
    var n = (r.hi - r.lo) / r.step + 1, mx = wide ? 26 : 16, sp = (W - 2 * mx) / (n - 1);
    var F = wide ? 96 : 64, A = wide ? 34 : cramp ? 14 : 24, font = wide ? 16 : sp < 14 ? 11 : 13;
    var rx = Math.max(3.5, Math.min(sp * 0.42, wide ? 14 : 12)), ry = Math.max(3, rx * 0.55);
    var every = this._labels(), labs = C.stones(r).filter(function (v) { return C.labelled(r, v, every); });
    var minGap = Infinity; for (var i = 1; i < labs.length; i++) minGap = Math.min(minGap, (labs[i] - labs[i - 1]) / r.step * sp);
    var crowded = minGap < font * 1.45;
    var g = { W: W, wide: wide, cramp: cramp, mx: mx, sp: sp, n: n, F: F, A: A, rx: rx, ry: ry, font: font, crowded: crowded, every: every };
    g.yS = A + F + 4;
    g.yN = g.yS + ry + font + 3;
    g.yD = g.yN + (crowded ? font + 2 : 0) + 8;
    g.H = g.yD + 2;
    g.x = function (v) { return mx + (v - r.lo) / r.step * sp; };
    g.xc = function (v) { return Math.max(6, Math.min(W - 6, g.x(v))); };
    g.on = function (v) { return C.onLine(r, v); };
    return g;
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W);
    this._wrap.className = 'lp-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (st.round.level === 'eq' ? ' is-eq' : '');
    this._paintTicket();
    this._paintPond();
    this._paintBox();
    this._paintMarks();
    this._paintGo();
    var note = this._qs('.lp-note');
    if (v.note) { note.textContent = v.note; note.className = 'lp-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'lp-note'; }
    this._setPrompt();
  },
  /* the story: its numbers are spans, so a wrong start or a wrong hop size can be underlined */
  _paintTicket: function () {
    var st = this.st, r = st.round, el = this._qs('.lp-ticket'), vk = st.verdict && st.verdict.kind, self = this;
    var mark = vk === 'start' ? 's' : vk === 'sink' && st.verdict.why === 'load' ? 'n' : vk === 'sink' && st.verdict.why === 'count' ? 'k' : null;
    var args = { s: r.start, n: r.size, k: r.count }, raw = this._t(LandingPadCore.storyKey(r));
    var html = this._esc(raw).replace(/\{(s|n|k)\}/g, function (m, x) { return '<span class="lp-sn' + (mark === x ? ' is-mark' : '') + '" data-n="' + x + '">' + args[x] + '</span>'; });
    el.innerHTML = '<p class="lp-story" data-qa="story">' + html + '</p>';
    if (st.done) el.insertAdjacentHTML('beforeend', '<span class="lp-stamp" data-stamp="1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
    el.onclick = function () { if (self.api && self.api.speak) try { self.api.speak(el.textContent); } catch (e) {} };
  },
  _arc: function (a, b, cls, extra) {
    var g = this._g, x1 = g.xc(a), x2 = g.xc(b), y = g.yS - g.ry - 1, len = Math.abs(b - a) / this.st.round.step;
    var h = Math.min(g.A + g.F * 0.55, 12 + Math.abs(x2 - x1) * 0.42 + (len > 1 ? 6 : 0));
    return '<path class="lp-arc ' + (cls || '') + '"' + (extra || '') + ' d="M' + x1.toFixed(1) + ' ' + y.toFixed(1) + 'Q' + ((x1 + x2) / 2).toFixed(1) + ' ' + (y - 2 * h).toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y.toFixed(1) + '"/>';
  },
  /* equal hops: one arc per hop of the spring (its coils fire together); the counting levels: one arc per coil */
  _byHop: function (stops, per) { if (this.st.round.level !== 'eq' || !per) return stops; return stops.filter(function (v, j) { return j % per === 0; }); },
  _lily: function (x, y, s, cls, extra) {
    var rx = s, ry = s * 0.45;
    return '<g class="lp-lily ' + (cls || '') + '"' + (extra || '') + '><path class="lp-lilyp" d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x + rx * 0.82).toFixed(1) + ' ' + (y - ry * 0.55).toFixed(1)
      + 'A' + rx.toFixed(1) + ' ' + ry.toFixed(1) + ' 0 1 0 ' + (x + rx * 0.82).toFixed(1) + ' ' + (y + ry * 0.55).toFixed(1) + 'Z"/><path class="lp-lilyv" d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x - rx * 0.6).toFixed(1) + ' ' + (y - ry * 0.35).toFixed(1) + 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x - rx * 0.5).toFixed(1) + ' ' + (y + ry * 0.45).toFixed(1) + '"/></g>';
  },
  _paintPond: function () {
    var st = this.st, r = st.round, v = this._view, g = this._g, C = LandingPadCore, self = this, X = g.x;
    var pond = this._qs('.lp-pond'); pond.innerHTML = ''; pond.style.width = g.W + 'px'; pond.style.height = g.H + 'px';
    var o = '', ov = '', vk = st.verdict && st.verdict.kind, anim = v.anim, stones = C.stones(r);
    var shown = anim ? anim.stops[anim.i] : vk && vk !== 'start' ? st.verdict.final : st.done ? r.answer : st.frogAt;
    /* the water, the bank (level 3) */
    var wTop = Math.round(g.A * 0.5), wBot = g.H - 2;
    o += '<rect class="lp-water" x="0" y="' + wTop + '" width="' + g.W + '" height="' + (wBot - wTop) + '" rx="18"/>';
    o += '<path class="lp-wave" d="M' + (g.W * 0.18).toFixed(0) + ' ' + (wTop + 18) + 'q10 -6 20 0t20 0M' + (g.W * 0.62).toFixed(0) + ' ' + (wTop + 30) + 'q10 -6 20 0t20 0M' + (g.W * 0.4).toFixed(0) + ' ' + (wTop + 12) + 'q8 -5 16 0"/>';
    [[8, 1], [g.W - 8, -1]].forEach(function (q) { var bx = q[0], d = q[1]; o += '<path class="lp-reed" d="M' + bx + ' ' + (wTop + 40) + 'Q' + (bx + d * 4) + ' ' + (wTop + 18) + ' ' + (bx + d * 2) + ' ' + (wTop + 4) + 'M' + (bx + d * 7) + ' ' + (wTop + 44) + 'Q' + (bx + d * 10) + ' ' + (wTop + 26) + ' ' + (bx + d * 13) + ' ' + (wTop + 14) + '"/><rect class="lp-cat" x="' + (bx + d * 2 - 2.5) + '" y="' + (wTop + 2) + '" width="5" height="12" rx="2.5"/>'; });
    if (r.level === 'eq') o += '<path class="lp-bank" data-bank="1" d="M0 ' + (g.yS - g.ry - 18) + 'H' + (X(r.lo) + g.rx + 3).toFixed(1) + 'Q' + (X(r.lo) + g.rx + 10).toFixed(1) + ' ' + g.yS + ' ' + (X(r.lo) + g.rx + 3).toFixed(1) + ' ' + (g.yN + 4) + 'H0Z"/>';
    /* the pad (under its stone) — it never shows a number */
    var padV = st.padAt, divPad = r.kind === 'div';
    if (padV !== null && !divPad) {
      var sink = vk === 'sink', ps = Math.max(12, Math.min(g.sp * 0.95, g.wide ? 24 : 18));
      o += this._lily(X(padV), g.yS + 1, ps, (sink ? 'is-sink' : '') + (st.done ? ' is-home' : ''), ' data-pad="1"');
    }
    /* the stones and their numerals */
    stones.forEach(function (s, i) {
      var tgt = v.target === s;
      o += '<ellipse class="lp-stone' + (tgt ? ' is-target' : '') + (r.level === 'eq' && s === r.lo ? ' is-bankstone' : '') + '" data-stone="' + s + '" cx="' + X(s).toFixed(1) + '" cy="' + g.yS + '" rx="' + (tgt ? g.rx + 2 : g.rx).toFixed(1) + '" ry="' + (tgt ? g.ry + 1.5 : g.ry).toFixed(1) + '"/>';
      if (C.labelled(r, s, g.every)) {
        var low = g.crowded && Math.round((s - r.lo) / r.step) % 2 === 1;
        o += '<text class="lp-num" data-num="' + s + '" x="' + X(s).toFixed(1) + '" y="' + (g.yN + (low ? g.font + 2 : 0)).toFixed(1) + '" text-anchor="middle" font-size="' + g.font + '">' + s + '</text>';
      }
    });
    /* the arcs Hopper has hopped (the graded hop or the animation) */
    if (anim) for (var i = 1; i <= anim.i; i++) ov += this._arc(anim.stops[i - 1], anim.stops[i], Math.abs(anim.stops[i] - anim.stops[i - 1]) >= 10 ? 'is-ten' : '');
    else if (vk && vk !== 'start') { var vs = this._byHop(st.verdict.stops, st.coils.length); for (var j = 1; j < vs.length; j++) ov += this._arc(vs[j - 1], vs[j], Math.abs(vs[j] - vs[j - 1]) >= 10 && r.level !== 'eq' ? 'is-ten' : ''); }
    else if (st.done) { var tp = this._byHop(C.truePath(r), r.size); for (var q = 1; q < tp.length; q++) ov += this._arc(tp[q - 1], tp[q], Math.abs(tp[q] - tp[q - 1]) >= 10 ? 'is-ten is-done' : 'is-done'); }
    /* miss 2: the true hops, dotted, from the true start — the last stone gets no ring and no number */
    if (st.help && vk && vk !== 'start' && !anim) { var gp = this._byHop(C.truePath(r), r.size); for (var u = 1; u < gp.length; u++) ov += this._arc(gp[u - 1], gp[u], 'is-ghost', ' data-ghost="1"'); }
    /* a splash: ripples at Hopper and on every stone between him and the pad */
    if (!anim && (vk === 'splash')) {
      var fx = g.xc(st.verdict.final);
      ov += '<g class="lp-splash" data-splash="1"><ellipse cx="' + fx.toFixed(1) + '" cy="' + (g.yS + 2) + '" rx="' + (g.rx + 9) + '" ry="' + (g.ry + 5) + '"/><ellipse cx="' + fx.toFixed(1) + '" cy="' + (g.yS + 2) + '" rx="' + (g.rx + 17) + '" ry="' + (g.ry + 9) + '"/></g>';
      if (st.padAt !== null && r.kind !== 'div') ov += this._lily(X(st.padAt), g.yS + 1, Math.max(12, Math.min(g.sp * 0.95, g.wide ? 24 : 18)), 'is-above', ' data-padtop="1"');
      var lo = Math.min(st.verdict.final, st.padAt), hi = Math.max(st.verdict.final, st.padAt);
      stones.forEach(function (s) { if (s > lo && s < hi) ov += '<ellipse class="lp-ring" data-ring="' + s + '" cx="' + X(s).toFixed(1) + '" cy="' + g.yS + '" rx="' + (g.rx + 4).toFixed(1) + '" ry="' + (g.ry + 3).toFixed(1) + '"/>'; });
    }
    /* the coral foot-dot: exactly which stone Hopper is on */
    if (shown !== null && g.on(shown) && !(vk === 'splash' && !anim)) ov += '<circle class="lp-foot" data-foot="' + shown + '" cx="' + X(shown).toFixed(1) + '" cy="' + g.yS + '" r="' + Math.max(2.5, g.rx * 0.45).toFixed(1) + '"/>';
    pond.insertAdjacentHTML('beforeend', '<svg class="lp-art lp-svg" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">' + o + '</svg>');
    if (ov) pond.insertAdjacentHTML('beforeend', '<svg class="lp-art lp-svg lp-over" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">' + ov + '</svg>');
    /* the lotus opens beside the pad on success */
    var lotus = this._themes.flowers;
    if (st.done && lotus && typeof LCSPictures !== 'undefined') {
      var ls = g.wide ? 56 : 40, li = LCSPictures.img(lotus, 'lotus', this._loc(), { size: ls }); li.className = 'lp-lotus lp-art'; li.alt = ''; li.setAttribute('data-lotus', '1');
      var lx = X(r.answer) + (r.answer > (r.lo + r.hi) / 2 ? -ls - g.F * 0.35 : g.F * 0.35);
      li.style.cssText = 'left:' + Math.max(0, Math.min(g.W - ls, lx)).toFixed(1) + 'px;top:' + (g.yS - ls + 6) + 'px;width:' + ls + 'px;height:' + ls + 'px;';
      pond.appendChild(li);
    }
    /* Hopper: on his stone, or waiting beside his spring (the spring box paints the waiting pieces) */
    this._dockFrog = null; this._dockPad = null;
    var fr = this._themes.pets, frog = this._btn('lp-frog lp-art' + (st.facing > 0 ? ' is-fwd' : ' is-back') + (vk === 'splash' && !anim ? ' is-splash' : '') + (vk === 'start' ? ' is-wobble' : '') + (shown === null ? ' is-docked' : ''), 'frog',
      shown === null ? this._t('aFrogDock') : this._t('aFrog', { n: shown }) + ' ' + this._t(st.facing > 0 ? 'aFwd' : 'aBack'));
    var FS = g.F;
    var fx2 = shown === null ? 0 : Math.max(0, Math.min(g.W - FS, g.xc(shown) - FS / 2)), fy = g.yS - g.ry - FS + 4;
    frog.style.cssText = (shown === null ? '' : 'left:' + fx2.toFixed(1) + 'px;top:' + fy.toFixed(1) + 'px;') + 'width:' + FS + 'px;height:' + FS + 'px;';
    if (fr && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(fr, 'frog', this._loc(), { size: FS }); im.alt = ''; frog.appendChild(im); }
    frog.disabled = st.done;
    frog.setAttribute('data-at', shown === null ? '' : String(shown)); frog.setAttribute('data-facing', st.facing > 0 ? 'fwd' : 'back');
    frog.addEventListener('pointerdown', function (e) { if (e.button || st.done || self._busy) return; e.preventDefault(); self._dragPiece(e, 'frog'); });
    frog.addEventListener('click', function () { if (self._skipFor === 'frog' && Date.now() - self._skipClick < 400) return; if (st.frogAt === null) self._frog(r.lo); else self._turn(); });
    this._frogEl = frog;
    if (shown === null) this._dockFrog = frog; else pond.appendChild(frog);
    /* the lily pad's handle: on its stone, or on the dock (never in a division round: the bank is the target) */
    if (!divPad) {
      var hs = g.wide ? 56 : 48, onW = st.padAt !== null, hx = onW ? X(st.padAt) - hs / 2 : g.W - g.mx - hs + 4, hy = g.yS - hs / 2 + 8;
      var ph = this._btn('lp-padh' + (onW ? ' is-out' : ' is-docked'), 'pad', this._t(onW ? 'aPadOut' : 'aPadDock'), onW ? '' : '<svg class="lp-art" viewBox="0 0 48 48" aria-hidden="true">' + this._lily(24, 26, 19, '', '') + '<circle class="lp-knob" cx="24" cy="12" r="5"/></svg>');
      ph.style.cssText = (onW ? 'left:' + Math.max(0, Math.min(g.W - hs, hx)).toFixed(1) + 'px;top:' + hy.toFixed(1) + 'px;' : '') + 'width:' + hs + 'px;height:' + hs + 'px;';
      ph.disabled = st.done;
      ph.addEventListener('pointerdown', function (e) { if (e.button || st.done || self._busy) return; e.preventDefault(); self._dragPiece(e, 'pad'); });
      ph.addEventListener('click', function () { if (self._skipFor === 'pad' && Date.now() - self._skipClick < 400) return; if (st.padAt === null) self._pad(Math.round((r.lo + r.hi) / 2 / r.step) * r.step); });
      if (onW) { pond.appendChild(ph); if (shown !== null) pond.appendChild(frog); } else this._dockPad = ph;
    }
  },

  /* ---------- the spring box: the coils, ten, one, undo ---------- */
  _paintBox: function () {
    var st = this.st, r = st.round, self = this, el = this._qs('.lp-box'), C = LandingPadCore, v = this._view; el.innerHTML = '';
    var t = C.tens(st), on = C.ones(st), spent = v.anim ? v.anim.spent : 0;
    var coils = st.coils.slice().sort(function (a, b) { return b - a; }), cw = 0, o = '';
    if (this._dockFrog) el.appendChild(this._dockFrog);
    coils.forEach(function (c, i) { var w = c === 10 ? 15 : 7; o += '<ellipse class="lp-coil ' + (c === 10 ? 'is-ten' : 'is-one') + (i < spent ? ' is-spent' : '') + '" data-coil="' + c + '" cx="' + (12 + cw + w / 2).toFixed(1) + '" cy="27" rx="' + (w / 2).toFixed(1) + '" ry="' + (c === 10 ? 18 : 15) + '"/>'; cw += w + 1; });
    var sw = Math.max(80, 24 + cw);
    var spr = '<svg class="lp-art lp-spring" width="' + sw + '" height="54" viewBox="0 0 ' + sw + ' 54" aria-hidden="true"><rect class="lp-plate" x="2" y="6" width="7" height="42" rx="3"/>'
      + (coils.length ? o : '<path class="lp-empty" d="M12 27H' + (sw - 8) + '"/>') + '</svg>';
    var wrapS = document.createElement('div'); wrapS.className = 'lp-springwrap'; wrapS.setAttribute('role', 'img'); wrapS.setAttribute('aria-label', this._t('aSpring', { t: t, o: on })); wrapS.setAttribute('data-tens', String(t)); wrapS.setAttribute('data-ones', String(on)); wrapS.innerHTML = spr;
    if (v.bump) wrapS.classList.add('is-bump');
    el.appendChild(wrapS);
    var row = document.createElement('div'); row.className = 'lp-coilbtns';
    var bt = this._btn('lp-cbtn is-ten', 'ten', this._t('aTen'), '<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="8" ry="15" class="lp-ic-ten"/></svg><span>' + this._esc(this._t('tenBtn')) + '</span>');
    bt.disabled = st.done || this._busy; bt.addEventListener('click', function () { self._coil(10); }); row.appendChild(bt);
    var bo = this._btn('lp-cbtn is-one' + (r.step === 10 ? ' is-shut' : ''), 'one', this._t(r.step === 10 ? 'aOneShut' : 'aOne'), '<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="3.5" ry="13" class="lp-ic-one"/>' + (r.step === 10 ? '<path d="M8 8L32 32" class="lp-ic-shut"/>' : '') + '</svg><span>' + this._esc(this._t('oneBtn')) + '</span>');
    bo.disabled = st.done || this._busy || r.step === 10; bo.addEventListener('click', function () { self._coil(1); }); row.appendChild(bo);
    var bu = this._btn('lp-cbtn is-undo', 'undo', this._t('aUndo'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7L4 12l5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 12H14a6 6 0 0 1 0 12h-2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" transform="translate(0 -5)"/></svg>');
    bu.disabled = st.done || this._busy || !st.coils.length; bu.addEventListener('click', function () { self._undo(); }); row.appendChild(bu);
    el.appendChild(row);
    if (this._dockPad) el.appendChild(this._dockPad);
  },
  /* ---------- level 3: the hop marks (how many times the spring fires) ---------- */
  _paintMarks: function () {
    var st = this.st, r = st.round, self = this, el = this._qs('.lp-marks'); el.innerHTML = '';
    if (r.level !== 'eq') { el.style.display = 'none'; return; }
    el.style.display = '';
    var lab = document.createElement('span'); lab.className = 'lp-mlab'; lab.textContent = this._t('marksLabel'); el.appendChild(lab);
    var row = document.createElement('div'); row.className = 'lp-mrow'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', this._t('marksLabel'));
    for (var i = 1; i <= 9; i++) (function (i) {
      var lit = st.countSet && i <= st.count;
      var b = self._btn('lp-mark' + (lit ? ' is-lit' : ''), 'mark-' + i, self._t('aHops', { k: i }), '<svg viewBox="0 0 32 24" aria-hidden="true"><path d="M4 20Q16 -2 28 20" fill="none" stroke-width="3.2" stroke-linecap="round"/></svg>');
      b.setAttribute('aria-pressed', lit && i === st.count ? 'true' : 'false');
      b.disabled = st.done || self._busy; b.addEventListener('click', function () { self._count(i); }); row.appendChild(b);
    })(i);
    el.appendChild(row);
  },
  _paintGo: function () {
    var st = this.st, self = this, el = this._qs('.lp-goline'); el.innerHTML = '';
    var c = this._btn('lp-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done || this._busy; c.addEventListener('click', function () { self._check(); });
    /* the narrowest phones on equal hops: Let go joins the second row of hop marks, so it stays above the fold */
    var mrow = this._g.cramp && st.round.level === 'eq' ? this._qs('.lp-mrow') : null;
    if (mrow) { c.classList.add('is-inrow'); mrow.appendChild(c); } else el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _after: function () { this._view.note = ''; this._view.bump = null; this._paint(); },
  _frog: function (v) { if (this._busy || !LandingPadCore.placeFrog(this.st, v)) return false; this.api.sound(520); this._after(); return true; },
  _turn: function () { if (this._busy || !LandingPadCore.turn(this.st)) return false; this.api.sound(360); this._after(); this.api.announce(this._t(this.st.facing > 0 ? 'aFwd' : 'aBack')); return true; },
  _coil: function (c) {
    if (this._busy) return false;
    if (!LandingPadCore.addCoil(this.st, c)) { this._view.bump = c; this.api.sound(160); this._paint(); return false; }
    this.api.sound(c === 10 ? 200 : 420); this._after(); return true;
  },
  _undo: function () { if (this._busy || !LandingPadCore.undoCoil(this.st)) return false; this.api.sound(300); this._after(); return true; },
  _count: function (n) { if (this._busy || !LandingPadCore.setCount(this.st, n)) return false; this.api.sound(380); this._after(); return true; },
  _pad: function (v) { if (this._busy || !LandingPadCore.placePad(this.st, v)) return false; this.api.sound(260); this._after(); return true; },
  /* drag Hopper or the pad: it follows the pointer, the stone it will snap to grows; a tap without a move is a tap */
  _dragPiece: function (e, what) {
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, el = e.currentTarget, g = this._g, r = this.st.round;
    this._endDrag();
    var stoneAt = function (ev) { var b = self._qs('.lp-pond').getBoundingClientRect(), x = ev.clientX - b.left; return Math.max(r.lo, Math.min(r.hi, r.lo + Math.round((x - g.mx) / g.sp) * r.step)); };
    var mv = function (ev) {
      var dx = ev.clientX - sx, dy = ev.clientY - sy; if (!moved && Math.abs(dx) + Math.abs(dy) < 8) return; moved = true; ev.preventDefault();
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; el.classList.add('is-drag');
      var s = stoneAt(ev); if (self._view.target !== s) { self._view.target = s; var svg = self._qs('.lp-svg'); if (svg) { var old = svg.querySelector('.is-target'); if (old) { old.classList.remove('is-target'); old.setAttribute('rx', g.rx.toFixed(1)); old.setAttribute('ry', g.ry.toFixed(1)); } var nw = svg.querySelector('[data-stone="' + s + '"]'); if (nw) { nw.classList.add('is-target'); nw.setAttribute('rx', (g.rx + 2).toFixed(1)); nw.setAttribute('ry', (g.ry + 1.5).toFixed(1)); } } }
    };
    var up = function (ev) {
      self._endDrag(); self._skipClick = Date.now(); self._skipFor = what; self._view.target = null;
      if (!moved) { if (what === 'frog') { if (self.st.frogAt === null) self._frog(r.lo); else self._turn(); } else if (self.st.padAt === null) self._pad(Math.round((r.lo + r.hi) / 2 / r.step) * r.step); return; }
      var b = self._qs('.lp-pond').getBoundingClientRect(), y = ev.clientY - b.top, s = stoneAt(ev);
      if (y > g.H + 6) { if (what === 'pad') { if (!self._pad(null)) self._paint(); } else self._paint(); return; }
      if (!(what === 'frog' ? self._frog(s) : self._pad(s))) self._paint();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _keyboard: function (e) {
    var k = e.key, dk = (e.target.getAttribute && e.target.getAttribute('data-k')) || '', st = this.st, r = st.round, step = r.step;
    if (dk === 'frog' && (k === 'ArrowLeft' || k === 'ArrowRight')) { e.preventDefault(); this._frog(st.frogAt === null ? r.lo : st.frogAt + (k === 'ArrowRight' ? step : -step)); }
    else if (dk === 'frog' && k === ' ') { e.preventDefault(); if (st.frogAt === null) this._frog(r.lo); else this._turn(); }
    else if (dk === 'pad' && (k === 'ArrowLeft' || k === 'ArrowRight')) { e.preventDefault(); this._pad(st.padAt === null ? r.lo : st.padAt + (k === 'ArrowRight' ? step : -step)); }
    else if (k === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = LandingPadCore, self = this; if (st.done || this._busy) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'miss' && res.kind === 'start') { this._missNote(); return; }
    /* the spring lets go: one arc per coil, the coils spent one by one */
    var per = st.coils.length, eq = st.round.level === 'eq', stops = this._byHop(res.result === 'ok' ? C.truePath(st.round) : st.verdict.stops, per);
    var finish = function () { v.anim = null; self._busy = false; if (res.result === 'ok') self._success(); else self._missNote(); };
    if (this.FAST || stops.length < 2) { finish(); return; }
    this._busy = true; v.anim = { stops: stops, i: 0, spent: 0 }; v.note = ''; this._paint();
    var stepMs = eq ? 380 : 260;
    var tick = function () {
      if (!v.anim) return;
      v.anim.i++; v.anim.spent = eq ? per : ((v.anim.i - 1) % per) + 1;
      self.api.sound(Math.abs(stops[v.anim.i] - stops[v.anim.i - 1]) >= 10 ? 300 : 560);
      self._paint();
      if (self._frogEl) self._frogEl.classList.add('is-hop');
      if (v.anim.i >= stops.length - 1) self._later(finish, stepMs + 120); else self._later(tick, Math.abs(stops[v.anim.i + 1] - stops[v.anim.i]) >= 10 ? stepMs + 120 : stepMs);
    };
    this._later(tick, 120);
  },
  _missNote: function () {
    var st = this.st, v = this._view, C = LandingPadCore, r = st.round, every = this._labels();
    var key = C.hint(st, every), args = { s: r.start, n: r.size, k: r.count, lab: C.nearestLabel(r, every) };
    v.soft = false; v.note = this._t(key, args);
    this._paint();
    this.api.announce(v.note);
    this.api.sound(st.verdict && st.verdict.kind === 'splash' ? 150 : 240);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = LandingPadCore;
    var msg = this._t(C.okKey(r), C.okArgs(r));
    v.note = ''; v.win = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectLandingPadCSS() {
  if (typeof document === 'undefined' || document.getElementById('lp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .lp-wrap:focus{outline:none;}'
  + '.lp-ticket{position:relative;width:100%;box-sizing:border-box;padding:10px 46px 10px 14px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #E6D9BF;cursor:pointer;}'
  + '.lp-story{margin:0;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.35;color:' + INK + ';} .lp-wrap.is-narrow .lp-story{font-size:15px;line-height:1.3;}'
  + '.lp-sn{font-family:' + H + ';font-weight:800;font-size:1.12em;color:#146B5E;} .lp-sn.is-mark{text-decoration:underline;text-decoration-color:#E0603A;text-decoration-thickness:3px;text-underline-offset:3px;color:#9A3412;}'
  + '.lp-stamp{position:absolute;right:8px;top:50%;margin-top:-17px;width:34px;height:34px;border-radius:50%;background:#2E9C88;color:#fff;display:flex;align-items:center;justify-content:center;transform:rotate(-12deg);} .lp-stamp svg{width:22px;height:22px;}'
  + '.lp-pond{position:relative;flex:none;touch-action:none;}'
  + '.lp-svg{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;} .lp-over{z-index:3;}'
  + '.lp-water{fill:#CFEAF0;stroke:#8CC3CF;stroke-width:2;} .lp-shore{fill:#E4EFD2;} .lp-reed{fill:none;stroke:#5E8F4E;stroke-width:2.4;stroke-linecap:round;} .lp-cat{fill:#8A5A33;} .lp-wave{fill:none;stroke:#9ED0DA;stroke-width:2;stroke-linecap:round;} .lp-bank{fill:#EAD7A6;stroke:#B99A55;stroke-width:2;}'
  + '.lp-stone{fill:#9AA3A8;stroke:' + INK + ';stroke-width:1.6;} .lp-stone.is-bankstone{fill:#C9B37A;} .lp-stone.is-target{fill:#7FD3C4;stroke:#146B5E;stroke-width:2.4;}'
  + '.lp-num{font-family:' + H + ';font-weight:800;fill:' + INK + ';}'
  + '.lp-lilyp{fill:#5DB86A;stroke:#2F6B3A;stroke-width:2;} .lp-lilyv{fill:none;stroke:#2F6B3A;stroke-width:1.4;stroke-linecap:round;} .lp-knob{fill:#3E8F4C;stroke:#2F6B3A;stroke-width:2;}'
  + '.lp-lily.is-sink{opacity:.45;transform:translateY(4px);} .lp-wrap:not(.is-fast) .lp-lily.is-sink{transition:opacity .8s,transform .8s;}'
  + '.lp-arc{fill:none;stroke:#E0603A;stroke-width:2.6;stroke-linecap:round;} .lp-arc.is-ten{stroke-width:3.6;stroke:#146B5E;} .lp-arc.is-ghost{stroke:#146B5E;stroke-width:2.4;stroke-dasharray:4 5;opacity:.85;} .lp-arc.is-done{opacity:.7;}'
  + '.lp-splash ellipse{fill:none;stroke:#2E86A8;stroke-width:2.4;} .lp-ring{fill:none;stroke:#2E86A8;stroke-width:2;opacity:.8;} .lp-wrap:not(.is-fast) .lp-splash ellipse{animation:lpRip 1s ease-out both;}'
  + '.lp-foot{fill:#E0603A;stroke:#fff;stroke-width:1.2;}'
  + '.lp-frog{position:absolute;padding:0;margin:0;border:0;background:none;cursor:grab;touch-action:none;z-index:4;display:block;} .lp-frog img{width:100%;height:100%;display:block;pointer-events:none;} .lp-frog.is-fwd img{transform:scaleX(-1);}'
  + '.lp-frog.is-splash{clip-path:inset(0 0 40% 0);transform:translateY(32%);z-index:2;opacity:.9;} .lp-frog.is-docked,.lp-padh.is-docked{position:relative;flex:none;z-index:auto;} .lp-frog.is-drag{z-index:6;cursor:grabbing;} .lp-frog:focus-visible{outline:3px solid #146B5E;outline-offset:2px;border-radius:10px;} .lp-frog:disabled{cursor:default;}'
  + '.lp-wrap:not(.is-fast) .lp-frog.is-hop{animation:lpHop .26s ease-out;} .lp-wrap:not(.is-fast) .lp-frog.is-wobble{animation:lpShake .4s ease-in-out 2;}'
  + '.lp-padh{position:absolute;padding:0;margin:0;border:0;background:none;cursor:grab;touch-action:none;z-index:5;display:block;border-radius:12px;} .lp-padh svg{width:100%;height:100%;display:block;} .lp-padh.is-drag{z-index:7;cursor:grabbing;} .lp-padh:focus-visible{outline:3px solid #146B5E;outline-offset:1px;} .lp-padh:disabled{cursor:default;}'
  + '.lp-lotus{position:absolute;z-index:4;pointer-events:none;} .lp-wrap:not(.is-fast) .lp-lotus{animation:lpGrow .4s ease-out both;}'
  + '.lp-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .lp-wrap.is-narrow .lp-note{font-size:16px;line-height:1.25;} .lp-note.is-hint{color:#9A3412;}'
  + '.lp-box{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;width:100%;padding:8px 10px;box-sizing:border-box;border-radius:14px;background:#F4EEDF;box-shadow:inset 0 0 0 2px #D9CBA9;}'
  + '.lp-springwrap{display:flex;align-items:center;min-width:80px;} .lp-springwrap.is-bump{animation:lpShake .35s ease-in-out 1;}'
  + '.lp-plate{fill:#8C7A57;} .lp-empty{stroke:#B9A98A;stroke-width:2.4;stroke-dasharray:4 4;} .lp-coil{fill:none;} .lp-coil.is-ten{stroke:#146B5E;stroke-width:5;} .lp-coil.is-one{stroke:#E0603A;stroke-width:2.6;} .lp-coil.is-spent{opacity:.22;}'
  + '.lp-coilbtns{display:flex;gap:8px;}'
  + '.lp-cbtn{min-width:72px;height:56px;padding:0 10px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:17px;color:' + INK + ';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;} .lp-cbtn svg{width:30px;height:30px;flex:none;} .lp-cbtn.is-undo{min-width:52px;width:52px;} .lp-cbtn.is-undo svg{width:24px;height:24px;} .lp-cbtn:disabled{opacity:.45;cursor:default;}'
  + '.lp-ic-ten{fill:none;stroke:#146B5E;stroke-width:5;} .lp-ic-one{fill:none;stroke:#E0603A;stroke-width:2.6;} .lp-ic-shut{stroke:#7A6F60;stroke-width:3;stroke-linecap:round;}'
  + '.lp-marks{display:flex;flex-direction:column;align-items:center;gap:4px;width:100%;} .lp-mlab{font-family:' + B + ';font-weight:800;font-size:15px;color:' + INK + ';} .lp-mrow{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;}'
  + '.lp-mark{width:44px;height:44px;padding:4px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:0 0 0 2px #CDBFA4 inset;cursor:pointer;} .lp-mark svg{width:100%;height:100%;stroke:#B9A98A;} .lp-mark.is-lit{background:#DDF3E9;box-shadow:0 0 0 2px #2E9C88 inset;} .lp-mark.is-lit svg{stroke:#146B5E;} .lp-mark:disabled{cursor:default;opacity:.7;}'
  + '.lp-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .lp-go svg{width:22px;height:22px;} .lp-go:disabled{opacity:.45;cursor:default;}'
  + '.lp-wrap.is-narrow .lp-cbtn{min-width:64px;height:52px;font-size:15px;} .lp-wrap.is-narrow .lp-go{height:48px;} .lp-wrap.is-narrow .lp-box{gap:6px;padding:6px;}'
  + '.lp-wrap.is-cramp .lp-cbtn span{display:none;} .lp-wrap.is-cramp .lp-cbtn{min-width:52px;width:56px;} .lp-wrap.is-cramp{gap:4px;} .lp-wrap.is-cramp .lp-note:empty{display:none;} .lp-wrap.is-cramp .lp-mlab{display:none;} .lp-wrap.is-cramp .lp-story{font-size:14px;line-height:1.25;} .lp-wrap.is-cramp .lp-box{padding:4px;} .lp-wrap.is-cramp .lp-mrow{gap:3px;} .lp-wrap.is-cramp .lp-go{height:46px;} .lp-go.is-inrow{height:44px;padding:0 14px;margin-left:4px;} .lp-wrap.is-cramp .lp-ticket{padding:6px 40px 6px 10px;}'
  + '.lp-wrap.is-done .lp-box,.lp-wrap.is-done .lp-marks,.lp-wrap.is-done .lp-goline{display:none !important;} .lp-wrap.is-done .lp-note:empty{display:none;}'
  + '@keyframes lpShake{0%,100%{transform:translateX(0);}30%{transform:translateX(-6px);}70%{transform:translateX(4px);}}'
  + '@keyframes lpHop{0%{margin-top:0;}45%{margin-top:-18px;}100%{margin-top:0;}} @keyframes lpRip{from{opacity:1;transform:scale(.5);transform-origin:center;}to{opacity:.6;transform:scale(1);}} @keyframes lpGrow{from{opacity:0;transform:scale(.3);}to{opacity:1;transform:scale(1);}}'
  + '.lp-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'lp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.LandingPadActivity = LandingPadActivity;
