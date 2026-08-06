/* =====================================================================
   _sorting-hoops-strings.js — the native panels' output, verbatim.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Ten three-person native panels
   (linguist + K-2 classroom teacher + B2C education-marketing writer), one
   per locale, each handed the tool's SOURCE and asked to audit the English
   as a source rather than translate it as a target.

   ⚠⚠ THEY FOUND SEVEN MODEL DEFECTS THAT NINE GREEN GATE SCRIPTS DID NOT,
   and every one was reproduced before it was fixed:
     · `_startSorting` DELETED THE WHOLE MAT. Sort the tray, tap "Change the
       rules", tap "Start sorting" — `_traySplits()` is false for an empty
       tray, so `dealt` and `placement` were discarded. Measured 12 -> 0.
       That is the operator's original "objects randomly disappear" report
       reappearing inside its own fix. Found INDEPENDENTLY by es, de and fi.
     · EVERY TIMED HINT WAS CANCELLED BY ITS OWN render(). `_startSorting`
       armed a 5s timer and then called `render()`, whose first act was
       `_clearTimers()` — so "the rules changed" was stuck on permanently
       and masked every other hint. This is the SAME defect the rebuild was
       commissioned to fix, reproduced in the rebuild. Found by no.
     · `More things` went SILENTLY DEAD. The block pool is 32 against a tray
       of 12, so the third press dealt nothing, forever, while the chip was
       painted primary and `hintTrayEmpty` told the teacher to press it.
       Found by fr, de, sv, da, nl, it, pt.
     · THE CLEAR ARM OUTLIVED ITS WARNING — `_refuse` cleared the sentence
       after 4.2s and left `armClear` true, so a press ten minutes later
       wiped the mat with nothing on screen. Found by seven panels.
     · `hintSecret` claimed "nobody has seen them — not even you" on the
       hand-picked path, where the teacher had just read the rule off a chip.
       Found by ALL TEN.
     · `hintChoose` promised "the class will see this rule" as the setup
       default in guess mode, two lines from `hintSecret` promising the
       opposite. Found by nine.
     · `refuseSameRule` said "already has that rule" when `pairOK` rejects on
       the same FIELD — so red + blue was refused with a sentence a teacher
       can see is untrue. Found by ALL TEN.
   Plus a layout defect no gate could see: `.hp-seg` was `overflow:hidden`
   with no wrap, so the three mode chips CLIPPED at 320px and the overflow
   absorbed the evidence (it).

   ⚠ AND SIX ONSET TABLES WERE PHONOLOGICALLY WRONG, in a tool whose second
   stated invention is the multilingual phonological attribute:
     fr  `g` is /ʒ/ and /g/; `qu`/`ph` missing  ·  es  `b`/`v` are ONE sound
     and `z`/`s` are one under seseo  ·  it  `sc` and `gl` each span two
     sounds  ·  sv  `sk`/`k`/`g` each span two  ·  da  the table was part
     NORWEGIAN and had no bare `k`, so kat/ko/kage were excluded entirely  ·
     pt  `lh`/`nh` cannot begin a word  ·  fi  every VOWEL was missing, and
     Finnish alkuäänne teaching starts with the vowels.

   TITLES: every panel was asked to rule on the shipped tool name. it, es
   and fi proposed alternatives and all three marked them close calls
   ("decline cheaply"); the other seven ruled KEEP. All eleven shipped names
   are kept — a rename costs five registration surfaces for a marginal gain.

   [NSR-FLAG] sv · da · no · fi.
   ===================================================================== */
'use strict';

module.exports = {
  de: {
    modeLabelled: 'Regeln sichtbar', modeChild: 'Ein Kind wählt', capBoth: 'In beiden',
    changeRules: 'Regeln ändern', surpriseBtn: 'Regel auslosen', chooseBtn: 'Selbst wählen',
    backBtn: 'Zurück', startBtn: 'Jetzt sortieren', ruleSet: 'Gesetzt — geheim',
    lessonsTab: 'Fertige Beispiele', moreThings: 'Mehr Dinge',
    confirmClear: 'Matte wirklich leeren? Noch einmal drücken, dann liegt alles wieder zum Sortieren bereit.',
    hintOpenStart: 'Bringt etwas zu einem Reifen. Was in beide gehört, kommt in die Mitte.',
    hintOpenLens: 'Gibt es etwas, das in beide Reifen gehört? Das kommt in die Mitte.',
    hintOpenBoth: 'Lest einen Reifen laut vor. Passt wirklich alles hinein, was darin liegt?',
    hintChoose: 'Für jeden Reifen eine Regel festlegen – selbst gewählt oder ausgelost.',
    hintSecret: 'Die Regeln stehen fest. Auf dem Brett sind sie nicht zu sehen.',
    hintGuessStart: 'Bringt ein Ding zu einem Reifen. Der Reifen entscheidet – nicht die Erwachsenen.',
    hintGuessOut: 'Dieses Ding gehört in keinen Reifen. Auch das verrät etwas über die Regel.',
    hintGuessRead: 'Lest vor, was jeder Reifen behalten hat. Was könnte seine Regel sein?',
    hintRevealed: 'Jetzt sind die Regeln zu sehen.',
    hintTrayEmpty: 'Alles ist sortiert. Lest die beiden Reifen – dann holt mehr Dinge.',
    hintCarry: 'Tippt jetzt auf den Platz, wo es hingehört. Mit der Tastatur: ← → und Enter.',
    hintRuleChanged: 'Die Regeln sind neu. Manche Dinge mussten die Reifen wieder verlassen.',
    hintChildTurn: 'Ein Kind legt die Regeln fest – die Klasse findet sie heraus.',
    refuseNoRule: 'Zuerst braucht mindestens ein Reifen eine Regel.',
    refuseSameRule: 'Der andere Reifen sortiert schon nach dieser Eigenschaft. Bitte eine andere wählen.',
    refuseNoPair: 'Diese beiden Regeln passen nicht zusammen. Bitte eine andere wählen.',
    putBack: 'Zurückgelegt', famColour: 'Welche Farbe hat es?', famShape: 'Welche Form hat es?',
    famSize: 'Wie groß ist die Form?', famSyll: 'Wie viele Silben hat das Wort?',
    famInitial: 'Welchen Anlaut hat das Wort?', famLiving: 'Lebt es?',
    famNatural: 'Haben Menschen es gemacht?', famEdible: 'Kann man es essen?',
    famMoves: 'Wie bewegt es sich?', famSizeBand: 'Wie groß ist es in Wirklichkeit?',
    famHabitat: 'Wo lebt es?', rSyll1: 'Das Wort hat 1 Silbe'
  },

  fr: {
    modeLabelled: 'Règles visibles', modeChild: 'Un élève choisit', capBoth: 'Les deux',
    changeRules: 'Changer de règle', surpriseBtn: 'Personne ne sait', chooseBtn: 'Je choisis',
    backBtn: 'Retour', startBtn: 'On trie !', ruleSet: 'Prête et secrète',
    lessonsTab: 'Tris tout prêts', moreThings: 'Encore des objets',
    confirmClear: 'Vider le tapis ? Touchez encore pour tout remettre à trier.',
    hintOpenStart: 'Apportez un objet dans un cerceau. Ce qui va dans les deux se pose là où ils se croisent.',
    hintOpenLens: 'Y a-t-il un objet qui va dans les deux ? Il se pose là où les cerceaux se croisent.',
    hintOpenBoth: 'Lisez un cerceau à voix haute. Est-ce que tout ce qui est dedans y a bien sa place ?',
    hintChoose: 'Choisissez la règle de ce cerceau, ou touchez « Personne ne sait ».',
    hintSecret: 'Les règles sont en place. La classe ne les verra pas.',
    hintGuessStart: 'Apportez un objet dans un cerceau. Le cerceau le garde ou le laisse repartir. C’est lui qui décide.',
    hintGuessOut: 'Le cerceau l’a laissé repartir. Ce qu’un cerceau refuse en dit autant que ce qu’il garde.',
    hintGuessRead: 'Regardez ce que chaque cerceau a gardé, puis demandez quelle peut être sa règle.',
    hintRevealed: 'Les règles sont maintenant affichées.',
    hintTrayEmpty: 'Tout est trié. Regardez les deux cerceaux, puis touchez « Encore des objets ».',
    hintCarry: 'Touchez l’endroit où le poser, ou choisissez avec les flèches puis Entrée.',
    hintRuleChanged: 'Les règles ont changé. Certains objets sont ressortis des cerceaux.',
    hintChildTurn: 'Passez la main à un élève. Il choisit les règles, la classe les devine.',
    refuseNoRule: 'Choisissez d’abord une règle pour au moins un cerceau.',
    refuseSameRule: 'L’autre cerceau trie déjà là-dessus. Choisissez une autre question.',
    refuseNoPair: 'Avec cette règle, un des quatre espaces du tapis resterait vide. Choisissez-en une autre.',
    putBack: 'Rien n’a bougé', famColour: 'Quelle est sa couleur ?', famShape: 'Quelle est sa forme ?',
    famSize: 'Quelle taille fait la pièce ?', famSyll: 'Combien de syllabes ?',
    famInitial: 'Par quel son commence le mot ?', famLiving: 'Est-ce vivant ?',
    famNatural: 'Qui l’a fabriqué ?', famEdible: 'Est-ce que ça se mange ?',
    famMoves: 'Comment ça bouge ?', famSizeBand: 'Quelle taille fait l’objet en vrai ?',
    famHabitat: 'Où est-ce que ça vit ?', rSyll1: 'Le mot a 1 syllabe'
  },

  it: {
    modeLabelled: 'Regole in vista', modeChild: 'Sceglie un bambino', capBoth: 'Tutti e due',
    changeRules: 'Cambia le regole', surpriseBtn: 'A sorpresa', chooseBtn: 'Scelgo io',
    backBtn: 'Indietro', startBtn: 'Si comincia', ruleSet: 'Pronta — segreta',
    lessonsTab: 'Regole pronte', moreThings: 'Altre cose',
    confirmClear: 'Svuoto il tappeto? Premi ancora: tutto torna tra le cose da classificare.',
    hintOpenStart: 'Portate una cosa a un cerchio. Quello che sta in tutti e due va dove si incrociano.',
    hintOpenLens: 'C’è qualcosa che sta in tutti e due? Va dove i cerchi si incrociano.',
    hintOpenBoth: 'Leggete l’etichetta di un cerchio. Tutto quello che c’è dentro ci sta davvero?',
    hintChoose: 'Scegli una regola per ogni cerchio, oppure tocca «A sorpresa».',
    hintSecret: 'Le regole sono pronte e sul tappeto non si vedono.',
    hintGuessStart: 'Portate una cosa a un cerchio. Il cerchio la tiene o la lascia andare: decide lui.',
    hintGuessOut: 'Il cerchio ha lasciato andare questa. Anche quello che non tiene ci dice tanto.',
    hintGuessRead: 'Guardate che cosa ha tenuto ogni cerchio. Quale sarà la sua regola?',
    hintRevealed: 'Adesso le regole si vedono.',
    hintTrayEmpty: 'Avete classificato tutto. Guardate i due cerchi, poi prendete altre cose.',
    hintCarry: 'Adesso toccate il posto dove va. Con la tastiera: frecce e poi Invio.',
    hintRuleChanged: 'Le regole sono cambiate. Qualche cosa è tornata indietro.',
    hintChildTurn: 'Lascia scegliere le regole a un bambino: la classe deve indovinarle.',
    refuseNoRule: 'Prima scegli una regola per almeno un cerchio.',
    refuseSameRule: 'L’altro cerchio usa già questa domanda. Scegline un’altra.',
    refuseNoPair: 'Queste due regole non stanno bene insieme. Scegline un’altra.',
    putBack: 'Non si è mosso niente', famColour: 'Di che colore è?', famShape: 'Che forma ha?',
    famSize: 'Quanto è grande il blocco?', famSyll: 'Quante sillabe ha la parola?',
    famInitial: 'Con che suono comincia la parola?', famLiving: 'È vivo?',
    famNatural: 'L’hanno fatto le persone?', famEdible: 'Si può mangiare?',
    famMoves: 'Si muove da solo?', famSizeBand: 'Nella realtà, quanto è grande?',
    famHabitat: 'Dove vive?', rSyll1: 'La parola ha 1 sillaba'
  },

  es: {
    modeLabelled: 'Reglas a la vista', modeChild: 'La pone un alumno', capBoth: 'Los dos',
    changeRules: 'Cambiar reglas', surpriseBtn: 'Sorpréndeme', chooseBtn: 'La elijo yo',
    backBtn: 'Atrás', startBtn: 'A clasificar', ruleSet: 'Lista y secreta',
    lessonsTab: 'Reglas listas', moreThings: 'Más cosas',
    confirmClear: '¿Vaciar la alfombra? Pulsa otra vez y todo vuelve a la bandeja.',
    hintOpenStart: 'Trae cualquier cosa a un aro. Lo que vale para los dos va donde se cruzan.',
    hintOpenLens: '¿Hay algo que valga para los dos aros? Va donde se cruzan.',
    hintOpenBoth: 'Lee la regla de un aro en voz alta. ¿Encaja todo lo que hay dentro?',
    hintChoose: 'Elige la regla de cada aro o pulsa Sorpréndeme.',
    hintSecret: 'Las reglas ya están puestas. La clase no las ve.',
    hintGuessStart: 'Trae una cosa a un aro. El aro se queda con ella o la suelta: decide el aro.',
    hintGuessOut: 'El aro la ha soltado. Lo que no se queda ningún aro también dice mucho.',
    hintGuessRead: 'Mira con qué se ha quedado cada aro y pregunta cuál puede ser su regla.',
    hintRevealed: 'Ahora se ven las reglas.',
    hintTrayEmpty: 'Ya está todo clasificado. Lee los dos aros y trae más cosas.',
    hintCarry: 'Ahora toca el sitio donde va, o muévete con las flechas y pulsa Intro.',
    hintRuleChanged: 'Han cambiado las reglas. Algunas cosas han salido de los aros.',
    hintChildTurn: 'Dale la pizarra a alguien de la clase: pone las reglas y los demás las adivinan.',
    refuseNoRule: 'Pon primero una regla en algún aro.',
    refuseSameRule: 'El otro aro ya usa esa pregunta. Elige otra distinta.',
    refuseNoPair: 'Con esas dos reglas algún hueco se quedaría vacío. Elige otra.',
    putBack: 'No se ha movido nada', famColour: '¿De qué color es?', famShape: '¿Qué forma tiene?',
    famSize: '¿Es grande o pequeño el bloque?', famSyll: '¿Cuántas sílabas tiene la palabra?',
    famInitial: '¿Por qué sonido empieza la palabra?',
    famLiving: '¿Está vivo, lo estuvo o nunca lo estuvo?', famNatural: '¿Lo han hecho las personas?',
    famEdible: '¿Se puede comer?', famMoves: '¿Se mueve solo, lo mueven o no se mueve?',
    famSizeBand: '¿De qué tamaño es de verdad?', famHabitat: '¿Dónde vive?',
    rSyll1: 'La palabra tiene 1 sílaba'
  },

  pt: {
    modeLabelled: 'Regras à vista', modeChild: 'A criança escolhe', capBoth: 'Os dois',
    changeRules: 'Mudar as regras', surpriseBtn: 'Me surpreenda', chooseBtn: 'Eu escolho',
    backBtn: 'Voltar', startBtn: 'Começar', ruleSet: 'Pronta — secreta',
    lessonsTab: 'Regras prontas', moreThings: 'Mais coisas',
    confirmClear: 'Esvaziar o tapete? Toque de novo e tudo volta para a bandeja.',
    hintOpenStart: 'Tragam qualquer coisa até um arco. O que pertence aos dois vai onde eles se cruzam.',
    hintOpenLens: 'Tem alguma coisa que pertence aos dois? Ela vai onde os arcos se cruzam.',
    hintOpenBoth: 'Leiam a etiqueta de um arco e olhem o que está lá dentro: tudo combina com ela?',
    hintChoose: 'Escolha uma regra para este arco, ou toque em Me surpreenda.',
    hintSecret: 'As regras estão prontas e ficam escondidas da turma.',
    hintGuessStart: 'Tragam uma coisa até um arco: ele guarda ou devolve. Quem decide é o arco.',
    hintGuessOut: 'O arco devolveu essa. O que um arco não guarda também é pista.',
    hintGuessRead: 'Leiam o que cada arco guardou e pensem: qual pode ser a regra dele?',
    hintRevealed: 'Agora as regras estão à vista.',
    hintTrayEmpty: 'Já classificaram tudo. Leiam os dois grupos e depois peçam mais coisas.',
    hintCarry: 'Toque no lugar onde ela vai. Com o teclado: setas e Enter.',
    hintRuleChanged: 'As regras mudaram e algumas coisas saíram dos arcos.',
    hintChildTurn: 'Passe a vez para uma criança: ela escolhe as regras e a turma descobre quais são.',
    refuseNoRule: 'Escolha uma regra para pelo menos um arco.',
    refuseSameRule: 'O outro arco já usa esse mesmo tipo de regra. Escolha outro tipo.',
    refuseNoPair: 'Essas duas regras não formam um bom par. Tente outra.',
    putBack: 'Continua no lugar', famColour: 'Qual é a cor?', famShape: 'Qual é a forma?',
    famSize: 'O bloco é grande ou pequeno?', famSyll: 'Quantas sílabas tem a palavra?',
    famInitial: 'Com que som a palavra começa?',
    famLiving: 'Isso está vivo, já esteve ou nunca esteve?', famNatural: 'Quem fez isso?',
    famEdible: 'Dá para comer?', famMoves: 'Como isso se move?',
    famSizeBand: 'Que tamanho isso tem de verdade?', famHabitat: 'Onde isso vive?',
    rSyll1: 'A palavra tem 1 sílaba'
  },

  nl: {
    modeLabelled: 'Regels zichtbaar', modeChild: 'Een kind kiest', capBoth: 'In allebei',
    changeRules: 'Andere regels', surpriseBtn: 'Verras mij', chooseBtn: 'Ik kies zelf',
    backBtn: 'Terug', startBtn: 'Sorteren maar', ruleSet: 'Ingesteld — geheim',
    lessonsTab: 'Kant-en-klare regels', moreThings: 'Meer dingen',
    confirmClear: 'Mat leegmaken? Druk nog een keer, dan gaat alles terug.',
    hintOpenStart: 'Breng iets naar een hoepel. Wat in allebei hoort, gaat waar ze elkaar kruisen.',
    hintOpenLens: 'Is er iets dat in allebei hoort? Dat gaat waar de hoepels elkaar kruisen.',
    hintOpenBoth: 'Lees de regel van een hoepel hardop voor. Past alles wat erin ligt?',
    hintChoose: 'Kies een regel voor elke hoepel, of tik op Verras mij.',
    hintSecret: 'De regels staan klaar. Niemand in de klas heeft ze gezien.',
    hintGuessStart: 'Breng één ding naar een hoepel. De hoepel houdt het vast of laat het los.',
    hintGuessOut: 'Die ligt buiten de hoepels. Wat er niet in mag, vertelt net zoveel.',
    hintGuessRead: 'Lees wat elke hoepel heeft gehouden. Wat zou de regel kunnen zijn?',
    hintRevealed: 'De regels staan er nu bij.',
    hintTrayEmpty: 'Alles is gesorteerd. Lees de twee groepen en haal dan meer dingen.',
    hintCarry: 'Tik waar het heen moet, of kies met de pijltjestoetsen en Enter.',
    hintRuleChanged: 'De regels zijn veranderd. Sommige dingen zijn teruggekomen.',
    hintChildTurn: 'Geef de beurt aan een kind. Het kind kiest de regels, de klas raadt ze.',
    refuseNoRule: 'Stel eerst voor minstens één hoepel een regel in.',
    refuseSameRule: 'Beide hoepels vragen naar hetzelfde. Kies iets anders.',
    refuseNoPair: 'Met deze twee regels blijft een deel van de mat leeg. Kies iets anders.',
    putBack: 'Blijft liggen', famColour: 'Welke kleur is het?', famShape: 'Welke vorm is het?',
    famSize: 'Hoe groot is het?', famSyll: 'Hoeveel klankgroepen heeft het woord?',
    famInitial: 'Met welke klank begint het woord?',
    famLiving: 'Leeft het, of heeft het geleefd?', famNatural: 'Wie heeft het gemaakt?',
    famEdible: 'Kun je het opeten?', famMoves: 'Hoe komt het in beweging?',
    famSizeBand: 'Hoe groot is het in het echt?', famHabitat: 'Waar leeft het?',
    rSyll1: 'Het woord heeft 1 klankgroep'
  },

  sv: {
    modeLabelled: 'Synliga regler', modeChild: 'Barnet väljer', capBoth: 'Båda',
    changeRules: 'Byt regler', surpriseBtn: 'Överraska mig', chooseBtn: 'Jag väljer',
    backBtn: 'Tillbaka', startBtn: 'Börja sortera', ruleSet: 'Vald – hemlig',
    lessonsTab: 'Färdiga regler', moreThings: 'Fler saker',
    confirmClear: 'Töm mattan? Tryck igen så åker allt tillbaka till sakerna att sortera.',
    hintOpenStart: 'Ta vilken sak som helst till en ring. Det som hör hemma i båda hamnar där ringarna möts.',
    hintOpenLens: 'Finns det något som hör hemma i båda? Då hamnar det där ringarna möts.',
    hintOpenBoth: 'Läs upp allt som ligger i en ring. Passar allt ihop med regeln?',
    hintChoose: 'Välj en regel för varje ring, eller tryck på Överraska mig.',
    hintSecret: 'Reglerna är valda och syns inte för klassen.',
    hintGuessStart: 'Ta en sak till en ring. Ringen bestämmer om den får stanna, inte du.',
    hintGuessOut: 'Ringen släppte den. Det som ingen ring vill behålla är halva svaret.',
    hintGuessRead: 'Läs vad varje ring har behållit. Fråga sedan vad regeln kan vara.',
    hintRevealed: 'Nu syns reglerna.',
    hintTrayEmpty: 'Allt är sorterat. Läs de två grupperna och hämta sedan fler saker.',
    hintCarry: 'Tryck där den ska ligga, eller välj med piltangenterna och Enter.',
    hintRuleChanged: 'Reglerna har ändrats. Några saker har lämnat ringarna.',
    hintChildTurn: 'Låt ett barn ta över. Barnet väljer reglerna och klassen listar ut dem.',
    refuseNoRule: 'Välj en regel för minst en ring först.',
    refuseSameRule: 'Den andra ringen sorterar redan efter samma fråga. Välj en annan fråga.',
    refuseNoPair: 'Med de två reglerna blir någon del av mattan tom. Välj en annan.',
    putBack: 'Ingenting flyttades', famColour: 'Vilken färg har den?', famShape: 'Vilken form har den?',
    famSize: 'Hur stor är klossen?', famSyll: 'Hur många stavelser har ordet?',
    famInitial: 'Vilket ljud börjar ordet på?', famLiving: 'Lever den?',
    famNatural: 'Har människor gjort den?', famEdible: 'Kan man äta den?',
    famMoves: 'Hur rör den sig?', famSizeBand: 'Hur stor är den på riktigt?',
    famHabitat: 'Var lever den?', rSyll1: 'Ordet har 1 stavelse'
  },

  da: {
    modeLabelled: 'Synlige regler', modeChild: 'Et barn vælger', capBoth: 'Begge',
    changeRules: 'Skift reglerne', surpriseBtn: 'Overrask mig', chooseBtn: 'Jeg vælger',
    backBtn: 'Tilbage', startBtn: 'Start sorteringen', ruleSet: 'Valgt — skjult',
    lessonsTab: 'Færdige oplæg', moreThings: 'Flere ting',
    confirmClear: 'Skal måtten tømmes? Tryk igen, så lægges alt tilbage, hvor det kom fra.',
    hintOpenStart: 'Læg noget i en ring. Det, der hører til i begge, skal ligge der, hvor ringene krydser hinanden.',
    hintOpenLens: 'Er der noget, der hører til i begge ringe? Så skal det ligge der, hvor ringene krydser hinanden.',
    hintOpenBoth: 'Læs den ene ring højt. Passer alt det, der ligger i den, til reglen?',
    hintChoose: 'Vælg en regel til hver ring — eller tryk på Overrask mig.',
    hintSecret: 'Reglerne er valgt. Klassen kan ikke se dem.',
    hintGuessStart: 'Læg én ting i en ring. Ringen beholder den eller giver slip. Det er ringen, der bestemmer.',
    hintGuessOut: 'Ringen gav slip på den. Det, ingen ring vil beholde, er halvdelen af svaret.',
    hintGuessRead: 'Læs, hvad hver ring har beholdt. Hvad kan reglen mon være?',
    hintRevealed: 'Nu kan I se reglerne.',
    hintTrayEmpty: 'Alt er sorteret. Læs de to ringe, og hent så flere ting.',
    hintCarry: 'Tryk der, hvor tingen skal hen — eller vælg med piletasterne og tryk på Enter.',
    hintRuleChanged: 'Reglerne er skiftet. Nogle ting er kommet ud af ringene igen.',
    hintChildTurn: 'Lad et barn vælge reglerne. Resten af klassen regner dem ud.',
    refuseNoRule: 'Vælg først en regel til mindst én af ringene.',
    refuseSameRule: 'Den anden ring bruger allerede det spørgsmål. Vælg et andet.',
    refuseNoPair: 'Med de to regler bliver et af felterne tomt. Vælg en anden.',
    putBack: 'Fortrudt', famColour: 'Hvilken farve har den?', famShape: 'Hvilken form har den?',
    famSize: 'Hvor stor er klodsen?', famSyll: 'Hvor mange stavelser har ordet?',
    famInitial: 'Hvilken lyd begynder ordet med?', famLiving: 'Lever den, eller har den levet?',
    famNatural: 'Har mennesker lavet den?', famEdible: 'Kan man spise den?',
    famMoves: 'Hvordan bevæger den sig?', famSizeBand: 'Hvor stor er den i virkeligheden?',
    famHabitat: 'Hvor lever den?', rSyll1: 'Ordet har 1 stavelse'
  },

  no: {
    modeLabelled: 'Synlige regler', modeChild: 'Et barn bestemmer', capBoth: 'I begge',
    changeRules: 'Bytt regler', surpriseBtn: 'Overrask meg', chooseBtn: 'Jeg velger',
    backBtn: 'Tilbake', startBtn: 'Start sorteringen', ruleSet: 'Valgt – skjult',
    lessonsTab: 'Ferdige opplegg', moreThings: 'Hent flere ting',
    confirmClear: 'Tøm matta? Trykk en gang til, så går alle tingene tilbake.',
    hintOpenStart: 'Legg hva du vil i en ring. Det som passer i begge, havner der ringene krysser.',
    hintOpenLens: 'Er det noe som passer i begge? Da skal det dit ringene krysser.',
    hintOpenBoth: 'Les opp det som ligger i én ring. Passer alt sammen med regelen?',
    hintChoose: 'Velg en regel for hver ring, eller trykk «Overrask meg».',
    hintSecret: 'Reglene er satt. Klassen får ikke se dem.',
    hintGuessStart: 'Legg én ting i en ring. Ringen beholder den, eller slipper den. Ringen bestemmer.',
    hintGuessOut: 'Ringen slapp den. Det ingen ring vil ha, er halve svaret.',
    hintGuessRead: 'Les hva hver ring har beholdt. Hva kan regelen være?',
    hintRevealed: 'Nå vises reglene.',
    hintTrayEmpty: 'Alt er lagt ut. Les de to ringene, og hent så flere ting.',
    hintCarry: 'Trykk der den skal ligge – eller bruk piltastene og Enter.',
    hintRuleChanged: 'Reglene er endret. Noen ting måtte ut av ringene igjen.',
    hintChildTurn: 'Gi brettet til et barn. Barnet velger reglene, og klassen finner dem ut.',
    refuseNoRule: 'Velg først en regel for minst én ring.',
    refuseSameRule: 'Den andre ringen sorterer allerede etter dette. Velg et annet spørsmål.',
    refuseNoPair: 'Disse to reglene fyller ikke alle fire feltene. Velg en annen regel.',
    putBack: 'Tilbake der den lå', famColour: 'Hvilken farge har den?', famShape: 'Hvilken form har den?',
    famSize: 'Hvor stor er brikken?', famSyll: 'Hvor mange stavelser har ordet?',
    famInitial: 'Hvilken lyd begynner ordet med?', famLiving: 'Lever den?',
    famNatural: 'Hvem har laget den?', famEdible: 'Kan vi spise den?',
    famMoves: 'Hvordan beveger den seg?', famSizeBand: 'Hvor stor er den i virkeligheten?',
    famHabitat: 'Hvor lever den?', rSyll1: 'Ordet har 1 stavelse'
  },

  fi: {
    modeLabelled: 'Säännöt näkyvissä', modeChild: 'Lapsi valitsee', capBoth: 'Molemmat',
    changeRules: 'Vaihda säännöt', surpriseBtn: 'Yllätä minut', chooseBtn: 'Valitsen itse',
    backBtn: 'Takaisin', startBtn: 'Aloita luokittelu', ruleSet: 'Salainen sääntö',
    lessonsTab: 'Valmiit säännöt', moreThings: 'Lisää lajiteltavaa',
    confirmClear: 'Tyhjennetäänkö matto? Paina uudelleen, niin kaikki palaa takaisin lajiteltavaksi.',
    hintOpenStart: 'Tuo mikä tahansa vanteeseen. Se, mikä kuuluu molempiin, tulee kohtaan, jossa vanteet risteävät.',
    hintOpenLens: 'Kuuluuko jokin molempiin vanteisiin? Se tulee kohtaan, jossa vanteet risteävät.',
    hintOpenBoth: 'Lukekaa ääneen, mitä yhdessä vanteessa on. Sopiiko kaikki sen sääntöön?',
    hintChoose: 'Valitse sääntö kummallekin vanteelle tai napauta Yllätä minut.',
    hintSecret: 'Säännöt on asetettu, eivätkä ne näy luokalle.',
    hintGuessStart: 'Tuokaa yksi esine vanteeseen. Vanne joko pitää sen tai päästää sen pois. Vanne päättää.',
    hintGuessOut: 'Vanne päästi sen pois. Sekin, mitä vanne ei pidä, kertoo säännöstä.',
    hintGuessRead: 'Lukekaa, mitä kumpikin vanne on pitänyt. Kysykää sitten, mikä sen sääntö voisi olla.',
    hintRevealed: 'Säännöt ovat nyt näkyvissä.',
    hintTrayEmpty: 'Kaikki on lajiteltu. Lukekaa molemmat joukot ja tuokaa sitten lisää lajiteltavaa.',
    hintCarry: 'Napauta paikkaa, johon esine kuuluu — tai valitse nuolinäppäimillä ja paina Enter.',
    hintRuleChanged: 'Säännöt vaihtuivat. Osa esineistä palasi takaisin.',
    hintChildTurn: 'Anna vuoro lapselle. Lapsi valitsee säännöt, ja muu luokka päättelee ne.',
    refuseNoRule: 'Aseta ensin sääntö ainakin toiselle vanteelle.',
    refuseSameRule: 'Toisessa vanteessa on jo tämä kysymys. Valitse toinen kysymys.',
    refuseNoPair: 'Nämä kaksi sääntöä eivät jaa esineitä kunnolla. Valitse toinen.',
    putBack: 'Peruttu', famColour: 'Minkä värinen se on?', famShape: 'Minkä muotoinen se on?',
    famSize: 'Kuinka iso palikka on?', famSyll: 'Montako tavua sanassa on?',
    famInitial: 'Millä äänteellä sana alkaa?', famLiving: 'Onko se elossa?',
    famNatural: 'Ovatko ihmiset tehneet sen?', famEdible: 'Voiko sen syödä?',
    famMoves: 'Liikkuuko se itsestään?', famSizeBand: 'Kuinka iso se on oikeasti?',
    famHabitat: 'Missä se elää?', rSyll1: 'Sanassa on 1 tavu'
  }
};
