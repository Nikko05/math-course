import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ message: 'Brak dostępu do zasobów administratora.' }, { status: 401 });
  }

  const db = await getDb();
  const users = await db.collection('users').find().toArray();

  const normalized = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin || false,
  }));

  return NextResponse.json({ users: normalized });
}
