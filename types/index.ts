import { Conversation, Message, MessagesOnUsers, User } from '@prisma/client';

export type FullMessagesOnUsersType = MessagesOnUsers & {
  user: User;
  message: Message;
};

export type FullMessageType = Message & {
  sender: User;
  seenUsers: FullMessagesOnUsersType[];
};

export type FullConversationType = Conversation & {
  messages: FullMessageType[];
  users: User[];
};
