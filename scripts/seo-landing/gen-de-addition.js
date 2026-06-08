#!/usr/bin/env node
/* DE addition landing generator — STEP 1 of the de fan-out (the lead slice).
 * Mirrors gen-wave1.js (image-image) + gen-wave1b.js (image-number/mixed): same coprime
 * cellAssign, same per-mode P1/P2 rotation, same validity-gate drop. Writes de.json.
 *
 * German specifics (STEP-0 + T1 native authoring):
 *  - All addition → 1. Klasse (Zahlenraum bis 20); coordinate.level='1-klasse'.
 *  - GENDER-SAFE frames: the theme noun is slotted ONLY as a plural ({N_PL} after "die" /
 *    apposition / bare nom-acc) or a plural collective ({GEN}); never singular, never with a
 *    per-noun article/adjective. `mit` is the only dative trigger → datN() applies +n there
 *    (and in the H1). `gen` is ALWAYS a plural noun so "die {GEN}" + datN both work.
 *  - mixed find-the-part framed "den fehlenden Teil / die Zerlegung finden", NEVER "missing addend".
 *  - 8 themes (colors/emotions/body_parts/weather/spring/summer/winter/activities) auto-drop via
 *    validateCoordinate (countability — EN body_parts-catch at the de boundary). 4th_of_july dropped at enum.
 *
 * Usage: node scripts/seo-landing/gen-de-addition.js  [--only=image-image|image-number|mixed]
 */
'use strict';
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const DE = 'frontend/content/seo-landing/de.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/de-addition-coordinates.json', 'utf8')).coordinates;

// theme axis-key -> { nPl: stored-plural phrase, gen: PLURAL collective, h1: de display name }.
// nPl verified against image-vocabulary.js (de stored plurals); h1 verbatim from topics-taxonomy.json name.de.
// gen is always a PLURAL noun (so "die {GEN}" + datN are valid).
const THEMES = {
  accessories:             {nPl:'Hüte, Gürtel und Schals',                  gen:'Accessoires',          h1:'Accessoires'},
  animals:                 {nPl:'Kühe, Schafe und Hühner',                  gen:'Tiere',                h1:'Tiere'},
  around_the_house:        {nPl:'Lampen, Stühle und Uhren',                 gen:'Haushaltsdinge',       h1:'Rund ums Haus'},
  at_the_supermarket:      {nPl:'Einkaufswagen, Körbe und Regale',          gen:'Supermarktdinge',      h1:'Im Supermarkt'},
  bakery:                  {nPl:'Bagels, Brötchen und Kuchen',              gen:'Backwaren',            h1:'Bäckerei'},
  beach:                   {nPl:'Eimer, Schaufeln und Seesterne',           gen:'Strandsachen',         h1:'Strand'},
  birds:                   {nPl:'Rotkehlchen, Eulen und Enten',             gen:'Vögel',                h1:'Vögel'},
  birds_2:                 {nPl:'Papageien, Schwäne und Krähen',            gen:'Vögel',                h1:'Vögel 2'},
  breakfast:               {nPl:'Eier, Pfannkuchen und Bananen',            gen:'Frühstückssachen',     h1:'Frühstück'},
  camping:                 {nPl:'Zelte, Taschenlampen und Rucksäcke',       gen:'Campingsachen',        h1:'Camping'},
  christmas:               {nPl:'Bäume, Christbaumkugeln und Weihnachtsstrümpfe', gen:'Weihnachtssachen', h1:'Weihnachten'},
  classroom:               {nPl:'Bleistifte, Bücher und Globen',            gen:'Klassenzimmersachen',  h1:'Klassenzimmer'},
  clothing:                {nPl:'Hemden, Socken und Hüte',                  gen:'Kleidungsstücke',      h1:'Kleidung'},
  desserts_and_sweets:     {nPl:'Cupcakes, Lutscher und Kuchen',            gen:'Süßigkeiten',          h1:'Desserts und Süßigkeiten'},
  dinosaurs:               {nPl:'Stegosauren, Triceratops und Velociraptore', gen:'Dinosaurier',        h1:'Dinosaurier'},
  easter:                  {nPl:'Eier, Häschen und Körbe',                  gen:'Ostersachen',          h1:'Ostern'},
  farm_animals:            {nPl:'Kühe, Schweine und Ziegen',                gen:'Bauernhoftiere',       h1:'Bauernhoftiere'},
  flowers:                 {nPl:'Tulpen, Narzissen und Rosen',              gen:'Blumen',               h1:'Blumen'},
  forest_creatures:        {nPl:'Füchse, Bären und Igel',                   gen:'Waldtiere',            h1:'Waldtiere'},
  fruits:                  {nPl:'Äpfel, Bananen und Birnen',                gen:'Früchte',              h1:'Früchte'},
  furniture:               {nPl:'Sofas, Tische und Lampen',                 gen:'Möbelstücke',          h1:'Möbel'},
  hospital:                {nPl:'Betten, Verbände und Stethoskope',         gen:'Krankenhaussachen',    h1:'Krankenhaus'},
  insects_and_bugs:        {nPl:'Ameisen, Bienen und Marienkäfer',          gen:'Insekten',             h1:'Insekten und Käfer'},
  kitchen_tools:           {nPl:'Löffel, Schneebesen und Pfannen',          gen:'Küchenutensilien',     h1:'Küchenwerkzeuge'},
  miscellaneous:           {nPl:'Schlüssel, Knöpfe und Regenschirme',       gen:'Alltagsgegenstände',   h1:'Verschiedenes'},
  music:                   {nPl:'Trommeln, Glocken und Flöten',             gen:'Instrumente',          h1:'Musik'},
  occupations:             {nPl:'Krankenschwestern, Piloten und Kassierer', gen:'Berufe',               h1:'Berufe'},
  ocean_life:              {nPl:'Fische, Krabben und Kraken',               gen:'Meerestiere',          h1:'Meeresleben'},
  pets:                    {nPl:'Katzen, Hunde und Kaninchen',              gen:'Haustiere',            h1:'Haustiere'},
  post_office:             {nPl:'Briefe, Stempel und Pakete',               gen:'Postsachen',           h1:'Postamt'},
  reptiles_and_amphibians: {nPl:'Frösche, Schlangen und Schildkröten',      gen:'Reptilien',            h1:'Reptilien und Amphibien'},
  shapes:                  {nPl:'Kreise, Quadrate und Dreiecke',            gen:'Formen',               h1:'Formen'},
  space:                   {nPl:'Raketen, Planeten und Sterne',             gen:'Weltraumsachen',       h1:'Weltraum'},
  thanksgivinng:           {nPl:'Truthähne, Kürbisse und Kuchen',           gen:'Erntedanksachen',      h1:'Erntedankfest'},
  things_that_fly:         {nPl:'Drachen, Flugzeuge und Ballons',           gen:'Flugobjekte',          h1:'Dinge die fliegen'},
  tools:                   {nPl:'Hämmer, Handsägen und Schraubenschlüssel', gen:'Werkzeuge',            h1:'Werkzeuge'},
  toys:                    {nPl:'Bälle, Puppen und Roboter',                gen:'Spielsachen',          h1:'Spielzeug'},
  tree:                    {nPl:'Eichen, Tannen und Birken',                gen:'Bäume',                h1:'Bäume'},
  vegetables:              {nPl:'Karotten, Erbsen und Kürbisse',            gen:'Gemüsesorten',         h1:'Gemüse'},
  vehicles:                {nPl:'Busse, Lastwagen und Bagger',              gen:'Fahrzeuge',            h1:'Fahrzeuge'},
  zoo_animals:             {nPl:'Löwen, Zebras und Giraffen',               gen:'Zootiere',             h1:'Zootiere'},
};

// dative-plural +n: append n to each noun-word unless it already ends in -n or -s; "und" untouched.
// "Hunde, Katzen und Kühe" -> "Hunden, Katzen und Kühen"; "Autos" -> "Autos"; "Accessoires" -> "Accessoires".
function datN(phrase){
  return phrase.replace(/[A-Za-zÄÖÜäöüß]+/g, function (w) {
    if (w === 'und') return w;
    if (/[ns]$/.test(w)) return w;
    return w + 'n';
  });
}
// render a frame template: {N_PL}/{GEN} are plural nom/acc; after "mit" they go dative (datN).
function render(tpl, nPl, gen){
  // after "mit" (optionally + dative-plural article "den" and/or a gender-invariant plural adj) the slot is dative → datN.
  return tpl
    .replace(/mit ((?:den |anschaulichen |abgebildeten )*)\{N_PL\}/g, function (m, pre) { return 'mit ' + pre + datN(nPl); })
    .replace(/mit ((?:den |anschaulichen |abgebildeten )*)\{GEN\}/g, function (m, pre) { return 'mit ' + pre + datN(gen); })
    .replace(/\{N_PL\}/g, nPl)
    .replace(/\{GEN\}/g, gen);
}

// ---- image-image P1 (6) — zwei Bildgruppen + Pluszeichen + leeres Kästchen; zählen + zusammenfassen.
const SKEL_II = [
  'Auf diesem Arbeitsblatt warten zwei Bildgruppen mit {GEN} darauf, zusammengezählt zu werden. Dein Kind sieht links eine Gruppe und rechts eine Gruppe, dazwischen ein Pluszeichen und am Ende ein leeres Kästchen. Es zählt zuerst die eine Gruppe, dann die andere und schreibt schließlich hinein, wie viele {N_PL} es zusammen sind. Alle Aufgaben bleiben im Zahlenraum bis 20, damit jedes Kind in Ruhe mit den Fingern oder im Kopf mitzählen kann. So wird das Zusammenfassen zweier Mengen ganz anschaulich – ohne Zeitdruck und ohne Punkte.',
  'Zählen und addieren gehören hier zusammen. Dein Kind betrachtet zwei Bildmengen mit {N_PL}, bestimmt jede Anzahl für sich und legt sie dann im Kopf zusammen. Das Ergebnis kommt in das leere Kästchen hinter dem Pluszeichen. Weil alle Summen im Zahlenraum bis 20 liegen, ist genug Platz, um jede Menge erst einmal sorgfältig auszuzählen. Die Bilder mit {GEN} machen die Aufgabe greifbar: Erst wird gezeigt, dann gezählt, dann zusammengefasst. Ein ruhiger, freundlicher Einstieg in die Addition für die 1. Klasse.',
  'Was passiert, wenn zwei Gruppen zusammenkommen? Genau das übt dein Kind auf dieser Seite. Es sieht eine Gruppe und noch eine Gruppe mit {N_PL}, verbunden durch ein Pluszeichen, und findet heraus, wie viele es insgesamt sind. Jede Anzahl wird zuerst ausgezählt, dann werden beide Mengen im Kopf vereint und die Gesamtzahl ins Kästchen geschrieben. Die Bilder mit {GEN} geben dabei Sicherheit – man kann jederzeit nachzählen. Alles bleibt im Zahlenraum bis 20, in kleinen, gut machbaren Schritten.',
  'Diese Übung macht das Zusammenfassen von Mengen sichtbar. Dein Kind zählt die {N_PL} in der ersten Gruppe, dann die in der zweiten, und schreibt die Summe in das leere Feld. Das Pluszeichen zeigt: Beide Mengen werden zu einer einzigen zusammengelegt. Mit Bildern aus der Welt der {GEN} bleibt die Aufgabe konkret und einladend. Die Zahlen reichen nur bis 20, sodass auch zählende Kinder gut mitkommen. Es gibt keine Stoppuhr und keine Wertung – nur Zeit zum Zählen, Denken und Entdecken.',
  'Hier wird Addition zum Zählspiel. Zwei Bildgruppen mit {GEN} stehen nebeneinander, dazwischen ein Pluszeichen und am Ende ein leeres Kästchen. Dein Kind bestimmt beide Anzahlen, fasst sie zusammen und trägt das Ergebnis ein. Weil jede Gruppe der {N_PL} abgebildet ist, kann es so oft nachzählen, wie es möchte – das stärkt die Mengenvorstellung Schritt für Schritt. Der Zahlenraum bleibt bis 20 begrenzt, ideal für den Anfang der 1. Klasse. Ein klarer Aufbau, der Mut macht und nichts überstürzt.',
  'Zwei Gruppen, ein Ergebnis: Auf diesem Arbeitsblatt übt dein Kind, Mengen zusammenzufassen. Es schaut sich die {N_PL} in beiden Bildgruppen an, zählt sie aus und schreibt in das Kästchen, wie viele es zusammen sind. Das Pluszeichen verbindet die beiden Mengen zu einer. Mit anschaulichen Bildern rund um die {GEN} fällt der erste Kontakt mit dem Plus leicht. Alle Aufgaben liegen im Zahlenraum bis 20 und lassen sich in Ruhe mit den Fingern begleiten – freundlich, geduldig und ohne jeden Druck.',
];
const P2_II = [
  'Wenn ein Kind zwei abgebildete Gruppen zu einer Gesamtzahl zusammenführt, baut es seine Mengenvorstellung auf – die Grundlage für alles spätere Rechnen. Das Zählen-und-Zusammenfassen mit {GEN} macht sichtbar, was „plus“ eigentlich bedeutet. Im Zahlenraum bis 20 bleibt jede Aufgabe überschaubar, sodass dein Kind die Idee des Addierens wirklich verinnerlicht, statt nur Ergebnisse auswendig zu lernen.',
  'Das Zusammenfassen zweier Mengen ist der erste echte Additionsschritt. Indem dein Kind die {N_PL} in beiden Bildgruppen auszählt und vereint, versteht es Addition als Handlung, nicht als Regel. Diese anschauliche Arbeit im Zahlenraum bis 20 stärkt das Zahlgefühl und gibt Sicherheit für den Übergang zum Rechnen mit reinen Zahlen.',
  'Bildgestützte Addition wirkt, weil sie das Abstrakte konkret macht. Dein Kind sieht die {GEN}, zählt sie und erlebt, wie aus zwei Gruppen eine wird. Solche Mengenerfahrungen im Zahlenraum bis 20 legen das Fundament für das Teil-Ganzes-Denken und machen späteres Kopfrechnen leichter – ganz ohne Druck und in dem Tempo, das dein Kind gerade braucht.',
  'Gerade am Anfang der 1. Klasse ist Anschauung entscheidend. Wenn dein Kind die {N_PL} in zwei Gruppen zählt und zusammenlegt, verbindet es Sehen, Zählen und Rechnen. Diese Verbindung festigt die Mengenvorstellung und bereitet das Verständnis für Zahlen bis 20 vor. So entsteht echtes Verstehen, auf dem alle weiteren Rechenschritte sicher aufbauen können.',
];

// ---- image-number P1 (6) — eine Bildgruppe + geschriebene Zahl + leeres Gesamt-Kästchen.
const SKEL_IN = [
  'Auf dieser Seite trifft eine Bildgruppe auf eine geschriebene Zahl. Dein Kind sieht eine Menge {N_PL}, daneben ein Pluszeichen und eine Ziffer, und am Ende ein leeres Kästchen. Es zählt zuerst die abgebildeten {GEN}, liest dann die geschriebene Zahl und legt beides zusammen. So entsteht eine erste Brücke vom Zählen zum Rechnen mit Zahlen. Die Summen bleiben im Zahlenraum bis 20, damit das gezählte Bild und die Ziffer gut zusammenpassen. Ein klarer, ruhiger Schritt vom Bild zur Zahl – ganz ohne Eile.',
  'Hier verbindet dein Kind zwei Welten: das, was man sehen und zählen kann, und das, was als Zahl geschrieben steht. Es zählt die {N_PL} in der Bildgruppe, nimmt die danebenstehende Ziffer hinzu und schreibt die Gesamtzahl ins Kästchen. Diese Mischung aus Menge und Symbol stärkt das Zahlverständnis besonders gut. Weil die Bilder die {GEN} zeigen, bleibt der erste Summand immer nachzählbar. Alle Aufgaben liegen im Zahlenraum bis 20 – genug Raum, um jeden Schritt sicher zu gehen.',
  'Vom Bild zur Zahl: Dein Kind zählt eine Gruppe {N_PL} und addiert dann eine geschriebene Ziffer dazu. Das leere Kästchen wartet auf die Summe. Diese Brückenaufgabe hilft zu verstehen, dass eine gezählte Menge und eine geschriebene Zahl dasselbe meinen können – nämlich eine Anzahl. Die abgebildeten {GEN} machen den ersten Teil greifbar, die Ziffer übt den symbolischen Teil. Alles bleibt im Zahlenraum bis 20, in kleinen Schritten und in freundlichem Tempo, ohne Stoppuhr und ohne Punkte.',
  'Diese Übung führt sanft zum Rechnen mit Ziffern. Dein Kind betrachtet eine Bildmenge mit {GEN}, zählt sie aus und addiert die danebenstehende geschriebene Zahl. Das Ergebnis kommt in das leere Feld hinter dem Pluszeichen. So lernt es, eine sichtbare Menge und ein Zahlsymbol zusammenzubringen. Weil die {N_PL} abgebildet sind, kann der erste Summand jederzeit nachgezählt werden – das gibt Sicherheit. Die Zahlen reichen nur bis 20, passend für den Anfang der 1. Klasse.',
  'Zählen, lesen, zusammenlegen: Auf diesem Arbeitsblatt zählt dein Kind eine Gruppe {N_PL}, liest die daneben geschriebene Ziffer und schreibt die Summe ins Kästchen. Die Aufgabe baut eine Brücke zwischen dem anschaulichen Bild und der geschriebenen Zahl. Mit Motiven rund um die {GEN} bleibt der Einstieg konkret und einladend. Der Zahlenraum bis 20 sorgt dafür, dass jede Aufgabe gut überschaubar bleibt. Es gibt keine Wertung – nur Zeit, in Ruhe zu zählen und das erste Mal mit einer Ziffer zu addieren.',
  'Eine Bildgruppe und eine Ziffer ergeben zusammen eine Summe. Dein Kind zählt zunächst die {N_PL} im Bild, nimmt dann die geschriebene Zahl hinzu und trägt das Ergebnis ein. Diese Verbindung von Menge und Symbol ist ein wichtiger Schritt im Zahlverständnis der 1. Klasse. Die {GEN} im Bild machen den gezählten Teil sichtbar, während die Ziffer schon ein Stück Mathematik auf dem Papier zeigt. Alle Summen liegen im Zahlenraum bis 20 – klar, ruhig und gut zu schaffen.',
];
const P2_IN = [
  'Die Brücke von der gezählten Menge zur geschriebenen Zahl ist ein zentraler Schritt im Zahlverständnis. Wenn dein Kind die {N_PL} im Bild zählt und eine Ziffer hinzunimmt, erkennt es, dass Bild und Zahl dieselbe Anzahl meinen. Diese Einsicht im Zahlenraum bis 20 macht den Übergang vom anschaulichen zum symbolischen Rechnen sanft und sicher.',
  'Menge und Symbol zusammenzubringen trainiert genau das, was Kinder für das spätere Rechnen brauchen. Die abgebildeten {GEN} bleiben nachzählbar, während die Ziffer schon ein Stück geschriebene Mathematik ist. So wächst im Zahlenraum bis 20 das Vertrauen, mit Zahlen umzugehen, ohne den anschaulichen Halt zu verlieren.',
  'Diese Aufgabenart festigt die Erkenntnis, dass eine Zahl eine Anzahl darstellt. Indem dein Kind die {N_PL} zählt und die geschriebene Zahl dazunimmt, verbindet es Konkretes mit Abstraktem. Solche Brückenaufgaben im Zahlenraum bis 20 erleichtern das Kopfrechnen später spürbar und geben jetzt ein gutes, sicheres Gefühl beim Addieren.',
  'Wer eine Menge zählen und mit einer geschriebenen Zahl verrechnen kann, hat den Kern des Addierens verstanden. Mit Bildern rund um die {GEN} bleibt der erste Summand immer überprüfbar, der zweite ist schon symbolisch. Dieser Wechsel stärkt im Zahlenraum bis 20 das Zahlverständnis und bereitet den nächsten Schritt – das Rechnen mit zwei Zahlen – behutsam vor.',
];

// ---- mixed P1 (8) — Zeile A: image-number; Zeile B: den fehlenden Teil / Zerlegung finden (NIE "fehlender Summand").
const SKEL_MX = [
  'Dieses Arbeitsblatt mischt zwei Aufgabenarten. In manchen Zeilen zählt dein Kind eine Bildgruppe mit {N_PL} und addiert eine geschriebene Zahl. In anderen Zeilen ist die Gesamtzahl schon bekannt und ein Teil ist zu sehen – gesucht wird der fehlende Teil. So übt dein Kind Addieren und Zerlegen im Wechsel. Beides gehört eng zusammen: Wer Mengen zusammenfügen kann, versteht auch, wie man sie wieder in Teile zerlegt. Mit Bildern rund um die {GEN} bleibt alles anschaulich, im Zahlenraum bis 20 und ohne jeden Zeitdruck.',
  'Hier kommen zwei Denkrichtungen zusammen. Einmal legt dein Kind eine gezählte Menge {N_PL} und eine geschriebene Zahl zusammen. Ein andermal kennt es das Ganze und einen Teil und sucht die fehlende Menge, die noch dazugehört. Dieses Hin und Her zwischen Addieren und Zerlegen macht das Teil-Ganzes-Verständnis stark. Die abgebildeten {GEN} helfen, jede Menge nachzuzählen, wenn es nötig ist. Alle Aufgaben bleiben im Zahlenraum bis 20. Es geht nicht um Tempo, sondern um sicheres, freundliches Üben Schritt für Schritt.',
  'Auf dieser Seite wechseln sich zwei Aufgabentypen ab. Beim Addieren zählt dein Kind {N_PL} im Bild und nimmt eine Ziffer hinzu. Beim Finden des fehlenden Teils ist die Gesamtzahl gegeben und ein Teil sichtbar – das Kind überlegt, welche Menge noch fehlt, damit das Ganze stimmt. So erlebt es Zerlegung und Addition als zwei Seiten derselben Sache. Mit Motiven aus der Welt der {GEN} bleibt jede Aufgabe konkret. Der Zahlenraum bis 20 sorgt für überschaubare Schritte – in Ruhe, ohne Punkte und ohne Stoppuhr.',
  'Diese Mischung fordert flexibles Denken. Mal addiert dein Kind eine Bildmenge {N_PL} und eine geschriebene Zahl, mal ist die Zerlegung gefragt: Das Ganze ist bekannt, ein Teil ist da, der fehlende Teil wird gesucht. Genau dieser Wechsel zeigt, wie Plus und Zerlegen zusammenhängen. Die {GEN} im Bild geben Halt, weil man jederzeit nachzählen kann. Alle Zahlen liegen im Zahlenraum bis 20, passend zur 1. Klasse. So entsteht ein gutes Gefühl dafür, wie sich Mengen zusammenfügen und wieder in Teile aufteilen lassen.',
  'Zwei Wege zur selben Idee: Auf diesem Blatt addiert dein Kind in einigen Zeilen eine gezählte Gruppe {N_PL} und eine Ziffer. In anderen Zeilen findet es den fehlenden Teil zu einer bekannten Gesamtzahl. Beide Aufgabenarten üben das Teil-Ganzes-Denken, das im Zahlenraum bis 20 eine wichtige Grundlage ist. Die anschaulichen {GEN} machen jede Menge sichtbar und nachzählbar. Dein Kind darf so viel Zeit nehmen, wie es braucht – ohne Wertung, ohne Eile, mit Bildern, die das Rechnen freundlich begleiten.',
  'Manchmal sucht man die Summe, manchmal einen fehlenden Teil. Dieses Arbeitsblatt übt beides. In den Additionszeilen zählt dein Kind {N_PL} und legt eine geschriebene Zahl dazu. In den Zerlegungszeilen ist das Ganze gegeben und ein Teil zu sehen – die fehlende Menge soll gefunden werden. So wird verständlich, dass Zerlegen das Gegenstück zum Addieren ist. Mit Bildern rund um die {GEN} bleibt alles greifbar. Der Zahlenraum bis 20 hält die Aufgaben klein und machbar, ganz ohne Zeitdruck.',
  'Dieses Blatt verbindet Addieren und das Finden des fehlenden Teils. Bei der einen Aufgabenart zählt dein Kind eine Bildgruppe {N_PL} und addiert eine Ziffer. Bei der anderen kennt es die Gesamtzahl und einen Teil und überlegt, welche Menge ergänzt werden muss. Dieser Wechsel schult das flexible Rechnen im Zahlenraum bis 20. Die {GEN} im Bild laden zum Nachzählen ein und geben Sicherheit. Es zählt nicht, wie schnell gerechnet wird, sondern dass dein Kind ruhig versteht, wie Teile und Ganzes zusammengehören.',
  'Hier übt dein Kind, in beide Richtungen zu denken. Vorwärts: eine gezählte Menge {N_PL} und eine geschriebene Zahl ergeben zusammen eine Summe. Rückwärts: zu einem bekannten Ganzen und einem gegebenen Teil wird der fehlende Teil gesucht. So erfährt dein Kind, dass Addition und Zerlegung dieselbe Beziehung von zwei verschiedenen Seiten zeigen. Mit Motiven rund um die {GEN} bleibt jede Zeile anschaulich. Alles spielt sich im Zahlenraum bis 20 ab – in kleinen Schritten, freundlich und ohne Stoppuhr.',
];
const P2_MX = [
  'Addieren und Zerlegen gehören untrennbar zusammen. Wenn dein Kind im Wechsel Mengen zusammenfügt und fehlende Teile sucht, versteht es das Teil-Ganzes-Verhältnis von beiden Seiten. Diese Beweglichkeit im Zahlenraum bis 20 ist eine der wichtigsten Grundlagen der 1. Klasse – sie macht späteres Rechnen flexibel und sicher.',
  'Die Zahlzerlegung zeigt, dass jede Zahl aus Teilen besteht. Indem dein Kind mal addiert und mal den fehlenden Teil findet, erlebt es Zahlen als zerlegbar und zusammensetzbar. Mit den {GEN} im Bild bleibt das konkret. Dieses Verständnis im Zahlenraum bis 20 trägt das gesamte weitere Rechnen.',
  'Wer den fehlenden Teil zu einem Ganzen finden kann, denkt schon in Beziehungen statt nur in Schritten. Der Wechsel mit den Additionszeilen festigt diese Sicht. Solche gemischten Aufgaben im Zahlenraum bis 20 fördern das flexible Rechnen und zeigen deinem Kind, dass Mathematik zusammenhängt – ein Gedanke, der weit über die 1. Klasse hinaus trägt.',
  'Gemischte Aufgaben verhindern reines Auswendiglernen. Dein Kind muss bei jeder Zeile neu entscheiden, ob es zusammenfügt oder den fehlenden Teil sucht. Diese kleine Denkleistung stärkt das Teil-Ganzes-Verständnis nachhaltig. Mit anschaulichen {GEN} und Zahlen bis 20 bleibt die Übung machbar und zugleich anregend.',
  'Das Verständnis, dass Zerlegen das Gegenstück zum Addieren ist, gehört zu den tragenden Ideen der frühen Mathematik. Im Wechsel beider Aufgabenarten erlebt dein Kind diese Beziehung unmittelbar. Die {GEN} machen die Mengen sichtbar, der Zahlenraum bis 20 hält alles überschaubar – so wächst echtes Rechenverständnis, Schritt für Schritt.',
  'Flexibles Rechnen beginnt damit, eine Zahl als Ganzes und zugleich als Summe ihrer Teile zu sehen. Genau das üben diese gemischten Aufgaben. Mit Bildern rund um die {GEN} bleibt der Einstieg anschaulich, und der Zahlenraum bis 20 sorgt für sichere, kleine Schritte – eine ideale Vorbereitung auf das Kopfrechnen.',
  'Wenn dein Kind Addieren und das Finden des fehlenden Teils abwechselnd übt, verknüpft es zwei Sichtweisen zu einem stabilen Verständnis. Die {GEN} im Bild geben dabei Halt zum Nachzählen. Diese Verbindung im Zahlenraum bis 20 ist genau das, was Kinder brauchen, um Zahlen wirklich zu durchdringen – in Ruhe und ohne Leistungsdruck.',
];

// --- cell-space expansion to 8x7=56 (> theme breadth) — 2nd-batch T1 native frames (image-image + image-number).
SKEL_II.push(
  'Stell dir vor, zwei Körbe stehen nebeneinander, und in jedem liegt eine kleine Auswahl an Dingen. Genau so ist dieses Arbeitsblatt aufgebaut: Es zeigt zwei getrennte Bildgruppen, dazwischen ein Pluszeichen und am Ende ein leeres Kästchen, das auf eine Antwort wartet. Dein Kind schaut sich die erste Gruppe an, zählt in Ruhe, schaut zur zweiten Gruppe und zählt weiter. Hier geht es um die abgebildeten {GEN} und darum, wie aus zwei kleinen Mengen eine größere wird. Alles bleibt im Zahlenraum bis 20, damit jede Aufgabe überschaubar bleibt und niemand sich überfordert fühlt. Es gibt keine Eile und keinen Wettbewerb – nur das ruhige Zusammenfassen von zwei Mengen zu einer Summe.',
  'Wenn Kinder Addition zum ersten Mal wirklich begreifen, dann oft über das Auge. Dieses Arbeitsblatt setzt genau dort an: Es legt zwei Bildgruppen nebeneinander, verbindet sie mit einem Pluszeichen und lässt am Schluss Platz für das Gesamtergebnis. Dein Kind zählt zuerst die eine Gruppe, dann die andere, und schreibt zuletzt auf, wie viele es zusammen sind. Auf der Seite warten die anschaulichen {GEN}, sodass die Aufgabe nie abstrakt wirkt, sondern immer greifbar bleibt. Die Zahlen halten sich an den Bereich bis 20 – groß genug für echtes Rechnen, klein genug zum entspannten Zählen. So wird das Zusammenlegen von Mengen Schritt für Schritt vertraut, ganz ohne Druck und ohne Stoppuhr.'
);
P2_II.push(
  'Am Anfang darf jedes Hilfsmittel sein, was hilft – auch die eigenen Finger. Dein Kind kann auf jedes Bild tippen, laut mitzählen und die Finger zu Hilfe nehmen, bis die Gesamtzahl feststeht. Genau dafür sind die beiden Bildgruppen mit den {N_PL} gedacht: Sie machen das Zählen langsam und sichtbar. Mit der Zeit löst sich das Kind vom Finger und behält die Mengen im Kopf – aber dieser Weg darf so lange dauern, wie er eben dauert.',
  'Übung wird leicht langweilig, wenn immer dasselbe Bild erscheint. Deshalb taucht dieselbe Rechenidee hier in einem frischen Gewand auf: Die Aufgabe bleibt das vertraute Zusammenzählen zweier Gruppen, doch das Motiv rund um die {GEN} sorgt für neue Neugier. So wiederholt dein Kind das Addieren bis 20, ohne das Gefühl, schon wieder das Gleiche zu tun. Vertraute Struktur, neues Bild – diese Mischung hält die Aufmerksamkeit wach und festigt das Gelernte ganz nebenbei.',
  'Hinter jeder Additionsaufgabe steckt eine große Idee: Zwei Teile bilden zusammen ein Ganzes. Dieses Arbeitsblatt zeigt diese Idee ganz konkret, denn die erste Bildgruppe ist der eine Teil, die zweite der andere, und die Summe ist das Ganze. Während dein Kind die {N_PL} zählt und zusammenlegt, baut es genau das Verständnis auf, das später für Umkehraufgaben und das Zerlegen von Zahlen gebraucht wird. Aus dem Sehen wird ein Begreifen – und damit ein tragfähiges Fundament.'
);
SKEL_IN.push(
  'Eine Seite, zwei Sprachen der Mathematik: Auf diesem Arbeitsblatt steht eine gezählte Bildmenge neben einer geschriebenen Ziffer, und beide wollen zu einer Summe zusammengefügt werden. Dein Kind beginnt beim Bild, zählt in Ruhe die {N_PL} und liest dann die Zahl, die daneben steht. Im leeren Kästchen am Ende landet das Gesamtergebnis. Genau hier wächst das Verständnis dafür, dass eine Ziffer nichts anderes ist als eine kurze Schreibweise für eine Anzahl. Alles spielt sich im Zahlenraum bis 20 ab, damit der Schritt vom Bild zur Zahl klein und gut zu bewältigen bleibt. Es zählt nicht das Tempo, sondern das ruhige, sichere Verbinden von Anschauung und Symbol.',
  'Manchmal ist die eine Menge gezeichnet, die andere nur als Zahl geschrieben – und genau diese Mischung übt dieses Arbeitsblatt. Es zeigt eine Bildgruppe, daneben eine Ziffer und am Schluss ein leeres Feld für die Summe. Dein Kind zählt zunächst die abgebildeten Dinge, behält diese Anzahl im Kopf und zählt von dort aus weiter, bis die geschriebene Zahl dazugekommen ist. Die Aufgabe lebt von der Welt der {GEN}, sodass das Bild immer einladend und vertraut wirkt. Die Summen bleiben unter 20, damit das Weiterzählen im Kopf gelingt. So entsteht ganz allmählich die Brücke zwischen dem, was man sieht, und dem, was man liest – ohne Hast und ohne Vergleich mit anderen.'
);
P2_IN.push(
  'Ein wichtiger Schritt beim Rechnen ist das Weiterzählen, statt jedes Mal von vorne zu beginnen. Dein Kind hält die geschriebene Zahl im Kopf und zählt von dort aus die Bildmenge dazu – oder umgekehrt. Die {N_PL} auf der Seite geben dabei den festen Anhaltspunkt zum Mitzählen. Mit jeder Aufgabe wird dieses Weiterzählen sicherer, und irgendwann braucht es das laute Mitzählen gar nicht mehr. Genau so wächst aus dem Zählen langsam echtes Rechnen.',
  'Bevor mit Zahlen gerechnet wird, müssen Zahlen sicher gelesen werden. Dieses Arbeitsblatt verbindet beides: Dein Kind übt das Erkennen der geschriebenen Ziffer und legt sie zugleich mit einer Bildmenge zusammen. So bekommt die abstrakte Zahl sofort eine anschauliche Bedeutung, denn neben ihr stehen die {N_PL} zum Anfassen mit den Augen. Lesen und Verstehen gehen hier Hand in Hand – die Ziffer ist nicht länger ein bloßes Zeichen, sondern steht spürbar für eine Anzahl.',
  'Der Weg zum Kopfrechnen führt über viele kleine, sichere Schritte. Hier übt dein Kind einen davon: Es hält eine geschriebene Zahl im Kopf und ergänzt sie um eine gezählte Menge. Die anschaulichen {GEN} stützen diesen Übergang, solange das Bild noch gebraucht wird. Nach und nach löst sich das Rechnen vom Bild, und die Summe entsteht immer öfter allein im Kopf. Dieses Arbeitsblatt begleitet genau diesen ruhigen Übergang vom Zählen am Bild hin zum freien Rechnen mit Zahlen.'
);

// P3 — plain prose (route renders <p>{p3}</p>; no markdown). 2 neighbor collectives + current gen.
function p3de(d, nb1Gen, nb2Gen){
  return 'Hat dein Kind diese Seite geschafft? Dann geht es Schritt für Schritt weiter. Schau dir auch die Aufgaben rund um die ' + nb1Gen + ' an – ein guter nächster Schritt, der gut zu dieser Übung passt. Oder vertiefe eine verwandte Idee mit den ' + datN(nb2Gen) + '. In unserer Sammlung findest du viele weitere Additions-Arbeitsblätter rund um die ' + d.gen + ' für die 1. Klasse – alle kostenlos, zum Ausdrucken oder direkt online zum Mitmachen. So bleibt das Addieren im Zahlenraum bis 20 abwechslungsreich, und dein Kind kann immer dann üben, wann es Lust dazu hat, ganz in seinem eigenen Tempo und ohne Zeitdruck. Viel Freude beim gemeinsamen Zählen und Rechnen!';
}

// ---- coprime cell-space (verbatim from gen-wave1b.js: cells > themes, non-periodic bijection).
function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){
  let k = Math.max(2, Math.round(cells * 0.6180339887));
  for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand;
  return 1;
}
function cellAssign(i, S, P){
  const cells = S*P, stride = coprimeStride(cells);
  const c = ((i % cells) * stride) % cells;
  return { skel: c % S, p2: Math.floor(c / S) % P };
}

const SKEL = { 'image-image': SKEL_II, 'image-number': SKEL_IN, 'mixed': SKEL_MX };
const P2 = { 'image-image': P2_II, 'image-number': P2_IN, 'mixed': P2_MX };

const args = process.argv.slice(2);
const onlyArg = (args.find(a=>a.indexOf('--only=')===0)||'').slice('--only='.length) || null;
const MODES = onlyArg ? [onlyArg] : ['image-image','image-number','mixed'];

const H1 = (d) => 'Addition mit ' + datN(d.nPl) + ' – Arbeitsblatt für die 1. Klasse';
const landingSlugOf = (co) => co.canonical; // native de deck slug; unique per coordinate (decks at /decks/, landings at /worksheets/)

function buildMode(mode){
  const raw = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  // pre-filter to valid + has-copy coords (drops the 8 countability-invalid themes + any without THEMES copy)
  // BEFORE neighbour/carousel indexing, so neighbours never point at a dropped theme.
  const dropped=[]; let blocked=0;
  const list = raw.filter(co=>{
    if(!THEMES[co.theme]){ console.log('NO COPY DATA for theme ' + co.theme + ' (' + mode + ') — add to THEMES'); blocked++; return false; }
    const v = validateCoordinate('addition', mode, co.theme, {});
    if(!v.valid){ dropped.push(co.theme); blocked++; return false; }
    return true;
  });
  const sk = SKEL[mode], p2 = P2[mode], cells = sk.length*p2.length;
  console.log('  ' + (cells>list.length?'[invariant OK]':'[INVARIANT WARN/grandfather]') + ' ' + mode + ': cells ' + sk.length + 'x' + p2.length + '=' + cells + ' vs valid themes ' + list.length);
  const out=[];
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    const c = cellAssign(i, sk.length, p2.length);
    const nb1 = list[(i+1)%list.length], nb2 = list[(i+7)%list.length];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'addition', mode, theme:co.theme, level:'1-klasse' },
      eyebrow: 'Arbeitsblatt: Addition',
      h1: H1(d),
      strand: 'Rechnen und algebraisches Denken',
      slotTokens: d.nPl.replace(/ und /g,', ').split(', ').map(s=>s.trim()).concat([d.gen, co.theme.replace(/_/g,' '), '1-klasse']),
      p1: render(sk[c.skel], d.nPl, d.gen),
      p2: render(p2[c.p2], d.nPl, d.gen),
      p3: p3de(d, THEMES[nb1.theme].gen, THEMES[nb2.theme].gen),
      canonicalDeckSlug: co.canonical,
      carousel: [1,2,5,11].map(off=>{ const n=list[(i+off)%list.length]; return {label:'Addition – '+THEMES[n.theme].h1, href: landingSlugOf(n)}; }),
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  if (dropped.length) console.log('  dropped ' + dropped.length + ' countability-invalid: ' + dropped.join(', '));
  return {out, blocked};
}

let generated=[], blockedTotal=0;
MODES.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

// merge: keep any non-addition de landings; replace addition.
let cur = { _note: 'DE landing copy — STEP-0 ledger locked; gender-safe plural-only frames; coordinate.level re-derived per mechanic+quantity.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(DE,'utf8')); } catch (e) { /* first write */ }
const keep = (cur.landings||[]).filter(l => l.coordinate.type!=='addition');
const merged = { _note: cur._note, landings: keep.concat(generated) };
fs.writeFileSync(DE, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + generated.length + ' (modes ' + MODES.join('+') + '); blocked ' + blockedTotal + '; de.json total ' + merged.landings.length);

// ---- gender-lint (de-first; pre-render gate): FAIL on a singular slot or a token directly after der/die/das/ein/eine.
// Heuristic on the RENDERED copy: flag " ein <Capitalized> " / " eine <Capitalized> " and a bare " das <Cap> " that
// looks like a slotted singular. Plural attributive "die abgebildeten/anschaulichen <Cap>" is whitelisted.
let lintFail=0;
const SAFE_AFTER_DIE = /(abgebildeten|anschaulichen|beiden|fehlende|fehlenden|eine|andere|erste|zweite|ganze|gesamte|gleiche|leere|verwandte|kleinen|wichtigsten)/;
generated.forEach(e=>{
  const text = e.h1 + ' ' + e.p1 + ' ' + e.p2 + ' ' + e.p3;
  // a slotted theme-noun would appear as a known nPl/gen word; check none of the gen/nPl head-words appear in singular after an indefinite article
  const m = text.match(/\b(ein|eine)\s+([A-ZÄÖÜ][a-zäöüß]+)/g) || [];
  m.forEach(hit=>{
    const noun = hit.split(/\s+/)[1];
    // allow fixed singular nouns that are part of the frame (Gruppe, Menge, Zahl, Ziffer, Bildgruppe, Bildmenge, Summe, Seite, Idee, Brücke, Handlung, Regel, Anzahl, Gesamtzahl, Welt, Sammlung, Stoppuhr, Wertung, Übung, Aufgabe, Aufgabenart, Denkleistung, Mischung, Grundlage, Beziehung, Vorbereitung, Sicht, Einsicht)
    if(/^(Gruppe|Menge|Zahl|Ziffer|Bildgruppe|Bildmenge|Bildmengen|Summe|Seite|Idee|Brücke|Handlung|Regel|Anzahl|Gesamtzahl|Welt|Sammlung|Stoppuhr|Wertung|Übung|Aufgabe|Aufgabenart|Denkleistung|Mischung|Grundlage|Beziehung|Vorbereitung|Sicht|Einsicht|Ruhe|Reihe|Ziffer|Pluszeichen|Kästchen|Feld|Tempo|Schritt|Ergebnis|Kind|Gefühl|Stück|Symbol|Zahlsymbol|Gedanke|Begreifen|Antwort|Auswahl|Gewand|Neugier|Anhaltspunkt|Bedeutung|Schreibweise|Ganzes|Teil|Kopf|Druck|Fundament|Verständnis|Zahlverständnis|Zahlgefühl|Zahlenraum|Additionsschritt)$/.test(noun)) return;
    console.log('  GENDER-LINT ? ' + e.slug + ' :: "' + hit + '" (verify not a slotted singular)'); lintFail++;
  });
});
console.log(lintFail? ('gender-lint: ' + lintFail + ' indefinite-article occurrences to eyeball (frame nouns are whitelisted; a slotted theme noun here = FAIL)') : 'gender-lint: clean (no suspicious indefinite-article+noun)');
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log('  SHORT ' + e.slug + ': ' + w);}});
console.log(short? (short+' short (<200 words)') : ('all ' + generated.length + ' >=200 words'));
