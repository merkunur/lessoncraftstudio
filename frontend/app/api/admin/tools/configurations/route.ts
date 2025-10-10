import { NextRequest, NextResponse } from 'next/server';
import { ConfigurationItem } from '@/types/admin-tools';

export const dynamic = 'force-dynamic';

// GET /api/admin/tools/configurations - Get all configurations
export async function GET(request: NextRequest) {
  try {
    const configs: ConfigurationItem[] = [
      {
        id: 'config_1',
        key: 'app.name',
        value: 'LessonCraft Studio',
        type: 'string',
        category: 'Application',
        environment: 'all',
        description: 'Application display name',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          min: 3,
          max: 50
        },
        history: [],
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_2',
        key: 'app.max_file_size',
        value: 10485760, // 10MB
        type: 'number',
        category: 'Application',
        environment: 'all',
        description: 'Maximum file upload size in bytes',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          min: 1048576,  // 1MB
          max: 104857600 // 100MB
        },
        history: [
          {
            id: 'hist_1',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            previousValue: 5242880,
            newValue: 10485760,
            changedBy: 'admin@lessoncraft.com',
            reason: 'Increased limit for larger worksheet images'
          }
        ],
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_3',
        key: 'features.ai_enabled',
        value: false,
        type: 'boolean',
        category: 'Features',
        environment: 'production',
        description: 'Enable AI-powered features',
        encrypted: false,
        editable: true,
        history: [],
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_4',
        key: 'email.smtp_host',
        value: 'smtp.sendgrid.net',
        type: 'string',
        category: 'Email',
        environment: 'all',
        description: 'SMTP server hostname',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          pattern: '^[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        history: [],
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_5',
        key: 'email.api_key',
        value: '***********',
        type: 'secret',
        category: 'Email',
        environment: 'production',
        description: 'SendGrid API key',
        encrypted: true,
        editable: true,
        validation: {
          required: true
        },
        history: [],
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_6',
        key: 'storage.provider',
        value: 'aws',
        type: 'string',
        category: 'Storage',
        environment: 'production',
        description: 'Cloud storage provider',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          options: ['aws', 'gcp', 'azure', 'local']
        },
        history: [],
        createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_7',
        key: 'cache.ttl',
        value: 3600, // 1 hour
        type: 'number',
        category: 'Cache',
        environment: 'all',
        description: 'Default cache TTL in seconds',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          min: 60,
          max: 86400
        },
        history: [],
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      },
      {
        id: 'config_8',
        key: 'security.session_timeout',
        value: 1800, // 30 minutes
        type: 'number',
        category: 'Security',
        environment: 'all',
        description: 'Session timeout in seconds',
        encrypted: false,
        editable: true,
        validation: {
          required: true,
          min: 300,
          max: 7200
        },
        history: [],
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@lessoncraft.com'
      }
    ];

    return NextResponse.json(configs);
  } catch (error) {
    console.error('Failed to get configurations:', error);
    return NextResponse.json(
      { error: 'Failed to get configurations' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/tools/configurations/[id] - Update configuration
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, update configuration in database
    return NextResponse.json({
      success: true,
      message: 'Configuration updated'
    });
  } catch (error) {
    console.error('Failed to update configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}