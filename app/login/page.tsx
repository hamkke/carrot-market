'use client';

import FormBtn from '@/components/btn';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { logIn } from './actions';
import { useFormState } from 'react-dom';
import { MIN_LENGTH } from '@/lib/constants';

export default function Login() {
  const [state, action] = useFormState(logIn, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password.</h2>
      </div>
      <form className='flex flex-col gap-4' action={action}>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
          minLength={MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <FormBtn text='로그인' />
      </form>
      <SocialLogin />
    </div>
  );
}
