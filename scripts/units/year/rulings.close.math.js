/**
 * The ruling of every "close" line of the type work list (Daily Teaching System, Part 12.2, 2026-11-13).
 *
 * The matching said for 128 needed pages: an existing type does the same task, but something differs from the page
 * the teacher described. The rule for each line:
 *
 *   use     the existing page teaches the lesson's OBJECTIVE; what differs is the scaffold or the layout the teacher
 *           had in mind (a number line where she described two ten-frames, one answer box where she drew three).
 *           The lesson is written on the page as it is. Where the fit is a LEVEL of the type and not its level 2,
 *           the level is named (the unit's lesson then hands out that level as its core page).
 *   change  the objective itself is not met without a change to the generator: an operation the lesson does not
 *           teach is mixed in, the number range of the grade is missing, the one thing the lesson is about is
 *           not asked. The note says the change in a few words.
 *   build   what the type has is too far from the page; it is built as a new type (it joins the "to build" list).
 *   N(type) a "change" that is DONE: the change was built as a new type (a new face of the same generator, so the
 *           published pages of the close type stay as they are). The line counts as "use" of the new type.
 *
 * Who ruled: the build session, reading each line's objective and the analyst's account of the difference. It is a
 * first ruling: the native teacher-reviewer of each language reads the lesson texts WITH their pages before a lesson
 * goes live, and overrules a "use" where the page does not carry the lesson.
 */
'use strict';
const U = (note, level, type) => ({ rule: 'use', note, ...(level ? { level } : {}), ...(type ? { type } : {}) });
// N = a NEW type was built for the line (a new face of the close generator); the lesson is written on it
const N = (type, note, level) => U(note, level, type);
const C = (note) => ({ rule: 'change', note });
const B = (note) => ({ rule: 'build', note });
module.exports = {
  en: {
    // Kindergarten
    'K-002': N('K-641', 'built: two rows to pair column by column, circle the row with more or color the star (Match Them Up)', 2),
    'K-003': U('one direction a task, with pictures; level 3 mixes one more and one less', 3),
    'K-004': U('six pairs of written numbers; the number line on top is on the projector tool', 1),
    'K-005': U('the dot-paper page; sides and corners are counted aloud'),
    'K-007': C('the cone is missing from the solids'),
    'K-008': U('tracing lanes for 11 to 20'),
    'K-009': N('K-640', 'built: 11 to 20 pictures in rows of five, any number (Count and Write: 11 to 20)', 2),
    'K-010': U('the same task with totals to 10'),
    'K-011': U('counters crossed out on the ten-frame', 2),
    'K-012': U('add-to stories with a picture and one answer box (Kindergarten solves with drawings)', 1),
    'K-013': U('take-away stories with a picture', 1),
    'K-014': C('put-together stories are missing from the story bank'),
    'K-015': N('K-636', 'built: a strip of 6 or 7 squares coloured in two colours; level 2 finds five ways to make 6, level 3 six ways to make 7 (Take Apart 6 and 7)', 2),
    'K-016': U('the bond pages of 8 and of 9'),
    'K-018': U('the same equation on a ten-frame'),
    'K-019': N('K-627', 'built: circle ten of 11 to 19 things, then 10 + _ = _ (Ten and Some More)', 2),
    'K-021': N('K-637', 'built: the number is printed, the child draws it into two empty ten-frames (Draw the Number on Two Ten-Frames)', 2),
    'K-022': N('K-634', 'built: number bonds with a teen number as the whole and ten as one part (Ten and How Many More?)', 2),
    'K-023': N('K-633', 'built: the number chart 1 to 50 with ten empty boxes (level 3: fourteen, in runs)', 2),
    'K-025': N('K-632', 'built: number strips that start anywhere, to 50 on level 1 and to 100 from level 2 (Count On from Any Number)', 2),
    'K-026': U('the strip of tens to 100, with the groups-of-ten page'),
    // Grade 1
    '1-027': U('true or false, within 10 at level 1, within 20 with all three forms above'),
    '1-028': U('the double is printed at level 1', 1),
    '1-029': U('level 1 is addition only, across ten, with the first task worked', 1),
    '1-030': N('G1-566', 'built: the trio subtraction, number bond with one part empty, helper addition (Think Addition to Subtract)', 2),
    '1-031': B('a put-together story with a bar model and an equation frame (the bar page has no story)'),
    '1-032': C('a line for the equation with a box for the unknown under each story'),
    '1-033': U('compare stories with the two amounts as rows of pictures'),
    '1-034': B('stories with three addends (the story bank has none; the bare sums exist)'),
    '1-035': N('G1-564', 'built: exactly one ten-rod and 1 to 9 ones with the frame 1 rod, _ ones, = _ (Teen Numbers: One Ten and Some Ones)', 2),
    '1-036': N('G1-563', 'built: ten-rods only, the frame shows a rod picture in place of the times sign (Count the Tens: 10 to 90)', 2),
    '1-037': N('G1-558', 'built: level 1 adds whole tens only (34 + 20)', 1),
    '1-038': N('G1-565', 'built: whole tens minus whole tens with rods to cross out (Subtract Tens from Tens)', 2),
    '1-039': N('G1-559', 'built: level 1 adds ones only, no new ten (32 + 5)', 1),
    '1-040': N('G1-557', 'built: addition only within 100, to the next ten first (27 + 5)', 2),
    '1-041': U('two two-digit numbers as rods and cubes, no new ten'),
    '1-042': B('adding with a new ten on a tens-and-ones mat (the block page never regroups)'),
    '1-043': U('clocks to the hour and half hour matched to digital times', 3),
    '1-045': U('two pages: circle the shapes cut into equal parts; halves and fourths'),
    // Grade 2
    '2-046': U('level 1 is addition only, across ten', 1),
    '2-047': U('near doubles in either order; doubles and halves are their own pages'),
    '2-048': N('G1-556', 'built: subtraction only, back to ten first (15 - 7)', 2),
    '2-049': N('G1-566', 'the trio page built for Grade 1 carries the lesson at its level without a number bond; the daily facts are a routine the teacher leads (no strip page)', 3),
    '2-050': U('more than nine tens with ones: write the number (level 1 is too many tens, level 2 too many ones)', 1),
    '2-051': U('expanded form both ways with a zero place', 3),
    '2-053': N('G2-504', 'built: the three partial-sum lines under each sum (Add Tens and Ones); the sticks-and-dots drawing is done on scrap paper', 2),
    '2-054': B('subtracting with a ten opened, on a mat'),
    '2-056': B('one-step stories within 100 with a bar model and an equation'),
    '2-058': B('compare stories within 100 with the larger or the smaller amount unknown'),
    '2-059': C('two-step stories with two-digit numbers within 100'),
    '2-060': U('column addition of three-digit numbers with carrying'),
    '2-061': N('G2-502', 'built: subtraction only in columns, three-digit numbers, one regrouping on level 2 and two on level 3', 2),
    '2-062': U('column subtraction across a zero', 3),
    '2-063': U('count mixed coins, largest first'),
    '2-066': U('a table of counts and an empty picture graph'),
    '2-068': C('the child draws the rows and columns into an empty rectangle'),
    // Grade 3
    '3-069': N('G3-483', 'built (nothing was close): an array of squares the child cuts between two rows into two known facts (Break Apart a Hard Fact)', 2),
    '3-070': U('the empty 10 by 10 square, filled in the order the teacher gives', 3),
    '3-072': C('two-step stories with three-digit numbers within 1,000'),
    '3-075': C('rectangles with side lengths and units and no squares inside'),
    '3-078': N('G3-481', 'built: a dot on a number line from 0 to 1, the child writes its fraction; levels 1 and 2 unit fractions only (What Fraction Is the Dot?)', 2),
    '3-080': C('readings to the half and the quarter inch'),
  },
  de: {
    '1-082': U('eine Zeile je Zahl von 1 bis 5 mit der Ziffer zum Nachspuren', 1),
    '1-083': U('drei Seiten: Zehnerfeld zählen, Zahl ins Feld malen, Ziffern schreiben'),
    '1-084': U('zwei Bildgruppen und das passende Zeichen'),
    '1-085': U('Vorgänger und Nachfolger, dazu die Zahlenketten vorwärts und rückwärts', 1),
    '1-086': N('K-635', 'gebaut: Mengen von 2 bis 9 unter dem Becher (Stufe 1: 2 bis 5, Stufe 2: 6 bis 9)', 2),
    '1-087': N('K-638', 'gebaut: Zahlenhäuser mit leeren Stockwerken, das Kind findet alle Zerlegungen selbst (Stufe 2: 6 bis 8)', 2),
    '1-088': N('G1-562', 'gebaut: zwei Bildgruppen und nur die beiden Plusaufgaben (Tauschaufgaben), Summen 6 bis 10', 2),
    '1-090': U('zwei Seiten: Schritten folgen, Wege angeben'),
    '1-091': U('zwei Seiten: die Rechnung zum Bild schreiben, eine Rechengeschichte erfinden', 3),
    '1-092': U('ein volles Zehnerfeld und ein zweites: Zahl und Gleichung schreiben', 2),
    '1-093': N('G1-561', 'gebaut: die kleine Aufgabe über der großen (3 + 4 und 13 + 4); Stufe 1 Plus, Stufe 2 Minus, Stufe 3 beides', 2),
    '1-094': U('Stufe 1 ist nur Plus über die 10, die erste Aufgabe ist vorgemacht', 1),
    '1-095': U('6 + 7 als 6 + 6 + 1 schreiben'),
    '1-096': N('G1-556', 'gebaut: nur Minus, zuerst zurück zur 10', 2),
    '1-102': N('G1-560', 'gebaut: 31 bis 59 lose Einer, Zehner einkreisen, Zehner und Einer notieren (Stufe 3: 51 bis 79)', 2),
    '1-104': C('Preise in ganzen Euro mit Scheinen; die deutschen Münzdaten haben nur Cent'),
    '2-105': N('G1-558', 'gebaut: nur Zehnerzahlen, Stufe 3 mischt dazu und weg', 3),
    '2-106': N('G1-559', 'gebaut: nur Einer ohne Zehnerübergang; die kleine Aufgabe (3 + 4 neben 23 + 4) schreibt die Lehrkraft an die Tafel', 3),
    '2-108': N('G1-557', 'gebaut: nur Plus bis 100 mit einstelliger Zahl, erst bis zum nächsten Zehner (47 + 8 = 47 + 3 + 5), am Zahlenstrahl', 2),
    '2-109': N('G1-556', 'gebaut: Stufe 3 ist Minus bis 100 mit einstelliger Zahl, erst zurück zum Zehner (53 − 6 = 53 − 3 − 3)', 3),
    '2-110': N('G2-500', 'gebaut: nur Plus am Rechenstrich, Stufe 1 ohne Zehnerübergang, Stufe 2 und 3 mit; die Sprünge am Strich sind die Zwischenschritte', 2),
    '2-111': N('G2-501', 'gebaut: nur Minus am Rechenstrich, Stufe 1 ohne Zehnerübergang, Stufe 2 und 3 mit; die Sprünge am Strich sind die Zwischenschritte', 2),
    '2-117': U('die 10er-Reihe mit den vorgemachten Kernaufgaben', 1),
    '2-118': U('die Reihenseiten 4er und 8er'),
    '2-119': U('die Reihenseiten 3er und 6er'),
    '2-120': U('die Ableitungsketten und die Reihenseiten 7er und 9er', 2),
    '2-121': U('die leere Einmaleins-Tafel', 3),
    '2-122': U('Punktefeld und die vier Aufgaben der Mal-Familie'),
    '3-124': U('Zahlenstrahl in Hunderter- und Zehnerschritten bis 1000', 3),
    '3-126': C('dreistellig plus dreistellig mit Zeilen für die Rechenschritte'),
    '3-127': B('abziehen oder ergänzen: nahe Zahlen (503 − 497) und die Wahl des Weges'),
    '3-128': U('Zauberquadrate 3 mal 3'),
    '3-136': C('fertige schriftliche Rechnungen bis 1000 prüfen; heute waagerecht bis 100'),
  },
  sv: {
    '1-154': U('två bildgrupper och rätt tecken'),
    '1-156': U('sant eller falskt; likhetstecknet åt båda håll kommer på nivå 2 och 3'),
    '1-157': C('lägesorden framför, bakom, mellan och bredvid; i dag andra lägesord'),
    '1-158': U('två sidor: följ stegen, skriv stegen'),
    '1-160': N('G1-561', 'byggd: den lilla uppgiften över den stora (3 + 4 och 13 + 4); nivå 1 addition, nivå 2 subtraktion, nivå 3 båda', 2),
    '1-161': U('6 + 7 skrivet som 6 + 6 + 1'),
    '1-162': U('nivå 1 är bara addition över tio, första uppgiften är löst', 1),
    '1-163': N('G1-556', 'byggd: bara subtraktion, först ner till tian', 2),
    '1-167': U('jämförelsehändelser med två bildrader', 2),
    '1-168': C('händelser där starten saknas finns inte i berättelsebanken'),
    '1-170': U('två räknehändelser med ruta för uträkning och svar', 2),
    '1-172': N('G1-560', 'byggd: 31 till 59 lösa ental, ringa in tiotal, skriv tiotal och ental (nivå 1: 21 till 39)', 2),
    '1-174': U('rita mynt som betalar priset exakt', 3),
    '2-175': N('G1-558', 'byggd: bara hela tiotal, nivå 3 blandar plus och minus', 3),
    '2-176': U('sidan för lektionen: plus och minus i tur och ordning upp till 100', 3),
    '2-177': N('G2-504', 'byggd: mall för mellanled under varje addition, tiotal för sig, ental för sig, summa (nivå 2 med tiotalsövergång)', 2),
    '2-178': N('G2-501', 'byggd: bara subtraktion på tom tallinje, tiotalen först; talpar nära varandra (61 − 58) räknar klassen upp på tavlans tallinje', 2),
    '2-179': C('priser 12 till 95 kr som betalas med sedel; i dag mynt upp till 50 kr'),
    '2-181': B('tabell för uppskattning och uppmätt värde (meter och centimeter)'),
    '2-182': C('hela kilogram med 1-kilosvikter; i dag gram'),
    '2-183': N('G2-503', 'byggd: mätkannan graderad i deciliter (1 liter = 10 streck; nivå 3 två liter)', 2),
    '2-185': U('dubbelt och hälften upp till 100 som maskiner', 3),
    '2-186': U('klockor på femminuterstider mot tiden i ord', 3),
    '2-187': C('tider som inte är hela timmar (från nio till halv tolv)'),
    '2-189': U('ett program med pilar och antal rutor', 2),
    '2-191': U('rita bilden dubbelt så stor'),
    '3-198': N('G3-482', 'byggd: kedjor som bygger 6:ans tabell ur 5:ans (nivå 1), 6:ans och 7:ans (nivå 2), 7:ans (nivå 3)', 1),
    '3-199': N('G3-483', 'byggd: rutnät för 7 · 7 till 9 · 9 som eleven delar med ett eget streck; 9:ans tabell skrivs på G3-405', 2),
    '3-203': C('egen fråga och egna svarsalternativ; i dag är de tryckta'),
    '3-204': B('mäta i halva centimeter och själv göra diagrammet'),
    'K-146': U('stapeldiagram med bildkategorier: skriv antalet', 1),
    'K-148': U('två grupper: hur många tillsammans'),
    'K-149': U('några stryks över: hur många är kvar', 2),
    'K-150': N('K-639', 'byggd: högen och lådorna utan divisionsuttryck (En till dig, en till mig)', 2),
  },
};
