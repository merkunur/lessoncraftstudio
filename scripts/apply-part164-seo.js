/**
 * Part 164: Danish Theme+Grade SEO — Themes 37–40
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for garden, camping, pirates, fairy-tales Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  garden: {
    preschool: {
      seoTitle: 'Have-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare have-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'have f\u00f8rskole, have opgaver 3\u20134 \u00e5r, have \u00f8velser f\u00f8rskole, have printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Have-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare have-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'have b\u00f8rnehaveklasse, have opgaver 5\u20136 \u00e5r, have \u00f8velser b\u00f8rnehaveklasse, have printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Have-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare have-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'have 1. klasse, have opgaver 6\u20137 \u00e5r, have \u00f8velser 1. klasse, have printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Have-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare have-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'have 2. klasse, have opgaver 7\u20138 \u00e5r, have \u00f8velser 2. klasse, have printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Have-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare have-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'have 3. klasse, have opgaver 8\u20139 \u00e5r, have \u00f8velser 3. klasse, have printbar 3. klasse',
    },
  },
  camping: {
    preschool: {
      seoTitle: 'Camping-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare camping-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'camping f\u00f8rskole, camping opgaver 3\u20134 \u00e5r, camping \u00f8velser f\u00f8rskole, camping printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Camping-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare camping-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'camping b\u00f8rnehaveklasse, camping opgaver 5\u20136 \u00e5r, camping \u00f8velser b\u00f8rnehaveklasse, camping printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Camping-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare camping-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'camping 1. klasse, camping opgaver 6\u20137 \u00e5r, camping \u00f8velser 1. klasse, camping printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Camping-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare camping-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'camping 2. klasse, camping opgaver 7\u20138 \u00e5r, camping \u00f8velser 2. klasse, camping printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Camping-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare camping-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'camping 3. klasse, camping opgaver 8\u20139 \u00e5r, camping \u00f8velser 3. klasse, camping printbar 3. klasse',
    },
  },
  pirates: {
    preschool: {
      seoTitle: 'Pirater-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare pirater-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'pirater f\u00f8rskole, pirater opgaver 3\u20134 \u00e5r, pirater \u00f8velser f\u00f8rskole, pirater printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Pirater-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare pirater-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'pirater b\u00f8rnehaveklasse, pirater opgaver 5\u20136 \u00e5r, pirater \u00f8velser b\u00f8rnehaveklasse, pirater printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Pirater-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare pirater-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'pirater 1. klasse, pirater opgaver 6\u20137 \u00e5r, pirater \u00f8velser 1. klasse, pirater printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Pirater-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare pirater-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'pirater 2. klasse, pirater opgaver 7\u20138 \u00e5r, pirater \u00f8velser 2. klasse, pirater printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Pirater-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare pirater-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'pirater 3. klasse, pirater opgaver 8\u20139 \u00e5r, pirater \u00f8velser 3. klasse, pirater printbar 3. klasse',
    },
  },
  'fairy-tales': {
    preschool: {
      seoTitle: 'Eventyr-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare eventyr-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'eventyr f\u00f8rskole, eventyr opgaver 3\u20134 \u00e5r, eventyr \u00f8velser f\u00f8rskole, eventyr printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Eventyr-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare eventyr-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'eventyr b\u00f8rnehaveklasse, eventyr opgaver 5\u20136 \u00e5r, eventyr \u00f8velser b\u00f8rnehaveklasse, eventyr printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Eventyr-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare eventyr-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'eventyr 1. klasse, eventyr opgaver 6\u20137 \u00e5r, eventyr \u00f8velser 1. klasse, eventyr printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Eventyr-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare eventyr-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'eventyr 2. klasse, eventyr opgaver 7\u20138 \u00e5r, eventyr \u00f8velser 2. klasse, eventyr printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Eventyr-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare eventyr-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'eventyr 3. klasse, eventyr opgaver 8\u20139 \u00e5r, eventyr \u00f8velser 3. klasse, eventyr printbar 3. klasse',
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
