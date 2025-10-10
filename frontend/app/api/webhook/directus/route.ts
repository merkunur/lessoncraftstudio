import { NextRequest, NextResponse } from 'next/server';
import imageLibraryManager from '@/lib/image-library-manager';

export const dynamic = 'force-dynamic';

// Webhook secret for security (should be in env vars)
const WEBHOOK_SECRET = process.env.DIRECTUS_WEBHOOK_SECRET || 'your-webhook-secret-here';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('x-webhook-secret');
    if (authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse webhook payload
    const payload = await request.json();
    console.log('📬 Webhook received from Directus:', payload.event);

    // Trigger sync based on event type
    const relevantEvents = [
      'items.create',
      'items.update',
      'items.delete',
      'files.upload',
      'files.delete'
    ];

    if (relevantEvents.some(event => payload.event?.startsWith(event))) {
      // Check if it's related to our collections
      const collection = payload.collection || payload.event?.split('.')[0];
      
      if (collection === 'image_themes' || collection === 'worksheet_images' || collection === 'directus_files') {
        console.log('🔄 Triggering automatic sync due to webhook...');
        
        // Schedule sync with a small delay to allow Directus to complete its operations
        setTimeout(async () => {
          const success = await imageLibraryManager.forceSync();
          if (success) {
            console.log('✅ Webhook-triggered sync completed');
          } else {
            console.log('⚠️ Webhook-triggered sync failed, using cache');
          }
        }, 2000); // 2 second delay
        
        return NextResponse.json({
          success: true,
          message: 'Sync scheduled',
          event: payload.event
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action needed',
      event: payload.event
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to verify webhook is accessible
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'Webhook endpoint ready',
    instructions: 'Configure Directus to send webhooks to POST /api/webhook/directus',
    requiredHeader: 'x-webhook-secret',
    supportedEvents: [
      'items.create.image_themes',
      'items.update.image_themes',
      'items.delete.image_themes',
      'items.create.worksheet_images',
      'items.update.worksheet_images',
      'items.delete.worksheet_images',
      'files.upload',
      'files.delete'
    ]
  });
}