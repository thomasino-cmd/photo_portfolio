import { Bodoni_Moda, Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import CustomCursor from '@/components/layout/CustomCursor';
import EasterEgg from '@/components/effects/EasterEgg';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Photography Portfolio',
  description: 'Minimalist photography portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`antialiased ${bodoni.variable} ${inter.variable}`}>
      <body className="min-h-screen cursor-none font-inter relative">
        <CustomCursor />
        {/* The White Frame */}
        <div id="main-frame" className="bg-[var(--frame-bg)] min-h-[calc(100vh-calc(var(--frame-padding)*2))] border-[2px] border-black relative overflow-hidden">
          <Navigation />
          <EasterEgg />
          <main className="pt-32 pb-32 px-4 md:px-12 max-w-[2000px] mx-auto min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
