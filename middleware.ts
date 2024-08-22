import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/getSession';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exceptUrl = request.nextUrl.pathname.includes('/goToHome');
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // 로그아웃 상태
  if (!session.id) {
    // 로그아웃 상태인데 profile같은 쿠키가 필요한 페이지를 갈려고 할 때
    if (!exists && !exceptUrl) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      return NextResponse.next();
    }
    // 로그인 상태
  } else {
    // 로그인을 했는데 로그인 페이지를 갈려고 할 때
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
