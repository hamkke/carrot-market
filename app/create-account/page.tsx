'use client';

import Btn from '@/components/btn';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { createAccountAction } from './actions';
import { MIN_LENGTH, USERNAME_MAX_LENGTH } from '@/lib/constants';

export default function CreateAccount() {
  const [state, action] = useFormState(createAccountAction, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요</h1>
        <h2 className='text-xl'>Fill in the form below to join!</h2>
      </div>
      <form action={action} className='flex flex-col gap-4'>
        <Input
          name='username'
          type='text'
          placeholder='Username'
          required
          errors={state?.fieldErrors.username}
          minLength={MIN_LENGTH}
          maxLength={USERNAME_MAX_LENGTH}
        />
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
          errors={state?.fieldErrors.password}
          minLength={MIN_LENGTH}
        />
        <Input
          name='confirm_password'
          type='password'
          placeholder='Confirm Password'
          required
          errors={state?.fieldErrors.confirm_password}
          minLength={MIN_LENGTH}
        />
        <Btn text='Create account' />
      </form>
      <SocialLogin />
    </div>
  );
}
