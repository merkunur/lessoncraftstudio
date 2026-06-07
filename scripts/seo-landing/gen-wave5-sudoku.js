#!/usr/bin/env node
/* Wave 5 LEAD — EN sudoku/null (easy) + sudoku/medium (harder) × Kindergarten, READINESS-class.
 * 4x4 PICTURE sudoku (image-index, NO numbers): place 4 pictures so each row, column, 2x2 box holds each once —
 * constraint-satisfaction logical reasoning. NO educationalAlignment (no `standard` key → route renders the dashed
 * "coming soon" chip + raw strand chip, the W4-bingo precedent). strand "Logical reasoning (readiness)".
 * null = easy (many givens); medium = harder (fewer givens) — differentiate honestly on difficulty, NOT template-swap.
 * Copy-guard: picture-sudoku / logic puzzle / fill-the-grid; NO math/number over-claim, NO CCSS code.
 * 8 P1 x 7 P2 = 56 > 50 (+6 tight, coprime + guard). Usage: node scripts/seo-landing/gen-wave5-sudoku.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave5-sudoku-coordinates.json', 'utf8')).coordinates;
const litA = fs.readFileSync('scripts/seo-landing/gen-wave4-literacyA.js', 'utf8');
const THEMES = (function () { const m = litA.match(/const THEMES = (\{[\s\S]*?\n\});/); if (!m) throw new Error('THEMES extract failed'); return eval('(' + m[1] + ')'); })();

// NULL = easy picture sudoku (many givens). (n)=nouns,(g)=gen.
const SKEL_NULL = [
  (n,g)=>`This Kindergarten picture-sudoku worksheet is a gentle logic puzzle. The 4×4 grid uses four ${g} pictures — ${n} and one more — and the child fills the empty squares so each row, each column, and each little 2×2 box holds all four pictures, with none repeated. There are no numbers and no adding; it is pure looking-and-reasoning. With several squares already filled in, this easier version eases a child into how sudoku thinking works.`,
  (n,g)=>`Fill the grid so nothing repeats. On this easy picture sudoku, four ${g} pictures share a 4×4 grid, and the child places the missing ones so every row, column, and 2×2 box shows each picture exactly once. Working out where each one can and cannot go is early logical reasoning — no counting, no maths, just careful thinking about what fits where. Plenty of starting pictures keep this first version friendly.`,
  (n,g)=>`Picture sudoku turns a grid into a thinking puzzle. Four ${g} — ${n} and another — must each appear once in every row, once in every column, and once in each 2×2 box. The child studies what is already placed and works out the rest by elimination. It is logical reasoning a Kindergarten child can do by looking, with no numbers involved. This base version starts with many squares filled to keep the puzzle approachable.`,
  (n,g)=>`This is a no-numbers logic puzzle for young children. A 4×4 grid holds four ${g} pictures; the child fills the blanks so each row, column, and box contains all four with no repeats. Figuring out which picture belongs in each empty square — by seeing what is missing from each line — is the whole skill, and it is pure reasoning. The easy setup gives plenty of clues to start.`,
  (n,g)=>`Where does each picture go? On this Kindergarten picture sudoku the child places four ${g} so every row, every column, and every 2×2 box has each one exactly once. No square may repeat a picture, so the child reasons it out by elimination — looking at what each line still needs. It builds logical thinking with no counting or maths. This gentler version leaves few blanks, so a child can find their footing.`,
  (n,g)=>`A grid, four pictures, one rule: no repeats in any row, column, or box. This easy picture sudoku uses ${g} — ${n} and one more — and asks the child to fill the empty squares by working out what fits. It is a logic puzzle, not a number puzzle: the thinking is about position and elimination. Lots of pre-filled squares make this a friendly first sudoku for a Kindergarten child.`,
  (n,g)=>`This worksheet teaches sudoku thinking with pictures instead of numbers. Four ${g} share a 4×4 grid, and the child completes it so each picture appears once per row, once per column, and once per box. Deciding where each goes — by spotting what each line is missing — is logical reasoning, the kind a young child can do entirely by looking. The easy version starts well-filled, easing a child in.`,
  (n,g)=>`Solve it by looking, not counting. On this picture sudoku a 4×4 grid holds four ${g} pictures, and the child fills the gaps so no row, column, or 2×2 box repeats any of them. The puzzle is pure logic — work out what belongs where by elimination. This base version gives plenty of starting clues, a good first taste of sudoku reasoning for Kindergarten.`,
];
const P2_NULL = [
  (g)=>`Picture sudoku is logical-reasoning practice, not a maths sheet — it asks a child to work out, by elimination, where each picture can go so nothing repeats in a line or box. That kind of careful, rule-following thinking is real Kindergarten readiness, and using pictures instead of numbers keeps it open to a child who is not yet reading or writing. A child who finishes a grid by reasoning alone gains genuine confidence in their own thinking, which carries into everything else they do.`,
  (g)=>`The skill here is constraint reasoning: each row, column, and box may hold each picture only once, so the child deduces the rest from what is already placed. It is the same logic adults use on harder sudoku, made reachable for Kindergarten with familiar ${g} pictures and an easier, well-filled grid. The challenge is thinking it through, nothing more — and each solved grid quietly teaches a child to be patient and systematic, habits that help right across school.`,
  (g)=>`Filling a grid so no picture repeats trains a child to look carefully and reason from a rule, holding several constraints in mind at once. That is genuine logical-reasoning readiness for Kindergarten, and the picture format means a child can do it entirely by looking. The easier version keeps the load light while the habit forms, so a child meets success early and comes to see a logic puzzle as something they are able to do.`,
  (g)=>`What makes picture sudoku valuable is that it is pure logic — the child works out each missing ${g} by elimination, which builds the careful, systematic thinking a Kindergarten child needs across every subject. Starting with an easier, mostly-filled grid lets a child succeed and learn how the puzzle "thinks" before it gets harder, building the step-by-step problem-solving they will lean on for years.`,
  (g)=>`Sudoku reasoning — every picture once per row, column, and box — is a clean logic skill, and doing it with pictures keeps it squarely in Kindergarten reach. A child practises deduction and elimination, working out where each ${g} belongs. The base version leaves only a few blanks, so the reasoning stays within a young child's grasp and the puzzle stays a satisfying win rather than a source of frustration.`,
  (g)=>`This is thinking practice. A child completes the grid by reasoning about what each line and box still needs, which strengthens attention and logical deduction — core Kindergarten readiness. The familiar ${g} and the easier, well-clued grid make the puzzle inviting rather than frustrating, so a child stays with the reasoning, and every completed grid is quiet proof that careful thinking pays off.`,
  (g)=>`Picture sudoku rewards patient, rule-based thinking: look at what is placed, work out what is missing, and never repeat a picture in a line or box. That logical reasoning is exactly the readiness skill a Kindergarten child is building, and the easy-grid, picture format keeps it about thinking rather than anything else — which is precisely what makes it such good early practice in working a problem through to the end.`,
];

// MEDIUM = harder picture sudoku (fewer givens, more deduction).
const SKEL_MED = [
  (n,g)=>`This is a harder picture-sudoku puzzle for Kindergarten children ready for more of a challenge. The 4×4 grid uses four ${g} pictures, and the child fills every empty square so each row, column, and 2×2 box holds all four once. Because this version starts with fewer pictures filled in, the child has to reason further ahead — working out several squares from each clue. Still no numbers, just deeper logical thinking.`,
  (n,g)=>`Fewer clues, more thinking. On this medium picture sudoku, four ${g} share a 4×4 grid but only a few squares begin filled, so the child must deduce the rest carefully — each placement leading to the next. Every row, column, and box still needs each picture exactly once, with no repeats. It is the same no-maths logic as the easy version, stretched for a child who has the basics.`,
  (n,g)=>`Picture sudoku gets harder here. With four ${g} — ${n} and another — and only a handful of starting pictures, the child works out the whole 4×4 grid by elimination, reasoning through several steps so each row, column, and box has each picture once. There are no numbers; the challenge is purely in the logic, which runs deeper than the easy version.`,
  (n,g)=>`This medium puzzle asks a child to hold more in mind at once. The 4×4 grid of ${g} pictures starts with fewer givens, so each empty square has to be reasoned from the others, step by step, with no picture repeating in any row, column, or box. It is logical reasoning — a good stretch for a Kindergarten child who has solved the easier sudokus.`,
  (n,g)=>`A tougher grid for confident thinkers. On this harder picture sudoku the four ${g} are mostly missing at the start, so the child deduces placements in sequence — each one narrowing where the rest can go — until every row, column, and box holds each picture once. Just more demanding elimination than the easy version offers, and still no numbers.`,
  (n,g)=>`This harder picture sudoku leaves more squares blank, so the child reasons further. Four ${g} pictures fill a 4×4 grid with each appearing once per row, column, and box; with few clues to start, the puzzle rewards careful, multi-step thinking. It is pure logic — position and elimination — pitched for a Kindergarten child ready to be stretched.`,
  (n,g)=>`Step up the challenge with this medium picture sudoku. The 4×4 grid of ${g} begins with only a few pictures placed, so completing it — each picture once per row, column, and box, no repeats — takes more reasoning and a longer chain of deductions. The skill is the same logical thinking as the easy puzzles, asked of a child who is ready for harder.`,
  (n,g)=>`For a child who has the easy sudokus down, this harder version offers fewer starting pictures and more to work out. The four ${g} must each appear once in every row, column, and 2×2 box, and with sparse clues the child reasons through the grid step by step. It stays a no-numbers logic puzzle — just a deeper one.`,
];
const P2_MED = [
  (g)=>`A harder picture sudoku stretches the same logical-reasoning skill: with fewer starting clues, a child has to deduce further ahead, chaining one placement to the next. That multi-step elimination is exactly the thinking-readiness a Kindergarten child builds, and keeping it in pictures means the challenge is in the reasoning, not anywhere else — and rising to a tougher grid teaches a child that sticking with a hard problem is worth it.`,
  (g)=>`Sparser clues make the medium puzzle a genuine logic stretch. The child can no longer fill the grid one obvious square at a time; they must reason about how several squares constrain each other. That deeper deduction with familiar ${g} pictures is strong Kindergarten readiness practice, and it stays a pure thinking puzzle — the satisfaction of cracking a sparse grid keeps a confident child coming back for more.`,
  (g)=>`The value of a harder sudoku is the longer chain of reasoning it demands — each ${g} placed narrows the possibilities for the rest, so the child thinks several steps ahead. For a Kindergarten child ready for it, that is excellent logical-thinking practice, and the picture format keeps the whole puzzle about deduction — precisely the stretch a ready child needs to keep growing.`,
  (g)=>`This medium grid asks for more patience and more reasoning than the easy version, which is the point: a child who has mastered the basics needs a stretch to keep building logical thinking. Working out a sparsely-clued 4×4 of ${g} pictures, with no repeats in any line or box, does exactly that — pure logic — and it rewards the patience and persistence a Kindergarten child is still developing.`,
  (g)=>`Fewer givens means the child must reason from constraints rather than copy from clues — holding the whole grid in mind and deducing what fits. That is the core logical-reasoning readiness skill, pushed a level harder. With ${g} pictures, the difficulty lives entirely in the thinking, right where a Kindergarten stretch should be, training a child to plan ahead rather than guess at each square.`,
  (g)=>`A harder picture sudoku rewards systematic thinking: try a placement, see what it forces, adjust. That trial-and-deduction is real logical reasoning, and it suits a Kindergarten child who has outgrown the easy grids. The puzzle stays a thinking challenge — the logic of where each ${g} belongs — and that persistent, self-correcting thinking is some of the best readiness practice there is.`,
  (g)=>`The medium puzzle keeps every sudoku rule — each picture once per row, column, and box — but gives less to start from, so the reasoning runs deeper. For a confident young thinker that is the right next step, building careful multi-step deduction with pictures, which keeps it squarely a logic challenge and builds the kind of multi-step reasoning a child will use far beyond puzzles.`,
];

function p3(mode, h1lower, g, nb){
  const opener = mode === 'medium'
    ? `Children who like ${h1lower} enjoy the extra challenge, and cracking a sparse grid is a real win. When this feels easy, take on ${nb[0]}, or try ${nb[1]}.`
    : `Children who like ${h1lower} settle into the looking-and-reasoning, and finishing a clean grid feels great. When this feels easy, solve another in ${nb[0]}, or try ${nb[1]}.`;
  const tail = mode === 'medium'
    ? ' and every harder grid a child cracks builds real confidence in their own logic, one careful deduction at a time.'
    : ' and the more grids a child solves, the more naturally the reasoning comes.';
  return `${opener} You can also browse every picture sudoku worksheet or the whole ${g} collection for kindergarten — each puzzle prints cleanly or plays online for free,${tail}`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'null':   { SKEL: SKEL_NULL, P2: P2_NULL, prefix:'sudoku-', eyebrow:'Picture Sudoku Worksheet', strand:'Logical reasoning (readiness)', h1:(h)=>`Picture Sudoku with ${h}`, nbVerb:'picture sudoku with ', label:(t)=>`Picture Sudoku with ${t}` },
  'medium': { SKEL: SKEL_MED,  P2: P2_MED,  prefix:'sudoku-medium-', eyebrow:'Picture Sudoku Worksheet', strand:'Logical reasoning (readiness)', h1:(h)=>`Harder Picture Sudoku with ${h}`, nbVerb:'harder picture sudoku with ', label:(t)=>`Harder Picture Sudoku with ${t}` },
};
function landingSlugOf(co){ const M=MODES[co.mode]; return co.siblings.length > 1 ? `${M.prefix}${co.slugTheme}-kindergarten` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] sudoku/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] sudoku/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode})`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'sudoku', mode: (mode==='null'?null:mode), theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten', 'picture sudoku']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(mode, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:M.label(THEMES[list[(i+11)%list.length].theme].h1), href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    // NO `standard` key — readiness-class.
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['null','medium'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'sudoku');
const merged = { _note: cur._note + ' [Wave 5 lead: '+generated.length+' sudoku/{null,medium}/K readiness (Logical reasoning (readiness), NO alignment) via gen-wave5-sudoku.js — first multi-mode readiness lead.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} sudoku landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, over=0, banned=0, ccss=0, hasStd=0;
const OVERCLAIM=['math skill','maths skill','counting skill','number sense','addition','subtraction','place value','classify and count','count how many'];
const BAN=['fun and engaging','perfect for','great for','dive into','engaging','captivating','unlock','boost','supercharge','easy and fun'];
const CCSS=/\b(K|1|2|3)\.(OA|MD|NBT|G|CC|RF|L)\b/;
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const lc=body.toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length;
  if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}
  OVERCLAIM.forEach(x=>{if(lc.includes(x)){over++;console.log(`  OVERCLAIM ${e.slug}: "${x}"`);}});
  BAN.forEach(x=>{if(lc.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});
  if(CCSS.test(body)){ccss++;console.log(`  CCSS-CODE ${e.slug}`);}
  if('standard' in e){hasStd++;console.log(`  HAS-STANDARD ${e.slug} (readiness must omit)`);}
});
console.log(short?`${short} short`:'all >=200 words', '|', over?`${over} overclaim`:'no math over-claim', '|', banned?`${banned} banned`:'no banned', '|', ccss?`${ccss} CCSS-code`:'no CCSS code', '|', hasStd?`${hasStd} HAS-STANDARD`:'all readiness (no standard key)');