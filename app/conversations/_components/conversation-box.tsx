'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';

import { Avatar } from '@/components/global/avatar';
import { AvatarGroup } from '@/components/global/avatar-group';
import { useOtherUser } from '@/hooks/use-other-user';
import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  conversation: FullConversationType;
  selected?: boolean;
}

export const ConversationBox = ({
  conversation,
  selected,
}: ConversationBoxProps) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [router, conversation.id]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email],
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) {
      return false;
    }

    const seenUsers = lastMessage.seenUsers || [];
    return seenUsers.filter(({ user }) => user?.email === userEmail).length > 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100`,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="mb-1 flex items-center justify-between">
            <p className="text-md font-medium text-gray-900">
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? 'text-gray-500' : 'font-medium text-black',
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
