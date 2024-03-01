import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

interface Body {
  name: string;
  image: string;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body: Body = await request.json();
    const { name, image } = body;
    if (!currentUser?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: { name, image },
    });

    console.log(updatedUser);
    return Response.json(updatedUser);
  } catch (error: unknown) {
    console.log('[error] POST /api/settings', error);
    return new Response('Error', { status: 500 });
  }
}
