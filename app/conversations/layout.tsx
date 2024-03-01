import { getConversations } from '@/actions/get-conversations';
import { Navigation } from '@/components/skeleton/navigation';

import { ConversationList } from './_components/conversation-list';

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const conversations = await getConversations();

  return (
    <Navigation>
      <div className="h-full">{children}</div>
      <ConversationList initialConversations={conversations} />
    </Navigation>
  );
};

export default ConversationsLayout;
