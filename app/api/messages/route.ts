import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

interface Body {
  conversationId: string;
  message: string;
  image: string | undefined;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body: Body = await request.json();
    const { conversationId, message, image } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seenUsers: {
          create: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        },
      },
      include: {
        sender: true,
        seenUsers: true,
      },
    });

    await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seenUsers: true,
          },
        },
      },
    });

    return Response.json(newMessage);
  } catch (error: unknown) {
    console.log('[error] POST /api/messages', error);
    return new Response('Internal Error', { status: 500 });
  }
}
