'use server';

import { db } from '@/lib/db';

export const getMessages = async (conversationId: string) => {
  try {
    return await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: true,
        seenUsers: {
          include: {
            user: true,
            message: true,
          },
        },
      },
    });
  } catch {
    return [];
  }
};
