import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Valid locales
const validLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { locale, all } = body;

    const revalidatedPaths: string[] = [];

    if (all) {
      // Revalidate all locale homepages
      for (const loc of validLocales) {
        revalidatePath(`/${loc}`);
        revalidatedPaths.push(`/${loc}`);
      }
      // Also revalidate the root path
      revalidatePath('/');
      revalidatedPaths.push('/');
    } else if (locale) {
      // Validate locale
      if (!validLocales.includes(locale)) {
        return NextResponse.json({
          success: false,
          error: `Invalid locale: ${locale}. Valid options: ${validLocales.join(', ')}`,
        }, { status: 400 });
      }

      // Revalidate specific locale homepage
      revalidatePath(`/${locale}`);
      revalidatedPaths.push(`/${locale}`);
    } else {
      return NextResponse.json({
        success: false,
        error: 'Please provide either "locale" for a specific homepage or "all: true" for all homepages',
      }, { status: 400 });
    }

    console.log('[HOMEPAGE-REVALIDATE] Revalidated paths:', revalidatedPaths);

    return NextResponse.json({
      success: true,
      message: `Successfully revalidated ${revalidatedPaths.length} path(s)`,
      revalidatedPaths,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[HOMEPAGE-REVALIDATE] Error:', error);
    return NextResponse.json({
      success: false,
      error: `Revalidation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}

// Also allow GET for easier testing
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale');
  const all = searchParams.get('all') === 'true';

  // Convert to POST-like body
  const body = { locale, all };

  const revalidatedPaths: string[] = [];

  try {
    if (all) {
      for (const loc of validLocales) {
        revalidatePath(`/${loc}`);
        revalidatedPaths.push(`/${loc}`);
      }
      revalidatePath('/');
      revalidatedPaths.push('/');
    } else if (locale && validLocales.includes(locale)) {
      revalidatePath(`/${locale}`);
      revalidatedPaths.push(`/${locale}`);
    } else {
      return NextResponse.json({
        success: false,
        error: 'Please provide ?locale=XX or ?all=true',
        validLocales,
      }, { status: 400 });
    }

    console.log('[HOMEPAGE-REVALIDATE] Revalidated paths:', revalidatedPaths);

    return NextResponse.json({
      success: true,
      message: `Successfully revalidated ${revalidatedPaths.length} path(s)`,
      revalidatedPaths,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[HOMEPAGE-REVALIDATE] Error:', error);
    return NextResponse.json({
      success: false,
      error: `Revalidation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
