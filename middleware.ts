import { env } from "@/env/server.mjs";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Authenticates any API Request
  // if (req.headers.get("brotherhood") !== env.VALIDATION_SECRET)
  //   return NextResponse.json({ error: "Invalid request" }, { status: 401 });

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
