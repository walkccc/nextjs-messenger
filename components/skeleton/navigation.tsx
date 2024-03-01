'use client';

import { useCurrentUser } from '@/hooks/use-current-user';

import { Sidebar } from './desktop/sidebar';
import { Footer } from './mobile/footer';

interface NavigationProps {
  children: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="h-full">
      <Sidebar currentUser={currentUser} />
      <Footer />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};
