import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';
import { jsPDF } from 'jspdf';

// POST /api/stripe/receipt - Generate receipt PDF
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paymentIntentId, paymentId } = body;

    let payment;
    let stripePayment;

    // Get payment details from database or Stripe
    if (paymentId) {
      payment = await prisma.payment.findFirst({
        where: {
          id: paymentId,
          userId: user.id,
        },
      });

      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }
    } else if (paymentIntentId) {
      // Fetch from Stripe
      try {
        stripePayment = await stripe.paymentIntents.retrieve(paymentIntentId);
        
        // Verify this payment belongs to the user
        if (stripePayment.customer !== user.stripeCustomerId) {
          return NextResponse.json(
            { error: 'Payment not found' },
            { status: 404 }
          );
        }
      } catch (err) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Payment ID required' },
        { status: 400 }
      );
    }

    // Generate PDF receipt
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    // Helper function for adding text
    const addText = (text: string, fontSize = 12, isBold = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text(text, margin, yPosition);
      yPosition += fontSize * 0.5;
    };

    const addRightAlignedText = (text: string, y: number, fontSize = 12) => {
      pdf.setFontSize(fontSize);
      const textWidth = pdf.getTextWidth(text);
      pdf.text(text, pageWidth - margin - textWidth, y);
    };

    // Header
    addText('LessonCraftStudio', 24, true);
    yPosition += 5;
    addText('Receipt', 18);
    yPosition += 10;

    // Receipt details
    const receiptData = payment ? {
      amount: payment.amount,
      currency: payment.currency,
      date: payment.createdAt,
      description: payment.description || 'Subscription payment',
      status: payment.status,
      id: payment.stripePaymentIntentId || payment.id,
    } : {
      amount: stripePayment!.amount / 100,
      currency: stripePayment!.currency,
      date: new Date(stripePayment!.created * 1000),
      description: stripePayment!.description || 'Subscription payment',
      status: stripePayment!.status,
      id: stripePayment!.id,
    };

    // Date
    addText(`Date: ${receiptData.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`);
    yPosition += 5;

    // Receipt number
    addText(`Receipt #: ${receiptData.id.slice(-8).toUpperCase()}`);
    yPosition += 10;

    // Line separator
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Bill to
    addText('BILL TO:', 12, true);
    yPosition += 5;
    addText(`${user.firstName} ${user.lastName}`.trim() || user.email);
    yPosition += 5;
    addText(user.email);
    yPosition += 15;

    // Items table
    addText('ITEMS:', 12, true);
    yPosition += 10;

    // Table header
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPosition - 5, pageWidth - margin * 2, 10, 'F');
    addText('Description', 11, true);
    addRightAlignedText('Amount', yPosition, 11);
    yPosition += 10;

    // Table content
    addText(receiptData.description);
    addRightAlignedText(
      `$${receiptData.amount.toFixed(2)} ${receiptData.currency.toUpperCase()}`,
      yPosition
    );
    yPosition += 10;

    // Line separator
    pdf.setLineWidth(0.2);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Total
    addText('Total:', 14, true);
    addRightAlignedText(
      `$${receiptData.amount.toFixed(2)} ${receiptData.currency.toUpperCase()}`,
      yPosition,
      14
    );
    yPosition += 15;

    // Payment status
    const statusColor = receiptData.status === 'succeeded' ? [0, 128, 0] as const : [255, 0, 0] as const;
    pdf.setTextColor(...statusColor);
    addText(`Payment Status: ${receiptData.status.toUpperCase()}`, 11);
    pdf.setTextColor(0, 0, 0);
    yPosition += 10;

    // Footer
    yPosition = pdf.internal.pageSize.getHeight() - 40;
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    
    // Center align footer text
    const footerText1 = 'Thank you for your business!';
    const footerText2 = 'LessonCraftStudio - Educational Worksheet Generator';
    const footerText3 = 'support@lessoncraftstudio.com';
    
    const centerText = (text: string, y: number) => {
      const textWidth = pdf.getTextWidth(text);
      pdf.text(text, (pageWidth - textWidth) / 2, y);
    };
    
    centerText(footerText1, yPosition);
    centerText(footerText2, yPosition + 5);
    centerText(footerText3, yPosition + 10);

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${receiptData.id.slice(-8)}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Receipt generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate receipt' },
      { status: 500 }
    );
  }
}

// GET /api/stripe/receipt - List user's receipts
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's payments from database
    const payments = await prisma.payment.findMany({
      where: {
        userId: user.id,
        status: 'succeeded',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Last 20 payments
    });

    // Format for response
    const receipts = payments.map(payment => ({
      id: payment.id,
      date: payment.createdAt,
      amount: payment.amount,
      currency: payment.currency,
      description: payment.description,
      downloadUrl: `/api/stripe/receipt?id=${payment.id}`,
    }));

    return NextResponse.json({ receipts });
  } catch (error) {
    console.error('Get receipts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipts' },
      { status: 500 }
    );
  }
}