'use strict';
/**
 * Guest teacher scripts, language de, teaching points of grade 3 (Daily Teaching System, Part 5). One script
 * per teaching point: what to SAY, how to START together, what to do when a child is STUCK; `byType` for one
 * worksheet type. Written from the pictures of the worksheets. Merged by scripts/sub-plans/apply-texts.js.
 */
module.exports = {
  loc: 'de',
  points: {
    '3:times-tables': {
      say: '„Heute übt ihr das Einmaleins mit der 2. Rechnet jede Malaufgabe und schreibt das Ergebnis in das Kästchen. Wer eine Aufgabe nicht auswendig weiß, verdoppelt einfach die erste Zahl.“',
      first: 'Sagen Sie mit der Klasse die Zweierreihe auf: 2, 4, 6 bis 20. Rechnen Sie zwei Aufgaben an der Tafel und zeigen Sie den Trick: 7 mal 2 ist das Doppelte von 7.',
      stuck: 'Das Kind zählt in Zweierschritten und nimmt für jeden Schritt einen Finger: bei 6 mal 2 sechs Finger. Zur Kontrolle auf dem Blatt für alle: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.',
      byType: {
        'G3-358': {
          say: '„Das ist Einmaleins-Training mit Aufgaben aus verschiedenen Reihen. Rechnet jede Malaufgabe und schreibt das Ergebnis in das Kästchen. Zuerst die Aufgaben, die ihr auswendig wisst, dann die anderen.“',
          first: 'Rechnen Sie die ersten beiden Aufgaben an der Tafel. Fragen Sie bei 6 mal 3 nach den Wegen: auswendig, sechsmal in Dreierschritten zählen oder die Tauschaufgabe 3 mal 6. Jeder Weg, der stimmt, gilt.',
          stuck: 'Das Kind nimmt die Tauschaufgabe, wenn sie leichter ist, oder geht von einer Kernaufgabe aus: 5 mal 7 ist 35, zwei Siebener dazu sind 49. Zur Kontrolle auf dem Blatt für alle: 18, 42, 21, 27, 10, 6, 14, 40, 49, 16, 15, 32.',
        },
      },
    },
    '3:column-regrouping': {
      say: '„Das sind Plusaufgaben zum schriftlichen Rechnen. Rechnet Stelle für Stelle und beginnt rechts bei den Einern. Wenn eine Stelle zehn oder mehr ergibt, schreibt ihr den Einer hin und den Übertrag in das kleine Kästchen über der nächsten Stelle.“',
      first: 'Schreiben Sie die zweite Aufgabe so an die Tafel, wie sie gedruckt ist: 18 plus 55. Einer: 8 plus 5 ist 13, die 3 hinschreiben, die 1 als Übertrag in das kleine Kästchen über den Zehnern. Zehner: 1 plus 5 plus Übertrag 1 ist 7. Lesen Sie das Ergebnis vor: 73. Bei manchen Aufgaben ergeben auch die Zehner zehn oder mehr; dann hat das Ergebnis drei Stellen. Fragen Sie die Kinder, wo sie die Merkzahl sonst hinschreiben: Viele Klassen notieren sie klein unten vor dem Strich. Das dürfen sie auch hier.',
      stuck: 'Das Kind deckt alle Spalten bis auf eine ab und sagt die Summe laut. Ist sie zehn oder größer, fragen Sie: „Welche Ziffer bleibt hier stehen, welche wandert weiter?“ Der häufigste Fehler ist der vergessene Übertrag. Zur Kontrolle auf dem Blatt für alle: 149, 73, 123, 134, 117, 54.',
    },
    '3:magic-squares': {
      say: '„In einem magischen Quadrat ergibt jede Reihe und jede Spalte dieselbe Zahl: die magische Zahl. Auf diesem Blatt ist das die 15. Füllt die leeren Felder so aus, dass jede Reihe und jede Spalte zusammen 15 ergibt.“',
      first: 'Zeichnen Sie das erste Quadrat an die Tafel. Suchen Sie eine Reihe oder Spalte, in der nur ein Feld leer ist: In der obersten Reihe stehen 6 und 1. Fragen Sie: „6 und 1 sind 7. Wie viel fehlt bis 15?“ Tragen Sie die 8 ein. Die Kinder suchen immer als Nächstes eine Reihe oder Spalte mit nur einem leeren Feld.',
      stuck: 'Das Kind fährt mit dem Finger eine Reihe oder Spalte mit einem leeren Feld entlang, rechnet die beiden Zahlen zusammen und ergänzt bis 15. Zur Kontrolle rechnet es am Ende jede Reihe und jede Spalte nach. Auf dem Blatt für alle lauten die Reihen im ersten Quadrat 6, 1, 8 und 7, 5, 3 und 2, 9, 4; im zweiten 6, 7, 2 und 1, 5, 9 und 8, 3, 4.',
    },
    '3:mult-div-relationship': {
      say: '„Malnehmen und Teilen gehören zusammen. Zu einem Punktefeld gibt es eine ganze Familie von vier Aufgaben: zwei Malaufgaben und zwei Geteiltaufgaben. Vervollständigt zu jedem Feld alle vier Aufgaben.“',
      first: 'Zeichnen Sie das erste Feld an die Tafel: 2 Reihen mit je 5. Rechnen Sie die beiden Malaufgaben: 2 mal 5 und die Tauschaufgabe 5 mal 2. Fragen Sie dann: „Zehn Formen in 2 gleichen Reihen: Wie viele sind in jeder Reihe?“ 10 geteilt durch 2 ist 5, und 10 geteilt durch 5 ist 2. Alle vier Aufgaben brauchen dieselben drei Zahlen.',
      stuck: 'Das Kind zählt die Reihen, die Formen in einer Reihe und alle Formen und schreibt diese drei Zahlen neben das Feld. In jeder Aufgabe der Familie kommen nur diese drei Zahlen vor. Zur Kontrolle auf dem Blatt für alle: Die vier Felder haben 10, 30, 15 und 12 Formen. Die Geteiltaufgaben: 10 : 2 = 5 und 10 : 5 = 2; 30 : 5 = 6 und 30 : 6 = 5; 15 : 3 = 5 und 15 : 5 = 3; 12 : 4 = 3 und 12 : 3 = 4.',
    },
    '3:muldiv-word-problems': {
      say: '„Das sind Sachaufgaben zum Malnehmen. Jede Geschichte erzählt von gleich großen Gruppen, und das Bild darunter zeigt sie. Lest die Geschichte, schreibt die Malaufgabe in das Rechenfeld, das Ergebnis in das Kästchen und einen Antwortsatz auf die Linien.“',
      first: 'Lesen Sie die erste Geschichte gemeinsam. Fragen Sie: „Wie viele Tüten? Wie viele in jeder Tüte?“ Schreiben Sie die Rechnung an die Tafel: 3 mal 2 gleich 6. Lassen Sie am Bild nachzählen und formulieren Sie den Antwortsatz: „Es sind zusammen 6 Rentiere.“',
      stuck: 'Das Kind unterstreicht die beiden Zahlen in der Geschichte und sagt, was jede zählt: die Gruppen oder wie viele in einer Gruppe sind. Am Bild nachzuzählen ist als Kontrolle erlaubt. Zur Kontrolle auf dem Blatt für alle: 6 Rentiere und 16 Zebras.',
    },
    '3:arithmetic-patterns': {
      say: '„Jede Zahlenreihe folgt einer Regel: Es geht immer um denselben Schritt weiter. Findet die Regel der Reihe und schreibt die fehlenden Zahlen auf.“',
      first: 'Schreiben Sie die zweite Reihe so an die Tafel, wie sie gedruckt ist. Suchen Sie zwei Zahlen, die direkt nebeneinanderstehen: 54 und 60. Fragen Sie: „Wie weit ist es von 54 bis 60?“ Sechs. Prüfen Sie die Regel an 60 und 66 und füllen Sie die Lücken, indem Sie immer 6 dazurechnen.',
      stuck: 'Das Kind sucht zwei Zahlen ohne Lücke dazwischen und zählt von der einen zur anderen. Steht ein leeres Feld dazwischen, sind es zwei Schritte: von 54 bis 66 sind es 12, ein Schritt ist also 6. Zur Kontrolle auf dem Blatt für alle: In jeder Reihe geht es um 6 weiter. Es fehlen in Reihe 1: 60, 72, 84; in Reihe 2: 72, 84, 90; in Reihe 3: 48, 54, 60; in Reihe 4: 84, 90, 96; in Reihe 5: 96, 102, 114.',
    },
    '3:input-output': {
      say: '„Jede Zahlenmaschine hat eine Regel; sie steht oben. Links geht eine Zahl hinein, die Maschine rechnet, rechts kommt eine neue Zahl heraus. Eine Maschine nimmt mal 5, die andere zieht 6 ab. Tragt die fehlenden Zahlen ein. Achtung: Manchmal fehlt die Zahl, die hineingegangen ist.“',
      first: 'Lösen Sie die erste Maschine gemeinsam. Ihre Regel ist mal 5. „6 geht hinein. Was kommt heraus?“ 30. Dann die Zeile, in der links das Feld leer ist: „Eine Zahl ging hinein, die Maschine hat mal 5 gerechnet, 35 kam heraus. Welche Zahl war es?“ Rückwärts rechnen: 35 geteilt durch 5 ist 7. Probe: 7 durch die Maschine schicken.',
      stuck: 'Fragen Sie: „Fehlt die Zahl vor dem Pfeil oder hinter dem Pfeil?“ Hinter dem Pfeil gilt die Regel. Vor dem Pfeil rechnet das Kind die Umkehraufgabe (geteilt statt mal, plus statt minus) und macht die Probe. Zur Kontrolle auf dem Blatt für alle: erste Maschine 30, 60, 7, 50, 2; zweite Maschine 18, 15, 7, 27, 9.',
      byType: {
        'G3-328+': {
          say: '„Jede Zahlenmaschine hat eine Regel; sie steht oben. Links geht eine Zahl hinein, die Maschine rechnet, rechts kommt eine neue Zahl heraus. Eine Maschine nimmt mal 5, die andere zieht 6 ab. Tragt die fehlenden Zahlen ein. Achtung: Manchmal fehlt die Zahl, die hineingegangen ist.“',
          first: 'Lösen Sie die erste Maschine gemeinsam. Ihre Regel ist mal 5. „6 geht hinein. Was kommt heraus?“ 30. Dann die Zeile, in der links das Feld leer ist: „Eine Zahl ging hinein, die Maschine hat mal 5 gerechnet, 35 kam heraus. Welche Zahl war es?“ Rückwärts rechnen: 35 geteilt durch 5 ist 7. Probe: 7 durch die Maschine schicken.',
          stuck: 'Fragen Sie: „Fehlt die Zahl vor dem Pfeil oder hinter dem Pfeil?“ Hinter dem Pfeil gilt die Regel. Vor dem Pfeil rechnet das Kind die Umkehraufgabe (geteilt statt mal, plus statt minus) und macht die Probe. Zur Kontrolle auf dem Blatt für alle: erste Maschine 30, 60, 7, 50, 2; zweite Maschine 18, 15, 7, 27, 9.',
        },
      },
    },
    '3:time-to-minute': {
      say: '„Auf diesem Blatt lest ihr die Uhr auf die Minute genau ab. Schaut erst auf den kleinen Zeiger für die Stunde, dann auf den großen für die Minuten. Kreist die passende Uhrzeit ein.“',
      first: 'Zeichnen Sie eine Uhr an die Tafel. Wiederholen Sie: Von einer Zahl zur nächsten sind es 5 Minuten, jeder kleine Strich ist 1 Minute. Lesen Sie die erste Uhr gemeinsam ab: in Fünferschritten bis zur letzten Zahl vor dem großen Zeiger zählen, dann die einzelnen Striche dazu.',
      stuck: 'Fragen Sie: „An welcher Zahl ist der kleine Zeiger gerade vorbei?“ Das ist die Stunde. Für die Minuten zählt das Kind in Fünferschritten von der 12 aus und dann strichweise weiter. Zwei der drei Uhrzeiten liegen jeweils nur eine Minute auseinander; hier muss genau gezählt werden. Zur Kontrolle auf dem Blatt für alle: 6:19, 11:52, 3:45 und 6:16.',
    },
    '3:perimeter': {
      say: '„Der Umfang ist der Weg einmal rund um eine Figur, wie ein Spaziergang am Rand entlang. Jedes Rechteck besteht aus Kästchen. Zählt die Kästchenkanten rundherum am äußeren Rand und schreibt den Umfang in das Feld.“',
      first: 'Zeichnen Sie das erste Rechteck an die Tafel. Markieren Sie eine Startecke. Zählen Sie die Kanten oben, rechts hinunter, unten und links wieder hinauf bis zur Startecke und machen Sie an jeder gezählten Kante einen kleinen Strich. Zeigen Sie danach die Abkürzung: die vier Seiten zählen und zusammenrechnen.',
      stuck: 'Das Kind markiert eine Startecke und macht an jeder gezählten Kante einen Strich, damit keine doppelt gezählt wird. Wer die Kästchen innen zählt, bestimmt die Fläche; zeigen Sie auf den Rand. Zur Kontrolle auf dem Blatt für alle: 20, 14, 20 und 22 Kästchenkanten (die Rechtecke sind 6 mal 4, 3 mal 4, 7 mal 3 und 6 mal 5 Kästchen groß).',
    },
    '3:word-fields': {
      say: '„Manche Wörter gehören zusammen, weil sie etwas Ähnliches bedeuten: Sie bilden ein Wortfeld. Die zehn Verben oben sind alle eine Art zu gehen oder eine Art zu sehen. Schreibt jedes Wort in das Wortfeld, zu dem es gehört.“',
      first: 'Lesen Sie die zehn Wörter gemeinsam. Spielen Sie zwei davon vor: Ein Kind bummelt vor der Tafel entlang, alle blinzeln. Fragen Sie: „Ist bummeln eine Art zu gehen oder eine Art zu sehen?“ Schreiben Sie bummeln in das Wortfeld „gehen“. Die Kinder streichen oben jedes Wort durch, das sie eingetragen haben.',
      stuck: 'Lesen Sie dem Kind das Wort vor und lassen Sie es das Wort vormachen oder in zwei Sätzen ausprobieren: „Ich … durch die Stadt“ und „Ich … aus dem Fenster“. Zur Kontrolle auf dem Blatt für alle: zu „gehen“ gehören spazieren, bummeln, marschieren und rennen; zu „sehen“ gehören betrachten, spähen, schauen, starren, glotzen und blinzeln.',
    },
    '3:root-words-in-context': {
      say: '„Die vier Wörter auf den Karten gehören zu einer Wortfamilie: In allen steckt der Wortstamm, der darunter steht. Jedes Wort passt in einen der vier Sätze. Lest jeden Satz und schreibt das passende Wort in die Lücke. Jedes Wort wird einmal gebraucht.“',
      first: 'Lesen Sie die vier Wörter der ersten Familie gemeinsam: zaubern, Zauberer, Zauberstab, zauberhaft. Lösen Sie den ersten Satz zusammen, indem Sie die Wörter in die Lücke einsetzen: „Der zaubern trägt einen spitzen Hut? Der Zauberer trägt einen spitzen Hut.“ Die Kinder streichen jedes verwendete Wort durch.',
      stuck: 'Lesen Sie dem Kind den Satz nacheinander mit jedem Wort vor, das noch übrig ist, und fragen Sie, was richtig klingt. Zur Kontrolle auf dem Blatt für alle: Zauberer, zauberhaft, zaubern, Zauberstab; dann mitspielen, verspielt, Mitspieler, Spielzeug.',
    },
  },
};
