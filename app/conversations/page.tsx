'use client';

import clsx from 'clsx';

import { EmptyState } from '@/components/skeleton/desktop/empty-state';
import { useConversation } from '@/hooks/use-conversation';

const ConversationsPage = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx('h-full lg:block lg:pl-80', isOpen ? 'hidden' : 'block')}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
