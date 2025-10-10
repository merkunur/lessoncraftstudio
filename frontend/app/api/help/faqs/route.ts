import { NextRequest, NextResponse } from 'next/server';
import { FAQItem } from '@/types/help';

export const dynamic = 'force-dynamic';

// GET /api/help/faqs - Get all FAQs
export async function GET(request: NextRequest) {
  try {
    const faqs: FAQItem[] = [
      {
        id: 'faq_1',
        question: 'How do I create my first worksheet?',
        answer: 'To create your first worksheet, navigate to the Worksheets section from the main menu. Click on "Create New Worksheet" and choose from our variety of templates. You can then customize the content, add images, and adjust the layout to fit your needs. Once you\'re satisfied, click Save to store your worksheet.',
        category: 'Getting Started',
        tags: ['beginner', 'worksheet', 'creation'],
        helpful: { yes: 245, no: 12 },
        views: 1523,
        featured: true,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_2',
        question: 'Can I share worksheets with other teachers?',
        answer: 'Yes! LessonCraft Studio allows you to share worksheets with other teachers. You can either share a direct link to your worksheet, export it as a PDF, or publish it to our community library where other educators can discover and use your creations. You can also set permissions to control who can view or edit your worksheets.',
        category: 'Sharing',
        tags: ['sharing', 'collaboration', 'teachers'],
        helpful: { yes: 189, no: 8 },
        views: 892,
        featured: true,
        relatedQuestions: ['faq_3', 'faq_7'],
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_3',
        question: 'What file formats are supported for download?',
        answer: 'LessonCraft Studio supports multiple file formats for downloading your worksheets. You can export as PDF (recommended for printing), PNG or JPEG images, Microsoft Word documents, or as interactive HTML files. The PDF format preserves all formatting and is ideal for printing and distribution.',
        category: 'Technical',
        tags: ['download', 'export', 'formats', 'pdf'],
        helpful: { yes: 156, no: 5 },
        views: 743,
        featured: false,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_4',
        question: 'Is there a limit to how many worksheets I can create?',
        answer: 'The number of worksheets you can create depends on your subscription plan. Free users can create up to 10 worksheets per month. Our Basic plan allows 50 worksheets per month, while Premium and Professional plans offer unlimited worksheet creation. All saved worksheets remain accessible regardless of your plan.',
        category: 'Billing',
        tags: ['limits', 'subscription', 'pricing'],
        helpful: { yes: 203, no: 15 },
        views: 1102,
        featured: true,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_5',
        question: 'Can I use my own images in worksheets?',
        answer: 'Absolutely! You can upload your own images to use in worksheets. We support JPG, PNG, GIF, and SVG formats. Simply click the "Upload Image" button in the editor and select your files. Please ensure you have the rights to use any images you upload. We also provide a library of free stock images you can use.',
        category: 'Features',
        tags: ['images', 'upload', 'media', 'customization'],
        helpful: { yes: 178, no: 6 },
        views: 654,
        featured: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_6',
        question: 'How do I cancel my subscription?',
        answer: 'You can cancel your subscription at any time from your Account Settings page. Go to Settings > Billing > Manage Subscription and click "Cancel Subscription". Your access will continue until the end of your current billing period. You can reactivate your subscription at any time without losing your saved worksheets.',
        category: 'Billing',
        tags: ['subscription', 'cancel', 'billing'],
        helpful: { yes: 92, no: 3 },
        views: 423,
        featured: false,
        relatedQuestions: ['faq_4'],
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_7',
        question: 'Can students submit completed worksheets online?',
        answer: 'Yes, with our digital classroom feature, students can complete and submit worksheets online. Teachers can create digital assignments, track progress in real-time, and provide instant feedback. Students access worksheets through a unique link or classroom code. This feature is available in our Basic plan and above.',
        category: 'Features',
        tags: ['students', 'submission', 'digital', 'classroom'],
        helpful: { yes: 267, no: 9 },
        views: 1345,
        featured: true,
        relatedQuestions: ['faq_2'],
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_8',
        question: 'Is LessonCraft Studio available in multiple languages?',
        answer: 'Yes! LessonCraft Studio currently supports 11 languages: English, German, French, Spanish, Portuguese, Italian, Dutch, Swedish, Danish, Norwegian, and Finnish. You can change your language preference in Settings > Language. Worksheet content can be created in any language, and we offer multilingual templates.',
        category: 'Features',
        tags: ['languages', 'multilingual', 'international'],
        helpful: { yes: 145, no: 4 },
        views: 567,
        featured: false,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_9',
        question: 'How secure is my data?',
        answer: 'We take data security seriously. All data is encrypted in transit using SSL/TLS and at rest using AES-256 encryption. We comply with GDPR, COPPA, and FERPA regulations. Your worksheets and student data are stored on secure servers with regular backups. We never share your data with third parties without your explicit consent.',
        category: 'Security',
        tags: ['security', 'privacy', 'data', 'encryption'],
        helpful: { yes: 198, no: 2 },
        views: 789,
        featured: false,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'faq_10',
        question: 'Can I print worksheets in different paper sizes?',
        answer: 'Yes, LessonCraft Studio supports multiple paper sizes including Letter (8.5"x11"), A4, Legal, and custom sizes. You can select your preferred paper size in the print settings before downloading or printing. The worksheet layout automatically adjusts to fit your chosen paper size while maintaining proper proportions.',
        category: 'Technical',
        tags: ['printing', 'paper-size', 'formatting'],
        helpful: { yes: 112, no: 3 },
        views: 445,
        featured: false,
        relatedQuestions: ['faq_3'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Failed to get FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to get FAQs' },
      { status: 500 }
    );
  }
}