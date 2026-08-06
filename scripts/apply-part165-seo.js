/**
 * Part 165: Danish Theme+Grade SEO — Themes 41–44
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for robots, superheroes, construction, cooking Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  robots: {
    preschool: {
      seoTitle: 'Robotter-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare robotter-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'robotter f\u00f8rskole, robotter opgaver 3\u20134 \u00e5r, robotter \u00f8velser f\u00f8rskole, robotter printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Robotter-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare robotter-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'robotter b\u00f8rnehaveklasse, robotter opgaver 5\u20136 \u00e5r, robotter \u00f8velser b\u00f8rnehaveklasse, robotter printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Robotter-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare robotter-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'robotter 1. klasse, robotter opgaver 6\u20137 \u00e5r, robotter \u00f8velser 1. klasse, robotter printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Robotter-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare robotter-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'robotter 2. klasse, robotter opgaver 7\u20138 \u00e5r, robotter \u00f8velser 2. klasse, robotter printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Robotter-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare robotter-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'robotter 3. klasse, robotter opgaver 8\u20139 \u00e5r, robotter \u00f8velser 3. klasse, robotter printbar 3. klasse',
    },
  },
  superheroes: {
    preschool: {
      seoTitle: 'Superhelte-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare superhelte-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'superhelte f\u00f8rskole, superhelte opgaver 3\u20134 \u00e5r, superhelte \u00f8velser f\u00f8rskole, superhelte printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Superhelte-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare superhelte-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'superhelte b\u00f8rnehaveklasse, superhelte opgaver 5\u20136 \u00e5r, superhelte \u00f8velser b\u00f8rnehaveklasse, superhelte printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Superhelte-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare superhelte-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'superhelte 1. klasse, superhelte opgaver 6\u20137 \u00e5r, superhelte \u00f8velser 1. klasse, superhelte printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Superhelte-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare superhelte-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'superhelte 2. klasse, superhelte opgaver 7\u20138 \u00e5r, superhelte \u00f8velser 2. klasse, superhelte printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Superhelte-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare superhelte-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'superhelte 3. klasse, superhelte opgaver 8\u20139 \u00e5r, superhelte \u00f8velser 3. klasse, superhelte printbar 3. klasse',
    },
  },
  construction: {
    preschool: {
      seoTitle: 'Byggeplads-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare byggeplads-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'byggeplads f\u00f8rskole, byggeplads opgaver 3\u20134 \u00e5r, byggeplads \u00f8velser f\u00f8rskole, byggeplads printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Byggeplads-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare byggeplads-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'byggeplads b\u00f8rnehaveklasse, byggeplads opgaver 5\u20136 \u00e5r, byggeplads \u00f8velser b\u00f8rnehaveklasse, byggeplads printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Byggeplads-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare byggeplads-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'byggeplads 1. klasse, byggeplads opgaver 6\u20137 \u00e5r, byggeplads \u00f8velser 1. klasse, byggeplads printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Byggeplads-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare byggeplads-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'byggeplads 2. klasse, byggeplads opgaver 7\u20138 \u00e5r, byggeplads \u00f8velser 2. klasse, byggeplads printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Byggeplads-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare byggeplads-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'byggeplads 3. klasse, byggeplads opgaver 8\u20139 \u00e5r, byggeplads \u00f8velser 3. klasse, byggeplads printbar 3. klasse',
    },
  },
  cooking: {
    preschool: {
      seoTitle: 'Madlavning-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare madlavning-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'madlavning f\u00f8rskole, madlavning opgaver 3\u20134 \u00e5r, madlavning \u00f8velser f\u00f8rskole, madlavning printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Madlavning-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare madlavning-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'madlavning b\u00f8rnehaveklasse, madlavning opgaver 5\u20136 \u00e5r, madlavning \u00f8velser b\u00f8rnehaveklasse, madlavning printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Madlavning-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare madlavning-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'madlavning 1. klasse, madlavning opgaver 6\u20137 \u00e5r, madlavning \u00f8velser 1. klasse, madlavning printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Madlavning-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare madlavning-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'madlavning 2. klasse, madlavning opgaver 7\u20138 \u00e5r, madlavning \u00f8velser 2. klasse, madlavning printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Madlavning-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare madlavning-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'madlavning 3. klasse, madlavning opgaver 8\u20139 \u00e5r, madlavning \u00f8velser 3. klasse, madlavning printbar 3. klasse',
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
