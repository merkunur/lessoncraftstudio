import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS configuration for API routes
 * Allows cross-origin requests from allowed origins
 */

const getAllowedOrigins = (): string[] => {
  const origins = process.env.CORS_ALLOWED_ORIGINS || '';

  // Default allowed origins
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];

  // Add custom origins from env
  const customOrigins = origins
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  return [...defaultOrigins, ...customOrigins];
};

export function corsHeaders(origin: string | null): HeadersInit {
  const allowedOrigins = getAllowedOrigins();

  // Check if origin is allowed
  const isAllowed = origin && (
    allowedOrigins.includes(origin) ||
    allowedOrigins.includes('*')
  );

  if (!isAllowed) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

export function handleCors(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');

  // Handle OPTIONS preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  return null;
}

export function addCorsHeaders(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Wrapper for API routes that need CORS support
 */
export function withCors(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    // Handle preflight
    const corsResponse = handleCors(request);
    if (corsResponse) {
      return corsResponse;
    }

    // Call the handler
    const response = await handler(request);

    // Add CORS headers to response
    return addCorsHeaders(response, request);
  };
}
