'use client';

import Btn from '@/components/btn';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsVerification } from './actions';

export default function SMSLogin() {
  const [state, action] = useFormState(smsVerification, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Log in</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-4' action={action}>
        <Input
          name='phone_number'
          type='number'
          placeholder='Phone number'
          required
        />
        <Input
          name='token'
          type='number'
          placeholder='Verification code'
          required
        />
        <Btn text='Verify' />
      </form>
    </div>
  );
}
