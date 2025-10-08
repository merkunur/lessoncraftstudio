const fetch = require('node-fetch');

async function test() {
  try {
    const response = await fetch('http://localhost:3005/api/homepage/content?raw=true');
    const data = await response.json();

    console.log('=== API Response Structure ===');
    console.log('Has hero?', data.hero ? 'YES' : 'NO');
    console.log('Has samplesSection?', data.samplesSection ? 'YES' : 'NO');

    if (data.hero) {
      console.log('\n=== Hero Section ===');
      console.log('Hero title.en:', data.hero.title?.en || 'MISSING');
      console.log('Hero title.de:', data.hero.title?.de || 'MISSING');
      console.log('Hero subtitle.en:', data.hero.subtitle?.en ? 'EXISTS' : 'MISSING');
      console.log('Hero cta_primary_text.en:', data.hero.cta_primary_text?.en || 'MISSING');
    }

    if (data.samplesSection) {
      console.log('\n=== Samples Section ===');
      console.log('Title.en:', data.samplesSection.title?.en || 'MISSING');
      console.log('Has categories?', data.samplesSection.categories ? 'YES' : 'NO');
      console.log('Has difficulties?', data.samplesSection.difficulties ? 'YES' : 'NO');
      console.log('Has modalLabels?', data.samplesSection.modalLabels ? 'YES' : 'NO');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
