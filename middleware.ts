import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const sessionCookie =
        request.cookies.get('better-auth.session_token') ??
        request.cookies.get('__Secure-better-auth.session_token');

    if (sessionCookie) {
        return NextResponse.next();
    }

    const signInUrl = new URL('/api/auth/sign-in/anonymous', request.url);

    const res = await fetch(signInUrl.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    const response = NextResponse.next();

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
        response.headers.set('set-cookie', setCookie);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};