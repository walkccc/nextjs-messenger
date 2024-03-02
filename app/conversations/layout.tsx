import { getConversations } from '@/actions/get-conversations';
import { getUsers } from '@/actions/get-users';
import { Navigation } from '@/components/skeleton/navigation';

import { ConversationList } from './_components/conversation-list';

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const users = await getUsers();
  const conversations = await getConversations();

  return (
    <Navigation>
      <div className="h-full">{children}</div>
      <ConversationList users={users} initialConversations={conversations} />
    </Navigation>
  );
};

export default ConversationsLayout;
