'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

import { useConversation } from '@/hooks/use-conversation';
import { FullConversationType } from '@/types';

import { ConversationBox } from './conversation-box';
import { GroupChatModal } from './group-chat-modal';

interface ConversationListProps {
  users: User[];
  initialConversations: FullConversationType[];
}

export const ConversationList = ({
  users,
  initialConversations,
}: ConversationListProps) => {
  const [conversations, _] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { conversationId, isOpen } = useConversation();
  const router = useRouter();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`,
          isOpen ? 'hidden' : 'left-0 block w-full',
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
