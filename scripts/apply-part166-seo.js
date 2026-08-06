/**
 * Part 166: Danish Theme+Grade SEO — Themes 45–48
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for travel, birthday, circus, forest Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  travel: {
    preschool: {
      seoTitle: 'Rejser-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare rejser-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rejser f\u00f8rskole, rejser opgaver 3\u20134 \u00e5r, rejser \u00f8velser f\u00f8rskole, rejser printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Rejser-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare rejser-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rejser b\u00f8rnehaveklasse, rejser opgaver 5\u20136 \u00e5r, rejser \u00f8velser b\u00f8rnehaveklasse, rejser printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Rejser-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rejser-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rejser 1. klasse, rejser opgaver 6\u20137 \u00e5r, rejser \u00f8velser 1. klasse, rejser printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Rejser-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rejser-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rejser 2. klasse, rejser opgaver 7\u20138 \u00e5r, rejser \u00f8velser 2. klasse, rejser printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Rejser-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rejser-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rejser 3. klasse, rejser opgaver 8\u20139 \u00e5r, rejser \u00f8velser 3. klasse, rejser printbar 3. klasse',
    },
  },
  birthday: {
    preschool: {
      seoTitle: 'F\u00f8dselsdag-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8dselsdag-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8dselsdag f\u00f8rskole, f\u00f8dselsdag opgaver 3\u20134 \u00e5r, f\u00f8dselsdag \u00f8velser f\u00f8rskole, f\u00f8dselsdag printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'F\u00f8dselsdag-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8dselsdag-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8dselsdag b\u00f8rnehaveklasse, f\u00f8dselsdag opgaver 5\u20136 \u00e5r, f\u00f8dselsdag \u00f8velser b\u00f8rnehaveklasse, f\u00f8dselsdag printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'F\u00f8dselsdag-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8dselsdag-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8dselsdag 1. klasse, f\u00f8dselsdag opgaver 6\u20137 \u00e5r, f\u00f8dselsdag \u00f8velser 1. klasse, f\u00f8dselsdag printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'F\u00f8dselsdag-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8dselsdag-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8dselsdag 2. klasse, f\u00f8dselsdag opgaver 7\u20138 \u00e5r, f\u00f8dselsdag \u00f8velser 2. klasse, f\u00f8dselsdag printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'F\u00f8dselsdag-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare f\u00f8dselsdag-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'f\u00f8dselsdag 3. klasse, f\u00f8dselsdag opgaver 8\u20139 \u00e5r, f\u00f8dselsdag \u00f8velser 3. klasse, f\u00f8dselsdag printbar 3. klasse',
    },
  },
  circus: {
    preschool: {
      seoTitle: 'Cirkus-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare cirkus-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'cirkus f\u00f8rskole, cirkus opgaver 3\u20134 \u00e5r, cirkus \u00f8velser f\u00f8rskole, cirkus printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Cirkus-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare cirkus-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'cirkus b\u00f8rnehaveklasse, cirkus opgaver 5\u20136 \u00e5r, cirkus \u00f8velser b\u00f8rnehaveklasse, cirkus printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Cirkus-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare cirkus-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'cirkus 1. klasse, cirkus opgaver 6\u20137 \u00e5r, cirkus \u00f8velser 1. klasse, cirkus printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Cirkus-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare cirkus-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'cirkus 2. klasse, cirkus opgaver 7\u20138 \u00e5r, cirkus \u00f8velser 2. klasse, cirkus printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Cirkus-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare cirkus-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'cirkus 3. klasse, cirkus opgaver 8\u20139 \u00e5r, cirkus \u00f8velser 3. klasse, cirkus printbar 3. klasse',
    },
  },
  forest: {
    preschool: {
      seoTitle: 'Skov-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare skov-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skov f\u00f8rskole, skov opgaver 3\u20134 \u00e5r, skov \u00f8velser f\u00f8rskole, skov printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Skov-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare skov-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skov b\u00f8rnehaveklasse, skov opgaver 5\u20136 \u00e5r, skov \u00f8velser b\u00f8rnehaveklasse, skov printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Skov-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skov-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skov 1. klasse, skov opgaver 6\u20137 \u00e5r, skov \u00f8velser 1. klasse, skov printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Skov-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skov-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skov 2. klasse, skov opgaver 7\u20138 \u00e5r, skov \u00f8velser 2. klasse, skov printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Skov-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare skov-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'skov 3. klasse, skov opgaver 8\u20139 \u00e5r, skov \u00f8velser 3. klasse, skov printbar 3. klasse',
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
