/**
 * data/b4/pronouns.js — the G1-352 `pronouns` bank (family key `pronouns`;
 * design docs/worksheet-gen/b4-designs/G1-352-pronouns.md §5; critic record
 * _work/G1-352-critic.md rulings 8-12, 16-19).
 *
 * EN block HAND-AUTHORED (2026-09-21, G1-352 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b4-locale.js from i18n/.draft-b4-<loc>.json
 * into data/b4/locales/pronouns.<loc>.json (native panels author names + tags,
 * chips / initial, map, objectMap + objects (de/nl), 12 frames x {sg, pl}, 8
 * anaphora frames, the possessive block or its refusal, strings — the EN block
 * is a SOURCE TO AUDIT, never a target to translate). `data/` is gitignored —
 * the reviewer force-adds this module.
 *
 * Shape (design §5):
 *   PRONOUNS[loc] = {
 *     people: [{key, pic:{theme, noun}, depicted:'m'|'f', minPx:44|56, picOpened:true}],
 *              GLOBAL — the ONE locale-neutral bank of 32 OPENED portraits (m 20 / f 12);
 *              lives in the EN block ONLY (overlays may not add, drop or retag; the
 *              question-words family READS it from here — README build order).
 *              `minPx` is per PICTURE: the smallest rendered width at which the
 *              depicted sex still reads (44 = a bust / a clear figure, 56 = a full
 *              figure whose head is <= 12 px at 56). The composer never draws a
 *              picture below its minPx for the slot; the gate asserts it on every
 *              data-lcs-pic. Pinned by DESIGN key + theme through fileUri (five
 *              portraits have no vocab entry; no page ever prints a person noun).
 *     names:   [{name, gender:'m'|'f'}]   12 = 6 f + 6 m (fi 16 = 8 + 8); the en 8 of
 *              data/b2/sentences.js tagged + Zoe Ava (f) Jack Eli (m)
 *     and:     'and'   andBefore: null | {i:'e', hi:'e'} (es)
 *     chips:   ['he','she','they']        the fixed printed chip order (fr/es/pt 4; fi 2;
 *                                          de er/sie/es; nl hij/zij/het)
 *     initial: ['He','She','They']        the sentence-initial forms, same order
 *     map:     { base:{key: chipIndex}, replace, anaphora, sort, rewrite }
 *              keys m1 f1 mp fp xp (persons) | obj:<code> (de/nl objects) | p (fi pairs);
 *              a MISSING key = the item is refused on that face (de/nl mp/fp/xp on base
 *              and sort — sie/zij = she AND they — never reach a chip)
 *     objectMap: null | {m:0, f:1, n:2} (de) | {d:0, h:2} (nl)   vocab gender code → chip
 *     objects: []  | [{key, pic:{theme, noun}, picOpened:true}]   de/nl 12, never a person noun
 *     frames:  [{id, sg:'{subj} reads a book.', pl:'{subj} read a book.'}]   12; `{subj}`
 *              is the FIRST token; the verb literal carries the number; F1 + F5 read them
 *     anaphora: [{id, intro:'{a} and {b} …', s:[{text:'{P} …', key:'sg'|'pl'} x2], contentNeutral:true}]   8 (F2)
 *     possessive: { chips, chipW, byOwner:{key: chipIndex} | null, frame:{sg, pl}, artTable:null|{m,f},
 *                   things:[{key, pic, forms:null|{m1,f1,p}, picOpened:true}] } | null   (F3; es/fi null)
 *              chipW = the F3 chip width for THIS locale's chips (design §3 F3: max(60, widest
 *              label at Baloo 2 700 20 + 18): en 66, nl 60, pt 66, de 66, fr/it 60, sv/da/no 84;
 *              the gate measures every rendered label against it)
 *     refuse:  { possessive:false }       es / fi: true (the refusal is the record)
 *     strings: { base, replace, anaphora, possessive, sort, rewrite: {title, instruction[, bankWord]} }
 *   }
 *
 * EN data rules applied here (every portrait + thing OPENED 2026-09-21 on the
 * build's contact sheets at 64 px and 160 px — see _work/G1-352-build.md):
 *   - people = exactly the design's 32 (§2 "The people pool"); the excluded keys
 *     (actor firefighter paramedic veterinarian baby baby_girl artist astronaut
 *     cook mechanic pilot crossing_guard crossing_guard_2 office_worker
 *     delivery_driver mail_carrier sanitation_worker park_ranger doctor_2
 *     bus_driver_2 truck_driver) are ABSENT; second files of a key (hospital/doctor,
 *     classroom/teacher, music/singer …) are NOT pinned — one theme per key;
 *   - frames: present simple 3rd person, `{subj}` first, one slot, end with '.',
 *     no he/she/they token, sg !== pl; every frame fits F1 (<= 55 chars with the two
 *     longest names) and F5 (printed <= 56, answer <= 28 glyphs);
 *   - anaphora: content-neutral by signature (no sentence gives the sex away);
 *   - possessive things: 12 short nouns (<= 5 glyphs, so the filled pl frame with the
 *     two longest names stays <= 43 chars: "These are Jack and Emma. This is ___ robot." = 42),
 *     forms:null (en possessives encode the OWNER only → byOwner), artTable:null;
 *   - strings.base === the spec's i18n.en (the validator asserts it).
 */
'use strict';

const PRONOUNS = {
  en: {
    people: [
      // m, minPx 44 (16)
      { key: 'architect',           pic: { theme: 'occupations', noun: 'architect' },           depicted: 'm', minPx: 44, picOpened: true },
      { key: 'author',              pic: { theme: 'occupations', noun: 'author' },              depicted: 'm', minPx: 44, picOpened: true },
      { key: 'barber',              pic: { theme: 'occupations', noun: 'barber' },              depicted: 'm', minPx: 44, picOpened: true },
      { key: 'baker',               pic: { theme: 'occupations', noun: 'baker' },               depicted: 'm', minPx: 44, picOpened: true },
      { key: 'detective',           pic: { theme: 'occupations', noun: 'detective' },           depicted: 'm', minPx: 44, picOpened: true },   // a boy: short hair, tie
      { key: 'doctor',              pic: { theme: 'occupations', noun: 'doctor' },              depicted: 'm', minPx: 44, picOpened: true },
      { key: 'judge',               pic: { theme: 'occupations', noun: 'judge' },               depicted: 'm', minPx: 44, picOpened: true },
      { key: 'musician',            pic: { theme: 'occupations', noun: 'musician' },            depicted: 'm', minPx: 44, picOpened: true },
      { key: 'pharmacist',          pic: { theme: 'occupations', noun: 'pharmacist' },          depicted: 'm', minPx: 44, picOpened: true },
      { key: 'photographer',        pic: { theme: 'occupations', noun: 'photographer' },        depicted: 'm', minPx: 44, picOpened: true },
      { key: 'singer',              pic: { theme: 'occupations', noun: 'singer' },              depicted: 'm', minPx: 44, picOpened: true },   // occupations, never music/singer
      { key: 'police_officer',      pic: { theme: 'occupations', noun: 'police_officer' },      depicted: 'm', minPx: 44, picOpened: true },   // no vocab entry: fine, never printed
      { key: 'coach',               pic: { theme: 'occupations', noun: 'coach' },               depicted: 'm', minPx: 44, picOpened: true },   // a boy: cap, shorts
      { key: 'farmer',              pic: { theme: 'occupations', noun: 'farmer' },              depicted: 'm', minPx: 44, picOpened: true },
      { key: 'janitor',             pic: { theme: 'occupations', noun: 'janitor' },             depicted: 'm', minPx: 44, picOpened: true },
      { key: 'student',             pic: { theme: 'classroom',   noun: 'student' },             depicted: 'm', minPx: 44, picOpened: true },   // a boy with a book
      // m, minPx 56 (4): full figures, the head <= 12 px at 56; sex from the silhouette
      { key: 'carpenter',           pic: { theme: 'occupations', noun: 'carpenter' },           depicted: 'm', minPx: 56, picOpened: true },
      { key: 'chef',                pic: { theme: 'occupations', noun: 'chef' },                depicted: 'm', minPx: 56, picOpened: true },
      { key: 'gardener',            pic: { theme: 'occupations', noun: 'gardener' },            depicted: 'm', minPx: 56, picOpened: true },
      { key: 'construction_worker', pic: { theme: 'occupations', noun: 'construction_worker' }, depicted: 'm', minPx: 56, picOpened: true },   // no vocab entry
      // f, minPx 44 (8)
      { key: 'librarian',           pic: { theme: 'occupations', noun: 'librarian' },           depicted: 'f', minPx: 44, picOpened: true },
      { key: 'teacher',             pic: { theme: 'occupations', noun: 'teacher' },             depicted: 'f', minPx: 44, picOpened: true },   // occupations, never classroom/teacher
      { key: 'waitress',            pic: { theme: 'occupations', noun: 'waitress' },            depicted: 'f', minPx: 44, picOpened: true },
      { key: 'flight_attendant',    pic: { theme: 'occupations', noun: 'flight_attendant' },    depicted: 'f', minPx: 44, picOpened: true },   // no vocab entry
      { key: 'mail_carrier_2',      pic: { theme: 'occupations', noun: 'mail_carrier_2' },      depicted: 'f', minPx: 44, picOpened: true },   // no vocab entry
      { key: 'athlete',             pic: { theme: 'occupations', noun: 'athlete' },             depicted: 'f', minPx: 44, picOpened: true },   // ponytail, running
      { key: 'ballerina',           pic: { theme: 'occupations', noun: 'ballerina' },           depicted: 'f', minPx: 44, picOpened: true },
      { key: 'girl',                pic: { theme: 'toys',        noun: 'girl' },                depicted: 'f', minPx: 44, picOpened: true },   // red hat, red dress; a PERSON, never an object caption
      // f, minPx 56 (4)
      { key: 'cashier',             pic: { theme: 'occupations', noun: 'cashier' },             depicted: 'f', minPx: 56, picOpened: true },
      { key: 'florist',             pic: { theme: 'occupations', noun: 'florist' },             depicted: 'f', minPx: 56, picOpened: true },
      { key: 'nurse',               pic: { theme: 'occupations', noun: 'nurse' },               depicted: 'f', minPx: 56, picOpened: true },
      { key: 'tailor',              pic: { theme: 'occupations', noun: 'tailor' },              depicted: 'f', minPx: 56, picOpened: true },
    ],
    names: [
      { name: 'Mia', gender: 'f' }, { name: 'Ben', gender: 'm' }, { name: 'Emma', gender: 'f' }, { name: 'Leo', gender: 'm' },
      { name: 'Anna', gender: 'f' }, { name: 'Tom', gender: 'm' }, { name: 'Lily', gender: 'f' }, { name: 'Max', gender: 'm' },
      { name: 'Zoe', gender: 'f' }, { name: 'Ava', gender: 'f' }, { name: 'Jack', gender: 'm' }, { name: 'Eli', gender: 'm' },
    ],
    and: 'and',
    andBefore: null,
    chips: ['he', 'she', 'they'],
    initial: ['He', 'She', 'They'],
    map: {
      base:     { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
      replace:  { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
      anaphora: { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
      sort:     { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
      rewrite:  { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
    },
    objectMap: null,
    objects: [],
    frames: [
      { id: 'read-book',     sg: '{subj} reads a book.',       pl: '{subj} read a book.' },
      { id: 'play-ball',     sg: '{subj} plays with a ball.',  pl: '{subj} play with a ball.' },
      { id: 'eat-apple',     sg: '{subj} eats an apple.',      pl: '{subj} eat an apple.' },
      { id: 'ride-bike',     sg: '{subj} rides a bike.',       pl: '{subj} ride a bike.' },
      { id: 'draw-cat',      sg: '{subj} draws a cat.',        pl: '{subj} draw a cat.' },
      { id: 'sing-song',     sg: '{subj} sings a song.',       pl: '{subj} sing a song.' },
      { id: 'jump-rope',     sg: '{subj} jumps rope.',         pl: '{subj} jump rope.' },
      { id: 'feed-dog',      sg: '{subj} feeds the dog.',      pl: '{subj} feed the dog.' },
      { id: 'paint-picture', sg: '{subj} paints a picture.',   pl: '{subj} paint a picture.' },
      { id: 'build-tower',   sg: '{subj} builds a tower.',     pl: '{subj} build a tower.' },
      { id: 'go-park',       sg: '{subj} goes to the park.',   pl: '{subj} go to the park.' },
      { id: 'like-milk',     sg: '{subj} likes milk.',         pl: '{subj} like milk.' },
    ],
    anaphora: [
      { id: 'park',    intro: '{a} and {b} are in the park.',    s: [{ text: '{P} has a ball.', key: 'sg' },      { text: '{P} has a kite.', key: 'sg' }],       contentNeutral: true },
      { id: 'school',  intro: '{a} and {b} are at school.',      s: [{ text: '{P} reads a book.', key: 'sg' },    { text: '{P} draws a picture.', key: 'sg' }],  contentNeutral: true },
      { id: 'home',    intro: '{a} and {b} are at home.',        s: [{ text: '{P} eats an apple.', key: 'sg' },   { text: '{P} drinks milk.', key: 'sg' }],      contentNeutral: true },
      { id: 'beach',   intro: '{a} and {b} are at the beach.',   s: [{ text: '{P} has a bucket.', key: 'sg' },    { text: '{P} has a shell.', key: 'sg' }],      contentNeutral: true },
      { id: 'garden',  intro: '{a} and {b} are in the garden.',  s: [{ text: '{P} picks a flower.', key: 'sg' },  { text: '{P} waters a plant.', key: 'sg' }],   contentNeutral: true },
      { id: 'kitchen', intro: '{a} and {b} are in the kitchen.', s: [{ text: '{P} bakes a cake.', key: 'sg' },    { text: '{P} makes a sandwich.', key: 'sg' }], contentNeutral: true },
      { id: 'bus',     intro: '{a} and {b} are on the bus.',     s: [{ text: '{P} has a red bag.', key: 'sg' },   { text: '{P} has a blue bag.', key: 'sg' }],   contentNeutral: true },
      { id: 'zoo',     intro: '{a} and {b} are at the zoo.',     s: [{ text: '{P} sees a lion.', key: 'sg' },     { text: '{P} sees a monkey.', key: 'sg' }],    contentNeutral: true },
    ],
    possessive: {
      chips: ['his', 'her', 'their'],
      chipW: 66,                                    // F3 chip width: max(60, widest label at Baloo 2 700 20 + 18) — `their` 43.7 (design §3 F3; the gate measures)
      byOwner: { m1: 0, f1: 1, mp: 2, fp: 2, xp: 2 },
      frame: { sg: 'This is {subj}. This is ___ {thing}.', pl: 'These are {subj}. This is ___ {thing}.' },
      artTable: null,
      things: [
        { key: 'ball',  pic: { theme: 'toys', noun: 'ball' },                 forms: null, picOpened: true },
        { key: 'kite',  pic: { theme: 'toys', noun: 'kite' },                 forms: null, picOpened: true },
        { key: 'doll',  pic: { theme: 'toys', noun: 'doll' },                 forms: null, picOpened: true },
        { key: 'robot', pic: { theme: 'toys', noun: 'robot' },                forms: null, picOpened: true },
        { key: 'train', pic: { theme: 'toys', noun: 'train' },                forms: null, picOpened: true },
        { key: 'car',   pic: { theme: 'toys', noun: 'car' },                  forms: null, picOpened: true },
        { key: 'drum',  pic: { theme: 'music', noun: 'drum' },                forms: null, picOpened: true },
        { key: 'book',  pic: { theme: 'classroom', noun: 'book' },            forms: null, picOpened: true },
        { key: 'hat',   pic: { theme: 'accessories', noun: 'hat' },           forms: null, picOpened: true },
        { key: 'cake',  pic: { theme: 'desserts and sweets', noun: 'cake' },  forms: null, picOpened: true },
        { key: 'dog',   pic: { theme: 'pets', noun: 'dog' },                  forms: null, picOpened: true },
        { key: 'cat',   pic: { theme: 'pets', noun: 'cat' },                  forms: null, picOpened: true },
      ],
    },
    refuse: { possessive: false },
    strings: {
      base:       { title: 'Personal Pronouns', instruction: 'Look at the person and read the name. Circle the word we use instead of the name.' },
      replace:    { title: 'Replace the Name with a Pronoun', instruction: 'Read the sentence. Write the word from the bank that replaces the name in the second sentence.', bankWord: 'bank' },
      anaphora:   { title: 'Who Is He? Pronouns in Sentences', instruction: 'Read the sentences. Draw a line from each word in a box to the name it stands for.' },
      possessive: { title: 'Possessive Pronouns', instruction: 'Look at who owns the thing. Circle the word that shows it belongs to that person.' },
      sort:       { title: 'Sort the Names: He, She or They', instruction: 'Read each name card. Write the name under the word we use for that person.' },
      rewrite:    { title: 'Rewrite the Sentence with a Pronoun', instruction: 'Read the sentence. Write it again on the lines, but use a pronoun instead of the name.' },
    },
  },
};

module.exports = { PRONOUNS };
