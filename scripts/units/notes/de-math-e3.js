'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik Klasse 1 bis 3: die 27 Stunden, die Stage E-3 in die deutschen Einheiten setzt
 * (Daily Teaching System, Part 12.3, 2026-11-26): die neuen Blätter aus Stage E-1/E-2 (G1-671, G1-673 bis G1-675,
 * G2-634 bis G2-636, G3-630, G3-631, G3-633 bis G3-646) und die älteren G1-123, G1-124, G1-125, G1-560, G2-395 und
 * G3-349. Geschrieben nach den gerenderten Blättern aller drei Stufen (Kontaktbögen, Textauszüge, eigene Renderings)
 * und nach dem Code der genannten Werkzeuge (mini tools/<key>.js). Die Hinweise sind so lang, wie das Blatt der
 * Handreichung trägt (build-guide.js prüft das).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'de',
  points: {
    // ---------------------------------------------------------------- Klasse 1
    '1:add-within-10-models#rechnen-mit-der-null': {
      title: 'Rechnen mit der Null',
      objective: 'Die Kinder schreiben zu Bildgeschichten, in denen nichts dazukommt, nichts weggeht oder alles weggeht, die Aufgabe mit Ergebnis (5 + 0 = 5, 5 − 0 = 5, 4 − 4 = 0) und rechnen Plus- und Minusaufgaben mit der Null bis 10.',
      routine: 'Tag 1: Spielt die Geschichten mit einer Dose und Steckwürfeln. Ein Kind legt 5 Würfel hinein, ein zweites legt keinen dazu, die Klasse sagt die Aufgabe (5 + 0 = 5); ein drittes nimmt keinen heraus (5 − 0 = 5), dann nimmt es alle heraus (5 − 5 = 0). Tag 2: Paare erfinden mit Plättchen eigene Null-Geschichten, das Partnerkind schreibt die Aufgabe dazu.',
      note: {
        mistake: 'Viele verwechseln 5 − 0 und 5 − 5 und schreiben bei beiden 0. Andere behandeln die Null wie eine Eins (4 + 0 = 5) oder schreiben bei „Es kommt kein Schwan dazu“ die Zahl der Schwäne zweimal (2 + 2). Die Bilder von „kein … dazu“ und „kein … weg“ sehen gleich aus: Nur der Satz und das gedruckte Zeichen entscheiden.',
        words: '„Wie viele sind es am Anfang? Was passiert? Wie viele sind es am Ende?“ „Null heißt: nichts. Kommt nichts dazu, bleiben es gleich viele. Geht alles weg, bleibt nichts übrig.“ Lies zu jeder Geschichte den Satz vor, bevor die Kinder rechnen; wer schon lesen kann, darf vorlesen.',
        watch: 'Jedes Blatt hat vier Bildgeschichten: Was weggeht, ist durchgestrichen, was dazukommt, steht rechts unter einem Pfeil; dazwischen kommen auch Geschichten ohne Null (auf dem Blatt für alle „Es werden noch Erdbeeren dazugelegt“). Bei Plusgeschichten gilt auch die Tauschaufgabe (0 + 2 = 2). Das leichtere Blatt hat darunter zwölf Aufgaben, bei denen nur das Ergebnis fehlt. Auf dem Blatt für alle fehlt bei der Hälfte die Zahl in der Mitte (0 + ☐ = 5), auf dem schwereren auch vorne (☐ − 0 = 4).',
      },
    },
    '1:fluency-within-20#rechenwege-vergleichen-7-plus-8': {
      title: 'Rechenwege vergleichen: Wie rechnest du 7 + 8?',
      objective: 'Die Kinder rechnen drei Wege zu 7 + 8 nach (erst bis zur 10, verdoppeln, tauschen), ordnen neue Aufgaben mit Zehnerübergang bis 20 einem passenden Weg zu und schreiben bei zwei Aufgaben ihren eigenen Weg in Schritten auf.',
      note: {
        mistake: 'Beim Weg „erst bis zur 10“ zerlegen viele die zweite Zahl falsch (7 + 3 + 4) oder vergessen den Rest. Beim Verdoppeln fehlt oft das „+ 1“ (7 + 7 = 14). Manche meinen, eine Tauschaufgabe habe ein anderes Ergebnis. Beim Verbinden schauen Kinder auf die Aufgabe links statt auf die Schritte rechts.',
        words: 'Zeige 7 + 8 am Rechenrahmen mit zwei Stangen: oben 7, unten 8. „Seht ihr 5 und 5 und noch 2 und 3?“ Schiebe dann oben 3 Kugeln dazu, bis die Stange voll ist, und unten 3 zurück: „Woher kommt die 3? Woher die 5?“ Stelle dann wieder oben 7 und unten 8 ein: „Seht ihr oben 7 und unten auch 7 und noch 1?“ Frage bei jeder neuen Aufgabe: „Welcher Weg passt hier gut? Geht auch ein anderer?“',
        watch: 'Die Namen der drei Kinder wechseln von Blatt zu Blatt; in den Sprechblasen steht immer „Ich rechne erst bis zur 10“, „Ich verdopple die 7“ und „Ich tausche: 8 + 7“. Das leichtere Blatt gibt die Schritte vor (7 + 7 = ☐, ☐ + 1 = ☐) und hat drei Rechnungen zum Verbinden. Das Blatt für alle hat vier, ein Kind bekommt zwei Linien; beim eigenen Weg kreist das Kind ein, wessen Weg es nimmt. Auf dem schwereren wählt es bei vier Aufgaben selbst einen Weg und schreibt den Namen dazu: Oft passen mehrere. Jeder Weg mit richtigen Schritten ist richtig, auch die Kraft der Fünf.',
      },
    },
    '1:measure-length-units#handspanne-fuss-schritt': {
      title: 'Mit Handspanne, Fuß und Schritt messen',
      objective: 'Die Kinder schätzen und messen Dinge im Klassenzimmer mit Handspannen, Füßen und Schritten, vergleichen ihre Zahl für denselben Tisch mit der eines anderen Kindes und erklären, warum die Zahlen verschieden sind.',
      note: {
        mistake: 'Die Kinder lassen Lücken zwischen den Handspannen oder legen sie übereinander, setzen den Fuß nicht Ferse an Spitze und machen ungleich lange Schritte. Beim Vergleich meinen viele, wer mehr Handspannen braucht, habe die größere Hand.',
        words: '„Der Daumen setzt genau dort an, wo der kleine Finger aufgehört hat.“ „Ferse an Zehenspitze.“ Zeige in „Die dehnbare Einheit“ zwei Streifen unter einem Gegenstand und zieh die Einheit eines Streifens kleiner: Die Zahl am Ende wird größer, der Gegenstand bleibt gleich. „Ist der Tisch gewachsen, weil du mehr Handspannen brauchst?“ Ziel ist der Satz: „Wer weniger Handspannen braucht, hat die größere Handspanne.“',
        watch: 'Die Messungen haben keine Lösungszahl: Prüfe, ob Schätzung und Messung dastehen und ob die Einheit passt. Auf dem leichteren Blatt und dem Blatt für alle zeigt bei jedem Ding ein Bild, womit gemessen wird; das leichtere hat vier Dinge und eine freie Zeile „Das messe ich noch“. Das Blatt für alle hat fünf Dinge, eine Spalte für das Partnerkind und den Satz „Wir haben verschiedene Zahlen, weil …“. Auf dem schwereren kreuzt das Kind die Einheit selbst an und schreibt auf, wie weit die Schätzung daneben lag. Räume für die Schritte vorher einen Weg frei.',
      },
    },
    '2:bundle-ten-ones#zehnerzahlen-bis-100': {
      title: 'In Zehnern bündeln: Zehner und Einer',
      objective: 'Die Kinder kreisen in einer großen Menge von Einern immer 10 ein und schreiben auf, wie viele Zehner es sind und wie viele Einer übrig bleiben (Zahlen von 21 bis 79).',
      note: {
        mistake: 'Viele kreisen 9 oder 11 ein, zählen einen Einer doppelt oder kreisen einfach eine Zeile ein, obwohl die Zeilen nicht zehn lang sind. Andere schreiben die Gesamtzahl in das Einerkästchen oder vertauschen Zehner und Einer.',
        words: '„Tippe jeden Einer an und zähle leise bis zehn. Dann den Kreis schließen.“ „Wie viele Zehner? Wie viele Einer bleiben übrig? Welche Zahl ist das?“ In „Die Zehnerdosen“ wählst du „Eine Handvoll“ oder „Ein Haufen“: Ein Kind tippt auf den Teppich und schöpft, beim zehnten Plättchen schließt sich die Dose von selbst. Am Ende liest die Klasse Zehner und Einer ab und sagt die Zahl.',
        watch: 'Neben den Einern stehen zwei Kästchen, hinter dem einen eine Zehnerstange, hinter dem anderen ein Einer: Das Kind schreibt die Zahl der Zehner und der übrigen Einer, nicht die ganze Zahl. Die Einer liegen in Zeilen, die selten genau zehn lang sind, also muss beim Einkreisen über das Zeilenende hinaus gezählt werden. Das leichtere Blatt hat Mengen von 21 bis 39, das Blatt für alle von 31 bis 59, das schwerere von 51 bis 79. In einer Einheit „Zahlen bis 20“ ist das ein Ausblick: Das leichtere Blatt (21 bis 39) passt hier für viele Kinder besser. Lass die Kinder die Zahl sagen, auch wenn sie sie noch nicht schreiben, und achte auf Zahlendreher: 3 Zehner und 6 Einer sind sechsunddreißig, nicht dreiundsechzig.',
      },
    },
    '1:skip-counting': {
      title: 'In Schritten zählen: Zweier, Fünfer, Zehner',
      objective: 'Die Kinder zählen in Zweier-, Fünfer- und Zehnerschritten und schreiben in Zahlenreihen die fehlenden Zahlen: in Zweierschritten bis 40, in Fünfer- und Zehnerschritten bis 100.',
      note: {
        mistake: 'Die Kinder schreiben in die Lücke die nächste Zählzahl (10, 20, 21). In Zweierschritten rutschen sie nach einem Fehler auf die ungeraden Zahlen, in Fünferschritten von 67 aus auf 70. Eine Lücke am Ende der Reihe bleibt oft leer, weil keine Zahl mehr danach steht.',
        words: 'Öffne „Zählen im Chor“, wähle „Start bei“ 0 und „In Schritten von“ +2. Bei jedem Tippen auf „Weiter“ erscheint die nächste Zahl, die Klasse spricht sie im Chor. Tippe vorher auf ein leeres Feld, dort erscheint ein Fragezeichen: „Welche Zahl wird hier stehen?“ Dann +5 und +10. „Mit welcher Ziffer enden die Fünferzahlen? Und die Zehnerzahlen?“',
        watch: 'Drei Blätter: Das Zweierblatt ist das Blatt der Stunde, Fünfer und Zehner gehören dazu. Nimm am ersten Tag die Zehner, am zweiten die Fünfer, am dritten die Zweier. Bei allen dreien beginnt das leichtere Blatt jede Reihe bei einer Zahl der Reihe und lässt zwei Kästchen einzeln frei. Das Blatt für alle hat fünf Reihen mit drei Lücken, manchmal nebeneinander und auch am Ende. Das schwerere beginnt außerhalb der Reihe (Zweier ab einer ungeraden Zahl, Fünfer etwa ab 67, Zehner etwa ab 41), geht als Ausblick bis 120 (Zweier bis 50) und hat in jeder Reihe Lücken nebeneinander. Wer eine Reihe an der Endziffer prüft, hat das Muster verstanden.',
      },
    },
    '2:shopping-money#einkaufen-bis-20-euro': {
      title: 'Einkaufen bis 20 Euro: bezahlen und Rückgeld',
      objective: 'Die Kinder rechnen zwei Preise in ganzen Euro zusammen (bis 20 €), kreisen in einer Geldbörse das Geld ein, mit dem sie passend bezahlen, und bestimmen das Rückgeld, wenn sie mit 10 € oder 20 € bezahlen.',
      note: {
        mistake: 'Viele kreisen alles Geld in der Börse ein oder zählen einen Schein als 1. Beim Rückgeld schreiben sie den Preis statt der Differenz oder zählen von 20 rückwärts falsch.',
        words: '„Was kostet beides zusammen? Welche Scheine und Münzen brauchst du genau?“ „Du gibst 20 €. Zähle vom Preis weiter bis 20: Wie viel bekommst du zurück?“ In „Die Geldmatte“ wählst du „Große Preise“, tippst auf das Preisschild und stellst mit + und − einen glatten Betrag ein (das Schild zeigt ihn als 13,00 €: keine Cent). Ein Kind tippt Scheine und Münzen auf die Matte, bis es passt; dann fragt die Matte, ob es auch anders geht.',
        watch: 'Oben steht ein Marktstand mit sechs Dingen und Preisschildern. Auf dem leichteren Blatt sind die Preise klein (Summen bis 10 €), bei den letzten zwei Aufgaben zahlt das Kind mit 10 €. Auf dem Blatt für alle kosten Dinge bis 12 € (Summen ohne Zehnerübergang wie 12 € + 4 €), auf dem schwereren gehen die Summen über den Zehner (9 € + 3 €); auf beiden zahlt das Kind bei den letzten drei mit 20 €. In der Börse liegt mehr Geld als nötig. Das Rückgeld rechnet die Klasse ohne Werkzeug: Die Rückgeld-Übung der Geldmatte arbeitet mit Cent bis 1 €.',
      },
    },
    // ---------------------------------------------------------------- Klasse 2
    '1:mental-math-to-100#zum-zehner-ergaenzen': {
      title: 'Zum Zehner ergänzen, vom Zehner abziehen',
      objective: 'Die Kinder ergänzen zweistellige Zahlen bis zum nächsten Zehner (36 + ☐ = 40) und ziehen Einer von Zehnerzahlen ab (50 − 7), mit der Herzaufgabe der verliebten Zahlen (6 + ☐ = 10, 10 − 7 = ☐), im Zahlenraum bis 100.',
      note: {
        mistake: 'Bei Aufgaben wie 70 − 6 rechnen viele die Einer dazu (76) oder zählen die 70 mit und landen eins daneben. Beim Ergänzen schreiben manche den Zehner selbst ins Kästchen. Fehlt die Zahl in der Mitte (90 − ☐ = 89), schreiben manche die 89 ab oder die 9 aus der Herzaufgabe hinein.',
        words: '„Von 6 bis 10 fehlen 4. Dann fehlen auch von 36 bis 40 genau 4.“ „10 − 7 = 3. Also ist 50 − 7 drei mehr als 40.“ Am Rechenstrich (Zahlenraum 100) stellst du die Startzahl 50 ein, schaltest „Hilf mir, auf glatten Zahlen zu landen“ aus und ziehst einen Sprung zurück: Landet er bei 43, steht am Bogen −7. Dann Start bei 30, ein Sprung auf 36 und ein zweiter bis 40: Der zweite Bogen zeigt, was bis zum Zehner fehlt.',
        watch: 'Unter jeder Aufgabe steht mit einem Herz die Herzaufgabe mit den verliebten Zahlen; das Kind rechnet sie zuerst. Das leichtere Blatt zeigt zu jeder Aufgabe einen Zahlenstrahl von Zehner zu Zehner, beim Ergänzen mit der markierten Zahl. Das Blatt für alle hat zehn Aufgaben ohne Zahlenstrahl, bei manchen fehlt die Zahl in der Mitte. Das schwerere ergänzt unten in zwei Schritten bis 100 (erst zum Zehner, dann bis 100, „also …“). Wer die Herzaufgabe ausfüllt, aber die große Aufgabe nicht, sieht die Verbindung noch nicht: Lege beide Aufgaben mit Zehnerstangen und Einerwürfeln nebeneinander.',
      },
    },
    '2:explain-strategies': {
      title: 'Rechenwege vergleichen: schrittweise oder mit Hilfsaufgabe?',
      objective: 'Die Kinder rechnen drei Wege zu einer Plusaufgabe bis 100 nach (schrittweise, Zehner und Einer extra, mit Hilfsaufgabe), finden im Weg eines vierten Kindes den falschen Schritt und berichtigen ihn und rechnen Plus- und Minusaufgaben mit der Hilfsaufgabe.',
      note: {
        mistake: 'Bei der Hilfsaufgabe korrigieren viele in die falsche Richtung: bei 39 + 25 erst 40 + 25 = 65, dann + 1 statt − 1; bei 52 − 29 erst 52 − 30 = 22, dann − 1 statt + 1. Bei „Zehner und Einer extra“ geht beim Zusammenrechnen ein Zehner verloren. Beim vierten Kind kreuzen manche den letzten Schritt an, weil dort das falsche Ergebnis steht, auch wenn der Fehler früher steckt.',
        words: '„Du hast 1 zu viel dazugetan. Was musst du am Ende tun?“ „Du hast 1 zu viel weggenommen. Was jetzt?“ Am Rechenstrich (Zahlenraum 100) geht die Startzahl in Zehnerschritten: Zeige den Weg mit der Hilfsaufgabe für 39 + 25 als Start bei 40 und, ohne „Hilf mir, auf glatten Zahlen zu landen“, einen Sprung +25 und einen Sprung −1. Den schrittweisen Weg (39 + 20 + 5) zeichnest du daneben an die Tafel. „Welcher Weg ist hier am schnellsten? Und bei 32 + 35?“',
        watch: 'Bei der Aufgabe der drei Kinder endet die erste Zahl immer auf 9 (etwa 29 + 13). Auf dem leichteren Blatt sind die Schritte vorgedruckt und das Kind rechnet mit der Hilfsaufgabe nur Plus (− 1 steht da). Auf dem Blatt für alle schreibt es bei der Hilfsaufgabe selbst, ob am Ende plus oder minus gerechnet wird, und rechnet auch eine Minusaufgabe auf eigenem Weg. Auf dem schwereren sind die Schritte leer, und bei der Hilfsaufgabe fehlen am Ende Zeichen und Zahl. Jeder Weg mit richtigen Schritten ist richtig, auch die Tauschaufgabe eines Schritts.',
      },
    },
    '2:estimate-lengths': {
      title: 'Meter und Zentimeter: erst schätzen, dann messen',
      objective: 'Die Kinder schätzen Längen im Klassenzimmer und auf dem Schulhof mit Vergleichsgrößen (Fingerbreite etwa 1 cm, Lineal 30 cm, Türbreite etwa 1 m), messen mit Lineal, Meterstab oder Maßband nach und schreiben die Länge in Metern und Zentimetern.',
      note: {
        mistake: 'Die Kinder schreiben 1 m 20 cm als 120 m oder 1 m 120 cm, setzen Lineal oder Meterstab nicht an der Null an und schätzen fast alles auf „1 m“. Beim Maßband lesen manche von der falschen Seite ab.',
        words: '„Ist der Tisch höher oder niedriger als 1 m? Denk an die Tür: Sie ist etwa 1 m breit.“ „Wie viele Lineale passen auf die Fensterbank?“ „1 m 20 cm sind 120 cm.“ Zieh am Lineal den Endgriff auf 1 cm und auf 30 cm. Das Bild an der Wand ist größer als in echt: Die Kinder legen deshalb einen Finger an ihr eigenes Lineal (eine Fingerbreite ist etwa 1 cm) und sehen, dass ihr ganzes Schullineal 30 cm lang ist.',
        watch: 'Die Messungen haben keine Lösungszahl. Plane für Tischtennisplatte und Bank eine Messrunde auf dem Schulhof mit Maßband (eine Tischtennisplatte ist 2 m 74 cm lang). Fehlt ein Ding, misst das Kind in der Zeile „Das messe ich noch“ etwas anderes. Das leichtere Blatt hat vier Dinge, 1 m = ☐ cm und Bilder zu „kürzer als 1 m“ oder „länger als 1 m“. Das Blatt für alle hat eine Spalte für das Partnerkind, 2 m = ☐ cm und die dritte Karte „etwa 1 m“ (eine Karte kann leer bleiben). Das schwerere hat keine Vergleichsgröße „Lineal“, eine Spalte „Unterschied“ in cm und Umwandlungen wie 1 m 50 cm = ☐ cm.',
      },
    },
    // ---------------------------------------------------------------- Klasse 3
    '2:number-line-not-from-zero#zahlenstrahl-bis-1000': {
      title: 'Der Zahlenstrahl bis 1000: die Schrittweite finden',
      objective: 'Die Kinder finden an Zahlenstrahlen mit zehn gleichen Abschnitten aus den gedruckten Zahlen die Schrittweite (5, 10, 25 oder 100) und schreiben die fehlenden Zahlen bis 1000 in die Kästchen.',
      note: {
        mistake: 'Viele zählen die Striche statt der Abschnitte (11 statt 10) oder nehmen jeden Strahl in Zehnerschritten. Beginnt er nicht bei 0, teilen sie die Endzahl statt des Abstands: Bei einem Strahl von 100 bis 350 rechnen sie 350 : 10.',
        words: '„Zähle die Sprünge, nicht die Striche.“ „Wie weit ist es vom Anfang bis zum Ende? Zehn gleiche Sprünge: Wie groß ist einer?“ „Was steht genau in der Mitte?“ Mit „Die drei Pfosten“ (Strecke 0 bis 100) übt die Klasse die Mitte: Eine Zahl kommt, alle sagen, welchem Pfosten sie am nächsten ist, und legen sie erst dann hin; danach wird der Zehner aufgemacht, in dem sie wohnt, und die drei Pfosten stehen wieder da.',
        watch: 'Das Blatt für alle druckt auf vier Strahlen nur die beiden Enden (etwa 0 und 1000, 0 und 50, 100 und 350); vier Kästchen sind zu füllen, nie zwei nebeneinander. Das leichtere Blatt druckt eine dritte Zahl dazu, mit Schritten von 2, 5 oder 10. Ein schwereres Blatt gibt es in dieser Stunde nicht. Wer die Schrittweite aus dem Abstand berechnet und mit der Zahl in der Mitte prüft, hat die Stunde verstanden; wer rät, zeichnet die zehn Sprünge als Bögen über den Strahl.',
      },
    },
    '3:multiply-multiples-of-10': {
      title: 'Einmaleins mit Zehnerzahlen: 3 · 40 und 240 : 6',
      objective: 'Die Kinder rechnen bei Mal- und Geteiltaufgaben mit Zehnerzahlen zuerst die Einmaleinsaufgabe und nutzen sie (3 · 4 = 12, also 3 · 40 = 120; 24 : 6 = 4, also 240 : 6 = 40); die Ergebnisse bleiben unter 1000.',
      note: {
        mistake: 'Viele hängen die Null zweimal an (3 · 40 = 1200) oder vergessen sie (12). Beim Teilen wird aus 240 : 6 oft 400. Steht die Lücke vorne oder in der Mitte (9 · ☐ = 720), schreiben manche die Zahl aus der Einmaleinsaufgabe ohne Null hinein.',
        words: '„3 · 40 heißt: 3 mal 4 Zehner. Das sind 12 Zehner, also 120.“ „240 sind 24 Zehner. 24 Zehner geteilt durch 6 sind 4 Zehner.“ Im Stellenwert-Labor (mit Hunderterstelle) legst du dreimal 4 Zehner: In der Zehnerspalte liegen 12 Zehner. Tippe auf „Hunderter bündeln!“: Dann liegen dort 1 Hunderter und 2 Zehner, und Zahl und Zahlwort ändern sich mit.',
        watch: 'Oben stehen vier Aufgabenpaare mit Bildern aus Gruppen von Zehnerstangen („Eine Zehnerstange ist 10“), darunter 16 Paare. Das leichtere Blatt hat nur Malaufgaben. Auf dem Blatt für alle ist die Hälfte der Paare geteilt. Auf dem schwereren fehlt bei den 16 Paaren ohne Bild die Zahl vorne, in der Mitte oder hinten. Wer bei 40 : ☐ = 20 die 20 schreibt, liest die Aufgabe noch einmal laut.',
      },
    },
    '3:multiply-in-steps': {
      title: 'Halbschriftlich multiplizieren: 4 · 37',
      objective: 'Die Kinder multiplizieren eine einstellige mit einer zweistelligen Zahl, indem sie in Zehner und Einer zerlegen (4 · 37 = 4 · 30 + 4 · 7), am Punktefeld, im Malkreuz und in Rechenschritten, und sagen, welche Darstellung ihnen am meisten hilft.',
      note: {
        mistake: 'Viele multiplizieren nur die Zehner und hängen die Einer an (4 · 37 = 120 + 7). Andere rechnen 4 · 30 = 12, vertauschen im Malkreuz Zehner und Einer oder addieren die Teilergebnisse falsch, wenn es über den Hunderter geht.',
        words: '„4 · 37 heißt: 4 Reihen mit je 37. Wir trennen jede Reihe nach den Zehnern: links 4 · 30, rechts 4 · 7.“ Mit dem Brötchenblech zeigst du das Prinzip im Kleinen: Stelle „Auch 11 und 12“ ein, lege 4 Reihen zu je 12 und brich nach Spalte 10 auseinander. Die 12 teilt sich in 10 und 2, die 4 steht an beiden Teilen. „Wie viele Brötchen sind es links, wie viele rechts, wie viele zusammen?“ Dann an der Tafel mit 4 · 37.',
        watch: 'Über den beiden Teilen des Punktefelds steht der Faktor mit einem Kästchen (etwa „6 · ☐“). Das leichtere Blatt hat vier Aufgaben bis etwa 4 · 39; im Malkreuz stehen schon Zehner und Einer, in den Rechenschritten schon die Aufgaben (etwa 2 · 10 und 2 · 4), es fehlen nur die Ergebnisse. Auf dem Blatt für alle schreibt das Kind die Zahlen im Malkreuz und in den Schritten selbst. Das schwerere hat fünf Aufgaben bis 9 · 98 ohne Punktefeld. Die Punktefelder sind dicht: Das Kind liest die Teilung ab, es zählt keine Punkte. Beim Ankreuzen, was am meisten hilft, ist jede Antwort mit Begründung richtig.',
      },
    },
    '3:divide-in-steps': {
      title: 'Halbschriftlich dividieren: 84 : 4',
      objective: 'Die Kinder teilen Zahlen bis 200 ohne Rest durch eine einstellige Zahl, indem sie die Zahl in zwei gut teilbare Zahlen zerlegen (84 = 80 + 4, 80 : 4 = 20, 4 : 4 = 1, zusammen 21), und prüfen zwei Ergebnisse mit der Malaufgabe.',
      routine: 'Tag 1: Jede Gruppe legt 84 mit Zehnerstangen und Einerwürfeln und verteilt auf 4 Teller, erst die Zehner, dann die Einer. Dann 72 auf 6 Teller: Ein Zehner bleibt übrig und wird in 10 Einer getauscht, so wird aus 72 die Zerlegung 60 + 12. Tag 2: Die Gruppen legen eine Aufgabe mit eigener Zerlegung und prüfen mit der Malaufgabe.',
      note: {
        mistake: 'Viele zerlegen nach Zehnern und Einern, auch wenn die Teile sich nicht teilen lassen (96 : 8 als 90 + 6). Andere teilen nur einen Teil und hängen den anderen an (84 : 4 = 20 + 4) oder vergessen, die Teilergebnisse zu addieren.',
        words: '„Welche Zahl in der Nähe kannst du gut durch 8 teilen? Was bleibt übrig?“ „Teile beide Teile. Zähle die Ergebnisse zusammen.“ „Prüfe mit der Malaufgabe: dein Ergebnis mal 4. Kommt 84 heraus?“',
        watch: 'Bei den ersten Aufgaben steht die Zerlegung schon da, mit einem Bild aus Zehnerstangen und Einern. Auf dem leichteren Blatt lassen sich Zehner und Einer einzeln teilen (96 = 90 + 6), vier Aufgaben mit und drei ohne Zerlegung. Auf dem Blatt für alle ist ein Teil eine Zahl aus dem Zehnereinmaleins (91 = 70 + 21). Das schwerere hat Zahlen von 100 bis 198, zwei vorgegebene und sechs eigene Zerlegungen ohne Bild. Jede Zerlegung in zwei Zahlen, die sich ohne Rest teilen lassen, ist richtig.',
      },
    },
    '3:muldiv-word-problems#preistabellen': {
      title: 'Preistabellen: je mehr, desto teurer',
      objective: 'Die Kinder setzen Preistabellen bis zur Anzahl 10 fort, in denen jedes Stück gleich viel kostet, finden den Preis für 1 Stück und ergänzen den Satz „Für jede Brezel mehr bezahlst du ☐ € mehr“.',
      routine: 'Tag 1: Spielt Bäckerei mit Spielgeld. Eine Brezel kostet 2 €; ein Kind nach dem anderen kauft eine Brezel mehr, die Klasse sagt den neuen Preis, du trägst Anzahl und Preis in eine Tabelle an der Tafel ein. Tag 2: Paare wählen ein Ding und einen Preis, schreiben nur zwei Preise ihrer Tabelle mit der Anzahl auf ein Kärtchen und tauschen; das andere Paar füllt die Tabelle bis 10.',
      note: {
        mistake: 'Viele zählen in der Tabelle 1 dazu statt den Stückpreis. Sind zwei Preise weit auseinander gegeben (2 Stück 6 €, 9 Stück 27 €), nehmen sie den Unterschied als Stückpreis. Beim Satz unter der Tabelle schreiben manche den letzten Preis.',
        words: '„Was kostet 1 Stück? Woran siehst du das?“ „Doppelt so viele kosten doppelt so viel.“ „Von 2 Stück zu 9 Stück sind es 7 Stück mehr. Wie viel Euro mehr?“',
        watch: 'Jedes Blatt hat fünf Tabellen von 1 bis 10. Auf dem leichteren stehen die Preise für 1, 2 und 3 Stück; in der letzten nur ein Preis, dort sucht das Kind zuerst den Preis für 1 Stück. Das Blatt für alle gibt den Preis für 1 Stück und einen in der Mitte, in der letzten Tabelle nur den in der Mitte. Auf dem schwereren stehen in den ersten vier Tabellen zwei Preise, nie der für 1 Stück, in der letzten nur einer. Wer die Tabelle mit Malaufgaben (· 3) füllt statt mit Plusschritten, rechnet geschickt.',
      },
    },
    '3:muldiv-word-problems#sachaufgaben-mit-tabellen': {
      title: 'Sachaufgaben mit Tabellen lösen',
      objective: 'Die Kinder lösen Sachaufgaben zu Anzahl und Preis mit einer Tabelle: Sie tragen ein, was sie wissen, schreiben an die Pfeile, womit sie rechnen (· 2, : 2, : 3, auch über den Preis für 1 Stück), und schreiben einen Antwortsatz.',
      routine: 'Tag 1: Schreibe eine Aufgabe an die Tafel („6 Radiergummis kosten 12 €. Wie viel kosten 2?“); Paare lösen sie mit Tabelle und Pfeilen, zwei Paare zeigen verschiedene Wege (: 3 oder erst 1 Stück). Tag 2: Jedes Paar schreibt eine eigene Sachaufgabe mit Anzahl und Preis auf ein Kärtchen; ein anderes Paar löst sie mit Tabelle und Antwortsatz und gibt sie zurück.',
      note: {
        mistake: 'Viele rechnen mit Plus und Minus statt mit Mal und Geteilt (aus 4 Stück 20 € wird bei 8 Stück 24 €). Andere schreiben an die Pfeile beim Preis etwas anderes als bei der Anzahl. Der Antwortsatz besteht oft nur aus der Zahl.',
        words: '„Wie kommst du von 9 Stück zu 3 Stück? Was du mit der Anzahl machst, machst du auch mit dem Preis.“ „Weißt du, was 1 Stück kostet? Hilft dir das?“',
        watch: 'Jedes Blatt hat drei Aufgaben, jede mit Tabelle, Pfeilen und einer Antwortzeile pro Frage. Auf dem leichteren steht der gegebene Preis schon in der Tabelle (verdoppeln, halbieren, dritteln). Auf dem Blatt für alle trägt das Kind selbst ein, was es weiß; eine Aufgabe hat zwei Fragen (· 2 und · 3), eine einen großen Preis wie 4 Tische für 352 €. Auf dem schwereren führt ein Weg über den Preis für 1 Stück, und große Preise wie 3 Fahrräder für 579 € verlangen halbschriftliches Teilen.',
      },
    },
    '3:estimate-by-rounding#ueberschlag-und-probe': {
      title: 'Überschlag und Probe: Kann das stimmen?',
      objective: 'Die Kinder prüfen fertige schriftliche Plus- und Minusrechnungen bis 1000 mit dem Überschlag (beide Zahlen auf Hunderter runden) und mit der Probe durch die Umkehraufgabe und schreiben bei falschen Rechnungen das richtige Ergebnis auf.',
      routine: 'Tag 1: Schreibe drei fertige Rechnungen an die Tafel: eine mit vergessenem Übertrag bei den Zehnern (wähle die Zahlen so, dass das Ergebnis mehr als 100 vom Überschlag entfernt liegt), eine mit vergessenem Übertrag bei den Einern, eine richtige. Nach dem Überschlag zeigen alle: Daumen hoch heißt „kann stimmen“, Daumen runter „kann nicht stimmen“; dann rechnen Paare die Probe. Tag 2: Jedes Paar schreibt drei Plusaufgaben mit Ergebnis auf, eines knapp falsch, eines weit falsch, eines richtig; ein anderes Paar prüft mit Überschlag und Probe.',
      note: {
        mistake: 'Viele runden auch das Ergebnis der fertigen Rechnung oder runden 58 auf 0. Wer „kann stimmen“ einkreist, hält die Rechnung oft für richtig. Bei Minusaufgaben ziehen manche bei der Probe ab statt zu addieren.',
        words: '„Der Überschlag sagt nur, ob das Ergebnis in der richtigen Gegend liegt. Ob es genau stimmt, zeigt die Probe.“ „Mehr als 100 vom Überschlag entfernt? Dann kann es nicht stimmen.“',
        watch: 'Die Fehler sind die typischen der schriftlichen Rechnung: Übertrag vergessen, Entbündeln vergessen, kleinere von der größeren Ziffer abgezogen. Manche Fehler sind klein: Der Überschlag sagt dann „kann stimmen“, erst die Probe zeigt den Fehler. Auf genau diesen Moment kommt es in der Stunde an. Das leichtere Blatt hat vier Plusaufgaben und zwei Proben. Das Blatt für alle hat sechs Plus- und Minusaufgaben und drei Proben, das schwerere sechs mit vier Proben; für jede Probe hat das Blatt ein Rechenfeld mit Kästchen.',
      },
    },
    // ---------------------------------------------------------------- Formen und Daten, Klasse 3
    '3:circles-with-compass': {
      title: 'Mit dem Zirkel zeichnen: Kreise und Kreismuster',
      objective: 'Die Kinder zeichnen mit dem Zirkel Kreise um einen Mittelpunkt M mit gegebenem Radius oder Durchmesser, drei Kreise um einen Punkt (Zielscheibe mit den Radien 2, 3 und 4 cm) und zeichnen eine Blume aus gleich großen Kreisen nach Vorlage fertig.',
      routine: 'Tag 1, Zirkelführerschein: Die Kinder üben auf Schmierpapier, den Zirkel nur oben am Griff zu drehen und die Spitze leicht einzustechen. Dann stellen sie am Lineal 3 cm ein und zeichnen fünf Kreise um denselben Punkt, bis sich jeder Kreis sauber schließt. Tag 2: Jedes Kind zeichnet eine eigene Blume mit größerem Radius und malt die Blütenblätter aus.',
      note: {
        mistake: 'Der Zirkel geht beim Zeichnen auf, die Spitze rutscht, oder das Kind misst den Radius ab dem Rand des Lineals statt ab der 0. Steht der Durchmesser da, wird der Kreis oft doppelt so groß. Bei der Blume sticht manches Kind neben dem Schnittpunkt ein.',
        words: '„Zirkelspitze auf die 0, Mine auf die Zahl.“ „Der Durchmesser geht durch M von Rand zu Rand, der Radius ist halb so lang.“ „Bei der Blume bleibt der Radius gleich: Stich dort ein, wo zwei Kreise sich treffen.“',
        watch: 'Drucke in tatsächlicher Größe (100 %, nicht „An Seite anpassen“) und miss vor dem Kopieren einen Kreis der Blume nach: Er hat 3 cm Durchmesser. Auf dem leichteren Blatt stehen Radien (2 und 3 cm), von der Zielscheibe ist der erste Kreis schon gezeichnet, und bei der Blume sind drei Kreise und alle Einstichpunkte da. Auf dem Blatt für alle steht bei einem Kreis der Durchmesser (4 cm), die Blume hat zwei Kreise und einen Punkt. Das schwerere gibt zwei Durchmesser (6 und 4 cm) und einen Kreis der Blume.',
      },
    },
    '3:scaled-graphs#diagramme-genau-lesen': {
      title: 'Diagramme genau lesen: Was stimmt, was nicht?',
      objective: 'Die Kinder lesen ein Bilddiagramm und Säulendiagramme zum Lieblingssport, entscheiden bei Aussagen „stimmt“, „stimmt nicht“ oder „kann man nicht ablesen“ und erklären, warum ein Diagramm, dessen Achse erst bei 10 oder 20 beginnt, die Unterschiede größer aussehen lässt.',
      routine: 'Tag 1: Macht eine Umfrage zum Lieblingssport eurer Klasse mit Strichliste an der Tafel. Alle zeichnen zu zweit zwei Säulendiagramme derselben Zahlen ins Heft: eines mit der Achse ab 0, eines ab kurz unter dem kleinsten Wert; zwei Paare zeichnen sie zusätzlich groß auf Plakate. Tag 2: Die Plakate hängen nebeneinander; die Klasse sammelt Sätze, die stimmen, die nicht stimmen und die man nicht ablesen kann.',
      note: {
        mistake: 'Im Bilddiagramm zählen viele die Bilder statt der Kinder (3 Bilder, also 3 Kinder). „Lena mag Tennis am liebsten“ wird als „stimmt nicht“ eingekreist, obwohl man es nicht ablesen kann. Im zweiten Säulendiagramm lesen Kinder die Höhen, als begänne die Achse bei 0.',
        words: '„Woher weißt du das? Steht das im Diagramm?“ „Wo beginnt die Achse? Was ist mit dem unteren Stück passiert?“ „Wie viele Kinder bedeutet ein Bild?“',
        watch: 'Das leichtere Blatt hat ein Bilddiagramm, bei dem ein Bild 5 Kinder bedeutet; das Kind schreibt zuerst die Zahlen auf. Das Blatt für alle zeigt dieselbe Umfrage zweimal: in Diagramm 1 ab 0 in Fünferschritten, in Diagramm 2 ab 10, darunter die Frage „Warum sehen die Säulen in Diagramm 2 so verschieden hoch aus?“. Auf dem schwereren geht Diagramm 1 in Zehnerschritten und manche Werte liegen zwischen zwei Linien, Diagramm 2 beginnt bei 20.',
      },
    },
    '3:count-all-possibilities': {
      title: 'Alle Möglichkeiten finden: Tabelle und Baumdiagramm',
      objective: 'Die Kinder finden bei kleinen Kombinationsaufgaben alle Möglichkeiten durch geordnetes Vorgehen, mit Tabelle, geordneter Liste und Baumdiagramm, zählen sie und schreiben zur Tabelle der T-Shirts und Hosen die passende Malaufgabe.',
      routine: 'Tag 1: Drei Kinder stellen sich vor der Klasse in eine Reihe; die Klasse sagt, wie sie sich umstellen sollen, und du notierst jede neue Reihe an der Tafel, bis keine mehr kommt. Tag 2: Paare legen mit ausgeschnittenen Papier-T-Shirts in drei Farben (je zwei) und Hosen in zwei Farben (je drei) alle Möglichkeiten auf den Tisch, kleben sie geordnet auf und schreiben die Malaufgabe dazu.',
      note: {
        mistake: 'Ohne Ordnung fehlen Möglichkeiten oder kommen doppelt. Im Baumdiagramm hängen Kinder die nächsten Äste nur an den ersten Zweig. Bei der Reihe aus drei Kindern zählen viele nur drei Möglichkeiten, bei der Malaufgabe schreiben manche 3 + 2.',
        words: '„Halte erst ein T-Shirt fest und probiere alle Hosen dazu. Dann das nächste T-Shirt.“ „Gehen von jedem Ast gleich viele Zweige ab?“ „Wer kann vorne stehen? Und wer dann in der Mitte?“',
        watch: 'Das leichtere Blatt hat eine Tabelle mit 3 T-Shirts und 2 Hosen, in der ein Feld schon angemalt ist, eine Worttabelle (etwa Brötchen hell oder dunkel mit drei Belägen) und ein Baumdiagramm mit drei Stufen, dessen erster Ast schon steht. Das Blatt für alle hat 3 T-Shirts und 3 Hosen, eine Liste mit zwei vorgegebenen Zeilen und den Baum. Auf dem schwereren ist kein Feld angemalt, vom Baum steht nur ein Ast (die Enden sind als Punkte markiert), und drei Kinder stellen sich in eine Reihe. Jede Aufgabe hat genau eine Anzahl.',
      },
    },
    // ---------------------------------------------------------------- neue Einheit: halbschriftlich plus und minus bis 1000
    '3:mental-math-hundreds-tens': {
      title: 'Rechnen mit Hunderter- und Zehnerzahlen',
      objective: 'Die Kinder rechnen Plus- und Minusaufgaben mit Hunderter- und Zehnerzahlen bis 1000 im Kopf, indem sie die kleine Aufgabe nutzen (3 + 4 = 7, also 300 + 400 = 700), auch über den Hunderter, und ergänzen zum nächsten Hunderter und bis 1000.',
      note: {
        mistake: 'Viele rechnen an der falschen Stelle (540 − 30 = 240) oder schreiben bei 380 + 50 die 13 Zehner einfach hinter die 3 (3130). Beim Ergänzen bis zum Hunderter schreiben manche den ganzen Hunderter oder nur eine Ziffer ins Kästchen. Bis 1000 in zwei Schritten vergessen sie, die Schritte zusammenzuzählen.',
        words: '„380 sind 38 Zehner. 38 Zehner und 5 Zehner sind 43 Zehner.“ Im Stellenwert-Labor (mit Hunderterstelle) legst du 3 Hunderter und 8 Zehner und tippst fünfmal auf „Einen Zehner dazulegen“: In der Zehnerspalte liegen 13 Zehner. „Hunderter bündeln!“ macht daraus einen Hunderter mehr. „Was hat sich geändert, was nicht?“',
        watch: 'Das leichtere Blatt stellt die kleine Aufgabe neben die große: erst Hunderterzahlen, dann Zehnerzahlen ohne Übergang, unten ergänzen bis zum nächsten Hunderter. Das Blatt für alle hat dazu einen Block „Zehnerzahlen über den Hunderter“ und ergänzt auch bis 1000. Auf dem schwereren steht keine kleine Aufgabe mehr, das Kind denkt sie sich; unten ergänzt es in zwei Schritten bis 1000. Ein Kind, das die kleine Aufgabe laut sagt, bevor es schreibt, rechnet sicher.',
      },
    },
    '1:open-number-line#halbschriftlich-addieren': {
      title: 'Halbschriftlich addieren: den Rechenweg aufschreiben und erklären',
      objective: 'Die Kinder addieren dreistellige Zahlen bis 1000 schrittweise (erst die Hunderter, dann die Zehner, dann die Einer der zweiten Zahl), zeichnen die Sprünge am Rechenstrich, schreiben jeden Schritt als Aufgabe auf und erklären den Weg so, dass ein anderes Kind ihn nachrechnen kann.',
      note: {
        mistake: 'Manche rechnen Stellenwerte extra (300 + 100, 50 + 60, 1 + 2): Das ist ein richtiger Weg, passt aber nicht zu den Sprüngen am Rechenstrich; lass die Aufgabe dann noch einmal schrittweise ab der ersten Zahl rechnen. Beim Übergang rechnen viele 451 + 60 = 4111 oder 411. Die Erklärung nennt oft nur das Ergebnis.',
        words: '„Wo landest du nach dem Hundertersprung? Schreib die Zahl an den Strich.“ Am Rechenstrich (Zahlenraum 1000) lässt sich die Startzahl nur in Hunderterschritten einstellen: Zeige den Weg an einer Aufgabe wie 400 + 263. Sprung +200, dann schaltest du „Hilf mir, auf glatten Zahlen zu landen“ aus und ziehst +60 und +3; geht ein Sprung daneben, nimmst du ihn zurück. An jedem Bogen steht der Sprung. Rechne danach an der Tafel eine Aufgabe mit Übergang vom Blatt vor: 351 + 162 über 451 und 511 zu 513.',
        watch: 'Jede Aufgabe hat einen leeren Rechenstrich und drei Zeilen für die Schritte. Das leichtere Blatt hat vier Aufgaben ohne Übergang, die Zeilen heißen „Hunderter dazu, Zehner dazu, Einer dazu“, und die Erklärung beginnt mit „Zuerst habe ich, Dann habe ich, Zum Schluss habe ich“. Auf dem Blatt für alle geht ein Schritt über den Hunderter oder Zehner, die Zeilen sind leer. Auf dem schwereren gibt es zwei Übergänge, und eine Summe kann genau 1000 sein. Unter „Nachgerechnet von“ unterschreibt das Kind, das den Weg nachrechnet.',
      },
    },
    '1:open-number-line#halbschriftlich-subtrahieren': {
      title: 'Halbschriftlich subtrahieren: abziehen oder ergänzen?',
      objective: 'Die Kinder subtrahieren dreistellige Zahlen bis 1000 in Schritten, entscheiden vor dem Rechnen zwischen Abziehen und Ergänzen und ergänzen, wenn die Zahlen nah beieinanderliegen (503 − 497).',
      note: {
        mistake: 'Beim Ergänzen schreiben viele die letzte Landezahl als Ergebnis statt der Summe aller Sprünge. Manche beginnen beim Ergänzen an der ersten statt an der zweiten Zahl. Beim Abziehen rechnen manche nur mit den Hundertern (637 − 314: 600 − 300 = 300) und vergessen den Rest der ersten Zahl.',
        words: '„Liegen die Zahlen nah beieinander? Dann geh von der kleineren Zahl bis zur größeren. Das Ergebnis sind alle Sprünge zusammen.“ Am Rechenstrich (Zahlenraum 1000) geht die Startzahl in Hunderterschritten: Rechne dort 700 − 386 abziehend (−300, dann ohne „Hilf mir, auf glatten Zahlen zu landen“ −80 und −6) und zeichne den Weg mit Ergänzen (386 + 4 + 10 + 300) daneben an die Tafel.',
        watch: 'Auf dem leichteren Blatt steht bei Aufgabe 1 und 2 der Weg und sein erster Schritt (etwa „Ergänze: 791 + 9 = 800“); Aufgabe 3 rechnet das Kind auf beiden Wegen. Auf dem Blatt für alle kreuzt es vor dem Rechnen „Ich ziehe ab“ oder „Ich ergänze“ an, und vier Aufgaben entscheidet es nur, ohne zu rechnen. Auf dem schwereren gehen zwei Schritte über einen Zehner oder Hunderter, und nach „Welcher Weg war hier geschickter?“ steht „Warum?“. Beide Wege sind richtig; die Frage nach dem geschickteren Weg hat keine falsche Antwort.',
      },
    },
    '3:magic-squares': {
      title: 'Zauberquadrate',
      objective: 'Die Kinder ergänzen Zauberquadrate aus 3 × 3 Feldern, in denen jede Zeile und jede Spalte die magische Zahl 15 ergibt, und überlegen, mit welchem Feld sie am besten anfangen.',
      routine: 'Tag 1: Paare legen mit Ziffernkarten von 1 bis 9 auf ein gezeichnetes 3 × 3-Feld ein Zauberquadrat, in dem jede Zeile und Spalte 15 ergibt; die Klasse vergleicht: Es gibt mehrere Lösungen. Tag 2: Jedes Paar schreibt sein Quadrat ab und zählt zu jeder Zahl 100 dazu oder nimmt jede Zahl mal 10. Ist es noch ein Zauberquadrat? Welche magische Zahl hat es jetzt?',
      note: {
        mistake: 'Viele fangen dort an, wo zwei Felder fehlen, und raten. Andere prüfen nur die Zeilen, nicht die Spalten, oder setzen eine Zahl ein, die die Zeile stimmen lässt, aber die Spalte nicht.',
        words: '„Wo fehlt in einer Zeile oder Spalte nur ein Feld? Fang dort an.“ „Wie viel fehlt noch bis 15?“ „Prüfe jede Zeile und jede Spalte, bevor du fertig bist.“',
        watch: 'Jedes Blatt hat zwei Quadrate mit vier freien Feldern, die magische Zahl 15 steht im Kreis daneben, und jedes Quadrat hat nur eine Lösung. Ein leichteres und ein schwereres Blatt gibt es in dieser Stunde nicht. Das Blatt heißt „Magische Quadrate“ und sagt „Reihe“ für die Zeile: Sag den Kindern, dass Zauberquadrat und magisches Quadrat, Zeile und Reihe hier dasselbe meinen. Der Zahlenraum bis 1000 kommt erst mit der Übung am zweiten Tag dazu.',
      },
    },
    // ---------------------------------------------------------------- neue Einheit: Längen und Geld
    '2:measure-with-ruler#millimeter': {
      title: 'Millimeter: genau messen und zeichnen',
      objective: 'Die Kinder messen gedruckte Strecken und kleine Dinge in Originalgröße auf den Millimeter genau, schreiben die Länge auf zwei Arten (4 cm 7 mm = 47 mm) und zeichnen Strecken mit gegebener Länge ab einem Punkt.',
      note: {
        mistake: 'Viele legen das Lineal mit der Kante statt mit der 0 an oder beginnen bei 1. Aus 4 cm 7 mm wird 47 cm, 407 mm oder 4,7 mm. Beim Zeichnen ab dem Punkt verrutscht das Lineal.',
        words: '„Von einer Zentimeterzahl bis zur nächsten sind es 10 kleine Abstände: Jeder ist 1 Millimeter.“ „4 cm sind 40 mm, dazu 7 mm.“ Am Lineal ziehst du den Endgriff Millimeter für Millimeter; schalte „Länge anzeigen“ aus, dann lesen die Kinder die Striche selbst ab.',
        watch: 'Drucke in tatsächlicher Größe (100 %, nicht „An Seite anpassen“) und lege vor dem Kopieren ein Lineal an das gedruckte 10-cm-Lineal oben auf dem Blatt: Es muss genau 10 cm lang sein. Das leichtere Blatt hat vier Strecken, zwei Dinge und vier Strecken zum Zeichnen in cm und mm. Das Blatt für alle hat vier Dinge (Radiergummi, kurzer Bleistift, Schraube, Büroklammer) und Strecken zum Zeichnen auch nur in mm (etwa 83 mm). Das schwerere fragt, wie viel länger die längste Strecke als die kürzeste ist, und eine Strecke ist länger als 10 cm: Dafür braucht das Kind ein langes Lineal.',
      },
    },
    '3:kilometres-and-metres': {
      title: 'Meter und Kilometer: Wie weit ist ein Kilometer?',
      objective: 'Die Kinder addieren Wege auf einem Ortsplan in Metern, ergänzen bis 1 km (1 km = 1000 m) und ordnen Alltagsstrecken den Karten „etwa 100 m“, „etwa 1 km“ und „viele Kilometer“ zu; auf dem schwereren Blatt finden sie auch den kürzeren von zwei Wegen.',
      routine: 'Tag 1: Messt auf dem Schulhof mit dem Maßband 100 m ab (zehnmal 10 m), markiert Anfang und Ende mit Kreide und geht die Strecke zusammen. Wie oft müsstet ihr sie gehen, bis es 1 km ist? Tag 2: Geht einen Weg von etwa 1 km rund um die Schule (vorher abgemessen) und stoppt die Zeit. Wie lange habt ihr gebraucht?',
      note: {
        mistake: 'Viele denken, 1 km seien 100 m, oder ergänzen 950 m + 150 m = 1 km. Auf dem Plan lesen sie die Länge eines anderen Weges ab, weil die Schilder zwischen zwei Orten stehen. Bei den Karten halten manche „eine Viertelstunde zu Fuß“ für etwa 100 m.',
        words: '„1 km sind 1000 m. Wie oft passt unser 100-m-Weg hinein?“ „Von welchem Ort zu welchem Ort führt dieser Weg? Folge ihm mit dem Finger.“',
        watch: 'Der Plan zeigt fünf Orte (Schule, Bäckerei, Spielplatz, Schwimmbad, Bahnhof) mit Metern an jedem Weg. Auf dem leichteren Blatt sind die Wege Fünfzigerzahlen, das Kind rechnet vier Wege aus zwei Teilen und ergänzt viermal bis 1 km. Auf dem Blatt für alle sind es Zehnerzahlen. Auf dem schwereren hat jeder Weg drei Teile, dazu kommt „Welcher Weg ist kürzer?“ mit beiden Rechnungen und wie viel bis 1 km fehlt. Bei den Karten zählt die Größenordnung, nicht die genaue Zahl: Lass die Kinder ihre Zuordnung mit dem 100-m-Weg vom Schulhof und dem Kilometerweg begründen.',
      },
    },
    '3:comma-notation-money-length': {
      title: 'Mit Komma schreiben: Euro und Cent, Meter und Zentimeter',
      objective: 'Die Kinder schreiben Geldbeträge und am Maßband abgelesene Längen auf drei Arten (3 € 50 ct = 350 ct = 3,50 €; 1 m 25 cm = 125 cm = 1,25 m) und wandeln zwischen den Schreibweisen um, auch mit einer Null nach dem Komma (4 € 5 ct = 4,05 €).',
      note: {
        mistake: 'Viele schreiben 4 € 5 ct als 4,5 € oder 4,50 €, 506 cm als 5,6 m und 5,06 m als 56 cm. Beim Maßband lesen manche die beschriftete Zahl vor dem Pfeil statt der Stelle des Pfeils ab.',
        words: '„Nach dem Komma stehen immer zwei Ziffern: die Cent, bei Längen die Zentimeter.“ „5 Cent: Nach dem Komma brauchst du zwei Ziffern, also 05. Das sind 4,05 €.“ In „Die Geldmatte“ wählst du „Größere Preise“, tippst auf das Preisschild und stellst mit + und − einen Preis wie 4,05 € ein (ab 1 € zeigt das Schild den Betrag mit Komma); ein Kind zahlt passend, die Klasse schreibt den Betrag auf drei Arten.',
        watch: 'Oben liegen vier Geldbeträge aus Münzen (auf dem schwereren Blatt auch mit einem 5-€-Schein), darunter vier Maßbänder mit Pfeil; jede Angabe kommt in drei Spalten. Auf dem leichteren Blatt sind die Geldbeträge glatte Zehnerbeträge (wie 3,70 €), direkt nach dem Komma steht nie eine Null, dazu acht Umwandlungen. Das Blatt für alle hat je einen Betrag und eine Länge mit Null direkt nach dem Komma und zwölf Umwandlungen. Auf dem schwereren sind es je zwei, und die Schreibweisen sind gemischt (5,56 € = ☐ € ☐ ct). Das Blatt trägt den Titel „Mit Komma schreiben: Geld und Längen“.',
      },
    },
    '3:estimate-by-rounding#ueberschlagen-beim-einkaufen': {
      title: 'Überschlagen beim Einkaufen: Reicht das Geld?',
      objective: 'Die Kinder runden Preise auf ganze Euro (ab 50 Cent auf, sonst ab), überschlagen einen Einkauf, entscheiden, ob 10 € oder 20 € reichen, und prüfen mit dem Überschlag, ob die Summe auf einem Kassenzettel stimmen kann.',
      routine: 'Tag 1: Jedes Paar bekommt einen Supermarkt-Prospekt, stellt einen Einkaufszettel mit vier Dingen für ein Klassenpicknick zusammen, rundet jeden Preis und prüft, ob 20 € reichen. Tag 2: Die Paare tauschen ihre Zettel; das andere Paar rechnet den genauen Preis aus (Euro und Cent getrennt oder ganz in Cent) und vergleicht ihn mit dem Überschlag.',
      note: {
        mistake: 'Viele schneiden die Cent einfach ab (6,84 € wird 6 €) oder runden 0,63 € auf 0 €. Andere rechnen doch genau statt zu überschlagen. „Kann stimmen“ verstehen manche als „stimmt“.',
        words: '„Schau nur auf die Cent: 50 oder mehr? Dann rundest du auf.“ „Der Überschlag liegt nah an der Summe, aber nicht genau. Ist die Summe mehr als 2 € davon entfernt, kann sie nicht stimmen.“',
        watch: 'Oben steht die Regel „So überschlägst du“. Kein Preis endet auf ,00 oder ,50, und jede Entscheidung ist eindeutig. Das leichtere Blatt hat vier Einkaufszettel mit je drei Preisen und 10 € sowie einen Kassenzettel. Auf dem Blatt für alle hat das Kind bei drei Preisen 10 €, bei vier Preisen 20 €, und es prüft zwei Kassenzettel. Auf dem schwereren hat jeder Zettel vier Preise, und bei den Kassenzetteln begründet das Kind. Ein Kassenzettel mit falscher Summe ist ein Rechenrätsel: Eine echte Kasse rechnet richtig, aber ein Ding kann doppelt gescannt oder falsch eingetippt sein: Auch dann zeigt der Überschlag, dass etwas nicht stimmt.',
      },
    },
  },
};
