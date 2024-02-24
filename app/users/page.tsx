'use client';

import { EmptyState } from '@/components/skeleton/desktop/empty-state';

const UsersPage = () => {
  return (
    <div className="hidden h-full lg:block lg:pl-80">
      <EmptyState />
    </div>
  );
};

export default UsersPage;
