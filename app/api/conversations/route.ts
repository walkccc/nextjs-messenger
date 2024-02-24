import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

interface Body {
  friendId: string;
  isGroup: boolean;
  members: { value: string }[];
  name: string;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body: Body = await request.json();
    const { friendId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new Response('Invalid group', { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return Response.json(newConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: friendId } } },
        ],
      },
    });
    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return Response.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        isGroup,
        users: {
          connect: [{ id: currentUser.id }, { id: friendId }],
        },
      },
      include: {
        users: true,
      },
    });
    return Response.json(newConversation);
  } catch (error: unknown) {
    console.log(`[error] POST /api/conversations - ${error}`);
    return new Response('Internal Error', { status: 500 });
  }
}
