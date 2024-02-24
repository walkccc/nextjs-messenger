'use client';

import { Sidebar } from './desktop/sidebar';
import { Footer } from './mobile/footer';

interface NavigationProps {
  children: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <div className="h-full">
      <Sidebar />
      <Footer />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};
