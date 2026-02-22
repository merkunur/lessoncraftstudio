/**
 * Part 161 fix: Populate empty useCases items for 13 product page files.
 * Each file gets 6 persona-based use cases with app-specific content.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

// App display names and activity descriptions for template interpolation
const APP_INFO = {
  'big-small-worksheets': { name: 'Big & Small', activity: 'size comparison worksheets', skill: 'visual size discrimination and ordering skills', format: 'size comparison activities', center: 'math center' },
  'chart-count-worksheets': { name: 'Chart & Count', activity: 'chart and count worksheets', skill: 'data literacy and counting fluency', format: 'picture chart activities', center: 'math center' },
  'find-and-count-worksheets': { name: 'Find & Count', activity: 'find and count worksheets', skill: 'visual scanning and counting accuracy', format: 'search-and-count activities', center: 'math center' },
  'find-objects-worksheets': { name: 'Find Objects', activity: 'hidden object worksheets', skill: 'visual discrimination and sustained attention', format: 'visual search activities', center: 'sensory center' },
  'matching-worksheets': { name: 'Matching', activity: 'matching worksheets', skill: 'visual association and memory development', format: 'picture matching activities', center: 'literacy center' },
  'missing-pieces-worksheets': { name: 'Missing Pieces', activity: 'missing pieces worksheets', skill: 'spatial reasoning and visual analysis', format: 'visual completion puzzles', center: 'puzzle center' },
  'odd-one-out-worksheets': { name: 'Odd One Out', activity: 'odd one out worksheets', skill: 'classification and categorical reasoning', format: 'critical thinking activities', center: 'thinking center' },
  'pattern-train-worksheets': { name: 'Pattern Train', activity: 'pattern train worksheets', skill: 'sequential reasoning and pattern recognition', format: 'pattern completion activities', center: 'math center' },
  'picture-bingo-worksheets': { name: 'Picture Bingo', activity: 'picture bingo cards', skill: 'visual matching and listening comprehension', format: 'bingo game activities', center: 'game center' },
  'picture-path-worksheets': { name: 'Picture Path', activity: 'picture path worksheets', skill: 'spatial navigation and directional awareness', format: 'maze and path tracing activities', center: 'puzzle center' },
  'picture-sort-worksheets': { name: 'Picture Sort', activity: 'picture sort worksheets', skill: 'categorization and logical grouping', format: 'sorting and classification activities', center: 'science center' },
  'shadow-match-worksheets': { name: 'Shadow Match', activity: 'shadow match worksheets', skill: 'shape recognition and figure-ground discrimination', format: 'silhouette matching activities', center: 'visual skills center' },
  'treasure-hunt-worksheets': { name: 'Treasure Hunt', activity: 'treasure hunt worksheets', skill: 'visual searching and sequential problem solving', format: 'adventure search activities', center: 'game center' },
};

function generateUseCases(slug) {
  const app = APP_INFO[slug];
  if (!app) return null;

  return [
    {
      id: '1',
      icon: '\uD83D\uDC69\u200D\uD83C\uDFEB',
      title: `Kindergarten Teachers: ${app.skill.split(' and ')[0].split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} Development`,
      subtitle: `${app.name} Worksheets for Ages 5-6 Classroom Activities`,
      description: `Kindergarten teachers integrate ${app.activity} into daily routines as engaging ${app.center} activities. Set difficulty to beginner level with simple exercises that build ${app.skill} progressively. The visual format requires minimal reading so students work independently after brief teacher modeling. Create themed worksheets matching current classroom units for cross-curricular connections. Generate multiple versions using different image themes for variety throughout the week.`,
      quote: `My kindergarteners love the ${app.name.toLowerCase()} worksheets. They ask for more every day!`,
    },
    {
      id: '2',
      icon: '\uD83D\uDCDA',
      title: `First Grade Teachers: Building ${app.skill.split(' and ')[0].split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} Skills`,
      subtitle: `Advanced ${app.name} Activities for Independent Practice`,
      description: `First grade teachers use ${app.activity} at increased difficulty levels for independent practice and early finisher activities. Students develop ${app.skill} through progressively challenging exercises that build confidence and persistence. Create differentiated worksheet sets using the same theme at multiple levels for seamless classroom management. The ${app.format} work perfectly for morning routines, homework packets, and assessment preparation activities.`,
      quote: `${app.name} worksheets are my go-to early finisher activity. Students stay engaged until the bell.`,
    },
    {
      id: '3',
      icon: '\uD83C\uDF1F',
      title: `Special Education Teachers: Accessible ${app.name} Activities`,
      subtitle: `Visual Learning Supports for Diverse Abilities`,
      description: `Special education teachers value ${app.activity} because the visual format accommodates diverse learning needs without requiring strong reading skills. Adjust difficulty settings to create individualized worksheets matching each student\\'s developmental level. The image-based exercises build ${app.skill} through concrete visual experiences rather than abstract concepts. Create consistent routine activities using familiar image themes that reduce anxiety while building essential cognitive skills.`,
      quote: `The adjustable difficulty lets me create ${app.name.toLowerCase()} sheets perfect for each student\\'s level.`,
    },
    {
      id: '4',
      icon: '\uD83C\uDF0D',
      title: `ESL Teachers: Language-Free ${app.name} Practice`,
      subtitle: `Visual Activities Accessible at All Language Levels`,
      description: `ESL teachers incorporate ${app.activity} as equitable activities where all students participate regardless of English proficiency. The ${app.format} require visual analysis rather than language comprehension, creating natural entry points for newcomer students. Use themed images to build vocabulary connections as students discuss their work. Generate worksheets in eleven languages to provide instructions in students\\' primary language while developing ${app.skill}.`,
      quote: `My newcomer students complete ${app.name.toLowerCase()} worksheets with the same confidence as native speakers.`,
    },
    {
      id: '5',
      icon: '\uD83C\uDFE0',
      title: `Homeschool Parents: Self-Paced ${app.name} Learning`,
      subtitle: `Independent Practice Activities for Home Education`,
      description: `Homeschool parents appreciate ${app.activity} as independent practice activities that develop ${app.skill} without requiring constant supervision. Create progressive difficulty sets for self-paced skill building across multiple sessions. The visual format engages children who struggle with text-heavy worksheets. Generate themed versions connecting to current unit studies for integrated learning. One subscription provides unlimited worksheet creation for multiple children at different ability levels.`,
      quote: `My kids work through ${app.name.toLowerCase()} sheets independently while I teach their siblings.`,
    },
    {
      id: '6',
      icon: '\uD83D\uDCB0',
      title: `Teacher Entrepreneurs: ${app.name} Bundles for Marketplace`,
      subtitle: `Create and Sell Professional Worksheet Products Online`,
      description: `Teacher entrepreneurs create themed ${app.activity} bundles for Teachers Pay Teachers, Etsy, and Amazon KDP. Package worksheets by theme, difficulty level, or seasonal collections for maximum marketplace appeal. The ${app.format} fill a consistent demand niche in early childhood education. Your subscription includes commercial licensing with no additional fees or attribution requirements. Create holiday packs, themed bundles, and progressive difficulty series generating passive income from your teaching expertise.`,
      quote: `My ${app.name.toLowerCase()} bundles sell consistently. The themed sets are especially popular.`,
    },
  ];
}

// ── Apply use cases ─────────────────────────────────────────────────────────

let totalFilled = 0;

for (const slug of Object.keys(APP_INFO)) {
  const filePath = path.join(DIR, slug + '.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${slug} — file not found`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');

  const ucIdx = src.indexOf('useCases:');
  if (ucIdx === -1) {
    console.log(`SKIP: ${slug} — no useCases section`);
    continue;
  }

  const itemsIdx = src.indexOf('items:', ucIdx);
  const after = src.slice(itemsIdx + 6, itemsIdx + 30).trim();
  if (!after.startsWith('[]')) {
    console.log(`SKIP: ${slug} — useCases already populated`);
    continue;
  }

  const useCases = generateUseCases(slug);
  if (!useCases) {
    console.log(`SKIP: ${slug} — no use case data`);
    continue;
  }

  const items = useCases.map(uc => {
    return `      {
        id: '${uc.id}',
        icon: '${uc.icon}',
        title: '${uc.title.replace(/'/g, "\\'")}',
        subtitle: '${uc.subtitle.replace(/'/g, "\\'")}',
        description: '${uc.description.replace(/'/g, "\\'")}',
        quote: '${uc.quote.replace(/'/g, "\\'")}',
      }`;
  });

  const itemsStr = `items: [\n${items.join(',\n')},\n    ]`;

  // Replace items: []
  const emptyPattern = /items:\s*\[\s*\]/;
  const ucSection = src.slice(ucIdx);
  const match = ucSection.match(emptyPattern);
  if (!match) {
    console.log(`SKIP: ${slug} — could not find items: [] in useCases`);
    continue;
  }

  const replaceStart = ucIdx + match.index;
  const replaceEnd = replaceStart + match[0].length;
  const lineEnd = src.indexOf('\n', replaceEnd);
  const trailing = src.slice(replaceEnd, lineEnd).trim();
  let actualEnd = replaceEnd;
  if (trailing.startsWith('//')) actualEnd = lineEnd;

  src = src.slice(0, replaceStart) + itemsStr + src.slice(actualEnd);

  fs.writeFileSync(filePath, src, 'utf8');
  totalFilled++;
  console.log(`FILLED: ${slug} — ${useCases.length} use cases`);
}

console.log(`\nTotal files updated: ${totalFilled}`);
