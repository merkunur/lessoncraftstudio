// Temporarily disabled auth while setting up static pages
// Auth will be implemented after static page system is complete

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Auth not configured yet' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ message: 'Auth not configured yet' }, { status: 501 });
}