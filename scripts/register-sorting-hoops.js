#!/usr/bin/env node
/* =====================================================================
   register-sorting-hoops.js — registration insert for TOOL #30.

   Writes the ToolEntry into all eleven frontend/messages/tool-content/
   <locale>.json (immediately before "labels") and the MANIPULATIVES entry
   into frontend/lib/manipulatives.ts.

   ⚠ A tool is not shippable until `frontend/config/live-tool-slugs.ts`
   carries its key — miss that and all eleven locales return 410. That edit
   is made by hand alongside this script; see the commit.

   ⚠ CURATION: en authored; the other ten are builder drafts written IN the
   locale, corrected later by the per-locale native 3-agent ensembles
   (§A.13.48). [NSR-FLAG] sv/da/no/fi. pt is Brazilian per §6.

   Idempotent. Usage: node scripts/register-sorting-hoops.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KEY = 'sorting-hoops';

const E = {
  en: {
    slug: 'sorting-hoops',
    name: 'Sorting Hoops',
    tagline: 'Two hoops, one hidden rule — and the hoop decides, so you can go quiet and watch them think.',
    about: [
      "Sorting Hoops is two overlapping hoops on a mat. Children drag things in, and the place that matters is the middle: something that belongs in both hoops has nowhere else to go. That is the whole idea, and it is why the hoops overlap rather than sit side by side.",
      "The part that makes it a lesson is Guess My Rule. You set a hidden rule for each hoop and the children bring things to it. The HOOP decides — it keeps what fits and lets the rest go. On the carpet a grown-up has to say “no, not that one”, and children stop thinking and start reading the grown-up's face. Here nobody judges, so you can stand back and listen to them reason. And the things the hoop let go do not disappear: they gather outside the ring, where they become the other half of the evidence. That is exactly how children crack these — as much from what is out as from what is in.",
      "Sort thirty-two logic blocks by colour, shape or size, or sort the illustrated pictures by things a five-year-old can argue about: is it alive, did people make it, can we eat it, does it move by itself, does it live in water. The word rules are the ones no other tool has — how many beats the word has, what letter it starts with — and they work in all eleven languages, because they are built on our own gate-checked word data rather than translated from English."
    ],
    howToUse: [
      'Open it on the class screen. Two hoops, a tray of twelve things, nothing to set up.',
      'For a free sort, leave the hoops unlabelled and let the class decide what each one is for. Unlabelled is the better lesson — they have to agree on a rule out loud before anything can go in.',
      'For Guess My Rule, tap “Set the rules” and choose one for each hoop. The labels read “Secret” until you reveal them.',
      'Send one child at a time to the board. Before they let go, ask the class: do you think it will go in? Nothing lights up until the item is released, so it is a real question.',
      'When somebody says the rule out loud, tap “Show the rules” and let them check themselves.'
    ],
    classroomIdeas: [
      'Start with one hoop and one rule. Add the second hoop only when the class is confident — the overlap is a big idea and it deserves its own day.',
      'Put something in yourself, silently, when they are stuck. Placing one example is the oldest hint in this game and it costs you no words.',
      'Ask for a thing that would go in the middle. Predicting the overlap is much harder than filling it, and it tells you who has understood.',
      'Run it with the pictures and a word rule — how many beats, or the starting letter — and the same apparatus becomes a phonics lesson without changing anything on the screen.'
    ],
    metaTitle: 'Sorting Hoops — Venn Sorting & Guess My Rule | Free Tool',
    metaDescription: 'A free sorting instrument for K-2: two overlapping hoops, a hidden rule, and the hoop decides. Sort logic blocks or pictures by attribute, sound or meaning.'
  },
  de: {
    slug: 'sortierreifen',
    name: 'Sortierreifen',
    tagline: 'Zwei Reifen, eine geheime Regel — und der Reifen entscheidet, damit Sie schweigen und zuhören können.',
    about: [
      'Sortierreifen sind zwei überlappende Reifen auf einer Matte. Kinder ziehen Dinge hinein, und wichtig ist die Mitte: Was in beide Reifen gehört, hat sonst keinen Platz. Genau darum überlappen sie und liegen nicht nebeneinander.',
      'Zur Unterrichtsstunde wird es durch „Errate meine Regel“. Sie legen für jeden Reifen eine geheime Regel fest, und die Kinder bringen Dinge. Der REIFEN entscheidet — er behält, was passt, und lässt den Rest wieder los. Auf dem Teppich muss eine erwachsene Person „nein, das nicht“ sagen, und die Kinder hören auf zu denken und lesen im Gesicht der Erwachsenen. Hier bewertet niemand, also können Sie zurücktreten und dem Denken zuhören. Und was der Reifen losgelassen hat, verschwindet nicht: Es sammelt sich außerhalb und wird zur anderen Hälfte der Hinweise. Genau so lösen Kinder solche Rätsel — ebenso sehr über das, was draußen liegt, wie über das, was drinnen ist.',
      'Sortieren Sie 32 Logikformen nach Farbe, Form oder Größe, oder die Bildkarten nach Fragen, über die ein Fünfjähriger streiten kann: Lebt es? Haben Menschen es gemacht? Kann man es essen? Bewegt es sich von allein? Lebt es im Wasser? Die Wortregeln gibt es sonst nirgends — wie viele Silben das Wort hat, mit welchem Buchstaben es anfängt — und sie funktionieren in allen elf Sprachen, weil sie auf unseren eigenen geprüften Wortdaten beruhen und nicht aus dem Englischen übersetzt sind.'
    ],
    howToUse: [
      'Am Klassenbildschirm öffnen. Zwei Reifen, ein Tablett mit zwölf Dingen, nichts einzurichten.',
      'Beim freien Sortieren lassen Sie die Reifen unbeschriftet und die Klasse entscheiden, wofür jeder steht. Ohne Beschriftung ist es die bessere Stunde — die Kinder müssen sich laut auf eine Regel einigen.',
      'Für „Errate meine Regel“ tippen Sie auf „Regeln festlegen“ und wählen für jeden Reifen eine. Die Beschriftung zeigt „Geheim“, bis Sie sie aufdecken.',
      'Schicken Sie ein Kind nach dem anderen an die Tafel. Fragen Sie die Klasse, bevor losgelassen wird: Glaubt ihr, es geht hinein? Vor dem Loslassen leuchtet nichts auf — es ist also eine echte Frage.',
      'Wenn jemand die Regel ausspricht, tippen Sie auf „Regeln zeigen“ und lassen die Klasse selbst nachprüfen.'
    ],
    classroomIdeas: [
      'Beginnen Sie mit einem Reifen und einer Regel. Der zweite kommt erst dazu, wenn die Klasse sicher ist — die Schnittmenge ist eine große Idee und verdient einen eigenen Tag.',
      'Legen Sie selbst schweigend etwas hinein, wenn es hakt. Ein Beispiel zu setzen ist der älteste Hinweis in diesem Spiel und kostet Sie kein Wort.',
      'Bitten Sie um etwas, das in die Mitte gehört. Die Schnittmenge vorherzusagen ist viel schwerer, als sie zu füllen, und zeigt Ihnen, wer verstanden hat.',
      'Mit den Bildern und einer Wortregel — Silbenzahl oder Anfangsbuchstabe — wird dasselbe Gerät zur Phonetikstunde, ohne dass sich auf dem Bildschirm etwas ändert.'
    ],
    metaTitle: 'Sortierreifen — Ordnen nach Merkmalen | Kostenloses Werkzeug',
    metaDescription: 'Kostenloses Sortierwerkzeug für die Grundschule: zwei überlappende Reifen, eine geheime Regel, und der Reifen entscheidet. Nach Merkmal, Laut oder Bedeutung ordnen.'
  },
  fr: {
    slug: 'cerceaux-de-tri',
    name: 'Cerceaux de tri',
    tagline: 'Deux cerceaux, une règle secrète — et c’est le cerceau qui décide, pour que vous puissiez vous taire et les écouter réfléchir.',
    about: [
      'Les Cerceaux de tri, ce sont deux cerceaux qui se croisent sur un tapis. Les enfants y font glisser des objets, et l’endroit qui compte, c’est le milieu : ce qui appartient aux deux cerceaux n’a nulle part ailleurs où aller. C’est toute l’idée, et c’est pour cela qu’ils se croisent au lieu d’être côte à côte.',
      'Ce qui en fait une leçon, c’est « Devine ma règle ». Vous choisissez une règle secrète par cerceau et les enfants apportent des objets. C’est le CERCEAU qui décide : il garde ce qui convient et laisse repartir le reste. Sur le tapis, il faut qu’un adulte dise « non, pas celui-là », et les enfants cessent de réfléchir pour lire le visage de l’adulte. Ici personne ne juge, vous pouvez donc reculer d’un pas et écouter leur raisonnement. Et ce que le cerceau a laissé repartir ne disparaît pas : cela s’accumule à l’extérieur et devient l’autre moitié des indices. C’est exactement ainsi que les enfants résolvent ce genre de devinette — autant par ce qui est dehors que par ce qui est dedans.',
      'Triez trente-deux formes logiques par couleur, forme ou taille, ou triez les images selon des questions dont un enfant de cinq ans peut discuter : est-ce vivant, est-ce fabriqué par des gens, est-ce que ça se mange, est-ce que ça bouge tout seul, est-ce que ça vit dans l’eau. Les règles sur les mots n’existent nulle part ailleurs — combien de syllabes, par quelle lettre ça commence — et elles fonctionnent dans les onze langues, parce qu’elles reposent sur nos propres données vérifiées et non sur une traduction de l’anglais.'
    ],
    howToUse: [
      'Ouvrez-le sur l’écran de la classe. Deux cerceaux, un plateau de douze objets, rien à installer.',
      'Pour un tri libre, laissez les cerceaux sans étiquette et laissez la classe décider à quoi chacun sert. Sans étiquette, la leçon est meilleure : il faut se mettre d’accord à voix haute avant que quoi que ce soit puisse entrer.',
      'Pour « Devine ma règle », touchez « Choisir les règles » et prenez-en une par cerceau. Les étiquettes affichent « Secrète » jusqu’à ce que vous les dévoiliez.',
      'Envoyez un enfant à la fois au tableau. Avant qu’il lâche l’objet, demandez à la classe : à votre avis, est-ce que ça va entrer ? Rien ne s’allume avant le lâcher, donc c’est une vraie question.',
      'Quand quelqu’un énonce la règle à voix haute, touchez « Montrer les règles » et laissez la classe vérifier elle-même.'
    ],
    classroomIdeas: [
      'Commencez avec un seul cerceau et une seule règle. N’ajoutez le second que lorsque la classe est à l’aise : l’intersection est une grande idée et mérite sa propre séance.',
      'Placez vous-même un objet, en silence, quand ils bloquent. Poser un exemple est le plus vieil indice de ce jeu et ne vous coûte aucun mot.',
      'Demandez un objet qui irait au milieu. Prévoir l’intersection est bien plus difficile que la remplir, et cela vous montre qui a compris.',
      'Lancez-le avec les images et une règle sur les mots — nombre de syllabes ou lettre initiale — et le même appareil devient une séance de phonologie sans rien changer à l’écran.'
    ],
    metaTitle: 'Cerceaux de tri — diagramme de Venn et devine ma règle | Gratuit',
    metaDescription: 'Outil de tri gratuit pour la maternelle et le CP : deux cerceaux qui se croisent, une règle secrète, et c’est le cerceau qui décide. Trier par attribut, son ou sens.'
  },
  it: {
    slug: 'cerchi-per-classificare',
    name: 'Cerchi per classificare',
    tagline: 'Due cerchi, una regola segreta — e decide il cerchio, così tu puoi stare zitta e ascoltarli ragionare.',
    about: [
      'I Cerchi per classificare sono due cerchi che si sovrappongono su un tappeto. I bambini ci trascinano dentro le cose, e il punto che conta è il mezzo: quello che appartiene a tutti e due i cerchi non ha nessun altro posto dove stare. È tutta qui l’idea, ed è per questo che si sovrappongono invece di stare accostati.',
      'Quello che ne fa una lezione è «Indovina la mia regola». Scegli una regola segreta per ogni cerchio e i bambini portano le cose. Decide il CERCHIO: tiene quello che va bene e lascia andare il resto. Sul tappeto deve essere un adulto a dire «no, quello no», e i bambini smettono di pensare e cominciano a leggere la faccia dell’adulto. Qui non giudica nessuno, quindi puoi fare un passo indietro e ascoltare come ragionano. E quello che il cerchio ha lasciato andare non sparisce: si accumula fuori e diventa l’altra metà degli indizi. È esattamente così che i bambini risolvono questi giochi — tanto da quello che sta fuori quanto da quello che sta dentro.',
      'Classifica trentadue forme logiche per colore, forma o grandezza, oppure classifica le immagini secondo domande su cui un bambino di cinque anni può discutere: è vivo, l’hanno fatto le persone, si può mangiare, si muove da solo, vive nell’acqua. Le regole sulle parole non ci sono da nessun’altra parte — quante sillabe ha la parola, con che lettera comincia — e funzionano in tutte e undici le lingue, perché si basano sui nostri dati verificati e non su una traduzione dall’inglese.'
    ],
    howToUse: [
      'Aprilo sullo schermo della classe. Due cerchi, un vassoio con dodici cose, niente da impostare.',
      'Per la classifica libera lascia i cerchi senza etichetta e fai decidere alla classe a cosa serve ciascuno. Senza etichetta la lezione è migliore: bisogna mettersi d’accordo ad alta voce prima che qualcosa possa entrare.',
      'Per «Indovina la mia regola» tocca «Scegli le regole» e prendine una per cerchio. Le etichette dicono «Segreta» finché non le mostri.',
      'Manda un bambino alla volta alla lavagna. Prima che lasci la presa chiedi alla classe: secondo voi ci entra? Prima del rilascio non si illumina niente, quindi è una domanda vera.',
      'Quando qualcuno dice la regola ad alta voce, tocca «Mostra le regole» e lascia che controllino da soli.'
    ],
    classroomIdeas: [
      'Comincia con un cerchio solo e una regola sola. Aggiungi il secondo quando la classe è sicura: la sovrapposizione è un’idea grande e merita una giornata sua.',
      'Metti dentro tu qualcosa, in silenzio, quando si bloccano. Mettere un esempio è l’indizio più antico di questo gioco e non ti costa una parola.',
      'Chiedi una cosa che andrebbe nel mezzo. Prevedere la sovrapposizione è molto più difficile che riempirla, e ti dice chi ha capito.',
      'Usalo con le immagini e una regola sulle parole — quante sillabe o la lettera iniziale — e lo stesso strumento diventa una lezione di fonologia senza cambiare niente sullo schermo.'
    ],
    metaTitle: 'Cerchi per classificare — diagramma di Venn e indovina la regola',
    metaDescription: 'Strumento gratuito per classificare alla scuola dell’infanzia e primaria: due cerchi che si sovrappongono, una regola segreta, e decide il cerchio.'
  },
  es: {
    slug: 'aros-para-clasificar',
    name: 'Aros para clasificar',
    tagline: 'Dos aros, una regla secreta — y decide el aro, para que tú puedas callarte y escucharlos pensar.',
    about: [
      'Los Aros para clasificar son dos aros que se cruzan sobre una alfombra. Los niños arrastran cosas dentro, y el sitio que importa es el del medio: lo que pertenece a los dos aros no tiene ningún otro lugar donde ir. Ésa es toda la idea, y por eso se cruzan en vez de estar uno al lado del otro.',
      'Lo que lo convierte en una clase es «Adivina mi regla». Eliges una regla secreta para cada aro y los niños traen cosas. Decide el ARO: se queda con lo que encaja y deja marchar lo demás. En la alfombra tiene que ser una persona adulta la que diga «no, ésa no», y los niños dejan de pensar y se ponen a leerle la cara. Aquí no juzga nadie, así que puedes dar un paso atrás y escuchar cómo razonan. Y lo que el aro dejó marchar no desaparece: se va juntando fuera y se convierte en la otra mitad de las pistas. Así es exactamente como los niños resuelven estos juegos — tanto por lo que queda fuera como por lo que está dentro.',
      'Clasificad treinta y dos formas lógicas por color, forma o tamaño, o clasificad las imágenes según preguntas sobre las que un niño de cinco años puede discutir: ¿está vivo?, ¿lo han hecho las personas?, ¿se puede comer?, ¿se mueve solo?, ¿vive en el agua? Las reglas sobre las palabras no existen en ninguna otra herramienta — cuántas sílabas tiene, por qué letra empieza — y funcionan en los once idiomas, porque se apoyan en nuestros propios datos verificados y no en una traducción del inglés.'
    ],
    howToUse: [
      'Ábrelo en la pantalla del aula. Dos aros, una bandeja con doce cosas, nada que configurar.',
      'Para clasificar libre, deja los aros sin etiqueta y que el grupo decida para qué es cada uno. Sin etiqueta la clase es mejor: hay que ponerse de acuerdo en voz alta antes de que entre nada.',
      'Para «Adivina mi regla», toca «Elegir las reglas» y coge una para cada aro. Las etiquetas dicen «Secreta» hasta que las muestres.',
      'Manda a un niño cada vez a la pizarra. Antes de que suelte, pregunta al grupo: ¿creéis que va a entrar? Antes de soltar no se ilumina nada, así que es una pregunta de verdad.',
      'Cuando alguien diga la regla en voz alta, toca «Mostrar las reglas» y deja que lo comprueben ellos mismos.'
    ],
    classroomIdeas: [
      'Empieza con un solo aro y una sola regla. Añade el segundo cuando el grupo esté seguro: el cruce es una idea grande y merece su propio día.',
      'Coloca tú algo dentro, en silencio, cuando se atasquen. Poner un ejemplo es la pista más antigua de este juego y no te cuesta ni una palabra.',
      'Pide una cosa que iría en el medio. Predecir el cruce es mucho más difícil que rellenarlo, y te dice quién lo ha entendido.',
      'Úsalo con las imágenes y una regla sobre las palabras — cuántas sílabas o la letra inicial — y el mismo aparato se convierte en una clase de conciencia fonológica sin cambiar nada en la pantalla.'
    ],
    metaTitle: 'Aros para clasificar — diagrama de Venn y adivina mi regla | Gratis',
    metaDescription: 'Herramienta gratuita para clasificar en infantil y primaria: dos aros que se cruzan, una regla secreta, y decide el aro. Clasificar por atributo, sonido o significado.'
  },
  pt: {
    slug: 'arcos-de-classificacao',
    name: 'Arcos de classificação',
    tagline: 'Dois arcos, uma regra secreta — e quem decide é o arco, para que você possa ficar quieta e ouvir a turma pensar.',
    about: [
      'Os Arcos de classificação são dois arcos que se cruzam sobre um tapete. As crianças arrastam coisas para dentro, e o lugar que importa é o do meio: o que pertence aos dois arcos não tem nenhum outro lugar para ficar. É essa a ideia toda, e é por isso que eles se cruzam em vez de ficarem lado a lado.',
      'O que transforma isso numa aula é «Adivinhe a minha regra». Você escolhe uma regra secreta para cada arco e as crianças trazem coisas. Quem decide é o ARCO: ele fica com o que serve e deixa o resto ir embora. No tapete é um adulto que precisa dizer «não, esse não», e as crianças param de pensar e começam a ler o rosto do adulto. Aqui ninguém julga, então você pode dar um passo atrás e escutar o raciocínio. E o que o arco deixou ir embora não some: vai se juntando do lado de fora e vira a outra metade das pistas. É exatamente assim que as crianças resolvem esses jogos — tanto pelo que está fora quanto pelo que está dentro.',
      'Classifiquem trinta e duas formas lógicas por cor, forma ou tamanho, ou classifiquem as imagens por perguntas que uma criança de cinco anos consegue discutir: está vivo, foram as pessoas que fizeram, dá para comer, se move sozinho, vive na água. As regras sobre as palavras não existem em nenhuma outra ferramenta — quantas sílabas a palavra tem, com que letra começa — e funcionam nos onze idiomas, porque se apoiam nos nossos próprios dados verificados e não numa tradução do inglês.'
    ],
    howToUse: [
      'Abra na tela da turma. Dois arcos, uma bandeja com doze coisas, nada para configurar.',
      'Para classificar livre, deixe os arcos sem etiqueta e deixe a turma decidir para que serve cada um. Sem etiqueta a aula é melhor: é preciso combinar em voz alta antes que qualquer coisa entre.',
      'Para «Adivinhe a minha regra», toque em «Escolher as regras» e pegue uma para cada arco. As etiquetas dizem «Secreta» até você mostrar.',
      'Mande uma criança de cada vez até a lousa. Antes de ela soltar, pergunte para a turma: vocês acham que vai entrar? Antes de soltar não acende nada, então é uma pergunta de verdade.',
      'Quando alguém disser a regra em voz alta, toque em «Mostrar as regras» e deixe a turma conferir sozinha.'
    ],
    classroomIdeas: [
      'Comece com um arco só e uma regra só. Acrescente o segundo quando a turma estiver segura: o cruzamento é uma ideia grande e merece um dia só dele.',
      'Coloque você mesma alguma coisa dentro, em silêncio, quando eles travarem. Pôr um exemplo é a pista mais antiga desse jogo e não custa nenhuma palavra.',
      'Peça uma coisa que iria no meio. Prever o cruzamento é muito mais difícil do que preencher, e mostra para você quem entendeu.',
      'Use com as imagens e uma regra sobre as palavras — quantas sílabas ou a letra inicial — e o mesmo aparelho vira uma aula de consciência fonológica sem mudar nada na tela.'
    ],
    metaTitle: 'Arcos de classificação — diagrama de Venn e adivinhe a regra | Grátis',
    metaDescription: 'Ferramenta gratuita de classificação para a educação infantil e anos iniciais: dois arcos que se cruzam, uma regra secreta, e quem decide é o arco.'
  },
  nl: {
    slug: 'sorteerhoepels',
    name: 'Sorteerhoepels',
    tagline: 'Twee hoepels, één geheime regel — en de hoepel beslist, zodat u kunt zwijgen en luisteren hoe ze denken.',
    about: [
      'Sorteerhoepels zijn twee hoepels die elkaar overlappen op een mat. Kinderen slepen er dingen in, en de plek die telt is het midden: wat in allebei de hoepels hoort, kan nergens anders heen. Dat is het hele idee, en daarom overlappen ze in plaats van naast elkaar te liggen.',
      'Wat er een les van maakt is „Raad mijn regel“. U stelt voor elke hoepel een geheime regel in en de kinderen brengen dingen. De HOEPEL beslist: hij houdt wat past en laat de rest weer los. Op de mat moet een volwassene zeggen „nee, die niet“, en dan stoppen kinderen met denken en gaan ze het gezicht van de volwassene lezen. Hier oordeelt niemand, dus u kunt een stap terug doen en naar hun redeneren luisteren. En wat de hoepel heeft losgelaten verdwijnt niet: het verzamelt zich buiten de ring en wordt de andere helft van de aanwijzingen. Precies zo kraken kinderen zulke raadsels — net zo goed door wat erbuiten ligt als door wat erin zit.',
      'Sorteer tweeëndertig logiblokken op kleur, vorm of grootte, of sorteer de plaatjes op vragen waar een vijfjarige over kan discussiëren: leeft het, hebben mensen het gemaakt, kun je het opeten, beweegt het uit zichzelf, leeft het in het water. De woordregels bestaan nergens anders — hoeveel klankgroepen het woord heeft, met welke letter het begint — en ze werken in alle elf talen, omdat ze op onze eigen gecontroleerde woordgegevens rusten en niet op een vertaling uit het Engels.'
    ],
    howToUse: [
      'Open het op het klassenscherm. Twee hoepels, een blad met twaalf dingen, niets in te stellen.',
      'Laat bij vrij sorteren de hoepels zonder etiket en laat de klas bepalen waar elke hoepel voor is. Zonder etiket is de les beter: ze moeten het hardop eens worden voordat er iets in kan.',
      'Tik voor „Raad mijn regel“ op „Regels instellen“ en kies er een per hoepel. De etiketten zeggen „Geheim“ tot u ze laat zien.',
      'Stuur één kind tegelijk naar het bord. Vraag de klas voordat het loslaat: denken jullie dat het erin gaat? Er licht niets op vóór het loslaten, dus het is een echte vraag.',
      'Als iemand de regel hardop zegt, tikt u op „Regels laten zien“ en laat u ze het zelf nakijken.'
    ],
    classroomIdeas: [
      'Begin met één hoepel en één regel. Voeg de tweede pas toe als de klas het zeker weet — de overlap is een groot idee en verdient een eigen dag.',
      'Leg er zelf zwijgend iets in als ze vastlopen. Eén voorbeeld neerleggen is de oudste hint in dit spel en kost u geen woord.',
      'Vraag om iets dat in het midden zou horen. De overlap voorspellen is veel moeilijker dan hem vullen, en het laat u zien wie het begrepen heeft.',
      'Doe het met de plaatjes en een woordregel — aantal klankgroepen of de beginletter — en hetzelfde gereedschap wordt een les klankbewustzijn zonder dat er iets op het scherm verandert.'
    ],
    metaTitle: 'Sorteerhoepels — venndiagram en raad mijn regel | Gratis gereedschap',
    metaDescription: 'Gratis sorteergereedschap voor groep 1-4: twee overlappende hoepels, een geheime regel, en de hoepel beslist. Sorteren op kenmerk, klank of betekenis.'
  },
  sv: {
    slug: 'sorteringsringar',
    name: 'Sorteringsringar',
    tagline: 'Två ringar, en hemlig regel — och det är ringen som avgör, så att du kan tiga och lyssna på hur de tänker.',
    about: [
      'Sorteringsringar är två ringar som överlappar varandra på en matta. Barnen drar in saker, och stället som betyder något är mitten: det som hör hemma i båda ringarna har ingen annanstans att ta vägen. Det är hela idén, och därför överlappar de i stället för att ligga bredvid varandra.',
      'Det som gör det till en lektion är ”Gissa min regel”. Du sätter en hemlig regel för varje ring och barnen kommer med saker. Det är RINGEN som avgör: den behåller det som passar och släpper resten. På mattan måste en vuxen säga ”nej, inte den där”, och då slutar barnen tänka och börjar läsa den vuxnes ansikte. Här dömer ingen, så du kan ta ett steg tillbaka och lyssna på resonemanget. Och det som ringen släppte försvinner inte: det samlas utanför och blir den andra halvan av ledtrådarna. Precis så knäcker barn de här gåtorna — lika mycket av det som ligger utanför som av det som är inne.',
      'Sortera trettiotvå logiska former efter färg, form eller storlek, eller sortera bilderna efter frågor som en femåring kan diskutera: lever den, har människor gjort den, kan man äta den, rör den sig själv, lever den i vatten. Ordreglerna finns ingen annanstans — hur många stavelser ordet har, vilken bokstav det börjar på — och de fungerar på alla elva språken, eftersom de vilar på våra egna kontrollerade orddata och inte på en översättning från engelskan.'
    ],
    howToUse: [
      'Öppna den på klassens skärm. Två ringar, en bricka med tolv saker, inget att ställa in.',
      'Vid fri sortering lämnar du ringarna utan etikett och låter klassen bestämma vad varje ring är till för. Utan etikett blir lektionen bättre — de måste komma överens högt innan något kan läggas in.',
      'För ”Gissa min regel” trycker du på ”Välj reglerna” och tar en per ring. Etiketterna säger ”Hemlig” tills du visar dem.',
      'Skicka fram ett barn i taget. Fråga klassen innan barnet släpper: tror ni att den åker in? Ingenting lyser upp innan man släpper, så det är en riktig fråga.',
      'När någon säger regeln högt trycker du på ”Visa reglerna” och låter dem kontrollera själva.'
    ],
    classroomIdeas: [
      'Börja med en ring och en regel. Lägg till den andra först när klassen är säker — överlappningen är en stor idé och förtjänar en egen dag.',
      'Lägg själv in något, under tystnad, när de kör fast. Att placera ett exempel är den äldsta ledtråden i det här spelet och kostar dig inte ett ord.',
      'Be om något som skulle hamna i mitten. Att förutsäga överlappningen är mycket svårare än att fylla den, och det visar dig vem som har förstått.',
      'Kör den med bilderna och en ordregel — antal stavelser eller begynnelsebokstav — så blir samma redskap en lektion i språklig medvetenhet utan att något ändras på skärmen.'
    ],
    metaTitle: 'Sorteringsringar — venndiagram och gissa min regel | Gratis verktyg',
    metaDescription: 'Gratis sorteringsverktyg för förskoleklass och lågstadiet: två överlappande ringar, en hemlig regel, och det är ringen som avgör.'
  },
  da: {
    slug: 'sorteringsringe',
    name: 'Sorteringsringe',
    tagline: 'To ringe, én hemmelig regel — og det er ringen, der afgør det, så du kan tie og lytte til, hvordan de tænker.',
    about: [
      'Sorteringsringe er to ringe, der overlapper hinanden på en måtte. Børnene trækker ting ind, og stedet, der betyder noget, er midten: det, der hører til i begge ringe, har ikke andre steder at være. Det er hele idéen, og derfor overlapper de i stedet for at ligge ved siden af hinanden.',
      'Det, der gør det til en lektion, er „Gæt min regel“. Du sætter en hemmelig regel for hver ring, og børnene kommer med ting. Det er RINGEN, der afgør det: den beholder det, der passer, og slipper resten. På måtten skal en voksen sige „nej, ikke den“, og så holder børnene op med at tænke og begynder at læse den voksnes ansigt. Her dømmer ingen, så du kan træde et skridt tilbage og lytte til, hvordan de ræsonnerer. Og det, ringen slap, forsvinder ikke: det samler sig uden for ringen og bliver den anden halvdel af sporene. Præcis sådan knækker børn de her gåder — lige så meget ud fra det, der ligger udenfor, som fra det, der er indenfor.',
      'Sortér toogtredive logiske former efter farve, form eller størrelse, eller sortér billederne efter spørgsmål, som en femårig kan diskutere: lever den, har mennesker lavet den, kan man spise den, bevæger den sig selv, lever den i vand. Ordreglerne findes ingen andre steder — hvor mange stavelser ordet har, hvilket bogstav det begynder med — og de virker på alle elleve sprog, fordi de bygger på vores egne kontrollerede orddata og ikke på en oversættelse fra engelsk.'
    ],
    howToUse: [
      'Åbn den på klassens skærm. To ringe, en bakke med tolv ting, intet at indstille.',
      'Ved fri sortering lader du ringene være uden mærkat og lader klassen bestemme, hvad hver ring er til. Uden mærkat bliver lektionen bedre — de skal blive enige højt, før der kan komme noget ind.',
      'Til „Gæt min regel“ trykker du på „Vælg reglerne“ og tager én til hver ring. Mærkaterne siger „Hemmelig“, indtil du viser dem.',
      'Send ét barn ad gangen op til tavlen. Spørg klassen, før barnet slipper: tror I, den kommer ind? Der lyser ikke noget op, før man slipper, så det er et ægte spørgsmål.',
      'Når nogen siger reglen højt, trykker du på „Vis reglerne“ og lader dem tjekke selv.'
    ],
    classroomIdeas: [
      'Start med én ring og én regel. Tilføj først den anden, når klassen er sikker — overlappet er en stor idé og fortjener sin egen dag.',
      'Læg selv noget ind, i tavshed, når de går i stå. At placere ét eksempel er det ældste vink i det her spil og koster dig ikke et ord.',
      'Bed om noget, der ville ligge i midten. At forudsige overlappet er meget sværere end at fylde det, og det viser dig, hvem der har forstået det.',
      'Kør den med billederne og en ordregel — antal stavelser eller begyndelsesbogstav — så bliver det samme redskab til en lektion i sproglig opmærksomhed, uden at noget ændrer sig på skærmen.'
    ],
    metaTitle: 'Sorteringsringe — venndiagram og gæt min regel | Gratis værktøj',
    metaDescription: 'Gratis sorteringsværktøj til børnehaveklassen og indskolingen: to overlappende ringe, en hemmelig regel, og det er ringen, der afgør det.'
  },
  no: {
    slug: 'sorteringsringer',
    name: 'Sorteringsringer',
    tagline: 'To ringer, én hemmelig regel — og det er ringen som avgjør, så du kan tie og høre hvordan de tenker.',
    about: [
      'Sorteringsringer er to ringer som overlapper hverandre på ei matte. Barna drar ting inn, og stedet som betyr noe er midten: det som hører hjemme i begge ringene har ingen andre steder å være. Det er hele idéen, og derfor overlapper de i stedet for å ligge ved siden av hverandre.',
      'Det som gjør det til en leksjon er «Gjett regelen min». Du setter en hemmelig regel for hver ring, og barna kommer med ting. Det er RINGEN som avgjør: den beholder det som passer og slipper resten. På matta må en voksen si «nei, ikke den», og da slutter barna å tenke og begynner å lese ansiktet til den voksne. Her dømmer ingen, så du kan ta et skritt tilbake og høre på resonnementet. Og det ringen slapp forsvinner ikke: det samler seg utenfor og blir den andre halvdelen av sporene. Nettopp slik knekker barn slike gåter — like mye ut fra det som ligger utenfor som fra det som er inne.',
      'Sorter trettito logiske former etter farge, form eller størrelse, eller sorter bildene etter spørsmål en femåring kan diskutere: lever den, har mennesker laget den, kan man spise den, beveger den seg selv, lever den i vann. Ordreglene finnes ingen andre steder — hvor mange stavelser ordet har, hvilken bokstav det begynner med — og de virker på alle elleve språkene, fordi de bygger på våre egne kontrollerte orddata og ikke på en oversettelse fra engelsk.'
    ],
    howToUse: [
      'Åpne den på klassens skjerm. To ringer, et brett med tolv ting, ingenting å stille inn.',
      'Ved fri sortering lar du ringene stå uten merkelapp og lar klassen bestemme hva hver ring er til. Uten merkelapp blir leksjonen bedre — de må bli enige høyt før noe kan legges inn.',
      'For «Gjett regelen min» trykker du på «Velg reglene» og tar én til hver ring. Merkelappene sier «Hemmelig» til du viser dem.',
      'Send ett barn om gangen fram til tavla. Spør klassen før barnet slipper: tror dere den kommer inn? Ingenting lyser opp før man slipper, så det er et ekte spørsmål.',
      'Når noen sier regelen høyt, trykker du på «Vis reglene» og lar dem sjekke selv.'
    ],
    classroomIdeas: [
      'Begynn med én ring og én regel. Legg til den andre først når klassen er trygg — overlappingen er en stor idé og fortjener sin egen dag.',
      'Legg selv inn noe, i stillhet, når de står fast. Å plassere ett eksempel er det eldste hintet i dette spillet og koster deg ikke et ord.',
      'Be om noe som ville havne i midten. Å forutsi overlappingen er mye vanskeligere enn å fylle den, og det viser deg hvem som har forstått.',
      'Kjør den med bildene og en ordregel — antall stavelser eller forbokstav — så blir det samme redskapet en leksjon i språklig bevissthet uten at noe endrer seg på skjermen.'
    ],
    metaTitle: 'Sorteringsringer — venndiagram og gjett regelen | Gratis verktøy',
    metaDescription: 'Gratis sorteringsverktøy for 1.-3. trinn: to overlappende ringer, en hemmelig regel, og det er ringen som avgjør.'
  },
  fi: {
    slug: 'lajitteluvanteet',
    name: 'Lajitteluvanteet',
    tagline: 'Kaksi vannetta, yksi salainen sääntö — ja vanne päättää, joten voit olla hiljaa ja kuunnella, miten he ajattelevat.',
    about: [
      'Lajitteluvanteet ovat kaksi vannetta, jotka menevät päällekkäin matolla. Lapset vetävät esineitä sisään, ja tärkein paikka on keskellä: se mikä kuuluu molempiin vanteisiin, ei mahdu mihinkään muualle. Siinä on koko idea, ja juuri siksi vanteet menevät päällekkäin eivätkä ole vierekkäin.',
      'Oppitunniksi tämän tekee ”Arvaa sääntöni”. Asetat kummallekin vanteelle salaisen säännön, ja lapset tuovat esineitä. VANNE päättää: se pitää sen mikä sopii ja päästää loput menemään. Matolla aikuisen on sanottava ”ei, ei tuo”, ja silloin lapset lakkaavat ajattelemasta ja alkavat lukea aikuisen ilmettä. Täällä kukaan ei arvostele, joten voit ottaa askeleen taaksepäin ja kuunnella päättelyä. Eikä se, minkä vanne päästi menemään, katoa: se kertyy vanteen ulkopuolelle ja siitä tulee vihjeiden toinen puoli. Juuri näin lapset ratkaisevat tällaiset arvoitukset — yhtä paljon ulkopuolelle jääneistä kuin sisällä olevista.',
      'Lajitelkaa kolmekymmentäkaksi loogista muotoa värin, muodon tai koon mukaan, tai lajitelkaa kuvia kysymyksillä, joista viisivuotias voi väitellä: elääkö se, ovatko ihmiset tehneet sen, voiko sen syödä, liikkuuko se itsestään, elääkö se vedessä. Sanasääntöjä ei ole missään muualla — montako tavua sanassa on, millä kirjaimella se alkaa — ja ne toimivat kaikilla yhdellätoista kielellä, koska ne perustuvat omiin tarkistettuihin sanatietoihimme eivätkä englannista käännettyihin.'
    ],
    howToUse: [
      'Avaa se luokan näytölle. Kaksi vannetta, tarjotin jossa on kaksitoista esinettä, mitään ei tarvitse asettaa.',
      'Vapaassa lajittelussa jätä vanteet nimeämättä ja anna luokan päättää, mitä varten kumpikin on. Ilman nimilappua oppitunti on parempi — heidän on sovittava ääneen ennen kuin mitään voi laittaa sisään.',
      'Napauta ”Arvaa sääntöni” -tilassa kohtaa ”Aseta säännöt” ja valitse kummallekin vanteelle yksi. Nimilaput lukevat ”Salainen”, kunnes näytät ne.',
      'Lähetä yksi lapsi kerrallaan taululle. Kysy luokalta ennen kuin lapsi päästää irti: menneekö se mielestänne sisään? Mikään ei syty ennen irti päästämistä, joten kysymys on aito.',
      'Kun joku sanoo säännön ääneen, napauta ”Näytä säännöt” ja anna heidän tarkistaa itse.'
    ],
    classroomIdeas: [
      'Aloita yhdellä vanteella ja yhdellä säännöllä. Lisää toinen vasta kun luokka on varma — päällekkäinen alue on iso idea ja ansaitsee oman päivänsä.',
      'Laita itse jotain sisään, hiljaa, kun he juuttuvat. Yhden esimerkin asettaminen on tämän pelin vanhin vihje eikä maksa sinulle sanaakaan.',
      'Pyydä jotain, joka menisi keskelle. Päällekkäisen alueen ennustaminen on paljon vaikeampaa kuin sen täyttäminen, ja se kertoo sinulle, kuka on ymmärtänyt.',
      'Käytä sitä kuvien ja sanasäännön kanssa — tavumäärä tai alkukirjain — niin sama väline muuttuu kielellisen tietoisuuden tunniksi ilman että ruudulla muuttuu mikään.'
    ],
    metaTitle: 'Lajitteluvanteet — venn-kaavio ja arvaa sääntöni | Maksuton työkalu',
    metaDescription: 'Maksuton lajittelutyökalu esi- ja alkuopetukseen: kaksi päällekkäistä vannetta, salainen sääntö, ja vanne päättää.'
  }
};

const LOCALES = Object.keys(E);

let touched = 0;
for (const loc of LOCALES) {
  const p = path.join(ROOT, 'frontend', 'messages', 'tool-content', `${loc}.json`);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
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
    field('description', (e) => e.about.join(' ')),
    '  },',
    '];'
  ].join('\n');
  const at = m.lastIndexOf('\n];');
  if (at === -1) { console.error('manipulatives: array terminator not found'); process.exit(1); }
  m = m.slice(0, at + 1) + entry + m.slice(at + 3);
  fs.writeFileSync(mp, m, 'utf8');
  console.log('manipulatives: entry appended');
}
