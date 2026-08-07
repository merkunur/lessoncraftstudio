#!/usr/bin/env node
/* =====================================================================
   rewrite-say-it-board-landing.js — make the landing copy true again.
   ---------------------------------------------------------------------
   ⚠⚠ THE SHIPPED COPY BECAME FALSE THE MOMENT THE TOOL WAS REBUILT, in
   all eleven locales at once. It said:

     · "Twelve pictures, twelve things a five-year-old genuinely needs
        to be able to say"          — it is sixty-eight now, in six groups
     · "Print the card (Teacher plan)"
                                    — the lanyard cards are FREE now;
                                      gating them would gate the child's
                                      voice, which is the one thing this
                                      tool refuses to sell
     · nothing at all about the teacher adding her own phrases, which is
       the feature the v2 header ALREADY PROMISED and never built

   Marketing copy that overstates is a familiar defect. Copy that
   UNDERSTATES a free thing is the same defect wearing a friendlier
   face: a teacher who reads "Print the card (Teacher plan)" and has no
   plan will not click it, and the card she needed was free.

   ⭐ THE RULE THIS ENFORCES: the landing page describes what the code
   does, and the check for that is to read the MODEL, not the copy. The
   sibling tool records a paywall sentence that sold something
   `_saveStore` already gave away, found by a native panel doing exactly
   that.

   ⚠ THIS IS A SURGICAL REWRITE, NOT A RE-AUTHORING. It replaces the
   sentences that are now FALSE and leaves the ones that are still true
   — the thesis, the icon-first argument, the no-assessment paragraph —
   exactly as the native ensembles left them. Rewriting correct prose to
   make a diff tidy is how a locale silently loses a native pass.

   Run:  node scripts/rewrite-say-it-board-landing.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.indexOf('--dry-run') >= 0;
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* about[0] — the opening paragraph, which carried the count.
   about[2] — the free/paid paragraph, which carried the print claim.
   howToUse[0] / howToUse[4] — the same two facts, as steps.
   PLUS a new howToUse step for the teacher's own phrases. */
const COPY = {
  en: {
    a0: 'Say It Board gives a newly arrived child a voice on their first morning. Sixty-eight pictures in six small groups — and the eight that matter most stay on the screen at all times, in the same place, whatever else is showing. Yes. No. I need help. I don’t understand. I need the toilet. Stop. Please look at me. I have finished. One tap says it out loud, in the language of the room. It is not vocabulary teaching and it is not a test; it is a way to be heard on day one, before a single word of the new language has been learned.',
    a2: 'Nothing about the child is measured. There is no level, no score, no progress bar, and no record of which cards were pressed — every product in this space keeps one, and it is the harmful part. The board is free and stays free, and so are the cut-out cards for a lanyard, because a child’s voice is not something to sell and the printed card is simply the board on paper for the corridor and the playground. The Teacher plan adds the teacher’s side: the wall poster, the two-way sheet for the family, and keeping more than three of your own phrases.',
    h0: 'Open it on the class screen, or hand a tablet to the child. The eight most urgent cards are already there and never move; the six groups below hold the rest.',
    h4: 'Print the cut-out cards free, so the phrases go with the child to the corridor, the playground and home.',
    h5: 'Tap “For the teacher” to add a phrase this class needs — pick an opening, finish it in the child’s voice, choose a picture. Three are free to keep.',
    md: 'Free picture communication board for newly arrived K-3 children: 68 phrases in your classroom language, tap to hear them aloud, add your own. No assessment, no tracking.'
  },
  de: {
    a0: 'Die Sag-es-Tafel gibt einem neu angekommenen Kind schon am ersten Morgen eine Stimme. Achtundsechzig Bilder in sechs kleinen Gruppen — und die acht wichtigsten bleiben immer sichtbar, immer an derselben Stelle. Ja. Nein. Ich brauche Hilfe. Ich verstehe das nicht. Ich muss auf die Toilette. Halt. Schau mich bitte an. Ich bin fertig. Ein Tippen sagt es laut, in der Sprache des Klassenzimmers. Das ist kein Wortschatztraining und kein Test, sondern ein Weg, am ersten Tag gehört zu werden — bevor ein einziges Wort der neuen Sprache gelernt ist.',
    a2: 'Über das Kind wird nichts gemessen. Es gibt kein Niveau, keine Punkte, keinen Fortschrittsbalken und keine Aufzeichnung darüber, welche Karten gedrückt wurden — jedes Produkt in diesem Bereich führt so etwas, und genau das ist der schädliche Teil. Die Tafel ist kostenlos und bleibt es, und die Karten zum Ausschneiden für das Band ebenso: Die Stimme eines Kindes verkauft man nicht, und die gedruckte Karte ist nur die Tafel auf Papier — für den Flur und den Pausenhof. Das Lehrer-Paket ergänzt die Seite der Lehrkraft: das Wandposter, den Bogen für die Familie und mehr als drei eigene Sätze zu behalten.',
    h0: 'Öffne sie am Klassenbildschirm oder gib dem Kind ein Tablet. Die acht dringendsten Karten sind schon da und wandern nie; die sechs Gruppen darunter enthalten den Rest.',
    h4: 'Drucke die Karten zum Ausschneiden kostenlos aus, damit die Sätze mit dem Kind in den Flur, auf den Pausenhof und nach Hause gehen.',
    h5: 'Tippe auf „Für die Lehrkraft“, um einen Satz hinzuzufügen, den diese Klasse braucht — Anfang wählen, aus Sicht des Kindes vervollständigen, Bild auswählen. Drei darfst du kostenlos behalten.',
    md: 'Kostenlose Bild-Kommunikationstafel für neu angekommene Kinder: 68 Sätze in der Sprache deiner Klasse, antippen und laut hören, eigene ergänzen. Ohne Bewertung.'
  },
  fr: {
    a0: 'Le tableau donne une voix à un enfant qui vient d’arriver, dès le premier matin. Soixante-huit images réparties en six petits groupes — et les huit plus importantes restent affichées en permanence, toujours au même endroit. Oui. Non. J’ai besoin d’aide. Je ne comprends pas. Je dois aller aux toilettes. Arrête. Regarde-moi, s’il te plaît. J’ai fini. Une touche et la phrase est dite à voix haute, dans la langue de la classe. Ce n’est ni du vocabulaire ni une évaluation : c’est un moyen d’être entendu dès le premier jour, avant d’avoir appris un seul mot de la nouvelle langue.',
    a2: 'Rien n’est mesuré au sujet de l’enfant. Pas de niveau, pas de score, pas de barre de progression, et aucune trace des cartes touchées — tous les produits de ce domaine en gardent une, et c’est précisément la partie nuisible. Le tableau est gratuit et le reste, tout comme les cartes à découper pour un cordon : la voix d’un enfant ne se vend pas, et la carte imprimée n’est que le tableau sur papier, pour le couloir et la cour. L’offre Enseignant ajoute le côté de l’adulte : l’affiche murale, la feuille aller-retour pour la famille, et la possibilité de garder plus de trois phrases à vous.',
    h0: 'Ouvre-le sur l’écran de la classe, ou donne une tablette à l’enfant. Les huit cartes les plus urgentes sont déjà là et ne bougent jamais ; les six groupes en dessous contiennent le reste.',
    h4: 'Imprime gratuitement les cartes à découper, pour que les phrases suivent l’enfant dans le couloir, dans la cour et à la maison.',
    h5: 'Touche « Pour l’enseignant » pour ajouter une phrase dont cette classe a besoin — choisis un début, complète-le à la voix de l’enfant, choisis une image. Trois sont gratuites à garder.',
    md: 'Tableau de communication par images gratuit pour les enfants qui viennent d’arriver : 68 phrases dans la langue de la classe, dites à voix haute, plus les vôtres.'
  },
  it: {
    a0: 'La tavola dà voce a un bambino appena arrivato fin dalla prima mattina. Sessantotto immagini in sei piccoli gruppi — e le otto più importanti restano sempre sullo schermo, sempre nello stesso posto. Sì. No. Ho bisogno di aiuto. Non capisco. Devo andare in bagno. Basta. Guardami, per favore. Ho finito. Un tocco e la frase viene detta ad alta voce, nella lingua dell’aula. Non è insegnamento del lessico e non è una verifica: è un modo per farsi sentire il primo giorno, prima di aver imparato una sola parola della lingua nuova.',
    a2: 'Sul bambino non si misura nulla. Nessun livello, nessun punteggio, nessuna barra di avanzamento e nessuna traccia di quali schede siano state toccate — ogni prodotto in questo campo ne tiene una, ed è proprio la parte dannosa. La tavola è gratuita e resta tale, e così i cartellini da ritagliare per il collo: la voce di un bambino non si vende, e il cartellino stampato è solo la tavola su carta, per il corridoio e il cortile. Il piano Insegnante aggiunge il lato dell’adulto: il poster da parete, il foglio di andata e ritorno per la famiglia e la possibilità di tenere più di tre frasi tue.',
    h0: 'Aprila sullo schermo della classe, o dai un tablet al bambino. Le otto schede più urgenti sono già lì e non si spostano mai; i sei gruppi sotto contengono le altre.',
    h4: 'Stampa gratuitamente i cartellini da ritagliare, così le frasi seguono il bambino in corridoio, in cortile e a casa.',
    h5: 'Tocca «Per l’insegnante» per aggiungere una frase che serve a questa classe — scegli un inizio, completalo con la voce del bambino, scegli un’immagine. Tre si tengono gratis.',
    md: 'Tavola di comunicazione per immagini gratuita per bambini appena arrivati: 68 frasi nella lingua dell’aula, dette ad alta voce, più le tue. Nessuna valutazione.'
  },
  es: {
    a0: 'El tablero le da voz a un niño recién llegado desde la primera mañana. Sesenta y ocho imágenes en seis grupos pequeños — y las ocho más importantes se quedan siempre en pantalla, siempre en el mismo sitio. Sí. No. Necesito ayuda. No entiendo. Necesito ir al baño. Para. Mírame, por favor. Ya terminé. Un toque y la frase suena en voz alta, en el idioma del aula. No es enseñanza de vocabulario ni una prueba: es una forma de ser escuchado el primer día, antes de haber aprendido una sola palabra del idioma nuevo.',
    a2: 'No se mide nada sobre el niño. No hay nivel, ni puntuación, ni barra de progreso, ni registro de qué tarjetas se han tocado — todos los productos de este campo llevan uno, y esa es justamente la parte dañina. El tablero es gratis y seguirá siéndolo, y también las tarjetas recortables para el cordón: la voz de un niño no se vende, y la tarjeta impresa es simplemente el tablero en papel, para el pasillo y el patio. El plan Docente añade el lado del adulto: el póster de pared, la hoja de ida y vuelta para la familia, y guardar más de tres frases tuyas.',
    h0: 'Ábrelo en la pantalla de la clase, o dale una tableta al niño. Las ocho tarjetas más urgentes ya están ahí y no se mueven nunca; los seis grupos de abajo tienen el resto.',
    h4: 'Imprime gratis las tarjetas recortables, para que las frases acompañen al niño al pasillo, al patio y a casa.',
    h5: 'Toca «Para el docente» para añadir una frase que esta clase necesita — elige un comienzo, complétalo con la voz del niño, elige una imagen. Tres se guardan gratis.',
    md: 'Tablero de comunicación por imágenes gratuito para niños recién llegados: 68 frases en el idioma del aula, en voz alta, y las tuyas propias. Sin evaluación.'
  },
  pt: {
    a0: 'O quadro dá voz a uma criança recém-chegada logo na primeira manhã. Sessenta e oito imagens em seis grupos pequenos — e as oito mais importantes ficam sempre na tela, sempre no mesmo lugar. Sim. Não. Preciso de ajuda. Não entendi. Preciso ir ao banheiro. Pare. Olhe para mim, por favor. Já terminei. Um toque e a frase é dita em voz alta, na língua da sala. Não é ensino de vocabulário nem é um teste: é um jeito de ser ouvido no primeiro dia, antes de ter aprendido uma única palavra da língua nova.',
    a2: 'Nada é medido sobre a criança. Não há nível, nem pontuação, nem barra de progresso, nem registro de quais cartões foram tocados — todo produto nessa área guarda um, e é justamente a parte que faz mal. O quadro é gratuito e continua sendo, e os cartões de recortar para o cordão também: a voz de uma criança não se vende, e o cartão impresso é só o quadro no papel, para o corredor e o pátio. O plano Professor acrescenta o lado do adulto: o cartaz de parede, a folha de ida e volta para a família e guardar mais de três frases suas.',
    h0: 'Abra na tela da turma, ou entregue um tablet à criança. Os oito cartões mais urgentes já estão ali e nunca mudam de lugar; os seis grupos abaixo trazem o resto.',
    h4: 'Imprima de graça os cartões de recortar, para que as frases acompanhem a criança ao corredor, ao pátio e para casa.',
    h5: 'Toque em “Para o professor” para acrescentar uma frase de que esta turma precisa — escolha um começo, complete na voz da criança, escolha uma imagem. Três são grátis de guardar.',
    md: 'Quadro de comunicação por imagens gratuito para crianças recém-chegadas: 68 frases na língua da sala, ditas em voz alta, mais as suas. Sem avaliação.'
  },
  nl: {
    a0: 'Het zegbord geeft een pas aangekomen kind al op de eerste ochtend een stem. Achtenzestig plaatjes in zes kleine groepen — en de acht belangrijkste blijven altijd in beeld, altijd op dezelfde plek. Ja. Nee. Ik heb hulp nodig. Ik snap het niet. Ik moet naar de wc. Stop. Kijk alsjeblieft naar mij. Ik ben klaar. Eén tik en de zin klinkt hardop, in de taal van het lokaal. Het is geen woordenschatles en geen toets: het is een manier om op dag één gehoord te worden, nog voor één woord van de nieuwe taal geleerd is.',
    a2: 'Er wordt niets over het kind gemeten. Geen niveau, geen score, geen voortgangsbalk en geen registratie van welke kaarten zijn aangetikt — elk product in dit veld houdt er een bij, en dat is juist het schadelijke deel. Het bord is gratis en blijft dat, en de uitknipkaartjes voor een koord ook: de stem van een kind verkoop je niet, en het gedrukte kaartje is gewoon het bord op papier, voor de gang en het schoolplein. Het Leerkracht-pakket voegt de kant van de volwassene toe: de wandposter, het heen-en-weerblad voor het gezin, en meer dan drie eigen zinnen bewaren.',
    h0: 'Open het op het klassenscherm, of geef het kind een tablet. De acht dringendste kaarten staan er al en verschuiven nooit; de zes groepen eronder bevatten de rest.',
    h4: 'Druk de uitknipkaartjes gratis af, zodat de zinnen met het kind meegaan naar de gang, het plein en naar huis.',
    h5: 'Tik op “Voor de leerkracht” om een zin toe te voegen die deze klas nodig heeft — kies een begin, maak het af in de stem van het kind, kies een plaatje. Drie zijn gratis te bewaren.',
    md: 'Gratis picto-communicatiebord voor pas aangekomen kinderen: 68 zinnen in de taal van je lokaal, hardop te horen, plus je eigen zinnen. Geen toetsing.'
  },
  sv: {
    a0: 'Säg-det-tavlan ger ett nyanlänt barn en röst redan första morgonen. Sextioåtta bilder i sex små grupper — och de åtta viktigaste ligger alltid kvar på skärmen, alltid på samma plats. Ja. Nej. Jag behöver hjälp. Jag förstår inte. Jag behöver gå på toaletten. Sluta. Titta på mig, tack. Jag är klar. Ett tryck och meningen sägs högt, på klassrummets språk. Det är varken ordinlärning eller ett prov: det är ett sätt att bli hörd redan dag ett, innan ett enda ord av det nya språket är inlärt.',
    a2: 'Ingenting mäts om barnet. Ingen nivå, inga poäng, ingen förloppsmätare och ingen notering om vilka kort som tryckts — varje produkt på det här området för en sådan, och det är just den skadliga delen. Tavlan är gratis och förblir det, och klippkorten till nyckelbandet likaså: ett barns röst säljer man inte, och det utskrivna kortet är bara tavlan på papper, för korridoren och skolgården. Lärarpaketet lägger till den vuxnas sida: väggaffischen, fram-och-tillbaka-bladet till familjen, och att spara fler än tre egna fraser.',
    h0: 'Öppna den på klassens skärm, eller ge barnet en surfplatta. De åtta mest akuta korten finns redan där och flyttar sig aldrig; de sex grupperna under rymmer resten.',
    h4: 'Skriv ut klippkorten gratis, så att fraserna följer med barnet ut i korridoren, på skolgården och hem.',
    h5: 'Tryck på ”För läraren” för att lägga till en fras klassen behöver — välj en början, avsluta den med barnets röst, välj en bild. Tre får sparas gratis.',
    md: 'Gratis bildkommunikationstavla för nyanlända barn: 68 fraser på klassrummets språk, upplästa högt, plus dina egna. Ingen bedömning.'
  },
  da: {
    a0: 'Sig-det-tavlen giver et nyankommet barn en stemme allerede den første morgen. Otteogtres billeder i seks små grupper — og de otte vigtigste bliver liggende på skærmen hele tiden, altid samme sted. Ja. Nej. Jeg har brug for hjælp. Jeg forstår det ikke. Jeg skal på toilettet. Stop. Se på mig, tak. Jeg er færdig. Et tryk, og sætningen siges højt, på klassens sprog. Det er hverken ordforrådsundervisning eller en prøve: det er en måde at blive hørt på dag ét, før et eneste ord af det nye sprog er lært.',
    a2: 'Der måles intet om barnet. Ingen niveau, ingen point, ingen fremskridtslinje og ingen registrering af, hvilke kort der er trykket på — alle produkter på området fører en, og det er netop den skadelige del. Tavlen er gratis og bliver ved med at være det, og klippekortene til nøglesnoren ligeså: et barns stemme sælger man ikke, og det printede kort er bare tavlen på papir, til gangen og skolegården. Lærerpakken tilføjer den voksnes side: vægplakaten, frem-og-tilbage-arket til familien, og at gemme mere end tre egne sætninger.',
    h0: 'Åbn den på klassens skærm, eller giv barnet en tablet. De otte mest akutte kort er der allerede og flytter sig aldrig; de seks grupper nedenunder rummer resten.',
    h4: 'Print klippekortene gratis, så sætningerne følger med barnet ud på gangen, i skolegården og hjem.',
    h5: 'Tryk på “Til læreren” for at tilføje en sætning, klassen har brug for — vælg en begyndelse, gør den færdig med barnets stemme, vælg et billede. Tre må gemmes gratis.',
    md: 'Gratis billedkommunikationstavle til nyankomne børn: 68 sætninger på klassens sprog, læst højt, plus dine egne. Ingen bedømmelse.'
  },
  no: {
    a0: 'Si-det-tavla gir et nyankommet barn en stemme allerede den første morgenen. Sekstiåtte bilder i seks små grupper — og de åtte viktigste blir liggende på skjermen hele tiden, alltid på samme sted. Ja. Nei. Jeg trenger hjelp. Jeg forstår ikke. Jeg må på toalettet. Stopp. Se på meg, takk. Jeg er ferdig. Ett trykk, og setningen sies høyt, på klasserommets språk. Det er verken ordlæring eller en prøve: det er en måte å bli hørt på dag én, før et eneste ord av det nye språket er lært.',
    a2: 'Ingenting måles om barnet. Ingen nivå, ingen poeng, ingen framdriftslinje og ingen registrering av hvilke kort som er trykket på — alle produkter på området fører en, og det er nettopp den skadelige delen. Tavla er gratis og forblir det, og klippekortene til nøkkelbåndet likeså: et barns stemme selger man ikke, og det utskrevne kortet er bare tavla på papir, til gangen og skolegården. Lærerpakken legger til den voksnes side: veggplakaten, fram-og-tilbake-arket til familien, og å beholde mer enn tre egne setninger.',
    h0: 'Åpne den på klassens skjerm, eller gi barnet et nettbrett. De åtte mest akutte kortene er der allerede og flytter seg aldri; de seks gruppene under rommer resten.',
    h4: 'Skriv ut klippekortene gratis, så setningene følger med barnet ut i gangen, på skolegården og hjem.',
    h5: 'Trykk på «For læreren» for å legge til en setning klassen trenger — velg en begynnelse, fullfør den med barnets stemme, velg et bilde. Tre kan beholdes gratis.',
    md: 'Gratis bildekommunikasjonstavle for nyankomne barn: 68 setninger på klasserommets språk, lest høyt, pluss dine egne. Ingen vurdering.'
  },
  fi: {
    a0: 'Sanomistaulu antaa juuri saapuneelle lapselle äänen heti ensimmäisenä aamuna. Kuusikymmentäkahdeksan kuvaa kuudessa pienessä ryhmässä — ja kahdeksan tärkeintä pysyvät koko ajan näytöllä, aina samassa paikassa. Kyllä. Ei. Tarvitsen apua. En ymmärrä. Minun pitää päästä vessaan. Lopeta. Katso minua, kiitos. Olen valmis. Yksi napautus, ja lause sanotaan ääneen luokan kielellä. Tämä ei ole sanaston opetusta eikä koe: se on tapa tulla kuulluksi ensimmäisenä päivänä, ennen kuin yhtäkään uuden kielen sanaa on opittu.',
    a2: 'Lapsesta ei mitata mitään. Ei tasoa, ei pisteitä, ei edistymispalkkia eikä merkintää siitä, mitä kortteja on painettu — jokainen tämän alan tuote pitää sellaista, ja juuri se on haitallinen osa. Taulu on ilmainen ja pysyy sellaisena, ja niin pysyvät leikattavat kaulanauhakortitkin: lapsen ääntä ei myydä, ja tulostettu kortti on vain taulu paperilla — käytävää ja välituntipihaa varten. Opettaja-tilaus lisää aikuisen puolen: seinäjulisteen, perheen kanssa molempiin suuntiin kulkevan lomakkeen ja mahdollisuuden säilyttää yli kolme omaa lausetta.',
    h0: 'Avaa se luokan näytölle tai anna lapselle tabletti. Kahdeksan kiireellisintä korttia ovat jo siinä eivätkä siirry koskaan; alla olevat kuusi ryhmää sisältävät loput.',
    h4: 'Tulosta leikattavat kortit ilmaiseksi, niin lauseet kulkevat lapsen mukana käytävään, pihalle ja kotiin.',
    h5: 'Napauta ”Opettajalle” lisätäksesi lauseen, jota tämä luokka tarvitsee — valitse aloitus, täydennä se lapsen äänellä, valitse kuva. Kolme saa säilyttää ilmaiseksi.',
    md: 'Ilmainen kuvakommunikaatiotaulu vasta saapuneille lapsille: 68 lausetta luokan kielellä, ääneen sanottuna, sekä omat lauseesi. Ei arviointia.'
  }
};

let changed = 0, problems = 0;
ALL.forEach((loc) => {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', loc + '.json');
  const raw = fs.readFileSync(p, 'utf8');
  const doc = JSON.parse(raw);
  const e = doc['home-language-bridge'];
  if (!e) { console.error(`  ERROR ${loc}: no entry`); problems++; return; }
  const c = COPY[loc];
  if (!c) { console.error(`  ERROR ${loc}: no replacement copy authored`); problems++; return; }

  /* ⚠ NON-VACUITY: refuse to write if the shape is not what we expect,
     rather than quietly appending to something else. */
  if (!Array.isArray(e.about) || e.about.length !== 3 || !Array.isArray(e.howToUse) || e.howToUse.length < 5) {
    console.error(`  ERROR ${loc}: unexpected shape (about ${e.about && e.about.length}, howToUse ${e.howToUse && e.howToUse.length}) — refusing`);
    problems++; return;
  }

  e.about[0] = c.a0;
  e.about[2] = c.a2;
  e.howToUse[0] = c.h0;
  e.howToUse[4] = c.h4;
  if (e.howToUse.length === 5) e.howToUse.push(c.h5); else e.howToUse[5] = c.h5;
  e.metaDescription = c.md;

  if (!DRY) fs.writeFileSync(p, JSON.stringify(doc, null, 2) + '\n', 'utf8');
  changed++;
});

/* ⚠ AND VERIFY THE CLAIM IS ACTUALLY GONE, in every locale. A rewrite
   that reports success while the false sentence survives is the whole
   class of defect this script exists to fix. */
/* ⚠ WORD-BOUNDED, AND THAT MATTERS: the first version of this check
   used a bare alternation and fired on `es`, because "doce" (twelve)
   is a substring of "Docente" — the SPANISH NAME OF THE PLAN, in a
   sentence I had just written correctly. That is the ban-too-wide trap
   for the seventh time in this build, this time inside my own
   verification rather than a content gate.
   ⚠ `\b` is ASCII-only and would break on "zwölf"; the lookaround form
   works on any script. */
const TWELVE = /(?<!\p{L})(?:twelve|zwölf|douze|dodici|doce|doze|twaalf|tolv|kaksitoista)(?!\p{L})/iu;
const STILL = [];
ALL.forEach((loc) => {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', loc + '.json');
  const s = JSON.stringify(JSON.parse(fs.readFileSync(p, 'utf8'))['home-language-bridge']);
  if (TWELVE.test(s)) STILL.push(loc);
});
/* and a must-fire control, so the check cannot quietly stop working */
if (!TWELVE.test('Twelve pictures')) { console.error('  ERROR the twelve-check cannot fire — it is not a check'); problems++; }
if (TWELVE.test('el plan Docente')) { console.error('  ERROR the twelve-check condemns correct Spanish'); problems++; }

console.log('');
console.log(`  ${changed}/${ALL.length} locales rewritten${DRY ? ' (dry run — nothing written)' : ''}`);
if (STILL.length && !DRY) { console.error(`  ERROR the "twelve" claim survives in: ${STILL.join(', ')}`); problems++; }
else if (!DRY) console.log('  the twelve-pictures claim is gone from all eleven');
process.exit(problems ? 1 : 0);
