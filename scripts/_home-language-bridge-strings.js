/* =====================================================================
   _home-language-bridge-strings.js — the SOURCE OF TRUTH for every
   authored word in the Say It Board.
   ---------------------------------------------------------------------
   ⚠⚠ THIS FILE EXISTS BECAUSE THE ONE IT REPLACES NEVER DID.
   The v2 build's docblock stated that its ten non-English phrase sets
   were "corrected in place by scripts/apply-home-language-bridge-fanout.js
   from the per-locale native 3-agent ensembles". That script was never
   written. The only two occurrences of the name in the entire repository
   were the comment itself and its own gitignored mirror, and `git log`
   on the tool showed exactly two commits: the original build and one
   layout fix. So the ten were still the machine drafts the comment
   admitted they started as, and NO FINN HAD EVER READ THE FINNISH FOR
   "I NEED THE TOILET".

   That matters more here than anywhere else in the product, because the
   register IS the moat. These are the only strings in the codebase
   where the CHILD is the speaker, in the first person, to an adult.
   Everything else — routine labels, adult offers, system announcements
   — is spoken BY an adult TO a child. `our-day.js` has a `bathroom`
   label ("Toilettid", "le passage aux toilettes"); that is a timetable
   entry, not a request. Flipping the person flips politeness formulas,
   the child-to-teacher register, and whether the toilet request is
   euphemised — and it is, differently, in every one of the eleven.

   HOW TO WORK ON THIS FILE
     · edit here, never in `mini tools/home-language-bridge.js`
     · then run: node scripts/apply-home-language-bridge-locales.js
     · `--brief` prints the native-panel work list (everything still
       marked draft) instead of writing anything
     · `--self-test` runs every ban in BOTH directions

   THE REGISTER RULES, which bind every panel
     1. FIRST PERSON, CHILD TO ADULT. Never an instruction, never an
        offer, never a label.
     2. THE CHILD-TO-TEACHER REGISTER OF THAT LANGUAGE, not the
        child-to-parent one. Several of the eleven have a nursery
        register that shames a seven-year-old.
     3. NAME THE ROOM, NOT THE ACT, and use the euphemism a child of
        that language actually uses at school.
     4. ONE CLAUSE. Two clauses are two requests and the adult answers
        one of them.
     5. NO BLAME WORD anywhere near the body cards. "I need dry clothes"
        never becomes "I had an accident" in any language.
     6. TYPOGRAPHIC APOSTROPHES ONLY — the straight one is banned by the
        gate and by every sibling tool.
   ===================================================================== */
'use strict';

/* ---------------------------------------------------------------------
   THE CHROME — what the adult reads. Not on the apparatus.
   ------------------------------------------------------------------- */
const STRINGS = {
  title:       {en:'Say It Board',de:'Sag-es-Tafel',fr:'Le tableau pour se faire comprendre',it:'La tabella per farsi capire',es:'El tablero para decirlo',pt:'Meu quadro para falar',nl:'Het praatbord',sv:'Säg-det-tavlan',da:'Sig-det-tavlen',no:'Si-det-tavla',fi:'Puhetaulu'},
  instruction: {en:'Tap a picture and it is said out loud, in the language of the class.',de:'Tippe ein Bild an — die Klasse hört es laut, in der Sprache des Klassenzimmers.',fr:'Touche une image — la classe l’entend à voix haute, dans la langue de la classe.',it:'Tocca un’immagine — la classe la sente ad alta voce, nella lingua dell’aula.',es:'Toca una imagen — la clase lo oye en voz alta, en el idioma del aula.',pt:'Toque numa imagem — a turma ouve em voz alta, na língua da sala.',nl:'Tik op een plaatje en het wordt hardop gezegd, in de taal van de klas.',sv:'Tryck på en bild — klassen hör det högt, på klassrummets språk.',da:'Tryk på et billede — klassen hører det højt, på klassens sprog.',no:'Trykk på et bilde — klassen hører det høyt, på klasserommets språk.',fi:'Napauta kuvaa — luokka kuulee sen ääneen, luokan kielellä.'},

  /* the five category tabs. ⚠ Icons as well as words: the child who
     needs this board cannot read the tab. */
  catBody:     {en:'My body',de:'Mein Körper',fr:'Mon corps',it:'Il mio corpo',es:'Mi cuerpo',pt:'Meu corpo',nl:'Mijn lijf',sv:'Min kropp',da:'Min krop',no:'Kroppen min',fi:'Kehoni'},
  catUnder:    {en:'I don’t understand',de:'Ich verstehe nicht',fr:'Je ne comprends pas',it:'Non capisco',es:'No entiendo',pt:'Não entendi',nl:'Ik snap het niet',sv:'Jag förstår inte',da:'Jeg forstår ikke',no:'Jeg forstår ikke',fi:'En ymmärrä'},
  catNow:      {en:'What now',de:'Was jetzt passiert',fr:'Et maintenant ?',it:'Che cosa succede adesso',es:'Lo que pasa ahora',pt:'O que acontece agora',nl:'Wat er nu gebeurt',sv:'Vad händer nu',da:'Hvad sker der nu',no:'Hva skjer nå',fi:'Mitä nyt tapahtuu'},
  catOthers:   {en:'Being with others',de:'Mit den anderen',fr:'Avec les autres',it:'Stare con gli altri',es:'Estar con los demás',pt:'Estar com os outros',nl:'Samen met anderen',sv:'Tillsammans med andra',da:'Sammen med andre',no:'Sammen med andre',fi:'Muiden kanssa'},
  catMywords:  {en:'My words, my turn',de:'Meine Wörter',fr:'Mes mots, mon tour',it:'Le mie parole, tocca a me',es:'Mis palabras, mi turno',pt:'Minhas palavras, minha vez',nl:'Mijn woorden, mijn beurt',sv:'Mina ord, min tur',da:'Mine ord, min tur',no:'Mine ord, min tur',fi:'Minun sanani, minun vuoroni'},
  catMine:     {en:'Our own phrases',de:'Unsere Klasse',fr:'Notre classe',it:'La nostra classe',es:'Nuestra clase',pt:'Nossa turma',nl:'Onze klas',sv:'Vår klass',da:'Vores klasse',no:'Klassen vår',fi:'Meidän luokkamme'},

  /* the language bar. ⚠ "Change language" in the v2 build opened the
     HOME-language picker while the language the board SPEAKS was
     settable only from the page URL — the wrong language, under the
     right label. Both are now named for what they are. */
  roomLang:    {en:'The class hears',de:'Die Klasse hört',fr:'La classe entend',it:'La classe sente',es:'La clase oye',pt:'A turma ouve',nl:'De klas hoort',sv:'Klassen hör',da:'Klassen hører',no:'Klassen hører',fi:'Luokka kuulee'},
  addHome:     {en:'Add the child’s language',de:'Sprache des Kindes hinzufügen',fr:'Ajouter la langue de l’enfant',it:'Aggiungi la lingua del bambino',es:'Añadir el idioma del niño',pt:'Adicionar a língua da criança',nl:'De taal van het kind toevoegen',sv:'Lägg till barnets språk',da:'Tilføj barnets sprog',no:'Legg til barnets språk',fi:'Lisää lapsen kieli'},
  homeHint:    {en:'Add it only if the child’s language is on this list — the pictures work in any language.',de:'Nur wenn sie in der Liste steht — die Bilder helfen in jeder Sprache.',fr:'Seulement si elle est dans la liste — les images marchent quelle que soit la langue.',it:'Solo se è tra queste — le immagini funzionano qualunque lingua parli.',es:'Solo si está en la lista — las imágenes funcionan hable el idioma que hable.',nl:'Alleen als die erbij staat — de plaatjes werken bij elke taal.',pt:'Só se estiver na lista — as imagens funcionam seja qual for a língua.',sv:'Bara om det finns med — bilderna fungerar oavsett språk.',da:'Kun hvis det er på listen — billederne virker uanset sprog.',no:'Bare hvis det er på lista — bildene virker uansett språk.',fi:'Vain jos se on listalla — kuvat toimivat kielestä riippumatta.'},
  noHome:      {en:'Pictures only',de:'Nur Bilder',fr:'Images uniquement',it:'Solo immagini',es:'Solo imágenes',pt:'Só imagens',nl:'Alleen plaatjes',sv:'Bara bilder',da:'Kun billeder',no:'Bare bilder',fi:'Vain kuvat'},
  changeHome:  {en:'Change',de:'Ändern',fr:'Changer',it:'Cambia',es:'Cambiar',pt:'Mudar',nl:'Wijzigen',sv:'Byt',da:'Skift',no:'Bytt',fi:'Vaihda'},

  /* the hold-this-up view */
  showBig:     {en:'Show big',de:'Groß zeigen',fr:'Afficher en grand',it:'Mostra in grande',es:'Mostrar en grande',pt:'Mostrar ampliado',nl:'Groot laten zien',sv:'Visa stort',da:'Vis stort',no:'Vis stort',fi:'Näytä isona'},
  bigHint:     {en:'Tap anywhere to close.',de:'Tippe irgendwohin, um zu schließen.',fr:'Touche n’importe où pour fermer.',it:'Tocca dove vuoi per chiudere.',es:'Toca en cualquier sitio para cerrar.',pt:'Toque em qualquer lugar para fechar.',nl:'Tik ergens op om te sluiten.',sv:'Tryck var som helst för att stänga.',da:'Tryk et vilkårligt sted for at lukke.',no:'Trykk hvor som helst for å lukke.',fi:'Sulje napauttamalla mihin tahansa.'},
  sayAloud:    {en:'Say this out loud',de:'Laut sagen',fr:'Dire ceci à voix haute',it:'Di’ questo ad alta voce',es:'Decir esto en voz alta',pt:'Dizer isso em voz alta',nl:'Dit hardop zeggen',sv:'Säg det här högt',da:'Sig det her højt',no:'Si dette høyt',fi:'Sano tämä ääneen'},
  sayInHome:   {en:'Hear it in your language',de:'In deiner Sprache hören',fr:'L’entendre dans ta langue',it:'Sentilo nella tua lingua',es:'Escúchalo en tu idioma',pt:'Ouvir na sua língua',nl:'Hoor het in jouw taal',sv:'Hör det på ditt språk',da:'Hør det på dit sprog',no:'Hør det på ditt språk',fi:'Kuule se omalla kielelläsi'},

  /* ⭐ THE INVENTION, said plainly: with no voice the apparatus
     reconfigures rather than apologising. */
  noVoiceBig:  {en:'This device has no voice for this language, so the board shows every card big instead.',de:'Dieses Gerät hat keine Stimme für diese Sprache — die Tafel zeigt jede Karte stattdessen groß.',fr:'Cet appareil n’a pas de voix pour cette langue : le tableau affiche chaque carte en grand.',it:'Questo dispositivo non ha una voce per quella lingua: la tabella mostra ogni scheda in grande.',es:'Este dispositivo no tiene voz para ese idioma, así que el tablero muestra cada tarjeta en grande.',pt:'Este aparelho não tem voz para essa língua, por isso o quadro mostra cada cartão em grande.',nl:'Dit apparaat heeft geen stem voor die taal, dus het bord toont elke kaart groot.',sv:'Den här enheten har ingen röst för det språket, så tavlan visar varje kort stort i stället.',da:'Denne enhed har ingen stemme til det sprog, så tavlen viser hvert kort stort i stedet.',no:'Denne enheten har ingen stemme for det språket, så tavla viser hvert kort stort i stedet.',fi:'Tässä laitteessa ei ole ääntä sille kielelle, joten taulu näyttää jokaisen kortin isona.'},
  noVoiceHome: {en:'No voice for this language on this device — the words are shown, not spoken.',de:'Keine Stimme für diese Sprache auf diesem Gerät — die Wörter werden gezeigt, nicht gesprochen.',fr:'Pas de voix pour cette langue sur cet appareil — les mots sont affichés, pas prononcés.',it:'Nessuna voce per questa lingua su questo dispositivo — le parole sono mostrate, non pronunciate.',es:'No hay voz para este idioma en este dispositivo — las palabras se muestran, no se dicen.',pt:'Não há voz para esta língua neste aparelho — as palavras aparecem, não são faladas.',nl:'Geen stem voor deze taal op dit apparaat — de woorden worden getoond, niet uitgesproken.',sv:'Ingen röst för det här språket på enheten — orden visas men sägs inte.',da:'Ingen stemme til dette sprog på enheden — ordene vises, men siges ikke.',no:'Ingen stemme for dette språket på enheten — ordene vises, men sies ikke.',fi:'Tälle kielelle ei ole ääntä tässä laitteessa — sanat näytetään, mutta niitä ei sanota.'},

  /* ⚠ HONEST. The v2 line said "Nothing here is saved, counted or sent
     anywhere" while _saveStore() wrote the chosen home language and the
     settings to localStorage on every change. A privacy claim that does
     not match the model is the same defect as a paywall that does not. */
  privacy:     {en:'Nothing about the child is measured or sent anywhere. Your choices stay on this device.',de:'Über das Kind wird nichts gemessen und nichts weitergegeben. Ihre Einstellungen bleiben auf diesem Gerät.',fr:'Rien n’est mesuré ni envoyé au sujet de l’enfant. Vos choix restent sur cet appareil.',it:'Sul bambino non si misura né si invia nulla. Le tue scelte restano su questo dispositivo.',es:'No se mide ni se envía nada sobre el niño. Tus opciones se quedan en este dispositivo.',pt:'Nada sobre a criança é medido ou enviado. As suas escolhas ficam neste aparelho.',nl:'Er wordt niets over het kind gemeten of verstuurd. Je keuzes blijven op dit apparaat.',sv:'Ingenting om barnet mäts eller skickas någonstans. Dina val stannar på den här enheten.',da:'Der måles eller sendes intet om barnet. Dine valg bliver på denne enhed.',no:'Ingenting om barnet måles eller sendes noe sted. Valgene dine blir på denne enheten.',fi:'Lapsesta ei mitata eikä lähetetä mitään. Valintasi pysyvät tässä laitteessa.'},

  /* the teacher desk */
  teacherKey:  {en:'For the teacher',de:'Für die Lehrkraft',fr:'Espace enseignant',it:'Per l’insegnante',es:'Para docentes',pt:'Para o professor',nl:'Voor de leerkracht',sv:'För läraren',da:'Til læreren',no:'For læreren',fi:'Opettajalle'},
  deskTitle:   {en:'Add a phrase this class needs',de:'Einen Satz hinzufügen, den diese Klasse braucht',fr:'Ajouter une phrase dont cette classe a besoin',it:'Aggiungi una frase che serve a questa classe',es:'Añadir una frase que esta clase necesita',pt:'Adicionar uma frase de que esta turma precisa',nl:'Een zin toevoegen die deze klas nodig heeft',sv:'Lägg till en fras den här klassen behöver',da:'Tilføj en sætning, denne klasse har brug for',no:'Legg til en setning denne klassen trenger',fi:'Lisää lause, jota tämä luokka tarvitsee'},
  deskHint:    {en:'Pick an opening, then finish it in the child’s own words. The board always speaks as the child.',de:'Wählen Sie einen Anfang und vervollständigen Sie ihn mit den Worten des Kindes. Die Tafel spricht immer als das Kind.',fr:'Choisissez un début, puis complétez-le avec les mots de l’enfant. Le tableau parle toujours comme l’enfant.',it:'Scegli un inizio e completalo con la voce del bambino. La tabella parla sempre come il bambino.',es:'Elige un comienzo y complétalo con la voz del niño. El tablero siempre habla como el niño.',pt:'Escolha um começo e complete-o na voz da criança. O quadro fala sempre como a criança.',nl:'Kies een begin en maak het af in de woorden van het kind. Het bord spreekt altijd als het kind.',sv:'Välj en början och skriv klart meningen med barnets egna ord. Tavlan talar alltid som barnet.',da:'Vælg en begyndelse, og gør den færdig med barnets egne ord. Tavlen taler altid som barnet.',no:'Velg en begynnelse og fullfør den med barnets egne ord. Tavla snakker alltid som barnet.',fi:'Valitse aloitus ja täydennä se lapsen omin sanoin. Taulu puhuu aina lapsen suulla.'},
  pickIcon:    {en:'Pick a picture',de:'Bild auswählen',fr:'Choisir une image',it:'Scegli un’immagine',es:'Elige una imagen',pt:'Escolha uma imagem',nl:'Kies een plaatje',sv:'Välj en bild',da:'Vælg et billede',no:'Velg et bilde',fi:'Valitse kuva'},
  iconRecent:  {en:'Recently used',de:'Zuletzt benutzt',fr:'Récentes',it:'Recenti',es:'Recientes',pt:'Recentes',nl:'Recent',sv:'Senaste',da:'Seneste',no:'Nylige',fi:'Viimeisimmät'},
  iconAll:     {en:'All pictures',de:'Alle Bilder',fr:'Toutes les images',it:'Tutte le immagini',es:'Todas las imágenes',pt:'Todas as imagens',nl:'Alle plaatjes',sv:'Alla bilder',da:'Alle billeder',no:'Alle bilder',fi:'Kaikki kuvat'},
  pickCat:     {en:'Which group?',de:'Welche Gruppe?',fr:'Quel groupe ?',it:'Quale gruppo?',es:'¿Qué grupo?',pt:'Qual grupo?',nl:'In welke rubriek?',sv:'Vilken grupp?',da:'Hvilken gruppe?',no:'Hvilken gruppe?',fi:'Mikä ryhmä?'},
  homeLine:    {en:'The same phrase in the child’s language (optional)',de:'Derselbe Satz in der Sprache des Kindes (optional)',fr:'La même phrase dans la langue de l’enfant (facultatif)',it:'La stessa frase nella lingua del bambino (facoltativo)',es:'La misma frase en el idioma del niño (opcional)',pt:'A mesma frase na língua da criança (opcional)',nl:'Dezelfde zin in de taal van het kind (optioneel)',sv:'Samma fras på barnets språk (valfritt)',da:'Den samme sætning på barnets sprog (valgfrit)',no:'Den samme setningen på barnets språk (valgfritt)',fi:'Sama lause lapsen kielellä (valinnainen)'},
  homeLineWhy: {en:'Type it only if someone who speaks it wrote it for you. Nothing here is translated by machine.',de:'Nur eintragen, wenn jemand, der die Sprache spricht, es für Sie aufgeschrieben hat. Hier wird nichts maschinell übersetzt.',fr:'À saisir seulement si quelqu’un qui parle cette langue vous l’a écrit. Rien n’est traduit automatiquement ici.',it:'Scrivilo solo se te lo ha scritto qualcuno che parla quella lingua. Qui non si traduce nulla a macchina.',es:'Escríbelo solo si te lo ha escrito alguien que habla ese idioma. Aquí no se traduce nada a máquina.',pt:'Escreva apenas se alguém que fala essa língua escreveu para você. Aqui nada é traduzido por máquina.',nl:'Alleen invullen als iemand die de taal spreekt het voor je heeft opgeschreven. Hier wordt niets machinaal vertaald.',sv:'Skriv bara in det om någon som talar språket har skrivit det åt dig. Ingenting här maskinöversätts.',da:'Skriv det kun, hvis nogen der taler sproget har skrevet det til dig. Intet her maskinoversættes.',no:'Skriv det bare inn hvis noen som snakker språket har skrevet det for deg. Ingenting her maskinoversettes.',fi:'Kirjoita se vain, jos kielen puhuja on kirjoittanut sen sinulle. Täällä ei konekäännetä mitään.'},
  showOnBoard: {en:'Put it on the board',de:'Auf die Tafel legen',fr:'La mettre au tableau',it:'Mettila sulla tabella',es:'Ponerla en el tablero',pt:'Colocar no quadro',nl:'Op het bord zetten',sv:'Visa den på tavlan',da:'Vis den på tavlen',no:'Vis den på tavla',fi:'Laita se taululle'},
  keepPhrase:  {en:'Keep it',de:'Behalten',fr:'La garder',it:'Salvala',es:'Guardarla',pt:'Guardar',nl:'Bewaren',sv:'Spara den',da:'Gem den',no:'Behold den',fi:'Pidä se'},
  kept:        {en:'{n} of {max} kept',de:'{n} von {max} behalten',fr:'{n} sur {max} gardées',it:'{n} di {max} salvate',es:'{n} de {max} guardadas',pt:'{n} de {max} guardadas',nl:'{n} van {max} bewaard',sv:'{n} av {max} sparade',da:'{n} af {max} gemt',no:'{n} av {max} beholdt',fi:'{n}/{max} tallennettu'},
  removePhrase:{en:'Remove',de:'Entfernen',fr:'Retirer',it:'Togli',es:'Quitar',pt:'Remover',nl:'Verwijderen',sv:'Ta bort',da:'Fjern',no:'Fjern',fi:'Poista'},
  undo:        {en:'Undo',de:'Rückgängig',fr:'Rétablir',it:'Annulla',es:'Deshacer',pt:'Desfazer',nl:'Ongedaan maken',sv:'Ångra',da:'Fortryd',no:'Angre',fi:'Kumoa'},
  closeDesk:   {en:'Back to the board',de:'Zurück zur Tafel',fr:'Retour au tableau',it:'Torna alla tabella',es:'Volver al tablero',pt:'Voltar ao quadro',nl:'Terug naar het bord',sv:'Tillbaka till tavlan',da:'Tilbage til tavlen',no:'Tilbake til tavla',fi:'Takaisin taululle'},

  /* ⚠ EVERY REFUSAL HAS ITS OWN STRING. Three refusals that shared one
     message were false in two of them, and a mute disabled button
     explains nothing at all. */
  needStarter: {en:'Pick an opening first.',de:'Wählen Sie zuerst einen Anfang.',fr:'Choisissez d’abord un début.',it:'Scegli prima un inizio.',es:'Elige primero un comienzo.',pt:'Escolha primeiro um começo.',nl:'Kies eerst een begin.',sv:'Välj en början först.',da:'Vælg en begyndelse først.',no:'Velg en begynnelse først.',fi:'Valitse ensin aloitus.'},
  needWords:   {en:'Finish the sentence.',de:'Vervollständigen Sie den Satz.',fr:'Complétez la phrase.',it:'Completa la frase.',es:'Termina la frase.',pt:'Termine a frase.',nl:'Maak de zin af.',sv:'Skriv klart meningen.',da:'Gør sætningen færdig.',no:'Fullfør setningen.',fi:'Täydennä lause.'},
  tooLong:     {en:'That is longer than {n} characters. A phrase a child cannot take in at a glance is one they will not find under pressure.',de:'Das ist länger als {n} Zeichen. Ein Satz, den ein Kind nicht auf einen Blick erfasst, wird unter Druck nicht gefunden.',fr:'C’est plus long que {n} caractères. Une phrase qu’un enfant ne saisit pas d’un coup d’œil, il ne la trouvera pas sous pression.',it:'È più lungo di {n} caratteri. Una frase che un bambino non coglie a colpo d’occhio non la troverà sotto pressione.',es:'Eso pasa de {n} caracteres. Una frase que un niño no capta de un vistazo no la encontrará bajo presión.',pt:'Isso passa de {n} caracteres. Uma frase que a criança não capta num relance não será encontrada sob pressão.',nl:'Dat is langer dan {n} tekens. Een zin die een kind niet in één oogopslag ziet, vindt het niet onder druk.',sv:'Det är längre än {n} tecken. En fras ett barn inte fattar med en blick hittar det inte under press.',da:'Det er længere end {n} tegn. En sætning et barn ikke fatter med et blik, finder det ikke under pres.',no:'Det er lengre enn {n} tegn. En setning et barn ikke fatter med et blikk, finner det ikke under press.',fi:'Tuo on yli {n} merkkiä. Lause jota lapsi ei hahmota yhdellä silmäyksellä jää löytymättä paineen alla.'},
  needIcon:    {en:'Pick a picture. The child who needs this cannot read the words.',de:'Wählen Sie ein Bild. Das Kind, das sie braucht, kann diese Wörter nicht lesen.',fr:'Choisissez une image. L’enfant qui en a besoin ne peut pas encore lire ces mots.',it:'Scegli un’immagine. Chi ne ha bisogno non riesce ancora a leggere queste parole.',es:'Elige una imagen. Quien la necesita todavía no puede leer estas palabras.',pt:'Escolha uma imagem. A criança que precisa dela não sabe ler as palavras.',nl:'Kies een plaatje. Het kind dat dit nodig heeft kan de woorden niet lezen.',sv:'Välj en bild. Barnet som behöver den kan inte läsa orden.',da:'Vælg et billede. Barnet der har brug for det, kan ikke læse ordene.',no:'Velg et bilde. Barnet som trenger det, kan ikke lese ordene.',fi:'Valitse kuva. Lapsi, joka tätä tarvitsee, ei osaa lukea näitä sanoja.'},
  needCat:     {en:'Pick a group for it.',de:'Wählen Sie eine Gruppe dafür.',fr:'Choisissez un groupe.',it:'Scegli un gruppo.',es:'Elige un grupo.',pt:'Escolha um grupo.',nl:'Kies er een rubriek bij.',sv:'Välj en grupp.',da:'Vælg en gruppe.',no:'Velg en gruppe.',fi:'Valitse ryhmä.'},
  oneThing:    {en:'One thing at a time — two sentences are two requests, and only one gets answered.',de:'Eins nach dem anderen — zwei Sätze sind zwei Bitten, und nur eine wird beantwortet.',fr:'Une chose à la fois — deux phrases font deux demandes, et une seule reçoit une réponse.',it:'Una cosa alla volta — due frasi sono due richieste, e ne viene esaudita una sola.',es:'Una cosa a la vez — dos frases son dos peticiones, y solo se responde a una.',pt:'Uma coisa de cada vez — duas frases são dois pedidos, e só um é atendido.',nl:'Eén ding tegelijk — twee zinnen zijn twee vragen, en er wordt er maar één beantwoord.',sv:'En sak i taget — två meningar är två önskningar, och bara en besvaras.',da:'Én ting ad gangen — to sætninger er to ønsker, og kun ét bliver besvaret.',no:'Én ting om gangen — to setninger er to ønsker, og bare ett blir besvart.',fi:'Yksi asia kerrallaan — kaksi lausetta on kaksi pyyntöä, ja vain toiseen vastataan.'},
  duplicate:   {en:'That phrase is already on the board.',de:'Dieser Satz steht schon auf der Tafel.',fr:'Cette phrase est déjà au tableau.',it:'Quella frase è già sulla tabella.',es:'Esa frase ya está en el tablero.',pt:'Essa frase já está no quadro.',nl:'Die zin staat al op het bord.',sv:'Den frasen finns redan på tavlan.',da:'Den sætning står allerede på tavlen.',no:'Den setningen står allerede på tavla.',fi:'Se lause on jo taululla.'},
  catFull:     {en:'This group already holds {n} of your phrases.',de:'Diese Gruppe enthält schon {n} Ihrer Sätze.',fr:'Ce groupe contient déjà {n} de vos phrases.',it:'Questo gruppo contiene già {n} tue frasi.',es:'Este grupo ya tiene {n} frases tuyas.',pt:'Este grupo já tem {n} frases suas.',nl:'In deze rubriek staan al {n} van je zinnen.',sv:'Den här gruppen har redan {n} av dina fraser.',da:'Denne gruppe har allerede {n} af dine sætninger.',no:'Denne gruppa har allerede {n} av setningene dine.',fi:'Tässä ryhmässä on jo {n} lausettasi.'},
  allFull:     {en:'You have kept {n} phrases. Remove one to add another.',de:'Sie haben {n} Sätze behalten. Entfernen Sie einen, um einen weiteren hinzuzufügen.',fr:'Vous avez gardé {n} phrases. Retirez-en une pour en ajouter une autre.',it:'Hai tenuto {n} frasi. Togline una per aggiungerne un’altra.',es:'Has guardado {n} frases. Quita una para añadir otra.',pt:'Você guardou {n} frases. Remova uma para adicionar outra.',nl:'Je hebt {n} zinnen bewaard. Verwijder er een om een nieuwe toe te voegen.',sv:'Du har sparat {n} fraser. Ta bort en för att lägga till en till.',da:'Du har gemt {n} sætninger. Fjern én for at tilføje en mere.',no:'Du har beholdt {n} setninger. Fjern én for å legge til en til.',fi:'Olet tallentanut {n} lausetta. Poista yksi lisätäksesi toisen.'},

  /* ⭐ THE GATE, and it says exactly what the code gates and nothing
     more. Writing a phrase is free. Putting it on the board in front of
     the class is free. Having it there tomorrow is the plan. The
     sibling tool records what happens otherwise: a paywall string that
     sold something `_saveStore` already gave away, found by a native
     panel reading the model instead of the copy. */
  gateKeep:    {en:'Keeping more than {n} of your own phrases is part of the Teacher plan. Writing them and using them is always free.',de:'Mehr als {n} eigene Sätze zu behalten gehört zum Lehrer-Paket. Sätze zu schreiben und zu benutzen ist immer kostenlos.',fr:'Garder plus de {n} phrases à vous fait partie de l’offre Enseignant. Les écrire et les utiliser reste toujours gratuit.',it:'Tenere più di {n} frasi tue fa parte del piano Insegnante. Scriverle e usarle è sempre gratuito.',es:'Guardar más de {n} frases tuyas es parte del plan Docente. Escribirlas y usarlas siempre es gratis.',pt:'Guardar mais de {n} frases suas faz parte do plano Professor. Escrevê-las e usá-las é sempre grátis.',nl:'Meer dan {n} eigen zinnen bewaren hoort bij het Leerkracht-pakket. Ze schrijven en gebruiken is altijd gratis.',sv:'Att spara fler än {n} egna fraser ingår i Lärarpaketet. Att skriva och använda dem är alltid gratis.',da:'At gemme flere end {n} egne sætninger er en del af Lærerpakken. At skrive og bruge dem er altid gratis.',no:'Å beholde flere enn {n} egne setninger er en del av Lærerpakken. Å skrive og bruke dem er alltid gratis.',fi:'Yli {n} oman lauseen tallentaminen kuuluu Opettaja-tilaukseen. Niiden kirjoittaminen ja käyttö on aina ilmaista.'},
  gatePrint:   {en:'The wall poster and the family sheet are part of the Teacher plan. The lanyard cards are always free.',de:'Das Wandposter und der Bogen für die Familie gehören zum Lehrer-Paket. Die Kärtchen fürs Schlüsselband sind immer kostenlos.',fr:'L’affiche murale et la feuille pour la famille font partie de l’offre Enseignant. Les cartes à porter au cou sont toujours gratuites.',it:'Il poster da parete e il foglio per la famiglia fanno parte del piano Insegnante. I cartellini con il laccetto sono sempre gratuiti.',es:'El póster para la pared y la hoja para la familia son parte del plan Docente. Las tarjetas para el cordón son gratis siempre.',pt:'O cartaz de parede e a folha para a família fazem parte do plano Professor. Os cartões de cordão são sempre grátis.',nl:'De wandposter en het blad voor thuis horen bij het Leerkracht-pakket. De kaartjes aan het koord zijn altijd gratis.',sv:'Väggaffischen och familjebladet ingår i Lärarpaketet. Korten till nyckelbandet är alltid gratis.',da:'Vægplakaten og familiearket er en del af Lærerpakken. Kortene til nøglesnoren er altid gratis.',no:'Veggplakaten og familiearket er en del av Lærerpakken. Kortene til nøkkelbåndet er alltid gratis.',fi:'Seinäjuliste ja perheen lomake kuuluvat Opettaja-tilaukseen. Kaulanauhakortit ovat aina ilmaisia.'},
  unlock:      {en:'See the Teacher plan',de:'Lehrer-Paket ansehen',fr:'Voir l’offre Enseignant',it:'Vedi il piano Insegnante',es:'Ver el plan Docente',pt:'Ver o plano Professor',nl:'Bekijk het Leerkracht-pakket',sv:'Se Lärarpaketet',da:'Se Lærerpakken',no:'Se Lærerpakken',fi:'Katso Opettaja-tilaus'},

  /* print */
  printBtn:    {en:'Print',de:'Drucken',fr:'Imprimer',it:'Stampa',es:'Imprimir',pt:'Imprimir',nl:'Afdrukken',sv:'Skriv ut',da:'Udskriv',no:'Skriv ut',fi:'Tulosta'},
  sheetCards:  {en:'Cards for a lanyard',de:'Kärtchen fürs Schlüsselband',fr:'Cartes à porter au cou',it:'Cartellini con il laccetto',es:'Tarjetas para el cordón',pt:'Cartões de cordão',nl:'Kaartjes aan een koord',sv:'Kort till nyckelband',da:'Kort til nøglesnor',no:'Kort til nøkkelbånd',fi:'Kortit kaulanauhaan'},
  sheetWall:   {en:'Poster for the wall',de:'Poster für die Wand',fr:'Affiche pour le mur',it:'Poster da parete',es:'Póster para la pared',pt:'Cartaz para a parede',nl:'Poster voor aan de muur',sv:'Affisch för väggen',da:'Plakat til væggen',no:'Plakat til veggen',fi:'Juliste seinälle'},
  sheetHome:   {en:'Sheet for the family',de:'Bogen für die Familie',fr:'Feuille pour la famille',it:'Foglio per la famiglia',es:'Hoja para la familia',pt:'Folha para a família',nl:'Blad voor thuis',sv:'Blad till familjen',da:'Ark til familien',no:'Ark til familien',fi:'Lomake perheelle'},
  printName:   {en:'Name',de:'Name',fr:'Prénom',it:'Nome',es:'Nombre',pt:'Nome',nl:'Naam',sv:'Namn',da:'Navn',no:'Navn',fi:'Nimi'},
  /* ⚠ the family sheet's blank rows are the point of it: a handout goes
     one way, and this has to go both. */
  printBack:   {en:'Write here the words your child uses at home, and we will learn them.',de:'Schreiben Sie hier die Wörter auf, die Ihr Kind zu Hause benutzt — wir lernen sie.',fr:'Écrivez ici les mots que votre enfant utilise à la maison, et nous les apprendrons.',it:'Scrivete qui le parole che vostro figlio usa a casa, e le impareremo.',es:'Escriban aquí las palabras que su hijo usa en casa, y las aprenderemos.',pt:'Escrevam aqui as palavras que seu filho usa em casa, e nós vamos aprendê-las.',nl:'Schrijf hier de woorden die uw kind thuis gebruikt, dan leren wij ze.',sv:'Skriv orden ert barn använder hemma här, så lär vi oss dem.',da:'Skriv de ord jeres barn bruger hjemme her, så lærer vi dem.',no:'Skriv ordene barnet deres bruker hjemme her, så lærer vi dem.',fi:'Kirjoittakaa tähän sanat, joita lapsenne käyttää kotona — me opettelemme ne.'},

  setVoice:    {en:'Speak the cards',de:'Laut sagen',fr:'Dire à voix haute',it:'Leggi ad alta voce',es:'Decirlo en voz alta',pt:'Dizer em voz alta',nl:'Hardop zeggen',sv:'Läs upp högt',da:'Læs op',no:'Les opp',fi:'Lue ääneen'},
  setBig:      {en:'Always show big',de:'Immer groß zeigen',fr:'Toujours afficher en grand',it:'Mostra sempre in grande',es:'Mostrar siempre en grande',pt:'Mostrar sempre ampliado',nl:'Altijd groot laten zien',sv:'Visa alltid stort',da:'Vis altid stort',no:'Vis alltid stort',fi:'Näytä aina isona'}
};

/* ---------------------------------------------------------------------
   THE SENTENCE STARTERS — fixed, natively authored, NOT editable.
   ⚠ This is what makes the wrong grammatical person structurally
   impossible instead of regex-detectable. The teacher completes an
   opening; she never writes the whole sentence, so she cannot write it
   in an adult's voice. `{x}` is where her words land.
   ------------------------------------------------------------------- */
const STARTER_TEXT = {
  need:     {en:'I need {x}',de:'Ich brauche {x}',fr:'Il me faut {x}',it:'Mi serve {x}',es:'Necesito {x}',pt:'Preciso de {x}',nl:'Ik heb {x} nodig',sv:'Jag behöver {x}',da:'Jeg skal bruge {x}',no:'Jeg trenger {x}',fi:'Tarvitsen {x}'},
  want:     {en:'I would like {x}',de:'Ich möchte {x}',fr:'Je voudrais {x}',it:'Vorrei {x}',es:'Quiero {x}',pt:'Eu queria {x}',nl:'Ik wil graag {x}',sv:'Jag skulle vilja ha {x}',da:'Jeg vil gerne have {x}',no:'Jeg vil gjerne ha {x}',fi:'Haluaisin {x}'},
  dontwant: {en:'I don’t want {x}',de:'Ich möchte {x} nicht',fr:'Je ne veux pas {x}',it:'Non voglio {x}',es:'No quiero {x}',pt:'Não quero {x}',nl:'Ik wil {x} niet',sv:'Jag vill inte ha {x}',da:'Jeg vil ikke have {x}',no:'Jeg vil ikke ha {x}',fi:'En halua {x}'},
  canI:     {en:'Can I {x}?',de:'Darf ich {x}?',fr:'Est-ce que je peux {x} ?',it:'Posso {x}?',es:'¿Puedo {x}?',pt:'Posso {x}?',nl:'Mag ik {x}?',sv:'Får jag {x}?',da:'Må jeg {x}?',no:'Får jeg {x}?',fi:'Saanko {x}?'},
  whereis:  {en:'Where is {x}?',de:'Wo ist {x}?',fr:'Où est {x} ?',it:'Dove trovo {x}?',es:'¿Dónde está {x}?',pt:'Onde eu acho {x}?',nl:'Waar is {x}?',sv:'Var är {x}?',da:'Hvor er {x}?',no:'Hvor er {x}?',fi:'Missä on {x}?'},
  whenis:   {en:'When is {x}?',de:'Wann ist {x}?',fr:'C’est quand {x} ?',it:'Quando c’è {x}?',es:'¿Cuándo es {x}?',pt:'Quando é {x}?',nl:'Wanneer is {x}?',sv:'När är {x}?',da:'Hvornår er {x}?',no:'Når er {x}?',fi:'Milloin on {x}?'},
  whatis:   {en:'What is {x}?',de:'Was ist {x}?',fr:'C’est quoi {x} ?',it:'Che cos’è {x}?',es:'¿Qué es {x}?',pt:'O que é {x}?',nl:'Wat is {x}?',sv:'Vad är {x}?',da:'Hvad er {x}?',no:'Hva er {x}?',fi:'Mikä on {x}?'},
  ican:     {en:'I can {x}',de:'Ich kann {x}',fr:'Je sais {x}',it:'So {x}',es:'Sé {x}',pt:'Eu sei {x}',nl:'Ik kan {x}',sv:'Jag kan {x}',da:'Jeg kan {x}',no:'Jeg kan {x}',fi:'Osaan {x}'},
  myname:   {en:'My name is {x}',de:'Ich heiße {x}',fr:'Je m’appelle {x}',it:'Mi chiamo {x}',es:'Me llamo {x}',pt:'Meu nome é {x}',nl:'Ik heet {x}',sv:'Jag heter {x}',da:'Jeg hedder {x}',no:'Jeg heter {x}',fi:'Nimeni on {x}'}
};

/* ---------------------------------------------------------------------
   ⭐⭐ WORKED EXAMPLES PER STARTER — the answer to the hardest thing the
   panels found, and it is DATA, not a validator.
   ---------------------------------------------------------------------
   The design's proudest claim is that a fixed opening makes the wrong
   grammatical PERSON structurally impossible. That is true. What the
   Finnish, Italian, French, Portuguese and German panels all found,
   independently, is that it makes the wrong grammatical CASE, ARTICLE
   and NUMBER structurally INVISIBLE:

     · FINNISH — `Tarvitsen` and `Haluaisin` govern partitive OR
       accusative-genitive depending on the object, and `En halua` is a
       negative clause where the object is OBLIGATORILY partitive. A
       dictionary-form completion is ungrammatical, and the required case
       CHANGES when the teacher switches starter chip after typing.
     · FRENCH — `J'ai besoin de {x}` has NO completion that yields
       correct French: "aide" gives *besoin de aide*, "d'aide" gives
       *besoin de d'aide*. It was the DEFAULT starter.
     · ITALIAN / PORTUGUESE — `di` and `de` contract with the following
       article: *Ho bisogno di il gesso*, *Preciso de o casaco*.
     · GERMAN — `Ich möchte {x} nicht` needs a noun; `Darf ich {x}?`
       needs a verb; nothing told the teacher which.

   ⚠ AND THE FIX IS NOT A CHECK. The Finnish panel was explicit, and it
   is right: a machine must not sit in judgement of a native speaker's
   Finnish, and `MODEL.validate` is correctly locale-blind. Three worked
   examples do what no grammar note and no regex can — they show the
   SHAPE of the slot in the teacher's own language, at the moment she is
   typing into it.

   The French and Italian starters were also re-cut so a bare noun phrase
   works at all (`Il me faut`, `Mi serve`), because no number of examples
   rescues a slot that has no correct filling.
   ------------------------------------------------------------------- */
const STARTER_EG = {
  need:     {en:'e.g. a pencil · scissors · a plaster',de:'z. B. einen Stift · eine Schere · ein Pflaster',fr:'p. ex. un crayon · des ciseaux · un pansement',it:'es. una matita · le forbici · un cerotto',es:'p. ej. un lápiz · unas tijeras · una tirita',pt:'ex. um lápis · uma tesoura · um curativo',nl:'bijv. een potlood · een schaar · een pleister',sv:'t.ex. en penna · en sax · ett plåster',da:'f.eks. en blyant · en saks · et plaster',no:'f.eks. en blyant · en saks · et plaster',fi:'esim. kynän · sakset · laastarin'},
  want:     {en:'e.g. more paper · a turn · some water',de:'z. B. noch Papier · einen Versuch · etwas Wasser',fr:'p. ex. encore du papier · un tour · de l’eau',it:'es. ancora un foglio · un turno · dell’acqua',es:'p. ej. más papel · un turno · agua',pt:'ex. mais papel · uma vez · água',nl:'bijv. nog papier · een beurt · wat water',sv:'t.ex. mer papper · en tur · lite vatten',da:'f.eks. mere papir · en tur · lidt vand',no:'f.eks. mer papir · en tur · litt vann',fi:'esim. lisää paperia · vuoron · vettä'},
  dontwant: {en:'e.g. to sit there · milk · to go outside',de:'z. B. Milch · das Lied · den Nachtisch',fr:'p. ex. de lait · aller dehors · m’asseoir là',it:'es. il latte · uscire · sedermi lì',es:'p. ej. leche · salir · sentarme ahí',pt:'ex. leite · sair · sentar ali',nl:'bijv. melk · naar buiten · daar zitten',sv:'t.ex. mjölk · gå ut · sitta där',da:'f.eks. mælk · gå ud · sidde der',no:'f.eks. melk · gå ut · sitte der',fi:'esim. maitoa · mennä ulos · istua siinä'},
  canI:     {en:'a verb — e.g. sit here · go outside · help you',de:'ein Verb — z. B. hier sitzen · rausgehen · helfen',fr:'un verbe — p. ex. m’asseoir ici · sortir · aider',it:'un verbo — es. sedermi qui · uscire · aiutare',es:'un verbo — p. ej. sentarme aquí · salir · ayudar',pt:'um verbo — ex. sentar aqui · sair · ajudar',nl:'een werkwoord — bijv. hier zitten · naar buiten',sv:'ett verb — t.ex. sitta här · gå ut · hjälpa till',da:'et udsagnsord — f.eks. sidde her · gå ud · hjælpe',no:'et verb — f.eks. sitte her · gå ut · hjelpe til',fi:'verbi — esim. istua tässä · mennä ulos · auttaa'},
  whereis:  {en:'e.g. the toilet · my coat · the library',de:'z. B. die Toilette · meine Jacke · die Bücherei',fr:'p. ex. les toilettes · mon manteau · la bibliothèque',it:'es. il bagno · il mio giubbotto · la biblioteca',es:'p. ej. el baño · mi abrigo · la biblioteca',pt:'ex. o banheiro · meu casaco · a biblioteca',nl:'bijv. de wc · mijn jas · de bibliotheek',sv:'t.ex. toaletten · min jacka · biblioteket',da:'f.eks. toilettet · min jakke · biblioteket',no:'f.eks. toalettet · jakka mi · biblioteket',fi:'esim. vessa · takkini · kirjasto'},
  whenis:   {en:'e.g. lunch · playtime · swimming',de:'z. B. das Mittagessen · die Pause · Schwimmen',fr:'p. ex. le repas · la récréation · la piscine',it:'es. la mensa · la ricreazione · il nuoto',es:'p. ej. la comida · el recreo · la piscina',pt:'ex. o almoço · o recreio · a natação',nl:'bijv. het eten · de pauze · zwemmen',sv:'t.ex. lunchen · rasten · simningen',da:'f.eks. frokosten · frikvarteret · svømning',no:'f.eks. matpausen · friminuttet · svømming',fi:'esim. ruoka · välitunti · uinti'},
  whatis:   {en:'e.g. this word · that sign · this room',de:'z. B. dieses Wort · das Schild · dieser Raum',fr:'p. ex. ce mot · ce panneau · cette salle',it:'es. questa parola · quel cartello · questa stanza',es:'p. ej. esta palabra · ese cartel · esta sala',pt:'ex. esta palavra · aquela placa · esta sala',nl:'bijv. dit woord · dat bord · deze ruimte',sv:'t.ex. det här ordet · den skylten · det här rummet',da:'f.eks. dette ord · det skilt · dette rum',no:'f.eks. dette ordet · det skiltet · dette rommet',fi:'esim. tämä sana · tuo kyltti · tämä huone'},
  ican:     {en:'a verb — e.g. read this · swim · tie my shoes',de:'ein Verb — z. B. das lesen · schwimmen · zubinden',fr:'un verbe — p. ex. lire ça · nager · faire mes lacets',it:'un verbo — es. leggerlo · nuotare · allacciarmi le scarpe',es:'un verbo — p. ej. leer esto · nadar · atarme los zapatos',pt:'um verbo — ex. ler isso · nadar · amarrar o sapato',nl:'een werkwoord — bijv. dit lezen · zwemmen · veters strikken',sv:'ett verb — t.ex. läsa det här · simma · knyta skorna',da:'et udsagnsord — f.eks. læse det · svømme · binde snørebånd',no:'et verb — f.eks. lese dette · svømme · knyte skoene',fi:'verbi — esim. lukea tämän · uida · sitoa kengännauhat'},
  myname:   {en:'the child writes it as they say it',de:'so schreiben, wie das Kind es sagt',fr:'écrivez-le comme l’enfant le dit',it:'scrivetelo come lo dice il bambino',es:'escríbanlo como lo dice el niño o la niña',pt:'escreva como a criança fala',nl:'schrijf het zoals het kind het zegt',sv:'skriv det som barnet säger det',da:'skriv det, som barnet siger det',no:'skriv det slik barnet sier det',fi:'kirjoita se niin kuin lapsi sen sanoo'}
};

/* ---------------------------------------------------------------------
   THE SIXTY-EIGHT. First person, child to adult, one clause each.
   ------------------------------------------------------------------- */
const PHRASES = {
  /* ---- CORE (8) — always on screen, never behind a tab ------------ */
  yes:        {en:'Yes',de:'Ja',fr:'Oui',it:'Sì',es:'Sí',pt:'Sim',nl:'Ja',sv:'Ja',da:'Ja',no:'Ja',fi:'Kyllä'},
  no:         {en:'No',de:'Nein',fr:'Non',it:'No',es:'No',pt:'Não',nl:'Nee',sv:'Nej',da:'Nej',no:'Nei',fi:'Ei'},
  help:       {en:'I need help',de:'Ich brauche Hilfe',fr:'J’ai besoin d’aide',it:'Mi serve aiuto',es:'Necesito ayuda',pt:'Preciso de ajuda',nl:'Ik heb hulp nodig',sv:'Jag behöver hjälp',da:'Jeg har brug for hjælp',no:'Jeg trenger hjelp',fi:'Tarvitsen apua'},
  nounder:    {en:'I don’t understand',de:'Ich verstehe das nicht',fr:'Je ne comprends pas',it:'Non capisco',es:'No entiendo',pt:'Não entendi',nl:'Ik snap het niet',sv:'Jag förstår inte',da:'Jeg forstår det ikke',no:'Jeg forstår ikke',fi:'En ymmärrä'},
  toilet:     {en:'I need the toilet',de:'Darf ich auf die Toilette?',fr:'Est-ce que je peux aller aux toilettes ?',it:'Devo andare in bagno',es:'Tengo que ir al baño',pt:'Posso ir ao banheiro?',nl:'Ik moet naar de wc',sv:'Jag måste gå på toa',da:'Jeg skal på toilettet',no:'Jeg må på toalettet',fi:'Minun pitää päästä vessaan'},
  stop:       {en:'Stop',de:'Stopp',fr:'Stop',it:'Basta',es:'¡Para!',pt:'Para!',nl:'Stop',sv:'Sluta',da:'Stop',no:'Stopp',fi:'Lopeta'},
  look:       {en:'Please look at me',de:'Schauen Sie mich bitte an',fr:'Regardez-moi, s’il vous plaît',it:'Guardami, per favore',es:'Mírame, por favor',pt:'Olha pra mim, por favor',nl:'Kijk eens naar mij',sv:'Titta på mig, tack',da:'Vil du kigge på mig?',no:'Kan du se på meg?',fi:'Katso minua, kiitos'},
  done:       {en:'I have finished',de:'Ich bin fertig',fr:'J’ai fini',it:'Ho finito',es:'Ya terminé',pt:'Já terminei',nl:'Ik ben klaar',sv:'Jag är klar',da:'Jeg er færdig',no:'Jeg er ferdig',fi:'Olen valmis'},

  /* ---- 1 MY BODY (12) -------------------------------------------- */
  water:      {en:'Can I have a drink of water?',de:'Darf ich etwas Wasser trinken?',fr:'Est-ce que je peux boire de l’eau ?',it:'Posso bere un po’ d’acqua?',es:'¿Puedo beber agua?',pt:'Posso beber água?',nl:'Mag ik water drinken?',sv:'Får jag dricka vatten?',da:'Må jeg få noget vand?',no:'Får jeg litt vann?',fi:'Saanko juoda vettä?'},
  hungry:     {en:'I am hungry',de:'Ich habe Hunger',fr:'J’ai faim',it:'Ho fame',es:'Tengo hambre',pt:'Estou com fome',nl:'Ik heb honger',sv:'Jag är hungrig',da:'Jeg er sulten',no:'Jeg er sulten',fi:'Minulla on nälkä'},
  cantea:     {en:'I can’t eat this',de:'Das darf ich nicht essen',fr:'Je ne peux pas manger ça',it:'Questo non lo posso mangiare',es:'Esto no lo puedo comer',pt:'Não posso comer isso',nl:'Dit kan ik niet eten',sv:'Det här får jag inte äta',da:'Det her må jeg ikke spise',no:'Dette får jeg ikke spise',fi:'Tätä en saa syödä'},
  hurt:       {en:'It hurts',de:'Mir tut etwas weh',fr:'Ça fait mal',it:'Mi fa male',es:'Me duele aquí',pt:'Está doendo',nl:'Het doet pijn',sv:'Det gör ont',da:'Det gør ondt',no:'Det gjør vondt',fi:'Sattuu'},
  sick:       {en:'I don’t feel well',de:'Mir geht es nicht gut',fr:'Je ne me sens pas bien',it:'Non mi sento bene',es:'No me siento bien',pt:'Não estou bem',nl:'Ik voel me niet lekker',sv:'Jag mår inte bra',da:'Jeg har det ikke godt',no:'Jeg føler meg ikke bra',fi:'Minulla on paha olo'},
  besick:     {en:'I need to be sick',de:'Mir ist schlecht',fr:'J’ai envie de vomir',it:'Mi viene da vomitare',es:'Tengo ganas de vomitar',pt:'Acho que vou vomitar',nl:'Ik moet overgeven',sv:'Jag måste kräkas',da:'Jeg skal kaste op',no:'Jeg må kaste opp',fi:'Minua oksettaa'},
  rest:       {en:'I need a little break',de:'Ich brauche eine kleine Pause',fr:'J’ai besoin d’une petite pause',it:'Mi serve una pausa',es:'Necesito un descanso',pt:'Preciso descansar um pouco',nl:'Ik heb even rust nodig',sv:'Jag behöver en liten paus',da:'Jeg har brug for en lille pause',no:'Jeg trenger en liten pause',fi:'Tarvitsen pienen tauon'},
  hot:        {en:'I am too hot',de:'Mir ist zu warm',fr:'J’ai trop chaud',it:'Ho troppo caldo',es:'Tengo mucho calor',pt:'Estou com muito calor',nl:'Ik heb het te warm',sv:'Jag är för varm',da:'Jeg har det for varmt',no:'Jeg er for varm',fi:'Minulla on liian kuuma'},
  cold:       {en:'I am too cold',de:'Mir ist zu kalt',fr:'J’ai trop froid',it:'Ho troppo freddo',es:'Tengo mucho frío',pt:'Estou com muito frio',nl:'Ik heb het te koud',sv:'Jag fryser',da:'Jeg fryser',no:'Jeg fryser',fi:'Minulla on liian kylmä'},
  dryclothes: {en:'I need dry clothes',de:'Ich brauche trockene Sachen',fr:'J’ai besoin de vêtements de rechange',it:'Mi servono vestiti asciutti',es:'Necesito ropa seca',pt:'Preciso de roupa seca',nl:'Ik heb droge kleren nodig',sv:'Jag behöver torra kläder',da:'Jeg har brug for tørt tøj',no:'Jeg trenger tørre klær',fi:'Tarvitsen kuivat vaatteet'},
  medicine:   {en:'I need my medicine',de:'Ich brauche meine Medizin',fr:'J’ai besoin de mon médicament',it:'Mi serve la mia medicina',es:'Necesito mi medicina',pt:'Preciso do meu remédio',nl:'Ik heb mijn medicijn nodig',sv:'Jag behöver min medicin',da:'Jeg har brug for min medicin',no:'Jeg trenger medisinen min',fi:'Tarvitsen lääkkeeni'},
  nose:       {en:'I need a tissue',de:'Ich brauche ein Taschentuch',fr:'J’ai besoin d’un mouchoir',it:'Mi serve un fazzoletto',es:'Necesito un pañuelo',pt:'Preciso de um lenço de papel',nl:'Ik heb een zakdoekje nodig',sv:'Jag behöver en näsduk',da:'Jeg har brug for et lommetørklæde',no:'Jeg trenger et lommetørkle',fi:'Tarvitsen nenäliinan'},

  /* ---- 2 I DON’T UNDERSTAND (12) --------------------------------- */
  again:      {en:'Please say that again',de:'Sagen Sie das bitte noch einmal',fr:'Répétez, s’il vous plaît',it:'Ripeti, per favore',es:'Otra vez, por favor',pt:'Fala de novo, por favor',nl:'Kun je het nog een keer zeggen?',sv:'Säg det igen, tack',da:'Sig det igen, tak',no:'Si det en gang til, takk',fi:'Sano se uudelleen, kiitos'},
  slow:       {en:'Please say it slowly',de:'Sprechen Sie bitte langsamer',fr:'Parlez plus lentement, s’il vous plaît',it:'Dillo più lentamente, per favore',es:'Más despacio, por favor',pt:'Fala mais devagar, por favor',nl:'Kun je het langzamer zeggen?',sv:'Säg det långsamt, tack',da:'Sig det langsomt, tak',no:'Si det sakte, takk',fi:'Sano se hitaasti, kiitos'},
  showme:     {en:'Please show me',de:'Zeigen Sie es mir bitte',fr:'Montrez-moi, s’il vous plaît',it:'Fammi vedere, per favore',es:'Muéstramelo, por favor',pt:'Me mostra, por favor',nl:'Kun je het laten zien?',sv:'Visa mig, tack',da:'Vis mig det, tak',no:'Vis meg det, takk',fi:'Näytä minulle, kiitos'},
  writeit:    {en:'Please write it down',de:'Schreiben Sie es bitte auf',fr:'Écrivez-le, s’il vous plaît',it:'Scrivilo, per favore',es:'Escríbelo, por favor',pt:'Escreve pra mim, por favor',nl:'Kun je het opschrijven?',sv:'Skriv upp det, tack',da:'Skriv det ned, tak',no:'Skriv det ned, takk',fi:'Kirjoita se ylös, kiitos'},
  whatis:     {en:'What is this?',de:'Was ist das?',fr:'Qu’est-ce que c’est ?',it:'Che cos’è questo?',es:'¿Qué es esto?',pt:'O que é isso?',nl:'Wat is dit?',sv:'Vad är det här?',da:'Hvad er det her?',no:'Hva er dette?',fi:'Mikä tämä on?'},
  howsay:     {en:'How do you say this?',de:'Wie sagt man das?',fr:'Comment on dit ça ?',it:'Come si dice questo?',es:'¿Cómo se dice esto?',pt:'Como se fala isso?',nl:'Hoe zeg je dit?',sv:'Hur säger man det här?',da:'Hvordan siger man det her?',no:'Hvordan sier man dette?',fi:'Miten tämä sanotaan?'},
  cantear:    {en:'I can’t hear you',de:'Ich höre Sie nicht',fr:'Je ne vous entends pas',it:'Non ti sento',es:'No te oigo',pt:'Não estou ouvindo',nl:'Ik hoor je niet',sv:'Jag hör dig inte',da:'Jeg kan ikke høre dig',no:'Jeg hører deg ikke',fi:'En kuule sinua'},
  cantsee:    {en:'I can’t see it',de:'Ich sehe es nicht',fr:'Je ne le vois pas',it:'Non riesco a vederlo',es:'No lo veo',pt:'Não estou vendo',nl:'Ik kan het niet zien',sv:'Jag ser det inte',da:'Jeg kan ikke se det',no:'Jeg ser det ikke',fi:'En näe sitä'},
  working:    {en:'I have not finished yet',de:'Ich bin noch nicht fertig',fr:'Je travaille encore',it:'Non ho ancora finito',es:'Todavía estoy trabajando',pt:'Ainda estou fazendo',nl:'Ik ben nog bezig',sv:'Jag är inte klar än',da:'Jeg er stadig i gang',no:'Jeg er ikke ferdig ennå',fi:'En ole vielä valmis'},
  helpstart:  {en:'Can you help me start?',de:'Können Sie mir beim Anfangen helfen?',fr:'Vous pouvez m’aider à commencer ?',it:'Mi aiuti a cominciare?',es:'¿Me ayudas a empezar?',pt:'Pode me ajudar a começar?',nl:'Wil je me op weg helpen?',sv:'Kan du hjälpa mig att börja?',da:'Kan du hjælpe mig i gang?',no:'Kan du hjelpe meg å begynne?',fi:'Autatko minua aloittamaan?'},
  dontknow:   {en:'I don’t know',de:'Ich weiß es nicht',fr:'Je ne sais pas',it:'Non lo so',es:'No lo sé',pt:'Não sei',nl:'Ik weet het niet',sv:'Jag vet inte',da:'Det ved jeg ikke',no:'Jeg vet ikke',fi:'En tiedä'},
  forgot:     {en:'I have forgotten',de:'Ich habe es vergessen',fr:'J’ai oublié',it:'Non mi ricordo',es:'Se me olvidó',pt:'Eu esqueci',nl:'Ik ben het vergeten',sv:'Jag har glömt det',da:'Jeg har glemt det',no:'Jeg har glemt det',fi:'Unohdin sen'},

  /* ---- 3 WHAT HAPPENS NOW (12) ----------------------------------- */
  where:      {en:'Where do I go?',de:'Wo muss ich hin?',fr:'Où est-ce que je dois aller ?',it:'Dove devo andare?',es:'¿Adónde tengo que ir?',pt:'Pra onde eu vou?',nl:'Waar moet ik heen?',sv:'Vart ska jag gå?',da:'Hvor skal jeg hen?',no:'Hvor skal jeg gå?',fi:'Minne minun pitää mennä?'},
  whatdo:     {en:'What do I do now?',de:'Was soll ich jetzt machen?',fr:'Qu’est-ce que je fais maintenant ?',it:'Che cosa faccio adesso?',es:'¿Qué hago ahora?',pt:'O que eu faço agora?',nl:'Wat moet ik nu doen?',sv:'Vad ska jag göra nu?',da:'Hvad skal jeg lave nu?',no:'Hva skal jeg gjøre nå?',fi:'Mitä minä nyt teen?'},
  whatnext:   {en:'What happens next?',de:'Was kommt danach?',fr:'Qu’est-ce qui vient après ?',it:'Che cosa viene dopo?',es:'¿Qué viene después?',pt:'O que vem depois?',nl:'Wat komt er hierna?',sv:'Vad kommer sedan?',da:'Hvad sker der bagefter?',no:'Hva skjer etterpå?',fi:'Mitä tapahtuu seuraavaksi?'},
  rightplace: {en:'Am I in the right place?',de:'Bin ich hier richtig?',fr:'Est-ce que je suis au bon endroit ?',it:'Sono nel posto giusto?',es:'¿Estoy en el lugar correcto?',pt:'Estou no lugar certo?',nl:'Zit ik hier goed?',sv:'Är jag på rätt ställe?',da:'Er jeg det rigtige sted?',no:'Er jeg på rett sted?',fi:'Olenko oikeassa paikassa?'},
  whatneed:   {en:'What do I need for this?',de:'Was brauche ich dafür?',fr:'De quoi j’ai besoin pour ça ?',it:'Che cosa mi serve per questo?',es:'¿Qué necesito para esto?',pt:'Do que eu preciso para isso?',nl:'Wat heb ik hiervoor nodig?',sv:'Vad behöver jag till det här?',da:'Hvad skal jeg bruge til det her?',no:'Hva trenger jeg til dette?',fi:'Mitä tarvitsen tähän?'},
  lost:       {en:'I can’t find my things',de:'Ich finde meine Sachen nicht',fr:'Je ne trouve pas mes affaires',it:'Non trovo le mie cose',es:'No encuentro mis cosas',pt:'Não estou achando minhas coisas',nl:'Ik kan mijn spullen niet vinden',sv:'Jag hittar inte mina saker',da:'Jeg kan ikke finde mine ting',no:'Jeg finner ikke tingene mine',fi:'En löydä tavaroitani'},
  coat:       {en:'Can I get my coat?',de:'Darf ich meine Jacke holen?',fr:'Est-ce que je peux prendre mon manteau ?',it:'Posso prendere il mio giubbotto?',es:'¿Puedo ir a buscar mi abrigo?',pt:'Posso pegar meu casaco?',nl:'Mag ik mijn jas halen?',sv:'Får jag hämta min jacka?',da:'Må jeg hente min jakke?',no:'Får jeg hente jakka mi?',fi:'Saanko hakea takkini?'},
  lunch:      {en:'When is lunch?',de:'Wann gibt es Mittagessen?',fr:'C’est quand le repas ?',it:'Quando si mangia?',es:'¿Cuándo comemos?',pt:'Quando é o almoço?',nl:'Wanneer gaan we eten?',sv:'När är lunchen?',da:'Hvornår er der frokost?',no:'Når er matpausen?',fi:'Milloin on ruoka?'},
  hometime:   {en:'Is it home time?',de:'Ist die Schule aus?',fr:'C’est l’heure de rentrer ?',it:'È ora di andare a casa?',es:'¿Ya es hora de ir a casa?',pt:'Já é hora de ir para casa?',nl:'Is de school uit?',sv:'Är det dags att gå hem?',da:'Er det tid til at gå hjem?',no:'Er det på tide å gå hjem?',fi:'Onko jo kotiinlähtö?'},
  grownup:    {en:'When is my grown-up coming?',de:'Wann werde ich abgeholt?',fr:'Quand est-ce qu’on vient me chercher ?',it:'Quando vengono a prendermi?',es:'¿Cuándo vienen a buscarme?',pt:'Quando vão me buscar?',nl:'Wanneer word ik opgehaald?',sv:'När kommer någon och hämtar mig?',da:'Hvornår bliver jeg hentet?',no:'Når blir jeg hentet?',fi:'Milloin minut haetaan?'},
  waitforme:  {en:'Wait for me',de:'Warte auf mich',fr:'Attends-moi',it:'Aspettami',es:'Espérame',pt:'Me espera!',nl:'Wacht op mij',sv:'Vänta på mig',da:'Vent på mig',no:'Vent på meg',fi:'Odota minua'},
  tellyou:    {en:'I need to tell you something',de:'Ich muss Ihnen etwas sagen',fr:'J’ai quelque chose à vous dire',it:'Ti devo dire una cosa',es:'Te tengo que decir una cosa',pt:'Preciso te contar uma coisa',nl:'Ik moet je iets vertellen',sv:'Jag måste säga en sak',da:'Jeg skal fortælle dig noget',no:'Jeg må fortelle deg noe',fi:'Minun pitää kertoa sinulle jotain'},

  /* ---- 4 BEING WITH OTHERS (12) ---------------------------------- */
  hello:      {en:'Hello',de:'Hallo',fr:'Bonjour',it:'Ciao',es:'Hola',pt:'Oi',nl:'Hallo',sv:'Hej',da:'Hej',no:'Hei',fi:'Hei'},
  playtoo:    {en:'Can I play too?',de:'Darf ich mitspielen?',fr:'Est-ce que je peux jouer aussi ?',it:'Posso giocare anch’io?',es:'¿Puedo jugar yo también?',pt:'Posso brincar também?',nl:'Mag ik ook meedoen?',sv:'Får jag vara med?',da:'Må jeg være med?',no:'Får jeg være med?',fi:'Saanko minäkin leikkiä?'},
  sithere:    {en:'Can I sit here?',de:'Darf ich hier sitzen?',fr:'Est-ce que je peux m’asseoir ici ?',it:'Posso sedermi qui?',es:'¿Puedo sentarme aquí?',pt:'Posso sentar aqui?',nl:'Mag ik hier zitten?',sv:'Får jag sitta här?',da:'Må jeg sidde her?',no:'Får jeg sitte her?',fi:'Saanko istua tässä?'},
  partner:    {en:'Will you be my partner?',de:'Machen wir zusammen?',fr:'Tu veux te mettre avec moi ?',it:'Ti metti con me?',es:'¿Hacemos pareja?',pt:'Quer fazer dupla comigo?',nl:'Wil je mijn maatje zijn?',sv:'Vill du jobba med mig?',da:'Vil du være min makker?',no:'Vil du være makkeren min?',fi:'Tuletko minun parikseni?'},
  myturn:     {en:'It’s my turn',de:'Ich bin dran',fr:'C’est mon tour',it:'Tocca a me',es:'Me toca a mí',pt:'É a minha vez',nl:'Ik ben aan de beurt',sv:'Det är min tur',da:'Det er min tur',no:'Det er min tur',fi:'Nyt on minun vuoroni'},
  yourturn:   {en:'It’s your turn',de:'Du bist dran',fr:'C’est ton tour',it:'Tocca a te',es:'Te toca a ti',pt:'É a sua vez',nl:'Jij bent aan de beurt',sv:'Det är din tur',da:'Det er din tur',no:'Det er din tur',fi:'Nyt on sinun vuorosi'},
  mine:       {en:'That is mine',de:'Das gehört mir',fr:'C’est à moi',it:'È mio',es:'Eso es mío',pt:'Isso é meu',nl:'Dat is van mij',sv:'Det där är mitt',da:'Det der er mit',no:'Det der er mitt',fi:'Tuo on minun'},
  dontlike:   {en:'I don’t like that',de:'Das mag ich nicht',fr:'Je n’aime pas ça',it:'Questo non mi piace',es:'Eso no me gusta',pt:'Não gosto disso',nl:'Dat vind ik niet fijn',sv:'Det tycker jag inte om',da:'Det kan jeg ikke lide',no:'Det liker jeg ikke',fi:'En pidä tuosta'},
  unkind:     {en:'Someone is being mean to me',de:'Jemand ist gemein zu mir',fr:'Quelqu’un n’est pas gentil avec moi',it:'Qualcuno mi tratta male',es:'Alguien se está metiendo conmigo',pt:'Alguém está mexendo comigo',nl:'Iemand doet gemeen tegen mij',sv:'Någon är elak mot mig',da:'Nogen driller mig',no:'Noen er slem mot meg',fi:'Joku on ilkeä minulle'},
  alone:      {en:'I want to play by myself',de:'Ich möchte allein spielen',fr:'Je veux jouer dans mon coin',it:'Voglio giocare per conto mio',es:'Quiero jugar a solas',pt:'Quero brincar só eu',nl:'Ik wil alleen spelen',sv:'Jag vill leka själv',da:'Jeg vil gerne lege alene',no:'Jeg vil leke alene',fi:'Haluan leikkiä yksin'},
  /* ⚠ RESIDUAL, STATED RATHER THAN HIDDEN — the Portuguese `obrigado`.
     Portuguese has NO gender-neutral thank-you, so this card makes every
     girl say the masculine form. The Brazilian panel escalated it and
     every alternative is worse: `Obrigado(a)` is read aloud by TTS as
     "obrigado abre parênteses a"; `Valeu` is peer slang a child would
     not say to a teacher; `Agradeço` is an adult register. The one
     option that would work — asking which form to use — is REFUSE-LISTED
     by this tool's own doctrine: the board never asks who is using it.
     So it is the least-wrong choice, named, exactly as the art panel
     named cream as arguably a light skin tone. Spanish has no such
     problem: `Gracias` is already invariant. */
  thanks:     {en:'Thank you',de:'Danke',fr:'Merci',it:'Grazie',es:'Gracias',pt:'Obrigado',nl:'Dank je wel',sv:'Tack',da:'Tak',no:'Takk',fi:'Kiitos'},
  sorry:      {en:'Sorry',de:'Entschuldigung',fr:'Pardon',it:'Scusa',es:'Perdón',pt:'Desculpa',nl:'Sorry',sv:'Förlåt',da:'Undskyld',no:'Unnskyld',fi:'Anteeksi'},

  /* ---- 5 MY WORDS, MY TURN (12) — the dignity group --------------- */
  'new':      {en:'I am new here',de:'Ich bin neu hier',fr:'Je viens d’arriver',it:'È il mio primo giorno qui',es:'Acabo de llegar',pt:'É o meu primeiro dia aqui',nl:'Ik ben hier nieuw',sv:'Jag är ny här',da:'Jeg er ny her',no:'Jeg er ny her',fi:'Olen uusi täällä'},
  ispeak:     {en:'I speak my own language',de:'Ich kann schon eine Sprache',fr:'Je parle ma langue à moi',it:'Io parlo la mia lingua',es:'Yo hablo mi propio idioma',pt:'Eu falo a minha língua',nl:'Ik spreek mijn eigen taal',sv:'Jag pratar mitt eget språk',da:'Jeg snakker mit eget sprog',no:'Jeg snakker mitt eget språk',fi:'Puhun omaa kieltäni'},
  myname:     {en:'Let me say my name',de:'Ich sage meinen Namen selbst',fr:'Je veux dire mon prénom',it:'Il mio nome lo dico io',es:'Digo yo mi nombre',pt:'Deixa eu falar meu nome',nl:'Ik zeg zelf mijn naam',sv:'Jag säger mitt namn själv',da:'Jeg siger selv mit navn',no:'Jeg sier navnet mitt selv',fi:'Sanon nimeni itse'},
  knowanswer: {en:'I know the answer',de:'Ich weiß die Antwort',fr:'Je connais la réponse',it:'Io so la risposta',es:'Yo sé la respuesta',pt:'Eu sei a resposta',nl:'Ik weet het antwoord',sv:'Jag vet svaret',da:'Jeg ved svaret',no:'Jeg vet svaret',fi:'Tiedän vastauksen'},
  cando:      {en:'I can do this',de:'Das kann ich',fr:'Je sais le faire',it:'Questo lo so fare',es:'Yo sé hacer esto',pt:'Isso eu sei fazer',nl:'Dit kan ik',sv:'Det här kan jag',da:'Det her kan jeg',no:'Dette kan jeg',fi:'Tämän minä osaan'},
  wanttry:    {en:'I want to try',de:'Ich will es probieren',fr:'Je veux essayer',it:'Voglio provare',es:'Quiero intentarlo',pt:'Quero tentar',nl:'Ik wil het proberen',sv:'Jag vill försöka',da:'Jeg vil gerne prøve',no:'Jeg vil prøve',fi:'Haluan kokeilla'},
  showyou:    {en:'Can I show you instead?',de:'Darf ich es Ihnen lieber zeigen?',fr:'Est-ce que je peux vous le montrer ?',it:'Posso fartelo vedere?',es:'Mejor te lo muestro',pt:'Posso mostrar em vez de falar?',nl:'Mag ik het liever laten zien?',sv:'Får jag visa i stället?',da:'Må jeg vise det i stedet?',no:'Får jeg vise det i stedet?',fi:'Saanko mieluummin näyttää?'},
  mylang:     {en:'Can I answer in my language?',de:'Darf ich in meiner Sprache antworten?',fr:'Est-ce que je peux répondre dans ma langue ?',it:'Posso rispondere nella mia lingua?',es:'¿Puedo responder en mi idioma?',pt:'Posso responder na minha língua?',nl:'Mag ik in mijn eigen taal antwoorden?',sv:'Får jag svara på mitt språk?',da:'Må jeg svare på mit sprog?',no:'Får jeg svare på språket mitt?',fi:'Saanko vastata omalla kielelläni?'},
  dontwant:   {en:'I don’t want to do this',de:'Das möchte ich nicht machen',fr:'Je ne veux pas faire ça',it:'Questo non lo voglio fare',es:'Esto no lo quiero hacer',pt:'Isso eu não quero fazer',nl:'Dit wil ik niet doen',sv:'Det här vill jag inte göra',da:'Det her vil jeg ikke',no:'Dette vil jeg ikke gjøre',fi:'En halua tehdä tätä'},
  more:       {en:'I would like some more',de:'Ich hätte gern noch etwas',fr:'J’en voudrais encore',it:'Ne vorrei ancora',es:'Quisiera un poco más',pt:'Eu queria mais um pouco',nl:'Ik wil graag nog wat meer',sv:'Jag vill ha lite mer',da:'Jeg vil gerne have mere',no:'Jeg vil gjerne ha mer',fi:'Haluaisin vielä vähän'},
  share:      {en:'Shall we share?',de:'Sollen wir teilen?',fr:'On partage ?',it:'Facciamo a metà?',es:'¿Lo compartimos?',pt:'Vamos dividir?',nl:'Zullen we delen?',sv:'Ska vi dela på det?',da:'Skal vi dele?',no:'Skal vi dele?',fi:'Jaetaanko?'},
  maybe:      {en:'Maybe',de:'Vielleicht',fr:'Peut-être',it:'Forse',es:'Quizás',pt:'Talvez',nl:'Misschien',sv:'Kanske',da:'Måske',no:'Kanskje',fi:'Ehkä'}
};

/* ---------------------------------------------------------------------
   THE NATIVE-PANEL WORK LIST.
   ⚠ Everything here is authored, not machine-translated, but authored
   is not the same as REVIEWED. A locale leaves this list only when a
   native three-agent panel (linguist + K-3 educator + B2C marketing)
   has read it AGAINST THE ENGLISH AS A SOURCE TO AUDIT — not as a
   target — and signed it off. Per §17.5.1 sv/da/no/fi additionally
   carry [NSR-FLAG] until a native speaker review lands.

   `reviewed` is consumed by --brief and by the tool's own category
   gating: A CATEGORY THAT IS NOT REVIEWED IN A LOCALE DOES NOT RENDER
   IN THAT LOCALE. Substrate honesty (§16.6.1): an empty tab erodes
   trust exactly like an empty topic page, and shipping an unreviewed
   toilet phrase is the defect this whole file exists to end.
   ------------------------------------------------------------------- */
const REVIEWED = {
  /* Six three-agent native panels ran 2026-08-07 — the first native read
     these strings have ever had. Their severity-1 rulings are folded in
     (see scripts/apply-say-it-panel-corrections.js, which records every
     change and its reason).

     Both tiers are now applied — the unshippable and the severe first
     (`apply-say-it-panel-corrections.js`), then everything else the
     panels filed (`apply-say-it-panel-tier2.js`), each row carrying the
     reason it was changed. The three rulings the panels escalated are
     decided and recorded: the Finnish case-government problem is solved
     by `STARTER_EG` (worked examples, NOT a validator — a machine must
     not adjudicate a native speaker's Finnish); the two starters that
     had no correct filling at all were re-cut; and the Portuguese
     `obrigado` residual is named beside the card rather than hidden.

     ⚠ `[NSR-FLAG]` still applies to sv/da/no/fi per §17.5.1: these are
     expert panel reviews, not a signed-off native speaker pass, and the
     Nordic set is the one where that distinction has historically
     mattered most.

     ⚠ AND THE FLAG IS NOT WHAT PUTS A LOCALE IN FRONT OF A CHILD. The
     German panel caught that: `categoriesFor` gates three of five tabs,
     the core rail is always painted, and the core contains `toilet`.
     Flipping a flag changes which TABS render, not whether the board is
     live. Do not mistake it for a kill switch. */
  en: true, de: true, fr: true, it: true, es: true, pt: true,
  nl: true, sv: true, da: true, no: true, fi: true
};

module.exports = { STRINGS, STARTER_TEXT, STARTER_EG, PHRASES, REVIEWED };
