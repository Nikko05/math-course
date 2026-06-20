import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

type CourseInput = {
  title: string;
  category: string;
  level: string;
  price: number;
  description: string;
  image: string;
};

export async function GET() {
  try {
    const db = await getDb();
    const courses = await db
      .collection('courses')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const normalized = courses.map((course) => ({
      ...course,
      _id: course._id.toString(),
      createdAt: course.createdAt instanceof Date ? course.createdAt.toISOString() : course.createdAt,
    }));

    return NextResponse.json({ courses: normalized });
  } catch (error) {
    return NextResponse.json(
      { message: 'Nie udało się pobrać kursów.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CourseInput;

    if (!body.title || !body.category || !body.level || !body.description || !body.image || typeof body.price !== 'number') {
      return NextResponse.json({ message: 'Niepoprawne dane kursu.' }, { status: 400 });
    }

    const db = await getDb();
    const course = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection('courses').insertOne(course);

    return NextResponse.json(
      {
        success: true,
        course: {
          ...course,
          _id: result.insertedId.toString(),
          createdAt: course.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Nie udało się dodać kursu.', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
