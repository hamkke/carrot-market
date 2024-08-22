/**
MEMO: 일단은 github에서 코드받아오는 단계에서 에러가 났을 때 처리하기 위한 컴포넌트
 */

import getAccessToken from '@/lib/githubOauth/getAccessToken';
import Link from 'next/link';

export default async function GoToHome({ params: code }: { params: string }) {
  console.log(code);
  const { error, error_description, error_uri } = await getAccessToken(code);

  return (
    <div className='p-10 *:mt-3'>
      <h1 className='text-4xl'>github 인증코드에 뭔가 문제가 생겼어요</h1>
      <h1>문제 원인: {error}</h1>
      <h1>설명: {error_description}</h1>
      <h1>
        해결 1 :{' '}
        <Link href={error_uri} target='_blank'>
          OAuth 앱 액세스 토큰 요청 오류 문제 해결
        </Link>
      </h1>
      <h1>
        해결 2 : <Link href='/login'>다시 시도하기</Link>
      </h1>
    </div>
  );
}
