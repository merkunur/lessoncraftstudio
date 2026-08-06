/**
 * Part 160: Danish Theme+Grade SEO — Themes 21–24
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for alphabet, furniture, easter, halloween Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  alphabet: {
    preschool: {
      seoTitle: 'Alfabet-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare alfabet-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'alfabet f\u00f8rskole, alfabet opgaver 3\u20134 \u00e5r, alfabet \u00f8velser f\u00f8rskole, alfabet printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Alfabet-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare alfabet-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'alfabet b\u00f8rnehaveklasse, alfabet opgaver 5\u20136 \u00e5r, alfabet \u00f8velser b\u00f8rnehaveklasse, alfabet printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Alfabet-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare alfabet-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'alfabet 1. klasse, alfabet opgaver 6\u20137 \u00e5r, alfabet \u00f8velser 1. klasse, alfabet printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Alfabet-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare alfabet-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'alfabet 2. klasse, alfabet opgaver 7\u20138 \u00e5r, alfabet \u00f8velser 2. klasse, alfabet printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Alfabet-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare alfabet-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'alfabet 3. klasse, alfabet opgaver 8\u20139 \u00e5r, alfabet \u00f8velser 3. klasse, alfabet printbar 3. klasse',
    },
  },
  furniture: {
    preschool: {
      seoTitle: 'M\u00f8bler-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare m\u00f8bler-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'm\u00f8bler f\u00f8rskole, m\u00f8bler opgaver 3\u20134 \u00e5r, m\u00f8bler \u00f8velser f\u00f8rskole, m\u00f8bler printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'M\u00f8bler-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare m\u00f8bler-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'm\u00f8bler b\u00f8rnehaveklasse, m\u00f8bler opgaver 5\u20136 \u00e5r, m\u00f8bler \u00f8velser b\u00f8rnehaveklasse, m\u00f8bler printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'M\u00f8bler-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare m\u00f8bler-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'm\u00f8bler 1. klasse, m\u00f8bler opgaver 6\u20137 \u00e5r, m\u00f8bler \u00f8velser 1. klasse, m\u00f8bler printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'M\u00f8bler-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare m\u00f8bler-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'm\u00f8bler 2. klasse, m\u00f8bler opgaver 7\u20138 \u00e5r, m\u00f8bler \u00f8velser 2. klasse, m\u00f8bler printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'M\u00f8bler-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare m\u00f8bler-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'm\u00f8bler 3. klasse, m\u00f8bler opgaver 8\u20139 \u00e5r, m\u00f8bler \u00f8velser 3. klasse, m\u00f8bler printbar 3. klasse',
    },
  },
  easter: {
    preschool: {
      seoTitle: 'P\u00e5ske-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare p\u00e5ske-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'p\u00e5ske f\u00f8rskole, p\u00e5ske opgaver 3\u20134 \u00e5r, p\u00e5ske \u00f8velser f\u00f8rskole, p\u00e5ske printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'P\u00e5ske-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare p\u00e5ske-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'p\u00e5ske b\u00f8rnehaveklasse, p\u00e5ske opgaver 5\u20136 \u00e5r, p\u00e5ske \u00f8velser b\u00f8rnehaveklasse, p\u00e5ske printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'P\u00e5ske-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare p\u00e5ske-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'p\u00e5ske 1. klasse, p\u00e5ske opgaver 6\u20137 \u00e5r, p\u00e5ske \u00f8velser 1. klasse, p\u00e5ske printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'P\u00e5ske-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare p\u00e5ske-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'p\u00e5ske 2. klasse, p\u00e5ske opgaver 7\u20138 \u00e5r, p\u00e5ske \u00f8velser 2. klasse, p\u00e5ske printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'P\u00e5ske-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare p\u00e5ske-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'p\u00e5ske 3. klasse, p\u00e5ske opgaver 8\u20139 \u00e5r, p\u00e5ske \u00f8velser 3. klasse, p\u00e5ske printbar 3. klasse',
    },
  },
  halloween: {
    preschool: {
      seoTitle: 'Halloween-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare halloween-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'halloween f\u00f8rskole, halloween opgaver 3\u20134 \u00e5r, halloween \u00f8velser f\u00f8rskole, halloween printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Halloween-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare halloween-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'halloween b\u00f8rnehaveklasse, halloween opgaver 5\u20136 \u00e5r, halloween \u00f8velser b\u00f8rnehaveklasse, halloween printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Halloween-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare halloween-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'halloween 1. klasse, halloween opgaver 6\u20137 \u00e5r, halloween \u00f8velser 1. klasse, halloween printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Halloween-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare halloween-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'halloween 2. klasse, halloween opgaver 7\u20138 \u00e5r, halloween \u00f8velser 2. klasse, halloween printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Halloween-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare halloween-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'halloween 3. klasse, halloween opgaver 8\u20139 \u00e5r, halloween \u00f8velser 3. klasse, halloween printbar 3. klasse',
    },
  },
};

const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

function escapeForTs(str) {
  // Escape single quotes and backslashes for TS string literal
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

let totalInserted = 0;

for (const [theme, grades] of Object.entries(seoData)) {
  const filePath = path.join(BASE, theme, 'da.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let inGradeContent = false;
  let currentGrade = null;
  let gradeLineFound = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Detect gradeContent section
    if (trimmed.startsWith('gradeContent:') || trimmed.startsWith('gradeContent :')) {
      inGradeContent = true;
    }

    if (inGradeContent) {
      // Detect grade start (4-space or more indent with grade id)
      for (const gradeId of gradeIds) {
        if (trimmed.startsWith(`'${gradeId}':`)) {
          currentGrade = gradeId;
          gradeLineFound = true;
          break;
        }
      }

      // Detect the grade's intro line (must be inside gradeContent, after grade identifier)
      if (currentGrade && gradeLineFound && trimmed.startsWith('intro:') && grades[currentGrade]) {
        // Check if seoTitle already exists (skip if already inserted)
        if (i > 0 && !lines[i - 1].includes('seoKeywords:')) {
          const data = grades[currentGrade];
          const indent = line.match(/^(\s*)/)[1]; // match indentation
          newLines.push(`${indent}seoTitle: '${escapeForTs(data.seoTitle)}',`);
          newLines.push(`${indent}seoDescription: '${escapeForTs(data.seoDescription)}',`);
          newLines.push(`${indent}seoKeywords: '${escapeForTs(data.seoKeywords)}',`);
          totalInserted++;
          console.log(`  + ${theme}/${currentGrade}: inserted SEO fields`);
        } else {
          console.log(`  ~ ${theme}/${currentGrade}: SEO fields already present, skipping`);
        }
        currentGrade = null;
        gradeLineFound = false;
      }
    }

    newLines.push(line);
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Updated ${theme}/da.ts`);
}

console.log(`\nDone! Inserted SEO fields for ${totalInserted} grade entries.`);
