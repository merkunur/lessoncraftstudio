import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '@/types/i18n';

export const dynamic = 'force-dynamic';

// GET /api/i18n/locales - Get available locales
export async function GET(request: NextRequest) {
  try {
    const locales: Locale[] = [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        direction: 'ltr',
        enabled: true,
        default: true,
        flag: '🇬🇧',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: '.',
          thousand: ',',
          currency: '£'
        },
        currency: {
          code: 'GBP',
          symbol: '£',
          position: 'before'
        },
        completeness: 100
      },
      {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        direction: 'ltr',
        enabled: true,
        flag: '🇩🇪',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: '.',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'after'
        },
        completeness: 95
      },
      {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        direction: 'ltr',
        enabled: true,
        flag: '🇫🇷',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: ' ',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'after'
        },
        completeness: 92
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        direction: 'ltr',
        enabled: true,
        flag: '🇪🇸',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: '.',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'after'
        },
        completeness: 90
      },
      {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
        direction: 'ltr',
        enabled: true,
        flag: '🇵🇹',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: ' ',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'after'
        },
        completeness: 88
      },
      {
        code: 'it',
        name: 'Italian',
        nativeName: 'Italiano',
        direction: 'ltr',
        enabled: true,
        flag: '🇮🇹',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: '.',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'before'
        },
        completeness: 85
      },
      {
        code: 'sv',
        name: 'Swedish',
        nativeName: 'Svenska',
        direction: 'ltr',
        enabled: true,
        flag: '🇸🇪',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: ' ',
          currency: 'kr'
        },
        currency: {
          code: 'SEK',
          symbol: 'kr',
          position: 'after'
        },
        completeness: 82
      },
      {
        code: 'no',
        name: 'Norwegian',
        nativeName: 'Norsk',
        direction: 'ltr',
        enabled: true,
        flag: '🇳🇴',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: ' ',
          currency: 'kr'
        },
        currency: {
          code: 'NOK',
          symbol: 'kr',
          position: 'after'
        },
        completeness: 80
      },
      {
        code: 'da',
        name: 'Danish',
        nativeName: 'Dansk',
        direction: 'ltr',
        enabled: true,
        flag: '🇩🇰',
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: '.',
          currency: 'kr'
        },
        currency: {
          code: 'DKK',
          symbol: 'kr',
          position: 'after'
        },
        completeness: 78
      },
      {
        code: 'fi',
        name: 'Finnish',
        nativeName: 'Suomi',
        direction: 'ltr',
        enabled: true,
        flag: '🇫🇮',
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: ' ',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'after'
        },
        completeness: 75
      },
      {
        code: 'nl',
        name: 'Dutch',
        nativeName: 'Nederlands',
        direction: 'ltr',
        enabled: true,
        flag: '🇳🇱',
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
          decimal: ',',
          thousand: '.',
          currency: '€'
        },
        currency: {
          code: 'EUR',
          symbol: '€',
          position: 'before'
        },
        completeness: 85
      }
    ];

    return NextResponse.json(locales);
  } catch (error) {
    console.error('Failed to get locales:', error);
    return NextResponse.json(
      { error: 'Failed to get locales' },
      { status: 500 }
    );
  }
}

// POST /api/i18n/locales - Add or update locale
export async function POST(request: NextRequest) {
  try {
    const locale: Locale = await request.json();
    
    // In production, this would save to database
    console.log('Saving locale:', locale);
    
    return NextResponse.json({
      success: true,
      locale,
      message: 'Locale saved successfully'
    });
  } catch (error) {
    console.error('Failed to save locale:', error);
    return NextResponse.json(
      { error: 'Failed to save locale' },
      { status: 500 }
    );
  }
}