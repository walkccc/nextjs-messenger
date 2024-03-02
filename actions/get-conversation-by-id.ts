'use server';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }

    return await db.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });
  } catch {
    return null;
  }
};
