import { NextResponse } from "next/server";

/**
 * Prototype newsletter endpoint. Validates the email and returns success.
 * Production wires this to the email provider (Resend) + a subscribers table.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const valid = typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // In production: persist subscriber + trigger welcome email.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
