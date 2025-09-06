'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">LessonCraftStudio</h3>
            <p className="text-sm">
              Professional worksheet generators for educational publishers.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/apps`} className="hover:text-white">Apps</Link></li>
              <li><Link href={`/${locale}/pricing`} className="hover:text-white">Pricing</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/help`} className="hover:text-white">Help Center</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white">Contact</Link></li>
              <li><Link href={`/${locale}/faq`} className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/terms`} className="hover:text-white">Terms of Service</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href={`/${locale}/license`} className="hover:text-white">License Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2024 LessonCraftStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}