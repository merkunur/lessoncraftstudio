#!/usr/bin/env node
/*
 * gen-telling-time.js — append the 3 EN telling-time grade landings to en.json.
 *
 * SEO landing program Part 2 (2026-06-25): the printable-gen math-skill types
 * (telling-time, fractions, geometry, …) were never covered by the §22 fan. This
 * builds the telling-time pilot: ONE landing per grade band (the themeless type's
 * coordinate is (telling-time, granularity-mode, "", level)). Each landing collapses
 * its grade's sibling decks. Honest per-grade skill + CCSS (1.MD.B.3 / 2.MD.C.7 /
 * 3.MD.A.1). Idempotent (skips if the slugs already exist). Re-run gate.js after.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', 'en.json');

// deck-slug helpers — each base carries -2..-10 sub-variants (10 decks); a lone base = 1.
const expand = (base) => [base, ...Array.from({ length: 9 }, (_, i) => `${base}-${i + 2}`)];
const G1 = [...expand('telling-time-g1148'), ...expand('telling-time-g1149'), 'telling-time-g1150']; // 21
const G2 = [...expand('telling-time-g2249'), ...expand('telling-time-g2250')];                         // 20
const G3 = [...expand('telling-time-g3344'), ...expand('telling-time-g3354'),
            ...expand('telling-time-g3355'), ...expand('telling-time-g3356')];                          // 40

const ENTRIES = [
  {
    slug: 'telling-time-grade-1',
    variantShape: 'collapsed',
    coordinate: { type: 'telling-time', mode: 'hour-half-hour', theme: '', level: 'grade-1' },
    eyebrow: 'Telling Time Worksheet',
    h1: 'Grade 1 Telling Time Worksheets: Read the Clock to the Hour and Half Hour',
    strand: 'Measurement & Data',
    standard: '1.MD.B.3',
    slotTokens: ['Grade 1'],
    p1: "These Grade 1 telling time worksheets ask a child to look at an analog clock face and read the time to the hour and the half hour. Each page shows a friendly clock with an hour hand and a minute hand, and the child writes the time on the line below — eight o'clock, half past three, and so on. Some sheets go the other way, giving a time in words and asking the child to draw the hands where they belong, which is the gentle next step after reading one. Working out where the short hand points, and noticing that the long hand stands straight up at the hour and straight down at the half hour, is the heart of first-grade clock reading. The worksheets keep the numbers small and the clocks large and clear, so a child who is just meeting the hour and half hour can take each one slowly, point at the hands, count around the face, and check the answer without any rush.",
    p2: "In this set the times stay on the hour and the half hour, the two anchors a first grader learns first. A child reads a clock, says the time out loud, and writes it down; on the matching pages, they pick the clock that shows a given time instead. The pictures are plain and the steps are short, so the practice feels calm — just look at the hands, find the hour, and decide whether the long hand points up to the top or down to the bottom.",
    p3: "If your child is comfortable reading the hour and half hour, you can print more of these worksheets as a PDF and keep going on paper. Everything here is free, with no sign-up and no account. There are no timers, no scores, and no badges: each child sets the pace, and a wrong answer is just a reason to count around the clock again. When the hour and half hour feel steady, the Grade 2 telling time worksheets move on to five-minute and quarter-hour times. You can also browse the full set of printable time worksheets to find the clock pages that fit where your child is right now.",
    canonicalDeckSlug: 'telling-time-g1148',
    collapseSiblings: G1,
    carousel: [
      { label: 'Telling Time to 5 Minutes (Grade 2)', href: 'telling-time-grade-2' },
      { label: 'Telling Time to the Minute (Grade 3)', href: 'telling-time-grade-3' },
    ],
    title: 'Telling Time Worksheets for Grade 1 – Hour & Half Hour | Free Printable PDF',
    metaDescription: "Free printable Grade 1 telling time worksheets — read an analog clock to the hour and half hour. Download the PDF, no sign-up, and practise at your child's own pace.",
  },
  {
    slug: 'telling-time-grade-2',
    variantShape: 'collapsed',
    coordinate: { type: 'telling-time', mode: 'to-five-minutes', theme: '', level: 'grade-2' },
    eyebrow: 'Telling Time Worksheet',
    h1: 'Grade 2 Telling Time Worksheets: Read the Clock to Five Minutes and Quarter Hours',
    strand: 'Measurement & Data',
    standard: '2.MD.C.7',
    slotTokens: ['Grade 2'],
    p1: "These Grade 2 telling time worksheets ask a child to read an analog clock to the nearest five minutes, the step up from the hour and half hour. Each clock shows the hour and minute hands, and the child counts the minute marks by fives — five, ten, fifteen — to write a time such as 'ten past four' or '3:25'. Several pages focus on the quarter hours, where the child learns that quarter past sits at fifteen minutes and quarter to sits at forty-five. Other sheets pair an analog clock with a digital readout so the child matches the two ways of showing the very same moment. Counting around the face in fives, keeping track of which hand is which, and reading both past-the-hour and to-the-hour language are exactly the skills a second grader is building. The clocks stay large and the numbers stay clear, so a child can slow down on the tricky in-between times and check the count one mark at a time.",
    p2: "This set works in five-minute steps and the quarter hours, so the times are richer than first grade without jumping to every single minute. A child reads a clock and writes the time, or reads a written time and circles the clock that matches it. Skip-counting by five around the dial is the quiet engine here — once that feels steady, the minute hand stops being a mystery and the in-between times come into focus.",
    p3: "When your child can read to five minutes and name the quarter hours, you can print more of these worksheets as a PDF and keep practising on paper. It is all free, with no sign-up and no account. There are no timers and no scores, so there is no pressure on a slower count — a missed mark is just one more trip around the dial. Ready for the next step? The Grade 3 telling time worksheets read to the single minute and work with elapsed time, and you can browse every printable time worksheet to pick the right page next.",
    canonicalDeckSlug: 'telling-time-g2249',
    collapseSiblings: G2,
    carousel: [
      { label: 'Telling Time to the Hour & Half Hour (Grade 1)', href: 'telling-time-grade-1' },
      { label: 'Telling Time to the Minute (Grade 3)', href: 'telling-time-grade-3' },
    ],
    title: 'Telling Time Worksheets for Grade 2 – To 5 Minutes & Quarter Hours | Free Printable PDF',
    metaDescription: 'Free printable Grade 2 telling time worksheets — read a clock to the nearest five minutes, plus quarter past and quarter to. Download the PDF, no sign-up needed.',
  },
  {
    slug: 'telling-time-grade-3',
    variantShape: 'collapsed',
    coordinate: { type: 'telling-time', mode: 'to-the-minute', theme: '', level: 'grade-3' },
    eyebrow: 'Telling Time Worksheet',
    h1: 'Grade 3 Telling Time Worksheets: To the Minute, Elapsed Time, and 24-Hour Clocks',
    strand: 'Measurement & Data',
    standard: '3.MD.A.1',
    slotTokens: ['Grade 3'],
    p1: "These Grade 3 telling time worksheets read an analog clock to the single minute and then put that skill to work. On the reading pages a child writes times such as '7:43' or 'nineteen minutes past two', counting the small marks between the numbers one by one. Other pages move into elapsed time — a clock shows a start and an end, and the child works out how much time has passed, which is the bridge from reading a clock to actually using one. A few sheets compare 12-hour and 24-hour time, matching three in the afternoon with 15:00, and a final group adds and subtracts spans of time. Reading to the minute, measuring how long something takes, and moving between the two clock systems are the third-grade time skills these pages cover. The clocks and number lines stay roomy, so a child can take each calculation step by step and check it over without any hurry.",
    p2: "This set reads to the exact minute and then asks what to do with it: how much time has passed, what a time looks like on a 24-hour clock, what you get when you add forty minutes to a start time. A child reads carefully, counts the minutes, and writes the answer; the elapsed-time pages give a start and an end, and the child finds the gap between them. It is the point where telling time turns into solving small, real time problems.",
    p3: "Once your child reads to the minute and can work out elapsed time, you can print more of these worksheets as a PDF and keep going on paper. Everything is free, with no sign-up and no account, and there are no timers or scores to rush a careful count. If a calculation comes out wrong, it is simply a chance to walk the minutes again. You can revisit the Grade 2 telling time worksheets for a lighter five-minute warm-up, or browse the full set of printable time worksheets to find the page that fits your child today.",
    canonicalDeckSlug: 'telling-time-g3344',
    collapseSiblings: G3,
    carousel: [
      { label: 'Telling Time to the Hour & Half Hour (Grade 1)', href: 'telling-time-grade-1' },
      { label: 'Telling Time to 5 Minutes (Grade 2)', href: 'telling-time-grade-2' },
    ],
    title: 'Telling Time Worksheets for Grade 3 – To the Minute & Elapsed Time | Free Printable PDF',
    metaDescription: 'Free printable Grade 3 telling time worksheets — read clocks to the minute, find elapsed time, and compare 12- and 24-hour time. Download the PDF, no sign-up.',
  },
];

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
// format-fidelity guard: ensure a round-trip reproduces the file byte-for-byte, so the
// only diff this script introduces is the appended entries (no 171k-line reflow).
const roundTrip = JSON.stringify(data, null, 2) + '\n';
if (roundTrip !== raw) {
  console.error('FORMAT MISMATCH: round-trip != original (would reflow whole file). Aborting.');
  console.error('  raw len=' + raw.length + ' roundTrip len=' + roundTrip.length);
  process.exit(1);
}
const have = new Set(data.landings.map((l) => l.slug));
let added = 0;
for (const e of ENTRIES) {
  if (have.has(e.slug)) { console.log('skip (exists):', e.slug); continue; }
  data.landings.push(e);
  added++;
  console.log('added:', e.slug, '| decks=', e.collapseSiblings.length, '| standard=', e.standard);
}
if (added) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('TOTAL added=' + added + ' | en.json landings now=' + data.landings.length);
} else {
  console.log('nothing added (all present)');
}
