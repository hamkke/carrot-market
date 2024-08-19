import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
// import db from '../../../lib/db';
import db from '@/lib/db';
import getSession from '@/lib/session';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  // console.log(code) // cf75f6a23fc7d5482505
  // 10분이 만료되었거나, 나쁜사람이 주소창으로 들어오는 경우 등을 막기 위해 예외처리
  // 어디서 데이터를 받아오는 경우에는 에러처리하는 걸 잊지 말자구
  if (!code) {
    return notFound();
  }

  const accessTokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenEndpoint = `${accessTokenURL}?${accessTokenParams}`;
  //   console.log(accessTokenEndpoint);
  // https://github.com/login/oauth/access_token?client_id=Ov23liCkmCeAnpP44yz7&client_secret=undefined&code=d9d7b76f2a658a0ab663
  const accessTokenResponse = await fetch(accessTokenEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  //   const accessTokenJson = await accessTokenResponse.json();
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      // 이건 github가 이렇게 하래서 하는 거임
      Authorization: `Bearer ${access_token}`,
    },
    // next.js에서 모든 fetch는 캐싱된다! 근데 이거는 user 정보이기에 no-cache
    cache: 'no-cache',
  });
  // login은 username
  const { id, avatar_url, login } = await userProfileResponse.json();
  // 기존 회원
  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect('/profile');
  }
  // 새로운 회원
  const newUser = await db.user.create({
    data: {
      // FIXME: github에서 가져온 username이라 중복 확인 ㄴㄴ
      username: login,
      github_id: String(id),
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect('/profile');
}
