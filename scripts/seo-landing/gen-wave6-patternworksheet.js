#!/usr/bin/env node
/* Wave 6 SHIP-OR-DROP — EN pattern-worksheet/(null) × Kindergarten, READINESS-class. CONDITIONAL author: ships ONLY
 * if it holds a distinct query face vs pattern-train (gate decides); else discarded. Same patterning skill + same
 * AB/AAB/ABB/ABC taxonomy as pattern-train, so it MUST take the GENERIC "free printable pattern worksheets" face —
 * NOT pattern-train's themed-train / named-unit face. NO educationalAlignment. strand "Patterning (readiness)".
 * Copy-guard: generic-printable framing; NO named-unit (AB/AAB/…) or train/wagon vocabulary; NO math over-claim.
 * 8 P1 x 7 P2 = 56 > 48 (coprime + guard). Usage: node scripts/seo-landing/gen-wave6-patternworksheet.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave6-patternworksheet-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// GENERIC printable-pattern-practice face. (n)=nouns,(g)=gen. NO named-unit, NO train/wagon.
const SKEL = [
  (n,g)=>`This free printable pattern worksheet gives a Kindergarten child easy, no-prep practice completing repeating patterns with ${g}. Each row shows a pattern that has started — pictures like ${n} repeating in a simple rhythm — and the child works out what comes next and finishes the row. Practising "what comes next" with familiar pictures builds early pattern-recognition, a key readiness skill, and the sheet is ready to print or play online in seconds.`,
  (n,g)=>`Looking for a simple pattern worksheet to print? This Kindergarten sheet sets up repeating-picture patterns with ${g} and asks the child to complete each one. The child looks at how the pictures — ${n} among them — repeat, then fills in what comes next. Completing repeating patterns is foundational pattern-recognition for young learners, and this no-prep printable is ready for the classroom or the home table right away.`,
  (n,g)=>`A clean, classroom-ready pattern worksheet for Kindergarten: rows of repeating ${g} patterns with the last pictures left for the child to complete. Reading how the pictures repeat — and predicting what comes next — is early pattern-recognition, the readiness skill of finding a rule and continuing it. Print it, hand it out, or play it online; the patterns use familiar pictures like ${n} so the focus stays on the rhythm.`,
  (n,g)=>`This printable Kindergarten pattern worksheet keeps it simple: a few repeating-picture patterns with ${g}, each missing its ending for the child to finish. Spotting how the pictures — ${n} and others — repeat, then completing the pattern, builds the "what comes next" thinking at the heart of early readiness. It is no-prep and ready to print, a quick pattern-practice page for any classroom or home.`,
  (n,g)=>`Free, no-prep, and ready to print — this Kindergarten pattern worksheet offers straightforward practice completing repeating patterns made of ${g}. The child sees a pattern begin, works out the repeating rhythm, and fills in what comes next. That complete-the-pattern practice with familiar pictures like ${n} grows a young learner's pattern-recognition, and the page works on paper or online.`,
  (n,g)=>`Need pattern practice for Kindergarten? This printable worksheet shows repeating ${g} patterns and asks the child to complete each row. Looking at how pictures like ${n} repeat and predicting the next is foundational pattern-recognition, a readiness skill that supports early math and reading. The sheet is classroom-ready — print it or play it online for free — with familiar pictures keeping the patterns clear.`,
  (n,g)=>`This Kindergarten pattern worksheet is straightforward practice in completing repeating patterns. Using ${g} — ${n} and more — each row starts a pattern and leaves the ending for the child to finish. Working out the repeating rhythm and what comes next is early pattern-recognition, a core readiness skill, and the printable, no-prep format makes it an easy page to drop into a classroom or a quiet moment at home.`,
  (n,g)=>`A simple printable for Kindergarten pattern practice: repeating-picture patterns with ${g}, each waiting for the child to complete. The child reads how the pictures — like ${n} — repeat, then fills in what follows. Completing repeating patterns builds the rule-finding readiness skill young children need, and this no-prep sheet is ready to print or play online, with familiar pictures keeping every pattern easy to read.`,
];
const P2 = [
  (g)=>`Completing repeating patterns is one of the readiness skills Kindergarten teachers return to again and again, because it underlies so much early math and reading. A simple printable like this lets a child practise spotting a rhythm and predicting what comes next, with familiar ${g} keeping the task clear and the format ready for any classroom moment.`,
  (g)=>`Pattern-recognition — noticing how things repeat and continuing the rule — is foundational early-learning thinking, and a no-prep printable makes it easy to practise often. A child reads the repeating ${g} pictures, works out the rhythm, and finishes the pattern. That regular practice, on paper or online, steadily builds a young learner's eye for order and sequence.`,
  (g)=>`The value of a printable pattern worksheet is how easily it fits into a Kindergarten day: hand it out, and a child practises the readiness skill of finding a rule and predicting what follows. Reading a repeating ${g} pattern and completing it grows pattern-recognition, the thinking behind counting sequences and early reading, with no prep and no fuss.`,
  (g)=>`Repeating patterns teach a child that order can be predicted — there is a rhythm, and you can work out what comes next. For Kindergarten readiness that is core thinking, and a simple printable lets a child rehearse it as often as helps. With familiar ${g} pictures, the practice stays concrete and classroom-ready, building the rule-finding skill at a comfortable pace.`,
  (g)=>`A good pattern worksheet gives a child clear, repeatable practice in pattern-recognition — the readiness skill of spotting a repeating rhythm and continuing it. This printable keeps that practice simple: read the ${g} pattern, find the rhythm, complete the row. Doing it regularly, in class or at home, strengthens the order-and-sequence thinking young learners build toward math and reading.`,
  (g)=>`Practising "what comes next" is exactly the kind of readiness thinking Kindergarten is built on, and a no-prep printable makes that practice effortless to offer. A child reads the repeating ${g} pictures, predicts the next, and completes the pattern. That steady pattern-recognition work, ready to print or play online, builds a young learner's sense of rule and rhythm.`,
  (g)=>`Pattern worksheets are a classroom staple for good reason: completing a repeating pattern rehearses the foundational skill of finding a rule and applying it. This printable offers that practice with familiar ${g} pictures, keeping it concrete for a Kindergarten child. Whether printed or played online, regular pattern practice grows the recognition skill that supports so much early learning.`,
];
function p3(glower, nb){
  return `Children enjoy the satisfying "I know what comes next!" moment, and a finished pattern sheet feels like a small win. When this feels easy, print the patterns in ${nb[0]}, or try ${nb[1]}. You can also browse every printable pattern worksheet or the whole kindergarten collection — each sheet prints cleanly or plays online for free, and the more pattern practice a child gets, the sharper their eye for what comes next in any sequence they meet.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const list = COORDS.slice().sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] pattern-worksheet: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[]; let blocked=0;
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  if(!d){ console.log(`NO COPY DATA for ${co.theme}`); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `pattern practice with ${THEMES[nbA.theme].h1.toLowerCase()}`, `pattern practice with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  out.push({
    slug: co.canonical,
    variantShape: 'singleton',
    coordinate: { type:'pattern-worksheet', mode:null, theme:co.theme, level:'kindergarten' },
    eyebrow: 'Pattern Worksheet',
    h1: `Pattern Practice with ${d.h1}`,
    strand: 'Patterning (readiness)',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', 'pattern worksheet', 'printable']),
    p1: SKEL[cell.skel](d.nouns, d.gen),
    p2: P2[cell.p2](d.gen),
    p3: p3(d.gen.toLowerCase(), nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Pattern Practice with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: list[(i+1)%list.length].canonical},
      {label:`Pattern Practice with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: list[(i+2)%list.length].canonical},
      {label:`Pattern Practice with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: list[(i+5)%list.length].canonical},
      {label:`Pattern Practice with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: list[(i+11)%list.length].canonical},
    ],
  });
  // NO `standard` key — readiness.
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'pattern-worksheet');
const merged = { _note: cur._note + ' [Wave 6 pattern-worksheet SHIP-OR-DROP: '+out.length+' /K readiness (Patterning (readiness)); GENERIC printable face; gate-decides vs pattern-train.]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} pattern-worksheet landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
let short=0, fence=0, banned=0, math=0, leak=0, hasStd=0;
const FENCE=['count how','how many','classify and count','tally','count the','count each','chart the','chart each'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const MATHCLAIM=['math skill','maths skill','number sense','counting skill','addition','subtraction','arithmetic','place value'];
const UNITLEAK=[/\b(AB|AAB|ABB|AABB|ABC)\b/, /\btrain\b/i, /\bwagon/i]; // keep off pattern-train's themed/named-unit face
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  FENCE.forEach(x=>{if(lc.includes(x)){fence++;console.log(`  FENCE-LEAK ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  MATHCLAIM.forEach(x=>{if(lc.includes(x)){math++;console.log(`  MATH-OVERCLAIM ${e.slug}: "${x}"`);}});
  UNITLEAK.forEach(x=>{if(x.test(body)){leak++;console.log(`  UNIT/TRAIN-LEAK ${e.slug}: ${x}`);}});
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug}`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', fence?`${fence} count-fence`:'fence clean', '|', banned?`${banned} banned`:'no banned', '|', math?`${math} math-overclaim`:'no math over-claim', '|', leak?`${leak} unit/train-leak`:'no named-unit/train leak (off pattern-train face)', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (Patterning)');