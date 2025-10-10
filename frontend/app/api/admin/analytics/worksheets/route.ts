import { NextRequest, NextResponse } from 'next/server';
import { WorksheetAnalytics } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/worksheets - Get worksheet analytics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    // Mock worksheet analytics data for development
    const worksheetAnalytics: WorksheetAnalytics = {
      totalGenerated: 15234,
      byType: {
        'Word Search': 3456,
        'Math Puzzles': 2890,
        'Coloring Pages': 2345,
        'Crosswords': 1987,
        'Alphabet Tracing': 1678,
        'Number Practice': 1456,
        'Reading Comprehension': 789,
        'Other': 633
      },
      byLanguage: {
        'English': 8234,
        'Spanish': 2345,
        'German': 1678,
        'French': 1234,
        'Portuguese': 890,
        'Italian': 567,
        'Other': 286
      },
      averagePerUser: 3.96,
      completionRate: 72.4,
      downloadRate: 89.3,
      shareRate: 23.7,
      topTemplates: [
        { id: '1', name: 'Basic Word Search', uses: 2345, rating: 4.5 },
        { id: '2', name: 'Addition Practice', uses: 1987, rating: 4.7 },
        { id: '3', name: 'Animal Coloring', uses: 1678, rating: 4.8 },
        { id: '4', name: 'Crossword Puzzle', uses: 1456, rating: 4.3 },
        { id: '5', name: 'Alphabet Train', uses: 1234, rating: 4.6 },
        { id: '6', name: 'Subtraction Game', uses: 987, rating: 4.4 },
        { id: '7', name: 'Shape Recognition', uses: 876, rating: 4.5 },
        { id: '8', name: 'Counting Practice', uses: 765, rating: 4.7 },
        { id: '9', name: 'Story Sequencing', uses: 654, rating: 4.2 },
        { id: '10', name: 'Pattern Matching', uses: 543, rating: 4.6 }
      ]
    };

    return NextResponse.json(worksheetAnalytics);
  } catch (error) {
    console.error('Failed to get worksheet analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get worksheet analytics' },
      { status: 500 }
    );
  }
}