import { NextRequest, NextResponse } from 'next/server';
import { Tutorial } from '@/types/help';

// GET /api/help/tutorials - Get all tutorials
export async function GET(request: NextRequest) {
  try {
    const tutorials: Tutorial[] = [
      {
        id: 'tutorial_1',
        title: 'Getting Started with LessonCraft Studio',
        description: 'Learn the basics of creating your first worksheet',
        category: 'getting-started',
        difficulty: 'beginner',
        duration: 10,
        steps: [
          {
            id: 'step_1',
            order: 1,
            title: 'Welcome to LessonCraft Studio',
            content: 'Welcome! This tutorial will guide you through creating your first worksheet.',
            type: 'instruction',
            position: 'center',
            skipable: false
          },
          {
            id: 'step_2',
            order: 2,
            title: 'Navigate to Worksheets',
            content: 'Click on the Worksheets tab in the navigation menu.',
            type: 'action',
            target: 'nav[role="navigation"] a[href="/worksheets"]',
            position: 'bottom',
            action: {
              type: 'click',
              selector: 'nav[role="navigation"] a[href="/worksheets"]'
            },
            skipable: false
          },
          {
            id: 'step_3',
            order: 3,
            title: 'Choose a Template',
            content: 'Select a worksheet template that fits your needs.',
            type: 'action',
            target: '.template-grid',
            position: 'right',
            skipable: false
          },
          {
            id: 'step_4',
            order: 4,
            title: 'Customize Your Worksheet',
            content: 'Use the editor tools to add content, images, and customize the layout.',
            type: 'instruction',
            position: 'left',
            skipable: false
          },
          {
            id: 'step_5',
            order: 5,
            title: 'Save Your Work',
            content: 'Click the Save button to save your worksheet.',
            type: 'action',
            target: 'button[aria-label="Save"]',
            position: 'bottom',
            skipable: false
          }
        ],
        tags: ['basics', 'worksheet', 'beginner'],
        interactive: true,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'LessonCraft Team',
        rating: 4.8,
        completions: 1234
      },
      {
        id: 'tutorial_2',
        title: 'Creating Math Worksheets',
        description: 'Master the art of creating engaging math worksheets',
        category: 'worksheets',
        difficulty: 'intermediate',
        duration: 15,
        steps: [
          {
            id: 'step_1',
            order: 1,
            title: 'Select Math Template',
            content: 'Choose from our collection of math worksheet templates.',
            type: 'instruction',
            skipable: false
          },
          {
            id: 'step_2',
            order: 2,
            title: 'Add Math Problems',
            content: 'Use the equation editor to add math problems.',
            type: 'action',
            skipable: false
          },
          {
            id: 'step_3',
            order: 3,
            title: 'Configure Difficulty',
            content: 'Set the appropriate difficulty level for your students.',
            type: 'action',
            skipable: true
          }
        ],
        tags: ['math', 'worksheets', 'education'],
        interactive: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Math Team',
        rating: 4.6,
        completions: 892
      },
      {
        id: 'tutorial_3',
        title: 'Using the Word Search Generator',
        description: 'Create custom word search puzzles for your students',
        category: 'worksheets',
        difficulty: 'beginner',
        duration: 8,
        steps: [
          {
            id: 'step_1',
            order: 1,
            title: 'Open Word Search Tool',
            content: 'Navigate to the Word Search generator from the tools menu.',
            type: 'action',
            skipable: false
          },
          {
            id: 'step_2',
            order: 2,
            title: 'Add Words',
            content: 'Enter the words you want to include in your puzzle.',
            type: 'instruction',
            skipable: false
          },
          {
            id: 'step_3',
            order: 3,
            title: 'Customize Settings',
            content: 'Choose grid size, difficulty, and theme.',
            type: 'action',
            skipable: true
          },
          {
            id: 'step_4',
            order: 4,
            title: 'Generate and Download',
            content: 'Click Generate to create your puzzle and download it.',
            type: 'action',
            skipable: false
          }
        ],
        tags: ['word-search', 'puzzles', 'games'],
        interactive: true,
        videoUrl: 'https://example.com/videos/word-search-tutorial',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Content Team',
        rating: 4.9,
        completions: 2156,
        progress: {
          tutorialId: 'tutorial_3',
          userId: 'user_123',
          currentStep: 2,
          completedSteps: [1],
          startedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          attempts: 1,
          bookmarked: true
        }
      },
      {
        id: 'tutorial_4',
        title: 'Advanced Formatting Techniques',
        description: 'Learn advanced formatting and layout techniques',
        category: 'advanced',
        difficulty: 'advanced',
        duration: 20,
        steps: [
          {
            id: 'step_1',
            order: 1,
            title: 'Master Layouts',
            content: 'Understanding grid systems and responsive layouts.',
            type: 'instruction',
            skipable: false
          },
          {
            id: 'step_2',
            order: 2,
            title: 'Custom CSS',
            content: 'Apply custom CSS for unique designs.',
            type: 'instruction',
            skipable: true
          }
        ],
        prerequisites: ['tutorial_1'],
        tags: ['advanced', 'formatting', 'design'],
        interactive: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Design Team',
        rating: 4.5,
        completions: 345
      },
      {
        id: 'tutorial_5',
        title: 'Managing Your Classroom',
        description: 'Set up and manage your virtual classroom effectively',
        category: 'getting-started',
        difficulty: 'beginner',
        duration: 12,
        steps: [
          {
            id: 'step_1',
            order: 1,
            title: 'Create a Classroom',
            content: 'Set up your first virtual classroom.',
            type: 'action',
            skipable: false
          },
          {
            id: 'step_2',
            order: 2,
            title: 'Invite Students',
            content: 'Add students to your classroom.',
            type: 'instruction',
            skipable: false
          },
          {
            id: 'step_3',
            order: 3,
            title: 'Assign Worksheets',
            content: 'Distribute worksheets to your students.',
            type: 'action',
            skipable: false
          }
        ],
        tags: ['classroom', 'management', 'teacher'],
        interactive: true,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Education Team',
        rating: 4.7,
        completions: 1567
      }
    ];

    return NextResponse.json(tutorials);
  } catch (error) {
    console.error('Failed to get tutorials:', error);
    return NextResponse.json(
      { error: 'Failed to get tutorials' },
      { status: 500 }
    );
  }
}