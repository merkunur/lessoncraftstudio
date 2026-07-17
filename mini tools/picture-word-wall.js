/* =====================================================================
   Picture Word Wall — premium teacher tool #12 (the vocabulary flagship).
   A browsable wall of ~1,495 illustrated nouns across 50 themes. Tap a
   card: it flips large, SPEAKS THE WORD WITH ITS ARTICLE, and a toggle
   multiplies the illustration singular→plural. Gender locales colour a
   6px top rail by article (der teal / die coral / das honey) — and the
   PLURAL takes a fourth gold rail, so the child SEES that plural erases
   gender (der Hund → die Hunde). Premium: all themes, pinned walls,
   whisper mode (a word is spoken, the child finds the card, a firefly
   lands on it — no timer, no score, every round ends in success).

   THE ARTICLE TABLE BELOW IS THE MOAT'S ENGINE AND IS OURS.
   `DEFINITE_ARTICLES` in REFERENCE TRANSLATIONS/image-vocabulary.js is
   DATIVE German (de:{m:'dem',f:'der',n:'dem'} — built for the
   Prepositions app; its own comment says so), so defArticle('cat','de')
   returns "der" for a FEMININE noun. Never call it from here.

   Per-locale FORM is a pedagogical ruling, not a default:
     de  der/die/das   nominative definite — the Grundschule convention
     nl  de/het        definite: Dutch gender IS "de-woord / het-woord"
     sv  en/ett        INDEFINITE — the definite is a SUFFIX (katten);
     da  en/et         "den katt" is marked/wrong. Gender lives only in
     no  en/et         the indefinite. (no data has ZERO feminines.)
     es  el/la         definite is standard and unambiguous
     pt  o/a
     fr  un/une        INDEFINITE — le/la ELIDE to l' before vowels
     it  un/una        (l'arbre, l'albero) = zero gender signal exactly
                       where children need it; also dodges lo/gli.
     en, fi            no article — rendered frameless (see the wall).
   Gender codes are per-locale and MUST NOT be cross-applied (§A.13.58):
   sv/da `n` = COMMON (en-word), `t` = neuter (ett) — the OPPOSITE of
   de's `n` = neuter. nl d=de/h=het. no m/n only.

   Cards in colors/emotions/activities carry `na:1` in the index: the
   vocabulary gives them FABRICATED genders (red→["Rot","Rot","m"]) that
   were invented for Find-and-Count. They render frameless in EVERY
   locale and NEVER take an article — the wall must not say "der Rot".
   ===================================================================== */
'use strict';

var PictureWordWall = {
  id: 'picture-word-wall',

  /* ---------------- strings ×11 ---------------- */
  strings: {
    title:        {en:'Picture Word Wall',de:'Bilder-Wortwand',fr:'Imagier de la classe',it:'Muro delle parole illustrate',es:'Muro de palabras ilustradas',pt:'Mural de palavras ilustradas',nl:'Woordmuur',sv:'Bildordvägg',da:'Billedordvæg',no:'Bildeordvegg',fi:'Kuvasanaseinä'},
    instruction:  {en:'Tap a card — it grows big and says its word out loud.',de:'Tippe eine Karte an — sie wird groß und sagt ihr Wort laut.',fr:'Appuie sur une carte — elle grandit et dit son mot à voix haute.',it:'Tocca una carta — diventa grande e dice la sua parola ad alta voce.',es:'Toca una tarjeta — se hace grande y dice su palabra en voz alta.',pt:'Toque em um cartão — ele fica grande e fala a palavra em voz alta.',nl:'Tik op een kaart — hij wordt groot en zegt zijn woord hardop.',sv:'Tryck på ett kort — det blir stort och säger sitt ord högt.',da:'Tryk på et kort — det bliver stort og siger sit ord højt.',no:'Trykk på et kort — det blir stort og sier ordet sitt høyt.',fi:'Napauta korttia — se suurenee ja sanoo sanansa ääneen.'},
    themesBtn:    {en:'Themes',de:'Themen',fr:'Thèmes',it:'Temi',es:'Temas',pt:'Temas',nl:'Thema’s',sv:'Teman',da:'Temaer',no:'Temaer',fi:'Teemat'},
    bandLiving:   {en:'Living things',de:'Lebewesen',fr:'Le vivant',it:'Esseri viventi',es:'Seres vivos',pt:'Seres vivos',nl:'Levende wezens',sv:'Levande ting',da:'Levende ting',no:'Levende ting',fi:'Elävät olennot'},
    bandHome:     {en:'Around me',de:'Um mich herum',fr:'Autour de moi',it:'Intorno a me',es:'A mi alrededor',pt:'Ao meu redor',nl:'Om mij heen',sv:'Runt omkring mig',da:'Rundt om mig',no:'Rundt meg',fi:'Ympärilläni'},
    bandWorld:    {en:'World & play',de:'Welt & Spiel',fr:'Monde & jeux',it:'Mondo e gioco',es:'Mundo y juego',pt:'Mundo e brincadeira',nl:'Wereld & spel',sv:'Värld & lek',da:'Verden & leg',no:'Verden og lek',fi:'Maailma ja leikki'},
    filterPh:     {en:'Find a theme…',de:'Thema suchen…',fr:'Chercher un thème…',it:'Cerca un tema…',es:'Buscar un tema…',pt:'Procurar um tema…',nl:'Zoek een thema…',sv:'Sök ett tema…',da:'Find et tema…',no:'Finn et tema…',fi:'Etsi teemaa…'},
    onePic:       {en:'one',de:'eins',fr:'un',it:'uno',es:'uno',pt:'um',nl:'één',sv:'ett',da:'én',no:'én',fi:'yksi'},
    manyPic:      {en:'many',de:'viele',fr:'plusieurs',it:'tanti',es:'varios',pt:'vários',nl:'veel',sv:'flera',da:'flere',no:'flere',fi:'monta'},
    samePlural:   {en:'Same word! Look at the picture.',de:'Gleiches Wort! Schau auf das Bild.',fr:'Le même mot ! Regarde l’image.',it:'La parola non cambia: guarda le figure!',es:'¡La misma palabra! Mira el dibujo.',pt:'A mesma palavra! Olhe a figura.',nl:'Hetzelfde woord! Kijk naar het plaatje.',sv:'Samma ord! Titta på bilden.',da:'Samme ord! Se på billedet.',no:'Samme ord! Se på bildet.',fi:'Sama sana! Katso kuvaa.'},
    /* SPOKEN when the plural word is identical to the singular (sv
       Får/Får): saying "Får… Får" alone sounds broken, so the phrase
       carries the quantity. Never a {count}+noun assembly — the index
       holds the NOMINATIVE PLURAL, and a numeral governs the Finnish
       partitive SINGULAR (kolme lammasta), so "kolme Lampaat" is the
       §A.13.56 trap.
       AND NOTE: a COLON CANNOT RESCUE A SPOKEN STRING — punctuation is
       inaudible, so "Kolme: Lampaat" reaches TTS as "kolme lampaat",
       the same error read aloud (the fi ensemble's catch; the colon
       doctrine applies to DISPLAYED text only). A spoken frame needs a
       real prosodic break, which is why fi ships an elliptical
       "Monta!" that governs nothing. Each native owns the whole
       phrase. */
    samePluralSpeak:{en:'three {word}',de:'drei {word}',fr:'trois {word}',it:'tre {word}',es:'tres {word}',pt:'{word}',nl:'drie {word}',sv:'tre {word}',da:'tre {word}',no:'tre {word}',fi:'Monta! {word}'},
    speakAria:    {en:'Say the word',de:'Wort ansagen',fr:'Dire le mot',it:'Di’ la parola',es:'Decir la palabra',pt:'Falar a palavra',nl:'Zeg het woord',sv:'Säg ordet',da:'Sig ordet',no:'Si ordet',fi:'Sano sana'},
    closeAria:    {en:'Close',de:'Schließen',fr:'Fermer',it:'Chiudi',es:'Cerrar',pt:'Fechar',nl:'Sluiten',sv:'Stäng',da:'Luk',no:'Lukk',fi:'Sulje'},
    pageAria:     {en:'Wall {n} of {t}',de:'Wand {n} von {t}',fr:'Mur {n} sur {t}',it:'Muro {n} di {t}',es:'Muro {n} de {t}',pt:'Mural {n} de {t}',nl:'Muur {n} van {t}',sv:'Vägg {n} av {t}',da:'Væg {n} af {t}',no:'Vegg {n} av {t}',fi:'Seinä {n}/{t}'},
    whisperBtn:   {en:'Whisper',de:'Flüstern',fr:'Chuchote',it:'Sussurro',es:'Susurro',pt:'Sussurro',nl:'Fluisteren',sv:'Viska',da:'Hviske',no:'Hvisk',fi:'Kuiskaus'},
    whisperFind:  {en:'Find: {word}',de:'Finde: {word}',fr:'Trouve : {word}',it:'Trova: {word}',es:'Encuentra: {word}',pt:'Encontre: {word}',nl:'Zoek: {word}',sv:'Hitta: {word}',da:'Find: {word}',no:'Finn: {word}',fi:'Etsi: {word}'},
    whisperAgain: {en:'Listen again',de:'Nochmal hören',fr:'Réécouter',it:'Riascolta',es:'Escuchar otra vez',pt:'Ouvir de novo',nl:'Nog eens luisteren',sv:'Lyssna igen',da:'Hør igen',no:'Hør igjen',fi:'Kuuntele uudelleen'},
    /* COLON-APPOSITION, not a sentence frame. {word} is the NOMINATIVE
       citation form (der Leguan) — the only case this wall teaches.
       "Du hast {word} gefunden!" governs the accusative and produced
       "Du hast DER Leguan gefunden!"; the same break hits every
       case-marking locale (§A.13.56, and the Class Timer fan-out where
       all 10 natives independently reached for apposition). The colon
       isolates the citation form so no frame can inflect it. */
    whisperFound: {en:'Found it — {word}!',de:'Gefunden: {word}!',fr:'Trouvé : {word} !',it:'Trovato: {word}!',es:'¡Encontrado: {word}!',pt:'Achou: {word}!',nl:'Gevonden: {word}!',sv:'Hittat: {word}!',da:'Fundet: {word}!',no:'Bra funnet: {word}!',fi:'Löytyi: {word}!'},
    pinBtn:       {en:'Our words',de:'Unsere Wörter',fr:'Nos mots',it:'Le nostre parole',es:'Nuestras palabras',pt:'Nossas palavras',nl:'Onze woorden',sv:'Våra ord',da:'Vores ord',no:'Våre ord',fi:'Meidän sanat'},
    pinAdd:       {en:'Pin to our wall',de:'An unsere Wand heften',fr:'Épingler à notre mur',it:'Appunta al nostro muro',es:'Fijar en nuestro muro',pt:'Fixar no nosso mural',nl:'Op onze muur prikken',sv:'Nåla på vår vägg',da:'Sæt på vores væg',no:'Fest på veggen vår',fi:'Kiinnitä seinällemme'},
    pinRemove:    {en:'Take off the wall',de:'Von der Wand nehmen',fr:'Retirer du mur',it:'Togli dal muro',es:'Quitar del muro',pt:'Tirar do mural',nl:'Van de muur halen',sv:'Ta bort från väggen',da:'Tag af væggen',no:'Ta av veggen',fi:'Ota pois seinältä'},
    wallNamePh:   {en:'Name this wall (e.g. Week 12 — On the farm)',de:'Wie heißt diese Wand? (z. B. Woche 12 — Auf dem Bauernhof)',fr:'Nomme ce mur (ex. Semaine 12 — À la ferme)',it:'Come si chiama questo muro? (es. Settimana 12 — In fattoria)',es:'¿Cómo se llama este muro? (p. ej., Semana 12 — En la granja)',pt:'Como se chama este mural? (ex.: Semana 12 — Na fazenda)',nl:'Hoe heet deze muur? (bijv. Week 12 — Op de boerderij)',sv:'Vad heter den här väggen? (t.ex. Vecka 12 — På bondgården)',da:'Hvad hedder denne væg? (fx Uge 12 — På gården)',no:'Hva heter denne veggen? (f.eks. Uke 12 — På gården)',fi:'Minkä niminen tämä seinä on? (esim. Viikko 12 — Maatilalla)'},
    readThrough:  {en:'Read them together',de:'Zusammen vorlesen',fr:'Lire ensemble',it:'Leggiamole insieme',es:'Leerlas juntos',pt:'Ler juntos',nl:'Samen voorlezen',sv:'Läs dem tillsammans',da:'Læs dem sammen',no:'Les dem sammen',fi:'Luetaan yhdessä'},
    pinEmpty:     {en:'Long-press any card to pin it here.',de:'Halte eine Karte gedrückt, um sie hierher zu heften.',fr:'Appuie longuement sur une carte pour l’épingler ici.',it:'Tieni premuta una carta per appuntarla qui.',es:'Mantén presionada una tarjeta para fijarla aquí.',pt:'Segure um cartão para fixá-lo aqui.',nl:'Houd een kaart ingedrukt om hem hier te prikken.',sv:'Håll ett kort intryckt för att nåla det här.',da:'Hold et kort nede for at sætte det her.',no:'Hold et kort inne for å feste det her.',fi:'Paina korttia pitkään, niin se kiinnittyy tähän.'},
    pinFull:      {en:'This wall is full — take one off first.',de:'Diese Wand ist voll — nimm zuerst eine Karte ab.',fr:'Ce mur est plein — retire d’abord une carte.',it:'Questo muro è pieno — togli prima una carta.',es:'Este muro está lleno — quita una primero.',pt:'Este mural está cheio — tire um primeiro.',nl:'Deze muur is vol — haal er eerst een af.',sv:'Väggen är full — ta bort ett kort först.',da:'Væggen er fuld — tag et kort af først.',no:'Veggen er full — ta av et kort først.',fi:'Seinä on täynnä — ota ensin yksi pois.'},
    gateThemes:   {en:'The other themes live in the full toolkit — a thousand more words.',de:'Die anderen Themen wohnen im ganzen Werkzeugkasten — tausend weitere Wörter.',fr:'Les autres thèmes vivent dans la boîte complète — mille mots de plus.',it:'Gli altri temi vivono nel kit completo — mille parole in più.',es:'Los demás temas viven en el kit completo — mil palabras más.',pt:'Os outros temas moram no kit completo — mais mil palavras.',nl:'De andere thema\'s wonen in de hele gereedschapskist — duizend woorden meer.',sv:'De andra temana bor i hela verktygslådan — tusen ord till.',da:'De andre temaer bor i den fulde kasse — tusind ord mere.',no:'De andre temaene bor i hele verktøykassen — tusen ord til.',fi:'Muut teemat asuvat koko työkalupakissa — tuhat sanaa lisää.'},
    gateWhisper:  {en:'Whisper mode — where the firefly lives — is part of the full toolkit.',de:'Der Flüster-Modus — wo das Glühwürmchen wohnt — gehört zum ganzen Werkzeugkasten.',fr:'Le mode chuchote — où vit la luciole — fait partie de la boîte complète.',it:'La modalità sussurro — dove vive la lucciola — fa parte del kit completo.',es:'El modo susurro — donde vive la luciérnaga — es parte del kit completo.',pt:'O modo sussurro — onde mora o vaga-lume — faz parte do kit completo.',nl:'De fluistermodus — waar het vuurvliegje woont — hoort bij de hele gereedschapskist.',sv:'Viskläget — där eldflugan bor — ingår i hela verktygslådan.',da:'Hviske-tilstanden — hvor ildfluen bor — er en del af den fulde kasse.',no:'Hviskemodus — der ildfluen bor — er en del av hele verktøykassen.',fi:'Kuiskaustila — jossa kiiltomato asuu — kuuluu koko työkalupakkiin.'},
    gatePins:     {en:'Pinning your class’s own wall is a full-toolkit treat.',de:'Die eigene Wand deiner Klasse zu heften gehört zum ganzen Werkzeugkasten.',fr:'Épingler le mur de ta classe fait partie de la boîte complète.',it:'Costruire il muro della tua classe fa parte del kit completo.',es:'Fijar el muro de tu grupo es parte del kit completo.',pt:'Fixar o mural da sua turma faz parte do kit completo.',nl:'Een eigen woordmuur voor je klas hoort bij de hele gereedschapskist.',sv:'Att nåla klassens egen vägg ingår i hela verktygslådan.',da:'At sætte klassens egen væg op er en del af den fulde kasse.',no:'Å lage klassens egen ordvegg er en del av hele verktøykassen.',fi:'Oman luokan seinän kokoaminen kuuluu koko työkalupakkiin.'},
    unlock:       {en:'Unlock the full toolkit',de:'Ganzen Werkzeugkasten freischalten',fr:'Débloquer la boîte complète',it:'Sblocca il kit completo',es:'Desbloquear el kit completo',pt:'Desbloquear o kit completo',nl:'Hele gereedschapskist ontgrendelen',sv:'Lås upp hela verktygslådan',da:'Lås hele kassen op',no:'Lås opp hele verktøykassen',fi:'Avaa koko työkalupakki'},
    setArticles:  {en:'Show the article',de:'Artikel zeigen',fr:'Afficher l’article',it:'Mostra l’articolo',es:'Mostrar el artículo',pt:'Mostrar o artigo',nl:'Lidwoord tonen',sv:'Visa artikeln',da:'Vis artiklen',no:'Vis en eller et',fi:'Näytä artikkeli'},
    setWhisperSize:{en:'Cards in whisper mode',de:'Karten im Flüster-Modus',fr:'Cartes en mode chuchote',it:'Carte nella modalità sussurro',es:'Tarjetas en el modo susurro',pt:'Cartões no modo sussurro',nl:'Kaarten in de fluistermodus',sv:'Kort i viskläget',da:'Kort i hviske-tilstand',no:'Kort i hviskemodus',fi:'Kortit kuiskaustilassa'},
    sizeSmall:    {en:'6 — youngest',de:'6 — die Kleinsten',fr:'6 — les plus jeunes',it:'6 — i più piccoli',es:'6 — los más pequeños',pt:'6 — os menores',nl:'6 — de jongsten',sv:'6 — de yngsta',da:'6 — de mindste',no:'6 — de minste',fi:'6 — pienimmät'},
    sizeMid:      {en:'12',de:'12',fr:'12',it:'12',es:'12',pt:'12',nl:'12',sv:'12',da:'12',no:'12',fi:'12'},
    sizeBig:      {en:'16 — the whole wall',de:'16 — die ganze Wand',fr:'16 — tout le mur',it:'16 — tutto il muro',es:'16 — todo el muro',pt:'16 — o mural inteiro',nl:'16 — de hele muur',sv:'16 — hela väggen',da:'16 — hele væggen',no:'16 — hele veggen',fi:'16 — koko seinä'},
    setSpeakFlip: {en:'Say the word when a card opens',de:'Wort ansagen, wenn eine Karte aufgeht',fr:'Dire le mot à l’ouverture d’une carte',it:'Di’ la parola quando una carta si apre',es:'Decir la palabra al abrir una tarjeta',pt:'Falar a palavra ao abrir um cartão',nl:'Woord zeggen als een kaart opengaat',sv:'Säg ordet när ett kort öppnas',da:'Sig ordet når et kort åbnes',no:'Si ordet når et kort åpnes',fi:'Sano sana, kun kortti avautuu'}
  },

  /* ---------------- the article engine ---------------- */
  /* one line per locale — the /*__ART_xx__* / markers let the fan-out
     whole-line replace a native's ruling. `by` maps the index's gender
     code → the article; `pick(gender, word)` is the exception hook
     (elision, es `el agua`): natives fill `over` at fan-out. */
  PWW_ARTICLES: {
    /*__ART_en__*/ en: { form: 'none', by: {}, plural: '', over: {} },
    /*__ART_de__*/ de: { form: 'definite', by: {m: 'der', f: 'die', n: 'das'}, plural: 'die', over: {} },
    /*__ART_fr__*/ fr: { form: 'indefinite', by: {m: 'un', f: 'une'}, plural: 'des', over: {'angel': 'un', 'cabin': 'une', 'forest': 'une', 'oar': 'une', 'pyramid': 'une', 'sphere': 'une', 'milk': 'du', 'rice': 'du', 'salt': 'du', 'honey': 'du', 'sand': 'du', 'corn': 'du', 'popcorn': 'du', 'porridge': 'du', 'peanut-butter': 'du', 'bacon': 'du', 'juice': 'du', 'butter': 'du', 'jam': 'de la', 'glue': 'de la', 'french-fries': 'des', 'green-beans': 'des', 'pasta': 'des', 'cereal': 'des', 'potato-chips': 'des', 'dice': 'des', 'cards': 'des', 'blocks': 'des', 'boots': 'des', 'snow-boots': 'des', 'rain-boots': 'des', 'gloves': 'des', 'mittens': 'des', 'flip-flops': 'des', 'sandals': 'des', 'slippers': 'des', 'binoculars': 'des', 'sunglasses': 'des', 'goggles': 'des', 'scissors': 'des', 'eyelashes': 'des', 'cheeks': 'des', 'hair': 'des', 'muscles': 'des', 'suspenders': 'des', 'tights': 'des', 'crutches': 'des', 'cymbals': 'des', 'curtains': 'des', 'lights': 'des', 'jelly-beans': 'des', 'grapes': 'des', 'peas': 'des', 'pretzels': 'des', 'underpants': 'des', 'oatmeal': 'des', 'crayons': 'des', 'chess': 'les', 'us': 'les', 'santa': 'le', 'earth': 'la'} },
    /*__ART_it__*/ it: { form: 'indefinite', by: {m: 'un', f: 'una'}, plural: 'dei', pluralF: 'delle', over: {'us': {s: '', p: ''}, 'uncle-sam': {s: '', p: ''}, 'halloween': {s: '', p: ''}, 'liberty': {s: '', p: ''}, 'chess': {s: '', p: ''}, 'jeans': {s: '', p: ''}, 'skiing': {s: '', p: ''}, 'boots': {s: '', p: ''}, 'rain-boots': {s: '', p: ''}, 'snow-boots': {s: '', p: ''}, 'french-fries': {s: '', p: ''}, 'grapes': {s: '', p: ''}, 'egg': {s: 'un', p: 'delle'}, 'boiled-egg': {s: 'un', p: 'delle'}, 'easter-egg': {s: 'un', p: 'delle'}, 'ear': {s: 'un', p: 'delle'}, 'arm': {s: 'un', p: 'delle'}, 'finger': {s: 'un', p: 'delle'}, 'knee': {s: 'un', p: 'delle'}, 'lip': {s: 'un', p: 'delle'}, 'jeep': {s: 'una', p: 'delle'}} },
    /*__ART_es__*/ es: { form: 'definite', by: {m: 'el', f: 'la'}, plural: 'los', pluralF: 'las', over: {'eagle': 'el', 'water': 'el', 'harp': 'el', 'seaweed': 'el', 'beech-tree': 'el', 'boots': 'las', 'cards': 'las', 'cheeks': 'las', 'crutches': 'las', 'curtains': 'las', 'earmuffs': 'las', 'eyelashes': 'las', 'flip-flops': 'las', 'french-fries': 'las', 'goggles': 'las', 'grapes': 'las', 'jelly-beans': 'las', 'lights': 'las', 'popcorn': 'las', 'rain-boots': 'las', 'scissors': 'las', 'porridge': 'las', 'pliers': 'las', 'potato-chips': 'las', 'sandals': 'las', 'slippers': 'las', 'snow-boots': 'las', 'stairs': 'las', 'tights': 'las', 'tongs': 'las', 'binoculars': 'los', 'blocks': 'los', 'crayons': 'los', 'cymbals': 'los', 'dice': 'los', 'gloves': 'los', 'green-beans': 'los', 'jeans': 'los', 'leggings': 'los', 'mittens': 'los', 'muscles': 'los', 'peas': 'los', 'pretzels': 'los', 'shorts': 'los', 'sunglasses': 'los', 'suspenders': 'los', 'sweatpants': 'los', 'trousers': 'los', 'underpants': 'los'} },
    /*__ART_pt__*/ pt: { form: 'definite', by: {m: 'o', f: 'a'}, plural: 'os', pluralF: 'as', over: {'boots': 'as', 'cards': 'as', 'cheeks': 'as', 'crutches': 'as', 'curtains': 'as', 'french-fries': 'as', 'gloves': 'as', 'grapes': 'as', 'jelly-beans': 'as', 'lights': 'as', 'mittens': 'as', 'peas': 'as', 'potato-chips': 'as', 'rain-boots': 'as', 'sandals': 'as', 'slippers': 'as', 'snow-boots': 'as', 'stairs': 'as', 'trousers': 'as', 'binoculars': 'os', 'blocks': 'os', 'cymbals': 'os', 'dice': 'os', 'earmuffs': 'os', 'eyelashes': 'os', 'flip-flops': 'os', 'goggles': 'os', 'muscles': 'os', 'post-office': 'os', 'pretzels': 'os', 'sunglasses': 'os', 'suspenders': 'os', 'us': 'os'} },
    /*__ART_nl__*/ nl: { form: 'definite', by: {d: 'de', h: 'het'}, plural: 'de', over: {} },
    /*__ART_sv__*/ sv: { form: 'indefinite', by: {n: 'en', t: 'ett'}, plural: '', over: {} },
    /*__ART_da__*/ da: { form: 'indefinite', by: {n: 'en', t: 'et'}, plural: '', over: {'apple': 'et', 'window': 'et', 'apron': 'et', 'barrette': 'et', 'tie': 'et', 'donkey': 'et', 'whiteboard': 'et', 'thermometer': 'et', 'mug': 'et', 'colander': 'et', 'whisk': 'et', 'autumn': 'et', 'scarecrow': 'et', 'keyboard': 'et', 'mail-carrier': 'et', 'rectangle': 'et', 'square': 'et', 'trapezoid': 'et', 'skateboard': 'et', 'cash-register': 'et', 'price-tag': 'et', 'trillium': 'et', 'bacon': 'et', 'soda': 'en', 'necklace': 'en', 'deinonychus': 'en', 'parasaurolophus': 'en'} },
    /*__ART_no__*/ no: { form: 'indefinite', by: {m: 'en', n: 'et'}, plural: '', over: {'apron': 'et', 'scarecrow': 'et', 'keyboard': 'et', 'skateboard': 'et', 'mail-carrier': 'et', 'trillium': 'et', 'wisteria': 'et', 'rain': 'et', 'deinonychus': 'en', 'parasaurolophus': 'en', 'trousers': '', 'crayons': '', 'curtains': '', 'gloves': '', 'grapes': '', 'peas': '', 'blocks': '', 'muscles': '', 'crutches': '', 'jelly-beans': '', 'green-beans': '', 'sandals': '', 'boots': '', 'rain-boots': '', 'snow-boots': '', 'slippers': '', 'mittens': '', 'earmuffs': '', 'eyelashes': '', 'goggles': '', 'suspenders': '', 'scrubs': '', 'sunglasses': '', 'dice': '', 'french-fries': '', 'us': '', 'uncle-sam': '', 'santa': '', 'rudolph': '', 'earth': '', 'jupiter': '', 'mars': '', 'mercury': '', 'neptune': '', 'saturn': '', 'uranus': '', 'venus': '', 'halloween': '', 'lego': '', 'partly-cloudy': '', 'cloudy': '', 'rainy': '', 'sunny': '', 'stormy': '', 'hot': '', 'cold': ''} },
    /*__ART_fi__*/ fi: { form: 'none', by: {}, plural: '', over: {} },
  },

  /* Phonological article RULES, kept OUT of PWW_ARTICLES on purpose:
     the table is fan-out data (whole-line replaced per locale), a rule
     is code. Italian selects on the following word's SOUND, not on
     gender alone — the native ensemble's measured rule, verified across
     all 1,027 cards. Their four traps: s impura is s+CONSONANT (uno
     specchio but UN sole); h counts as a vowel (un hamburger); w does
     not (un waffle); and i+vowel BLOCKS feminine elision — "una iena",
     never *un'iena. */
  PWW_PICK: {
    it: function (g, w, plural) {
      var s = String(w || '');
      var iSemi = /^i[aeiouàèéìòù]/i.test(s);
      var vowelish = /^[aeiouàèéìòùh]/i.test(s) && !iSemi;
      var unoTrig = iSemi || /^(z|x|y|gn|pn|ps)/i.test(s) || /^s[^aeiouàèéìòùh]/i.test(s);
      if (plural) return g === 'f' ? 'delle' : (unoTrig || vowelish ? 'degli' : 'dei');
      if (g === 'f') return vowelish ? "un'" : 'una';
      return unoTrig ? 'uno' : 'un';
    }
  },

  /* Is this card's stored plural TRUSTWORTHY?
     The `sp` flag only means "the data's plural equals its singular".
     That is a real, teachable fact in Swedish (Hus/Hus) — and a LIE in
     Norwegian, where image-vocabulary.js stores Epletre/Epletre though
     the true plural is epletrær (the no ensemble's catch; 13 of 34 tree
     cards plus the bare `tree`). Showing three trees, speaking the
     singular and announcing "Samme ord!" would teach the falsehood.
     The vocabulary is protected (§10.3) so we cannot fix the data —
     but we can decline to ship the claim: a card whose plural the
     native flagged as a DATA DEFECT teaches its singular and article
     (both correct) and simply does not offer the toggle. Natives fill
     `noPlural` at fan-out; every key is gate-checked to exist. */
  pluralTrusted: function (loc, card) {
    var A = this.PWW_ARTICLES[loc] || this.PWW_ARTICLES.en;
    if (!A.noPlural || !A.noPlural.length) return true;
    return A.noPlural.indexOf(card.k) < 0;
  },

  /* the ONE composer — display and speech both come from here, so the
     spoken string is byte-identical to the displayed one (Calendar
     Wall's print-speech-matched doctrine). */
  compose: function (loc, card, plural) {
    var A = this.PWW_ARTICLES[loc] || this.PWW_ARTICLES.en;
    var word = plural ? card.p : card.s;
    if (!card || card.na || A.form === 'none' || !card.g) return word;
    var art;
    /* precedence: a key-specific exception > the locale's phonological
       RULE > the plain gender lookup. `pick` exists because in some
       locales the article is not a pure gender lookup — Italian selects
       on the following word's SOUND (un/uno/un'/una, dei/degli/delle),
       so a flat table emitted "dei api" and "dei zaini". Natives own
       the rule; it is a function, so the fan-out preserves it. */
    var pick = A.pick || this.PWW_PICK[loc];
    /* An override entry is either a STRING (the singular article) or
       {s, p} (singular + plural). It is read by KEY PRESENCE, never by
       truthiness: `over: {us: ''}` must SUPPRESS the article (les
       États-Unis takes none), and the old `||` chain made an empty
       override silently fall through to the gender lookup — a gap the
       it, fr, da and sv ensembles each found independently by reading
       this function. */
    var raw = (A.over && Object.prototype.hasOwnProperty.call(A.over, card.k)) ? A.over[card.k] : undefined;
    var ov;
    if (raw !== undefined) ov = (typeof raw === 'string') ? (plural ? undefined : raw) : (plural ? raw.p : raw.s);
    if (ov !== undefined) art = ov;
    else if (pick) art = pick(card.g, word, plural);
    else if (plural) art = (A.pluralF && card.g === 'f') ? A.pluralF : A.plural;
    else art = A.by[card.g] || '';
    /* an ELIDED article attaches directly — un'ape, l'albero — never
       "un' ape". The apostrophe IS the join. */
    if (!art) return word;
    return /['’]$/.test(art) ? art + word : art + ' ' + word;
  },
  /* The gender rail colour class: plural always takes the 4th (gold) —
     "plural erases gender" is the wall's best moment.
     NOTE, deliberately: `railFor` reads the card's GENDER and never
     consults `over`, and `compose` applies `over` only in the singular.
     That separation is the point, not a gap — `over` carries
     PHONOLOGICAL article exceptions, which do not change gender.
     Spanish `el agua` is the type case: it takes `el` by the stressed-á
     rule yet stays FEMININE, so the card must show "el agua" (over) on
     a feminine rail, and pluralise to "las aguas" (pluralF, g==='f').
     Coupling the rail to `over` would teach that agua is masculine. */
  railFor: function (loc, card, plural) {
    var A = this.PWW_ARTICLES[loc] || this.PWW_ARTICLES.en;
    if (!card || card.na || A.form === 'none' || !card.g) return null;
    if (plural) return 'plural';
    return card.g;
  },

  /* =========================== substrate =========================== */

  STORE_KEY: 'lcs:picture-word-wall:v1',
  ENT_TRUST_DAYS: 14,
  /* FREE = the three themes that demo all three moat facts: animals
     gives German all 3 genders + 3 changing plurals in one screen;
     fruits carries Romance gender; vehicles carries the identical-
     plural case + das Auto → die Autos. */
  FREE_THEMES: ['animals', 'fruits', 'vehicles'],
  PIN_MIN: 8, PIN_MAX: 16,
  PER_PAGE: 24, PER_PAGE_FRAMELESS: 28,

  /* the 3 drawer bands (the pedagogue's "not a database" requirement,
     in the visual's one-tap drawer) */
  BANDS: [
    { key: 'bandLiving', themes: ['animals', 'pets', 'farm_animals', 'zoo_animals', 'forest_creatures', 'birds', 'birds_2', 'ocean_life', 'insects_and_bugs', 'reptiles_and_amphibians', 'dinosaurs', 'flowers', 'tree', 'body_parts'] },
    { key: 'bandHome', themes: ['around_the_house', 'furniture', 'kitchen_tools', 'classroom', 'clothing', 'accessories', 'at_the_supermarket', 'fruits', 'vegetables', 'bakery', 'breakfast', 'desserts_and_sweets', 'tools', 'hospital', 'post_office', 'shapes', 'colors', 'emotions'] },
    { key: 'bandWorld', themes: ['vehicles', 'things_that_fly', 'toys', 'activities', 'occupations', 'music', 'space', 'beach', 'camping', 'weather', 'spring', 'summer', 'winter', 'christmas', 'easter', 'thanksgivinng', '4th_of_july', 'miscellaneous'] }
  ],

  defaults: { articles: true, whisperSize: '12', speakOnFlip: true },
  settings: [
    { key: 'articles', type: 'toggle', labelKey: 'setArticles' },
    { key: 'whisperSize', type: 'choice', labelKey: 'setWhisperSize', options: [
      { value: '6', labelKey: 'sizeSmall' },
      { value: '12', labelKey: 'sizeMid' },
      { value: '16', labelKey: 'sizeBig' }
    ]},
    { key: 'speakOnFlip', type: 'toggle', labelKey: 'setSpeakFlip' }
  ],

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.index = null;
    this.theme = null;
    this.page = 0;
    this.hero = null;          /* {card, plural} */
    this.mode = 'wall';        /* wall | whisper | pins */
    this.whisper = { target: null, order: [], note: null, misses: 0 };

    this._store = this._loadStore() || {};
    if (!this._store.v) this._store = { v: 1, ent: null, pins: [], wallName: '' };
    /* resolver-side normalization (the async-entitlement rule) */
    this._store.pins = (this._store.pins || []).filter(function (p) {
      return p && typeof p.k === 'string' && typeof p.t === 'string';
    }).slice(0, this.PIN_MAX);
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    this._fetchEntitlement();
    this._loadIndex();
  },
  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) { return null; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },
  /* the generated per-locale index — words baked at build time, so the
     client never loads the 492 KB vocab file (§10.4 read-from-SoT; the
     gate enforces byte-equality back to image-vocabulary.js) */
  _loadIndex: function () {
    var self = this;
    var loc = this.api.lang;
    /* 'no-cache' = REVALIDATE every load, never serve a stale copy. The
       index is regenerated on every vocab correction, so a child must never
       be shown a word a fix already removed. `force-cache` used to pin the
       old index in the browser INDEFINITELY — it overrides the origin's
       correct `no-cache, must-revalidate` header, so a sv/de correction was
       live at the origin + CDN yet the wall still spoke the old word. This
       mode sends a conditional request: a tiny 304 when unchanged, fresh
       data the instant the index changes. (Operator-reported 2026-07-17.) */
    fetch('/mini-tools/pww-index-' + loc + '.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) throw new Error('no index');
        self.index = j;
        self.themes = {};
        for (var i = 0; i < j.themes.length; i++) self.themes[j.themes[i].k] = j.themes[i];
        /* open her named wall if she has one, else the first free theme */
        if (self._store.pins.length >= 2) self.mode = 'pins';
        else self.theme = self.FREE_THEMES[0];
        self.render();
      })
      .catch(function () {
        self.index = { themes: [] };
        self.themes = {};
        self.render();
      });
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  /* the wall is frameless in locales with no gender (en/fi): no fake
     colour layer — bigger pictures, bigger words instead. */
  _frameless: function () {
    var A = this.PWW_ARTICLES[this.api.lang] || this.PWW_ARTICLES.en;
    return A.form === 'none';
  },
  _perPage: function () { return this._frameless() ? this.PER_PAGE_FRAMELESS : this.PER_PAGE; },
  _themeLocked: function (key) { return !this.premium && this.FREE_THEMES.indexOf(key) < 0; },
  _imgUrl: function (theme, file, variant) {
    return '/image-library-webp/themes/' + encodeURIComponent(theme.d) + '/' + file + '@' + (variant || '1x') + '.webp';
  },
  /* stable per-noun jitter (seeded — never re-randomizes across renders) */
  _jitter: function (key) {
    var h = 0;
    for (var i = 0; i < key.length; i++) h = ((h << 5) - h + key.charCodeAt(i)) | 0;
    return ((Math.abs(h) % 33) - 16) / 20;   /* ±0.8° */
  },
  _speak: function (text) {
    try { LCSAudio.speak({ type: 'word', text: text, lang: this.api.lang, rate: 0.85 }); } catch (_) {}
    this.api.announce(text);
  },

  /* ============================ render ============================= */

  render: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    document.body.classList.add('pww-wide');
    /* the rails + article ink are locale-scoped (the gender letter is
       not portable — §A.13.58). It lives on <body> because the hero and
       its rail portal out of the stage. */
    document.body.setAttribute('data-loc', api.lang);
    var wrap = api.el('div', 'pww-wrap' + (this._frameless() ? ' frameless' : ''));
    this._wrap = wrap;

    if (!this.index) { wrap.appendChild(api.el('div', 'pww-loading')); api.stage.appendChild(wrap); return; }

    wrap.appendChild(this._buildTopBar());
    wrap.appendChild(this._buildWall());
    wrap.appendChild(this._buildDock());
    api.stage.appendChild(wrap);
  },

  _buildTopBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'pww-topbar');
    /* whisper owns the bar: the prompt IS the chrome */
    if (this.mode === 'whisper') {
      var wb = api.el('div', 'pww-whisperbar');
      bar.appendChild(wb);
      return bar;
    }
    /* a named wall is HER wall — she types the name (the morning ritual
       reopens straight onto it, never a menu) */
    if (this.mode === 'pins' && this.premium) {
      var input = api.el('input', 'pww-wallname');
      input.type = 'text';
      input.maxLength = 48;
      input.value = this._store.wallName || '';
      input.placeholder = api.t('wallNamePh');
      input.addEventListener('change', function () {
        self._store.wallName = input.value.trim();
        self._saveStore();
      });
      bar.appendChild(input);
      if (this._store.pins.length) {
        var read = api.el('button', 'pww-chip');
        read.type = 'button';
        read.textContent = '👉 ' + api.t('readThrough');
        read.addEventListener('click', function () { self._userGestured = true; self._readThrough(); });
        bar.appendChild(read);
      }
      return bar;
    }
    var name = api.el('button', 'pww-themebtn');
    name.type = 'button';
    var t = this.themes && this.themes[this.theme];
    name.textContent = (t ? t.n : api.t('themesBtn')) + '  ▾';
    name.addEventListener('click', function () { self._openDrawer(); });
    bar.appendChild(name);
    return bar;
  },

  /* the 60-second choral ritual: a slow tap-through of her wall, each
     word spoken with its article for the class to answer */
  _readThrough: function () {
    var self = this, api = this.api;
    var cards = this._currentCards();
    if (!cards.length) return;
    if (this._readT) { this._readT.forEach(clearTimeout); }
    this._readT = [];
    cards.forEach(function (c, i) {
      self._readT.push(setTimeout(function () {
        var el = (self._wrap || document).querySelector('.pww-card[data-key="' + (window.CSS && CSS.escape ? CSS.escape(c.k) : c.k) + '"]');
        if (el) {
          el.classList.add('pww-found');
          setTimeout(function () { el.classList.remove('pww-found'); }, 1500);
        }
        self._speak(self.compose(api.lang, c, false));
      }, i * 2200));
    });
  },

  _buildWall: function () {
    var api = this.api, self = this;
    var wall = api.el('div', 'pww-wall' + (this.mode === 'pins' ? ' pinned' : ''));
    var cards = this._currentCards();
    if (!cards.length) {
      var empty = api.el('div', 'pww-empty');
      empty.textContent = api.t(this.mode === 'pins' ? 'pinEmpty' : 'themesBtn');
      wall.appendChild(empty);
      return wall;
    }
    var per = this.mode === 'whisper' ? cards.length : this._perPage();
    var pages = Math.max(1, Math.ceil(cards.length / per));
    if (this.page >= pages) this.page = 0;
    var slice = cards.slice(this.page * per, this.page * per + per);
    var grid = api.el('div', 'pww-grid');
    /* whisper fills the wall with its pool — a 12-card set left half the
       wall empty under the standard 6×4, and bigger cards are easier to
       find. Pins likewise size to the wall she actually built. */
    if (this.mode === 'whisper' || this.mode === 'pins') {
      var n = Math.max(slice.length, this.mode === 'pins' ? this.PIN_MIN : slice.length);
      var cols = n <= 6 ? 3 : n <= 12 ? 4 : n <= 16 ? 4 : 6;
      grid.style.gridTemplateColumns = 'repeat(' + cols + ',minmax(0,1fr))';
      grid.style.gridTemplateRows = 'repeat(' + Math.ceil(n / cols) + ',minmax(0,1fr))';
    }
    slice.forEach(function (c) { grid.appendChild(self._buildCard(c)); });
    /* a pinned wall shows its empty slots as an invitation */
    if (this.mode === 'pins') {
      for (var i = slice.length; i < self.PIN_MIN; i++) grid.appendChild(api.el('div', 'pww-slot'));
    }
    wall.appendChild(grid);
    this._pages = pages;
    return wall;
  },

  /* the card: article + word INLINE on one line (it is the spoken unit)
     + a 6px gender rail. Two redundant channels; no background wash
     (washes fight the transparent illustrations). */
  _buildCard: function (c) {
    var api = this.api, self = this;
    var theme = this.themes[c._theme || this.theme];
    var rail = this.api.settings.articles ? this.railFor(api.lang, c, false) : null;
    var card = api.el('button', 'pww-card' + (rail ? ' rail-' + rail : ''));
    card.type = 'button';
    card.style.setProperty('--pww-jit', this._jitter(c.k) + 'deg');
    card.setAttribute('data-key', c.k);
    var pic = api.el('div', 'pww-pic');
    var img = document.createElement('img');
    img.src = this._imgUrl(theme, c.f, '1x');
    img.alt = c.s;
    img.width = 148; img.height = 148;
    img.loading = 'lazy';        /* native = viewport-gated fetching; no IO needed */
    img.decoding = 'async';
    pic.appendChild(img);
    card.appendChild(pic);
    var band = api.el('div', 'pww-band');
    this._fillWord(band, c, false);
    card.appendChild(band);
    if (this.mode === 'pins') {
      var pin = api.el('span', 'pww-pin');
      pin.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="8" r="5" fill="#F2C879" stroke="#B8862B" stroke-width="1.5"/><path d="M12 13v8" stroke="#B8862B" stroke-width="2" stroke-linecap="round"/></svg>';
      card.appendChild(pin);
    }
    card.setAttribute('aria-label', this.compose(api.lang, c, false));
    card.addEventListener('click', function () { self._userGestured = true; self._onCardTap(c); });
    this._wireLongPress(card, c);
    return card;
  },
  /* the ONE word renderer — article and noun are one line, and the
     article carries the gender colour (print-speech matched) */
  _fillWord: function (host, c, plural) {
    var api = this.api;
    host.innerHTML = '';
    var showArt = api.settings.articles;
    var A = this.PWW_ARTICLES[api.lang] || this.PWW_ARTICLES.en;
    var full = this.compose(api.lang, c, plural);
    var word = plural ? c.p : c.s;
    /* the size step is measured on the FULL spoken unit, not the noun
       alone: "die Fledermaus" fits the word test but stranded its
       article on its own line at 768, breaking the one-line rule that
       makes article+noun read as the single thing the voice says. */
    var unit = showArt ? full : word;
    var size = unit.length > 12 ? (unit.length > 17 ? ' xlong' : ' long') : '';
    if (showArt && full !== word) {
      var art = full.slice(0, full.length - word.length).trim();
      var aEl = api.el('span', 'pww-art' + size + (plural ? ' plural' : (c.g ? ' g-' + c.g : '')));
      aEl.textContent = art;
      host.appendChild(aEl);
      host.appendChild(document.createTextNode(' '));
    }
    /* a long word SHRINKS rather than shattering — "Hippopotamus" was
       breaking mid-letter as "Hippopotamu / s" on the grid card */
    var wEl = api.el('span', 'pww-word' + size);
    wEl.textContent = word;
    host.appendChild(wEl);
  },

  _currentCards: function () {
    var self = this;
    /* whisper shows ONLY its pool — 6/12/16 cards, one page, no pips.
       The child must be able to SEE the card she is asked to find; a
       target that paged out of view is not findable. */
    if (this.mode === 'whisper') return this._whisperCards || [];
    if (this.mode === 'pins') {
      return this._store.pins.map(function (p) {
        var t = self.themes[p.t];
        if (!t) return null;
        var c = null;
        for (var i = 0; i < t.c.length; i++) if (t.c[i].k === p.k) { c = t.c[i]; break; }
        if (!c) return null;
        var copy = {};
        for (var kk in c) copy[kk] = c[kk];
        copy._theme = p.t;
        return copy;
      }).filter(Boolean);
    }
    var t = this.themes[this.theme];
    return t ? t.c : [];
  },

  _buildDock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'pww-dock');
    /* page pips — a 94-card theme PAGES; it never scrolls (scrolling
       destroys the wall metaphor) */
    if (this._pages > 1) {
      var pips = api.el('div', 'pww-pips');
      for (var i = 0; i < this._pages; i++) (function (i) {
        var pip = api.el('button', 'pww-pip' + (i === self.page ? ' on' : ''));
        pip.type = 'button';
        pip.setAttribute('aria-label', self.fmt('pageAria', { n: i + 1, t: self._pages }));
        pip.addEventListener('click', function () { self.page = i; self.render(); });
        pips.appendChild(pip);
      }(i));
      dock.appendChild(pips);
    }
    var chips = api.el('div', 'pww-chips');
    var wall = api.el('button', 'pww-chip' + (this.mode === 'wall' ? ' active' : ''));
    wall.type = 'button';
    wall.textContent = api.t('themesBtn');
    wall.addEventListener('click', function () { self.mode = 'wall'; self.page = 0; self.render(); });
    chips.appendChild(wall);
    var wh = api.el('button', 'pww-chip' + (this.mode === 'whisper' ? ' active' : '') + (this.premium ? '' : ' locked'));
    wh.type = 'button';
    wh.textContent = '✨ ' + api.t('whisperBtn');
    wh.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateWhisper'); return; }
      self._startWhisper();
    });
    chips.appendChild(wh);
    var pins = api.el('button', 'pww-chip' + (this.mode === 'pins' ? ' active' : '') + (this.premium ? '' : ' locked'));
    pins.type = 'button';
    pins.textContent = api.t('pinBtn');
    pins.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gatePins'); return; }
      self.mode = 'pins'; self.page = 0; self.render();
    });
    chips.appendChild(pins);
    dock.appendChild(chips);
    return dock;
  },

  /* ========================= the theme drawer ====================== */

  _openDrawer: function () {
    var api = this.api, self = this;
    this._closeDrawer();
    var scrim = api.el('div', 'pww-scrim');
    scrim.addEventListener('click', function () { self._closeDrawer(); });
    var drawer = api.el('div', 'pww-drawer');
    var filter = api.el('input', 'pww-filter');
    filter.type = 'text';
    filter.placeholder = api.t('filterPh');
    drawer.appendChild(filter);
    var body = api.el('div', 'pww-drawerbody');
    drawer.appendChild(body);
    var paint = function (q) {
      body.innerHTML = '';
      self.BANDS.forEach(function (band) {
        var tiles = band.themes.filter(function (k) {
          var t = self.themes[k];
          if (!t) return false;
          return !q || t.n.toLowerCase().indexOf(q) >= 0;
        });
        if (!tiles.length) return;
        var h = api.el('div', 'pww-bandlbl');
        h.textContent = api.t(band.key);
        body.appendChild(h);
        var row = api.el('div', 'pww-tiles');
        tiles.forEach(function (k) {
          var t = self.themes[k];
          var locked = self._themeLocked(k);
          var tile = api.el('button', 'pww-tile' + (locked ? ' locked' : '') + (k === self.theme ? ' active' : ''));
          tile.type = 'button';
          var m = api.el('div', 'pww-mosaic');
          for (var i = 0; i < 4 && i < t.c.length; i++) {
            var im = document.createElement('img');
            im.src = self._imgUrl(t, t.c[Math.floor(i * t.c.length / 4)].f, '1x');
            im.alt = ''; im.loading = 'lazy'; im.width = 40; im.height = 40;
            m.appendChild(im);
          }
          tile.appendChild(m);
          var nm = api.el('div', 'pww-tilename');
          nm.textContent = t.n;
          tile.appendChild(nm);
          if (locked) {
            var lk = api.el('span', 'pww-lock');
            lk.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
            tile.appendChild(lk);
          }
          tile.addEventListener('click', function () {
            if (locked) { self._closeDrawer(); self._gateInline(self._wrap.querySelector('.pww-dock') || self._wrap, 'gateThemes'); return; }
            self.theme = k; self.mode = 'wall'; self.page = 0;
            self._closeDrawer();
            self.render();
          });
          row.appendChild(tile);
        });
        body.appendChild(row);
      });
    };
    paint('');
    filter.addEventListener('input', function () { paint(filter.value.trim().toLowerCase()); });
    document.body.appendChild(scrim);
    document.body.appendChild(drawer);
    this._scrimEl = scrim;
    this._drawerEl = drawer;
  },
  _closeDrawer: function () {
    if (this._drawerEl) { this._drawerEl.remove(); this._drawerEl = null; }
    if (this._scrimEl) { this._scrimEl.remove(); this._scrimEl = null; }
  },

  _gateInline: function (host, key) {
    var api = this.api;
    var old = (this._wrap || document).querySelector('.pww-gate');
    if (old) old.remove();
    var gate = api.el('div', 'pww-gate');
    var msg = api.el('span', 'pww-gatemsg');
    msg.textContent = api.t(key);
    var a = api.el('a', 'pww-gatelink');
    a.href = '/' + api.lang + '/pricing?from=tool-picture-word-wall';
    a.textContent = api.t('unlock');
    gate.append(msg, a);
    host.insertAdjacentElement('beforebegin', gate);
    setTimeout(function () { if (gate.parentNode) gate.remove(); }, 12000);
  },

  /* ======================= the hero (flip-to-large) ================
     An in-place FLIP expand — never a modal that forgets where you
     tapped. The card lifts out of the wall, travels + scales to the
     hero, and the word speaks AFTER it commits (+180ms) so the voice
     lands on a settled card, not a moving one. */

  _onCardTap: function (c) {
    if (this.mode === 'whisper') { this._whisperTap(c); return; }
    this._openHero(c);
  },

  _openHero: function (c) {
    var api = this.api, self = this;
    this._closeHero();
    this.hero = { card: c, plural: false };
    var reduced = this._reducedMotion();

    var scrim = api.el('div', 'pww-heroscrim');
    scrim.addEventListener('click', function () { self._closeHero(); });
    var host = api.el('div', 'pww-hero');
    host.setAttribute('role', 'dialog');
    this._heroEl = host;
    this._heroScrim = scrim;

    /* the FLIP source rect — the card the child actually tapped */
    var src = (this._wrap || document).querySelector('.pww-card[data-key="' + (window.CSS && CSS.escape ? CSS.escape(c.k) : c.k) + '"]');
    var from = src ? src.getBoundingClientRect() : null;

    var theme = this.themes[c._theme || this.theme];
    var pic = api.el('div', 'pww-heropic');
    this._heroPic = pic;
    host.appendChild(pic);

    var band = api.el('div', 'pww-heroband');
    this._heroBand = band;
    host.appendChild(band);

    var note = api.el('div', 'pww-heronote');
    this._heroNote = note;
    host.appendChild(note);

    var row = api.el('div', 'pww-herorow');
    /* the singular ↔ plural toggle */
    var tog = api.el('div', 'pww-toggle');
    [['one', 'onePic', false], ['many', 'manyPic', true]].forEach(function (o) {
      var b = api.el('button', 'pww-togbtn' + (o[2] === self.hero.plural ? ' on' : ''));
      b.type = 'button';
      b.textContent = api.t(o[1]);
      b.setAttribute('data-plural', o[2] ? '1' : '0');
      b.addEventListener('click', function () { self._setPlural(o[2]); });
      tog.appendChild(b);
    });
    row.appendChild(tog);
    var spk = api.el('button', 'pww-herospk');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('speakAria'));
    spk.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
    spk.addEventListener('click', function () { self._speak(self.compose(api.lang, self.hero.card, self.hero.plural)); });
    row.appendChild(spk);
    var close = api.el('button', 'pww-heroclose');
    close.type = 'button';
    close.setAttribute('aria-label', api.t('closeAria'));
    close.textContent = '✕';
    close.addEventListener('click', function () { self._closeHero(); });
    host.appendChild(close);
    host.appendChild(row);

    document.body.appendChild(scrim);
    document.body.appendChild(host);
    this._paintHero(false);

    /* FLIP: start at the tapped card's rect, then release to the hero */
    if (from && !reduced) {
      var to = host.getBoundingClientRect();
      var dx = (from.left + from.width / 2) - (to.left + to.width / 2);
      var dy = (from.top + from.height / 2) - (to.top + to.height / 2);
      var sx = from.width / to.width, sy = from.height / to.height;
      host.animate([
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ') rotate(var(--pww-jit,0deg))', opacity: 0.6 },
        { transform: 'translate(0,0) scale(1,1) rotate(0deg)', opacity: 1 }
      ], { duration: 420, easing: 'cubic-bezier(.2,.8,.25,1)' });
      scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 });
    }
    /* the word speaks AFTER the card commits */
    if (api.settings.speakOnFlip && this._userGestured) {
      this._heroSpeakT = setTimeout(function () {
        self._speak(self.compose(api.lang, c, false));
      }, reduced ? 60 : 180);
    }
  },

  /* paint the hero's picture + word for the current plural state */
  _paintHero: function (animate) {
    var api = this.api, self = this;
    var h = this.hero;
    if (!h || !this._heroPic) return;
    var c = h.card;
    var theme = this.themes[c._theme || this.theme];
    var reduced = this._reducedMotion();
    var pic = this._heroPic;
    pic.innerHTML = '';

    /* THE MULTIPLY — always 3 copies. Vocabulary plural is not
       counting: 3 is the subitizable "many" and never contradicts the
       spoken word (die Enten, no numeral). The original stays anchored
       and two siblings emerge from behind it into a shallow arc. */
    var n = h.plural ? 3 : 1;
    /* literal transforms — a CSS variable does NOT resolve inside a Web
       Animations keyframe, so var(--pww-to) silently produced no
       movement and all three copies stacked on one another. */
    /* the copies must read as THREE, so they scale down enough to sit
       side by side with only a friendly overlap — at .62/±96 the middle
       one was almost entirely hidden behind its siblings. */
    var narrow = window.innerWidth <= 560;
    var dx = narrow ? 92 : 142;
    var REST = n > 1
      ? ['scale(.54)',
         'translate(' + (-dx) + 'px,8px) rotate(-4deg) scale(.54)',
         'translate(' + dx + 'px,14px) rotate(5deg) scale(.54)']
      : ['none'];
    for (var i = 0; i < n; i++) {
      var im = document.createElement('img');
      im.src = this._imgUrl(theme, c.f, '2x');
      im.alt = i === 0 ? c.s : '';
      im.className = 'pww-heroimg i' + i + (n > 1 ? ' many' : '');
      im.style.transform = REST[i];
      pic.appendChild(im);
      if (animate && n > 1 && !reduced) {
        im.animate([
          { transform: 'translate(0,0) scale(1)', opacity: i ? 0 : 1 },
          { transform: REST[i], opacity: 1 }
        ], { duration: 380, delay: i * 70, easing: 'cubic-bezier(.34,1.4,.5,1)' });
      }
    }
    this._fillWord(this._heroBand, c, h.plural);
    var rail = api.settings.articles ? this.railFor(api.lang, c, h.plural) : null;
    this._heroEl.className = 'pww-hero' + (rail ? ' rail-' + rail : '');
    /* the identical-plural case IS the lesson, not a defect to hide */
    this._heroNote.textContent = (h.plural && c.sp) ? api.t('samePlural') : '';
    this._heroNote.style.display = (h.plural && c.sp) ? '' : 'none';
    var togs = this._heroEl.querySelectorAll('.pww-togbtn');
    for (var j = 0; j < togs.length; j++) togs[j].classList.toggle('on', (togs[j].getAttribute('data-plural') === '1') === !!h.plural);
  },

  _setPlural: function (plural) {
    var h = this.hero;
    if (!h || h.plural === plural) return;
    h.plural = plural;
    this._userGestured = true;
    this._paintHero(true);
    var text = this.compose(this.api.lang, h.card, plural);
    /* When the word does not change (sv Får/Får), speaking it alone
       sounds broken — a native-authored phrase carries the quantity.
       It takes the BARE noun: a quantity phrase never takes a definite
       article, so feeding it the composed string said "tres LAS
       tijeras" and "drei DIE Scheren" (the es ensemble's catch). This
       hid in testing because sv/da/no/fi/en have no plural article at
       all — "tre Får" looked perfect while de/es/pt/fr/it/nl broke. */
    if (plural && h.card.sp) text = this.fmt('samePluralSpeak', { word: h.card.p });
    this._speak(text);
  },

  _closeHero: function () {
    if (this._heroSpeakT) { clearTimeout(this._heroSpeakT); this._heroSpeakT = null; }
    if (this._heroEl) { this._heroEl.remove(); this._heroEl = null; }
    if (this._heroScrim) { this._heroScrim.remove(); this._heroScrim = null; }
    this.hero = null;
  },

  /* ===================== whisper mode (premium) ====================
     A word is spoken; the child finds the card; the firefly lands on
     it. No timer, no score, no counter — and EVERY round ends in
     success. A wrong tap is never punished: the card gives a settle-
     nudge, the word re-speaks slower, and the firefly drifts
     perceptibly CLOSER to the target. Warmth is the only signal. */

  /* pure: the pool for a whisper round (the harness fuzzes this) */
  whisperPool: function (cards, size) {
    var pool = cards.filter(function (c) { return !!c.f; });
    if (pool.length <= size) return pool.slice();
    var out = pool.slice();
    for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
    return out.slice(0, size);
  },
  /* pure: next target, never repeating until the set is exhausted */
  whisperNext: function (state, pool) {
    if (!state.order || !state.order.length) {
      var order = pool.map(function (c) { return c.k; });
      for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
      /* a fresh cycle must not re-open on the card we just finished */
      if (state.target && order.length > 1 && order[0] === state.target) { order[0] = order[1]; order[1] = state.target; }
      state.order = order;
    }
    state.target = state.order.shift();
    state.misses = 0;
    return state.target;
  },

  _startWhisper: function () {
    var size = parseInt(this.api.settings.whisperSize, 10) || 12;
    var cards = this._currentCards();
    if (cards.length < 2) return;
    this.mode = 'whisper';
    this.page = 0;
    this.whisper = { target: null, order: [], note: null, misses: 0 };
    this._whisperCards = this.whisperPool(cards, Math.min(size, cards.length));
    this._userGestured = true;
    this.render();
    this._nextWhisper();
  },
  _nextWhisper: function () {
    var self = this;
    var key = this.whisperNext(this.whisper, this._whisperCards);
    var card = this._whisperCards.filter(function (c) { return c.k === key; })[0];
    if (!card) return;
    this._parkFirefly();
    this._paintWhisperBar();
    setTimeout(function () { self._sayTarget(); }, 260);
  },
  _sayTarget: function (slow) {
    var card = this._targetCard();
    if (!card) return;
    var text = this.compose(this.api.lang, card, false);
    try { LCSAudio.speak({ type: 'word', text: text, lang: this.api.lang, rate: slow ? 0.7 : 0.85 }); } catch (_) {}
    this.api.announce(text);
  },
  _targetCard: function () {
    var k = this.whisper.target, list = this._whisperCards || [];
    for (var i = 0; i < list.length; i++) if (list[i].k === k) return list[i];
    return null;
  },
  _whisperTap: function (c) {
    var self = this, api = this.api;
    var target = this._targetCard();
    if (!target) return;
    this._userGestured = true;
    var el = (this._wrap || document).querySelector('.pww-card[data-key="' + (window.CSS && CSS.escape ? CSS.escape(c.k) : c.k) + '"]');
    if (c.k === target.k) {
      this._landFirefly(el);
      this.whisper.note = this.fmt('whisperFound', { word: this.compose(api.lang, target, false) });
      this._paintWhisperBar();
      setTimeout(function () { self._nextWhisper(); }, 1700);
      return;
    }
    /* WRONG TAP — nothing punitive. */
    this.whisper.misses++;
    if (el && el.animate && !this._reducedMotion()) {
      el.animate([{ transform: 'rotate(var(--pww-jit,0deg)) translateY(0)' }, { transform: 'rotate(var(--pww-jit,0deg)) translateY(6px)' }, { transform: 'rotate(var(--pww-jit,0deg)) translateY(0)' }], { duration: 140, easing: 'ease-out' });
    }
    this._driftCloser();
    setTimeout(function () { self._sayTarget(true); }, 240);
    /* the second miss earns a scaffold, never a verdict */
    if (this.whisper.misses >= 2) {
      var tEl = (this._wrap || document).querySelector('.pww-card[data-key="' + (window.CSS && CSS.escape ? CSS.escape(target.k) : target.k) + '"]');
      if (tEl && tEl.animate && !this._reducedMotion()) {
        tEl.animate([{ boxShadow: '0 6px 16px rgba(20,30,28,.09)' }, { boxShadow: '0 0 0 5px rgba(242,200,121,.85)' }, { boxShadow: '0 6px 16px rgba(20,30,28,.09)' }], { duration: 1200, easing: 'ease-in-out' });
      }
    }
  },
  _paintWhisperBar: function () {
    var api = this.api, self = this;
    var bar = (this._wrap || document).querySelector('.pww-whisperbar');
    if (!bar) return;
    bar.innerHTML = '';
    var target = this._targetCard();
    var line = api.el('div', 'pww-whisperline' + (this.whisper.note ? ' found' : ''));
    line.textContent = this.whisper.note || (target ? this.fmt('whisperFind', { word: this.compose(api.lang, target, false) }) : '');
    bar.appendChild(line);
    if (!this.whisper.note) {
      var again = api.el('button', 'pww-chip');
      again.type = 'button';
      again.textContent = '🔊 ' + api.t('whisperAgain');
      again.addEventListener('click', function () { self._userGestured = true; self._sayTarget(); });
      bar.appendChild(again);
    }
  },

  /* ---- the firefly: no face, no name — light, warmth, attention ---- */
  _firefly: function () {
    if (this._flyEl && this._flyEl.isConnected) return this._flyEl;
    var f = this.api.el('div', 'pww-firefly');
    f.setAttribute('aria-hidden', 'true');
    (this._wrap || document.body).appendChild(f);
    this._flyEl = f;
    return f;
  },
  _parkFirefly: function () {
    var f = this._firefly();
    var perch = (this._wrap || document).querySelector('.pww-dock');
    if (!perch) return;
    var r = perch.getBoundingClientRect(), w = this._wrap.getBoundingClientRect();
    f.style.left = (r.left - w.left + 24) + 'px';
    f.style.top = (r.top - w.top + 8) + 'px';
    f.classList.remove('landed');
    f.classList.add('asleep');
  },
  _driftCloser: function () {
    var target = this._targetCard();
    if (!target) return;
    var tEl = (this._wrap || document).querySelector('.pww-card[data-key="' + (window.CSS && CSS.escape ? CSS.escape(target.k) : target.k) + '"]');
    if (!tEl) return;
    var f = this._firefly();
    f.classList.remove('asleep');
    var w = this._wrap.getBoundingClientRect(), t = tEl.getBoundingClientRect();
    var cur = f.getBoundingClientRect();
    /* halve the remaining distance — perceptibly warmer, never a hint */
    var nx = (cur.left - w.left) + ((t.left + t.width / 2 - w.left) - (cur.left - w.left)) * 0.45;
    var ny = (cur.top - w.top) + ((t.top + t.height / 2 - w.top) - (cur.top - w.top)) * 0.45;
    f.style.left = nx + 'px';
    f.style.top = ny + 'px';
  },
  _landFirefly: function (el) {
    var f = this._firefly();
    f.classList.remove('asleep');
    if (!el) return;
    var w = this._wrap.getBoundingClientRect(), t = el.getBoundingClientRect();
    /* the LANDING is quick (600ms) — the 1.6s wander is the drift-closer
       pace for a miss, and at that speed the firefly arrived exactly as
       the halo expired, so the reward moment was never actually seen. */
    f.classList.add('landing');
    f.style.left = (t.left + t.width / 2 - w.left) + 'px';
    f.style.top = (t.top + 12 - w.top) + 'px';
    f.classList.add('landed');
    el.classList.add('pww-found');
    setTimeout(function () {
      el.classList.remove('pww-found');
      f.classList.remove('landing');
    }, 2200);
  },

  /* ================= pinned walls (premium) ======================== */

  _wireLongPress: function (card, c) {
    var self = this, timer = null;
    var start = function () {
      timer = setTimeout(function () {
        timer = null;
        if (!self.premium) { self._gateInline(self._wrap.querySelector('.pww-dock') || self._wrap, 'gatePins'); return; }
        self._togglePin(c);
      }, 480);
    };
    var cancel = function () { if (timer) { clearTimeout(timer); timer = null; } };
    card.addEventListener('pointerdown', start);
    card.addEventListener('pointerup', cancel);
    card.addEventListener('pointerleave', cancel);
    card.addEventListener('pointercancel', cancel);
  },
  _togglePin: function (c) {
    var themeKey = c._theme || this.theme;
    var pins = this._store.pins;
    var at = -1;
    for (var i = 0; i < pins.length; i++) if (pins[i].k === c.k) { at = i; break; }
    if (at >= 0) pins.splice(at, 1);
    else {
      if (pins.length >= this.PIN_MAX) { this._toast(this.api.t('pinFull')); return; }
      pins.push({ k: c.k, t: themeKey });
    }
    this._saveStore();
    this.render();
  },
  _toast: function (msg) {
    var el = this.api.el('div', 'pww-toast');
    el.textContent = msg;
    (this._wrap || document.body).appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 2600);
  },

  reset: function () {
    this.mode = 'wall';
    this.theme = this.FREE_THEMES[0];
    this.page = 0;
    this.hero = null;
    this._closeDrawer();
    this.render();
  },
  onSettings: function () { this._saveStore(); this.render(); }
};

if (typeof window !== 'undefined') window.PictureWordWall = PictureWordWall;

/* A "Show the article" toggle is DEAD in a language with no articles —
   compose() returns the bare word either way — and its label does not
   survive translation: Finnish `artikkeli` reads as a MAGAZINE article
   (the fi ensemble's ruling). So en/fi drop the row entirely.
   This must run BEFORE LCS.mount: the shell builds the settings chrome
   and the drawer body from tool.settings at mount time (lcs-shell.js
   :517 + :547), long before it calls tool.init() (:939) — filtering in
   init would be too late. The locale is resolved exactly as the shell
   does it (?lang= > <html lang> > 'en'). */
if (typeof window !== 'undefined' && typeof document !== 'undefined') (function dropDeadArticleToggle() {
  var lang;
  try {
    lang = new URLSearchParams(window.location.search).get('lang')
      || (document.documentElement.getAttribute('lang') || '').split('-')[0]
      || 'en';
  } catch (_) { lang = 'en'; }
  lang = String(lang).toLowerCase().split('-')[0];
  var rules = PictureWordWall.PWW_ARTICLES[lang];
  if (rules && rules.form === 'none') {
    PictureWordWall.settings = PictureWordWall.settings.filter(function (s) { return s.key !== 'articles'; });
  }
}());

/* per-tool styling: STAGE ONLY + the sanctioned body class */
if (typeof document !== 'undefined') (function injectCSS() {
  var css = ''
  + 'body.pww-wide .lcs-app{max-width:min(1120px,98vw);}'
  /* #lcs-root carries NO height rule, so .lcs-app{height:100%} resolves
     against nothing and the whole chain goes content-driven (root grew
     to 1092px inside a 768px body, and the dock fell under the fold).
     Prior tools dodged this by staying short; the wall must FILL and
     PAGE, so it binds the root to the viewport here — tool-scoped,
     the shell is untouched. Phones opt back out below. */
  + 'body.pww-wide #lcs-root{height:100%;min-height:0;}'
  + '@media (max-width:480px){body.pww-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}}'
  + '.pww-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;height:100%;min-height:0;}'
  + '.pww-loading{flex:1;}'

  /* top bar */
  + '.pww-topbar{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;}'
  + '.pww-themebtn{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(17px,2.2vmin,22px);'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:2px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 20px;min-height:44px;cursor:pointer;}'

  /* THE WALL — a cream plaster field under a teal hanging rail. This
     is the artifact cue: it must read as a classroom wall, not a
     results grid. */
  + '.pww-wall{position:relative;flex:1;min-height:0;width:100%;background:#F7EDD9;'
  +   'border-radius:20px;padding:26px 22px 18px;box-sizing:border-box;overflow:hidden;'
  +   'box-shadow:inset 0 2px 6px rgba(20,30,28,.06);}'
  + '.pww-wall:before{content:"";position:absolute;left:14px;right:14px;top:12px;height:4px;'
  +   'border-radius:2px;background:#146B5E;opacity:.85;}'
  + '.pww-wall.pinned{background:#F2E6CC;}'
  /* 6 × 4 = 24 with EXPLICIT rows: the grid must fill the wall exactly
     and never spill — a 94-card theme PAGES (pips), it never scrolls
     (scrolling destroys the wall metaphor) and it never pushes the
     dock under the fold (the mode-FITS lesson). */
  + '.pww-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(4,minmax(0,1fr));'
  +   'gap:clamp(6px,1.3vmin,16px);justify-content:center;height:100%;overflow:hidden;}'
  + '.pww-empty{display:grid;place-items:center;height:100%;font-family:var(--lcs-font-body);'
  +   'font-weight:700;color:var(--lcs-ink-soft);text-align:center;padding:0 20px;}'

  /* the card */
  /* min-height/min-width:0 — a grid item defaults to min-height:auto,
     which refuses to shrink below its content, so the picture spilled
     over the word band instead of fitting its 1fr row. */
  + '.pww-card{position:relative;display:flex;flex-direction:column;background:#FFFEFB;'
  +   'min-height:0;min-width:0;'
  +   'border:none;border-radius:14px;padding:0;cursor:pointer;overflow:hidden;'
  +   'box-shadow:0 1px 3px rgba(20,30,28,.08),0 6px 16px rgba(20,30,28,.09);'
  +   'transform:rotate(var(--pww-jit,0deg));transition:transform .14s var(--lcs-ease),box-shadow .14s;}'
  + '.pww-card:hover{transform:rotate(var(--pww-jit,0deg)) translateY(-2px);'
  +   'box-shadow:0 2px 5px rgba(20,30,28,.1),0 10px 22px rgba(20,30,28,.13);}'
  + '.pww-card:active{transform:rotate(var(--pww-jit,0deg)) scale(.97);}'
  /* the 6px gender rail — two redundant channels with the article ink */
  + '.pww-card:before{content:"";display:block;height:6px;background:transparent;flex:none;}'
  /* RAILS ARE LOCALE-SCOPED — the gender LETTER is not portable
     (§A.13.58). `n` is neuter in de (das → honey), COMMON in sv/da
     (en → teal), and neuter in no (et → coral). An unscoped
     `.rail-n{coral}` painted German das the same colour as die, so the
     three-colour der/die/das wall — this tool's headline — shipped as
     TWO colours; and `.rail-h` never existed, leaving every Dutch het
     card unpainted (both caught by the sv ensemble reading the CSS).
     Per the visual spec: 3-gender = teal/coral/honey; 2-gender uses
     teal + coral only — honey is never assigned arbitrarily. */
  + '.pww-card:before,.pww-hero:before{background:transparent;}'
  /* de: der / die / das */
  + '[data-loc="de"] .pww-card.rail-m:before{background:#146B5E;}'
  + '[data-loc="de"] .pww-card.rail-f:before{background:#F2784B;}'
  + '[data-loc="de"] .pww-card.rail-n:before{background:#F2C879;}'
  /* nl: de / het */
  + '[data-loc="nl"] .pww-card.rail-d:before{background:#146B5E;}'
  + '[data-loc="nl"] .pww-card.rail-h:before{background:#F2784B;}'
  /* sv, da: en (n = COMMON) / ett, et (t = neuter) */
  + '[data-loc="sv"] .pww-card.rail-n:before,[data-loc="da"] .pww-card.rail-n:before{background:#146B5E;}'
  + '[data-loc="sv"] .pww-card.rail-t:before,[data-loc="da"] .pww-card.rail-t:before{background:#F2784B;}'
  /* no: en (m) / et (n = neuter) */
  + '[data-loc="no"] .pww-card.rail-m:before{background:#146B5E;}'
  + '[data-loc="no"] .pww-card.rail-n:before{background:#F2784B;}'
  /* fr, it, es, pt: masculine / feminine */
  + '[data-loc="fr"] .pww-card.rail-m:before,[data-loc="it"] .pww-card.rail-m:before,[data-loc="es"] .pww-card.rail-m:before,[data-loc="pt"] .pww-card.rail-m:before{background:#146B5E;}'
  + '[data-loc="fr"] .pww-card.rail-f:before,[data-loc="it"] .pww-card.rail-f:before,[data-loc="es"] .pww-card.rail-f:before,[data-loc="pt"] .pww-card.rail-f:before{background:#F2784B;}'
  /* the 4th rail — plural, every locale */
  + '.pww-card.rail-plural:before{background:#6B4C9A;}'
  /* the illustration is absolutely positioned inside a definite-height
     box: a percentage height on a centred grid item resolves against an
     auto-sized area, so the img rendered 135px inside a 60px pic and
     spilled over the word band. */
  + '.pww-pic{position:relative;flex:1;min-height:0;}'
  + '.pww-pic img{position:absolute;inset:4px;width:auto;height:auto;'
  +   'max-width:100%;max-height:100%;margin:auto;object-fit:contain;display:block;}'
  + '.pww-band{flex:none;min-height:34px;display:flex;align-items:baseline;justify-content:center;'
  +   'gap:3px;padding:2px 4px 8px;text-align:center;flex-wrap:nowrap;}'
  + '.pww-word{font-family:var(--lcs-font-body);font-weight:700;font-size:15px;color:#2B2622;'
  +   'line-height:1.15;overflow-wrap:break-word;hyphens:auto;}'
  + '.pww-word.long{font-size:13px;}'
  + '.pww-word.xlong{font-size:11.5px;letter-spacing:-.01em;}'
  + '.pww-art.long{font-size:12px;}'
  + '.pww-art.xlong{font-size:10.5px;}'
  /* the band never breaks the article off the noun — they are one unit */
  + '.pww-band{white-space:nowrap;}'
  + '.pww-band .pww-word{white-space:normal;}'
  /* the hero has room — never shrink there */
  + '.pww-heroband .pww-word.long,.pww-heroband .pww-word.xlong{font-size:clamp(28px,4.4vmin,40px);letter-spacing:0;}'
  /* the article carries the gender colour; #F2C879 is unreadable on
     cream so `das`/neuter ink is deep honey */
  + '.pww-art{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;line-height:1.15;}'
  /* the article ink mirrors its rail — same locale scoping, and deep
     honey for the honey rail (#F2C879 is unreadable on cream) */
  + '[data-loc="de"] .pww-art.g-m{color:#146B5E;}'
  + '[data-loc="de"] .pww-art.g-f{color:#B03F1C;}'
  + '[data-loc="de"] .pww-art.g-n{color:#8A6410;}'
  + '[data-loc="nl"] .pww-art.g-d{color:#146B5E;}'
  + '[data-loc="nl"] .pww-art.g-h{color:#B03F1C;}'
  + '[data-loc="sv"] .pww-art.g-n,[data-loc="da"] .pww-art.g-n{color:#146B5E;}'
  + '[data-loc="sv"] .pww-art.g-t,[data-loc="da"] .pww-art.g-t{color:#B03F1C;}'
  + '[data-loc="no"] .pww-art.g-m{color:#146B5E;}'
  + '[data-loc="no"] .pww-art.g-n{color:#B03F1C;}'
  + '[data-loc="fr"] .pww-art.g-m,[data-loc="it"] .pww-art.g-m,[data-loc="es"] .pww-art.g-m,[data-loc="pt"] .pww-art.g-m{color:#146B5E;}'
  + '[data-loc="fr"] .pww-art.g-f,[data-loc="it"] .pww-art.g-f,[data-loc="es"] .pww-art.g-f,[data-loc="pt"] .pww-art.g-f{color:#B03F1C;}'
  + '.pww-art.plural{color:#5A3D7A;}'
  + '.pww-pin{position:absolute;top:4px;left:50%;transform:translateX(-50%);filter:drop-shadow(0 1px 1px rgba(20,30,28,.3));}'
  + '.pww-slot{border:2px dashed rgba(242,200,121,.85);border-radius:14px;min-height:120px;}'

  /* FRAMELESS GALLERY (en/fi — no gender exists; we do NOT fake a
     colour layer. Bigger pictures, bigger words instead: absence
     handled honestly reads as MORE, not less.) */
  + '.pww-wrap.frameless .pww-grid{grid-template-columns:repeat(7,minmax(0,1fr));gap:clamp(5px,1vmin,12px);}'
  + '.pww-wrap.frameless .pww-card:before{display:none;}'
  + '.pww-wrap.frameless .pww-pic{padding:10px 8px 2px;}'
  + '.pww-wrap.frameless .pww-word{font-size:17px;}'

  /* dock */
  + '.pww-dock{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;flex:none;}'
  + '.pww-pips{display:flex;gap:7px;align-items:center;justify-content:center;}'
  + '.pww-pip{width:44px;height:44px;border:none;background:none;cursor:pointer;display:grid;place-items:center;padding:0;}'
  + '.pww-pip:after{content:"";width:9px;height:9px;border-radius:50%;background:var(--lcs-line);transition:background .15s,transform .15s;}'
  + '.pww-pip.on:after{background:#146B5E;transform:scale(1.35);}'
  + '.pww-chips{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;}'
  + '.pww-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:15px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:2px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 16px;'
  +   'min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.pww-chip:active{transform:scale(.96);}'
  + '.pww-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.pww-chip.locked{color:var(--lcs-ink-soft);}'

  /* the theme drawer */
  + '.pww-scrim{position:fixed;inset:0;background:rgba(20,30,28,.32);z-index:70;}'
  + '.pww-drawer{position:fixed;left:50%;top:0;transform:translateX(-50%);z-index:71;'
  +   'width:min(940px,96vw);max-height:min(86vh,720px);background:var(--lcs-surface);'
  +   'border-radius:0 0 24px 24px;box-shadow:var(--lcs-shadow);padding:16px;'
  +   'display:flex;flex-direction:column;gap:10px;animation:pwwDrop .36s var(--lcs-ease);}'
  + '@keyframes pwwDrop{from{transform:translateX(-50%) translateY(-16px);opacity:0;}to{transform:translateX(-50%) translateY(0);opacity:1;}}'
  + '.pww-filter{font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;border:2px solid var(--lcs-line);'
  +   'border-radius:12px;padding:10px 12px;background:#FFFEFB;color:var(--lcs-ink);min-height:44px;}'
  + '.pww-drawerbody{overflow-y:auto;display:flex;flex-direction:column;gap:6px;}'
  + '.pww-bandlbl{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;letter-spacing:.08em;'
  +   'text-transform:uppercase;color:var(--lcs-ink-soft);padding:8px 2px 2px;}'
  + '.pww-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;}'
  + '.pww-tile{position:relative;background:#FFFEFB;border:2px solid var(--lcs-line);border-radius:14px;'
  +   'padding:6px;cursor:pointer;display:flex;flex-direction:column;gap:4px;min-height:44px;}'
  + '.pww-tile.active{border-color:#146B5E;}'
  + '.pww-tile.locked{opacity:.62;}'
  + '.pww-mosaic{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#FDF6E8;border-radius:8px;padding:3px;}'
  + '.pww-mosaic img{width:100%;height:34px;object-fit:contain;display:block;}'
  /* min-height reserves TWO lines always, so a long localized name
     ("Reptiles and Amphibians") never reflows the tile grid */
  + '.pww-tilename{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;line-height:1.25;'
  +   'color:var(--lcs-ink);text-align:center;min-height:2.5em;display:flex;align-items:center;justify-content:center;}'
  + '.pww-lock{position:absolute;top:6px;right:6px;color:var(--lcs-ink-soft);}'

  /* whisper + the firefly */
  + '.pww-whisperbar{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;}'
  + '.pww-whisperline{font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(18px,2.4vmin,24px);'
  +   'color:var(--lcs-structure);}'
  + '.pww-whisperline.found{color:#8A6410;}'
  + '.pww-wallname{flex:1;max-width:520px;font-family:var(--lcs-font-display);font-weight:700;font-size:17px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:2px dashed var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 18px;min-height:44px;text-align:center;}'
  + '.pww-wallname:focus{border-style:solid;border-color:#146B5E;outline:none;}'
  /* light, warmth, attention — no face, no name */
  + '.pww-firefly{position:absolute;width:10px;height:10px;border-radius:50%;background:#F2C879;'
  +   'box-shadow:0 0 22px 8px rgba(242,200,121,.35),0 0 6px 2px rgba(242,200,121,.6);'
  +   'pointer-events:none;z-index:5;transform:translate(-50%,-50%);'
  +   'transition:left 1.6s cubic-bezier(.4,.1,.3,1),top 1.6s cubic-bezier(.4,.1,.3,1);'
  +   'animation:pwwBob 1.1s ease-in-out infinite;}'
  + '.pww-firefly.asleep{opacity:.4;animation:none;}'
  + '.pww-firefly.landing{transition:left .6s cubic-bezier(.2,.8,.3,1),top .6s cubic-bezier(.2,.8,.3,1);}'
  + '.pww-firefly.landed{animation:pwwGlow 1.2s ease-in-out 2;}'
  + '@keyframes pwwBob{0%,100%{margin-top:0;}50%{margin-top:-3px;}}'
  + '@keyframes pwwGlow{0%,100%{box-shadow:0 0 22px 8px rgba(242,200,121,.35),0 0 6px 2px rgba(242,200,121,.6);}'
  +   '50%{box-shadow:0 0 34px 14px rgba(242,200,121,.6),0 0 10px 4px rgba(242,200,121,.9);}}'
  + '.pww-card.pww-found{box-shadow:0 4px 20px rgba(242,200,121,.55),0 0 0 3px rgba(242,200,121,.8)!important;'
  +   'transform:rotate(var(--pww-jit,0deg)) translateY(-4px);}'
  + '.pww-toast{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:8;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-ink);'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:999px;padding:8px 16px;}'

  /* the hero */
  + '.pww-heroscrim{position:fixed;inset:0;background:rgba(20,107,94,.18);backdrop-filter:blur(2px);z-index:72;}'
  + '.pww-hero{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:73;'
  +   'width:min(520px,92vw);height:min(620px,86vh);background:#FFFEFB;border-radius:24px;'
  +   'box-shadow:0 8px 24px rgba(20,30,28,.18),0 30px 70px rgba(20,30,28,.22);'
  +   'display:flex;flex-direction:column;overflow:hidden;}'
  + '.pww-hero:before{content:"";display:block;height:10px;flex:none;background:transparent;}'
  /* the hero's rail follows the same locale scoping as the wall's */
  + '[data-loc="de"] .pww-hero.rail-m:before{background:#146B5E;}'
  + '[data-loc="de"] .pww-hero.rail-f:before{background:#F2784B;}'
  + '[data-loc="de"] .pww-hero.rail-n:before{background:#F2C879;}'
  + '[data-loc="nl"] .pww-hero.rail-d:before{background:#146B5E;}'
  + '[data-loc="nl"] .pww-hero.rail-h:before{background:#F2784B;}'
  + '[data-loc="sv"] .pww-hero.rail-n:before,[data-loc="da"] .pww-hero.rail-n:before{background:#146B5E;}'
  + '[data-loc="sv"] .pww-hero.rail-t:before,[data-loc="da"] .pww-hero.rail-t:before{background:#F2784B;}'
  + '[data-loc="no"] .pww-hero.rail-m:before{background:#146B5E;}'
  + '[data-loc="no"] .pww-hero.rail-n:before{background:#F2784B;}'
  + '[data-loc="fr"] .pww-hero.rail-m:before,[data-loc="it"] .pww-hero.rail-m:before,[data-loc="es"] .pww-hero.rail-m:before,[data-loc="pt"] .pww-hero.rail-m:before{background:#146B5E;}'
  + '[data-loc="fr"] .pww-hero.rail-f:before,[data-loc="it"] .pww-hero.rail-f:before,[data-loc="es"] .pww-hero.rail-f:before,[data-loc="pt"] .pww-hero.rail-f:before{background:#F2784B;}'
  + '.pww-hero.rail-plural:before{background:#6B4C9A;}'
  + '.pww-heropic{position:relative;flex:1;min-height:0;display:grid;place-items:center;padding:8px;}'
  + '.pww-heroimg{position:absolute;max-width:92%;max-height:92%;width:auto;height:auto;object-fit:contain;}'
  /* the shallow arc — resting transforms are set inline in JS (literal,
     not var()) so the same values drive the animation and the rest */
  + '.pww-heroband{flex:none;display:flex;align-items:baseline;justify-content:center;gap:8px;'
  +   'padding:4px 16px;flex-wrap:wrap;}'
  + '.pww-heroband .pww-word{font-family:var(--lcs-font-display);font-size:clamp(28px,4.4vmin,40px);}'
  + '.pww-heroband .pww-art{font-family:var(--lcs-font-display);font-size:clamp(26px,4vmin,38px);}'
  + '.pww-heronote{flex:none;font-family:var(--lcs-font-body);font-weight:700;font-size:14px;'
  +   'color:#8A6410;background:#FDF0DC;border-radius:999px;padding:6px 14px;margin:0 auto 6px;}'
  + '.pww-herorow{flex:none;display:flex;align-items:center;justify-content:center;gap:12px;padding:0 16px 18px;}'
  + '.pww-toggle{display:inline-flex;background:var(--lcs-surface-2);border-radius:999px;padding:4px;gap:4px;}'
  + '.pww-togbtn{font-family:var(--lcs-font-display);font-weight:700;font-size:16px;color:var(--lcs-ink-soft);'
  +   'background:transparent;border:none;border-radius:999px;padding:8px 20px;min-height:44px;cursor:pointer;}'
  + '.pww-togbtn.on{background:#146B5E;color:#fff;}'
  + '.pww-herospk{width:52px;height:52px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:#F2784B;color:#fff;border:none;cursor:pointer;box-shadow:0 3px 0 0 #C9502A;}'
  + '.pww-herospk:active{transform:translateY(2px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.pww-heroclose{position:absolute;top:14px;right:14px;width:44px;height:44px;border-radius:50%;'
  +   'border:none;background:var(--lcs-surface-2);color:var(--lcs-ink-soft);font-size:18px;'
  +   'font-weight:700;cursor:pointer;z-index:2;}'

  /* gate */
  + '.pww-gate{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:16px;padding:10px 16px;max-width:620px;margin:0 auto;}'
  + '.pww-gatemsg{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink);}'
  + '.pww-gatelink{font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:#fff;'
  +   'background:#F2784B;border-radius:999px;padding:8px 16px;text-decoration:none;box-shadow:0 2px 0 0 #C9502A;}'

  /* phone */
  + '@media (max-width:560px){'
  +   'body.pww-wide{overflow-y:auto;}'
  +   'body.pww-wide #lcs-root{height:auto;}'
  +   '.pww-wall{padding:20px 10px 12px;height:auto;flex:none;}'
  /* phone: the wall yields to a 2-up scroll (the metaphor bends, the
     reachability rule wins) */
  +   '.pww-wrap{height:auto;}'
  +   '.pww-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:none;height:auto;}'
  +   '.pww-wrap.frameless .pww-grid{grid-template-columns:repeat(2,minmax(0,1fr));}'
  +   '.pww-card{min-height:150px;}'
  +   '.pww-card{transform:none;}'
  +   '.pww-card:hover,.pww-card:active{transform:none;}'
  +   '.pww-pic img{max-height:88px;}'
  +   '.pww-drawer{width:100vw;max-height:92vh;border-radius:0;}'
  +   '.pww-hero{width:100vw;height:100dvh;max-height:100vh;border-radius:0;}'
  +   '.pww-heroimg.i1{--pww-to:translate(-64px,6px) rotate(-4deg) scale(.62);transform:translate(-64px,6px) rotate(-4deg) scale(.62);}'
  +   '.pww-heroimg.i2{--pww-to:translate(64px,10px) rotate(5deg) scale(.62);transform:translate(64px,10px) rotate(5deg) scale(.62);}'
  + '}'
  + '@media (prefers-reduced-motion: reduce){'
  +   '.pww-drawer{animation:none;}'
  +   '.pww-card{transition:none;}'
  +   '.pww-firefly{animation:none;transition:none;}'
  +   '.pww-firefly.landed{animation:none;box-shadow:0 0 34px 14px rgba(242,200,121,.6);}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
