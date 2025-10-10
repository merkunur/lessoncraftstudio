'use client';


import { useState, useEffect, useCallback  } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  Clock,
  Star,
  TrendingUp,
  FileText,
  Users,
  Mail,
  DollarSign,
  Image,
  Calendar,
  Tag,
  ChevronRight,
  ChevronDown,
  Settings,
  Save,
  Trash2,
  ExternalLink,
  Database,
  BarChart3,
  Hash
} from 'lucide-react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

interface SearchResult {
  id: string;
  type: 'user' | 'worksheet' | 'blog' | 'email' | 'subscription' | 'ticket' | 'file';
  title: string;
  description: string;
  url: string;
  icon: any;
  metadata: {
    created: string;
    updated: string;
    author?: string;
    status?: string;
    tags?: string[];
  };
  relevance: number;
  highlights: string[];
}
export default GlobalSearchPageContent;