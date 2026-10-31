import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FORMA - Intelligence Behind Your Transformation',
  description: 'AI-Powered Fitness & Nutrition Mobile Experience',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FORMA AI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#070A11',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen-ios bg-brand-dark text-gray-100 flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}

