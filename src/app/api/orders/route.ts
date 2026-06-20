import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('user-session')?.value;

    if (!userId) {
      return NextResponse.json(
        { message: 'Musisz być zalogowany, aby złożyć zamówienie.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, totalPrice } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Koszyk jest pusty lub niepoprawny.' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Verify user exists
    let user = null;
    try {
      user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    } catch (e) {
      return NextResponse.json(
        { message: 'Niepoprawna sesja użytkownika.' },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { message: 'Użytkownik nie istnieje.' },
        { status: 404 }
      );
    }

    const order = {
      userId: user._id.toString(),
      userEmail: user.email,
      userName: user.name,
      items: items.map((cartItem: any) => ({
        courseId: cartItem.item._id,
        title: cartItem.item.title,
        price: cartItem.item.price,
        amount: cartItem.amount,
      })),
      totalPrice,
      status: 'completed',
      createdAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(order);

    return NextResponse.json(
      {
        success: true,
        orderId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Wystąpił błąd podczas składania zamówienia.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
