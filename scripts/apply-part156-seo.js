/**
 * Part 156: Danish Theme+Grade SEO — Themes 5–8
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for school, sports, emotions, body Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  school: {
    preschool: {
      seoTitle: 'Skole-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare skole-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skole f\u00f8rskole, skole opgaver 3\u20134 \u00e5r, skole \u00f8velser f\u00f8rskole, skole printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Skole-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare skole-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skole b\u00f8rnehaveklasse, skole opgaver 5\u20136 \u00e5r, skole \u00f8velser b\u00f8rnehaveklasse, skole printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Skole-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skole-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skole 1. klasse, skole opgaver 6\u20137 \u00e5r, skole \u00f8velser 1. klasse, skole printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Skole-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skole-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skole 2. klasse, skole opgaver 7\u20138 \u00e5r, skole \u00f8velser 2. klasse, skole printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Skole-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skole-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skole 3. klasse, skole opgaver 8\u20139 \u00e5r, skole \u00f8velser 3. klasse, skole printbar 3. klasse',
    },
  },
  sports: {
    preschool: {
      seoTitle: 'Sport-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare sport-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sport f\u00f8rskole, sport opgaver 3\u20134 \u00e5r, sport \u00f8velser f\u00f8rskole, sport printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Sport-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare sport-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sport b\u00f8rnehaveklasse, sport opgaver 5\u20136 \u00e5r, sport \u00f8velser b\u00f8rnehaveklasse, sport printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Sport-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sport-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sport 1. klasse, sport opgaver 6\u20137 \u00e5r, sport \u00f8velser 1. klasse, sport printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Sport-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sport-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sport 2. klasse, sport opgaver 7\u20138 \u00e5r, sport \u00f8velser 2. klasse, sport printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Sport-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare sport-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'sport 3. klasse, sport opgaver 8\u20139 \u00e5r, sport \u00f8velser 3. klasse, sport printbar 3. klasse',
    },
  },
  emotions: {
    preschool: {
      seoTitle: 'F\u00f8lelser-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8lelser-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8lelser f\u00f8rskole, f\u00f8lelser opgaver 3\u20134 \u00e5r, f\u00f8lelser \u00f8velser f\u00f8rskole, f\u00f8lelser printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'F\u00f8lelser-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8lelser-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8lelser b\u00f8rnehaveklasse, f\u00f8lelser opgaver 5\u20136 \u00e5r, f\u00f8lelser \u00f8velser b\u00f8rnehaveklasse, f\u00f8lelser printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'F\u00f8lelser-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8lelser-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8lelser 1. klasse, f\u00f8lelser opgaver 6\u20137 \u00e5r, f\u00f8lelser \u00f8velser 1. klasse, f\u00f8lelser printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'F\u00f8lelser-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8lelser-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8lelser 2. klasse, f\u00f8lelser opgaver 7\u20138 \u00e5r, f\u00f8lelser \u00f8velser 2. klasse, f\u00f8lelser printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'F\u00f8lelser-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8lelser-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8lelser 3. klasse, f\u00f8lelser opgaver 8\u20139 \u00e5r, f\u00f8lelser \u00f8velser 3. klasse, f\u00f8lelser printbar 3. klasse',
    },
  },
  body: {
    preschool: {
      seoTitle: 'Krop-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare krop-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'krop f\u00f8rskole, krop opgaver 3\u20134 \u00e5r, krop \u00f8velser f\u00f8rskole, krop printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Krop-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare krop-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'krop b\u00f8rnehaveklasse, krop opgaver 5\u20136 \u00e5r, krop \u00f8velser b\u00f8rnehaveklasse, krop printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Krop-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare krop-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'krop 1. klasse, krop opgaver 6\u20137 \u00e5r, krop \u00f8velser 1. klasse, krop printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Krop-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare krop-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'krop 2. klasse, krop opgaver 7\u20138 \u00e5r, krop \u00f8velser 2. klasse, krop printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Krop-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare krop-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'krop 3. klasse, krop opgaver 8\u20139 \u00e5r, krop \u00f8velser 3. klasse, krop printbar 3. klasse',
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
