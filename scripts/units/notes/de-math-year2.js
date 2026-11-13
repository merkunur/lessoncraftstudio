'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik: die Stunden des geplanten Schuljahres, die mit den "Year pages D" möglich
 * wurden (Daily Teaching System, Part 12.2): Minus über die 10 in Klasse 1 und die neue Einheit Plus und Minus bis
 * 100 in Klasse 2. Ein Eintrag je Stunde: ein neuer Lernschritt oder eine WEITERE Stunde zu einem Lernschritt, der
 * schon eine hat ("<point>#<name>"). Geschrieben aus dem Arbeitsblatt, das die Stunde austeilt (in der Stufe, die die
 * Stunde nennt), für den Unterricht in Deutschland. Keine Übersetzung der englischen Hinweise.
 */
module.exports = {
  loc: 'de',
  points: {
    // ── Klasse 1: Plus über die 10 und Rechnen bis 20 ──
    '1:fluency-within-20#minus-ueber-die-10': {
      title: 'Minus über die 10: erst zurück zur 10',
      objective: 'Die Kinder lösen Minusaufgaben bis 20 mit Zehnerübergang am Zahlenstrahl in zwei Schritten, erst zurück zur 10 und dann den Rest, und schreiben den Rechenweg auf: 13 − 5 = 13 − 3 − 2 = 8.',
      note: {
        mistake: 'Viele Kinder zählen in Einerschritten rückwärts und zählen die Startzahl mit, sodass 13 − 5 zu 9 wird. Andere nehmen bis zur 10 richtig weg und ziehen danach noch einmal die ganze 5 ab.',
        words: 'Frage: „Wie viele musst du wegnehmen, bis du bei der 10 bist? Fünf sollst du wegnehmen, drei hast du schon. Wie viele fehlen noch?“ Sag: „Erst zurück zur 10, dann den Rest.“ Zeige es am Rechenrahmen: erst die Kugeln der zweiten Reihe wegschieben, dann den Rest aus der ersten.',
        watch: 'Achte auf den ersten Sprung: Er ist so groß wie die Einer der Startzahl und muss auf der 10 landen. Prüfe, ob die beiden Sprünge in den Kästchen zusammen die Zahl ergeben, die weggenommen wird.',
      },
    },
    // ── Klasse 2: Plus und Minus bis 100 ──
    '1:mental-math-to-100': {
      title: 'Zehnerzahlen dazu und weg: 34 + 20 und 76 − 30',
      objective: 'Die Kinder addieren und subtrahieren Zehnerzahlen im Zahlenraum bis 100 im Kopf und erklären, dass sich dabei nur die Zehner ändern.',
      note: {
        mistake: 'Die Kinder rechnen die Zehnerzahl zu den Einern, sodass 34 + 20 zu 36 wird. Wer in Zehnerschritten zählt, zählt oft die Startzahl mit und landet einen Zehner zu kurz (34 + 20 = 44). Bei Minus zählen manche in Einerschritten zurück und verlieren den Faden.',
        words: 'Frage: „Wie viele Zehner hat die 34? Zwei Zehner kommen dazu. Wie viele Zehner sind es jetzt? Und die Einer?“ Zähle mit der Klasse in Zehnerschritten: „34, 44, 54.“ Zeige es im Zahlenhotel: Der Fahrstuhl fährt für jeden Zehner einen Flur höher, und du stehst wieder vor derselben Tür.',
        watch: 'Achte darauf, wer die Einerziffer verändert und wer noch in Einerschritten zählt. Wer 30 + 20 sicher rechnet, aber bei 34 + 20 stockt, legt die Zahl noch einmal mit Zehnerstangen und Einerwürfeln.',
      },
    },
    '1:mental-math-to-100#einer-dazu-und-weg': {
      title: 'Einer dazu und weg ohne Zehnerübergang: 43 + 5 und 68 − 4',
      objective: 'Die Kinder addieren und subtrahieren einstellige Zahlen im Zahlenraum bis 100 ohne Zehnerübergang und nutzen dafür die kleine Aufgabe: 3 + 5 hilft bei 43 + 5.',
      note: {
        mistake: 'Die Kinder zählen bei jeder Aufgabe an den Fingern weiter, obwohl die kleine Aufgabe das Ergebnis schon verrät. Manche rechnen die einstellige Zahl zum Zehner (43 + 5 = 93) oder ziehen sie vom Zehner ab (68 − 4 = 28).',
        words: 'Schreibe die kleine Aufgabe neben die große an die Tafel: „3 + 5 = 8, also 43 + 5 = 48 und 73 + 5 = 78.“ Frage: „Welche kleine Aufgabe hilft dir hier? Ändert sich der Zehner? Warum nicht?“',
        watch: 'Achte darauf, wer die kleine Aufgabe nutzt und wer von der großen Zahl aus weiterzählt. Wer 3 + 5 noch an den Fingern abzählt, übt zuerst die Aufgaben bis 10: Hier fehlt das kleine Einspluseins, nicht der Zahlenraum bis 100.',
      },
    },
    '1:mental-math-to-100#plus-mit-zehneruebergang': {
      title: 'Plus mit Zehnerübergang: 47 + 8',
      objective: 'Die Kinder addieren im Zahlenraum bis 100 eine einstellige Zahl mit Zehnerübergang in zwei Schritten, erst bis zum nächsten Zehner und dann weiter: 47 + 8 = 47 + 3 + 5 = 55.',
      note: {
        mistake: 'Die Kinder behalten den alten Zehner und schreiben 47 + 8 = 45. Andere landen mit dem ersten Sprung nicht auf dem Zehner oder rechnen nach der 50 noch einmal die ganze 8 dazu. Manche wissen nicht, welcher Zehner der nächste ist.',
        words: 'Frage: „Welcher Zehner kommt nach der 47? Wie viel fehlt bis zur 50?“ Dann: „Acht sollst du dazurechnen, drei hast du schon. Wie viele fehlen noch?“ Erinnere an Klasse 1: „Das ist wie 7 + 8, nur vier Zehner höher.“',
        watch: 'Achte darauf, wie das Kind zum nächsten Zehner kommt. Wer in Einerschritten hinzählt, braucht die verliebten Zahlen noch einmal. Prüfe, ob die beiden Sprünge in den Kästchen zusammen die zweite Zahl ergeben.',
      },
    },
    '1:fluency-within-20#minus-mit-zehneruebergang-bis-100': {
      title: 'Minus mit Zehnerübergang: 53 − 6',
      objective: 'Die Kinder subtrahieren im Zahlenraum bis 100 eine einstellige Zahl mit Zehnerübergang in zwei Schritten, erst zurück zum Zehner und dann weiter: 53 − 6 = 53 − 3 − 3 = 47.',
      note: {
        mistake: 'Die Kinder drehen die Einer um, rechnen 5 − 2 statt 12 − 5 und behalten den Zehner: Aus 82 − 5 wird 83. Andere gehen richtig zum Zehner zurück und schreiben das Ergebnis dann in den falschen Zehner, zum Beispiel 53 − 6 = 57 statt 47.',
        words: 'Lass das Kind vor dem Rechnen sagen, wo das Ergebnis liegt: „Bei den Vierzigern, denn ich gehe unter die 50.“ Frage dann: „Wie viele nimmst du weg, bis du bei der 50 bist? Sechs sollst du wegnehmen. Wie viele fehlen noch?“',
        watch: 'Achte auf Ergebnisse, die größer sind als die Startzahl oder im selben Zehner bleiben: Dort wurden meist die Einer umgedreht. Wer beim zweiten Sprung stockt (50 − 3), übt noch einmal das Abziehen vom vollen Zehner.',
      },
    },
  },
};
