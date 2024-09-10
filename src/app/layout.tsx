import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { headerItems, headerTitle } from './constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bin-I: Informative Waste Management Portal',
	description: 'Informative Waste Management Portal',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-h-screen pt-12 bg-gray-100" id="root">
          <Header headerTitle={headerTitle} headerItems={headerItems} />
                {children}
            <Footer />
        </div>
      </body>
    </html>
  );
}
