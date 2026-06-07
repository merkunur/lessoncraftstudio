#!/usr/bin/env node
/* Wave 7 LEAD — EN alphabet-train/(null) × PRESCHOOL, READINESS-class. The program's FIRST Preschool landing.
 * Mechanic (alphabet-train.html L1437-1469 languageAlphabets/sortLettersByAlphabet, L3064): put letters in
 * ALPHABETICAL ORDER to build the train — letter-identity + sequence, ZERO phoneme dimension. NO educationalAlignment
 * (no `standard` key — CCSS begins at K, nothing to align to below K). strand "Alphabet awareness (readiness)".
 * level 'preschool'. DOUBLE-FENCE boundary vs the live K matching/letter + find-and-count (RF.K.3.a, letter↔SOUND):
 * copy sells ABC-ORDER / SEQUENCE only and NEVER mentions sounds/phonics (the fence is positive — the page contains
 * no sound vocabulary at all, even negated). 8 P1 x 7 P2 = 56 > 38. Usage: node scripts/seo-landing/gen-wave7-alphabettrain.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave7-alphabettrain-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// PRESCHOOL alphabet-AWARENESS / letter-SEQUENCE. (n)=nouns,(g)=gen. ABC-order only; ZERO sound vocabulary.
const SKEL = [
  (n,g)=>`This preschool alphabet worksheet helps a child put the letters in alphabetical order to build a train, with cheerful ${g} along the way. Each wagon needs the next letter — A, then B, then C — and the child works out which letter comes next in the alphabet and places it. Putting the letters in ABC order is early alphabet awareness, a foundational pre-K readiness skill, and the friendly ${n} keep it playful. The whole task is simply the order of the letters, from A onward.`,
  (n,g)=>`Build the alphabet train! On this pre-K worksheet a child arranges the letters in alphabetical order, wagon by wagon, decorated with ${g}. The task is to know which letter comes next — after A comes B, after B comes C — and put them in sequence. Learning the order of the alphabet is core preschool readiness, the alphabet awareness that comes before reading, and the familiar ${n} make the train inviting. It is all about letter order and recognizing each letter.`,
  (n,g)=>`What letter comes next? This preschool alphabet worksheet asks a child to put the letters in ABC order to complete a train of ${g}. Working out the alphabetical sequence — which letter follows which — builds early alphabet awareness, a foundational pre-K skill. The child is learning the ORDER of the letters, the familiar A-B-C made visible, with cheerful ${n} along the train. Every step is about sequence and recognizing each letter.`,
  (n,g)=>`Put the alphabet in order. On this pre-K worksheet a child builds a train by placing letters in alphabetical sequence, brightened with ${g}. Knowing that B comes after A, and C after B, and arranging them in order is early alphabet awareness — the readiness skill of recognizing letters and their sequence. Familiar ${n} make the ordering fun, and the task is pure ABC-order from start to finish.`,
  (n,g)=>`This preschool worksheet turns learning the alphabet into a train: the child puts the letters in order, A toward Z in sequence, with ${g} riding along. Recognizing each letter and knowing which comes next is foundational pre-K alphabet awareness, built one wagon at a time. The friendly ${n} keep a young child engaged, and the whole task is about the order of the letters and knowing each one.`,
  (n,g)=>`Can you build the alphabet train in order? This pre-K worksheet has a child arrange letters in alphabetical sequence, the train decorated with ${g}. Putting the letters in ABC order — A, B, C, and on — is early alphabet awareness, a core preschool readiness skill that comes before reading. The cheerful ${n} make it playful, and the focus stays on letter order and recognizing each letter in its place.`,
  (n,g)=>`Help the train along by putting the letters in order! On this preschool alphabet worksheet a child arranges the letters alphabetically, wagon by wagon, with ${g} for company. Working out the sequence — what comes after A, after B — builds the alphabet awareness young children need: recognizing letters and their order. Familiar ${n} keep the ABC-ordering inviting, and the task is the order of the letters, plain and clear.`,
  (n,g)=>`A friendly alphabet train for preschoolers: the child places letters in alphabetical order, from A onward, with ${g} along the way. Learning the sequence of the alphabet — which letter follows which — is foundational pre-K readiness, the alphabet awareness that supports later reading. The ${n} make the train cheerful, and the task is all about letter order, ABC in sequence, recognizing each letter as it goes.`,
];
const P2 = [
  (g)=>`Knowing the alphabet in order is one of the first literacy-readiness skills a preschooler builds. Arranging the letters in sequence — A, B, C, and on — trains a child to recognize each letter and remember its place in the alphabet. With cheerful ${g} along the train, that ABC-order practice feels like play, and it is exactly the alphabet groundwork that pre-K is built on, the framework that comes before reading.`,
  (g)=>`Alphabet awareness — recognizing letters and knowing their order — is foundational preschool readiness. A child who can put the letters in sequence has the alphabet framework that later reading and writing build on. This train makes that practice concrete: place each letter in its ABC spot, with ${g} for company. It is sequencing and letter-recognition together, the pre-K essentials, learned one wagon at a time.`,
  (g)=>`Putting the alphabet in order is a classic pre-K activity for good reason: it builds letter-recognition and sequence-memory at once, the alphabet awareness that precedes reading. A child arranges the letters from A onward, learning each one and its place. Decorated with familiar ${g}, the train keeps a young learner engaged while building the ABC-order foundation, a child's first map of the letters.`,
  (g)=>`The alphabet song is a child's first map of the letters, and putting the letters in order makes that map visible. Arranging A, B, C in sequence builds alphabet awareness — recognizing letters and remembering their order — the foundational pre-K readiness skill. With ${g} riding the train, the ordering stays playful, and a preschooler practises the letter-sequence groundwork that comes before reading.`,
  (g)=>`Before a child reads words, they learn the alphabet itself — the letters and their order. This train builds that alphabet awareness: place each letter in its ABC spot, A toward Z in sequence. Recognizing letters and knowing what comes next is core preschool readiness, and the cheerful ${g} keep a young learner happily engaged. The skill is letter order and recognition, the essential foundation for reading.`,
  (g)=>`Sequencing the alphabet is foundational pre-K work: it asks a child to recognize each letter and recall its place in the A-to-Z order. That alphabet awareness is the framework reading later builds on, and a themed train makes the practice inviting — arrange the letters in order, with ${g} along for the ride. It is pure ABC-ordering, the letter-recognition-and-sequence groundwork of preschool.`,
  (g)=>`A child's earliest literacy step is knowing the alphabet — the letters and the order they come in. Putting the letters in sequence to build a train rehearses that alphabet awareness: recognizing each letter and remembering its ABC place. For a preschooler that is core readiness, the foundation before reading, and the friendly ${g} make the ordering feel like a game rather than a lesson.`,
];
function p3(glower, nb){
  return `Children love watching the alphabet train grow as each letter clicks into place, and finishing the A-to-Z order feels like a real achievement. When this is easy, build the train in ${nb[0]}, or try ${nb[1]}. You can also browse every alphabet worksheet or the whole preschool collection — each sheet prints cleanly or plays online for free, and the more a child practises the alphabet in order, the surer their letter-recognition grows, one wagon at a time.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `alphabet-train-${co.slugTheme}-preschool` : co.canonical; }

const list = COORDS.slice().filter(co => !!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
const dropped = COORDS.filter(co => !THEMES[co.theme]).map(c=>c.theme);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] alphabet-train: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
if (dropped.length) console.log(`  [dropped — no color copy-data, e.g. B&W theme] ${dropped.join(', ')}`);
const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `alphabet train with ${THEMES[nbA.theme].h1.toLowerCase()}`, `alphabet train with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'alphabet-train', mode:null, theme:co.theme, level:'preschool' },
    eyebrow: 'Alphabet Worksheet',
    h1: `Alphabet Train with ${d.h1}`,
    strand: 'Alphabet awareness (readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'preschool', 'alphabet', 'alphabet train']),
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
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'alphabet-train');
const merged = { _note: cur._note + ' [Wave 7 LEAD alphabet-train: '+out.length+' /PRESCHOOL readiness (Alphabet awareness (readiness)); ABC-order; the first Preschool landing + level-wiring.]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} alphabet-train landings (dropped ${dropped.length}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, phon=0, mg=0, hasStd=0, notPre=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const PHONICS=['beginning sound','letter sound','letter-sound','phonics','sound it out','sounding out','sound out','phoneme']; // double-fence vs RF.K.3.a — copy must NEVER mention sounds
const MATHGEO=['math skill','number sense','counting skill','addition','subtraction','arithmetic'];
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  PHONICS.forEach(x=>{if(lc.includes(x)){phon++;console.log(`  PHONICS-LEAK ${e.slug}: "${x}"`);}});
  MATHGEO.forEach(x=>{if(lc.includes(x)){mg++;console.log(`  MATH-OVERCLAIM ${e.slug}: "${x}"`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
  if(e.coordinate.level!=='preschool'){notPre++;console.log(`  NOT-PRESCHOOL ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', phon?`${phon} PHONICS-LEAK`:'no phonics-leak (off RF.K.3.a face)', '|', mg?`${mg} math`:'no math', '|', hasStd?`${hasStd} HAS-STD`:'all readiness', '|', notPre?`${notPre} NOT-PRESCHOOL`:'all level preschool');