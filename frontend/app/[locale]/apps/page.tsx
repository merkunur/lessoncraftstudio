import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'All Worksheet Generator Apps - LessonCraftStudio',
  description: 'Choose from 33 professional worksheet generators for Teachers Pay Teachers and educational publishers',
  keywords: 'worksheet generators, educational tools, teaching resources, printable worksheets'
};

interface PageProps {
  params: {
    locale: string;
  };
}

// Hardcoded app data for now (will be replaced with Strapi data)
const apps = [
  // Free Tier (1 app)
  { id: 'word-search', name: 'Word Search', tier: 'free', category: 'Word Games', icon: '🔍', popular: true },
  
  // Core Bundle (10 apps)
  { id: 'image-addition', name: 'Image Addition', tier: 'core', category: 'Math', icon: '➕', popular: true },
  { id: 'alphabet-train', name: 'Alphabet Train', tier: 'core', category: 'Language Arts', icon: '🚂', popular: true },
  { id: 'coloring', name: 'Coloring Pages', tier: 'core', category: 'Art & Creativity', icon: '🎨', popular: true },
  { id: 'math-worksheet', name: 'Math Worksheets', tier: 'core', category: 'Math', icon: '📐', popular: true },
  { id: 'word-scramble', name: 'Word Scramble', tier: 'core', category: 'Language Arts', icon: '🔤', popular: true },
  { id: 'find-and-count', name: 'Find and Count', tier: 'core', category: 'Visual Perception', icon: '🔢', popular: true },
  { id: 'matching-app', name: 'MatchUp Maker', tier: 'core', category: 'Matching', icon: '🎯', popular: true },
  { id: 'drawing-lines', name: 'Drawing Lines', tier: 'core', category: 'Fine Motor Skills', icon: '✏️', popular: true },
  { id: 'picture-bingo', name: 'Picture Bingo', tier: 'core', category: 'Games', icon: '🎲', popular: true },
  { id: 'sudoku', name: 'Sudoku for Kids', tier: 'core', category: 'Logic', icon: '🧩', popular: true },
  
  // Full Access (Additional 23 apps)
  { id: 'big-small-app', name: 'Big or Small', tier: 'full', category: 'Concepts', icon: '📏' },
  { id: 'chart-count-color', name: 'Chart Count & Color', tier: 'full', category: 'Math', icon: '📊' },
  { id: 'code-addition', name: 'Code Addition', tier: 'full', category: 'Math', icon: '🔐' },
  { id: 'draw-and-color', name: 'Draw and Color', tier: 'full', category: 'Art & Creativity', icon: '🖍️' },
  { id: 'find-objects', name: 'Find Objects', tier: 'full', category: 'Visual Perception', icon: '👀' },
  { id: 'grid-match', name: 'Grid Match', tier: 'full', category: 'Matching', icon: '⚡' },
  { id: 'image-crossword', name: 'Image Crossword', tier: 'full', category: 'Word Games', icon: '❌' },
  { id: 'image-cryptogram', name: 'Image Cryptogram', tier: 'full', category: 'Logic', icon: '🔒' },
  { id: 'math-puzzle', name: 'Math Puzzle', tier: 'full', category: 'Math', icon: '🧮' },
  { id: 'missing-pieces', name: 'Missing Pieces', tier: 'full', category: 'Visual Perception', icon: '🧩' },
  { id: 'more-less', name: 'More or Less', tier: 'full', category: 'Math', icon: '⚖️' },
  { id: 'odd-one-out', name: 'Odd One Out', tier: 'full', category: 'Logic', icon: '🎭' },
  { id: 'pattern-train', name: 'Pattern Train', tier: 'full', category: 'Patterns', icon: '🚂' },
  { id: 'pattern-worksheet', name: 'Pattern Worksheets', tier: 'full', category: 'Patterns', icon: '🔄' },
  { id: 'picture-path', name: 'Picture Pathway', tier: 'full', category: 'Logic', icon: '🛤️' },
  { id: 'picture-sort', name: 'Picture Sort', tier: 'full', category: 'Sorting', icon: '📦' },
  { id: 'prepositions', name: 'Prepositions', tier: 'full', category: 'Language Arts', icon: '📍' },
  { id: 'shadow-match', name: 'Shadow Match', tier: 'full', category: 'Matching', icon: '👤' },
  { id: 'story-dice', name: 'Story Dice', tier: 'full', category: 'Language Arts', icon: '🎲' },
  { id: 'subtraction', name: 'Subtraction', tier: 'full', category: 'Math', icon: '➖' },
  { id: 'treasure-hunt', name: 'Treasure Hunt', tier: 'full', category: 'Games', icon: '💎' },
  { id: 'word-guess', name: 'Word Guess', tier: 'full', category: 'Word Games', icon: '❓' },
  { id: 'writing-app', name: 'Writing Practice', tier: 'full', category: 'Language Arts', icon: '✍️' }
];

// Get unique categories
const categories = Array.from(new Set(apps.map(app => app.category)));

function AppCard({ app, locale }: { app: typeof apps[0], locale: string }) {
  const tierColors = {
    free: 'border-green-500 bg-green-50',
    core: 'border-blue-500 bg-blue-50',
    full: 'border-purple-500 bg-purple-50'
  };

  const tierBadgeColors = {
    free: 'bg-green-500 text-white',
    core: 'bg-blue-500 text-white',
    full: 'bg-purple-500 text-white'
  };

  return (
    <Link href={`/${locale}/apps/${app.id}`}>
      <div className={`relative p-6 rounded-lg border-2 ${tierColors[app.tier]} hover:shadow-lg transition-all duration-200 cursor-pointer h-full`}>
        {app.popular && (
          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{app.icon}</div>
          <span className={`text-xs px-2 py-1 rounded ${tierBadgeColors[app.tier]} uppercase font-semibold`}>
            {app.tier}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2">{app.name}</h3>
        <p className="text-sm text-gray-600">{app.category}</p>
      </div>
    </Link>
  );
}

export default async function AppsPage({ params: { locale } }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            33 Worksheet Generator Apps
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Transform your teaching materials with our comprehensive suite of educational worksheet generators.
            From word searches to math puzzles, we have everything you need.
          </p>
        </div>
      </section>

      {/* Tier Explanation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Tier</h3>
              <p className="text-sm text-gray-600">Try Word Search generator with watermarked output</p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Core Bundle - $15/mo</h3>
              <p className="text-sm text-gray-600">Access 10 most popular apps with commercial license</p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Full Access - $25/mo</h3>
              <p className="text-sm text-gray-600">All 33 apps, priority support, early access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-full whitespace-nowrap">
              All Apps
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Free Tier */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-green-500 mr-3"></span>
              Free Tier
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'free').map(app => (
                <AppCard key={app.id} app={app} locale={locale} />
              ))}
            </div>
          </div>

          {/* Core Bundle */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-blue-500 mr-3"></span>
              Core Bundle
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'core').map(app => (
                <AppCard key={app.id} app={app} locale={locale} />
              ))}
            </div>
          </div>

          {/* Full Access */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-purple-500 mr-3"></span>
              Full Access Apps
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'full').map(app => (
                <AppCard key={app.id} app={app} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Worksheets?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with our free Word Search generator or unlock all apps today
          </p>
          <div className="flex gap-4 justify-center">
            <Button href={`/${locale}/auth/signup`} variant="secondary" size="lg">
              Start Free Trial
            </Button>
            <Button href={`/${locale}/pricing`} variant="primary" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}