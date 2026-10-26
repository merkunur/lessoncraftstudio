/* =====================================================================
   bea-two-bookshelves-activity.js — ACTIVITY #118 of the one-by-one
   rebuild: "Bea's Two Bookshelves" → THE SHAKER SHELF AND THE RIBBON
   SHELF (RL.1.5; all 11 locales). Model: bea-two-bookshelves-core.js
   (BeaShelvesCore).
   Design: docs/activities-rebuild/designs/118-bea-two-bookshelves.md
   ---------------------------------------------------------------------
   Bea the bookworm, her ask ("Find the STORY book!"), a desk of books
   with library pictures on their covers, and two shelves. Tap a book: it
   opens to its three pages, and the knob on its spine shakes the pages
   into a new order. Tap a shelf: the open book goes onto it. Check: the
   ribbon shelf threads its ribbon through the pages from the beginning
   to the end — only a story can be tied with a bow; the shaker shelf
   shakes the pages up — only a fact book still makes sense, and a story
   comes out ending first, slumps and hops back to the desk. From miss 2
   the right book opens by itself with its tell-tale words underlined.
   No timer, no score. Test seams: window.BeaTwoBookshelvesActivity.st /
   ._pool / ._order / ._ensurePool / ._start / ._dims / ._render2 / .FAST
   / .OK_MS.
   ===================================================================== */
var BeaTwoBookshelvesActivity = {
  id: 'bea-two-bookshelves',
  /* the drawn apparatus (the hierarchy gate): Bea's two shelves */
  apparatusClasses: ['bs-shelfart'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Bea's Two Bookshelves",de:"Beas zwei Bücherregale",fr:"Les deux étagères de Bea",es:"Los dos libreros de Bea",pt:"As duas estantes da Bea",it:"I due scaffali di Bea",nl:"De twee boekenplanken van Bea",sv:"Beas två bokhyllor",da:"Beas to bogreoler",no:"Beas to bokhyller",fi:"Bean kaksi kirjahyllyä"},
    instruction: {en:"Read the books. Find the one Bea asks for, and put it on its shelf.",de:"Lies die Bücher. Finde das Buch, das Bea sucht, und stell es in sein Regal.",fr:"Lis les livres. Trouve celui que Bea demande et range-le sur son étagère.",es:"Lee los libros. Encuentra el que pide Bea y ponlo en su librero.",pt:"Leia os livros. Encontre o que a Bea pediu e coloque na estante certa.",it:"Leggi i libri. Trova quello che chiede Bea e mettilo sul suo scaffale.",nl:"Lees de boeken. Zoek het boek dat Bea vraagt en zet het op zijn plank.",sv:"Läs böckerna. Hitta den bok som Bea vill ha och ställ den i rätt hylla.",da:"Læs bøgerne. Find den bog, Bea beder om, og stil den på sin hylde.",no:"Les bøkene. Finn boka Bea spør etter, og sett den i riktig hylle.",fi:"Lue kirjat. Etsi se kirja, jota Bea pyytää, ja laita se oikeaan hyllyyn."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tAsk: {en:"Read the books. Find the one Bea asks for, and put it on its shelf.",de:"Lies die Bücher. Finde das Buch, das Bea sucht, und stell es in sein Regal.",fr:"Lis les livres. Trouve celui que Bea demande et range-le sur son étagère.",es:"Lee los libros. Encuentra el que pide Bea y ponlo en su librero.",pt:"Leia os livros. Encontre o que a Bea pediu e coloque na estante certa.",it:"Leggi i libri. Trova quello che chiede Bea e mettilo sul suo scaffale.",nl:"Lees de boeken. Zoek het boek dat Bea vraagt en zet het op zijn plank.",sv:"Läs böckerna. Hitta den bok som Bea vill ha och ställ den i rätt hylla.",da:"Læs bøgerne. Find den bog, Bea beder om, og stil den på sin hylde.",no:"Les bøkene. Finn boka Bea spør etter, og sett den i riktig hylle.",fi:"Lue kirjat. Etsi se kirja, jota Bea pyytää, ja laita se oikeaan hyllyyn."},
    tFill: {en:"Read the books. Put every book on its shelf.",de:"Lies die Bücher. Stell jedes Buch in sein Regal.",fr:"Lis les livres. Range chaque livre sur son étagère.",es:"Lee los libros. Pon cada libro en su librero.",pt:"Leia os livros. Coloque cada livro na estante certa.",it:"Leggi i libri. Metti ogni libro sul suo scaffale.",nl:"Lees de boeken. Zet elk boek op zijn plank.",sv:"Läs böckerna. Ställ varje bok i rätt hylla.",da:"Læs bøgerne. Stil hver bog på sin hylde.",no:"Les bøkene. Sett hver bok i riktig hylle.",fi:"Lue kirjat. Laita jokainen kirja oikeaan hyllyyn."},
    askStory: {en:"Find the STORY book!",de:"Finde die GESCHICHTE!",fr:"Trouve l’HISTOIRE !",es:"¡Busca el CUENTO!",pt:"Encontre a HISTÓRIA!",it:"Trova la STORIA!",nl:"Zoek het VERHAAL!",sv:"Hitta BERÄTTELSEN!",da:"Find HISTORIEN!",no:"Finn FORTELLINGEN!",fi:"Etsi TARINA!"},
    askFact: {en:"Find the FACT book!",de:"Finde das SACHBUCH!",fr:"Trouve le DOCUMENTAIRE !",es:"¡Busca el LIBRO INFORMATIVO!",pt:"Encontre o LIVRO INFORMATIVO!",it:"Trova il LIBRO DI INFORMAZIONI!",nl:"Zoek het INFORMATIEBOEK!",sv:"Hitta FAKTABOKEN!",da:"Find FAKTABOGEN!",no:"Finn FAKTABOKA!",fi:"Etsi TIETOKIRJA!"},
    askFill: {en:"Stories go on the story shelf, with the ribbon. Fact books go on the fact shelf, the one that shakes.",de:"Geschichten kommen ins Geschichtenregal mit der Schleife. Sachbücher kommen ins Sachbuchregal, das rüttelt.",fr:"Les histoires vont sur leur étagère, celle au ruban. Les documentaires, sur celle qui secoue.",es:"Los cuentos van en el librero de los cuentos, el del listón. Los libros informativos van en su librero, el que sacude.",pt:"As histórias vão na estante das histórias, a da fita. Os livros informativos vão na estante deles, a que sacode.",it:"Le storie vanno sullo scaffale delle storie, quello col nastro. I libri di informazioni vanno sul loro scaffale, quello che scuote.",nl:"Verhalen op de verhalenplank, met het lint. Informatieboeken op de informatieplank, die schudt.",sv:"Berättelser ska stå i berättelsehyllan, med bandet. Faktaböcker ska stå i faktahyllan, som skakar.",da:"Historier skal stå på historiehylden, med båndet. Faktabøger skal stå på faktahylden, der ryster.",no:"Fortellinger skal stå i fortellingshylla, med båndet. Faktabøker skal stå i faktahylla, som rister.",fi:"Tarinat kuuluvat tarinahyllyyn, jossa on nauha. Tietokirjat kuuluvat tietokirjahyllyyn, joka ravistelee."},
    nudge: {en:"Tap a book to open it. Then tap a shelf to put it there.",de:"Tippe ein Buch an, um es zu öffnen. Dann tippe auf ein Regal, um es hineinzustellen.",fr:"Touche un livre pour l’ouvrir. Puis touche une étagère pour l’y ranger.",es:"Toca un libro para abrirlo. Luego toca un librero para ponerlo ahí.",pt:"Toque em um livro para abrir. Depois toque em uma estante para colocá-lo lá.",it:"Tocca un libro per aprirlo. Poi tocca uno scaffale per metterlo lì.",nl:"Tik op een boek om het open te slaan. Tik dan op een plank om het daar neer te zetten.",sv:"Tryck på en bok för att öppna den. Tryck sedan på en hylla för att ställa den där.",da:"Tryk på en bog for at åbne den. Tryk så på en hylde for at stille den der.",no:"Trykk på en bok for å åpne den. Trykk så på en hylle for å sette den der.",fi:"Napauta kirjaa, niin se aukeaa. Napauta sitten hyllyä, niin kirja menee sinne."},
    hintEmptyStory: {en:"Put a book on Bea's story shelf.",de:"Stell ein Buch in Beas Geschichtenregal.",fr:"Range un livre sur l’étagère des histoires.",es:"Pon un libro en el librero de los cuentos.",pt:"Coloque um livro na estante das histórias.",it:"Metti un libro sullo scaffale delle storie.",nl:"Zet een boek op Bea's verhalenplank.",sv:"Ställ en bok i Beas berättelsehylla.",da:"Stil en bog på Beas historiehylde.",no:"Sett en bok i Beas fortellingshylle.",fi:"Laita kirja Bean tarinahyllyyn."},
    hintEmptyFact: {en:"Put a book on Bea's fact shelf.",de:"Stell ein Buch in Beas Sachbuchregal.",fr:"Range un livre sur l’étagère des documentaires.",es:"Pon un libro en el librero de los libros informativos.",pt:"Coloque um livro na estante dos livros informativos.",it:"Metti un libro sullo scaffale dei libri di informazioni.",nl:"Zet een boek op Bea's informatieplank.",sv:"Ställ en bok i Beas faktahylla.",da:"Stil en bog på Beas faktahylde.",no:"Sett en bok i Beas faktahylle.",fi:"Laita kirja Bean tietokirjahyllyyn."},
    hintEmptyFill: {en:"Put every book on a shelf first.",de:"Stell zuerst jedes Buch in ein Regal.",fr:"Range d’abord chaque livre sur une étagère.",es:"Primero pon cada libro en un librero.",pt:"Primeiro coloque cada livro em uma estante.",it:"Prima metti ogni libro su uno scaffale.",nl:"Zet eerst elk boek op een plank.",sv:"Ställ först varje bok i en hylla.",da:"Stil først hver bog på en hylde.",no:"Sett først hver bok i en hylle.",fi:"Laita ensin jokainen kirja hyllyyn."},
    hintPick: {en:"Tap a book first, then tap a shelf.",de:"Tippe zuerst ein Buch an, dann ein Regal.",fr:"Touche d’abord un livre, puis une étagère.",es:"Primero toca un libro y luego un librero.",pt:"Primeiro toque em um livro, depois em uma estante.",it:"Prima tocca un libro, poi uno scaffale.",nl:"Tik eerst op een boek en dan op een plank.",sv:"Tryck först på en bok och sedan på en hylla.",da:"Tryk først på en bog og så på en hylde.",no:"Trykk først på en bok og så på en hylle.",fi:"Napauta ensin kirjaa ja sitten hyllyä."},
    hintStoryOnShaker: {en:"Shaken up, this book doesn't make sense any more. A book that has to go in order is a story.",de:"Durchgeschüttelt ergibt dieses Buch keinen Sinn mehr. Ein Buch, das in der richtigen Reihenfolge sein muss, ist eine Geschichte.",fr:"Une fois secoué, ce livre ne veut plus rien dire. Un livre qui doit rester dans l’ordre, c’est une histoire.",es:"Revuelto, este libro ya no tiene sentido. Un libro que tiene que ir en orden es un cuento.",pt:"Sacudido, este livro não faz mais sentido. Um livro que precisa ficar em ordem é uma história.",it:"Scosso così, questo libro non ha più senso. Un libro che deve stare in ordine è una storia.",nl:"Door elkaar geschud klopt dit boek niet meer. Een boek dat op volgorde moet blijven, is een verhaal.",sv:"Omskakad blir den här boken obegriplig. En bok som måste vara i rätt ordning är en berättelse.",da:"Når siderne er rystet rundt, giver bogen ingen mening. En bog, der skal være i den rigtige rækkefølge, er en historie.",no:"Ristet om hverandre gir denne boka ingen mening. En bok som må være i riktig rekkefølge, er en fortelling.",fi:"Ravisteltuna tästä kirjasta ei saa enää selvää. Kirja, jonka pitää olla oikeassa järjestyksessä, on tarina."},
    hintFactOnRibbon: {en:"These pages each tell their own fact. There is no beginning and no end to tie.",de:"Jede Seite erzählt ihre eigene Sache. Es gibt keinen Anfang und kein Ende zum Zubinden.",fr:"Chaque page donne sa propre info. Il n’y a ni début ni fin à attacher.",es:"Cada página cuenta su propio dato. No hay principio ni final que amarrar.",pt:"Cada página traz uma informação só dela. Não tem começo nem fim para amarrar.",it:"Ogni pagina dice una cosa vera tutta sua. Non c’è un inizio né una fine da legare.",nl:"Elke bladzijde vertelt een eigen feit. Er is geen begin en geen eind om vast te knopen.",sv:"Varje sida berättar sin egen sak. Det finns ingen början och inget slut att knyta ihop.",da:"Hver side fortæller sin egen ting. Der er ingen begyndelse og ingen slutning at binde sammen.",no:"Hver side forteller sin egen ting. Det er ingen begynnelse og ingen slutt å knyte sammen.",fi:"Jokainen sivu kertoo oman asiansa. Ei ole alkua eikä loppua, joita sitoa yhteen."},
    hintMiss2: {en:"Look inside. Does it tell a make-believe story, or true facts?",de:"Schau hinein. Erzählt es eine ausgedachte Geschichte oder echte Fakten?",fr:"Regarde à l’intérieur. Est-ce une histoire inventée ou de vraies infos ?",es:"Mira por dentro. ¿Cuenta algo inventado o cosas de verdad?",pt:"Olhe por dentro. Conta uma história inventada ou coisas de verdade?",it:"Guarda dentro. Racconta una storia inventata o cose vere?",nl:"Kijk erin. Vertelt het een verzonnen verhaal of echte feiten?",sv:"Titta inuti. Berättar boken något påhittat, eller sanna fakta?",da:"Kig indeni. Fortæller bogen noget opdigtet eller sande fakta?",no:"Se inni. Forteller boka noe oppdiktet eller sanne fakta?",fi:"Katso sisään. Kertooko kirja keksityn tarinan vai tosiasioita?"},
    okStory: {en:"Yes! {title} is a story: it has a beginning, a middle and an end.",de:"Ja! {title} ist eine Geschichte: Sie hat einen Anfang, eine Mitte und ein Ende.",fr:"Oui ! {title}, c’est une histoire : il y a un début, un milieu et une fin.",es:"¡Sí! {title} es un cuento: tiene principio, desarrollo y final.",pt:"Isso! {title} é uma história: tem começo, meio e fim.",it:"Sì! {title} è una storia: ha un inizio, uno svolgimento e una fine.",nl:"Ja! {title} is een verhaal: het heeft een begin, een midden en een eind.",sv:"Ja! {title} är en berättelse: den har en början, en mitt och ett slut.",da:"Ja! {title} er en historie: den har en begyndelse, en midte og en slutning.",no:"Ja! {title} er en fortelling: den har begynnelse, midt og slutt.",fi:"Kyllä! {title} on tarina: siinä on alku, keskikohta ja loppu."},
    okFact: {en:"Yes! {title} is a fact book: it teaches a true fact on every page.",de:"Ja! {title} ist ein Sachbuch: Es erklärt auf jeder Seite etwas Echtes.",fr:"Oui ! {title}, c’est un documentaire : il donne une vraie info à chaque page.",es:"¡Sí! {title} es un libro informativo: enseña un dato de verdad en cada página.",pt:"Isso! {title} é um livro informativo: ensina uma coisa de verdade em cada página.",it:"Sì! {title} è un libro di informazioni: insegna una cosa vera in ogni pagina.",nl:"Ja! {title} is een informatieboek: het vertelt op elke bladzijde een echt feit.",sv:"Ja! {title} är en faktabok: den berättar något sant på varje sida.",da:"Ja! {title} er en faktabog: den fortæller noget sandt på hver side.",no:"Ja! {title} er en faktabok: den forteller noe sant på hver side.",fi:"Kyllä! {title} on tietokirja: se kertoo joka sivulla jonkin tosiasian."},
    okBoth: {en:"Both shelves are right!",de:"Beide Regale stimmen!",fr:"Les deux étagères sont justes !",es:"¡Los dos libreros están bien!",pt:"As duas estantes estão certas!",it:"Tutti e due gli scaffali sono giusti!",nl:"Beide planken kloppen!",sv:"Båda hyllorna stämmer!",da:"Begge hylder er rigtige!",no:"Begge hyllene er riktige!",fi:"Molemmat hyllyt ovat oikein!"},
    aCover: {en:"{title}, book",de:"{title}, Buch",fr:"{title}, livre",es:"{title}, libro",pt:"{title}, livro",it:"{title}, libro",nl:"{title}, boek",sv:"{title}, bok",da:"{title}, bog",no:"{title}, bok",fi:"{title}, kirja"},
    aPage: {en:"Page {i}: {t}",de:"Seite {i}: {t}",fr:"Page {i} : {t}",es:"Página {i}: {t}",pt:"Página {i}: {t}",it:"Pagina {i}: {t}",nl:"Bladzijde {i}: {t}",sv:"Sida {i}: {t}",da:"Side {i}: {t}",no:"Side {i}: {t}",fi:"Sivu {i}: {t}"},
    aShelfStory: {en:"Story shelf, with the ribbon",de:"Geschichtenregal, mit der Schleife",fr:"Étagère des histoires, avec le ruban",es:"Librero de los cuentos, con el listón",pt:"Estante das histórias, com a fita",it:"Scaffale delle storie, con il nastro",nl:"Verhalenplank, met het lint",sv:"Berättelsehyllan, med bandet",da:"Historiehylden, med båndet",no:"Fortellingshylla, med båndet",fi:"Tarinahylly, jossa on nauha"},
    aShelfFact: {en:"Fact shelf, the one that shakes",de:"Sachbuchregal, das rüttelt",fr:"Étagère des documentaires, celle qui secoue",es:"Librero de los libros informativos, el que sacude",pt:"Estante dos livros informativos, a que sacode",it:"Scaffale dei libri di informazioni, quello che scuote",nl:"Informatieplank, die schudt",sv:"Faktahyllan, som skakar",da:"Faktahylden, der ryster",no:"Faktahylla, som rister",fi:"Tietokirjahylly, joka ravistelee"},
    aOnShelf: {en:"{title}, on the shelf. Tap to take it back.",de:"{title}, im Regal. Tippen, um es zurückzunehmen.",fr:"{title}, sur l’étagère. Touche pour le reprendre.",es:"{title}, en el librero. Toca para regresarlo.",pt:"{title}, na estante. Toque para tirar.",it:"{title}, sullo scaffale. Tocca per riprenderlo.",nl:"{title}, op de plank. Tik om het terug te pakken.",sv:"{title}, i hyllan. Tryck för att ta tillbaka den.",da:"{title}, på hylden. Tryk for at tage den tilbage.",no:"{title}, i hylla. Trykk for å ta den tilbake.",fi:"{title}, hyllyssä. Napauta, niin otat sen takaisin."},
    aShake: {en:"Shake the pages",de:"Seiten schütteln",fr:"Secouer les pages",es:"Sacudir las páginas",pt:"Sacudir as páginas",it:"Scuotere le pagine",nl:"Bladzijden schudden",sv:"Skaka sidorna",da:"Ryst siderne",no:"Rist sidene",fi:"Ravista sivuja"},
    aClose: {en:"Close the book",de:"Buch schließen",fr:"Fermer le livre",es:"Cerrar el libro",pt:"Fechar o livro",it:"Chiudere il libro",nl:"Boek dichtdoen",sv:"Stäng boken",da:"Luk bogen",no:"Lukk boka",fi:"Sulje kirja"},
    srTied: {en:"The ribbon goes from the beginning to the end and ties a bow.",de:"Das Band läuft vom Anfang bis zum Ende und bindet eine Schleife.",fr:"Le ruban va du début à la fin et fait un nœud.",es:"El listón va del principio al final y hace un moño.",pt:"A fita vai do começo ao fim e faz um laço.",it:"Il nastro va dall’inizio alla fine e fa un fiocco.",nl:"Het lint loopt van het begin tot het eind en maakt een strik.",sv:"Bandet går från början till slutet och knyter en rosett.",da:"Båndet går fra begyndelsen til slutningen og binder en sløjfe.",no:"Båndet går fra begynnelsen til slutten og knyter en sløyfe.",fi:"Nauha kulkee alusta loppuun ja sitoutuu rusetiksi."},
    srSlip: {en:"No beginning and no end: the ribbon slips off.",de:"Kein Anfang und kein Ende: Das Band rutscht ab.",fr:"Ni début ni fin : le ruban glisse.",es:"Sin principio ni final: el listón se resbala.",pt:"Sem começo nem fim: a fita escorrega.",it:"Né inizio né fine: il nastro scivola via.",nl:"Geen begin en geen eind: het lint glijdt eraf.",sv:"Ingen början och inget slut: bandet glider av.",da:"Ingen begyndelse og ingen slutning: båndet glider af.",no:"Ingen begynnelse og ingen slutt: båndet glir av.",fi:"Ei alkua eikä loppua: nauha liukuu pois."},
    srUpright: {en:"Shaken up, it still makes sense.",de:"Durchgeschüttelt ergibt es immer noch Sinn.",fr:"Secoué, il veut toujours dire quelque chose.",es:"Revuelto, sigue teniendo sentido.",pt:"Sacudido, ainda faz sentido.",it:"Anche scosso, ha ancora senso.",nl:"Door elkaar geschud klopt het nog steeds.",sv:"Omskakad går den fortfarande att förstå.",da:"Rystet rundt giver den stadig mening.",no:"Ristet om hverandre gir den fortsatt mening.",fi:"Ravisteltunakin siitä saa selvää."},
    srSlump: {en:"Shaken up, it doesn't make sense any more.",de:"Durchgeschüttelt ergibt es keinen Sinn mehr.",fr:"Secoué, il ne veut plus rien dire.",es:"Revuelto, ya no tiene sentido.",pt:"Sacudido, não faz mais sentido.",it:"Scosso, non ha più senso.",nl:"Door elkaar geschud klopt het niet meer.",sv:"Omskakad går den inte att förstå längre.",da:"Rystet rundt giver den ingen mening længere.",no:"Ristet om hverandre gir den ingen mening lenger.",fi:"Ravisteltuna siitä ei saa enää selvää."},
    srShaken: {en:"The pages are mixed up.",de:"Die Seiten sind durcheinander.",fr:"Les pages sont mélangées.",es:"Las páginas están revueltas.",pt:"As páginas estão misturadas.",it:"Le pagine sono mescolate.",nl:"De bladzijden zijn door elkaar.",sv:"Sidorna är blandade.",da:"Siderne er blandet.",no:"Sidene er blandet.",fi:"Sivut ovat sekaisin."},
    setBooks: {en:"Books",de:"Bücher",fr:"Livres",es:"Libros",pt:"Livros",it:"Libri",nl:"Boeken",sv:"Böcker",da:"Bøger",no:"Bøker",fi:"Kirjat"},
    bAsk: {en:"Bea asks",de:"Bea fragt",fr:"Bea demande",es:"Bea pide",pt:"A Bea pede",it:"Bea chiede",nl:"Bea vraagt",sv:"Bea frågar",da:"Bea spørger",no:"Bea spør",fi:"Bea pyytää"},
    bTopic: {en:"Same topic",de:"Gleiches Thema",fr:"Même sujet",es:"Mismo tema",pt:"Mesmo assunto",it:"Stesso argomento",nl:"Hetzelfde onderwerp",sv:"Samma ämne",da:"Samme emne",no:"Samme tema",fi:"Sama aihe"},
    bFill: {en:"Fill both shelves",de:"Beide Regale füllen",fr:"Remplir les deux étagères",es:"Llenar los dos libreros",pt:"Encher as duas estantes",it:"Riempire i due scaffali",nl:"Beide planken vullen",sv:"Fyll båda hyllorna",da:"Fyld begge hylder",no:"Fyll begge hyllene",fi:"Täytä molemmat hyllyt"},
    setPages: {en:"Inside pages",de:"Innenseiten",fr:"Pages intérieures",es:"Páginas de adentro",pt:"Páginas de dentro",it:"Pagine interne",nl:"Bladzijden binnenin",sv:"Sidorna inuti",da:"Siderne indeni",no:"Sidene inni",fi:"Sisäsivut"},
    pClosed: {en:"Closed until opened",de:"Zu, bis man sie öffnet",fr:"Fermées jusqu’à l’ouverture",es:"Cerradas hasta abrir el libro",pt:"Fechadas até abrir o livro",it:"Chiuse finché non apri il libro",nl:"Dicht tot je het boek opent",sv:"Stängda tills boken öppnas",da:"Lukkede, til bogen åbnes",no:"Lukket til boka åpnes",fi:"Kiinni, kunnes kirja avataan"},
    pOpen: {en:"Open on the desk",de:"Offen auf dem Tisch",fr:"Ouvertes sur le bureau",es:"Abiertas en la mesa",pt:"Abertas na mesa",it:"Aperte sul banco",nl:"Open op tafel",sv:"Öppna på bordet",da:"Åbne på bordet",no:"Åpne på bordet",fi:"Auki pöydällä"},
  },/*STRINGS-END*/

  defaults: { books: 'ask', pages: 'closed' },
  settings: [
    { key: 'books', type: 'choice', labelKey: 'setBooks', options: [{ value: 'ask', labelKey: 'bAsk' }, { value: 'topic', labelKey: 'bTopic' }, { value: 'fill', labelKey: 'bFill' }] },
    { key: 'pages', type: 'choice', labelKey: 'setPages', options: [{ value: 'closed', labelKey: 'pClosed' }, { value: 'open', labelKey: 'pOpen' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._nudged = false; this._anim = null;
    injectBeaShelvesCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._anim = null; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return BeaShelvesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return BeaShelvesCore.levelOf(this._setting('books')); },
  _openPages: function () { return this._setting('pages') === 'open'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = BeaShelvesCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = BeaShelvesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev, pass);
      this._prev = P.order; this._order = P.order.slice(); this._slots = P.slots; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'beashelves.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st.level === 'fill' ? 'tFill' : 'tAsk'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    this.st = BeaShelvesCore.newState(this._loc(), this._level(), r, { slot: this._slots ? this._slots[r] : null });
    this._view = { note: '', ok: '' };
    if (!this._nudged) { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },
  _book: function (id) { return BeaShelvesCore.book(this._loc(), id); },

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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'bs-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="bs-top"><div class="bs-bea"></div><div class="bs-ask"></div></div><div class="bs-deskarea"></div><div class="bs-shelves"></div><div class="bs-foot"></div><p class="bs-note" aria-live="polite"></p><p class="bs-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  _dims: function () {
    var W = this._width(), B = BeaShelvesCore.band(W);
    return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 96 : B.tiny ? 64 : 72, bea: B.wide ? 96 : 64, mini: B.wide ? 56 : 44 };
  },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.bs-sr'); if (el) el.textContent = s; },
  _symbol: function (shelf, size) {
    return shelf === 'ribbon'
      ? '<svg class="bs-sym" viewBox="0 0 40 40" width="' + size + '" height="' + size + '" aria-hidden="true"><path d="M20 20c-6-8-15-9-15-3s9 6 15 3zM20 20c6-8 15-9 15-3s-9 6-15 3z" fill="#D9473B" stroke="#A8312A" stroke-width="2" stroke-linejoin="round"/><path d="M18 21l-6 13M22 21l6 13" stroke="#D9473B" stroke-width="4" stroke-linecap="round"/><circle cx="20" cy="20" r="3.5" fill="#A8312A"/></svg>'
      : '<svg class="bs-sym" viewBox="0 0 40 40" width="' + size + '" height="' + size + '" aria-hidden="true"><g transform="rotate(-10 20 20)"><rect x="12" y="8" width="17" height="24" rx="2" fill="#2E8C7E" stroke="#1B5F55" stroke-width="2"/><rect x="12" y="8" width="4" height="24" fill="#1B5F55"/><path d="M19 15h7M19 20h7" stroke="#BFE6DF" stroke-width="2" stroke-linecap="round"/></g><path d="M8 12c-3 3-3 13 0 16M4 9c-5 5-5 17 0 22M32 12c3 3 3 13 0 16M36 9c5 5 5 17 0 22" fill="none" stroke="#1B5F55" stroke-width="2.6" stroke-linecap="round"/></svg>';
  },

  /* which book the open-book panel shows: the one under test, else the help book, else the open one (closed-pages mode) */
  _panelBook: function () {
    var C = BeaShelvesCore, st = this.st;
    if (this._anim) return this._anim.id;
    if (C.help(st)) return C.helpBook(st);
    return this._openPages() ? null : st.sel;
  },
  _paint_: function () {
    var C = BeaShelvesCore, st = this.st, D = this._dims(), v = this._view, self = this, help = C.help(st), open = this._openPages();
    this._wrap.className = 'bs-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level + (open ? ' is-openpages' : '') + (help ? ' is-help' : '');
    /* Bea and her ask */
    var bea = this._qs('.bs-bea'); bea.className = 'bs-bea' + (st.done && !this._anim ? ' is-pop' : ''); bea.setAttribute('aria-hidden', 'true');
    bea.innerHTML = this._img('insects and bugs/worm', D.bea); bea.style.width = bea.style.height = (D.bea + 8) + 'px';
    var ask = this._qs('.bs-ask'), ak = st.ask ? (st.ask === 'story' ? 'askStory' : 'askFact') : 'askFill';
    ask.innerHTML = (st.ask ? this._symbol(C.shelfOf(st.ask), D.wide ? 40 : 32) : this._symbol('ribbon', D.wide ? 32 : 26) + this._symbol('shaker', D.wide ? 32 : 26)) + '<span>' + esc(this._t(ak)) + '</span>';
    ask.className = 'bs-ask' + (st.ask ? ' ask-' + st.ask : ' ask-fill');
    /* the desk, or the open book over it */
    var area = this._qs('.bs-deskarea'); area.innerHTML = '';
    var pb = this._panelBook();
    if (pb) area.appendChild(this._panel(pb, D));
    else { this._lastPanel = null; area.appendChild(this._desk(D, open)); }
    /* the shelves */
    var shelves = this._qs('.bs-shelves'); shelves.innerHTML = '';
    ['ribbon', 'shaker'].forEach(function (sh) { shelves.appendChild(self._shelf(sh, D)); });
    /* Check */
    var foot = this._qs('.bs-foot'); foot.innerHTML = '';
    var chk = this._btn('bs-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || !!this._anim; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.bs-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'bs-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'bs-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'bs-note'; }
  },
  /* the covers on the desk (the ones not on a shelf) */
  _desk: function (D, open) {
    var st = this.st, self = this, desk = document.createElement('div');
    var left = st.desk.filter(function (id) { return !st.place[id]; });
    desk.className = 'bs-desk n-' + st.desk.length + (open ? ' is-rows' : '');
    left.forEach(function (id) {
      var b = self._book(id), cov = self._btn('bs-cover' + (st.sel === id ? ' is-sel' : ''), 'cover-' + id, self._t('aCover', { title: b.t }),
        '<span class="bs-spine" aria-hidden="true"></span><span class="bs-ctitle">' + esc(b.t) + '</span><span class="bs-cpic" aria-hidden="true">' + self._img(b.pic, D.pic) + '</span>');
      cov.disabled = st.done || !!self._anim; cov.setAttribute('aria-pressed', st.sel === id ? 'true' : 'false');
      cov.addEventListener('click', function () { self._open(id); });
      if (!open) { desk.appendChild(cov); return; }
      /* inside pages open on the desk: each book is a row, its three pages beside its cover */
      var row = document.createElement('div'); row.className = 'bs-row' + (st.sel === id ? ' is-sel' : '');
      row.appendChild(cov); row.appendChild(self._pages(id, st.sel === id ? st.shake : null, D, null)); if (st.sel === id && !st.done) row.appendChild(self._knob());
      desk.appendChild(row);
    });
    return desk;
  },
  _knob: function () {
    var self = this, k = this._btn('bs-knob', 'shake', this._t('aShake'), '<svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true"><path d="M8 13c-3 3-3 11 0 14M32 13c3 3 3 11 0 14" fill="none" stroke="#FFF" stroke-width="3.4" stroke-linecap="round"/><rect x="14" y="10" width="12" height="20" rx="2" fill="#FFF"/></svg>');
    k.disabled = !!this._anim; k.addEventListener('click', function () { self._shake(); }); return k;
  },
  /* the three pages of a book, in the order given (none = in order); marks underline words */
  _pages: function (id, order, D, opt) {
    opt = opt || {};
    var b = this._book(id), self = this, wrap = document.createElement('div'), ord = order || [0, 1, 2];
    var mk = opt.marks ? BeaShelvesCore.marks(this._loc(), id) : [];
    wrap.className = 'bs-pages' + (b.kind === 'fact' ? ' is-fact' : ' is-story');
    ord.forEach(function (pi, pos) {
      var pg = b.p[pi], d = document.createElement('div'), lit = opt.lit && (opt.lit === 'all' || opt.lit.indexOf(pos) >= 0);
      d.className = 'bs-page' + (lit ? ' is-lit' : '') + (opt.flutter ? ' is-flutter' : '');
      d.setAttribute('role', 'note'); d.setAttribute('aria-label', self._t('aPage', { i: pos + 1, t: (pg.h ? pg.h + '. ' : '') + pg.s }));
      var marksOn = mk.filter(function (m) { return m[0] === pi; }).map(function (m) { return m[1]; });
      d.innerHTML = (pg.h ? '<b class="bs-h">' + markUp(pg.h, marksOn, opt.marks) + '</b>' : '') + '<span class="bs-s">' + markUp(pg.s, pg.h ? [] : marksOn, opt.marks) + '</span>';
      wrap.appendChild(d);
    });
    return wrap;
  },
  /* the open book: its title and blurb (the inside cover), the shake knob on the spine, the close tab, three pages */
  _panel: function (id, D) {
    var st = this.st, b = this._book(id), self = this, an = this._anim && this._anim.id === id ? this._anim : null, help = !an && BeaShelvesCore.help(st);
    var p = document.createElement('div');
    p.className = 'bs-open' + (this._lastPanel !== id ? ' is-new' : '') + (an ? ' is-test ph-' + an.phase + ' sh-' + an.shelf : '') + (help ? ' is-helpbook' : '');
    this._lastPanel = id;
    var head = document.createElement('div'); head.className = 'bs-ohead';
    head.innerHTML = '<span class="bs-opic" aria-hidden="true">' + this._img(b.pic, D.wide ? 64 : 48) + '</span><span class="bs-otext"><b>' + esc(b.t) + '</b><i>' + esc(b.b) + '</i></span>';
    p.appendChild(head);
    var order = null, opt = {};
    if (an) {
      if (an.shelf === 'shaker') { order = an.order; opt.flutter = an.phase === 'shake'; opt.marks = an.phase === 'slump' ? 'dot' : null; }
      else { opt.lit = an.phase === 'thread' ? an.lit : an.phase === 'all' || an.phase === 'slip' ? 'all' : an.phase === 'tied' ? 'all' : null; opt.marks = an.phase === 'slip' ? 'dot' : null; }
    } else if (help) opt.marks = 'solid';
    else order = st.shake;
    p.appendChild(this._pages(id, order, D, opt));
    if (!an) {
      var tools = document.createElement('div'); tools.className = 'bs-otools';
      if (!help && !st.done) tools.appendChild(this._knob());
      var cl = this._btn('bs-close', 'close', this._t('aClose'), '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#5E4A35" stroke-width="3" stroke-linecap="round"/></svg>');
      cl.addEventListener('click', function () { self._close(); }); tools.appendChild(cl);
      p.appendChild(tools);
    }
    return p;
  },
  /* a shelf: the drawn shelf, its symbol plate, a target to tap, and the books standing on it */
  _shelf: function (sh, D) {
    var C = BeaShelvesCore, st = this.st, self = this, on = C.onShelf(st, sh), off = !!st.ask && C.shelfOf(st.ask) !== sh;
    var an = this._anim && this._anim.shelf === sh ? this._anim : null;
    var box = document.createElement('div'); box.className = 'bs-shelf is-' + sh + (off ? ' is-off' : '') + (an ? ' ph-' + an.phase : '');
    var H = D.wide ? 120 : D.xs ? 76 : D.tiny ? 84 : 100;
    box.innerHTML = '<svg class="bs-shelfart" viewBox="0 0 300 120" preserveAspectRatio="none" width="100%" height="' + H + '" aria-hidden="true">' +
      '<rect x="4" y="4" width="292" height="92" rx="8" fill="#B98A55"/><rect x="14" y="12" width="272" height="76" rx="3" fill="#F6E7CB"/><path d="M14 30h272M14 56h272" stroke="#EEDAB5" stroke-width="2"/>' +
      '<rect x="0" y="84" width="300" height="14" rx="4" fill="#A97440"/><rect x="0" y="94" width="300" height="4" fill="#8C5E33"/>' +
      (sh === 'ribbon'
        ? '<rect x="2" y="100" width="12" height="18" fill="#8C5E33"/><rect x="286" y="100" width="12" height="18" fill="#8C5E33"/><circle cx="24" cy="74" r="11" fill="#D9473B" stroke="#A8312A" stroke-width="3"/><circle cx="24" cy="74" r="3.5" fill="#F6E7CB"/><path d="M24 85 L 292 85" fill="none" stroke="#D9473B" stroke-width="5" stroke-dasharray="' + (an && an.phase === 'slip' ? '8 9' : '0') + '"/>'
        : '<path d="M30 98 l14 4 l-14 4 l14 4 l-14 4 M256 98 l14 4 l-14 4 l14 4 l-14 4" fill="none" stroke="#2E8C7E" stroke-width="3.5" stroke-linejoin="round"/><rect x="24" y="114" width="26" height="5" rx="2" fill="#1B5F55"/><rect x="250" y="114" width="26" height="5" rx="2" fill="#1B5F55"/>') +
      '</svg>';
    var plate = document.createElement('span'); plate.className = 'bs-plate'; plate.innerHTML = this._symbol(sh, D.wide ? 34 : 28); box.appendChild(plate);
    var tgt = this._btn('bs-target', 'shelf-' + sh, this._t(sh === 'ribbon' ? 'aShelfStory' : 'aShelfFact'), '');
    tgt.disabled = st.done || !!this._anim || off; tgt.addEventListener('click', function () { self._put(sh); }); box.appendChild(tgt);
    var row = document.createElement('div'); row.className = 'bs-onshelf';
    on.forEach(function (id) {
      var b = self._book(id), good = st.locked[id], tested = an && an.id === id;
      var m = self._btn('bs-mini' + (good ? ' is-good band-' + b.kind : '') + (tested ? ' is-tested' : ''), 'mini-' + id, self._t('aOnShelf', { title: b.t }),
        '<span class="bs-mpic" aria-hidden="true">' + self._img(b.pic, D.mini) + '</span><span class="bs-mtitle" aria-hidden="true">' + esc(b.t) + '</span>' + (good && b.kind === 'story' ? '<span class="bs-bow" aria-hidden="true">' + self._symbol('ribbon', 22) + '</span>' : ''));
      m.disabled = st.done || !!self._anim || !!good; m.addEventListener('click', function () { self._back(id); });
      row.appendChild(m);
    });
    box.appendChild(row);
    box.style.height = H + 'px';
    return box;
  },

  /* ---------------- the hand ---------------- */
  _open: function (id) { if (this._anim) return; var r = BeaShelvesCore.open(this.st, id); if (r === 'no') return; this.api.sound(r === 'open' ? 560 : 360); this._clearHelp(); this._paint(); },
  _close: function () { if (this._anim) return; BeaShelvesCore.close(this.st); this.st.last = null; this.st.wrong = []; this._clearHelp(); this.api.sound(360); this._paint(); },
  _shake: function () {
    if (this._anim || !this.st.sel) return; var o = BeaShelvesCore.shake(this.st); if (!o) return;
    this.api.sound(300); this._sr(this._t('srShaken')); this._clearHelp(); this._paint();
    var pg = this._wrap.querySelectorAll('.bs-page'); for (var i = 0; i < pg.length; i++) pg[i].classList.add('is-flutter');
  },
  _put: function (sh) {
    if (this._anim) return;
    var st = this.st; if (!st.sel) { this._view.nudge = false; this._view.note = this._t('hintPick'); this.api.sound(200); this._paint(); return; }
    var r = BeaShelvesCore.put(st, st.sel, sh); if (r === 'no') return;
    this.api.sound(r === 'in' ? 520 : 300); this._clearHelp(); this._paint();
  },
  /* a book on a shelf tapped: with a book open, the open one goes onto that shelf (the tap meant the shelf); otherwise it comes back to the desk */
  _back: function (id) { if (this._anim) return; if (this.st.sel && this.st.sel !== id) { this._put(this.st.place[id]); return; } if (BeaShelvesCore.back(this.st, id) === 'no') return; this.api.sound(300); this._clearHelp(); this._paint(); },
  _key_: function (e) {
    var st = this.st; if (!st || st.done || this._anim) return;
    var k = (e.key || '').toLowerCase();
    if (k === 's' && st.sel) { this._shake(); e.preventDefault(); }
    else if (k === '1' && st.sel) { this._put('ribbon'); e.preventDefault(); }
    else if (k === '2' && st.sel) { this._put('shaker'); e.preventDefault(); }
    else if (k === 'escape' && st.sel) { this._close(); e.preventDefault(); }
  },

  /* ---------------- Check: each shelf runs its test ---------------- */
  _check: function () {
    var C = BeaShelvesCore, st = this.st, v = this._view, self = this;
    if (st.done || this._anim) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'empty') { v.nudge = false; v.note = this._t(C.hint(st).key); this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    /* the steps the shelves play, book by book: ribbon → thread page by page then tie (story) or light all at once and slip (fact);
       shaker → shake into a new order then stand upright (fact) or come out ending first and slump (story) */
    var steps = [];
    a.tests.forEach(function (t) {
      if (t.shelf === 'ribbon') {
        if (t.pass) { [[0], [0, 1], [0, 1, 2]].forEach(function (l) { steps.push({ id: t.id, shelf: 'ribbon', phase: 'thread', lit: l, ms: 260 }); }); steps.push({ id: t.id, shelf: 'ribbon', phase: 'tied', ms: 520, sr: 'srTied' }); }
        else { steps.push({ id: t.id, shelf: 'ribbon', phase: 'all', ms: 600 }); steps.push({ id: t.id, shelf: 'ribbon', phase: 'slip', ms: 1300, sr: 'srSlip' }); }
      } else {
        var o = t.pass ? [1, 2, 0] : [2, 1, 0];
        steps.push({ id: t.id, shelf: 'shaker', phase: 'shake', order: o, ms: 700 });
        steps.push({ id: t.id, shelf: 'shaker', phase: t.pass ? 'upright' : 'slump', order: o, ms: t.pass ? 700 : 1500, sr: t.pass ? 'srUpright' : 'srSlump' });
      }
    });
    var finish = function () {
      self._anim = null;
      if (a.result === 'ok') { self._success(); return; }
      var h = C.hint(st); v.nudge = false; v.note = self._t(h.key);
      self.api.sound(180); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    var i = 0, step = function () {
      if (i >= steps.length) { finish(); return; }
      var s = steps[i++]; self._anim = s; if (s.sr) self._sr(self._t(s.sr));
      self.api.sound(s.phase === 'tied' || s.phase === 'upright' ? 880 : s.phase === 'slip' || s.phase === 'slump' ? 170 : 420);
      self._paint(); self._later(step, s.ms);
    };
    step();
  },
  _success: function () {
    var st = this.st, v = this._view;
    if (st.level === 'fill') v.ok = this._t('okBoth');
    else { var b = this._book(st.right); v.ok = this._t(b.kind === 'story' ? 'okStory' : 'okFact', { title: b.t }); }
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
/* underline the marked words of a page (solid for the help, dotted while a shelf shows why it failed) */
function markUp(text, marks, kind) {
  var out = esc(text);
  if (!kind) return out;
  (marks || []).forEach(function (m) { var e = esc(m), i = out.indexOf(e); if (i >= 0) out = out.slice(0, i) + '<mark class="bs-mk is-' + kind + '">' + e + '</mark>' + out.slice(i + e.length); });
  return out;
}
function injectBeaShelvesCSS() {
  if (typeof document === 'undefined' || document.getElementById('bs-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', RED = '#D9473B', TEAL = '#2E8C7E';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.bs-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .bs-wrap:focus{outline:none;}'
  /* Bea and her ask */
  + '.bs-top{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.bs-bea{flex:none;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#F5EEDC;} .bs-bea img{display:block;object-fit:contain;pointer-events:none;} .bs-bea.is-pop{animation:bsPop .7s ease-out;}'
  + '@keyframes bsPop{0%{transform:none;}40%{transform:translateY(-12px) scale(1.08);}100%{transform:none;}}'
  + '.bs-ask{flex:0 1 auto;min-width:0;display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:16px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;font-family:' + H + ';font-weight:800;font-size:22px;line-height:1.2;color:' + INK + ';}'
  + '.bs-ask .bs-sym{flex:none;} .bs-ask.ask-fill{font-family:' + B + ';font-size:18px;}'
  /* the desk */
  + '.bs-deskarea{width:100%;display:flex;justify-content:center;}'
  + '.bs-desk{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;width:100%;}'
  + '.bs-cover{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;width:150px;min-height:44px;padding:10px 8px 12px 16px;border:0;border-radius:6px 12px 12px 6px;background:#FFF6E2;box-shadow:0 4px 0 #D9C29A,inset 0 0 0 2px #E2CDA4;cursor:pointer;font-family:' + H + ';color:' + INK + ';}'
  + '.bs-spine{position:absolute;left:0;top:0;bottom:0;width:9px;border-radius:6px 0 0 6px;background:#B98A55;}'
  + '.bs-ctitle{font-weight:800;font-size:17px;line-height:1.15;text-align:center;hyphens:manual;overflow-wrap:break-word;max-width:100%;}'
  + '.bs-cpic{display:flex;align-items:center;justify-content:center;} .bs-cpic img,.bs-opic img,.bs-mpic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.bs-cover.is-sel{background:#FFE9A8;box-shadow:0 0 0 4px #F2784B;} .bs-cover:disabled{cursor:default;}'
  + '.bs-wrap.is-narrow .bs-desk.n-3{flex-direction:column;gap:8px;} .bs-wrap.is-narrow .bs-desk.n-3 .bs-cover{width:100%;box-sizing:border-box;flex-direction:row-reverse;justify-content:flex-end;gap:12px;padding:6px 12px 6px 18px;}'
  + '.bs-wrap.is-narrow .bs-desk.n-3 .bs-ctitle{text-align:left;font-size:18px;} .bs-wrap.is-narrow .bs-desk.n-4{display:grid;grid-template-columns:1fr 1fr;gap:8px;} .bs-wrap.is-narrow .bs-desk.n-4 .bs-cover{width:auto;padding:8px 6px 10px 14px;} .bs-wrap.is-narrow .bs-ctitle{font-size:16px;}'
  /* pages open on the desk */
  + '.bs-desk.is-rows{flex-direction:column;flex-wrap:nowrap;gap:10px;} .bs-row{display:flex;align-items:stretch;gap:10px;width:100%;} .bs-row .bs-cover{flex:none;width:130px;} .bs-row .bs-pages{flex:1;min-width:0;} .bs-row.is-sel .bs-pages{box-shadow:0 0 0 3px #F2784B;border-radius:12px;}'
  + '.bs-wrap.is-narrow .bs-row{flex-direction:column;gap:6px;} .bs-wrap.is-narrow .bs-row .bs-cover{width:100% !important;box-sizing:border-box;flex-direction:row-reverse;justify-content:flex-end;gap:12px;padding:6px 12px 6px 18px;} .bs-wrap.is-narrow .bs-row .bs-ctitle{text-align:left;}'
  + '.bs-row .bs-knob{align-self:center;}'
  /* the pages */
  + '.bs-pages{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;} .bs-wrap.is-narrow .bs-pages{grid-template-columns:1fr;gap:6px;}'
  + '.bs-page{padding:10px 12px;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:700;font-size:17px;line-height:1.35;color:' + INK + ';transition:background .2s,box-shadow .2s;}'
  + '.bs-h{display:block;font-family:' + H + ';font-weight:800;font-size:17px;color:#146B5E;margin-bottom:2px;}'
  + '.bs-page.is-lit{background:#FFE3DE;box-shadow:inset 0 0 0 3px ' + RED + ';} .bs-page.is-flutter{animation:bsFlutter .35s ease-in-out;}'
  + '@keyframes bsFlutter{0%{transform:none;}25%{transform:rotate(-3deg) translateY(-3px);}75%{transform:rotate(3deg) translateY(2px);}100%{transform:none;}}'
  + '.bs-mk{background:none;color:inherit;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:4px;} .bs-mk.is-solid{text-decoration-color:#C9952E;background:#FFF0C2;border-radius:3px;} .bs-mk.is-dot{text-decoration-style:dotted;text-decoration-color:#8A3B1F;}'
  /* the open book */
  + '.bs-open{position:relative;width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px 22px;border-radius:8px 16px 16px 8px;background:#FFF6E2;box-shadow:0 4px 0 #D9C29A,inset 0 0 0 2px #E2CDA4,inset 12px 0 0 #B98A55;}' + '.bs-open.is-new{animation:bsOpen .24s ease-out;}'
  + '@keyframes bsOpen{0%{transform:scaleX(.85);opacity:.4;}100%{transform:none;opacity:1;}} .bs-wrap.is-fast .bs-open{animation:none;}'
  + '.bs-ohead{display:flex;align-items:center;gap:12px;padding-right:100px;min-height:48px;} .bs-otext{display:flex;flex-direction:column;min-width:0;} .bs-otext b{font-family:' + H + ';font-size:20px;line-height:1.15;color:' + INK + ';} .bs-otext i{font-family:' + B + ';font-style:italic;font-weight:600;font-size:16px;color:#5E5670;}'
  + '.bs-opic{flex:none;} .bs-wrap.is-narrow .bs-opic{display:none;}'
  + '.bs-otools{position:absolute;right:10px;top:10px;display:flex;gap:8px;}'
  + '.bs-knob,.bs-close{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;cursor:pointer;}'
  + '.bs-knob{background:' + TEAL + ';box-shadow:0 3px 0 #1B5F55;} .bs-close{background:#EADBC2;box-shadow:0 3px 0 #C9B08A;} .bs-knob:disabled{opacity:.5;}'
  + '.bs-open.sh-shaker.ph-shake{animation:bsRattle .14s linear infinite;} .bs-open.ph-slump{transform:rotate(-4deg) translateY(4px);transition:transform .4s;} .bs-open.ph-upright{box-shadow:0 4px 0 #D9C29A,inset 0 0 0 3px ' + TEAL + ',inset 12px 0 0 #B98A55;}'
  + '.bs-open.ph-tied{box-shadow:0 4px 0 #D9C29A,inset 0 0 0 3px ' + RED + ',inset 12px 0 0 #B98A55;} .bs-open.is-helpbook{box-shadow:0 0 0 4px #F4CF62,inset 12px 0 0 #B98A55;}'
  + '@keyframes bsRattle{0%,100%{transform:none;}25%{transform:translateX(-3px) rotate(-.6deg);}75%{transform:translateX(3px) rotate(.6deg);}}'
  /* the shelves */
  + '.bs-shelves{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;}'
  + '.bs-shelf{position:relative;min-width:0;} .bs-shelfart{position:absolute;inset:0;display:block;} .bs-shelf.is-off{opacity:.5;filter:saturate(.6);}'
  + '.bs-plate{position:absolute;right:10px;top:10px;z-index:1;pointer-events:none;}'
  + '.bs-target{position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px;background:transparent;cursor:pointer;z-index:1;} .bs-target:disabled{cursor:default;}'
  + '.bs-onshelf{position:absolute;left:44px;right:44px;bottom:calc(30% + 2px);display:flex;justify-content:center;align-items:flex-end;gap:8px;z-index:2;pointer-events:none;}'
  + '.bs-mini{pointer-events:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:44px;min-height:44px;max-width:96px;padding:4px 6px;border:0;border-radius:4px 8px 8px 4px;background:#FFF6E2;box-shadow:inset 5px 0 0 #B98A55,0 2px 0 #C9A36B;cursor:pointer;position:relative;}'
  + '.bs-mtitle{font-family:' + H + ';font-weight:800;font-size:12px;line-height:1.1;color:' + INK + ';max-width:84px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
  + '.bs-mini.band-story{box-shadow:inset 5px 0 0 ' + RED + ',0 2px 0 #C9A36B;} .bs-mini.band-fact{box-shadow:inset 5px 0 0 ' + TEAL + ',0 2px 0 #C9A36B;} .bs-mini:disabled{cursor:default;}'
  + '.bs-mini.is-tested{animation:bsRattle .14s linear infinite;} .bs-shelf.ph-slump .bs-mini.is-tested,.bs-shelf.ph-slip .bs-mini.is-tested{animation:none;transform:rotate(-14deg);transition:transform .3s;}'
  + '.bs-bow{position:absolute;top:-10px;right:-8px;}'
  + '.bs-wrap.is-narrow .bs-onshelf{left:10px;right:10px;gap:4px;} .bs-wrap.is-narrow .bs-mtitle{display:none;} .bs-wrap.is-narrow .bs-shelves{gap:10px;} .bs-wrap.is-narrow .bs-plate{right:8px;top:8px;}'
  /* Check and the note */
  + '.bs-foot{display:flex;justify-content:center;width:100%;}'
  + '.bs-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .bs-check:disabled{opacity:.5;cursor:default;}'
  + '.bs-note{margin:0;min-height:1.3em;max-width:620px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .bs-note.is-hint{color:#8A3B1F;} .bs-note.is-nudge{color:#5E6770;} .bs-wrap.is-narrow .bs-note{font-size:17px;}'
  + '.bs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.bs-wrap.is-narrow{gap:10px;} .bs-wrap.is-narrow .bs-ask{font-size:19px;padding:8px 12px;} .bs-wrap.is-narrow .bs-ask.ask-fill{font-size:16px;}'
  + '.bs-wrap.is-narrow .bs-page{font-size:16px;padding:8px 10px;} .bs-wrap.is-narrow .bs-h{font-size:16px;} .bs-wrap.is-narrow .bs-open{padding:10px 10px 12px 20px;} .bs-wrap.is-narrow .bs-otext b{font-size:18px;} .bs-wrap.is-narrow .bs-ohead{padding-right:104px;min-height:44px;}'
  + '.bs-wrap.is-tiny{gap:8px;} .bs-wrap.is-tiny .bs-check{min-width:112px;min-height:50px;padding:6px 14px;font-size:20px;} .bs-wrap.is-tiny .bs-ask{font-size:17px;} .bs-wrap.is-tiny .bs-page{font-size:15px;line-height:1.3;padding:6px 8px;}'
  + '.bs-wrap.is-xs .bs-otext i{font-size:15px;} .bs-wrap.is-xs .bs-ohead{padding-right:96px;} .bs-wrap.is-xs .bs-desk.n-3 .bs-ctitle{font-size:16px;}'
  /* below 340 px Bea steps aside (her ask stays, full width), and the desk and shelves tighten */
  + '.bs-wrap.is-tiny .bs-bea{display:none;} .bs-wrap.is-tiny .bs-ask{width:100%;box-sizing:border-box;justify-content:center;} .bs-wrap.is-tiny .bs-ask.ask-fill{font-size:15px;padding:6px 10px;}'
  + '.bs-wrap.is-tiny .bs-desk.n-3{gap:6px;} .bs-wrap.is-tiny .bs-desk.n-3 .bs-cover{padding:3px 10px 3px 16px;} .bs-wrap.is-tiny .bs-desk.n-4{gap:6px;} .bs-wrap.is-tiny .bs-desk.n-4 .bs-cover{padding:6px 4px 6px 12px;gap:4px;} .bs-wrap.is-tiny .bs-desk.n-4 .bs-ctitle{font-size:15px;}'
  + '.bs-wrap.is-tiny .bs-check{min-height:48px;} .bs-wrap.is-xs{gap:4px;} .bs-wrap.is-xs .bs-desk.n-4 .bs-cover{padding:2px 4px 3px 12px;gap:2px;} .bs-wrap.is-xs .bs-desk.n-4{gap:4px;}'
  + '@media (prefers-reduced-motion: reduce){.bs-open,.bs-page,.bs-mini,.bs-bea{animation:none !important;transition:none !important;}}'
  + '.bs-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'bs-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.BeaTwoBookshelvesActivity = BeaTwoBookshelvesActivity;
