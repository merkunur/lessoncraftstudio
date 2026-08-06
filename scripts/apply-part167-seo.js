/**
 * Part 167: Danish Theme+Grade SEO — Themes 49–50
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for spring, summer Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  spring: {
    preschool: {
      seoTitle: 'For\u00e5r-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare for\u00e5r-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'for\u00e5r f\u00f8rskole, for\u00e5r opgaver 3\u20134 \u00e5r, for\u00e5r \u00f8velser f\u00f8rskole, for\u00e5r printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'For\u00e5r-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare for\u00e5r-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'for\u00e5r b\u00f8rnehaveklasse, for\u00e5r opgaver 5\u20136 \u00e5r, for\u00e5r \u00f8velser b\u00f8rnehaveklasse, for\u00e5r printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'For\u00e5r-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare for\u00e5r-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'for\u00e5r 1. klasse, for\u00e5r opgaver 6\u20137 \u00e5r, for\u00e5r \u00f8velser 1. klasse, for\u00e5r printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'For\u00e5r-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare for\u00e5r-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'for\u00e5r 2. klasse, for\u00e5r opgaver 7\u20138 \u00e5r, for\u00e5r \u00f8velser 2. klasse, for\u00e5r printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'For\u00e5r-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare for\u00e5r-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'for\u00e5r 3. klasse, for\u00e5r opgaver 8\u20139 \u00e5r, for\u00e5r \u00f8velser 3. klasse, for\u00e5r printbar 3. klasse',
    },
  },
  summer: {
    preschool: {
      seoTitle: 'Sommer-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare sommer-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sommer f\u00f8rskole, sommer opgaver 3\u20134 \u00e5r, sommer \u00f8velser f\u00f8rskole, sommer printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Sommer-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare sommer-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sommer b\u00f8rnehaveklasse, sommer opgaver 5\u20136 \u00e5r, sommer \u00f8velser b\u00f8rnehaveklasse, sommer printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Sommer-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sommer-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sommer 1. klasse, sommer opgaver 6\u20137 \u00e5r, sommer \u00f8velser 1. klasse, sommer printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Sommer-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sommer-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sommer 2. klasse, sommer opgaver 7\u20138 \u00e5r, sommer \u00f8velser 2. klasse, sommer printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Sommer-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sommer-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sommer 3. klasse, sommer opgaver 8\u20139 \u00e5r, sommer \u00f8velser 3. klasse, sommer printbar 3. klasse',
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
