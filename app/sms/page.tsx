'use client';

import Btn from '@/components/btn';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsVerification } from './actions';

/**
1. 전화번호 받고
인증번호 작성란은 display:none
2. 사용자에게 인증번호 전송
인증번호 작성란은 display:block
3. 사용자가 인증번호 작성
4. 로그인
 */
const initialState = {
  token: false,
  error: undefined,
};
export default function SMSLogin() {
  const [state, action] = useFormState(smsVerification, initialState);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Log in</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-4' action={action}>
        {state.token ? (
          <Input
            name='token'
            type='number'
            placeholder='Verification code'
            required
            min={100000}
            max={999999}
            // 왜 fieldErrors가 아니지?
            // smsVerification에서는 하나씩 검사했기 때문에 fromErrors
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name='phone_number'
            type='text'
            placeholder='Phone number'
            required
            errors={state.error?.formErrors}
          />
        )}
        <Btn text={state.token ? '인증번호 확인' : '인증번호 요청하기'} />
      </form>
    </div>
  );
}
