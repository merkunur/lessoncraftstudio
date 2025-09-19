import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { checkGeneratorAccess, checkDownloadQuota } from '@/lib/usage-tracking';

// POST /api/usage/check-access - Check if user can access a generator or download
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { 
          allowed: false,
          reason: 'Please sign in to use worksheet generators',
          requiresAuth: true,
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, appName } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter required (generator or download)' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'generator') {
      if (!appName) {
        return NextResponse.json(
          { error: 'App name required for generator check' },
          { status: 400 }
        );
      }
      result = await checkGeneratorAccess(user.id, appName);
    } else if (type === 'download') {
      result = await checkDownloadQuota(user.id);
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "generator" or "download"' },
        { status: 400 }
      );
    }

    // Add user tier info to response
    const response = {
      ...result,
      userTier: user.subscriptionTier?.toUpperCase() || 'FREE',
      upgradeUrl: result.allowed ? null : '/pricing',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Check access error:', error);
    return NextResponse.json(
      { 
        allowed: false,
        error: 'Failed to check access',
        reason: 'An error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}

// GET /api/usage/check-access - Get list of accessible generators
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { 
          generators: [],
          tier: 'FREE',
          message: 'Sign in to see available generators',
        },
        { status: 401 }
      );
    }

    const tier = user.subscriptionTier?.toUpperCase() || 'FREE';

    // Define generators by tier
    const freeGenerators = [
      { name: 'addition', displayName: 'Addition', category: 'Math' },
      { name: 'subtraction', displayName: 'Subtraction', category: 'Math' },
      { name: 'coloring', displayName: 'Coloring Pages', category: 'Art' },
      { name: 'matching', displayName: 'Matching', category: 'Logic' },
      { name: 'wordsearch', displayName: 'Word Search', category: 'Language' },
    ];

    const coreGenerators = [
      ...freeGenerators,
      { name: 'multiplication', displayName: 'Multiplication', category: 'Math' },
      { name: 'division', displayName: 'Division', category: 'Math' },
      { name: 'fractions', displayName: 'Fractions', category: 'Math' },
      { name: 'alphabet-train', displayName: 'Alphabet Train', category: 'Language' },
      { name: 'crossword', displayName: 'Crossword', category: 'Language' },
      { name: 'sudoku', displayName: 'Sudoku', category: 'Logic' },
      { name: 'maze', displayName: 'Maze', category: 'Logic' },
      { name: 'connect-dots', displayName: 'Connect the Dots', category: 'Art' },
      { name: 'pattern-recognition', displayName: 'Pattern Recognition', category: 'Logic' },
      { name: 'shape-matching', displayName: 'Shape Matching', category: 'Math' },
      { name: 'number-sequence', displayName: 'Number Sequence', category: 'Math' },
      { name: 'word-scramble', displayName: 'Word Scramble', category: 'Language' },
      { name: 'memory-game', displayName: 'Memory Game', category: 'Logic' },
      { name: 'spot-difference', displayName: 'Spot the Difference', category: 'Logic' },
      { name: 'clock-reading', displayName: 'Clock Reading', category: 'Math' },
    ];

    const allGenerators = [
      ...coreGenerators,
      { name: 'algebra', displayName: 'Algebra', category: 'Math' },
      { name: 'geometry', displayName: 'Geometry', category: 'Math' },
      { name: 'graph-paper', displayName: 'Graph Paper', category: 'Math' },
      { name: 'handwriting', displayName: 'Handwriting Practice', category: 'Language' },
      { name: 'spelling', displayName: 'Spelling Practice', category: 'Language' },
      { name: 'vocabulary', displayName: 'Vocabulary Builder', category: 'Language' },
      { name: 'grammar', displayName: 'Grammar Exercises', category: 'Language' },
      { name: 'reading-comprehension', displayName: 'Reading Comprehension', category: 'Language' },
      { name: 'science-diagrams', displayName: 'Science Diagrams', category: 'Science' },
      { name: 'periodic-table', displayName: 'Periodic Table', category: 'Science' },
      { name: 'map-skills', displayName: 'Map Skills', category: 'Geography' },
      { name: 'timeline', displayName: 'Timeline Creator', category: 'History' },
      { name: 'music-notes', displayName: 'Music Notes', category: 'Music' },
    ];

    let availableGenerators;
    let totalGenerators = allGenerators.length;

    switch (tier) {
      case 'FREE':
        availableGenerators = freeGenerators;
        break;
      case 'CORE':
        availableGenerators = coreGenerators;
        break;
      case 'FULL':
        availableGenerators = allGenerators;
        break;
      default:
        availableGenerators = freeGenerators;
    }

    return NextResponse.json({
      tier,
      generators: availableGenerators,
      totalAvailable: availableGenerators.length,
      totalGenerators,
      upgradeAvailable: tier !== 'FULL',
    });
  } catch (error) {
    console.error('Get generators error:', error);
    return NextResponse.json(
      { 
        generators: [],
        error: 'Failed to fetch generators',
      },
      { status: 500 }
    );
  }
}