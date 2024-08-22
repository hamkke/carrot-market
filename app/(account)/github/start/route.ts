import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    // sns로그인하면 이메일,이름 등등 정보 제공하겠냐고 하는 부분
    scope: 'read:user,user:email',
    allow_signup: 'true',
  };
  const formattedParams = new URLSearchParams(params).toString();
  // console.log(formattedParams);
  // client_id=Ov23liCkmCeAnpP44yz7&scope=read%3Auser%2Cuser%3Aemail&allow_signup=true
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
