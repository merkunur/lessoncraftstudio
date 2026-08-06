/**
 * Part 163: Danish Theme+Grade SEO — Themes 33–36
 * Inserts seoTitle, seoDescription, seoKeywords into gradeContent entries
 * for flowers, birds, pets, zoo Danish theme files.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const seoData = {
  flowers: {
    preschool: {
      seoTitle: 'Blomster-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare blomster-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'blomster f\u00f8rskole, blomster opgaver 3\u20134 \u00e5r, blomster \u00f8velser f\u00f8rskole, blomster printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Blomster-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare blomster-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'blomster b\u00f8rnehaveklasse, blomster opgaver 5\u20136 \u00e5r, blomster \u00f8velser b\u00f8rnehaveklasse, blomster printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Blomster-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare blomster-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'blomster 1. klasse, blomster opgaver 6\u20137 \u00e5r, blomster \u00f8velser 1. klasse, blomster printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Blomster-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare blomster-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'blomster 2. klasse, blomster opgaver 7\u20138 \u00e5r, blomster \u00f8velser 2. klasse, blomster printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Blomster-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare blomster-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'blomster 3. klasse, blomster opgaver 8\u20139 \u00e5r, blomster \u00f8velser 3. klasse, blomster printbar 3. klasse',
    },
  },
  birds: {
    preschool: {
      seoTitle: 'Fugle-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare fugle-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'fugle f\u00f8rskole, fugle opgaver 3\u20134 \u00e5r, fugle \u00f8velser f\u00f8rskole, fugle printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Fugle-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare fugle-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'fugle b\u00f8rnehaveklasse, fugle opgaver 5\u20136 \u00e5r, fugle \u00f8velser b\u00f8rnehaveklasse, fugle printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Fugle-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare fugle-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'fugle 1. klasse, fugle opgaver 6\u20137 \u00e5r, fugle \u00f8velser 1. klasse, fugle printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Fugle-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare fugle-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'fugle 2. klasse, fugle opgaver 7\u20138 \u00e5r, fugle \u00f8velser 2. klasse, fugle printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Fugle-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare fugle-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'fugle 3. klasse, fugle opgaver 8\u20139 \u00e5r, fugle \u00f8velser 3. klasse, fugle printbar 3. klasse',
    },
  },
  pets: {
    preschool: {
      seoTitle: 'K\u00e6ledyr-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare k\u00e6ledyr-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'k\u00e6ledyr f\u00f8rskole, k\u00e6ledyr opgaver 3\u20134 \u00e5r, k\u00e6ledyr \u00f8velser f\u00f8rskole, k\u00e6ledyr printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'K\u00e6ledyr-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare k\u00e6ledyr-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'k\u00e6ledyr b\u00f8rnehaveklasse, k\u00e6ledyr opgaver 5\u20136 \u00e5r, k\u00e6ledyr \u00f8velser b\u00f8rnehaveklasse, k\u00e6ledyr printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'K\u00e6ledyr-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare k\u00e6ledyr-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'k\u00e6ledyr 1. klasse, k\u00e6ledyr opgaver 6\u20137 \u00e5r, k\u00e6ledyr \u00f8velser 1. klasse, k\u00e6ledyr printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'K\u00e6ledyr-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare k\u00e6ledyr-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'k\u00e6ledyr 2. klasse, k\u00e6ledyr opgaver 7\u20138 \u00e5r, k\u00e6ledyr \u00f8velser 2. klasse, k\u00e6ledyr printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'K\u00e6ledyr-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare k\u00e6ledyr-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'k\u00e6ledyr 3. klasse, k\u00e6ledyr opgaver 8\u20139 \u00e5r, k\u00e6ledyr \u00f8velser 3. klasse, k\u00e6ledyr printbar 3. klasse',
    },
  },
  zoo: {
    preschool: {
      seoTitle: 'Zoo-opgaver F\u00f8rskole | LessonCraftStudio',
      seoDescription: 'Printbare zoo-opgaver til f\u00f8rskoleb\u00f8rn (3\u20134 \u00e5r). Farvel\u00e6gning, t\u00e6lling 1\u201310 og finmotorik. 33 generatorer. Gratis PDF.',
      seoKeywords: 'zoo f\u00f8rskole, zoo opgaver 3\u20134 \u00e5r, zoo \u00f8velser f\u00f8rskole, zoo printbar f\u00f8rskole',
    },
    kindergarten: {
      seoTitle: 'Zoo-opgaver B\u00f8rnehaveklasse | LessonCraftStudio',
      seoDescription: 'Printbare zoo-opgaver til b\u00f8rnehaveklassen (5\u20136 \u00e5r). T\u00e6lling, bogstaver, m\u00f8nstre og visuel opfattelse. 33 generatorer. Gratis PDF.',
      seoKeywords: 'zoo b\u00f8rnehaveklasse, zoo opgaver 5\u20136 \u00e5r, zoo \u00f8velser b\u00f8rnehaveklasse, zoo printbar b\u00f8rnehaveklasse',
    },
    'first-grade': {
      seoTitle: 'Zoo-opgaver 1. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare zoo-opgaver til 1. klasse (6\u20137 \u00e5r). Addition, subtraktion, l\u00e6sning og skrivning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'zoo 1. klasse, zoo opgaver 6\u20137 \u00e5r, zoo \u00f8velser 1. klasse, zoo printbar 1. klasse',
    },
    'second-grade': {
      seoTitle: 'Zoo-opgaver 2. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare zoo-opgaver til 2. klasse (7\u20138 \u00e5r). Multiplikation, ordspil, logik og probleml\u00f8sning. 33 generatorer. Gratis PDF.',
      seoKeywords: 'zoo 2. klasse, zoo opgaver 7\u20138 \u00e5r, zoo \u00f8velser 2. klasse, zoo printbar 2. klasse',
    },
    'third-grade': {
      seoTitle: 'Zoo-opgaver 3. Klasse | LessonCraftStudio',
      seoDescription: 'Printbare zoo-opgaver til 3. klasse (8\u20139 \u00e5r). Flertrinsproblemer, krydsord, kryptogrammer og avancerede opgaver. 33 generatorer. Gratis PDF.',
      seoKeywords: 'zoo 3. klasse, zoo opgaver 8\u20139 \u00e5r, zoo \u00f8velser 3. klasse, zoo printbar 3. klasse',
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
