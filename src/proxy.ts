import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/src/utils/supabase-middleware';

const PROTECTED_PREFIXES = ['/profile'];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
