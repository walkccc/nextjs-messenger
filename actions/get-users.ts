'use server';

import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export const getUsers = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return [];
    }
    return await db.user.findMany({
      where: { NOT: { id: currentUser.id } },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
};
