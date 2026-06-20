import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export type UserRecord = {
  _id: ObjectId;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: Date;
};

export async function getCurrentUser(): Promise<UserRecord | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('user-session')?.value;

  if (!sessionId) {
    return null;
  }

  try {
    const db = await getDb();
    const user = await db
      .collection<UserRecord>('users')
      .findOne({ _id: new ObjectId(sessionId) });

    return user || null;
  } catch {
    return null;
  }
}

export async function getAdminUser(): Promise<UserRecord | null> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin) {
    return null;
  }
  return user;
}
