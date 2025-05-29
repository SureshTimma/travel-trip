import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = ['/travel-form', '/my-trips'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // If the path is protected and there's no token,
  // redirect to the sign-in page
  if (protectedPaths.some(prefix => path.startsWith(prefix)) && !token) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/travel-form/:path*',
    '/my-trips/:path*',
  ],
};
