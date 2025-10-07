import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Centralized error handler for API routes
 * Converts different error types into appropriate HTTP responses
 */
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  // Custom API Error
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code
      },
      { status: error.statusCode }
    );
  }

  // Zod Validation Error
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  // Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'Resource already exists',
          code: error.code,
          field: (error.meta?.target as string[])?.[0] || 'unknown',
        },
        { status: 409 }
      );
    }

    // Record not found
    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          error: 'Resource not found',
          code: error.code
        },
        { status: 404 }
      );
    }

    // Foreign key constraint violation
    if (error.code === 'P2003') {
      return NextResponse.json(
        {
          error: 'Invalid reference - related record does not exist',
          code: error.code
        },
        { status: 400 }
      );
    }

    // Generic Prisma error
    return NextResponse.json(
      {
        error: 'Database operation failed',
        code: error.code
      },
      { status: 500 }
    );
  }

  // Prisma Validation Error
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      {
        error: 'Invalid data provided',
        details: 'Schema validation failed'
      },
      { status: 400 }
    );
  }

  // Standard Error with message
  if (error instanceof Error) {
    // Don't expose internal error messages in production
    const message = process.env.NODE_ENV === 'development'
      ? error.message
      : 'Internal server error';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }

  // Unknown error type
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}

/**
 * Common HTTP error responses
 */
export const ErrorResponses = {
  unauthorized: () =>
    NextResponse.json(
      { error: 'Unauthorized - Please sign in' },
      { status: 401 }
    ),

  forbidden: (message = 'Forbidden - Insufficient permissions') =>
    NextResponse.json(
      { error: message },
      { status: 403 }
    ),

  notFound: (resource = 'Resource') =>
    NextResponse.json(
      { error: `${resource} not found` },
      { status: 404 }
    ),

  badRequest: (message = 'Bad request') =>
    NextResponse.json(
      { error: message },
      { status: 400 }
    ),

  conflict: (message = 'Resource already exists') =>
    NextResponse.json(
      { error: message },
      { status: 409 }
    ),

  tooManyRequests: (message = 'Too many requests - Please try again later') =>
    NextResponse.json(
      { error: message },
      { status: 429 }
    ),

  internalError: (message = 'Internal server error') =>
    NextResponse.json(
      { error: message },
      { status: 500 }
    ),
};
