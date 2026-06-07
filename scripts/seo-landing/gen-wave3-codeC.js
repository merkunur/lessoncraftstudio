#!/usr/bin/env node
/* Wave 3 COUPLED SLICE C — EN code-addition × {null, secret-word} × Grade 1, the 44 ≤20-running-sum-clean coords.
 * null = secret-code / symbol-substitution / crack-the-code. secret-word = solve-to-spell-a-word / mystery-message.
 * Both: a legend maps each picture→a number; child looks up + adds 3+ → 1.OA.A.2 (add three whole numbers ≤20).
 * The 41 sum>20 breachers are re-levelled out-of-tree (Gr2 record). Copy guard: code/substitution/word-reveal +
 * within-twenty; no two-digit example numbers, no Gr2 drift. 8 P1 x 7 P2 = 56 > 29/15 (coprime + guard).
 * Usage: node scripts/seo-landing/gen-wave3-codeC.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave3-codeC-coordinates.json', 'utf8')).coordinates;

const THEMES = {
  '4th_of_july':{nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':{nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'animals':{nouns:'cows, sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':{nouns:'lamps, chairs and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':{nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':{nouns:'bagels, buns and a cake', gen:'bakery treats', h1:'Bakery Treats'},
  'beach':{nouns:'buckets, spades and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':{nouns:'robins, owls and a duck', gen:'birds', h1:'Birds'},
  'birds_2':{nouns:'parrots, swans and a crow', gen:'birds', h1:'More Birds'},
  'breakfast':{nouns:'eggs, pancakes and a banana', gen:'breakfast foods', h1:'Breakfast'},
  'camping':{nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':{nouns:'trees, baubles and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':{nouns:'pencils, books and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':{nouns:'shirts, socks and a hat', gen:'clothes', h1:'Clothes'},
  'desserts_and_sweets':{nouns:'cupcakes, lollipops and a pie', gen:'sweet treats', h1:'Desserts and Sweets'},
  'dinosaurs':{nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':{nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'faces_bw':{nouns:'smiling faces, winking faces and a yawning face', gen:'faces', h1:'Faces (Black & White)'},
  'farm_animals':{nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':{nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':{nouns:'foxes, deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':{nouns:'apples, bananas and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':{nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'hospital':{nouns:'beds, bandages and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'insects_and_bugs':{nouns:'ants, bees and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':{nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':{nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':{nouns:'drums, bells and a flute', gen:'instruments', h1:'Musical Instruments'},
  'occupations':{nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':{nouns:'fish, crabs and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':{nouns:'cats, dogs and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':{nouns:'letters, stamps and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':{nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'space':{nouns:'rockets, planets and a star', gen:'space things', h1:'Space'},
  'thanksgivinng':{nouns:'turkeys, pumpkins and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':{nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':{nouns:'hammers, saws and a wrench', gen:'tools', h1:'Tools'},
  'toys':{nouns:'balls, blocks and a teddy', gen:'toys', h1:'Toys'},
  'tree':{nouns:'oaks, pines and a palm', gen:'trees', h1:'Trees'},
  'valentine_bw':{nouns:'hearts, roses and a card', gen:'valentine pictures', h1:'Valentine Pictures (Black & White)'},
  'vegetables':{nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':{nouns:'buses, trucks and a digger', gen:'vehicles', h1:'Vehicles'},
  'zoo_animals':{nouns:'lions, zebras and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
};

// NULL = secret code / symbol substitution / crack the code. (n)=nouns,(g)=gen.
const SKEL_NULL = [
  (n,g)=>`This Grade 1 worksheet turns addition into a code to crack. A legend gives each of the ${n} a secret number; on every row the child looks up the pictures, swaps in their numbers, and adds them together. Because each row adds three or more of these picture-numbers, it is exactly the Grade 1 step beyond two-addend sums — and the legend keeps the child decoding, not just calculating. Every total stays within twenty, so the answers are still ones a child can count to check.`,
  (n,g)=>`Crack the code by adding. Each of the ${g} in the legend stands for a number, and each row of this sheet lines up three or more of them to add. The child decodes the pictures into numbers, then finds the sum — substitution and addition in one task. Adding three or more numbers is what makes this Grade 1 rather than kindergarten, and keeping every total within twenty means a child can still check the answer by counting.`,
  (n,g)=>`On this sheet the ${n} are a secret code: the legend tells the child what number each one is worth, and every row asks the child to look them up and add. With three or more picture-numbers per row, it practises adding several small numbers at once — the Grade 1 leap past two-addend sums — wrapped in a code-breaking puzzle that keeps a child engaged. Totals stay within twenty so the sums remain countable and checkable.`,
  (n,g)=>`Here addition wears a disguise. A legend assigns each of the ${g} a number; the child reads each row of pictures, substitutes the numbers, and adds three or more of them together. The decoding gives a reason to keep going, but the real work is the multi-number addition that defines Grade 1. Every sum is held within twenty, so a child can fall back on counting to be sure the code came out right.`,
  (n,g)=>`This is addition as code-breaking. The ${n} each carry a hidden value from the legend, and each row strings three or more of them into a sum. The child looks up every picture, writes its number, and adds — practising the several-addend addition that is new at Grade 1. Because the totals never pass twenty, the puzzle stays within reach: a child can always count to confirm the decoded answer.`,
  (n,g)=>`Each row is a little cipher to solve by adding. The legend pairs every one of the ${g} with a number; the child decodes a row of three or more pictures into numbers and totals them. Substitution plus adding several numbers is exactly the Grade 1 work here, and the code wrapper keeps a child decoding row after row. Sums stay within twenty so the answers remain something a child can check by counting.`,
  (n,g)=>`Look up, swap in, add — that is the rhythm of this secret-code sheet. A legend gives each of the ${n} a number, and every row adds three or more of them once the pictures are decoded. Adding several small numbers in one go is the Grade 1 skill underneath the puzzle, and the decoding keeps it from feeling like a drill. Every total is within twenty, so a child can count to be certain.`,
  (n,g)=>`This Grade 1 worksheet hides numbers inside pictures. The legend reveals what each of the ${g} is worth, and the child decodes each row and adds the three or more values together. It pairs substitution with multi-number addition — the step past kindergarten's two-addend sums — and the code-breaking gives every row a small payoff. Keeping the totals within twenty means the decoded sums are still countable and checkable.`,
];
const P2_NULL = [
  (g)=>`Adding three or more numbers in one step is a defining Grade 1 skill — kindergarten works mostly with two parts, so combining several at once is the new challenge. The code wrapper gives it purpose, but underneath the child is practising exactly that: looking up several small numbers and totalling them, all kept within twenty so the sums stay checkable. Each correct row is a small, countable win that adds up across the page.`,
  (g)=>`The substitution step quietly strengthens number sense: a child has to hold what each picture is worth while adding, which is more demanding than reading bare numerals. That is good Grade 1 work, and pairing it with three-or-more-addend sums within twenty builds the comfort with combining several numbers that Grade 1 is meant to develop — without ever leaving the range a child can count to be sure.`,
  (g)=>`Decoding each picture before adding keeps a child from racing through on autopilot — every row needs a deliberate look-up, then a sum of several numbers. That extra step is why the code format suits Grade 1: it makes multi-number addition feel like a puzzle rather than a drill, while the within-twenty totals keep each answer countable and within easy reach of the strategies a child already has.`,
  (g)=>`Combining three or more small numbers is where many Grade 1 children first meet the idea that order does not change a sum, and that they can add in whatever grouping is easiest. A code sheet rehearses that with every row, and keeping the totals within twenty means a child can lean on counting strategies while the habit forms — building real confidence with several-addend sums one row at a time.`,
  (g)=>`The legend turns addition into look-up-and-combine, which mirrors how a child will later use facts they know: find each value, then total them. Practised within twenty with three or more addends, it is solid Grade 1 work — the puzzle keeps engagement high while the repeated multi-number adding does the real teaching, every total small enough to check by counting the decoded numbers.`,
  (g)=>`Because each row adds several numbers rather than two, this practice stretches a child just past kindergarten without leaving the within-twenty range where they are secure. The code wrapper adds motivation, not difficulty — the numbers stay small and countable, so the growth is in handling more addends, exactly the Grade 1 target, while the decoding keeps a child reading and engaged through the page.`,
  (g)=>`Looking up each picture's value and then adding three or more of them rehearses both careful reading and multi-number addition at once. For a Grade 1 child that combination builds real confidence with small sums, and holding every total within twenty keeps the work honest — a child can always count the decoded numbers to check the answer rather than guess it, then move on to the next coded row.`,
];

// SECRET-WORD = solve to spell a word / mystery message (same substitution + multi-addend, word-reveal payoff).
const SKEL_SW = [
  (n,g)=>`This Grade 1 worksheet hides a word behind a code. A legend gives each of the ${n} a secret number; the child decodes and adds each row of three or more pictures, and every total points to a letter — solve them all and the answers spell a hidden word. The addition is the real task, but the word at the end is the reward that keeps a child decoding. Totals stay within twenty so each sum can be checked by counting.`,
  (n,g)=>`Solve the sums to spell the word. Each of the ${g} in the legend stands for a number, every row adds three or more of them, and each total reveals a letter of a hidden message. The child decodes, adds, and watches a word appear — multi-number addition with a mystery payoff. Adding several small numbers is the Grade 1 step here, and keeping every total within twenty means a child can count to be sure each letter is right.`,
  (n,g)=>`A secret word waits at the bottom of this sheet. The legend turns each of the ${n} into a number; the child adds three or more picture-numbers per row, and each answer reveals a letter to spell the word. The decoding-and-adding is the work; the word is the reason to finish. Practising several-addend addition is what makes it Grade 1, and within-twenty totals keep every sum a child can check by counting.`,
  (n,g)=>`Crack the code, spell the word. Each row of this sheet adds three or more of the ${g}, each worth a number from the legend, and every total maps to a letter — together they spell a hidden message. The child substitutes, adds, and decodes the word letter by letter. The multi-number addition is the Grade 1 skill; the spelled word is the payoff that keeps a child going, with every total kept within twenty so it stays countable.`,
  (n,g)=>`This sheet turns adding into a word puzzle. A legend gives the ${n} their secret numbers; the child adds three or more per row, and each sum points to a letter that helps spell a hidden word. The reward of revealing the word keeps a child decoding row after row, but the real practice is adding several small numbers — the Grade 1 step past two-addend sums. Totals stay within twenty so each letter's sum can be checked by counting.`,
  (n,g)=>`Add to reveal the message. Every one of the ${g} carries a number from the legend, each row totals three or more of them, and the answers spell out a hidden word one letter at a time. The child decodes, adds, and uncovers the message — substitution and multi-number addition with a satisfying finish. Adding several numbers at once is the Grade 1 work, and keeping every total within twenty means a child can count to confirm each one.`,
  (n,g)=>`A hidden word is the prize on this Grade 1 sheet. The legend assigns each of the ${n} a number; the child adds three or more picture-numbers per row, and each total points to a letter to spell the word. The puzzle keeps a child decoding and adding, which is exactly the several-addend practice Grade 1 calls for. Because the totals never pass twenty, every sum stays something a child can check by counting before writing its letter.`,
  (n,g)=>`On this sheet the answers spell a secret word. Each of the ${g} is worth a number in the legend; the child decodes each row, adds the three or more values, and each total reveals a letter. Solving every sum spells the hidden message — multi-number addition wrapped in a word-reveal puzzle. The adding is the Grade 1 skill, the word is the reward, and within-twenty totals keep each decoded sum countable and checkable.`,
];
const P2_SW = [
  (g)=>`Spelling a word from the answers gives a child a reason to add carefully — one wrong sum and a letter is off — so the mystery-word format quietly rewards accuracy. Underneath, the skill is pure Grade 1: adding three or more small numbers within twenty, with the decoding and the spelled word keeping a child engaged through a whole page.`,
  (g)=>`The word-reveal turns a page of sums into a single goal, which holds attention on the multi-number addition longer than a plain code sheet might. That addition — combining three or more values within twenty — is the Grade 1 work; the spelled word is simply the payoff that makes a child want to finish every row correctly.`,
  (g)=>`Because each total maps to a letter, a child has a built-in check: if the word does not make sense, a sum needs another look. That self-correcting quality suits Grade 1 well, and it sits on top of genuine practice — substituting picture-values and adding several of them, all kept within twenty so the sums stay countable.`,
  (g)=>`Adding three or more numbers is the Grade 1 step past kindergarten's two-addend sums, and wrapping it in a spell-the-word puzzle gives a child a concrete reason to do it well. The numbers stay within twenty so each decoded sum is checkable, while the hidden word keeps a child decoding and adding to the very end.`,
  (g)=>`The mystery word rewards persistence: a child must solve every row to read the message, which means practising multi-number addition many times over. That repetition — adding three or more values within twenty — is exactly what builds Grade 1 confidence, and the spelled word makes the repetition feel like a game rather than a drill.`,
  (g)=>`Decoding pictures into numbers, adding several of them, and turning each total into a letter asks a child to hold several steps together — good thinking practice for Grade 1. The arithmetic underneath stays squarely within twenty, so the challenge is in the combining and the decoding, not in numbers a child cannot yet check by counting.`,
  (g)=>`A spell-the-word sheet keeps a child accurate because the reward depends on it, and the skill it rewards is core Grade 1 addition: combining three or more small numbers within twenty. The legend and the hidden word add motivation and a self-check, while the totals stay small enough that a child can always count the decoded values to be sure.`,
];

function p3(mode, h1lower, g, nb){
  const opener = mode === 'secret-word'
    ? `Children who like ${h1lower} keep going just to see the hidden word appear, which makes the adding feel like a game. When this feels easy, spell a new word in ${nb[0]}, or try ${nb[1]}.`
    : `Children who like ${h1lower} treat each row as a small puzzle, which keeps a code-breaker happily adding. When this feels easy, crack the code in ${nb[0]}, or try ${nb[1]}.`;
  const browse = mode === 'secret-word' ? 'every secret word addition worksheet' : 'every secret code addition worksheet';
  return `${opener} You can also browse ${browse} or the whole ${g} collection for grade 1 — each sheet prints cleanly or plays online for free.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'null':        { SKEL: SKEL_NULL, P2: P2_NULL, token:'', eyebrow:'Secret Code Addition Worksheet', h1:(h)=>`Secret Code Addition with ${h} — Grade 1`, nbVerb:'secret code addition with ', label:(t)=>`Secret Code Addition with ${t}` },
  'secret-word': { SKEL: SKEL_SW,   P2: P2_SW,   token:'secret-word-', eyebrow:'Secret Word Addition Worksheet', h1:(h)=>`Secret Word Addition with ${h} — Grade 1`, nbVerb:'secret word addition with ', label:(t)=>`Secret Word Addition with ${t}` },
};
function landingSlugOf(co){ const M=MODES[co.mode]; return co.siblings.length > 1 ? `code-addition-${M.token}${co.slugTheme}-grade-1` : co.canonical; }

function buildMode(mode){
  const list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[mode];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] code-addition/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] code-addition/${mode}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${mode})`); blocked++; return; }
    const modeForGate = mode==='null'?null:mode;
    const v = validateCoordinate('code-addition', modeForGate, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED code-addition/${mode}/${co.theme}: ${v.reason}`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'code-addition', mode: (mode==='null'?null:mode), theme:co.theme, level:'grade-1' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: 'Operations & Algebraic Thinking',
      standard: '1.OA.A.2',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'grade 1']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(mode, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:M.label(THEMES[list[(i+ (list.length>7?7:3))%list.length].theme].h1), href: landingSlugOf(list[(i+(list.length>7?7:3))%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['null','secret-word'].forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'code-addition');
const merged = { _note: cur._note + ' [Wave 3 slice C: '+generated.length+' code-addition/{null,secret-word}/Gr1 via gen-wave3-codeC.js (8 P1 x 7 P2; 1.OA.A.2; 44 ≤20-clean; 41 sum>20 re-levelled to Gr2 record).]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} code-addition-C landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, drift=0, two=0;
const DRIFT=['place value','place-value','regroup','carrying','two-digit','double-digit','fluency','mastery','within 100'];
const TWODIGIT=/\b(1[1-9]|[2-9][0-9])\b/;
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} if(DRIFT.some(x=>body.toLowerCase().includes(x))){drift++;console.log(`  DRIFT ${e.slug}`);} if(TWODIGIT.test(body)){two++;console.log(`  TWO-DIGIT ${e.slug}`);} });
console.log(short?`${short} short`:'all >=200 words', '|', drift?`${drift} drift`:'no Gr2-drift', '|', two?`${two} two-digit`:'no two-digit example numbers');
