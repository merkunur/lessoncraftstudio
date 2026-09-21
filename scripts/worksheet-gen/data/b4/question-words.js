/**
 * data/b4/question-words.js — the G1-353 `question-words` bank (family key
 * `question-words`; design docs/worksheet-gen/b4-designs/G1-353-question-words.md
 * §5; critic record _work/G1-353-critic.md rulings 12-15, 17, 19, 22).
 *
 * EN block HAND-AUTHORED (2026-09-21, G1-353 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b4-locale.js from i18n/.draft-b4-<loc>.json
 * into data/b4/locales/question-words.<loc>.json (native panels author qwords /
 * starters / bins, 12 frames x {text, q.who, q.<kind>}, 14-15 place literals (or
 * null = refused), 6 time literals, qPrefix, sortThingForm, genderFilter, strings
 * — the EN block is a SOURCE TO AUDIT, never a target to translate). `data/` is
 * gitignored — the reviewer force-adds this module.
 *
 * Persons are NOT here: the 12 tagged names + 32 OPENED portraits are the
 * pronouns family's (data/b4/pronouns.js, read at build through
 * lib/b4-common.js bank('pronouns', loc)); build order G1-352 before G1-353.
 * Things are NOT here either: the pool is MECHANICAL — every objForms key of
 * bank('instructions', loc) with a colour picture in one of `thingThemes` (the
 * six G1-308-opened themes; the FIRST candidate in that theme order is pinned,
 * never pictureFor's random pick), minus the sv / da / no definite-clash keys
 * (§5 rule 10) and any key in `excludeThings`.
 *
 * Shape (design §5):
 *   QUESTION_WORDS[loc] = {
 *     qwords:   {who, what, where, when, howmany}   the fixed printed chip order
 *               who · what · where · when · howmany (fi: the INFLECTED forms)
 *     starters: [6]   F5 only = qwords who..when + why + how; never howmany
 *     bins:     {who, what, where}   F3 heads WITH the question mark (es "¿Quién?")
 *     binAliases: undefined | {what:true}   fi: bins.what is the nominative "Mikä?"
 *     qPrefix:  ''    es '¿'
 *     nbsp:     undefined | true   fr: every question ends with NBSP + "?"
 *     sortThingForm: 'bare' | 'unique'   F3 tile form of a thing (displayWord singular | objForms.unique)
 *     genderFilter: {} | {count:'m'}   es / pt / it: count frames take masculine plurals only
 *     excludeThings: []   per-locale pool exclusions on top of the mechanical rule
 *     chipWidths: {<qwords literal>: px}   MEASURED chip widths (Baloo 2 700 20 / pad 12) for the
 *               strip guard; absent entries fall back to the estimate 24 + 12.4 x glyphs + 5
 *     frames:   [{id, kind:'thing'|'place'|'time'|'count', text, q:{who, <kind>}, signed:true[, objCase:'acc'|'dat' (de)]}]   12 = 3 per kind
 *               text = `{name}` FIRST + verb + exactly ONE complement slot of its
 *               kind ({thing}|{part}|{dat} · {place} · {time} · {n} + {pl}|{part});
 *               q.who opens with qwords.who and omits {name}; q.<kind> opens with
 *               qwords[<kind's ask>] and omits the complement (count: omits {n},
 *               keeps {pl}); every literal WHOLE — the code substitutes and marks,
 *               never inflects, capitalises, strips or shortens
 *     places:   [{key, pic:{theme, noun}, text, picOpened:true}]   15 locale-neutral
 *               keys (14 + cabin, the panel's optional 15th); overlays keep the key
 *               list and may set text:null (= refused for that locale)
 *     twins:    [['lake','river'], ['house','cabin']]   one member per page
 *     times:    [{text, h}]   6 o'clock literals; clock.js m:0; F1 / F5 only
 *     thingThemes: the six G1-308-opened colour themes, in pin order
 *     numbers:  [2,3,4,5]   count frames; numberWord(n, loc)
 *     faces:    {base|match|fill|sort|write|ask: {kinds:[…]}}   the chip / bin / bank
 *               / starter kind set per face (the spec's d2 config must equal it)
 *     strings:  {base, match, fill, sort, write, ask: {title, instruction[, bankWord, boxWord, pictureWord]}}
 *   }
 *
 * EN data rules applied here:
 *   - qwords US spelling; "Which" never; "How many" ONE literal; "Who" for persons
 *     only (every frame subject is a tagged name, never an animal)
 *   - frames: present simple 3rd person; `what` questions take do-support as a
 *     whole literal ("What does {name} see?"); thing verbs (sees / draws / likes)
 *     and count verbs (sees / draws / finds) read naturally with an animal, a
 *     fruit, a vehicle or a toy alike (the pool is mechanical: "has the antelope"
 *     was rejected for that reason); place verbs (is / plays / reads) read with
 *     every one of the 15 place literals; time verbs (plays / eats / sleeps)
 *   - places: all 15 pictures OPENED 2026-09-21 on the build's 160 px contact
 *     sheet (scratch G1-353-places-160.png): house · garden (flowers) · beach ·
 *     tent · forest · lake · river · mountain · pool · kitchen · garage · bed ·
 *     sofa · playground (climbing frame + slide) · cabin; lake / river are both a
 *     water landscape and house / cabin both a house (the twin groups)
 *   - the F3 tile guard (textW18 <= 112, ~11 glyphs) passes exactly six en place
 *     literals: at home · in bed · in the tent · at the lake · on the sofa ·
 *     at the pool (the design's ">= 6" floor, met exactly; recorded)
 *   - strings.base === the spec's i18n.en (the validator asserts it); the base
 *     title is the measured head "Question Words: Who, What, Where" while the d2
 *     chips add When (design §1)
 */
'use strict';

const QUESTION_WORDS = {
  en: {
    qwords: { who: 'Who', what: 'What', where: 'Where', when: 'When', howmany: 'How many' },
    starters: ['Who', 'What', 'Where', 'When', 'Why', 'How'],
    bins: { who: 'Who?', what: 'What?', where: 'Where?' },
    qPrefix: '',
    sortThingForm: 'bare',
    genderFilter: {},
    excludeThings: [],
    // MEASURED 2026-09-21 (the gate's chip sheet through render/one, the shell woff2 from file://): the rendered width of
    // each chip at Baloo 2 700 20 / height 44 / padding 0 12 — the strip guard reads these before the estimate (the
    // gate asserts every entry within 3 px of the render; the panels author theirs from a render the same way)
    chipWidths: { Who: 68.1, What: 75, Where: 86, When: 78.9, 'How many': 121.8 },
    frames: [
      // thing (3)
      { id: 'see-thing',   kind: 'thing', text: '{name} sees {thing}.',      q: { who: 'Who sees {thing}?',      what: 'What does {name} see?' },        signed: true },
      { id: 'draw-thing',  kind: 'thing', text: '{name} draws {thing}.',     q: { who: 'Who draws {thing}?',     what: 'What does {name} draw?' },       signed: true },
      { id: 'like-thing',  kind: 'thing', text: '{name} likes {thing}.',     q: { who: 'Who likes {thing}?',     what: 'What does {name} like?' },       signed: true },
      // place (3)
      { id: 'be-place',    kind: 'place', text: '{name} is {place}.',        q: { who: 'Who is {place}?',        where: 'Where is {name}?' },            signed: true },
      { id: 'play-place',  kind: 'place', text: '{name} plays {place}.',     q: { who: 'Who plays {place}?',     where: 'Where does {name} play?' },     signed: true },
      { id: 'read-place',  kind: 'place', text: '{name} reads {place}.',     q: { who: 'Who reads {place}?',     where: 'Where does {name} read?' },     signed: true },
      // time (3)
      { id: 'play-time',   kind: 'time',  text: '{name} plays {time}.',      q: { who: 'Who plays {time}?',      when: 'When does {name} play?' },       signed: true },
      { id: 'eat-time',    kind: 'time',  text: '{name} eats {time}.',       q: { who: 'Who eats {time}?',       when: 'When does {name} eat?' },        signed: true },
      { id: 'sleep-time',  kind: 'time',  text: '{name} sleeps {time}.',     q: { who: 'Who sleeps {time}?',     when: 'When does {name} sleep?' },      signed: true },
      // count (3)
      { id: 'see-count',   kind: 'count', text: '{name} sees {n} {pl}.',     q: { who: 'Who sees {n} {pl}?',     howmany: 'How many {pl} does {name} see?' },  signed: true },
      { id: 'draw-count',  kind: 'count', text: '{name} draws {n} {pl}.',    q: { who: 'Who draws {n} {pl}?',    howmany: 'How many {pl} does {name} draw?' }, signed: true },
      { id: 'find-count',  kind: 'count', text: '{name} finds {n} {pl}.',    q: { who: 'Who finds {n} {pl}?',    howmany: 'How many {pl} does {name} find?' }, signed: true },
    ],
    places: [
      { key: 'house',      pic: { theme: 'miscellaneous',    noun: 'house' },      text: 'at home',           picOpened: true },
      { key: 'garden',     pic: { theme: 'spring',           noun: 'garden' },     text: 'in the garden',     picOpened: true },
      { key: 'beach',      pic: { theme: 'summer',           noun: 'beach' },      text: 'at the beach',      picOpened: true },
      { key: 'tent',       pic: { theme: 'camping',          noun: 'tent' },       text: 'in the tent',       picOpened: true },
      { key: 'forest',     pic: { theme: 'camping',          noun: 'forest' },     text: 'in the forest',     picOpened: true },
      { key: 'lake',       pic: { theme: 'camping',          noun: 'lake' },       text: 'at the lake',       picOpened: true },
      { key: 'river',      pic: { theme: 'camping',          noun: 'river' },      text: 'at the river',      picOpened: true },
      { key: 'mountain',   pic: { theme: 'camping',          noun: 'mountain' },   text: 'on the mountain',   picOpened: true },
      { key: 'pool',       pic: { theme: 'summer',           noun: 'pool' },       text: 'at the pool',       picOpened: true },
      { key: 'kitchen',    pic: { theme: 'around the house', noun: 'kitchen' },    text: 'in the kitchen',    picOpened: true },   // a scene; legible at >= 56 only (drawn at 88 / 120)
      { key: 'garage',     pic: { theme: 'around the house', noun: 'garage' },     text: 'in the garage',     picOpened: true },
      { key: 'bed',        pic: { theme: 'around the house', noun: 'bed' },        text: 'in bed',            picOpened: true },
      { key: 'sofa',       pic: { theme: 'around the house', noun: 'sofa' },       text: 'on the sofa',       picOpened: true },
      { key: 'playground', pic: { theme: 'activities',       noun: 'playground' }, text: 'at the playground', picOpened: true },   // a climbing frame with a slide: a PLACE
      { key: 'cabin',      pic: { theme: 'camping',          noun: 'cabin' },      text: 'in the cabin',      picOpened: true },   // the optional 15th key (twin of house)
    ],
    twins: [['lake', 'river'], ['house', 'cabin']],
    times: [
      { text: "at eight o'clock", h: 8 },
      { text: "at three o'clock", h: 3 },
      { text: "at six o'clock",   h: 6 },
      { text: "at nine o'clock",  h: 9 },
      { text: "at two o'clock",   h: 2 },
      { text: "at seven o'clock", h: 7 },
    ],
    thingThemes: ['animals', 'fruits', 'vehicles', 'toys', 'zoo animals', 'farm animals'],
    numbers: [2, 3, 4, 5],
    faces: {
      base:  { kinds: ['who', 'what', 'where', 'when'] },
      match: { kinds: ['who', 'what', 'where', 'when', 'howmany'] },
      fill:  { kinds: ['who', 'what', 'where', 'when', 'howmany'] },
      sort:  { kinds: ['who', 'what', 'where'] },
      write: { kinds: ['who', 'what', 'where', 'when', 'howmany'] },
      ask:   { kinds: ['who', 'what', 'where', 'when', 'why', 'how'] },
    },
    strings: {
      base:  { title: 'Question Words: Who, What, Where',      instruction: 'Read the sentence. Look at the highlighted words. Circle the question word that asks for them.' },
      match: { title: 'Match the Question to the Answer',      instruction: 'Read each question on the left. Draw a line to the answer on the right that fits it.' },
      fill:  { title: 'Fill In the Question Word',             instruction: 'Read the answer and find the highlighted words. Write the question word from the bank in the box.', bankWord: 'bank', boxWord: 'box' },
      sort:  { title: 'Sort the Answers: Who, What or Where',  instruction: 'Read each word tile. Write it in the bin under the question it answers: Who, What or Where.' },
      write: { title: 'Write the Question',                    instruction: 'Read the answer. Look at the highlighted words. Write the question that asks for them on the line.' },
      ask:   { title: 'Ask About the Picture: Why and How',    instruction: 'Look at the picture. Finish each question. Start with the word already on the line.', pictureWord: 'picture' },
    },
  },
};

module.exports = { QUESTION_WORDS };
