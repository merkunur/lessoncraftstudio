/**
 * Part 159: Danish Theme+Grade SEO — Themes 17–20
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for weather, colors, shapes, numbers Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  weather: {
    preschool: {
      seoTitle: 'Vejr-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare vejr-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vejr f\u00f8rskole, vejr opgaver 3\u20134 \u00e5r, vejr \u00f8velser f\u00f8rskole, vejr printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Vejr-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare vejr-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vejr b\u00f8rnehaveklasse, vejr opgaver 5\u20136 \u00e5r, vejr \u00f8velser b\u00f8rnehaveklasse, vejr printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Vejr-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vejr-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vejr 1. klasse, vejr opgaver 6\u20137 \u00e5r, vejr \u00f8velser 1. klasse, vejr printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Vejr-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vejr-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vejr 2. klasse, vejr opgaver 7\u20138 \u00e5r, vejr \u00f8velser 2. klasse, vejr printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Vejr-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare vejr-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'vejr 3. klasse, vejr opgaver 8\u20139 \u00e5r, vejr \u00f8velser 3. klasse, vejr printbar 3. klasse',
    },
  },
  colors: {
    preschool: {
      seoTitle: 'Farver-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare farver-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'farver f\u00f8rskole, farver opgaver 3\u20134 \u00e5r, farver \u00f8velser f\u00f8rskole, farver printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Farver-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare farver-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'farver b\u00f8rnehaveklasse, farver opgaver 5\u20136 \u00e5r, farver \u00f8velser b\u00f8rnehaveklasse, farver printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Farver-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare farver-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'farver 1. klasse, farver opgaver 6\u20137 \u00e5r, farver \u00f8velser 1. klasse, farver printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Farver-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare farver-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'farver 2. klasse, farver opgaver 7\u20138 \u00e5r, farver \u00f8velser 2. klasse, farver printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Farver-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare farver-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'farver 3. klasse, farver opgaver 8\u20139 \u00e5r, farver \u00f8velser 3. klasse, farver printbar 3. klasse',
    },
  },
  shapes: {
    preschool: {
      seoTitle: 'Former-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare former-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'former f\u00f8rskole, former opgaver 3\u20134 \u00e5r, former \u00f8velser f\u00f8rskole, former printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Former-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare former-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'former b\u00f8rnehaveklasse, former opgaver 5\u20136 \u00e5r, former \u00f8velser b\u00f8rnehaveklasse, former printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Former-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare former-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'former 1. klasse, former opgaver 6\u20137 \u00e5r, former \u00f8velser 1. klasse, former printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Former-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare former-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'former 2. klasse, former opgaver 7\u20138 \u00e5r, former \u00f8velser 2. klasse, former printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Former-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare former-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'former 3. klasse, former opgaver 8\u20139 \u00e5r, former \u00f8velser 3. klasse, former printbar 3. klasse',
    },
  },
  numbers: {
    preschool: {
      seoTitle: 'Tal-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare tal-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'tal f\u00f8rskole, tal opgaver 3\u20134 \u00e5r, tal \u00f8velser f\u00f8rskole, tal printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Tal-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare tal-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'tal b\u00f8rnehaveklasse, tal opgaver 5\u20136 \u00e5r, tal \u00f8velser b\u00f8rnehaveklasse, tal printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Tal-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare tal-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'tal 1. klasse, tal opgaver 6\u20137 \u00e5r, tal \u00f8velser 1. klasse, tal printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Tal-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare tal-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'tal 2. klasse, tal opgaver 7\u20138 \u00e5r, tal \u00f8velser 2. klasse, tal printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Tal-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare tal-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'tal 3. klasse, tal opgaver 8\u20139 \u00e5r, tal \u00f8velser 3. klasse, tal printbar 3. klasse',
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
