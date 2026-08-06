/**
 * Part 157: Danish Theme+Grade SEO — Themes 9–12
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for clothing, household, toys, music Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  clothing: {
    preschool: {
      seoTitle: 'T\u00f8j-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare t\u00f8j-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 't\u00f8j f\u00f8rskole, t\u00f8j opgaver 3\u20134 \u00e5r, t\u00f8j \u00f8velser f\u00f8rskole, t\u00f8j printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'T\u00f8j-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare t\u00f8j-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 't\u00f8j b\u00f8rnehaveklasse, t\u00f8j opgaver 5\u20136 \u00e5r, t\u00f8j \u00f8velser b\u00f8rnehaveklasse, t\u00f8j printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'T\u00f8j-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare t\u00f8j-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 't\u00f8j 1. klasse, t\u00f8j opgaver 6\u20137 \u00e5r, t\u00f8j \u00f8velser 1. klasse, t\u00f8j printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'T\u00f8j-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare t\u00f8j-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 't\u00f8j 2. klasse, t\u00f8j opgaver 7\u20138 \u00e5r, t\u00f8j \u00f8velser 2. klasse, t\u00f8j printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'T\u00f8j-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare t\u00f8j-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 't\u00f8j 3. klasse, t\u00f8j opgaver 8\u20139 \u00e5r, t\u00f8j \u00f8velser 3. klasse, t\u00f8j printbar 3. klasse',
    },
  },
  household: {
    preschool: {
      seoTitle: 'Husholdning-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare husholdning-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'husholdning f\u00f8rskole, husholdning opgaver 3\u20134 \u00e5r, husholdning \u00f8velser f\u00f8rskole, husholdning printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Husholdning-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare husholdning-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'husholdning b\u00f8rnehaveklasse, husholdning opgaver 5\u20136 \u00e5r, husholdning \u00f8velser b\u00f8rnehaveklasse, husholdning printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Husholdning-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare husholdning-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'husholdning 1. klasse, husholdning opgaver 6\u20137 \u00e5r, husholdning \u00f8velser 1. klasse, husholdning printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Husholdning-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare husholdning-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'husholdning 2. klasse, husholdning opgaver 7\u20138 \u00e5r, husholdning \u00f8velser 2. klasse, husholdning printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Husholdning-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare husholdning-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'husholdning 3. klasse, husholdning opgaver 8\u20139 \u00e5r, husholdning \u00f8velser 3. klasse, husholdning printbar 3. klasse',
    },
  },
  toys: {
    preschool: {
      seoTitle: 'Leget\u00f8j-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare leget\u00f8j-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'leget\u00f8j f\u00f8rskole, leget\u00f8j opgaver 3\u20134 \u00e5r, leget\u00f8j \u00f8velser f\u00f8rskole, leget\u00f8j printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Leget\u00f8j-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare leget\u00f8j-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'leget\u00f8j b\u00f8rnehaveklasse, leget\u00f8j opgaver 5\u20136 \u00e5r, leget\u00f8j \u00f8velser b\u00f8rnehaveklasse, leget\u00f8j printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Leget\u00f8j-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare leget\u00f8j-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'leget\u00f8j 1. klasse, leget\u00f8j opgaver 6\u20137 \u00e5r, leget\u00f8j \u00f8velser 1. klasse, leget\u00f8j printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Leget\u00f8j-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare leget\u00f8j-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'leget\u00f8j 2. klasse, leget\u00f8j opgaver 7\u20138 \u00e5r, leget\u00f8j \u00f8velser 2. klasse, leget\u00f8j printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Leget\u00f8j-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare leget\u00f8j-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'leget\u00f8j 3. klasse, leget\u00f8j opgaver 8\u20139 \u00e5r, leget\u00f8j \u00f8velser 3. klasse, leget\u00f8j printbar 3. klasse',
    },
  },
  music: {
    preschool: {
      seoTitle: 'Musik-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare musik-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'musik f\u00f8rskole, musik opgaver 3\u20134 \u00e5r, musik \u00f8velser f\u00f8rskole, musik printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Musik-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare musik-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'musik b\u00f8rnehaveklasse, musik opgaver 5\u20136 \u00e5r, musik \u00f8velser b\u00f8rnehaveklasse, musik printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Musik-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare musik-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'musik 1. klasse, musik opgaver 6\u20137 \u00e5r, musik \u00f8velser 1. klasse, musik printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Musik-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare musik-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'musik 2. klasse, musik opgaver 7\u20138 \u00e5r, musik \u00f8velser 2. klasse, musik printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Musik-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare musik-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'musik 3. klasse, musik opgaver 8\u20139 \u00e5r, musik \u00f8velser 3. klasse, musik printbar 3. klasse',
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
