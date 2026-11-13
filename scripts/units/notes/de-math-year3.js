'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik: die Stunden des geplanten Schuljahres, die durch die "Year pages E und F"
 * möglich wurden (Daily Teaching System, Part 12.2): vier weitere Stunden in drei bestehenden Einheiten der Klasse 1.
 * Ein Eintrag je Stunde: ein neuer Lernpunkt oder eine WEITERE Stunde zu einem Punkt, der schon eine hat
 * ("<point>#<name>"). Jeder Hinweis wurde vom Arbeitsblatt der Stunde aus geschrieben und von einer deutschen
 * Grundschullehrkraft mit den Blättern gelesen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'de',
  points: {
    // ── Klasse 1: Zahlen bis 10 ──
    'K:number-bonds-k': {
      title: 'Zahlen zerlegen: die Schüttelbox',
      objective: 'Die Kinder zerlegen die Zahlen von 2 bis 9 mit Plättchen in zwei Teile und bestimmen den verdeckten Teil, wenn die ganze Zahl und ein Teil bekannt sind.',
      note: {
        mistake: 'Viele Kinder schreiben die Zahl der sichtbaren Dinge noch einmal auf oder die ganze Zahl aus dem Kreis. Andere raten. Wer noch alles einzeln abzählt, findet den versteckten Teil nicht, weil er ihn nicht sehen kann.',
        words: 'Schüttle zuerst eine echte Schüttelbox und decke eine Seite mit der Hand ab: „Es sind 7 Plättchen. Auf dieser Seite sehe ich 4. Wie viele liegen auf der verdeckten Seite?“ Sage beim Blatt: „Der Becher ist die verdeckte Seite.“ Lass weiterzählen: „4, und dann 5, 6, 7: Das sind 3.“ Sprich den Satz mit: „7 ist 4 und 3.“',
        watch: 'Achte darauf, wer von der sichtbaren Zahl aus weiterzählt und wer die Zerlegung schon weiß. Lass einzelne Kinder mit Plättchen prüfen: Beide Teile zusammen müssen die Zahl im Kreis ergeben.',
      },
    },
    'K:number-bonds-k#zahlenhaeuser': {
      title: 'Zahlenhäuser: alle Zerlegungen finden',
      objective: 'Die Kinder ergänzen in Zahlenhäusern bis 10 den fehlenden Teil, finden durch geordnetes Probieren alle Zerlegungen der Zahlen 6 bis 8 in zwei Teile und erklären, woran sie sehen, dass keine fehlt.',
      note: {
        mistake: 'Kinder schreiben Zerlegungen ungeordnet auf, wiederholen eine oder finden nicht alle. Manche halten 2 und 4 und 4 und 2 für dasselbe und lassen Stockwerke leer. Einige schreiben die Null (0 und 6); dafür hat das Haus kein Stockwerk.',
        words: 'Beginne mit den halb gefüllten Häusern und frage: „Was fällt dir an den beiden Spalten auf?“ Lege dann 6 Plättchen in eine Reihe und schiebe einen Stift dazwischen: „1 und 5.“ Schiebe den Stift ein Plättchen weiter: „2 und 4.“ Frage: „Was passiert mit der linken Zahl? Was mit der rechten?“ So entsteht die Ordnung: Links wird es immer eins mehr, rechts eins weniger.',
        watch: 'Sieh nach, ob die Kinder geordnet vorgehen. Frage: „Woher weißt du, dass du alle hast?“ Eine gute Antwort nennt die Reihenfolge oder die Zahl der Stockwerke. Lass die Tauschpaare (2 und 4, 4 und 2) mit derselben Farbe einkreisen.',
      },
    },
    // ── Klasse 1: Plus und Minus bis 10 ──
    '1:fact-families#tauschaufgaben': {
      title: 'Tauschaufgaben: 2 + 5 und 5 + 2',
      objective: 'Die Kinder lösen Tauschaufgaben bis 10 und erläutern am Bild, warum beide Aufgaben dasselbe Ergebnis haben.',
      note: {
        mistake: 'Viele Kinder rechnen beide Aufgaben neu und zählen jedes Mal alles ab; sie sehen nicht, dass das Ergebnis gleich bleiben muss. Manche glauben, 2 + 5 sei schwerer als 5 + 2 und deshalb etwas anderes.',
        words: 'Zeige auf das Bild: „Hier sind 2 und hier 5. Wie viele zusammen?“ Dann: „Jetzt fange ich mit der anderen Gruppe an: 5 und 2. Sind es mehr geworden? Weniger?“ Halte fest: „Die Zahlen tauschen den Platz, das Ergebnis bleibt.“ Frage: „Welche der beiden Aufgaben rechnest du lieber? Warum?“',
        watch: 'Achte darauf, wer das zweite Ergebnis ohne Rechnen hinschreibt: Das ist das Ziel. Frage nach, ob das Kind mit der größeren Zahl beginnt, wenn es weiterzählt (bei 2 + 7 von der 7 aus).',
      },
    },
    // ── Klasse 1: Verdoppeln, drei Summanden und Zahlenmauern ──
    '1:fluency-within-20#kleine-aufgabe-grosse-aufgabe': {
      title: 'Kleine Aufgabe, große Aufgabe: 3 + 4 und 13 + 4',
      objective: 'Die Kinder lösen Plus- und Minusaufgaben im zweiten Zehner ohne Zehnerübergang, indem sie die kleine Aufgabe bis 10 nutzen (13 + 4, 17 − 5).',
      note: {
        mistake: 'Kinder rechnen die große Aufgabe ganz neu und zählen von 13 in Einerschritten weiter, statt die kleine Aufgabe zu nutzen. Bei Minus rechnen manche nur die kleine Aufgabe und vergessen den Zehner im Ergebnis (17 − 5 = 2).',
        words: 'Zeige beide Aufgaben am Rechenrahmen oder im Zwanzigerfeld: „Oben ist die volle Zehnerreihe. Die bleibt liegen. Unten rechnen wir 3 + 4.“ Frage: „Was ist bei der großen Aufgabe gleich? Was ist anders?“ Merksatz: „Die kleine Aufgabe hilft der großen. Der Zehner kommt dazu.“',
        watch: 'Beobachte, wer nach der kleinen Aufgabe sofort das große Ergebnis schreibt und wer wieder zählt. Das leichtere Blatt hat nur Plusaufgaben: Beginne damit. Das Blatt für alle hat nur Minusaufgaben, das schwerere mischt beides.',
      },
    },
  },
};
