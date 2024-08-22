interface EmailResponse {
  email: string;
  primary: boolean;
  verified: boolean;
}

export default async function getUserEmail(access_token: string) {
  const userEmail: EmailResponse[] = await (
    await fetch('https://api.github.com/user/emails', {
      headers: {
        // 이건 github가 이렇게 하래서 하는 거임
        Authorization: `Bearer ${access_token}`,
      },
      // next.js에서 모든 fetch는 캐싱된다! 근데 이거는 user 정보이기에 no-cache
      cache: 'no-cache',
    })
  ).json();

  const filteredEmail = userEmail.filter(
    // primary기본,verified검증됨
    (item) => item.primary && item.verified
  )[0].email;

  return filteredEmail;
}
