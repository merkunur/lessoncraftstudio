import { Metadata } from 'next';
import WebComponentWrapper from '@/components/WebComponentWrapper';
import AppContent from './AppContent';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const appData = await getAppData(params.slug, params.locale);
  
  if (!appData) {
    return {
      title: 'App Not Found - LessonCraftStudio',
      description: 'The requested worksheet generator could not be found.'
    };
  }

  return {
    title: `${appData.name || appData.appId} - LessonCraftStudio`,
    description: appData.description || `Create professional ${appData.name || appData.appId} worksheets for your educational materials`,
    keywords: `${appData.name || appData.appId}, worksheet generator, teachers pay teachers, educational resources, printable worksheets`
  };
}

// Fetch app data from Strapi or use static data
async function getAppData(slug: string, locale: string) {
  // Static app data while Strapi is being set up
  const staticAppData: Record<string, any> = {
    'image-addition': {
      name: 'Image Addition',
      appId: 'image-addition',
      description: 'Create visual addition worksheets with images for early math learners',
      category: 'Math',
      requiredTier: 'core',
      features: ['Visual math problems', 'Customizable difficulty', 'Answer keys', 'Print-ready format']
    },
    'word-search': {
      name: 'Word Search',
      appId: 'word-search',
      description: 'Generate customizable word search puzzles with themed vocabulary',
      category: 'Word Games',
      requiredTier: 'free',
      features: ['Multiple grid sizes', 'Directional options', 'Themed word lists', 'Solution keys']
    },
    'coloring': {
      name: 'Coloring Pages',
      appId: 'coloring',
      description: 'Design printable coloring pages from our extensive image library',
      category: 'Art & Creativity',
      requiredTier: 'core',
      features: ['100+ images', 'Multiple themes', 'Various difficulty levels', 'High-quality prints']
    },
    'alphabet-train': {
      name: 'Alphabet Train',
      appId: 'alphabet-train',
      description: 'Help children learn letters with fun train-themed alphabet worksheets',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Letter recognition', 'Alphabetical order', 'Fun train theme', 'Multiple difficulty levels']
    },
    'math-worksheet': {
      name: 'Math Worksheets',
      appId: 'math-worksheet',
      description: 'Generate customizable math practice worksheets for all skill levels',
      category: 'Math',
      requiredTier: 'core',
      features: ['Addition & subtraction', 'Multiplication & division', 'Answer keys', 'Difficulty settings']
    },
    'word-scramble': {
      name: 'Word Scramble',
      appId: 'word-scramble',
      description: 'Create word scramble puzzles to improve vocabulary and spelling',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Custom word lists', 'Themed vocabulary', 'Multiple difficulty levels', 'Solution keys']
    },
    'find-and-count': {
      name: 'Find and Count',
      appId: 'find-and-count',
      description: 'Visual counting exercises to develop number recognition and counting skills',
      category: 'Visual Perception',
      requiredTier: 'core',
      features: ['Object counting', 'Visual discrimination', 'Number practice', 'Engaging images']
    },
    'matching-app': {
      name: 'MatchUp Maker',
      appId: 'matching-app',
      description: 'Create matching activities to improve memory and association skills',
      category: 'Matching',
      requiredTier: 'core',
      features: ['Image-to-image matching', 'Word-to-image matching', 'Memory games', 'Custom pairs']
    },
    'drawing-lines': {
      name: 'Drawing Lines',
      appId: 'drawing-lines',
      description: 'Fine motor skill development through line drawing exercises',
      category: 'Fine Motor Skills',
      requiredTier: 'core',
      features: ['Tracing activities', 'Connect-the-dots', 'Path following', 'Pre-writing practice']
    },
    'picture-bingo': {
      name: 'Picture Bingo',
      appId: 'picture-bingo',
      description: 'Generate custom bingo cards with images for classroom fun',
      category: 'Games',
      requiredTier: 'core',
      features: ['Custom bingo cards', 'Themed images', 'Multiple card sizes', 'Call sheets included']
    },
    'sudoku': {
      name: 'Sudoku for Kids',
      appId: 'sudoku',
      description: 'Child-friendly sudoku puzzles with images instead of numbers',
      category: 'Logic',
      requiredTier: 'core',
      features: ['Picture sudoku', '4x4 and 6x6 grids', 'Progressive difficulty', 'Solution included']
    }
  };

  // Return static data for now
  if (staticAppData[slug]) {
    return staticAppData[slug];
  }

  // Define tier mappings for all apps
  const appTiers: Record<string, string> = {
    'word-search': 'free',
    // Core Bundle
    'image-addition': 'core',
    'alphabet-train': 'core',
    'coloring': 'core',
    'math-worksheet': 'core',
    'word-scramble': 'core',
    'find-and-count': 'core',
    'matching-app': 'core',
    'drawing-lines': 'core',
    'picture-bingo': 'core',
    'sudoku': 'core',
    // Full Access
    'big-small-app': 'full',
    'chart-count-color': 'full',
    'code-addition': 'full',
    'draw-and-color': 'full',
    'find-objects': 'full',
    'grid-match': 'full',
    'image-crossword': 'full',
    'image-cryptogram': 'full',
    'math-puzzle': 'full',
    'missing-pieces': 'full',
    'more-less': 'full',
    'odd-one-out': 'full',
    'pattern-train': 'full',
    'pattern-worksheet': 'full',
    'picture-path': 'full',
    'picture-sort': 'full',
    'prepositions': 'full',
    'shadow-match': 'full',
    'story-dice': 'full',
    'subtraction': 'full',
    'treasure-hunt': 'full',
    'word-guess': 'full',
    'writing-app': 'full'
  };
  
  // If not in static data, create a default entry based on slug
  // This ensures ALL apps work even without Strapi
  const defaultAppData = {
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    appId: slug,
    description: `Create professional ${slug.replace(/-/g, ' ')} worksheets`,
    category: 'Educational Tools',
    requiredTier: appTiers[slug] || 'full',
    features: ['Easy to use', 'Print ready', 'Professional design', 'Customizable']
  };
  
  // Try Strapi if available (but don't fail if it's not)
  try {
    const strapiUrl = 'http://localhost:1337';
    const response = await fetch(
      `${strapiUrl}/api/app-infos?filters[slug][$eq]=${slug}&populate=*`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      const strapiData = data.data?.[0]?.attributes;
      if (strapiData) {
        return strapiData;
      }
    }
  } catch (error) {
    // Silently fall back to default data
    console.log('Strapi not available, using default data for:', slug);
  }
  
  // Return default data so the page always works
  return defaultAppData;
}

// Check if user has access to the app
function checkAccess(userTier: string, requiredTier: string): boolean {
  const tierLevels: { [key: string]: number } = {
    'free': 0,
    'core': 1,
    'full': 2
  };
  
  return tierLevels[userTier] >= tierLevels[requiredTier];
}

// Get tier badge color
function getTierColor(tier: string): string {
  switch(tier) {
    case 'free':
      return 'from-green-600 to-green-700';
    case 'core':
      return 'from-blue-600 to-blue-700';
    case 'full':
      return 'from-purple-600 to-purple-700';
    default:
      return 'from-gray-600 to-gray-700';
  }
}

// Get tier label
function getTierLabel(tier: string): string {
  switch(tier) {
    case 'free':
      return 'FREE TIER';
    case 'core':
      return 'CORE BUNDLE';
    case 'full':
      return 'FULL ACCESS';
    default:
      return tier.toUpperCase();
  }
}

export default async function AppPage({ params: { locale, slug } }: PageProps) {
  // Fetch app data from Strapi
  const appData = await getAppData(slug, locale);
  
  // If app not found, show 404
  if (!appData) {
    notFound();
  }
  
  // Check if user is logged in via cookies or headers
  // For development, check if coming from Strapi admin or if there's any auth
  // This is a simple check - in production you'd use proper auth
  const isAdmin = true; // For now, treat all users as admin for testing
  const userTier = isAdmin ? 'full' : (slug === 'word-search' ? 'free' : 'free');
  const hasAccess = isAdmin || checkAccess(userTier, appData.requiredTier || 'core');
  
  // Extract data with fallbacks
  const appName = appData.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const appDescription = appData.description || `Create professional ${appName} worksheets`;
  
  // Map slug to correct HTML filename
  const htmlFileMap: { [key: string]: string } = {
    'word-search': 'wordsearch.html',
    'image-addition': 'addition.html',
    'alphabet-train': 'alphabet train.html',
    'math-worksheet': 'math worksheet.html',
    'find-and-count': 'find and count.html',
    'matching-app': 'matching.html',
    'drawing-lines': 'drawing lines.html',
    'picture-bingo': 'bingo.html',
    'big-small-app': 'big small.html',
    'chart-count-color': 'chart count.html',
    'code-addition': 'code addition.html',
    'draw-and-color': 'draw and color.html',
    'find-objects': 'find objects.html',
    'grid-match': 'grid match.html',
    'image-crossword': 'crossword.html',
    'image-cryptogram': 'cryptogram.html',
    'math-puzzle': 'math puzzle.html',
    'missing-pieces': 'missing pieces.html',
    'more-less': 'more less.html',
    'odd-one-out': 'odd one out.html',
    'pattern-train': 'pattern train.html',
    'pattern-worksheet': 'pattern worksheet.html',
    'picture-path': 'picture path.html',
    'picture-sort': 'picture sort.html',
    'shadow-match': 'shadow match.html',
    'story-dice': 'story dice.html',
    'treasure-hunt': 'treasure hunt.html',
    'word-guess': 'word guess.html',
    'word-scramble': 'word scramble.html',
    'writing-app': 'writing.html',
    'sudoku': 'sudoku.html',
    'coloring': 'coloring.html',
    'subtraction': 'subtraction.html',
    'prepositions': 'prepositions.html'
  };
  
  const sourceFile = appData.sourceFile || htmlFileMap[slug] || `${slug}.html`;
  const componentName = appData.componentName || slug;
  const appTier = appData.requiredTier || 'core';
  // Ensure features is always an array
  const features = Array.isArray(appData.features) ? appData.features : 
                   appData.features ? [appData.features] : 
                   ['Professional design', 'Easy to use', 'Print ready'];
  const category = appData.category || 'General';
  const icon = appData.icon || '📝';
  
  const tierColor = getTierColor(appTier);
  const tierLabel = getTierLabel(appTier);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className={`bg-gradient-to-r ${tierColor} text-white py-12`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Link href={`/${locale}/apps`} className="hover:text-white transition-colors">
                Apps
              </Link>
              <span>/</span>
              <span>{category}</span>
              <span>/</span>
              <span>{appName}</span>
            </div>
            
            {/* Title and Description */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">{icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{appName}</h1>
                <p className="text-xl text-white/90">
                  {appDescription}
                </p>
              </div>
            </div>
            
            {/* Features Pills */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                {tierLabel}
              </span>
              {features.map((feature: any, index: number) => {
                const featureText = typeof feature === 'string' ? feature : feature.text || feature.title || '';
                return (
                  <span key={index} className="px-4 py-2 bg-black/20 backdrop-blur rounded-full text-sm">
                    ✓ {featureText}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* App Container - Full Screen */}
      <section className="flex-1 bg-white">
        {hasAccess ? (
          <div className="h-full">
            <AppContent 
              appSlug={slug}
              locale={locale}
              appName={appName}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-semibold mb-4">
                This app requires {appTier === 'core' ? 'Core Bundle' : 'Full Access'}
              </h2>
              <p className="text-gray-600 mb-8">
                Upgrade your plan to access this worksheet generator and many more professional tools.
              </p>
              <div className="space-y-4">
                <Button href={`/${locale}/pricing`} variant="primary" size="lg" fullWidth>
                  View Pricing Plans
                </Button>
                <Button href={`/${locale}/apps`} variant="ghost" size="lg" fullWidth>
                  Browse Free Apps
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Instructions Section */}
      {appData.instructions && hasAccess && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">How to Use</h2>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: appData.instructions }} />
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {appData.useCases && appData.useCases.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Perfect For</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {appData.useCases.map((useCase: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!hasAccess && (
        <section className="py-12 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Amazing Worksheets?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of teachers creating professional educational materials
              </p>
              <div className="flex gap-4 justify-center">
                <Button href={`/${locale}/pricing`} variant="secondary" size="lg">
                  View All Plans
                </Button>
                <Button href={`/${locale}/auth/signup`} variant="ghost" size="lg">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Generate static params for all apps
export async function generateStaticParams() {
  // List of all app slugs
  const apps = [
    'word-search',
    'image-addition',
    'alphabet-train',
    'coloring',
    'math-worksheet',
    'word-scramble',
    'find-and-count',
    'matching-app',
    'drawing-lines',
    'picture-bingo',
    'sudoku',
    'big-small-app',
    'chart-count-color',
    'code-addition',
    'draw-and-color',
    'find-objects',
    'grid-match',
    'image-crossword',
    'image-cryptogram',
    'math-puzzle',
    'missing-pieces',
    'more-less',
    'odd-one-out',
    'pattern-train',
    'pattern-worksheet',
    'picture-path',
    'picture-sort',
    'prepositions',
    'shadow-match',
    'story-dice',
    'subtraction',
    'treasure-hunt',
    'word-guess',
    'writing-app'
  ];
  
  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  
  // Generate params for all combinations
  const params = [];
  for (const locale of locales) {
    for (const slug of apps) {
      params.push({ locale, slug });
    }
  }
  
  return params;
}