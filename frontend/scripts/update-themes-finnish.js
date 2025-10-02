const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateThemesWithFinnish() {
  try {
    console.log('\n🇫🇮 Adding Finnish translations to existing themes...\n');

    const finnishTranslations = {
      'animals': 'Eläimet',
      'fruits': 'Hedelmät',
      'numbers': 'Numerot',
      'simple-border': 'Yksinkertainen Reuna',
    };

    const themes = await prisma.imageTheme.findMany();

    for (const theme of themes) {
      const displayNames = theme.displayNames;

      if (displayNames.fi) {
        console.log(`⏭️  Theme "${theme.name}" already has Finnish translation, skipping...`);
        continue;
      }

      const finnishName = finnishTranslations[theme.name] || theme.displayNames.en;
      displayNames.fi = finnishName;

      await prisma.imageTheme.update({
        where: { id: theme.id },
        data: { displayNames },
      });

      console.log(`✅ Updated "${theme.name}": ${finnishName}`);
    }

    console.log('\n✨ Done! All themes now have Finnish translations.\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateThemesWithFinnish();
