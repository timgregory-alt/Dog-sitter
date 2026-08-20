import "server-only";
import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "dog_edit_session";

function expectedToken(): string | null {
  const passcode = process.env.EDIT_PASSCODE;
  if (!passcode) return null;
  return createHash("sha256").update(passcode).digest("hex");
}

export async function hasEditSession(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === expected;
}

/** Checks a submitted passcode and, if correct, sets the session cookie.
 * Returns whether it matched. */
export async function trySetEditSession(submitted: string): Promise<boolean> {
  const expected = expectedToken();
  if (!expected || !submitted) return false;
  const submittedToken = createHash("sha256").update(submitted).digest("hex");
  if (submittedToken !== expected) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return true;
}

export async function clearEditSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
