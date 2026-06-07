#!/usr/bin/env node
/* Wave 4 LEAD + COUPLED — EN word-guess/easy (L.K.2.d, Language) + find-and-count/letter-spotting (RF.K.3.a, Reading:
 * Foundational Skills) × Kindergarten. Deliberate intent split (they share the letter/phonics head-term):
 *   word-guess  = ENCODE a whole word from its picture (spell/write/sound-out-and-build) — NEVER read/recognize.
 *   find-and-count = find pictures that BEGIN WITH a target letter-SOUND — NEVER "find the letter B" glyph-hunt.
 * Literacy gates are ungated/phonetic → NO theme retirement (the 8 abstract themes Math retires are valid here).
 * 8 P1 x 7 P2 = 56 > 47 (coprime + guard). Usage: node scripts/seo-landing/gen-wave4-literacyA.js
 */
const fs = require('fs');
const { validateCoordinate } = require('./validity-gate');
const EN = 'frontend/content/seo-landing/en.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/wave4-literacyA-coordinates.json', 'utf8')).coordinates;

const THEMES = {
  '4th_of_july':{nouns:'flags, stars and a drum', gen:'Fourth of July things', h1:'Fourth of July Things'},
  'accessories':{nouns:'hats, belts and a scarf', gen:'accessories', h1:'Accessories'},
  'activities':{nouns:'running, jumping and swimming', gen:'action words', h1:'Activities'},
  'animals':{nouns:'a cat, a sheep and a hen', gen:'animals', h1:'Animals'},
  'around_the_house':{nouns:'a lamp, a chair and a clock', gen:'household things', h1:'Household Things'},
  'at_the_supermarket':{nouns:'a cart, a basket and a till', gen:'supermarket things', h1:'Supermarket Things'},
  'bakery':{nouns:'a bagel, a bun and a cake', gen:'bakery treats', h1:'Bakery Treats'},
  'beach':{nouns:'a bucket, a spade and a starfish', gen:'beach things', h1:'Beach Things'},
  'birds':{nouns:'a robin, an owl and a duck', gen:'birds', h1:'Birds'},
  'birds_2':{nouns:'a parrot, a swan and a crow', gen:'birds', h1:'More Birds'},
  'body_parts':{nouns:'a hand, a foot and an ear', gen:'body parts', h1:'Body Parts'},
  'breakfast':{nouns:'an egg, a pancake and a banana', gen:'breakfast foods', h1:'Breakfast'},
  'camping':{nouns:'a tent, a torch and a backpack', gen:'camping gear', h1:'Camping Gear'},
  'christmas':{nouns:'a tree, a bauble and a stocking', gen:'Christmas things', h1:'Christmas'},
  'classroom':{nouns:'a pencil, a book and a globe', gen:'classroom objects', h1:'Classroom Objects'},
  'clothing':{nouns:'a shirt, a sock and a hat', gen:'clothes', h1:'Clothes'},
  'colors':{nouns:'red, blue and green things', gen:'colors', h1:'Colors'},
  'desserts_and_sweets':{nouns:'a cupcake, a lollipop and a pie', gen:'sweet treats', h1:'Desserts and Sweets'},
  'dinosaurs':{nouns:'a T. rex, a stegosaurus and a raptor', gen:'dinosaurs', h1:'Dinosaurs'},
  'easter':{nouns:'an egg, a bunny and a basket', gen:'Easter things', h1:'Easter'},
  'easter_bw':{nouns:'an egg, a bunny and a basket', gen:'Easter pictures', h1:'Easter (Black & White)'},
  'emotions':{nouns:'happy, sad and surprised faces', gen:'feelings', h1:'Feelings'},
  'faces_bw':{nouns:'a smiling face, a winking face and a yawning face', gen:'faces', h1:'Faces (Black & White)'},
  'farm_animals':{nouns:'a cow, a pig and a goat', gen:'farm animals', h1:'Farm Animals'},
  'flowers':{nouns:'a tulip, a daisy and a rose', gen:'flowers', h1:'Flowers'},
  'forest_creatures':{nouns:'a fox, a deer and a hedgehog', gen:'forest creatures', h1:'Forest Creatures'},
  'fruits':{nouns:'an apple, a banana and a pear', gen:'fruit', h1:'Fruits'},
  'furniture':{nouns:'a sofa, a table and a lamp', gen:'furniture', h1:'Furniture'},
  'home_bw':{nouns:'a bed, a mirror and a teapot', gen:'home things', h1:'Home Things (Black & White)'},
  'hospital':{nouns:'a bed, a bandage and a stethoscope', gen:'hospital things', h1:'Hospital Things'},
  'household_bw':{nouns:'a broom, a bucket and a kettle', gen:'household things', h1:'Household Things (Black & White)'},
  'insects_and_bugs':{nouns:'an ant, a bee and a ladybug', gen:'bugs', h1:'Insects and Bugs'},
  'kitchen_tools':{nouns:'a spoon, a whisk and a pan', gen:'kitchen tools', h1:'Kitchen Tools'},
  'miscellaneous':{nouns:'a key, a button and an umbrella', gen:'everyday objects', h1:'Everyday Objects'},
  'music':{nouns:'a drum, a bell and a flute', gen:'instruments', h1:'Musical Instruments'},
  'nature_bw':{nouns:'a leaf, an acorn and a mushroom', gen:'nature things', h1:'Nature (Black & White)'},
  'objects_bw':{nouns:'a clock, a cup and an umbrella', gen:'everyday objects', h1:'Everyday Objects (Black & White)'},
  'occupations':{nouns:'a chef, a nurse and a pilot', gen:'people', h1:'Community Helpers'},
  'ocean_life':{nouns:'a fish, a crab and an octopus', gen:'sea creatures', h1:'Ocean Life'},
  'pets':{nouns:'a cat, a dog and a rabbit', gen:'pets', h1:'Pets'},
  'post_office':{nouns:'a letter, a stamp and a parcel', gen:'post', h1:'Post Office'},
  'reptiles_and_amphibians':{nouns:'a frog, a snake and a turtle', gen:'reptiles', h1:'Reptiles and Amphibians'},
  'shapes':{nouns:'a circle, a square and a triangle', gen:'shapes', h1:'Shapes'},
  'space':{nouns:'a rocket, a planet and a star', gen:'space things', h1:'Space'},
  'spring':{nouns:'a flower, a raindrop and a kite', gen:'spring things', h1:'Spring'},
  'summer':{nouns:'the sun, an ice cream and a beach ball', gen:'summer things', h1:'Summer'},
  'thanksgivinng':{nouns:'a turkey, a pumpkin and a pie', gen:'Thanksgiving things', h1:'Thanksgiving'},
  'things_that_fly':{nouns:'a kite, a plane and a balloon', gen:'flying things', h1:'Things That Fly'},
  'tools':{nouns:'a hammer, a saw and a wrench', gen:'tools', h1:'Tools'},
  'toys':{nouns:'a ball, a block and a teddy', gen:'toys', h1:'Toys'},
  'tree':{nouns:'an oak, a pine and a palm', gen:'trees', h1:'Trees'},
  'valentine_bw':{nouns:'a heart, a rose and a card', gen:'valentine pictures', h1:'Valentine Pictures (Black & White)'},
  'vegetables':{nouns:'a carrot, a pea and a pumpkin', gen:'vegetables', h1:'Vegetables'},
  'vehicles':{nouns:'a bus, a truck and a digger', gen:'vehicles', h1:'Vehicles'},
  'weather':{nouns:'sun, rain and snow', gen:'weather', h1:'Weather'},
  'winter':{nouns:'snow, a mitten and a scarf', gen:'winter things', h1:'Winter'},
  'zoo_animals':{nouns:'a lion, a zebra and a giraffe', gen:'zoo animals', h1:'Zoo Animals'},
};

// WORD-GUESS = encode a whole word from its picture (L.K.2.d). Copy-guard: spell/write/build/sound-out, NOT read.
const SKEL_WG = [
  (n,g)=>`This Kindergarten worksheet turns pictures into spelling practice. For each picture — ${n} — the child sounds out the word and writes the missing letters into the blanks to build it. There is no word to copy; the child has to hear the sounds and choose the letters that make them, which is exactly how early spelling begins. Working with ${g} keeps the words concrete and familiar, so a child can focus on matching each sound to its letter.`,
  (n,g)=>`Spell the word for each picture. The child looks at one of ${n}, says the word slowly, and fills the blanks with the letters for the sounds they hear — building the word letter by letter. This is encoding, not reading: the child produces the spelling rather than recognizing a word already written. Picture clues from the ${g} anchor the meaning so the whole task is sounding-out and writing.`,
  (n,g)=>`Each row shows a picture and empty letter boxes; the child writes the letters to spell what they see. Sounding out ${n} and choosing the letters that match is the heart of early Kindergarten spelling — the child draws on the sound-letter links they are learning to build each word from scratch. The ${g} are everyday and picture-clear, so the work is the spelling, not guessing what the picture is.`,
  (n,g)=>`Here a child builds words from sounds. Shown a picture of ${n}, they say it, stretch out the sounds, and write the matching letters into the blanks. Producing the spelling — rather than reading a finished word — is what makes this Kindergarten encoding practice. The familiar ${g} keep each word short and sayable, so a child can hear every sound and find its letter.`,
  (n,g)=>`This sheet asks the child to write, not read. For each of ${n}, they sound the word out and fill in the missing letters to spell it. That sound-to-letter building is early Kindergarten spelling — the child has to know which letter makes each sound and put them in order. The ${g} give clear picture clues, so the only puzzle is how to spell the word, not what the word is.`,
  (n,g)=>`Sound it out and build it. Each picture of ${n} is a word for the child to spell by writing its letters into the blanks. Because the word is not shown, the child must encode it from its sounds — the foundation of Kindergarten writing. Short, familiar ${g} mean a child can say the word, hear each sound, and choose the letter that matches, one at a time.`,
  (n,g)=>`On this Kindergarten worksheet the pictures set the words and the child supplies the spelling. Looking at ${n}, they say it aloud and write the letters for the sounds into the empty boxes. This is producing a word from scratch — encoding — not recognizing one already printed. The ${g} keep the words concrete so the child's whole attention is on matching sounds to letters.`,
  (n,g)=>`Build each word letter by letter. The child sees a picture of ${n}, sounds out the word, and writes the letters that spell it into the blanks. Spelling a word from its sounds — rather than reading it — is exactly the Kindergarten encoding skill this practises, and the familiar ${g} give every word a clear, sayable picture clue so the focus stays on the sound-letter match.`,
];
const P2_WG = [
  (g)=>`Spelling a word by its sounds is a different, harder skill than reading one — the child has to recall which letter makes each sound and write it, not just recognize a printed word. That is exactly what Kindergarten encoding is, and a picture-clue sheet rehearses it directly: see it, say it, build it. Working with familiar ${g} keeps the words short enough to sound out fully, and a child who builds a word themselves remembers its spelling far better than one who only reads it.`,
  (g)=>`Early spelling grows from hearing the sounds in a word and matching each to a letter. This worksheet drills that one word at a time: the picture supplies the word, the child supplies the letters. Because the child produces the spelling rather than copying or reading it, it builds the sound-letter knowledge Kindergarten writing depends on. The ${g} keep every word concrete and sayable, and each finished word is a small proof that a child can turn sounds into print.`,
  (g)=>`Producing a spelling from scratch asks more of a child than recognizing a word — and that extra step is the Kindergarten point. The picture removes the guesswork about meaning so the whole task is sounding the word out and choosing letters. Short ${g} words let a child hear each sound clearly and choose the letter that makes it, so they can spell a word without ever needing it spelled out for them first.`,
  (g)=>`The sound-it-out-and-write routine here is the core of Kindergarten encoding: a child listens to a word, breaks it into sounds, and writes a letter for each. Doing it from a picture clue keeps the meaning fixed so the child can concentrate on the spelling. Familiar ${g} mean the words stay short and the sounds stay clear, and the child practises the exact move that writing will ask of them all year.`,
  (g)=>`Writing the letters for the sounds in a word — encoding — is how Kindergarten children first learn to spell, and it is distinct from reading a word someone else wrote. This sheet practises it picture by picture, with the child building each word themselves. The ${g} give clear, concrete clues so the only work is matching sound to letter, which is the single most useful thing a beginning speller can rehearse.`,
  (g)=>`Matching each sound in a word to its letter and writing it down is the spelling foundation Kindergarten is built on. A picture-clue sheet rehearses it cleanly: the child knows the word from the picture and has to produce its spelling. Keeping the ${g} short and familiar means a child can stretch the word out and hear every sound to spell, building real independence with short, regular words.`,
  (g)=>`This is encoding practice — turning a spoken word into written letters — which a child must do to write, not just to read. The picture sets the word; the child sounds it out and builds it. That production step is the Kindergarten skill, and short, picture-clear ${g} keep each word within reach of a child still learning the sound-letter links, so each small success builds toward writing whole sentences later.`,
];

// FIND-AND-COUNT letter-spotting = find pictures that BEGIN WITH a target letter-SOUND (RF.K.3.a). NOT glyph-hunt.
const SKEL_FC = [
  (n,g)=>`This Kindergarten worksheet is a beginning-sound hunt. The child is given a letter and finds every picture in the scene that STARTS WITH that letter's sound — if the letter is B, they look for the ball, the bear, the bus. It is not about spotting the letter shape; it is about hearing the first sound in each word and matching it to the letter. The ${g} fill the scene with words to listen for.`,
  (n,g)=>`Listen for the first sound. The child gets a target letter and marks all of ${n} whose names begin with that sound — say each picture, hear how it starts, and decide if it matches. This is letter-sound matching, the heart of early phonics: connecting a sound to its letter, not just recognizing a shape. The busy ${g} scene gives plenty of words to test against the sound.`,
  (n,g)=>`Each round names a letter, and the child finds the pictures that begin with its sound. Saying the name of each of ${n} and listening to the opening sound is how the child decides — the cat and the cow match a hard C, the dog and the duck match D. The skill is hearing the first sound and tying it to a letter, exactly the Kindergarten letter-sound link, set in a scene full of ${g}.`,
  (n,g)=>`Find everything that starts with the sound. Given a letter, the child hunts the scene for ${n} whose names open with that letter's sound, saying each word to check its first sound. This is beginning-sound matching — connecting the sound to the letter — not searching for the printed letter itself. A scene packed with ${g} gives the child many first-sounds to listen for and sort.`,
  (n,g)=>`This is a first-sound sorting game. The child is told a letter and marks ${n} whose names begin with that letter's sound — sounding out the start of each word and matching it. Hearing a word's opening sound and linking it to a letter is the Kindergarten phonics skill here, distinct from recognizing the letter's shape. The ${g} scene supplies a rich mix of beginning sounds to work through.`,
  (n,g)=>`Say it, hear the start, match the letter. For a given letter, the child finds the pictures of ${n} that begin with its sound, testing each word by saying it aloud. The point is the sound — does the word START with /b/? — not finding a letter B drawn somewhere. That sound-to-letter connection is core Kindergarten phonics, and the ${g} fill the page with words to listen to.`,
  (n,g)=>`A target letter sets the hunt: the child marks every one of ${n} whose name begins with that letter's sound. By saying each picture and listening to its first sound, the child practises matching a sound to its letter — the foundational Kindergarten skill — rather than spotting a letter shape. The crowded ${g} scene means lots of beginning sounds to compare against the target.`,
  (n,g)=>`On this Kindergarten worksheet the child hunts by sound. Given a letter, they find ${n} whose names start with that letter's sound, saying each word to hear its opening. It trains the link between a letter and the sound it makes at the start of a word — beginning-sound phonics — not visual letter-spotting. The ${g} give a scene full of words whose first sounds the child sorts.`,
];
const P2_FC = [
  (g)=>`Connecting a letter to the sound it makes is the bedrock of Kindergarten reading, and beginning-sound matching practises it directly: the child hears the first sound of a word and decides which letter it belongs to. This is letter-SOUND work, not letter-shape recognition — the child must know that B says /b/, then catch that sound at the start of words like ${g}, long before they could read those words on their own.`,
  (g)=>`Hearing the first sound in a spoken word and tying it to a letter is exactly the letter-sound correspondence Kindergarten readers are building. A beginning-sound hunt rehearses it many times over: say a picture, listen to its start, match the letter. The ${g} scene gives a wide range of opening sounds, so the child practises the sound-letter link across lots of words rather than drilling one in isolation.`,
  (g)=>`Beginning-sound matching is phonics, not visual searching: the child isn't looking for a letter's shape on the page, they're listening for which words START with a sound and linking that sound to a letter. That distinction is the Kindergarten skill, and a busy scene of ${g} gives many first-sounds to sort, strengthening the sound-letter connection a little more with every picture named.`,
  (g)=>`To find what begins with a letter's sound, a child has to say each word and isolate its first sound — then decide if it matches the target letter. That is the heart of early phonics: knowing what sound a letter makes and catching it at the start of words. The varied ${g} keep a wide set of beginning sounds in play, so the practice never narrows to a single rehearsed answer.`,
  (g)=>`Matching a sound to its letter is what lets a child eventually decode words, and it starts with beginning sounds. This sheet has the child hear the opening sound of each picture and connect it to the target letter — pure letter-sound work. A scene full of ${g} offers many first-sounds, so the sound-letter link gets rehearsed across a rich mix of words instead of one at a time.`,
  (g)=>`The Kindergarten skill here is letter-sound correspondence: knowing the sound a letter makes and recognizing it at the start of a spoken word. Beginning-sound matching trains it without any reading — the child works from the pictures and their own voice. The ${g} give a scene of varied opening sounds, so a child practises tying sound to letter again and again, building the habit that decoding will later rely on.`,
  (g)=>`Listening for a word's first sound and matching it to a letter is foundational phonics — the link a child needs before blending sounds into words. A beginning-sound hunt rehearses it concretely: say each picture, hear the start, match the letter. The ${g} fill the scene with first-sounds to compare, so the sound-letter connection is practised across many words in a single sitting.`,
];

function p3(type, h1lower, g, nb){
  if (type === 'word-guess')
    return `Children who like ${h1lower} settle into the sounding-out, and building each word gives a small win. When this feels easy, spell the words in ${nb[0]}, or try ${nb[1]}. You can also browse every spelling worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly or plays online for free, and every word a child builds makes the next one easier to sound out.`;
  return `Children who like ${h1lower} enjoy the hunt, and listening for each first sound keeps them saying words aloud. When this feels easy, sort the sounds in ${nb[0]}, or try ${nb[1]}. You can also browse every beginning-sounds worksheet or the whole ${g} collection for kindergarten — each sheet prints cleanly or plays online for free, and the more first-sounds a child hunts, the quicker the sound-letter link becomes automatic.`;
}

function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function coprimeStride(cells){ let k=Math.max(2,Math.round(cells*0.6180339887)); for(let d=0;d<cells;d++) for(const cand of [k+d,k-d]) if(cand>1&&cand<cells&&gcd(cand,cells)===1) return cand; return 1; }
function cellAssign(i,S,P){ const cells=S*P, stride=coprimeStride(cells); const c=((i%cells)*stride)%cells; return {skel:c%S, p2:Math.floor(c/S)%P}; }

const MODES = {
  'word-guess':     { mode:'easy', SKEL: SKEL_WG, P2: P2_WG, prefix:'word-guess-easy-', eyebrow:'Spelling Worksheet', strand:'Language', standard:'L.K.2.d', h1:(h)=>`Spell the Word with ${h}`, nbVerb:'spell the word with ', label:(t)=>`Spell the Word with ${t}` },
  'find-and-count': { mode:'letter-spotting', SKEL: SKEL_FC, P2: P2_FC, prefix:'find-and-count-', eyebrow:'Beginning Sounds Worksheet', strand:'Reading: Foundational Skills', standard:'RF.K.3.a', h1:(h)=>`Beginning Sounds with ${h}`, nbVerb:'beginning sounds with ', label:(t)=>`Beginning Sounds with ${t}` },
};
function landingSlugOf(co){ const M=MODES[co.type]; return co.siblings.length > 1 ? `${M.prefix}${co.slugTheme}-kindergarten` : co.canonical; }

function buildType(type){
  const list = COORDS.filter(c=>c.type===type).slice().sort((a,b)=> a.theme<b.theme?-1:1);
  const M = MODES[type];
  const cells = M.SKEL.length * M.P2.length;
  if (cells <= list.length) console.log(`  [INVARIANT WARN] ${type}: ${M.SKEL.length}x${M.P2.length}=${cells} <= ${list.length}`);
  else console.log(`  [invariant OK] ${type}: ${M.SKEL.length}x${M.P2.length}=${cells} > breadth ${list.length} — zero forced same-cell collisions`);
  const out=[]; let blocked=0;
  list.forEach((co,i)=>{
    const d = THEMES[co.theme];
    if(!d){ console.log(`NO COPY DATA for ${co.theme} (${type})`); blocked++; return; }
    const v = validateCoordinate(type, M.mode, co.theme, {});
    if(!v.valid){ console.log(`BLOCKED ${type}/${co.theme}: ${v.reason}`); blocked++; return; }
    const cell = cellAssign(i, M.SKEL.length, M.P2.length);
    const nbA=list[(i+1)%list.length], nbB=list[(i+5)%list.length];
    const nb=[ `${M.nbVerb}${THEMES[nbA.theme].h1.toLowerCase()}`, `${M.nbVerb}${THEMES[nbB.theme].h1.toLowerCase()}` ];
    const entry = {
      slug: landingSlugOf(co),
      variantShape: co.siblings.length>1 ? 'collapsed' : 'singleton',
      coordinate: { type, mode: M.mode, theme:co.theme, level:'kindergarten' },
      eyebrow: M.eyebrow,
      h1: M.h1(d.h1),
      strand: M.strand,
      standard: M.standard,
      slotTokens: d.nouns.replace(/ and /g,', ').split(', ').map(s=>s.replace(/^(a|an|the) /,'').trim()).concat([d.gen, co.theme.replace(/_/g,' '), 'kindergarten']),
      p1: M.SKEL[cell.skel](d.nouns, d.gen),
      p2: M.P2[cell.p2](d.gen),
      p3: p3(type, d.h1.toLowerCase(), d.gen, nb),
      canonicalDeckSlug: co.canonical,
      carousel: [
        {label:M.label(THEMES[list[(i+1)%list.length].theme].h1), href: landingSlugOf(list[(i+1)%list.length])},
        {label:M.label(THEMES[list[(i+2)%list.length].theme].h1), href: landingSlugOf(list[(i+2)%list.length])},
        {label:M.label(THEMES[list[(i+5)%list.length].theme].h1), href: landingSlugOf(list[(i+5)%list.length])},
        {label:M.label(THEMES[list[(i+11)%list.length].theme].h1), href: landingSlugOf(list[(i+11)%list.length])},
      ],
    };
    if (co.siblings.length>1) entry.collapseSiblings = co.siblings;
    out.push(entry);
  });
  return {out, blocked};
}

let generated=[]; let blockedTotal=0;
['word-guess','find-and-count'].forEach(t=>{ const r=buildType(t); generated=generated.concat(r.out); blockedTotal+=r.blocked; });

const cur = JSON.parse(fs.readFileSync(EN,'utf8'));
const keep = cur.landings.filter(l => l.coordinate.type !== 'word-guess' && l.coordinate.type !== 'find-and-count');
const merged = { _note: cur._note + ' [Wave 4 lead+coupled: '+generated.length+' word-guess/easy (L.K.2.d Language) + find-and-count/letter-spotting (RF.K.3.a Reading: Foundational Skills) /K via gen-wave4-literacyA.js — first cross-strand wave.]', landings: keep.concat(generated) };
fs.writeFileSync(EN, JSON.stringify(merged, null, 2) + '\n');
console.log(`generated ${generated.length} literacy landings (blocked ${blockedTotal}); total landings now ${merged.landings.length}`);
let short=0, intent=0, banned=0;
const READ_DRIFT=['read the word','sight word','sight-word','recognize the word','find the letter']; // intent-integrity guards
const BAN=['fun and engaging','perfect for','dive into','engaging','captivating','unlock','boost','supercharge'];
generated.forEach(e=>{const body=(e.p1+' '+e.p2+' '+e.p3).toLowerCase(); const w=body.split(/\s+/).filter(Boolean).length; if(w<200){short++; console.log(`  SHORT ${e.slug}: ${w}`);} READ_DRIFT.forEach(x=>{if(body.includes(x)){intent++;console.log(`  INTENT-LEAK ${e.slug}: "${x}"`);}}); BAN.forEach(x=>{if(body.includes(x)){banned++;console.log(`  BANNED ${e.slug}: "${x}"`);}});});
console.log(short?`${short} short`:'all >=200 words', '|', intent?`${intent} intent-leaks`:'no intent leaks (no read/recognize/glyph-hunt)', '|', banned?`${banned} banned`:'no banned phrases');
