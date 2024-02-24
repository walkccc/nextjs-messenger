import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';

import { logOut } from '@/actions/log-out';

import { useConversation } from './use-conversation';

export const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  return useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'SignOut',
        href: '#',
        onClick: () => logOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId],
  );
};
