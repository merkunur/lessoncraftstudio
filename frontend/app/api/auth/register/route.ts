import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { queueEmail } from '@/lib/email/queue';
import { VerificationEmail } from '@/lib/email/templates';
import { render } from '@react-email/render';

export const dynamic = 'force-dynamic';

// Validation schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  locale: z.string().optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);
    
    // Generate verification token
    const verificationToken = crypto.randomUUID();
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        language: validatedData.locale,
        verificationToken,
        subscriptionTier: 'free',
        emailVerified: false, // For development, set to true to skip email verification
      }
    });
    
    // Send verification email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com';
    const verificationUrl = `${appUrl}/auth/verify-email?token=${verificationToken}`;

    try {
      const emailHtml = await render(
        VerificationEmail({
          firstName: validatedData.firstName,
          verificationUrl,
          language: validatedData.locale,
        })
      );

      await queueEmail({
        to: user.email,
        subject: validatedData.locale === 'de' ? 'Bestätigen Sie Ihre E-Mail-Adresse' :
                 validatedData.locale === 'fr' ? 'Vérifiez votre adresse email' :
                 validatedData.locale === 'es' ? 'Verifica tu dirección de correo' :
                 'Verify your email address',
        html: emailHtml,
        metadata: {
          type: 'verification',
          userId: user.id,
        },
      }, { priority: 'high' });

      console.log(`[Register] Verification email queued for ${user.email}`);
    } catch (emailError) {
      console.error('[Register] Failed to queue verification email:', emailError);
      // Don't fail registration if email fails - user can request resend
    }
    
    return NextResponse.json({
      message: 'Registration successful',
      userId: user.id
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.flatten() },
        { status: 400 }
      );
    }
    
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}