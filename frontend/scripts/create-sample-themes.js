const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createSampleThemes() {
  try {
    console.log('\n🎨 Creating sample themes...\n');

    // Sample themes with proper translations
    const themes = [
      {
        name: 'animals',
        type: 'images',
        displayNames: {
          en: 'Animals',
          de: 'Tiere',
          fr: 'Animaux',
          es: 'Animales',
          it: 'Animali',
          pt: 'Animais',
          nl: 'Dieren',
          sv: 'Djur',
          no: 'Dyr',
          da: 'Dyr',
          fi: 'Eläimet',
        },
      },
      {
        name: 'fruits',
        type: 'images',
        displayNames: {
          en: 'Fruits',
          de: 'Früchte',
          fr: 'Fruits',
          es: 'Frutas',
          it: 'Frutta',
          pt: 'Frutas',
          nl: 'Fruit',
          sv: 'Frukter',
          no: 'Frukt',
          da: 'Frugter',
          fi: 'Hedelmät',
        },
      },
      {
        name: 'numbers',
        type: 'images',
        displayNames: {
          en: 'Numbers',
          de: 'Zahlen',
          fr: 'Nombres',
          es: 'Números',
          it: 'Numeri',
          pt: 'Números',
          nl: 'Nummers',
          sv: 'Nummer',
          no: 'Tall',
          da: 'Numre',
          fi: 'Numerot',
        },
      },
      {
        name: 'simple-border',
        type: 'borders',
        displayNames: {
          en: 'Simple Border',
          de: 'Einfacher Rahmen',
          fr: 'Bordure Simple',
          es: 'Borde Simple',
          it: 'Bordo Semplice',
          pt: 'Borda Simples',
          nl: 'Eenvoudige Rand',
          sv: 'Enkel Kant',
          no: 'Enkel Kant',
          da: 'Simpel Kant',
          fi: 'Yksinkertainen Reuna',
        },
      },
    ];

    for (const theme of themes) {
      const existing = await prisma.imageTheme.findFirst({
        where: { name: theme.name, type: theme.type },
      });

      if (existing) {
        console.log(`⏭️  Theme "${theme.name}" (${theme.type}) already exists, skipping...`);
        continue;
      }

      const created = await prisma.imageTheme.create({
        data: theme,
      });

      console.log(`✅ Created theme: ${theme.name} (${theme.type})`);
      console.log(`   English: ${theme.displayNames.en}`);
    }

    console.log('\n✨ Done! You can now access the Image Library at:');
    console.log('   http://localhost:3003/en/admin/images\n');

    // Show what's in the database
    const allThemes = await prisma.imageTheme.findMany({
      select: {
        name: true,
        type: true,
        displayNames: true,
        _count: {
          select: { images: true },
        },
      },
    });

    console.log('📊 Current themes in database:');
    allThemes.forEach(t => {
      console.log(`   - ${t.name} (${t.type}): ${t._count.images} images`);
    });
    console.log('');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleThemes();
