'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { useConversation } from '@/hooks/use-conversation';
import { FullMessageType } from '@/types';

import { MessageBox } from './message-box';

interface BodyProps {
  initialMessages: FullMessageType[];
}

export const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={i === messages.length - 1}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};
