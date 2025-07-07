import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorToastProvider } from '@/contexts/ErrorToastContext';
import Head from 'next/head';
import '../app/sentry.client.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EasyKart - Daily Essentials Delivered',
  description: 'Your one-stop shop for daily essentials. Fast delivery, great prices.',
  keywords: 'grocery, daily essentials, online shopping, delivery',
};

// Add focus style for skip link and buttons
const style = `
.skip-to-content-link {
  position: absolute;
  left: -999px;
  top: 10px;
  background: #fff;
  color: #1a202c;
  padding: 8px 16px;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-weight: bold;
}
.skip-to-content-link:focus {
  left: 10px;
  outline: 2px solid #2563eb;
}
button:focus, [role=button]:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="EasyKart - Daily Essentials Delivered" />
        <meta property="og:description" content="Your one-stop shop for daily essentials. Fast delivery, great prices." />
        <meta property="og:type" content="website" />
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`
        }} />
        <style>{style}</style>
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <a href="#main-content" className="skip-to-content-link">Skip to main content</a>
            <ErrorToastProvider>
              {children}
            </ErrorToastProvider>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}