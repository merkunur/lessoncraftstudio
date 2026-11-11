#!/usr/bin/env node
/**
 * The German unit list (Daily Teaching System, Part 4.5), written once into frontend/content/units/defs/de.json,
 * which is the hand-kept source from then on (this file documents where the list came from; re-running it
 * overwrites titles and order, so it refuses to run when defs/de.json exists unless --force is given).
 *
 * The lessons are the English lessons of Grades 1 to 3 (same teaching points, same worksheet types where the
 * German catalogue has them), RE-SEQUENCED by the three German state curricula of the registry (Bavaria, North
 * Rhine-Westphalia, Saxony; the crosswalk.json of frontend/content/curricula/de-by, de-nw and de-sn):
 *
 *   - a lesson is kept when at least one of the three states TEACHES its teaching point in primary school;
 *   - it sits in the band where the states that teach it place it (Jahrgangsstufen 1/2 or 3/4). Inside the band
 *     1/2 the curricula do not split the years; there the lesson keeps the year the German catalogue prints on
 *     its pages (1. Klasse, 2. Klasse);
 *   - the Kindergarten band is the year before school in Germany (all three registries mark it "prepares"):
 *     no unit in this first wave (PLAN.md Part 4, preschool is second wave outside pt, es, nl).
 *
 * What moved: three-digit numbers, adding and subtracting with blocks and in columns → Klasse 3 (Zahlenraum bis
 * 1000 is Klasse 3). Multiplication as equal groups, on the number line, the commutative law, the 2 and 5 tables,
 * division as sharing and grouping → Klasse 2. Prefixes → Klasse 2. Pronouns → Klasse 3.
 * What left: fractions on a number line, comparing and equivalent fractions, the whole from a unit fraction (no
 * state teaches them in primary school), so no fractions unit (three lessons are fewer than a unit's four);
 * squares on a grid; sorting into three groups.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'units', 'defs', 'de.json');
if (fs.existsSync(OUT) && !process.argv.includes('--force')) { console.error('defs/de.json exists: it is the source now (use --force to rebuild it from this list)'); process.exit(1); }
const en = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'units', 'defs', 'en.json'), 'utf8'));
// every English lesson by its teaching point: its worksheet types and its chosen activity travel with it
const enLesson = new Map();
for (const u of en.units) for (const l of u.lessons) enLesson.set(l.point, l);
const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/([0-9])\.([0-9])/g, '$1$2').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const SUBJ = { math: 'Mathe', literacy: 'Deutsch' };
const units = [];
const U = (id, grade, subject, title, points) => {
  const lessons = points.map((p) => {
    const l = enLesson.get(p);
    if (!l) throw new Error(id + ': no English lesson on ' + p);
    const x = { point: l.point, types: l.types };
    if ('activity' in l) x.activity = l.activity;
    if (l.titles) x.titles = l.titles;   // labels of two pages with one title: rewritten in German with the notes
    return x;                            // (`standards` name US codes and do not travel)
  });
  const long = 'Unterrichtseinheit ' + SUBJ[subject] + ' Klasse ' + grade + ': ' + title;
  units.push({
    id, slug: fold(title) + '-klasse-' + grade, status: 'pilot', grade: String(grade), subject, title,
    metaTitle: long.length <= 70 ? long : SUBJ[subject] + ' Klasse ' + grade + ': ' + title,
    metaDescription: '', weeks: Math.max(1, Math.round(lessons.length / 4)), lessons,
  });
};

// ── Mathe Klasse 1 ──
U('g1-add-subtract-within-10', 1, 'math', 'Plus und Minus bis 10', ['1:add-within-10-models', '1:subtract-cross-out', '1:make-10', '1:count-on-back-hops', '1:fact-families', '1:missing-number-equations', '1:word-problems', '1:fluency-within-20']);
U('g1-doubles-three-addends-number-walls', 1, 'math', 'Verdoppeln, drei Summanden und Zahlenmauern', ['1:doubles-halves', '1:odd-even-pairs', '1:add-three-addends', '1:number-walls']);
U('g1-tens-and-ones', 1, 'math', 'Zehner und Einer', ['1:tens-and-ones', '1:number-words', '1:compare-order-two-digit', '1:number-of-the-day']);
U('g1-hundreds-chart-skip-counting', 1, 'math', 'Zahlenstrahl, Hundertertafel und Zählen in Schritten', ['1:number-line-placement', '1:hundreds-chart', '1:one-ten-more-less', '1:skip-counting']);
U('g1-time-calendar-coins', 1, 'math', 'Uhr, Kalender und Münzen', ['1:time-read', '1:time-set-hands', '1:days-months-seasons', '1:ordinal-numbers', '1:coins']);
U('g1-shapes-measuring-graphs', 1, 'math', 'Formen, Messen und Diagramme', ['1:shape-attributes', '1:tangram-compose', '1:measure-length-units', '1:picture-graphs-sort-count', '1:bar-graphs', '1:patterns-missing']);
// ── Mathe Klasse 2 ──
U('de2-zahlen-bis-100', 2, 'math', 'Zahlen und Rechnen bis 100', ['2:bundle-ten-ones', '2:skip-count-5-10-100', '2:number-line-not-from-zero', '2:hundreds-chart-moves', '2:add-sub-within-100-practice']);
U('de2-groessen-daten', 2, 'math', 'Messen, Uhrzeit, Geld und Diagramme', ['2:measure-with-ruler', '2:compare-lengths', '2:time-5-min-quarter', '2:calendar', '2:shopping-money', '2:bar-graphs', '2:line-plots', '2:scaled-pictograph']);
U('de2-malnehmen', 2, 'math', 'Malnehmen: Gruppen, Felder und erste Einmaleinsreihen', ['2:equal-groups-times', '2:arrays', '3:mult-equal-groups', '3:mult-number-line', '3:commutative', '2:skip-count-3-4', '3:times-tables']);
U('de2-teilen', 2, 'math', 'Teilen: Verteilen, Aufteilen und die Hälfte', ['2:share-and-group', '3:division-sharing', '3:division-repeated-subtraction', '2:odd-even', '2:equal-shares-shapes', '2:fraction-of-a-set']);
U('g2-shapes-solids-symmetry', 2, 'math', 'Formen, Körper und Symmetrie', ['2:2d-attributes', '2:solids-in-real-life', '2:3d-faces-edges-vertices', '2:symmetry-line', '2:symmetry-complete', '2:tangram-orientation']);
// ── Mathe Klasse 3 ──
U('de3-zahlen-bis-1000', 3, 'math', 'Zahlen bis 1000', ['2:read-build-3-digit', '2:expanded-form-digit-value', '2:compare-order-3-digit', '2:hundred-more-less']);
U('de3-runden-schriftlich', 3, 'math', 'Runden und schriftlich rechnen bis 1000', ['2:round-to-ten', '3:rounding', '3:estimate-by-rounding', '2:add-with-blocks', '2:subtract-with-blocks', '2:column-method', '3:column-regrouping']);
U('de3-mal-geteilt-gleichungen', 3, 'math', 'Mal, geteilt, Gleichungen und Muster', ['3:mult-div-relationship', '3:muldiv-word-problems', '3:division-remainder', '3:balance-equations', '3:parity-of-sums', '3:arithmetic-patterns', '3:input-output']);
U('g3-time-temperature-mass-volume', 3, 'math', 'Zeit, Temperatur, Gewicht und Rauminhalt', ['3:time-to-minute', '3:elapsed-duration', '3:add-subtract-time', '3:time-12-24', '3:thermometer', '2:mass-grams', '2:read-jugs']);
U('g3-area-perimeter-volume', 3, 'math', 'Flächeninhalt und Umfang', ['3:area-model', '3:same-area', '3:perimeter', '3:same-perimeter', '3:volume-cubes']);
U('g3-shapes-and-data', 3, 'math', 'Rechte Winkel, Vierecke, Symmetrie und Diagramme', ['3:right-angles', '3:classify-quadrilaterals', '3:symmetry', '3:scaled-graphs', '3:line-plot-halves']);
// ── Deutsch ──
U('g1-sounds-spelling-syllables', 1, 'literacy', 'Laute, Silben und erste Wörter schreiben', ['1:rhyming', '1:word-families-syllable-reading', '1:phoneme-boxes', '1:digraphs', '1:spell-picture-words', '1:syllables-split']);
U('g1-reading-sentences-and-stories', 1, 'literacy', 'Sätze und Geschichten lesen', ['1:read-and-follow', '1:cloze', '1:unscramble-sentence', '1:question-words', '1:story-sequencing']);
U('g1-words-and-how-they-work', 1, 'literacy', 'Wörter und Wortarten', ['1:alphabetical-order', '1:word-classes', '1:articles', '1:opposites', '1:synonyms', '1:shades-of-meaning', '1:root-words']);
U('g2-sentences-and-grammar', 2, 'literacy', 'Sätze und Grammatik', ['2:sentence-boundaries', '2:word-classes', '2:plural-nouns', '2:verb-forms', '2:question-words']);
U('g2-spelling-and-word-building', 2, 'literacy', 'Rechtschreiben und Wörter bilden', ['2:digraphs', '2:spelling-rules', '2:compound-words', '2:root-words', '2:prefixes', '2:synonyms', '2:synonyms~doing-stage']);
U('g2-stories-facts-and-writing', 2, 'literacy', 'Geschichten lesen und schreiben', ['2:read-and-answer', '2:cloze-context', '2:describe-a-picture', '2:retell-with-starters', '2:animal-fact-file', '2:cursive-writing']);
U('g3-words-and-their-meanings', 3, 'literacy', 'Wortfelder, Wortfamilien und Pronomen', ['3:word-fields', '3:person-words', '3:root-words-in-context', '1:pronouns', '2:pronouns']);

const used = new Set();
for (const u of units) for (const l of u.lessons) { if (used.has(l.point)) throw new Error(l.point + ' is in two units'); used.add(l.point); }
fs.writeFileSync(OUT, JSON.stringify({ $comment: 'The German units (Part 4.5). Hand-kept source; first written by scripts/units/lists/build-de-defs.js, which says how the list follows the German state curricula.', units, plans: [] }, null, 1) + '\n');
console.log('de: ' + units.length + ' units, ' + units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons → ' + path.relative(REPO, OUT));
for (const u of units) if (u.metaTitle.length > 70) console.log('TOO LONG ' + u.metaTitle.length + ' ' + u.metaTitle);
