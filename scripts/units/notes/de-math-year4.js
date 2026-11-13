'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik: die Unterrichtseinheit des geplanten Schuljahres, die "Year pages O" möglich
 * gemacht hat (Daily Teaching System, Part 12.2): Plus und Minus bis 100 mit zweistelligen Zahlen, Klasse 2. Drei neue
 * Stunden; die Übungsstunde mit Zahlenmauern und Rechenlabyrinth kommt aus der Einheit Zahlen bis 100 dazu.
 * Geschrieben nach den Arbeitsblättern der Stunden und von einer deutschen Grundschullehrkraft mit den Blättern
 * gelesen (2026-11-13).
 * `node scripts/units/notes/apply.js` merges every file of this folder into frontend/content/units/points/<loc>.json.
 */
module.exports = {
  loc: 'de',
  points: {
    '1:open-number-line#zweistellig-addieren': {
      title: 'Zweistellige Zahlen addieren: 35 + 23 und 48 + 37',
      objective: 'Die Kinder addieren zweistellige Zahlen im Zahlenraum bis 100 schrittweise (erst die Zehner, dann die Einer) und stellen ihren Rechenweg am Rechenstrich dar.',
      note: {
        mistake: 'Die Kinder rechnen Zehner und Einer getrennt und schreiben die beiden Ergebnisse nebeneinander: Aus 48 + 37 wird 715. Am Rechenstrich zeichnen manche nur einen einzigen großen Sprung zum Ergebnis, das sie vorher an den Fingern abgezählt haben, oder sie schreiben die Zwischenzahl nicht an den Strich.',
        words: 'Zeige am Rechenstrich 48 + 37: „Wir fangen bei der 48 an. Erst die Zehner: plus 30. Wo landen wir? Bei der 78. Dann die Einer: plus 7. Bis zur 80 sind es 2, dann noch 5: 85.“ Frage bei jeder Aufgabe: „Wie groß ist dein Zehnersprung? Wo landest du?“ Lass die Kinder die Zwischenzahl unter den Strich schreiben.',
        watch: 'Beginne am ersten Tag mit dem leichteren Blatt für alle Kinder: Es hat Aufgaben ohne Zehnerübergang wie 35 + 23 und zeigt die erste Aufgabe mit ihren zwei Sprüngen. Am zweiten Tag folgt das Blatt für alle: Alle Aufgaben gehen über den Zehner, die zweite Zahl ist kleiner als 30 (39 + 17). Das schwerere Blatt hat Aufgaben mit Zehnerübergang und großer zweiter Zahl wie 48 + 37. Achte darauf, ob die Sprünge zusammen die zweite Zahl ergeben und ob die Zwischenzahl am Strich steht. Wer den Einersprung am Zehner teilt (78 + 2 + 5), rechnet geschickt. Wer bei 19 + 29 erst 30 vorspringt und dann 1 zurück, rechnet ebenfalls geschickt; lass diesen Weg gelten. Wer in Einerschritten weiterzählt, übt noch einmal das Ergänzen zum Zehner.',
      },
    },
    '1:open-number-line#zweistellig-subtrahieren': {
      title: 'Zweistellige Zahlen subtrahieren: 67 − 24 und 82 − 35',
      objective: 'Die Kinder subtrahieren zweistellige Zahlen im Zahlenraum bis 100 schrittweise (erst die Zehner, dann die Einer) und zeichnen die Sprünge rückwärts am Rechenstrich.',
      note: {
        mistake: 'Die Kinder ziehen stellenweise ab und nehmen den kleineren Einer vom größeren: Aus 82 − 35 wird 53. Andere zeichnen die Sprünge nach rechts oder hören nach dem Zehnersprung auf und schreiben die Zwischenzahl als Ergebnis (82 − 35 = 52).',
        words: 'Zeige 82 − 35 am Rechenstrich: „Die 82 steht rechts, wir springen zurück. Erst die Zehner: minus 30, wir landen bei der 52. Dann die Einer: minus 5. Bis zur 50 sind es 2, dann noch 3: 47.“ Frage: „Wo bist du nach dem Zehnersprung gelandet? Schreibe die Zahl an den Strich.“',
        watch: 'Beginne am ersten Tag mit dem leichteren Blatt für alle Kinder: Es hat Aufgaben ohne Zehnerübergang wie 67 − 24 und zeigt die erste Aufgabe mit ihren Sprüngen. Am zweiten Tag folgt das Blatt für alle: Alle Aufgaben gehen über den Zehner, die zweite Zahl ist kleiner als 30 (63 − 18). Das schwerere Blatt hat Aufgaben mit Zehnerübergang und großer zweiter Zahl wie 82 − 35. Der Strich auf dem Blatt ist leer: Das Kind trägt die Startzahl rechts selbst ein. Wer bei 82 − 29 erst 30 zurückspringt und dann 1 vor, rechnet ebenfalls geschickt; lass diesen Weg gelten. Wer 82 − 35 als 53 löst, legt die Aufgabe noch einmal mit Zehnerstangen und Einerwürfeln.',
      },
    },
    '2:two-step-word-problems#sachaufgaben-bis-100': {
      title: 'Sachaufgaben bis 100: Frage, Rechnung, Antwort',
      objective: 'Die Kinder entnehmen kurzen Sachaufgaben die Angaben, finden die Frage und lösen die Aufgabe im Zahlenraum bis 100 mit Rechnung und Antwortsatz.',
      note: {
        mistake: 'Die Kinder rechnen sofort mit den beiden Zahlen, ohne die Frage zu lesen, und zählen auch dann zusammen, wenn etwas weggenommen wird. Fehlt die Frage, schreiben viele die Rechnung in die Fragezeile. Als Antwort steht oft nur die Zahl da, ohne Satz.',
        words: 'Zeige „Die drei Nischen“ und erzähle eine Sachsituation ohne Zahlen: „In einer Kiste sind Blaubeeren. Emma nimmt welche heraus.“ Frage: „Was könnten wir hier fragen?“ Sammle die Fragen der Kinder, bevor eine Zahl genannt wird. Auf dem Blatt: „Lies die Geschichte. Was ist gefragt? Wenn keine Frage dasteht: Was könntest du fragen? Schreibe die Rechnung. Schreibe die Antwort als ganzen Satz, zum Beispiel: In der Kiste sind noch 51 Blaubeeren.“',
        watch: 'Auf dem Blatt für alle fehlt bei einer der drei Aufgaben die Frage; das Kind schreibt sie selbst. Lass mehrere Fragen gelten, wenn sie zur Geschichte passen und sich mit den Angaben beantworten lassen. Auf dem leichteren Blatt sind alle Fragen abgedruckt, und es hat keine Vergleichsaufgabe; auf dem Blatt für alle und auf dem schwereren Blatt steht je eine, und auf dem schwereren fehlen zwei Fragen. Prüfe, ob die Antwort ein Satz ist und zur Frage passt. Bei der Vergleichsaufgabe („Wie viele … mehr?“, „Wie viele … weniger?“ oder „Wie viele … fehlen …?“) zählen viele Kinder die beiden Zahlen einfach zusammen (90 + 81). Lass die beiden Mengen mit Zehnerstangen und Einerwürfeln nebeneinanderlegen und den Unterschied zeigen. Als Rechnung gilt die Minusaufgabe (90 − 81 = 9) genauso wie die Ergänzungsaufgabe (81 + 9 = 90).',
      },
    },
  },
};
