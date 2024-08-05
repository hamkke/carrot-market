import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Fill in the form below to join!</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <input
            className='bg-transparent w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-white focus:ring-green-500 border-none placeholder:text-neutral-400'
            type='text'
            placeholder='Username'
            required
          />
          <span className='text-pink-500 font-medium'>Input error</span>
        </div>
        <button className='primary-btn py-2'>Create account</button>
      </form>
      <div className='w-full h-px bg-green-500' />
      <div>
        <Link
          className='primary-btn flex py-2 items-center justify-center gap-2'
          href='/sms'
        >
          <span>
            <ChatBubbleOvalLeftIcon className='h-6 w-6' />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
