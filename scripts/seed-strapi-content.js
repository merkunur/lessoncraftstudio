const { Client } = require('pg');
const fs = require('fs').promises;
const path = require('path');

// Database connection
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'lessoncraftstudio',
  user: 'lcsuser',
  password: 'lcspass'
});

// Complete app data for all 33 worksheet generators
const APPS_DATA = [
  { name: 'Word Search Generator', slug: 'word-search', component: 'word-search', tier: 'free', category: 'Language Arts', description: 'Create custom word search puzzles with images. Perfect for vocabulary building and visual learning.', features: ['Custom grid sizes 8x8 to 15x15', 'Multiple word directions', 'Image integration', 'Print-ready output', 'Answer key included'] },
  { name: 'Image Addition', slug: 'image-addition', component: 'image-addition', tier: 'core', category: 'Math', description: 'Visual addition worksheets using images for counting. Ideal for early math learners.', features: ['Visual counting exercises', 'Custom number ranges', 'Image-based problems', 'Multiple difficulty levels'] },
  { name: 'Alphabet Train', slug: 'alphabet-train', component: 'alphabet-train', tier: 'core', category: 'Language Arts', description: 'Learn alphabets with fun train themed activities. Great for letter recognition and sequencing.', features: ['Letter recognition games', 'Alphabet sequencing', 'Visual learning', 'Upper and lowercase letters'] },
  { name: 'Coloring Page Designer', slug: 'coloring', component: 'coloring', tier: 'core', category: 'Art & Creativity', description: 'Create custom coloring pages from our image library. Develops fine motor skills and creativity.', features: ['Custom designs', 'Multiple themes', 'Print-ready format', 'Various difficulty levels'] },
  { name: 'Math Worksheet Generator', slug: 'math-worksheet', component: 'math-worksheet', tier: 'core', category: 'Math', description: 'Generate comprehensive math worksheets for all operations. Customizable for different grade levels.', features: ['Addition, subtraction, multiplication, division', 'Custom difficulty levels', 'Answer keys provided', 'Mixed operations option'] },
  { name: 'Word Scramble', slug: 'word-scramble', component: 'word-scramble', tier: 'core', category: 'Language Arts', description: 'Create word scramble puzzles with visual hints. Enhances spelling and vocabulary skills.', features: ['Custom word lists', 'Difficulty levels', 'Visual hints with images', 'Solution keys'] },
  { name: 'Find and Count', slug: 'find-and-count', component: 'find-and-count', tier: 'core', category: 'Visual Perception', description: 'Count objects in busy scenes. Develops counting skills and visual discrimination.', features: ['Visual counting exercises', 'Pattern recognition', 'Multiple themes', 'Progressive difficulty'] },
  { name: 'MatchUp Maker', slug: 'matching-app', component: 'matching-app', tier: 'core', category: 'Matching', description: 'Create matching activities between images and words. Perfect for vocabulary development.', features: ['Image to image matching', 'Word to image pairs', 'Custom content creation', 'Multiple layouts'] },
  { name: 'Drawing Lines', slug: 'drawing-lines', component: 'drawing-lines', tier: 'core', category: 'Fine Motor Skills', description: 'Line drawing and tracing exercises. Develops pre-writing skills and hand control.', features: ['Motor skill development', 'Path following exercises', 'Connect the dots', 'Tracing patterns'] },
  { name: 'Picture Bingo', slug: 'picture-bingo', component: 'picture-bingo', tier: 'core', category: 'Games', description: 'Create custom bingo cards with images. Fun group activity for learning.', features: ['Custom bingo cards', 'Multiple themes', 'Print multiple unique cards', 'Calling cards included'] },
  { name: 'Sudoku for Kids', slug: 'sudoku', component: 'sudoku', tier: 'core', category: 'Logic', description: 'Generate kid-friendly sudoku puzzles with images. Develops logical thinking.', features: ['4x4 and 6x6 grids', 'Image-based puzzles', 'Multiple difficulties', 'Solution included'] },
  { name: 'Big Small Comparison', slug: 'big-small-app', component: 'big-small-app', tier: 'full', category: 'Comparison', description: 'Size comparison activities with visual objects. Teaches relative size concepts.', features: ['Size concept learning', 'Visual comparison', 'Multiple object sets', 'Progressive difficulty'] },
  { name: 'Chart Count and Color', slug: 'chart-count-color', component: 'chart-count-color', tier: 'full', category: 'Math & Art', description: 'Counting and coloring charts combined. Integrates math with art activities.', features: ['Data visualization', 'Counting practice', 'Coloring activity', 'Graph creation'] },
  { name: 'Code Addition', slug: 'code-addition', component: 'code-addition', tier: 'full', category: 'Math', description: 'Coded addition problems with secret messages. Makes math practice engaging.', features: ['Problem solving', 'Code breaking element', 'Math practice', 'Secret message reveal'] },
  { name: 'Draw and Color', slug: 'draw-and-color', component: 'draw-and-color', tier: 'full', category: 'Art', description: 'Guided drawing and coloring activities. Develops artistic skills step by step.', features: ['Step-by-step drawing', 'Following instructions', 'Creative expression', 'Art skill development'] },
  { name: 'Find Hidden Objects', slug: 'find-objects', component: 'find-objects', tier: 'full', category: 'Visual Perception', description: 'Hidden object puzzles in detailed scenes. Enhances visual scanning abilities.', features: ['Visual scanning practice', 'Attention to detail', 'Multiple themed scenes', 'Object lists'] },
  { name: 'Grid Match', slug: 'grid-match', component: 'grid-match', tier: 'full', category: 'Matching', description: 'Grid-based matching and memory games. Improves pattern recognition.', features: ['Pattern matching', 'Memory skill development', 'Custom grid sizes', 'Progressive challenges'] },
  { name: 'Image Crossword', slug: 'image-crossword', component: 'image-crossword', tier: 'full', category: 'Language Arts', description: 'Crossword puzzles with picture clues. Visual approach to word puzzles.', features: ['Visual clues', 'Custom word lists', 'Auto-generation', 'Difficulty settings'] },
  { name: 'Image Cryptogram', slug: 'image-cryptogram', component: 'image-cryptogram', tier: 'full', category: 'Logic', description: 'Code-breaking puzzles with image hints. Develops logical thinking skills.', features: ['Logic puzzles', 'Code substitution', 'Visual hints', 'Progressive difficulty'] },
  { name: 'Math Puzzle Challenge', slug: 'math-puzzle', component: 'math-puzzle', tier: 'full', category: 'Math', description: 'Mathematical puzzle activities and brain teasers. Advanced problem-solving practice.', features: ['Complex problem solving', 'Multiple operations', 'Visual math concepts', 'Challenge levels'] },
  { name: 'Missing Pieces', slug: 'missing-pieces', component: 'missing-pieces', tier: 'full', category: 'Visual Perception', description: 'Complete the picture by finding missing parts. Develops visual completion skills.', features: ['Visual completion', 'Pattern recognition', 'Problem solving', 'Multiple themes'] },
  { name: 'More or Less', slug: 'more-less', component: 'more-less', tier: 'full', category: 'Math', description: 'Number comparison activities with visual aids. Teaches greater than and less than concepts.', features: ['Number comparison', 'Visual representations', 'Progressive difficulty', 'Number sense development'] },
  { name: 'Odd One Out', slug: 'odd-one-out', component: 'odd-one-out', tier: 'full', category: 'Logic', description: 'Find the item that doesn\'t belong. Develops categorization and logic skills.', features: ['Logic skill building', 'Pattern recognition', 'Critical thinking', 'Multiple categories'] },
  { name: 'Pattern Train', slug: 'pattern-train', component: 'pattern-train', tier: 'full', category: 'Patterns', description: 'Pattern sequence activities with train theme. Teaches pattern recognition and completion.', features: ['Pattern recognition', 'Sequence completion', 'Visual patterns', 'Increasing complexity'] },
  { name: 'Pattern Worksheet Maker', slug: 'pattern-worksheet', component: 'pattern-worksheet', tier: 'full', category: 'Patterns', description: 'Create custom pattern worksheets. Flexible pattern creation tool.', features: ['Custom pattern creation', 'Multiple pattern types', 'Difficulty levels', 'Answer keys'] },
  { name: 'Picture Pathway', slug: 'picture-path', component: 'picture-path', tier: 'full', category: 'Logic', description: 'Follow the path puzzle activities. Develops planning and direction skills.', features: ['Path following', 'Direction skills', 'Problem solving', 'Maze variations'] },
  { name: 'Picture Sort', slug: 'picture-sort', component: 'picture-sort', tier: 'full', category: 'Sorting', description: 'Sorting and categorization with images. Teaches classification concepts.', features: ['Classification skills', 'Category sorting', 'Visual organization', 'Multiple sort criteria'] },
  { name: 'Prepositions Practice', slug: 'prepositions', component: 'prepositions', tier: 'full', category: 'Language Arts', description: 'Learn prepositions with visual examples. Spatial concept understanding.', features: ['Spatial concepts', 'Visual learning', 'Grammar practice', 'Position words'] },
  { name: 'Shadow Match', slug: 'shadow-match', component: 'shadow-match', tier: 'full', category: 'Matching', description: 'Match objects to their shadows. Develops shape recognition skills.', features: ['Visual matching', 'Shape recognition', 'Problem solving', 'Multiple themes'] },
  { name: 'Story Dice Creator', slug: 'story-dice', component: 'story-dice', tier: 'full', category: 'Creative Writing', description: 'Story creation with randomized image dice. Sparks creative writing.', features: ['Creative writing prompts', 'Storytelling practice', 'Random story elements', 'Printable dice'] },
  { name: 'Visual Subtraction', slug: 'subtraction', component: 'subtraction', tier: 'full', category: 'Math', description: 'Subtraction worksheets with visual aids. Makes subtraction concrete and visual.', features: ['Visual math concepts', 'Custom number ranges', 'Image-based problems', 'Step-by-step solutions'] },
  { name: 'Treasure Hunt Maps', slug: 'treasure-hunt', component: 'treasure-hunt', tier: 'full', category: 'Games', description: 'Create treasure hunt activities and maps. Adventure-based learning.', features: ['Adventure theme', 'Problem solving', 'Map reading skills', 'Clue creation'] },
  { name: 'Word Guess Game', slug: 'word-guess', component: 'word-guess', tier: 'full', category: 'Language Arts', description: 'Word guessing games with picture hints. Vocabulary building through play.', features: ['Vocabulary building', 'Letter recognition', 'Word formation', 'Hint system'] },
  { name: 'Writing Practice Sheets', slug: 'writing-app', component: 'writing-app', tier: 'full', category: 'Writing', description: 'Handwriting practice sheet generator. Develops proper letter formation.', features: ['Letter tracing', 'Word practice', 'Custom content', 'Guidelines included'] }
];

// Image themes
const IMAGE_THEMES = [
  { key: 'alphabet', name: 'Alphabet', description: 'Letters and alphabet-related images' },
  { key: 'animals', name: 'Animals', description: 'Various animals from farm to wild' },
  { key: 'food', name: 'Food', description: 'Fruits, vegetables, and meals' },
  { key: 'general', name: 'General', description: 'Common everyday objects' },
  { key: 'icons', name: 'Icons', description: 'Simple icon illustrations' },
  { key: 'prepositions', name: 'Prepositions', description: 'Images showing spatial relationships' },
  { key: 'symbols', name: 'Symbols', description: 'Mathematical and other symbols' },
  { key: 'coloring', name: 'Coloring', description: 'Black and white images for coloring' },
  { key: 'backgrounds', name: 'Backgrounds', description: 'Background patterns and scenes' },
  { key: 'borders', name: 'Borders', description: 'Decorative borders and frames' },
  { key: 'template', name: 'Templates', description: 'Worksheet templates' },
  { key: 'drawing-lines', name: 'Drawing Lines', description: 'Line drawing exercises' },
  { key: 'alphabetsvg', name: 'Alphabet SVG', description: 'Vector alphabet images' }
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    // 1. Create admin user
    console.log('\n📤 Creating admin user...');
    const adminResult = await client.query(`
      INSERT INTO admin_users (firstname, lastname, username, email, password, is_active, blocked, prefered_language, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `, ['Admin', 'User', null, 'admin@lessoncraftstudio.com', '$2a$10$5K3gE.x2r3YzKxQyKc0vLu7hPvP7ySnSLHbPaKdcKgKjU.WZDiPte', true, false, 'en']);
    
    const adminId = adminResult.rows[0]?.id || 1;
    console.log('✅ Admin user ready');

    // 2. Seed app-info entries
    console.log('\n📱 Uploading worksheet generator apps...');
    for (const app of APPS_DATA) {
      await client.query(`
        INSERT INTO app_infos (name, slug, component_name, description, short_description, required_tier, category, features, locale, created_at, updated_at, published_at, created_by_id, updated_by_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW(), NOW(), $10, $10)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          updated_at = NOW()
      `, [
        app.name, 
        app.slug, 
        app.component, 
        app.description, 
        app.description.substring(0, 200), 
        app.tier, 
        app.category, 
        JSON.stringify(app.features),
        'en',
        adminId
      ]);
      console.log(`  ✅ ${app.name}`);
    }

    // 3. Seed image themes
    console.log('\n🎨 Uploading image themes...');
    for (let i = 0; i < IMAGE_THEMES.length; i++) {
      const theme = IMAGE_THEMES[i];
      await client.query(`
        INSERT INTO image_themes (theme_key, display_name, description, sort_order, locale, created_at, updated_at, published_at, created_by_id, updated_by_id)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW(), $6, $6)
        ON CONFLICT (theme_key) DO UPDATE SET
          display_name = EXCLUDED.display_name,
          updated_at = NOW()
      `, [theme.key, theme.name, theme.description, i, 'en', adminId]);
      console.log(`  ✅ ${theme.name}`);
    }

    // 4. Set up permissions for public access
    console.log('\n🔓 Configuring public permissions...');
    
    // Get public role ID
    const roleResult = await client.query(`SELECT id FROM up_roles WHERE type = 'public'`);
    const publicRoleId = roleResult.rows[0]?.id || 2;

    // Grant permissions for app-infos
    const appPermissions = ['find', 'findone'];
    for (const action of appPermissions) {
      await client.query(`
        INSERT INTO up_permissions (action, created_at, updated_at, created_by_id, updated_by_id)
        VALUES ($1, NOW(), NOW(), $2, $2)
        ON CONFLICT DO NOTHING
      `, [`api::app-info.app-info.${action}`, adminId]);
    }

    // Grant permissions for image-themes
    for (const action of appPermissions) {
      await client.query(`
        INSERT INTO up_permissions (action, created_at, updated_at, created_by_id, updated_by_id)
        VALUES ($1, NOW(), NOW(), $2, $2)
        ON CONFLICT DO NOTHING
      `, [`api::image-theme.image-theme.${action}`, adminId]);
    }

    // Grant permissions for image-assets
    for (const action of appPermissions) {
      await client.query(`
        INSERT INTO up_permissions (action, created_at, updated_at, created_by_id, updated_by_id)
        VALUES ($1, NOW(), NOW(), $2, $2)
        ON CONFLICT DO NOTHING
      `, [`api::image-asset.image-asset.${action}`, adminId]);
    }

    // 5. Create sample image assets
    console.log('\n🖼️ Creating sample image entries...');
    const sampleImages = [
      { theme: 'animals', name: 'Dog', file: 'dog.png' },
      { theme: 'animals', name: 'Cat', file: 'cat.png' },
      { theme: 'animals', name: 'Bird', file: 'bird.png' },
      { theme: 'food', name: 'Apple', file: 'apple.png' },
      { theme: 'food', name: 'Banana', file: 'banana.png' },
      { theme: 'alphabet', name: 'Letter A', file: 'a.png' },
      { theme: 'alphabet', name: 'Letter B', file: 'b.png' }
    ];

    for (const img of sampleImages) {
      // Get theme ID
      const themeResult = await client.query(`SELECT id FROM image_themes WHERE theme_key = $1`, [img.theme]);
      const themeId = themeResult.rows[0]?.id;
      
      if (themeId) {
        await client.query(`
          INSERT INTO image_assets (file_key, display_name, is_premium, locale, created_at, updated_at, published_at, created_by_id, updated_by_id)
          VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW(), $5, $5)
          ON CONFLICT (file_key) DO NOTHING
        `, [`${img.theme}_${img.file.replace('.png', '')}`, img.name, false, 'en', adminId]);
        console.log(`  ✅ ${img.name} (${img.theme})`);
      }
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - ${APPS_DATA.length} worksheet generator apps`);
    console.log(`  - ${IMAGE_THEMES.length} image themes`);
    console.log(`  - Sample images created`);
    console.log(`  - Public permissions configured`);
    console.log('\n🎉 Content is now available in Strapi!');
    console.log('Visit http://localhost:1337/admin to see all content');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await client.end();
  }
}

seedDatabase();