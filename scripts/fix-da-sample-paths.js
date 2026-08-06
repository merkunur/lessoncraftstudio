const fs = require('fs');
const path = require('path');

// Verified Danish sample paths (from server ls + curl -sI verification)
// Latin-1 encoding: ø=%F8, æ=%E6, å=%E5
const DANISH_SAMPLES = {
  'addition': {
    hero: '/samples/danish/addition/Sjov%20Addition%201.webp',
    heroAlt: 'Additionsarbejdsark med dyretema — dansk eksempel',
    gallery: [
      { src: '/samples/danish/addition/Sjov%20Addition%201.webp', alt: 'Additionsarbejdsark i stående format med dyretema', caption: 'Sjov Addition — dyretema' },
      { src: '/samples/danish/addition/Sjov%20Addition%202.webp', alt: 'Additionsarbejdsark med madtema', caption: 'Sjov Addition — madtema' },
      { src: '/samples/danish/addition/Sjov%20Addition%203.webp', alt: 'Additionsarbejdsark med køretøjstema', caption: 'Sjov Addition — køretøjstema' },
    ],
  },
  'subtraction': {
    hero: '/samples/danish/subtraction/Sjov%20Subtraktion%201.webp',
    heroAlt: 'Subtraktionsarbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/subtraction/Sjov%20Subtraktion%201.webp', alt: 'Subtraktionsarbejdsark i stående format', caption: 'Sjov Subtraktion 1' },
      { src: '/samples/danish/subtraction/Sjov%20Subtraktion%202.webp', alt: 'Subtraktionsarbejdsark med billeder', caption: 'Sjov Subtraktion 2' },
      { src: '/samples/danish/subtraction/Sjov%20Subtraktion%203.webp', alt: 'Subtraktionsarbejdsark med blandet tema', caption: 'Sjov Subtraktion 3' },
    ],
  },
  'code-addition': {
    hero: '/samples/danish/code%20addition/Hemmelig%20Kode%20Addition%201.webp',
    heroAlt: 'Kode-additionsarbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/code%20addition/Hemmelig%20Kode%20Addition%201.webp', alt: 'Kode-additionsarbejdsark 1', caption: 'Hemmelig Kode Addition 1' },
      { src: '/samples/danish/code%20addition/Hemmelig%20Kode%20Addition%202.webp', alt: 'Kode-additionsarbejdsark 2', caption: 'Hemmelig Kode Addition 2' },
      { src: '/samples/danish/code%20addition/Hemmelig%20Kode%20Addition%203.webp', alt: 'Kode-additionsarbejdsark 3', caption: 'Hemmelig Kode Addition 3' },
    ],
  },
  'more-less': {
    hero: '/samples/danish/more%20less/Mere%20Mindre%201.webp',
    heroAlt: 'Mere eller mindre arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/more%20less/Mere%20Mindre%201.webp', alt: 'Mere eller mindre arbejdsark 1', caption: 'Mere Mindre 1' },
      { src: '/samples/danish/more%20less/Mere%20Mindre%202.webp', alt: 'Mere eller mindre arbejdsark 2', caption: 'Mere Mindre 2' },
      { src: '/samples/danish/more%20less/Mere%20Mindre%203.webp', alt: 'Mere eller mindre arbejdsark 3', caption: 'Mere Mindre 3' },
    ],
  },
  'math-puzzle': {
    hero: '/samples/danish/math%20puzzle/Mattepuslespil%201.webp',
    heroAlt: 'Matematikpuslespil arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/math%20puzzle/Mattepuslespil%201.webp', alt: 'Matematikpuslespil 1', caption: 'Mattepuslespil 1' },
      { src: '/samples/danish/math%20puzzle/Mattepuslespil%202.webp', alt: 'Matematikpuslespil 2', caption: 'Mattepuslespil 2' },
      { src: '/samples/danish/math%20puzzle/Mattepuslespil%203.webp', alt: 'Matematikpuslespil 3', caption: 'Mattepuslespil 3' },
    ],
  },
  'math-worksheet': {
    hero: '/samples/danish/math%20worksheet/Matematikopgave%201.webp',
    heroAlt: 'Matematikopgave arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/math%20worksheet/Matematikopgave%201.webp', alt: 'Matematikopgave 1', caption: 'Matematikopgave 1' },
      { src: '/samples/danish/math%20worksheet/Matematikopgave%202.webp', alt: 'Matematikopgave 2', caption: 'Matematikopgave 2' },
      { src: '/samples/danish/math%20worksheet/Matematikopgave%203.webp', alt: 'Matematikopgave 3', caption: 'Matematikopgave 3' },
    ],
  },
  'alphabet-train': {
    hero: '/samples/danish/alphabet%20train/Alfabettog%201.webp',
    heroAlt: 'Alfabettog arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/alphabet%20train/Alfabettog%201.webp', alt: 'Alfabettog 1', caption: 'Alfabettog 1' },
      { src: '/samples/danish/alphabet%20train/Alfabettog%202.webp', alt: 'Alfabettog 2', caption: 'Alfabettog 2' },
      { src: '/samples/danish/alphabet%20train/Alfabettog%203.webp', alt: 'Alfabettog 3', caption: 'Alfabettog 3' },
    ],
  },
  'prepositions': {
    hero: '/samples/danish/prepositions/Pr%E6positioner%201.webp',
    heroAlt: 'Præpositionsarbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/prepositions/Pr%E6positioner%201.webp', alt: 'Præpositioner 1', caption: 'Præpositioner 1' },
      { src: '/samples/danish/prepositions/Pr%E6positioner%202.webp', alt: 'Præpositioner 2', caption: 'Præpositioner 2' },
      { src: '/samples/danish/prepositions/Pr%E6positioner%203.webp', alt: 'Præpositioner 3', caption: 'Præpositioner 3' },
    ],
  },
  'word-guess': {
    hero: '/samples/danish/word%20guess/G%E6t%20Ordet%201.webp',
    heroAlt: 'Gæt Ordet arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/word%20guess/G%E6t%20Ordet%201.webp', alt: 'Gæt Ordet 1', caption: 'Gæt Ordet 1' },
      { src: '/samples/danish/word%20guess/G%E6t%20Ordet%202.webp', alt: 'Gæt Ordet 2', caption: 'Gæt Ordet 2' },
      { src: '/samples/danish/word%20guess/G%E6t%20Ordet%203.webp', alt: 'Gæt Ordet 3', caption: 'Gæt Ordet 3' },
    ],
  },
  'word-scramble': {
    hero: '/samples/danish/word%20scramble/Bogstavrod%201.webp',
    heroAlt: 'Bogstavrod arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/word%20scramble/Bogstavrod%201.webp', alt: 'Bogstavrod 1', caption: 'Bogstavrod 1' },
      { src: '/samples/danish/word%20scramble/Bogstavrod%202.webp', alt: 'Bogstavrod 2', caption: 'Bogstavrod 2' },
      { src: '/samples/danish/word%20scramble/Bogstavrod%203.webp', alt: 'Bogstavrod 3', caption: 'Bogstavrod 3' },
    ],
  },
  'wordsearch': {
    hero: '/samples/danish/wordsearch/Ords%F8gning%201.webp',
    heroAlt: 'Ordsøgning arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/wordsearch/Ords%F8gning%201.webp', alt: 'Ordsøgning 1', caption: 'Ordsøgning 1' },
      { src: '/samples/danish/wordsearch/Ords%F8gning%202.webp', alt: 'Ordsøgning 2', caption: 'Ordsøgning 2' },
      { src: '/samples/danish/wordsearch/Ords%F8gning%203.webp', alt: 'Ordsøgning 3', caption: 'Ordsøgning 3' },
    ],
  },
  'cryptogram': {
    hero: '/samples/danish/cryptogram/Billed-Kryptogram%201.webp',
    heroAlt: 'Kryptogram arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/cryptogram/Billed-Kryptogram%201.webp', alt: 'Billed-Kryptogram 1', caption: 'Billed-Kryptogram 1' },
      { src: '/samples/danish/cryptogram/Billed-Kryptogram%202.webp', alt: 'Billed-Kryptogram 2', caption: 'Billed-Kryptogram 2' },
      { src: '/samples/danish/cryptogram/Billed-Kryptogram%203.webp', alt: 'Billed-Kryptogram 3', caption: 'Billed-Kryptogram 3' },
    ],
  },
  'writing': {
    hero: '/samples/danish/writing/writing.webp',
    heroAlt: 'Skriveøvelse arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/writing/writing.webp', alt: 'Skriveøvelse', caption: 'Skriveøvelse' },
      { src: '/samples/danish/writing/writing%20custom.webp', alt: 'Tilpasset skriveøvelse', caption: 'Tilpasset skriveøvelse' },
      { src: '/samples/danish/writing/writing%20beginning%20letter.webp', alt: 'Begyndelsesbogstav øvelse', caption: 'Begyndelsesbogstav' },
    ],
  },
  'big-small': {
    hero: '/samples/danish/big%20small/Stort%20eller%20Lille%201.webp',
    heroAlt: 'Stort eller lille arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/big%20small/Stort%20eller%20Lille%201.webp', alt: 'Stort eller Lille 1', caption: 'Stort eller Lille 1' },
      { src: '/samples/danish/big%20small/Stort%20eller%20Lille%202.webp', alt: 'Stort eller Lille 2', caption: 'Stort eller Lille 2' },
      { src: '/samples/danish/big%20small/Stort%20eller%20Lille%203.webp', alt: 'Stort eller Lille 3', caption: 'Stort eller Lille 3' },
    ],
  },
  'pattern-train': {
    hero: '/samples/danish/pattern%20train/M%F8nstertoget%201.webp',
    heroAlt: 'Mønstertoget arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/pattern%20train/M%F8nstertoget%201.webp', alt: 'Mønstertoget 1', caption: 'Mønstertoget 1' },
      { src: '/samples/danish/pattern%20train/M%F8nstertoget%202.webp', alt: 'Mønstertoget 2', caption: 'Mønstertoget 2' },
      { src: '/samples/danish/pattern%20train/M%F8nstertoget%203.webp', alt: 'Mønstertoget 3', caption: 'Mønstertoget 3' },
    ],
  },
  'pattern-worksheet': {
    hero: '/samples/danish/pattern%20worksheet/M%F8nsterg%E5der%201.webp',
    heroAlt: 'Mønstergåder arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/pattern%20worksheet/M%F8nsterg%E5der%201.webp', alt: 'Mønstergåder 1', caption: 'Mønstergåder 1' },
      { src: '/samples/danish/pattern%20worksheet/M%F8nsterg%E5der%202.webp', alt: 'Mønstergåder 2', caption: 'Mønstergåder 2' },
      { src: '/samples/danish/pattern%20worksheet/M%F8nsterg%E5der%203.webp', alt: 'Mønstergåder 3', caption: 'Mønstergåder 3' },
    ],
  },
  'draw-and-color': {
    hero: '/samples/danish/draw%20and%20color/Tegn%20og%20Farvl%E6g%201.webp',
    heroAlt: 'Tegn og farvlæg arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/draw%20and%20color/Tegn%20og%20Farvl%E6g%201.webp', alt: 'Tegn og Farvlæg 1', caption: 'Tegn og Farvlæg 1' },
      { src: '/samples/danish/draw%20and%20color/Tegn%20og%20Farvl%E6g%202.webp', alt: 'Tegn og Farvlæg 2', caption: 'Tegn og Farvlæg 2' },
      { src: '/samples/danish/draw%20and%20color/Tegn%20og%20Farvl%E6g%203.webp', alt: 'Tegn og Farvlæg 3', caption: 'Tegn og Farvlæg 3' },
    ],
  },
  'drawing-lines': {
    hero: '/samples/danish/drawing%20lines/Linjetegnings%F8velse%201.webp',
    heroAlt: 'Linjetegningsøvelse arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/drawing%20lines/Linjetegnings%F8velse%201.webp', alt: 'Linjetegningsøvelse 1', caption: 'Linjetegningsøvelse 1' },
      { src: '/samples/danish/drawing%20lines/Linjetegnings%F8velse%202.webp', alt: 'Linjetegningsøvelse 2', caption: 'Linjetegningsøvelse 2' },
      { src: '/samples/danish/drawing%20lines/Linjetegnings%F8velse%204.webp', alt: 'Linjetegningsøvelse 4', caption: 'Linjetegningsøvelse 4' },
    ],
  },
  'coloring': {
    hero: '/samples/danish/coloring/coloring%20portrait%201.webp',
    heroAlt: 'Farvelægningsside — dansk eksempel',
    gallery: [
      { src: '/samples/danish/coloring/coloring%20portrait%201.webp', alt: 'Farvelægning stående 1', caption: 'Farvelægning stående' },
      { src: '/samples/danish/coloring/coloring%20portrait%202.webp', alt: 'Farvelægning stående 2', caption: 'Farvelægning stående 2' },
      { src: '/samples/danish/coloring/coloring%20landscape%201.webp', alt: 'Farvelægning liggende', caption: 'Farvelægning liggende' },
    ],
  },
  'chart-count': {
    hero: '/samples/danish/chart%20count/Billediagram%201.webp',
    heroAlt: 'Billediagram arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/chart%20count/Billediagram%201.webp', alt: 'Billediagram 1', caption: 'Billediagram 1' },
      { src: '/samples/danish/chart%20count/Billediagram%202.webp', alt: 'Billediagram 2', caption: 'Billediagram 2' },
      { src: '/samples/danish/chart%20count/Billediagram%203.webp', alt: 'Billediagram 3', caption: 'Billediagram 3' },
    ],
  },
  'matching': {
    hero: '/samples/danish/matching/Find%20Parrene%201.webp',
    heroAlt: 'Find Parrene arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/matching/Find%20Parrene%201.webp', alt: 'Find Parrene 1', caption: 'Find Parrene 1' },
      { src: '/samples/danish/matching/Find%20Parrene%202.webp', alt: 'Find Parrene 2', caption: 'Find Parrene 2' },
      { src: '/samples/danish/matching/Find%20Parrene%203.webp', alt: 'Find Parrene 3', caption: 'Find Parrene 3' },
    ],
  },
  'grid-match': {
    hero: '/samples/danish/grid%20match/Gitterpuslespil%201.webp',
    heroAlt: 'Gitterpuslespil arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/grid%20match/Gitterpuslespil%201.webp', alt: 'Gitterpuslespil 1', caption: 'Gitterpuslespil 1' },
      { src: '/samples/danish/grid%20match/Gitterpuslespil%202.webp', alt: 'Gitterpuslespil 2', caption: 'Gitterpuslespil 2' },
      { src: '/samples/danish/grid%20match/Gitterpuslespil%203.webp', alt: 'Gitterpuslespil 3', caption: 'Gitterpuslespil 3' },
    ],
  },
  'shadow-match': {
    hero: '/samples/danish/shadow%20match/G%F8r%20Billederne%20Hele%201.webp',
    heroAlt: 'Skyggematching arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/shadow%20match/G%F8r%20Billederne%20Hele%201.webp', alt: 'Gør Billederne Hele 1', caption: 'Gør Billederne Hele 1' },
      { src: '/samples/danish/shadow%20match/G%F8r%20Billederne%20Hele%202.webp', alt: 'Gør Billederne Hele 2', caption: 'Gør Billederne Hele 2' },
      { src: '/samples/danish/shadow%20match/G%F8r%20Billederne%20Hele%203.webp', alt: 'Gør Billederne Hele 3', caption: 'Gør Billederne Hele 3' },
    ],
  },
  'bingo': {
    hero: '/samples/danish/bingo/Billedbingo%201.webp',
    heroAlt: 'Billedbingo kort — dansk eksempel',
    gallery: [
      { src: '/samples/danish/bingo/Billedbingo%201.webp', alt: 'Billedbingo 1', caption: 'Billedbingo 1' },
      { src: '/samples/danish/bingo/Billedbingo%202.webp', alt: 'Billedbingo 2', caption: 'Billedbingo 2' },
      { src: '/samples/danish/bingo/Billedbingo%203.webp', alt: 'Billedbingo 3', caption: 'Billedbingo 3' },
    ],
  },
  'picture-sort': {
    hero: '/samples/danish/picture%20sort/Sorter%20Billeder%201.webp',
    heroAlt: 'Sorter Billeder arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/picture%20sort/Sorter%20Billeder%201.webp', alt: 'Sorter Billeder 1', caption: 'Sorter Billeder 1' },
      { src: '/samples/danish/picture%20sort/Sorter%20Billeder%202.webp', alt: 'Sorter Billeder 2', caption: 'Sorter Billeder 2' },
      { src: '/samples/danish/picture%20sort/Sorter%20Billeder%203.webp', alt: 'Sorter Billeder 3', caption: 'Sorter Billeder 3' },
    ],
  },
  'missing-pieces': {
    hero: '/samples/danish/missing%20pieces/Manglende%20Dele%201.webp',
    heroAlt: 'Manglende Dele puslespil — dansk eksempel',
    gallery: [
      { src: '/samples/danish/missing%20pieces/Manglende%20Dele%201.webp', alt: 'Manglende Dele 1', caption: 'Manglende Dele 1' },
      { src: '/samples/danish/missing%20pieces/Manglende%20Dele%202.webp', alt: 'Manglende Dele 2', caption: 'Manglende Dele 2' },
      { src: '/samples/danish/missing%20pieces/Manglende%20Dele%203.webp', alt: 'Manglende Dele 3', caption: 'Manglende Dele 3' },
    ],
  },
  'odd-one-out': {
    hero: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%201.webp',
    heroAlt: 'Find den Ulige arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%201.webp', alt: 'Find den Ulige 1', caption: 'Find den Ulige 1' },
      { src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%202.webp', alt: 'Find den Ulige 2', caption: 'Find den Ulige 2' },
      { src: '/samples/danish/odd%20one%20out/Find%20den%20Ulige%203.webp', alt: 'Find den Ulige 3', caption: 'Find den Ulige 3' },
    ],
  },
  'sudoku': {
    hero: '/samples/danish/sudoku/Billede-Sudoku%201.webp',
    heroAlt: 'Billede-Sudoku arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/sudoku/Billede-Sudoku%201.webp', alt: 'Billede-Sudoku 1', caption: 'Billede-Sudoku 1' },
      { src: '/samples/danish/sudoku/Billede-Sudoku%202.webp', alt: 'Billede-Sudoku 2', caption: 'Billede-Sudoku 2' },
      { src: '/samples/danish/sudoku/Billede-Sudoku%203.webp', alt: 'Billede-Sudoku 3', caption: 'Billede-Sudoku 3' },
    ],
  },
  'picture-path': {
    hero: '/samples/danish/picture%20path/Billedsti%201.webp',
    heroAlt: 'Billedsti arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/picture%20path/Billedsti%201.webp', alt: 'Billedsti 1', caption: 'Billedsti 1' },
      { src: '/samples/danish/picture%20path/Billedsti%202.webp', alt: 'Billedsti 2', caption: 'Billedsti 2' },
      { src: '/samples/danish/picture%20path/Billedsti%203.webp', alt: 'Billedsti 3', caption: 'Billedsti 3' },
    ],
  },
  'find-and-count': {
    hero: '/samples/danish/find%20and%20count/Jeg%20ser%2C%20jeg%20ser%201.webp',
    heroAlt: 'Jeg ser, jeg ser arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/find%20and%20count/Jeg%20ser%2C%20jeg%20ser%201.webp', alt: 'Jeg ser, jeg ser 1', caption: 'Jeg ser, jeg ser 1' },
      { src: '/samples/danish/find%20and%20count/Jeg%20ser%2C%20jeg%20ser%202.webp', alt: 'Jeg ser, jeg ser 2', caption: 'Jeg ser, jeg ser 2' },
      { src: '/samples/danish/find%20and%20count/Jeg%20ser%2C%20jeg%20ser%203.webp', alt: 'Jeg ser, jeg ser 3', caption: 'Jeg ser, jeg ser 3' },
    ],
  },
  'find-objects': {
    hero: '/samples/danish/find%20objects/Find%20de%20Skjulte%20Objekter%201.webp',
    heroAlt: 'Find de Skjulte Objekter arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/find%20objects/Find%20de%20Skjulte%20Objekter%201.webp', alt: 'Find de Skjulte Objekter 1', caption: 'Find de Skjulte Objekter 1' },
      { src: '/samples/danish/find%20objects/Find%20de%20Skjulte%20Objekter%202.webp', alt: 'Find de Skjulte Objekter 2', caption: 'Find de Skjulte Objekter 2' },
      { src: '/samples/danish/find%20objects/Find%20de%20Skjulte%20Objekter%203.webp', alt: 'Find de Skjulte Objekter 3', caption: 'Find de Skjulte Objekter 3' },
    ],
  },
  'crossword': {
    hero: '/samples/danish/crossword/Billedkrydsord%201.webp',
    heroAlt: 'Billedkrydsord arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/crossword/Billedkrydsord%201.webp', alt: 'Billedkrydsord 1', caption: 'Billedkrydsord 1' },
      { src: '/samples/danish/crossword/Billedkrydsord%202.webp', alt: 'Billedkrydsord 2', caption: 'Billedkrydsord 2' },
      { src: '/samples/danish/crossword/Billedkrydsord%203.webp', alt: 'Billedkrydsord 3', caption: 'Billedkrydsord 3' },
    ],
  },
  'treasure-hunt': {
    hero: '/samples/danish/treasure%20hunt/Skattejagt%201.webp',
    heroAlt: 'Skattejagt arbejdsark — dansk eksempel',
    gallery: [
      { src: '/samples/danish/treasure%20hunt/Skattejagt%201.webp', alt: 'Skattejagt 1', caption: 'Skattejagt 1' },
      { src: '/samples/danish/treasure%20hunt/Skattejagt%202.webp', alt: 'Skattejagt 2', caption: 'Skattejagt 2' },
      { src: '/samples/danish/treasure%20hunt/Skattejagt%203.webp', alt: 'Skattejagt 3', caption: 'Skattejagt 3' },
    ],
  },
};

// Map tool-content filenames to app IDs
const TOOL_TO_APP = {
  'alphabet-train': 'alphabet-train',
  'big-small': 'big-small',
  'bingo': 'bingo',
  'chart-count': 'chart-count',
  'code-addition': 'code-addition',
  'coloring': 'coloring',
  'crossword': 'crossword',
  'cryptogram': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-objects': 'find-objects',
  'grid-match': 'grid-match',
  'image-addition': 'addition',
  'image-subtraction': 'subtraction',
  'matching': 'matching',
  'math-puzzle': 'math-puzzle',
  'math-worksheet': 'math-worksheet',
  'missing-pieces': 'missing-pieces',
  'more-less': 'more-less',
  'odd-one-out': 'odd-one-out',
  'pattern-train': 'pattern-train',
  'pattern-worksheet': 'pattern-worksheet',
  'picture-path': 'picture-path',
  'picture-sort': 'picture-sort',
  'prepositions': 'prepositions',
  'shadow-match': 'shadow-match',
  'sudoku': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'word-guess': 'word-guess',
  'word-scramble': 'word-scramble',
  'word-search': 'wordsearch',
  'writing': 'writing',
};

function getAppIdFromFilename(filename, dir) {
  const base = filename.replace('.ts', '');
  if (dir.includes('tool-content')) {
    return TOOL_TO_APP[base] || base;
  }
  return base;
}

function fixAppContent(filePath) {
  const filename = path.basename(filePath);
  const dir = path.dirname(filePath);
  const appId = getAppIdFromFilename(filename, dir);
  const samples = DANISH_SAMPLES[appId];
  if (!samples) return false;

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix visuals section for app-content and tool-content (heroImages + sampleGallery)
  if (dir.includes('app-content') || dir.includes('tool-content') || dir.includes('bundle-content')) {
    // Replace heroImages.primary
    content = content.replace(/(heroImages:\s*\{\s*primary:\s*')[^']*(')/g, `$1${samples.hero}$2`);
    content = content.replace(/(primaryAlt:\s*')[^']*(')/g, `$1${samples.heroAlt}$2`);

    // Replace sampleGallery array
    const galleryRegex = /sampleGallery:\s*\[[\s\S]*?\]/;
    if (galleryRegex.test(content)) {
      const newGallery = `sampleGallery: [\n      { src: '${samples.gallery[0].src}', alt: '${samples.gallery[0].alt}', caption: '${samples.gallery[0].caption}' },\n      { src: '${samples.gallery[1].src}', alt: '${samples.gallery[1].alt}', caption: '${samples.gallery[1].caption}' },\n      { src: '${samples.gallery[2].src}', alt: '${samples.gallery[2].alt}', caption: '${samples.gallery[2].caption}' },\n    ]`;
      content = content.replace(galleryRegex, newGallery);
    }
  }

  // Fix guide-content and start-content (heroImage + samples)
  if (dir.includes('guide-content') || dir.includes('start-content')) {
    // Replace heroImage
    content = content.replace(/(heroImage:\s*\{\s*src:\s*')[^']*(')/g, `$1${samples.hero}$2`);
    content = content.replace(/(heroImage:\s*\{[^}]*alt:\s*')[^']*(')/g, `$1${samples.heroAlt}$2`);

    // Replace samples array
    const samplesRegex = /samples:\s*\[[\s\S]*?\]/;
    if (samplesRegex.test(content)) {
      const newSamples = `samples: [\n      { src: '${samples.gallery[0].src}', alt: '${samples.gallery[0].alt}', caption: '${samples.gallery[0].caption}' },\n      { src: '${samples.gallery[1].src}', alt: '${samples.gallery[1].alt}', caption: '${samples.gallery[1].caption}' },\n      { src: '${samples.gallery[2].src}', alt: '${samples.gallery[2].alt}', caption: '${samples.gallery[2].caption}' },\n    ]`;
      content = content.replace(samplesRegex, newSamples);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Process all Danish content directories
const BASE = path.join(__dirname, '..', 'frontend', 'config');
const dirs = [
  'app-content/da',
  'tool-content/da',
  'bundle-content/da',
  'guide-content/da',
  'start-content/da',
];

let fixed = 0;
let skipped = 0;
let errors = 0;

for (const dir of dirs) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const appId = getAppIdFromFilename(file, dir);

    if (!DANISH_SAMPLES[appId]) {
      // For guide/start/bundle files that don't map 1:1 to an app,
      // use a representative sample (addition for math, wordsearch for literacy, etc.)
      const defaultAppId = 'addition'; // fallback
      if (!DANISH_SAMPLES[defaultAppId]) {
        skipped++;
        continue;
      }
    }

    try {
      // For guide/start files, we need to determine which app's samples to use
      let content = fs.readFileSync(filePath, 'utf8');

      // Check if it has /samples/ references at all
      if (!content.includes('/samples/')) {
        skipped++;
        continue;
      }

      // Determine which app the file references
      let targetAppId = appId;
      if (!DANISH_SAMPLES[targetAppId]) {
        // Try to extract appId from content (toolsRecommended, appId fields, etc.)
        const appIdMatch = content.match(/appId:\s*'([^']+)'/);
        if (appIdMatch && DANISH_SAMPLES[appIdMatch[1]]) {
          targetAppId = appIdMatch[1];
        } else {
          // Find any /samples/ reference and extract the app folder
          const sampleMatch = content.match(/\/samples\/\w+\/([^/]+)\//);
          if (sampleMatch) {
            const folder = decodeURIComponent(sampleMatch[1]).replace(/ /g, '-');
            // Try matching folder to app ID
            for (const [id] of Object.entries(DANISH_SAMPLES)) {
              if (id === folder || id.replace(/-/g, ' ') === decodeURIComponent(sampleMatch[1])) {
                targetAppId = id;
                break;
              }
            }
          }
          if (!DANISH_SAMPLES[targetAppId]) {
            targetAppId = 'addition'; // default fallback
          }
        }
      }

      const samples = DANISH_SAMPLES[targetAppId];
      const original = content;

      // Replace ANY /samples/english/ or /samples/swedish/ with Danish equivalents
      // Also fix .jpeg and .png extensions to .webp
      // Replace hero image paths
      content = content.replace(/\/samples\/(english|swedish|german|french|spanish|portuguese|italian|dutch|norwegian|finnish)\/[^'"]*/g, (match) => {
        return samples.hero;
      });

      // More targeted: replace all src paths in visuals objects
      const srcRegex = /(src:\s*')\/samples\/[^']+(')/g;
      let srcIdx = 0;
      content = content.replace(srcRegex, (match, prefix, suffix) => {
        const galleryItem = samples.gallery[srcIdx % samples.gallery.length];
        srcIdx++;
        return `${prefix}${galleryItem.src}${suffix}`;
      });

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixed++;
        console.log(`FIXED: ${dir}/${file} -> ${targetAppId}`);
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`ERROR: ${dir}/${file}: ${err.message}`);
      errors++;
    }
  }
}

console.log(`\nDone: ${fixed} fixed, ${skipped} skipped, ${errors} errors`);
