const fetch = require('node-fetch');

async function checkStrapiImages() {
  try {
    const response = await fetch('http://localhost:1337/api/image-assets?pagination[limit]=500');
    const data = await response.json();
    
    console.log(`Total images in Strapi: ${data.meta?.pagination?.total || data.data?.length || 0}`);
    
    // Group by theme
    const themes = {};
    data.data?.forEach(asset => {
      const theme = asset.attributes?.metadata?.theme || 'unknown';
      themes[theme] = (themes[theme] || 0) + 1;
    });
    
    console.log('\nImages per theme:');
    Object.entries(themes).sort().forEach(([theme, count]) => {
      console.log(`  ${theme}: ${count}`);
    });
    
    // Check for missing translations
    let missingTranslations = 0;
    data.data?.forEach(asset => {
      if (!asset.attributes?.translations || Object.keys(asset.attributes.translations).length < 11) {
        missingTranslations++;
      }
    });
    
    if (missingTranslations > 0) {
      console.log(`\n⚠️  ${missingTranslations} images have incomplete translations`);
    } else {
      console.log('\n✅ All images have complete translations');
    }
    
  } catch (error) {
    console.error('Error checking Strapi images:', error.message);
  }
}

checkStrapiImages();