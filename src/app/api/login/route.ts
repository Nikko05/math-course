import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { getDb } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
<<<<<<< HEAD
  const { email, password } = body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json({ message: "Email i hasło są wymagane." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const db = await getDb();
  const user = await db.collection("users").findOne({ email: normalizedEmail });
=======
  const { login, password } = body as {
    login?: string;
    password?: string;
  };

  if (!login || !password) {
    return NextResponse.json({ message: "Login i hasło są wymagane." }, { status: 400 });
  }

  const normalizedLogin = login.trim().toLowerCase();
  const db = await getDb();
  const user = await db.collection("users").findOne({ email: normalizedLogin });
>>>>>>> cms

  if (!user || !user.passwordHash) {
    return NextResponse.json({ message: "Niepoprawny email lub hasło." }, { status: 401 });
  }

  const passwordMatches = await compare(password, user.passwordHash);

  if (!passwordMatches) {
    return NextResponse.json({ message: "Niepoprawny email lub hasło." }, { status: 401 });
  }
  
  const cookieStore = await cookies();

  cookieStore.set("user-session", user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
}
