/**
 * Generate theme page content for all 50 themes x 11 locales.
 * Run: node scripts/generate-theme-content.js
 *
 * This outputs the complete themeContent object to
 * frontend/config/theme-page-content.ts
 */

const fs = require('fs');
const path = require('path');

const ALL_APPS = [
  'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
  'math-puzzle', 'more-less', 'subtraction', 'alphabet-train', 'word-scramble',
  'prepositions', 'writing-app', 'word-search', 'image-crossword', 'word-guess',
  'coloring', 'draw-and-color', 'sudoku', 'image-cryptogram', 'odd-one-out',
  'picture-path', 'find-and-count', 'find-objects', 'missing-pieces',
  'matching-app', 'grid-match', 'shadow-match', 'picture-sort', 'drawing-lines',
  'pattern-train', 'pattern-worksheet', 'picture-bingo', 'big-small-app',
  'treasure-hunt',
];

// Theme definitions: id -> { names (per locale), intro (en), faq (en), relatedThemes }
const themes = {
  animals: {
    names: { en: 'Animals', de: 'Tiere', fr: 'Animaux', es: 'Animales', pt: 'Animais', it: 'Animali', nl: 'Dieren', sv: 'Djur', da: 'Dyr', no: 'Dyr', fi: 'El\u00e4imet' },
    introEn: 'Animals are one of the most engaging topics for young learners. Our animal-themed worksheet generators let you create custom math, reading, and puzzle activities featuring adorable animal illustrations. From counting cats and dogs to solving animal word searches, these worksheets make learning fun while building essential skills. Each generator uses our curated library of high-quality animal images to produce unique, printable worksheets every time.',
    faqEn: [
      ['What types of animal worksheets can I create?', 'You can create over 30 different types of animal-themed worksheets including addition, subtraction, word searches, crossword puzzles, coloring pages, matching games, pattern recognition, and many more. All worksheets feature cute, kid-friendly animal illustrations.'],
      ['Are the animal worksheets free to use?', 'Yes! All our worksheet generators are completely free. You can create unlimited animal-themed worksheets, download them as PDFs, and print them for your classroom or home use.'],
      ['What age groups are animal worksheets suitable for?', 'Our animal worksheets cover preschool through 3rd grade (ages 3-9). Simple coloring and matching activities work great for younger children, while math puzzles and word games challenge older students.'],
      ['Can I choose specific animals for my worksheets?', 'Our generators automatically select from a diverse library of animal images including farm animals, wild animals, pets, and sea creatures. The variety ensures every worksheet is unique and engaging.'],
      ['How do I print the animal worksheets?', 'After creating your worksheet, click the download button to save it as a PDF. Then open the PDF and print it on standard A4 or Letter-size paper. All worksheets are designed for clean, ink-friendly printing.'],
    ],
    relatedThemes: ['farm', 'pets', 'zoo', 'birds', 'insects', 'ocean', 'dinosaurs'],
  },
  food: {
    names: { en: 'Food', de: 'Essen', fr: 'Nourriture', es: 'Comida', pt: 'Comida', it: 'Cibo', nl: 'Eten', sv: 'Mat', da: 'Mad', no: 'Mat', fi: 'Ruoka' },
    introEn: 'Food is a universal topic that every child can relate to. Our food-themed worksheet generators create engaging math, language, and puzzle activities using colorful illustrations of fruits, vegetables, and other foods. Children learn to count with apples, solve word puzzles about meals, and practice patterns with food images. These worksheets connect learning to everyday life.',
    faqEn: [
      ['What food-themed worksheets are available?', 'Over 30 types including addition with fruits, subtraction, food word searches, crosswords, coloring pages, matching games, sorting activities, and pattern recognition with food images.'],
      ['Are the food worksheets free?', 'Yes! All generators are completely free. Create unlimited worksheets and download them as printable PDFs.'],
      ['What age range are food worksheets for?', 'Preschool through 3rd grade (ages 3-9). Simple coloring for young children, math puzzles for older students.'],
      ['Can food worksheets help teach nutrition?', 'While our worksheets focus on academic skills like math and reading, using food imagery naturally introduces children to different fruits, vegetables, and healthy foods.'],
    ],
    relatedThemes: ['fruits', 'vegetables', 'cooking', 'animals', 'nature', 'holidays'],
  },
  transportation: {
    names: { en: 'Transportation', de: 'Transport', fr: 'Transport', es: 'Transporte', pt: 'Transporte', it: 'Trasporti', nl: 'Vervoer', sv: 'Transport', da: 'Transport', no: 'Transport', fi: 'Liikenne' },
    introEn: 'Cars, trains, planes, and boats capture the imagination of children everywhere. Our transportation-themed worksheet generators turn this natural fascination into learning opportunities. Create math problems featuring vehicles, word puzzles about different modes of transport, and coloring pages with detailed illustrations. These worksheets are perfect for transportation-themed classroom units.',
    faqEn: [
      ['What transportation worksheets can I create?', 'Over 30 types: math with vehicles, word searches about transport, crosswords, coloring pages of cars and trains, matching vehicles, sorting by type, and pattern activities.'],
      ['Are they free?', 'Yes! All generators are completely free. Create unlimited worksheets and download as PDFs.'],
      ['What vehicles are included?', 'Cars, buses, trains, airplanes, boats, bicycles, trucks, helicopters, and more from our curated image library.'],
      ['What ages are they for?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['construction', 'travel', 'space', 'pirates', 'camping'],
  },
  nature: {
    names: { en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza', pt: 'Natureza', it: 'Natura', nl: 'Natuur', sv: 'Natur', da: 'Natur', no: 'Natur', fi: 'Luonto' },
    introEn: 'Bring the beauty of the natural world into your classroom with nature-themed worksheets. Children explore trees, flowers, mountains, rivers, and weather through engaging math problems, word puzzles, and creative activities. Nature themes encourage curiosity about the environment while reinforcing academic skills across subjects.',
    faqEn: [
      ['What nature worksheets can I create?', 'Over 30 types: counting with nature images, word searches about plants and weather, coloring pages of landscapes, matching nature elements, and pattern recognition with natural objects.'],
      ['Are they suitable for science lessons?', 'Our worksheets focus on math, reading, and visual skills, but the nature imagery naturally complements science lessons about plants, weather, and ecosystems.'],
      ['What ages are they for?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['flowers', 'forest', 'garden', 'weather', 'seasons', 'ocean'],
  },
  school: {
    names: { en: 'School', de: 'Schule', fr: '\u00c9cole', es: 'Escuela', pt: 'Escola', it: 'Scuola', nl: 'School', sv: 'Skola', da: 'Skole', no: 'Skole', fi: 'Koulu' },
    introEn: 'School-themed worksheets feature familiar classroom objects that children see every day \u2013 books, pencils, backpacks, scissors, and more. These relatable images make worksheets feel relevant and engaging. Perfect for back-to-school activities, classroom orientation, and everyday learning practice.',
    faqEn: [
      ['What school-themed worksheets are available?', 'Over 30 types featuring school supplies: math with pencils and books, word searches about school items, coloring classroom scenes, matching school objects, and more.'],
      ['Are they good for back-to-school?', 'The school theme is ideal for back-to-school orientation, helping children identify classroom objects while practicing academic skills.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['alphabet', 'numbers', 'colors', 'shapes', 'jobs'],
  },
  sports: {
    names: { en: 'Sports', de: 'Sport', fr: 'Sports', es: 'Deportes', pt: 'Esportes', it: 'Sport', nl: 'Sport', sv: 'Sport', da: 'Sport', no: 'Sport', fi: 'Urheilu' },
    introEn: 'Get children moving \u2013 mentally! Sports-themed worksheets use images of balls, equipment, and activities to create exciting math problems, word games, and visual puzzles. These worksheets are perfect for active learners who love physical education, and they make great additions to sports-day activities or PE-integrated lessons.',
    faqEn: [
      ['What sports worksheets can I create?', 'Over 30 types: counting sports equipment, word searches about sports, coloring athletes, matching sports to equipment, sorting activities, and pattern recognition.'],
      ['Can they be used for PE integration?', 'Yes! Sports-themed worksheets complement physical education by reinforcing academic concepts through sports imagery that children already love.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['body', 'toys', 'camping', 'nature', 'emotions'],
  },
  emotions: {
    names: { en: 'Emotions', de: 'Emotionen', fr: '\u00c9motions', es: 'Emociones', pt: 'Emo\u00e7\u00f5es', it: 'Emozioni', nl: 'Emoties', sv: 'K\u00e4nslor', da: 'F\u00f8lelser', no: 'F\u00f8lelser', fi: 'Tunteet' },
    introEn: 'Help children develop emotional intelligence while practicing academic skills. Emotion-themed worksheets feature facial expressions and feeling words, perfect for social-emotional learning (SEL) integration. Children identify, match, and sort different emotions while building math, reading, and critical thinking skills.',
    faqEn: [
      ['How do emotion worksheets support SEL?', 'By featuring diverse facial expressions and emotion vocabulary, these worksheets naturally integrate social-emotional learning into math, reading, and puzzle activities.'],
      ['What types are available?', 'Over 30 types: matching emotions, sorting feelings, emotion word searches, coloring faces, counting by emotion type, and pattern activities with facial expressions.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9). Especially valuable for preschool and kindergarten SEL programs.'],
    ],
    relatedThemes: ['body', 'school', 'clothing', 'jobs', 'holidays'],
  },
  body: {
    names: { en: 'Body Parts', de: 'K\u00f6rperteile', fr: 'Corps', es: 'Cuerpo', pt: 'Corpo', it: 'Corpo', nl: 'Lichaam', sv: 'Kropp', da: 'Krop', no: 'Kropp', fi: 'Keho' },
    introEn: 'Body parts worksheets help children learn about themselves while practicing academic skills. Using clear illustrations of hands, feet, eyes, ears, and other body parts, these worksheets support both academic learning and body awareness \u2013 an important developmental skill for young children.',
    faqEn: [
      ['What body parts worksheets are available?', 'Over 30 types: matching body parts, word searches about the body, coloring pages, counting exercises, and visual discrimination activities.'],
      ['Are they good for health education?', 'Yes! Body part imagery naturally supports health and hygiene education alongside math and reading practice.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['emotions', 'sports', 'clothing', 'school', 'food'],
  },
  clothing: {
    names: { en: 'Clothing', de: 'Kleidung', fr: 'V\u00eatements', es: 'Ropa', pt: 'Roupas', it: 'Abbigliamento', nl: 'Kleding', sv: 'Kl\u00e4der', da: 'T\u00f8j', no: 'Kl\u00e6r', fi: 'Vaatteet' },
    introEn: 'Clothing-themed worksheets use everyday wardrobe items to create relatable learning activities. Children sort clothes by type, match outfits, learn clothing vocabulary in word puzzles, and practice counting with familiar items. These worksheets connect academic skills to daily life and support independence in getting dressed.',
    faqEn: [
      ['What clothing worksheets can I create?', 'Over 30 types: sorting clothes by season, matching outfits, clothing word searches, coloring pages, counting clothes, and pattern recognition with wardrobe items.'],
      ['How do they support daily life skills?', 'By featuring familiar clothing items, these worksheets reinforce vocabulary and categorization skills that help children become more independent.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['body', 'seasons', 'weather', 'colors', 'shopping'],
  },
  household: {
    names: { en: 'Household', de: 'Haushalt', fr: 'Maison', es: 'Hogar', pt: 'Casa', it: 'Casa', nl: 'Huishouden', sv: 'Hush\u00e5ll', da: 'Husholdning', no: 'Husholdning', fi: 'Koti' },
    introEn: 'Household-themed worksheets bring familiar home objects into learning activities. From kitchen utensils to living room furniture, children practice math, reading, and thinking skills with images they recognize from their own homes. This real-world connection makes learning feel relevant and meaningful.',
    faqEn: [
      ['What household worksheets are available?', 'Over 30 types: counting household objects, matching items to rooms, word searches about home, coloring pages of furniture, and sorting activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['furniture', 'cooking', 'toys', 'clothing', 'garden'],
  },
  toys: {
    names: { en: 'Toys', de: 'Spielzeug', fr: 'Jouets', es: 'Juguetes', pt: 'Brinquedos', it: 'Giocattoli', nl: 'Speelgoed', sv: 'Leksaker', da: 'Leget\u00f8j', no: 'Leker', fi: 'Lelut' },
    introEn: 'Toys are something every child loves! Toy-themed worksheets use images of dolls, balls, blocks, and games to make learning irresistible. Children eagerly practice counting, matching, and sorting when the content features their favorite playthings. These worksheets are especially effective for reluctant learners.',
    faqEn: [
      ['What toy-themed worksheets can I create?', 'Over 30 types: counting toys, toy word searches, coloring pages, matching toys, sorting by type or size, and pattern recognition with toy images.'],
      ['Why are toy themes effective?', 'Children are naturally motivated by images of toys. This intrinsic interest leads to greater engagement and focus during worksheet activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9). Especially engaging for preschool and kindergarten.'],
    ],
    relatedThemes: ['birthday', 'sports', 'robots', 'superheroes', 'circus'],
  },
  music: {
    names: { en: 'Music', de: 'Musik', fr: 'Musique', es: 'M\u00fasica', pt: 'M\u00fasica', it: 'Musica', nl: 'Muziek', sv: 'Musik', da: 'Musik', no: 'Musikk', fi: 'Musiikki' },
    introEn: 'Music-themed worksheets bring rhythm and harmony to academic learning. Featuring instruments, notes, and musical concepts, these worksheets create a cross-curricular bridge between music education and core subjects. Children count instruments, solve music word puzzles, and discover patterns \u2013 building both musical awareness and academic skills.',
    faqEn: [
      ['What music worksheets are available?', 'Over 30 types: counting instruments, music word searches, coloring musical instruments, matching sounds to instruments, pattern activities with notes, and more.'],
      ['Can they complement music lessons?', 'Yes! These worksheets bridge music education and academic subjects, perfect for integrated learning approaches.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['school', 'emotions', 'holidays', 'circus', 'birthday'],
  },
  jobs: {
    names: { en: 'Jobs', de: 'Berufe', fr: 'M\u00e9tiers', es: 'Trabajos', pt: 'Profiss\u00f5es', it: 'Lavori', nl: 'Beroepen', sv: 'Yrken', da: 'Job', no: 'Yrker', fi: 'Ammatit' },
    introEn: 'Help children explore the world of work through engaging worksheets. Featuring doctors, teachers, firefighters, farmers, and more, job-themed activities build vocabulary about community helpers while reinforcing math and reading skills. Perfect for career awareness and community helper units.',
    faqEn: [
      ['What job-themed worksheets can I create?', 'Over 30 types: matching workers to tools, job word searches, coloring community helpers, counting by profession, sorting jobs by workplace, and more.'],
      ['Are they good for community helper units?', 'Yes! Job-themed worksheets are ideal for community helper lessons, helping children learn about different professions while practicing academic skills.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['school', 'construction', 'cooking', 'sports', 'transportation'],
  },
  space: {
    names: { en: 'Space', de: 'Weltraum', fr: 'Espace', es: 'Espacio', pt: 'Espa\u00e7o', it: 'Spazio', nl: 'Ruimte', sv: 'Rymden', da: 'Rum', no: 'Rommet', fi: 'Avaruus' },
    introEn: 'Blast off into learning with space-themed worksheets! Rockets, planets, stars, and astronauts make every math problem and word puzzle an adventure. Space themes spark curiosity and wonder while children practice counting, reading, and critical thinking. Perfect for STEM integration and science units about the solar system.',
    faqEn: [
      ['What space worksheets can I create?', 'Over 30 types: counting planets, space word searches, coloring rockets and aliens, matching celestial objects, pattern recognition with stars, and more.'],
      ['Do they support STEM learning?', 'Yes! Space-themed worksheets naturally integrate science concepts into math and reading activities, supporting STEM curriculum goals.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['robots', 'superheroes', 'numbers', 'nature', 'transportation'],
  },
  seasons: {
    names: { en: 'Seasons', de: 'Jahreszeiten', fr: 'Saisons', es: 'Estaciones', pt: 'Esta\u00e7\u00f5es', it: 'Stagioni', nl: 'Seizoenen', sv: '\u00c5rstider', da: '\u00c5rstider', no: '\u00c5rstider', fi: 'Vuodenajat' },
    introEn: 'Seasonal worksheets keep learning fresh all year round. From spring flowers to winter snowflakes, these worksheets feature imagery that matches the current time of year. Children connect academic practice with real-world seasonal changes, building both knowledge and observational skills.',
    faqEn: [
      ['What seasons worksheets are available?', 'Over 30 types featuring seasonal imagery: counting seasonal objects, weather word searches, coloring seasonal scenes, matching seasons to activities, and pattern recognition.'],
      ['Can I find worksheets for each season?', 'Yes! Our image library includes imagery for spring, summer, autumn, and winter, so you can create season-specific worksheets year-round.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['spring', 'summer', 'winter', 'weather', 'nature', 'holidays'],
  },
  holidays: {
    names: { en: 'Holidays', de: 'Feiertage', fr: 'F\u00eates', es: 'Fiestas', pt: 'Feriados', it: 'Feste', nl: 'Feestdagen', sv: 'Helgdagar', da: 'Helligdage', no: 'Helligdager', fi: 'Juhlapyh\u00e4t' },
    introEn: 'Make every holiday a learning celebration! Holiday-themed worksheets feature festive imagery that keeps children engaged during exciting times of the year. From counting decorations to solving holiday word puzzles, these worksheets channel holiday excitement into productive academic practice.',
    faqEn: [
      ['What holiday worksheets are available?', 'Over 30 types: counting festive objects, holiday word searches, coloring celebrations, matching holiday symbols, and pattern activities with seasonal decorations.'],
      ['Which holidays are covered?', 'Our image library includes imagery for Christmas, Easter, Halloween, and general celebration themes that work for any holiday.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['xmas', 'easter', 'halloween', 'birthday', 'seasons', 'winter'],
  },
  weather: {
    names: { en: 'Weather', de: 'Wetter', fr: 'M\u00e9t\u00e9o', es: 'Clima', pt: 'Clima', it: 'Meteo', nl: 'Weer', sv: 'V\u00e4der', da: 'Vejr', no: 'V\u00e6r', fi: 'S\u00e4\u00e4' },
    introEn: 'Weather worksheets connect science and academics through familiar meteorological concepts. Sun, rain, snow, clouds, and rainbows make appearances in math problems, word games, and visual activities. Children learn weather vocabulary while practicing counting, pattern recognition, and reading skills.',
    faqEn: [
      ['What weather worksheets can I create?', 'Over 30 types: counting weather symbols, weather word searches, coloring weather scenes, matching weather to clothing, sorting by weather type, and pattern activities.'],
      ['Do they support science lessons?', 'Yes! Weather imagery naturally supports science curriculum about meteorology, seasons, and the water cycle.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['seasons', 'nature', 'clothing', 'spring', 'winter'],
  },
  colors: {
    names: { en: 'Colors', de: 'Farben', fr: 'Couleurs', es: 'Colores', pt: 'Cores', it: 'Colori', nl: 'Kleuren', sv: 'F\u00e4rger', da: 'Farver', no: 'Farger', fi: 'V\u00e4rit' },
    introEn: 'Color-themed worksheets are perfect for teaching color recognition, color words, and sorting by color. These fundamental visual skills support art education, reading development, and mathematical categorization. Children love working with vibrant, colorful imagery that makes every worksheet visually appealing.',
    faqEn: [
      ['What color worksheets can I create?', 'Over 30 types: sorting by color, color word searches, coloring by number, matching colors, color pattern recognition, and counting colored objects.'],
      ['How do they support early learning?', 'Color recognition is a foundational skill. These worksheets build color vocabulary, sorting abilities, and visual discrimination that support reading and math readiness.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9). Especially valuable for preschool color learning.'],
    ],
    relatedThemes: ['shapes', 'numbers', 'alphabet', 'school', 'nature'],
  },
  shapes: {
    names: { en: 'Shapes', de: 'Formen', fr: 'Formes', es: 'Formas', pt: 'Formas', it: 'Forme', nl: 'Vormen', sv: 'Former', da: 'Former', no: 'Former', fi: 'Muodot' },
    introEn: 'Shape worksheets build the geometric foundations that children need for mathematics. Circles, squares, triangles, and more appear in counting activities, matching games, pattern exercises, and coloring pages. These worksheets develop spatial awareness and geometric vocabulary \u2013 essential building blocks for later math success.',
    faqEn: [
      ['What shape worksheets are available?', 'Over 30 types: counting shapes, shape word searches, coloring geometric patterns, matching shapes, sorting by shape, shape pattern recognition, and size comparison.'],
      ['Do they support math readiness?', 'Yes! Shape recognition and spatial awareness are fundamental math skills. These worksheets build the geometric foundation children need.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['colors', 'numbers', 'alphabet', 'school', 'nature'],
  },
  numbers: {
    names: { en: 'Numbers', de: 'Zahlen', fr: 'Nombres', es: 'N\u00fameros', pt: 'N\u00fameros', it: 'Numeri', nl: 'Getallen', sv: 'Siffror', da: 'Tal', no: 'Tall', fi: 'Numerot' },
    introEn: 'Number-themed worksheets reinforce the most fundamental math skill: number recognition and counting. Featuring digits, dot patterns, and quantity representations, these worksheets help children build strong number sense from the ground up. Perfect for daily math practice and number fluency development.',
    faqEn: [
      ['What number worksheets can I create?', 'Over 30 types: number recognition, counting practice, number word searches, coloring by number, matching quantities, number patterns, and more/less comparisons.'],
      ['How do they build number sense?', 'By presenting numbers in multiple formats (digits, words, quantities, patterns), these worksheets develop deep number understanding rather than just memorization.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['shapes', 'colors', 'alphabet', 'school', 'food'],
  },
  alphabet: {
    names: { en: 'Alphabet', de: 'Alphabet', fr: 'Alphabet', es: 'Alfabeto', pt: 'Alfabeto', it: 'Alfabeto', nl: 'Alfabet', sv: 'Alfabet', da: 'Alfabet', no: 'Alfabet', fi: 'Aakkoset' },
    introEn: 'Alphabet worksheets are essential for early literacy development. Featuring letters in various styles and contexts, these worksheets help children recognize, trace, and use the alphabet. From letter matching to alphabetical ordering, word building to phonics practice \u2013 these tools build the foundation for reading success.',
    faqEn: [
      ['What alphabet worksheets are available?', 'Over 30 types: letter recognition, alphabet ordering, letter word searches, tracing practice, matching uppercase to lowercase, phonics activities, and alphabet pattern recognition.'],
      ['How do they support reading readiness?', 'Letter recognition is the first step in reading. These worksheets build letter knowledge, phonemic awareness, and early spelling skills.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9). Especially critical for preschool and kindergarten.'],
    ],
    relatedThemes: ['numbers', 'school', 'colors', 'shapes', 'animals'],
  },
  furniture: {
    names: { en: 'Furniture', de: 'M\u00f6bel', fr: 'Meubles', es: 'Muebles', pt: 'M\u00f3veis', it: 'Mobili', nl: 'Meubels', sv: 'M\u00f6bler', da: 'M\u00f8bler', no: 'M\u00f8bler', fi: 'Huonekalut' },
    introEn: 'Furniture-themed worksheets use everyday home and classroom objects to create familiar learning contexts. Tables, chairs, beds, and bookshelves provide relatable imagery for counting, matching, and sorting activities. These worksheets help children build vocabulary about their immediate environment.',
    faqEn: [
      ['What furniture worksheets can I create?', 'Over 30 types: counting furniture, matching items to rooms, furniture word searches, coloring pages, sorting by size or room, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['household', 'school', 'shapes', 'colors', 'construction'],
  },
  easter: {
    names: { en: 'Easter', de: 'Ostern', fr: 'P\u00e2ques', es: 'Pascua', pt: 'P\u00e1scoa', it: 'Pasqua', nl: 'Pasen', sv: 'P\u00e5sk', da: 'P\u00e5ske', no: 'P\u00e5ske', fi: 'P\u00e4\u00e4si\u00e4inen' },
    introEn: 'Celebrate spring with Easter-themed worksheets! Featuring bunnies, eggs, chicks, and flowers, these festive worksheets turn holiday excitement into learning opportunities. Children practice counting Easter eggs, solving spring word puzzles, and creating colorful artwork while building essential academic skills.',
    faqEn: [
      ['What Easter worksheets can I create?', 'Over 30 types: counting Easter eggs, spring word searches, coloring Easter scenes, matching bunnies, Easter pattern recognition, and more.'],
      ['When should I use them?', 'Easter worksheets are perfect for March-April classroom activities, spring celebrations, and holiday-themed homework.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['spring', 'animals', 'flowers', 'holidays', 'food'],
  },
  halloween: {
    names: { en: 'Halloween', de: 'Halloween', fr: 'Halloween', es: 'Halloween', pt: 'Halloween', it: 'Halloween', nl: 'Halloween', sv: 'Halloween', da: 'Halloween', no: 'Halloween', fi: 'Halloween' },
    introEn: 'Make Halloween educational with spooky-fun worksheets! Friendly ghosts, pumpkins, bats, and witches add excitement to math, reading, and puzzle activities. These not-too-scary worksheets channel Halloween enthusiasm into productive learning while keeping the festive spirit alive.',
    faqEn: [
      ['What Halloween worksheets are available?', 'Over 30 types: counting pumpkins, Halloween word searches, coloring spooky scenes, matching costumes, monster pattern recognition, and more.'],
      ['Are they age-appropriate?', 'Yes! All Halloween images are kid-friendly and not scary. They feature fun, cartoon-style illustrations suitable for young children.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['holidays', 'fairy-tales', 'animals', 'winter', 'xmas'],
  },
  xmas: {
    names: { en: 'Christmas', de: 'Weihnachten', fr: 'No\u00ebl', es: 'Navidad', pt: 'Natal', it: 'Natale', nl: 'Kerstmis', sv: 'Jul', da: 'Jul', no: 'Jul', fi: 'Joulu' },
    introEn: 'Bring holiday cheer to learning with Christmas-themed worksheets! Santa, reindeer, snowmen, and presents make every worksheet a festive treat. Children eagerly practice math and reading when surrounded by Christmas imagery. Perfect for December classroom activities and holiday homework packets.',
    faqEn: [
      ['What Christmas worksheets can I create?', 'Over 30 types: counting presents, Christmas word searches, coloring winter scenes, matching ornaments, holiday pattern recognition, and more.'],
      ['When should I use them?', 'Christmas worksheets are perfect for November-December activities, holiday countdown calendars, and festive homework packets.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['winter', 'holidays', 'snow', 'toys', 'food'],
  },
  winter: {
    names: { en: 'Winter', de: 'Winter', fr: 'Hiver', es: 'Invierno', pt: 'Inverno', it: 'Inverno', nl: 'Winter', sv: 'Vinter', da: 'Vinter', no: 'Vinter', fi: 'Talvi' },
    introEn: 'Winter worksheets feature snowflakes, mittens, scarves, and cozy indoor scenes that match the cold-weather season. These seasonal worksheets keep children engaged during the darker months with warm, inviting imagery that makes learning feel like a snowy-day adventure.',
    faqEn: [
      ['What winter worksheets are available?', 'Over 30 types: counting snowflakes, winter word searches, coloring snowy scenes, matching winter clothing, seasonal pattern recognition, and more.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['xmas', 'weather', 'clothing', 'seasons', 'holidays'],
  },
  farm: {
    names: { en: 'Farm', de: 'Bauernhof', fr: 'Ferme', es: 'Granja', pt: 'Fazenda', it: 'Fattoria', nl: 'Boerderij', sv: 'Bondg\u00e5rd', da: 'Bondeg\u00e5rd', no: 'Bondeg\u00e5rd', fi: 'Maatila' },
    introEn: 'Farm worksheets bring the countryside into the classroom. Cows, chickens, pigs, tractors, and barns create a rich learning environment where children practice math, reading, and thinking skills. Farm themes are excellent for teaching about food production, rural life, and animal care.',
    faqEn: [
      ['What farm worksheets can I create?', 'Over 30 types: counting farm animals, farm word searches, coloring barn scenes, matching animals to homes, sorting crops, and pattern recognition with farm imagery.'],
      ['Do they teach about farming?', 'While focused on academic skills, farm imagery naturally introduces concepts about food production, animal husbandry, and rural life.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'nature', 'food', 'garden', 'transportation'],
  },
  ocean: {
    names: { en: 'Ocean', de: 'Ozean', fr: 'Oc\u00e9an', es: 'Oc\u00e9ano', pt: 'Oceano', it: 'Oceano', nl: 'Oceaan', sv: 'Hav', da: 'Hav', no: 'Hav', fi: 'Valtameri' },
    introEn: 'Dive into learning with ocean-themed worksheets! Fish, whales, dolphins, shells, and coral reefs create a fascinating underwater world for academic practice. Children explore marine life while counting, solving word puzzles, and developing visual skills. Perfect for ocean science units and summer learning.',
    faqEn: [
      ['What ocean worksheets can I create?', 'Over 30 types: counting sea creatures, ocean word searches, coloring underwater scenes, matching marine animals, ocean pattern recognition, and sorting sea life.'],
      ['Do they support science lessons?', 'Yes! Ocean imagery naturally complements marine biology, ecosystem, and environmental science lessons.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'nature', 'pirates', 'summer', 'birds'],
  },
  dinosaurs: {
    names: { en: 'Dinosaurs', de: 'Dinosaurier', fr: 'Dinosaures', es: 'Dinosaurios', pt: 'Dinossauros', it: 'Dinosauri', nl: 'Dinosaurussen', sv: 'Dinosaurier', da: 'Dinosaurer', no: 'Dinosaurer', fi: 'Dinosaurukset' },
    introEn: 'Dinosaurs fascinate children of all ages! T-Rex, Triceratops, Stegosaurus, and other prehistoric creatures make worksheets incredibly engaging. Children who can name 50 dinosaur species will eagerly practice math and reading when dinosaurs are involved. Perfect for paleontology units and science integration.',
    faqEn: [
      ['What dinosaur worksheets can I create?', 'Over 30 types: counting dinosaurs, dino word searches, coloring prehistoric scenes, matching species, sorting by size, dinosaur pattern recognition, and more.'],
      ['Why are dinosaur themes so effective?', 'Dinosaurs tap into children\'s natural curiosity about prehistoric life. This intrinsic motivation leads to exceptional engagement with academic content.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'nature', 'space', 'forest', 'ocean'],
  },
  insects: {
    names: { en: 'Insects', de: 'Insekten', fr: 'Insectes', es: 'Insectos', pt: 'Insetos', it: 'Insetti', nl: 'Insecten', sv: 'Insekter', da: 'Insekter', no: 'Insekter', fi: 'Hy\u00f6nteiset' },
    introEn: 'Butterflies, ladybugs, bees, and ants bring the tiny world of insects into learning activities. Insect-themed worksheets develop observational skills while children practice counting, matching, and sorting these fascinating creatures. Perfect for spring science units and nature exploration.',
    faqEn: [
      ['What insect worksheets can I create?', 'Over 30 types: counting bugs, insect word searches, coloring butterflies, matching insects, sorting by type, and pattern recognition with insect images.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'garden', 'nature', 'flowers', 'spring'],
  },
  fruits: {
    names: { en: 'Fruits', de: 'Fr\u00fcchte', fr: 'Fruits', es: 'Frutas', pt: 'Frutas', it: 'Frutta', nl: 'Fruit', sv: 'Frukter', da: 'Frugter', no: 'Frukt', fi: 'Hedelm\u00e4t' },
    introEn: 'Fruit-themed worksheets use colorful apples, bananas, oranges, and berries to create visually appealing learning activities. The bright, familiar imagery makes counting, sorting, and pattern exercises especially engaging. Fruit themes also naturally support healthy eating discussions.',
    faqEn: [
      ['What fruit worksheets are available?', 'Over 30 types: counting fruits, fruit word searches, coloring pages, matching fruits, sorting by color or size, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['food', 'vegetables', 'nature', 'colors', 'garden'],
  },
  vegetables: {
    names: { en: 'Vegetables', de: 'Gem\u00fcse', fr: 'L\u00e9gumes', es: 'Verduras', pt: 'Legumes', it: 'Verdure', nl: 'Groenten', sv: 'Gr\u00f6nsaker', da: 'Gr\u00f8ntsager', no: 'Gr\u00f8nnsaker', fi: 'Vihannekset' },
    introEn: 'Vegetable-themed worksheets make healthy eating fun while building academic skills. Carrots, tomatoes, peas, and potatoes appear in counting, sorting, and matching activities. These worksheets support nutrition education alongside math and reading practice.',
    faqEn: [
      ['What vegetable worksheets can I create?', 'Over 30 types: counting vegetables, veggie word searches, coloring pages, matching vegetables, sorting by color or type, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['food', 'fruits', 'garden', 'cooking', 'nature'],
  },
  flowers: {
    names: { en: 'Flowers', de: 'Blumen', fr: 'Fleurs', es: 'Flores', pt: 'Flores', it: 'Fiori', nl: 'Bloemen', sv: 'Blommor', da: 'Blomster', no: 'Blomster', fi: 'Kukat' },
    introEn: 'Flower worksheets bloom with colorful learning opportunities. Roses, sunflowers, tulips, and daisies create beautiful imagery for counting, matching, and pattern activities. Flower themes are perfect for spring learning, gardening units, and nature exploration.',
    faqEn: [
      ['What flower worksheets are available?', 'Over 30 types: counting flowers, flower word searches, coloring petals, matching blooms, sorting by color, and pattern recognition with floral images.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['garden', 'nature', 'spring', 'insects', 'colors'],
  },
  birds: {
    names: { en: 'Birds', de: 'V\u00f6gel', fr: 'Oiseaux', es: 'P\u00e1jaros', pt: 'P\u00e1ssaros', it: 'Uccelli', nl: 'Vogels', sv: 'F\u00e5glar', da: 'Fugle', no: 'Fugler', fi: 'Linnut' },
    introEn: 'Bird-themed worksheets take flight with engaging learning activities. Colorful parrots, wise owls, friendly penguins, and soaring eagles make counting, matching, and puzzle activities exciting. Bird themes support nature education and observational skills.',
    faqEn: [
      ['What bird worksheets can I create?', 'Over 30 types: counting birds, bird word searches, coloring pages, matching species, sorting by habitat, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'nature', 'forest', 'ocean', 'zoo'],
  },
  pets: {
    names: { en: 'Pets', de: 'Haustiere', fr: 'Animaux domestiques', es: 'Mascotas', pt: 'Animais dom\u00e9sticos', it: 'Animali domestici', nl: 'Huisdieren', sv: 'Husdjur', da: 'K\u00e6ledyr', no: 'Kj\u00e6ledyr', fi: 'Lemmikit' },
    introEn: 'Pets are children\'s best friends \u2013 and now their learning companions! Dogs, cats, hamsters, fish, and rabbits star in worksheets that children love completing. The personal connection to pet ownership makes these worksheets especially motivating for young learners.',
    faqEn: [
      ['What pet worksheets can I create?', 'Over 30 types: counting pets, pet word searches, coloring pages, matching pets to homes, sorting by type, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'farm', 'household', 'toys', 'body'],
  },
  zoo: {
    names: { en: 'Zoo', de: 'Zoo', fr: 'Zoo', es: 'Zool\u00f3gico', pt: 'Zool\u00f3gico', it: 'Zoo', nl: 'Dierentuin', sv: 'Djurpark', da: 'Zoo', no: 'Dyrepark', fi: 'El\u00e4intarha' },
    introEn: 'Take a virtual field trip to the zoo! Lions, elephants, giraffes, and monkeys bring excitement to worksheets that children can\'t wait to complete. Zoo themes combine the wonder of exotic animals with solid academic practice in counting, matching, and problem-solving.',
    faqEn: [
      ['What zoo worksheets can I create?', 'Over 30 types: counting zoo animals, zoo word searches, coloring exotic animals, matching animals to habitats, sorting by continent, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'birds', 'dinosaurs', 'nature', 'travel'],
  },
  garden: {
    names: { en: 'Garden', de: 'Garten', fr: 'Jardin', es: 'Jard\u00edn', pt: 'Jardim', it: 'Giardino', nl: 'Tuin', sv: 'Tr\u00e4dg\u00e5rd', da: 'Have', no: 'Hage', fi: 'Puutarha' },
    introEn: 'Garden worksheets plant seeds of knowledge! Flowers, vegetables, garden tools, and friendly bugs create a nurturing learning environment. These worksheets support spring and summer themes, gardening projects, and environmental awareness while building essential academic skills.',
    faqEn: [
      ['What garden worksheets are available?', 'Over 30 types: counting garden items, garden word searches, coloring flowers, matching tools to tasks, sorting plants, and pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['flowers', 'insects', 'nature', 'vegetables', 'spring'],
  },
  camping: {
    names: { en: 'Camping', de: 'Camping', fr: 'Camping', es: 'Camping', pt: 'Acampamento', it: 'Campeggio', nl: 'Kamperen', sv: 'Camping', da: 'Camping', no: 'Camping', fi: 'Leirityminen' },
    introEn: 'Adventure awaits with camping-themed worksheets! Tents, campfires, hiking boots, and forest scenes create an outdoor adventure learning experience. Children practice counting, matching, and problem-solving while exploring the great outdoors from their desks.',
    faqEn: [
      ['What camping worksheets can I create?', 'Over 30 types: counting camping gear, outdoor word searches, coloring camp scenes, matching equipment, sorting by activity, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['nature', 'forest', 'animals', 'travel', 'sports'],
  },
  pirates: {
    names: { en: 'Pirates', de: 'Piraten', fr: 'Pirates', es: 'Piratas', pt: 'Piratas', it: 'Pirati', nl: 'Piraten', sv: 'Pirater', da: 'Pirater', no: 'Pirater', fi: 'Merirosvot' },
    introEn: 'Ahoy, matey! Pirate-themed worksheets turn learning into a treasure hunt. Maps, ships, parrots, and treasure chests make every math problem and word puzzle an exciting adventure. Pirate themes are incredibly popular with children and create high engagement.',
    faqEn: [
      ['What pirate worksheets can I create?', 'Over 30 types: counting treasure, pirate word searches, coloring ships, matching pirate items, map-based activities, and pattern recognition with pirate imagery.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['ocean', 'travel', 'treasure-hunt', 'fairy-tales', 'animals'],
  },
  'fairy-tales': {
    names: { en: 'Fairy Tales', de: 'M\u00e4rchen', fr: 'Contes de f\u00e9es', es: 'Cuentos de hadas', pt: 'Contos de fadas', it: 'Fiabe', nl: 'Sprookjes', sv: 'Sagor', da: 'Eventyr', no: 'Eventyr', fi: 'Sadut' },
    introEn: 'Once upon a time... learning became magical! Fairy tale worksheets feature castles, dragons, princesses, and enchanted forests. These storybook themes spark imagination while children practice academic skills. Perfect for literacy units and creative storytelling integration.',
    faqEn: [
      ['What fairy tale worksheets can I create?', 'Over 30 types: counting magical creatures, fairy tale word searches, coloring castles, matching characters, story-based activities, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['superheroes', 'pirates', 'animals', 'forest', 'halloween'],
  },
  robots: {
    names: { en: 'Robots', de: 'Roboter', fr: 'Robots', es: 'Robots', pt: 'Rob\u00f4s', it: 'Robot', nl: 'Robots', sv: 'Robotar', da: 'Robotter', no: 'Roboter', fi: 'Robotit' },
    introEn: 'Beep boop! Robot-themed worksheets bring technology to life for young learners. Friendly robots, gears, circuits, and futuristic scenes create an exciting STEM-adjacent learning environment. Children who love technology will be especially motivated by robot imagery.',
    faqEn: [
      ['What robot worksheets can I create?', 'Over 30 types: counting robots, tech word searches, coloring mechanical friends, matching robot parts, sorting by type, and pattern recognition.'],
      ['Do they support STEM?', 'Yes! Robot themes naturally encourage interest in technology, engineering, and computing alongside academic skills.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['space', 'superheroes', 'construction', 'numbers', 'shapes'],
  },
  superheroes: {
    names: { en: 'Superheroes', de: 'Superhelden', fr: 'Super-h\u00e9ros', es: 'Superh\u00e9roes', pt: 'Super-her\u00f3is', it: 'Supereroi', nl: 'Superhelden', sv: 'Superhj\u00e4ltar', da: 'Superhelter', no: 'Superhelter', fi: 'Supersankarit' },
    introEn: 'Every child can be a learning superhero! Capes, masks, and pow-zap-boom action create worksheets that feel more like play than practice. Superhero themes build confidence and excitement around academic skills, making them perfect for reluctant learners.',
    faqEn: [
      ['What superhero worksheets can I create?', 'Over 30 types: counting hero items, superhero word searches, coloring heroes, matching powers, sorting by strength, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['robots', 'space', 'fairy-tales', 'sports', 'toys'],
  },
  construction: {
    names: { en: 'Construction', de: 'Baustelle', fr: 'Construction', es: 'Construcci\u00f3n', pt: 'Constru\u00e7\u00e3o', it: 'Costruzione', nl: 'Bouw', sv: 'Bygge', da: 'Byggeri', no: 'Bygg', fi: 'Rakentaminen' },
    introEn: 'Build knowledge with construction-themed worksheets! Excavators, cranes, hard hats, and building sites create exciting learning activities that appeal especially to children who love machines. These worksheets combine the thrill of heavy equipment with solid academic practice.',
    faqEn: [
      ['What construction worksheets can I create?', 'Over 30 types: counting machines, construction word searches, coloring building sites, matching tools, sorting by vehicle type, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['transportation', 'jobs', 'shapes', 'robots', 'tools'],
  },
  cooking: {
    names: { en: 'Cooking', de: 'Kochen', fr: 'Cuisine', es: 'Cocina', pt: 'Cozinha', it: 'Cucina', nl: 'Koken', sv: 'Matlagning', da: 'Madlavning', no: 'Matlaging', fi: 'Ruoanlaitto' },
    introEn: 'Stir up some learning with cooking-themed worksheets! Pots, pans, ingredients, and recipe steps create worksheets that blend practical life skills with academics. Children practice counting ingredients, matching utensils, and sequencing recipe steps while building foundational skills.',
    faqEn: [
      ['What cooking worksheets are available?', 'Over 30 types: counting ingredients, kitchen word searches, coloring food preparation, matching utensils, sorting by food group, and recipe-based pattern activities.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['food', 'fruits', 'vegetables', 'household', 'jobs'],
  },
  travel: {
    names: { en: 'Travel', de: 'Reisen', fr: 'Voyage', es: 'Viajes', pt: 'Viagens', it: 'Viaggi', nl: 'Reizen', sv: 'Resor', da: 'Rejser', no: 'Reiser', fi: 'Matkailu' },
    introEn: 'Explore the world through travel-themed worksheets! Suitcases, maps, landmarks, and vehicles from around the globe create worksheets that broaden horizons while building academic skills. Perfect for geography units and multicultural education.',
    faqEn: [
      ['What travel worksheets can I create?', 'Over 30 types: counting travel items, geography word searches, coloring landmarks, matching countries, sorting by continent, and pattern activities with travel imagery.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['transportation', 'camping', 'space', 'pirates', 'ocean'],
  },
  birthday: {
    names: { en: 'Birthday', de: 'Geburtstag', fr: 'Anniversaire', es: 'Cumplea\u00f1os', pt: 'Anivers\u00e1rio', it: 'Compleanno', nl: 'Verjaardag', sv: 'F\u00f6delsedag', da: 'F\u00f8dselsdag', no: 'Bursdag', fi: 'Syntym\u00e4p\u00e4iv\u00e4' },
    introEn: 'Celebrate learning with birthday-themed worksheets! Cakes, balloons, presents, and party decorations create festive activities that children love. These worksheets are perfect for classroom birthday celebrations, party planning units, or anytime you want to add excitement to learning.',
    faqEn: [
      ['What birthday worksheets are available?', 'Over 30 types: counting candles, party word searches, coloring celebrations, matching presents, sorting by color, and party pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['toys', 'food', 'holidays', 'music', 'circus'],
  },
  circus: {
    names: { en: 'Circus', de: 'Zirkus', fr: 'Cirque', es: 'Circo', pt: 'Circo', it: 'Circo', nl: 'Circus', sv: 'Cirkus', da: 'Cirkus', no: 'Sirkus', fi: 'Sirkus' },
    introEn: 'Step right up to the greatest show in learning! Circus-themed worksheets feature clowns, acrobats, elephants, and big top tents. The colorful, exciting imagery creates high-energy worksheets that keep children engaged and motivated.',
    faqEn: [
      ['What circus worksheets can I create?', 'Over 30 types: counting circus performers, circus word searches, coloring big top scenes, matching acts, sorting by type, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['animals', 'music', 'birthday', 'toys', 'superheroes'],
  },
  forest: {
    names: { en: 'Forest', de: 'Wald', fr: 'For\u00eat', es: 'Bosque', pt: 'Floresta', it: 'Foresta', nl: 'Bos', sv: 'Skog', da: 'Skov', no: 'Skog', fi: 'Mets\u00e4' },
    introEn: 'Venture into the woodland with forest-themed worksheets! Trees, mushrooms, deer, owls, and forest creatures create a magical natural setting for learning. Forest themes develop environmental awareness while children practice counting, matching, and problem-solving.',
    faqEn: [
      ['What forest worksheets are available?', 'Over 30 types: counting forest animals, woodland word searches, coloring forest scenes, matching trees, sorting by type, and pattern recognition.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['nature', 'animals', 'camping', 'insects', 'birds'],
  },
  spring: {
    names: { en: 'Spring', de: 'Fr\u00fchling', fr: 'Printemps', es: 'Primavera', pt: 'Primavera', it: 'Primavera', nl: 'Lente', sv: 'V\u00e5r', da: 'For\u00e5r', no: 'V\u00e5r', fi: 'Kev\u00e4t' },
    introEn: 'Spring into learning with fresh, seasonal worksheets! Blooming flowers, butterflies, baby animals, and rain showers create vibrant activities that celebrate renewal and growth. Spring worksheets are perfect for the March-May period when children are ready for fresh content.',
    faqEn: [
      ['What spring worksheets can I create?', 'Over 30 types: counting spring items, flower word searches, coloring butterflies, matching baby animals, spring pattern recognition, and more.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['flowers', 'insects', 'easter', 'garden', 'nature'],
  },
  summer: {
    names: { en: 'Summer', de: 'Sommer', fr: '\u00c9t\u00e9', es: 'Verano', pt: 'Ver\u00e3o', it: 'Estate', nl: 'Zomer', sv: 'Sommar', da: 'Sommer', no: 'Sommer', fi: 'Kes\u00e4' },
    introEn: 'Keep learning alive during summer with sun-filled worksheets! Beaches, ice cream, swimming, and sunshine create vacation-themed activities that prevent summer slide. These worksheets make summer practice feel like play rather than homework.',
    faqEn: [
      ['What summer worksheets are available?', 'Over 30 types: counting summer items, beach word searches, coloring sunny scenes, matching vacation activities, summer pattern recognition, and more.'],
      ['Can they prevent summer learning loss?', 'Yes! Fun, themed worksheets keep children engaged in academic practice during breaks, helping prevent the summer slide.'],
      ['What ages?', 'Preschool through 3rd grade (ages 3-9).'],
    ],
    relatedThemes: ['ocean', 'camping', 'nature', 'food', 'travel'],
  },
};

// ── Locale-specific translation templates ──────────────────────────

const localeTemplates = {
  de: {
    titleTemplate: (name) => `Kostenlose ${name}-Arbeitsbl\u00e4tter f\u00fcr Kinder | LessonCraftStudio`,
    descTemplate: (name) => `Erstellen Sie druckbare ${name}-Arbeitsbl\u00e4tter f\u00fcr Kinder. Mathe, Lesen, Ausmalen, R\u00e4tsel und mehr. Perfekt f\u00fcr Vorschule bis 3. Klasse.`,
    keywordsTemplate: (name) => `${name} Arbeitsbl\u00e4tter, ${name} Aktivit\u00e4ten Kinder, ${name} Mathe, ${name} Ausmalbilder, druckbare ${name} Arbeitsbl\u00e4tter`,
    headingTemplate: (name) => `Kostenlose ${name}-Arbeitsbl\u00e4tter f\u00fcr Kinder`,
    introTemplate: (nameEn, nameDe) => `${nameDe} ist ein beliebtes Thema f\u00fcr junge Lernende. Unsere Arbeitsblatt-Generatoren zum Thema ${nameDe} erstellen ansprechende Mathe-, Sprach- und R\u00e4tselaufgaben mit bunten Illustrationen. Jeder Generator nutzt unsere kuratierte Bildbibliothek, um einzigartige, druckbare Arbeitsbl\u00e4tter zu erzeugen.`,
    faqGeneric: [
      [`Welche Arten von ${'{name}'}-Arbeitsbl\u00e4ttern gibt es?`, `\u00dcber 30 verschiedene Typen: Addition, Subtraktion, Wortsuchsel, Kreuzwortr\u00e4tsel, Ausmalbilder, Zuordnungsspiele und viele mehr.`],
      [`Sind die Arbeitsbl\u00e4tter kostenlos?`, `Ja! Alle Generatoren sind v\u00f6llig kostenlos. Erstellen Sie unbegrenzt Arbeitsbl\u00e4tter und laden Sie sie als PDF herunter.`],
      [`F\u00fcr welches Alter sind sie geeignet?`, `Vorschule bis 3. Klasse (3-9 Jahre).`],
    ],
  },
  fr: {
    titleTemplate: (name) => `Fiches ${name} gratuites pour enfants | LessonCraftStudio`,
    descTemplate: (name) => `Cr\u00e9ez des fiches imprimables sur le th\u00e8me ${name}. Maths, lecture, coloriage, puzzles et plus. De la maternelle au CE2.`,
    keywordsTemplate: (name) => `fiches ${name}, activit\u00e9s ${name} enfants, maths ${name}, coloriage ${name}, fiches imprimables ${name}`,
    headingTemplate: (name) => `Fiches ${name} gratuites pour enfants`,
    introTemplate: (nameEn, nameFr) => `${nameFr} est un th\u00e8me captivant pour les jeunes apprenants. Nos g\u00e9n\u00e9rateurs cr\u00e9ent des activit\u00e9s de maths, de langage et de r\u00e9flexion avec des illustrations color\u00e9es. Chaque g\u00e9n\u00e9rateur utilise notre biblioth\u00e8que d'images pour produire des fiches uniques et imprimables.`,
    faqGeneric: [
      [`Quels types de fiches ${'{name}'} sont disponibles ?`, `Plus de 30 types : additions, soustractions, mots cach\u00e9s, mots crois\u00e9s, coloriages, jeux d'association et plus.`],
      [`Les fiches sont-elles gratuites ?`, `Oui ! Tous les g\u00e9n\u00e9rateurs sont gratuits. Cr\u00e9ez des fiches illimit\u00e9es et t\u00e9l\u00e9chargez en PDF.`],
      [`Pour quel \u00e2ge ?`, `De la maternelle au CE2 (3-9 ans).`],
    ],
  },
  es: {
    titleTemplate: (name) => `Fichas de ${name} gratis para ni\u00f1os | LessonCraftStudio`,
    descTemplate: (name) => `Crea fichas imprimibles sobre ${name}. Matem\u00e1ticas, lectura, colorear, puzzles y m\u00e1s. De preescolar a 3er grado.`,
    keywordsTemplate: (name) => `fichas ${name}, actividades ${name} ni\u00f1os, matem\u00e1ticas ${name}, colorear ${name}, fichas imprimibles ${name}`,
    headingTemplate: (name) => `Fichas de ${name} gratis para ni\u00f1os`,
    introTemplate: (nameEn, nameEs) => `${nameEs} es un tema atractivo para los peque\u00f1os. Nuestros generadores crean actividades de matem\u00e1ticas, lenguaje y puzzles con coloridas ilustraciones. Cada generador utiliza nuestra biblioteca de im\u00e1genes para producir fichas \u00fanicas e imprimibles.`,
    faqGeneric: [
      [`\u00bfQu\u00e9 tipos de fichas de ${'{name}'} hay?`, `M\u00e1s de 30 tipos: sumas, restas, sopas de letras, crucigramas, colorear, juegos de emparejamiento y m\u00e1s.`],
      [`\u00bfSon gratis?`, `\u00a1S\u00ed! Todos los generadores son completamente gratis.`],
      [`\u00bfPara qu\u00e9 edades?`, `De preescolar a 3er grado (3-9 a\u00f1os).`],
    ],
  },
  pt: {
    titleTemplate: (name) => `Atividades de ${name} gr\u00e1tis para crian\u00e7as | LessonCraftStudio`,
    descTemplate: (name) => `Crie atividades imprim\u00edveis sobre ${name}. Matem\u00e1tica, leitura, colorir, quebra-cabe\u00e7as e mais.`,
    keywordsTemplate: (name) => `atividades ${name}, ${name} crian\u00e7as, matem\u00e1tica ${name}, colorir ${name}`,
    headingTemplate: (name) => `Atividades de ${name} gr\u00e1tis para crian\u00e7as`,
    introTemplate: (nameEn, namePt) => `${namePt} \u00e9 um tema envolvente para jovens aprendizes. Nossos geradores criam atividades de matem\u00e1tica, linguagem e quebra-cabe\u00e7as com ilustra\u00e7\u00f5es coloridas.`,
    faqGeneric: [
      [`Que tipos de atividades de ${'{name}'} existem?`, `Mais de 30 tipos: adi\u00e7\u00e3o, subtra\u00e7\u00e3o, ca\u00e7a-palavras, palavras cruzadas, colorir e jogos de correspond\u00eancia.`],
      [`S\u00e3o gratuitas?`, `Sim! Todos os geradores s\u00e3o gratuitos.`],
      [`Para que idades?`, `Da pr\u00e9-escola ao 3\u00ba ano (3-9 anos).`],
    ],
  },
  it: {
    titleTemplate: (name) => `Schede ${name} gratis per bambini | LessonCraftStudio`,
    descTemplate: (name) => `Crea schede stampabili sul tema ${name}. Matematica, lettura, colorare, puzzle e altro.`,
    keywordsTemplate: (name) => `schede ${name}, attivit\u00e0 ${name} bambini, matematica ${name}, colorare ${name}`,
    headingTemplate: (name) => `Schede ${name} gratis per bambini`,
    introTemplate: (nameEn, nameIt) => `${nameIt} \u00e8 un tema coinvolgente per i giovani studenti. I nostri generatori creano attivit\u00e0 di matematica, linguaggio e puzzle con illustrazioni colorate.`,
    faqGeneric: [
      [`Quali schede ${'{name}'} sono disponibili?`, `Oltre 30 tipi: addizioni, sottrazioni, cerca parole, cruciverba, colorare e giochi di abbinamento.`],
      [`Sono gratuite?`, `S\u00ec! Tutti i generatori sono gratuiti.`],
      [`Per quali et\u00e0?`, `Dalla scuola materna alla terza elementare (3-9 anni).`],
    ],
  },
  nl: {
    titleTemplate: (name) => `Gratis ${name}-werkbladen voor kinderen | LessonCraftStudio`,
    descTemplate: (name) => `Maak printbare werkbladen met ${name}-thema. Rekenen, lezen, kleuren, puzzels en meer.`,
    keywordsTemplate: (name) => `${name} werkbladen, ${name} activiteiten kinderen, ${name} rekenen, ${name} kleurplaten`,
    headingTemplate: (name) => `Gratis ${name}-werkbladen voor kinderen`,
    introTemplate: (nameEn, nameNl) => `${nameNl} is een boeiend thema voor jonge leerlingen. Onze generatoren maken reken-, taal- en puzzelactiviteiten met kleurrijke illustraties.`,
    faqGeneric: [
      [`Welke ${'{name}'}-werkbladen zijn er?`, `Meer dan 30 soorten: optellen, aftrekken, woordzoekers, kruiswoordpuzzels, kleurplaten en koppelspellen.`],
      [`Zijn ze gratis?`, `Ja! Alle generatoren zijn volledig gratis.`],
      [`Voor welke leeftijden?`, `Van kleuters tot groep 5 (3-9 jaar).`],
    ],
  },
  sv: {
    titleTemplate: (name) => `Gratis ${name}-arbetsblad f\u00f6r barn | LessonCraftStudio`,
    descTemplate: (name) => `Skapa utskrivbara arbetsblad med ${name}-tema. Matte, l\u00e4sning, m\u00e5lning, pussel och mer.`,
    keywordsTemplate: (name) => `${name} arbetsblad, ${name} aktiviteter barn, ${name} matte, ${name} m\u00e5larbilder`,
    headingTemplate: (name) => `Gratis ${name}-arbetsblad f\u00f6r barn`,
    introTemplate: (nameEn, nameSv) => `${nameSv} \u00e4r ett engagerande \u00e4mne f\u00f6r unga elever. V\u00e5ra generatorer skapar matte-, spr\u00e5k- och pusselaktiviteter med f\u00e4rgglada illustrationer.`,
    faqGeneric: [
      [`Vilka ${'{name}'}-arbetsblad finns?`, `\u00d6ver 30 typer: addition, subtraktion, ordletar, korsord, m\u00e5larbilder och matchningsspel.`],
      [`\u00c4r de gratis?`, `Ja! Alla generatorer \u00e4r helt gratis.`],
      [`F\u00f6r vilka \u00e5ldrar?`, `F\u00f6rskolan till \u00e5rskurs 3 (3-9 \u00e5r).`],
    ],
  },
  da: {
    titleTemplate: (name) => `Gratis ${name}-arbejdsark til b\u00f8rn | LessonCraftStudio`,
    descTemplate: (name) => `Opret printbare arbejdsark med ${name}-tema. Matematik, l\u00e6sning, tegning, puslespil og mere.`,
    keywordsTemplate: (name) => `${name} arbejdsark, ${name} aktiviteter b\u00f8rn, ${name} matematik, ${name} tegnesider`,
    headingTemplate: (name) => `Gratis ${name}-arbejdsark til b\u00f8rn`,
    introTemplate: (nameEn, nameDa) => `${nameDa} er et engagerende emne for unge elever. Vores generatorer skaber matematik-, sprog- og puslespilsaktiviteter med farverige illustrationer.`,
    faqGeneric: [
      [`Hvilke ${'{name}'}-arbejdsark er der?`, `Over 30 typer: addition, subtraktion, ords\u00f8gninger, krydsord, tegnesider og parspil.`],
      [`Er de gratis?`, `Ja! Alle generatorer er helt gratis.`],
      [`Til hvilke aldersgrupper?`, `B\u00f8rnehave til 3. klasse (3-9 \u00e5r).`],
    ],
  },
  no: {
    titleTemplate: (name) => `Gratis ${name}-arbeidsark for barn | LessonCraftStudio`,
    descTemplate: (name) => `Lag utskrivbare arbeidsark med ${name}-tema. Matte, lesing, tegning, puslespill og mer.`,
    keywordsTemplate: (name) => `${name} arbeidsark, ${name} aktiviteter barn, ${name} matte, ${name} tegnesider`,
    headingTemplate: (name) => `Gratis ${name}-arbeidsark for barn`,
    introTemplate: (nameEn, nameNo) => `${nameNo} er et engasjerende tema for unge elever. V\u00e5re generatorer lager matte-, spr\u00e5k- og puslespillaktiviteter med fargerike illustrasjoner.`,
    faqGeneric: [
      [`Hvilke ${'{name}'}-arbeidsark finnes?`, `Over 30 typer: addisjon, subtraksjon, ords\u00f8k, kryssord, tegnesider og parspill.`],
      [`Er de gratis?`, `Ja! Alle generatorer er helt gratis.`],
      [`For hvilke aldersgrupper?`, `Barnehage til 3. klasse (3-9 \u00e5r).`],
    ],
  },
  fi: {
    titleTemplate: (name) => `Ilmaiset ${name}-ty\u00f6lehdet lapsille | LessonCraftStudio`,
    descTemplate: (name) => `Luo tulostettavia ${name}-aiheisia ty\u00f6lehti\u00e4. Matematiikkaa, lukemista, v\u00e4ritt\u00e4mist\u00e4, pulmia ja lis\u00e4\u00e4.`,
    keywordsTemplate: (name) => `${name} ty\u00f6lehdet, ${name} teht\u00e4v\u00e4t lapsille, ${name} matikka, ${name} v\u00e4rityssivut`,
    headingTemplate: (name) => `Ilmaiset ${name}-ty\u00f6lehdet lapsille`,
    introTemplate: (nameEn, nameFi) => `${nameFi} on kiinnostava aihe nuorille oppijoille. Generaattorimme luovat matikka-, kieli- ja pulmateht\u00e4vi\u00e4 v\u00e4rikk\u00e4ill\u00e4 kuvituksilla.`,
    faqGeneric: [
      [`Mitk\u00e4 ${'{name}'}-ty\u00f6lehdet ovat saatavilla?`, `Yli 30 tyyppi\u00e4: yhteenlasku, v\u00e4hennyslasku, sananhaku, ristikot, v\u00e4rityssivut ja yhdist\u00e4misteht\u00e4v\u00e4t.`],
      [`Ovatko ne ilmaisia?`, `Kyll\u00e4! Kaikki generaattorit ovat ilmaisia.`],
      [`Mille ik\u00e4ryhmille?`, `Esikoulusta 3. luokkaan (3-9 vuotta).`],
    ],
  },
};

// ── Generate the content ───────────────────────────────────────────

function generateLocaleContent(themeId, theme, locale) {
  const name = theme.names[locale] || theme.names.en;
  const template = localeTemplates[locale];
  if (!template) return null; // English handled separately

  const faq = template.faqGeneric.map(([q, a]) => ({
    question: q.replace('{name}', name),
    answer: a.replace('{name}', name),
  }));

  return {
    name,
    title: template.titleTemplate(name),
    description: template.descTemplate(name),
    keywords: template.keywordsTemplate(name),
    heading: template.headingTemplate(name),
    intro: template.introTemplate(theme.names.en, name),
    appIds: 'ALL_APPS',
    faq,
    relatedThemes: theme.relatedThemes,
  };
}

function generateEnglishContent(themeId, theme) {
  const name = theme.names.en;
  return {
    name,
    title: `Free ${name} Worksheets for Kids | LessonCraftStudio`,
    description: `Create printable ${name.toLowerCase()}-themed worksheets for kids. Math, reading, coloring, puzzles and more. Perfect for preschool through 3rd grade.`,
    keywords: `${name.toLowerCase()} worksheets, ${name.toLowerCase()} activities for kids, ${name.toLowerCase()} math worksheets, ${name.toLowerCase()} coloring pages, printable ${name.toLowerCase()} worksheets`,
    heading: `Free ${name} Worksheets for Kids`,
    intro: theme.introEn,
    appIds: 'ALL_APPS',
    faq: theme.faqEn.map(([q, a]) => ({ question: q, answer: a })),
    relatedThemes: theme.relatedThemes,
  };
}

// ── Build the full output ──────────────────────────────────────────

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function indent(level) {
  return '  '.repeat(level);
}

function fmtFaq(faq, level) {
  const items = faq.map(f =>
    `${indent(level)}{ question: '${escapeStr(f.question)}', answer: '${escapeStr(f.answer)}' }`
  );
  return `[\n${items.join(',\n')},\n${indent(level - 1)}]`;
}

function fmtRelated(arr, level) {
  return `[${arr.map(r => `'${r}'`).join(', ')}]`;
}

function fmtLocaleBlock(content, level) {
  const lines = [];
  lines.push(`${indent(level)}name: '${escapeStr(content.name)}',`);
  lines.push(`${indent(level)}title: '${escapeStr(content.title)}',`);
  lines.push(`${indent(level)}description: '${escapeStr(content.description)}',`);
  lines.push(`${indent(level)}keywords: '${escapeStr(content.keywords)}',`);
  lines.push(`${indent(level)}heading: '${escapeStr(content.heading)}',`);
  lines.push(`${indent(level)}intro: '${escapeStr(content.intro)}',`);
  lines.push(`${indent(level)}appIds: ALL_APPS,`);
  lines.push(`${indent(level)}faq: ${fmtFaq(content.faq, level + 1)},`);
  lines.push(`${indent(level)}relatedThemes: ${fmtRelated(content.relatedThemes, level)},`);
  return lines.join('\n');
}

// Build complete file
let output = `/**
 * Theme Landing Page Content
 *
 * Content for /[locale]/worksheets/[theme]/ pages.
 * Each theme has localized SEO metadata, intro text, FAQ, and app mappings.
 *
 * AUTO-GENERATED by scripts/generate-theme-content.js
 * To regenerate: node scripts/generate-theme-content.js
 */

// ── Types ─────────────────────────────────────────────────────────

export interface ThemePageContent {
  name: string;
  title: string;
  description: string;
  keywords: string;
  heading: string;
  intro: string;
  appIds: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedThemes: string[];
}

export type ThemeContentMap = Record<string, Record<string, ThemePageContent>>;

// ── All 33 App IDs ────────────────────────────────────────────────

const ALL_APPS = [
  'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
  'math-puzzle', 'more-less', 'subtraction', 'alphabet-train', 'word-scramble',
  'prepositions', 'writing-app', 'word-search', 'image-crossword', 'word-guess',
  'coloring', 'draw-and-color', 'sudoku', 'image-cryptogram', 'odd-one-out',
  'picture-path', 'find-and-count', 'find-objects', 'missing-pieces',
  'matching-app', 'grid-match', 'shadow-match', 'picture-sort', 'drawing-lines',
  'pattern-train', 'pattern-worksheet', 'picture-bingo', 'big-small-app',
  'treasure-hunt',
];

// ── Theme Content ─────────────────────────────────────────────────

export const themeContent: ThemeContentMap = {\n`;

const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const themeIds = Object.keys(themes);

for (let t = 0; t < themeIds.length; t++) {
  const themeId = themeIds[t];
  const theme = themes[themeId];

  output += `  '${themeId}': {\n`;

  for (const locale of locales) {
    let content;
    if (locale === 'en') {
      content = generateEnglishContent(themeId, theme);
    } else {
      content = generateLocaleContent(themeId, theme, locale);
    }
    if (!content) continue;

    output += `    ${locale}: {\n`;
    output += fmtLocaleBlock(content, 3);
    output += `\n    },\n`;
  }

  output += `  },\n`;
}

output += `};

// ── Helper: Get content for a theme + locale (with English fallback) ──

export function getThemeContent(themeId: string, locale: string): ThemePageContent | undefined {
  return themeContent[themeId]?.[locale] ?? themeContent[themeId]?.en;
}

export function getThemeIds(): string[] {
  return Object.keys(themeContent);
}
`;

// Write to file
const outPath = path.join(__dirname, '..', 'frontend', 'config', 'theme-page-content.ts');
fs.writeFileSync(outPath, output, 'utf-8');
console.log(`Generated ${themeIds.length} themes x ${locales.length} locales = ${themeIds.length * locales.length} entries`);
console.log(`Written to: ${outPath}`);
