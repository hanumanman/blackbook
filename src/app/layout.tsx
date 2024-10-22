import { NavBar } from '@/components/NavBar';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Roboto as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Blackbook',
  description: 'Hắc Ngọc Thư',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-gray-200 dark:bg-background/40 font-sans antialiased', fontSans.variable)}>
        <Providers>
          <NavBar />
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
