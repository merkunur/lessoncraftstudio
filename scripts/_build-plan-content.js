/* =====================================================================
   _build-plan-content.js — the SoT for TOOL #44's landing pages
   ---------------------------------------------------------------------
   One ToolEntry per locale, consumed by register-build-plan.js.

   ⚠ ALL EIGHT FIELDS, EVERY LOCALE. #42 shipped five and broke the
   static export of all eleven landing pages, AFTER two guards had
   reported success — which is why register- now reads the required
   field list off the `ToolEntry` interface itself and refuses to run if
   it parses implausibly few.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Ten native panels across
   three ensembles, each handed the English as a SOURCE TO AUDIT rather
   than a target to render. They found nine defects in it, four of them
   in code.

   ⚖ THE GERMAN `-plan` RULING, recorded because the shipped rule did
   not cover it. A shared compound HEAD is not a collision; a shared
   MODIFIER or a full compound is — `Plan` is one of the most productive
   heads in German (Stundenplan, Sitzplan, Fahrplan), and reserving it
   would forbid most of the instrument lexicon while protecting nothing.
   So `Käferplan` (#40) does not block `Bauplan`.
   ⚠ But the NAME still stays off `-plan`, for a different and stronger
   reason: `tool-content/de.json:1018` already writes "Bauen nach
   Bauplan" INSIDE #40's own German classroom ideas, so a German teacher
   searching the site for Bauplan would land on the beetle tool. That is
   a search collision, not a lexical one. `der Bauplan` therefore
   carries the runtime, the prose and the slug; the name does not.
   `Grundriss` was rejected as Sekundarstufe register (no
   Grundschullehrerin says it) and `Bauplatte` as the physical baseplate
   rather than the notation.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'build-from-a-plan-spatial-reasoning-grade-1-2',
    name: 'The Blueprint',
    tagline: 'Nine squares, a number in each — and beside them the building those numbers make. Change the blueprint and the building follows; change the building and the blueprint follows.',
    about: [
      'On the left is the blueprint: nine squares in three rows, each holding one number from 0 to 4. The number says how tall the building stands at that spot. Beside it stands exactly that building, drawn from a corner so height and both directions are visible at once. Tap a square and it rises by one and the building rises with it; take hold of the building instead and the number in the square follows. It is not two things that have to be kept in step — it is one thing, written twice, and because a child can reach in from either end, nobody has to explain that the number and the build belong together. You can see it.',
      'Below sit two flat outlines: under the blueprint, the building seen from the front; under the building, the same one seen from the side. Those two outlines are the real reason the tool exists. A child looking at the building sees it in space. A child holding only the two outlines has to build it in their head — and that is exactly where copying a model parts company with reasoning about one.',
      'Because the two outlines usually do not settle it. Of the 1,953,125 possible buildings, 99.96 per cent share their front-and-side pair with at least one other, and 87 per cent of all pairs fit more than one building. A chip shows one of those others on request — and greys out when there is none, because 709 buildings genuinely are pinned down by their two directions. That is not a flourish: the class meets the fact that two answers can both be right without either being wrong.',
      'Another chip turns the whole thing a quarter turn. The building is the same building, but what faced you now faces sideways. On exactly 125 of them nothing moves at all, and that is a discovery rather than a fault — the tool has a separate word for it. Nothing is added up here, nothing is asked, no points are given and no clock runs. It belongs in the short routine at the start of a lesson, on the board in front of the whole class. Building from a plan is a weekly staple in German, Dutch and Nordic classrooms; the US standards do not code it before grade five, which is why so few tools carry it.'
    ],
    howToUse: [
      'Put the blueprint on the board and say nothing at first. Let the class read the nine numbers and describe the building before anyone looks at it.',
      'Tap a square. It rises by one and the building rises with it — there is nothing to type; you tap, drag, or use the arrow keys.',
      'Swap ends: let a child take hold of the building itself, and ask the rest to point at the number in the blueprint that changes on its own.',
      'Cover the building with your hand and let the class describe it from the two outlines alone. Nothing labels them — which one is the front is answered by where it sits.',
      'Press Quarter turn without changing a single number, and ask what is different — and what is not. On some buildings nothing moves; ask why.',
      'Finish with "Another that looks the same": let the class picture a second building with the same two outlines before you show it. When the chip is greyed out, this building is the only one.'
    ],
    classroomIdeas: [
      'Blueprint first, building second: the class reads the nine numbers aloud and describes the building before anyone looks. Then reveal it.',
      'The other way round: build it first without touching the numbers, and let the children copy the blueprint into their books afterwards.',
      'Only the outlines: show just the two flat views and let pairs build something that fits — then count how many different answers the class found.',
      'Set the four corners to one number and the four edge squares to another, then turn it. Nothing happens. Ask why; there are exactly 125 buildings like that.',
      'Put a 0 in the middle and ask what a zero means here. It is not nothing — it is a place where nobody built, and you can see straight through.',
      'On paper afterwards: print the blank blueprints, let each child fill in nine numbers by hand and swap with a neighbour, who builds it without seeing the original.'
    ],
    metaTitle: 'The Blueprint — build from a plan, Grade 1-2 spatial reasoning',
    metaDescription: 'Nine numbers on a blueprint, the building beside it, and the same building from the front and the side. Free whiteboard tool for Grade 1-2.'
  },

  de: {
    slug: 'bauen-nach-bauplan-raumvorstellung-grundschule',
    name: 'Neun Zahlen, ein Gebäude',
    tagline: 'Neun Felder, in jedem eine Zahl von 0 bis 4 – und daneben steht das Gebäude, das diese Zahlen ergeben. Wer am Bauplan etwas ändert, ändert das Gebäude; wer am Gebäude etwas ändert, ändert den Bauplan.',
    about: [
      'Links liegt der Bauplan: neun Felder in drei Reihen, in jedem Feld eine Zahl von 0 bis 4. Die Zahl sagt, wie hoch das Gebäude an dieser Position steht. Rechts daneben steht genau dieses Gebäude, schräg von oben gesehen. Tippt man ein Feld an, wächst es um eins und das Gebäude wächst mit; tippt man an das Gebäude, ändert sich die Zahl im Bauplan. Beides ist dasselbe Objekt, nur zweimal aufgeschrieben – und weil man von beiden Seiten hineingreifen kann, muss niemand erklären, dass die Zahl und der Bau zusammengehören. Man sieht es.',
      'Darunter liegen zwei flache Umrisse: unter dem Bauplan das Gebäude von vorn gesehen, unter dem Gebäude dasselbe von der Seite. Diese beiden Umrisse sind der eigentliche Grund für das Gerät. Ein Kind, das ein Gebäude vor sich hat, sieht es dreidimensional. Ein Kind, das nur die beiden Umrisse hat, muss sich das Gebäude vorstellen – und genau dort trennt sich das reine Nachbauen vom räumlichen Denken.',
      'Denn die beiden Umrisse legen das Gebäude meistens nicht fest. Von 1 953 125 möglichen Gebäuden teilen sich 99,96 Prozent ihr Paar aus Vorder- und Seitenansicht mit mindestens einem anderen; bei 87 Prozent aller Paare gibt es mehr als eine Lösung. Ein Feld des Geräts zeigt auf Wunsch ein zweites Gebäude, das von vorn und von der Seite genau gleich aussieht – und bleibt grau, wenn es keines gibt, denn 709 Gebäude sind tatsächlich eindeutig. Das ist keine Spielerei: Die Klasse erlebt, dass zwei richtige Antworten nebeneinander stehen können, ohne dass eine davon falsch wird.',
      'Ein weiteres Feld dreht das Ganze um eine Vierteldrehung. Das Gebäude bleibt dasselbe, aber was eben vorn war, liegt nun an der Seite. Bei genau 125 Gebäuden ändert sich dabei nichts – auch das ist eine Entdeckung und keine Fehlfunktion, und das Gerät sagt es dann auch so. Das Gerät zählt nichts zusammen, fragt nie nach der Gesamtzahl, vergibt keine Punkte und misst keine Zeit. Es gehört in die Übungszeit zu Beginn der Stunde, ans Whiteboard vor der ganzen Klasse und in den Bereich Raum und Form des Lehrplans, wo Raumvorstellung ausdrücklich zu den Grundschulzielen gehört.'
    ],
    howToUse: [
      'Öffnen Sie das Gerät am Whiteboard und lassen Sie zuerst nur den Bauplan lesen: Welche Zahl steht wo, und wie hoch wird das Gebäude dort?',
      'Tippen Sie ein Feld an. Es wächst um eins, das Gebäude wächst mit. Für größere Sprünge nach oben und unten ziehen; mit der Tastatur gehen auch die Pfeiltasten.',
      'Decken Sie das Gebäude gedanklich ab und lassen Sie die Klasse nur aus den beiden unteren Umrissen beschreiben, wie hoch das Gebäude vorn und an der Seite ist.',
      'Drücken Sie „Vierteldrehung" und lassen Sie vorher raten: Welcher der beiden Umrisse wandert wohin? Bei manchen Gebäuden ändert sich nichts – fragen Sie, warum.',
      'Drücken Sie „Eins, das genauso aussieht" – aber erst, nachdem die Klasse selbst ein zweites Gebäude vorgeschlagen hat. Ist das Feld grau, ist dieses Gebäude eindeutig.',
      'Mit „Ein anderer Bauplan" holen Sie das nächste Gebäude. Fünf sind frei zugänglich, elf weitere und das Blatt mit leeren Bauplänen gehören zum Lehrer-Paket.'
    ],
    classroomIdeas: [
      'Bauplan zuerst, Gebäude später: Die Klasse liest den Bauplan vor und beschreibt das Gebäude, bevor jemand hinsieht. Dann aufdecken.',
      'Ansage nach Zahlen: Sie sagen neun Zahlen an, die Kinder bauen mit dem Material aus der Bauecke nach, und erst danach zeigt das Gerät, ob es passt.',
      'Nur die Umrisse: Sie zeigen ausschließlich die beiden unteren Umrisse. Jedes Kind baut ein passendes Gebäude – und die Klasse stellt fest, dass mehrere Lösungen richtig sind.',
      'Die Wette: Vor der Vierteldrehung stimmt die Klasse ab, ob sich das Bild ändert oder nicht. Bei den drehsymmetrischen Gebäuden gewinnt die Minderheit.',
      'Eindeutig oder nicht: Die Klasse tippt, ob dieses Gebäude das einzige zu seinen Umrissen ist. Erst danach wird das Feld gedrückt, das die Antwort verrät.',
      'Auf Papier: Die leeren Baupläne aus dem Lehrer-Paket ausdrucken, ein Kind baut hinter der Mappe, das andere zeichnet den Bauplan nach Ansage.'
    ],
    metaTitle: 'Neun Zahlen, ein Gebäude – Bauen nach Bauplan, Grundschule',
    metaDescription: 'Neun Zahlen im Bauplan, daneben das Gebäude – von vorn und von der Seite. Bauen nach Bauplan für die Grundschule, kostenlos am Whiteboard.'
  },

  nl: {
    slug: 'bouwen-naar-bouwplaat-ruimtelijk-inzicht-groep-3',
    name: 'De bouwplaat',
    tagline: 'Negen vakjes met elk een getal van 0 tot 4 – en ernaast staat het bouwwerk dat die getallen vormen. Verander je iets op de bouwplaat, dan verandert het bouwwerk; verander je iets aan het bouwwerk, dan verandert de bouwplaat.',
    about: [
      'Links ligt de bouwplaat: negen vakjes in drie rijen, met in elk vakje een getal van 0 tot 4. Dat getal zegt hoe hoog het bouwwerk daar staat. Rechts ernaast staat precies dat bouwwerk, schuin van boven gezien. Tik je op een vakje, dan wordt het één hoger en groeit het bouwwerk mee; tik je op het bouwwerk, dan verandert het getal op de bouwplaat. Het is één ding, twee keer opgeschreven – en omdat je er van beide kanten in kunt grijpen, hoeft niemand uit te leggen dat het getal en de bouw bij elkaar horen. Je ziet het.',
      'Daaronder staan twee platte omtrekken: onder de bouwplaat het vooraanzicht, onder het bouwwerk het zijaanzicht. Die twee aanzichten zijn de eigenlijke reden voor dit hulpmiddel. Een kind dat het bouwwerk voor zich heeft, ziet het ruimtelijk. Een kind dat alleen de twee aanzichten heeft, moet het bouwwerk in het hoofd maken – en precies daar scheidt het namaken zich van het ruimtelijk redeneren.',
      'Want de twee aanzichten leggen het bouwwerk meestal niet vast. Van de 1.953.125 mogelijke bouwwerken deelt 99,96 procent zijn paar van vooraanzicht en zijaanzicht met minstens één ander; bij 87 procent van alle paren zijn er meer oplossingen. Een knop laat op verzoek een tweede bouwwerk zien dat er van voren en van opzij precies zo uitziet – en blijft grijs als dat er niet is, want 709 bouwwerken liggen werkelijk vast. Dat is geen trucje: de klas merkt dat twee antwoorden naast elkaar goed kunnen zijn zonder dat er één fout wordt.',
      'Een tweede knop geeft het geheel een kwartslag. Het bouwwerk blijft hetzelfde, maar wat eerst vooraan zat, zit nu opzij. Bij precies 125 bouwwerken verandert er niets – ook dat is een ontdekking en geen storing, en het hulpmiddel zegt dat dan ook. Het telt niets bij elkaar op, vraagt nooit hoeveel het er samen zijn, geeft geen punten en houdt geen tijd bij. Het hoort in de dagelijkse rekenstart, op het digibord voor de hele groep, en bij het domein meten en meetkunde van de SLO Kerndoelen, waar ruimtelijk inzicht met zoveel woorden genoemd wordt.'
    ],
    howToUse: [
      'Open het hulpmiddel op het digibord en laat eerst alleen de bouwplaat lezen: welk getal staat waar, en hoe hoog wordt het bouwwerk daar?',
      'Tik op een vakje. Het wordt één hoger en het bouwwerk groeit mee. Voor grotere sprongen sleep je omhoog en omlaag; met het toetsenbord werken de pijltjestoetsen.',
      'Dek het bouwwerk in gedachten af en laat de groep alleen uit de twee aanzichten beschrijven hoe hoog het vooraan en opzij is.',
      'Druk op ‘Kwartslag’ en laat vooraf raden: welk aanzicht gaat waarheen? Bij sommige bouwwerken verandert er niets – vraag waarom.',
      'Druk pas op ‘Nog een die er zo uitziet’ nadat de groep zelf een tweede bouwwerk heeft bedacht. Is de knop grijs, dan ligt dit bouwwerk vast.',
      'Met ‘Een andere bouwplaat’ haal je het volgende bouwwerk. Vijf zijn vrij te gebruiken; nog elf en het blad met lege bouwplaten horen bij het Leerkracht-pakket.'
    ],
    classroomIdeas: [
      'Eerst de plaat, dan de bouw: de groep leest de bouwplaat hardop en beschrijft het bouwwerk voordat iemand kijkt. Daarna pas laten zien.',
      'Bouwdictee: je noemt negen getallen, de kinderen bouwen na met het materiaal uit de bouwhoek, en pas daarna laat het hulpmiddel zien of het klopt.',
      'Alleen de aanzichten: toon uitsluitend het vooraanzicht en het zijaanzicht. Iedereen bouwt er iets bij – en de groep ontdekt dat meerdere antwoorden goed zijn.',
      'De weddenschap: voor de kwartslag stemt de groep of het beeld verandert of niet. Bij de bouwwerken die hetzelfde blijven, wint de minderheid.',
      'Vastgelegd of niet: de groep schat eerst in of dit bouwwerk het enige is bij deze twee aanzichten. Pas daarna gaat de knop die het antwoord verklapt.',
      'Op papier: druk de lege bouwplaten uit het Leerkracht-pakket af; het ene kind bouwt achter een map, het andere tekent de bouwplaat op aanwijzing.'
    ],
    metaTitle: 'De bouwplaat – bouwen naar bouwplaat, groep 3/4',
    metaDescription: 'Negen getallen op de bouwplaat, ernaast het bouwwerk – van voren en van opzij. Bouwen naar bouwplaat voor groep 3/4, gratis op het digibord.'
  },

  sv: {
    slug: 'bygga-efter-ritning-rumsuppfattning-lagstadiet',
    name: 'Byggritningen',
    tagline: 'Nio rutor med en siffra från 0 till 4 i varje – och bredvid står byggnaden som siffrorna reser. Ändrar du på ritningen ändras byggnaden; ändrar du på byggnaden ändras ritningen.',
    about: [
      'Till vänster ligger byggritningen: nio rutor i tre rader, med en siffra från 0 till 4 i varje ruta. Siffran säger hur högt byggnaden står just där. Till höger står precis den byggnaden, sedd snett uppifrån. Trycker du på en ruta växer den ett steg och byggnaden växer med; trycker du på byggnaden ändras siffran på ritningen. Det är samma sak, skriven två gånger – och eftersom du kan gå in från båda hållen behöver ingen förklara att siffran och bygget hör ihop. Man ser det.',
      'Under dem ligger två platta konturer: under ritningen syns byggnaden framifrån, under byggnaden syns den från sidan. De två konturerna är hela skälet till att verktyget finns. Ett barn som har byggnaden framför sig ser den i rymden. Ett barn som bara har de två konturerna måste bygga den inne i huvudet – och det är där efterbyggandet skiljer sig från det rumsliga tänkandet.',
      'För konturerna bestämmer oftast inte byggnaden. Av 1 953 125 möjliga byggnader delar 99,96 procent sitt par av framifrån och från sidan med minst en annan, och 87 procent av alla par har mer än en lösning. En knapp visar på begäran en annan byggnad som ser likadan ut framifrån och från sidan – och förblir grå när det inte finns någon, för 709 byggnader är faktiskt entydiga. Det är ingen lek med orden: klassen får uppleva att två svar kan stå bredvid varandra utan att något av dem blir fel.',
      'En annan knapp vrider alltihop ett kvarts varv. Byggnaden är densamma, men det som nyss satt framtill sitter nu på sidan. För exakt 125 byggnader händer ingenting alls – också det är en upptäckt och inte ett fel, och verktyget säger det då. Verktyget lägger inte ihop någonting, frågar aldrig hur många det är sammanlagt, ger inga poäng och tar inte tid. Det hör hemma i den dagliga räknestarten, på tavlan framför hela klassen, och i geometridelen av Lgr22, där rumsuppfattning står med som ett eget innehåll för de tidiga åren.'
    ],
    howToUse: [
      'Öppna verktyget på tavlan och låt klassen först bara läsa ritningen: vilken siffra står var, och hur högt blir byggnaden där?',
      'Tryck på en ruta. Den växer ett steg och byggnaden växer med. För större hopp drar du uppåt och nedåt; med tangentbordet fungerar piltangenterna.',
      'Täck byggnaden för dig själv och låt klassen beskriva enbart utifrån de två konturerna hur högt det är framtill och på sidan.',
      'Tryck på ”Kvarts varv” och låt dem gissa först: vilken kontur hamnar var? För några byggnader ändras ingenting – fråga varför.',
      'Tryck på ”En till som ser likadan ut” först sedan klassen själv har föreslagit en annan byggnad. Är knappen grå är den här byggnaden entydig.',
      'Med ”En annan byggritning” hämtar du nästa byggnad. Fem är fria att använda; elva till och bladet med tomma byggritningar ingår i Lärarpaketet.'
    ],
    classroomIdeas: [
      'Ritningen först, bygget sedan: klassen läser ritningen högt och beskriver byggnaden innan någon tittar. Visa den efteråt.',
      'Byggdiktamen: du säger nio siffror, barnen bygger efter med materialet från bygghörnan, och först därefter visar verktyget om det stämmer.',
      'Bara konturerna: visa enbart framifrån och från sidan. Alla bygger något som passar – och klassen upptäcker att flera svar är riktiga.',
      'Vadet: före kvartsvarvet röstar klassen om bilden ändras eller inte. För de byggnader som ser likadana ut åt båda hållen vinner minoriteten.',
      'Entydig eller inte: klassen gissar först om den här byggnaden är den enda till sina två konturer. Först därefter trycker ni på knappen som avslöjar svaret.',
      'På papper: skriv ut de tomma byggritningarna ur Lärarpaketet – ett barn bygger bakom en pärm, ett annat ritar ritningen efter muntlig beskrivning.'
    ],
    metaTitle: 'Byggritningen – bygga efter ritning, åk 1–3',
    metaDescription: 'Nio siffror på byggritningen, bredvid står byggnaden – framifrån och från sidan. Bygga efter ritning för lågstadiet, gratis på tavlan.'
  },

  da: {
    slug: 'byg-efter-byggeplan-rumlige-figurer',
    name: 'Byggeplanen',
    tagline: 'Ni felter med hvert sit tal, og ved siden af rejser modellen sig — og en anden model, bygget helt anderledes, kan komme til at se præcis ens ud, når man ser dem forfra og fra siden.',
    about: [
      'Ni felter i tre rækker ligger på tavlen. I hvert felt står ét tal fra 0 til 4, og tallet siger, hvor højt der skal bygges på det felt. Ved siden af står modellen selv, tegnet på skrå, så både højden og begge retninger kan ses på én gang. Tryk på et felt, og modellen vokser præcis dér; tag fat i modellen i stedet, og tallet i feltet følger med. Det er ikke to opgaver, der skal passe sammen — det er én ting, skrevet to gange. Der bliver ikke spurgt om noget, der er ikke noget svar at aflevere, og der er ingen tid, der løber.',
      'At bygge efter byggeplan er en gammel rutine i indskolingen, og den plejer at gå én vej: læreren lægger et kort frem, barnet bygger efter det, og bagefter ser læreren, om det passer. Her går det begge veje på én gang. Det barn, der endnu ikke kan læse en byggeplan, kan bygge modellen først og derefter se, hvilke tal der kom til at stå i felterne. Det er den samme viden, taget ind fra den anden ende. Sådan knytter værktøjet an til Fælles Mål og arbejdet med rumlige figurer i indskolingen, hvor eleverne skal kunne bygge efter en tegning og tegne det, de har bygget.',
      'Nederst ligger modellen fladt to gange, og hvor de to billeder ligger, er hele forklaringen: billedet under byggeplanen er modellen set forfra, og billedet under modellen er den set fra siden. Der står ikke et ord ved nogen af dem — det er placeringen, der siger det. Og her kommer det, som kortene i papkassen aldrig kan vise: de to billeder er som regel ikke nok. Der findes 1.953.125 forskellige modeller på de ni felter, og for 99,96 procent af dem findes der mindst én anden model, der giver præcis de samme to billeder. Kun 709 er entydigt fastlagt af begge. En knap henter en af de andre frem, og på netop de 709 kan der ikke trykkes på den.',
      'Der bliver ikke rettet noget her. Ingen point, ingen tid, der løber, og ingen markering af rigtigt og forkert: når to modeller ser ens ud fra begge sider, er det modellerne selv, der siger det, og ikke en bedømmelse. Fem byggeplaner og hele apparatet er gratis, og de fem er valgt, så alt det, der står her, kan prøves uden at betale: en, hvor den kvarte omgang ikke laver om på noget, en, hvor de to billeder er tydeligt uenige, og en, hvor knappen med den anden model er slukket, fordi der ikke findes nogen. De elleve andre og arket til at printe følger med Lærerabonnementet — tomme byggeplaner med felterne streget op og ingen tal i, som børnene selv fylder ud i hånden.'
    ],
    howToUse: [
      'Vis byggeplanen, og sig ingenting. Lad klassen læse de ni tal og sige, hvad der bliver bygget, før du rører ved noget.',
      'Tryk så et felt op — der er ikke noget at skrive i; man trykker, trækker eller bruger piletasterne — og den del af modellen bliver højere med det samme.',
      'Byt ende: lad et barn tage fat i selve modellen, og bed resten af klassen pege på det tal i byggeplanen, der ændrer sig af sig selv.',
      'Peg på de to flade billeder, og lad klassen finde ud af, hvilket af dem der er modellen set forfra. Der står ikke noget ved dem: det er placeringen, der afgør det.',
      'Drej en kvart omgang uden at ændre et eneste tal, og spørg, hvad der er blevet anderledes — og hvad der ikke er.',
      'Til sidst knappen »Samme billeder, anden model«: lad klassen gætte en anden model med præcis de samme to billeder, før du trykker. Det er hele pointen; alt det andet er optakt.'
    ],
    classroomIdeas: [
      'Byg efter planen: sæt byggeplanen på tavlen og læg centicubes på bordene. Børnene bygger efter tavlen og holder deres eget op ved siden af modellen bagefter — også de gange, hvor to borde har bygget det samme forskelligt.',
      'Den anden vej: byg modellen først uden at røre tallene, og lad børnene skrive byggeplanen af i hæftet bagefter.',
      'Læg et stykke papir hen over byggeplanen, så kun modellen og de to billeder står tilbage, og lad par foreslå, hvilke ni tal der gemmer sig under papiret.',
      'Sæt de fire hjørnefelter til det samme tal og de fire felter midt på siderne til det samme tal, og drej så en kvart omgang. Der sker ingenting. Spørg hvorfor — der findes præcis 125 byggeplaner, der ser ens ud hele vejen rundt.',
      'Sæt ét felt midt i modellen til 0, og spørg, hvad et nul betyder her. Det er ikke ingenting — det er et sted, hvor der ikke bliver bygget, og man kan kigge tværs igennem.',
      'Gør det bagefter på papir: print de tomme byggeplaner, lad hvert barn skrive ni tal i felterne i hånden og bytte med sidemakkeren, som bygger det med centicubes uden at have set modellen.'
    ],
    metaTitle: 'Byggeplanen – byg efter byggeplan, rumlige figurer, 1.–3. kl.',
    metaDescription: 'Ni felter, et tal i hvert: tallet siger, hvor højt der bygges. Modellen står ved siden af — og to modeller kan se ens ud forfra og fra siden. Gratis til tavlen.'
  },

  no: {
    slug: 'bygge-etter-byggetegning-geometri-smatrinnet',
    name: 'Byggetegningen',
    tagline: 'Ni ruter, ett tall i hver – og byggverket reiser seg ved siden av.',
    about: [
      'Byggetegningen er en byggetegning med ni ruter. I hver rute står det ett tall, fra 0 til 4, og tallet forteller hvor høyt det skal bygges akkurat der. Ved siden av tegningen står byggverket som tallene lager, tegnet skrått slik at klassen ser det i tre dimensjoner. Endrer du tallet, endrer byggverket seg med det samme. Drar du i byggverket, endrer tallet seg. Det er én og samme ting, vist på to måter, og barna kan gå inn fra begge kanter.',
      'Under byggverket står det to ganger til: én gang sett forfra og én gang sett fra siden. Det er her det blir interessant. To flate omriss ser ut som om de skulle bestemme byggverket helt – og det gjør de nesten aldri. Trykker du på «Et annet som ser likt ut», får du et helt annet byggverk med nøyaktig de samme to omrissene. På de få byggverkene der de to retningene faktisk bestemmer alt, går knappen grå av seg selv, og da er det det du snakker om i stedet.',
      'Å bygge etter byggetegning er en gammel og god rutine på småtrinnet, og den pleier å stoppe der klossene stopper. Her stopper den ikke: klassen kan snu byggverket en kvart omdreining og se forsiden bli til siden, og de kan se at et tall og et byggverk og to omriss er fire måter å si det samme på. I LK20 er «representasjon og kommunikasjon» et av kjerneelementene i matematikk, og det er nettopp dette det handler om – å veksle mellom uttrykksmåter og oppdage at de henger sammen.',
      'Det står ingen ord på selve tegningen. Bare tall fra 0 til 4 og byggverket. Det er ingen fasit, ingen poeng, ingen tid som løper og ingen som får rett eller galt. Verktøyet spør heller aldri hvor mange det er til sammen – det er en annen samtale, for et annet trinn. På nøyaktig 125 byggverk skjer det ingenting når du vrir, og verktøyet sier fra om det i stedet for å påstå noe annet. Her er det formen og retningene som er saken, og samtalen er din.'
    ],
    howToUse: [
      'Vis Byggetegningen på storskjerm. Start med den flate tegningen der alle tallene er like, og la klassen se at byggverket ved siden av er like flatt hele veien.',
      'Trykk ett tall opp. La klassen si hva som kommer til å skje med byggverket før du trykker – og se etterpå om de fikk rett.',
      'Snu det: dra i selve byggverket i stedet, og la klassen se tallet i ruta endre seg av seg selv. Spør hvilken vei de synes er lettest å tenke.',
      'Se på de to omrissene: det under byggetegningen er sett forfra, det under byggverket er sett fra siden. La to barn beskrive hver sin retning før dere sammenligner.',
      'Trykk «Kvart omdreining» og la klassen finne ut hva som skjedde. På noen byggverk skjer det ingenting synlig – og det er verdt en samtale i seg selv.',
      'Trykk «Et annet som ser likt ut» til slutt. La klassen tenke seg et annet byggverk med samme forside og samme side før du viser det. Er knappen grå, er det fordi det ikke finnes noe annet.'
    ],
    classroomIdeas: [
      'Byggetegning på storskjerm, klosser på pulten: vis en tegning, la parene bygge den i klosser først, og sammenlign med byggverket på skjermen etterpå.',
      'Gjett byggverket: dekk til byggverket og vis bare de ni tallene. Klassen tegner eller bygger det de tror kommer, og så avdekker du.',
      'Bare to omriss: vis klassen forsiden og siden uten byggverket, og la parene bygge et byggverk som passer. Sammenlign hvor mange forskjellige løsninger klassen fant – som regel er det flere.',
      'Kvart omdreining som gjettelek: la klassen tegne hva de tror forsiden blir etter at du har vridd, før du trykker.',
      'Skriv ut tomme byggetegninger og la barna lage sine egne. De bytter ark med sidemannen, som bygger etter tegningen uten å få se originalen.',
      'Null er også et tall: bygg noe med flere nuller i og la klassen se at en tom rute er en beskjed, ikke en glemt rute.'
    ],
    metaTitle: 'Byggetegningen – bygge etter byggetegning på småtrinnet',
    metaDescription: 'Gratis digitalt verktøy til 1.–2. trinn: ni ruter med tall blir til et byggverk du kan vri på, og to flate omriss som nesten aldri bestemmer byggverket alene.'
  },

  fi: {
    slug: 'rakentaminen-ohjeen-mukaan-alkuopetus',
    name: 'Talo lukuina',
    tagline: 'Yhdeksän ruutua ja luku jokaisessa: niin korkea talo on siinä kohdassa. Vieressä sama talo pystyssä, alla se edestä ja sivulta — eivätkä ne kaksi kuvaa useimmiten riitä kertomaan, mikä talo se on.',
    about: [
      'Yhdeksän ruutua, kolme kolmessa rivissä, ja jokaisessa ruudussa yksi luku: niin korkea talo on siinä kohdassa. Vieressä sama talo seisoo pystyssä. Napauta ruutua, vedä sitä tai käytä nuolinäppäimiä, niin luku kasvaa tai pienenee ja talo nousee tai laskee samassa kohdassa; mitään ei tarvitse kirjoittaa. Ruudukko ja talo ovat sama asia kahdesta päästä, ja kumpaa tahansa muuttaa, toinen muuttuu mukana. Enempää taululla ei ole: ei kysymystä, ei täytettävää ruutua, ei juoksevaa aikaa.',
      'Rakentaminen ohjeen mukaan on alkuopetuksen vanha rutiini: lapsi saa kortin ja tekee sen mukaan, ja rakentelukortteja on joka luokan kaapissa. Kortti kulkee kuitenkin vain yhteen suuntaan. Täällä pääsee myös toisin päin — muuttaa taloa ja katsoa, mitkä luvut siitä seuraavat — ja juuri se suunta on se, jota korteilla ei voi harjoitella. Yksi painike kääntää koko laitteen neljänneskierroksen: talo on sama talo, mutta se, mikä oli edessä, on nyt sivulla.',
      'Ja sitten se, mitä kortit eivät näytä. Talon alla näkyy kaksi litteää kuvaa, edestä ja sivulta, eivätkä ne useimmiten riitä: samat kaksi kuvaa sopivat moneen eri taloon. Erilaisia taloja on 1 953 125, ja niistä 99,96 % jakaa oman edestä–sivulta-parinsa jonkin toisen talon kanssa; kuvapareista 87 % kelpaa useammalle kuin yhdelle talolle. Yksi painike näyttää sen toisen talon. Niillä 709 talolla, jotka kaksi kuvaa todella ratkaisevat, painike on harmaana — se ei ole vika, vaan asian toinen puoli.',
      'Taulu ei kysy koko talosta mitään lukumäärää eikä anna kappaleille nimiä, eikä se ratkaise, onko jokin oikein — keskustelua johtaa opettaja, ei näyttö. Tarkalleen 125 talolla kääntäminen ei muuta mitään, ja silloin taulu sanoo senkin. Tästä rutiinista ei ole vaikuttavuustutkimusta emmekä sellaista väitä. Perusopetuksen opetussuunnitelman perusteet 2014 asettaa ensimmäiselle ja toiselle luokalle tavoitteeksi kappaleiden ja kuvioiden havainnoinnin sekä avaruudellisen hahmottamisen, ja tämä on sitä työtä. Viisi taloa on ilmaisia; loput yksitoista ja tulostus kuuluvat Opettaja-tilaukseen.'
    ],
    howToUse: [
      'Nosta ensimmäinen ruudukko esiin ja anna luokan katsoa sitä hetki, ennen kuin sanot mitään.',
      'Napauta yhtä ruutua, jolloin luku kasvaa yhdellä ja talo nousee samassa kohdassa.',
      'Vedä sitten taloa itseään ja anna luokan huomata, että luku ruudukossa muuttuu mukana. Tämä kannattaa tehdä hitaasti.',
      'Käännä neljänneskierros ja kysy, mikä muuttui: talo on sama, mutta edestä tuli sivu.',
      'Näytä alhaalla olevat kaksi litteää kuvaa ja anna luokan kuvitella toinen talo, joka näyttää samalta, ennen kuin painat painiketta. Tätä varten koko väline on olemassa.',
      'Etsi lopuksi talo, jolla se painike on harmaana, ja kysy luokalta, miksi juuri siitä ei ole toista.'
    ],
    classroomIdeas: [
      'Arvatkaa ensin: jokainen sanoo ääneen, miltä talo näyttää edestä, ennen kuin kukaan katsoo kuvaa sen alla.',
      'Antakaa tavoite: säätäkää ruudukko niin, että talo näyttää edestä ja sivulta täsmälleen samalta.',
      'Kääntäkää neljänneskierros yhä uudelleen ja laskekaa, monennellako kerralla talo on taas alkuperäinen; joukossa on taloja, jotka eivät muutu lainkaan.',
      'Jakautukaa kahtia: toinen puoli katsoo vain kuvaa edestä, toinen vain sivulta, ja sopikaa yhdessä, mikä talo se on.',
      'Etsikää talo, jolla painike on harmaana, ja antakaa luokan selittää, miksi toista samannäköistä ei ole.',
      'Tehkää sama paperilla: tulostakaa tyhjät ruudukot, sanelkaa yhdeksän lukua ja rakentakaa talot pulpetilla sillä, mitä luokassa on — verratkaa sitten pareittain, tuliko kaikille sama.'
    ],
    metaTitle: 'Talo lukuina – rakentaminen ohjeen mukaan, alkuopetus',
    metaDescription: 'Yhdeksän ruutua ja luku jokaisessa, ja talo nousee viereen. Käännä neljänneskierros ja katso, miltä se näyttää edestä ja sivulta. Ilmainen alkuopetukseen.'
  },

  fr: {
    slug: 'construire-en-suivant-un-plan-vue-de-face-cycle-2',
    name: 'Neuf nombres, une maquette',
    tagline: "Un plan de neuf cases, un nombre dans chacune : c'est la hauteur de la maquette à cet endroit. À côté, la maquette elle-même — et si l'on change l'une, l'autre change aussitôt.",
    about: [
      "Le plan est un carré de neuf cases, et chaque case porte un nombre de 0 à 4 : c'est la hauteur de la maquette à cet endroit. À côté du plan, la maquette est dessinée en volume. Touchez une case du plan, ou faites-la glisser vers le haut ou vers le bas, et la maquette monte ou descend au même endroit. Mais on peut aussi bien agir sur la maquette elle-même : le nombre du plan change alors tout seul. Ce ne sont pas deux objets, c'est le même objet écrit de deux façons, et on peut le prendre par les deux bouts.",
      "En dessous, la maquette est reprise deux fois à plat : vue de face à gauche, vue de profil à droite. Un quart de tour fait pivoter l'ensemble, et l'on voit alors ce qui était devant passer sur le côté. C'est là que se joue l'essentiel : deux maquettes différentes peuvent se présenter exactement pareil de face et de profil. L'appareil sait le prouver — il propose lui-même une autre maquette qui donne les deux mêmes silhouettes. Et quand il n'en existe aucune, le bouton s'éteint : cette maquette-là est bel et bien la seule.",
      "L'appareil ne demande jamais combien il y a d'éléments en tout : ce n'est pas son sujet, et la question appartient au cycle 3. Il ne nomme aucun solide, ne fait aucun calcul, ne recueille aucune réponse et ne corrige rien. Il n'y a ni bonne ni mauvaise réponse, ni points, ni chronomètre, ni minuteur. Ce qui est dit reste dans la classe : la question posée, le moment où l'on fait pivoter, ce que l'on garde caché — tout cela appartient à l'enseignant.",
      "Dans les programmes officiels, cela relève de l'espace et de la géométrie : construire des maquettes simples en suivant un plan dès la grande section, puis, au cycle 2, passer d'un objet en volume à sa représentation à plat et revenir. C'est aussi un point d'appui pour le vocabulaire de position — plus haut, plus bas, devant, derrière. L'appareil s'ouvre sans préparation, au tableau devant toute la classe, et un plan se commente en quelques minutes."
    ],
    howToUse: [
      "Projetez l'appareil et faites d'abord lire les neuf nombres du plan à voix haute, avant de toucher quoi que ce soit.",
      "Touchez une seule case du plan et laissez la classe dire ce qui vient de changer sur la maquette, à côté.",
      "Faites l'inverse : agissez sur la maquette elle-même et montrez que le nombre du plan a bougé tout seul.",
      "Montrez les deux silhouettes du bas et demandez laquelle est vue de face et laquelle est vue de profil, avant de le dire vous-même.",
      "Faites faire un quart de tour et demandez ce qui a changé, et surtout ce qui n'a pas changé : la maquette, elle, est la même.",
      "Demandez enfin si une autre maquette pourrait donner ces deux mêmes silhouettes, laissez la classe en imaginer une, puis affichez celle que l'appareil propose."
    ],
    classroomIdeas: [
      "Cachez la maquette avec la main : à partir des neuf nombres du plan seulement, la classe dit laquelle des deux silhouettes du bas sera la plus haute.",
      "Prévoir avant de tourner : chacun dessine sur l'ardoise ce que l'on verra de face après le quart de tour, puis on tourne et on compare.",
      "Donnez une cible : un élève règle le plan pour que la vue de face et la vue de profil soient identiques, et la classe dit s'il y arrive.",
      "Aplatissez tout à la même hauteur, puis faites faire un quart de tour : rien ne bouge. Demandez pourquoi, et cherchez d'autres plans qui font la même chose.",
      "Cherchez la maquette unique : affichez celle où le bouton s'éteint et demandez ce que ces deux silhouettes ont de si particulier.",
      "Refaites-le sur la table : imprimez la fiche de six plans vides, remplissez-en un à la main, échangez-le avec un camarade et construisez sa maquette avec le matériel de la classe."
    ],
    metaTitle: "Neuf nombres, une maquette — construire d'après un plan, CP et CE1",
    metaDescription: "Un plan de neuf cases, un nombre par case : la hauteur à cet endroit. La maquette suit, et un quart de tour change le point de vue. Outil gratuit au TBI, du GS au CE1."
  },

  es: {
    slug: 'construcciones-con-cubos-geometria-espacial-primaria',
    name: 'Nueve casillas, un edificio',
    tagline: 'Nueve casillas con un número cada una dicen lo alto que sube cada parte de un edificio. Cambia la cuadrícula y el edificio la sigue; toca el edificio y cambia la cuadrícula. Y dos edificios distintos pueden verse exactamente igual desde delante y desde un lado.',
    about: [
      'Una cuadrícula de nueve casillas, cada una con un número del 0 al 4: ese número dice lo alto que sube esa parte del edificio. Al lado, el edificio ya levantado. Se puede entrar por cualquiera de los dos extremos. Si tocas una casilla, esa parte del edificio sube; si tocas el edificio, el número de la casilla cambia solo. No son un dibujo y su explicación: son el mismo objeto escrito de dos maneras, y por eso da igual por dónde se empiece.',
      'Conviene decirlo con claridad: construir siguiendo un plano escrito es una rutina semanal en las aulas alemanas y nórdicas, y en España no lo es. Lo que sí hay, y mucho, es el rincón de construcciones de Infantil con bloques y cubos de encajar, situarse y situar objetos en una cuadrícula, leer e interpretar un código sencillo, y el arranque de la geometría espacial en primer ciclo. Esta herramienta no trae una rutina de fuera: le pone números a algo que los niños ya hacen con las manos.',
      'Debajo aparece ese mismo edificio visto desde delante y visto desde un lado, como dos sombras planas. Y aquí llega lo bueno. Otro edificio completamente distinto puede dar esas dos mismas sombras: de todos los edificios que caben en estas nueve casillas, casi ninguno queda determinado por sus dos vistas. Hay un botón que enseña uno de esos otros edificios, y se apaga solo en los pocos casos en que de verdad no existe ninguno. Mirar desde dos sitios no siempre basta para saber cómo es algo: esa es la conversación que abre.',
      'Un cuarto de giro pone de lado lo que estaba de frente, y el edificio sigue siendo el mismo aunque se vea distinto; en unos pocos ni siquiera se nota el giro, y eso también da que hablar. La herramienta no pregunta nada, no recoge respuestas, no corrige, no puntúa y no lleva tiempo; tampoco pregunta nunca cuántos hay en total, porque eso ya es volumen y toca mucho más adelante. Se abre en el navegador, sin registro y sin instalar nada. Encaja con lo que los planes de estudio piden en primer ciclo sobre geometría espacial y sobre representar con dibujos lo que se ve en el espacio. Cinco edificios y todo el aparato son gratis; los otros once y la hoja de seis cuadrículas vacías van con el plan Docente.'
    ],
    howToUse: [
      'Proyecta la cuadrícula y ve tocando casillas para poner un número en cada una; deja que el edificio se levante a la vista de todos.',
      'Pide a un niño que suba una sola casilla y que el resto diga, antes de mirar el edificio, qué parte va a crecer.',
      'Ahora al revés: toca directamente el edificio y que la clase busque qué número ha cambiado en la cuadrícula.',
      'Enseña las dos vistas de abajo y pregunta cuál es la de delante y cuál la del lado, sin decirlo tú.',
      'Antes de pulsar «Otro que se ve igual», pide que se imaginen un edificio distinto con esas mismas dos vistas. Para esto existe la herramienta.',
      'Dale un cuarto de giro y pregunta si ha cambiado el edificio o solo ha cambiado desde dónde lo miramos.'
    ],
    classroomIdeas: [
      'Estimar primero: tapa el edificio con la mano, enseña solo la cuadrícula y que cada mesa dibuje cómo creen que va a ser.',
      'Al dictado: tú dices los nueve números en voz alta, ellos los colocan, y luego se destapa el edificio y se comprueba.',
      'Pon todas las casillas a la misma altura y dale un cuarto de giro: no pasa nada. Pregunta por qué este no cambia.',
      'Buscad entre todos un edificio en el que el botón «Otro que se ve igual» se apague, y preguntad qué tiene de especial.',
      'Dos niños de espaldas: uno ve solo la vista de delante y el otro solo la del lado, y entre los dos tienen que reconstruirlo.',
      'Hazlo después en el rincón: imprime la hoja de seis cuadrículas vacías, uno escribe los nueve números a mano y otro lo construye con los cubos de encajar sin ver la cuadrícula.'
    ],
    metaTitle: 'Nueve casillas, un edificio — geometría espacial y construcciones, 1.º y 2.º',
    metaDescription: 'Nueve números dicen lo alto que sube cada parte de un edificio; cambia la cuadrícula y el edificio la sigue. Herramienta gratuita para la pizarra digital.'
  },

  pt: {
    slug: 'mapa-de-alturas-ver-de-frente-e-de-lado-anos-iniciais',
    name: 'O Mapa das Alturas',
    tagline: 'Um mapa de nove quadradinhos, cada um com um número que diz a altura ali. Ao lado, o prédio sobe sozinho — e embaixo aparece como ele fica visto de frente e visto de lado.',
    about: [
      'São nove quadradinhos, em três linhas de três. Dentro de cada um vai um número de 0 a 4, e esse número diz uma coisa só: que altura tem o prédio naquele pedaço. Ao lado, o prédio aparece montado. As duas coisas são a mesma coisa escrita de dois jeitos, e dá para mexer pelos dois lados: mude o número e o pedaço sobe, ou puxe o pedaço para cima e o número muda junto. Nada fica esperando confirmação.',
      'Vale dizer com honestidade que construir a partir de um papel com números não é uma rotina da escola brasileira, como é em alguns países do norte da Europa. O que é nosso, e acontece toda semana, é outra coisa: a criança da Educação Infantil que empilha blocos e cubinhos e depois conta o que fez; a maquete que a turma monta no fim do projeto; e a pergunta que a gente faz o tempo todo sem material nenhum para apoiar — "e se você olhasse isso de frente? e de lado?". É nesse ponto que esta ferramenta entra. É a mesma ideia da maquete de blocos, sem cola nem tesoura, e com o papel dos números do lado para comparar.',
      'Embaixo do mapa ficam as duas silhuetas: o prédio visto de frente, à esquerda, e visto de lado, à direita. Elas não são desenhos separados — são sombras do que está montado ali em cima, e mudam na hora em que qualquer número muda. Um botão gira tudo um quarto de volta: o prédio continua exatamente o mesmo, mas o que era a frente passa a ser o lado. Nem sempre a imagem muda, e isso também é conteúdo: alguns prédios ficam iguais depois de girar.',
      'A parte mais forte vem depois. Outro botão mostra um prédio diferente que fica igualzinho a este visto de frente e visto de lado — porque as duas silhuetas quase nunca dão conta de definir um prédio sozinhas. Quando o prédio é daqueles poucos em que as duas direções realmente resolvem, o botão fica apagado, e isso é uma informação verdadeira, não um erro. A ferramenta não pergunta nada, não corrige, não pontua e não tem cronômetro. Ela conversa com o que a BNCC pede em Geometria nos anos iniciais, sobre representar e descrever objetos no espaço, e nunca pede o total de peças, que é assunto de outra etapa.'
    ],
    howToUse: [
      'Projete na lousa e toque em um quadradinho do mapa: o número sobe e aquele pedaço do prédio sobe junto. Arraste para cima e para baixo se quiser passar direto para outra altura.',
      'Faça o caminho contrário na frente da turma: puxe um pedaço do prédio para cima e deixe que percebam sozinhos que o número no mapa mudou. É o mesmo objeto, escrito de dois jeitos.',
      'Aponte as duas silhuetas de baixo antes de mexer em qualquer coisa. Pergunte qual é a de frente e qual é a de lado, e deixe a turma descobrir pela posição de cada uma.',
      'Antes de tocar em Girar um quarto, peça um palpite: o que vai acontecer com as duas silhuetas? Depois gire e confira. Em alguns prédios não muda nada — pergunte por que.',
      'Chegue no ponto principal: pergunte se dá para existir outro prédio diferente que fique igual a este visto de frente e visto de lado. Recolha os palpites e só então toque em Outro que parece igual.',
      'Quando esse botão estiver apagado, aproveite: aquele prédio é o único possível com aquelas duas silhuetas. Pergunte à turma o que ele tem de diferente dos outros.'
    ],
    classroomIdeas: [
      'Ditado de mapa: você fala os nove números em voz alta, uma criança preenche na lousa e o resto da turma confere olhando o prédio que aparece.',
      'Tape o mapa com a mão e deixe só o prédio à vista. A turma diz os nove números; depois destape e confiram juntos.',
      'Só as sombras: mostre apenas as duas silhuetas de baixo e peça que a turma monte um prédio que sirva. Compare as respostas diferentes — quase sempre há mais de uma.',
      'Palpite antes de girar: cada criança desenha no caderno como ela acha que vai ficar visto de frente depois do quarto de volta.',
      'Caça ao prédio único: mexam nos números até o botão Outro que parece igual apagar. O que esses prédios têm em comum?',
      'Depois no concreto: imprima a folha com seis mapas vazios, cada criança preenche o seu com números e a dupla monta com os cubinhos ou blocos da sala, sem ver o do colega.'
    ],
    metaTitle: 'O Mapa das Alturas — de frente e de lado, anos iniciais',
    metaDescription: 'Nove quadradinhos com números de altura levantam um prédio, e embaixo ele aparece visto de frente e visto de lado. Ferramenta gratuita de geometria para a lousa digital, anos iniciais.'
  },

  it: {
    slug: 'vista-dall-alto-e-altezze-primaria',
    name: 'La mappa del palazzo',
    tagline: "Nove numeri visti dall'alto dicono quanto è alto il palazzo in ogni posto. Cambi un numero e il palazzo cambia; alzi il palazzo e cambia il numero. Sotto, lo stesso palazzo visto di fronte e visto di lato.",
    about: [
      "Sullo schermo ci sono due cose che sono la stessa cosa. A sinistra una mappa di nove numeri, come se il palazzo lo guardassi dall'alto: ogni numero dice quanto è alto il palazzo proprio lì, da zero a quattro. A destra il palazzo, in piedi. Tocchi un numero della mappa e il palazzo sale; tocchi il palazzo e cambia il numero. Non è che uno comanda e l'altro obbedisce: sono lo stesso palazzo scritto in due modi, e si lavora da tutte e due le parti. Sotto, senza una parola, lo stesso palazzo visto di fronte e visto di lato.",
      "Diciamo subito una cosa onesta: costruire seguendo un progetto scritto non è un'abitudine della scuola italiana. Nei paesi di lingua tedesca e nel Nord Europa è un'attività settimanale con le sue scatole di schede; da noi, all'angolo delle costruzioni, i bambini costruiscono quello che vogliono, e va benissimo così. Quello che invece in Italia si fa davvero, in prima e in seconda, è guardare le cose dall'alto: la pianta dell'aula, il banco visto da sopra, il passaggio dalla realtà al disegno che la rappresenta. Le Indicazioni nazionali lo chiedono in geografia, quando domandano di rappresentare dall'alto gli oggetti e gli spazi conosciuti. Questo strumento parte esattamente da lì e aggiunge la sola cosa che al disegno dall'alto è sempre mancata: l'altezza, scritta come numero.",
      "Poi arriva la parte che sorprende, ed è il motivo per cui lo strumento esiste. Guarda il palazzo di fronte e guardalo di lato: due sagome, due file di altezze. Sembrano dire tutto. Non dicono tutto. Quasi sempre esiste un altro palazzo, diverso da questo, che di fronte e di lato si vede identico — e un comando lo tira fuori davanti alla classe. Ogni tanto, però, quel comando si spegne da solo: per certi palazzi le due direzioni bastano davvero, e non ce n'è un secondo. Non lo diciamo noi ai bambini: lo dice il comando quando smette di funzionare. C'è anche il quarto di giro, che gira tutto il palazzo e sposta di fronte quello che era di lato. Su qualche palazzo il giro non cambia niente di visibile, ed è previsto: anche quello è qualcosa da capire, non un guasto.",
      "Funziona nel browser, sulla LIM come sul tablet, senza registrazione e senza installare niente. Non nomina nessun solido, non chiede mai quanti cubetti ci siano in tutto e non conta superfici: quelle sono altre lezioni, di altre classi. Non c'è nessuna domanda, nessuna risposta giusta, nessun punteggio e nessun tempo che scorre; lo strumento mostra e basta, il parlato lo metti tu. Cinque palazzi e tutto l'apparecchio sono gratuiti, e fra quei cinque ci sono già tutti i casi che servono per il discorso. Con il piano Insegnante si aprono gli altri undici e il foglio da stampare: sei mappe vuote, già tracciate e senza numeri, da riempire a mano. Il lavoro sulla posizione e sui punti di vista richiama i traguardi di «Spazio e figure» delle Indicazioni nazionali."
    ],
    howToUse: [
      "Proietta lo strumento e tocca due o tre numeri della mappa, lasciando che la classe veda il palazzo salire proprio in quel posto. Può farlo anche un bambino alla lavagna.",
      "Adesso fai il contrario: tocca direttamente il palazzo e fai notare che è il numero sulla mappa a cambiare. È lo stesso palazzo, scritto in due modi.",
      "Copri con la mano il palazzo e lascia scoperta solo la mappa. Chiedi alla classe di dire, prima di scoprire, dov'è il punto più alto. Poi togli la mano.",
      "Guarda insieme le due sagome in basso e chiedi da che parte si sta guardando ogni volta: una è il palazzo di fronte, l'altra è il palazzo di lato.",
      "Prima di toccare «Un altro che si vede uguale», chiedi alla classe di immaginare un palazzo diverso che di fronte e di lato si veda proprio così. Accogli anche le proposte sbagliate: servono. Poi tocca il comando.",
      "Tocca «Gira di un quarto» mentre i bambini guardano e lascia qualche secondo di silenzio. Il palazzo non è cambiato: è cambiato da dove lo stai guardando."
    ],
    classroomIdeas: [
      "Prima la stima: mostra solo il palazzo, coprendo la mappa, e i bambini scrivono i nove numeri sul quaderno. Poi scopri la mappa e si controlla insieme, un posto alla volta.",
      "Il gioco del palazzo nascosto: un bambino compone una mappa senza far vedere lo schermo, la detta a voce ai compagni («riga in mezzo, posto uno: tre») e alla fine si confronta.",
      "Metti tutti i numeri uguali e chiedi che cosa succede al quarto di giro. Poi cambia un solo numero e rifallo: adesso il giro si vede.",
      "Cerca insieme un palazzo su cui il comando «Un altro che si vede uguale» si spegne, e chiedi alla classe perché stavolta non ce n'è un secondo.",
      "Due bambini alla lavagna: il primo sceglie un palazzo, il secondo deve trovarne uno diverso che di fronte e di lato si veda uguale. Poi si scambiano i ruoli.",
      "Rifallo con i cubetti veri sul banco: stampa il foglio di sei mappe vuote, un bambino costruisce dietro un libro, un altro riempie i nove numeri visti dall'alto, e poi si toglie il libro."
    ],
    metaTitle: "La mappa del palazzo — dall'alto e di fronte, prima e seconda",
    metaDescription: "Nove numeri visti dall'alto dicono quanto è alto il palazzo in ogni posto: cambi il numero e il palazzo cambia. Sotto, di fronte e di lato. Strumento gratuito per la LIM, prima e seconda."
  }
};
