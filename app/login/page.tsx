'use client';

import FormBtn from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { handleForm } from './actions';
import { useFormState } from 'react-dom';

export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password.</h2>
      </div>
      <form className='flex flex-col gap-4' action={action}>
        <FormInput
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={[]}
        />
        <FormInput
          name='password'
          type='password'
          placeholder='Password'
          required
          errors={state?.errors ?? []}
        />
        <FormBtn text='Create account' />
      </form>
      <SocialLogin />
    </div>
  );
}
