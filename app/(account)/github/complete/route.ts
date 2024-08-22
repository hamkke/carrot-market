import { notFound, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import upsertSession from '@/lib/upsertSession';
import getAccessToken from '@/lib/githubOauth/getAccessToken';
import getUserProfile from '@/lib/githubOauth/getUserProfile';
import getUserEmail from '@/lib/githubOauth/getUserEmail';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  // console.log(code) // cf75f6a23fc7d5482505
  // 10분이 만료되었거나, 나쁜사람이 주소창으로 들어오는 경우 등을 막기 위해 예외처리
  // 어디서 데이터를 받아오는 경우에는 에러처리하는 걸 잊지 말자구
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  // code랑 access_token교환 -----------
  const { error, access_token } = await getAccessToken(code);
  if (error) {
    return redirect(`/goToHome/${code}`);
  }

  // access_token 받은 후 작업들 -----------
  // login은 username
  const { id, avatar_url, login } = await getUserProfile(access_token);
  const userEmail = await getUserEmail(access_token);

  // 기존 회원 -----------
  const user = await db.user.findFirst({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await upsertSession(user.id);
    return redirect('/profile');
  }
  // 새로운 회원 -----------
  // 중복된 이메일과 사용자가 있는지 먼저 찾기
  const duplicatedUserInfo = await db.user.findFirst({
    where: {
      OR: [{ email: userEmail ?? '' }, { username: login }],
    },
    select: { id: true },
  });
  const newUser = await db.user.create({
    data: {
      username: duplicatedUserInfo ? `${login}-${Date.now()}` : login,
      email: duplicatedUserInfo ? null : userEmail,
      github_id: String(id),
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  await upsertSession(newUser.id);
  return redirect('/profile');
}
