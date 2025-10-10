'use client';


import { useEffect, useState  } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Loader2, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  invoiceUrl?: string;
  receiptUrl?: string;
  subscriptionTier?: string;
}
export default PaymentSuccessPageContent;