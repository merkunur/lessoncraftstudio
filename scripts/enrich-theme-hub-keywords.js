#!/usr/bin/env node
/**
 * Part 5: Enrich theme hub keywords with LSI keywords, question keywords, and SERP analysis.
 *
 * Reads docs/seo-keywords/en-theme-hubs.md and injects enrichment data
 * after each theme's "Unique Differentiator" line.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-theme-hubs.md');

// ─── Enrichment data for all 50 themes ───────────────────────────────────────

const enrichments = {
  // Theme 1: Animals
  'animals': {
    lsi: ['habitat', 'species', 'mammal', 'life cycle', 'wildlife', 'vertebrate', 'endangered', 'adaptation', 'predator', 'migration'],
    questions: [
      'What are the best animal worksheets for kindergarten?',
      'How do animal-themed activities help kids learn?',
      'What animals are easiest for preschoolers to learn about?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 2: Food
  'food': {
    lsi: ['nutrition', 'food group', 'dietary', 'calorie', 'protein', 'vitamin', 'portion', 'meal planning', 'balanced diet', 'whole grain'],
    questions: [
      'How do food worksheets teach healthy eating?',
      'What food groups should kids learn about first?',
      'How to make nutrition fun for preschoolers?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 3: Transportation
  'transportation': {
    lsi: ['locomotive', 'aviation', 'freight', 'commute', 'navigation', 'propulsion', 'traffic', 'railway', 'maritime', 'cargo'],
    questions: [
      'What vehicle worksheets work best for toddlers?',
      'How do transportation themes help kids learn vocabulary?',
      'What types of vehicles should preschoolers know?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 4: Nature
  'nature': {
    lsi: ['ecosystem', 'biodiversity', 'photosynthesis', 'habitat', 'conservation', 'food chain', 'pollination', 'decomposer', 'biome', 'organism'],
    questions: [
      'How do nature worksheets support science learning?',
      'What outdoor activities help preschoolers learn?',
      'How to teach kids about habitats and ecosystems?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 5: School
  'school': {
    lsi: ['curriculum', 'readiness', 'social skills', 'routine', 'classroom management', 'attendance', 'recess', 'homework', 'report card', 'school bus'],
    questions: [
      'How to prepare a child for the first day of school?',
      'What school readiness skills should kids have by age 5?',
      'How do classroom worksheets help with back-to-school transitions?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'PAA, Featured Snippet'
  },

  // Theme 6: Sports
  'sports': {
    lsi: ['teamwork', 'sportsmanship', 'athletics', 'physical fitness', 'endurance', 'coordination', 'referee', 'tournament', 'warm-up', 'stamina'],
    questions: [
      'How do sports-themed worksheets motivate reluctant learners?',
      'What sports concepts can preschoolers understand?',
      'How to combine physical education with printable activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 7: Emotions
  'emotions': {
    lsi: ['self-regulation', 'empathy', 'emotional intelligence', 'social-emotional', 'coping strategy', 'mindfulness', 'self-awareness', 'emotional literacy', 'resilience', 'temperament'],
    questions: [
      'How do feelings worksheets help kids manage emotions?',
      'What SEL activities work best for kindergarten?',
      'How to teach empathy to preschoolers with worksheets?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'PAA, Featured Snippet, Video'
  },

  // Theme 8: Body
  'body': {
    lsi: ['anatomy', 'skeletal', 'muscular', 'digestive', 'respiratory', 'organ', 'hygiene', 'nervous system', 'circulation', 'immune system'],
    questions: [
      'What body parts should preschoolers learn first?',
      'How to teach the five senses with worksheets?',
      'What age should kids learn human body basics?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 9: Clothing
  'clothing': {
    lsi: ['fabric', 'garment', 'seasonal attire', 'wardrobe', 'textile', 'fastener', 'weather-appropriate', 'uniform', 'accessory', 'laundry'],
    questions: [
      'How do clothing worksheets teach seasonal awareness?',
      'What dressing skills should kindergartners master?',
      'How to use clothing themes to teach sorting and categorizing?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 10: Household
  'household': {
    lsi: ['appliance', 'furnishing', 'domestic', 'chore', 'room layout', 'household item', 'interior', 'utensil', 'fixture', 'maintenance'],
    questions: [
      'How do household worksheets teach spatial concepts?',
      'What household vocabulary should preschoolers learn?',
      'How to use home-themed activities for kindergarten readiness?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 11: Toys
  'toys': {
    lsi: ['play-based learning', 'manipulative', 'imaginative play', 'building block', 'board game', 'stuffed animal', 'action figure', 'playtime', 'toy store', 'toy chest'],
    questions: [
      'How do toy-themed worksheets support play-based learning?',
      'What counting activities work with a toy theme?',
      'How to use toys as a math teaching tool for preschoolers?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 12: Music
  'music': {
    lsi: ['rhythm', 'melody', 'tempo', 'percussion', 'orchestra', 'notation', 'pitch', 'harmony', 'beat', 'acoustic'],
    questions: [
      'How do music worksheets support early math skills?',
      'What instruments should kindergartners learn about?',
      'How to teach rhythm and patterns through music activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA, Video'
  },

  // Theme 13: Jobs
  'jobs': {
    lsi: ['occupation', 'career', 'profession', 'public servant', 'first responder', 'workplace', 'vocation', 'trade', 'labor', 'civil service'],
    questions: [
      'How do community helper worksheets build social awareness?',
      'What jobs should preschoolers learn about?',
      'How to teach career awareness to kindergarten students?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 14: Space
  'space': {
    lsi: ['astronomy', 'constellation', 'orbit', 'gravity', 'solar system', 'galaxy', 'satellite', 'telescope', 'lunar', 'cosmic'],
    questions: [
      'How do space worksheets teach science to young kids?',
      'What planets should preschoolers learn first?',
      'How to make the solar system fun for kindergartners?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet, Video'
  },

  // Theme 15: Seasons
  'seasons': {
    lsi: ['equinox', 'solstice', 'deciduous', 'evergreen', 'dormancy', 'migration', 'harvest', 'temperature', 'daylight', 'climate'],
    questions: [
      'How to teach the four seasons to preschoolers?',
      'What seasonal changes should kindergartners observe?',
      'How do seasons worksheets connect to science standards?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 16: Holidays
  'holidays': {
    lsi: ['celebration', 'tradition', 'cultural', 'festivity', 'custom', 'commemoration', 'ceremony', 'heritage', 'observance', 'multicultural'],
    questions: [
      'How to teach kids about different cultural holidays?',
      'What multicultural holiday activities work for kindergarten?',
      'How do holiday worksheets support cultural awareness?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 17: Weather
  'weather': {
    lsi: ['precipitation', 'barometer', 'humidity', 'forecast', 'thermometer', 'atmosphere', 'condensation', 'evaporation', 'meteorology', 'wind speed'],
    questions: [
      'How to teach weather concepts to kindergartners?',
      'What weather vocabulary should preschoolers know?',
      'How do weather worksheets support early science learning?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 18: Colors
  'colors': {
    lsi: ['primary color', 'secondary color', 'hue', 'shade', 'tint', 'pigment', 'spectrum', 'warm color', 'cool color', 'color wheel'],
    questions: [
      'How to teach color recognition to preschoolers?',
      'What age should children know their colors?',
      'How do color mixing activities support learning?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 19: Shapes
  'shapes': {
    lsi: ['polygon', 'symmetry', 'angle', 'perimeter', 'vertex', 'congruent', 'tessellation', 'geometric', 'dimension', 'spatial'],
    questions: [
      'How to teach shapes to preschoolers effectively?',
      'What 2D shapes should kindergartners know?',
      'How do shape worksheets build early geometry skills?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 20: Numbers
  'numbers': {
    lsi: ['numeral', 'cardinality', 'ordinality', 'subitizing', 'one-to-one correspondence', 'number line', 'quantity', 'digit', 'place value', 'counting sequence'],
    questions: [
      'How to teach number recognition to preschoolers?',
      'What numbers should kindergartners count to?',
      'How do number worksheets build math readiness?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 21: Alphabet
  'alphabet': {
    lsi: ['phoneme', 'grapheme', 'consonant', 'vowel', 'letter formation', 'alphabetic principle', 'print awareness', 'letter-sound', 'manuscript', 'penmanship'],
    questions: [
      'How to teach the alphabet to preschoolers?',
      'What letter order should kids learn first?',
      'How do alphabet worksheets support early reading?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet, Video'
  },

  // Theme 22: Furniture
  'furniture': {
    lsi: ['upholstery', 'cabinet', 'shelving', 'interior design', 'ergonomic', 'decor', 'drawer', 'cushion', 'bookcase', 'desk'],
    questions: [
      'How do furniture worksheets teach spatial vocabulary?',
      'What room vocabulary should preschoolers learn?',
      'How to use furniture themes to teach size and position?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 23: Easter
  'easter': {
    lsi: ['pastel', 'spring equinox', 'egg hunt', 'basket', 'bunny', 'chick', 'bonnet', 'jelly bean', 'egg decorating', 'spring bloom'],
    questions: [
      'What Easter activities help preschoolers learn?',
      'How to use Easter egg hunts for educational purposes?',
      'What Easter worksheets work best for kindergarten?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 24: Halloween
  'halloween': {
    lsi: ['costume', 'jack-o-lantern', 'trick-or-treat', 'haunted', 'cobweb', 'cauldron', 'scarecrow', 'moonlight', 'candy corn', 'spooky'],
    questions: [
      'What Halloween worksheets are appropriate for preschoolers?',
      'How do Halloween activities make learning fun for kids?',
      'What age-appropriate Halloween printables work for kindergarten?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 25: Christmas
  'xmas': {
    lsi: ['ornament', 'wreath', 'nutcracker', 'advent', 'tinsel', 'gingerbread', 'stocking', 'mistletoe', 'yuletide', 'caroling'],
    questions: [
      'What Christmas worksheets help kids learn math?',
      'How to keep kids learning during the holiday season?',
      'What Christmas printables work for preschool classrooms?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet, Video'
  },

  // Theme 26: Birds
  'birds': {
    lsi: ['avian', 'plumage', 'migration', 'nesting', 'ornithology', 'beak', 'wingspan', 'fledgling', 'perch', 'birdsong'],
    questions: [
      'How do bird worksheets teach life science to kids?',
      'What birds are easiest for preschoolers to identify?',
      'How to teach bird habitats and migration to kindergartners?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 27: Birthday
  'birthday': {
    lsi: ['celebration', 'candle', 'invitation', 'party favor', 'guest list', 'wrapping paper', 'milestone', 'wish', 'balloon', 'confetti'],
    questions: [
      'How do birthday worksheets teach counting and math?',
      'What birthday activities work for preschool classrooms?',
      'How to use birthday themes for classroom celebrations?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 28: Camping
  'camping': {
    lsi: ['campsite', 'trail', 'compass', 'marshmallow', 'sleeping bag', 'lantern', 'firewood', 'wilderness', 'backpack', 'stargazing'],
    questions: [
      'What camping worksheets help kids learn about nature?',
      'How to use a camping theme for outdoor education?',
      'What camping vocabulary should preschoolers learn?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 29: Circus
  'circus': {
    lsi: ['acrobat', 'ringmaster', 'trapeze', 'tightrope', 'juggler', 'big top', 'carnival', 'showtime', 'performer', 'spotlight'],
    questions: [
      'How do circus worksheets teach counting and patterns?',
      'What circus vocabulary is appropriate for preschoolers?',
      'How to make a circus-themed learning unit for kindergarten?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 30: Construction
  'construction': {
    lsi: ['blueprint', 'excavator', 'scaffold', 'foundation', 'hard hat', 'bulldozer', 'crane', 'concrete', 'steel beam', 'safety vest'],
    questions: [
      'How do construction worksheets teach STEM concepts?',
      'What construction vocabulary should kindergartners learn?',
      'How to use a construction theme for hands-on math learning?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 31: Cooking
  'cooking': {
    lsi: ['recipe', 'ingredient', 'measuring cup', 'tablespoon', 'oven', 'stir', 'whisk', 'batter', 'kitchen safety', 'food preparation'],
    questions: [
      'How do cooking worksheets teach measurement to kids?',
      'What kitchen vocabulary should preschoolers know?',
      'How to combine cooking and math for kindergartners?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 32: Dinosaurs
  'dinosaurs': {
    lsi: ['paleontology', 'fossil', 'extinction', 'Jurassic', 'Cretaceous', 'herbivore', 'carnivore', 'excavation', 'skeleton', 'prehistoric'],
    questions: [
      'How do dinosaur worksheets support science learning?',
      'What dinosaurs are best for teaching preschoolers?',
      'How to teach dinosaur facts through worksheets and activities?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet, Video'
  },

  // Theme 33: Fairy Tales
  'fairy-tales': {
    lsi: ['narrative', 'protagonist', 'enchantment', 'fable', 'folklore', 'moral', 'kingdom', 'quest', 'storytelling', 'character'],
    questions: [
      'How do fairy tale worksheets support reading comprehension?',
      'What fairy tales are best for kindergarten classrooms?',
      'How to teach story sequencing with fairy tale activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 34: Farm
  'farm': {
    lsi: ['agriculture', 'livestock', 'harvest', 'crop', 'barnyard', 'silo', 'pasture', 'orchard', 'irrigation', 'tractor'],
    questions: [
      'How do farm worksheets teach science to preschoolers?',
      'What farm animals should kindergartners learn about?',
      'How to use farm themes for cross-curricular learning?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 35: Flowers
  'flowers': {
    lsi: ['petal', 'stem', 'pollen', 'germination', 'bloom', 'bouquet', 'seedling', 'photosynthesis', 'root system', 'nectar'],
    questions: [
      'How do flower worksheets teach plant life cycles?',
      'What flower vocabulary should preschoolers learn?',
      'How to use flower themes for spring science activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 36: Forest
  'forest': {
    lsi: ['canopy', 'undergrowth', 'deciduous', 'coniferous', 'woodland creature', 'forest floor', 'tree bark', 'moss', 'fern', 'wildlife trail'],
    questions: [
      'How do forest worksheets teach ecology to young kids?',
      'What woodland animals should preschoolers learn about?',
      'How to create a forest-themed science unit for kindergarten?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 37: Fruits
  'fruits': {
    lsi: ['citrus', 'tropical', 'berry', 'orchard', 'ripe', 'seed', 'juice', 'harvest', 'seasonal fruit', 'organic'],
    questions: [
      'How do fruit worksheets teach nutrition to preschoolers?',
      'What fruits should kindergartners be able to identify?',
      'How to use fruit themes to teach sorting and counting?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 38: Garden
  'garden': {
    lsi: ['compost', 'trowel', 'mulch', 'seedbed', 'fertilizer', 'greenhouse', 'raised bed', 'watering can', 'pruning', 'germination'],
    questions: [
      'How do garden worksheets teach responsibility to kids?',
      'What gardening vocabulary should preschoolers learn?',
      'How to use a garden theme for spring learning activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 39: Insects
  'insects': {
    lsi: ['entomology', 'metamorphosis', 'larva', 'chrysalis', 'antenna', 'exoskeleton', 'pollinator', 'colony', 'thorax', 'compound eye'],
    questions: [
      'How do insect worksheets teach the life cycle to kids?',
      'What bugs are best for preschool science lessons?',
      'How to teach butterfly metamorphosis with worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 40: Ocean
  'ocean': {
    lsi: ['marine', 'coral', 'tide', 'plankton', 'seabed', 'current', 'estuary', 'kelp', 'bioluminescence', 'shoreline'],
    questions: [
      'How do ocean worksheets teach marine science to kids?',
      'What sea creatures should preschoolers learn about?',
      'How to create an ocean-themed learning unit for kindergarten?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 41: Pets
  'pets': {
    lsi: ['veterinarian', 'grooming', 'leash', 'kennel', 'aquarium', 'feeding schedule', 'pet adoption', 'domestic', 'companionship', 'cage'],
    questions: [
      'How do pet worksheets teach responsibility to kids?',
      'What pet care concepts should preschoolers understand?',
      'How to use a pet theme for social-emotional learning?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 42: Pirates
  'pirates': {
    lsi: ['treasure', 'compass', 'anchor', 'plank', 'skull and crossbones', 'captain', 'galleon', 'parrot', 'island', 'cannon'],
    questions: [
      'How do pirate worksheets make math fun for kids?',
      'What pirate vocabulary is appropriate for preschoolers?',
      'How to create a pirate-themed learning adventure for kindergarten?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 43: Robots
  'robots': {
    lsi: ['circuit', 'sensor', 'algorithm', 'automation', 'mechanical', 'programming', 'artificial intelligence', 'gear', 'servo', 'processor'],
    questions: [
      'How do robot worksheets introduce STEM concepts to kids?',
      'What coding basics can kindergartners learn through worksheets?',
      'How to use a robot theme for early technology education?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA, Video'
  },

  // Theme 44: Spring
  'spring': {
    lsi: ['blossom', 'renewal', 'thaw', 'sprout', 'pollination', 'rainfall', 'nest building', 'green growth', 'dew', 'vernal'],
    questions: [
      'What spring worksheets help preschoolers learn about nature?',
      'How to teach seasonal changes in spring to kindergartners?',
      'What spring science activities work for early learners?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 45: Summer
  'summer': {
    lsi: ['vacation', 'sunscreen', 'swimming pool', 'sandcastle', 'popsicle', 'flip-flop', 'barbecue', 'lemonade', 'heatwave', 'daylight'],
    questions: [
      'How to prevent summer learning loss with worksheets?',
      'What summer activities keep kids learning during break?',
      'How do summer worksheets help with back-to-school readiness?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 46: Superheroes
  'superheroes': {
    lsi: ['sidekick', 'superpower', 'cape', 'mask', 'villain', 'shield', 'headquarters', 'mission', 'alter ego', 'rescue'],
    questions: [
      'How do superhero worksheets motivate reluctant learners?',
      'What superhero activities work for preschool classrooms?',
      'How to use a superhero theme to build reading confidence?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 47: Travel
  'travel': {
    lsi: ['passport', 'destination', 'itinerary', 'landmark', 'continent', 'globe', 'compass rose', 'cultural exchange', 'souvenir', 'expedition'],
    questions: [
      'How do travel worksheets teach geography to kids?',
      'What countries should preschoolers learn about first?',
      'How to introduce world cultures through travel-themed activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 48: Vegetables
  'vegetables': {
    lsi: ['root vegetable', 'leafy green', 'legume', 'garden harvest', 'fiber', 'nutrient', 'organic', 'sprout', 'husk', 'stalk'],
    questions: [
      'How do vegetable worksheets encourage healthy eating?',
      'What vegetables should preschoolers be able to identify?',
      'How to make vegetables fun for picky eaters through activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // Theme 49: Winter
  'winter': {
    lsi: ['frost', 'blizzard', 'hibernation', 'icicle', 'snowflake', 'tundra', 'frostbite', 'windchill', 'sleet', 'polar'],
    questions: [
      'What winter worksheets teach science concepts to kids?',
      'How to teach hibernation and winter adaptations to preschoolers?',
      'What winter activities prevent learning loss during cold months?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // Theme 50: Zoo
  'zoo': {
    lsi: ['exhibit', 'enclosure', 'zookeeper', 'conservation', 'safari', 'aviary', 'aquarium', 'feeding time', 'endangered species', 'field trip'],
    questions: [
      'How do zoo worksheets prepare kids for field trips?',
      'What zoo animals are most engaging for preschoolers?',
      'How to use a zoo theme for cross-curricular kindergarten learning?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  }
};

// ─── Main logic ──────────────────────────────────────────────────────────────

function buildEnrichmentBlock(data) {
  let block = '\n';
  block += '**LSI Keywords (10):**\n';
  data.lsi.forEach((term, i) => {
    block += `${i + 1}. ${term}\n`;
  });
  block += '\n';
  block += '**Question Keywords (3):**\n';
  data.questions.forEach((q, i) => {
    block += `${i + 1}. ${q}\n`;
  });
  block += '\n';
  block += '| Metric | Value |\n';
  block += '|--------|-------|\n';
  block += `| **Search Volume** | ${data.volume} |\n`;
  block += `| **Competition** | ${data.competition} |\n`;
  block += `| **SERP Features** | ${data.serp} |\n`;
  return block;
}

function main() {
  let content = fs.readFileSync(FILE, 'utf8');

  // Update header to reference LANDING PAGE SEO PERFECTION plan
  content = content.replace(
    /^# English Theme Hub Pages - Keyword Map\n\n>.*?\n>.*?\n>.*$/m,
    `# English Theme Hub Pages - Keyword Map

> Parts 4-5 of the ONE CLICK A DAY SEO plan (primary keywords, secondary keywords, titles, descriptions).
> Part 5 of the LANDING PAGE SEO PERFECTION plan (LSI keywords, question keywords, SERP analysis).
>
> This document maps unique primary keywords, optimized titles, descriptions, H1s, secondary keywords,
> LSI keywords, question keywords, and SERP analysis for all 50 English theme hub pages.`
  );

  // Update footer
  content = content.replace(
    /\*Document created:.*\n\*All 50 theme hub pages mapped with unique primary keywords\.\*\n\*Parts 22-31 will use this map to edit the actual theme content files\.\*/,
    `*Document created: Parts 4-5 of ONE CLICK A DAY SEO (primary/secondary keywords)*
*Part 5 of LANDING PAGE SEO PERFECTION (LSI keywords, question keywords, SERP analysis)*
*All 50 theme hub pages fully enriched with keyword and SERP data.*`
  );

  // For each theme, find "**Unique Differentiator:**" line and append enrichment after it
  let enrichedCount = 0;

  for (const [slug, data] of Object.entries(enrichments)) {
    // Find the Unique Differentiator line for this theme
    // Match the line starting with **Unique Differentiator:** and capture to end of line
    // We need to match based on the theme number/slug context

    // Strategy: find all "**Unique Differentiator:**" lines, and match them in order
    // Better: find the theme heading, then find its Unique Differentiator
    const themeHeadingPattern = new RegExp(
      `(### \\d+\\. [^\\n]+ \\(\`${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`\\)[\\s\\S]*?\\*\\*Unique Differentiator:\\*\\*[^\\n]+)`,
      ''
    );

    const match = content.match(themeHeadingPattern);
    if (match) {
      const original = match[1];
      const enrichmentBlock = buildEnrichmentBlock(data);
      content = content.replace(original, original + '\n' + enrichmentBlock);
      enrichedCount++;
    } else {
      console.error(`WARNING: Could not find theme "${slug}" in the document!`);
    }
  }

  fs.writeFileSync(FILE, content, 'utf8');

  // ─── Verification ────────────────────────────────────────────────────────
  const finalContent = fs.readFileSync(FILE, 'utf8');

  const lsiCount = (finalContent.match(/\*\*LSI Keywords \(10\):\*\*/g) || []).length;
  const questionCount = (finalContent.match(/\*\*Question Keywords \(3\):\*\*/g) || []).length;
  const serpCount = (finalContent.match(/\*\*SERP Features\*\*/g) || []).length;

  // Check for forbidden terms in LSI keywords
  const lsiSections = finalContent.match(/\*\*LSI Keywords \(10\):\*\*\n([\s\S]*?)(?=\n\*\*Question Keywords)/g) || [];
  let forbiddenFound = 0;
  for (const section of lsiSections) {
    if (/\bgenerator\b/i.test(section) || /\bmaker\b/i.test(section)) {
      forbiddenFound++;
      console.error('FORBIDDEN: LSI section contains "generator" or "maker":', section.substring(0, 100));
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('  Part 5 - Theme Hub Enrichment Results');
  console.log('═══════════════════════════════════════════');
  console.log(`Themes enriched:       ${enrichedCount}/50`);
  console.log(`LSI sections found:    ${lsiCount}/50`);
  console.log(`Question sections:     ${questionCount}/50`);
  console.log(`SERP tables:           ${serpCount}/50`);
  console.log(`Forbidden terms:       ${forbiddenFound} (should be 0)`);
  console.log('═══════════════════════════════════════════');

  if (enrichedCount === 50 && lsiCount === 50 && questionCount === 50 && serpCount === 50 && forbiddenFound === 0) {
    console.log('ALL CHECKS PASSED');
  } else {
    console.error('SOME CHECKS FAILED - review output above');
    process.exit(1);
  }
}

main();
