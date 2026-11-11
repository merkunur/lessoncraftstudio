'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik Klasse 1 (Daily Teaching System, Part 4.5). Geschrieben aus dem, was die
 * deutschen Arbeitsblätter jeder Stunde DRUCKEN (scripts/units/author-sheet.js --loc=de), für den Unterricht in
 * Deutschland: Euro und Cent, „halb drei“, Zahlwörter mit den Einern zuerst. Keine Übersetzung der englischen Hinweise.
 */
module.exports = {
  loc: 'de',
  points: {
    '1:add-within-10-models': {
      title: 'Zwei Gruppen zusammenzählen',
      objective: 'Die Kinder legen zwei Gruppen mit zusammen höchstens 10 Dingen zusammen, zählen, wie viele es insgesamt sind, und schreiben die Summe als Zahl auf.',
      note: {
        mistake: 'Viele Kinder zählen die erste Gruppe, fangen bei der zweiten wieder bei 1 an und schreiben diese zweite Zahl als Ergebnis auf. Andere zählen ein Bild doppelt oder lassen eines aus.',
        words: 'Frage: „Wie viele sind es hier? Wie viele dort? Wie viele sind es zusammen?“ Zeige auf die Zeichen und sprich „plus“ und „gleich“; „gleich“ heißt „ist genauso viel wie“. Für das Ergebnis sag „zusammen“ und „insgesamt“.',
        watch: 'Achte darauf, wer beim Zählen jedes Bild genau einmal antippt. Ein Kind, das die erste Zahl nennt und von dort weiterzählt („vier … fünf, sechs“), ist bereit für das schwierigere Arbeitsblatt.',
      },
    },
    '1:subtract-cross-out': {
      title: 'Wegnehmen: Wie viele bleiben übrig?',
      objective: 'Die Kinder sehen eine Gruppe von höchstens 10 Bildern, von denen einige durchgestrichen sind, zählen, wie viele übrig bleiben, und schreiben diese Zahl auf.',
      note: {
        mistake: 'Die Kinder zählen die durchgestrichenen Bilder statt der übrigen, oder sie zählen alle Bilder, durchgestrichen oder nicht, und schreiben die Zahl auf, mit der es angefangen hat.',
        words: 'Sag: „Am Anfang sind es sechs. Zwei gehen weg. Wie viele bleiben übrig?“ Lies 6 − 2 zuerst als „sechs, zwei weg“, dann als „sechs minus zwei“.',
        watch: 'Lass jedes Kind vor dem Schreiben auf die Bilder zeigen, die übrig sind. Wer unsicher ist, spielt die Aufgabe erst mit Plättchen: sechs hinlegen, zwei wegschieben, die übrigen zählen.',
      },
    },
    '1:make-10': {
      title: 'Verliebte Zahlen: zusammen 10',
      objective: 'Die Kinder finden zu einer Zahl die Partnerzahl, mit der sie zusammen 10 ergibt, und kennen die Zahlenpaare der 10.',
      note: {
        mistake: 'Die Kinder wissen 5 + 5 und 9 + 1, zählen bei den anderen Paaren aber die leeren Felder einzeln ab oder zählen mit den Fingern bis 10 weiter. Viele sehen nicht, dass 3 + 7 und 7 + 3 dasselbe Zahlenpaar sind.',
        words: 'Frage: „Welche Zahl passt zu 6, damit es 10 sind?“ Nenne die beiden Zahlen „verliebte Zahlen“ oder „Partnerzahlen der 10“. Am Zehnerfeld: „Sechs Felder sind voll. Wie viele sind noch leer?“ Für 3 + 7 und 7 + 3 sag „Tauschaufgabe“.',
        watch: 'Wer liest die Antwort an den leeren Feldern ab, ohne die vollen noch einmal zu zählen? Diese Kinder gehen weiter zum Rechenlabyrinth; die anderen bleiben beim Zehnerfeld.',
      },
    },
    '1:count-on-back-hops': {
      title: 'Am Zahlenstrahl vorwärts und rückwärts hüpfen',
      objective: 'Die Kinder rechnen plus, indem sie am Zahlenstrahl vorwärts hüpfen, und minus, indem sie rückwärts hüpfen; sie starten bei der ersten Zahl.',
      note: {
        mistake: 'Die Kinder zählen die Startzahl als ersten Hüpfer mit, deshalb landen sie bei 5 + 3 auf der 7. Beim Rückwärtszählen landen sie aus demselben Grund eine Zahl zu hoch.',
        words: 'Sag: „Lege den Finger auf die 5 und sage fünf. Jetzt hüpfe dreimal und zähle beim Landen: sechs, sieben, acht.“ Sag „vorwärts hüpfen“ für plus und „rückwärts hüpfen“ für minus.',
        watch: 'Achte auf den ersten Hüpfer. Wer die Startzahl beim Loshüpfen mitspricht, landet eine Zahl zu kurz. Lass das Kind jeden Hüpfer als Bogen zeichnen und die Bögen zählen, nicht die Striche: drei Bögen für + 3. Das Hüpfen in Einerschritten ist nur eine Brücke: Wer sicher ist, macht aus drei kleinen Hüpfern einen großen Sprung („von der 5 drei weiter zur 8“).',
      },
    },
    '1:fact-families': {
      title: 'Aufgabenfamilien bis 10',
      objective: 'Die Kinder schreiben zu drei Zahlen, die zusammengehören, die zwei Plusaufgaben und die zwei Minusaufgaben auf.',
      note: {
        mistake: 'Die Kinder schreiben 3 + 7 = 10 und 7 + 3 = 10 leicht hin, dann aber 3 − 7 = 10 oder 7 − 10 = 3: Sie schieben die Zahlen herum und überlegen nicht, welche das Ganze ist.',
        words: 'Frage: „Welche Zahl ist das Ganze? Welche zwei sind die Teile?“ Dann: „Die Teile zusammen ergeben das Ganze. Das Ganze minus ein Teil ergibt den anderen Teil.“ Nenne 3 + 7 und 7 + 3 „Tauschaufgaben“ und 10 − 7 die „Umkehraufgabe“.',
        watch: 'Prüfe, ob jede Minusaufgabe mit dem Ganzen beginnt. Wenn nicht, lege das Ganze mit Plättchen, decke einen Teil ab und frage, was übrig bleibt.',
      },
    },
    '1:missing-number-equations': {
      title: 'Platzhalteraufgaben: Welche Zahl fehlt?',
      objective: 'Die Kinder finden in einer Plus- oder Minusaufgabe bis 10 die Zahl, die im Kästchen fehlt, an jeder Stelle der Aufgabe.',
      note: {
        mistake: 'Die Kinder rechnen die beiden Zahlen zusammen, die sie sehen: Bei 4 + □ = 9 schreiben sie 13. Bei □ − 3 = 5 schreiben viele 2.',
        words: 'Lies das Kästchen als „wie viel“: „Vier plus wie viel ist neun?“ Lies das Gleichheitszeichen als „ist genauso viel wie“.',
        watch: 'Lass das Kind die fertige Aufgabe laut vorlesen und sagen, ob sie stimmt. Ein Kind, das mit den Fingern von 4 bis 9 weiterzählt, hat die Idee verstanden.',
      },
    },
    '1:word-problems': {
      title: 'Rechengeschichten bis 10',
      objective: 'Die Kinder lösen Rechengeschichten zum Dazukommen und Weggehen bis 10 und sagen oder schreiben die Aufgabe, die zur Geschichte passt.',
      note: {
        mistake: 'Die Kinder suchen die zwei Zahlen heraus und zählen sie zusammen, egal was die Geschichte erzählt, oder sie achten nur auf ein Wort wie „mehr“ und wählen danach das Rechenzeichen.',
        words: 'Frage: „Was passiert in der Geschichte? Kommt etwas dazu oder geht etwas weg?“ Lass das Kind die Geschichte nacherzählen, bevor eine Zahl geschrieben wird. Dann: „Schreibe die Aufgabe, die die Geschichte erzählt.“ Das Arbeitsblatt hat nur ein Kästchen für die Antwort; die Aufgabe schreiben die Kinder neben das Bild.',
        watch: 'Lies die Geschichten vor, solange die Kinder noch nicht sicher lesen, und höre beim Nacherzählen zu. Ein Kind, das die Geschichte mit Plättchen spielen kann und trotzdem das falsche Zeichen schreibt, braucht die Verbindung von der Handlung zum Zeichen, nicht noch mehr Zählen.',
      },
    },
    '1:fluency-within-20': {
      title: 'Kopfrechnen bis 10',
      objective: 'Die Kinder rechnen plus und minus bis 10, ohne jedes Mal zu zählen: Sie nutzen Aufgaben, die sie auswendig wissen, und leiten andere davon ab.',
      note: {
        mistake: 'Die Kinder zählen bei jeder Aufgabe alles von 1 an ab, sogar bei 5 + 1 oder 4 + 4, weil Zählen bisher immer zum richtigen Ergebnis geführt hat. Wenn es schnell gehen soll, hören sie auf zu zählen und raten.',
        words: 'Frage: „Welche Aufgaben weißt du einfach? Welche kannst du dir aus einer Aufgabe herleiten, die du weißt?“ Zum Beispiel: „Ich weiß 4 + 4, dann ist 4 + 5 eins mehr. Das ist die Nachbaraufgabe.“',
        watch: 'Notiere, bei welchen Aufgaben ein Kind noch zählt. Wer die meisten zählt, bekommt das leichtere Arbeitsblatt zum Üben; schreibe die Aufgaben in die Klassenliste, damit du weißt, worauf du zurückkommst. Dieses Arbeitsblatt wird nicht auf Zeit gerechnet.',
      },
    },
    '1:doubles-halves': {
      title: 'Verdoppeln und Halbieren',
      objective: 'Die Kinder verdoppeln eine Gruppe von Bildern und teilen eine gerade Anzahl in zwei gleiche Hälften; sie schreiben die Zahlen dazu.',
      note: {
        mistake: 'Die Kinder meinen, Verdoppeln heißt 2 dazu: Das Doppelte von 6 wird 8. Beim Halbieren nehmen sie etwas weg und prüfen nicht, ob beide Teile gleich sind: Die Hälfte von 10 wird 4 und 6.',
        words: 'Sag: „Das Doppelte heißt: dasselbe noch einmal. Sechs und noch einmal sechs.“ Mit beiden Händen: „Zeige mir 4 an jeder Hand.“ Zur Hälfte: „Halbieren heißt: zwei GLEICHE Teile. Eins für dich, eins für mich, bis nichts mehr da ist. Sind beide Teile gleich?“',
        watch: 'Wer weiß die Verdopplungen bis 5 + 5 auswendig, und wer zählt noch jedes Bild? Das Arbeitsblatt geht bis 7 + 7. Kinder, die zählen, zeigen die Verdopplungen bis 5 + 5 mit beiden Händen und legen die größeren mit Plättchen in zwei gleich langen Reihen im Zwanzigerfeld; dazu sprechen sie: „6 und 6 ist 12.“ Beim Halbieren müssen die beiden Zahlen, die ein Kind aufschreibt, gleich sein.',
      },
    },
    '1:odd-even-pairs': {
      title: 'Gerade und ungerade Zahlen',
      objective: 'Die Kinder zählen eine Menge in Paaren oder teilen sie abwechselnd an zwei Kinder aus und sagen, ob die Anzahl gerade oder ungerade ist.',
      note: {
        mistake: 'Die Kinder entscheiden danach, wie die Zahl aussieht („11 ist gerade, weil sie zwei Einsen hat“), und lassen das Paaren weg. Beim Verteilen an zwei Kinder vergessen sie, das übrige Bild aufzuschreiben, oder geben es einem der beiden Kinder.',
        words: 'Frage: „Können zwei Kinder gerecht teilen? Bleibt eins übrig?“ Sag: „Bei geraden Zahlen geht es auf. Bei ungeraden Zahlen bleibt eins übrig.“ Verbinde es mit dem Verdoppeln: „8 ist 4 und 4. Jede gerade Zahl ist das Doppelte einer Zahl.“ Beim Einkreisen zählen die Kinder in Zweierschritten: „2, 4, 6 … und eins dazu sind 7.“',
        watch: 'Achte darauf, wer die Regel an der Einerstelle entdeckt: Zahlen mit 0, 2, 4, 6 oder 8 am Ende sind gerade. Lass die Kinder die Regel an ihren eigenen Arbeitsblättern finden, bevor du sie aussprichst.',
      },
    },
    '1:add-three-addends': {
      title: 'Drei Gruppen addieren',
      objective: 'Die Kinder addieren drei Gruppen von Bildern und schreiben das Ergebnis auf; im Gespräch lernen sie, zuerst zwei Zahlen zusammenzurechnen, die gut zueinander passen.',
      note: {
        mistake: 'Die Kinder rechnen die ersten beiden Gruppen zusammen, schreiben diese Zahl auf und vergessen die dritte. Oder sie zählen jedes Bild von 1 an und nutzen nie eine Aufgabe, die sie wissen, etwa eine Verdopplung oder ein Paar, das 10 ergibt.',
        words: 'Sag: „Drei Gruppen. Rechne erst zwei zusammen, dann die dritte dazu.“ Frage: „Welche zwei passen gut zusammen? Siehst du ein Doppeltes? Siehst du verliebte Zahlen?“ Zeige, dass man wählen darf: „4 + 3 + 6. Ich rechne zuerst 4 und 6. Das sind 10. Und 3 dazu sind 13.“',
        watch: 'Wer sucht zuerst ein passendes Paar? Lass dir von einem Kind sagen, welche zwei Zahlen es zuerst gerechnet hat und warum; die Begründung zählt mehr als die Schnelligkeit.',
      },
    },
    '1:number-walls': {
      title: 'Zahlenmauern',
      objective: 'Die Kinder füllen eine Zahlenmauer aus, in der jeder Stein die Summe der beiden Steine unter ihm ist, und finden einen fehlenden Grundstein.',
      note: {
        mistake: 'Die Kinder addieren zwei Steine, die nebeneinanderliegen, und schreiben die Summe daneben statt darüber. Fehlt ein Grundstein, rechnen sie die beiden sichtbaren Zahlen zusammen und fragen nicht, was fehlt.',
        words: 'Zeige mit zwei Fingern unter einen Stein: „Dieser Stein liegt auf diesen beiden. Er ist ihre Summe.“ Bei einem fehlenden Grundstein: „Die 7 liegt auf der 4 und auf welcher Zahl? Vier und wie viel sind sieben?“ Nenne die Steine „Grundsteine“ und „Deckstein“.',
        watch: 'Sieh dir die Mauern mit fehlendem Grundstein an. Ein Kind, das neben eine 4 unter einer 7 die 11 schreibt, hat wieder addiert. Frage: „Kann ein Stein unten größer sein als der Stein, der auf ihm liegt?“',
      },
    },
    '1:tens-and-ones': {
      title: 'Zehner und Einer',
      objective: 'Die Kinder lesen eine zweistellige Zahl ab, die mit Zehnerstangen und Einerwürfeln gelegt ist, und kreisen das Material ein, das zu einer Zahl passt.',
      note: {
        mistake: 'Die Kinder zählen jede Stange als 1, dann sind 3 Stangen und 4 Würfel 7. Oder sie schreiben die Ziffern in der Reihenfolge, in der man die Zahl spricht: Bei „vierunddreißig“ hören sie die Vier zuerst und schreiben 43. Solche Zahlendreher gehören im Deutschen zu den häufigsten Fehlern bei zweistelligen Zahlen.',
        words: 'Zähle die Stangen in Zehnerschritten und die Würfel einzeln: „10, 20, 30 … 31, 32, 33, 34.“ Sag: „3 Zehner und 4 Einer. Wir sprechen vierunddreißig: die Einer zuerst. Aber wir schreiben die Zehner zuerst: 3, dann 4.“ Frage: „Was bedeutet die 3 in 34?“ (Drei Zehner, also dreißig; nicht drei.)',
        watch: 'Achte auf den Wechsel vom Zählen in Zehnern zum Zählen in Einern; dort verzählen sich Kinder. Lass ein Kind, das Zahlendreher schreibt, erst die Zehner schreiben, dann die Einer, und die Zahl danach laut lesen. Prüfe Zahlen wie 40: Wer für vier Stangen nur 4 schreibt, hat die Null vergessen, die den Platz der Einer hält.',
      },
    },
    '1:number-words': {
      title: 'Zahlwörter bis zwanzig',
      objective: 'Die Kinder lesen die Zahlen bis 20 und ordnen jeder Zahl das passende Zahlwort zu.',
      note: {
        mistake: 'Die Kinder raten elf und zwölf, weil man in ihnen keine Zehn hört. Bei den Wörtern auf -zehn schauen sie nur auf den Anfang und verwechseln dreizehn und dreißig oder vierzehn und vierzig, sobald beide zur Auswahl stehen.',
        words: 'Sprich die Endung deutlich: „Vier-ZEHN ist ein Zehner und vier Einer.“ Frage: „Welche Zahl steckt vorn im Wort? Was sagt das Ende?“ Die Kinder unterstreichen die Endung, bevor sie einkreisen. Besprich die besonderen Wörter gemeinsam: elf, zwölf, sechzehn (ohne s), siebzehn (ohne en), zwanzig.',
        watch: 'Höre zu, wenn ein Kind die Auswahl laut liest. Wer bei vierzehn nur „vier“ liest, schaut auf den Wortanfang; decke den Anfang mit dem Finger ab und lies zuerst die Endung. Prüfe elf, zwölf und zwanzig: Sie lassen sich nicht aus kleinen Zahlwörtern zusammensetzen.',
      },
    },
    '1:compare-order-two-digit': {
      title: 'Zweistellige Zahlen vergleichen und ordnen',
      objective: 'Die Kinder vergleichen zwei zweistellige Zahlen mit den Zeichen für größer und kleiner und bringen drei Zahlen in die richtige Reihenfolge.',
      note: {
        mistake: 'Die Kinder vergleichen die Einer („29 ist mehr als 41, weil 9 mehr ist als 1“) oder rechnen die Ziffern zusammen. Auch die Zeichen werden verwechselt: Ein Kind weiß, welche Zahl größer ist, und kreist trotzdem das falsche Zeichen ein.',
        words: 'Sag: „Schau zuerst auf die Zehner. Mehr Zehner heißt: größere Zahl. Nur wenn die Zehner gleich sind, schaust du auf die Einer.“ Lies das Zeichen als Satz: „41 ist größer als 29.“ Die offene Seite des Zeichens zeigt zur größeren Zahl.',
        watch: 'Trenne zwei Fragen: Weiß das Kind, welche Zahl größer ist, und kennt es das Zeichen? Lass das Kind den ganzen Satz laut sagen, bevor es einkreist.',
      },
    },
    '1:number-of-the-day': {
      title: 'Zahl des Tages',
      objective: 'Die Kinder zeigen eine Zahl von 11 bis 19 auf mehrere Arten: als Zehner und Einer, im Zehnerfeld und als Strichliste.',
      note: {
        mistake: 'Die Kinder füllen jedes Kästchen als eigene Aufgabe aus und merken nicht, wenn zwei Kästchen sich widersprechen: 15 bei Zehnern und Einern, aber 14 Striche. Eine Zahl zwischen 11 und 19 wird als 1 und 5 geschrieben, ohne dass das Kind weiß, dass die 1 ein Zehner ist.',
        words: 'Frage, wenn das Arbeitsblatt fertig ist: „Zeigen alle deine Kästchen dieselbe Zahl? Beweise es.“ Sag: „Fünfzehn ist ein Zehner und fünf Einer. Zeige mir den Zehner in deinen Zehnerfeldern: ein volles Feld. Zeige mir den Zehner in deiner Strichliste: zwei Fünferbündel.“',
        watch: 'Nutze das Arbeitsblatt als schnellen Blick darauf, was jedes Kind kann: Welches Kästchen bleibt leer oder kommt zuletzt? Dieses Kästchen zeigt dir, was das Kind als Nächstes lernen muss.',
      },
    },
    '1:number-line-placement': {
      title: 'Zahlen am Zahlenstrahl finden',
      objective: 'Die Kinder lesen ab, auf welche Zahl ein Pfeil am Zahlenstrahl bis 20 und bis 30 zeigt, und zählen dazu von der nächsten gedruckten Zahl aus weiter.',
      note: {
        mistake: 'Die Kinder zählen die Striche und beginnen bei der Null mit „eins“, dann ist jede Antwort um 1 zu groß. Stehen nur wenige Zahlen da, zählen sie für jeden Pfeil von 0 an und verzählen sich unterwegs.',
        words: 'Sag: „Die Null ist der Anfang, nicht die Eins. Von Strich zu Strich ist es immer 1 mehr. Zähle die SPRÜNGE, nicht die Striche.“ Wenn nur wenige Zahlen dastehen: „Welche gedruckte Zahl ist dem Pfeil am nächsten? Fang dort an. Du darfst auch rückwärts zählen.“',
        watch: 'Wo beginnt ein Kind bei einem Pfeil auf der 18? Wer von der 20 zwei zurückzählt, nutzt den Zahlenstrahl; von 0 hochzählen geht auch, dauert aber lange. Eine Antwort, die um genau 1 danebenliegt, heißt: Das Kind hat Striche gezählt, nicht Sprünge. Zeichne die Sprünge als Bögen über den Strahl und zähle die Bögen.',
      },
    },
    '1:hundreds-chart': {
      title: 'Die Hundertertafel',
      objective: 'Die Kinder tragen fehlende Zahlen in die Hundertertafel ein und nutzen ihr Muster: nach rechts 1 mehr, nach unten 10 mehr.',
      note: {
        mistake: 'Die Kinder füllen eine Lücke, indem sie vom Anfang der Zeile oder von 1 an zählen. Auf einem Puzzleteil schreiben sie in das Kästchen darunter die nächste Zahl (35 unter die 34), weil sie nicht sehen, dass eine Zeile tiefer 10 dazukommt.',
        words: 'Fahre mit dem Finger eine Spalte hinunter und lies: „4, 14, 24, 34. Was bleibt gleich? Was ändert sich?“ Sag: „Nach rechts 1 mehr. Nach unten 10 mehr. Nach links 1 weniger. Nach oben 10 weniger.“',
        watch: 'Sieh dir auf einem Puzzleteil die Kästchen über und unter der gedruckten Zahl an. Ein Kind, das links und rechts richtig hat und oben und unten nicht, braucht die ganze Hundertertafel noch ein paar Tage neben dem Arbeitsblatt.',
      },
    },
    '1:one-ten-more-less': {
      title: '1 mehr, 1 weniger, 10 mehr, 10 weniger',
      objective: 'Die Kinder schreiben zu einer zweistelligen Zahl die Zahl, die 1 mehr und 1 weniger ist, und die Zahl, die 10 mehr und 10 weniger ist.',
      note: {
        mistake: 'Für 10 mehr zählen die Kinder zehn Einer mit den Fingern weiter und liegen oft um 1 daneben. Bei 10 weniger ändern sie die falsche Ziffer. 1 mehr als 29 wird 210 geschrieben, weil das Kind „neunundzwanzig, zehnundzwanzig“ weiterzählt.',
        words: 'Frage: „10 mehr als 34. Welche Ziffer ändert sich? Welche bleibt?“ Sag: „10 mehr ist ein ZEHNER mehr. Die Einer bleiben gleich.“ Nenne die Zahl, die 1 weniger ist, „Vorgänger“ und die Zahl, die 1 mehr ist, „Nachfolger“. An der Hundertertafel prüfen die Kinder erst, wenn die Antwort geschrieben ist.',
        watch: 'Wer zählt für 10 mehr noch in Einern? Prüfe die Zahlen am Zehnerübergang, etwa 1 mehr als 39 und 1 weniger als 40; sprich diese Zahlen gemeinsam, bevor geschrieben wird.',
      },
    },
    '1:skip-counting': {
      title: 'In Zehner-, Fünfer- und Zweierschritten zählen',
      objective: 'Die Kinder zählen in 10er-, 5er- und 2er-Schritten und schreiben die fehlenden Zahlen in jede Zahlenreihe.',
      note: {
        mistake: 'Die Kinder sagen die Reihe richtig auf und schreiben dann in die Lücke die nächste Zählzahl (10, 20, 21). In Zweierschritten rutschen sie nach einem Fehler auf die ungeraden Zahlen und merken es nicht.',
        words: 'Zähle mit der Klasse laut und halte an: „… 30, 40. Was kommt jetzt? Wie viel mehr ist das?“ Frage nach dem Muster: „Womit hören die Zahlen in Fünferschritten auf?“ (Mit 5 und 0.) „In Zehnerschritten?“ (Immer mit 0.) „In Zweierschritten?“ (Mit 0, 2, 4, 6 oder 8: die geraden Zahlen.)',
        watch: 'Wer prüft eine Reihe an ihrem Muster („das kann nicht stimmen, die Zahl hört mit 3 auf“)? Beginne manche Reihen mittendrin, bei 40 oder bei 15; ein Kind, das nur vom Anfang an zählen kann, hat einen Vers gelernt, kein Zählen. Drei Arbeitsblätter sind viel für einen Tag: erst Zehner und Fünfer, die Zweier am nächsten Tag.',
      },
    },
    '1:time-read': {
      title: 'Die Uhr lesen: volle und halbe Stunden',
      objective: 'Die Kinder lesen an der Uhr volle und halbe Stunden ab und wählen die passende Uhrzeit aus.',
      note: {
        mistake: 'Die Kinder verwechseln die beiden Zeiger und lesen 6 Uhr als halb eins. Bei der halben Stunde ist „halb drei“ die Falle: Die Kinder hören „drei“ und halten es für 3:30 Uhr. Halb drei ist aber 2:30 Uhr, die halbe Stunde VOR drei.',
        words: 'Sag: „Der kurze Zeiger zeigt die Stunde. Lies ihn zuerst.“ Bei halb: „Der kurze Zeiger ist auf dem Weg von der 2 zur 3. Die Hälfte des Weges ist geschafft: Es ist halb drei.“ Sag beide Formen: „halb drei“ und „zwei Uhr dreißig“.',
        watch: 'Frage, wo der Stundenzeiger bei halb drei steht, und achte auf das Wort „zwischen“. Ein Kind, das ihn auf der 3 erwartet, dreht an einer Lernuhr die Zeiger von 2 Uhr bis 3 Uhr und sieht dem kurzen Zeiger beim Wandern zu.',
      },
    },
    '1:time-set-hands': {
      title: 'Uhrzeiger einzeichnen',
      objective: 'Die Kinder lesen eine Uhrzeit zur vollen oder halben Stunde und zeichnen den Stundenzeiger und den Minutenzeiger in die Uhr ein.',
      note: {
        mistake: 'Die Kinder zeichnen beide Zeiger gleich lang, dann kann niemand die Uhr lesen. Bei halb setzen sie den Stundenzeiger genau auf die Zahl und nicht in die Mitte zwischen zwei Zahlen; bei „halb fünf“ zeigt er dann auf die 5.',
        words: 'Sag: „Beim LESEN fangen wir mit dem kurzen Zeiger an. Beim ZEICHNEN ist der lange leichter, also zuerst der lange: auf die 12 bei voll, auf die 6 bei halb. Dann der Stundenzeiger: KURZ.“ Zu halb fünf: „Der kurze Zeiger steht in der Mitte zwischen der 4 und der 5.“',
        watch: 'Achte auf die Länge der beiden Zeiger und darauf, wo der kurze Zeiger bei halb steht. Das Zeichnen zeigt, was das Lesen verdeckt: Ein Kind kann halb fünf aus einer Liste auswählen und trotzdem nicht wissen, wohin der Stundenzeiger gehört.',
      },
    },
    '1:days-months-seasons': {
      title: 'Gestern, heute, morgen und die Monate',
      objective: 'Die Kinder schreiben den Tag, der gestern war, und den Tag, der morgen sein wird, und bringen die zwölf Monate in die richtige Reihenfolge.',
      note: {
        mistake: 'Die Kinder verwechseln gestern und morgen, und sie stocken, wenn heute Sonntag oder Montag ist, weil die Woche dort aufzuhören scheint. Bei den Monaten stimmt die Reihenfolge nach den ersten paar nicht mehr.',
        words: 'Sag: „Gestern ist der Tag vor heute. Morgen ist der Tag nach heute.“ Zeige, dass die Woche im Kreis geht: „Nach Sonntag kommt wieder Montag.“ Sprich die Monate in vier Dreiergruppen und frage: „In welchem Monat hast du Geburtstag? Welcher Monat kommt davor?“',
        watch: 'Prüfe die Aufgaben, bei denen heute am Rand der Woche liegt: Vor Montag war Sonntag, nach Sonntag kommt Montag. Bei den Monaten: Wer muss jedes Mal bei Januar anfangen? Sprich die Monate am Kalender, bis die Kinder von jedem Monat aus weitersagen können.',
      },
    },
    '1:ordinal-numbers': {
      title: 'Ordnungszahlen: vom ersten bis zum zehnten Platz',
      objective: 'Die Kinder schreiben die Ordnungszahlen 1. bis 10. der Reihe nach und ordnen Wörter wie „dritte“ und „fünfte“ einem Platz in einer Reihe zu.',
      note: {
        mistake: 'Die Kinder lassen den Punkt weg und schreiben 3 statt 3., dann steht da eine Anzahl und kein Platz. Sie lesen „dritte“ als „drei“ und „siebte“ als „sieben“. Beim Verbinden zählen sie vom falschen Ende der Reihe aus und nicht von der Fahne.',
        words: 'Sag: „Der Punkt macht aus der Zahl einen Platz: 3 heißt drei, 3. heißt der dritte Platz.“ Lies die Wörter gemeinsam: „der erste Platz, der zweite Platz, der dritte Platz, der vierte Platz.“ Besprich die besonderen: erste, dritte, siebte, achte. Frage jedes Mal: „Wo ist die Fahne? Dort fangen wir an.“',
        watch: 'Prüfe den Punkt hinter jeder Ordnungszahl und ob ein Kind von der Fahne aus zählt. Die Ordnungszahl-Wörter zu lesen ist eine Leseaufgabe; lies sie mit den Kindern, die das noch nicht können.',
      },
    },
    '1:coins': {
      title: 'Geldbeträge mit Münzen zählen',
      objective: 'Die Kinder kennen die Cent-Münzen und die Euro-Münzen, sagen, was jede wert ist, und zählen die Münzen in einem Geldbeutel, zuerst in Geldbeuteln mit nur einer Sorte.',
      note: {
        mistake: 'Die Kinder zählen die Münzen, nicht die Cent: Drei 10-Cent-Münzen sind „3“. Sie halten die 5-Cent-Münze für mehr wert als die 10-Cent-Münze, weil sie größer ist. Bei zwei Sorten zählen sie alles in Einerschritten.',
        words: 'Halte jede Münze hoch: „Die 10-Cent-Münze ist kleiner als die 5-Cent-Münze und trotzdem doppelt so viel wert. Die Zahl auf der Münze sagt, was sie wert ist.“ Zähle mit dem Wert: „10, 20, 30 Cent.“ Bei zwei Sorten: „Fang mit den Münzen an, die am meisten wert sind. 10, 20 … 25, 30.“',
        watch: 'Achte auf den Wechsel vom Zählen in Zehnern zum Zählen in Fünfern oder Einern in einem Geldbeutel. Kinder, die dort den Faden verlieren, bleiben beim Arbeitsblatt „erste Schritte“. Nimm zuerst Rechengeld in die Hand; gedruckte Münzen sind schwer zu unterscheiden, wenn Kinder noch wenig mit Geld umgegangen sind.',
      },
    },
    '1:shape-attributes': {
      title: 'Dreieck, Rechteck, Quadrat: Woran erkenne ich die Form?',
      objective: 'Die Kinder entscheiden an Seiten und Ecken, ob eine Form wirklich ein Dreieck, ein Rechteck oder ein Quadrat ist, und schreiben die Namen der Formen.',
      note: {
        mistake: 'Die Kinder lassen eine Form mit einer krummen Seite oder einer offenen Ecke als Dreieck gelten, weil sie „so aussieht“, und lehnen ein echtes Dreieck ab, das lang, schmal oder gedreht ist. Farbe und Größe halten sie für Merkmale, die zur Form gehören.',
        words: 'Frage: „Was MUSS ein Dreieck haben?“ (Drei gerade Seiten, drei Ecken, und es ist geschlossen.) „Ist es wichtig, ob es groß, rot oder gedreht ist?“ (Nein.) Die Kinder nennen den Grund: „Das ist kein Dreieck, weil diese Seite krumm ist.“',
        watch: 'Achte auf Begründungen, die Seiten und Ecken nennen. Ein Kind, das „zu spitz“ oder „steht auf dem Kopf“ sagt, geht noch nach dem Aussehen. Ein Quadrat ist auch ein Rechteck; lass diese Antwort gelten und sag, warum.',
      },
    },
    '1:tangram-compose': {
      title: 'Tangram: Figuren legen',
      objective: 'Die Kinder legen mit den sieben Tangram-Teilen eine Figur nach und finden das Teil, das in einer Figur fehlt.',
      note: {
        mistake: 'Die Kinder legen die großen Teile zuletzt und haben dann keinen Platz mehr, oder sie behalten ein Teil übrig und halten die Figur für fertig. Beim fehlenden Teil wählen sie eines mit der richtigen Form und der falschen Größe.',
        words: 'Sag: „Fang mit den zwei großen Dreiecken an. Wohin könnten sie passen?“ Frage: „Hast du alle sieben Teile benutzt? Steht etwas über?“ Beim fehlenden Teil: „Richtige Form UND richtige Größe. Drehe das Teil im Kopf.“',
        watch: 'Die Schattenbilder haben innen keine Linien und sind schwer: Lass die Kinder zu zweit arbeiten, und lege einem Kind, das nicht weiterkommt, ein Teil hin, nicht die ganze Lösung. Jedes Kind oder Paar braucht ein Tangram; wenn du keines hast, schneiden die Kinder es vorher aus Karton aus.',
      },
    },
    '1:measure-length-units': {
      title: 'Längen mit Kästchen messen',
      objective: 'Die Kinder messen die Länge eines Gegenstands, indem sie die Kästchen darunter zählen, und ordnen drei Gegenstände vom kürzesten zum längsten.',
      note: {
        mistake: 'Die Kinder zählen jedes Kästchen der Reihe, auch die, die der Gegenstand nicht erreicht, oder sie zählen die Linien und nicht die Kästchen. Beim Ordnen gehen sie danach, wo ein Gegenstand auf dem Blatt endet, nicht danach, wie lang er ist.',
        words: 'Sag: „Zähle nur die Kästchen unter dem Gegenstand, vom Anfang bis zum Ende.“ Nenne jedes Mal die Einheit: „Der Stift ist 6 Kästchen lang.“ Frage: „Was ist länger? Wie viele Kästchen länger?“',
        watch: 'Achte auf Antworten ohne Einheit („6“) und frage: „Sechs was?“ Prüfe einen Gegenstand, der nicht am Rand der Reihe beginnt; dort zählen Kinder zu viele Kästchen.',
      },
    },
    '1:picture-graphs-sort-count': {
      title: 'Sortieren, zählen und ein Bilddiagramm lesen',
      objective: 'Die Kinder zählen in einer gemischten Menge jede Sorte, tragen die Anzahlen in eine Tabelle ein und lesen ab, wie viele ein Bilddiagramm in jeder Reihe zeigt.',
      note: {
        mistake: 'Die Kinder tragen eine Anzahl in die falsche Zeile der Tabelle ein, weil sie nicht auf das Bild am Anfang der Zeile schauen. Die Arbeitsblätter fragen nur nach Anzahlen; wenn du zusätzlich fragst „Wie viele mehr?“, nennen die Kinder die größere Zahl und nicht den Unterschied.',
        words: 'Sag: „Jedes Bild im Diagramm steht für ein Ding.“ Stelle drei Arten von Fragen: „Wie viele Äpfel? Wovon gibt es am meisten? Wie viele Äpfel MEHR als Birnen?“ Für „wie viele mehr“ lege die beiden Reihen untereinander und zähle die Bilder, die überstehen.',
        watch: 'Stelle jedem Kind eine Frage nach „wie viele mehr“; sie ist die schwierige. Achte darauf, wer zwei Reihen vergleicht, indem es sie untereinanderlegt, und wer nur die größere Zahl abliest.',
      },
    },
    '1:bar-graphs': {
      title: 'Ein Säulendiagramm lesen und ausmalen',
      objective: 'Die Kinder lesen ab, welche Zahl jede Säule zeigt, und malen ein Säulendiagramm aus: ein Kästchen für jedes gezählte Ding.',
      note: {
        mistake: 'Die Kinder zählen die Kästchen einer Säule und lassen das unterste aus, oder sie zählen die Linie oben als eins dazu; dann liegt die Zahl um 1 daneben. Sie gehen nicht vom oberen Ende der Säule hinüber zur Zahl am Rand.',
        words: 'Sag: „Lege den Finger oben auf die Säule. Fahre hinüber zu den Zahlen. Auf welcher Zahl bist du?“ Beim Ausmalen: „Fang unten an. Ein Kästchen für jedes Ding. Höre bei der Zahl auf.“',
        watch: 'Wer nutzt die Zahlen am Rand, und wer zählt Kästchen einzeln? Beides führt zum Ziel, aber die Zahlen am Rand sind das Neue. Prüfe, ob ausgemalte Säulen unten beginnen und keine Lücken haben.',
      },
    },
    '1:patterns-missing': {
      title: 'Muster: Zwei Bilder fehlen',
      objective: 'Die Kinder finden den Teil, der sich in einem Muster wiederholt, und ergänzen zwei fehlende Bilder.',
      note: {
        mistake: 'Die Kinder verbinden beide leeren Kästchen mit demselben Bild, oder sie schauen nur auf das Bild direkt vor der Lücke. Eine Lücke in der Mitte der Reihe ist schwieriger als eine am Ende.',
        words: 'Lies die Reihe laut und klatsche bei jedem leeren Kästchen: „Stern, Mond, Stern, (klatsch), Stern, Mond.“ Frage: „Welcher Teil wiederholt sich? Sag ihn. Was gehört jetzt in die Lücke?“ Zum Prüfen wird die fertige Reihe noch einmal laut gelesen.',
        watch: 'Wer liest die ganze Reihe noch einmal, nachdem die Lücken gefüllt sind? Diese Probe findet die meisten Fehler; mache sie zum letzten Schritt bei jedem Muster.',
      },
    },
  },
};
