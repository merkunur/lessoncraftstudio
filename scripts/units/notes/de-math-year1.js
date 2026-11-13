'use strict';
/**
 * Lehrerhinweise, Deutsch, Mathematik: die ersten Stunden des geplanten Schuljahres (Daily Teaching System,
 * Part 12.2). Ein Eintrag je Stunde: ein neuer Lernschritt oder eine WEITERE Stunde zu einem Lernschritt, der schon
 * eine hat ("<point>#<name>"). Geschrieben aus dem veröffentlichten Arbeitsblatt, das die Stunde austeilt (in der
 * Stufe, die die Stunde nennt), für den Unterricht in Deutschland. Keine Übersetzung der englischen Hinweise.
 */
module.exports = {
  loc: 'de',
  points: {
    '1:sort-three-groups': {
      title: 'Sortieren: Was gehört zusammen?',
      objective: 'Die Kinder sortieren Bilder nach einem Merkmal in drei Gruppen, verbinden jedes Bild mit seiner Kiste und sagen, wie viele in jede Kiste gehören.',
      note: {
        mistake: 'Die Kinder verbinden nach der Farbe oder nach dem Platz auf dem Blatt statt nach dem Merkmal, das die Kiste zeigt. Manche lassen ein Bild aus oder verbinden es mit zwei Kisten.',
        words: 'Frage: „Was haben alle in dieser Kiste gemeinsam? Woran erkennst du das?“ Lass das Kind die Regel der Kiste sagen: „Hier kommen alle Dreiecke hinein.“ Dann: „Wie viele sind es in jeder Kiste? Sind es in einer Kiste mehr, oder sind es überall gleich viele?“',
        watch: 'Achte darauf, wer die Regel einer Kiste in Worten sagen kann. Wer nur richtig verbindet, sortiert vielleicht nach dem Aussehen des ersten Bildes und kommt nicht weiter, sobald Größe oder Farbe wechseln.',
      },
    },
    'K:numeral-formation': {
      title: 'Zahlen 1 bis 5: zählen und Ziffern schreiben',
      objective: 'Die Kinder zählen Mengen von 1 bis 5 und spuren die Ziffern 1 bis 5 in der richtigen Schreibrichtung nach.',
      note: {
        mistake: 'Die Kinder beginnen eine Ziffer unten oder an der falschen Stelle und schreiben die 3 oder die 5 spiegelverkehrt. Beim Zählen laufen Zeigen und Sprechen bei manchen nicht im gleichen Takt: Sie tippen ein Bild doppelt an oder überspringen eines und kommen auf eins zu viel oder eins zu wenig.',
        words: 'Sprich bei jeder Ziffer den Schreibweg mit und frage: „Wo fängt die Ziffer an? Zeig mir den Punkt.“ Beim Zählen gilt: „Ein Bild, ein Zahlwort.“ Lass die Kinder die Ziffer erst groß in die Luft schreiben.',
        watch: 'Achte auf den Anfangspunkt und die Richtung, nicht nur auf die fertige Ziffer. Eine 5, die unten begonnen wird, sieht richtig aus und wird später beim schnellen Schreiben zur spiegelverkehrten 5.',
      },
    },
    'K:count-how-many': {
      title: 'Zahlen bis 10 im Zehnerfeld: fünf und noch mehr',
      objective: 'Die Kinder zählen die Bilder im Zehnerfeld, schreiben die Zahl auf und sehen die Zahlen von 6 bis 10 als „fünf und noch mehr“.',
      note: {
        mistake: 'Die Kinder zählen jedes Bild einzeln von 1 an, auch wenn die obere Reihe voll ist. Manche zählen die leeren Felder mit oder springen zwischen den Reihen und verzählen sich.',
        words: 'Frage: „Ist die obere Reihe voll? Wie viele sind das, ohne zu zählen?“ Sag: „Fünf und noch zwei, das sind sieben.“ Lass die Kinder die Zahl erst so sagen und dann schreiben.',
        watch: 'Wer nennt die Zahl, ohne die obere Reihe abzuzählen? Diese Kinder nutzen die Fünf. Wer bei jeder Aufgabe wieder bei 1 beginnt, legt die Zahlen noch einmal mit Plättchen ins Zehnerfeld.',
      },
    },
    '1:compare-order-two-digit#mehr-weniger-gleich': {
      title: 'Mehr, weniger, gleich viele: die Zeichen <, > und =',
      objective: 'Die Kinder vergleichen zwei Gruppen mit bis zu 10 Bildern und kreisen das passende Zeichen ein: größer als, kleiner als oder gleich.',
      note: {
        mistake: 'Die Kinder verwechseln < und > oder wählen das Zeichen nach der Seite, auf der die Bilder mehr Platz einnehmen. Bei gleich vielen Bildern suchen sie trotzdem nach einer größeren Gruppe.',
        words: 'Sag: „Das Zeichen ist zur größeren Zahl hin offen.“ Lass jede Aufgabe als Satz lesen: „Acht ist größer als vier.“ Frage: „Wie kannst du es prüfen?“ und lass immer ein Bild links mit einem Bild rechts verbinden.',
        watch: 'Lass dir das eingekreiste Zeichen vorlesen. Ein Kind, das richtig einkreist, aber „vier ist größer als acht“ liest, kennt das Zeichen als Bild und noch nicht als Satz.',
      },
    },
    'K:before-after-back': {
      title: 'Die Zahlenreihe bis 10: Vorgänger und Nachfolger',
      objective: 'Die Kinder schreiben zu einer Zahl bis 10 die Zahl davor und die Zahl danach und zählen von 10 rückwärts.',
      note: {
        mistake: 'Die Kinder verwechseln „davor“ und „danach“ oder schreiben zweimal den Nachfolger. Rückwärts kommen viele zwischen 7 und 5 ins Stocken und zählen leise von 1 aufwärts, um die Zahl zu finden.',
        words: 'Sag: „Der Vorgänger kommt direkt vor der Zahl, der Nachfolger direkt danach.“ Frage am Zahlenstrahl: „Wo steht die 7? Wer steht links daneben, wer rechts?“ Zählt gemeinsam rückwärts wie beim Raketenstart.',
        watch: 'Achte darauf, wer den Vorgänger sofort nennt und wer dafür von 1 hochzählt. Auf dem Blatt steht auch die 1: Ihr Vorgänger ist die 0. Zeige die 0 vorher am Zahlenstrahl; wer sie von selbst nennt, hat die Zahlenreihe verstanden.',
      },
    },
    '1:map-key': {
      title: 'Rechts, links, oben, unten: Wege auf dem Gitterplan',
      objective: 'Die Kinder folgen im Gitterplan Schritten wie „2 Felder nach unten, 1 Feld nach links“ bis zum Ziel und beschreiben einen eingezeichneten Weg mit Richtung und Anzahl der Felder.',
      note: {
        mistake: 'Die Kinder zählen das Feld mit, auf dem sie stehen, und kommen ein Feld zu kurz an. Rechts und links werden verwechselt, vor allem wenn der Weg vorher nach unten gegangen ist.',
        words: 'Sag: „Das Startfeld zählt nicht mit. Der erste Schritt ist das nächste Feld.“ Lass die Kinder den Weg mit dem Finger gehen und dabei sprechen: „zwei nach unten, eins nach links“. Frage: „Wo bist du jetzt? Wohin zeigt der nächste Pfeil?“',
        watch: 'Achte auf den ersten Schritt jeder Anweisung. Wer immer ein Feld zu kurz ankommt, zählt das Startfeld mit; geht den Weg dann einmal mit einer Spielfigur auf dem Plan.',
      },
    },
    '1:write-the-equation': {
      title: 'Die Rechnung zum Bild: Plus oder Minus?',
      objective: 'Die Kinder erzählen zu einem Bild, was passiert, und schreiben die passende Plus- oder Minusaufgabe mit allen drei Zahlen und dem Rechenzeichen auf.',
      note: {
        mistake: 'Die Kinder schreiben die Zahlen in der Reihenfolge, in der sie zählen, und setzen immer ein Plus dazwischen, auch wenn Bilder durchgestrichen sind. Beim Minus steht oft die kleinere Zahl vorn.',
        words: 'Frage: „Was passiert auf dem Bild? Kommt etwas dazu oder geht etwas weg?“ Lass erst die Geschichte erzählen und dann die Rechnung schreiben: „Erst waren es sieben Fische, vier schwimmen weg.“ Frage: „Welche Zahl steht am Anfang?“',
        watch: 'Achte darauf, ob Geschichte und Rechnung zusammenpassen. Wer zu einem Bild mit durchgestrichenen Dingen 4 + 3 = 7 schreibt, hat gezählt, aber nicht erzählt.',
      },
    },
    'K:teen-numbers': {
      title: 'Zahlen bis 20 in zwei Zehnerfeldern: ein Zehner und Einer',
      objective: 'Die Kinder zählen, was in zwei Zehnerfeldern liegt, schreiben die Zahl von 11 bis 20 auf und ergänzen die Aufgabe, zum Beispiel 14 = 10 + 4.',
      note: {
        mistake: 'Die Kinder zählen alle Punkte einzeln von 1 an, statt das volle Feld als 10 zu nehmen. Beim Schreiben vertauschen sie die Ziffern, weil sie „vierzehn“ hören: erst die 4, dann die 1.',
        words: 'Frage: „Wie viele sind im vollen Feld? Musst du sie zählen?“ Sag: „Zehn und vier sind vierzehn. Ein Zehner und vier Einer.“ Beim Schreiben: „Wir sprechen die Einer zuerst, aber wir schreiben den Zehner zuerst.“',
        watch: 'Wer zählt vom vollen Feld aus weiter („zehn, elf, zwölf“) oder sieht die Zahl sofort? Wer bei 1 beginnt, muss das volle Zehnerfeld noch öfter als „zehn auf einen Blick“ erleben, zum Beispiel am Zehnerfeld an der Tafel.',
      },
    },
    '1:fluency-within-20#plus-ueber-die-10': {
      title: 'Plus über die 10: erst bis zur 10, dann weiter',
      objective: 'Die Kinder lösen Plusaufgaben mit Zehnerübergang am Zahlenstrahl in zwei Schritten, erst bis zur 10 und dann den Rest, und schreiben den Rechenweg auf: 8 + 5 = 8 + 2 + 3 = 13.',
      note: {
        mistake: 'Die Kinder zählen in Einerschritten weiter und halten bei der 10 nicht an. Andere zerlegen die zweite Zahl so, dass der erste Sprung nicht bei der 10 landet, zum Beispiel 8 + 5 = 8 + 3 + 2.',
        words: 'Frage: „Wie viel fehlt der 8 bis zur 10? Was bleibt von der 5 übrig?“ Sag: „Erst bis zur 10, dann den Rest.“ Zeige es am Rechenrahmen: erst die obere Reihe füllen, dann den Rest in die zweite Reihe schieben.',
        watch: 'Achte auf den ersten Sprung: Er muss auf der 10 landen. Wer in einem einzigen langen Sprung über die 10 hüpft, zählt meist noch in Einerschritten weiter und braucht die verliebten Zahlen noch einmal.',
      },
    },
    '1:near-doubles': {
      title: 'Verdoppeln hilft: 6 + 7',
      objective: 'Die Kinder lösen Nachbaraufgaben der Verdopplungen bis 20: Sie schreiben 6 + 7 als 6 + 6 + 1 und rechnen das Ergebnis aus.',
      note: {
        mistake: 'Die Kinder sehen die Verdopplung in der Aufgabe nicht und zählen weiter. Andere verdoppeln die größere Zahl und rechnen trotzdem noch eins dazu, sodass 6 + 7 zu 15 wird.',
        words: 'Frage: „Welche Verdopplungsaufgabe steckt in 6 + 7? Um wie viel ist 7 größer als 6?“ Sag: „6 + 6 ist 12, und eins dazu ist 13.“ Lass die Kinder erklären, warum 6 + 7 eins mehr ist als 6 + 6.',
        watch: 'Wer schreibt zuerst das Ergebnis und füllt die Kästchen dazwischen erst danach? Das Kind kennt die Aufgabe vielleicht schon auswendig; es soll trotzdem sagen können, welche Verdopplung hilft.',
      },
    },
    '1:word-problems#rechengeschichten-bis-20': {
      title: 'Rechengeschichten bis 20',
      objective: 'Die Kinder lösen Rechengeschichten im Zahlenraum bis 20, in denen etwas dazukommt oder weggeht, nutzen die Bilder und schreiben die Antwort auf.',
      note: {
        mistake: 'Die Kinder rechnen mit den zwei Zahlen, ohne die Frage zu lesen, und zählen auch dann zusammen, wenn etwas weggeht. Bei Zahlen über 10 zählen viele alle Bilder einzeln ab und verzählen sich.',
        words: 'Frage: „Was wird erzählt? Was ist gefragt? Werden es mehr oder weniger?“ Lass die Rechnung und einen Antwortsatz sagen: „11 minus 9 ist 2. Es sind noch 2 übrig.“',
        watch: 'Achte darauf, ob das Kind die Antwort als Satz zur Geschichte sagen kann. Wer nur die Zahl nennt, hat gerechnet, aber noch nicht geprüft, ob sie zur Frage passt.',
      },
    },
    '1:fluency-within-20#kopfrechnen-bis-20': {
      title: 'Kopfrechnen bis 20',
      objective: 'Die Kinder rechnen Plus- und Minusaufgaben bis 20 im Kopf und schreiben das Ergebnis auf.',
      note: {
        mistake: 'Die Kinder zählen bei jeder Aufgabe mit den Fingern, auch bei 14 + 4, wo die kleine Aufgabe 4 + 4 hilft. Bei 17 − 12 ziehen manche nur die Einer ab und vergessen den Zehner.',
        words: 'Frage: „Welche kleine Aufgabe steckt darin? 4 + 4 kennst du, was ist dann 14 + 4?“ Sag: „Überlege erst, welcher Weg hilft: verdoppeln, bis zur 10 oder die kleine Aufgabe.“ Bei Minus über die 10: „17 − 9: erst zurück bis zur 10, dann den Rest, also 17 − 7 − 2.“ Und: „16 − 8: Welche Verdopplung kennst du?“ Eine tägliche Runde von fünf Minuten bringt mehr als eine lange Übungsstunde.',
        watch: 'Notiere, welche Aufgaben ein Kind sofort weiß und bei welchen es zählt. Die Aufgaben, bei denen es noch zählt, sind seine Aufgaben für die nächsten Tage; die anderen muss es nicht noch einmal üben.',
      },
    },
    '1:days-months-seasons~season-wheel': {
      title: 'Monate und Jahreszeiten',
      objective: 'Die Kinder ordnen die zwölf Monate den vier Jahreszeiten zu und malen zu jedem Monat den Kreis in der Farbe seiner Jahreszeit an.',
      note: {
        mistake: 'Die Kinder ordnen einen Monat nach dem eigenen Erlebnis zu („Im März lag noch Schnee“). Viele sehen Dezember, Januar und Februar nicht als eine zusammenhängende Jahreszeit, weil dazwischen das neue Jahr beginnt.',
        words: 'Sag: „Auf dem Blatt gehört jeder Monat ganz zu einer Jahreszeit, und jede Jahreszeit hat drei Monate. Der Winter geht über den Jahreswechsel: Dezember, Januar, Februar.“ Frage: „In welchem Monat hast du Geburtstag? Welche Jahreszeit ist dann?“ Zeige die Monate an der Kalendertafel.',
        watch: 'Achte auf den Dezember und auf März, Juni und September, mit denen eine neue Jahreszeit beginnt. Wer dort unsicher ist, sagt die Monate noch einmal der Reihe nach auf und zeigt dabei auf den Kalender.',
      },
    },
    '2:flat-or-solid': {
      title: 'Flach oder räumlich? Flächen und Körper unterscheiden',
      objective: 'Die Kinder unterscheiden ebene Figuren von Körpern und verbinden jede Form mit ihrer Kiste: flache Formen links, Körper rechts.',
      note: {
        mistake: 'Die Kinder nennen die Kugel „Kreis“ und den Würfel „Quadrat“: Der Körper bekommt den Namen der flachen Form, die sie in ihm sehen. Auf dem Papier ist alles flach gezeichnet, deshalb wird das Bild eines Würfels als flach einsortiert.',
        words: 'Halte ein Papierquadrat und einen Würfel hoch. Frage: „Liegt es ganz flach auf dem Tisch? Oder kann ich es in die Hand nehmen und rundherum anfassen?“ Sag: „Eine Fläche ist flach. Ein Körper nimmt Platz ein. Jede Seitenfläche des Würfels ist ein Quadrat.“',
        watch: 'Höre darauf, ob ein Kind „Kreis“ zur Kugel sagt. Bring echte Gegenstände mit; für Kinder, die die Körper noch nicht in der Hand hatten, sind Zeichnungen von Körpern schwer zu lesen.',
      },
    },
    '2:grid-coordinates': {
      title: 'Planquadrate: Wo liegt das Feld B2?',
      objective: 'Die Kinder finden in einem Gitter das Feld zu einer Angabe wie B2 und malen es aus; zu einem fertigen Bild schreiben sie die Felder auf.',
      note: {
        mistake: 'Die Kinder vertauschen Buchstabe und Zahl, oder sie zählen die Kästchen von der Ecke aus ab, statt am Rand abzulesen. Beim Aufschreiben setzen sie die Zahl vor den Buchstaben.',
        words: 'Sag: „Erst der Buchstabe oben, dann die Zahl an der Seite. Fahre mit einem Finger nach unten und mit dem anderen zur Seite: Wo sie sich treffen, ist das Feld.“ Frage: „Wie heißt das Feld daneben?“',
        watch: 'Achte darauf, ob ein Kind beide Finger benutzt oder rät. Wer beim Ausmalen sicher ist, aber beim Aufschreiben „2B“ schreibt, braucht die feste Reihenfolge: erst der Buchstabe, dann die Zahl.',
      },
    },
    '3:times-tables#zehner-einmaleins': {
      title: 'Das 10er-Einmaleins und die Kernaufgaben',
      objective: 'Die Kinder rechnen die Aufgaben des 10er-Einmaleins und nutzen die Kernaufgaben 1 mal, 5 mal und 10 mal, die schon auf dem Blatt stehen, als Stützen.',
      note: {
        mistake: 'Die Kinder „hängen eine Null an“, ohne zu wissen, warum: Sie können nicht sagen, dass 6 · 10 sechs Zehner sind, und übertragen den Trick später auf Aufgaben, bei denen er nicht stimmt. Andere sagen für jede Aufgabe die ganze Reihe von vorn auf.',
        words: 'Frage: „Wie viele Zehner sind 6 · 10? Wie heißt die Zahl mit 6 Zehnern?“ Sag: „5 · 10 ist 50. Dann ist 6 · 10 ein Zehner mehr.“ Nenne 1 mal, 2 mal, 5 mal und 10 mal „Kernaufgaben“: Von ihnen aus findet man alle anderen.',
        watch: 'Wer findet 6 · 10 von 5 · 10 aus, und wer zählt in Zehnerschritten von vorn? Beides führt zum Ergebnis; das erste ist der Weg, den die Kinder für die anderen Reihen brauchen.',
      },
    },
    '3:times-tables#vierer-und-achter': {
      title: 'Das 4er- und das 8er-Einmaleins: verdoppeln',
      objective: 'Die Kinder rechnen die Aufgaben des 4er- und des 8er-Einmaleins und nutzen dabei das Verdoppeln: Die Ergebnisse der 4er-Reihe sind das Doppelte der 2er-Reihe, die der 8er-Reihe das Doppelte der 4er-Reihe.',
      note: {
        mistake: 'Die Kinder lernen jede Reihe wie ein neues Gedicht und sehen nicht, dass 6 · 4 das Doppelte von 6 · 2 ist. Bei 7 · 8 und 8 · 8 raten viele.',
        words: 'Frage: „Was ist 6 · 2? Und das Doppelte davon?“ Sag: „Mal 4 heißt zweimal verdoppeln, mal 8 heißt dreimal verdoppeln: 7, 14, 28, 56.“ Schreibe die 2er-, die 4er- und die 8er-Reihe untereinander an die Tafel.',
        watch: 'Achte darauf, wer ein Ergebnis der 8er-Reihe aus der 4er-Reihe holt. Wer die Reihe nur aufsagen kann, findet 7 · 8 nicht, wenn die Aufgabe einzeln gefragt wird.',
      },
    },
    '3:times-tables#dreier-und-sechser': {
      title: 'Das 3er- und das 6er-Einmaleins',
      objective: 'Die Kinder rechnen die Aufgaben des 3er-Einmaleins aus den Dreierschritten und die des 6er-Einmaleins als das Doppelte der 3er-Reihe.',
      note: {
        mistake: 'Die Kinder verzählen sich in den Dreierschritten nach der 18 und nach der 27. In der 6er-Reihe verwechseln sie die Ergebnisse 42, 48 und 54.',
        words: 'Frage: „Was ist 7 · 3? Und das Doppelte?“ Sag: „Die 6er-Reihe ist das Doppelte der 3er-Reihe: 7 · 3 = 21, also 7 · 6 = 42.“ Für schwere Aufgaben: „5 · 6 kennst du. 6 · 6 ist ein Sechser mehr.“',
        watch: 'Wer nutzt bei 7 · 6 die Kernaufgabe 5 · 6 oder das Doppelte von 7 · 3? Wer die Reihe jedes Mal von 6 an aufsagt, legt die Aufgabe noch einmal auf dem Brötchenblech: Reihen dazulegen und wegnehmen.',
      },
    },
    '3:times-tables#neuner-und-siebener': {
      title: 'Das 9er- und das 7er-Einmaleins: von den Kernaufgaben aus',
      objective: 'Die Kinder rechnen die Aufgaben des 9er- und des 7er-Einmaleins und leiten sie aus Kernaufgaben ab: 6 · 9 ist 6 · 10 minus 6, 9 · 7 ist 10 · 7 minus 7, 7 · 7 ist 5 · 7 plus 2 · 7.',
      note: {
        mistake: 'In der 9er-Reihe ziehen die Kinder am Ende nur 1 ab statt einer ganzen Gruppe: 7 · 9 wird zu 70 − 1 = 69. Die 7er-Reihe ist nicht das Doppelte einer Reihe, die die Kinder schon kennen; hier wird am meisten geraten.',
        words: 'Sag: „7 · 10 ist 70. Bei 7 · 9 ist jede der 7 Gruppen um eins kleiner, also 70 − 7 = 63.“ Frage: „Was nimmst du weg, eine 1 oder eine 7?“ Für die 7er-Reihe: „5 · 7 und 2 · 7 kennst du. Zusammen ist das 7 · 7.“ Und: „10 · 7 ist 70. Für 9 · 7 nehme ich einen Siebener weg: 63.“',
        watch: 'Lass dir bei 6 · 9 und 8 · 7 den Rechenweg sagen. Wer „54, weil 60 minus 6“ sagt, leitet ab. Wer lange schweigt und dann eine Zahl nennt, sagt im Kopf die Reihe auf.',
      },
    },
    '3:times-tables#einmaleins-tafel': {
      title: 'Die Einmaleinstafel: Was kann ich schon?',
      objective: 'Die Kinder füllen die Einmaleinstafel bis 10 · 10 aus, beginnen mit den Reihen, die sie schon können, und stellen fest, welche Aufgaben sie noch üben müssen.',
      note: {
        mistake: 'Die Kinder füllen die Tafel Zeile für Zeile durch Weiterzählen; das dauert die ganze Stunde und zeigt ihnen nichts. Viele sehen nicht, dass 6 · 7 und 7 · 6 Tauschaufgaben mit demselben Ergebnis sind, und üben beide einzeln.',
        words: 'Sag: „Trag zuerst ein, was du sicher weißt: die 1er-, 2er-, 5er- und 10er-Reihe, waagerecht und senkrecht.“ Frage: „Wenn du 3 · 5 kennst, wo steht 5 · 3?“ Dann: „Kreise die Felder ein, die noch leer sind. Das sind deine Übungsaufgaben.“',
        watch: 'Wer nutzt eine Tauschaufgabe, um ein Feld zu füllen, und wer zählt neu? Hebe die Liste der Übungsaufgaben jedes Kindes auf: Sie ist der Plan für das tägliche Einmaleins-Training.',
      },
    },
    '3:mult-div-relationship#umkehraufgaben': {
      title: 'Umkehraufgaben: Mal und Geteilt gehören zusammen',
      objective: 'Die Kinder lösen zu einem Punktefeld die zwei Malaufgaben und die zwei Geteiltaufgaben, die auf dem Blatt stehen, nutzen das Ergebnis der Malaufgabe für die Geteiltaufgaben und verwenden die Wörter Malaufgabe, Tauschaufgabe und Umkehraufgabe.',
      note: {
        mistake: 'Die Kinder rechnen jede der vier Aufgaben einzeln neu, oft durch Abzählen der Punkte, statt das Ergebnis der Malaufgabe zu nutzen. Bei 10 : 2 schreiben manche noch einmal die 10 oder die 2 ins Kästchen. Sollen sie selbst eine Geteiltaufgabe zum Punktefeld nennen, stellen sie die kleine Zahl nach vorn (5 : 10).',
        words: 'Zeige auf das Punktefeld: „2 Reihen mit je 5: 2 · 5 = 10. Jetzt verteile ich die 10 auf 2 Reihen: 10 : 2 = 5.“ Sag: „Die Geteiltaufgabe ist die Umkehraufgabe. Bei ihr steht das Ergebnis der Malaufgabe vorn.“ Frage: „Welche Malaufgabe hilft dir bei 30 : 6?“',
        watch: 'Achte darauf, ob ein Kind bei den Geteiltaufgaben auf die Malaufgaben darüber schaut. Wer bei 30 : 6 an 5 · 6 denkt, hat den Zusammenhang verstanden; wer die Punkte einzeln verteilt, hat ihn noch nicht. Lass am Ende ein Kind zu einem Punktefeld alle vier Aufgaben ohne Blatt nennen.',
      },
    },
  },
};
