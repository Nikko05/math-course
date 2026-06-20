import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { getDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Wszystkie pola są wymagane." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === 'admin') {
    return NextResponse.json({ message: 'Rejestracja loginu admin jest niedozwolona.' }, { status: 403 });
  }

  const db = await getDb();
  const existingUser = await db.collection("users").findOne({ email: normalizedEmail });

  if (existingUser) {
    return NextResponse.json({ message: "Użytkownik z tym adresem email już istnieje." }, { status: 409 });
  }

  const passwordHash = await hash(password, 10);

  const result = await db.collection("users").insertOne({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    isAdmin: false,
    createdAt: new Date(),
  });

  if (!result.insertedId) {
    return NextResponse.json({ message: "Nie udało się zarejestrować użytkownika." }, { status: 500 });
  }

  return NextResponse.json({ success: true, userId: result.insertedId });
}
