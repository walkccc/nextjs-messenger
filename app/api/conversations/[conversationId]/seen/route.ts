import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: {
            seenUsers: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new Response('Conversation not found', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return Response.json(conversation);
    }

    const updatedMessage = await db.message.update({
      where: { id: lastMessage.id },
      data: {
        seenUsers: {
          connectOrCreate: {
            where: {
              userId_messageId: {
                userId: currentUser.id,
                messageId: lastMessage.id,
              },
            },
            create: {
              user: {
                connect: {
                  id: currentUser.id,
                },
              },
            },
          },
        },
      },
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
    return Response.json(updatedMessage);
  } catch (error: unknown) {
    console.log('[error] POST /api/conversations/:conversationId/seen', error);
    return new Response('Internal Error', { status: 500 });
  }
}
