import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { headerButton, headerItems, headerTitle } from './constants';

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
        <div className="max-h-screen pt-20">
          <Header headerTitle={headerTitle} headerItems={headerItems} headerButton={headerButton}/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
