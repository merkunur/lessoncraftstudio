import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

/**
 * POST /api/gdpr/delete
 *
 * GDPR Article 17: Right to Erasure
 * Permanently delete user account and associated data
 *
 * Body: { confirmEmail: string }
 */
export async function POST(req: NextRequest) {
  try {
    // Verify authenticated user
    const currentUser = await getAuthUser(req);
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const { confirmEmail } = await req.json();

    // Verify email confirmation
    if (confirmEmail !== currentUser.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email confirmation does not match. Account deletion requires exact email match.',
        },
        { status: 400 }
      );
    }

    // Get user data before deletion
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        subscriptions: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Log deletion request before performing deletion
    try {
      await prisma.activityLog.create({
        data: {
          userId: currentUser.id,
          action: 'GDPR_ACCOUNT_DELETION_REQUESTED',
          details: `Account deletion requested for ${user.email}`,
          metadata: {
            email: user.email,
            timestamp: new Date().toISOString(),
          },
          ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
          userAgent: req.headers.get('user-agent'),
        },
      });
    } catch (err) {
      console.log('Could not log deletion request:', err);
    }

    // Step 1: Cancel all active Stripe subscriptions
    if (user.stripeCustomerId) {
      try {
        const activeSubscriptions = user.subscriptions.filter(
          sub => sub.status === 'active' || sub.status === 'past_due'
        );

        for (const subscription of activeSubscriptions) {
          if (subscription.stripeSubscriptionId) {
            await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
            console.log(`Canceled subscription: ${subscription.stripeSubscriptionId}`);
          }
        }
      } catch (error) {
        console.error('Error canceling Stripe subscriptions:', error);
        // Continue with deletion even if Stripe cancellation fails
      }
    }

    // Step 2: Anonymize payment records (must retain for 7 years for tax/legal)
    await prisma.payment.updateMany({
      where: { userId: currentUser.id },
      data: {
        userId: 'DELETED_USER',
        // Keep transaction data but remove user link
      },
    });

    // Step 3: Delete user-specific data (cascade will handle related records)
    // This will delete:
    // - User record
    // - Sessions
    // - Subscriptions (except payment records which are anonymized)
    // - Activity logs
    // - Any other related data with cascade delete
    await prisma.user.delete({
      where: { id: currentUser.id },
    });

    // Step 4: Request Stripe to delete customer data
    // Note: Stripe may retain some data for legal/compliance reasons
    if (user.stripeCustomerId) {
      try {
        await stripe.customers.del(user.stripeCustomerId);
        console.log(`Deleted Stripe customer: ${user.stripeCustomerId}`);
      } catch (error) {
        console.error('Error deleting Stripe customer:', error);
        // Customer was already deleted or doesn't exist
      }
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Account successfully deleted',
      deletionDetails: {
        userId: currentUser.id,
        email: user.email,
        deletedAt: new Date().toISOString(),
        dataRetention: {
          personalData: 'Immediately deleted',
          paymentRecords: 'Anonymized and retained for 7 years (legal requirement)',
          stripeData: 'Deletion requested (subject to Stripe retention policies)',
        },
      },
    });
  } catch (error) {
    console.error('Error deleting user account:', error);

    // Special handling for user not found (might have been deleted already)
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Account has already been deleted',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete account. Please contact support.',
      },
      { status: 500 }
    );
  }
}
