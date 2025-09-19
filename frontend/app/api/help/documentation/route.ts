import { NextRequest, NextResponse } from 'next/server';
import { Documentation } from '@/types/help';

// GET /api/help/documentation - Get documentation articles
export async function GET(request: NextRequest) {
  try {
    const docs: Documentation[] = [
      {
        id: 'doc_1',
        title: 'Getting Started Guide',
        slug: 'getting-started',
        content: `# Getting Started with LessonCraft Studio\n\n## Introduction\n\nWelcome to LessonCraft Studio! This guide will help you get started with creating amazing worksheets for your students.\n\n## Creating Your First Worksheet\n\n1. **Navigate to Worksheets**: Click on the Worksheets tab in the main navigation.\n2. **Choose a Template**: Select from our variety of pre-designed templates.\n3. **Customize Content**: Add your own text, images, and formatting.\n4. **Save and Export**: Save your worksheet and export it in your preferred format.\n\n## Key Features\n\n- **Drag and Drop Editor**: Easily arrange elements on your worksheet\n- **Rich Text Formatting**: Format text with various styles and fonts\n- **Image Library**: Access thousands of educational images\n- **Auto-Save**: Never lose your work with automatic saving`,
        category: 'Getting Started',
        tags: ['beginner', 'tutorial', 'basics'],
        searchableContent: 'Getting started with LessonCraft Studio introduction creating first worksheet navigate choose template customize content save export key features drag drop editor rich text formatting image library auto-save',
        tableOfContents: [
          {
            id: 'introduction',
            title: 'Introduction',
            level: 2
          },
          {
            id: 'creating-your-first-worksheet',
            title: 'Creating Your First Worksheet',
            level: 2
          },
          {
            id: 'key-features',
            title: 'Key Features',
            level: 2
          }
        ],
        relatedDocs: ['doc_2', 'doc_3'],
        lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        version: '2.0',
        contributors: ['Documentation Team'],
        helpful: { yes: 456, no: 12 }
      },
      {
        id: 'doc_2',
        title: 'Worksheet Editor Complete Guide',
        slug: 'worksheet-editor',
        content: `# Worksheet Editor Complete Guide\n\n## Overview\n\nThe worksheet editor is the heart of LessonCraft Studio...`,
        category: 'Features',
        subcategory: 'Editor',
        tags: ['editor', 'features', 'advanced'],
        searchableContent: 'Worksheet editor complete guide overview features tools formatting',
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        version: '2.0',
        contributors: ['Tech Team', 'Documentation Team'],
        helpful: { yes: 234, no: 8 }
      },
      {
        id: 'doc_3',
        title: 'Subscription Plans and Billing',
        slug: 'subscription-billing',
        content: `# Subscription Plans and Billing\n\n## Available Plans\n\n### Free Plan\n- 10 worksheets per month\n- Basic templates\n- Standard support\n\n### Basic Plan ($9.99/month)\n- 50 worksheets per month\n- All templates\n- Priority support\n- Digital classroom\n\n### Premium Plan ($19.99/month)\n- Unlimited worksheets\n- Premium templates\n- Advanced features\n- API access`,
        category: 'Account',
        subcategory: 'Billing',
        tags: ['subscription', 'billing', 'pricing', 'plans'],
        searchableContent: 'Subscription plans billing available free basic premium unlimited worksheets templates support',
        lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        version: '1.5',
        contributors: ['Billing Team'],
        helpful: { yes: 189, no: 15 }
      },
      {
        id: 'doc_4',
        title: 'API Documentation',
        slug: 'api-documentation',
        content: `# API Documentation\n\n## Authentication\n\nAll API requests require authentication using an API key...`,
        category: 'Developer',
        tags: ['api', 'developer', 'integration', 'technical'],
        searchableContent: 'API documentation authentication requests endpoints integration',
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        version: '3.0',
        contributors: ['API Team', 'Tech Team'],
        helpful: { yes: 78, no: 3 }
      },
      {
        id: 'doc_5',
        title: 'Keyboard Shortcuts',
        slug: 'keyboard-shortcuts',
        content: `# Keyboard Shortcuts\n\n## General\n- **Ctrl/Cmd + S**: Save worksheet\n- **Ctrl/Cmd + Z**: Undo\n- **Ctrl/Cmd + Y**: Redo\n\n## Editor\n- **Ctrl/Cmd + B**: Bold text\n- **Ctrl/Cmd + I**: Italic text\n- **Ctrl/Cmd + U**: Underline text`,
        category: 'Reference',
        tags: ['shortcuts', 'keyboard', 'productivity'],
        searchableContent: 'Keyboard shortcuts general save undo redo editor bold italic underline',
        lastModified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        version: '1.0',
        contributors: ['Documentation Team'],
        helpful: { yes: 312, no: 5 }
      }
    ];

    return NextResponse.json(docs);
  } catch (error) {
    console.error('Failed to get documentation:', error);
    return NextResponse.json(
      { error: 'Failed to get documentation' },
      { status: 500 }
    );
  }
}