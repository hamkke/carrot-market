export default async function getAccessToken(code: string) {
  const accessTokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenEndpoint = `${accessTokenURL}?${accessTokenParams}`;
  //   console.log(accessTokenEndpoint);
  // https://github.com/login/oauth/access_token?client_id=Ov23liCkmCeAnpP44yz7&client_secret=undefined&code=d9d7b76f2a658a0ab663
  const accessTokenResponse = await (
    await fetch(accessTokenEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  return accessTokenResponse;
}
