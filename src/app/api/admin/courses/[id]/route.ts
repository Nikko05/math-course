import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getAdminUser } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ message: 'Brak dostępu do zasobów administratora.' }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Nieprawidłowe ID kursu.' }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: 'Nie znaleziono kursu do usunięcia.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
