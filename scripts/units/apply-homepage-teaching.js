// Part 11.7, the operator's yes (2026-11-14): the teaching wing becomes the first room of the LIVE homepage.
// The same edits make-homepage-teaching-preview.js made for the preview, applied to app/[locale]/page.tsx itself:
// the wing and its data, and the rooms renumbered behind it. Title, description, main heading and address are not
// touched; a language without the products gets no wing and keeps today's page. Refuses to run twice.
//   node scripts/units/apply-homepage-teaching.js
const fs = require('fs');
const f = require('path').join(__dirname, '..', '..', 'frontend', 'app', '[locale]', 'page.tsx');
const raw = fs.readFileSync(f, 'utf8'); const crlf = raw.includes('\r\n'); let s = raw.replace(/\r\n/g, '\n');
if (s.includes('TeachingWing')) throw new Error('the live homepage has the teaching wing already');
const rep = (a, b) => { if (s.split(a).length !== 2) throw new Error('anchor (' + (s.split(a).length - 1) + '×): ' + String(a).slice(0, 70)); s = s.replace(a, () => b); };
rep("import GrandHall from '@/components/homepage-v10/GrandHall';", "import GrandHall from '@/components/homepage-v10/GrandHall';\nimport TeachingWing from '@/components/homepage-v10/TeachingWing';\nimport { getHomepageTeaching } from '@/lib/homepage-teaching';");
rep("  const touch = MANIPULATIVES.find((x) => x.id === TOUCHABLE);", "  // the teaching wing (Part 11.7): null in a language without the products, and the page is today's page there\n  const teaching = await getHomepageTeaching(locale).catch(() => null);\n  const N = teaching ? ['II', 'III', 'IV', 'V', 'VI', 'VII'] : ['I', 'II', 'III', 'IV', 'V', 'VI'];\n\n  const touch = MANIPULATIVES.find((x) => x.id === TOUCHABLE);");
rep('        <PrintRoom locale={locale} numeral="I" ', '        {teaching ? <TeachingWing numeral="I" data={teaching} /> : null}\n        <PrintRoom locale={locale} numeral={N[0]} ');
rep('<Studio locale={locale} numeral="II" ', '<Studio locale={locale} numeral={N[1]} ');
rep('<InstrumentHall locale={locale} numeral="III" ', '<InstrumentHall locale={locale} numeral={N[2]} ');
rep('<Playroom locale={locale} numeral="IV" ', '<Playroom locale={locale} numeral={N[3]} ');
rep('<Dispatch locale={locale} numeral="V" ', '<Dispatch locale={locale} numeral={N[4]} ');
rep('<MembersRoom locale={locale} numeral="VI" ', '<MembersRoom locale={locale} numeral={N[5]} ');
fs.writeFileSync(f, crlf ? s.replace(/\n/g, '\r\n') : s);
console.log('ok app/[locale]/page.tsx: the teaching wing is the first room');
