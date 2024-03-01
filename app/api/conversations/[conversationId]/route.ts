import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return Response.json(null);
    }

    const existingConversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!existingConversation) {
      return new Response('Invalid conversation ID', { status: 400 });
    }

    const deletedConversation = await db.conversation.delete({
      where: {
        id: conversationId,
        users: { some: { id: currentUser.id } },
      },
    });

    return Response.json(deletedConversation);
  } catch (error: unknown) {
    console.log(`[error] DELETE /api/conversations/:conversationId - ${error}`);
    return Response.json(null);
  }
}
