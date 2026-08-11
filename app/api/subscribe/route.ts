import { NextResponse } from "next/server";

/** Newsletter signup — demo endpoint. Accepts an email and redirects home. */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const email = form?.get("email");
  // In production: persist to a mailing-list provider. Here we simply acknowledge.
  const url = new URL("/?subscribed=1", req.url);
  if (typeof email === "string" && email) return NextResponse.redirect(url, 303);
  return NextResponse.redirect(new URL("/", req.url), 303);
}
