import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

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
  const accessTokenJson = await accessTokenResponse.json();

  if ('error' in accessTokenJson) {
    return new Response(null, {
      status: 400,
    });
  }
  return NextResponse.json(accessTokenJson);
}
