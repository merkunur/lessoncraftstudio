#!/usr/bin/env node
/* Wave 1b generator — EN addition × {image-number, mixed} × K.
 * Extends the live Wave-1 (image-image, 43) to the full addition×K set (143).
 * Reads DB-derived ground-truth coordinates from wave1b-coordinates.json
 * (canonical deck slug + collapse siblings = the real published join), pulls
 * theme copy from THEMES (Wave-1's 43 reused + 12 _bw), and authors MODE-TRUE
 * prose (6 P1 skeletons + 4 P2 + per-mode P3) — NOT the image-image skeletons,
 * which describe the wrong mechanic. Every coordinate is validity-gated again
 * (defensive; the manifest is already valid-filtered).
 *
 * MIXED find-addend rows are framed "make 10 / find the part", NEVER
 * "missing addend" (that framing is what keeps mixed K, not Gr1 — ledger lock).
 *
 * Merge: keep the 43 image-image + 4 pilot byte-stable; replace ONLY
 * addition/{image-number,mixed}. Then re-gate with gate.js.
 *
 * Usage:
 *   node scripts/seo-landing/gen-wave1b.js                 # full: all 100 (image-number+mixed)
 *   node scripts/seo-landing/gen-wave1b.js --lead          # mixed LEAD SLICE only (10 stratified)
 *   node scripts/seo-landing/gen-wave1b.js --only=image-number
 *   node scripts/seo-landing/gen-wave1b.js --only=mixed
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave1b-coordinates.json', 'utf8')).coordinates;

// theme -> { nouns, gen (generic plural), h1 }. Wave-1's 43 (copy verbatim) + 12 _bw.
const THEMES = {
  '4th_of_july':            {nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':            {nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'animals':                {nouns:'cows, sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':       {nouns:'lamps, chairs and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':     {nouns:'carts, baskets and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':                 {nouns:'bagels, buns and a cake', gen:'bakery treats', h1:'Bakery Treats'},
  'beach':                  {nouns:'buckets, spades and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':                  {nouns:'robins, owls and a duck', gen:'birds', h1:'Birds'},
  'birds_2':                {nouns:'parrots, swans and a crow', gen:'birds', h1:'More Birds'},
  'breakfast':              {nouns:'eggs, pancakes and a banana', gen:'breakfast foods', h1:'Breakfast'},
  'camping':                {nouns:'tents, torches and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':              {nouns:'trees, baubles and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':             {nouns:'pencils, books and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':              {nouns:'shirts, socks and a hat', gen:'clothes', h1:'Clothes'},
  'desserts_and_sweets':   {nouns:'cupcakes, lollipops and a pie', gen:'sweet treats', h1:'Desserts and Sweets'},
  'dinosaurs':             {nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':                {nouns:'eggs, bunnies and a basket', gen:'Easter things', h1:'Easter'},
  'farm_animals':          {nouns:'cows, pigs and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':               {nouns:'tulips, daisies and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':      {nouns:'foxes, deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':                {nouns:'apples, bananas and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':             {nouns:'sofas, tables and a lamp', gen:'furniture', h1:'Furniture'},
  'hospital':              {nouns:'beds, bandages and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'insects_and_bugs':      {nouns:'ants, bees and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':         {nouns:'spoons, whisks and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':         {nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':                 {nouns:'drums, bells and a flute', gen:'instruments', h1:'Musical Instruments'},
  'occupations':           {nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':            {nouns:'fish, crabs and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':                  {nouns:'cats, dogs and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':           {nouns:'letters, stamps and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{nouns:'frogs, snakes and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':                {nouns:'circles, squares and a triangle', gen:'shapes', h1:'Shapes'},
  'space':                 {nouns:'rockets, planets and a star', gen:'space things', h1:'Space'},
  'thanksgivinng':         {nouns:'turkeys, pumpkins and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':       {nouns:'kites, planes and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':                 {nouns:'hammers, saws and a wrench', gen:'tools', h1:'Tools'},
  'toys':                  {nouns:'balls, blocks and a teddy', gen:'toys', h1:'Toys'},
  'tree':                  {nouns:'oaks, pines and a palm', gen:'trees', h1:'Trees'},
  'valentine_bw':          {nouns:'hearts, roses and a card', gen:'valentine pictures', h1:'Valentine Pictures (Black & White)'},
  'vegetables':            {nouns:'carrots, peas and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':              {nouns:'buses, trucks and a digger', gen:'vehicles', h1:'Vehicles'},
  'zoo_animals':           {nouns:'lions, zebras and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
  // --- 12 new black-and-white themes (B&W rendering; content discrete + countable). H1 carries the
  //     B&W signal for SEO + to differentiate from the colour sibling; bodies differ via distinct nouns.
  'apparel_bw':            {nouns:'jumpers, scarves and a glove', gen:'clothes', h1:'Clothes (Black & White)'},
  'education_bw':          {nouns:'crayons, notebooks and a ruler', gen:'school things', h1:'School Things (Black & White)'},
  'faces_bw':              {nouns:'smiling faces, winking faces and a yawning face', gen:'faces', h1:'Faces (Black & White)'},
  'farm_bw':               {nouns:'tractors, barns and a scarecrow', gen:'farm things', h1:'Farm Things (Black & White)'},
  'home_bw':               {nouns:'beds, mirrors and a teapot', gen:'home things', h1:'Home Things (Black & White)'},
  'household_bw':          {nouns:'brooms, buckets and a kettle', gen:'household things', h1:'Household Things (Black & White)'},
  'kitchen_bw':            {nouns:'pots, plates and a rolling pin', gen:'kitchen things', h1:'Kitchen Things (Black & White)'},
  'nature_bw':             {nouns:'leaves, acorns and a mushroom', gen:'nature things', h1:'Nature (Black & White)'},
  'objects_bw':            {nouns:'a clock, a cup and an umbrella', gen:'everyday objects', h1:'Everyday Objects (Black & White)'},
  'sea_life_bw':           {nouns:'seahorses, jellyfish and a clam', gen:'sea creatures', h1:'Sea Creatures (Black & White)'},
  'sports_bw':             {nouns:'footballs, racquets and a whistle', gen:'sports gear', h1:'Sports Gear (Black & White)'},
  'travel_and_holiday_bw': {nouns:'suitcases, cameras and a passport', gen:'holiday things', h1:'Travel and Holidays (Black & White)'},
};

// ---- IMAGE-NUMBER prose: one PICTURED group + a WRITTEN numeral, blank total; count the pictures then count on by the number.
const SKEL_IN = [
  (n,g)=>`Every row of this kindergarten worksheet pairs a group of ${n} you can count with a plain number written beside it, and leaves the total as an empty box. The child counts the pictured ${g}, then counts on from that number to find how many there are in all. Seeing a real group on one side and a written numeral on the other is the first bridge from counting pictures to working with symbols, and the amounts stay small enough that every answer can be checked by counting what is shown.`,
  (n,g)=>`Here addition mixes something to count with something to read. One addend is a little set of ${n} the child counts for themselves; the other is a numeral already written down; the box after the equals sign is where the total goes. Counting the ${g} and then carrying on past the written number to reach the answer is exactly how five- and six-year-olds start to trust that a numeral stands for an amount they could have counted out themselves.`,
  (n,g)=>`On this sheet the child meets a picture and a number on the same line. They count the group of ${n}, look at the number printed next to it, and count on from the pictures until the written number has been added in full. Keeping one side as a countable group of ${g} gives a child who is still shaky on written numbers a concrete place to start, while the printed numeral gently introduces the symbol that will carry their maths later on.`,
  (n,g)=>`Each problem shows one group to count and one number to read: a set of ${n}, a plus sign, a written numeral, and an empty total. The child finds how many ${g} there are by counting the pictures and then counting on by the number. Because totals stay within ten, the answer is always reachable by counting rather than by recalling a fact, and the page quietly teaches that a numeral and a pile of things can mean the very same amount.`,
  (n,g)=>`This kindergarten sheet asks the child to add a group they can see to a number they can read. They count the ${n} in the picture, then count on that many more as the written number tells them, and write the total in the box. Half picture and half symbol, it is the natural step after counting two pictured groups — the child still counts to find the answer, but now one of the two amounts arrives as a numeral instead of a set of ${g}.`,
  (n,g)=>`A group of ${n} sits beside a written number on every row, with the total left blank. The child counts the pictured set first, then counts on by the number to say how many ${g} there are altogether. It is addition with one foot in counting and one foot in symbols: the picture keeps the meaning concrete while the numeral starts the move toward written sums, and the small totals let a kindergartner check every answer by counting.`,
];
const P2_IN = [
  (g)=>`Adding a group you can count to a number you can only read is a real milestone for a five-year-old. It is where counting-on begins — starting from the written number and carrying on through the pictured ${g} — and where a child first feels that a numeral is just a quick way of writing an amount they could have laid out as objects.`,
  (g)=>`This is the bridge between counting and arithmetic. A child who can count a set of ${g} and then count on by a written number is connecting the concrete world of objects to the symbols that will stand in for them, and keeping every total within ten means the link can always be checked by counting rather than taken on trust.`,
  (g)=>`Counting on from a number, instead of counting everything again from one, is a key kindergarten step, and pairing the number with a group of ${g} to count makes it concrete. The picture anchors the meaning while the numeral does the new work, so the symbol is introduced exactly when the child has something real to attach it to.`,
  (g)=>`Reading one addend as a numeral while counting the other as pictures keeps addition meaningful without keeping it purely pictorial forever. It is the gentlest introduction to written numbers in sums — the ${g} stay countable, the totals stay small, and the child learns that the figure on the page names the same amount they would have counted out by hand.`,
];

// ---- MIXED prose: per-row image-number (add to total) OR find-the-part (whole + one part shown, find the rest).
//      find-the-part framed as MAKE TEN / FIND THE PART — never "missing addend" (ledger lock keeps mixed K).
const SKEL_MX = [
  (n,g)=>`This kindergarten worksheet mixes two kinds of rows so the same ${g} keep the child thinking. On some rows a group of ${n} sits beside a written number and the child adds to find the total; on others the total is already there and one part is shown, so the child works out the part that completes it — the make-ten, find-the-part idea. Switching between adding and finding a part stops the page becoming automatic and keeps the meaning of the numbers in view.`,
  (n,g)=>`Two questions take turns down this sheet. One row asks how many ${n} there are altogether when a group is joined to a written number; the next shows the whole and one part, and asks what the other part must be to make it. Counting up to a total and breaking a total back into parts are two sides of the same understanding, and meeting both with the same pictured ${g} helps five- and six-year-olds see how they fit together.`,
  (n,g)=>`Some rows here are add-and-total, some are find-the-part. In the first kind the child counts a group of ${n}, reads a number, and writes how many in all; in the second the total is given with one part shown, and the child finds the part that fills the gap — the same thinking as making ten. Mixing the two keeps the child reading each row rather than repeating one move, and every amount stays small enough to check by counting.`,
  (n,g)=>`Because the rows vary, the child cannot switch off. A row of ${n} beside a written number is a straight add-to-the-total; the next row gives the whole and a part and asks for the part still needed to make it. Both are kindergarten work — putting amounts together, and seeing the smaller numbers hiding inside a bigger one — and keeping them side by side with pictured ${g} builds the flexible number sense early addition is really about.`,
  (n,g)=>`This sheet asks the child to add on some rows and to find a part on others, all with the same friendly ${g}. Adding means counting a group of ${n} and a written number into one total; finding a part means looking at a total with one piece shown and working out what completes it, just like making ten. Going back and forth keeps the focus on what the numbers mean rather than on a single repeated step.`,
  (n,g)=>`Mixed practice lays adding and part-finding next to each other. On an adding row the child counts ${n} and a number to reach the total; on a part-finding row the total and one part are given and the child supplies the rest to make it whole. For a kindergartner, doing both with the same pictured ${g} is how the link between joining groups and breaking a number into parts first takes hold — and small totals keep every answer checkable by counting.`,
  // skeletons 7 + 8 (added at the second-calibration ruling: mixed 6->8 for high-theme-breadth depth; 8 is now the floor for comparable modes)
  (n,g)=>`No two rows in a stretch ask quite the same thing on this kindergarten sheet, and that is the point. Where a group of ${n} meets a written number, the child adds to find the total; where a total stands with a single part beside it, the child finds the part still needed to make it — the make-ten move. Pausing to notice which kind of row it is keeps a five-year-old reading the maths instead of running on autopilot, and every amount stays inside ten so the pictured ${g} can settle any answer by counting.`,
  (n,g)=>`Adding and part-finding are braided together down this page so the same ${g} get used two ways. One row hands the child a group of ${n} and a number to fold in for a total; the next hands over a whole with one part shown and asks for the piece that completes it, the way making ten works. Travelling between the two keeps both ideas warm at once — joining amounts and pulling a number apart into its pieces — and the small totals mean a kindergartner can always fall back on counting the pictures to be sure.`,
];
const P2_MX = [
  (g)=>`Putting amounts together and breaking them back into parts are the two halves of early number sense, and meeting both on one page builds the flexibility kindergartners need. Finding the part that makes a total is the make-ten thinking behind so much later arithmetic, and pairing it with straightforward adding keeps the ${g} concrete while the ideas grow.`,
  (g)=>`A child who can both add two amounts and find the part hiding inside a total is seeing numbers as things that come apart and go back together. That part-and-whole understanding — decomposing a small number into its pieces — is core kindergarten work, and mixing it with plain adding of ${g} keeps it grounded in counting rather than in remembered facts.`,
  (g)=>`Decomposition — knowing that a number like ten is made of smaller parts such as six and four — is exactly what the find-the-part rows practise, and the adding rows keep the counting fresh alongside it. Holding both in one task helps a five-year-old feel how addition and its reverse belong together, all while the pictured ${g} keep every total within reach of a count.`,
  (g)=>`Making a total from its parts and adding parts into a total are the same relationship seen from two directions. Kindergartners who practise both with the same ${g} build the make-ten and part-whole habits later written arithmetic leans on, and because the amounts stay small, every answer is still something the child can check by counting the pictures.`,
  // P2 variants 5-7 (added at the second-calibration ruling: mixed P2 4->7 so cell space 8x7=56 > 50 themes).
  (g)=>`Seeing that a handful of ${g} can be split into a few here and a few there — and that those parts rebuild the whole — is the number-bond idea at the centre of kindergarten arithmetic. The adding rows and the find-the-part rows practise the two directions of that bond, and keeping the amounts inside ten means a child can rebuild or take apart any total by counting.`,
  (g)=>`Long before number facts are memorised, kindergartners lean on strategies they can see — counting on to join two amounts, and finding how many more make a total. Practising both with the same ${g} builds those strategies side by side, so a child meets the make-ten move and simple adding as two tools for the same small numbers rather than as separate, disconnected drills.`,
  (g)=>`Finding the part that completes a total is the quiet beginning of seeing how adding and taking away are linked: the same three numbers — two parts and a whole — sit behind both. Kindergartners are not asked to name that link, only to feel it by working a total from its parts and back again, and the pictured ${g} keep every step countable and concrete.`,
];

// ---- Cell-assignment (second-calibration durable fix). The (skeleton x P2) cell space must STRICTLY
// exceed theme breadth, and the assignment must be a non-periodic/coprime BIJECTION so that no two themes
// share the same (skeleton, P2) cell while empty cells remain. A naive `i % cells` index has cell-period
// = S*P and clusters collisions periodically the moment S*P <= themeCount (the 8x4=32 < 50 dead-zone that
// produced two consecutive at-the-line FAILs). A coprime stride fills every cell before any reuse AND
// scatters post-exhaustion collisions instead of clustering them. Carry-forward floor for EVERY mode/wave/
// locale's P1 authoring: cells > themes, coprime assignment.
function gcd(a, b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){
  let k = Math.max(2, Math.round(cells * 0.6180339887)); // ~golden-ratio step = good low-discrepancy spread
  for (let d=0; d<cells; d++) for (const cand of [k+d, k-d]) if (cand>1 && cand<cells && gcd(cand,cells)===1) return cand;
  return 1;
}
function cellAssign(i, S, P){
  const cells = S*P, stride = coprimeStride(cells);
  const c = ((i % cells) * stride) % cells; // bijection on [0,cells): unique while empty cells remain
  return { skel: c % S, p2: Math.floor(c / S) % P };
}

function p3(mode, h1lower, g, nb){
  const opener = mode === 'image-number'
    ? `Children who like ${h1lower} settle into this quickly, and it suits a calm independent task or a counting game on the board.`
    : `Children who like ${h1lower} enjoy the change of pace from row to row, and it works well for a small group ready to think in more than one direction.`;
  return `${opener} When the numbers feel easy, count a fresh group in ${nb[0]}, or try ${nb[1]}. You can also browse every addition worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly in black and white or plays online for free.`;
}

// ---- build per-mode coordinate lists from the manifest, sorted by theme (stable skeleton rotation)
const LEAD_MIXED = ['animals','bakery','birds','vehicles','fruits','ocean_life','music','shapes','occupations','sea_life_bw'];
const args = process.argv.slice(2);
const lead = args.includes('--lead');
const onlyArg = (args.find(a=>a.indexOf('--only=')===0)||'').slice('--only='.length) || null;

function landingSlugOf(co){ return co.siblings.length > 1 ? `addition-${co.mode}-${co.slugTheme}-kindergarten` : co.canonical; }

function buildMode(mode){
  let list = COORDS.filter(c=>c.mode===mode).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  if (mode==='mixed' && lead) list = list.filter(c=> LEAD_MIXED.includes(c.theme));
  const SKEL = mode==='image-number'?SKEL_IN:SKEL_MX;
  const P2   = mode==='image-number'?P2_IN:P2_MX;
  const cells = SKEL.length * P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] ${mode}: cell space ${SKEL.length}x${P2.length}=${cells} <= theme breadth ${list.length} — forced same-cell collisions (grandfathered only while the gate passes; future waves MUST keep cells > themes)`);
  else console.log(`  [invariant OK] ${mode}: cell space ${SKEL.length}x${P2.length}=${cells} > theme breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for theme ${co.theme} (${mode}) — add to THEMES`); blocked++; return; }
    const v = validateCoordinate('addition', mode, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED ${mode}/${co.theme}: ${v.reason}`); blocked++; return; }
    const nbA = list[(i+1)%list.length], nbB = list[(i+7)%list.length];
    const nb = [ `addition with ${THEMES[nbA.theme].h1.toLowerCase()}`, `addition with ${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type:'addition', mode, theme:co.theme, level:'kindergarten' },
      eyebrow: 'Addition Worksheet',
      h1: `Addition with ${d.h1} — Kindergarten`,
      strand: 'Operations & Algebraic Thinking',
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten']),
      p1: SKEL[cellAssign(i, SKEL.length, P2.length).skel](d.nouns, d.gen),
      p2: P2[cellAssign(i, SKEL.length, P2.length).p2](d.gen),
      p3: p3(mode, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:`Addition with ${THEMES[list[(i+1)%list.length].theme].h1}`, href: landingSlugOf(list[(i+1)%list.length])},
        {label:`Addition with ${THEMES[list[(i+2)%list.length].theme].h1}`, href: landingSlugOf(list[(i+2)%list.length])},
        {label:`Addition with ${THEMES[list[(i+5)%list.length].theme].h1}`, href: landingSlugOf(list[(i+5)%list.length])},
        {label:`Addition with ${THEMES[list[(i+11)%list.length].theme].h1}`, href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[];
let blockedTotal=0;
const modes = onlyArg ? [onlyArg] : (lead ? ['mixed'] : ['image-number','mixed']);
modes.forEach(m=>{ const r=buildMode(m); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

// merge: keep 43 image-image + 4 pilot; replace ONLY addition/{image-number,mixed}
const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate.type==='addition' && (l.coordinate.mode==='image-number'||l.coordinate.mode==='mixed')));
const noteAdd = lead ? ' [Wave 1b LEAD SLICE: '+generated.length+' mixed landings (gate flush)].'
                     : ' [Wave 1b: '+generated.length+' addition/{image-number,mixed}/K via gen-wave1b.js (6 mode-true P1 skeletons/mode; mixed find-part framed make-ten, never missing-addend); 8 invalid themes/mode retired].';
const merged = { _note: cur._note + noteAdd, landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} (modes: ${modes.join('+')}${lead?' LEAD':''}); blocked ${blockedTotal}; total landings now ${merged.landings.length}`);
let short=0; generated.forEach(e=>{const w=(e.p1+' '+e.p2+' '+e.p3).split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);}});
console.log(short? `${short} short (<200)` : `all ${generated.length} >=200 words`);
