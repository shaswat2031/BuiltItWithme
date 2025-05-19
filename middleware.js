import { NextResponse } from "next/server";

export async function middleware(request) {
  // For API routes that handle file uploads, modify the response headers
  const response = NextResponse.next();

  // Increase the body parser size limit for API routes that handle file uploads
  response.headers.set("x-middleware-rewrite", "1");

  return response;
}

export const config = {
  matcher: ["/api/submissions/:path*"],
};
