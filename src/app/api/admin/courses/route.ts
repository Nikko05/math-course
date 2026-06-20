import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getAdminUser } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

type CourseInput = {
  title?: string;
  category?: string;
  level?: string;
  price?: number;
  description?: string;
  image?: string;
};

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ message: 'Brak dostępu do zasobów administratora.' }, { status: 401 });
  }

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
}

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ message: 'Brak dostępu do zasobów administratora.' }, { status: 401 });
  }

  const body = (await request.json()) as CourseInput;
  const { title, category, level, price, description, image } = body;

  if (!title || !category || !level || typeof price !== 'number' || !description || !image) {
    return NextResponse.json({ message: 'Wszystkie pola kursu są wymagane.' }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection('courses').insertOne({
    title: title.trim(),
    category: category.trim(),
    level: level.trim(),
    price,
    description: description.trim(),
    image: image.trim(),
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, courseId: result.insertedId.toString() }, { status: 201 });
}
