import { NextRequest, NextResponse } from 'next/server';
import { DataExport } from '@/types/backup';

export const dynamic = 'force-dynamic';

// POST /api/admin/backup/export - Export data
export async function POST(request: NextRequest) {
  try {
    const { format = 'json', includeData = {} } = await request.json();

    // Default data selection
    const defaultIncludeData = {
      users: true,
      worksheets: true,
      templates: true,
      media: true,
      settings: true,
      analytics: false,
      logs: false
    };

    const dataSelection = { ...defaultIncludeData, ...includeData };

    // Mock export data based on format
    let exportData: any;
    let contentType: string;
    let fileName: string;

    switch (format) {
      case 'json':
        exportData = {
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
          data: {
            users: dataSelection.users ? [
              { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'teacher' }
            ] : [],
            worksheets: dataSelection.worksheets ? [
              { id: 1, title: 'Math Worksheet 1', type: 'addition', grade: 3 },
              { id: 2, title: 'Word Search Animals', type: 'wordsearch', grade: 2 }
            ] : [],
            templates: dataSelection.templates ? [
              { id: 1, name: 'Basic Addition', category: 'math' },
              { id: 2, name: 'Animal Word Search', category: 'language' }
            ] : [],
            settings: dataSelection.settings ? {
              siteName: 'LessonCraft Studio',
              timezone: 'UTC',
              language: 'en'
            } : {}
          }
        };
        contentType = 'application/json';
        fileName = `export_${Date.now()}.json`;
        break;

      case 'csv':
        // Simple CSV for users
        const csvHeaders = 'id,name,email,role\n';
        const csvData = dataSelection.users ? 
          '1,John Doe,john@example.com,admin\n2,Jane Smith,jane@example.com,teacher' : '';
        exportData = csvHeaders + csvData;
        contentType = 'text/csv';
        fileName = `export_${Date.now()}.csv`;
        break;

      case 'xml':
        exportData = `<?xml version="1.0" encoding="UTF-8"?>
<export>
  <metadata>
    <exportedAt>${new Date().toISOString()}</exportedAt>
    <version>1.0.0</version>
  </metadata>
  <data>
    ${dataSelection.users ? `
    <users>
      <user id="1">
        <name>John Doe</name>
        <email>john@example.com</email>
        <role>admin</role>
      </user>
      <user id="2">
        <name>Jane Smith</name>
        <email>jane@example.com</email>
        <role>teacher</role>
      </user>
    </users>` : ''}
    ${dataSelection.worksheets ? `
    <worksheets>
      <worksheet id="1">
        <title>Math Worksheet 1</title>
        <type>addition</type>
        <grade>3</grade>
      </worksheet>
    </worksheets>` : ''}
  </data>
</export>`;
        contentType = 'application/xml';
        fileName = `export_${Date.now()}.xml`;
        break;

      case 'sql':
        exportData = `-- LessonCraft Studio Database Export
-- Generated at ${new Date().toISOString()}
-- Version: 1.0.0

${dataSelection.users ? `-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50)
);

INSERT INTO users (id, name, email, role) VALUES
  (1, 'John Doe', 'john@example.com', 'admin'),
  (2, 'Jane Smith', 'jane@example.com', 'teacher');
` : ''}

${dataSelection.worksheets ? `-- Worksheets table
CREATE TABLE IF NOT EXISTS worksheets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  type VARCHAR(50),
  grade INTEGER
);

INSERT INTO worksheets (id, title, type, grade) VALUES
  (1, 'Math Worksheet 1', 'addition', 3),
  (2, 'Word Search Animals', 'wordsearch', 2);
` : ''}`;
        contentType = 'application/sql';
        fileName = `export_${Date.now()}.sql`;
        break;

      case 'zip':
        // For ZIP, we would normally create a compressed archive
        // For demo, return a simple JSON with metadata
        exportData = JSON.stringify({
          format: 'zip',
          message: 'ZIP export would contain all selected data in compressed format',
          contents: Object.keys(dataSelection).filter(key => dataSelection[key])
        });
        contentType = 'application/zip';
        fileName = `export_${Date.now()}.zip`;
        break;

      default:
        return NextResponse.json(
          { error: 'Unsupported export format' },
          { status: 400 }
        );
    }

    // Convert data to appropriate format
    const blob = typeof exportData === 'string' 
      ? new Blob([exportData], { type: contentType })
      : new Blob([JSON.stringify(exportData, null, 2)], { type: contentType });

    // Return the file as a response
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    });
  } catch (error) {
    console.error('Failed to export data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

// GET /api/admin/backup/export - Get export history
export async function GET(request: NextRequest) {
  try {
    // Mock export history
    const exports: DataExport[] = [
      {
        id: 'export_1',
        name: 'Full Data Export',
        format: 'json',
        status: 'completed',
        includeData: {
          users: true,
          worksheets: true,
          templates: true,
          media: true,
          settings: true,
          analytics: true,
          logs: false
        },
        compression: true,
        encryption: true,
        size: 15728640, // 15MB
        recordCount: 12456,
        downloadUrl: '/exports/export_1.json',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'export_2',
        name: 'Users CSV Export',
        format: 'csv',
        status: 'completed',
        includeData: {
          users: true,
          worksheets: false,
          templates: false,
          media: false,
          settings: false,
          analytics: false,
          logs: false
        },
        compression: false,
        encryption: false,
        size: 524288, // 512KB
        recordCount: 1543,
        downloadUrl: '/exports/export_2.csv',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'export_3',
        name: 'Database Backup SQL',
        format: 'sql',
        status: 'processing',
        includeData: {
          users: true,
          worksheets: true,
          templates: true,
          media: false,
          settings: true,
          analytics: false,
          logs: false
        },
        compression: true,
        encryption: true,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      }
    ];

    return NextResponse.json(exports);
  } catch (error) {
    console.error('Failed to get export history:', error);
    return NextResponse.json(
      { error: 'Failed to get export history' },
      { status: 500 }
    );
  }
}