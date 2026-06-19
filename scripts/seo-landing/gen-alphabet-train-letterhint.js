#!/usr/bin/env node
/* alphabet-train / mode=letter-hint × PRESCHOOL, READINESS-class. The "Letter Hint" decks: each picture card
 * shows its BEGINNING LETTER printed on it, so a pre-reader sorts the PICTURES into A-to-Z order by that letter
 * (vs the null-mode landings, where the child orders bare LETTERS). Distinct mechanic + distinct search intent →
 * its own coordinate (mode=letter-hint). NO educationalAlignment (no `standard` — CCSS begins at K; ABC-order is
 * below-K readiness). strand "Alphabetical order with picture cues (readiness)" — DISTINCT from the null-mode
 * "Alphabet awareness (readiness)" per §22.1 readiness-label-family distinctness. level 'preschool'.
 * POSITIVE phonics fence (vs RF.K.3.a, letter<->SOUND): the printed letter is a VISUAL cue — copy says
 * "beginning letter"/"first letter" and NEVER "sound"/"phonics". Additive merge: keeps every en.json landing
 * except (type=alphabet-train, mode=letter-hint), so the existing null-mode landings are untouched.
 * 8 SKEL x 7 P2 = 56 > 37 themes. Usage: node scripts/seo-landing/gen-alphabet-train-letterhint.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/en-alphabet-train-letterhint-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// LETTER-HINT: sort PICTURE CARDS into ABC order by the BEGINNING LETTER printed on each. (n)=nouns list,(g)=gen.
// Mechanic vocabulary deliberately diverges from the null SKEL (pictures/cards/first-letter/pre-reader, NOT bare
// letters/wagons/which-letter-comes-next). ZERO sound vocabulary — the letter is a visual cue.
const SKEL = [
  (n,g)=>`On this preschool worksheet a child sorts a row of ${g} into alphabetical order, and the clever part is that every picture has its beginning letter printed right on it. The child looks at the first letter on each card — A, then B, then C — and slides the pictures into A-to-Z order to build a little train. Because the starting letter is shown on each picture, a child who cannot yet read the words can still work out where every one belongs. It is gentle alphabet practice: find the first letter, place its picture in the line, and move on to the next of the ${g}.`,
  (n,g)=>`Build a picture train in ABC order! This pre-K worksheet gives a child a set of ${g}, each one labelled with the letter it starts with, and asks them to line the pictures up from A toward Z. Instead of ordering bare letters, the child orders the pictures themselves, using the printed first letter as a friendly hint — so even before reading, they can see that a card marked B comes after a card marked A. Matching each picture to its place by that first letter is concrete, unhurried alphabet practice, and the cheerful ${g} make the sorting feel like play.`,
  (n,g)=>`Which picture comes first? On this preschool worksheet a child puts ${g} in alphabetical order by looking at the beginning letter printed on each one. The pictures work like little cards: one shows the letter it starts with, the next shows its own, and the child arranges them A to Z along a train. Reading the first letter and finding where it belongs in the alphabet is a calm, hands-on way to learn letter order — no need to know the word, just the letter shown on the picture. The familiar ${g} keep a young child happily sorting, card after card.`,
  (n,g)=>`Sort the pictures from A to Z! This pre-K worksheet shows a child a jumble of ${g}, each printed with its starting letter, and asks them to put the pictures in alphabetical order. The first letter on every card is the clue: find the one that starts with A, then the one that starts with B, and line them up to build a train. Ordering pictures by their beginning letter lets a pre-reader practise the shape and order of the alphabet long before they can read, and the friendly ${g} make every step inviting.`,
  (n,g)=>`This preschool worksheet turns alphabetical order into a picture train: a child takes ${g}, each marked with the letter it begins with, and arranges them from A toward Z. The printed first letter does the helping — the child does not have to read the word, only spot the letter and decide where it sits in the alphabet. Card by card the train grows, and putting the pictures of ${g} in order builds an early sense of letter sequence in a concrete, no-pressure way. It is sorting by first letter, plain and friendly.`,
  (n,g)=>`Can you line up the pictures in ABC order? On this pre-K worksheet a child sorts ${g} into alphabetical order using the beginning letter shown on each card. One picture starts with A, another with B, and the child places them in sequence to complete a train. Because the first letter is printed right there, the task stays gentle — recognise the letter, find its spot, move on — and a child can succeed well before they can read a single word. The cheerful ${g} keep the alphabetical sorting feeling like a game.`,
  (n,g)=>`Put ${g} in order from A to Z! This preschool worksheet asks a child to arrange a row of pictures by the beginning letter printed on each one. Rather than handling loose letters, the child works with whole pictures, using the little letter label to decide which comes first, which comes next, and so on down the train. Sorting pictures of ${g} by their first letter is concrete, friendly alphabet-order practice, and it works for a pre-reader because the letter is always there to see. Each card placed is a quiet, happy step toward knowing the alphabet in order.`,
  (n,g)=>`A friendly picture train for preschoolers: the child arranges ${g} in alphabetical order, guided by the beginning letter printed on every card. They look at the first letter, find where it belongs between A and Z, and slide the picture into place. Sorting the pictures this way — by the letter each one starts with — lets a young child rehearse the order of the alphabet without needing to read, one card at a time. The task stays calm and unhurried, and the familiar ${g} make finishing the A-to-Z train feel like a real little win.`,
];
const P2 = [
  (g)=>`Putting pictures in alphabetical order by their first letter is a gentle first step into letter knowledge. A child learns to spot the beginning letter, recognise its shape, and remember where it falls between A and Z — all without having to read the word underneath. With cheerful ${g} on the cards, that letter-order practice feels like sorting a favourite collection, and it lays the alphabet groundwork that reading later builds on.`,
  (g)=>`Sorting picture cards by their starting letter gives a pre-reader a real, hands-on way to learn the order of the alphabet. The printed letter is the support: the child matches each picture of ${g} to its place in the A-to-Z line, building both letter recognition and a sense of sequence. It is exactly the kind of concrete, low-pressure alphabet practice that suits preschool, where seeing and moving comes long before reading.`,
  (g)=>`Knowing the alphabet in order is an early literacy-readiness skill, and ordering pictures by their first letter makes it concrete. A child does not read here — they look at the beginning letter on each card of ${g} and decide where it belongs. That keeps the task within reach of a pre-reader while still building real letter knowledge and a feel for A-to-Z order, the framework that supports reading down the road.`,
  (g)=>`A picture train sorted from A to Z gives a child two kinds of practice at once: recognising each beginning letter and remembering its place in the alphabet. The letter printed on every ${g} card means a pre-reader can do the whole task by sight, matching picture to letter to position. It is calm, concrete alphabet work — the readiness that comes before words, built one card at a time.`,
  (g)=>`Before a child reads words, they get to know the letters and their order, and sorting labelled pictures is a friendly way in. Each card of ${g} carries its first letter, so the child practises spotting that letter and placing the picture between A and Z. Recognising letters and lining them up in order is core preschool readiness, and doing it with pictures keeps a young learner engaged and confident.`,
  (g)=>`Ordering pictures by their starting letter asks a child to recognise each beginning letter and recall where it sits in the A-to-Z sequence. With the letter printed on every ${g} card, the job stays within a pre-reader's reach, building letter knowledge and alphabet order together. A themed train makes the sorting inviting, and there is no reading required — just looking, matching, and placing each picture in turn.`,
  (g)=>`A child's first map of the alphabet is its order, and arranging picture cards from A to Z makes that order visible. The beginning letter on each ${g} card is the guide: the child reads the letter, not the word, and finds its place in the line. That is gentle, concrete letter-order practice, the alphabet readiness that suits preschool, where a young learner builds confidence by seeing and doing rather than reading.`,
];
function p3(glower, nb){
  return `Children love sliding each picture into place and watching the A-to-Z train grow, and finishing the line in order feels like a real win. When this is easy, sort the pictures with ${nb[0]}, or try ${nb[1]}. You can also browse every alphabet worksheet or the whole preschool collection — each sheet prints cleanly or plays online for free, with no timers and no scores. The more a child orders pictures of ${glower} by their first letter, the surer their letter knowledge grows, one card at a time.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

// Clean landing slug (the deck slugs carry random variant suffixes; the landing URL must stay clean + stable).
function landingSlugOf(co){ return `alphabet-train-letter-hint-${co.slugTheme}`; }

const list = COORDS.slice().filter(co => !!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
const dropped = COORDS.filter(co => !THEMES[co.theme]).map(c=>c.theme);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] alphabet-train letter-hint: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
if (dropped.length) console.log(`  [dropped — no copy-data for theme] ${dropped.join(', ')}`);
const out=[];
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ THEMES[nbA.theme].h1.toLowerCase(), THEMES[nbB.theme].h1.toLowerCase() ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'alphabet-train', mode:'letter-hint', theme:co.theme, level:'preschool' },
    eyebrow: 'Alphabetical Order Worksheet',
    h1: `Alphabet Train with ${d.h1}: Sort the Pictures by First Letter`,
    strand: 'Alphabetical order with picture cues (readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'preschool', 'alphabetical order', 'first letter', 'alphabet train']),
    p1: SKEL[cell.skel](d.nouns, d.gen),
    p2: P2[cell.p2](d.gen),
    p3: p3(d.gen.toLowerCase(), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Alphabet Train with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
      {label:`Alphabet Train with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
      {label:`Alphabet Train with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
      {label:`Alphabet Train with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: landingSlugOf(list[(i+11)%list.length])},
    ],
    title: `Alphabetical Order with Pictures for Preschool – ${d.h1} | Free Printable PDF`,
    metaDescription: `Sort ${d.gen} into ABC order by their first letter — a preschool alphabetical-order worksheet with picture cards. Free printable PDF, play online free.`,
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type === 'alphabet-train' && l.coordinate.mode === 'letter-hint'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} alphabet-train letter-hint landings (dropped ${dropped.length}); total landings now ${merged.landings.length}`);

// Self-lint (mirrors gen-wave7-alphabettrain.js).
let short=0, banned=0, phon=0, mg=0, fence=0, hasStd=0, notPre=0, noThemeTok=0;
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const PHONICS=['beginning sound','letter sound','letter-sound','phonics','sound it out','sounding out','sound out','phoneme',' sound']; // visual letter only — never sounds
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic','how many','count the'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  PHONICS.forEach(x=>{if(lc.includes(x)){phon++;console.log(`  PHONICS-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH/COUNT-LEAK ${e.slug}: "${x}"`);}});
  if(!e.slotTokens.some(t=>e.p1.toLowerCase().includes(String(t).toLowerCase()))){noThemeTok++;console.log(`  NO-THEME-TOKEN-IN-P1 ${e.slug}`);}
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  if(e.coordinate.level!=='preschool'){notPre++;console.log(`  NOT-PRESCHOOL ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', banned?`${banned} banned`:'no banned', '|', phon?`${phon} PHONICS-LEAK`:'no phonics-leak (visual letter only)', '|', mg?`${mg} math/count`:'no math/count', '|', noThemeTok?`${noThemeTok} no-theme-token-in-P1`:'theme-token in every P1', '|', hasStd?`${hasStd} HAS-STD`:'all readiness', '|', notPre?`${notPre} NOT-PRESCHOOL`:'all preschool');
