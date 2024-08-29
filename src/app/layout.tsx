import { NavBar } from '@/components/NavBar';
import { Providers } from '@/components/providers';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Roboto as FontSans } from 'next/font/google';
import './globals.css';
import { getLocale } from 'next-intl/server';

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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
