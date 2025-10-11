// Deploy script to initialize homepage data on production server
const { DASHBOARD_APPS_DATA, CATEGORY_TRANSLATIONS } = require('./public/dashboard-apps-data.js');

async function deployHomepageUpdates() {
  console.log('🚀 Starting homepage deployment...');
  console.log('📊 Apps to deploy:', DASHBOARD_APPS_DATA.length);
  console.log('🏷️  Categories:', Object.keys(CATEGORY_TRANSLATIONS).join(', '));

  // Transform dashboard apps to samples format
  const samples = DASHBOARD_APPS_DATA.map((app, index) => ({
    id: app.id,
    sort_order: index,
    category: app.category.toLowerCase(),
    difficulty: app.difficulty,
    featured: app.tier === 'free' || index < 6,
    image_url: app.url.replace('.html', '.png'),
    name: app.name,
    description: app.description,
    age_range: app.age_range
  }));

  const samplesSection = {
    title: {
      en: 'Worksheet Samples Gallery',
      de: 'Arbeitsblatt-Galerie',
      fr: 'Galerie d\'échantillons de feuilles de travail',
      es: 'Galería de muestras de hojas de trabajo',
      it: 'Galleria di esempi di fogli di lavoro',
      pt: 'Galeria de amostras de planilhas',
      nl: 'Werkblad voorbeelden galerij',
      sv: 'Arbetsblad exempel galleri',
      da: 'Arbejdsark eksempler galleri',
      no: 'Arbeidsark eksempler galleri',
      fi: 'Työarkkien esimerkkigalleria'
    },
    subtitle: {
      en: 'Click on any worksheet to see a larger preview',
      de: 'Klicken Sie auf ein beliebiges Arbeitsblatt, um eine größere Vorschau zu sehen',
      fr: 'Cliquez sur n\'importe quelle feuille de travail pour voir un aperçu plus grand',
      es: 'Haga clic en cualquier hoja de trabajo para ver una vista previa más grande',
      it: 'Fai clic su qualsiasi foglio di lavoro per vedere un\'anteprima più grande',
      pt: 'Clique em qualquer planilha para ver uma visualização maior',
      nl: 'Klik op een werkblad om een grotere voorvertoning te zien',
      sv: 'Klicka på ett arbetsblad för att se en större förhandsgranskning',
      da: 'Klik på et arbejdsark for at se en større forhåndsvisning',
      no: 'Klikk på et arbeidsark for å se en større forhåndsvisning',
      fi: 'Napsauta mitä tahansa työarkkia nähdäksesi suuremman esikatselun'
    },
    cta: {
      en: 'Explore All 33 Worksheet Generators →',
      de: 'Entdecken Sie alle 33 Arbeitsblatt-Generatoren →',
      fr: 'Explorez les 33 générateurs de feuilles de travail →',
      es: 'Explore los 33 generadores de hojas de trabajo →',
      it: 'Esplora tutti i 33 generatori di fogli di lavoro →',
      pt: 'Explore todos os 33 geradores de planilhas →',
      nl: 'Ontdek alle 33 werkbladgeneratoren →',
      sv: 'Utforska alla 33 arbetsbladsgeneratorer →',
      da: 'Udforsk alle 33 arbejdsarksgeneratorer →',
      no: 'Utforsk alle 33 arbeidsarkgeneratorer →',
      fi: 'Tutustu kaikkiin 33 työarkkigeneraattoriin →'
    },
    categories: CATEGORY_TRANSLATIONS,
    difficulties: {
      easy: {
        en: 'Easy',
        de: 'Einfach',
        fr: 'Facile',
        es: 'Fácil',
        it: 'Facile',
        pt: 'Fácil',
        nl: 'Gemakkelijk',
        sv: 'Lätt',
        da: 'Let',
        no: 'Lett',
        fi: 'Helppo'
      },
      medium: {
        en: 'Medium',
        de: 'Mittel',
        fr: 'Moyen',
        es: 'Medio',
        it: 'Medio',
        pt: 'Médio',
        nl: 'Gemiddeld',
        sv: 'Medium',
        da: 'Mellem',
        no: 'Medium',
        fi: 'Keskitaso'
      },
      hard: {
        en: 'Hard',
        de: 'Schwer',
        fr: 'Difficile',
        es: 'Difícil',
        it: 'Difficile',
        pt: 'Difícil',
        nl: 'Moeilijk',
        sv: 'Svår',
        da: 'Svær',
        no: 'Vanskelig',
        fi: 'Vaikea'
      }
    },
    modalLabels: {
      ageRange: {
        en: 'Age Range',
        de: 'Altersbereich',
        fr: 'Tranche d\'âge',
        es: 'Rango de edad',
        it: 'Fascia d\'età',
        pt: 'Faixa etária',
        nl: 'Leeftijdsbereik',
        sv: 'Åldersintervall',
        da: 'Aldersgruppe',
        no: 'Aldersgruppe',
        fi: 'Ikäryhmä'
      },
      difficulty: {
        en: 'Difficulty',
        de: 'Schwierigkeit',
        fr: 'Difficulté',
        es: 'Dificultad',
        it: 'Difficoltà',
        pt: 'Dificuldade',
        nl: 'Moeilijkheid',
        sv: 'Svårighetsgrad',
        da: 'Sværhedsgrad',
        no: 'Vanskelighetsgrad',
        fi: 'Vaikeustaso'
      },
      category: {
        en: 'Category',
        de: 'Kategorie',
        fr: 'Catégorie',
        es: 'Categoría',
        it: 'Categoria',
        pt: 'Categoria',
        nl: 'Categorie',
        sv: 'Kategori',
        da: 'Kategori',
        no: 'Kategori',
        fi: 'Kategoria'
      }
    }
  };

  console.log('\n📤 Sending data to API...');

  try {
    const response = await fetch('http://localhost:3000/api/homepage/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'samples',
        content: {
          samples: samples,
          samplesSection: samplesSection
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Deployment successful!');
      console.log('📊 Result:', result);

      // Verify
      console.log('\n🔍 Verifying deployment...');
      const verifyResponse = await fetch('http://localhost:3000/api/homepage/content?raw=true');
      const data = await verifyResponse.json();

      console.log('✅ Samples count:', data.samples?.length || 0);
      console.log('✅ Categories:', Object.keys(data.samplesSection?.categories || {}));
      console.log('✅ First sample:', data.samples?.[0]?.name?.en);
    } else {
      const error = await response.text();
      console.error('❌ Deployment failed:', error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deployHomepageUpdates();
