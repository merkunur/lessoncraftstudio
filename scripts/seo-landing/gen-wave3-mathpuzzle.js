#!/usr/bin/env node
/* Wave 3 LEAD SLICE generator — EN math-puzzle/mixed × Grade 1, the 12 strict-≤20-clean coordinates.
 * Solve the add/subtract cell equations to reveal/reassemble the hidden picture (the arithmetic is the task;
 * the jigsaw/mystery-picture is the wrapper). 1.OA.C.6 (add & subtract WITHIN 20). The other 30 math-puzzle
 * coordinates carry operands 21-25 (Gr2) and are re-levelled out-of-tree — NOT here.
 * COPY GUARD: puzzle/mystery-picture/solve-and-reveal + "within twenty"; NO Gr2 drift (no two-digit example
 * numbers in prose, no place-value / regrouping / "fluency / mastery"). 8 P1 x 7 P2 = 56 cells >> 12 (coprime).
 * Usage: node scripts/seo-landing/gen-wave3-mathpuzzle.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave3-mathpuzzle-coordinates.json', 'utf8')).coordinates;

const THEMES = {
  'at_the_supermarket':{nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'camping':{nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'easter':{nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'farm_animals':{nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':{nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'furniture':{nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'kitchen_tools':{nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':{nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'reptiles_and_amphibians':{nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':{nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'things_that_fly':{nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'vegetables':{nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
};

// solve add/subtract cell equations -> reveal/reassemble the picture. (n)=nouns, (g)=gen.
const SKEL_MP = [
  (n,g)=>`This Grade 1 worksheet hides a picture of ${n} behind a grid of small sums. The child solves each cell — some are addition, some are subtraction, all within twenty — and the answers tell which piece goes where, so the ${g} are reassembled only when every equation is worked out. The arithmetic is the real task; the picture is the reward, and it shows at a glance which cells still need another look.`,
  (n,g)=>`Solve and reveal is the whole idea here. Each cell of the grid holds an add or subtract problem within twenty; working them out fits the pieces that rebuild the hidden picture of ${n}. A wrong answer leaves a gap, so the puzzle quietly checks itself — the child sees immediately where to look again. It turns a page of mixed adding and subtracting into a small mystery worth finishing.`,
  (n,g)=>`Behind this grid is a picture of ${g} waiting to be put back together. The child works each cell — a mix of addition and subtraction, all kept within twenty — and correct answers slot the pieces into place. Because the picture only completes when the maths is right, the reassembly is its own answer key: no separate checking, just solve every equation and watch the ${n} appear.`,
  (n,g)=>`Each square on this Grade 1 sheet is a small equation — sometimes you add, sometimes you take away, never past twenty — and solving them reassembles a scrambled picture of ${n}. The puzzle rewards careful arithmetic: get a cell right and its piece fits; get it wrong and the picture will not close. It is mixed add-and-subtract practice with a reason to check your work built right in.`,
  (n,g)=>`This is a mystery-picture math puzzle: a grid of within-twenty add and subtract problems sitting over a hidden image of ${g}. The child solves every cell and the answers reassemble the ${n} piece by piece. The arithmetic carries the whole task — the jigsaw is just the payoff — so it suits a Grade 1 child ready to practise adding and subtracting with something to show for it at the end.`,
  (n,g)=>`Work the sums, build the picture. Every cell of this puzzle is an addition or subtraction within twenty, and each correct answer locks a piece of the ${n} image into place. The child cannot finish the picture without finishing the maths, which makes the puzzle self-checking and keeps the focus on solving each equation — a satisfying way to practise mixed adding and subtracting at Grade 1.`,
  (n,g)=>`On this sheet a scrambled picture of ${g} is the prize for solving a grid of small equations. Some cells add, some subtract, all stay within twenty; the answers decide where each piece belongs, so the image of ${n} only comes together when every sum is correct. The puzzle does the checking for the child — a gap means a cell to revisit — turning routine practice into a solve-and-reveal task.`,
  (n,g)=>`Grade 1 children add and subtract within twenty to unscramble a picture here. The grid's cells are mixed add-and-subtract problems; solving each one reveals which piece of the ${n} image goes where, and the picture is complete only when the arithmetic is. The reassembly is the reward and the answer key at once, so the child stays with the maths — and the finished ${g} make it worth the effort.`,
];
const P2_MP = [
  (g)=>`Adding and subtracting within twenty is the core arithmetic work of Grade 1, and mixing the two on one page keeps a child reading each problem rather than running on autopilot. The puzzle wrapper gives the practice a purpose — every solved cell builds the picture — but the skill underneath is plain: work a small sum, reach a definite answer, move on.`,
  (g)=>`Mixing addition and subtraction matters because it stops a child treating a whole page as one operation. Here each cell could go either way within twenty, so the child checks the sign and thinks before solving. That deliberate switching is exactly what Grade 1 is built on, and the reassembling picture of ${g} rewards getting each one right.`,
  (g)=>`The self-checking is the quiet strength of a solve-and-reveal puzzle: a wrong answer leaves the picture broken, so the child finds their own mistakes without every cell being marked. For within-twenty add and subtract practice that is ideal — it keeps a Grade 1 child working independently and honestly, because the picture only completes when the arithmetic does.`,
  (g)=>`Practice sticks better when it has a payoff a child can see. Solving a grid of within-twenty sums to rebuild a picture of ${g} turns repetition into a small goal, which holds attention on the add-and-subtract work longer than a plain row of problems would. The maths is unchanged Grade 1 content; the puzzle just makes a child want to finish it.`,
  (g)=>`Each cell is one clean add-or-subtract within twenty — the right size for Grade 1, where children are moving from counting toward knowing these small sums more readily. The puzzle never asks for bigger numbers or written methods; it asks for many small, correct answers, which is precisely the practice that builds confidence with adding and subtracting.`,
  (g)=>`A mixed add-and-subtract puzzle rehearses both directions of the same number relationships — that adding and taking away are linked — which is central to Grade 1 number sense. Working them side by side, within twenty, helps a child see a fact and its partner rather than two unrelated drills, all while the reassembling ${g} mark their progress.`,
  (g)=>`Keeping every cell within twenty means a Grade 1 child can solve by the strategies they have — counting on, counting back, using pairs they know — rather than reaching for methods they have not met. The puzzle stays squarely in that band, so it is genuine within-twenty practice with a motivating finish, not a stretch into bigger numbers.`,
];
function p3(h1lower, g, nb){
  return `Children who like ${h1lower} get pulled straight into the solving — the hidden picture is a strong reason to finish every cell. When this feels easy, build another picture in ${nb[0]}, or try ${nb[1]}. You can also browse every math puzzle worksheet or the whole ${g} collection for grade 1 — each one prints on a single page or plays online, revealing the picture as the answers go in.`;
}

// coprime-stride cell assignment (Wave-1b durable fix)
function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const list = COORDS.slice().sort((a,b)=> a.theme<b.theme?-1:1);
const cells = SKEL_MP.length * P2_MP.length;
if (cells <= list.length) console.log(`  [INVARIANT WARN] math-puzzle: cell space ${SKEL_MP.length}x${P2_MP.length}=${cells} <= breadth ${list.length}`);
else console.log(`  [invariant OK] math-puzzle: cell space ${SKEL_MP.length}x${P2_MP.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions (sparse fill: ${list.length} of ${cells} cells used)`);

function landingSlugOf(co){ return co.siblings.length > 1 ? `math-puzzle-${co.slugTheme}-grade-1` : co.canonical; }

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const d = THEMES[co.theme];
  if (!d) { console.log(`NO COPY DATA for ${co.theme} — add to THEMES`); blocked++; return; }
  const v = validateCoordinate('math-puzzle', 'mixed', co.theme, {});
  if (!v.valid) { console.log(`BLOCKED math-puzzle/${co.theme}: ${v.reason}`); blocked++; return; }
  const cell = cellAssign(i, SKEL_MP.length, P2_MP.length);
  const nbA = list[(i+1)%list.length], nbB = list[(i+5)%list.length];
  const nb = [ `math puzzle with ${THEMES[nbA.theme].h1.toLowerCase()}`, `math puzzle with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
  const entry = {
    slug: landingSlugOf(co),
    variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
    coordinate: { type:'math-puzzle', mode:'mixed', theme:co.theme, level:'grade-1' },
    eyebrow: 'Math Puzzle Worksheet',
    h1: `Math Puzzle with ${d.h1} — Grade 1`,
    strand: 'Operations & Algebraic Thinking',
    standard: '1.OA.C.6',
    slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 1']),
    p1: SKEL_MP[cell.skel](d.nouns, d.gen),
    p2: P2_MP[cell.p2](d.gen),
    p3: p3(d.h1.toLowerCase(), d.gen, nb),
    canonicalDeckSlug: co.canonical,
    carousel: [
      {label:`Math Puzzle with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
      {label:`Math Puzzle with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
      {label:`Math Puzzle with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
      {label:`Math Puzzle with ${THEMES[list[(i+7)%list.length].theme].h1}`, href: landingSlugOf(list[(i+7)%list.length])},
    ],
  };
  if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'math-puzzle');
const merged = { _note: cur._note + ' [Wave 3 LEAD SLICE: '+out.length+' math-puzzle/mixed/Gr1 (strict ≤20-clean) via gen-wave3-mathpuzzle.js (8 P1 x 7 P2; 1.OA.C.6 within-20; 30 Gr2-operand coords re-levelled out-of-tree).]', landings: keep.concat(out) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${out.length} math-puzzle landings (blocked ${blocked}); total landings now ${merged.landings.length}`);
// lints: >=200 words + no Gr2-drift terms + no two-digit example numbers in prose
let short=0, drift=0;
const DRIFT=['place value','place-value','regroup','two-digit','double-digit','fluency','mastery','within 100','within one hundred'];
const TWODIGIT=/\b(1[1-9]|[2-9][0-9])\b/;
out.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} const dh=DRIFT.filter(x=>body.toLowerCase().includes(x)); if(dh.length){drift++;console.log(`  DRIFT ${e.slug}: ${dh.join(',')}`);} if(TWODIGIT.test(body)){console.log(`  TWO-DIGIT-NUMBER ${e.slug}`);} });
console.log(short? `${short} short (<200)` : `all ${out.length} >=200 words`);
console.log(drift? `${drift} Gr2-drift hits` : 'no Gr2-drift terms');
