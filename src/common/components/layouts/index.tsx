import type { ReactNode } from 'react';
import Header from '@/common/components/layouts/Header';
import Footer from '@/common/components/layouts/Footer';
import ScrollToTop from '@/common/components/elements/ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main className="flex flex-col gap-6 lg:gap-7 mt-6 lg:mt-8 pb-10">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
