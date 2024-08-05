import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-6'>
      <div className='my-auto flex flex-col items-center gap-2 *:font-medium'>
        <span className='text-9xl'>🦖</span>
        <h1 className='text-4xl '>공룡</h1>
        <h2 className='text-2xl'>공룡 마켓에 어서오세요!</h2>
      </div>
      <div className='flex flex-col items-center gap-3 w-full'>
        <Link
          href='/create-account'
          className='w-full bg-green-500 text-white text-lg font-medium py-2.5 rounded-md text-center hover:bg-green-400 transition-colors'
        >
          시작하기
        </Link>
        <div className='flex gap-2'>
          <Link href='/login' className='hover:underline'>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
