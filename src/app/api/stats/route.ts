import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const usersCount = await db.collection('users').countDocuments();
    const coursesCount = await db.collection('courses').countDocuments();
    const ordersCount = await db.collection('orders').countDocuments();

    return NextResponse.json({
      users: usersCount,
      courses: coursesCount,
      orders: ordersCount,
      activeStudents: usersCount,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Nie udało się pobrać statystyk.', error }, { status: 500 });
  }
}
