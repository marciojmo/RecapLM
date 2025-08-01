// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react'
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RecapLM',
  description: 'AI-powered revision assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#f3f2f1] text-gray-900`}>
        <Suspense>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
