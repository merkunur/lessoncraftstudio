#!/usr/bin/env node
/**
 * Part 163: Fix cross-theme intro similarity FAILs
 *
 * Rewrites 3 intros that are >30% similar to their counterparts:
 *   1. dinosaurs/preschool (34% similar to animals/preschool)
 *   2. farm/preschool (32% similar to holidays/preschool AND easter/preschool)
 *   3. zoo/kindergarten (34% similar to animals/kindergarten)
 *
 * Each rewrite uses a completely different structural template to break
 * the Jaccard trigram similarity below the 30% threshold.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');

// ── New intros with unique structures ───────────────────────────────────────

const FIXES = [
  {
    theme: 'dinosaurs',
    grade: 'preschool',
    // Old: starts "Preschoolers aged three and four experience dinosaurs with pure..."
    // New: starts with dinosaur-specific sensory/emotional hook, completely different structure
    newIntro: `What happens when a three-year-old discovers that real creatures once stood taller than houses, had teeth as long as bananas, and shook the ground with every footstep? Dinosaurs unlock a level of engagement in preschoolers that no other theme can match, because these ancient giants transform ordinary worksheet tasks into expeditions through a lost world. A counting page becomes a dinosaur egg hunt where little fingers touch each egg before circling the numeral. A coloring sheet becomes an encounter with a gentle Brachiosaurus whose neck stretches from one edge of the page to the other. This sense of scale is uniquely valuable for three- and four-year-olds who are just beginning to understand concepts like big, bigger, and biggest. Size comparison activities where children place dinosaurs in order from the tiny Compsognathus to the towering Argentinosaurus develop measurement vocabulary and seriation skills that formal math instruction will build upon in later grades. Dinosaur name tracing introduces letter formation through words that children actually want to write, because Rex and Dino carry emotional weight that generic letter practice cannot replicate. Matching each dinosaur to its correct shadow sharpens the visual discrimination that supports both reading readiness and scientific observation. The prehistoric narrative woven through every worksheet gives young learners a reason to persist through challenges, whether they are connecting dots to reveal a hidden Pteranodon or sorting herbivores from carnivores using picture clues. Sessions should stay between eight and twelve minutes to respect preschool attention spans, and pairing paper activities with dinosaur figurine play or stomping movement breaks reinforces concepts through the multisensory engagement that this age group requires for deep learning.`,
  },
  {
    theme: 'farm',
    grade: 'preschool',
    // Old: starts "Preschoolers aged three and four are deeply fascinated by farm animals..."
    // New: starts with sensory/daily-life connection, unique structure
    newIntro: `Every morning begins with the farm, even if a three-year-old does not realize it yet. The milk in their cup, the egg on their plate, and the bread in their lunchbox all trace back to barns, coops, and golden wheat fields. Farm worksheets for preschoolers turn this invisible daily connection into a hands-on discovery journey that builds numeracy, letter awareness, and oral vocabulary simultaneously. Instead of abstract shapes on a page, children count real objects they recognize, four brown eggs nestled in straw, three spotted cows standing behind a fence, two red tractors parked beside a silo. This concrete grounding matters enormously at ages three and four because young minds learn best when new information attaches to existing knowledge, and nearly every preschooler already knows what a chicken sounds like or what a horse looks like. Coloring worksheets featuring barns, haystacks, and vegetable gardens develop pencil control within familiar outlines that feel approachable rather than intimidating. Letter tracing gains purpose when the word being formed is pig or hen, creatures a child can name, imitate, and feel affection toward. Sorting activities that group animals by where they live, cows in the pasture, chickens in the coop, fish in the pond, build early classification thinking while reinforcing the concept that living things have specific homes and needs. The seasonal rhythm of farm life provides natural sequencing practice as children arrange planting, growing, harvesting, and resting into the correct order. Vocabulary grows rapidly through conversations about harvest, tractor, barn, and pasture, words that connect academic language to the tangible world outside the classroom window. Worksheet sessions at this age work best when limited to eight to twelve minutes and extended through complementary play with toy farm sets, sing-along farm songs, or picture books about where food comes from.`,
  },
  {
    theme: 'zoo',
    grade: 'kindergarten',
    // Old: starts "Kindergarteners bring a growing sense of independence and natural curiosity..."
    // New: starts with the geographic/global dimension unique to zoos
    newIntro: `A zoo is the only place where a kindergartener can travel from the African savanna to the Arctic tundra to the Amazon rainforest in a single afternoon, and zoo-themed worksheets recreate that global journey on every page. This geographic richness is what sets zoo activities apart for five- and six-year-olds who are hungry to understand how the wider world works. When a worksheet asks children to sort animals by the continent they come from, placing pandas with Asia and penguins with Antarctica, it builds classification skills and early geographic literacy at the same time. Addition and subtraction problems use zoo scenarios that feel genuinely exciting: if the zookeeper feeds nine fish to the seals in the morning and six more in the afternoon, how many fish did the seals eat today. These story-based number sentences push kindergarteners beyond rote computation into mathematical reasoning grounded in a narrative they care about. Zoo vocabulary worksheets introduce words like exhibit, habitat, endangered, and conservation, building the academic language that supports reading comprehension across subjects. Detailed coloring pages depicting enclosures with multiple animal species challenge the fine motor precision that kindergarteners are rapidly developing. Classification becomes more sophisticated as children organize zoo creatures not just by appearance but by diet, habitat type, body covering, and number of legs, often working with two attributes simultaneously for the first time. Pattern sequences using repeating zoo animal images develop the algebraic thinking foundations that elementary standards now emphasize from the earliest grades. The conservation message embedded in zoo themes resonates strongly with kindergarteners who are developing their first sense of responsibility toward the natural world, making worksheets that discuss protecting endangered animals both academically rigorous and emotionally meaningful. Big-and-small comparison activities exploit the dramatic size range of zoo inhabitants, from tiny meerkats to massive elephants, to build measurement vocabulary and estimation skills naturally.`,
  },
];

// ── Apply fixes ─────────────────────────────────────────────────────────────

let fixCount = 0;

for (const fix of FIXES) {
  const filePath = path.join(CONTENT_DIR, fix.theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: ${filePath} not found`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf-8');

  // Find the grade block's intro field using the eval-based parser to get the old intro
  const raw = src;
  let js = raw
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+type\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/:\s*EnrichedThemeContent\s*=/, ' =')
    .replace(/registerThemeContent\([^)]+\);?/g, '')
    .replace(/\bas\s+const\b/g, '')
    .trim();
  const fn = new Function(`${js}\nreturn content;`);
  const content = fn();

  const oldIntro = content.gradeContent[fix.grade].intro;

  // Escape the new intro for single-quoted JS string
  const escapedNew = fix.newIntro
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Replace old intro with new one in the source
  const oldIdx = src.indexOf(oldIntro);
  if (oldIdx === -1) {
    // Try escaping approach - find the intro in the raw source by looking for the grade block
    console.error(`WARN: Could not find literal intro for ${fix.theme}/${fix.grade}, trying regex...`);

    // Use regex to find the intro field within the grade block
    const gradeBlockStart = src.indexOf(`'${fix.grade}':`);
    if (gradeBlockStart === -1) {
      console.error(`ERROR: Could not find grade block for ${fix.grade} in ${fix.theme}`);
      continue;
    }

    const introStart = src.indexOf("intro: '", gradeBlockStart);
    if (introStart === -1) {
      console.error(`ERROR: Could not find intro field in ${fix.theme}/${fix.grade}`);
      continue;
    }

    // Find the end of the intro string (matching single quote, not escaped)
    const introContentStart = introStart + "intro: '".length;
    let i = introContentStart;
    while (i < src.length) {
      if (src[i] === "'" && src[i - 1] !== '\\') break;
      i++;
    }
    const introEnd = i + 1; // include closing quote

    const replacement = `intro: '${escapedNew}'`;
    src = src.substring(0, introStart) + replacement + src.substring(introEnd);
  } else {
    src = src.replace(oldIntro, escapedNew);
  }

  fs.writeFileSync(filePath, src, 'utf-8');
  fixCount++;

  const wc = escapedNew.split(/\s+/).filter(Boolean).length;
  console.log(`OK  ${fix.theme}/${fix.grade}: intro replaced (${wc} words)`);
}

console.log(`\nFixed ${fixCount} intros.`);
