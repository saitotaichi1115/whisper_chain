import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const sessionCookie =
        request.cookies.get('better-auth.session_token') ??
        request.cookies.get('__Secure-better-auth.session_token');

    // Cookieがある場合はセッションの有効性を確認する
    if (sessionCookie) {
        const getSessionUrl = new URL('/api/auth/get-session', request.url);
        try {
            const sessionRes = await fetch(getSessionUrl.toString(), {
                headers: {
                    cookie: request.headers.get('cookie') ?? '',
                },
            });
            const sessionData = await sessionRes.json();
            if (sessionData && sessionData.user) {
                // セッションが有効なのでそのまま通過
                return NextResponse.next();
            }
        } catch {
            // セッション確認失敗時は再サインインへ
        }
    }

    // Cookieがないか、セッションが無効な場合は匿名サインインを行う
    const signInUrl = new URL('/api/auth/sign-in/anonymous', request.url);

    const res = await fetch(signInUrl.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    const setCookie = res.headers.get('set-cookie');

    // 新しいCookieをリクエストヘッダーにも設定
    const requestHeaders = new Headers(request.headers);
    if (setCookie) {
        // set-cookieからトークン部分だけを取り出してcookieヘッダーに追加
        const cookieValue = setCookie.split(';')[0];
        const existingCookie = requestHeaders.get('cookie') ?? '';
        requestHeaders.set('cookie', existingCookie ? `${existingCookie}; ${cookieValue}` : cookieValue);
    }

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    if (setCookie) {
        response.headers.set('set-cookie', setCookie);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};