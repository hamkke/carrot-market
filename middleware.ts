import { NextRequest } from 'next/server';
import getSession from './lib/session';

export async function middleware(request: NextRequest) {
  // console.log(request.cookies.get('delicious-carrot'),);
  // console.log('내가 바로 middleware다', '얘가 먼저 나오겠쥬?');
  // console.log(request.nextUrl);
  const session = await getSession();
  console.log(session);
  if (request.nextUrl.pathname === '/profile' && !session.id) {
    // return Response.json({
    //   error: 'You are not allowed here',
    // });
    return Response.redirect(new URL('/', request.url));
  }
}
