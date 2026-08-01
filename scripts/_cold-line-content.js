/* =====================================================================
   _cold-line-content.js — the /tools/ LANDING copy for TOOL #43
   ---------------------------------------------------------------------
   One `ToolEntry` per locale for frontend/messages/tool-content/*.json.
   Consumed by scripts/register-cold-line.js (registration point 5 of 7).

   ⭐ ALL EIGHT FIELDS ASKED FOR IN THE FIRST PANEL ROUND — slug, name,
   tagline, about, howToUse, classroomIdeas, metaTitle, metaDescription.
   #42 shipped five of eight past two guards that each checked a SUBSET,
   and the build failed the static export of all eleven pages.

   ⚠ SLUG FOLDING IS PER LOCALE: da folds ø→oe where no folds ø→o, which
   is what keeps two near-identical Scandinavian slugs apart.

   ⭐ EVERY LANDING NAMES THE THERMOMETER; NO IN-TOOL STRING DOES. The
   panels ruled this together and it is the right split: `termometer` is
   the search term a teacher types, and it is FREE on this surface (the
   vertical thermometer lives only in `worksheet-gen/primitives/`, a
   printable with no landing entry). But naming it IN-TOOL would promise
   the reading question the tool is gated never to ask, and would
   cannibalise `G3-345`, which owns it and ships an answer key.

   ⚠ AND THE PT PANEL DECLINED THE COLD-WINTER FRAMING ENTIRELY. Most
   Brazilian children never see a sub-zero reading, and the anchor
   invites "quantos graus?" — the one question the tool must not
   provoke. It also flagged that negative numbers are 7.º-ano in the
   BNCC, so the page claims alignment only to the Números unit: order,
   position, and how far one number is from another.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'below-zero-number-line-thermometer-grade-1-3',
    name: 'Upright and Flat',
    tagline: 'A tall column with a scale beside it you can drag, numbered above and below zero — and one control that lays the whole thing flat, after which nothing about it has changed.',
    about: [
      'Beside the column stands a scale of numbers. Drag the scale itself and it slides along the column, bringing higher or lower numbers into view. Two marks sit on the scale and move independently, and between them stands a single number: how far apart they are. That is everything on the board. No unit after the number, no question, no box to fill in, no clock running down.',
      'The numbers continue below zero, and that is the whole reason the tool exists. A child in Stockholm or Rotterdam reads minus five off a wall in January, years before negative numbers are mentioned in class. That child is seeing a place, not a calculation. Here minus five is also a place: a tick on the scale, exactly as real as the tick at five. Nothing is added and nothing is taken away, because the moment you calculate across zero you are in a different part of the curriculum entirely.',
      'Then the control that justifies the instrument: the whole thing lies down flat. And nothing about it has become anything else — the same scale, the same two marks, the same distance between them. Standing, the class reads a column. Lying flat, they are looking at a number line, small numbers to the left. That connection is normally invisible: children meet the two separately and take years to notice they are one object. Here they turn it over themselves and see it.',
      'The board never asks how much it says. That question belongs on a worksheet with an answer key, and we have those too; here nothing happens when a child is right or wrong, because there is nothing to be right or wrong about. There is no efficacy study behind this routine and we claim none. It sits with the Grade 1 to 3 work on building the number system and on reading a scale. Five places are free; the other eleven and the printable sheet come with the Teacher plan.'
    ],
    howToUse: [
      'Put the two marks somewhere before you say anything, and let the class just look first.',
      'Ask a child to say out loud how far apart the marks are; the number is already there beside them.',
      'Now drag the scale until completely different numbers are showing, and set the marks the same distance apart up there.',
      'Then lay the whole thing down flat without changing anything else, and let the class tell you what is different. This is the moment the tool exists for.',
      'Stand it up again and bring zero to the middle, so everyone sees the numbers running both ways from it.',
      'Choose the next place and start again, without looking back at the one before.'
    ],
    classroomIdeas: [
      'Two marks above zero, then the same distance entirely below zero: have the class predict whether the number between them changes.',
      'Put one mark exactly on zero and drag the other slowly downwards while the class counts along out loud.',
      'Give a target: set the marks so there are exactly eight between them, but with both marks below zero.',
      'Lay it flat and ask which end is the cold end now; let children point before anyone explains.',
      'Put both marks on the same number and ask what ought to stand between them, before you drag them apart.',
      'Do it on paper afterwards: print the sheet, and let children write the numbers in themselves and draw two marks.'
    ],
    metaTitle: 'Upright and Flat — below zero on a number line, K-3',
    metaDescription: 'A draggable scale numbered above and below zero, two marks, and the distance between them. Lay it flat and it is a number line. Free whiteboard tool, K-3.'
  },

  de: {
    slug: 'zahlen-unter-null-negative-zahlen-grundschule',
    name: 'Hochkant und flach',
    tagline: 'Eine hohe Röhre, daneben eine Skala mit Zahlen, zwei Schieber darauf und dazwischen ihr Abstand. Eine Taste legt das Ganze flach – dieselbe Skala liegt dann vor der Klasse, die kleinen Zahlen links, die großen rechts.',
    about: [
      'Auf dem Schirm steht eine hohe Röhre, daneben eine Skala mit Zahlen. Zwei Schieber sitzen an der Skala, und zwischen ihnen steht eine einzige Zahl: wie weit sie auseinanderliegen. Die Skala selbst lässt sich anfassen und ziehen — so kommen Sie an Zahlen, die eben noch außerhalb lagen, nach oben wie nach unten. Unter der Null geht es genauso weiter wie darüber; die Zahlen dort sind keine Sonderfälle, sondern einfach Stellen auf derselben Skala. Eine Einheit steht nirgends. Das ist Absicht.',
      'Dann die Taste, um die es eigentlich geht: Das Ganze legt sich flach hin. Und nichts an ihm ist ein anderes geworden — dieselbe Skala, dieselben Schieber, derselbe Abstand dazwischen. Hochkant liest die Klasse die Röhre ab; flach liegt die Zahlenfolge vor ihr, mit den kleinen Zahlen links und den großen rechts. Genau dieser Zusammenhang bleibt sonst unsichtbar: Kinder lernen beides getrennt kennen und merken jahrelang nicht, dass es ein und dasselbe ist. Hier drehen sie es selbst um und sehen es.',
      'Die Routine dauert zwei Minuten. Setzen Sie die Schieber an zwei Zahlen und lassen Sie die Klasse den Abstand nennen. Ziehen Sie dann die Skala weit weg und setzen Sie die Schieber irgendwo anders wieder genauso weit auseinander — einmal tief unter der Null, einmal weit darüber. Der Abstand ist derselbe. Für Kinder ist das ein echter Widerspruch: Die Zahlen sehen völlig anders aus, und trotzdem ist der Weg zwischen ihnen gleich lang. Darüber lässt sich streiten, und genau dieses Streiten ist die Stunde.',
      'Im Lehrplan der Grundschule liegt das an zwei Stellen zugleich: beim Aufbau des Zahlenraums und beim Ablesen von Skalen im Sachunterricht. Das Gerät bewertet nichts, prüft nichts ab und stellt keine Aufgabe — es zeigt nur, und was gefragt wird, fragen Sie. Kein Richtig, kein Falsch, keine Punkte, keine Uhr, die mitläuft. Lesen muss dafür niemand können: eine Röhre, Zahlen, zwei Schieber. Es läuft ohne Anmeldung im Browser am Whiteboard oder über den Beamer. Fünf Ausschnitte sind kostenlos; elf weitere und das Blatt zum Ausdrucken gehören zum Lehrer-Paket.'
    ],
    howToUse: [
      'Öffnen Sie das Werkzeug am Whiteboard und lassen Sie zuerst nur vorlesen, welche Zahlen gerade zu sehen sind — über und unter der Null.',
      'Setzen Sie die beiden Schieber und lassen Sie die Klasse den Abstand dazwischen laut sagen.',
      'Ziehen Sie die Skala weit nach unten und setzen Sie die Schieber dort wieder genauso weit auseinander; fragen Sie vorher, ob der Abstand dadurch größer wird.',
      'Legen Sie jetzt das Ganze flach hin und sagen Sie nichts. Warten Sie, bis ein Kind sagt, was es da sieht. Dafür ist das Werkzeug da.',
      'Stellen Sie es wieder auf und legen Sie es noch einmal um, bis die Klasse vorher ansagt, was gleich bleiben wird.',
      'Mit „Null in die Mitte" holen Sie die Null jederzeit zurück, wenn sich die Klasse verloren hat.'
    ],
    classroomIdeas: [
      'Erst vorhersagen: Bevor Sie an der Skala ziehen, schreibt jedes Kind auf, ob die Null danach noch zu sehen sein wird.',
      'Zwei Stellen, ein Abstand: einmal tief unter der Null, einmal weit darüber — und die Klasse begründet, warum beide Male dasselbe herauskommt.',
      'Geben Sie ein Ziel vor: Ein Kind stellt die Schieber so, dass die Null genau zwischen ihnen liegt.',
      'Umlegen, aufstellen, umlegen — ohne ein Wort. Die Klasse benennt, was sich verändert hat und was nicht.',
      'Drucken Sie das Blatt: Es zeigt dieselbe Skala zweimal, hochkant und flach, ganz ohne Zahlen. Die Kinder tragen die Zahlen selbst ein.',
      'Danach im Klassenzimmer: Hängen Sie dieselbe Skala aus Papier an die Wand und legen Sie sie am nächsten Tag auf den Boden.'
    ],
    metaTitle: 'Hochkant und flach – Zahlen unter Null, Grundschule',
    metaDescription: 'Eine Röhre mit Skala, zwei Schieber und der Abstand dazwischen – und eine Taste, die alles flach hinlegt. Zahlen über und unter Null, kostenlos am Whiteboard.'
  },

  fr: {
    slug: 'nombres-negatifs-sous-zero-cycle-2',
    name: 'Debout ou à plat',
    tagline: "Un tube dressé, une graduation chiffrée à côté, deux curseurs posés dessus et leur écart entre eux. Un bouton met le tout à plat : la même graduation est alors sous les yeux de la classe, les petits nombres à gauche.",
    about: [
      "Un tube dressé occupe l'écran, avec une graduation chiffrée à côté. Deux curseurs sont posés sur cette graduation, et entre eux s'affiche un seul nombre : leur écart. La graduation elle-même se prend et se fait glisser, ce qui amène des nombres qui étaient hors de vue, vers le haut comme vers le bas. Au-dessous de zéro, cela continue exactement comme au-dessus : ces nombres-là ne sont pas des cas particuliers, ce sont des places sur la même graduation. Aucune unité n'est écrite nulle part, et c'est voulu.",
      "Vient alors le bouton qui justifie tout l'appareil : le tout se met à plat. Et rien n'est devenu autre chose — même graduation, mêmes curseurs, même écart entre les deux. Debout, la classe lit le tube ; à plat, elle a sous les yeux la suite des nombres, les petits à gauche et les grands à droite. Ce lien-là reste d'ordinaire invisible : les élèves rencontrent les deux séparément et mettent des années à comprendre que c'en est un seul. Ici, ils le retournent eux-mêmes et le voient.",
      "Le rituel tient en deux minutes. Placez les curseurs sur deux nombres et faites dire l'écart à voix haute. Faites ensuite glisser la graduation très loin, et replacez les curseurs ailleurs, aussi éloignés qu'avant — une fois bien au-dessous de zéro, une fois bien au-dessus. L'écart est le même. Pour un enfant, c'est une contradiction pour de bon : les nombres n'ont plus rien à voir, et pourtant le chemin entre eux a la même longueur. On peut en discuter longtemps, et cette discussion est la séance.",
      "Dans les programmes officiels, cela se trouve à deux endroits à la fois : la construction du nombre au cycle 2, et la lecture d'une graduation en questionner le monde. L'appareil ne note rien, ne demande rien et ne pose aucune question — il montre, et les questions viennent de vous. Ni bon ni faux, ni points, ni chronomètre. Il n'y a rien à lire pour s'en servir : un tube, des nombres, deux curseurs. Cela s'ouvre dans le navigateur au TBI ou au vidéoprojecteur, sans inscription. Cinq endroits sont gratuits ; onze autres et la fiche à imprimer font partie de l'offre Enseignant."
    ],
    howToUse: [
      "Projetez l'outil et faites d'abord lire les nombres visibles, au-dessus comme au-dessous de zéro.",
      "Placez les deux curseurs et faites dire à voix haute l'écart qui les sépare.",
      "Faites glisser la graduation très bas, puis replacez les curseurs aussi éloignés ; demandez avant si l'écart va grandir.",
      "Mettez maintenant le tout à plat, et ne dites rien. Attendez qu'un élève dise ce qu'il reconnaît. C'est pour ce moment que l'outil existe.",
      "Redressez, remettez à plat, plusieurs fois de suite, jusqu'à ce que la classe annonce d'avance ce qui va rester pareil.",
      "« Ramener le zéro » remet le zéro au milieu dès que la classe s'est perdue."
    ],
    classroomIdeas: [
      "Prédire d'abord : avant de faire glisser la graduation, chacun écrit si le zéro sera encore visible après.",
      "Deux endroits, un même écart : une fois loin au-dessous de zéro, une fois loin au-dessus, et la classe explique pourquoi cela revient au même.",
      "Donnez une cible : un élève place les curseurs de façon que le zéro tombe exactement entre les deux.",
      "Mettez à plat, redressez, remettez à plat, sans un mot : la classe dit ce qui a changé et ce qui n'a pas changé.",
      "Imprimez la fiche : elle montre la même graduation deux fois, debout et à plat, sans les nombres — les élèves les écrivent eux-mêmes.",
      "Ensuite dans la classe : affichez la même graduation en papier au mur, et le lendemain posez-la par terre."
    ],
    metaTitle: 'Debout ou à plat – lire les nombres sous zéro, cycle 2',
    metaDescription: "Un tube, une graduation, deux curseurs et leur écart – et un bouton qui met le tout à plat. Les nombres au-dessous de zéro, gratuit au TBI, cycle 2."
  },

  nl: {
    slug: 'onder-nul-thermometer-groep-4-5',
    name: 'Rechtop en plat',
    tagline: 'Een hoge zuil met een verdeling ernaast die je kunt verschuiven, met getallen boven én onder de nul — en één knop legt het hele ding plat, waarna er niets aan veranderd blijkt te zijn.',
    about: [
      'Naast de zuil staat een verdeling met getallen. Sleep aan de verdeling zelf en die schuift langs de zuil omhoog of omlaag, zodat je hogere of lagere getallen in beeld krijgt. Op de verdeling zitten twee klemmen die je afzonderlijk kunt verplaatsen, en tussen de klemmen staat één getal: hoe ver ze uit elkaar zitten. Meer staat er niet op het bord. Geen maat, geen eenheid achter het getal, geen vraag, geen invulvak, geen tijd die wegloopt.',
      'De getallen lopen door onder de nul, en dat is precies waarom dit gereedschap er is. Een kind in Nederland of Vlaanderen leest in januari min vijf van een muur af, lang voordat er in de klas ooit over negatieve getallen gesproken wordt. Dat kind ziet dan een plek, geen som. Hier is min vijf ook een plek: een streepje op de verdeling, net zo echt als het streepje bij vijf. Er wordt nergens iets bij opgeteld of afgehaald, want zodra je gaat rekenen over de nul heen zit je in een heel andere leerlijn.',
      'Dan de knop die het verschil maakt. Leg de hele zuil plat en het is dezelfde verdeling, met dezelfde streepjes, dezelfde twee klemmen en dezelfde afstand ertussen — alleen ligt hij nu horizontaal. Wat de klas rechtop een thermometer noemde, heet liggend een getallenlijn. Het is geen vergelijking en geen plaatje ernaast: het is hetzelfde ding, één keer gedraaid. Kinderen die de twee al kenden, kenden ze meestal als twee losse dingen.',
      'Het bord vraagt nooit hoeveel het is. Die vraag hoort bij een werkblad met een nakijkvel, en die hebben we ook; hier gebeurt er niets als je iets goed of fout doet, want er valt niets goed of fout te doen. Er is geen onderzoek naar het effect van deze routine en dat claimen we ook niet. Zo sluit het aan bij het meten en het getalbegrip uit de SLO-kerndoelen voor groep 3 tot en met 5. Vijf plekken zijn gratis; de andere elf en het afdrukken horen bij het Leerkracht-pakket.'
    ],
    howToUse: [
      'Zet de twee klemmen ergens neer voordat je iets zegt, en laat de klas eerst alleen kijken.',
      'Laat een kind hardop zeggen hoe ver de klemmen uit elkaar zitten; het getal staat er al bij.',
      'Sleep nu de verdeling omhoog tot er heel andere getallen in beeld staan, en zet de klemmen daar net zo ver uit elkaar neer.',
      'Leg daarna de hele zuil plat, zonder iets te veranderen, en laat de klas zeggen wat er anders is geworden. Daar is dit gereedschap voor.',
      'Zet hem weer rechtop en zoek de nul, zodat iedereen ziet dat de getallen aan beide kanten doorlopen.',
      'Kies een volgende plek en begin opnieuw, zonder terug te kijken op wat er net stond.'
    ],
    classroomIdeas: [
      'Twee klemmen boven de nul, daarna dezelfde afstand helemaal onder de nul: laat de klas eerst voorspellen of het getal ertussen verandert.',
      'Zet één klem precies op de nul en schuif de andere langzaam omlaag, terwijl de klas hardop meetelt.',
      'Geef een doel: zet de klemmen zo neer dat er precies acht tussen zit, maar dan met beide klemmen onder de nul.',
      'Leg de zuil plat en vraag welke kant nu de koude kant is; laat kinderen het aanwijzen voordat iemand het uitlegt.',
      'Zet de twee klemmen op elkaar en vraag wat er dan tussen hen in zou moeten staan, voordat je ze uit elkaar sleept.',
      'Doe het daarna op papier: druk de verdeling af, laat kinderen zelf de getallen erbij schrijven en twee klemmen tekenen.'
    ],
    metaTitle: 'Rechtop en plat – onder nul, thermometer, groep 4-5',
    metaDescription: 'Verschuifbare verdeling met getallen boven en onder de nul, twee klemmen en de afstand ertussen. Leg hem plat en het is een getallenlijn. Gratis, groep 4-5.'
  },

  sv: {
    slug: 'under-noll-termometer-lagstadiet',
    name: 'Pelaren',
    tagline: 'En hög pelare med en skala bredvid som går att dra i, med tal både ovanför och under nollan — och en knapp som lägger ner hela saken, varpå ingenting med den visar sig ha ändrats.',
    about: [
      'Bredvid pelaren står en skala med tal. Dra i själva skalan så glider den uppåt eller nedåt längs pelaren, och andra tal kommer fram. På skalan sitter två hakar som går att flytta var för sig, och mellan hakarna står ett enda tal: hur långt det är mellan dem. Mer än så finns inte på tavlan. Inget mått, ingen enhet efter talet, ingen fråga, ingen ruta att fylla i, ingen tid som räknar ner.',
      'Talen fortsätter nedanför nollan, och det är hela skälet till att verktyget finns. Ett barn i Sverige läser minus fem på en vägg i januari långt innan negativa tal någonsin nämns i klassrummet. Barnet ser då en plats, inte ett räknesätt. Här är minus fem också en plats: ett streck på skalan, precis lika verkligt som strecket vid fem. Ingenting läggs till och ingenting dras bort, för i samma stund som man räknar över nollan är man i en helt annan del av kursplanen.',
      'Så knappen som gör skillnaden. Lägg ner hela pelaren, och det är samma skala, samma streck, samma två hakar och samma avstånd mellan dem — den ligger bara vågrätt nu. Det som stående såg ut som en termometer heter liggande en tallinje. Det är ingen liknelse och ingen bild bredvid: det är samma sak, vriden ett kvarts varv. Barn som redan känner igen båda två känner oftast igen dem som två skilda saker.',
      'Tavlan frågar aldrig hur mycket det är. Den frågan hör hemma på ett arbetsblad med facit, och sådana finns också; här händer ingenting när man gör rätt eller fel, för det finns ingenting att göra rätt eller fel. Det finns ingen effektstudie bakom den här rutinen och vi påstår ingen. Så knyter verktyget an till Lgr22 och arbetet med tal och mätning i årskurs ett till tre. Fem ställen är gratis; de elva andra och utskriften ingår i Lärarpaketet.'
    ],
    howToUse: [
      'Sätt de två hakarna någonstans innan du säger något, och låt klassen bara titta först.',
      'Låt ett barn säga högt hur långt det är mellan hakarna; talet står redan där.',
      'Dra nu skalan uppåt tills helt andra tal syns, och sätt hakarna lika långt ifrån varandra där.',
      'Lägg sedan ner hela pelaren utan att ändra något, och låt klassen säga vad som har blivit annorlunda. Det är därför verktyget finns.',
      'Ställ upp den igen och hitta nollan, så att alla ser att talen fortsätter åt båda hållen.',
      'Välj nästa ställe och börja om, utan att gå tillbaka till det som stod nyss.'
    ],
    classroomIdeas: [
      'Två hakar ovanför nollan, sedan samma avstånd helt under nollan: låt klassen förutsäga om talet mellan dem ändras.',
      'Sätt den ena haken precis på nollan och dra den andra långsamt nedåt medan klassen räknar med högt.',
      'Ge ett mål: sätt hakarna så att det blir precis åtta mellan dem, men med båda hakarna under nollan.',
      'Lägg ner pelaren och fråga vilken sida som nu är den kalla; låt barnen peka innan någon förklarar.',
      'Sätt de två hakarna på samma ställe och fråga vad som borde stå mellan dem, innan ni drar isär dem.',
      'Gör det sedan på papper: skriv ut skalan, låt barnen skriva dit talen själva och rita in två hakar.'
    ],
    metaTitle: 'Pelaren – under noll, avstånd och tallinje, åk 1–3',
    metaDescription: 'Dragbar skala med tal ovanför och under nollan, två hakar och avståndet mellan dem. Lägg ner den så är det en tallinje. Gratis för tavlan, åk 1–3.'
  },

  da: {
    slug: 'under-nul-termometer-indskoling',
    name: 'Fra lodret til vandret',
    tagline: 'Et højt rør med en skala ved siden af, som man kan trække i, med tal både over og under nullet — og en knap, der lægger hele sagen ned, hvorefter der ikke har ændret sig noget ved den.',
    about: [
      'Ved siden af røret står en skala med tal. Træk i selve skalaen, så glider den op eller ned langs røret, og andre tal kommer frem. På skalaen sidder to nåle, som kan flyttes hver for sig, og mellem nålene står ét tal: hvor langt der er mellem dem. Mere er der ikke på tavlen. Intet mål, ingen enhed efter tallet, ingen spørgsmål, intet felt at skrive i, ingen tid der løber.',
      'Tallene fortsætter under nullet, og det er hele grunden til, at værktøjet findes. Et barn i Danmark læser minus fem af en væg i januar længe før negative tal overhovedet bliver nævnt i klassen. Barnet ser da et sted, ikke et regnestykke. Her er minus fem også et sted: en streg på skalaen, lige så virkelig som stregen ved fem. Der bliver ikke lagt noget til og ikke trukket noget fra, for i samme øjeblik man regner hen over nullet, er man et helt andet sted i forløbet.',
      'Så knappen, der gør forskellen. Læg hele røret ned, og det er den samme skala, de samme streger, de samme to nåle og den samme afstand imellem dem — det ligger bare vandret nu. Det, der stående lignede et termometer, hedder liggende en tallinje. Det er ikke en sammenligning og ikke et billede ved siden af: det er den samme ting, drejet en kvart omgang. Børn, der kender begge dele, kender dem som regel som to forskellige ting.',
      'Tavlen spørger aldrig, hvor meget der står. Det spørgsmål hører til et ark med facit, og dem har vi også; her sker der ingenting, når man gør noget rigtigt eller forkert, for der er ikke noget at gøre rigtigt eller forkert. Der findes ingen effektundersøgelse bag denne rutine, og vi påstår ingen. Sådan knytter værktøjet an til Fælles Mål og arbejdet med tal og måling i indskolingen. Fem steder er gratis; de elleve andre og udskrivningen følger med Lærerabonnementet.'
    ],
    howToUse: [
      'Sæt de to nåle et sted, før du siger noget, og lad klassen kigge først.',
      'Lad et barn sige højt, hvor langt der er mellem nålene; tallet står der allerede.',
      'Træk nu skalaen opad, indtil der står helt andre tal, og sæt nålene lige så langt fra hinanden deroppe.',
      'Læg derefter hele røret ned uden at ændre noget, og lad klassen sige, hvad der er blevet anderledes. Det er derfor værktøjet findes.',
      'Stil det op igen og find nullet, så alle kan se, at tallene fortsætter til begge sider.',
      'Vælg det næste sted og begynd forfra uden at vende tilbage til det forrige.'
    ],
    classroomIdeas: [
      'To nåle over nullet, og derefter den samme afstand helt under nullet: lad klassen gætte, om tallet imellem dem ændrer sig.',
      'Sæt den ene nål præcis på nullet, og træk den anden langsomt nedad, mens klassen tæller med højt.',
      'Giv et mål: sæt nålene, så der bliver præcis otte imellem dem, men med begge nåle under nullet.',
      'Læg røret ned, og spørg, hvilken side der nu er den kolde; lad børnene pege, før nogen forklarer det.',
      'Sæt de to nåle det samme sted, og spørg, hvad der så burde stå imellem dem, før I trækker dem fra hinanden.',
      'Gør det bagefter på papir: print skalaen, lad børnene skrive tallene på selv og tegne to nåle.'
    ],
    metaTitle: 'Fra lodret til vandret – under nul, 1.–3. klasse',
    metaDescription: 'Skala man kan trække i, med tal over og under nullet, to nåle og afstanden imellem. Læg den ned, og det er en tallinje. Gratis til indskolingen, 1.–3. kl.'
  },

  no: {
    slug: 'under-null-termometer-smatrinnet',
    name: 'Under null',
    tagline: 'Et høyt rør med en skala ved siden av som kan dras, med tall både over og under nullet — og en knapp som legger hele greia ned, uten at noe med den har endret seg etterpå.',
    about: [
      'Ved siden av røret står en skala med tall. Dra i selve skalaen, så glir den opp eller ned langs røret, og andre tall kommer fram. På skalaen sitter to klemmer som kan flyttes hver for seg, og mellom klemmene står det ett tall: hvor langt det er mellom dem. Mer er det ikke på tavla. Ingen målestokk, ingen enhet etter tallet, ingen spørsmål, ingen rute å fylle ut, ingen tid som løper.',
      'Tallene fortsetter nedenfor nullet, og det er hele grunnen til at verktøyet finnes. Et barn i Norge leser minus fem av en vegg i januar lenge før negative tall i det hele tatt blir nevnt i klasserommet. Barnet ser da et sted, ikke et regnestykke. Her er minus fem også et sted: en strek på skalaen, like virkelig som streken ved fem. Ingenting blir lagt til og ingenting blir trukket fra, for i det øyeblikket man regner over nullet, er man et helt annet sted i læreplanen.',
      'Så knappen som gjør forskjellen. Legg hele røret ned, og det er den samme skalaen, de samme strekene, de samme to klemmene og den samme avstanden mellom dem — det ligger bare vannrett nå. Det som stående så ut som et termometer, heter liggende en tallinje. Det er ikke en sammenligning og ikke et bilde ved siden av: det er den samme tingen, dreid en kvart omdreining. Barn som kjenner igjen begge deler, kjenner dem som regel igjen som to ulike ting.',
      'Tavla spør aldri hvor mye det står. Det spørsmålet hører hjemme på et ark med fasit, og slike har vi også; her skjer det ingenting når man gjør noe riktig eller galt, for det er ikke noe å gjøre riktig eller galt. Det finnes ingen effektstudie bak denne rutinen, og vi hevder ingen. Slik knytter verktøyet an til LK20 og arbeidet med tall og måling på første til tredje trinn. Fem steder er gratis; de elleve andre og utskriften følger med Lærerabonnementet.'
    ],
    howToUse: [
      'Sett de to klemmene et sted før du sier noe, og la klassen bare se først.',
      'La et barn si høyt hvor langt det er mellom klemmene; tallet står der allerede.',
      'Dra nå skalaen oppover til det står helt andre tall, og sett klemmene like langt fra hverandre der oppe.',
      'Legg deretter hele røret ned uten å endre noe, og la klassen si hva som har blitt annerledes. Det er derfor verktøyet finnes.',
      'Sett det opp igjen og finn nullet, så alle ser at tallene fortsetter begge veier.',
      'Velg neste sted og begynn på nytt, uten å gå tilbake til det forrige.'
    ],
    classroomIdeas: [
      'To klemmer over nullet, og så den samme avstanden helt under nullet: la klassen gjette om tallet mellom dem endrer seg.',
      'Sett den ene klemmen nøyaktig på nullet og dra den andre sakte nedover mens klassen teller med høyt.',
      'Gi et mål: sett klemmene slik at det blir nøyaktig åtte mellom dem, men med begge klemmene under nullet.',
      'Legg røret ned og spør hvilken side som nå er den kalde; la barna peke før noen forklarer det.',
      'Sett de to klemmene på samme sted og spør hva som da burde stå mellom dem, før dere drar dem fra hverandre.',
      'Gjør det etterpå på papir: skriv ut skalaen, la barna skrive tallene på selv og tegne inn to klemmer.'
    ],
    metaTitle: 'Under null – tallinje og termometer, 1.–3. trinn',
    metaDescription: 'Skala som kan dras, med tall over og under nullet, to klemmer og avstanden mellom dem. Legg den ned, og det er en tallinje. Gratis, 1.–3. trinn.'
  },

  fi: {
    slug: 'nollan-alapuolella-lampomittari-alkuopetus',
    name: 'Nollan alapuolella',
    tagline: 'Korkea putki ja sen vieressä vedettävä asteikko, jossa on lukuja sekä nollan yläpuolella että sen alapuolella — ja yksi painike, joka panee koko laitteen pitkälleen muuttamatta siitä mitään.',
    about: [
      'Putken vieressä on asteikko, jossa on lukuja. Vedä asteikkoa itseään, niin se liukuu putkea pitkin ylös tai alas ja esiin tulee toisia lukuja. Putken sisällä oleva neste nousee ensimmäisen nastan tasalle, ja alaosan pallo pysyy paikallaan. Asteikolla on kaksi nastaa, joita voi siirtää erikseen, ja nastojen välissä näkyy yksi luku: kuinka kaukana ne ovat toisistaan. Enempää taululla ei ole. Ei mittayksikköä luvun perässä, ei kysymystä, ei täytettävää ruutua, ei juoksevaa aikaa.',
      'Luvut jatkuvat nollan alapuolelle, ja juuri siksi koko väline on olemassa. Suomalainen lapsi lukee tammikuussa seinältä miinus viisi kauan ennen kuin negatiivisista luvuista puhutaan luokassa sanaakaan. Lapsi näkee silloin paikan, ei laskutoimitusta. Täällä miinus viisi on niin ikään paikka: viiva asteikolla, aivan yhtä todellinen kuin viiva viiden kohdalla. Mitään ei lisätä eikä oteta pois, sillä sillä hetkellä kun nollan yli lasketaan, ollaan aivan toisessa kohdassa opetussuunnitelmaa.',
      'Ja sitten se painike, joka ratkaisee. Pane koko putki pitkälleen, ja edessä on sama asteikko, samat viivat, samat kaksi nastaa ja sama etäisyys niiden välillä — se vain makaa nyt vaakatasossa. Se mikä pystyssä näytti lämpömittarilta, on pitkällään lukusuora. Kyse ei ole vertauksesta eikä viereen asetetusta kuvasta: se on sama esine neljänneskierroksen verran käännettynä. Lapset, jotka tunnistavat molemmat, tunnistavat ne yleensä kahtena eri asiana.',
      'Taulu ei koskaan kysy, paljonko siinä lukee. Se kysymys kuuluu tehtäväarkille, jolla on vastaukset, ja sellaisiakin meillä on; täällä ei tapahdu mitään oikein tai väärin tekemisestä, koska mitään ei voi tehdä oikein tai väärin. Tästä rutiinista ei ole vaikuttavuustutkimusta emmekä sellaista väitä. Näin väline liittyy OPS 2014:n lukukäsitteen ja mittaamisen tavoitteisiin ensimmäisellä, toisella ja kolmannella luokalla. Viisi kohtaa on ilmaisia; loput yksitoista ja tulostus kuuluvat Opettaja-tilaukseen.'
    ],
    howToUse: [
      'Aseta kaksi nastaa jonnekin ennen kuin sanot mitään, ja anna luokan ensin vain katsoa.',
      'Anna lapsen sanoa ääneen, kuinka kaukana nastat ovat toisistaan; luku näkyy jo valmiina.',
      'Vedä nyt asteikkoa ylöspäin, kunnes esillä on aivan toisia lukuja, ja aseta nastat yhtä kauas toisistaan siellä.',
      'Pane sitten koko putki pitkälleen mitään muuttamatta ja anna luokan kertoa, mikä on toisin. Tätä varten koko väline on olemassa.',
      'Nosta se takaisin pystyyn ja etsi nolla, jotta kaikki näkevät lukujen jatkuvan kumpaankin suuntaan.',
      'Valitse seuraava kohta ja aloita alusta palaamatta edelliseen.'
    ],
    classroomIdeas: [
      'Kaksi nastaa nollan yläpuolelle ja sitten sama etäisyys kokonaan nollan alapuolelle: antakaa luokan ennustaa, muuttuuko niiden välinen luku.',
      'Asettakaa toinen nasta täsmälleen nollan kohdalle ja vetäkää toista hitaasti alaspäin luokan laskiessa ääneen mukana.',
      'Antakaa tavoite: asettakaa nastat niin, että väliin jää täsmälleen kahdeksan, mutta molemmat nastat nollan alapuolelle.',
      'Pankaa putki pitkälleen ja kysykää, kumpi puoli on nyt kylmä; antakaa lasten osoittaa ennen kuin kukaan selittää.',
      'Asettakaa nastat samaan kohtaan ja kysykää, mitä väliin silloin pitäisi tulla, ennen kuin vedätte ne erilleen.',
      'Tehkää sama paperilla: tulostakaa asteikko, antakaa lasten kirjoittaa luvut itse ja piirtää kaksi nastaa.'
    ],
    metaTitle: 'Nollan alapuolella – lukusuora ja putki, 1.–3. lk',
    metaDescription: 'Vedettävä asteikko, jossa lukuja nollan ylä- ja alapuolella, kaksi nastaa ja niiden etäisyys. Pane pitkälleen, ja se on lukusuora. Ilmainen, 1.–3. luokka.'
  },
  es: {
    "slug": "termometro-numeros-bajo-cero-primaria",
    "name": "Bajo cero",
    "tagline": "Un tubo largo y angosto con su escala: las dos señales se ponen donde uno quiera, arriba o abajo del cero, y el número de en medio dice cuánto las separa. Después el tubo se pone de lado y nada cambia.",
    "about": [
      "En la pantalla hay un tubo largo y angosto y, a un costado, una escala de rayas y números que no termina en el cero y sigue hacia los dos lados. Sobre la escala hay dos señales que los niños arrastran hasta donde quieran, una por encima del cero y la otra por debajo. El color del tubo llega hasta la primera señal y ahí se detiene; la segunda lo deja como está. Entre las dos aparece un número que dice cuánto las separa. Y cuando una señal se sale de la vista, lo que se arrastra es la escala entera: no hay un principio ni un final, solo el tramo que estás mirando.",
      "Trabajar por debajo del cero es difícil por una razón muy concreta: hasta ahora, para estos niños, el cero era el principio de todo y contar hacia atrás terminaba ahí. Aquí el cero deja de ser un tope y pasa a ser un lugar, con números a los dos lados. Es la misma lectura que hacen frente al termómetro de la pared, y es práctica habitual en primaria apoyarse en ese objeto cotidiano antes de que aparezca ninguna operación. Esta herramienta no pide ninguna cuenta: solo paradas y la separación que hay entre ellas.",
      "Lo que sorprende llega al cambiar las señales de lugar. Si están muy por debajo del cero y el número de en medio dice ocho, al deslizar la escala hasta otro tramo, muy lejos de ahí, y volver a separarlas igual, el número vuelve a decir ocho: la separación no depende de dónde estén. Y entonces se pone el tubo de lado. La escala es la misma, las señales están en los mismos números y la separación no se movió. Un termómetro de pie y una recta numérica acostada son el mismo objeto girado, y girarlo no cambió nada de lo que importa.",
      "En el salón funciona proyectada: un niño arrastra desde la pizarra mientras el resto dice en voz alta dónde quedaron las señales. No hace falta leer nada para entenderla, así que sirve igual con quien todavía no lee o está aprendiendo español, y se abre desde el navegador, sin instalar nada y sin cuenta. Cinco paradas y toda la herramienta —las dos señales, la escala que se desliza y el giro— son gratuitas para siempre. Con el plan Docente llegan las otras once y los tubos sin números para imprimirlos y numerarlos en papel."
    ],
    "howToUse": [
      "Proyecta la herramienta y arrastra las dos señales hasta que una quede por encima del cero y la otra por debajo; también puede hacerlo un niño desde la pizarra.",
      "Pide al grupo que lea en voz alta dónde quedó cada señal antes de mirar el número que aparece entre las dos.",
      "Arrastra la escala hasta que el cero desaparezca de la vista y vuelve a colocar las señales igual de separadas; toca Centrar el cero cuando quieras recuperarlo.",
      "Pon el tubo de lado y no digas nada todavía: deja que sea la clase la que note que la escala, las señales y la separación siguen siendo exactamente las mismas.",
      "Toca Otra parada y repite. Después de tres o cuatro paradas, los niños empiezan a anticipar el número de en medio antes de que aparezca."
    ],
    "classroomIdeas": [
      "Pon las dos señales en el mismo número: el número de en medio desaparece. Pregunta a la clase qué separación hay cuando las dos están en el mismo lugar.",
      "Coloca una señal justo encima del cero y la otra justo debajo, y pide que cuenten en voz alta los pasos de una a otra antes de mirar el número de en medio.",
      "Deja las dos señales por debajo del cero y pregunta cuál de las dos está más cerca del cero. Es la trampa clásica: el número que suena más grande es el que está más lejos.",
      "Arrastra la escala hasta que el cero no se vea y pregunta hacia qué lado habría que ir para encontrarlo; luego toca Centrar el cero y compruébenlo juntos.",
      "Pon el tubo de lado antes de que lleguen los niños y déjalo así toda la sesión: trabajen la separación acostado y ponlo de pie al final, para cerrar.",
      "Hazlo después en papel: cada niño numera su tubo impreso y marca las dos señales que quiera; luego intercambian los tubos y leen la separación del compañero."
    ],
    "metaTitle": "Bajo cero — el termómetro y los números, 1.º y 2.º",
    "metaDescription": "Un tubo con escala que sigue por debajo del cero: mueve las dos señales, mira cuánto las separa y ponlo de lado. Gratis para la pizarra digital."
  },
  pt: {
    "slug": "distancia-entre-numeros-abaixo-de-zero-anos-iniciais",
    "name": "O Tubo que Deita",
    "tagline": "Um tubo em pé, uma escala que desliza e dois pinos que a turma põe onde quiser, acima ou abaixo do zero. Um botão deita o tubo inteiro: mesma escala, mesmos pinos, mesma distância.",
    "about": [
      "Na tela fica um tubo comprido e estreito, com a escala numerada de um lado e os dois pinos do outro: um risco em cada passo e um número de cinco em cinco. A criança arrasta cada pino para onde quiser, acima do zero ou abaixo dele, e entre os dois aparece um número sozinho, que é a distância de um até o outro. Quando o tubo aparece pintado, a cor vai até o primeiro pino e para ali. Deslizando a própria escala, a turma alcança números que estavam fora da tela. Não há pergunta, não há resposta certa e não há pontuação.",
      "O zero costuma ser o fim da contagem para uma criança de seis anos: os números começam nele e vão subindo. Um tubo que continua para baixo do zero mostra, sem precisar explicar, que a contagem tem os dois lados. Na BNCC os números negativos só aparecem bem mais tarde, e aqui eles não são conteúdo a ser cobrado — são convivência. O que está de fato em jogo é da unidade temática Números dos anos iniciais: ordenação, comparação e a ideia de quanto falta de um número até outro. Deixar a turma encontrar esse território antes da hora é prática consagrada de sala de aula, e não uma promessa de resultado.",
      "O momento que dá nome à ferramenta é o botão que deita o tubo. Ele não redesenha nada: gira o aparelho inteiro, e a escala, os pinos e o número da distância continuam exatamente os mesmos, só que agora deitados. Um termômetro em pé e uma reta numérica deitada passam a ser, na frente da turma, o mesmo objeto. E há uma segunda surpresa: ponha os dois pinos bem abaixo do zero e depois bem acima dele. Se o pedaço de escala entre os dois tiver o mesmo tamanho, o número entre eles não muda. A distância não depende de onde ela é medida.",
      "Na prática, isso vira uma rotina curta de lousa: você abre uma posição, alguém vai lá e muda um pino, e a turma diz em voz alta se a distância vai mudar antes de olhar. São dezesseis posições no total, encadeadas para que cada uma surpreenda depois da anterior. As cinco primeiras são gratuitas, junto com o aparelho inteiro: os dois pinos, a escala que desliza, o zero e o botão que deita o tubo. As outras onze e a folha para imprimir — um tubo em branco, com os riscos e sem os números, impresso em pé e deitado — vêm com o plano Professor."
    ],
    "howToUse": [
      "Projete a ferramenta com o tubo em pé e peça que uma criança venha à lousa e arraste um dos pinos para onde quiser, acima ou abaixo do zero.",
      "Arraste a própria escala para um lado e para o outro com a turma olhando: números que estavam fora da tela aparecem, e os dois pinos continuam nos mesmos números.",
      "Use o botão de trazer o zero sempre que a turma se perder — ele recoloca o zero no meio da tela e não mexe nos pinos.",
      "Antes de mudar os pinos de lugar, peça que a turma diga em voz alta se a distância entre eles vai mudar; só depois arraste.",
      "Aperte o botão que deita o tubo no meio da conversa, e não no fim: a pergunta boa é o que mudou, e a resposta é nada.",
      "Passe para outra posição e repita. Depois de duas ou três, a turma começa a prever a distância antes mesmo de você abrir a próxima."
    ],
    "classroomIdeas": [
      "Ponha os dois pinos exatamente no mesmo número: a distância some da tela. Peça que a turma explique por que não sobrou nada para medir.",
      "Faça o mesmo pedaço duas vezes, uma vez todo acima do zero e outra vez todo abaixo dele. O número é o mesmo, e é aí que costuma nascer a discussão mais longa da aula.",
      "Deslize a escala até o zero sair da tela e deixe assim por um minuto: sem o zero à vista, a turma passa a se orientar pelos números que sobraram.",
      "Deite o tubo com uma criança segurando o dedo em um dos pinos. O dedo não precisa sair do lugar, e isso mostra melhor do que qualquer explicação que o giro não mexeu em nada.",
      "Segundo ano, unidade temática Números da BNCC: depois da rotina na lousa, peça que a turma copie a escala no caderno e marque os dois pinos com lápis de cor.",
      "Imprima o tubo em branco e deixe cada criança numerar a escala do seu jeito, começando de onde quiser — inclusive de um número abaixo do zero."
    ],
    "metaTitle": "O Tubo que Deita — números abaixo de zero, anos iniciais",
    "metaDescription": "Dois pinos em uma escala que passa abaixo do zero, e um botão que deita o tubo inteiro sem mudar nada. Ferramenta gratuita para a lousa digital, anos iniciais."
  },
  it: {
    "slug": "numeri-sotto-lo-zero-e-distanza-primaria",
    "name": "Il tubo dei numeri",
    "tagline": "Un tubo lungo e stretto con la scala dei numeri accanto: le due puntine si mettono sopra o sotto lo zero e fra loro compare la distanza. Poi lo strumento si corica, e resta la stessa identica scala.",
    "about": [
      "Sullo schermo c’è un tubo lungo e stretto, e accanto corre la scala dei numeri con i suoi segni. Due puntine si trascinano lungo la scala e si fermano dove volete: una sopra lo zero e l’altra sotto, oppure tutte e due dalla stessa parte. La prima puntina riempie il tubo di colore fino al proprio numero; la seconda lo lascia com’è. Fra le due compare un numero solo, quello della distanza. Anche la scala si trascina, così si raggiungono numeri molto più lontani, nei due sensi, di quelli che si vedono adesso. Solo quando si arriva all’estremo della scala, dove i numeri finiscono, il tubo si allarga come in un vero termometro.",
      "Sotto lo zero i numeri smettono di comportarsi come i bambini si aspettano: più ci si allontana dallo zero e più il numero detto sembra grande, mentre il valore è sempre più piccolo. È il punto in cui l’ordine imparato contando in avanti si rompe, e su una scheda non si vede, perché lì il numero è scritto e basta. Qui il numero è un posto, e il posto si tocca con il dito. Portare i numeri sotto lo zero in prima e in seconda con uno strumento che somiglia a un termometro è una pratica di classe consolidata, non una scoperta nostra.",
      "Poi arriva la parte che sorprende. Mettete le puntine vicino allo zero, guardate il numero della distanza e rifate la stessa distanza da tutt’altra parte della scala dei numeri: quel numero non cambia. Uno strumento che sembrava servire solo a leggere un numero diventa uno strumento per misurare salti. E quando lo si corica non succede niente: stessa scala, stessi segni, stessa distanza. Un termometro in piedi e una linea dei numeri sono lo stesso oggetto, girato di un quarto di giro.",
      "Funziona nel browser, sulla LIM come sul tablet, senza registrazione e senza installare niente. Non c’è nessuna domanda, nessuna risposta giusta, nessun punteggio e nessun tempo che scorre: lo strumento mostra e basta, il parlato lo mettete voi. Cinque disposizioni già pronte e tutto l’apparecchio sono gratuiti; con il piano Insegnante si aprono le altre undici e il foglio da stampare, due tubi vuoti con i soli segni e nessun numero, da numerare a mano. Il lavoro sui numeri sotto lo zero e sulle distanze richiama i traguardi di Numeri delle Indicazioni nazionali."
    ],
    "howToUse": [
      "Proietta lo strumento e trascina una puntina sotto lo zero e l’altra sopra: fra le due compare subito il numero della distanza.",
      "Prima di spostare qualcosa, chiedi alla classe di dire ad alta voce che numero ha sotto ciascuna puntina. Accogli anche le risposte che non coincidono.",
      "Trascina la scala dei numeri finché lo zero esce di vista, poi tocca «Centra lo zero» per riportarlo in mezzo: lo zero non è la fine della scala, è un posto come gli altri.",
      "Rifai la stessa distanza in un altro punto della scala dei numeri: puntine spostate, numeri diversi, e il numero fra loro resta quello di prima.",
      "Tocca «Corica lo strumento» mentre i bambini guardano, e lascia qualche secondo di silenzio. Non si è mosso niente della scala dei numeri, ed è proprio questo il punto.",
      "Con «Altre due puntine» passa alle due puntine successive; dopo due o tre la classe comincia a prevedere il numero della distanza prima ancora che compaia."
    ],
    "classroomIdeas": [
      "Metti le due puntine sullo stesso numero: il numero della distanza sparisce. Chiedi alla classe perché stavolta non c’è niente da misurare.",
      "Una puntina resta ferma sullo zero e l’altra si allontana piano dalla parte sotto lo zero: i bambini leggono ad alta voce mentre il numero detto cresce e il valore diventa sempre più piccolo.",
      "Il gioco del congelatore: un bambino sceglie un posto sotto lo zero per il congelatore di casa, un altro un posto sopra per l’aula, e la classe dice quanto stanno lontani.",
      "Copri con la mano il numero della distanza: dalle due puntine la classe lo ricostruisce a voce, poi togli la mano e si controlla insieme.",
      "Stessa distanza, posti diversi: due bambini alla lavagna devono trovare due puntine lontane come le prime, ma dall’altra parte dello zero.",
      "Rifallo su carta con il foglio da stampare: i due tubi arrivano vuoti, con i soli segni, e sono i bambini a scrivere i numeri, chi partendo dallo zero, chi partendo da un’estremità."
    ],
    "metaTitle": "Il tubo dei numeri — sotto lo zero, prima e seconda",
    "metaDescription": "Un tubo con la scala dei numeri: le puntine vanno sopra o sotto lo zero e fra loro compare la distanza. Coricato, è una linea dei numeri. Gratis per la LIM."
  },
};
