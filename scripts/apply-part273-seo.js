/**
 * Part 273: Swedish Product Pages SEO — Apps 8-14
 *
 * Updates SEO metadata for:
 * 8. drawing-lines-worksheets.ts
 * 9. picture-bingo-worksheets.ts
 * 10. sudoku-worksheets.ts
 * 11. big-small-worksheets.ts
 * 12. chart-count-worksheets.ts
 * 13. code-addition-worksheets.ts
 * 14. draw-and-color-worksheets.ts
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');

const updates = [
  {
    file: 'drawing-lines-worksheets.ts',
    seo: {
      title: 'Linjeritning Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara linjeritnings\u00f6vningar f\u00f6r finmotorik-utveckling. R\u00e4ta linjer, b\u00e5gar och v\u00e5gor fr\u00e5n f\u00f6rskola till \u00e5rskurs 1. Ladda ner gratis PDF.',
      keywords: 'linjeritning generator, linjeritning \u00f6vningar, finmotorik \u00f6vningar, linjef\u00f6ljning \u00f6vning, penngrepp \u00f6vningar, ritning tr\u00e4ning f\u00f6rskola, finmotorik f\u00f6rskola, skrivf\u00f6rberedelse \u00f6vning, penngrepp tr\u00e4ning, linjer och former \u00f6vning, rittr\u00e4ning barn',
    },
    hero: {
      title: 'Linjeritning Generator',
      subtitle: 'Finmotorik \u00d6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 1',
    },
  },
  {
    file: 'picture-bingo-worksheets.ts',
    seo: {
      title: 'Gratis Bildlotto Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara bildlottospel f\u00f6r barn. 50 teman, anpassningsbara rutn\u00e4t och bilder fr\u00e5n 3 000+ bibliotek. Perfekt f\u00f6r klassrummet. Ladda ner gratis.',
      keywords: 'bildlotto generator, lotto utskrivbar barn, bildlotto spel, utskrivbart lottospel, lotto f\u00f6rskola, klassrumslotto, bildlotto rutn\u00e4t, lotto \u00f6vning barn, gruppspel utskrivbar, lotto bilder barn, lottospel klassrum',
    },
    hero: {
      title: 'Bildlotto Generator',
      subtitle: 'Skapa Utskrivbara Lottospel med 50 Teman',
    },
  },
  {
    file: 'sudoku-worksheets.ts',
    seo: {
      title: 'Barnsudoku Generator \u2014 Gratis | LessonCraftStudio',
      description: 'Skapa utskrivbara bildsudoku f\u00f6r barn. Enkla och medelsv\u00e5ra logikspel fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Bilder fr\u00e5n 3 000+ bibliotek. Gratis PDF.',
      keywords: 'barnsudoku generator, bildsudoku barn, sudoku utskrivbar, barns logikspel, enkel sudoku barn, bildsudoku utskrivbar, sudoku f\u00f6rskola, logik\u00f6vningar barn, sudoku rutn\u00e4t barn, t\u00e4nkande f\u00e4rdigheter tr\u00e4ning, sudoku l\u00e5gstadiet',
    },
    hero: {
      title: 'Barnsudoku Generator',
      subtitle: 'Utskrivbara Bildsudoku fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
  {
    file: 'big-small-worksheets.ts',
    seo: {
      title: 'Storleksj\u00e4mf\u00f6relse Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara stort och litet j\u00e4mf\u00f6relse\u00f6vningar med bilder. Utveckla storleksbegrepp fr\u00e5n f\u00f6rskola till \u00e5rskurs 1. Anpassa inst\u00e4llningar. Gratis PDF.',
      keywords: 'storleksj\u00e4mf\u00f6relse generator, stort och litet \u00f6vningar, storleksj\u00e4mf\u00f6relse f\u00f6rskola, storlekar igenk\u00e4nning, st\u00f6rre och mindre, storleksj\u00e4mf\u00f6relse barn, stor liten utskrivbar, storleksutforskare \u00f6vningar, storleks\u00f6vningar f\u00f6rskola, j\u00e4mf\u00f6relsef\u00e4rdigheter \u00f6vning, storlekar sortering',
    },
    hero: {
      title: 'Stort och Litet Generator',
      subtitle: 'Storleksj\u00e4mf\u00f6relse\u00f6vningar med Bilder fr\u00e5n F\u00f6rskola till \u00c5rskurs 1',
    },
  },
  {
    file: 'chart-count-worksheets.ts',
    seo: {
      title: 'Gratis Diagramr\u00e4kning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara diagramr\u00e4knings\u00f6vningar med bilder. R\u00e4kning, f\u00e4rgl\u00e4ggning och dataavl\u00e4sning f\u00f6r f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'diagramr\u00e4kning generator, diagramr\u00e4kning \u00f6vningar, stapeldiagram barn, dataavl\u00e4sning f\u00f6rskola, r\u00e4kning och f\u00e4rgl\u00e4ggning, diagram \u00f6vning, bilddiagram arbetsblad, statistik barn, diagramtolkning \u00f6vning, matematik diagram, bilddiagram utskrivbar',
    },
    hero: {
      title: 'Diagramr\u00e4kning Generator',
      subtitle: 'Utskrivbara Diagramr\u00e4knings\u00f6vningar med Bilder',
    },
  },
  {
    file: 'code-addition-worksheets.ts',
    seo: {
      title: 'Gratis Kodaddition Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara kodadditions\u00f6vningar d\u00e4r barn avkodar hemliga meddelanden genom addition. F\u00f6rskola till \u00e5rskurs 3. Med bilder. Gratis PDF.',
      keywords: 'kodaddition generator, kodaddition \u00f6vningar, hemligt meddelande matematik, krypterings\u00f6vning barn, addition kodknackning, hemliga koder matematik, additionskod arbetsblad, matematik pussel barn, avkodnings\u00f6vning, kodaddition utskrivbar, matematikspel barn',
    },
    hero: {
      title: 'Kodaddition Generator',
      subtitle: 'Hemliga Meddelanden genom Additions\u00f6vningar',
    },
  },
  {
    file: 'draw-and-color-worksheets.ts',
    seo: {
      title: 'Gratis Rutritning Generator | LessonCraftStudio',
      description: 'Skapa utskrivbara rutritnings\u00f6vningar f\u00f6r pixelkonst. Utveckla rumsuppfattning och finmotorik fr\u00e5n f\u00f6rskola till \u00e5rskurs 3. Ladda ner gratis PDF.',
      keywords: 'rutritning generator, rutritning \u00f6vningar, pixelkonst barn, rutn\u00e4tsritning utskrivbar, rumsuppfattning \u00f6vning, rita p\u00e5 rutn\u00e4t, pixelritning arbetsblad, symmetri \u00f6vning, koordinat\u00f6vning barn, rutritning f\u00f6rskola, rut\u00f6vningar utskrivbar',
    },
    hero: {
      title: 'Rutritning Generator',
      subtitle: 'Utskrivbara Pixelkonst\u00f6vningar fr\u00e5n F\u00f6rskola till \u00c5rskurs 3',
    },
  },
];

let totalChanges = 0;

for (const upd of updates) {
  const filePath = path.join(BASE, upd.file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${upd.file}`);
  console.log('='.repeat(60));

  // Replace seo.title
  const titleRe = /(seo:\s*\{[^}]*?title:\s*')([^']*?)(')/s;
  const titleReDouble = /(seo:\s*\{[^}]*?title:\s*")([^"]*?)(")/s;

  if (titleRe.test(content)) {
    const oldTitle = content.match(titleRe)[2];
    content = content.replace(titleRe, `$1${upd.seo.title}$3`);
    console.log(`  seo.title: "${oldTitle}" -> "${upd.seo.title}"`);
  } else if (titleReDouble.test(content)) {
    const oldTitle = content.match(titleReDouble)[2];
    content = content.replace(titleReDouble, `$1${upd.seo.title}$3`);
    console.log(`  seo.title: "${oldTitle}" -> "${upd.seo.title}"`);
  }

  // Replace seo.description
  const descRe = /(seo:\s*\{[^}]*?description:\s*')([^']*?)(')/s;
  const descReDouble = /(seo:\s*\{[^}]*?description:\s*")([^"]*?)(")/s;

  if (descRe.test(content)) {
    const oldDesc = content.match(descRe)[2];
    content = content.replace(descRe, `$1${upd.seo.description}$3`);
    console.log(`  seo.description: "${oldDesc.substring(0, 50)}..." -> "${upd.seo.description.substring(0, 50)}..."`);
  } else if (descReDouble.test(content)) {
    const oldDesc = content.match(descReDouble)[2];
    content = content.replace(descReDouble, `$1${upd.seo.description}$3`);
    console.log(`  seo.description: "${oldDesc.substring(0, 50)}..." -> "${upd.seo.description.substring(0, 50)}..."`);
  }

  // Replace seo.keywords
  const kwRe = /(seo:\s*\{[^}]*?keywords:\s*')([^']*?)(')/s;
  const kwReDouble = /(seo:\s*\{[^}]*?keywords:\s*")([^"]*?)(")/s;

  if (kwRe.test(content)) {
    const oldKw = content.match(kwRe)[2];
    content = content.replace(kwRe, `$1${upd.seo.keywords}$3`);
    console.log(`  seo.keywords: ${oldKw.split(',').length} kw -> ${upd.seo.keywords.split(',').length} kw`);
  } else if (kwReDouble.test(content)) {
    const oldKw = content.match(kwReDouble)[2];
    content = content.replace(kwReDouble, `$1${upd.seo.keywords}$3`);
    console.log(`  seo.keywords: ${oldKw.split(',').length} kw -> ${upd.seo.keywords.split(',').length} kw`);
  }

  // Replace hero.title
  const heroStart = content.indexOf('hero: {');
  if (heroStart === -1) {
    console.log('  WARNING: Could not find hero section');
    continue;
  }

  // Find the title within hero (first title after hero: {)
  const heroContent = content.substring(heroStart);
  const heroTitleMatch = heroContent.match(/title:\s*'([^']*?)'/);
  const heroTitleMatchDouble = heroContent.match(/title:\s*"([^"]*?)"/);

  if (heroTitleMatch) {
    const oldHeroTitle = heroTitleMatch[1];
    const fullMatch = heroTitleMatch[0];
    const newMatch = `title: '${upd.hero.title}'`;
    content = content.substring(0, heroStart) + heroContent.replace(fullMatch, newMatch);
    console.log(`  hero.title: "${oldHeroTitle}" -> "${upd.hero.title}"`);
  } else if (heroTitleMatchDouble) {
    const oldHeroTitle = heroTitleMatchDouble[1];
    const fullMatch = heroTitleMatchDouble[0];
    const newMatch = `title: '${upd.hero.title}'`;
    content = content.substring(0, heroStart) + heroContent.replace(fullMatch, newMatch);
    console.log(`  hero.title: "${oldHeroTitle}" -> "${upd.hero.title}"`);
  }

  // Replace hero.subtitle - find it after hero title
  const heroStart2 = content.indexOf('hero: {');
  const heroContent2 = content.substring(heroStart2);
  const heroSubMatch = heroContent2.match(/subtitle:\s*'([^']*?)'/);
  const heroSubMatchDouble = heroContent2.match(/subtitle:\s*"([^"]*?)"/);

  if (heroSubMatch) {
    const oldHeroSub = heroSubMatch[1];
    const fullMatch = heroSubMatch[0];
    const newMatch = `subtitle: '${upd.hero.subtitle}'`;
    content = content.substring(0, heroStart2) + heroContent2.replace(fullMatch, newMatch);
    console.log(`  hero.subtitle: "${oldHeroSub}" -> "${upd.hero.subtitle}"`);
  } else if (heroSubMatchDouble) {
    const oldHeroSub = heroSubMatchDouble[1];
    const fullMatch = heroSubMatchDouble[0];
    const newMatch = `subtitle: '${upd.hero.subtitle}'`;
    content = content.substring(0, heroStart2) + heroContent2.replace(fullMatch, newMatch);
    console.log(`  hero.subtitle: "${oldHeroSub}" -> "${upd.hero.subtitle}"`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`  SAVED: ${upd.file}`);
  } else {
    console.log(`  WARNING: No changes detected for ${upd.file}`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Done! Updated ${totalChanges} of ${updates.length} files.`);
console.log('='.repeat(60));
