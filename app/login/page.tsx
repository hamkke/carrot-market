import FormBtn from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function Login() {
  const handleForm = async (formData: FormData) => {
    // 이 함수가 서버에서만 돌아가게 하는 지시어, 항상 최상단에 위치해야 함
    'use server';
    console.log(formData.get('email'), formData.get('password'));
  };
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password.</h2>
      </div>
      <form className='flex flex-col gap-4' action={handleForm}>
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
          errors={[]}
        />
        <FormBtn text='Create account' loading={false} />
      </form>
      <SocialLogin />
    </div>
  );
}
