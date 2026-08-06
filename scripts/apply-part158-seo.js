/**
 * Part 158: Danish Theme+Grade SEO — Themes 13–16
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for jobs, space, seasons, holidays Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  jobs: {
    preschool: {
      seoTitle: 'Job-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare job-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'job f\u00f8rskole, job opgaver 3\u20134 \u00e5r, job \u00f8velser f\u00f8rskole, job printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Job-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare job-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'job b\u00f8rnehaveklasse, job opgaver 5\u20136 \u00e5r, job \u00f8velser b\u00f8rnehaveklasse, job printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Job-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare job-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'job 1. klasse, job opgaver 6\u20137 \u00e5r, job \u00f8velser 1. klasse, job printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Job-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare job-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'job 2. klasse, job opgaver 7\u20138 \u00e5r, job \u00f8velser 2. klasse, job printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Job-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare job-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'job 3. klasse, job opgaver 8\u20139 \u00e5r, job \u00f8velser 3. klasse, job printbar 3. klasse',
    },
  },
  space: {
    preschool: {
      seoTitle: 'Rummet-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare rummet-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rummet f\u00f8rskole, rummet opgaver 3\u20134 \u00e5r, rummet \u00f8velser f\u00f8rskole, rummet printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Rummet-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare rummet-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rummet b\u00f8rnehaveklasse, rummet opgaver 5\u20136 \u00e5r, rummet \u00f8velser b\u00f8rnehaveklasse, rummet printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Rummet-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rummet-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rummet 1. klasse, rummet opgaver 6\u20137 \u00e5r, rummet \u00f8velser 1. klasse, rummet printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Rummet-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rummet-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rummet 2. klasse, rummet opgaver 7\u20138 \u00e5r, rummet \u00f8velser 2. klasse, rummet printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Rummet-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare rummet-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'rummet 3. klasse, rummet opgaver 8\u20139 \u00e5r, rummet \u00f8velser 3. klasse, rummet printbar 3. klasse',
    },
  },
  seasons: {
    preschool: {
      seoTitle: '\u00c5rstider-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare \u00e5rstider-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: '\u00e5rstider f\u00f8rskole, \u00e5rstider opgaver 3\u20134 \u00e5r, \u00e5rstider \u00f8velser f\u00f8rskole, \u00e5rstider printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: '\u00c5rstider-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare \u00e5rstider-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: '\u00e5rstider b\u00f8rnehaveklasse, \u00e5rstider opgaver 5\u20136 \u00e5r, \u00e5rstider \u00f8velser b\u00f8rnehaveklasse, \u00e5rstider printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: '\u00c5rstider-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare \u00e5rstider-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: '\u00e5rstider 1. klasse, \u00e5rstider opgaver 6\u20137 \u00e5r, \u00e5rstider \u00f8velser 1. klasse, \u00e5rstider printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: '\u00c5rstider-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare \u00e5rstider-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: '\u00e5rstider 2. klasse, \u00e5rstider opgaver 7\u20138 \u00e5r, \u00e5rstider \u00f8velser 2. klasse, \u00e5rstider printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: '\u00c5rstider-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare \u00e5rstider-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: '\u00e5rstider 3. klasse, \u00e5rstider opgaver 8\u20139 \u00e5r, \u00e5rstider \u00f8velser 3. klasse, \u00e5rstider printbar 3. klasse',
    },
  },
  holidays: {
    preschool: {
      seoTitle: 'Helligdage-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare helligdage-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'helligdage f\u00f8rskole, helligdage opgaver 3\u20134 \u00e5r, helligdage \u00f8velser f\u00f8rskole, helligdage printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Helligdage-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare helligdage-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'helligdage b\u00f8rnehaveklasse, helligdage opgaver 5\u20136 \u00e5r, helligdage \u00f8velser b\u00f8rnehaveklasse, helligdage printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Helligdage-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare helligdage-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'helligdage 1. klasse, helligdage opgaver 6\u20137 \u00e5r, helligdage \u00f8velser 1. klasse, helligdage printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Helligdage-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare helligdage-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'helligdage 2. klasse, helligdage opgaver 7\u20138 \u00e5r, helligdage \u00f8velser 2. klasse, helligdage printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Helligdage-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare helligdage-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'helligdage 3. klasse, helligdage opgaver 8\u20139 \u00e5r, helligdage \u00f8velser 3. klasse, helligdage printbar 3. klasse',
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
