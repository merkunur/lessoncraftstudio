import { NextRequest, NextResponse } from 'next/server';
import { VideoGuide } from '@/types/help';

// GET /api/help/videos - Get all video guides
export async function GET(request: NextRequest) {
  try {
    const videos: VideoGuide[] = [
      {
        id: 'video_1',
        title: 'Welcome to LessonCraft Studio',
        description: 'A comprehensive introduction to all the features of LessonCraft Studio',
        thumbnail: '/images/video-thumbnails/welcome.jpg',
        videoUrl: 'https://example.com/videos/welcome.mp4',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 420, // 7 minutes
        category: 'Getting Started',
        tags: ['introduction', 'overview', 'beginner'],
        chapters: [
          {
            title: 'Introduction',
            startTime: 0,
            endTime: 60,
            description: 'Welcome and overview'
          },
          {
            title: 'Dashboard Tour',
            startTime: 60,
            endTime: 180,
            description: 'Exploring the main dashboard'
          },
          {
            title: 'Creating Your First Worksheet',
            startTime: 180,
            endTime: 300,
            description: 'Step-by-step worksheet creation'
          },
          {
            title: 'Tips and Tricks',
            startTime: 300,
            endTime: 420,
            description: 'Pro tips for power users'
          }
        ],
        views: 15234,
        likes: 892,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'LessonCraft Team'
      },
      {
        id: 'video_2',
        title: 'Creating Interactive Math Worksheets',
        description: 'Learn how to create engaging math worksheets with interactive elements',
        thumbnail: '/images/video-thumbnails/math.jpg',
        videoUrl: 'https://example.com/videos/math-worksheets.mp4',
        duration: 600, // 10 minutes
        category: 'Tutorials',
        tags: ['math', 'interactive', 'worksheets'],
        views: 8456,
        likes: 523,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Math Department'
      },
      {
        id: 'video_3',
        title: '5 Time-Saving Tips for Teachers',
        description: 'Quick tips to streamline your worksheet creation process',
        thumbnail: '/images/video-thumbnails/tips.jpg',
        videoUrl: 'https://example.com/videos/teacher-tips.mp4',
        duration: 180, // 3 minutes
        category: 'Tips & Tricks',
        tags: ['tips', 'productivity', 'teachers'],
        relatedVideos: ['video_1', 'video_4'],
        views: 12789,
        likes: 1024,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Education Team'
      },
      {
        id: 'video_4',
        title: 'Advanced Features Deep Dive',
        description: 'Explore advanced features for power users',
        thumbnail: '/images/video-thumbnails/advanced.jpg',
        videoUrl: 'https://example.com/videos/advanced-features.mp4',
        duration: 900, // 15 minutes
        category: 'Advanced',
        tags: ['advanced', 'features', 'power-user'],
        chapters: [
          {
            title: 'Custom Templates',
            startTime: 0,
            endTime: 300
          },
          {
            title: 'API Integration',
            startTime: 300,
            endTime: 600
          },
          {
            title: 'Automation Tools',
            startTime: 600,
            endTime: 900
          }
        ],
        views: 4567,
        likes: 345,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Tech Team'
      },
      {
        id: 'video_5',
        title: 'Student Management and Tracking',
        description: 'How to manage students and track their progress',
        thumbnail: '/images/video-thumbnails/students.jpg',
        videoUrl: 'https://example.com/videos/student-management.mp4',
        duration: 480, // 8 minutes
        category: 'Classroom Management',
        tags: ['students', 'tracking', 'management', 'classroom'],
        views: 6234,
        likes: 412,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'LessonCraft Team'
      }
    ];

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Failed to get videos:', error);
    return NextResponse.json(
      { error: 'Failed to get videos' },
      { status: 500 }
    );
  }
}