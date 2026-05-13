import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { db } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json({ message: "Email i hasło są wymagane." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.collection("users").findOne({ email: normalizedEmail });

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