import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

// 얘가 세션ID가 없으면 생성해주고 있으면 확인해주는 애
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'delicious-carrot',
    password: process.env.COOKIE_PASSWORD!,
  });
}
