'use server';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const getConversations = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }

  try {
    return await db.conversation.findMany({
      where: { users: { some: { id: currentUser.id } } },
      orderBy: { lastMessageAt: 'desc' },
      include: {
        messages: {
          include: {
            sender: true,
            seenUsers: {
              include: {
                user: true,
                message: true,
              },
            },
          },
        },
        users: true,
      },
    });
  } catch {
    return [];
  }
};
