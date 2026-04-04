import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return NextResponse.json({ success: true });
}
