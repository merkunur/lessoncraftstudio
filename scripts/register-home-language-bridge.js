#!/usr/bin/env node
/* =====================================================================
   register-home-language-bridge.js — one-shot registration insert for
   TOOL #29, the Say It Board.

   Writes the ToolEntry into all eleven frontend/messages/tool-content/
   <locale>.json (immediately before "labels", the house position) and the
   MANIPULATIVES entry into frontend/lib/manipulatives.ts.

   ⚠ CURATION: en is authored; the other ten are BUILDER DRAFTS written in
   the locale (never machine-translated) and are corrected in place by the
   per-locale native 3-agent ensembles (§A.13.48). sv/da/no/fi carry
   [NSR-FLAG] per §17.5.1. pt is Brazilian per §6.

   Idempotent: re-running replaces the entry rather than duplicating it.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KEY = 'home-language-bridge';

const E = {
  en: {
    slug: 'say-it-board',
    name: 'Say It Board',
    tagline: 'A child with no words yet taps a picture, and the room hears them.',
    about: [
      "Say It Board gives a newly arrived child a voice on their first morning. Twelve pictures, twelve things a five-year-old genuinely needs to be able to say — I need help, I don't understand, I need the toilet, can I play too — and one tap says it out loud, in the language of the room. It is not vocabulary teaching and it is not a test. It is a way to be heard on day one, before a single word of the new language has been learned.",
      "The pictures come first, and that is a decision rather than a style. A drawing is understood by a child whatever they speak, so the board works for the Ukrainian, Arabic, Turkish or Somali child who arrives in a German, Swedish or Dutch classroom in November — the child this is actually for. If their home language happens to be one of our eleven you can add it, and every card then carries two lines. That is a bonus and never the premise, and when it is there the home language is printed first, at the same size and in the same colour, because a child's own language is not the smaller one.",
      "Nothing about the child is measured. There is no level, no score, no progress bar and no count of words learned — every product in this space adds one, and it is the harmful part. The whole board is free and stays free, because a child's voice is not something to sell. Nothing is stored and nothing is sent anywhere. The Teacher plan adds the teacher's side only: a printable card for the desk or a lanyard, so the twelve phrases travel with the child when the screen does not."
    ],
    howToUse: [
      'Open it on the class screen, or hand a tablet to the child. The twelve pictures are already there — nothing to set up and nothing to choose.',
      'The child taps a picture. The device says the whole phrase out loud in the language of your classroom, calmly, so the room hears the request rather than the accent.',
      "If the child's home language is one of the eleven, tap “Add the child's language” once. Every card then shows both lines, home language first.",
      'Leave it open on a tablet beside their table for the first weeks. It works best when nobody has to ask for it.',
      'Print the card (Teacher plan) so the twelve phrases go with the child to the corridor, the playground and home.'
    ],
    classroomIdeas: [
      'Show the whole class the board on the first morning and tap two or three cards together, so everyone learns what the new child will be tapping. Then it is a shared thing rather than a special thing.',
      'Pair the child with a buddy who holds the tablet for the first week. Tapping a card together is the easiest first conversation two children who share no language can have.',
      'Use it yourself in the other direction: tap “Where should I go?” and point, and you have explained the corridor without a word of shared language.',
      'Put the printed card on the desk and a second one in the school bag. The phrases matter most at the moments the screen is not there — the toilet, the playground, the pick-up.'
    ],
    metaTitle: 'Say It Board — First Words for a New Arrival | Free Tool',
    metaDescription: 'Free picture communication board for newly arrived K-3 children: tap a picture and the class hears it aloud in your classroom language. No assessment.'
  },

  de: {
    slug: 'sag-es-tafel',
    name: 'Sag-es-Tafel',
    tagline: 'Ein Kind ohne Worte tippt ein Bild an — und der Raum hört es.',
    about: [
      'Die Sag-es-Tafel gibt einem neu angekommenen Kind am ersten Morgen eine Stimme. Zwölf Bilder, zwölf Dinge, die ein Fünfjähriger wirklich sagen können muss — ich brauche Hilfe, ich verstehe das nicht, ich muss auf die Toilette, darf ich mitspielen — und ein Tippen sagt es laut, in der Sprache des Klassenzimmers. Das ist kein Wortschatzunterricht und keine Prüfung. Es ist die Möglichkeit, gehört zu werden, bevor ein einziges Wort der neuen Sprache gelernt ist.',
      'Die Bilder kommen zuerst, und das ist eine Entscheidung, kein Stil. Eine Zeichnung versteht jedes Kind, gleich welche Sprache es spricht. Deshalb funktioniert die Tafel auch für das ukrainische, arabische, türkische oder somalische Kind, das im November in eine deutsche Klasse kommt — für dieses Kind ist sie gemacht. Ist die Familiensprache eine unserer elf, können Sie sie hinzufügen; jede Karte trägt dann zwei Zeilen. Das ist ein Bonus, nie die Voraussetzung — und wenn sie da ist, steht die Familiensprache oben, in derselben Größe und Farbe, denn die eigene Sprache eines Kindes ist nicht die kleinere.',
      'Über das Kind wird nichts gemessen. Kein Niveau, keine Punkte, kein Fortschrittsbalken, keine Zahl gelernter Wörter — jedes Produkt in diesem Bereich baut so etwas ein, und genau das ist der schädliche Teil. Die ganze Tafel ist und bleibt kostenlos, denn die Stimme eines Kindes verkauft man nicht. Nichts wird gespeichert, nichts wird gesendet. Das Lehrer-Paket ergänzt nur die Seite der Lehrkraft: eine Karte zum Ausdrucken für den Tisch oder das Band, damit die zwölf Sätze auch dort dabei sind, wo kein Bildschirm steht.'
    ],
    howToUse: [
      'Öffnen Sie die Tafel am Klassenbildschirm oder geben Sie dem Kind ein Tablet. Die zwölf Bilder sind schon da — nichts einzurichten, nichts auszuwählen.',
      'Das Kind tippt ein Bild an. Das Gerät sagt den ganzen Satz laut in der Sprache Ihres Klassenzimmers, ruhig, damit der Raum die Bitte hört und nicht den Akzent.',
      'Ist die Familiensprache eine der elf, tippen Sie einmal auf „Sprache des Kindes hinzufügen“. Jede Karte zeigt dann beide Zeilen, die Familiensprache zuerst.',
      'Lassen Sie die Tafel in den ersten Wochen auf einem Tablet neben dem Platz des Kindes offen. Sie wirkt am besten, wenn niemand erst danach fragen muss.',
      'Drucken Sie die Karte (Lehrer-Paket), damit die zwölf Sätze mit auf den Flur, den Hof und nach Hause gehen.'
    ],
    classroomIdeas: [
      'Zeigen Sie die Tafel am ersten Morgen der ganzen Klasse und tippen Sie zwei, drei Karten gemeinsam an. Dann ist sie etwas Gemeinsames und nichts Besonderes.',
      'Geben Sie dem Kind für die erste Woche eine Partnerin oder einen Partner, die das Tablet halten. Gemeinsam eine Karte anzutippen ist das einfachste erste Gespräch zwischen zwei Kindern ohne gemeinsame Sprache.',
      'Nutzen Sie die Tafel auch andersherum: Tippen Sie „Wo soll ich hingehen?“ an und zeigen Sie hin — schon ist der Weg erklärt, ganz ohne gemeinsame Sprache.',
      'Legen Sie die gedruckte Karte auf den Tisch und eine zweite in die Schultasche. Am wichtigsten sind die Sätze dort, wo kein Bildschirm ist: Toilette, Pausenhof, Abholung.'
    ],
    metaTitle: 'Sag-es-Tafel — die ersten Worte für neue Kinder | Kostenlos',
    metaDescription: 'Kostenlose Bild-Kommunikationstafel für neu zugewanderte Kinder in der Grundschule: Bild antippen, die Klasse hört den Satz laut. Ohne Bewertung.'
  },

  fr: {
    slug: 'tableau-pour-se-faire-comprendre',
    name: 'Le tableau pour se faire comprendre',
    tagline: 'Un enfant sans mots touche une image, et la classe l’entend.',
    about: [
      'Ce tableau donne une voix à un enfant qui vient d’arriver, dès le premier matin. Douze images, douze choses qu’un enfant de cinq ans a vraiment besoin de pouvoir dire — j’ai besoin d’aide, je ne comprends pas, je dois aller aux toilettes, est-ce que je peux jouer aussi — et une touche le dit à voix haute, dans la langue de la classe. Ce n’est pas une leçon de vocabulaire et ce n’est pas une évaluation : c’est un moyen d’être entendu avant d’avoir appris un seul mot de la nouvelle langue.',
      'Les images passent d’abord, et c’est un choix, pas un style. Un dessin se comprend quelle que soit la langue de l’enfant : le tableau sert donc à l’enfant ukrainien, arabophone, turc ou somalien qui arrive en novembre dans une classe française — c’est pour lui qu’il existe. Si sa langue familiale fait partie de nos onze, vous pouvez l’ajouter et chaque carte porte alors deux lignes. C’est un bonus, jamais la condition — et quand elle est là, la langue familiale s’affiche en premier, dans la même taille et la même couleur, parce que la langue d’un enfant n’est pas la plus petite.',
      'Rien n’est mesuré chez l’enfant. Pas de niveau, pas de score, pas de barre de progression, aucun décompte de mots appris — tous les produits de ce domaine en ajoutent un, et c’est précisément la partie nuisible. Le tableau entier est gratuit et le restera, parce que la voix d’un enfant ne se vend pas. Rien n’est enregistré, rien n’est envoyé. L’offre Enseignant n’ajoute que le côté adulte : une carte à imprimer pour la table ou le cordon, pour que les douze phrases suivent l’enfant là où il n’y a pas d’écran.'
    ],
    howToUse: [
      'Ouvrez-le sur l’écran de la classe, ou donnez une tablette à l’enfant. Les douze images sont déjà là — rien à installer, rien à choisir.',
      'L’enfant touche une image. L’appareil dit la phrase entière à voix haute dans la langue de votre classe, calmement, pour que la classe entende la demande et non l’accent.',
      'Si la langue familiale de l’enfant fait partie des onze, touchez une fois « Ajouter la langue de l’enfant ». Chaque carte affiche alors les deux lignes, la langue familiale d’abord.',
      'Laissez-le ouvert sur une tablette à côté de sa table les premières semaines. Il sert le mieux quand personne n’a besoin de le réclamer.',
      'Imprimez la carte (offre Enseignant) pour que les douze phrases aillent au couloir, dans la cour et à la maison.'
    ],
    classroomIdeas: [
      'Montrez le tableau à toute la classe le premier matin et touchez deux ou trois cartes ensemble : il devient une chose commune et non une chose à part.',
      'Confiez la tablette à un camarade pendant la première semaine. Toucher une carte à deux, c’est la conversation la plus simple entre deux enfants qui n’ont aucune langue commune.',
      'Servez-vous-en dans l’autre sens : touchez « Où est-ce que je dois aller ? » et montrez du doigt — le couloir est expliqué sans un mot de langue commune.',
      'Posez la carte imprimée sur la table et glissez-en une seconde dans le cartable. Les phrases comptent surtout là où l’écran n’est pas : les toilettes, la cour, la sortie.'
    ],
    metaTitle: 'Tableau pour se faire comprendre — élève allophone | Gratuit',
    metaDescription: 'Tableau de communication par images pour les élèves allophones en maternelle et élémentaire : l’enfant touche une image, la classe entend la phrase. Sans évaluation.'
  },

  it: {
    slug: 'tavola-per-farsi-capire',
    name: 'La tavola per farsi capire',
    tagline: 'Un bambino senza parole tocca un’immagine, e la classe lo sente.',
    about: [
      'La tavola dà voce a un bambino appena arrivato fin dalla prima mattina. Dodici immagini, dodici cose che un bambino di cinque anni ha davvero bisogno di poter dire — ho bisogno di aiuto, non capisco, devo andare in bagno, posso giocare anch’io — e un tocco le dice ad alta voce, nella lingua dell’aula. Non è insegnamento del lessico e non è una verifica: è un modo per farsi sentire prima di aver imparato una sola parola della lingua nuova.',
      'Le immagini vengono prima, ed è una scelta, non uno stile. Un disegno si capisce qualunque lingua parli il bambino: la tavola serve quindi al bambino ucraino, arabo, turco o somalo che arriva a novembre in una classe italiana — è per lui che esiste. Se la lingua di casa è una delle nostre undici potete aggiungerla, e ogni carta porta allora due righe. È un valore in più, mai la premessa — e quando c’è, la lingua di casa sta per prima, della stessa dimensione e dello stesso colore, perché la lingua di un bambino non è quella più piccola.',
      'Del bambino non si misura nulla. Nessun livello, nessun punteggio, nessuna barra di avanzamento, nessun conteggio delle parole imparate — ogni prodotto di questo settore ne mette uno, ed è proprio la parte dannosa. Tutta la tavola è gratuita e resta gratuita, perché la voce di un bambino non si vende. Non si salva niente e non si invia niente. Il piano Insegnante aggiunge solo il lato dell’adulto: una scheda da stampare per il banco o per il cordino, così le dodici frasi seguono il bambino dove lo schermo non c’è.'
    ],
    howToUse: [
      'Aprila sullo schermo della classe, oppure dai un tablet al bambino. Le dodici immagini sono già lì — niente da impostare, niente da scegliere.',
      'Il bambino tocca un’immagine. Il dispositivo dice la frase intera ad alta voce nella lingua della tua aula, con calma, così la classe sente la richiesta e non l’accento.',
      'Se la lingua di casa è una delle undici, tocca una volta «Aggiungi la lingua del bambino». Ogni carta mostra allora entrambe le righe, prima quella di casa.',
      'Lasciala aperta su un tablet accanto al suo banco nelle prime settimane. Funziona meglio quando nessuno deve chiederla.',
      'Stampa la scheda (piano Insegnante) così le dodici frasi vanno in corridoio, in cortile e a casa.'
    ],
    classroomIdeas: [
      'Mostra la tavola a tutta la classe la prima mattina e toccate due o tre carte insieme: diventa una cosa di tutti e non una cosa a parte.',
      'Affida il tablet a un compagno per la prima settimana. Toccare una carta in due è la conversazione più semplice fra due bambini che non hanno nessuna lingua in comune.',
      'Usala anche al contrario: tocca «Dove devo andare?» e indica — hai spiegato il corridoio senza una parola di lingua comune.',
      'Metti la scheda stampata sul banco e una seconda nello zaino. Le frasi contano soprattutto dove lo schermo non arriva: il bagno, il cortile, l’uscita.'
    ],
    metaTitle: 'Tavola per farsi capire — alunni neoarrivati | Strumento gratis',
    metaDescription: 'Tavola di comunicazione per immagini per alunni neoarrivati nella scuola dell’infanzia e primaria: tocca un’immagine e la classe sente la frase. Senza valutazione.'
  },

  es: {
    slug: 'tablero-para-decirlo',
    name: 'El tablero para decirlo',
    tagline: 'Un niño sin palabras toca una imagen, y el grupo lo escucha.',
    about: [
      'El tablero le da voz a un niño recién llegado desde su primera mañana. Doce imágenes, doce cosas que un niño de cinco años de verdad necesita poder decir — necesito ayuda, no entiendo, necesito ir al baño, ¿puedo jugar yo también? — y un toque las dice en voz alta, en el idioma del aula. No es enseñanza de vocabulario y no es una evaluación: es una manera de que lo escuchen antes de haber aprendido una sola palabra del idioma nuevo.',
      'Las imágenes van primero, y eso es una decisión, no un estilo. Un dibujo se entiende hable el niño el idioma que hable: por eso el tablero sirve para el niño ucraniano, árabe, turco o somalí que llega en noviembre a un aula en español — es para él. Si su lengua familiar es una de nuestras once, puedes añadirla y cada tarjeta lleva entonces dos líneas. Es un extra, nunca la condición — y cuando está, la lengua familiar va arriba, del mismo tamaño y del mismo color, porque el idioma de un niño no es el pequeño.',
      'Del niño no se mide nada. Sin nivel, sin puntuación, sin barra de progreso, sin contar palabras aprendidas — todos los productos de este campo añaden una, y ésa es justamente la parte dañina. Todo el tablero es gratis y seguirá siéndolo, porque la voz de un niño no se vende. No se guarda nada y no se envía nada. El plan Docente añade solo el lado del adulto: una tarjeta para imprimir, para la mesa o para el cordón, así las doce frases acompañan al niño donde no hay pantalla.'
    ],
    howToUse: [
      'Ábrelo en la pantalla del aula, o dale una tableta al niño. Las doce imágenes ya están ahí — nada que configurar, nada que elegir.',
      'El niño toca una imagen. El aparato dice la frase completa en voz alta en el idioma de tu aula, con calma, para que el grupo escuche la petición y no el acento.',
      'Si la lengua familiar del niño es una de las once, toca una vez «Añadir el idioma del niño». Cada tarjeta muestra entonces las dos líneas, primero la de casa.',
      'Déjalo abierto en una tableta junto a su mesa las primeras semanas. Funciona mejor cuando nadie tiene que pedirlo.',
      'Imprime la tarjeta (plan Docente) para que las doce frases vayan al pasillo, al patio y a casa.'
    ],
    classroomIdeas: [
      'Enseña el tablero a todo el grupo la primera mañana y toquen dos o tres tarjetas juntos: así es algo de todos y no algo aparte.',
      'Dale la tableta a un compañero durante la primera semana. Tocar una tarjeta entre dos es la conversación más sencilla entre dos niños que no comparten ningún idioma.',
      'Úsalo también al revés: toca «¿Adónde tengo que ir?» y señala — ya explicaste el pasillo sin una palabra de idioma común.',
      'Pon la tarjeta impresa en la mesa y otra en la mochila. Las frases importan sobre todo donde no hay pantalla: el baño, el patio, la salida.'
    ],
    metaTitle: 'Tablero para decirlo — alumnado recién llegado | Gratis',
    metaDescription: 'Tablero de comunicación con imágenes para alumnado recién llegado en infantil y primaria: toca una imagen y el grupo escucha la frase. Sin evaluación.'
  },

  pt: {
    slug: 'quadro-para-falar',
    name: 'Meu quadro para falar',
    tagline: 'Uma criança sem palavras toca uma imagem, e a turma escuta.',
    about: [
      'O quadro dá voz a uma criança recém-chegada já na primeira manhã. Doze imagens, doze coisas que uma criança de cinco anos realmente precisa conseguir dizer — preciso de ajuda, não entendi, preciso ir ao banheiro, posso brincar também — e um toque diz tudo em voz alta, na língua da sala. Não é ensino de vocabulário e não é avaliação: é um jeito de ser ouvida antes de ter aprendido uma única palavra da língua nova.',
      'As imagens vêm primeiro, e isso é uma decisão, não um estilo. Um desenho é entendido por qualquer criança, seja qual for a língua dela: por isso o quadro serve para a criança ucraniana, árabe, turca ou somali que chega em novembro numa turma em português — é para ela que ele existe. Se a língua de casa for uma das nossas onze, você pode acrescentá-la e cada cartão passa a ter duas linhas. Isso é um extra, nunca a condição — e quando está lá, a língua de casa vem primeiro, do mesmo tamanho e da mesma cor, porque a língua de uma criança não é a menor.',
      'Nada da criança é medido. Sem nível, sem pontuação, sem barra de progresso, sem contagem de palavras aprendidas — todo produto dessa área coloca uma, e é justamente essa a parte que faz mal. O quadro inteiro é gratuito e continua gratuito, porque a voz de uma criança não se vende. Nada é guardado e nada é enviado. O plano Professor acrescenta só o lado do adulto: um cartão para imprimir, para a carteira ou para o cordão, para que as doze frases acompanhem a criança onde não há tela.'
    ],
    howToUse: [
      'Abra na tela da turma, ou entregue um tablet para a criança. As doze imagens já estão lá — nada para configurar, nada para escolher.',
      'A criança toca uma imagem. O aparelho diz a frase inteira em voz alta na língua da sua sala, com calma, para que a turma ouça o pedido e não o sotaque.',
      'Se a língua de casa for uma das onze, toque uma vez em «Adicionar a língua da criança». Cada cartão passa a mostrar as duas linhas, a de casa primeiro.',
      'Deixe aberto num tablet ao lado da carteira dela nas primeiras semanas. Funciona melhor quando ninguém precisa pedir.',
      'Imprima o cartão (plano Professor) para que as doze frases vão para o corredor, o pátio e a casa.'
    ],
    classroomIdeas: [
      'Mostre o quadro para a turma toda na primeira manhã e toquem dois ou três cartões juntos: assim vira coisa de todo mundo e não coisa à parte.',
      'Deixe um colega segurar o tablet na primeira semana. Tocar um cartão a dois é a conversa mais simples possível entre duas crianças que não têm nenhuma língua em comum.',
      'Use também no sentido contrário: toque «Onde eu devo ir?» e aponte — o corredor está explicado sem uma palavra de língua comum.',
      'Ponha o cartão impresso na carteira e outro na mochila. As frases importam mais onde não tem tela: o banheiro, o pátio, a saída.'
    ],
    metaTitle: 'Quadro para falar — crianças recém-chegadas | Ferramenta grátis',
    metaDescription: 'Quadro de comunicação por imagens para crianças recém-chegadas na educação infantil e anos iniciais: toque numa imagem e a turma ouve a frase. Sem avaliação.'
  },

  nl: {
    slug: 'zegbord',
    name: 'Het zegbord',
    tagline: 'Een kind zonder woorden tikt op een plaatje, en de klas hoort het.',
    about: [
      'Het zegbord geeft een pas aangekomen kind meteen op de eerste ochtend een stem. Twaalf plaatjes, twaalf dingen die een vijfjarige echt moet kunnen zeggen — ik heb hulp nodig, ik snap het niet, ik moet naar de wc, mag ik ook meedoen — en één tik zegt het hardop, in de taal van het lokaal. Het is geen woordenschatles en het is geen toets: het is een manier om gehoord te worden voordat er ook maar één woord van de nieuwe taal geleerd is.',
      'De plaatjes gaan voorop, en dat is een keuze, geen stijl. Een tekening begrijpt elk kind, welke taal het ook spreekt. Daarom werkt het bord ook voor het Oekraïense, Arabische, Turkse of Somalische kind dat in november in een Nederlandse klas komt — voor dat kind is het gemaakt. Is de thuistaal een van onze elf, dan kunt u die toevoegen en draagt elke kaart twee regels. Dat is een extraatje, nooit de voorwaarde — en als die er is, staat de thuistaal bovenaan, even groot en in dezelfde kleur, want de eigen taal van een kind is niet de kleinste.',
      'Er wordt niets aan het kind gemeten. Geen niveau, geen score, geen voortgangsbalk, geen telling van geleerde woorden — elk product in dit veld bouwt er een in, en dat is juist het schadelijke deel. Het hele bord is gratis en blijft gratis, want de stem van een kind verkoop je niet. Er wordt niets bewaard en niets verstuurd. Het Leerkracht-pakket voegt alleen de kant van de volwassene toe: een kaart om af te drukken voor de tafel of het koord, zodat de twaalf zinnen meegaan waar geen scherm is.'
    ],
    howToUse: [
      'Open het op het klassenscherm, of geef het kind een tablet. De twaalf plaatjes staan er al — niets in te stellen, niets te kiezen.',
      'Het kind tikt op een plaatje. Het apparaat zegt de hele zin hardop in de taal van uw lokaal, rustig, zodat de klas het verzoek hoort en niet het accent.',
      'Is de thuistaal een van de elf, tik dan één keer op “De taal van het kind toevoegen”. Elke kaart laat dan beide regels zien, de thuistaal eerst.',
      'Laat het de eerste weken openstaan op een tablet naast zijn tafel. Het werkt het best als niemand erom hoeft te vragen.',
      'Druk de kaart af (Leerkracht-pakket) zodat de twaalf zinnen meegaan naar de gang, het plein en naar huis.'
    ],
    classroomIdeas: [
      'Laat het bord op de eerste ochtend aan de hele klas zien en tik samen twee of drie kaarten aan. Dan is het iets van iedereen en niet iets aparts.',
      'Geef het kind de eerste week een maatje dat de tablet vasthoudt. Samen een kaart aantikken is het makkelijkste eerste gesprek tussen twee kinderen zonder gemeenschappelijke taal.',
      'Gebruik het ook andersom: tik “Waar moet ik heen?” aan en wijs — de gang is uitgelegd zonder één woord gedeelde taal.',
      'Leg de afgedrukte kaart op tafel en een tweede in de rugzak. De zinnen tellen het zwaarst waar geen scherm is: de wc, het plein, het ophalen.'
    ],
    metaTitle: 'Zegbord — eerste woorden voor nieuwkomers | Gratis tool',
    metaDescription: 'Gratis communicatiebord met plaatjes voor nieuwkomers in groep 1-4: tik op een plaatje en de klas hoort de zin hardop in de taal van het lokaal. Zonder toetsing.'
  },

  sv: {
    slug: 'sag-det-tavlan',
    name: 'Säg-det-tavlan',
    tagline: 'Ett barn utan ord trycker på en bild, och rummet hör det.',
    about: [
      'Säg-det-tavlan ger ett nyanlänt barn en röst redan första morgonen. Tolv bilder, tolv saker som en femåring verkligen behöver kunna säga — jag behöver hjälp, jag förstår inte, jag behöver gå på toaletten, får jag vara med — och en tryckning säger det högt, på klassrummets språk. Det är ingen ordinlärning och ingen bedömning: det är ett sätt att bli hörd innan ett enda ord av det nya språket är lärt.',
      'Bilderna kommer först, och det är ett beslut, inte en stil. En teckning förstås av varje barn oavsett språk. Därför fungerar tavlan också för det ukrainska, arabisktalande, turkiska eller somaliska barnet som kommer till en svensk klass i november — det är för det barnet den finns. Är hemspråket ett av våra elva kan du lägga till det, och varje kort får då två rader. Det är ett plus, aldrig förutsättningen — och när det finns står hemspråket först, lika stort och i samma färg, för ett barns eget språk är inte det mindre.',
      'Ingenting mäts hos barnet. Ingen nivå, inga poäng, ingen förloppsindikator, ingen räkning av inlärda ord — varje produkt i det här fältet lägger in en, och det är just den skadliga delen. Hela tavlan är gratis och förblir gratis, för ett barns röst säljer man inte. Ingenting sparas och ingenting skickas. Lärarpaketet lägger bara till den vuxnas sida: ett kort att skriva ut till bänken eller nyckelbandet, så att de tolv meningarna följer med dit där ingen skärm finns.'
    ],
    howToUse: [
      'Öppna den på klassens skärm, eller ge barnet en surfplatta. De tolv bilderna finns redan där — inget att ställa in och inget att välja.',
      'Barnet trycker på en bild. Enheten säger hela meningen högt på ditt klassrums språk, lugnt, så att rummet hör frågan och inte brytningen.',
      'Är barnets hemspråk ett av de elva trycker du en gång på ”Lägg till barnets språk”. Varje kort visar då båda raderna, hemspråket först.',
      'Låt den ligga öppen på en surfplatta bredvid bänken de första veckorna. Den gör mest nytta när ingen behöver be om den.',
      'Skriv ut kortet (Lärarpaketet) så att de tolv meningarna följer med till korridoren, skolgården och hem.'
    ],
    classroomIdeas: [
      'Visa tavlan för hela klassen första morgonen och tryck på två eller tre kort tillsammans. Då blir den allas och inte något särskilt.',
      'Låt en kompis hålla surfplattan första veckan. Att trycka på ett kort tillsammans är det enklaste första samtalet mellan två barn utan gemensamt språk.',
      'Använd den också åt andra hållet: tryck på ”Vart ska jag gå?” och peka — korridoren är förklarad utan ett ord gemensamt språk.',
      'Lägg det utskrivna kortet på bänken och ett till i väskan. Meningarna behövs mest där skärmen inte finns: toaletten, skolgården, hämtningen.'
    ],
    metaTitle: 'Säg-det-tavlan — första orden för nyanlända | Gratis verktyg',
    metaDescription: 'Gratis bildkommunikationstavla för nyanlända barn i förskoleklass och lågstadiet: tryck på en bild så hör klassen meningen högt. Ingen bedömning.'
  },

  da: {
    slug: 'sig-det-tavlen',
    name: 'Sig-det-tavlen',
    tagline: 'Et barn uden ord trykker på et billede, og rummet hører det.',
    about: [
      'Sig-det-tavlen giver et nyankommet barn en stemme allerede den første morgen. Tolv billeder, tolv ting en femårig virkelig har brug for at kunne sige — jeg har brug for hjælp, jeg forstår det ikke, jeg skal på toilettet, må jeg være med — og et tryk siger det højt, på klassens sprog. Det er ikke ordindlæring og ikke en test: det er en måde at blive hørt på, før et eneste ord af det nye sprog er lært.',
      'Billederne kommer først, og det er en beslutning, ikke en stil. En tegning forstås af ethvert barn uanset sprog. Derfor virker tavlen også for det ukrainske, arabisktalende, tyrkiske eller somaliske barn, der kommer i en dansk klasse i november — det er det barn, den findes for. Er modersmålet et af vores elleve, kan du tilføje det, og hvert kort får så to linjer. Det er et plus, aldrig forudsætningen — og når det er der, står modersmålet først, lige så stort og i samme farve, for et barns eget sprog er ikke det mindste.',
      'Der måles ikke noget på barnet. Intet niveau, ingen point, ingen fremdriftslinje, ingen optælling af lærte ord — hvert produkt på området lægger en ind, og det er netop den skadelige del. Hele tavlen er gratis og bliver ved med at være det, for et barns stemme sælger man ikke. Intet bliver gemt, og intet bliver sendt. Lærerpakken tilføjer kun den voksnes side: et kort til udskrift til bordet eller snoren, så de tolv sætninger følger med derhen, hvor der ikke er en skærm.'
    ],
    howToUse: [
      'Åbn den på klassens skærm, eller giv barnet en tablet. De tolv billeder er der allerede — intet at indstille og intet at vælge.',
      'Barnet trykker på et billede. Enheden siger hele sætningen højt på din klasses sprog, roligt, så rummet hører spørgsmålet og ikke accenten.',
      'Er barnets modersmål et af de elleve, trykker du én gang på „Tilføj barnets sprog“. Hvert kort viser så begge linjer, modersmålet først.',
      'Lad den stå åben på en tablet ved siden af bordet de første uger. Den gør mest gavn, når ingen skal bede om den.',
      'Udskriv kortet (Lærerpakken), så de tolv sætninger følger med ud på gangen, i skolegården og hjem.'
    ],
    classroomIdeas: [
      'Vis tavlen for hele klassen den første morgen, og tryk på to eller tre kort sammen. Så bliver den alles og ikke noget særligt.',
      'Lad en kammerat holde tabletten den første uge. At trykke på et kort sammen er den letteste første samtale mellem to børn uden fælles sprog.',
      'Brug den også den anden vej: tryk på „Hvor skal jeg hen?“ og peg — gangen er forklaret uden et eneste ord fælles sprog.',
      'Læg det udskrevne kort på bordet og et mere i tasken. Sætningerne betyder mest der, hvor skærmen ikke er: toilettet, skolegården, afhentningen.'
    ],
    metaTitle: 'Sig-det-tavlen — de første ord for nyankomne | Gratis værktøj',
    metaDescription: 'Gratis billedkommunikationstavle til nyankomne børn i børnehaveklassen og indskolingen: tryk på et billede, og klassen hører sætningen højt. Uden bedømmelse.'
  },

  no: {
    slug: 'si-det-tavla',
    name: 'Si-det-tavla',
    tagline: 'Et barn uten ord trykker på et bilde, og rommet hører det.',
    about: [
      'Si-det-tavla gir et nyankommet barn en stemme allerede den første morgenen. Tolv bilder, tolv ting en femåring virkelig trenger å kunne si — jeg trenger hjelp, jeg forstår ikke, jeg må på toalettet, kan jeg være med — og ett trykk sier det høyt, på klasserommets språk. Det er ikke ordinnlæring og ikke en prøve: det er en måte å bli hørt på før et eneste ord av det nye språket er lært.',
      'Bildene kommer først, og det er en beslutning, ikke en stil. En tegning forstås av ethvert barn uansett språk. Derfor virker tavla også for det ukrainske, arabisktalende, tyrkiske eller somaliske barnet som kommer inn i en norsk klasse i november — det er for det barnet den finnes. Er morsmålet ett av våre elleve, kan du legge det til, og hvert kort får da to linjer. Det er et pluss, aldri forutsetningen — og når det er der, står morsmålet først, like stort og i samme farge, for et barns eget språk er ikke det minste.',
      'Ingenting måles hos barnet. Ingen nivåer, ingen poeng, ingen framdriftslinje, ingen telling av lærte ord — hvert produkt på dette feltet legger inn en, og det er nettopp den skadelige delen. Hele tavla er gratis og blir det, for et barns stemme selger man ikke. Ingenting lagres og ingenting sendes. Lærerpakken legger bare til den voksnes side: et kort til utskrift for pulten eller snora, slik at de tolv setningene følger med dit det ikke finnes noen skjerm.'
    ],
    howToUse: [
      'Åpne den på klassens skjerm, eller gi barnet et nettbrett. De tolv bildene er der allerede — ingenting å stille inn og ingenting å velge.',
      'Barnet trykker på et bilde. Enheten sier hele setningen høyt på klasserommets språk, rolig, slik at rommet hører spørsmålet og ikke aksenten.',
      'Er barnets morsmål ett av de elleve, trykker du én gang på «Legg til barnets språk». Hvert kort viser da begge linjene, morsmålet først.',
      'La den stå åpen på et nettbrett ved siden av pulten de første ukene. Den gjør mest nytte når ingen må be om den.',
      'Skriv ut kortet (Lærerpakken), slik at de tolv setningene blir med ut i gangen, på skolegården og hjem.'
    ],
    classroomIdeas: [
      'Vis tavla for hele klassen den første morgenen, og trykk på to eller tre kort sammen. Da blir den alles og ikke noe eget.',
      'La en venn holde nettbrettet den første uka. Å trykke på et kort sammen er den enkleste første samtalen mellom to barn uten felles språk.',
      'Bruk den også andre veien: trykk på «Hvor skal jeg gå?» og pek — gangen er forklart uten et eneste ord felles språk.',
      'Legg det utskrevne kortet på pulten og ett til i sekken. Setningene betyr mest der skjermen ikke er: toalettet, skolegården, henting.'
    ],
    metaTitle: 'Si-det-tavla — de første ordene for nyankomne | Gratis verktøy',
    metaDescription: 'Gratis bildekommunikasjonstavle for nyankomne barn på 1.-3. trinn: trykk på et bilde, og klassen hører setningen høyt. Uten vurdering.'
  },

  fi: {
    slug: 'sanomistaulu',
    name: 'Sanomistaulu',
    tagline: 'Lapsi, jolla ei vielä ole sanoja, napauttaa kuvaa — ja luokka kuulee.',
    about: [
      'Sanomistaulu antaa juuri saapuneelle lapselle äänen heti ensimmäisenä aamuna. Kaksitoista kuvaa, kaksitoista asiaa jotka viisivuotiaan on todella pystyttävä sanomaan — tarvitsen apua, en ymmärrä, minun pitää päästä vessaan, saanko minäkin leikkiä — ja yksi napautus sanoo sen ääneen luokan kielellä. Tämä ei ole sanaston opettamista eikä arviointia: tämä on tapa tulla kuulluksi ennen kuin yhtäkään uuden kielen sanaa on opittu.',
      'Kuvat tulevat ensin, ja se on päätös eikä tyyli. Piirroksen ymmärtää jokainen lapsi kielestä riippumatta. Siksi taulu toimii myös ukrainalaiselle, arabiankieliselle, turkkilaiselle tai somalialaiselle lapselle, joka tulee suomalaiseen luokkaan marraskuussa — juuri sitä lasta varten se on. Jos kotikieli on yksi meidän yhdestätoista, voit lisätä sen, ja jokaisessa kortissa on silloin kaksi riviä. Se on lisä, ei koskaan ehto — ja kun se on mukana, kotikieli tulee ensin, samankokoisena ja samanvärisenä, sillä lapsen oma kieli ei ole se pienempi.',
      'Lapsesta ei mitata mitään. Ei tasoa, ei pisteitä, ei edistymispalkkia, ei laskuria opituista sanoista — jokainen tämän alan tuote lisää sellaisen, ja juuri se on se vahingollinen osa. Koko taulu on maksuton ja pysyy maksuttomana, sillä lapsen ääntä ei myydä. Mitään ei tallenneta eikä lähetetä. Opettaja-tilaus lisää vain aikuisen puolen: tulostettavan kortin pulpetille tai kaulanauhaan, jotta ne kaksitoista lausetta kulkevat mukana sielläkin, missä näyttöä ei ole.'
    ],
    howToUse: [
      'Avaa se luokan näytölle tai anna lapselle tabletti. Kaksitoista kuvaa ovat jo valmiina — mitään ei tarvitse asettaa eikä valita.',
      'Lapsi napauttaa kuvaa. Laite sanoo koko lauseen ääneen luokkasi kielellä, rauhallisesti, jotta luokka kuulee pyynnön eikä korostusta.',
      'Jos lapsen kotikieli on yksi näistä yhdestätoista, napauta kerran ”Lisää lapsen kieli”. Jokaisessa kortissa näkyy silloin molemmat rivit, kotikieli ensin.',
      'Pidä se ensimmäisinä viikkoina auki tabletilla lapsen pulpetin vieressä. Se auttaa eniten silloin, kun kenenkään ei tarvitse pyytää sitä.',
      'Tulosta kortti (Opettaja-tilaus), niin ne kaksitoista lausetta kulkevat mukana käytävälle, pihalle ja kotiin.'
    ],
    classroomIdeas: [
      'Näytä taulu koko luokalle ensimmäisenä aamuna ja napauttakaa yhdessä kahta tai kolmea korttia. Silloin se on kaikkien yhteinen eikä mikään erityisjärjestely.',
      'Anna kaverin pitää tablettia ensimmäisen viikon. Kortin napauttaminen yhdessä on helpoin ensimmäinen keskustelu kahden lapsen välillä, joilla ei ole yhteistä kieltä.',
      'Käytä sitä myös toisin päin: napauta ”Minne minun pitää mennä?” ja osoita — käytävä on selitetty ilman sanaakaan yhteistä kieltä.',
      'Laita tulostettu kortti pulpetille ja toinen reppuun. Lauseita tarvitaan eniten siellä, missä näyttöä ei ole: vessassa, pihalla, hakutilanteessa.'
    ],
    metaTitle: 'Sanomistaulu — ensimmäiset sanat vasta saapuneelle | Maksuton',
    metaDescription: 'Maksuton kuvakommunikaatiotaulu vasta maahan tulleille lapsille esi- ja alkuopetuksessa: napauta kuvaa, luokka kuulee lauseen ääneen. Ei arviointia.'
  }
};

const LOCALES = Object.keys(E);

/* ---------------- 1. the eleven tool-content JSON files ---------------- */
let touched = 0;
for (const loc of LOCALES) {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', `${loc}.json`);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  /* rebuild so the entry lands immediately BEFORE "labels" (house order) */
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out[KEY] = E[loc];
    if (k !== KEY) out[k] = j[k];
  }
  if (!out[KEY]) out[KEY] = E[loc];
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + '\n', 'utf8');
  touched++;
}
console.log(`tool-content: ${touched}/11 written`);

/* ---------------- 2. the MANIPULATIVES entry ---------------- */
const mp = path.join(ROOT, 'frontend', 'lib', 'manipulatives.ts');
let m = fs.readFileSync(mp, 'utf8');
if (m.includes(`id: "${KEY}"`)) {
  console.log('manipulatives: entry already present — left alone');
} else {
  const field = (name, pick) => `    ${name}: {\n` +
    LOCALES.map((l) => `      ${l}: ${JSON.stringify(pick(E[l]))},`).join('\n') + '\n    },';
  const entry = [
    '  {',
    `    id: "${KEY}",`,
    `    mini_tool_url: "/mini-tools/${KEY}.html",`,
    field('title', (e) => e.name),
    field('tagline', (e) => e.tagline),
    /* description IS about.join(' ') — never authored separately */
    field('description', (e) => e.about.join(' ')),
    '  },',
    '];'
  ].join('\n');
  const at = m.lastIndexOf('\n];');
  if (at === -1) { console.error('manipulatives: could not find the array terminator'); process.exit(1); }
  m = m.slice(0, at + 1) + entry + m.slice(at + 3);
  fs.writeFileSync(mp, m, 'utf8');
  console.log('manipulatives: entry appended');
}
