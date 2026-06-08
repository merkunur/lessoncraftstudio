#!/usr/bin/env node
/* Wave 8 LEAD — EN math-puzzle/mixed Gr2, STANDARD-class (2.NBT.B.5). The program's FIRST Gr2 landing.
 * Mechanic (math-puzzle.html): solve add/subtract cell equations -> reassemble a jigsaw of the theme picture. SAME
 * mechanic as the live Gr1 math-puzzle; the GRADE comes from the QUANTITY (full-corpus re-grade: operands 21-25 =
 * within-100 = Gr2 2.NBT.B.5; 33 coords). STANDARD: educationalAlignment 2.NBT.B.5 (no-targetUrl), strand "Number &
 * Operations in Base Ten" (raw l.strand; already in STRAND_NAMES; no wiring), level grade-2, "Common Core" chip.
 * 🚩 Gr1-vs-Gr2 BOUNDARY FENCE: copy sells WITHIN-100 / two-digit / regrouping; NEVER the Gr1 "within 20 / single-digit"
 * framing (positive — those tokens never appear, even in contrast). NO Gr3 drift (no multiplication / three-digit / >100).
 * 8 P1 x 7 P2 = 56 > 33. Usage: node scripts/seo-landing/gen-wave8-mathpuzzle.js
 */
const fs = require('fs');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave8-mathpuzzle-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

const SKEL = [
  (g)=>`This Grade 2 math puzzle worksheet builds two-digit addition and subtraction within 100 into a picture of ${g}. Each puzzle piece carries an equation, and solving it — adding or subtracting numbers up to 100 — shows where the piece belongs in the picture. That within-100 arithmetic, with the two-digit sums and differences second graders work on, turns number practice into a picture a child reassembles. It is 2.NBT.B.5 skill work in puzzle form.`,
  (g)=>`Solve the equations to finish the picture! On this Grade 2 worksheet a picture of ${g} is cut into puzzle pieces, each labelled with an addition or subtraction within 100. The child works each two-digit problem, and the answers reveal how the pieces fit together. Practising numbers up to 100 — the within-100 adding and subtracting of 2nd grade — is the real work here, wrapped in a satisfying picture puzzle.`,
  (g)=>`This Grade 2 math puzzle turns two-digit addition and subtraction into a picture of ${g}. Every piece holds a problem within 100, and solving it places the piece. Working with numbers to 100 — two-digit sums and differences, sometimes with regrouping — is exactly the 2nd-grade base-ten practice this sheet builds, and reassembling the picture makes the arithmetic feel like play. A child solves, places, and completes.`,
  (g)=>`On this Grade 2 worksheet, a picture of ${g} comes apart into puzzle pieces, each carrying an add-or-subtract-within-100 equation. The child solves each two-digit problem to rebuild the picture. That within-100 arithmetic is the heart of 2nd-grade number work — adding and subtracting numbers up to 100 — and the puzzle gives every solved equation an immediate, visible payoff.`,
  (g)=>`Two-digit math, one picture: this Grade 2 worksheet builds addition and subtraction within 100 into a puzzle of ${g}. Each piece is an equation; solving the within-100 problems shows where the pieces go. Practising numbers to 100 — the two-digit sums and differences second graders need — becomes the work of completing a picture. It is 2.NBT.B.5 add-and-subtract-within-100 skill in a puzzle a child enjoys.`,
  (g)=>`This Grade 2 math puzzle worksheet hides a picture of ${g} behind two-digit equations. Each puzzle piece carries an addition or subtraction within 100, and the child solves it to fit the piece in place. Working numbers up to 100 — the within-100 arithmetic of 2nd grade — is the real practice, and the picture is the reward for solving each two-digit problem correctly.`,
  (g)=>`Rebuild the picture by solving the math! On this Grade 2 worksheet a picture of ${g} is split into puzzle pieces, each labelled with a within-100 addition or subtraction. The child works each two-digit problem and places the piece. That numbers-to-100 practice — adding and subtracting within 100, the core of 2nd-grade base ten — drives the whole puzzle, and the finished picture proves the arithmetic is done.`,
  (g)=>`A Grade 2 picture puzzle built on two-digit math: a picture of ${g} comes in pieces, each holding an add-or-subtract-within-100 equation. Solving the within-100 problems reassembles the picture. Practising numbers up to 100 — the two-digit sums and differences of 2nd grade — is the work, and the puzzle turns each solved equation into a piece of a picture a child completes.`,
];
const P2 = [
  (g)=>`Adding and subtracting within 100 is the heart of second-grade number work: it is where children move into two-digit numbers, learning to work with tens and ones. This puzzle gives that within-100 practice a purpose — every two-digit equation solved fits a piece into a picture of ${g}. The numbers-to-100 work is real 2.NBT skill-building, made satisfying.`,
  (g)=>`By second grade, a child works with two-digit numbers — adding and subtracting within 100, sometimes regrouping tens and ones. This puzzle of ${g} builds exactly that: each piece is a within-100 problem, and solving it advances the picture. Practising numbers to 100 this way keeps the two-digit arithmetic concrete, with a visible reward for every correct answer.`,
  (g)=>`Within-100 addition and subtraction is the 2nd-grade leap into two-digit, base-ten thinking. A picture puzzle of ${g} makes that leap inviting — the child solves each two-digit equation to place a piece. Working numbers up to 100, with the tens-and-ones reasoning second graders build, is the genuine skill here, dressed as a puzzle a child wants to finish.`,
  (g)=>`Second graders practise adding and subtracting within 100 — two-digit problems that build on earlier number facts. This puzzle turns that practice into picture-building: each piece of a ${g} picture carries a within-100 equation. Solving the two-digit problems to complete the picture keeps the numbers-to-100 work concrete and motivating, the core of 2nd-grade base ten.`,
  (g)=>`The within-100 arithmetic at the centre of second grade — two-digit addition and subtraction — is best practised with a clear purpose, and a picture puzzle supplies it. Each piece of a ${g} picture holds an equation within 100; solving it places the piece. That numbers-to-100 practice builds the tens-and-ones fluency 2.NBT calls for, and the finished picture rewards the effort.`,
  (g)=>`Working numbers up to 100 — adding and subtracting within 100 — is what second-grade math is built on, and this puzzle makes it tangible. A ${g} picture comes in pieces, each a two-digit equation; solving the within-100 problems reassembles it. The two-digit, base-ten practice is the real work, and the puzzle gives a child a reason to do every problem carefully.`,
  (g)=>`Second grade is when children master adding and subtracting within 100, working with two-digit numbers. This puzzle of ${g} builds that mastery piece by piece — each within-100 equation solved fits another part of the picture. Practising numbers to 100 with a visible payoff keeps the two-digit arithmetic lively, the genuine 2.NBT skill behind the play.`,
];
function p3(nb){ return `Children enjoy watching the picture come together as they solve each problem, and a finished math puzzle is a satisfying proof of within-100 skill. When this is easy, solve the puzzle in ${nb[0]}, or try ${nb[1]}. You can also browse every Grade 2 math puzzle or the whole second-grade collection — each sheet prints cleanly or plays online for free, and the more within-100 problems a child solves, the surer their two-digit addition and subtraction grows, one solved piece at a time.`; }

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

function landingSlugOf(co){ return co.siblings.length > 1 ? `math-puzzle-${co.slugTheme}-grade-2` : co.canonical; }

const list = COORDS.slice().filter(co=>!!THEMES[co.theme]).sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL.length * P2.length;
console.log(cells > list.length ? `  [invariant OK] math-puzzle Gr2: ${SKEL.length}x${P2.length}=${cells} > breadth ${list.length}` : `  [INVARIANT WARN] ${cells} <= ${list.length}`);
const out=[];
list.forEach((co,i)=>{
  const d = THEMES[co.theme];
  const cell = cellAssign(i, SKEL.length, P2.length);
  const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
  const nb=[ `math puzzle with ${THEMES[nbA.theme].h1.toLowerCase()}`, `math puzzle with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co), variantShape: co.siblings.length>1?'collapsed':'singleton',
    coordinate: { type:'math-puzzle', mode:'mixed', theme:co.theme, level:'grade-2' },
    eyebrow: 'Math Puzzle Worksheet',
    h1: `Math Puzzle with ${d.h1} — Grade 2`,
    strand: 'Number & Operations in Base Ten',
    standard: '2.NBT.B.5',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 2', 'math puzzle', 'within 100']),
    p1: SKEL[cell.skel](d.gen), p2: P2[cell.p2](d.gen), p3: p3(nb),
    canonicalDeckSlug: co.canonical,
    carousel: [1,2,5,11].map(k=>({label:`Math Puzzle with ${THEMES[list[(i+k)%list.length].theme].h1} — Grade 2`, href: landingSlugOf(list[(i+k)%list.length])})),
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='math-puzzle' && l.coordinate.level==='grade-2'));
const merged = { _note: cur._note + ` [Wave 8 LEAD math-puzzle Gr2: ${out.length} /Grade-2 STANDARD (2.NBT.B.5, Number & Operations in Base Ten); within-100/two-digit; full-corpus re-grade 33; first Gr2 landing + level-wiring.]`, landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} math-puzzle Gr2 landings; total landings now ${merged.landings.length}`);
let short=0, banned=0, w100=0, gr1leak=0, gr3leak=0, noStd=0, notG2=0;
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun','one of the earliest','ideal for'];
const W100=['within 100','to 100','two-digit','two digit']; // REQUIRE one
const GR1LEAK=['within 20','single-digit','single digit']; // BLOCK the Gr1 face
const GR3LEAK=['multiplication','multiply','three-digit','three digit','within 1000','hundreds place','regroup hundreds']; // BLOCK Gr3 drift
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if(!W100.some(x=>lc.includes(x))){w100++;console.log(`  MISSING-WITHIN-100 ${e.slug}`);}
  GR1LEAK.forEach(x=>{if(lc.includes(x)){gr1leak++;console.log(`  GR1-LEAK ${e.slug}: "${x}"`);}});
  GR3LEAK.forEach(x=>{if(lc.includes(x)){gr3leak++;console.log(`  GR3-DRIFT ${e.slug}: "${x}"`);}});
  if(!('standard' in e)||e.standard!=='2.NBT.B.5'){noStd++;console.log(`  STANDARD-MISSING ${e.slug}`);}
  if(e.coordinate.level!=='grade-2'){notG2++;}
});
console.log(short?`${short} short`:'all >=200 words', '|', banned?`${banned} banned`:'no banned', '|', w100?`${w100} MISSING-within-100`:'all carry within-100', '|', gr1leak?`${gr1leak} GR1-LEAK`:'no Gr1-within-20 leak', '|', gr3leak?`${gr3leak} GR3-DRIFT`:'no Gr3 drift', '|', noStd?`${noStd} STD-MISSING`:'all 2.NBT.B.5', '|', notG2?`${notG2} NOT-G2`:'all level grade-2');